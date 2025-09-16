import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import type { Space, SpaceType } from "@hive/core";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api/middleware/api-auth-middleware';
import * as admin from 'firebase-admin';

const createSpaceSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  type: z.enum(['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive']),
  subType: z.string().optional(),
  isPrivate: z.boolean().default(false),
  tags: z.array(z.string()).default([])
});

export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const { searchParams } = new URL(request.url);
    const filterType = searchParams.get("type") as SpaceType | "all" | null;
    const searchTerm = searchParams.get("q")?.toLowerCase() || null;
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0"), 0);

    // Use flat collection structure - all spaces in one collection
    let spacesQuery: admin.firestore.Query<admin.firestore.DocumentData> = dbAdmin.collection("spaces");

    // Apply type filter
    if (filterType && filterType !== "all") {
      spacesQuery = spacesQuery.where("type", "==", filterType);
    }

    // Apply search filter
    if (searchTerm) {
      spacesQuery = spacesQuery
        .where("name_lowercase", ">=", searchTerm)
        .where("name_lowercase", "<=", searchTerm + "\uf8ff")
        .orderBy("name_lowercase");
    } else {
      // Default ordering by member count (popular first), then name
      spacesQuery = spacesQuery
        .orderBy("metrics.memberCount", "desc")
        .orderBy("name_lowercase");
    }

    // Apply pagination
    if (offset > 0) {
      // For offset pagination, we need to use startAfter with cursor
      // This is a simplified implementation - production would use proper cursors
      spacesQuery = spacesQuery.offset(offset);
    }
    
    spacesQuery = spacesQuery.limit(limit);

    const snapshot = await spacesQuery.get();

    if (snapshot.empty) {
      return NextResponse.json(ApiResponseHelper.success([]), { status: HttpStatus.OK });
    }

    const spaces = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Space[];

    // Get total count for pagination (expensive but necessary)
    let totalCount = 0;
    try {
      let countQuery = dbAdmin.collection("spaces");
      if (filterType && filterType !== "all") {
        countQuery = countQuery.where("type", "==", filterType);
      }
      if (searchTerm) {
        countQuery = countQuery
          .where("name_lowercase", ">=", searchTerm)
          .where("name_lowercase", "<=", searchTerm + "\uf8ff");
      }
      const countSnapshot = await countQuery.count().get();
      totalCount = countSnapshot.data().count;
    } catch (error) {
      logger.warn('Could not get total count, using spaces length', { error });
      totalCount = spaces.length;
    }

    return NextResponse.json(ApiResponseHelper.success({
      spaces,
      pagination: {
        limit,
        offset,
        totalCount,
        hasMore: offset + limit < totalCount,
        nextOffset: offset + limit < totalCount ? offset + limit : null
      }
    }), { status: HttpStatus.OK });
    
  } catch (error) {
    logger.error('Error fetching spaces', { error: error, endpoint: '/api/spaces' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch spaces", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Space browsing can allow development bypass
  operation: 'list_spaces' 
});

export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    // Parse and validate request body
    const body = await request.json();
    const { name, description, type, subType, isPrivate, tags } = createSpaceSchema.parse(body);

    // Generate space ID and create space document - use flat structure
    const spaceRef = dbAdmin.collection('spaces').doc();
    const spaceId = spaceRef.id;
    const now = FieldValue.serverTimestamp();
    
    const spaceData = {
      name,
      name_lowercase: name.toLowerCase(),
      description,
      type,
      subType: subType || null,
      status: 'active', // New spaces start active
      isPrivate,
      tags: tags.map(tag => ({ sub_type: tag })),
      createdAt: now,
      updatedAt: now,
      createdBy: userId,
      metrics: {
        memberCount: 1, // Creator is first member
        postCount: 0,
        eventCount: 0,
        toolCount: 0,
        activeMembers: 1
      },
      bannerUrl: null
    };

    // Use batch write for atomicity
    const batch = dbAdmin.batch();

    // Create space in flat structure
    batch.set(spaceRef, spaceData);

    // Add creator as owner in separate members collection
    const memberRef = dbAdmin.collection('spaceMembers').doc();
    batch.set(memberRef, {
      spaceId,
      userId,
      role: 'owner',
      joinedAt: now,
      isActive: true,
      permissions: ['admin', 'moderate', 'post', 'invite']
    });

    // Commit all changes atomically
    await batch.commit();

    logger.info('✅ Created space by user', {  type, userId, endpoint: '/api/spaces'  });

    return NextResponse.json({
      success: true,
      space: {
        id: spaceId,
        ...spaceData
      }
    }, { status: HttpStatus.CREATED });

  } catch (error: any) {
    logger.error('❌ Create space error', { error: error, endpoint: '/api/spaces' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: false, // Space creation is sensitive - require real auth
  operation: 'create_space' 
});
