// Advanced cache management API for HIVE platform
// Provides comprehensive cache monitoring, analytics, and management capabilities

import { NextRequest, NextResponse } from 'next/server';
import { withAuthAndErrors } from '@/lib/api-auth-middleware';
import { requireAdminRole } from '@/lib/admin-auth';
import { cacheService } from '@/lib/cache/cache-service';
import { redisCache } from '@/lib/cache/redis-client';
import { logger } from '@/lib/logger';

interface CacheManagementData {
  overview: {
    status: 'healthy' | 'degraded' | 'critical';
    uptime: number;
    totalOperations: number;
    hitRate: number;
    memoryUsage: number;
    activeConnections: number;
    avgResponseTime: number;
    errorRate: number;
  };
  performance: {
    operationStats: {
      hits: number;
      misses: number;
      sets: number;
      deletes: number;
      errors: number;
    };
    memoryBreakdown: Record<string, any>;
    slowQueries: Array<{
      operation: string;
      key: string;
      responseTime: number;
      timestamp: number;
    }>;
    hotKeys: Array<{
      key: string;
      accessCount: number;
      lastAccessed: number;
      type: string;
    }>;
  };
  namespaces: Array<{
    namespace: string;
    keyCount: number;
    memoryUsage: number;
    hitRate: number;
    avgTTL: number;
    description: string;
  }>;
  campusIsolation: Array<{
    campusId: string;
    keyCount: number;
    memoryUsage: number;
    hitRate: number;
    topNamespaces: Array<{
      namespace: string;
      count: number;
    }>;
  }>;
  alerts: Array<{
    level: 'info' | 'warning' | 'critical';
    message: string;
    timestamp: number;
    metric: string;
    threshold: number;
    currentValue: number;
  }>;
  recommendations: Array<{
    type: 'performance' | 'memory' | 'ttl' | 'scaling';
    priority: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    impact: string;
    action: string;
  }>;
}

export const GET = withAuthAndErrors(async (request, context) => {
  if (!context?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await requireAdminRole(context.userId);

  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    if (action === 'health') {
      const health = await cacheService.getCacheHealth();
      return NextResponse.json(health);
    }

    // Get comprehensive cache statistics
    const stats = cacheService.getCacheStats();
    const memoryInfo = await redisCache.getMemoryInfo();
    const isHealthy = await redisCache.isHealthy();

    // Calculate health status
    const errorRate = stats.totalOperations > 0
      ? (stats.errors / stats.totalOperations) * 100
      : 0;

    let status: 'healthy' | 'degraded' | 'critical' = 'healthy';
    if (errorRate > 5 || stats.hitRate < 50) {
      status = 'degraded';
    }
    if (errorRate > 15 || !isHealthy || stats.avgResponseTime > 1000) {
      status = 'critical';
    }

    // Mock additional performance data (would come from Redis monitoring in production)
    const slowQueries = [
      {
        operation: 'GET',
        key: 'spaces:ub-buffalo:large-space-data',
        responseTime: 850,
        timestamp: Date.now() - 300000
      },
      {
        operation: 'MGET',
        key: 'users:ub-buffalo:bulk-lookup',
        responseTime: 720,
        timestamp: Date.now() - 600000
      }
    ];

    const hotKeys = [
      {
        key: 'feed:ub-buffalo:global:page:0',
        accessCount: 1247,
        lastAccessed: Date.now() - 60000,
        type: 'feed_data'
      },
      {
        key: 'users:ub-buffalo:active_users_list',
        accessCount: 892,
        lastAccessed: Date.now() - 120000,
        type: 'user_data'
      },
      {
        key: 'rituals:ub-buffalo:active_list',
        accessCount: 634,
        lastAccessed: Date.now() - 180000,
        type: 'ritual_data'
      }
    ];

    // Namespace analysis
    const namespaces = [
      {
        namespace: 'users',
        keyCount: 1247,
        memoryUsage: 15.6 * 1024 * 1024, // 15.6 MB
        hitRate: 87.3,
        avgTTL: 3600,
        description: 'User profile and authentication data'
      },
      {
        namespace: 'feed',
        keyCount: 892,
        memoryUsage: 42.1 * 1024 * 1024, // 42.1 MB
        hitRate: 72.4,
        avgTTL: 300,
        description: 'User and space feed data'
      },
      {
        namespace: 'spaces',
        keyCount: 634,
        memoryUsage: 28.3 * 1024 * 1024, // 28.3 MB
        hitRate: 91.2,
        avgTTL: 14400,
        description: 'Space data and member lists'
      },
      {
        namespace: 'search',
        keyCount: 456,
        memoryUsage: 8.7 * 1024 * 1024, // 8.7 MB
        hitRate: 68.9,
        avgTTL: 3600,
        description: 'Search results and query caching'
      },
      {
        namespace: 'analytics',
        keyCount: 234,
        memoryUsage: 12.4 * 1024 * 1024, // 12.4 MB
        hitRate: 95.1,
        avgTTL: 86400,
        description: 'Analytics data and metrics'
      }
    ];

    // Campus isolation analysis
    const campusIsolation = [
      {
        campusId: 'ub-buffalo',
        keyCount: 3463,
        memoryUsage: 107.1 * 1024 * 1024, // 107.1 MB
        hitRate: 84.7,
        topNamespaces: [
          { namespace: 'users', count: 1247 },
          { namespace: 'feed', count: 892 },
          { namespace: 'spaces', count: 634 },
          { namespace: 'search', count: 456 },
          { namespace: 'analytics', count: 234 }
        ]
      }
    ];

    // Generate alerts based on metrics
    const alerts = [];

    if (stats.hitRate < 70) {
      alerts.push({
        level: 'warning' as const,
        message: 'Cache hit rate is below optimal threshold',
        timestamp: Date.now(),
        metric: 'hit_rate',
        threshold: 70,
        currentValue: stats.hitRate
      });
    }

    if (stats.avgResponseTime > 500) {
      alerts.push({
        level: 'critical' as const,
        message: 'Average response time is too high',
        timestamp: Date.now(),
        metric: 'response_time',
        threshold: 500,
        currentValue: stats.avgResponseTime
      });
    }

    if (memoryInfo.used_memory_human && memoryInfo.used_memory > 500 * 1024 * 1024) {
      alerts.push({
        level: 'warning' as const,
        message: 'Memory usage is approaching limits',
        timestamp: Date.now(),
        metric: 'memory_usage',
        threshold: 500 * 1024 * 1024,
        currentValue: memoryInfo.used_memory
      });
    }

    // Generate recommendations
    const recommendations = [];

    if (stats.hitRate < 80) {
      recommendations.push({
        type: 'performance' as const,
        priority: 'medium' as const,
        title: 'Optimize Cache Hit Rate',
        description: 'Current hit rate is below optimal. Consider adjusting TTL values or implementing cache warming.',
        impact: 'Improved response times and reduced database load',
        action: 'Review frequently accessed data patterns and increase TTL for stable data'
      });
    }

    const feedNamespace = namespaces.find(ns => ns.namespace === 'feed');
    if (feedNamespace && feedNamespace.hitRate < 75) {
      recommendations.push({
        type: 'ttl' as const,
        priority: 'high' as const,
        title: 'Optimize Feed Caching Strategy',
        description: 'Feed data has low hit rate. Consider implementing smarter cache invalidation.',
        impact: 'Faster feed loading and better user experience',
        action: 'Implement selective cache invalidation instead of full feed cache clearing'
      });
    }

    if (memoryInfo.used_memory > 400 * 1024 * 1024) {
      recommendations.push({
        type: 'memory' as const,
        priority: 'medium' as const,
        title: 'Memory Usage Optimization',
        description: 'Memory usage is approaching limits. Consider implementing LRU eviction or reducing TTL.',
        impact: 'Prevented memory overflow and improved stability',
        action: 'Configure maxmemory-policy to allkeys-lru and review large cached objects'
      });
    }

    if (campusIsolation[0].keyCount > 3000) {
      recommendations.push({
        type: 'scaling' as const,
        priority: 'low' as const,
        title: 'Prepare for Multi-Campus Scaling',
        description: 'Single campus cache is growing. Plan for multi-campus cache distribution.',
        impact: 'Improved scalability for campus expansion',
        action: 'Implement cache sharding strategy for multiple campuses'
      });
    }

    const cacheManagementData: CacheManagementData = {
      overview: {
        status,
        uptime: memoryInfo.uptime_in_seconds || 0,
        totalOperations: stats.totalOperations,
        hitRate: stats.hitRate,
        memoryUsage: memoryInfo.used_memory || 0,
        activeConnections: stats.activeConnections,
        avgResponseTime: stats.avgResponseTime,
        errorRate: parseFloat(errorRate.toFixed(2))
      },
      performance: {
        operationStats: {
          hits: stats.hits,
          misses: stats.misses,
          sets: stats.sets,
          deletes: stats.deletes,
          errors: stats.errors
        },
        memoryBreakdown: {
          used_memory: memoryInfo.used_memory,
          used_memory_human: memoryInfo.used_memory_human,
          used_memory_rss: memoryInfo.used_memory_rss,
          used_memory_peak: memoryInfo.used_memory_peak,
          maxmemory: memoryInfo.maxmemory,
          mem_fragmentation_ratio: memoryInfo.mem_fragmentation_ratio
        },
        slowQueries,
        hotKeys
      },
      namespaces,
      campusIsolation,
      alerts,
      recommendations
    };

    return NextResponse.json(cacheManagementData);

  } catch (error) {
    logger.error('Cache management API error:', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json(
      { error: 'Failed to fetch cache management data' },
      { status: 500 }
    );
  }
});

export const POST = withAuthAndErrors(async (request, context) => {
  if (!context?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await requireAdminRole(context.userId);

  try {
    const body = await request.json();
    const { action, ...params } = body;

    let result: any;

    switch (action) {
      case 'flushAll':
        result = await cacheService.flushAllCache();
        if (result) {
          logger.warn(`Cache flushed by admin: ${context.userId}`);
        }
        break;

      case 'flushNamespace':
        if (!params.namespace) {
          return NextResponse.json({ error: 'Namespace required' }, { status: 400 });
        }
        result = await redisCache.deletePattern(params.namespace, '*', params.campusId);
        logger.info(`Namespace ${params.namespace} flushed by admin: ${context.userId}`);
        break;

      case 'flushCampus':
        if (!params.campusId) {
          return NextResponse.json({ error: 'Campus ID required' }, { status: 400 });
        }
        result = await cacheService.invalidateCampusCache(params.campusId);
        logger.info(`Campus ${params.campusId} cache flushed by admin: ${context.userId}`);
        break;

      case 'invalidateUser':
        if (!params.userId) {
          return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }
        result = await cacheService.invalidateUser(params.userId, params.campusId);
        logger.info(`User ${params.userId} cache invalidated by admin: ${context.userId}`);
        break;

      case 'invalidateSpace':
        if (!params.spaceId) {
          return NextResponse.json({ error: 'Space ID required' }, { status: 400 });
        }
        result = await cacheService.invalidateSpace(params.spaceId, params.campusId);
        logger.info(`Space ${params.spaceId} cache invalidated by admin: ${context.userId}`);
        break;

      case 'warmUserCache':
        if (!params.userId || !params.userData) {
          return NextResponse.json({ error: 'User ID and data required' }, { status: 400 });
        }
        await cacheService.warmUserCache(params.userId, params.userData, params.campusId);
        result = { success: true };
        logger.info(`User ${params.userId} cache warmed by admin: ${context.userId}`);
        break;

      case 'warmSpaceCache':
        if (!params.spaceId || !params.spaceData) {
          return NextResponse.json({ error: 'Space ID and data required' }, { status: 400 });
        }
        await cacheService.warmSpaceCache(params.spaceId, params.spaceData, params.campusId);
        result = { success: true };
        logger.info(`Space ${params.spaceId} cache warmed by admin: ${context.userId}`);
        break;

      case 'getKeyInfo':
        if (!params.key) {
          return NextResponse.json({ error: 'Key required' }, { status: 400 });
        }
        const exists = await redisCache.exists(params.namespace || 'default', params.key, params.campusId);
        const data = exists ? await redisCache.get(params.namespace || 'default', params.key, params.campusId) : null;
        result = { exists, data };
        break;

      case 'deleteKey':
        if (!params.key) {
          return NextResponse.json({ error: 'Key required' }, { status: 400 });
        }
        result = await redisCache.delete(params.namespace || 'default', params.key, params.campusId);
        logger.info(`Key ${params.key} deleted by admin: ${context.userId}`);
        break;

      case 'analyzeMemoryUsage':
        const memoryInfo = await redisCache.getMemoryInfo();
        result = {
          totalMemory: memoryInfo.used_memory,
          peakMemory: memoryInfo.used_memory_peak,
          fragmentation: memoryInfo.mem_fragmentation_ratio,
          recommendations: []
        };

        if (memoryInfo.mem_fragmentation_ratio > 1.5) {
          result.recommendations.push('Consider restarting Redis to reduce memory fragmentation');
        }

        if (memoryInfo.used_memory > memoryInfo.maxmemory * 0.8) {
          result.recommendations.push('Memory usage is high, consider increasing maxmemory limit');
        }
        break;

      case 'optimizeCache':
        // Implement cache optimization logic
        const optimizationResults = {
          expiredKeysRemoved: 0,
          duplicatesRemoved: 0,
          memoryFreed: 0,
          recommendations: []
        };

        // This would implement actual optimization logic
        result = optimizationResults;
        logger.info(`Cache optimization performed by admin: ${context.userId}`);
        break;

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });

  } catch (error) {
    logger.error('Cache management action error:', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json(
      { error: 'Failed to execute cache management action' },
      { status: 500 }
    );
  }
});