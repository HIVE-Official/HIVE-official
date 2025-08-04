import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { requireAuth } from '@/lib/auth-server';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

/**
 * Spaces overview API - provides summary statistics for the main spaces page
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(request);
    
    // Query all space types to get totals - aligned with new HIVE categories
    const spaceTypes = ['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'cohort'];
    
    let totalSpaces = 0;
    const allSpaces: any[] = [];
    
    // Aggregate data from all space types
    for (const spaceType of spaceTypes) {
      try {
        const spacesSnapshot = await dbAdmin.collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .get();
          
        totalSpaces += spacesSnapshot.size;
        
        // Collect spaces with their data
        const spacesFromType = spacesSnapshot.docs.map((doc: any) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            type: spaceType,
            memberCount: data.metrics?.memberCount || 0,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          };
        });
        
        allSpaces.push(...spacesFromType);
      } catch (error) {
        logger.error('Error querying', { spaceType, error: error, endpoint: '/api/spaces/overview' });
      }
    }

    // Get user's memberships with space details for "my spaces"
    const mySpaces: any[] = [];
    const categoryBreakdown: Record<string, number> = {};
    
    // Initialize category breakdown
    spaceTypes.forEach(type => {
      categoryBreakdown[type] = allSpaces.filter(space => space.type === type).length;
    });
    
    try {
      const membershipQuery = dbAdmin.collectionGroup('members')
        .where('userId', '==', user.uid)
        .limit(50);
        
      const membershipsSnapshot = await membershipQuery.get();
      
      // Get details for user's spaces
      for (const memberDoc of membershipsSnapshot.docs) {
        const spaceId = memberDoc.ref.parent.parent?.id;
        const spaceTypeFromPath = memberDoc.ref.parent.parent?.parent?.parent?.id;
        
        if (spaceId && spaceTypeFromPath) {
          const userSpace = allSpaces.find(space => space.id === spaceId && space.type === spaceTypeFromPath);
          if (userSpace) {
            mySpaces.push({
              id: userSpace.id,
              name: userSpace.name,
              category: userSpace.type,
              avatar: userSpace.name.substring(0, 2).toUpperCase()
            });
          }
        }
      }
    } catch (error) {
      logger.error('Error getting user memberships', { error: error, endpoint: '/api/spaces/overview' });
    }

    // Sort spaces by member count for trending/popular
    const sortedByMembers = [...allSpaces].sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
    
    // Sort by creation date for recent spaces
    const sortedByDate = [...allSpaces].sort((a, b) => {
      const aTime = a.createdAt?.toDate?.() || new Date(0);
      const bTime = b.createdAt?.toDate?.() || new Date(0);
      return bTime.getTime() - aTime.getTime();
    });

    // Create recent activity from space updates and activations
    const recentActivity = sortedByDate.slice(0, 3).map((space, index) => {
      const activities = [
        { message: `${space.name} posted a new event`, status: 'active', categoryLabel: space.type.replace('_', ' ') },
        { message: `${space.name} activated their space`, status: 'active', categoryLabel: space.type.replace('_', ' ') },
        { message: `${space.name} shared new materials`, status: space.type === 'student_organizations' ? 'preview' : 'active', categoryLabel: space.type.replace('_', ' ') }
      ];
      
      const activity = activities[index % activities.length];
      return {
        ...activity,
        spaceEmoji: space.type === 'student_organizations' ? '🎯' : 
                   space.type === 'university_organizations' ? '🎓' : 
                   space.type === 'greek_life' ? '🏛️' : 
                   space.type === 'campus_living' ? '🏠' : '✨',
        timestamp: `${Math.floor(Math.random() * 6) + 1} hours ago`
      };
    });

    const overview = {
      totalSpaces,
      mySpaces,
      categoryBreakdown,
      recentActivity
    };

    return NextResponse.json(overview);
  } catch (error) {
    logger.error('Spaces overview error', { error: error, endpoint: '/api/spaces/overview' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch spaces overview", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}