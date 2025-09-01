/**
 * Database Resilience System for HIVE Platform
 * 
 * Provides comprehensive error handling, retry logic, and recovery mechanisms
 * for Firestore operations with proper error classification and circuit breakers.
 */

import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { StandardizedApiResponse } from '@/lib/api-error-standardizer';
import { ErrorCodes } from '@/lib/api-response-types';

/**
 * Database operation types for specific error handling
 */
export enum DatabaseOperation {
  READ = 'READ',
  WRITE = 'WRITE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  BATCH = 'BATCH',
  TRANSACTION = 'TRANSACTION',
  QUERY = 'QUERY'
}

/**
 * Database error types with proper classification
 */
export enum DatabaseErrorType {
  // Network and Connectivity
  NETWORK_UNAVAILABLE = 'NETWORK_UNAVAILABLE',
  CONNECTION_TIMEOUT = 'CONNECTION_TIMEOUT',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  
  // Resource Issues
  RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  
  // Data Issues
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  INVALID_ARGUMENT = 'INVALID_ARGUMENT',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  
  // Concurrency Issues
  ABORTED = 'ABORTED',
  FAILED_PRECONDITION = 'FAILED_PRECONDITION',
  OUT_OF_RANGE = 'OUT_OF_RANGE',
  
  // System Issues
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATA_LOSS = 'DATA_LOSS',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  DEADLINE_EXCEEDED = 'DEADLINE_EXCEEDED',
  
  // Application Level
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  BUSINESS_LOGIC_ERROR = 'BUSINESS_LOGIC_ERROR'
}

/**
 * Database error recovery strategies
 */
export interface DatabaseErrorRecovery {
  canRetry: boolean;
  maxRetries: number;
  retryDelayMs: number;
  exponentialBackoff: boolean;
  fallbackStrategy?: 'cache' | 'default' | 'fail';
  suggestedActions: string[];
  requiresManualIntervention: boolean;
}

/**
 * Enhanced database error with recovery information
 */
export class DatabaseError extends Error {
  public readonly errorType: DatabaseErrorType;
  public readonly operation: DatabaseOperation;
  public readonly recovery: DatabaseErrorRecovery;
  public readonly originalError: unknown;
  public readonly context: Record<string, any>;
  public readonly isRetryable: boolean;
  public readonly isTransient: boolean;

  constructor(
    errorType: DatabaseErrorType,
    message: string,
    operation: DatabaseOperation,
    originalError?: unknown,
    context: Record<string, any> = {}
  ) {
    super(message);
    this.name = 'DatabaseError';
    this.errorType = errorType;
    this.operation = operation;
    this.originalError = originalError;
    this.context = context;
    
    // Determine recovery strategy based on error type
    this.recovery = this.getRecoveryStrategy(errorType);
    this.isRetryable = this.recovery.canRetry;
    this.isTransient = this.isTransientError(errorType);
  }

  private getRecoveryStrategy(errorType: DatabaseErrorType): DatabaseErrorRecovery {
    switch (errorType) {
      case DatabaseErrorType.NETWORK_UNAVAILABLE:
      case DatabaseErrorType.CONNECTION_TIMEOUT:
      case DatabaseErrorType.SERVICE_UNAVAILABLE:
        return {
          canRetry: true,
          maxRetries: 3,
          retryDelayMs: 1000,
          exponentialBackoff: true,
          fallbackStrategy: 'cache',
          suggestedActions: ['Check network connectivity', 'Try again in a moment'],
          requiresManualIntervention: false
        };

      case DatabaseErrorType.TOO_MANY_REQUESTS:
      case DatabaseErrorType.RESOURCE_EXHAUSTED:
        return {
          canRetry: true,
          maxRetries: 2,
          retryDelayMs: 5000,
          exponentialBackoff: true,
          suggestedActions: ['Reduce request frequency', 'Try again later'],
          requiresManualIntervention: false
        };

      case DatabaseErrorType.ABORTED:
      case DatabaseErrorType.FAILED_PRECONDITION:
        return {
          canRetry: true,
          maxRetries: 2,
          retryDelayMs: 500,
          exponentialBackoff: false,
          suggestedActions: ['Retry transaction', 'Check data consistency'],
          requiresManualIntervention: false
        };

      case DatabaseErrorType.DOCUMENT_NOT_FOUND:
        return {
          canRetry: false,
          maxRetries: 0,
          retryDelayMs: 0,
          exponentialBackoff: false,
          suggestedActions: ['Verify resource exists', 'Check request parameters'],
          requiresManualIntervention: true
        };

      case DatabaseErrorType.PERMISSION_DENIED:
      case DatabaseErrorType.UNAUTHENTICATED:
        return {
          canRetry: false,
          maxRetries: 0,
          retryDelayMs: 0,
          exponentialBackoff: false,
          suggestedActions: ['Check permissions', 'Re-authenticate'],
          requiresManualIntervention: true
        };

      case DatabaseErrorType.QUOTA_EXCEEDED:
      case DatabaseErrorType.DATA_LOSS:
        return {
          canRetry: false,
          maxRetries: 0,
          retryDelayMs: 0,
          exponentialBackoff: false,
          fallbackStrategy: 'fail',
          suggestedActions: ['Contact system administrator', 'Check service limits'],
          requiresManualIntervention: true
        };

      default:
        return {
          canRetry: false,
          maxRetries: 0,
          retryDelayMs: 0,
          exponentialBackoff: false,
          suggestedActions: ['Report this error', 'Try again later'],
          requiresManualIntervention: true
        };
    }
  }

  private isTransientError(errorType: DatabaseErrorType): boolean {
    return [
      DatabaseErrorType.NETWORK_UNAVAILABLE,
      DatabaseErrorType.CONNECTION_TIMEOUT,
      DatabaseErrorType.SERVICE_UNAVAILABLE,
      DatabaseErrorType.TOO_MANY_REQUESTS,
      DatabaseErrorType.RESOURCE_EXHAUSTED,
      DatabaseErrorType.ABORTED,
      DatabaseErrorType.DEADLINE_EXCEEDED
    ].includes(errorType);
  }
}

/**
 * Circuit breaker for database operations
 */
class DatabaseCircuitBreaker {
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  private readonly maxFailures: number = 5;
  private readonly resetTimeoutMs: number = 60000; // 1 minute
  private readonly monitorWindowMs: number = 300000; // 5 minutes

  canExecute(): boolean {
    const now = Date.now();
    
    switch (this.state) {
      case 'CLOSED':
        return true;
        
      case 'OPEN':
        if (now - this.lastFailureTime >= this.resetTimeoutMs) {
          this.state = 'HALF_OPEN';
          return true;
        }
        return false;
        
      case 'HALF_OPEN':
        return true;
        
      default:
        return false;
    }
  }

  onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.maxFailures) {
      this.state = 'OPEN';
      logger.warn('🚨 Database circuit breaker opened', {
        failures: this.failures,
        maxFailures: this.maxFailures
      });
    } else if (this.state === 'HALF_OPEN') {
      this.state = 'OPEN';
    }
  }

  getState() {
    return {
      state: this.state,
      failures: this.failures,
      canExecute: this.canExecute()
    };
  }
}

/**
 * Database operation configuration
 */
export interface DatabaseOperationConfig {
  operation: DatabaseOperation;
  context?: Record<string, any>;
  maxRetries?: number;
  retryDelayMs?: number;
  timeoutMs?: number;
  enableCircuitBreaker?: boolean;
  fallbackValue?: any;
  description?: string;
}

/**
 * Resilient Database Operations Manager
 */
export class ResilientDatabase {
  private static circuitBreaker = new DatabaseCircuitBreaker();

  /**
   * Execute a database operation with comprehensive error handling
   */
  static async executeOperation<T>(
    operation: () => Promise<T>,
    config: DatabaseOperationConfig
  ): Promise<T> {
    const {
      operation: operationType,
      context = {},
      maxRetries = 3,
      retryDelayMs = 1000,
      timeoutMs = 30000,
      enableCircuitBreaker = true,
      fallbackValue,
      description = 'database operation'
    } = config;

    // Check circuit breaker
    if (enableCircuitBreaker && !this.circuitBreaker.canExecute()) {
      logger.warn('🔒 Database circuit breaker is open', {
        operation: operationType,
        circuitState: this.circuitBreaker.getState()
      });
      
      if (fallbackValue !== undefined) {
        return fallbackValue;
      }
      
      throw new DatabaseError(
        DatabaseErrorType.SERVICE_UNAVAILABLE,
        'Database service temporarily unavailable (circuit breaker open)',
        operationType,
        undefined,
        { ...context, circuitBreakerState: this.circuitBreaker.getState() }
      );
    }

    let lastError: unknown;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        // Add timeout to operation
        const result = await Promise.race([
          operation(),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Operation timeout')), timeoutMs)
          )
        ]);

        // Success - reset circuit breaker
        if (enableCircuitBreaker) {
          this.circuitBreaker.onSuccess();
        }

        // Log successful operation for monitoring
        if (attempt > 0) {
          logger.info('✅ Database operation succeeded after retry', {
            operation: operationType,
            attempt: attempt + 1,
            description
          });
        }

        return result;

      } catch (error: unknown) {
        lastError = error;
        attempt++;

        // Classify the error
        const dbError = this.classifyError(error, operationType, context);

        // Log the error attempt
        logger.warn(`🔄 Database operation failed (attempt ${attempt}/${maxRetries + 1})`, {
          operation: operationType,
          errorType: dbError.errorType,
          isRetryable: dbError.isRetryable,
          attempt,
          description,
          error: error instanceof Error ? error.message : 'Unknown error'
        });

        // If this is the last attempt or error is not retryable
        if (attempt > maxRetries || !dbError.isRetryable) {
          // Update circuit breaker on persistent failure
          if (enableCircuitBreaker && dbError.isTransient) {
            this.circuitBreaker.onFailure();
          }

          // Log final failure
          logger.error('❌ Database operation failed permanently', {
            operation: operationType,
            errorType: dbError.errorType,
            totalAttempts: attempt,
            description,
            circuitBreakerState: enableCircuitBreaker ? this.circuitBreaker.getState() : null
          });

          // Return fallback value if available
          if (fallbackValue !== undefined && dbError.recovery.fallbackStrategy !== 'fail') {
            logger.info('🔄 Returning fallback value for failed operation', {
              operation: operationType,
              description
            });
            return fallbackValue;
          }

          throw dbError;
        }

        // Calculate retry delay with exponential backoff
        const delay = dbError.recovery.exponentialBackoff 
          ? retryDelayMs * Math.pow(2, attempt - 1)
          : retryDelayMs;

        logger.info(`⏱️ Retrying database operation in ${delay}ms`, {
          operation: operationType,
          attempt: attempt + 1,
          delay
        });

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // This should never be reached, but just in case
    throw this.classifyError(lastError, operationType, context);
  }

  /**
   * Classify Firestore errors into our error types
   */
  private static classifyError(
    error: unknown,
    operation: DatabaseOperation,
    context: Record<string, any>
  ): DatabaseError {
    if (error instanceof DatabaseError) {
      return error;
    }

    // Handle Firestore-specific errors
    if (error && typeof error === 'object' && 'code' in error) {
      const firestoreError = error as { code: string; message: string };
      
      switch (firestoreError.code) {
        case 'not-found':
          return new DatabaseError(
            DatabaseErrorType.DOCUMENT_NOT_FOUND,
            'Document not found',
            operation,
            error,
            context
          );

        case 'permission-denied':
          return new DatabaseError(
            DatabaseErrorType.PERMISSION_DENIED,
            'Permission denied',
            operation,
            error,
            context
          );

        case 'already-exists':
          return new DatabaseError(
            DatabaseErrorType.ALREADY_EXISTS,
            'Document already exists',
            operation,
            error,
            context
          );

        case 'resource-exhausted':
          return new DatabaseError(
            DatabaseErrorType.RESOURCE_EXHAUSTED,
            'Resource exhausted',
            operation,
            error,
            context
          );

        case 'failed-precondition':
          return new DatabaseError(
            DatabaseErrorType.FAILED_PRECONDITION,
            'Failed precondition',
            operation,
            error,
            context
          );

        case 'aborted':
          return new DatabaseError(
            DatabaseErrorType.ABORTED,
            'Operation aborted',
            operation,
            error,
            context
          );

        case 'out-of-range':
          return new DatabaseError(
            DatabaseErrorType.OUT_OF_RANGE,
            'Out of range',
            operation,
            error,
            context
          );

        case 'unimplemented':
        case 'internal':
          return new DatabaseError(
            DatabaseErrorType.INTERNAL_ERROR,
            'Internal database error',
            operation,
            error,
            context
          );

        case 'unavailable':
          return new DatabaseError(
            DatabaseErrorType.SERVICE_UNAVAILABLE,
            'Database service unavailable',
            operation,
            error,
            context
          );

        case 'data-loss':
          return new DatabaseError(
            DatabaseErrorType.DATA_LOSS,
            'Data loss detected',
            operation,
            error,
            context
          );

        case 'unauthenticated':
          return new DatabaseError(
            DatabaseErrorType.UNAUTHENTICATED,
            'Unauthenticated',
            operation,
            error,
            context
          );

        case 'deadline-exceeded':
          return new DatabaseError(
            DatabaseErrorType.DEADLINE_EXCEEDED,
            'Operation timeout',
            operation,
            error,
            context
          );

        case 'cancelled':
          return new DatabaseError(
            DatabaseErrorType.ABORTED,
            'Operation cancelled',
            operation,
            error,
            context
          );

        case 'invalid-argument':
          return new DatabaseError(
            DatabaseErrorType.INVALID_ARGUMENT,
            'Invalid argument',
            operation,
            error,
            context
          );

        default:
          return new DatabaseError(
            DatabaseErrorType.INTERNAL_ERROR,
            firestoreError.message || 'Unknown database error',
            operation,
            error,
            context
          );
      }
    }

    // Handle timeout errors
    if (error instanceof Error && error.message.includes('timeout')) {
      return new DatabaseError(
        DatabaseErrorType.DEADLINE_EXCEEDED,
        'Database operation timeout',
        operation,
        error,
        context
      );
    }

    // Handle network errors
    if (error instanceof Error && (
      error.message.includes('network') ||
      error.message.includes('connection') ||
      error.message.includes('ENOTFOUND') ||
      error.message.includes('ECONNREFUSED')
    )) {
      return new DatabaseError(
        DatabaseErrorType.NETWORK_UNAVAILABLE,
        'Network connection error',
        operation,
        error,
        context
      );
    }

    // Default to internal error
    const message = error instanceof Error ? error.message : 'Unknown database error';
    return new DatabaseError(
      DatabaseErrorType.INTERNAL_ERROR,
      message,
      operation,
      error,
      context
    );
  }

  /**
   * Create standardized API response from database error
   */
  static createErrorResponse(error: DatabaseError) {
    const isClientSafe = !error.recovery.requiresManualIntervention;
    
    // Map database error types to HTTP status codes
    const statusCode = this.getHttpStatusCode(error.errorType);
    const errorCode = this.getErrorCode(error.errorType);
    
    const responseDetails: any = {
      errorType: error.errorType,
      operation: error.operation,
      canRetry: error.recovery.canRetry,
      suggestedActions: error.recovery.suggestedActions
    };

    if (error.recovery.canRetry) {
      responseDetails.maxRetries = error.recovery.maxRetries;
      responseDetails.retryDelayMs = error.recovery.retryDelayMs;
    }

    return StandardizedApiResponse.error(
      error.message,
      errorCode,
      statusCode,
      isClientSafe ? responseDetails : { errorType: error.errorType }
    );
  }

  private static getHttpStatusCode(errorType: DatabaseErrorType): number {
    switch (errorType) {
      case DatabaseErrorType.DOCUMENT_NOT_FOUND:
        return 404;
      case DatabaseErrorType.PERMISSION_DENIED:
      case DatabaseErrorType.UNAUTHENTICATED:
        return 403;
      case DatabaseErrorType.ALREADY_EXISTS:
        return 409;
      case DatabaseErrorType.INVALID_ARGUMENT:
      case DatabaseErrorType.VALIDATION_ERROR:
        return 400;
      case DatabaseErrorType.TOO_MANY_REQUESTS:
        return 429;
      case DatabaseErrorType.SERVICE_UNAVAILABLE:
      case DatabaseErrorType.NETWORK_UNAVAILABLE:
        return 503;
      case DatabaseErrorType.QUOTA_EXCEEDED:
        return 402;
      default:
        return 500;
    }
  }

  private static getErrorCode(errorType: DatabaseErrorType): string {
    switch (errorType) {
      case DatabaseErrorType.DOCUMENT_NOT_FOUND:
        return ErrorCodes.NOT_FOUND;
      case DatabaseErrorType.PERMISSION_DENIED:
      case DatabaseErrorType.UNAUTHENTICATED:
        return ErrorCodes.FORBIDDEN;
      case DatabaseErrorType.ALREADY_EXISTS:
        return ErrorCodes.CONFLICT;
      case DatabaseErrorType.INVALID_ARGUMENT:
      case DatabaseErrorType.VALIDATION_ERROR:
        return ErrorCodes.INVALID_INPUT;
      case DatabaseErrorType.TOO_MANY_REQUESTS:
        return ErrorCodes.RATE_LIMIT_EXCEEDED;
      case DatabaseErrorType.SERVICE_UNAVAILABLE:
      case DatabaseErrorType.NETWORK_UNAVAILABLE:
        return ErrorCodes.SERVICE_UNAVAILABLE;
      default:
        return ErrorCodes.INTERNAL_ERROR;
    }
  }

  /**
   * Get circuit breaker status for monitoring
   */
  static getCircuitBreakerStatus() {
    return this.circuitBreaker.getState();
  }

  /**
   * Reset circuit breaker manually (for admin operations)
   */
  static resetCircuitBreaker() {
    this.circuitBreaker = new DatabaseCircuitBreaker();
    logger.info('🔄 Database circuit breaker reset manually');
  }
}

/**
 * Convenient wrapper functions for common database operations
 */
export class DatabaseOperations {
  /**
   * Read a single document with resilience
   */
  static async getDocument<T>(
    collection: string,
    docId: string,
    context?: Record<string, any>
  ): Promise<T | null> {
    return ResilientDatabase.executeOperation(
      async () => {
        const doc = await dbAdmin.collection(collection).doc(docId).get();
        return doc.exists ? (doc.data() as T) : null;
      },
      {
        operation: DatabaseOperation.READ,
        context: { collection, docId, ...context },
        description: `get document ${collection}/${docId}`
      }
    );
  }

  /**
   * Write a document with resilience
   */
  static async setDocument<T>(
    collection: string,
    docId: string,
    data: T,
    context?: Record<string, any>
  ): Promise<void> {
    return ResilientDatabase.executeOperation(
      async () => {
        await dbAdmin.collection(collection).doc(docId).set(data);
      },
      {
        operation: DatabaseOperation.WRITE,
        context: { collection, docId, ...context },
        description: `set document ${collection}/${docId}`
      }
    );
  }

  /**
   * Update a document with resilience
   */
  static async updateDocument<T>(
    collection: string,
    docId: string,
    updates: Partial<T>,
    context?: Record<string, any>
  ): Promise<void> {
    return ResilientDatabase.executeOperation(
      async () => {
        await dbAdmin.collection(collection).doc(docId).update(updates);
      },
      {
        operation: DatabaseOperation.UPDATE,
        context: { collection, docId, updateFields: Object.keys(updates), ...context },
        description: `update document ${collection}/${docId}`
      }
    );
  }

  /**
   * Delete a document with resilience
   */
  static async deleteDocument(
    collection: string,
    docId: string,
    context?: Record<string, any>
  ): Promise<void> {
    return ResilientDatabase.executeOperation(
      async () => {
        await dbAdmin.collection(collection).doc(docId).delete();
      },
      {
        operation: DatabaseOperation.DELETE,
        context: { collection, docId, ...context },
        description: `delete document ${collection}/${docId}`
      }
    );
  }

  /**
   * Execute a query with resilience
   */
  static async executeQuery<T>(
    queryFn: () => Promise<T>,
    context?: Record<string, any>
  ): Promise<T> {
    return ResilientDatabase.executeOperation(
      queryFn,
      {
        operation: DatabaseOperation.QUERY,
        context,
        description: 'execute database query'
      }
    );
  }

  /**
   * Execute a batch operation with resilience
   */
  static async executeBatch(
    batchFn: (batch: FirebaseFirestore.WriteBatch) => void,
    context?: Record<string, any>
  ): Promise<void> {
    return ResilientDatabase.executeOperation(
      async () => {
        const batch = dbAdmin.batch();
        batchFn(batch);
        await batch.commit();
      },
      {
        operation: DatabaseOperation.BATCH,
        context,
        maxRetries: 2, // Lower retries for batch operations
        description: 'execute batch operation'
      }
    );
  }

  /**
   * Execute a transaction with resilience
   */
  static async executeTransaction<T>(
    transactionFn: (transaction: FirebaseFirestore.Transaction) => Promise<T>,
    context?: Record<string, any>
  ): Promise<T> {
    return ResilientDatabase.executeOperation(
      async () => {
        return dbAdmin.runTransaction(transactionFn);
      },
      {
        operation: DatabaseOperation.TRANSACTION,
        context,
        maxRetries: 2, // Lower retries for transactions
        description: 'execute transaction'
      }
    );
  }
}