import type { ServiceAccount } from 'firebase-admin/app';
export declare const isBuildTime: boolean;
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_FIREBASE_API_KEY?: string | undefined;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?: string | undefined;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID?: string | undefined;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string | undefined;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string | undefined;
    NEXT_PUBLIC_FIREBASE_APP_ID?: string | undefined;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?: string | undefined;
    NEXT_PUBLIC_DEBUG?: string | undefined;
    FIREBASE_PROJECT_ID?: string | undefined;
    FIREBASE_CLIENT_EMAIL?: string | undefined;
    FIREBASE_PRIVATE_KEY?: string | undefined;
    VERCEL?: string | undefined;
    VERCEL_ENV?: string | undefined;
    NEXT_PHASE?: string | undefined;
};
export declare const isDevelopment: boolean;
export declare const isProduction: boolean;
export declare const isTest: boolean;
/**
 * Get Firebase configuration for the current environment
 */
export declare function getFirebaseConfig(): {
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
    measurementId: string | undefined;
} | null;
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