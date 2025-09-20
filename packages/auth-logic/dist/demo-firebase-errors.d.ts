/**
 * Demo: Firebase Error Handling Usage Examples
 *
 * This file demonstrates how to use the new Firebase error handling system
 * in HIVE applications. Copy these patterns into your components.
 */
export declare function exampleAuthOperation(): Promise<import("./firebase-error-handler").UserFriendlyError>;
export declare function ExampleAuthComponent(): {
    handleSignIn: (_email: string) => Promise<void>;
};
export declare function exampleFunctionCall(): Promise<import("./firebase-error-handler").UserFriendlyError>;
export declare function getErrorBoundaryExample(): string;
export declare const commonErrorScenarios: {
    "auth/user-not-found": () => void;
    "auth/too-many-requests": () => void;
    "functions/permission-denied": () => void;
    "generic-error": () => void;
};
declare const _default: {
    exampleAuthOperation: typeof exampleAuthOperation;
    ExampleAuthComponent: typeof ExampleAuthComponent;
    exampleFunctionCall: typeof exampleFunctionCall;
    getErrorBoundaryExample: typeof getErrorBoundaryExample;
    commonErrorScenarios: {
        "auth/user-not-found": () => void;
        "auth/too-many-requests": () => void;
        "functions/permission-denied": () => void;
        "generic-error": () => void;
    };
};
export default _default;
//# sourceMappingURL=demo-firebase-errors.d.ts.map