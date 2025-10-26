// Bounded Context Owner: Identity & Access Management Guild
"use client";

let _initPromise: Promise<typeof import("firebase/auth")> | null = null;

const getFirebaseConfig = () => {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "";
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "";
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "";
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "";
  const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
  if (!apiKey || !authDomain || !projectId || !appId) {
    throw new Error("Firebase client config is missing. Set NEXT_PUBLIC_FIREBASE_* env vars.");
  }
  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
  };
};

async function ensureFirebase() {
  if (_initPromise) return _initPromise;
  _initPromise = (async () => {
    const [{ initializeApp, getApps }, { getAuth, setPersistence, browserLocalPersistence }]= await Promise.all([
      import("firebase/app"),
      import("firebase/auth")
    ]);
    const cfg = getFirebaseConfig();
    if (getApps().length === 0) {
      initializeApp(cfg);
    }
    const auth = getAuth();
    // Persist across tabs so link completes smoothly
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (error) {
      console.warn("firebase.persistence.configure_failed", error);
    }
    return await import("firebase/auth");
  })();
  return _initPromise;
}

export async function sendMagicLinkViaFirebase(params: {
  email: string;
  messageId: string;
  continueUrl?: string;
}): Promise<void> {
  const fbAuth = await ensureFirebase();
  const { getAuth, sendSignInLinkToEmail } = fbAuth;
  const auth = getAuth();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const dynamicLinkDomain = process.env.NEXT_PUBLIC_FIREBASE_DYNAMIC_LINK_DOMAIN;
  const url = params.continueUrl || `${origin}/api/auth/verify?token=${encodeURIComponent(params.messageId)}`;

  const actionCodeSettings: any = {
    url,
    handleCodeInApp: true,
    ...(dynamicLinkDomain ? { dynamicLinkDomain } : {})
  };

  await sendSignInLinkToEmail(auth, params.email, actionCodeSettings);
}
