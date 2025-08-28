interface LogMetadata {
    [key: string]: unknown;
}
interface LogEvent {
    name: string;
    type?: string;
    level?: string;
    message?: string;
    metadata?: LogMetadata;
    sessionId?: string;
    properties?: LogMetadata;
    timestamp?: number;
}
interface AnalyticsProvider {
    trackError: (error: Error, metadata?: LogMetadata) => void;
    trackEvent: (event: LogEvent) => void;
    track: (name: string, properties?: LogMetadata) => void;
    page: (name: string, properties?: LogMetadata) => void;
    identify: (userId: string, traits?: LogMetadata) => void;
}
interface ErrorEvent {
    error: Error;
    type?: string;
    metadata?: LogMetadata;
}
interface ApiLogMetadata extends LogMetadata {
    method?: string;
    url?: string;
    status?: number;
    duration?: number;
    requestBody?: unknown;
    responseBody?: unknown;
}
interface StateLogMetadata extends LogMetadata {
    store?: string;
    action?: string;
    prevState?: unknown;
    nextState?: unknown;
    source?: string;
    errors?: unknown[];
}
interface ValidationLogMetadata extends LogMetadata {
    schema?: string;
    value?: unknown;
    errors?: unknown[];
}
declare class Logger {
    private isProduction;
    private debugEnabled;
    private errorQueue;
    private maxQueueSize;
    private errorCount;
    private lastErrorReset;
    private ERROR_RATE_LIMIT;
    private analyticsProvider;
    private perfMarks;
    constructor();
    setAnalyticsProvider(provider: AnalyticsProvider): void;
    private formatMessage;
    private shouldLog;
    private shouldThrottle;
    private reportError;
    private log;
    debug(message: string, metadata?: LogMetadata): void;
    info(message: string, metadata?: LogMetadata): void;
    warn(message: string, metadata?: LogMetadata): void;
    error(message: string | Error, metadata?: LogMetadata): void;
    logApi(message: string, metadata: ApiLogMetadata): void;
    logState(message: string, metadata: StateLogMetadata): void;
    logValidation(message: string, metadata: ValidationLogMetadata): void;
    startTimer(label: string): void;
    endTimer(label: string, metadata?: LogMetadata): void;
    logBatch(operation: string, items: unknown[], metadata?: LogMetadata): void;
    logComponent(component: string, lifecycle: string, metadata?: LogMetadata): void;
    logReactError(error: Error, componentStack: string): void;
    getErrorCount(): number;
    getErrorQueue(): ErrorEvent[];
    clearErrorQueue(): void;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map