/**
 * Get Firebase client configuration for the current environment
 */
export declare function getFirebaseConfig(): {
    readonly apiKey: "AIzaSyD0aMEsznCtijDJBV8KcHS0KXrmS3DIXZc";
    readonly authDomain: "hive-dev-2025.firebaseapp.com";
    readonly projectId: "hive-dev-2025";
    readonly storageBucket: "hive-dev-2025.firebasestorage.app";
    readonly messagingSenderId: "43961711178";
    readonly appId: "1:43961711178:web:d5cca76e45fc125bb484b3";
    readonly measurementId: "G-9PJ6SQ8WVS";
} | {
    readonly apiKey: "AIzaSyDj7dO4DHmGMFGMZouGQVjRDPbDF026NG4";
    readonly authDomain: "hive-staging-2025.firebaseapp.com";
    readonly projectId: "hive-staging-2025";
    readonly storageBucket: "hive-staging-2025.firebasestorage.app";
    readonly messagingSenderId: "32403978665";
    readonly appId: "1:32403978665:web:5779609cc83680e0486cb8";
    readonly measurementId: "G-TD0JEBTKHP";
} | {
    readonly apiKey: "AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ";
    readonly authDomain: "hive-9265c.firebaseapp.com";
    readonly projectId: "hive-9265c";
    readonly storageBucket: "hive-9265c.appspot.com";
    readonly messagingSenderId: "573191826528";
    readonly appId: "1:573191826528:web:1d5eaeb8531276e4c1a705";
    readonly measurementId: "G-NK3E12MSFD";
    readonly databaseURL: "https://hive-9265c-default-rtdb.firebaseio.com";
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