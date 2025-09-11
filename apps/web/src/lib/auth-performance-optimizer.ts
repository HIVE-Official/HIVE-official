/**
 * Authentication Performance Optimizer
 * Implements caching, pre-loading, and performance optimizations for auth flows
 */

interface CachedAuthData {
  user: any;
  timestamp: number;
  fingerprint: string;
  version: string;
}

interface AuthMetrics {
  validationTime: number;
  cacheHitRate: number;
  averageLoadTime: number;
  totalRequests: number;
}

export class AuthPerformanceOptimizer {
  private static instance: AuthPerformanceOptimizer;
  private cache = new Map<string, CachedAuthData>();
  private metrics: AuthMetrics = {
    validationTime: 0,
    cacheHitRate: 0,
    averageLoadTime: 0,
    totalRequests: 0
  };
  
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_CACHE_SIZE = 100;
  private readonly VERSION = '1.0.0';

  static getInstance(): AuthPerformanceOptimizer {
    if (!AuthPerformanceOptimizer.instance) {
      AuthPerformanceOptimizer.instance = new AuthPerformanceOptimizer();
    }
    return AuthPerformanceOptimizer.instance;
  }

  /**
   * Cached session validation with performance tracking
   */
  async getCachedUserData(userId: string): Promise<any | null> {
    const startTime = performance.now();
    this.metrics.totalRequests++;

    const cacheKey = `user_${userId}`;
    const cached = this.cache.get(cacheKey);

    if (cached && this.isCacheValid(cached)) {
      // Cache hit
      this.metrics.cacheHitRate = (this.metrics.cacheHitRate * (this.metrics.totalRequests - 1) + 1) / this.metrics.totalRequests;
      this.updateMetrics(startTime);
      return cached.user;
    }

    // Cache miss - would fetch from API
    try {
      // Simulate API call for now
      const userData = await this.fetchUserData(userId);
      
      if (userData) {
        this.setCachedUserData(userId, userData);
      }
      
      this.updateMetrics(startTime);
      return userData;
    } catch (error) {
      this.updateMetrics(startTime);
      return null;
    }
  }

  /**
   * Set cached user data with automatic cleanup
   */
  setCachedUserData(userId: string, userData: any): void {
    const cacheKey = `user_${userId}`;
    
    // Clean old entries if cache is full
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.cleanOldEntries();
    }

    this.cache.set(cacheKey, {
      user: userData,
      timestamp: Date.now(),
      fingerprint: this.generateCacheFingerprint(userData),
      version: this.VERSION
    });
  }

  /**
   * Pre-load user data for better UX
   */
  async preloadUserData(userId: string): Promise<void> {
    // Don't block - fire and forget
    setTimeout(async () => {
      try {
        await this.getCachedUserData(userId);
      } catch (error) {
        // Silent fail for preloading
      }
    }, 0);
  }

  /**
   * Batch load multiple users for performance
   */
  async batchLoadUsers(userIds: string[]): Promise<Map<string, any>> {
    const results = new Map<string, any>();
    const uncachedIds: string[] = [];

    // Check cache first
    for (const userId of userIds) {
      const cached = await this.getCachedUserData(userId);
      if (cached) {
        results.set(userId, cached);
      } else {
        uncachedIds.push(userId);
      }
    }

    // Batch fetch uncached users
    if (uncachedIds.length > 0) {
      try {
        const batchResults = await this.batchFetchUsers(uncachedIds);
        for (const [userId, userData] of batchResults) {
          results.set(userId, userData);
          this.setCachedUserData(userId, userData);
        }
      } catch (error) {
        console.error('Batch user fetch failed:', error);
      }
    }

    return results;
  }

  /**
   * Async localStorage operations to avoid blocking
   */
  async setStorageAsync(key: string, value: string): Promise<void> {
    return new Promise((resolve: any) => {
      // Use MessageChannel for non-blocking storage
      const channel = new MessageChannel();
      channel.port2.onmessage = () => resolve();
      
      setTimeout(() => {
        try {
          localStorage.setItem(key, value);
          channel.port1.postMessage('done');
        } catch (error) {
          console.error('Async storage set failed:', error);
          channel.port1.postMessage('error');
        }
      }, 0);
    });
  }

  /**
   * Async localStorage read
   */
  async getStorageAsync(key: string): Promise<string | null> {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        try {
          const value = localStorage.getItem(key);
          resolve(value);
        } catch (error) {
          console.error('Async storage get failed:', error);
          resolve(null);
        }
      }, 0);
    });
  }

  /**
   * Smart cache invalidation based on user activity
   */
  invalidateUserCache(userId: string, reason: 'logout' | 'profile_update' | 'security_violation'): void {
    const cacheKey = `user_${userId}`;
    this.cache.delete(cacheKey);

    // Log invalidation for analytics
    console.debug(`Cache invalidated for user ${userId}: ${reason}`);
  }

  /**
   * Performance monitoring and optimization recommendations
   */
  getPerformanceReport(): {
    metrics: AuthMetrics;
    recommendations: string[];
    cacheEfficiency: number;
  } {
    const cacheEfficiency = this.cache.size > 0 ? 
      (this.metrics.cacheHitRate * 100) : 0;

    const recommendations: string[] = [];
    
    if (this.metrics.cacheHitRate < 0.5) {
      recommendations.push('Consider increasing cache TTL or preloading strategy');
    }
    
    if (this.metrics.averageLoadTime > 200) {
      recommendations.push('Auth validation is slow - consider optimizing API calls');
    }
    
    if (this.cache.size > this.MAX_CACHE_SIZE * 0.8) {
      recommendations.push('Cache approaching limits - consider cleanup strategy');
    }

    return {
      metrics: { ...this.metrics },
      recommendations,
      cacheEfficiency: Math.round(cacheEfficiency)
    };
  }

  // Private helper methods
  private isCacheValid(cached: CachedAuthData): boolean {
    const age = Date.now() - cached.timestamp;
    return age < this.CACHE_TTL && cached.version === this.VERSION;
  }

  private generateCacheFingerprint(userData: any): string {
    // Simple fingerprint based on key user data
    const key = `${userData.id}_${userData.email}_${userData.updatedAt || ''}`;
    return btoa(key).slice(0, 16);
  }

  private cleanOldEntries(): void {
    const now = Date.now();
    const toDelete: string[] = [];

    for (const [key, cached] of this.cache.entries()) {
      if (now - cached.timestamp > this.CACHE_TTL) {
        toDelete.push(key);
      }
    }

    toDelete.forEach(key => this.cache.delete(key));
  }

  private updateMetrics(startTime: number): void {
    const loadTime = performance.now() - startTime;
    this.metrics.validationTime = (this.metrics.validationTime + loadTime) / 2;
    this.metrics.averageLoadTime = (this.metrics.averageLoadTime + loadTime) / 2;
  }

  private async fetchUserData(userId: string): Promise<any> {
    // Placeholder for actual API call
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve({
          id: userId,
          email: `user${userId}@example.com`,
          fetchedAt: new Date().toISOString()
        });
      }, 50);
    });
  }

  private async batchFetchUsers(userIds: string[]): Promise<Map<string, any>> {
    // Placeholder for batch API call
    const results = new Map<string, any>();
    
    for (const userId of userIds) {
      results.set(userId, await this.fetchUserData(userId));
    }
    
    return results;
  }
}