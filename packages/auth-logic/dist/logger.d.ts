/**
 * Simple logger utility for auth-logic package
 * Wraps console methods with consistent formatting
 */
interface LogMetadata {
    [key: string]: unknown;
}
declare class Logger {
    private formatMessage;
    debug(message: string, metadata?: LogMetadata): void;
    info(message: string, metadata?: LogMetadata): void;
    warn(message: string, metadata?: LogMetadata): void;
    error(message: string | Error, metadata?: LogMetadata): void;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map