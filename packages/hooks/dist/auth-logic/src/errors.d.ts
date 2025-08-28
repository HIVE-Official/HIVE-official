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
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly ACCOUNT_LOCKED: "ACCOUNT_LOCKED";
    readonly REQUIRES_VERIFICATION: "REQUIRES_VERIFICATION";
    readonly UNKNOWN_ERROR: "UNKNOWN_ERROR";
};
export type AuthErrorCodeType = typeof AuthErrorCode[keyof typeof AuthErrorCode];
export declare const AuthErrorSchema: z.ZodObject<{
    code: z.ZodEnum<[string, ...string[]]>;
    message: z.ZodString;
    retry: z.ZodOptional<z.ZodBoolean>;
    nextAction: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["REDIRECT", "RETRY", "WAIT", "CONTACT_SUPPORT"]>;
        path: z.ZodOptional<z.ZodString>;
        waitMs: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "REDIRECT" | "RETRY" | "WAIT" | "CONTACT_SUPPORT";
        path?: string | undefined;
        waitMs?: number | undefined;
    }, {
        type: "REDIRECT" | "RETRY" | "WAIT" | "CONTACT_SUPPORT";
        path?: string | undefined;
        waitMs?: number | undefined;
    }>>;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    retry?: boolean | undefined;
    nextAction?: {
        type: "REDIRECT" | "RETRY" | "WAIT" | "CONTACT_SUPPORT";
        path?: string | undefined;
        waitMs?: number | undefined;
    } | undefined;
    details?: Record<string, unknown> | undefined;
}, {
    code: string;
    message: string;
    retry?: boolean | undefined;
    nextAction?: {
        type: "REDIRECT" | "RETRY" | "WAIT" | "CONTACT_SUPPORT";
        path?: string | undefined;
        waitMs?: number | undefined;
    } | undefined;
    details?: Record<string, unknown> | undefined;
}>;
export type AuthError = z.infer<typeof AuthErrorSchema>;
export declare const getErrorMessage: (code: AuthErrorCodeType) => string;
export declare const getErrorRecoveryAction: (code: AuthErrorCodeType) => {
    type: "REDIRECT" | "RETRY" | "WAIT" | "CONTACT_SUPPORT";
    path?: string;
    waitMs?: number;
};
export declare const createAuthError: (code: AuthErrorCodeType, details?: Record<string, unknown>) => AuthError;
//# sourceMappingURL=errors.d.ts.map