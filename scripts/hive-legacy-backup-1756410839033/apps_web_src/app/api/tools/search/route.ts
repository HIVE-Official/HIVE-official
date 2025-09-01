import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getAuthTokenFromRequest } from '@/lib/auth';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";
import * as admin from 'firebase-admin';

const SearchToolsSchema = z.object({
  query: z.string().min(1).max(100),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  category: z.enum(['productivity', 'academic', 'social', 'utility', 'entertainment', 'other']).optional(),
  verified: z.coerce.boolean().optional(),
  minDeployments: z.coerce.number().min(0).optional(),
  sortBy: z.enum(['relevance', 'deployments', 'rating', 'created']).default('relevance'),
  includePrivate: z.coerce.boolean().default(false) });

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
    const searchParams = SearchToolsSchema.parse(body);
    const { query, limit, offset, category, verified, minDeployments, sortBy, includePrivate } = searchParams;

    // Start with base query
    let toolsQuery: admin.firestore.Query<admin.firestore.DocumentData> = dbAdmin.collection('tools');

    // Apply filters
    if (category) {
      toolsQuery = toolsQuery.where('category', '==', category);
    }
    
    if (verified !== undefined) {
      toolsQuery = toolsQuery.where('isVerified', '==', verified);
    }

    // Filter out private tools unless requested
    if (!includePrivate) {
      toolsQuery = toolsQuery.where('isPrivate', '==', false);
    }

    // Get all tools matching basic filters
    const toolsSnapshot = await toolsQuery.get();
    
    const tools = [];
    const queryLower = query.toLowerCase();

    // Process each tool and apply text search + additional filters
    for (const doc of toolsSnapshot.docs) {
      const toolData = doc.data();
      
      // Text matching
      const name = (toolData.name || '').toLowerCase();
      const description = (toolData.description || '').toLowerCase();
      const tags = (toolData.tags || []).map((tag: string) => tag.toLowerCase());
      
      const nameMatch = name.includes(queryLower);
      const descriptionMatch = description.includes(queryLower);
      const tagMatch = tags.some((tag: string) => tag.includes(queryLower));
      
      if (!nameMatch && !descriptionMatch && !tagMatch) {
        continue;
      }

      // Apply deployment count filter
      const deploymentCount = toolData.deploymentCount || 0;
      if (minDeployments !== undefined && deploymentCount < minDeployments) continue;

      // Calculate relevance score
      let relevanceScore = 0;
      if (nameMatch) relevanceScore += name === queryLower ? 100 : 80;
      if (descriptionMatch) relevanceScore += 60;
      if (tagMatch) relevanceScore += 40;
      
      // Boost verified tools
      if (toolData.isVerified) relevanceScore += 20;
      
      // Boost popular tools
      relevanceScore += Math.min(20, deploymentCount * 2);
      
      // Boost based on rating
      const rating = toolData.averageRating || 0;
      relevanceScore += rating * 5;

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
          logger.warn('Failed to fetch creator info', { data: error, endpoint: '/api/tools/search' });
        }
      }

      // Get deployment status for this user
      let userDeployment = null;
      try {
        const deploymentSnapshot = await db
          .collection('deployments')
          .where('toolId', '==', doc.id)
          .where('userId', '==', decodedToken.uid)
          .where('status', '==', 'active')
          .limit(1)
          .get();
        
        if (!deploymentSnapshot.empty) {
          const deploymentData = deploymentSnapshot.docs[0].data();
          userDeployment = {
            id: deploymentSnapshot.docs[0].id,
            status: deploymentData.status,
            deployedAt: deploymentData.deployedAt?.toDate?.()?.toISOString(),
          };
        }
      } catch (error) {
        logger.warn('Failed to check user deployment', { data: error, endpoint: '/api/tools/search' });
      }

      tools.push({
        id: doc.id,
        name: toolData.name,
        description: toolData.description,
        category: toolData.category,
        tags: toolData.tags || [],
        deploymentCount,
        averageRating: rating,
        ratingCount: toolData.ratingCount || 0,
        isVerified: toolData.isVerified || false,
        isPrivate: toolData.isPrivate || false,
        previewImage: toolData.previewImage || null,
        createdAt: toolData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: toolData.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        creator,
        userDeployment,
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
    tools.sort((a, b) => {
      switch (sortBy) {
        case 'deployments':
          return b.deploymentCount - a.deploymentCount;
        case 'rating':
          if (b.averageRating !== a.averageRating) {
            return b.averageRating - a.averageRating;
          }
          return b.ratingCount - a.ratingCount; // Secondary sort by number of ratings
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'relevance':
        default:
          return b.relevanceScore - a.relevanceScore;
      }
    });

    // Apply pagination
    const paginatedTools = tools.slice(offset, offset + limit);

    return NextResponse.json({
      tools: paginatedTools,
      total: tools.length,
      hasMore: tools.length > offset + limit,
      pagination: {
        limit,
        offset,
        nextOffset: tools.length > offset + limit ? offset + limit : null,
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

    logger.error('Error searching tools', { error: error, endpoint: '/api/tools/search' });
    return NextResponse.json(ApiResponseHelper.error("Failed to search tools", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}