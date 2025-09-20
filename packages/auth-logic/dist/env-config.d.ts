export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
}
export declare function getFirebaseConfig(): FirebaseConfig;
export declare function isMockConfig(config: FirebaseConfig): boolean;
//# sourceMappingURL=env-config.d.ts.map