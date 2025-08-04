import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Space recommendation interface
interface SpaceRecommendation {
  spaceId: string;
  spaceName: string;
  spaceDescription: string;
  spaceType: string;
  memberCount: number;
  isActive: boolean;
  matchScore: number;
  matchReasons: string[];
  commonMembers: number;
  recentActivity: number;
  tags: string[];
  recommendationType: 'similar_interests' | 'friend_activity' | 'trending' | 'new_spaces' | 'academic_match';
}

// GET - Get space recommendations for user
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const limit_param = parseInt(searchParams.get('limit') || '10');
    const type = searchParams.get('type') || 'all'; // all, similar_interests, trending, new_spaces

    // Get user's current memberships
    const currentMembershipsQuery = dbAdmin.collection(
      dbAdmin.collection('members'),
      where('userId', '==', user.uid),
      where('status', '==', 'active')
    );

    const currentMembershipsSnapshot = await getDocs(currentMembershipsQuery);
    const currentSpaceIds = currentMembershipsSnapshot.docs.map(doc => doc.data().spaceId);

    // Get user profile for interest matching
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists ? userDoc.data() : null;

    // Get all available spaces (excluding current memberships)
    const allSpacesQuery = dbAdmin.collection(
      dbAdmin.collection('spaces'),
      where('status', '==', 'active'),
      orderBy('memberCount', 'desc'),
      limit(100) // Limit for performance
    );

    const allSpacesSnapshot = await getDocs(allSpacesQuery);
    const availableSpaces = allSpacesSnapshot.docs
      .filter(doc => !currentSpaceIds.includes(doc.id))
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    // Generate recommendations based on type
    const recommendations: SpaceRecommendation[] = [];

    if (type === 'all' || type === 'similar_interests') {
      const interestRecommendations = await generateInterestBasedRecommendations(
        availableSpaces,
        userData,
        currentSpaceIds
      );
      recommendations.push(...interestRecommendations);
    }

    if (type === 'all' || type === 'trending') {
      const trendingRecommendations = await generateTrendingRecommendations(
        availableSpaces,
        currentSpaceIds
      );
      recommendations.push(...trendingRecommendations);
    }

    if (type === 'all' || type === 'new_spaces') {
      const newSpaceRecommendations = await generateNewSpaceRecommendations(
        availableSpaces,
        currentSpaceIds
      );
      recommendations.push(...newSpaceRecommendations);
    }

    // Add friend activity recommendations
    const friendActivityRecommendations = await generateFriendActivityRecommendations(
      availableSpaces,
      user.uid,
      currentSpaceIds
    );
    recommendations.push(...friendActivityRecommendations);

    // Add academic match recommendations
    const academicRecommendations = await generateAcademicRecommendations(
      availableSpaces,
      userData,
      currentSpaceIds
    );
    recommendations.push(...academicRecommendations);

    // Remove duplicates and sort by match score
    const uniqueRecommendations = recommendations
      .reduce((acc, current) => {
        const existingIndex = acc.findIndex(item => item.spaceId === current.spaceId);
        if (existingIndex >= 0) {
          // Keep the one with higher match score
          if (current.matchScore > acc[existingIndex].matchScore) {
            acc[existingIndex] = current;
          }
        } else {
          acc.push(current);
        }
        return acc;
      }, [] as SpaceRecommendation[])
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit_param);

    return NextResponse.json({
      recommendations: uniqueRecommendations,
      totalAvailable: availableSpaces.length,
      currentMemberships: currentSpaceIds.length,
      recommendationType: type
    });
  } catch (error) {
    logger.error('Error generating space recommendations', { error: error, endpoint: '/api/profile/spaces/recommendations' });
    return NextResponse.json(ApiResponseHelper.error("Failed to generate space recommendations", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to generate interest-based recommendations
async function generateInterestBasedRecommendations(
  availableSpaces: any[],
  userData: any,
  currentSpaceIds: string[]
): Promise<SpaceRecommendation[]> {
  if (!userData?.interests || userData.interests.length === 0) {
    return [];
  }

  const userInterests = userData.interests.map((interest: string) => interest.toLowerCase());
  
  return availableSpaces
    .map(space => {
      const spaceTags = (space.tags || []).map((tag: string) => tag.toLowerCase());
      const spaceKeywords = (space.name + ' ' + space.description).toLowerCase().split(/\s+/);
      
      // Calculate interest match score
      const tagMatches = spaceTags.filter(tag => userInterests.includes(tag)).length;
      const keywordMatches = spaceKeywords.filter(keyword => 
        userInterests.some(interest => interest.includes(keyword) || keyword.includes(interest))
      ).length;
      
      const matchScore = (tagMatches * 2) + keywordMatches;
      
      if (matchScore > 0) {
        const matchReasons = [];
        if (tagMatches > 0) matchReasons.push(`${tagMatches} matching interests`);
        if (keywordMatches > 0) matchReasons.push(`Related to your interests`);
        
        return {
          spaceId: space.id,
          spaceName: space.name,
          spaceDescription: space.description,
          spaceType: space.type || 'general',
          memberCount: space.memberCount || 0,
          isActive: space.status === 'active',
          matchScore: Math.min(100, matchScore * 10),
          matchReasons,
          commonMembers: 0,
          recentActivity: space.recentActivity || 0,
          tags: space.tags || [],
          recommendationType: 'similar_interests' as const
        };
      }
      
      return null;
    })
    .filter(Boolean) as SpaceRecommendation[];
}

// Helper function to generate trending recommendations
async function generateTrendingRecommendations(
  availableSpaces: any[],
  currentSpaceIds: string[]
): Promise<SpaceRecommendation[]> {
  return availableSpaces
    .filter(space => space.memberCount > 10) // Only spaces with decent activity
    .sort((a, b) => (b.recentActivity || 0) - (a.recentActivity || 0))
    .slice(0, 5)
    .map(space => ({
      spaceId: space.id,
      spaceName: space.name,
      spaceDescription: space.description,
      spaceType: space.type || 'general',
      memberCount: space.memberCount || 0,
      isActive: space.status === 'active',
      matchScore: Math.min(100, (space.recentActivity || 0) / 10),
      matchReasons: ['Trending on campus', 'High recent activity'],
      commonMembers: 0,
      recentActivity: space.recentActivity || 0,
      tags: space.tags || [],
      recommendationType: 'trending' as const
    }));
}

// Helper function to generate new space recommendations
async function generateNewSpaceRecommendations(
  availableSpaces: any[],
  currentSpaceIds: string[]
): Promise<SpaceRecommendation[]> {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return availableSpaces
    .filter(space => {
      const createdAt = new Date(space.createdAt);
      return createdAt > oneWeekAgo;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
    .map(space => ({
      spaceId: space.id,
      spaceName: space.name,
      spaceDescription: space.description,
      spaceType: space.type || 'general',
      memberCount: space.memberCount || 0,
      isActive: space.status === 'active',
      matchScore: 60,
      matchReasons: ['New space', 'Recently created'],
      commonMembers: 0,
      recentActivity: space.recentActivity || 0,
      tags: space.tags || [],
      recommendationType: 'new_spaces' as const
    }));
}

// Helper function to generate friend activity recommendations
async function generateFriendActivityRecommendations(
  availableSpaces: any[],
  userId: string,
  currentSpaceIds: string[]
): Promise<SpaceRecommendation[]> {
  try {
    // Get user's current space memberships to find "friends" (other members)
    const currentMembershipsQuery = dbAdmin.collection(
      dbAdmin.collection('members'),
      where('userId', '==', userId),
      where('status', '==', 'active')
    );

    const currentMembershipsSnapshot = await getDocs(currentMembershipsQuery);
    const userSpaceIds = currentMembershipsSnapshot.docs.map(doc => doc.data().spaceId);

    // Get other members from user's spaces
    const friendsQuery = dbAdmin.collection(
      dbAdmin.collection('members'),
      where('spaceId', 'in', userSpaceIds.slice(0, 10)), // Limit for performance
      where('status', '==', 'active')
    );

    const friendsSnapshot = await getDocs(friendsQuery);
    const friendIds = [...new Set(friendsSnapshot.docs
      .map(doc => doc.data().userId)
      .filter(id => id !== userId))];

    if (friendIds.length === 0) {
      return [];
    }

    // Get spaces where friends are active
    const friendMembershipsQuery = dbAdmin.collection(
      dbAdmin.collection('members'),
      where('userId', 'in', friendIds.slice(0, 10)), // Limit for performance
      where('status', '==', 'active')
    );

    const friendMembershipsSnapshot = await getDocs(friendMembershipsQuery);
    const friendSpaceIds = friendMembershipsSnapshot.docs.map(doc => doc.data().spaceId);

    // Count common members per space
    const spaceFriendCounts: Record<string, number> = {};
    friendSpaceIds.forEach(spaceId => {
      if (!currentSpaceIds.includes(spaceId)) {
        spaceFriendCounts[spaceId] = (spaceFriendCounts[spaceId] || 0) + 1;
      }
    });

    // Generate recommendations based on friend activity
    return availableSpaces
      .filter(space => spaceFriendCounts[space.id] > 0)
      .map(space => ({
        spaceId: space.id,
        spaceName: space.name,
        spaceDescription: space.description,
        spaceType: space.type || 'general',
        memberCount: space.memberCount || 0,
        isActive: space.status === 'active',
        matchScore: Math.min(100, spaceFriendCounts[space.id] * 15),
        matchReasons: [`${spaceFriendCounts[space.id]} people you know are members`],
        commonMembers: spaceFriendCounts[space.id],
        recentActivity: space.recentActivity || 0,
        tags: space.tags || [],
        recommendationType: 'friend_activity' as const
      }))
      .sort((a, b) => b.commonMembers - a.commonMembers)
      .slice(0, 5);
  } catch (error) {
    logger.error('Error generating friend activity recommendations', { error: error, endpoint: '/api/profile/spaces/recommendations' });
    return [];
  }
}

// Helper function to generate academic recommendations
async function generateAcademicRecommendations(
  availableSpaces: any[],
  userData: any,
  currentSpaceIds: string[]
): Promise<SpaceRecommendation[]> {
  if (!userData?.major && !userData?.academicYear) {
    return [];
  }

  const userMajor = userData.major?.toLowerCase();
  const userYear = userData.academicYear;

  return availableSpaces
    .filter(space => {
      const spaceName = space.name.toLowerCase();
      const spaceDescription = space.description.toLowerCase();
      const spaceType = space.type?.toLowerCase();
      
      // Check for academic relevance
      const isMajorMatch = userMajor && (
        spaceName.includes(userMajor) || 
        spaceDescription.includes(userMajor) ||
        (space.tags || []).some((tag: string) => tag.toLowerCase().includes(userMajor))
      );
      
      const isYearMatch = userYear && (
        spaceName.includes(userYear) || 
        spaceDescription.includes(userYear)
      );
      
      const isAcademicType = spaceType === 'academic' || spaceType === 'study';
      
      return isMajorMatch || isYearMatch || isAcademicType;
    })
    .map(space => {
      const matchReasons = [];
      const spaceName = space.name.toLowerCase();
      const spaceDescription = space.description.toLowerCase();
      
      if (userMajor && (spaceName.includes(userMajor) || spaceDescription.includes(userMajor))) {
        matchReasons.push(`Matches your major: ${userData.major}`);
      }
      
      if (userYear && (spaceName.includes(userYear) || spaceDescription.includes(userYear))) {
        matchReasons.push(`Relevant to ${userYear}s`);
      }
      
      if (space.type === 'academic' || space.type === 'study') {
        matchReasons.push('Academic focus');
      }
      
      return {
        spaceId: space.id,
        spaceName: space.name,
        spaceDescription: space.description,
        spaceType: space.type || 'general',
        memberCount: space.memberCount || 0,
        isActive: space.status === 'active',
        matchScore: matchReasons.length * 25,
        matchReasons,
        commonMembers: 0,
        recentActivity: space.recentActivity || 0,
        tags: space.tags || [],
        recommendationType: 'academic_match' as const
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}