import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { withSecureAuth } from '@/lib/api-auth-secure';

/**
 * Admin Space Analytics API
 * Provides comprehensive analytics for space management
 * GET /api/admin/spaces/analytics - Get detailed space analytics
 */

// Admin user IDs (TODO: Move to environment variables or admin table)
const ADMIN_USER_IDS = [
  'test-user', // For development
  // Add real admin user IDs here
];

interface MemberDoc {
  id: string;
  role?: string;
  joinedAt?: string;
}

interface SpaceDoc {
  id: string;
  type: string;
  name?: string;
  status?: string;
  hasBuilders?: boolean;
  isArchived?: boolean;
  isPrivate?: boolean;
  description?: string;
  tags?: string[];
  campusId?: string;
  createdAt?: string;
  updatedAt?: string;
  activatedAt?: string;
  memberCount?: number;
  actualMemberCount: number;
  builderCount: number;
  adminCount: number;
  healthScore: number;
  members?: MemberDoc[];
}

interface SpaceAnalytics {
  overview: {
    totalSpaces: number;
    activeSpaces: number;
    dormantSpaces: number;
    archivedSpaces: number;
    healthySpaces: number;
    unhealthySpaces: number;
    totalMembers: number;
    averageMembers: number;
    totalBuilders: number;
    averageHealthScore: number;
  };
  trends: {
    spacesCreatedLast7Days: number;
    spacesActivatedLast7Days: number;
    membersJoinedLast7Days: number;
    buildersAddedLast7Days: number;
    healthScoreChange: number;
    engagementTrend: 'up' | 'down' | 'stable';
  };
  byType: Record<string, {
    total: number;
    active: number;
    dormant: number;
    archived: number;
    totalMembers: number;
    averageMembers: number;
    averageHealthScore: number;
    topSpaces: Array<{
      id: string;
      name: string;
      memberCount: number;
      healthScore: number;
    }>;
  }>;
  healthDistribution: {
    healthy: number; // 70-100
    warning: number; // 40-69
    critical: number; // 0-39
  };
  membershipTrends: {
    dailyJoins: Array<{
      date: string;
      joins: number;
      leaves: number;
      net: number;
    }>;
    topGrowingSpaces: Array<{
      id: string;
      name: string;
      type: string;
      memberCount: number;
      growthRate: number;
    }>;
  };
  engagementMetrics: {
    postsLast7Days: number;
    eventsLast7Days: number;
    toolUsageLast7Days: number;
    averageSessionTime: number;
    mostActiveSpaces: Array<{
      id: string;
      name: string;
      type: string;
      activityScore: number;
    }>;
  };
  builderInsights: {
    totalBuilders: number;
    buildersActiveLast7Days: number;
    spacesWithBuilders: number;
    toolsCreatedLast7Days: number;
    topBuilderSpaces: Array<{
      id: string;
      name: string;
      type: string;
      builderCount: number;
      toolsCreated: number;
    }>;
  };
}

/**
 * Check if user is an admin
 */
async function isAdmin(userId: string): Promise<boolean> {
  return ADMIN_USER_IDS.includes(userId);
}

/**
 * Calculate space health score based on various metrics
 */
function calculateHealthScore(space: Partial<SpaceDoc>, members: MemberDoc[]): number {
  let score = 0;

  // Member count (0-40 points)
  const memberCount = members.length;
  if (memberCount > 0) score += Math.min(memberCount * 2, 40);

  // Has builders (20 points)
  if (space.hasBuilders) score += 20;

  // Recent activity (20 points)
  if (space.updatedAt) {
    const daysSinceUpdate = (Date.now() - new Date(space.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 7) score += 20;
    else if (daysSinceUpdate < 30) score += 10;
  }

  // Is not private (10 points)
  if (!space.isPrivate) score += 10;

  // Has description and tags (10 points)
  if (space.description && space.tags?.length > 0) score += 10;

  return Math.min(score, 100);
}

/**
 * Get comprehensive space analytics
 * GET /api/admin/spaces/analytics
 */
export const GET = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const adminUserId = token?.uid || 'unknown';

    logger.info('👑 Admin requesting space analytics', { adminUserId });

    // Get all spaces across all types
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    const allSpaces: SpaceDoc[] = [];
    const spacesByType: Record<string, SpaceDoc[]> = {};

    // Fetch spaces from all types
    for (const type of spaceTypes) {
      try {
        const spacesSnapshot = await dbAdmin
          .collection('spaces')
          .doc(type)
          .collection('spaces')
          .get();

        const spaces = await Promise.all(
          spacesSnapshot.docs.map(async (doc) => {
            const raw = doc.data() as Record<string, unknown>;
            const spaceData: SpaceDoc = {
              id: doc.id,
              type,
              name: (raw.name as string) || undefined,
              status: (raw.status as string) || undefined,
              hasBuilders: Boolean(raw.hasBuilders),
              isArchived: Boolean(raw.isArchived),
              isPrivate: Boolean(raw.isPrivate),
              description: (raw.description as string) || undefined,
              tags: (raw.tags as string[]) || undefined,
              campusId: (raw.campusId as string) || undefined,
              createdAt: (raw.createdAt as { toDate?: () => Date } | undefined)?.toDate?.()?.toISOString(),
              updatedAt: (raw.updatedAt as { toDate?: () => Date } | undefined)?.toDate?.()?.toISOString(),
              activatedAt: (raw.activatedAt as { toDate?: () => Date } | undefined)?.toDate?.()?.toISOString(),
              memberCount: (raw.memberCount as number) || 0,
              actualMemberCount: 0,
              builderCount: 0,
              adminCount: 0,
              healthScore: 0,
              members: [],
            };
            // Enforce campus isolation
            if (spaceData.campusId && spaceData.campusId !== CURRENT_CAMPUS_ID) {
              return null;
            }

            // Get members for this space
            try {
              const membersSnapshot = await dbAdmin
                .collection('spaces')
                .doc(type)
                .collection('spaces')
                .doc(doc.id)
                .collection('members')
                .get();

              const members: MemberDoc[] = membersSnapshot.docs.map(memberDoc => ({
                id: memberDoc.id,
                ...(memberDoc.data() as Record<string, unknown>),
                joinedAt: (memberDoc.data().joinedAt as { toDate?: () => Date } | undefined)?.toDate?.()?.toISOString()
              })) as MemberDoc[];

              spaceData.actualMemberCount = members.length;
              spaceData.builderCount = members.filter((m: MemberDoc) => m.role === 'builder').length;
              spaceData.adminCount = members.filter((m: MemberDoc) => m.role === 'admin').length;
              spaceData.healthScore = calculateHealthScore(spaceData, members);
              spaceData.members = members;

            } catch (memberError) {
              logger.error('Error fetching membersfor space', { spaceId: doc.id, error: memberError instanceof Error ? memberError : new Error(String(memberError))});
              spaceData.actualMemberCount = spaceData.memberCount || 0;
              spaceData.builderCount = 0;
              spaceData.adminCount = 0;
              spaceData.healthScore = 0;
              spaceData.members = [];
            }

            return spaceData;
          })
        );
        const filteredSpaces = spaces.filter(Boolean) as SpaceDoc[];
        spacesByType[type] = filteredSpaces;
        allSpaces.push(...filteredSpaces);
      } catch (error) {
        logger.error('Error fetching spaces for type', { type, error: error instanceof Error ? error : new Error(String(error))});
        spacesByType[type] = [];
      }
    }

    // Calculate analytics
    const analytics: SpaceAnalytics = {
      overview: {
        totalSpaces: allSpaces.length,
        activeSpaces: allSpaces.filter(s => s.status === 'activated' && s.hasBuilders).length,
        dormantSpaces: allSpaces.filter(s => s.status === 'activated' && !s.hasBuilders).length,
        archivedSpaces: allSpaces.filter(s => s.isArchived).length,
        healthySpaces: allSpaces.filter(s => s.healthScore >= 70).length,
        unhealthySpaces: allSpaces.filter(s => s.healthScore < 40).length,
        totalMembers: allSpaces.reduce((sum, s) => sum + s.actualMemberCount, 0),
        averageMembers: allSpaces.length > 0 ? Math.round(allSpaces.reduce((sum, s) => sum + s.actualMemberCount, 0) / allSpaces.length) : 0,
        totalBuilders: allSpaces.reduce((sum, s) => sum + s.builderCount, 0),
        averageHealthScore: allSpaces.length > 0 ? Math.round(allSpaces.reduce((sum, s) => sum + s.healthScore, 0) / allSpaces.length) : 0
      },
      trends: {
        spacesCreatedLast7Days: allSpaces.filter(s => {
          if (!s.createdAt) return false;
          const createdDate = new Date(s.createdAt);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return createdDate > weekAgo;
        }).length,
        spacesActivatedLast7Days: allSpaces.filter(s => {
          if (!s.activatedAt) return false;
          const activatedDate = new Date(s.activatedAt);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return activatedDate > weekAgo;
        }).length,
        membersJoinedLast7Days: allSpaces.reduce((sum, s) => {
          if (!s.members) return sum;
          return sum + s.members.filter((m: MemberDoc) => {
            if (!m.joinedAt) return false;
            const joinedDate = new Date(m.joinedAt);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return joinedDate > weekAgo;
          }).length;
        }, 0),
        buildersAddedLast7Days: allSpaces.reduce((sum, s) => {
          if (!s.members) return sum;
          return sum + s.members.filter((m: MemberDoc) => {
            if (m.role !== 'builder' || !m.joinedAt) return false;
            const joinedDate = new Date(m.joinedAt);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return joinedDate > weekAgo;
          }).length;
        }, 0),
        healthScoreChange: 0, // TODO: Implement historical health tracking
        engagementTrend: 'stable' as const
      },
      byType: {},
      healthDistribution: {
        healthy: allSpaces.filter(s => s.healthScore >= 70).length,
        warning: allSpaces.filter(s => s.healthScore >= 40 && s.healthScore < 70).length,
        critical: allSpaces.filter(s => s.healthScore < 40).length
      },
      membershipTrends: {
        dailyJoins: [], // TODO: Implement daily join tracking
        topGrowingSpaces: allSpaces
          .sort((a, b) => b.actualMemberCount - a.actualMemberCount)
          .slice(0, 10)
          .map(s => ({
            id: s.id,
            name: s.name,
            type: s.type,
            memberCount: s.actualMemberCount,
            growthRate: 0 // TODO: Calculate actual growth rate
          }))
      },
      engagementMetrics: {
        postsLast7Days: 0, // TODO: Implement post tracking
        eventsLast7Days: 0, // TODO: Implement event tracking
        toolUsageLast7Days: 0, // TODO: Implement tool usage tracking
        averageSessionTime: 0,
        mostActiveSpaces: allSpaces
          .filter(s => s.hasBuilders)
          .sort((a, b) => b.healthScore - a.healthScore)
          .slice(0, 10)
          .map(s => ({
            id: s.id,
            name: s.name,
            type: s.type,
            activityScore: s.healthScore
          }))
      },
      builderInsights: {
        totalBuilders: allSpaces.reduce((sum, s) => sum + s.builderCount, 0),
        buildersActiveLast7Days: 0, // TODO: Implement builder activity tracking
        spacesWithBuilders: allSpaces.filter(s => s.builderCount > 0).length,
        toolsCreatedLast7Days: 0, // TODO: Implement tool creation tracking
        topBuilderSpaces: allSpaces
          .filter(s => s.builderCount > 0)
          .sort((a, b) => b.builderCount - a.builderCount)
          .slice(0, 10)
          .map(s => ({
            id: s.id,
            name: s.name,
            type: s.type,
            builderCount: s.builderCount,
            toolsCreated: 0 // TODO: Get actual tools created count
          }))
      }
    };

    // Calculate by-type analytics
    for (const [type, spaces] of Object.entries(spacesByType)) {
      analytics.byType[type] = {
        total: spaces.length,
        active: spaces.filter(s => s.hasBuilders).length,
        dormant: spaces.filter(s => !s.hasBuilders).length,
        archived: spaces.filter(s => s.isArchived).length,
        totalMembers: spaces.reduce((sum, s) => sum + s.actualMemberCount, 0),
        averageMembers: spaces.length > 0 ? Math.round(spaces.reduce((sum, s) => sum + s.actualMemberCount, 0) / spaces.length) : 0,
        averageHealthScore: spaces.length > 0 ? Math.round(spaces.reduce((sum, s) => sum + s.healthScore, 0) / spaces.length) : 0,
        topSpaces: spaces
          .sort((a, b) => b.healthScore - a.healthScore)
          .slice(0, 5)
          .map(s => ({
            id: s.id,
            name: s.name,
            memberCount: s.actualMemberCount,
            healthScore: s.healthScore
          }))
      };
    }

    return NextResponse.json({
      success: true,
      analytics,
      timestamp: new Date().toISOString(),
      adminUserId
    });

  } catch (error) {
    logger.error('Admin spaces analytics error', { error: error instanceof Error ? error : new Error(String(error))});
    return NextResponse.json(ApiResponseHelper.error("Failed to get space analytics", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { requireAdmin: true });
