import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, getDocs, orderBy, limit as fbLimit } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// Feed caching interfaces
interface FeedCache {
  id: string;
  userId: string;
  cacheKey: string;
  feedType: 'personal' | 'campus' | 'trending' | 'space_specific';
  content: any[];
  metadata: {
    totalItems: number;
    averageQuality: number;
    diversityScore: number;
    toolContentPercentage: number;
    generationTime: number;
    algorithmVersion: string;
  };
  parameters: {
    spaceIds: string[];
    contentTypes: string[];
    timeRange: string;
    qualityThreshold: number;
  };
  createdAt: string;
  expiresAt: string;
  lastAccessed: string;
  accessCount: number;
  isValid: boolean;
}

interface CacheStats {
  hitRate: number;
  averageGenerationTime: number;
  totalCacheSize: number;
  activeCaches: number;
  expiredCaches: number;
  userCacheCount: number;
}

interface CacheConfig {
  ttl: number; // Time to live in minutes
  maxCacheSize: number; // Maximum items per cache
  enableCompression: boolean;
  enablePrefetching: boolean;
  invalidationStrategy: 'time_based' | 'content_based' | 'hybrid';
  prefetchTriggers: string[];
}

// POST - Get cached feed or generate new cache
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      feedType = 'personal',
      spaceIds = [],
      contentTypes = ['tool_generated', 'tool_enhanced'],
      timeRange = '24h',
      qualityThreshold = 70,
      forceRefresh = false,
      enableCaching = true
    } = body;

    // Generate cache key
    const cacheKey = generateCacheKey({
      userId: user.uid,
      feedType,
      spaceIds,
      contentTypes,
      timeRange,
      qualityThreshold
    });

    const startTime = Date.now();

    // Try to get cached feed if not forcing refresh
    if (!forceRefresh && enableCaching) {
      const cachedFeed = await getCachedFeed(cacheKey, user.uid);
      if (cachedFeed) {
        // Update access stats
        await updateCacheAccess(cachedFeed.id);
        
        return NextResponse.json({
          success: true,
          content: cachedFeed.content,
          metadata: {
            ...cachedFeed.metadata,
            cached: true,
            cacheAge: Date.now() - new Date(cachedFeed.createdAt).getTime(),
            accessCount: cachedFeed.accessCount + 1
          }
        });
      }
    }

    // Generate new feed content (this would call the aggregation and algorithm APIs)
    const feedContent = await generateFeedContent({
      userId: user.uid,
      feedType,
      spaceIds,
      contentTypes,
      timeRange,
      qualityThreshold
    });

    const generationTime = Date.now() - startTime;

    // Cache the result if caching is enabled
    if (enableCaching) {
      await cacheFeedContent({
        userId: user.uid,
        cacheKey,
        feedType,
        content: feedContent.items,
        metadata: {
          ...feedContent.metadata,
          generationTime,
          algorithmVersion: '2.0'
        },
        parameters: {
          spaceIds,
          contentTypes,
          timeRange,
          qualityThreshold
        }
      });
    }

    return NextResponse.json({
      success: true,
      content: feedContent.items,
      metadata: {
        ...feedContent.metadata,
        cached: false,
        generationTime,
        cacheKey: enableCaching ? cacheKey : null
      }
    });
  } catch (error) {
    console.error('Error handling feed cache request:', error);
    return NextResponse.json({ error: 'Failed to process feed request' }, { status: 500 });
  }
}

// GET - Get cache statistics and management info
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'stats';
    const cacheKey = searchParams.get('cacheKey');

    switch (action) {
      case 'stats': {
        const stats = await getCacheStats(user.uid);
        return NextResponse.json({ stats });
      }

      case 'list': {
        const userCaches = await getUserCaches(user.uid);
        return NextResponse.json({ caches: userCaches });
      }

      case 'get': {
        if (!cacheKey) {
          return NextResponse.json({ error: 'Cache key required' }, { status: 400 });
        }
        const cache = await getCachedFeed(cacheKey, user.uid);
        return NextResponse.json({ cache });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error handling cache GET request:', error);
    return NextResponse.json({ error: 'Failed to get cache info' }, { status: 500 });
  }
}

// DELETE - Clear cache or specific cached items
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const cacheKey = searchParams.get('cacheKey');
    const clearAll = searchParams.get('clearAll') === 'true';

    if (clearAll) {
      // Clear all caches for user
      const cleared = await clearUserCaches(user.uid);
      return NextResponse.json({ 
        success: true, 
        message: `Cleared ${cleared} cache entries`
      });
    } else if (cacheKey) {
      // Clear specific cache
      const success = await clearSpecificCache(cacheKey, user.uid);
      return NextResponse.json({ 
        success, 
        message: success ? 'Cache cleared' : 'Cache not found or not owned by user'
      });
    } else {
      return NextResponse.json({ error: 'Cache key or clearAll parameter required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json({ error: 'Failed to clear cache' }, { status: 500 });
  }
}

// Helper function to generate cache key
function generateCacheKey(params: {
  userId: string;
  feedType: string;
  spaceIds: string[];
  contentTypes: string[];
  timeRange: string;
  qualityThreshold: number;
}): string {
  const { userId, feedType, spaceIds, contentTypes, timeRange, qualityThreshold } = params;
  
  const keyData = {
    userId,
    feedType,
    spaceIds: spaceIds.sort(), // Sort for consistent cache keys
    contentTypes: contentTypes.sort(),
    timeRange,
    qualityThreshold
  };

  // Create a hash-like key (simplified for demo)
  const keyString = JSON.stringify(keyData);
  const hash = keyString.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  return `feed_${Math.abs(hash)}_${Date.now().toString(36)}`;
}

// Helper function to get cached feed
async function getCachedFeed(cacheKey: string, userId: string): Promise<FeedCache | null> {
  try {
    const cacheDoc = await getDoc(doc(db, 'feedCaches', cacheKey));
    
    if (!cacheDoc.exists()) {
      return null;
    }

    const cache = { id: cacheDoc.id, ...cacheDoc.data() } as FeedCache;
    
    // Check if cache belongs to user
    if (cache.userId !== userId) {
      return null;
    }

    // Check if cache is expired
    const now = new Date();
    const expiresAt = new Date(cache.expiresAt);
    
    if (now > expiresAt || !cache.isValid) {
      // Remove expired cache
      await deleteDoc(doc(db, 'feedCaches', cacheKey));
      return null;
    }

    return cache;
  } catch (error) {
    console.error('Error getting cached feed:', error);
    return null;
  }
}

// Helper function to cache feed content
async function cacheFeedContent(params: {
  userId: string;
  cacheKey: string;
  feedType: string;
  content: any[];
  metadata: any;
  parameters: any;
}): Promise<void> {
  try {
    const { userId, cacheKey, feedType, content, metadata, parameters } = params;
    
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (15 * 60 * 1000)); // 15 minutes TTL

    const cache: FeedCache = {
      id: cacheKey,
      userId,
      cacheKey,
      feedType: feedType as FeedCache['feedType'],
      content,
      metadata,
      parameters,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      lastAccessed: now.toISOString(),
      accessCount: 0,
      isValid: true
    };

    await setDoc(doc(db, 'feedCaches', cacheKey), cache);
  } catch (error) {
    console.error('Error caching feed content:', error);
  }
}

// Helper function to update cache access
async function updateCacheAccess(cacheId: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'feedCaches', cacheId), {
      lastAccessed: new Date().toISOString(),
      accessCount: (await getDoc(doc(db, 'feedCaches', cacheId))).data()?.accessCount || 0 + 1
    });
  } catch (error) {
    console.error('Error updating cache access:', error);
  }
}

// Helper function to generate feed content (mock implementation)
async function generateFeedContent(params: {
  userId: string;
  feedType: string;
  spaceIds: string[];
  contentTypes: string[];
  timeRange: string;
  qualityThreshold: number;
}): Promise<{ items: any[]; metadata: any }> {
  // This would integrate with the actual feed algorithm APIs
  // For now, return mock data structure
  
  const mockItems = [
    {
      id: 'mock_1',
      type: 'tool_generated',
      content: 'Sample tool-generated content',
      relevanceScore: 85,
      qualityScore: 90,
      timestamp: new Date().toISOString()
    },
    {
      id: 'mock_2',
      type: 'space_event',
      content: 'Sample space event',
      relevanceScore: 75,
      qualityScore: 80,
      timestamp: new Date().toISOString()
    }
  ];

  const metadata = {
    totalItems: mockItems.length,
    averageQuality: 85,
    diversityScore: 80,
    toolContentPercentage: 50,
    algorithmVersion: '2.0'
  };

  return { items: mockItems, metadata };
}

// Helper function to get cache statistics
async function getCacheStats(userId: string): Promise<CacheStats> {
  try {
    const userCachesQuery = query(
      collection(db, 'feedCaches'),
      where('userId', '==', userId)
    );

    const userCachesSnapshot = await getDocs(userCachesQuery);
    const userCaches = userCachesSnapshot.docs.map(doc => doc.data() as FeedCache);

    const now = new Date();
    const activeCaches = userCaches.filter(cache => 
      new Date(cache.expiresAt) > now && cache.isValid
    );
    const expiredCaches = userCaches.filter(cache => 
      new Date(cache.expiresAt) <= now || !cache.isValid
    );

    // Calculate hit rate (simplified)
    const totalAccesses = userCaches.reduce((sum, cache) => sum + cache.accessCount, 0);
    const hitRate = userCaches.length > 0 ? (totalAccesses / userCaches.length) : 0;

    // Calculate average generation time
    const avgGenerationTime = userCaches.reduce((sum, cache) => 
      sum + (cache.metadata.generationTime || 0), 0
    ) / (userCaches.length || 1);

    // Calculate total cache size
    const totalCacheSize = userCaches.reduce((sum, cache) => 
      sum + cache.content.length, 0
    );

    return {
      hitRate,
      averageGenerationTime: avgGenerationTime,
      totalCacheSize,
      activeCaches: activeCaches.length,
      expiredCaches: expiredCaches.length,
      userCacheCount: userCaches.length
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return {
      hitRate: 0,
      averageGenerationTime: 0,
      totalCacheSize: 0,
      activeCaches: 0,
      expiredCaches: 0,
      userCacheCount: 0
    };
  }
}

// Helper function to get user caches
async function getUserCaches(userId: string): Promise<FeedCache[]> {
  try {
    const userCachesQuery = query(
      collection(db, 'feedCaches'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      fbLimit(20)
    );

    const userCachesSnapshot = await getDocs(userCachesQuery);
    return userCachesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FeedCache[];
  } catch (error) {
    console.error('Error getting user caches:', error);
    return [];
  }
}

// Helper function to clear user caches
async function clearUserCaches(userId: string): Promise<number> {
  try {
    const userCachesQuery = query(
      collection(db, 'feedCaches'),
      where('userId', '==', userId)
    );

    const userCachesSnapshot = await getDocs(userCachesQuery);
    let cleared = 0;

    for (const cacheDoc of userCachesSnapshot.docs) {
      await deleteDoc(cacheDoc.ref);
      cleared++;
    }

    return cleared;
  } catch (error) {
    console.error('Error clearing user caches:', error);
    return 0;
  }
}

// Helper function to clear specific cache
async function clearSpecificCache(cacheKey: string, userId: string): Promise<boolean> {
  try {
    const cacheDoc = await getDoc(doc(db, 'feedCaches', cacheKey));
    
    if (!cacheDoc.exists()) {
      return false;
    }

    const cache = cacheDoc.data() as FeedCache;
    
    // Check ownership
    if (cache.userId !== userId) {
      return false;
    }

    await deleteDoc(doc(db, 'feedCaches', cacheKey));
    return true;
  } catch (error) {
    console.error('Error clearing specific cache:', error);
    return false;
  }
}

// Background cleanup function (would be called by a scheduled job)
export async function cleanupExpiredCaches(): Promise<number> {
  try {
    const now = new Date();
    const expiredCachesQuery = query(
      collection(db, 'feedCaches'),
      where('expiresAt', '<', now.toISOString())
    );

    const expiredCachesSnapshot = await getDocs(expiredCachesQuery);
    let cleaned = 0;

    for (const cacheDoc of expiredCachesSnapshot.docs) {
      await deleteDoc(cacheDoc.ref);
      cleaned++;
    }

    return cleaned;
  } catch (error) {
    console.error('Error cleaning up expired caches:', error);
    return 0;
  }
}