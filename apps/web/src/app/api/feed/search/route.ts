import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getAuthTokenFromRequest } from '@/lib/auth/auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import * as admin from 'firebase-admin';

const SearchFeedSchema = z.object({
  query: z.string().min(1).max(100),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  type: z.enum(['post', 'event', 'tool', 'space_update', 'announcement']).optional(),
  spaceId: z.string().optional(),
  timeRange: z.enum(['day', 'week', 'month', 'all']).default('all'),
  sortBy: z.enum(['relevance', 'recent', 'engagement']).default('relevance'),
  includeUserContent: z.coerce.boolean().default(true) });

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
    const searchParams = SearchFeedSchema.parse(body);
    const { query, limit, offset, type, spaceId, timeRange, sortBy, includeUserContent } = searchParams;

    // Calculate time filter
    let timeFilter = null;
    if (timeRange !== 'all') {
      const now = new Date();
      const timeMap = {
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
      };
      timeFilter = new Date(now.getTime() - timeMap[timeRange]);
    }

    // Get user's spaces for filtering relevant content
    const userSpacesSnapshot = await db
      .collectionGroup('members')
      .where('userId', '==', decodedToken.uid)
      .get();
    
    const userSpaceIds = userSpacesSnapshot.docs
      .map(doc => doc.ref.parent.parent?.id)
      .filter((id): id is string => Boolean(id));

    const feedItems = [];
    const queryLower = query.toLowerCase();

    // Search posts
    if (!type || type === 'post') {
      let postsQuery: admin.firestore.Query<admin.firestore.DocumentData> = dbAdmin.collection('posts');
      
      if (spaceId) {
        postsQuery = postsQuery.where('spaceId', '==', spaceId);
      } else {
        // Only include posts from user's spaces
        if (userSpaceIds.length > 0) {
          postsQuery = postsQuery.where('spaceId', 'in', userSpaceIds.slice(0, 10)); // Firestore limit
        }
      }
      
      if (timeFilter) {
        postsQuery = postsQuery.where('createdAt', '>=', timeFilter);
      }

      const postsSnapshot = await postsQuery.get();
      
      for (const doc of postsSnapshot.docs) {
        const postData = doc.data();
        
        // Text matching
        const content = (postData.content || '').toLowerCase();
        const title = (postData.title || '').toLowerCase();
        
        const contentMatch = content.includes(queryLower);
        const titleMatch = title.includes(queryLower);
        
        if (!contentMatch && !titleMatch) continue;

        // Get author info
        let author = null;
        if (postData.authorId) {
          try {
            const authorDoc = await dbAdmin.collection('users').doc(postData.authorId).get();
            if (authorDoc.exists) {
              const authorData = authorDoc.data();
              author = {
                id: authorDoc.id,
                name: authorData?.fullName || 'Unknown',
                avatar: authorData?.photoURL || null,
                handle: authorData?.handle || 'unknown',
              };
            }
          } catch (error) {
            logger.warn('Failed to fetch author info', { data: error, endpoint: '/api/feed/search' });
          }
        }

        // Get space info
        let space = null;
        if (postData.spaceId) {
          try {
            const spaceDoc = await dbAdmin.collection('spaces').doc(postData.spaceId).get();
            if (spaceDoc.exists) {
              const spaceData = spaceDoc.data();
              space = {
                id: spaceDoc.id,
                name: spaceData?.name || 'Unknown Space',
              };
            }
          } catch (error) {
            logger.warn('Failed to fetch space info', { data: error, endpoint: '/api/feed/search' });
          }
        }

        // Calculate relevance score
        let relevanceScore = 0;
        if (titleMatch) relevanceScore += title === queryLower ? 100 : 80;
        if (contentMatch) relevanceScore += 60;
        
        // Boost recent content
        const daysSinceCreated = (Date.now() - postData.createdAt?.toDate?.()?.getTime() || Date.now()) / (1000 * 60 * 60 * 24);
        relevanceScore += Math.max(0, 20 - daysSinceCreated);
        
        // Boost engagement
        const likeCount = postData.likeCount || 0;
        const commentCount = postData.commentCount || 0;
        relevanceScore += Math.min(30, (likeCount + commentCount * 2));

        feedItems.push({
          id: doc.id,
          type: 'post',
          title: postData.title,
          content: postData.content,
          createdAt: postData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          author,
          space,
          likeCount,
          commentCount,
          relevanceScore,
          highlights: {
            title: titleMatch ? [title] : [],
            content: contentMatch ? [content.substring(
              Math.max(0, content.indexOf(queryLower) - 50),
              Math.min(content.length, content.indexOf(queryLower) + queryLower.length + 50)
            )] : []
          }
        });
      }
    }

    // Search events
    if (!type || type === 'event') {
      for (const currentSpaceId of (spaceId ? [spaceId] : userSpaceIds.slice(0, 10))) {
        let eventsQuery: admin.firestore.Query<admin.firestore.DocumentData> = db
          .collection('spaces')
          .doc(currentSpaceId)
          .collection('events');
        
        if (timeFilter) {
          eventsQuery = eventsQuery.where('createdAt', '>=', timeFilter);
        }

        const eventsSnapshot = await eventsQuery.get();
        
        for (const doc of eventsSnapshot.docs) {
          const eventData = doc.data();
          
          // Text matching
          const title = (eventData.title || '').toLowerCase();
          const description = (eventData.description || '').toLowerCase();
          
          const titleMatch = title.includes(queryLower);
          const descriptionMatch = description.includes(queryLower);
          
          if (!titleMatch && !descriptionMatch) continue;

          // Get organizer info
          let organizer = null;
          if (eventData.organizerId) {
            try {
              const organizerDoc = await dbAdmin.collection('users').doc(eventData.organizerId).get();
              if (organizerDoc.exists) {
                const organizerData = organizerDoc.data();
                organizer = {
                  id: organizerDoc.id,
                  name: organizerData?.fullName || 'Unknown',
                  avatar: organizerData?.photoURL || null,
                };
              }
            } catch (error) {
              logger.warn('Failed to fetch organizer info', { data: error, endpoint: '/api/feed/search' });
            }
          }

          // Get space info
          let space = null;
          try {
            const spaceDoc = await dbAdmin.collection('spaces').doc(currentSpaceId).get();
            if (spaceDoc.exists) {
              const spaceData = spaceDoc.data();
              space = {
                id: spaceDoc.id,
                name: spaceData?.name || 'Unknown Space',
              };
            }
          } catch (error) {
            logger.warn('Failed to fetch space info', { data: error, endpoint: '/api/feed/search' });
          }

          // Calculate relevance score
          let relevanceScore = 0;
          if (titleMatch) relevanceScore += title === queryLower ? 100 : 80;
          if (descriptionMatch) relevanceScore += 60;
          
          // Boost upcoming events
          const isUpcoming = eventData.startDate && eventData.startDate?.toDate ? eventData.startDate.toDate() : new Date(eventData.startDate) > new Date();
          if (isUpcoming) relevanceScore += 40;
          
          // Boost based on RSVP count (approximated)
          relevanceScore += Math.min(20, (eventData.currentAttendees || 0));

          feedItems.push({
            id: doc.id,
            type: 'event',
            title: eventData.title,
            description: eventData.description,
            startDate: eventData.startDate?.toDate?.()?.toISOString(),
            location: eventData.location,
            createdAt: eventData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            organizer,
            space,
            currentAttendees: eventData.currentAttendees || 0,
            relevanceScore,
            highlights: {
              title: titleMatch ? [title] : [],
              description: descriptionMatch ? [description.substring(
                Math.max(0, description.indexOf(queryLower) - 50),
                Math.min(description.length, description.indexOf(queryLower) + queryLower.length + 50)
              )] : []
            }
          });
        }
      }
    }

    // Search tools
    if (!type || type === 'tool') {
      let toolsQuery: admin.firestore.Query<admin.firestore.DocumentData> = dbAdmin.collection('tools');
      
      if (timeFilter) {
        toolsQuery = toolsQuery.where('createdAt', '>=', timeFilter);
      }

      const toolsSnapshot = await toolsQuery.get();
      
      for (const doc of toolsSnapshot.docs) {
        const toolData = doc.data();
        
        // Skip private tools unless they belong to the user
        if (toolData.isPrivate && toolData.creatorId !== decodedToken.uid) continue;
        
        // Text matching
        const name = (toolData.name || '').toLowerCase();
        const description = (toolData.description || '').toLowerCase();
        
        const nameMatch = name.includes(queryLower);
        const descriptionMatch = description.includes(queryLower);
        
        if (!nameMatch && !descriptionMatch) continue;

        // Get creator info
        let creator = null;
        if (toolData.creatorId) {
          try {
            const creatorDoc = await dbAdmin.collection('users').doc(toolData.creatorId).get();
            if (creatorDoc.exists) {
              const creatorData = creatorDoc.data();
              creator = {
                id: creatorDoc.id,
                name: creatorData?.fullName || 'Unknown',
                avatar: creatorData?.photoURL || null,
              };
            }
          } catch (error) {
            logger.warn('Failed to fetch creator info', { data: error, endpoint: '/api/feed/search' });
          }
        }

        // Calculate relevance score
        let relevanceScore = 0;
        if (nameMatch) relevanceScore += name === queryLower ? 100 : 80;
        if (descriptionMatch) relevanceScore += 60;
        
        // Boost popular tools
        const deploymentCount = toolData.deploymentCount || 0;
        relevanceScore += Math.min(30, deploymentCount * 2);
        
        // Boost verified tools
        if (toolData.isVerified) relevanceScore += 20;

        feedItems.push({
          id: doc.id,
          type: 'tool',
          name: toolData.name,
          description: toolData.description,
          category: toolData.category,
          deploymentCount,
          averageRating: toolData.averageRating || 0,
          createdAt: toolData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          creator,
          relevanceScore,
          highlights: {
            name: nameMatch ? [name] : [],
            description: descriptionMatch ? [description.substring(
              Math.max(0, description.indexOf(queryLower) - 50),
              Math.min(description.length, description.indexOf(queryLower) + queryLower.length + 50)
            )] : []
          }
        });
      }
    }

    // Sort results
    feedItems.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'engagement': {
          const aEngagement = (a.likeCount || 0) + (a.commentCount || 0) + (a.currentAttendees || 0) + (a.deploymentCount || 0);
          const bEngagement = (b.likeCount || 0) + (b.commentCount || 0) + (b.currentAttendees || 0) + (b.deploymentCount || 0);
          return bEngagement - aEngagement;
        }
        case 'relevance':
        default:
          return b.relevanceScore - a.relevanceScore;
      }
    });

    // Apply pagination
    const paginatedItems = feedItems.slice(offset, offset + limit);

    return NextResponse.json({
      items: paginatedItems,
      total: feedItems.length,
      hasMore: feedItems.length > offset + limit,
      pagination: {
        limit,
        offset,
        nextOffset: feedItems.length > offset + limit ? offset + limit : null,
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

    logger.error('Error searching feed', { error: error, endpoint: '/api/feed/search' });
    return NextResponse.json(ApiResponseHelper.error("Failed to search feed", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}