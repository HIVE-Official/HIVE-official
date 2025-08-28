export interface AuthError {
    code: string;
    message: string;
    userMessage: string;
}
export declare class AuthenticationError extends Error {
    readonly code: string;
    readonly userMessage: string;
    constructor(code: string, message: string, userMessage: string);
}
export declare function handleAuthError(error: unknown): AuthError;
export declare function createAuthError(code: string, userMessage: string): AuthenticationError;
export declare function isNetworkError(error: unknown): boolean;
export declare function isTemporaryError(error: unknown): boolean;
//# sourceMappingURL=error-handler.d.ts.map