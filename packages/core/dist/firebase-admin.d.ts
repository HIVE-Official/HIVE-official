import * as admin from "firebase-admin";
declare let dbAdmin: admin.firestore.Firestore;
declare let authAdmin: admin.auth.Auth;
export { dbAdmin, authAdmin };
export declare const db: admin.firestore.Firestore;
export declare const auth: admin.auth.Auth;
export declare const isFirebaseConfigured: boolean;
export declare const environmentInfo: {
    environment: "development" | "staging" | "production";
    firebaseConfigured: boolean;
    projectId: string;
    credentialSource: string;
};
//# sourceMappingURL=firebase-admin.d.ts.map