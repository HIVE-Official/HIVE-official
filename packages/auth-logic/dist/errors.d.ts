import { z } from 'zod';
export declare const AuthErrorCode: {
    readonly INVALID_CREDENTIALS: "INVALID_CREDENTIALS";
    readonly EXPIRED_SESSION: "EXPIRED_SESSION";
    readonly INVALID_TOKEN: "INVALID_TOKEN";
    readonly EXPIRED_LINK: "EXPIRED_LINK";
    readonly NETWORK_ERROR: "NETWORK_ERROR";
    readonly SERVER_ERROR: "SERVER_ERROR";
    readonly RATE_LIMITED: "RATE_LIMITED";
    readonly INVALID_EMAIL: "INVALID_EMAIL";
    readonly INVALID_SCHOOL: "INVALID_SCHOOL";
    readonly EMAIL_IN_USE: "EMAIL_IN_USE";
    readonly SESSION_EXPIRED: "SESSION_EXPIRED";
    readonly INVALID_SESSION: "INVALID_SESSION";
    readonly CONCURRENT_SESSION: "CONCURRENT_SESSION";
    readonly REQUIRES_VERIFICATION: "REQUIRES_VERIFICATION";
    readonly UNKNOWN_ERROR: "UNKNOWN_ERROR";
};
export type AuthErrorCodeType = typeof AuthErrorCode[keyof typeof AuthErrorCode];
export declare const AuthErrorSchema: any;
export type AuthError = z.infer<typeof AuthErrorSchema>;
export declare const getErrorMessage: (code: AuthErrorCodeType) => string;
export declare const getErrorRecoveryAction: (code: AuthErrorCodeType) => {
    type: "REDIRECT" | "RETRY" | "WAIT" | "CONTACT_SUPPORT";
    path?: string;
    waitMs?: number;
};
export declare const createAuthError: any, AuthErrorCodeType: any, details: any, Record: any;
//# sourceMappingURL=errors.d.ts.map