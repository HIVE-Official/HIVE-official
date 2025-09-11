import { NextResponse } from 'next/server';

/**
 * Error Recovery and Retry Mechanisms for HIVE Platform
 * Provides resilient error handling and automatic retry logic
 */

// Error types that can be retried
export enum RetryableError {
  NETWORK = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT_ERROR',
  RATE_LIMIT = 'RATE_LIMIT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  DATABASE = 'DATABASE_ERROR',
  TEMPORARY = 'TEMPORARY_ERROR'
}

// Error recovery configuration
export interface ErrorRecoveryConfig {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  timeout?: number;
  retryableErrors?: RetryableError[];
  onRetry?: (attempt: number, error: Error) => void;
  onError?: (error: Error) => void;
}

// Default configuration
const DEFAULT_CONFIG: Required<ErrorRecoveryConfig> = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  timeout: 30000,
  retryableErrors: [
    RetryableError.NETWORK,
    RetryableError.TIMEOUT,
    RetryableError.RATE_LIMIT,
    RetryableError.SERVER_ERROR,
    RetryableError.TEMPORARY
  ],
  onRetry: () => {},
  onError: () => {}
};

/**
 * Determines if an error is retryable
 */
export function isRetryableError(error: any, retryableErrors: RetryableError[]): boolean {
  // Network errors
  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
    return retryableErrors.includes(RetryableError.NETWORK);
  }
  
  // Timeout errors
  if (error.code === 'ETIMEDOUT' || error.message?.includes('timeout')) {
    return retryableErrors.includes(RetryableError.TIMEOUT);
  }
  
  // Rate limit errors
  if (error.status === 429 || error.code === 'RATE_LIMITED') {
    return retryableErrors.includes(RetryableError.RATE_LIMIT);
  }
  
  // Server errors (5xx)
  if (error.status >= 500 && error.status < 600) {
    return retryableErrors.includes(RetryableError.SERVER_ERROR);
  }
  
  // Database errors
  if (error.code?.startsWith('D') || error.message?.includes('database')) {
    return retryableErrors.includes(RetryableError.DATABASE);
  }
  
  // Temporary errors
  if (error.code === 'UNAVAILABLE' || error.temporary === true) {
    return retryableErrors.includes(RetryableError.TEMPORARY);
  }
  
  return false;
}

/**
 * Calculate exponential backoff delay
 */
export function calculateBackoffDelay(
  attempt: number,
  initialDelay: number,
  maxDelay: number,
  multiplier: number
): number {
  const delay = Math.min(initialDelay * Math.pow(multiplier, attempt - 1), maxDelay);
  // Add jitter to prevent thundering herd
  const jitter = Math.random() * 0.3 * delay;
  return Math.floor(delay + jitter);
}

/**
 * Retry wrapper for async functions
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: ErrorRecoveryConfig = {}
): Promise<T> {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  let lastError: Error | undefined;
  
  for (let attempt = 1; attempt <= mergedConfig.maxRetries; attempt++) {
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Operation timed out after ${mergedConfig.timeout}ms`));
        }, mergedConfig.timeout);
      });
      
      // Race between the function and timeout
      const result = await Promise.race([fn(), timeoutPromise]);
      return result as T;
      
    } catch (error: any) {
      lastError = error;
      
      // Check if error is retryable
      if (!isRetryableError(error, mergedConfig.retryableErrors)) {
        mergedConfig.onError(error);
        throw error;
      }
      
      // Check if we've exhausted retries
      if (attempt === mergedConfig.maxRetries) {
        mergedConfig.onError(error);
        throw error;
      }
      
      // Calculate delay for next retry
      const delay = calculateBackoffDelay(
        attempt,
        mergedConfig.initialDelay,
        mergedConfig.maxDelay,
        mergedConfig.backoffMultiplier
      );
      
      // Notify retry handler
      mergedConfig.onRetry(attempt, error);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError || new Error('Retry failed');
}

/**
 * Circuit breaker for preventing cascading failures
 */
export class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  constructor(
    private readonly threshold: number = 5,
    private readonly timeout: number = 60000,
    private readonly resetTimeout: number = 30000
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Check if circuit is open
    if (this.state === 'OPEN') {
      const now = Date.now();
      if (now - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      
      // Reset on success
      if (this.state === 'HALF_OPEN') {
        this.reset();
      }
      
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }
  
  private recordFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }
  
  private reset(): void {
    this.failureCount = 0;
    this.lastFailureTime = 0;
    this.state = 'CLOSED';
  }
  
  getState(): string {
    return this.state;
  }
}

/**
 * Error boundary for API routes
 */
export function withErrorBoundary(
  handler: (req: Request, context?: any) => Promise<Response>
) {
  return async (req: Request, context?: any): Promise<Response> => {
    try {
      return await handler(req, context);
    } catch (error: any) {
      console.error('API Error:', error);
      
      // Check for specific error types
      if (error.status === 429) {
        return NextResponse.json(
          { 
            error: 'Too Many Requests',
            message: 'Please slow down and try again later',
            retryAfter: 60
          },
          { 
            status: 429,
            headers: {
              'Retry-After': '60'
            }
          }
        );
      }
      
      if (error.status === 401) {
        return NextResponse.json(
          { 
            error: 'Unauthorized',
            message: 'Please sign in to continue'
          },
          { status: 401 }
        );
      }
      
      if (error.status === 403) {
        return NextResponse.json(
          { 
            error: 'Forbidden',
            message: 'You do not have permission to perform this action'
          },
          { status: 403 }
        );
      }
      
      if (error.status === 404) {
        return NextResponse.json(
          { 
            error: 'Not Found',
            message: 'The requested resource was not found'
          },
          { status: 404 }
        );
      }
      
      // Default error response
      return NextResponse.json(
        { 
          error: 'Internal Server Error',
          message: process.env.NODE_ENV === 'development' 
            ? error.message 
            : 'An unexpected error occurred'
        },
        { status: error.status || 500 }
      );
    }
  };
}

/**
 * Graceful degradation wrapper
 */
export async function withFallback<T>(
  primaryFn: () => Promise<T>,
  fallbackFn: () => Promise<T>,
  shouldUseFallback?: (error: any) => boolean
): Promise<T> {
  try {
    return await primaryFn();
  } catch (error: any) {
    console.warn('Primary function failed, using fallback:', error.message);
    
    if (shouldUseFallback && !shouldUseFallback(error)) {
      throw error;
    }
    
    return await fallbackFn();
  }
}

/**
 * Batch retry for multiple operations
 */
export async function batchRetry<T>(
  operations: (() => Promise<T>)[],
  config: ErrorRecoveryConfig = {}
): Promise<{ successful: T[]; failed: Error[] }> {
  const results = await Promise.allSettled(
    operations.map(op => withRetry(op, config))
  );
  
  const successful: T[] = [];
  const failed: Error[] = [];
  
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      successful.push(result.value);
    } else {
      failed.push(result.reason);
    }
  });
  
  return { successful, failed };
}

/**
 * Health check with automatic recovery
 */
export class HealthMonitor {
  private isHealthy = true;
  private lastCheckTime = 0;
  private consecutiveFailures = 0;
  
  constructor(
    private readonly healthCheck: () => Promise<boolean>,
    private readonly recoveryAction: () => Promise<void>,
    private readonly checkInterval: number = 30000,
    private readonly maxFailures: number = 3
  ) {
    this.startMonitoring();
  }
  
  private async startMonitoring(): Promise<void> {
    setInterval(async () => {
      try {
        const healthy = await this.healthCheck();
        
        if (healthy) {
          this.consecutiveFailures = 0;
          this.isHealthy = true;
        } else {
          this.handleFailure();
        }
      } catch (error) {
        this.handleFailure();
      }
      
      this.lastCheckTime = Date.now();
    }, this.checkInterval);
  }
  
  private async handleFailure(): Promise<void> {
    this.consecutiveFailures++;
    
    if (this.consecutiveFailures >= this.maxFailures) {
      this.isHealthy = false;
      console.error('Health check failed, attempting recovery...');
      
      try {
        await this.recoveryAction();
        this.consecutiveFailures = 0;
        this.isHealthy = true;
        console.log('Recovery successful');
      } catch (error) {
        console.error('Recovery failed:', error);
      }
    }
  }
  
  getStatus(): { healthy: boolean; lastCheck: number; failures: number } {
    return {
      healthy: this.isHealthy,
      lastCheck: this.lastCheckTime,
      failures: this.consecutiveFailures
    };
  }
}

/**
 * Request deduplication to prevent duplicate operations
 */
export class RequestDeduplicator {
  private pendingRequests = new Map<string, Promise<any>>();
  
  async execute<T>(
    key: string,
    fn: () => Promise<T>
  ): Promise<T> {
    // Check if request is already pending
    const pending = this.pendingRequests.get(key);
    if (pending) {
      return pending;
    }
    
    // Create new request
    const request = fn().finally(() => {
      this.pendingRequests.delete(key);
    });
    
    this.pendingRequests.set(key, request);
    return request;
  }
  
  clear(): void {
    this.pendingRequests.clear();
  }
}

// Export configured instances
export const apiCircuitBreaker = new CircuitBreaker();
export const requestDeduplicator = new RequestDeduplicator();

// Utility function for resilient API calls
export async function resilientFetch(
  url: string,
  options: RequestInit = {},
  retryConfig?: ErrorRecoveryConfig
): Promise<Response> {
  return withRetry(
    async () => {
      const response = await fetch(url, options);
      
      if (!response.ok && response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      return response;
    },
    retryConfig
  );
}