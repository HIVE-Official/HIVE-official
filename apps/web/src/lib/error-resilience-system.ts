import { z } from 'zod';

// Error Types and Classifications
export enum ErrorCategory {
  _NETWORK = 'network',
  _AUTHENTICATION = 'authentication', 
  _AUTHORIZATION = 'authorization',
  _VALIDATION = 'validation',
  _RATE_LIMIT = 'rate_limit',
  _SERVER_ERROR = 'server_error',
  _DATABASE = 'database',
  _INTEGRATION = 'integration',
  _UNKNOWN = 'unknown'
}

export enum ErrorSeverity {
  _LOW = 'low',
  _MEDIUM = 'medium',
  _HIGH = 'high',
  _CRITICAL = 'critical'
}

export interface HiveError {
  id: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
  spaceId?: string;
  endpoint?: string;
  userAgent?: string;
  retryable: boolean;
  retryCount?: number;
  maxRetries?: number;
  stack?: string;
}

// Retry Configuration
export interface RetryConfig {
  maxRetries: number;
  baseDelay: number; // ms
  maxDelay: number; // ms
  backoffMultiplier: number;
  jitter: boolean;
  retryableErrors: ErrorCategory[];
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 30000,
  backoffMultiplier: 2,
  jitter: true,
  retryableErrors: [
    ErrorCategory._NETWORK,
    ErrorCategory._RATE_LIMIT,
    ErrorCategory._SERVER_ERROR,
    ErrorCategory._DATABASE
  ]
};

// Circuit Breaker States
export enum CircuitBreakerState {
  _CLOSED = 'closed',
  _OPEN = 'open',
  _HALF_OPEN = 'half_open'
}

export interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number; // ms
  successThreshold: number; // for half-open -> closed
  monitoringWindow: number; // ms
}

export class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState._CLOSED;
  private failures: number = 0;
  private successes: number = 0;
  private lastFailureTime: number = 0;
  private recentFailures: number[] = [];

  constructor(
    private _name: string,
    private _config: CircuitBreakerConfig
  ) {}

  async execute<T>(action: () => Promise<T>): Promise<T> {
    this.cleanOldFailures();

    if (this.state === CircuitBreakerState._OPEN) {
      if (Date.now() - this.lastFailureTime > this._config.recoveryTimeout) {
        this.state = CircuitBreakerState._HALF_OPEN;
        this.successes = 0;
      } else {
        throw new Error(`Circuit breaker ${this._name} is OPEN`);
      }
    }

    try {
      const result = await action();
      
      if (this.state === CircuitBreakerState._HALF_OPEN) {
        this.successes++;
        if (this.successes >= this._config.successThreshold) {
          this.state = CircuitBreakerState._CLOSED;
          this.failures = 0;
          this.recentFailures = [];
        }
      }
      
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  private recordFailure(): void {
    const now = Date.now();
    this.failures++;
    this.lastFailureTime = now;
    this.recentFailures.push(now);
    
    if (this.state === CircuitBreakerState._HALF_OPEN) {
      this.state = CircuitBreakerState._OPEN;
    } else if (this.recentFailures.length >= this._config.failureThreshold) {
      this.state = CircuitBreakerState._OPEN;
    }
  }

  private cleanOldFailures(): void {
    const cutoff = Date.now() - this._config.monitoringWindow;
    this.recentFailures = this.recentFailures.filter(time => time > cutoff);
  }

  getState(): CircuitBreakerState {
    return this.state;
  }

  getStats() {
    return {
      state: this.state,
      failures: this.failures,
      successes: this.successes,
      recentFailures: this.recentFailures.length,
      lastFailureTime: this.lastFailureTime
    };
  }
}

// Error Classification System
export class ErrorClassifier {
  static classify(error: any): HiveError {
    const timestamp = new Date();
    const id = `err_${timestamp.getTime()}_${Math.random().toString(36).substr(2, 9)}`;
    
    let category = ErrorCategory._UNKNOWN;
    let severity = ErrorSeverity._MEDIUM;
    let retryable = false;
    let message = 'An unknown error occurred';

    if (error?.response) {
      // HTTP errors
      const status = error.response.status;
      message = error.response.data?.message || error.message || `HTTP ${status}`;
      
      if (status >= 500) {
        category = ErrorCategory._SERVER_ERROR;
        severity = ErrorSeverity._HIGH;
        retryable = true;
      } else if (status === 429) {
        category = ErrorCategory._RATE_LIMIT;
        severity = ErrorSeverity._MEDIUM;
        retryable = true;
      } else if (status === 401) {
        category = ErrorCategory._AUTHENTICATION;
        severity = ErrorSeverity._HIGH;
        retryable = false;
      } else if (status === 403) {
        category = ErrorCategory._AUTHORIZATION;
        severity = ErrorSeverity._MEDIUM;
        retryable = false;
      } else if (status >= 400) {
        category = ErrorCategory._VALIDATION;
        severity = ErrorSeverity._LOW;
        retryable = false;
      }
    } else if (error?.code) {
      // Network/system errors
      message = error.message || `System error: ${error.code}`;
      
      if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        category = ErrorCategory._NETWORK;
        severity = ErrorSeverity._MEDIUM;
        retryable = true;
      } else if (error.code.includes('FIRESTORE') || error.code.includes('DATABASE')) {
        category = ErrorCategory._DATABASE;
        severity = ErrorSeverity._HIGH;
        retryable = true;
      }
    } else if (error instanceof z.ZodError) {
      category = ErrorCategory._VALIDATION;
      severity = ErrorSeverity._LOW;
      retryable = false;
      message = `Validation error: ${error.errors.map(e => e.message).join(', ')}`;
    } else if (error?.message) {
      message = error.message;
      
      // Pattern matching for common error types
      if (message.includes('fetch') || message.includes('network')) {
        category = ErrorCategory._NETWORK;
        retryable = true;
      } else if (message.includes('auth') || message.includes('token')) {
        category = ErrorCategory._AUTHENTICATION;
        severity = ErrorSeverity._HIGH;
      } else if (message.includes('permission') || message.includes('access')) {
        category = ErrorCategory._AUTHORIZATION;
      } else if (message.includes('rate limit')) {
        category = ErrorCategory._RATE_LIMIT;
        retryable = true;
      }
    }

    return {
      id,
      category,
      severity,
      message,
      details: error?.response?.data || error?.details || null,
      timestamp,
      retryable,
      stack: error?.stack
    };
  }
}

// Exponential Backoff with Jitter
export class RetryManager {
  private static circuitBreakers = new Map<string, CircuitBreaker>();

  static async executeWithRetry<T>(
    action: () => Promise<T>,
    config: Partial<RetryConfig> = {},
    circuitBreakerName?: string
  ): Promise<T> {
    const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
    
    let lastError: HiveError | null = null;
    
    // Use circuit breaker if specified
    const circuitBreaker = circuitBreakerName 
      ? this.getCircuitBreaker(circuitBreakerName)
      : null;

    const executeOperation = async (): Promise<T> => {
      if (circuitBreaker) {
        return circuitBreaker.execute(action);
      }
      return action();
    };

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        return await executeOperation();
      } catch (error) {
        lastError = ErrorClassifier.classify(error);
        lastError.retryCount = attempt;
        lastError.maxRetries = retryConfig.maxRetries;

        // Log error for monitoring
        await this.logError(lastError);

        // Don't retry on last attempt or non-retryable errors
        if (attempt === retryConfig.maxRetries || !this.shouldRetry(lastError, retryConfig)) {
          break;
        }

        // Calculate delay with exponential backoff and jitter
        const delay = this.calculateDelay(attempt, retryConfig);
        console.warn(`Retrying operation in ${delay}ms (attempt ${attempt + 1}/${retryConfig.maxRetries + 1})`);
        
        await this.sleep(delay);
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }

  private static shouldRetry(error: HiveError, config: RetryConfig): boolean {
    return error.retryable && config.retryableErrors.includes(error.category);
  }

  private static calculateDelay(attempt: number, config: RetryConfig): number {
    let delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt);
    delay = Math.min(delay, config.maxDelay);

    if (config.jitter) {
      // Add ±25% jitter
      const jitterAmount = delay * 0.25;
      delay += (Math.random() - 0.5) * 2 * jitterAmount;
    }

    return Math.max(delay, 0);
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private static getCircuitBreaker(name: string): CircuitBreaker {
    if (!this.circuitBreakers.has(name)) {
      this.circuitBreakers.set(name, new CircuitBreaker(name, {
        failureThreshold: 5,
        recoveryTimeout: 60000, // 60 seconds
        successThreshold: 3,
        monitoringWindow: 300000 // 5 minutes
      }));
    }
    return this.circuitBreakers.get(name)!;
  }

  private static async logError(error: HiveError): Promise<void> {
    try {
      // In production, this would send to error tracking service
      console.error('HIVE Error:', {
        id: error.id,
        category: error.category,
        severity: error.severity,
        message: error.message,
        timestamp: error.timestamp,
        retryCount: error.retryCount,
        stack: error.stack
      });

      // Could also send to external error tracking service
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: error.message,
          fatal: error.severity === ErrorSeverity._CRITICAL
        });
      }
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  }

  static getCircuitBreakerStats(): Record<string, any> {
    const stats: Record<string, any> = {};
    this.circuitBreakers.forEach((breaker, name) => {
      stats[name] = breaker.getStats();
    });
    return stats;
  }
}

// Timeout Manager
export class TimeoutManager {
  static withTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number,
    errorMessage = 'Operation timed out'
  ): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        setTimeout(() => {
          reject(new Error(errorMessage));
        }, timeoutMs);
      })
    ]);
  }
}

// Graceful Degradation
export interface FallbackConfig<T> {
  fallbackValue?: T;
  fallbackFunction?: () => Promise<T> | T;
  condition?: (error: HiveError) => boolean;
}

export class GracefulDegradation {
  static async withFallback<T>(
    action: () => Promise<T>,
    config: FallbackConfig<T>
  ): Promise<T> {
    try {
      return await action();
    } catch (error) {
      const classifiedError = ErrorClassifier.classify(error);
      
      if (config.condition && !config.condition(classifiedError)) {
        throw classifiedError;
      }

      if (config.fallbackFunction) {
        try {
          return await config.fallbackFunction();
        } catch (fallbackError) {
          console.warn('Fallback operation failed:', fallbackError);
          throw classifiedError;
        }
      }

      if (config.fallbackValue !== undefined) {
        return config.fallbackValue;
      }

      throw classifiedError;
    }
  }
}

// Comprehensive Error Handler for the Platform
export class HivePlatformErrorHandler {
  static async handleApiCall<T>(
    apiCall: () => Promise<T>,
    options: {
      retryConfig?: Partial<RetryConfig>;
      circuitBreaker?: string;
      timeout?: number;
      fallback?: FallbackConfig<T>;
    } = {}
  ): Promise<T> {
    const {
      retryConfig,
      circuitBreaker,
      timeout = 30000,
      fallback
    } = options;

    let operation = apiCall;

    // Wrap with timeout
    if (timeout > 0) {
      operation = () => TimeoutManager.withTimeout(apiCall(), timeout);
    }

    // Wrap with retry logic
    const operationWithRetry = () => RetryManager.executeWithRetry(
      operation,
      retryConfig,
      circuitBreaker
    );

    // Wrap with fallback if provided
    if (fallback) {
      return GracefulDegradation.withFallback(operationWithRetry, fallback);
    }

    return operationWithRetry();
  }

  static createApiWrapper(baseConfig: {
    retryConfig?: Partial<RetryConfig>;
    circuitBreaker?: string;
    timeout?: number;
  } = {}) {
    return <T>(apiCall: () => Promise<T>, overrides: Partial<typeof baseConfig> = {}) => {
      const config = { ...baseConfig, ...overrides };
      return this.handleApiCall(apiCall, config);
    };
  }
}

// Export convenience functions
export const withRetry = RetryManager.executeWithRetry;
export const withTimeout = TimeoutManager.withTimeout;
export const withFallback = GracefulDegradation.withFallback;
export const handleError = HivePlatformErrorHandler.handleApiCall;
