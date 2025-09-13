/**
 * Realtime Optimization Service
 * 
 * Optimizes real-time data synchronization for performance and efficiency.
 * Implements debouncing, throttling, batching, and intelligent caching strategies.
 */

import { logger } from './structured-logger';

/**
 * Optimization strategies
 */
export enum OptimizationStrategy {
  DEBOUNCE = 'debounce',
  THROTTLE = 'throttle',
  BATCH = 'batch',
  CACHE = 'cache',
  DEDUPE = 'dedupe'
}

/**
 * Optimization configuration
 */
export interface OptimizationConfig {
  strategy: OptimizationStrategy;
  delay?: number;
  maxBatchSize?: number;
  cacheDuration?: number;
  dedupeKey?: (data: any) => string;
}

/**
 * Realtime Optimization Service Class
 */
class RealtimeOptimizationService {
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();
  private throttleLastCall: Map<string, number> = new Map();
  private batchQueues: Map<string, any[]> = new Map();
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private dedupeKeys: Set<string> = new Set();

  /**
   * Optimize a realtime operation
   */
  async optimize<T>(
    key: string,
    operation: () => Promise<T>,
    config: OptimizationConfig
  ): Promise<T | void> {
    switch (config.strategy) {
      case OptimizationStrategy.DEBOUNCE:
        return this.debounce(key, operation, config.delay || 300);
      
      case OptimizationStrategy.THROTTLE:
        return this.throttle(key, operation, config.delay || 1000);
      
      case OptimizationStrategy.BATCH:
        return this.batch(key, operation, config.maxBatchSize || 10, config.delay || 100);
      
      case OptimizationStrategy.CACHE:
        return this.withCache(key, operation, config.cacheDuration || 5000);
      
      case OptimizationStrategy.DEDUPE:
        return this.deduplicate(key, operation, config.dedupeKey);
      
      default:
        return operation();
    }
  }

  /**
   * Debounce an operation
   */
  private debounce<T>(
    key: string,
    operation: () => Promise<T>,
    delay: number
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      // Clear existing timer
      const existingTimer = this.debounceTimers.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      // Set new timer
      const timer = setTimeout(async () => {
        try {
          const result = await operation();
          resolve(result);
          this.debounceTimers.delete(key);
        } catch (error) {
          reject(error);
          this.debounceTimers.delete(key);
        }
      }, delay);

      this.debounceTimers.set(key, timer);
    });
  }

  /**
   * Throttle an operation
   */
  private async throttle<T>(
    key: string,
    operation: () => Promise<T>,
    delay: number
  ): Promise<T | void> {
    const now = Date.now();
    const lastCall = this.throttleLastCall.get(key) || 0;
    
    if (now - lastCall < delay) {
      logger.debug('Operation throttled', { key, delay });
      return;
    }

    this.throttleLastCall.set(key, now);
    return operation();
  }

  /**
   * Batch multiple operations
   */
  private batch<T>(
    key: string,
    operation: () => Promise<T>,
    maxBatchSize: number,
    delay: number
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      // Initialize queue if needed
      if (!this.batchQueues.has(key)) {
        this.batchQueues.set(key, []);
      }

      const queue = this.batchQueues.get(key)!;
      queue.push({ operation, resolve, reject });

      // Process if batch is full
      if (queue.length >= maxBatchSize) {
        this.processBatch(key);
      } else {
        // Schedule batch processing
        setTimeout(() => {
          if (this.batchQueues.has(key) && this.batchQueues.get(key)!.length > 0) {
            this.processBatch(key);
          }
        }, delay);
      }
    });
  }

  /**
   * Process a batch of operations
   */
  private async processBatch(key: string): Promise<void> {
    const queue = this.batchQueues.get(key);
    if (!queue || queue.length === 0) return;

    // Clear the queue
    this.batchQueues.set(key, []);

    // Execute all operations in parallel
    const promises = queue.map(item => 
      item.operation()
        .then(result => item.resolve(result))
        .catch(error => item.reject(error))
    );

    await Promise.allSettled(promises);
    logger.debug('Batch processed', { key, size: queue.length });
  }

  /**
   * Cache operation results
   */
  private async withCache<T>(
    key: string,
    operation: () => Promise<T>,
    duration: number
  ): Promise<T> {
    // Check cache
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < duration) {
      logger.debug('Cache hit', { key });
      return cached.data;
    }

    // Execute operation
    const result = await operation();
    
    // Store in cache
    this.cache.set(key, {
      data: result,
      timestamp: Date.now()
    });

    // Schedule cache cleanup
    setTimeout(() => {
      this.cache.delete(key);
    }, duration);

    return result;
  }

  /**
   * Deduplicate operations
   */
  private async deduplicate<T>(
    key: string,
    operation: () => Promise<T>,
    keyGenerator?: (data: any) => string
  ): Promise<T | void> {
    const dedupeKey = keyGenerator ? keyGenerator(key) : key;
    
    if (this.dedupeKeys.has(dedupeKey)) {
      logger.debug('Operation deduplicated', { key: dedupeKey });
      return;
    }

    this.dedupeKeys.add(dedupeKey);
    
    try {
      const result = await operation();
      
      // Remove from dedupe set after a delay
      setTimeout(() => {
        this.dedupeKeys.delete(dedupeKey);
      }, 1000);
      
      return result;
    } catch (error) {
      this.dedupeKeys.delete(dedupeKey);
      throw error;
    }
  }

  /**
   * Create an optimized function
   */
  createOptimizedFunction<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    config: OptimizationConfig
  ): T {
    return (async (...args: Parameters<T>) => {
      const key = `${fn.name}_${JSON.stringify(args)}`;
      return this.optimize(key, () => fn(...args), config);
    }) as T;
  }

  /**
   * Clear all optimization state
   */
  clearAll(): void {
    // Clear debounce timers
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
    
    // Clear other state
    this.throttleLastCall.clear();
    this.batchQueues.clear();
    this.cache.clear();
    this.dedupeKeys.clear();
    
    logger.info('Optimization state cleared');
  }

  /**
   * Get statistics
   */
  getStatistics(): {
    activeDebounces: number;
    throttledCalls: number;
    batchQueueSizes: Record<string, number>;
    cacheSize: number;
    dedupeKeysCount: number;
  } {
    const batchQueueSizes: Record<string, number> = {};
    this.batchQueues.forEach((queue, key) => {
      batchQueueSizes[key] = queue.length;
    });

    return {
      activeDebounces: this.debounceTimers.size,
      throttledCalls: this.throttleLastCall.size,
      batchQueueSizes,
      cacheSize: this.cache.size,
      dedupeKeysCount: this.dedupeKeys.size
    };
  }
}

// Create and export singleton instance
export const realtimeOptimization = new RealtimeOptimizationService();

// Export with alias for compatibility
export { realtimeOptimization as realtimeOptimizationManager };

// Export convenience functions
export const debounce = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number = 300
): T => {
  return realtimeOptimization.createOptimizedFunction(fn, {
    strategy: OptimizationStrategy.DEBOUNCE,
    delay
  });
};

export const throttle = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number = 1000
): T => {
  return realtimeOptimization.createOptimizedFunction(fn, {
    strategy: OptimizationStrategy.THROTTLE,
    delay
  });
};

export const withCache = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  duration: number = 5000
): T => {
  return realtimeOptimization.createOptimizedFunction(fn, {
    strategy: OptimizationStrategy.CACHE,
    cacheDuration: duration
  });
};