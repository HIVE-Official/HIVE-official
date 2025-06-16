import { FirebaseError } from "firebase/app";
import { AuthError } from "firebase/auth";
export declare const AUTH_ERROR_MESSAGES: Record<string, string>;
export declare const FUNCTIONS_ERROR_MESSAGES: Record<string, string>;
export interface UserFriendlyError {
    message: string;
    code: string;
    isRetryable: boolean;
    severity: "error" | "warning" | "info";
    action?: "retry" | "contact-support" | "check-email" | "sign-up" | "sign-in";
}
export declare class FirebaseErrorHandler {
    static isFirebaseError(error: unknown): error is FirebaseError;
    static isAuthError(error: unknown): error is AuthError;
    static isFunctionsError(error: unknown): error is FirebaseError;
    static getRetryableErrors(): string[];
    static handleAuthError(error: unknown): UserFriendlyError;
    static handleFunctionsError(error: unknown): UserFriendlyError;
    static handleError(error: unknown): UserFriendlyError;
    static shouldShowRetryButton(error: UserFriendlyError): boolean;
    static shouldContactSupport(error: UserFriendlyError): boolean;
    static getActionButtonText(error: UserFriendlyError): string;
}
export declare function useFirebaseErrorHandler(): {
    handleError: (error: unknown) => UserFriendlyError;
    getErrorDisplay: (error: unknown) => {
        actionButtonText: string;
        shouldShowRetry: boolean;
        shouldContactSupport: boolean;
        message: string;
        code: string;
        isRetryable: boolean;
        severity: "error" | "warning" | "info";
        action?: "retry" | "contact-support" | "check-email" | "sign-up" | "sign-in";
    };
};
export default FirebaseErrorHandler;
//# sourceMappingURL=firebase-error-handler.d.ts.map