import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getAuth as _getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api/middleware/api-auth-middleware';

/**
 * Admin Dashboard - Platform Overview API
 * Provides comprehensive platform statistics and health metrics
 * GET /api/admin/dashboard
 */

// Admin user IDs (TODO: Move to environment variables or admin table)
const ADMIN_USER_IDS = [
  'test-user', // For development
  // Add real admin user IDs here
];

/**
 * Check if user is an admin
 */
async function _isAdmin(userId: string): Promise<boolean> {
  return ADMIN_USER_IDS.includes(userId);
}

/**
 * Get platform overview statistics
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    // This is an admin-only endpoint
    if (!authContext.isAdmin) {
      return ApiResponse.forbidden('Admin access required');
    }

    const adminUserId = authContext.userId;
    
    logger.info('👑 Admin dashboard accessed by', { adminUserId, endpoint: '/api/admin/dashboard' });

    // Collect platform statistics in parallel
    const [
      usersStats,
      spacesStats,
      builderRequestsStats,
      systemHealth
    ] = await Promise.all([
      getUsersStatistics(),
      getSpacesStatistics(),
      getBuilderRequestsStatistics(),
      getSystemHealth()
    ]);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      adminUser: adminUserId,
      platform: {
        name: 'HIVE',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        university: 'University at Buffalo'
      },
      statistics: {
        users: usersStats,
        spaces: spacesStats,
        builderRequests: builderRequestsStats,
        system: systemHealth
      }
    });

  } catch (error) {
    logger.error('Admin dashboard error', { error: error, endpoint: '/api/admin/dashboard' });
    return NextResponse.json(ApiResponseHelper.error("Failed to load admin dashboard", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

/**
 * Get user statistics
 */
async function getUsersStatistics() {
  try {
    const usersSnapshot = await dbAdmin.collection('users').get();
    const users = usersSnapshot.docs.map(doc => doc.data());
    
    // Calculate user metrics
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.lastActiveAt && 
      new Date(u.lastActiveAt?.toDate ? u.lastActiveAt.toDate() : new Date(u.lastActiveAt)).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    ).length;
    
    const usersByMajor = users.reduce((acc, user) => {
      const major = user.major || 'Unknown';
      acc[major] = (acc[major] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const usersByYear = users.reduce((acc, user) => {
      const year = user.classYear || 'Unknown';
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: totalUsers,
      active: activeUsers,
      inactive: totalUsers - activeUsers,
      byMajor: Object.entries(usersByMajor)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .reduce((acc, [major, count]) => ({ ...acc, [major]: count }), {}),
      byYear: usersByYear,
      growth: {
        lastWeek: 0,
        lastMonth: 0
      }
    };
  } catch (error) {
    logger.error('Error getting user statistics', { error: error, endpoint: '/api/admin/dashboard' });
    return {
      total: 0,
      active: 0,
      inactive: 0,
      byMajor: {},
      byYear: {},
      growth: { lastWeek: 0, lastMonth: 0 }
    };
  }
}

/**
 * Get spaces statistics
 */
async function getSpacesStatistics() {
  try {
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    const spaceStats: any = {
      total: 0,
      active: 0,
      dormant: 0,
      byType: {},
      hasBuilders: 0,
      totalMembers: 0
    };

    for (const spaceType of spaceTypes) {
      const spacesSnapshot = await dbAdmin
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();

      const spaces = spacesSnapshot.docs.map(doc => doc.data());
      const typeCount = spaces.length;
      const activeSpaces = spaces.filter(s => s.hasBuilders).length;
      const totalMembers = spaces.reduce((sum, s) => sum + (s.memberCount || 0), 0);

      spaceStats.total += typeCount;
      spaceStats.active += activeSpaces;
      spaceStats.dormant += (typeCount - activeSpaces);
      spaceStats.hasBuilders += spaces.filter(s => s.hasBuilders).length;
      spaceStats.totalMembers += totalMembers;
      spaceStats.byType[spaceType] = {
        total: typeCount,
        active: activeSpaces,
        dormant: typeCount - activeSpaces,
        members: totalMembers
      };
    }

    // Calculate averages
    spaceStats.averageMembers = spaceStats.total > 0 ? 
      Math.round(spaceStats.totalMembers / spaceStats.total) : 0;
    spaceStats.activationRate = spaceStats.total > 0 ? 
      Math.round((spaceStats.active / spaceStats.total) * 100) : 0;

    return spaceStats;
  } catch (error) {
    logger.error('Error getting spaces statistics', { error: error, endpoint: '/api/admin/dashboard' });
    return {
      total: 0,
      active: 0,
      dormant: 0,
      byType: {},
      hasBuilders: 0,
      totalMembers: 0,
      averageMembers: 0,
      activationRate: 0
    };
  }
}

/**
 * Get builder requests statistics
 */
async function getBuilderRequestsStatistics() {
  try {
    const requestsSnapshot = await dbAdmin.collection('builderRequests').get();
    const requests = requestsSnapshot.docs.map(doc => doc.data());

    const stats = {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      approved: requests.filter(r => r.status === 'approved').length,
      rejected: requests.filter(r => r.status === 'rejected').length,
      urgent: requests.filter(r => {
        if (r.status !== 'pending' || !r.submittedAt) return false;
        const hoursWaiting = (Date.now() - (r.submittedAt?.toDate ? r.submittedAt.toDate().getTime() : new Date(r.submittedAt).getTime())) / (1000 * 60 * 60);
        return hoursWaiting >= 20;
      }).length,
      approvalRate: requests.length > 0 ? 
        Math.round((requests.filter(r => r.status === 'approved').length / requests.length) * 100) : 0,
      averageResponseTime: calculateAverageResponseTime(requests)
    };

    return stats;
  } catch (error) {
    logger.error('Error getting builder requests statistics', { error: error, endpoint: '/api/admin/dashboard' });
    return {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      urgent: 0,
      approvalRate: 0,
      averageResponseTime: 0
    };
  }
}

/**
 * Calculate average response time for builder requests
 */
function calculateAverageResponseTime(requests: any[]) {
  const reviewedRequests = requests.filter(r => r.reviewedAt && r.submittedAt);
  if (reviewedRequests.length === 0) return 0;

  const totalResponseTime = reviewedRequests.reduce((sum, r) => {
    const responseTime = (r.reviewedAt?.toDate ? r.reviewedAt.toDate().getTime() : new Date(r.reviewedAt).getTime()) - (r.submittedAt?.toDate ? r.submittedAt.toDate().getTime() : new Date(r.submittedAt).getTime());
    return sum + responseTime;
  }, 0);

  return Math.round(totalResponseTime / reviewedRequests.length / (1000 * 60 * 60)); // Convert to hours
}

/**
 * Get system health metrics
 */
async function getSystemHealth() {
  try {
    // Get collection sizes for performance monitoring
    const [usersCount, spacesCount, builderRequestsCount] = await Promise.all([
      dbAdmin.collection('users').get().then(s => s.size),
      getAllSpacesCount(),
      dbAdmin.collection('builderRequests').get().then(s => s.size)
    ]);

    return {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      collections: {
        users: usersCount,
        spaces: spacesCount,
        builderRequests: builderRequestsCount
      },
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Error getting system health', { error: error, endpoint: '/api/admin/dashboard' });
    return {
      status: 'error',
      uptime: 0,
      memory: { rss: 0, heapTotal: 0, heapUsed: 0, external: 0 },
      collections: { users: 0, spaces: 0, builderRequests: 0 },
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Get total count of all spaces across all types
 */
async function getAllSpacesCount() {
  const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
  let totalCount = 0;

  for (const spaceType of spaceTypes) {
    try {
      const snapshot = await dbAdmin
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
      totalCount += snapshot.size;
    } catch (error) {
      logger.error('Error counting spaces for', { spaceType, error: error, endpoint: '/api/admin/dashboard' });
    }
  }

  return totalCount;
}