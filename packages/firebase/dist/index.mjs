// src/index.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
  initializeFirestore
} from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
var validateEnvVar = (key) => {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Firebase configuration error: ${key} is required`);
    }
  }
  return value || "";
};
var firebaseConfig = {
  apiKey: validateEnvVar("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: validateEnvVar("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: validateEnvVar("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: validateEnvVar("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: validateEnvVar("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: validateEnvVar("NEXT_PUBLIC_FIREBASE_APP_ID"),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  // Optional
};
if (process.env.NODE_ENV === "production") {
  if (firebaseConfig.projectId?.includes("demo") || firebaseConfig.projectId?.includes("test") || firebaseConfig.authDomain?.includes("localhost")) {
    throw new Error("Development Firebase configuration detected in production!");
  }
}
var app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
var auth = getAuth(app);
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch(console.error);
}
var db = initializeFirestore(app, {
  experimentalForceLongPolling: false,
  // Use WebSocket
  cacheSizeBytes: 50 * 1024 * 1024
  // 50MB cache
});
if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
  enableIndexedDbPersistence(db, {
    forceOwnership: false
    // Don't force ownership in tabs
  }).catch((err) => {
    if (err.code === "failed-precondition") {
      console.warn("Firestore persistence failed: Multiple tabs open");
    } else if (err.code === "unimplemented") {
      console.warn("Firestore persistence not supported in this browser");
    }
  });
}
var storage = getStorage(app);
var analytics;
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_USE_EMULATOR === "true") {
  const EMULATOR_HOST = process.env.NEXT_PUBLIC_EMULATOR_HOST || "localhost";
  if (!auth.emulatorConfig) {
    connectAuthEmulator(auth, `http://${EMULATOR_HOST}:9099`, { disableWarnings: true });
  }
  if (!db._settings?.host?.includes("localhost")) {
    connectFirestoreEmulator(db, EMULATOR_HOST, 8080);
  }
  if (!storage._host?.includes("localhost")) {
    connectStorageEmulator(storage, EMULATOR_HOST, 9199);
  }
  console.log("\u{1F527} Firebase Emulators Connected");
}
var validateCampusAccess = (userCampusId, requestedCampusId) => {
  if (!userCampusId || !requestedCampusId) {
    console.error("Campus validation failed: Missing campus IDs");
    return false;
  }
  if (process.env.NODE_ENV === "production") {
    return userCampusId === requestedCampusId;
  }
  if (userCampusId !== requestedCampusId) {
    console.warn(`\u26A0\uFE0F Campus mismatch: User campus ${userCampusId} accessing ${requestedCampusId}`);
  }
  return userCampusId === requestedCampusId;
};
var rateLimitMap = /* @__PURE__ */ new Map();
var checkRateLimit = (identifier, maxRequests = 10, windowMs = 6e4) => {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }
  if (limit.count >= maxRequests) {
    return false;
  }
  limit.count++;
  return true;
};
if (typeof window !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 6e4);
}
export {
  analytics,
  app,
  auth,
  checkRateLimit,
  db,
  storage,
  validateCampusAccess
};
