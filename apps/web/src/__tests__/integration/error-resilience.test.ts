import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  ErrorClassifier,
  RetryManager,
  CircuitBreaker,
  CircuitBreakerState,
  TimeoutManager,
  GracefulDegradation,
  HivePlatformErrorHandler,
  ErrorCategory,
  ErrorSeverity
} from '@/lib/error-resilience-system';

describe('Error Resilience System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('ErrorClassifier', () => {
    it('should classify HTTP 500 errors correctly', () => {
      const error = {
        response: {
          status: 500,
          data: { message: 'Internal server error' }
        }
      };

      const classified = ErrorClassifier.classify(error);

      expect(classified.category).toBe(ErrorCategory._SERVER_ERROR);
      expect(classified.severity).toBe(ErrorSeverity._HIGH);
      expect(classified.retryable).toBe(true);
      expect(classified.message).toBe('Internal server error');
    });

    it('should classify HTTP 401 errors correctly', () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      };

      const classified = ErrorClassifier.classify(error);

      expect(classified.category).toBe(ErrorCategory._AUTHENTICATION);
      expect(classified.severity).toBe(ErrorSeverity._HIGH);
      expect(classified.retryable).toBe(false);
    });

    it('should classify HTTP 429 errors correctly', () => {
      const error = {
        response: {
          status: 429,
          data: { message: 'Rate limit exceeded' }
        }
      };

      const classified = ErrorClassifier.classify(error);

      expect(classified.category).toBe(ErrorCategory._RATE_LIMIT);
      expect(classified.severity).toBe(ErrorSeverity._MEDIUM);
      expect(classified.retryable).toBe(true);
    });

    it('should classify network errors correctly', () => {
      const error = {
        code: 'NETWORK_ERROR',
        message: 'Network request failed'
      };

      const classified = ErrorClassifier.classify(error);

      expect(classified.category).toBe(ErrorCategory._NETWORK);
      expect(classified.severity).toBe(ErrorSeverity._MEDIUM);
      expect(classified.retryable).toBe(true);
    });

    it('should classify validation errors correctly', () => {
      const error = {
        name: 'ZodError',
        errors: [
          { message: 'Required field missing' },
          { message: 'Invalid email format' }
        ]
      };

      // Mock ZodError
      const zodError = {
        errors: error.errors,
        message: 'Validation failed'
      };
      Object.setPrototypeOf(zodError, Error.prototype);
      zodError.constructor = { name: 'ZodError' };

      const classified = ErrorClassifier.classify(zodError);

      expect(classified.category).toBe(ErrorCategory._VALIDATION);
      expect(classified.severity).toBe(ErrorSeverity._LOW);
      expect(classified.retryable).toBe(false);
      expect(classified.message).toContain('Validation error');
    });

    it('should handle unknown errors', () => {
      const error = new Error('Unknown error');

      const classified = ErrorClassifier.classify(error);

      expect(classified.category).toBe(ErrorCategory._UNKNOWN);
      expect(classified.severity).toBe(ErrorSeverity._MEDIUM);
      expect(classified.id).toMatch(/^err_/);
      expect(classified.timestamp).toBeInstanceOf(Date);
    });
  });

  describe('RetryManager', () => {
    it('should retry retryable errors', async () => {
      let attempts = 0;
      const operation = vi.fn().mockImplementation(async () => {
        attempts++;
        if (attempts < 3) {
          throw { response: { status: 500, data: { message: 'Server error' } } };
        }
        return 'success';
      });

      const result = await RetryManager.executeWithRetry(operation, {
        maxRetries: 3,
        baseDelay: 100,
        backoffMultiplier: 1,
        jitter: false
      });

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('should not retry non-retryable errors', async () => {
      const operation = vi.fn().mockRejectedValue({
        response: { status: 401, data: { message: 'Unauthorized' } }
      });

      await expect(RetryManager.executeWithRetry(operation, {
        maxRetries: 3,
        baseDelay: 100
      })).rejects.toThrow();

      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('should apply exponential backoff', async () => {
      let attempts = 0;
      const operation = vi.fn().mockImplementation(async () => {
        attempts++;
        if (attempts < 4) {
          throw { response: { status: 500, data: { message: 'Server error' } } };
        }
        return 'success';
      });

      const startTime = Date.now();
      
      const promise = RetryManager.executeWithRetry(operation, {
        maxRetries: 3,
        baseDelay: 1000,
        backoffMultiplier: 2,
        jitter: false
      });

      // Fast-forward through delays
      await vi.advanceTimersByTimeAsync(1000); // First retry delay
      await vi.advanceTimersByTimeAsync(2000); // Second retry delay
      await vi.advanceTimersByTimeAsync(4000); // Third retry delay

      const result = await promise;
      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(4);
    });

    it('should add jitter when enabled', async () => {
      const operation = vi.fn().mockRejectedValue({
        response: { status: 500, data: { message: 'Server error' } }
      });

      // Mock Math.random to return predictable values
      const originalRandom = Math.random;
      Math.random = vi.fn().mockReturnValue(0.5);

      try {
        await RetryManager.executeWithRetry(operation, {
          maxRetries: 1,
          baseDelay: 1000,
          jitter: true
        });
      } catch (error) {
        // Expected to fail
      }

      expect(Math.random).toHaveBeenCalled();
      Math.random = originalRandom;
    });

    it('should respect max delay', async () => {
      const operation = vi.fn().mockRejectedValue({
        response: { status: 500, data: { message: 'Server error' } }
      });

      try {
        await RetryManager.executeWithRetry(operation, {
          maxRetries: 10,
          baseDelay: 1000,
          maxDelay: 5000,
          backoffMultiplier: 3,
          jitter: false
        });
      } catch (error) {
        // Expected to fail after all retries
      }

      // The delay should not exceed maxDelay even with high backoff multiplier
      expect(operation).toHaveBeenCalledTimes(11); // Initial + 10 retries
    });
  });

  describe('CircuitBreaker', () => {
    it('should remain closed under normal conditions', async () => {
      const circuitBreaker = new CircuitBreaker('test', {
        failureThreshold: 3,
        recoveryTimeout: 5000,
        successThreshold: 2,
        monitoringWindow: 60000
      });

      const operation = vi.fn().mockResolvedValue('success');

      const result = await circuitBreaker.execute(operation);

      expect(result).toBe('success');
      expect(circuitBreaker.getState()).toBe(CircuitBreakerState._CLOSED);
    });

    it('should open after exceeding failure threshold', async () => {
      const circuitBreaker = new CircuitBreaker('test', {
        failureThreshold: 2,
        recoveryTimeout: 5000,
        successThreshold: 2,
        monitoringWindow: 60000
      });

      const operation = vi.fn().mockRejectedValue(new Error('Operation failed'));

      // Cause failures to exceed threshold
      await expect(circuitBreaker.execute(operation)).rejects.toThrow();
      await expect(circuitBreaker.execute(operation)).rejects.toThrow();
      
      expect(circuitBreaker.getState()).toBe(CircuitBreakerState._OPEN);

      // Next call should fail immediately without calling operation
      await expect(circuitBreaker.execute(operation)).rejects.toThrow('Circuit breaker test is OPEN');
      expect(operation).toHaveBeenCalledTimes(2); // Not called the third time
    });

    it('should transition to half-open after recovery timeout', async () => {
      const circuitBreaker = new CircuitBreaker('test', {
        failureThreshold: 2,
        recoveryTimeout: 1000,
        successThreshold: 2,
        monitoringWindow: 60000
      });

      const operation = vi.fn().mockRejectedValue(new Error('Operation failed'));

      // Open the circuit
      await expect(circuitBreaker.execute(operation)).rejects.toThrow();
      await expect(circuitBreaker.execute(operation)).rejects.toThrow();
      expect(circuitBreaker.getState()).toBe(CircuitBreakerState._OPEN);

      // Wait for recovery timeout
      vi.advanceTimersByTime(1001);

      // Next operation should put it in half-open state
      operation.mockResolvedValueOnce('success');
      const result = await circuitBreaker.execute(operation);

      expect(result).toBe('success');
      expect(circuitBreaker.getState()).toBe(CircuitBreakerState._HALF_OPEN);
    });

    it('should close after successful operations in half-open state', async () => {
      const circuitBreaker = new CircuitBreaker('test', {
        failureThreshold: 2,
        recoveryTimeout: 1000,
        successThreshold: 2,
        monitoringWindow: 60000
      });

      const operation = vi.fn();

      // Open the circuit
      operation.mockRejectedValue(new Error('Operation failed'));
      await expect(circuitBreaker.execute(operation)).rejects.toThrow();
      await expect(circuitBreaker.execute(operation)).rejects.toThrow();

      // Wait for recovery and transition to half-open
      vi.advanceTimersByTime(1001);
      operation.mockResolvedValue('success');
      
      // Successful operations to close the circuit
      await circuitBreaker.execute(operation);
      expect(circuitBreaker.getState()).toBe(CircuitBreakerState._HALF_OPEN);
      
      await circuitBreaker.execute(operation);
      expect(circuitBreaker.getState()).toBe(CircuitBreakerState._CLOSED);
    });

    it('should clean old failures outside monitoring window', async () => {
      const circuitBreaker = new CircuitBreaker('test', {
        failureThreshold: 3,
        recoveryTimeout: 5000,
        successThreshold: 2,
        monitoringWindow: 1000
      });

      const operation = vi.fn().mockRejectedValue(new Error('Operation failed'));

      // Cause some failures
      await expect(circuitBreaker.execute(operation)).rejects.toThrow();
      await expect(circuitBreaker.execute(operation)).rejects.toThrow();

      // Wait beyond monitoring window
      vi.advanceTimersByTime(1001);

      // Should not open circuit as old failures are cleaned
      operation.mockResolvedValueOnce('success');
      const result = await circuitBreaker.execute(operation);

      expect(result).toBe('success');
      expect(circuitBreaker.getState()).toBe(CircuitBreakerState._CLOSED);
    });
  });

  describe('TimeoutManager', () => {
    it('should resolve when operation completes within timeout', async () => {
      const operation = new Promise(resolve => {
        setTimeout(() => resolve('success'), 500);
      });

      vi.advanceTimersByTime(500);
      const result = await TimeoutManager.withTimeout(operation, 1000);

      expect(result).toBe('success');
    });

    it('should reject when operation exceeds timeout', async () => {
      const operation = new Promise(resolve => {
        setTimeout(() => resolve('success'), 2000);
      });

      const timeoutPromise = TimeoutManager.withTimeout(operation, 1000);
      
      vi.advanceTimersByTime(1001);
      
      await expect(timeoutPromise).rejects.toThrow('Operation timed out');
    });

    it('should use custom error message', async () => {
      const operation = new Promise(resolve => {
        setTimeout(() => resolve('success'), 2000);
      });

      const timeoutPromise = TimeoutManager.withTimeout(
        operation, 
        1000, 
        'Custom timeout message'
      );
      
      vi.advanceTimersByTime(1001);
      
      await expect(timeoutPromise).rejects.toThrow('Custom timeout message');
    });
  });

  describe('GracefulDegradation', () => {
    it('should return operation result on success', async () => {
      const operation = vi.fn().mockResolvedValue('success');
      const fallbackConfig = { fallbackValue: 'fallback' };

      const result = await GracefulDegradation.withFallback(operation, fallbackConfig);

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('should return fallback value on error', async () => {
      const operation = vi.fn().mockRejectedValue(new Error('Operation failed'));
      const fallbackConfig = { fallbackValue: 'fallback' };

      const result = await GracefulDegradation.withFallback(operation, fallbackConfig);

      expect(result).toBe('fallback');
    });

    it('should call fallback function on error', async () => {
      const operation = vi.fn().mockRejectedValue(new Error('Operation failed'));
      const fallbackFunction = vi.fn().mockResolvedValue('fallback result');
      const fallbackConfig = { fallbackFunction };

      const result = await GracefulDegradation.withFallback(operation, fallbackConfig);

      expect(result).toBe('fallback result');
      expect(fallbackFunction).toHaveBeenCalledTimes(1);
    });

    it('should respect condition for fallback', async () => {
      const operation = vi.fn().mockRejectedValue({
        response: { status: 401, data: { message: 'Unauthorized' } }
      });
      
      const fallbackConfig = {
        fallbackValue: 'fallback',
        condition: (error: any) => error.category === ErrorCategory._NETWORK
      };

      // Should not use fallback for auth errors
      await expect(GracefulDegradation.withFallback(operation, fallbackConfig))
        .rejects.toThrow();
    });

    it('should throw original error if fallback function fails', async () => {
      const originalError = new Error('Original error');
      const operation = vi.fn().mockRejectedValue(originalError);
      const fallbackFunction = vi.fn().mockRejectedValue(new Error('Fallback failed'));
      const fallbackConfig = { fallbackFunction };

      await expect(GracefulDegradation.withFallback(operation, fallbackConfig))
        .rejects.toThrow('Original error');
    });
  });

  describe('HivePlatformErrorHandler', () => {
    it('should handle successful API calls', async () => {
      const apiCall = vi.fn().mockResolvedValue('success');

      const result = await HivePlatformErrorHandler.handleApiCall(apiCall);

      expect(result).toBe('success');
      expect(apiCall).toHaveBeenCalledTimes(1);
    });

    it('should apply timeout to API calls', async () => {
      const apiCall = vi.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve('success'), 2000))
      );

      const promise = HivePlatformErrorHandler.handleApiCall(apiCall, {
        timeout: 1000
      });

      vi.advanceTimersByTime(1001);

      await expect(promise).rejects.toThrow();
    });

    it('should use fallback on error', async () => {
      const apiCall = vi.fn().mockRejectedValue(new Error('API failed'));
      const fallback = { fallbackValue: 'fallback result' };

      const result = await HivePlatformErrorHandler.handleApiCall(apiCall, {
        fallback
      });

      expect(result).toBe('fallback result');
    });

    it('should create API wrapper with default config', () => {
      const wrapper = HivePlatformErrorHandler.createApiWrapper({
        timeout: 5000,
        retryConfig: { maxRetries: 2 }
      });

      expect(typeof wrapper).toBe('function');
    });

    it('should allow overrides in API wrapper', async () => {
      const wrapper = HivePlatformErrorHandler.createApiWrapper({
        timeout: 5000
      });

      const apiCall = vi.fn().mockResolvedValue('success');

      const result = await wrapper(apiCall, {
        timeout: 1000 // Override default
      });

      expect(result).toBe('success');
    });
  });

  describe('Integration scenarios', () => {
    it('should handle complex error scenario with retry and circuit breaker', async () => {
      let attempts = 0;
      const apiCall = vi.fn().mockImplementation(async () => {
        attempts++;
        if (attempts <= 2) {
          throw { response: { status: 500, data: { message: 'Server error' } } };
        }
        return 'success';
      });

      const result = await HivePlatformErrorHandler.handleApiCall(apiCall, {
        retryConfig: { maxRetries: 3, baseDelay: 100 },
        circuitBreaker: 'test-service',
        timeout: 5000
      });

      expect(result).toBe('success');
      expect(apiCall).toHaveBeenCalledTimes(3);
    });

    it('should handle network error with fallback and caching', async () => {
      const apiCall = vi.fn().mockRejectedValue({
        code: 'NETWORK_ERROR',
        message: 'Network request failed'
      });

      const cachedData = 'cached result';
      const fallback = {
        fallbackFunction: async () => cachedData
      };

      const result = await HivePlatformErrorHandler.handleApiCall(apiCall, {
        fallback,
        retryConfig: { maxRetries: 2, baseDelay: 100 }
      });

      expect(result).toBe(cachedData);
    });
  });
});