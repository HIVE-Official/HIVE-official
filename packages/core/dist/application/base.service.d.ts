/**
 * Base Application Service
 * Foundation for all application services with common patterns
 */
import { Result } from '../domain';
export interface ApplicationServiceContext {
    userId?: string;
    campusId: string;
    requestId?: string;
    timestamp: Date;
}
export declare abstract class BaseApplicationService {
    protected context: ApplicationServiceContext;
    constructor(context?: Partial<ApplicationServiceContext>);
    /**
     * Execute service operation with error handling and logging
     */
    protected execute<T>(operation: () => Promise<Result<T>>, operationName: string): Promise<Result<T>>;
    /**
     * Validate user context is present
     */
    protected validateUserContext(): Result<void>;
    /**
     * Generate unique request ID for tracking
     */
    private generateRequestId;
}
/**
 * Service Result type for complex return values
 */
export interface ServiceResult<T> {
    data: T;
    metadata?: {
        totalCount?: number;
        pageSize?: number;
        pageNumber?: number;
        hasMore?: boolean;
    };
    warnings?: string[];
}
/**
 * Common service errors
 */
export declare class ServiceError extends Error {
    readonly code: string;
    readonly context?: any | undefined;
    constructor(message: string, code: string, context?: any | undefined);
    static unauthorized(message?: string): ServiceError;
    static notFound(resource: string): ServiceError;
    static validationFailed(errors: any): ServiceError;
    static conflict(message: string): ServiceError;
    static rateLimit(): ServiceError;
}
//# sourceMappingURL=base.service.d.ts.map