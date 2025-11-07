/**
 * Transaction manager for ensuring consistency across Firestore operations
 * Handles complex multi-step operations with proper rollback and error handling
 */

import { dbAdmin } from './firebase-admin';
import { Transaction, WriteBatch } from 'firebase-admin/firestore';
import { logger } from './structured-logger';

/**
 * Transaction operation interface
 */
export interface TransactionOperation {
  id: string;
  description: string;
  execute: (_transaction: Transaction) => Promise<any>;
  rollback?: (_transaction: Transaction) => Promise<void>;
}

/**
 * Batch operation interface
 */
export interface BatchOperation {
  id: string;
  description: string;
  execute: (_batch: WriteBatch) => void;
}

/**
 * Transaction result interface
 */
export interface TransactionResult<T = any> {
  success: boolean;
  data?: T;
  error?: Error;
  operationsCompleted: string[];
  operationsFailed: string[];
  duration: number;
}

/**
 * Transaction manager configuration
 */
interface TransactionConfig {
  maxRetries?: number;
  timeoutMs?: number;
  logOperations?: boolean;
  isolationLevel?: 'strict' | 'loose';
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: Required<TransactionConfig> = {
  maxRetries: 3,
  timeoutMs: 30000, // 30 seconds
  logOperations: true,
  isolationLevel: 'strict'
};

/**
 * Transaction manager class
 */
export class TransactionManager {
  private config: Required<TransactionConfig>;
  
  constructor(config: TransactionConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Execute a series of operations in a single transaction
   */
  async executeTransaction<T>(
    operations: TransactionOperation[],
    context?: { userId?: string; requestId?: string; operation?: string }
  ): Promise<TransactionResult<T>> {
    const startTime = Date.now();
    const operationsCompleted: string[] = [];
    const operationsFailed: string[] = [];
    
    if (this.config.logOperations) {
      await logger.info('Starting transaction', {
        operation: context?.operation || 'unknown',
        userId: context?.userId,
        requestId: context?.requestId,
        operationCount: operations.length,
        operations: operations.map(op => ({ id: op.id, description: op.description }))
      });
    }

    let attempt = 0;
    while (attempt < this.config.maxRetries) {
      attempt++;
      
      try {
        const result = await this.executeTransactionAttempt(
          operations,
          operationsCompleted,
          operationsFailed,
          context
        );
        
        const duration = Date.now() - startTime;
        
        if (this.config.logOperations) {
          await logger.info('Transaction completed successfully', {
            operation: context?.operation || 'unknown',
            userId: context?.userId,
            requestId: context?.requestId,
            duration,
            attempt,
            operationsCompleted
          });
        }
        
        return {
          success: true,
          data: result as T,
          operationsCompleted,
          operationsFailed,
          duration
        };
        
      } catch (error) {
        const isRetriable = this.isRetriableError(error);
        const shouldRetry = attempt < this.config.maxRetries && isRetriable;
        
        if (this.config.logOperations) {
          await logger.warn('Transaction attempt failed', {
            operation: context?.operation || 'unknown',
            userId: context?.userId,
            requestId: context?.requestId,
            attempt,
            error: error instanceof Error ? error.message : String(error),
            isRetriable,
            metadata: { shouldRetry },
            operationsCompleted,
            operationsFailed
          });
        }
        
        if (!shouldRetry) {
          const duration = Date.now() - startTime;
          
          if (this.config.logOperations) {
            await logger.error('Transaction failed permanently', {
              operation: context?.operation || 'unknown',
              userId: context?.userId,
              requestId: context?.requestId,
              duration,
              attempts: attempt,
              operationsCompleted,
              operationsFailed
            }, error instanceof Error ? error : new Error(String(error)));
          }
          
          return {
            success: false,
            error: error instanceof Error ? error : new Error(String(error)),
            operationsCompleted,
            operationsFailed,
            duration
          };
        }
        
        // Wait before retry with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // This should never be reached, but TypeScript requires it
    return {
      success: false,
      error: new Error('Transaction failed after maximum retries'),
      operationsCompleted,
      operationsFailed,
      duration: Date.now() - startTime
    };
  }

  /**
   * Execute a single transaction attempt
   */
  private async executeTransactionAttempt<T>(
    operations: TransactionOperation[],
    operationsCompleted: string[],
    operationsFailed: string[],
    context?: { userId?: string; requestId?: string; operation?: string }
  ): Promise<T> {
    return dbAdmin.runTransaction(async (transaction) => {
      const results: any[] = [];
      
      // Set transaction timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Transaction timeout')), this.config.timeoutMs);
      });
      
      const transactionPromise = (async () => {
        for (const operation of operations) {
          try {
            if (this.config.logOperations) {
              await logger.debug('Executing transaction operation', {
                operation: context?.operation || 'unknown',
                userId: context?.userId,
                requestId: context?.requestId,
                operationId: operation.id,
                operationDescription: operation.description
              });
            }
            
            const result = await operation.execute(transaction);
            results.push(result);
            
            if (!operationsCompleted.includes(operation.id)) {
              operationsCompleted.push(operation.id);
            }
            
            // Remove from failed list if it was there
            const failedIndex = operationsFailed.indexOf(operation.id);
            if (failedIndex > -1) {
              operationsFailed.splice(failedIndex, 1);
            }
            
          } catch (error) {
            if (!operationsFailed.includes(operation.id)) {
              operationsFailed.push(operation.id);
            }
            
            if (this.config.logOperations) {
              await logger.error('Transaction operation failed', {
                operation: context?.operation || 'unknown',
                userId: context?.userId,
                requestId: context?.requestId,
                operationId: operation.id,
                operationDescription: operation.description
              }, error instanceof Error ? error : new Error(String(error)));
            }
            
            throw error;
          }
        }
        
        return results.length === 1 ? results[0] : results;
      })();
      
      return Promise.race([transactionPromise, timeoutPromise]) as Promise<T>;
    });
  }

  /**
   * Execute operations in a batch (non-transactional but atomic)
   */
  async executeBatch(
    operations: BatchOperation[],
    context?: { userId?: string; requestId?: string; operation?: string }
  ): Promise<TransactionResult<void>> {
    const startTime = Date.now();
    const operationsCompleted: string[] = [];
    const operationsFailed: string[] = [];
    
    if (this.config.logOperations) {
      await logger.info('Starting batch operation', {
        operation: context?.operation || 'unknown',
        userId: context?.userId,
        requestId: context?.requestId,
        operationCount: operations.length,
        operations: operations.map(op => ({ id: op.id, description: op.description }))
      });
    }
    
    try {
      const batch = dbAdmin.batch();
      
      for (const operation of operations) {
        try {
          operation.execute(batch);
          operationsCompleted.push(operation.id);
        } catch (error) {
          operationsFailed.push(operation.id);
          throw error;
        }
      }
      
      await batch.commit();
      
      const duration = Date.now() - startTime;
      
      if (this.config.logOperations) {
        await logger.info('Batch operation completed successfully', {
          operation: context?.operation || 'unknown',
          userId: context?.userId,
          requestId: context?.requestId,
          duration,
          operationsCompleted
        });
      }
      
      return {
        success: true,
        operationsCompleted,
        operationsFailed,
        duration
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      
      if (this.config.logOperations) {
        await logger.error('Batch operation failed', {
          operation: context?.operation || 'unknown',
          userId: context?.userId,
          requestId: context?.requestId,
          duration,
          operationsCompleted,
          operationsFailed
        }, error instanceof Error ? error : new Error(String(error)));
      }
      
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
        operationsCompleted,
        operationsFailed,
        duration
      };
    }
  }

  /**
   * Check if an error is retriable
   */
  private isRetriableError(error: any): boolean {
    if (!error) return false;
    
    const errorMessage = error.message || error.toString();
    const errorCode = error.code;
    
    // Firestore retriable errors
    const retriableCodes = [
      'aborted',
      'cancelled',
      'deadline-exceeded',
      'internal',
      'resource-exhausted',
      'unavailable'
    ];
    
    const retriableMessages = [
      'transaction aborted',
      'too much contention',
      'deadline exceeded',
      'service unavailable',
      'internal error'
    ];
    
    return (
      retriableCodes.includes(errorCode) ||
      retriableMessages.some(msg => errorMessage.toLowerCase().includes(msg))
    );
  }
}

/**
 * Default transaction manager instance
 */
export const transactionManager = new TransactionManager();

/**
 * Specialized transaction managers for different use cases
 */
export const strictTransactionManager = new TransactionManager({
  isolationLevel: 'strict',
  maxRetries: 5,
  timeoutMs: 60000 // 1 minute for complex operations
});

export const quickTransactionManager = new TransactionManager({
  maxRetries: 1,
  timeoutMs: 10000, // 10 seconds for simple operations
  logOperations: false
});

/**
 * Utility function for common onboarding transaction
 */
export async function executeOnboardingTransaction(
  userId: string,
  userEmail: string,
  onboardingData: any,
  normalizedHandle: string,
  context?: { requestId?: string }
): Promise<TransactionResult<{ updatedUserData: any; normalizedHandle: string }>> {
  const operations: TransactionOperation[] = [
    {
      id: 'validate_user_exists',
      description: 'Check if user exists and can be onboarded',
      execute: async (transaction) => {
        const userDoc = await transaction.get(dbAdmin.collection('users').doc(userId));
        
        if (!userDoc.exists) {
          throw new Error('User not found');
        }
        
        const userData = userDoc.data();
        if (!userData) {
          throw new Error('User data not found');
        }
        
        if (userData.handle) {
          throw new Error('Onboarding already completed');
        }
        
        return userData;
      }
    },
    {
      id: 'validate_handle_availability',
      description: 'Check if handle is available',
      execute: async (transaction) => {
        const { checkHandleAvailabilityInTransaction } = await import('./handle-service');
        return checkHandleAvailabilityInTransaction(transaction, normalizedHandle);
      }
    },
    {
      id: 'update_user_profile',
      description: 'Update user profile with onboarding data',
      execute: async (transaction) => {
        const now = new Date();
        
        const updatedUserData = {
          // Core identity fields
          fullName: onboardingData.fullName,
          handle: normalizedHandle,
          avatarUrl: onboardingData.avatarUrl || '',

          // Name fields
          firstName: onboardingData.firstName,
          lastName: onboardingData.lastName,

          // Academic information
          userType: onboardingData.userType,
          major: onboardingData.major,
          academicLevel: onboardingData.academicLevel,
          academicYear: onboardingData.academicYear || onboardingData.academicLevel, // Map academicLevel to academicYear
          graduationYear: onboardingData.graduationYear,
          schoolId: onboardingData.schoolId || 'ub-buffalo', // Default to UB for launch

          // Personal information (set defaults for missing fields)
          bio: onboardingData.bio || '',
          statusMessage: onboardingData.statusMessage || '',
          interests: onboardingData.interests || [],
          housing: onboardingData.housing || '',
          pronouns: onboardingData.pronouns || '',

          // Privacy settings (set sensible defaults)
          isPublic: onboardingData.isPublic !== undefined ? onboardingData.isPublic : true,
          showActivity: true,
          showSpaces: true,
          showConnections: true,
          allowDirectMessages: true,
          showOnlineStatus: true,
          ghostMode: {
            enabled: false,
            level: 'minimal'
          },

          // Builder information
          builderRequestSpaces: onboardingData.builderRequestSpaces,
          builderOptIn: onboardingData.builderOptIn || (onboardingData.builderRequestSpaces && onboardingData.builderRequestSpaces.length > 0),
          isBuilder: false, // Will be set to true after builder approval

          // Verification and timestamps
          consentGiven: onboardingData.consentGiven,
          consentGivenAt: now,
          onboardingCompletedAt: now,
          onboardingCompleted: true,
          emailVerified: true, // Set to true since they went through magic link auth
          profileVerified: false, // Admin will verify later
          accountStatus: 'active',
          updatedAt: now,
        };
        
        transaction.update(
          dbAdmin.collection('users').doc(userId),
          updatedUserData as any
        );
        
        return updatedUserData;
      }
    },
    {
      id: 'reserve_handle',
      description: 'Reserve the handle in handles collection',
      execute: async (transaction) => {
        const { reserveHandleInTransaction } = await import('./handle-service');
        return reserveHandleInTransaction(transaction, normalizedHandle, userId, userEmail);
      }
    }
  ];
  
  return strictTransactionManager.executeTransaction(operations, {
    userId,
    requestId: context?.requestId,
    operation: 'complete_onboarding'
  });
}

/**
 * Utility function for builder request creation (separate from main transaction)
 */
export async function executeBuilderRequestCreation(
  userId: string,
  userEmail: string,
  userName: string,
  spaceIds: string[],
  userType: 'student' | 'alumni' | 'faculty',
  context?: { requestId?: string }
): Promise<TransactionResult<void>> {
  const operations: BatchOperation[] = [];
  
  for (const spaceId of spaceIds) {
    operations.push({
      id: `builder_request_${spaceId}`,
      description: `Create builder request for space ${spaceId}`,
      execute: (batch) => {
        const now = new Date();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const requestId = `${userId}_${spaceId}_${Date.now()}`;
        
        const builderRequest = {
          id: requestId,
          userId,
          userName,
          userEmail,
          userType,
          spaceId,
          requestReason: userType === 'faculty' ? 'Faculty management access request' : 'Builder access request',
          status: 'pending' as const,
          submittedAt: now,
          expiresAt: expiresAt,
          metadata: {
            onboardingRequest: true,
            submissionSource: 'onboarding_flow'
          }
        };
        
        batch.set(
          dbAdmin.collection('builderRequests').doc(requestId),
          builderRequest
        );
      }
    });
  }
  
  return transactionManager.executeBatch(operations, {
    userId,
    requestId: context?.requestId,
    operation: 'create_builder_requests'
  });
}

/**
 * Error types for transaction operations
 */
export class TransactionError extends Error {
  constructor(
    message: string,
    public readonly _operation: string,
    public readonly _cause?: Error
  ) {
    super(message);
    this.name = 'TransactionError';
  }
}

export class TransactionTimeoutError extends TransactionError {
  constructor(operation: string, timeoutMs: number) {
    super(`Transaction timed out after ${timeoutMs}ms`, operation);
    this.name = 'TransactionTimeoutError';
  }
}

export class TransactionRetryError extends TransactionError {
  constructor(operation: string, attempts: number, cause?: Error) {
    super(`Transaction failed after ${attempts} attempts`, operation, cause);
    this.name = 'TransactionRetryError';
  }
}
import 'server-only';
