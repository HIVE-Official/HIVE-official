import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getAuthTokenFromRequest } from '@/lib/auth/auth';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import * as admin from 'firebase-admin';

const SearchSpacesSchema = z.object({
  query: z.string().min(1).max(100),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  type: z.enum(['academic', 'social', 'recreational', 'cultural', 'general']).optional(),
  verified: z.coerce.boolean().optional(),
  minMembers: z.coerce.number().min(0).optional(),
  maxMembers: z.coerce.number().min(0).optional(),
  sortBy: z.enum(['relevance', 'members', 'activity', 'created']).default('relevance') });

const db = dbAdmin;

export async function POST(request: NextRequest) {
  try {
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const body = await request.json();
    const searchParams = SearchSpacesSchema.parse(body);
    const { query, limit, offset, type, verified, minMembers, maxMembers, sortBy } = searchParams;

    // Try to use flat collection first (easier for searching)
    let spacesSnapshot;
    try {
      // Check if flat collection exists
      let spacesQuery: admin.firestore.Query<admin.firestore.DocumentData> = dbAdmin.collection('spaces_flat');
      
      // Apply filters
      if (type) {
        spacesQuery = spacesQuery.where('category', '==', type);
      }
      
      if (verified !== undefined) {
        spacesQuery = spacesQuery.where('isVerified', '==', verified);
      }
      
      spacesSnapshot = await spacesQuery.get();
      
      // If flat collection is empty, fall back to nested structure
      if (spacesSnapshot.empty) {
        logger.info('Flat collection empty, trying nested structure', { endpoint: '/api/spaces/search' });
        
        // For nested structure, we need to query each space type (using actual RSS feed data)
        const spaceTypes = ['student_organizations', 'fraternity_and_sorority', 'campus_living', 'university_organizations'];
        const allDocs: admin.firestore.QueryDocumentSnapshot[] = [];
        
        for (const spaceType of spaceTypes) {
          try {
            const nestedSnapshot = await dbAdmin
              .collection('spaces')
              .doc(spaceType)
              .collection('spaces')
              .get();
            
            if (!nestedSnapshot.empty) {
              logger.info(`Found ${nestedSnapshot.size} spaces in ${spaceType}`, { endpoint: '/api/spaces/search' });
              allDocs.push(...nestedSnapshot.docs);
            }
          } catch (err) {
            logger.warn(`Could not query ${spaceType}`, { error: err, endpoint: '/api/spaces/search' });
          }
        }
        
        spacesSnapshot = { docs: allDocs, empty: allDocs.length === 0 };
      }
    } catch (error) {
      logger.warn('Error querying spaces, using fallback', { error, endpoint: '/api/spaces/search' });
      spacesSnapshot = { docs: [], empty: true };
    }
    
    const spaces = [];
    const queryLower = query.toLowerCase();

    // Process each space and apply text search + additional filters
    for (const doc of spacesSnapshot.docs) {
      const spaceData = doc.data();
      
      // Text matching
      const name = (spaceData.name || '').toLowerCase();
      const description = (spaceData.description || '').toLowerCase();
      const tags = (spaceData.tags || []).map((tag: string) => tag.toLowerCase());
      
      const nameMatch = name.includes(queryLower);
      const descriptionMatch = description.includes(queryLower);
      const tagMatch = tags.some((tag: string) => tag.includes(queryLower));
      
      if (!nameMatch && !descriptionMatch && !tagMatch) {
        continue;
      }

      // Apply member count filters
      const memberCount = spaceData.memberCount || 0;
      if (minMembers !== undefined && memberCount < minMembers) continue;
      if (maxMembers !== undefined && memberCount > maxMembers) continue;

      // Calculate relevance score
      let relevanceScore = 0;
      if (nameMatch) relevanceScore += name === queryLower ? 100 : 80;
      if (descriptionMatch) relevanceScore += 60;
      if (tagMatch) relevanceScore += 40;
      
      // Boost verified spaces
      if (spaceData.isVerified) relevanceScore += 20;
      
      // Boost popular spaces
      relevanceScore += Math.min(20, memberCount / 10);
      
      // Get creator info
      let creator = null;
      if (spaceData.creatorId) {
        try {
          const creatorDoc = await dbAdmin.collection('users').doc(spaceData.creatorId).get();
          if (creatorDoc.exists) {
            const creatorData = creatorDoc.data();
            creator = {
              id: creatorDoc.id,
              name: creatorData?.fullName || 'Unknown',
              avatar: creatorData?.photoURL || null,
            };
          }
        } catch (error) {
          logger.warn('Failed to fetch creator info', { data: error, endpoint: '/api/spaces/search' });
        }
      }

      // Check if user is already a member
      let isMember = false;
      try {
        const memberDoc = await db
          .collection('spaces')
          .doc(doc.id)
          .collection('members')
          .doc(decodedToken.uid)
          .get();
        isMember = memberDoc.exists;
      } catch (error) {
        logger.warn('Failed to check membership', { data: error, endpoint: '/api/spaces/search' });
      }

      spaces.push({
        id: doc.id,
        name: spaceData.name,
        description: spaceData.description,
        type: spaceData.type,
        tags: spaceData.tags || [],
        memberCount: memberCount,
        isVerified: spaceData.isVerified || false,
        isPrivate: spaceData.isPrivate || false,
        createdAt: spaceData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        creator,
        isMember,
        relevanceScore,
        // Add highlights for matched text
        highlights: {
          name: nameMatch ? [name] : [],
          description: descriptionMatch ? [description.substring(
            Math.max(0, description.indexOf(queryLower) - 30),
            Math.min(description.length, description.indexOf(queryLower) + queryLower.length + 30)
          )] : [],
          tags: tagMatch ? tags.filter((tag: string) => tag.includes(queryLower)) : []
        }
      });
    }

    // Sort results
    spaces.sort((a, b) => {
      switch (sortBy) {
        case 'members':
          return b.memberCount - a.memberCount;
        case 'activity': {
          // Mock activity score based on recent creation and member count
          const aActivity = a.memberCount + (Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24);
          const bActivity = b.memberCount + (Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60 * 24);
          return bActivity - aActivity;
        }
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'relevance':
        default:
          return b.relevanceScore - a.relevanceScore;
      }
    });

    // Apply pagination
    const paginatedSpaces = spaces.slice(offset, offset + limit);

    return NextResponse.json({
      spaces: paginatedSpaces,
      total: spaces.length,
      hasMore: spaces.length > offset + limit,
      pagination: {
        limit,
        offset,
        nextOffset: spaces.length > offset + limit ? offset + limit : null,
      },
      query: {
        ...searchParams,
        executedAt: new Date().toISOString(),
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid search parameters',
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error searching spaces', { error: error, endpoint: '/api/spaces/search' });
    return NextResponse.json(ApiResponseHelper.error("Failed to search spaces", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}