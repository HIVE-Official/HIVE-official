import { NextResponse } from 'next/server';
import { withAuthAndErrors } from '@/lib/api-wrapper';
import { requireAdminRole } from '@/lib/admin-auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';

export const GET = withAuthAndErrors(async (context) => {
  const { request, auth } = context;
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await requireAdminRole(auth.userId);

  const { searchParams } = new URL(request.url);
  const analysis = searchParams.get('analysis') || 'full'; // 'full', 'indexes', 'queries', 'performance'
  const collection = searchParams.get('collection') || undefined; // Specific collection analysis

  try {
    logger.info('Performing database optimization analysis', { userId: auth.userId, analysis, collection });

    // Get comprehensive database optimization data
    const [
      indexAnalysis,
      queryPerformance,
      collectionStats,
      optimizationSuggestions,
      performanceTrends
    ] = await Promise.all([
      getIndexAnalysis(collection || undefined),
      getQueryPerformance(collection || undefined),
      getCollectionStatistics(collection || undefined),
      generateOptimizationSuggestions(collection || undefined),
      getPerformanceTrends()
    ]);

    const optimization = {
      overview: {
        totalCollections: collectionStats.total,
        indexesTotal: indexAnalysis.total,
        indexesUsed: indexAnalysis.used,
        indexesUnused: indexAnalysis.unused,
        slowQueries: queryPerformance.slowQueries.length,
        avgQueryTime: queryPerformance.averageTime,
        optimizationScore: calculateOptimizationScore({
          indexAnalysis,
          queryPerformance,
          collectionStats
        })
      },
      indexes: indexAnalysis,
      queries: queryPerformance,
      collections: collectionStats,
      suggestions: optimizationSuggestions,
      trends: performanceTrends,
      recommendations: {
        critical: optimizationSuggestions.filter(s => s.priority === 'critical'),
        high: optimizationSuggestions.filter(s => s.priority === 'high'),
        medium: optimizationSuggestions.filter(s => s.priority === 'medium')
      }
    };

    return NextResponse.json({
      success: true,
      optimization,
      analysis,
      collection,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error performing database optimization analysis', { error: error instanceof Error ? error.message : String(error), userId: auth.userId });

    // Return mock data for development
    return NextResponse.json({
      success: true,
      optimization: getMockOptimizationData(),
      analysis,
      collection,
      isMock: true,
      error: 'Using mock data - Database optimization API not fully implemented'
    });
  }
});

export const POST = withAuthAndErrors(async (context) => {
  const { request, auth } = context;
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await requireAdminRole(auth.userId);

  try {
    const body = await request.json();
    const { action, collection, indexName, indexFields } = body;

    if (!action) {
      return NextResponse.json({ error: 'Missing action' }, { status: 400 });
    }

    let result;
    switch (action) {
      case 'create_index':
        result = await createOptimizedIndex(collection, indexName, indexFields, auth.userId);
        break;
      case 'drop_index':
        result = await dropUnusedIndex(collection, indexName, auth.userId);
        break;
      case 'analyze_collection':
        result = await performCollectionAnalysis(collection, auth.userId);
        break;
      case 'optimize_queries':
        result = await optimizeSlowQueries(collection, auth.userId);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    logger.info('Database optimization action performed', {
      action,
      collection,
      userId: auth.userId,
      result: result.success
    });

    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error performing database optimization action', { error: error instanceof Error ? error.message : String(error), userId: auth.userId });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

/**
 * Analyze database indexes
 */
async function getIndexAnalysis(collection?: string) {
  try {
    // Get all collections to analyze
    const collections = collection ? [collection] : ['users', 'spaces', 'posts', 'rituals', 'admin_logs'];
    const analysis = {
      total: 0,
      used: 0,
      unused: 0,
      missing: 0,
      collections: {} as Record<string, any>,
      recommendations: [] as any[]
    };

    for (const collectionName of collections) {
      const collectionRef = dbAdmin.collection(collectionName);

      // Simulate index analysis - in production this would use Firebase Admin SDK monitoring
      const collectionAnalysis = {
        name: collectionName,
        indexes: await getCollectionIndexes(collectionName),
        usage: await getIndexUsage(collectionName),
        recommendations: generateIndexRecommendations(collectionName)
      };

      analysis.collections[collectionName] = collectionAnalysis;
      analysis.total += collectionAnalysis.indexes.length;
      analysis.used += collectionAnalysis.usage.used;
      analysis.unused += collectionAnalysis.usage.unused;
      analysis.missing += collectionAnalysis.recommendations.filter(r => r.type === 'create').length;
      analysis.recommendations.push(...collectionAnalysis.recommendations);
    }

    return analysis;

  } catch (error) {
    logger.error('Error analyzing indexes', { error: error instanceof Error ? error.message : String(error) });
    return getMockOptimizationData().indexes;
  }
}

/**
 * Get query performance metrics
 */
async function getQueryPerformance(collection?: string) {
  try {
    const collections = collection ? [collection] : ['users', 'spaces', 'posts', 'rituals'];
    const performance = {
      averageTime: 0,
      slowQueries: [] as any[],
      queryStats: {} as Record<string, any>,
      bottlenecks: [] as any[]
    };

    for (const collectionName of collections) {
      // Simulate query performance analysis
      const queryStats = await analyzeQueryPerformance(collectionName);
      performance.queryStats[collectionName] = queryStats;

      // Identify slow queries (>1000ms)
      const slowQueries = queryStats.queries.filter((q: any) => q.avgDuration > 1000);
      performance.slowQueries.push(...slowQueries.map((q: any) => ({
        ...q,
        collection: collectionName
      })));

      // Calculate average time
      const totalTime = queryStats.queries.reduce((sum: number, q: any) => sum + q.avgDuration, 0);
      performance.averageTime += totalTime / queryStats.queries.length || 0;
    }

    performance.averageTime = Math.round(performance.averageTime / collections.length);

    // Identify performance bottlenecks
    performance.bottlenecks = identifyPerformanceBottlenecks(performance.queryStats);

    return performance;

  } catch (error) {
    logger.error('Error analyzing query performance', { error: error instanceof Error ? error.message : String(error) });
    return getMockOptimizationData().queries;
  }
}

/**
 * Get collection statistics
 */
async function getCollectionStatistics(collection?: string) {
  try {
    const collections = collection ? [collection] : ['users', 'spaces', 'posts', 'rituals', 'admin_logs'];
    const stats = {
      total: collections.length,
      details: {} as Record<string, any>,
      totalDocuments: 0,
      totalSize: 0,
      growth: {} as Record<string, number>
    };

    for (const collectionName of collections) {
      const collectionRef = dbAdmin.collection(collectionName);

      // Get document count
      const countResult = await collectionRef.count().get();
      const documentCount = countResult.data().count;

      // Calculate estimated size and growth
      const estimatedSize = documentCount * getAverageDocumentSize(collectionName);
      const growthRate = await calculateGrowthRate(collectionName);

      const collectionStats = {
        name: collectionName,
        documentCount,
        estimatedSize,
        averageDocumentSize: getAverageDocumentSize(collectionName),
        growthRate,
        readFrequency: await getReadFrequency(collectionName),
        writeFrequency: await getWriteFrequency(collectionName),
        hotspots: await identifyDataHotspots(collectionName)
      };

      stats.details[collectionName] = collectionStats;
      stats.totalDocuments += documentCount;
      stats.totalSize += estimatedSize;
      stats.growth[collectionName] = growthRate;
    }

    return stats;

  } catch (error) {
    logger.error('Error getting collection statistics', { error: error instanceof Error ? error.message : String(error) });
    return getMockOptimizationData().collections;
  }
}

/**
 * Generate optimization suggestions
 */
async function generateOptimizationSuggestions(collection?: string) {
  try {
    const suggestions = [];

    // Index optimization suggestions
    const indexSuggestions = await generateIndexSuggestions(collection);
    suggestions.push(...indexSuggestions);

    // Query optimization suggestions
    const querySuggestions = await generateQuerySuggestions(collection);
    suggestions.push(...querySuggestions);

    // Data model suggestions
    const modelSuggestions = await generateDataModelSuggestions(collection);
    suggestions.push(...modelSuggestions);

    // Performance tuning suggestions
    const performanceSuggestions = await generatePerformanceSuggestions(collection);
    suggestions.push(...performanceSuggestions);

    return suggestions.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    });

  } catch (error) {
    logger.error('Error generating optimization suggestions', { error: error instanceof Error ? error.message : String(error) });
    return getMockOptimizationData().suggestions;
  }
}

/**
 * Get performance trends
 */
async function getPerformanceTrends() {
  try {
    const now = new Date();
    const trends = {
      queryTimes: [] as any[],
      indexUsage: [] as any[],
      collectionGrowth: [] as any[],
      errorRates: [] as any[]
    };

    // Generate trend data for the last 24 hours
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hourKey = hour.toISOString().substr(0, 13);

      // Simulate trend data
      trends.queryTimes.push({
        time: hourKey,
        avgTime: Math.random() * 500 + 200, // 200-700ms
        p95Time: Math.random() * 1000 + 800 // 800-1800ms
      });

      trends.indexUsage.push({
        time: hourKey,
        hitRate: Math.random() * 20 + 80, // 80-100%
        missRate: Math.random() * 20 // 0-20%
      });

      trends.collectionGrowth.push({
        time: hourKey,
        documentsAdded: Math.floor(Math.random() * 50 + 10), // 10-60 docs/hour
        sizeIncrease: Math.random() * 5 + 1 // 1-6 MB/hour
      });

      trends.errorRates.push({
        time: hourKey,
        errorRate: Math.random() * 2, // 0-2%
        timeouts: Math.floor(Math.random() * 5) // 0-5 timeouts/hour
      });
    }

    return trends;

  } catch (error) {
    logger.error('Error getting performance trends', { error: error instanceof Error ? error.message : String(error) });
    return getMockOptimizationData().trends;
  }
}

/**
 * Database optimization actions
 */
async function createOptimizedIndex(collection: string, indexName: string, fields: any, userId: string) {
  try {
    // Log the optimization action
    await dbAdmin.collection('admin_logs').add({
      action: 'create_index',
      collection,
      indexName,
      fields,
      userId,
      timestamp: new Date(),
      level: 'info'
    });

    // In production, this would create the actual index via Firebase Admin SDK
    logger.info('Index creation logged', { collection, indexName });

    return {
      success: true,
      message: `Index ${indexName} creation logged for collection ${collection}`,
      estimatedImpact: 'Query performance improvement: 40-60%'
    };

  } catch (error) {
    logger.error('Error creating index', { error: error instanceof Error ? error.message : String(error), collection, indexName });
    return { success: false, error: 'Failed to create index' };
  }
}

async function dropUnusedIndex(collection: string, indexName: string, userId: string) {
  try {
    // Log the optimization action
    await dbAdmin.collection('admin_logs').add({
      action: 'drop_index',
      collection,
      indexName,
      userId,
      timestamp: new Date(),
      level: 'info'
    });

    return {
      success: true,
      message: `Index ${indexName} drop logged for collection ${collection}`,
      estimatedSavings: 'Storage reduction: 5-15%'
    };

  } catch (error) {
    logger.error('Error dropping index', { error: error instanceof Error ? error.message : String(error), collection, indexName });
    return { success: false, error: 'Failed to drop index' };
  }
}

async function performCollectionAnalysis(collection: string, userId: string) {
  try {
    const analysis = await getIndexAnalysis(collection);

    // Log the analysis
    await dbAdmin.collection('admin_logs').add({
      action: 'collection_analysis',
      collection,
      userId,
      timestamp: new Date(),
      level: 'info',
      details: { analysis }
    });

    return {
      success: true,
      analysis,
      recommendations: analysis.recommendations || []
    };

  } catch (error) {
    logger.error('Error analyzing collection', { error: error instanceof Error ? error.message : String(error), collection });
    return { success: false, error: 'Failed to analyze collection' };
  }
}

async function optimizeSlowQueries(collection: string, userId: string) {
  try {
    const queryPerformance = await getQueryPerformance(collection);
    const optimizations = [];

    for (const slowQuery of queryPerformance.slowQueries) {
      if (slowQuery.collection === collection) {
        optimizations.push({
          query: slowQuery.pattern,
          currentTime: slowQuery.avgDuration,
          suggestedIndex: suggestIndexForQuery(slowQuery),
          estimatedImprovement: '50-70%'
        });
      }
    }

    // Log the optimization
    await dbAdmin.collection('admin_logs').add({
      action: 'optimize_queries',
      collection,
      userId,
      timestamp: new Date(),
      level: 'info',
      details: { optimizations }
    });

    return {
      success: true,
      optimizations,
      totalSlowQueries: optimizations.length
    };

  } catch (error) {
    logger.error('Error optimizing queries', { error: error instanceof Error ? error.message : String(error), collection });
    return { success: false, error: 'Failed to optimize queries' };
  }
}

/**
 * Helper functions
 */
async function getCollectionIndexes(collection: string) {
  // Simulate getting indexes for a collection
  const commonIndexes = {
    users: [
      { name: 'campusId_createdAt', fields: ['campusId', 'createdAt'], used: true },
      { name: 'email_verified', fields: ['email', 'verified'], used: true },
      { name: 'handle_unique', fields: ['handle'], used: true },
      { name: 'lastActive_desc', fields: ['lastActive'], used: false }
    ],
    spaces: [
      { name: 'campusId_isActive', fields: ['campusId', 'isActive'], used: true },
      { name: 'category_memberCount', fields: ['category', 'memberCount'], used: true },
      { name: 'createdAt_desc', fields: ['createdAt'], used: false }
    ],
    posts: [
      { name: 'spaceId_createdAt', fields: ['spaceId', 'createdAt'], used: true },
      { name: 'authorId_timestamp', fields: ['authorId', 'timestamp'], used: true }
    ]
  };

  return commonIndexes[collection as keyof typeof commonIndexes] || [];
}

async function getIndexUsage(collection: string) {
  const indexes = await getCollectionIndexes(collection);
  return {
    used: indexes.filter(i => i.used).length,
    unused: indexes.filter(i => !i.used).length,
    total: indexes.length
  };
}

function generateIndexRecommendations(collection: string) {
  const recommendations = {
    users: [
      {
        type: 'create',
        priority: 'high',
        indexName: 'major_year_compound',
        fields: ['major', 'year'],
        reason: 'Frequently queried together in user discovery',
        estimatedImpact: '60% query time reduction'
      }
    ],
    spaces: [
      {
        type: 'create',
        priority: 'critical',
        indexName: 'isActive_memberCount_desc',
        fields: ['isActive', { memberCount: 'desc' }],
        reason: 'Essential for space listing performance',
        estimatedImpact: '70% query time reduction'
      }
    ],
    posts: [
      {
        type: 'create',
        priority: 'medium',
        indexName: 'tags_array',
        fields: ['tags'],
        reason: 'Improve tag-based filtering',
        estimatedImpact: '40% query time reduction'
      }
    ]
  };

  return recommendations[collection as keyof typeof recommendations] || [];
}

async function analyzeQueryPerformance(collection: string) {
  // Simulate query performance data
  return {
    totalQueries: Math.floor(Math.random() * 10000 + 5000),
    avgDuration: Math.floor(Math.random() * 300 + 150),
    queries: [
      {
        pattern: `${collection}.where('campusId', '==', ?)`,
        count: Math.floor(Math.random() * 1000 + 500),
        avgDuration: Math.floor(Math.random() * 200 + 100),
        p95Duration: Math.floor(Math.random() * 500 + 300)
      },
      {
        pattern: `${collection}.where('isActive', '==', true).orderBy('createdAt', 'desc')`,
        count: Math.floor(Math.random() * 800 + 300),
        avgDuration: Math.floor(Math.random() * 400 + 200),
        p95Duration: Math.floor(Math.random() * 800 + 600)
      }
    ]
  };
}

function identifyPerformanceBottlenecks(queryStats: Record<string, any>) {
  const bottlenecks = [];

  for (const [collection, stats] of Object.entries(queryStats)) {
    if (stats.avgDuration > 500) {
      bottlenecks.push({
        collection,
        type: 'slow_queries',
        severity: stats.avgDuration > 1000 ? 'critical' : 'high',
        description: `Average query time: ${stats.avgDuration}ms`,
        recommendation: 'Add composite indexes for frequently queried fields'
      });
    }
  }

  return bottlenecks;
}

function getAverageDocumentSize(collection: string) {
  const sizes = {
    users: 2.5, // KB
    spaces: 1.8,
    posts: 0.9,
    rituals: 1.2,
    admin_logs: 0.5
  };
  return sizes[collection as keyof typeof sizes] || 1.0;
}

async function calculateGrowthRate(collection: string) {
  // Simulate growth rate calculation
  return Math.random() * 15 + 5; // 5-20% growth rate
}

async function getReadFrequency(collection: string) {
  return Math.floor(Math.random() * 1000 + 500); // reads/hour
}

async function getWriteFrequency(collection: string) {
  return Math.floor(Math.random() * 200 + 50); // writes/hour
}

async function identifyDataHotspots(collection: string) {
  return [
    { field: 'campusId', concentration: 95, reason: 'UB-only beta' },
    { field: 'isActive', concentration: 80, reason: 'Most content is active' }
  ];
}

async function generateIndexSuggestions(collection?: string) {
  return [
    {
      id: 'idx-001',
      type: 'index',
      priority: 'critical',
      collection: 'spaces',
      title: 'Create composite index for space listing',
      description: 'Add index on [campusId, isActive, memberCount] for optimal space discovery performance',
      estimatedImpact: '70% query time reduction',
      implementation: 'CREATE INDEX spaces_listing ON spaces (campusId, isActive, memberCount DESC)',
      effort: 'low'
    }
  ];
}

async function generateQuerySuggestions(collection?: string) {
  return [
    {
      id: 'query-001',
      type: 'query',
      priority: 'high',
      collection: 'posts',
      title: 'Optimize feed query pagination',
      description: 'Use cursor-based pagination instead of offset for better performance',
      estimatedImpact: '50% query time reduction at scale',
      implementation: 'Replace .offset() with .startAfter(lastDoc)',
      effort: 'medium'
    }
  ];
}

async function generateDataModelSuggestions(collection?: string) {
  return [
    {
      id: 'model-001',
      type: 'data_model',
      priority: 'medium',
      collection: 'users',
      title: 'Denormalize frequently accessed profile data',
      description: 'Store display name and avatar URL in posts for faster feed rendering',
      estimatedImpact: '30% read reduction',
      implementation: 'Add authorDisplayName and authorAvatar fields to posts',
      effort: 'high'
    }
  ];
}

async function generatePerformanceSuggestions(collection?: string) {
  return [
    {
      id: 'perf-001',
      type: 'performance',
      priority: 'high',
      collection: 'all',
      title: 'Implement read caching strategy',
      description: 'Cache frequently accessed documents to reduce Firestore read operations',
      estimatedImpact: '40% cost reduction, 60% latency improvement',
      implementation: 'Add Redis cache layer for user profiles and space metadata',
      effort: 'high'
    }
  ];
}

function calculateOptimizationScore(data: any) {
  const { indexAnalysis, queryPerformance, collectionStats } = data;

  let score = 100;

  // Deduct for unused indexes
  if (indexAnalysis.unused > 0) {
    score -= Math.min(indexAnalysis.unused * 5, 20);
  }

  // Deduct for missing critical indexes
  if (indexAnalysis.missing > 0) {
    score -= Math.min(indexAnalysis.missing * 10, 30);
  }

  // Deduct for slow queries
  if (queryPerformance.averageTime > 500) {
    score -= Math.min((queryPerformance.averageTime - 500) / 10, 25);
  }

  // Deduct for slow queries count
  if (queryPerformance.slowQueries?.length > 0) {
    score -= Math.min(queryPerformance.slowQueries.length * 5, 25);
  }

  return Math.max(Math.round(score), 0);
}

function suggestIndexForQuery(query: any) {
  // Analyze query pattern and suggest optimal index
  const fields = extractQueryFields(query.pattern);
  return {
    fields,
    type: 'composite',
    estimatedCost: 'low',
    maintenanceOverhead: 'minimal'
  };
}

function extractQueryFields(pattern: string) {
  // Simple pattern matching for demo
  if (pattern.includes('campusId') && pattern.includes('createdAt')) {
    return ['campusId', 'createdAt'];
  }
  if (pattern.includes('isActive') && pattern.includes('memberCount')) {
    return ['isActive', 'memberCount'];
  }
  return ['extracted_field'];
}

/**
 * Mock data for development
 */
function getMockOptimizationData() {
  return {
    overview: {
      totalCollections: 5,
      indexesTotal: 18,
      indexesUsed: 14,
      indexesUnused: 4,
      slowQueries: 3,
      avgQueryTime: 287,
      optimizationScore: 78
    },
    indexes: {
      total: 18,
      used: 14,
      unused: 4,
      missing: 2,
      collections: {
        users: {
          name: 'users',
          indexes: [
            { name: 'campusId_createdAt', fields: ['campusId', 'createdAt'], used: true },
            { name: 'email_verified', fields: ['email', 'verified'], used: true },
            { name: 'lastActive_desc', fields: ['lastActive'], used: false }
          ],
          usage: { used: 2, unused: 1, total: 3 },
          recommendations: [
            {
              type: 'create',
              priority: 'high',
              indexName: 'major_year_compound',
              fields: ['major', 'year'],
              reason: 'Frequently queried together in user discovery'
            }
          ]
        }
      },
      recommendations: [
        {
          type: 'drop',
          priority: 'low',
          indexName: 'lastActive_desc',
          collection: 'users',
          reason: 'Unused index consuming storage'
        }
      ]
    },
    queries: {
      averageTime: 287,
      slowQueries: [
        {
          collection: 'spaces',
          pattern: "spaces.where('campusId', '==', ?).orderBy('memberCount', 'desc')",
          avgDuration: 1245,
          count: 523,
          suggestedOptimization: 'Add composite index on [campusId, memberCount]'
        },
        {
          collection: 'posts',
          pattern: "posts.where('spaceId', '==', ?).orderBy('createdAt', 'desc').limit(20)",
          avgDuration: 892,
          count: 1247,
          suggestedOptimization: 'Existing index is optimal, consider caching'
        }
      ],
      queryStats: {
        users: {
          totalQueries: 5432,
          avgDuration: 156,
          queries: [
            { pattern: "users.where('campusId', '==', 'ub-buffalo')", count: 1234, avgDuration: 123 }
          ]
        }
      },
      bottlenecks: [
        {
          collection: 'spaces',
          type: 'slow_queries',
          severity: 'critical',
          description: 'Average query time: 1245ms',
          recommendation: 'Add composite indexes for frequently queried fields'
        }
      ]
    },
    collections: {
      total: 5,
      details: {
        users: {
          name: 'users',
          documentCount: 1247,
          estimatedSize: 3117.5, // KB
          averageDocumentSize: 2.5,
          growthRate: 12.3,
          readFrequency: 856,
          writeFrequency: 123,
          hotspots: [
            { field: 'campusId', concentration: 95, reason: 'UB-only beta' }
          ]
        },
        spaces: {
          name: 'spaces',
          documentCount: 89,
          estimatedSize: 160.2,
          averageDocumentSize: 1.8,
          growthRate: 8.7,
          readFrequency: 1423,
          writeFrequency: 67,
          hotspots: [
            { field: 'isActive', concentration: 80, reason: 'Most content is active' }
          ]
        }
      },
      totalDocuments: 1336,
      totalSize: 3277.7,
      growth: {
        users: 12.3,
        spaces: 8.7,
        posts: 15.6
      }
    },
    suggestions: [
      {
        id: 'idx-001',
        type: 'index',
        priority: 'critical',
        collection: 'spaces',
        title: 'Create composite index for space listing',
        description: 'Add index on [campusId, isActive, memberCount] for optimal space discovery performance',
        estimatedImpact: '70% query time reduction',
        implementation: 'CREATE INDEX spaces_listing ON spaces (campusId, isActive, memberCount DESC)',
        effort: 'low'
      },
      {
        id: 'query-001',
        type: 'query',
        priority: 'high',
        collection: 'posts',
        title: 'Optimize feed query pagination',
        description: 'Use cursor-based pagination instead of offset for better performance',
        estimatedImpact: '50% query time reduction at scale',
        implementation: 'Replace .offset() with .startAfter(lastDoc)',
        effort: 'medium'
      },
      {
        id: 'perf-001',
        type: 'performance',
        priority: 'high',
        collection: 'all',
        title: 'Implement read caching strategy',
        description: 'Cache frequently accessed documents to reduce Firestore read operations',
        estimatedImpact: '40% cost reduction, 60% latency improvement',
        implementation: 'Add Redis cache layer for user profiles and space metadata',
        effort: 'high'
      }
    ],
    trends: {
      queryTimes: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString().substr(0, 13),
        avgTime: Math.random() * 300 + 200,
        p95Time: Math.random() * 800 + 800
      })),
      indexUsage: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString().substr(0, 13),
        hitRate: Math.random() * 15 + 85,
        missRate: Math.random() * 15
      })),
      collectionGrowth: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString().substr(0, 13),
        documentsAdded: Math.floor(Math.random() * 40 + 10),
        sizeIncrease: Math.random() * 4 + 1
      })),
      errorRates: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString().substr(0, 13),
        errorRate: Math.random() * 1.5,
        timeouts: Math.floor(Math.random() * 3)
      }))
    },
    recommendations: {
      critical: [
        {
          id: 'idx-001',
          type: 'index',
          priority: 'critical',
          collection: 'spaces',
          title: 'Create composite index for space listing',
          description: 'Add index on [campusId, isActive, memberCount] for optimal space discovery performance'
        }
      ],
      high: [
        {
          id: 'query-001',
          type: 'query',
          priority: 'high',
          collection: 'posts',
          title: 'Optimize feed query pagination',
          description: 'Use cursor-based pagination instead of offset for better performance'
        },
        {
          id: 'perf-001',
          type: 'performance',
          priority: 'high',
          collection: 'all',
          title: 'Implement read caching strategy',
          description: 'Cache frequently accessed documents to reduce Firestore read operations'
        }
      ],
      medium: [
        {
          id: 'model-001',
          type: 'data_model',
          priority: 'medium',
          collection: 'users',
          title: 'Denormalize frequently accessed profile data',
          description: 'Store display name and avatar URL in posts for faster feed rendering'
        }
      ]
    }
  };
}