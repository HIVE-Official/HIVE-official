"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
exports.handleAuthError = handleAuthError;
exports.createAuthError = createAuthError;
exports.isNetworkError = isNetworkError;
exports.isTemporaryError = isTemporaryError;
const app_1 = require("firebase/app");
class AuthenticationError extends Error {
    constructor(code, message, userMessage) {
        super(message);
        this.code = code;
        this.userMessage = userMessage;
        this.name = "AuthenticationError";
    }
}
exports.AuthenticationError = AuthenticationError;
function handleAuthError(error) {
    if (error instanceof app_1.FirebaseError) {
        const authError = handleFirebaseAuthError(error);
        return authError;
    }
    if (error instanceof AuthenticationError) {
        return {
            code: error.code,
            message: error.message,
            userMessage: error.userMessage,
        };
    }
    return {
        code: "unknown",
        message: error?.message || "An unknown error occurred",
        userMessage: "Something went wrong. Please try again.",
    };
}
function handleFirebaseAuthError(error) {
    const { code, message } = error;
    const errorMap = {
        "auth/user-not-found": "No account found with this email address.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/email-already-in-use": "An account with this email already exists.",
        "auth/weak-password": "Password is too weak. Please choose a stronger password.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/too-many-requests": "Too many failed attempts. Please try again later.",
        "auth/user-disabled": "This account has been disabled. Please contact support.",
        "auth/expired-action-code": "This link has expired. Please request a new one.",
        "auth/invalid-action-code": "This link is invalid. Please request a new one.",
        "auth/network-request-failed": "Network error. Please check your connection and try again.",
        "auth/requires-recent-login": "Please sign in again to complete this action.",
        "auth/credential-already-in-use": "This credential is already associated with another account.",
        "auth/custom-token-mismatch": "Authentication error. Please try signing in again.",
        "auth/invalid-custom-token": "Authentication error. Please try signing in again.",
        "auth/missing-email": "Email address is required.",
        "auth/invalid-credential": "Invalid credentials. Please check your information and try again.",
        "auth/operation-not-allowed": "This operation is not allowed. Please contact support.",
        "auth/unauthorized-domain": "This domain is not authorized. Please contact support.",
    };
    const userMessage = errorMap[code] || "Authentication failed. Please try again.";
    return {
        code,
        message,
        userMessage,
    };
}
function createAuthError(code, userMessage) {
    return new AuthenticationError(code, `Authentication error: ${code}`, userMessage);
}
function isNetworkError(error) {
    const err = error;
    return err?.code === "auth/network-request-failed" ||
        (err?.message?.includes("network") ?? false) ||
        (err?.message?.includes("fetch") ?? false);
}
function isTemporaryError(error) {
    const temporaryCodes = [
        "auth/too-many-requests",
        "auth/network-request-failed",
        "auth/timeout",
    ];
    return temporaryCodes.includes(error?.code || "");
}
//# sourceMappingURL=error-handler.js.map