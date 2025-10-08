/**
 * Base Application Service
 * Foundation for all application services with common patterns
 * Extended to include automatic event dispatching
 */
import { Result } from '../domain';
import { AggregateRoot } from '../domain/shared/base/AggregateRoot.base';
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
     * Save aggregate and automatically dispatch its domain events
     * This ensures events are published after successful persistence
     *
     * Usage:
     * await this.saveAndDispatchEvents(profile, (p) => this.profileRepo.save(p));
     */
    protected saveAndDispatchEvents<T extends AggregateRoot<any>>(aggregate: T, saveFn: (aggregate: T) => Promise<Result<void>>): Promise<Result<void>>;
    /**
     * Save multiple aggregates and dispatch all their events
     */
    protected saveAllAndDispatchEvents<T extends AggregateRoot<any>>(aggregates: T[], saveFn: (aggregates: T[]) => Promise<Result<void>>): Promise<Result<void>>;
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
    readonly context?: any;
    constructor(message: string, code: string, context?: any);
    static unauthorized(message?: string): ServiceError;
    static notFound(resource: string): ServiceError;
    static validationFailed(errors: any): ServiceError;
    static conflict(message: string): ServiceError;
    static rateLimit(): ServiceError;
}
//# sourceMappingURL=base.service.d.ts.map