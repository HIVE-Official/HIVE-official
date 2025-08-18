/**
 * Simple logger utility for HIVE UI package
 * Provides consistent logging across components
 */
interface LogData {
    [key: string]: any;
}
declare class Logger {
    private isDevelopment;
    private formatMessage;
    debug(message: string, data?: LogData): void;
    info(message: string, data?: LogData): void;
    warn(message: string, data?: LogData): void;
    error(message: string, data?: LogData): void;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map