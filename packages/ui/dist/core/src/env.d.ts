import type { ServiceAccount } from 'firebase-admin/app';
export declare const isBuildTime: boolean;
export declare const env: {
    NODE_ENV?: "development" | "production" | "test";
    NEXT_PUBLIC_FIREBASE_API_KEY?: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID?: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string;
    NEXT_PUBLIC_FIREBASE_APP_ID?: string;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?: string;
    NEXT_PUBLIC_DEBUG?: string;
    FIREBASE_PROJECT_ID?: string;
    FIREBASE_CLIENT_EMAIL?: string;
    FIREBASE_PRIVATE_KEY?: string;
    VERCEL?: string;
    VERCEL_ENV?: string;
    NEXT_PHASE?: string;
};
export declare const isDevelopment: boolean;
export declare const isProduction: boolean;
export declare const isTest: boolean;
/**
 * Get Firebase configuration for the current environment
 */
export declare function getFirebaseConfig(): {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
};
/**
 * Get Firebase Admin configuration for server-side operations
 */
export declare function getFirebaseAdminConfig(): ServiceAccount | null;
/**
 * Check if debug mode is enabled
 */
export declare const isDebugMode: boolean;
export declare const environmentInfo: {
    environment: "development" | "production" | "test";
    isProduction: boolean;
    isDevelopment: boolean;
    isBuildTime: boolean;
    isServerSide: boolean;
    hasFirebaseConfig: boolean;
    hasFirebaseAdminConfig: boolean;
};
//# sourceMappingURL=env.d.ts.map