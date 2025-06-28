import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@hive/core';
import { generalApiRateLimit } from '@/lib/rate-limit';

interface SpaceTag {
  type: string;
  sub_type: string;
}

interface FirestoreSpace {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: 'major' | 'residential' | 'interest' | 'creative' | 'organization';
  tags: SpaceTag[];
  status: 'dormant' | 'activated' | 'frozen';
  schoolId: string;
}

interface SpaceDiscoveryResponse {
  success: boolean;
  spaces: {
    academic: FirestoreSpace[];
    campusLiving: FirestoreSpace[];
    greekLife: FirestoreSpace[];
    studentOrganizations: FirestoreSpace[];
    universityOrganizations: FirestoreSpace[];
  };
  autoJoinSpaces: string[];
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitResult = await generalApiRateLimit.limit(ip);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId') || 'ub'; // Default to UB
    const userMajors = searchParams.get('majors')?.split(',') || [];

    // Define space types and their nested collection paths
    const spaceTypes = ['major', 'residential', 'interest', 'creative', 'organization'] as const;
    
    let allSpaces: FirestoreSpace[] = [];

    // Query each space type's nested collection
    for (const spaceType of spaceTypes) {
      try {
        const spacesSnapshot = await dbAdmin
          .collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .where('schoolId', '==', schoolId)
          .where('status', '==', 'activated')
          .orderBy('memberCount', 'desc')
          .limit(20) // Limit per type to avoid overwhelming results
          .get();

        const spaces = spacesSnapshot.docs.map(doc => ({
          id: doc.id,
          type: spaceType,
          ...doc.data()
        })) as FirestoreSpace[];

        allSpaces = allSpaces.concat(spaces);
      } catch (error) {
        logger.warn(`Error fetching ${spaceType} spaces:`, error);
        // Continue with other space types even if one fails
      }
    }

    // Categorize spaces for the frontend
    const categorizedSpaces = {
      academic: [] as FirestoreSpace[],
      campusLiving: [] as FirestoreSpace[],
      greekLife: [] as FirestoreSpace[],
      studentOrganizations: [] as FirestoreSpace[],
      universityOrganizations: [] as FirestoreSpace[]
    };

    const autoJoinSpaces: string[] = [];

    allSpaces.forEach(space => {
      switch (space.type) {
        case 'major': {
          categorizedSpaces.academic.push(space);
          
          // Auto-join logic: match user majors with space tags
          if (userMajors.length > 0) {
            const matchesMajor = space.tags?.some(tag => 
              userMajors.some(major => 
                major.toLowerCase().includes(tag.sub_type.toLowerCase()) ||
                tag.sub_type.toLowerCase().includes(major.toLowerCase())
              )
            );
            
            if (matchesMajor) {
              autoJoinSpaces.push(space.id);
            }
          }
          break;
        }
        
        case 'residential': {
          categorizedSpaces.campusLiving.push(space);
          break;
        }
        
        case 'interest': {
          // Check if it's Greek life based on tags
          const isGreek = space.tags?.some(tag => 
            tag.type === 'greek' || 
            tag.sub_type?.toLowerCase().includes('fraternity') ||
            tag.sub_type?.toLowerCase().includes('sorority')
          );
          
          if (isGreek) {
            categorizedSpaces.greekLife.push(space);
          } else {
            categorizedSpaces.studentOrganizations.push(space);
          }
          break;
        }
        
        case 'creative':
        case 'organization': {
          // Check if it's a university organization based on tags
          const isUniversityOrg = space.tags?.some(tag => 
            tag.type === 'university' || 
            tag.sub_type?.toLowerCase().includes('university') ||
            tag.sub_type?.toLowerCase().includes('official')
          );
          
          if (isUniversityOrg) {
            categorizedSpaces.universityOrganizations.push(space);
          } else {
            categorizedSpaces.studentOrganizations.push(space);
          }
          break;
        }
        
        default:
          // Fallback to student organizations
          categorizedSpaces.studentOrganizations.push(space);
      }
    });

    // Sort each category by member count (most popular first)
    Object.values(categorizedSpaces).forEach(category => {
      category.sort((a, b) => b.memberCount - a.memberCount);
    });

    logger.info(`Space discovery: Found ${allSpaces.length} spaces, ${autoJoinSpaces.length} auto-join matches`);

    return NextResponse.json({
      success: true,
      spaces: categorizedSpaces,
      autoJoinSpaces
    });

  } catch (error) {
    logger.error('Error in space discovery:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch spaces',
        spaces: {
          academic: [],
          campusLiving: [],
          greekLife: [],
          studentOrganizations: [],
          universityOrganizations: []
        },
        autoJoinSpaces: []
      },
      { status: 500 }
    );
  }
} 