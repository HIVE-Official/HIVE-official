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

export abstract class BaseApplicationService {
  protected context: ApplicationServiceContext;

  constructor(context?: Partial<ApplicationServiceContext>) {
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
  protected async execute<T>(
    operation: () => Promise<Result<T>>,
    operationName: string
  ): Promise<Result<T>> {
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
      } else {
        console.error(`[${operationName}] Failed`, {
          requestId: this.context.requestId,
          error: result.error,
          duration
        });
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[${operationName}] Unexpected error`, {
        requestId: this.context.requestId,
        error,
        duration
      });

      return Result.fail<T>(`${operationName} failed: ${error}`);
    }
  }

  /**
   * Validate user context is present
   */
  protected validateUserContext(): Result<void> {
    if (!this.context.userId) {
      return Result.fail<void>('User context is required for this operation');
    }
    return Result.ok<void>();
  }

  /**
   * Generate unique request ID for tracking
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
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
export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly context?: any
  ) {
    super(message);
    this.name = 'ServiceError';
  }

  static unauthorized(message = 'Unauthorized'): ServiceError {
    return new ServiceError(message, 'UNAUTHORIZED');
  }

  static notFound(resource: string): ServiceError {
    return new ServiceError(`${resource} not found`, 'NOT_FOUND', { resource });
  }

  static validationFailed(errors: any): ServiceError {
    return new ServiceError('Validation failed', 'VALIDATION_FAILED', { errors });
  }

  static conflict(message: string): ServiceError {
    return new ServiceError(message, 'CONFLICT');
  }

  static rateLimit(): ServiceError {
    return new ServiceError('Rate limit exceeded', 'RATE_LIMIT_EXCEEDED');
  }
}