import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse as _ApiResponse } from '@/lib/api-auth-middleware';

const socialProofSchema = z.object({
  spaceIds: z.string().optional(), // Comma-separated space IDs
  includeActivity: z.coerce.boolean().default(true),
  includeMutualFriends: z.coerce.boolean().default(true),
  includeSimilarUsers: z.coerce.boolean().default(true)
});

interface SocialProofData {
  spaceId: string;
  mutualFriends: Array<{
    userId: string;
    displayName: string;
    avatarUrl?: string;
    role: string;
    joinedAt: string;
  }>;
  similarUsers: Array<{
    userId: string;
    displayName: string;
    avatarUrl?: string;
    similarityScore: number;
    commonInterests: string[];
  }>;
  recentActivity: Array<{
    type: 'join' | 'post' | 'event' | 'tool_creation';
    userId: string;
    displayName: string;
    avatarUrl?: string;
    timestamp: string;
    details?: string;
  }>;
  peerInsights: {
    totalPeers: number;
    peersFromSameMajor: number;
    peersFromSameYear: number;
    peersFromSameDorm: number;
    averageEngagement: number;
  };
  socialSignals: {
    friendsInSpace: number;
    peerRecommendations: number;
    crossSpaceConnections: number;
    socialScore: number; // 0-100
  };
}

/**
 * Social Proof API - Provides social context for space discovery
 * Shows friends, similar users, and peer activity to drive engagement
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { spaceIds, includeActivity, includeMutualFriends, includeSimilarUsers } = socialProofSchema.parse(queryParams);

    const userId = authContext.userId;

    logger.info('👥 Getting social proof for user', { userId, endpoint: '/api/spaces/social-proof' });

    // Parse space IDs
    const targetSpaceIds = spaceIds ? spaceIds.split(',').filter(Boolean) : [];
    
    // Get user's profile and social network
    const userProfile = await getUserSocialProfile(userId);
    
    // Generate social proof for each space
    const socialProof: Record<string, SocialProofData> = {};
    
    if (targetSpaceIds.length > 0) {
      // Get social proof for specific spaces
      for (const spaceId of targetSpaceIds) {
        socialProof[spaceId] = await generateSocialProof(
          userId, 
          spaceId, 
          userProfile,
          { includeActivity, includeMutualFriends, includeSimilarUsers }
        );
      }
    } else {
      // Get social proof for user's joined spaces or recommended spaces
      const userSpaces = await getUserSpaces(userId);
      for (const spaceId of userSpaces.slice(0, 10)) { // Limit for performance
        socialProof[spaceId] = await generateSocialProof(
          userId, 
          spaceId, 
          userProfile,
          { includeActivity, includeMutualFriends, includeSimilarUsers }
        );
      }
    }

    return NextResponse.json({
      success: true,
      socialProof,
      metadata: {
        userId,
        spacesAnalyzed: Object.keys(socialProof).length,
        userFriendsCount: userProfile.friends.length,
        userSpacesCount: userProfile.joinedSpaces.length
      }
    });

  } catch (error: any) {
    logger.error('Social proof error', { error: error, endpoint: '/api/spaces/social-proof' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Social proof is safe for development
  operation: 'get_social_proof' 
});

/**
 * Get user's social profile including friends and preferences
 */
async function getUserSocialProfile(userId: string) {
  try {
    // Get user's basic info
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    const userData = userDoc.data() || {};

    // Get user's space memberships
    const membershipQuery = dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(50);
    
    const membershipsSnapshot = await membershipQuery.get();
    const joinedSpaces: string[] = [];
    
    membershipsSnapshot.docs.forEach(doc => {
      const spaceId = doc.ref.parent.parent?.id;
      if (spaceId) joinedSpaces.push(spaceId);
    });

    // Get user's friends (from social connections)
    const friendsQuery = dbAdmin.collection('social_connections')
      .where('userId', '==', userId)
      .where('status', '==', 'connected')
      .limit(100);
    
    const friendsSnapshot = await friendsQuery.get();
    const friends = friendsSnapshot.docs.map(doc => ({
      userId: doc.data().connectedUserId,
      connectionType: doc.data().type || 'friend',
      connectedAt: doc.data().createdAt
    }));

    return {
      id: userId,
      displayName: userData.displayName || 'Anonymous',
      avatarUrl: userData.avatarUrl,
      major: userData.major,
      yearInSchool: userData.yearInSchool,
      dormitory: userData.residence,
      interests: userData.interests || [],
      joinedSpaces,
      friends
    };

  } catch (error) {
    logger.error('Error getting user social profile', { error: error, endpoint: '/api/spaces/social-proof' });
    return {
      id: userId,
      displayName: 'Anonymous',
      major: null,
      yearInSchool: null,
      dormitory: null,
      interests: [],
      joinedSpaces: [],
      friends: []
    };
  }
}

/**
 * Get user's joined spaces
 */
async function getUserSpaces(userId: string): Promise<string[]> {
  try {
    const membershipQuery = dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(20);
    
    const membershipsSnapshot = await membershipQuery.get();
    const spaceIds: string[] = [];
    
    membershipsSnapshot.docs.forEach(doc => {
      const spaceId = doc.ref.parent.parent?.id;
      if (spaceId) spaceIds.push(spaceId);
    });

    return spaceIds;
  } catch (error) {
    logger.error('Error getting user spaces', { error: error, endpoint: '/api/spaces/social-proof' });
    return [];
  }
}

/**
 * Generate comprehensive social proof for a specific space
 */
async function generateSocialProof(
  userId: string,
  spaceId: string,
  userProfile: any,
  options: any
): Promise<SocialProofData> {
  
  // Find the space and its type
  const spaceInfo = await findSpaceById(spaceId);
  if (!spaceInfo) {
    return createEmptySocialProof(spaceId);
  }

  // Get all members of this space
  const spaceMembers = await getSpaceMembers(spaceInfo.type, spaceId);
  
  // Find mutual friends in this space
  const mutualFriends = options.includeMutualFriends 
    ? await findMutualFriends(userProfile.friends, spaceMembers)
    : [];

  // Find similar users in this space
  const similarUsers = options.includeSimilarUsers
    ? await findSimilarUsers(userProfile, spaceMembers)
    : [];

  // Get recent activity
  const recentActivity = options.includeActivity
    ? await getRecentSpaceActivity(spaceInfo.type, spaceId)
    : [];

  // Calculate peer insights
  const peerInsights = calculatePeerInsights(userProfile, spaceMembers);

  // Calculate social signals
  const socialSignals = calculateSocialSignals(mutualFriends, similarUsers, peerInsights);

  return {
    spaceId,
    mutualFriends,
    similarUsers,
    recentActivity,
    peerInsights,
    socialSignals
  };
}

/**
 * Find space by ID across all space types
 */
async function findSpaceById(spaceId: string) {
  const spaceTypes = ['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'cohort'];
  
  for (const type of spaceTypes) {
    try {
      const spaceDoc = await dbAdmin
        .collection('spaces')
        .doc(type)
        .collection('spaces')
        .doc(spaceId)
        .get();
        
      if (spaceDoc.exists) {
        return { type, data: spaceDoc.data() };
      }
    } catch (error) {
      // Continue searching other types
    }
  }
  
  return null;
}

/**
 * Get all members of a space with their profiles
 */
async function getSpaceMembers(spaceType: string, spaceId: string) {
  try {
    const membersSnapshot = await dbAdmin
      .collection('spaces')
      .doc(spaceType)
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .get();

    const members = await Promise.all(
      membersSnapshot.docs.map(async (memberDoc: any) => {
        const memberData = memberDoc.data();
        
        // Get user profile
        try {
          const userDoc = await dbAdmin.collection('users').doc(memberData.userId).get();
          const userData = userDoc.data() || {};
          
          return {
            userId: memberData.userId,
            displayName: userData.displayName || 'Anonymous',
            avatarUrl: userData.avatarUrl,
            role: memberData.role || 'member',
            joinedAt: memberData.joinedAt?.toDate?.()?.toISOString() || '',
            major: userData.major,
            yearInSchool: userData.yearInSchool,
            dormitory: userData.residence,
            interests: userData.interests || []
          };
        } catch (error) {
          return {
            userId: memberData.userId,
            displayName: 'Anonymous',
            role: memberData.role || 'member',
            joinedAt: memberData.joinedAt?.toDate?.()?.toISOString() || '',
            interests: []
          };
        }
      })
    );

    return members;
  } catch (error) {
    logger.error('Error getting space members', { error: error, endpoint: '/api/spaces/social-proof' });
    return [];
  }
}

/**
 * Find mutual friends in space members
 */
async function findMutualFriends(userFriends: any[], spaceMembers: any[]) {
  const friendIds = new Set(userFriends.map(f => f.userId));
  
  return spaceMembers
    .filter(member => friendIds.has(member.userId))
    .slice(0, 10) // Limit for UI performance
    .map(member => ({
      userId: member.userId,
      displayName: member.displayName,
      avatarUrl: member.avatarUrl,
      role: member.role,
      joinedAt: member.joinedAt
    }));
}

/**
 * Find users similar to current user
 */
async function findSimilarUsers(userProfile: any, spaceMembers: any[]) {
  const similarUsers = spaceMembers
    .filter(member => member.userId !== userProfile.id)
    .map(member => {
      const similarityScore = calculateUserSimilarity(userProfile, member);
      const commonInterests = findCommonInterests(userProfile.interests, member.interests);
      
      return {
        userId: member.userId,
        displayName: member.displayName,
        avatarUrl: member.avatarUrl,
        similarityScore,
        commonInterests
      };
    })
    .filter(user => user.similarityScore > 0.3) // Only include reasonably similar users
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 5); // Top 5 most similar

  return similarUsers;
}

/**
 * Calculate similarity score between two users
 */
function calculateUserSimilarity(user1: any, user2: any): number {
  let score = 0;
  let factors = 0;

  // Same major
  if (user1.major && user2.major && user1.major === user2.major) {
    score += 0.4;
  }
  factors++;

  // Same year
  if (user1.yearInSchool && user2.yearInSchool && user1.yearInSchool === user2.yearInSchool) {
    score += 0.2;
  }
  factors++;

  // Same dormitory
  if (user1.dormitory && user2.dormitory && user1.dormitory === user2.dormitory) {
    score += 0.3;
  }
  factors++;

  // Common interests
  const user1Interests = user1.interests || [];
  const user2Interests = user2.interests || [];
  const commonInterests = findCommonInterests(user1Interests, user2Interests);
  if (user1Interests.length > 0 && user2Interests.length > 0) {
    const interestSimilarity = commonInterests.length / Math.max(user1Interests.length, user2Interests.length);
    score += interestSimilarity * 0.5;
  }
  factors++;

  return Math.min(score / factors, 1);
}

/**
 * Find common interests between users
 */
function findCommonInterests(interests1: string[], interests2: string[]): string[] {
  if (!interests1 || !interests2) return [];
  
  return interests1.filter(interest => 
    interests2.some(other => 
      other.toLowerCase().includes(interest.toLowerCase()) ||
      interest.toLowerCase().includes(other.toLowerCase())
    )
  );
}

/**
 * Get recent activity in the space
 */
async function getRecentSpaceActivity(spaceType: string, spaceId: string) {
  // For now, we'll focus on recent joins since that's available
  // TODO: Expand to include posts, events, and tool creation when those systems are built
  
  try {
    const membersSnapshot = await dbAdmin
      .collection('spaces')
      .doc(spaceType)
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .orderBy('joinedAt', 'desc')
      .limit(10)
      .get();

    const recentJoins = await Promise.all(
      membersSnapshot.docs.map(async (memberDoc: any) => {
        const memberData = memberDoc.data();
        
        try {
          const userDoc = await dbAdmin.collection('users').doc(memberData.userId).get();
          const userData = userDoc.data() || {};
          
          return {
            type: 'join' as const,
            userId: memberData.userId,
            displayName: userData.displayName || 'Anonymous',
            avatarUrl: userData.avatarUrl,
            timestamp: memberData.joinedAt?.toDate?.()?.toISOString() || '',
            details: `Joined as ${memberData.role || 'member'}`
          };
        } catch (error) {
          return null;
        }
      })
    );

    return recentJoins.filter((join): join is NonNullable<typeof join> => join !== null).slice(0, 5);
  } catch (error) {
    logger.error('Error getting recent activity', { error: error, endpoint: '/api/spaces/social-proof' });
    return [];
  }
}

/**
 * Calculate peer insights
 */
function calculatePeerInsights(userProfile: any, spaceMembers: any[]) {
  const totalPeers = spaceMembers.length;
  
  const peersFromSameMajor = userProfile.major 
    ? spaceMembers.filter(m => m.major === userProfile.major).length 
    : 0;
    
  const peersFromSameYear = userProfile.yearInSchool
    ? spaceMembers.filter(m => m.yearInSchool === userProfile.yearInSchool).length
    : 0;
    
  const peersFromSameDorm = userProfile.dormitory
    ? spaceMembers.filter(m => m.dormitory === userProfile.dormitory).length
    : 0;

  // Mock engagement calculation - would be based on actual activity data
  const averageEngagement = Math.random() * 0.3 + 0.7; // 0.7-1.0

  return {
    totalPeers,
    peersFromSameMajor,
    peersFromSameYear,
    peersFromSameDorm,
    averageEngagement: Math.round(averageEngagement * 100) / 100
  };
}

/**
 * Calculate social signals score
 */
function calculateSocialSignals(mutualFriends: any[], similarUsers: any[], peerInsights: any) {
  const friendsInSpace = mutualFriends.length;
  const peerRecommendations = similarUsers.length;
  const crossSpaceConnections = Math.min(peerInsights.peersFromSameMajor + peerInsights.peersFromSameYear, 10);
  
  // Calculate overall social score (0-100)
  let socialScore = 0;
  socialScore += Math.min(friendsInSpace * 15, 45); // Friends: 0-45 points
  socialScore += Math.min(peerRecommendations * 8, 25); // Similar users: 0-25 points
  socialScore += Math.min(crossSpaceConnections * 3, 30); // Cross-connections: 0-30 points

  return {
    friendsInSpace,
    peerRecommendations,
    crossSpaceConnections,
    socialScore: Math.min(Math.round(socialScore), 100)
  };
}

/**
 * Create empty social proof structure
 */
function createEmptySocialProof(spaceId: string): SocialProofData {
  return {
    spaceId,
    mutualFriends: [],
    similarUsers: [],
    recentActivity: [],
    peerInsights: {
      totalPeers: 0,
      peersFromSameMajor: 0,
      peersFromSameYear: 0,
      peersFromSameDorm: 0,
      averageEngagement: 0
    },
    socialSignals: {
      friendsInSpace: 0,
      peerRecommendations: 0,
      crossSpaceConnections: 0,
      socialScore: 0
    }
  };
}