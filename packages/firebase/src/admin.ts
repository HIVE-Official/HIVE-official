import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { logger } from "@hive/core";

const initializeFirebaseAdmin = () => {
  try {
    if (!getApps().length) {
      const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}"
      );

      const app = initializeApp({
        credential: cert(serviceAccount),
      });

      logger.info("Firebase Admin initialized successfully", {
        projectId: serviceAccount.project_id,
      });

      return app;
    }
    return getApps()[0];
  } catch (error) {
    logger.error("Error initializing Firebase Admin:", error);
    throw error;
  }
};

export const adminApp = initializeFirebaseAdmin();
export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
