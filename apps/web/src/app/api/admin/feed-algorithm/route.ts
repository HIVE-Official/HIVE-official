import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/structured-logger";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware/index";
import { isAdmin } from '@/lib/admin-auth';

const AlgorithmConfigSchema = z.object({
  temporalWeights: z.object({
    happeningNow: z.number().min(0).max(100),
    next2Hours: z.number().min(0).max(100),
    today: z.number().min(0).max(100),
    tomorrow: z.number().min(0).max(100),
    thisWeek: z.number().min(0).max(100),
    pastEvents: z.number().min(0).max(100),
  }),
  contentTypePriorities: z.object({
    liveEvent: z.number().min(1).max(10),
    ritualContent: z.number().min(1).max(10),
    upcomingEvent: z.number().min(1).max(10),
    userPost: z.number().min(1).max(10),
    spaceActivity: z.number().min(1).max(10),
    rssEvent: z.number().min(1).max(10),
  }),
  engagementFactors: z.object({
    recencyWeight: z.number().min(0).max(1),
    popularityWeight: z.number().min(0).max(1),
    membershipWeight: z.number().min(0).max(1),
    builderBonus: z.number().min(0).max(20),
  }),
  feedMixRules: z.object({
    maxEventsPerFeed: z.number().min(1).max(20),
    minPostsPerFeed: z.number().min(0).max(10),
    diversityThreshold: z.number().min(0).max(1),
    campusEventBoost: z.number().min(0).max(1),
  }),
  realTimeSettings: z.object({
    enableSSE: z.boolean(),
    updateInterval: z.number().min(1000).max(30000),
    maxConcurrentUsers: z.number().min(100).max(5000),
    cacheTimeout: z.number().min(60).max(3600),
  }),
});

const DEFAULT_CONFIG = {
  temporalWeights: {
    happeningNow: 100,
    next2Hours: 90,
    today: 70,
    tomorrow: 60,
    thisWeek: 40,
    pastEvents: 20,
  },
  contentTypePriorities: {
    liveEvent: 10,
    ritualContent: 9,
    upcomingEvent: 8,
    userPost: 6,
    spaceActivity: 5,
    rssEvent: 4,
  },
  engagementFactors: {
    recencyWeight: 0.3,
    popularityWeight: 0.2,
    membershipWeight: 0.4,
    builderBonus: 5,
  },
  feedMixRules: {
    maxEventsPerFeed: 8,
    minPostsPerFeed: 3,
    diversityThreshold: 0.7,
    campusEventBoost: 0.8,
  },
  realTimeSettings: {
    enableSSE: true,
    updateInterval: 5000,
    maxConcurrentUsers: 1000,
    cacheTimeout: 300,
  },
};

/**
 * GET /api/admin/feed-algorithm
 * Get current algorithm configuration
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);

  logger.info('🔧 Loading feed algorithm config', { userId });

  // Check admin permissions
  const isAdminUser = await isAdmin(userId);
  if (!isAdminUser) {
    return respond.error('Admin access required', 'ADMIN_REQUIRED', { status: 403 });
  }

  try {
    // Get algorithm config from Firestore
    const configDoc = await dbAdmin.collection('admin')
      .doc('feed-algorithm')
      .get();

    let config = DEFAULT_CONFIG;
    let lastUpdated = new Date();

    if (configDoc.exists) {
      const data = configDoc.data();
      config = data?.config || DEFAULT_CONFIG;
      lastUpdated = data?.lastUpdated?.toDate() || new Date();
    }

    // Validate config structure
    const validatedConfig = AlgorithmConfigSchema.parse(config);

    return respond.success({
      config: validatedConfig,
      lastUpdated: lastUpdated.toISOString(),
      isDefault: !configDoc.exists,
      updatedBy: configDoc.data()?.updatedBy || 'system'
    });

  } catch (error: any) {
    logger.error('Error loading algorithm config', error instanceof Error ? error : new Error(String(error)), { userId });

    // Return default config if there's an error
    return respond.success({
      config: DEFAULT_CONFIG,
      lastUpdated: new Date().toISOString(),
      isDefault: true,
      updatedBy: 'system'
    });
  }
});

/**
 * POST /api/admin/feed-algorithm
 * Update algorithm configuration
 */
export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);

  logger.info('🔧 Updating feed algorithm config', { userId });

  // Check admin permissions
  const isAdminUser = await isAdmin(userId);
  if (!isAdminUser) {
    return respond.error('Admin access required', 'ADMIN_REQUIRED', { status: 403 });
  }

  try {
    const body = await request.json();
    const { config } = body;

    // Validate the new configuration
    const validatedConfig = AlgorithmConfigSchema.parse(config);

    // Get admin user info for audit trail
    const adminUser = await dbAdmin.collection('users').doc(userId).get();
    const adminName = adminUser.data()?.name || 'Unknown Admin';

    // Save to Firestore
    const configData = {
      config: validatedConfig,
      lastUpdated: new Date(),
      updatedBy: userId,
      updatedByName: adminName,
      version: Date.now(), // Simple versioning
      previousVersions: [], // TODO: Implement version history
    };

    await dbAdmin.collection('admin')
      .doc('feed-algorithm')
      .set(configData);

    // Log the configuration change
    await logAdminAction(userId, 'feed_algorithm_updated', {
      changes: calculateConfigChanges(DEFAULT_CONFIG, validatedConfig),
      newConfig: validatedConfig
    });

    logger.info('✅ Feed algorithm config updated', {
      userId
    });

    return respond.success({
      config: validatedConfig,
      lastUpdated: configData.lastUpdated.toISOString(),
      updatedBy: adminName,
      version: configData.version,
      message: 'Algorithm configuration updated successfully'
    });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      logger.warn('Invalid algorithm config provided', {
        userId
      });
      return respond.error('Invalid configuration format', 'VALIDATION_ERROR', { status: 400, details: error.errors });
    }

    logger.error('Error updating algorithm config', error instanceof Error ? error : new Error(String(error)), { userId });
    return respond.error('Failed to update algorithm configuration', 'UPDATE_ERROR', { status: 500 });
  }
});


/**
 * Log admin action for audit trail
 */
async function logAdminAction(userId: string, action: string, metadata: any) {
  try {
    await dbAdmin.collection('admin_logs').add({
      userId,
      action,
      metadata,
      timestamp: new Date(),
      ip: 'unknown', // TODO: Extract from request
      userAgent: 'unknown' // TODO: Extract from request
    });
  } catch (error) {
    logger.error('Error logging admin action', error instanceof Error ? error : new Error(String(error)), { userId, action });
  }
}

/**
 * Calculate what changed between configs for audit trail
 */
function calculateConfigChanges(oldConfig: any, newConfig: any): any {
  const changes: any = {};

  function compareObjects(obj1: any, obj2: any, path = '') {
    for (const key in obj2) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof obj2[key] === 'object' && obj2[key] !== null) {
        compareObjects(obj1[key] || {}, obj2[key], currentPath);
      } else if (obj1[key] !== obj2[key]) {
        changes[currentPath] = {
          from: obj1[key],
          to: obj2[key]
        };
      }
    }
  }

  compareObjects(oldConfig, newConfig);
  return changes;
}