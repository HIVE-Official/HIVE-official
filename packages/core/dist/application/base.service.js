"use strict";
/**
 * Base Application Service
 * Foundation for all application services with common patterns
 * Extended to include automatic event dispatching
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = exports.BaseApplicationService = void 0;
const domain_1 = require("../domain");
const event_dispatcher_1 = require("../infrastructure/events/event-dispatcher");
class BaseApplicationService {
    constructor(context) {
        this.context = {
            campusId: context?.campusId || 'ub-buffalo',
            userId: context?.userId,
            requestId: context?.requestId || this.generateRequestId(),
            timestamp: context?.timestamp || new Date()
        };
    }
    /**
     * Execute service operation with error handling and logging
     */
    async execute(operation, operationName) {
        const startTime = Date.now();
        try {
            console.log(`[${operationName}] Starting operation`, {
                requestId: this.context.requestId,
                userId: this.context.userId,
                campusId: this.context.campusId
            });
            const result = await operation();
            const duration = Date.now() - startTime;
            if (result.isSuccess) {
                console.log(`[${operationName}] Completed successfully`, {
                    requestId: this.context.requestId,
                    duration
                });
            }
            else {
                console.error(`[${operationName}] Failed`, {
                    requestId: this.context.requestId,
                    error: result.error,
                    duration
                });
            }
            return result;
        }
        catch (error) {
            const duration = Date.now() - startTime;
            console.error(`[${operationName}] Unexpected error`, {
                requestId: this.context.requestId,
                error,
                duration
            });
            return domain_1.Result.fail(`${operationName} failed: ${error}`);
        }
    }
    /**
     * Validate user context is present
     */
    validateUserContext() {
        if (!this.context.userId) {
            return domain_1.Result.fail('User context is required for this operation');
        }
        return domain_1.Result.ok();
    }
    /**
     * Save aggregate and automatically dispatch its domain events
     * This ensures events are published after successful persistence
     *
     * Usage:
     * await this.saveAndDispatchEvents(profile, (p) => this.profileRepo.save(p));
     */
    async saveAndDispatchEvents(aggregate, saveFn) {
        // First, save the aggregate
        const saveResult = await saveFn(aggregate);
        if (saveResult.isFailure) {
            return saveResult;
        }
        // If save successful, dispatch domain events
        try {
            await event_dispatcher_1.EventDispatcher.dispatchEventsForAggregate(aggregate);
        }
        catch (error) {
            console.error('[BaseService] Failed to dispatch events:', error);
            // Don't fail the operation - event dispatch failure should not rollback the save
            // Events can be reprocessed via event sourcing if needed
        }
        return domain_1.Result.ok();
    }
    /**
     * Save multiple aggregates and dispatch all their events
     */
    async saveAllAndDispatchEvents(aggregates, saveFn) {
        // First, save all aggregates
        const saveResult = await saveFn(aggregates);
        if (saveResult.isFailure) {
            return saveResult;
        }
        // If save successful, dispatch all domain events
        try {
            await event_dispatcher_1.EventDispatcher.dispatchEventsForAggregates(aggregates);
        }
        catch (error) {
            console.error('[BaseService] Failed to dispatch events:', error);
            // Don't fail the operation
        }
        return domain_1.Result.ok();
    }
    /**
     * Generate unique request ID for tracking
     */
    generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
exports.BaseApplicationService = BaseApplicationService;
/**
 * Common service errors
 */
class ServiceError extends Error {
    constructor(message, code, context) {
        super(message);
        this.code = code;
        this.context = context;
        this.name = 'ServiceError';
    }
    static unauthorized(message = 'Unauthorized') {
        return new ServiceError(message, 'UNAUTHORIZED');
    }
    static notFound(resource) {
        return new ServiceError(`${resource} not found`, 'NOT_FOUND', { resource });
    }
    static validationFailed(errors) {
        return new ServiceError('Validation failed', 'VALIDATION_FAILED', { errors });
    }
    static conflict(message) {
        return new ServiceError(message, 'CONFLICT');
    }
    static rateLimit() {
        return new ServiceError('Rate limit exceeded', 'RATE_LIMIT_EXCEEDED');
    }
}
exports.ServiceError = ServiceError;
//# sourceMappingURL=base.service.js.map