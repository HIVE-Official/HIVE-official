import { z } from 'zod';
interface ErrorContext {
    component?: string;
    additionalData?: Record<string, unknown>;
}
declare global {
    interface Window {
        __HIVE_USER_ID?: string;
    }
}
export declare const ErrorMetadataSchema: z.ZodObject<{
    type: z.ZodEnum<["react_error_boundary", "api_error", "network_error", "validation_error", "auth_error", "firebase_error", "unknown"]>;
    componentStack: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    extra: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    timestamp: string;
    type: "auth_error" | "unknown" | "react_error_boundary" | "api_error" | "network_error" | "validation_error" | "firebase_error";
    userId?: string | undefined;
    sessionId?: string | undefined;
    componentStack?: string | undefined;
    location?: string | undefined;
    tags?: string[] | undefined;
    extra?: Record<string, unknown> | undefined;
}, {
    timestamp: string;
    type: "auth_error" | "unknown" | "react_error_boundary" | "api_error" | "network_error" | "validation_error" | "firebase_error";
    userId?: string | undefined;
    sessionId?: string | undefined;
    componentStack?: string | undefined;
    location?: string | undefined;
    tags?: string[] | undefined;
    extra?: Record<string, unknown> | undefined;
}>;
export type ErrorMetadata = z.infer<typeof ErrorMetadataSchema>;
declare class ErrorTracker {
    private readonly config;
    private errorCount;
    private lastReset;
    constructor(config?: {
        maxErrors: number;
        windowMs: number;
    });
    private shouldThrottle;
    captureError(error: Error, metadata: ErrorMetadata): Promise<void>;
    captureReactError(error: Error, errorInfo: React.ErrorInfo): Promise<void>;
    captureApiError(error: Error, endpoint: string): Promise<void>;
    captureValidationError(error: Error, data: unknown): Promise<void>;
}
export declare const errorTracker: ErrorTracker;
export declare const captureError: (error: Error, metadata: ErrorMetadata) => Promise<void>;
/**
 * Reports an error to the analytics endpoint
 */
export declare function reportError(error: Error | string | null | undefined, context?: ErrorContext): Promise<void>;
/**
 * Sets up global error handlers to catch unhandled errors and promise rejections
 */
export declare function setupGlobalErrorHandling(): void;
export {};
//# sourceMappingURL=error-reporting.d.ts.map