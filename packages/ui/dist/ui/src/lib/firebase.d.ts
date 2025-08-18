export declare const auth: {
    currentUser: any;
    onAuthStateChanged: () => () => void;
    signOut: () => Promise<void>;
    sendSignInLinkToEmail: () => Promise<void>;
    isSignInWithEmailLink: () => boolean;
    signInWithEmailLink: () => Promise<{}>;
};
export declare const db: {
    collection: () => {
        doc: () => {
            get: () => Promise<{
                data: () => {};
            }>;
            set: () => Promise<void>;
            update: () => Promise<void>;
        };
    };
};
export declare const analytics: {
    logEvent: () => void;
};
export declare const initializeApp: () => {};
export declare const getAuth: () => {
    currentUser: any;
    onAuthStateChanged: () => () => void;
    signOut: () => Promise<void>;
    sendSignInLinkToEmail: () => Promise<void>;
    isSignInWithEmailLink: () => boolean;
    signInWithEmailLink: () => Promise<{}>;
};
export declare const getFirestore: () => {
    collection: () => {
        doc: () => {
            get: () => Promise<{
                data: () => {};
            }>;
            set: () => Promise<void>;
            update: () => Promise<void>;
        };
    };
};
export declare const getAnalytics: () => {
    logEvent: () => void;
};
//# sourceMappingURL=firebase.d.ts.map