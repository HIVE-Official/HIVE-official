import * as admin from "firebase-admin";
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccount) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.");
}
const serviceAccountJson = JSON.parse(Buffer.from(serviceAccount, "base64").toString("ascii"));
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountJson),
    });
}
const dbAdmin = admin.firestore();
const authAdmin = admin.auth();
export { dbAdmin, authAdmin };
//# sourceMappingURL=firebase-admin.js.map