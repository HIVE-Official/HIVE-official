"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  analytics: () => analytics,
  app: () => app,
  auth: () => auth,
  checkRateLimit: () => checkRateLimit,
  db: () => db,
  storage: () => storage,
  validateCampusAccess: () => validateCampusAccess
});
module.exports = __toCommonJS(index_exports);
var import_app = require("firebase/app");
var import_auth = require("firebase/auth");
var import_firestore = require("firebase/firestore");
var import_storage = require("firebase/storage");
var import_analytics = require("firebase/analytics");
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
if (!(0, import_app.getApps)().length) {
  app = (0, import_app.initializeApp)(firebaseConfig);
} else {
  app = (0, import_app.getApp)();
}
var auth = (0, import_auth.getAuth)(app);
if (typeof window !== "undefined") {
  (0, import_auth.setPersistence)(auth, import_auth.browserLocalPersistence).catch(console.error);
}
var db = (0, import_firestore.initializeFirestore)(app, {
  experimentalForceLongPolling: false,
  // Use WebSocket
  cacheSizeBytes: 50 * 1024 * 1024
  // 50MB cache
});
if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
  (0, import_firestore.enableIndexedDbPersistence)(db, {
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
var storage = (0, import_storage.getStorage)(app);
var analytics;
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  (0, import_analytics.isSupported)().then((supported) => {
    if (supported) {
      analytics = (0, import_analytics.getAnalytics)(app);
    }
  });
}
if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_USE_EMULATOR === "true") {
  const EMULATOR_HOST = process.env.NEXT_PUBLIC_EMULATOR_HOST || "localhost";
  if (!auth.emulatorConfig) {
    (0, import_auth.connectAuthEmulator)(auth, `http://${EMULATOR_HOST}:9099`, { disableWarnings: true });
  }
  if (!db._settings?.host?.includes("localhost")) {
    (0, import_firestore.connectFirestoreEmulator)(db, EMULATOR_HOST, 8080);
  }
  if (!storage._host?.includes("localhost")) {
    (0, import_storage.connectStorageEmulator)(storage, EMULATOR_HOST, 9199);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  analytics,
  app,
  auth,
  checkRateLimit,
  db,
  storage,
  validateCampusAccess
});
