// Bounded Context Owner: Platform Services Guild
import { getApps, initializeApp, cert, type AppOptions } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const createAppOptions = (): AppOptions => {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin credentials are not fully configured");
  }

  return {
    credential: cert({ projectId, clientEmail, privateKey })
  } satisfies AppOptions;
};

let cachedApp: ReturnType<typeof initializeApp> | null = null;

const getAppInstance = () => {
  if (cachedApp) return cachedApp;
  const apps = getApps();
  if (apps.length > 0) {
    cachedApp = apps[0]!;
    return cachedApp;
  }
  cachedApp = initializeApp(createAppOptions());
  return cachedApp;
};

export const firebaseAuth = () => getAuth(getAppInstance());
export const firebaseFirestore = () => getFirestore(getAppInstance());
export const firebaseStorageBucket = () => getStorage(getAppInstance()).bucket();

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  );
};
