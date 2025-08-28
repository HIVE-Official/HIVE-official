import * as admin from "firebase-admin";
declare let dbAdmin: admin.firestore.Firestore;
declare let authAdmin: admin.auth.Auth;
export { dbAdmin, authAdmin };
export declare const db: admin.firestore.Firestore;
export declare const auth: import("firebase-admin/lib/auth/auth").Auth;
export declare const adminFirestore: admin.firestore.Firestore;
export declare const firebaseAuth: import("firebase-admin/lib/auth/auth").Auth;
export declare const isFirebaseConfigured: boolean;
export declare const getFirestoreAdmin: () => admin.firestore.Firestore;
export declare const getAuthAdmin: () => import("firebase-admin/lib/auth/auth").Auth;
export declare const environmentInfo: {
    environment: "production" | "development" | "staging";
    firebaseConfigured: boolean;
    projectId: string;
    credentialSource: string;
};
//# sourceMappingURL=firebase-admin.d.ts.map