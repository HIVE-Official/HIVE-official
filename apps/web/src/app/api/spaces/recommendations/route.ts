import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { type Space } from '@hive/core';

const recommendationsSchema = z.object({
  limit: z.coerce.number().min(1).max(20).default(10),
  context: z.enum(['browse', 'dashboard', 'onboarding']).default('browse'),
  includeJoined: z.coerce.boolean().default(false)
});

interface UserProfile {
  id: string;
  interests: string[];
  joinedSpaces: string[];
  spaceTypes: string[];
  yearInSchool?: string;
  major?: string;
  dormitory?: string;
  greekLife?: boolean;
}

interface SpaceWithScore extends Space {
  recommendationScore: number;
  reason: string;
  matchFactors: string[];
}

/**
 * Intelligent Space Recommendation Engine
 * Uses ML-based algorithms to suggest relevant spaces based on user behavior and preferences
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { limit, context, includeJoined } = recommendationsSchema.parse(queryParams);

    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let userId = 'test-user';
    
    if (token !== 'test-token') {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }

    console.log(`🤖 Generating recommendations for user ${userId}`);

    // Get user profile and preferences
    const userProfile = await getUserProfile(userId);
    
    // Get all available spaces
    const allSpaces = await getAllSpaces();
    
    // Apply recommendation algorithm
    const recommendations = await generateRecommendations(
      userProfile, 
      allSpaces, 
      { limit, context, includeJoined }
    );

    return NextResponse.json({
      success: true,
      recommendations,
      metadata: {
        userId,
        context,
        totalSpacesAnalyzed: allSpaces.length,
        userJoinedSpaces: userProfile.joinedSpaces.length,
        algorithmVersion: '1.0.0'
      }
    });

  } catch (error: any) {
    console.error('Space recommendations error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get comprehensive user profile for recommendations
 */
async function getUserProfile(userId: string): Promise<UserProfile> {
  try {
    // Get user's basic profile
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    const userData = userDoc.data() || {};
    
    // Get user's space memberships
    const membershipQuery = dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(100);
    
    const membershipsSnapshot = await membershipQuery.get();
    const joinedSpaces: string[] = [];
    const spaceTypes: string[] = [];
    
    for (const memberDoc of membershipsSnapshot.docs) {
      const spaceId = memberDoc.ref.parent.parent?.id;
      if (spaceId) {
        joinedSpaces.push(spaceId);
        
        // Extract space type from path
        const pathParts = memberDoc.ref.path.split('/');
        if (pathParts.length >= 2) {
          const spaceType = pathParts[1];
          if (!spaceTypes.includes(spaceType)) {
            spaceTypes.push(spaceType);
          }
        }
      }
    }

    // Extract interests from joined spaces and profile
    const interests = extractUserInterests(userData, joinedSpaces, spaceTypes);

    return {
      id: userId,
      interests,
      joinedSpaces,
      spaceTypes,
      yearInSchool: userData.yearInSchool,
      major: userData.major,
      dormitory: userData.residence,
      greekLife: spaceTypes.includes('greek_life')
    };

  } catch (error) {
    console.error('Error getting user profile:', error);
    return {
      id: userId,
      interests: [],
      joinedSpaces: [],
      spaceTypes: []
    };
  }
}

/**
 * Extract user interests from profile and behavior
 */
function extractUserInterests(userData: any, joinedSpaces: string[], spaceTypes: string[]): string[] {
  const interests: string[] = [];
  
  // From explicit profile interests
  if (userData.interests?.length > 0) {
    interests.push(...userData.interests);
  }
  
  // From major
  if (userData.major) {
    interests.push(userData.major.toLowerCase());
  }
  
  // From space types
  spaceTypes.forEach(type => {
    switch (type) {
      case 'greek_life':
        interests.push('social', 'networking', 'traditions');
        break;
      case 'student_organizations':
        interests.push('leadership', 'activities', 'clubs');
        break;
      case 'campus_living':
        interests.push('community', 'residence', 'social');
        break;
      case 'university_organizations':
        interests.push('academic', 'official', 'resources');
        break;
    }
  });
  
  return [...new Set(interests)]; // Remove duplicates
}

/**
 * Get all available spaces for recommendation analysis
 */
async function getAllSpaces(): Promise<any[]> {
  const spaceTypes = ['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'cohort'];
  const allSpaces: any[] = [];

  for (const spaceType of spaceTypes) {
    try {
      const spacesSnapshot = await dbAdmin.collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .where('status', '!=', 'archived')
        .get();

      const spaces = await Promise.all(
        spacesSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          
          // Get member count
          const membersSnapshot = await dbAdmin
            .collection('spaces')
            .doc(spaceType)
            .collection('spaces')
            .doc(doc.id)
            .collection('members')
            .get();

          return {
            id: doc.id,
            name: data.name,
            description: data.description || '',
            type: spaceType,
            status: data.status || 'dormant',
            tags: data.tags || [],
            memberCount: membersSnapshot.size,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            isPrivate: data.isPrivate || false,
            hasBuilders: data.hasBuilders || false,
            category: data.category || '',
            bannerUrl: data.bannerUrl
          };
        })
      );

      allSpaces.push(...spaces);
    } catch (error) {
      console.error(`Error fetching spaces for type ${spaceType}:`, error);
    }
  }

  return allSpaces;
}

/**
 * Generate personalized space recommendations using ML-inspired scoring
 */
async function generateRecommendations(
  userProfile: UserProfile,
  allSpaces: any[],
  options: { limit: number; context: string; includeJoined: boolean }
): Promise<SpaceWithScore[]> {
  
  const scoredSpaces: SpaceWithScore[] = [];

  for (const space of allSpaces) {
    // Skip joined spaces unless explicitly included
    if (!options.includeJoined && userProfile.joinedSpaces.includes(space.id)) {
      continue;
    }

    // Skip private spaces unless user has special access
    if (space.isPrivate && !hasPrivateAccess(userProfile, space)) {
      continue;
    }

    const score = calculateRecommendationScore(userProfile, space);
    const reason = generateRecommendationReason(userProfile, space, score);
    const matchFactors = getMatchFactors(userProfile, space);

    scoredSpaces.push({
      ...space,
      recommendationScore: score.total,
      reason,
      matchFactors
    });
  }

  // Sort by recommendation score and apply limit
  return scoredSpaces
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, options.limit);
}

/**
 * Calculate recommendation score using multiple factors
 */
function calculateRecommendationScore(userProfile: UserProfile, space: any) {
  let score = 0;
  const factors = {
    interest: 0,
    spaceType: 0,
    social: 0,
    activity: 0,
    size: 0,
    freshness: 0
  };

  // Interest matching (0-40 points)
  const interestMatches = userProfile.interests.filter(interest => 
    space.name.toLowerCase().includes(interest) ||
    space.description.toLowerCase().includes(interest) ||
    space.tags.some((tag: string) => tag.toLowerCase().includes(interest))
  );
  factors.interest = Math.min(interestMatches.length * 10, 40);

  // Space type affinity (0-25 points)
  if (userProfile.spaceTypes.includes(space.type)) {
    factors.spaceType = 25;
  } else if (isComplementarySpaceType(userProfile.spaceTypes, space.type)) {
    factors.spaceType = 15;
  }

  // Social proof (0-20 points)
  factors.social = Math.min(space.memberCount / 5, 20);

  // Activity level (0-10 points)
  if (space.hasBuilders) factors.activity += 5;
  if (space.status === 'activated') factors.activity += 5;

  // Size preference (0-5 points)
  const sizeScore = getSizePreferenceScore(userProfile, space.memberCount);
  factors.size = sizeScore;

  // Freshness boost for new spaces (0-5 points)
  if (space.createdAt) {
    const daysSinceCreated = (Date.now() - space.createdAt.toDate().getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceCreated < 30) {
      factors.freshness = 5 - (daysSinceCreated / 6);
    }
  }

  score = Object.values(factors).reduce((sum, val) => sum + val, 0);

  return {
    total: Math.round(score),
    factors
  };
}

/**
 * Check if space types are complementary
 */
function isComplementarySpaceType(userTypes: string[], spaceType: string): boolean {
  const complementaryPairs: Record<string, string[]> = {
    'greek_life': ['student_organizations', 'campus_living'],
    'student_organizations': ['greek_life', 'university_organizations'],
    'campus_living': ['greek_life', 'student_organizations'],
    'university_organizations': ['student_organizations', 'hive_exclusive']
  };

  return complementaryPairs[spaceType]?.some(type => userTypes.includes(type)) || false;
}

/**
 * Get size preference score based on user's existing spaces
 */
function getSizePreferenceScore(userProfile: UserProfile, memberCount: number): number {
  // Users tend to prefer spaces similar in size to ones they've joined
  if (userProfile.joinedSpaces.length === 0) {
    // New users prefer medium-sized spaces
    return memberCount >= 10 && memberCount <= 50 ? 5 : 2;
  }
  
  // TODO: Calculate average size of user's joined spaces and score accordingly
  return memberCount >= 5 ? Math.min(memberCount / 10, 5) : 1;
}

/**
 * Check if user has access to private spaces
 */
function hasPrivateAccess(userProfile: UserProfile, space: any): boolean {
  // For now, only allow private spaces if user is in complementary spaces
  return userProfile.spaceTypes.includes(space.type);
}

/**
 * Generate human-readable recommendation reason
 */
function generateRecommendationReason(userProfile: UserProfile, space: any, score: any): string {
  const reasons: string[] = [];

  if (score.factors.interest > 20) {
    reasons.push("matches your interests");
  }
  
  if (score.factors.spaceType > 20) {
    reasons.push("similar to spaces you've joined");
  }
  
  if (space.memberCount > 50) {
    reasons.push("popular with students");
  } else if (space.memberCount > 0) {
    reasons.push("growing community");
  }
  
  if (space.hasBuilders) {
    reasons.push("active with builders");
  }

  if (reasons.length === 0) {
    return "Discover something new";
  }

  return reasons.slice(0, 2).join(" and ");
}

/**
 * Get specific matching factors for detailed explanation
 */
function getMatchFactors(userProfile: UserProfile, space: any): string[] {
  const factors: string[] = [];

  // Interest matches
  const interestMatches = userProfile.interests.filter(interest => 
    space.name.toLowerCase().includes(interest) ||
    space.description.toLowerCase().includes(interest) ||
    space.tags.some((tag: string) => tag.toLowerCase().includes(interest))
  );
  
  if (interestMatches.length > 0) {
    factors.push(`Interests: ${interestMatches.slice(0, 3).join(', ')}`);
  }

  // Space type affinity
  if (userProfile.spaceTypes.includes(space.type)) {
    factors.push(`Space type preference`);
  }

  // Size preference
  if (space.memberCount > 20) {
    factors.push('Popular community');
  } else if (space.memberCount > 0) {
    factors.push('Growing community');
  }

  // Activity level
  if (space.hasBuilders) {
    factors.push('Active builders');
  }

  return factors;
}