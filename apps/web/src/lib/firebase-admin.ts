// Temporary stub for firebase-admin utilities
// TODO: Use proper firebase-admin from @hive/core

import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const dbAdmin = admin.firestore();
export const authAdmin = admin.auth();

// Re-export the admin db for compatibility
export const db = dbAdmin; 