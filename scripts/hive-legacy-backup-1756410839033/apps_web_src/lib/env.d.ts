/**
 * Get Firebase client configuration for the current environment
 */
export declare function getFirebaseConfig(): {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string | undefined;
};
export declare const env: {
    NODE_ENV: "development" | "staging" | "production";
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
    FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?: string | undefined;
    FIREBASE_CLIENT_EMAIL?: string | undefined;
    FIREBASE_PRIVATE_KEY?: string | undefined;
    NEXTAUTH_SECRET?: string | undefined;
    NEXTAUTH_URL?: string | undefined;
};
export declare const isProduction: boolean;
export declare const isDevelopment: boolean;
export declare const isStaging: boolean;
export declare const currentEnvironment: "development" | "staging" | "production";
export declare const isFirebaseAdminConfigured: boolean;
//# sourceMappingURL=env.d.ts.map