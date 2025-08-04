import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { type Space } from "@hive/core";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';

const UpdateSpaceSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  bannerUrl: z.string().url().optional(),
  tags: z.array(z.object({
    type: z.string(),
    sub_type: z.string()
  })).optional(),
  settings: z.object({
    allowMemberPosts: z.boolean().optional(),
    requireApproval: z.boolean().optional(),
    allowGuestView: z.boolean().optional(),
    maxMembers: z.number().min(1).max(10000).optional()
  }).optional()
});

export const GET = withAuth(async (
  request: NextRequest,
  authContext,
  { params }: { params: Promise<{ spaceId: string }> }
) => {
  let spaceId: string | undefined;

  try {
    ({ spaceId } = await params);

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Space ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Find the space in the nested structure: spaces/[spacetype]/spaces/spaceID - aligned with new HIVE categories
    const spaceTypes = ['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'cohort'];
    let doc: any = null;
    let spaceType: string | null = null;

    // Search through all space types to find the space
    for (const type of spaceTypes) {
      const potentialSpaceRef = dbAdmin.collection("spaces").doc(type).collection("spaces").doc(spaceId);
      const potentialDoc = await potentialSpaceRef.get();
      
      if (potentialDoc.exists) {
        doc = potentialDoc;
        spaceType = type;
        break;
      }
    }

    if (!doc || !doc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const space = { id: doc.id, ...doc.data() } as Space;

    return NextResponse.json(ApiResponseHelper.success(space), { status: HttpStatus.OK });
  } catch (error) {
    logger.error(`Error fetching space ${spaceId || "unknown"}`, {
      spaceId: spaceId || "unknown",
      error: error instanceof Error ? error.message : String(error),
      endpoint: "/api/spaces/[spaceId]",
      method: "GET"
    });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch space", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: false, // Space data requires authentication
  operation: 'fetch_space' 
});

// PATCH /api/spaces/[spaceId] - Update space settings
export const PATCH = withAuth(async (
  request: NextRequest,
  authContext,
  { params }: { params: Promise<{ spaceId: string }> }
) => {
  let spaceId: string | undefined;

  try {
    ({ spaceId } = await params);

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Space ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Parse request body
    const body = await request.json();
    const updates = UpdateSpaceSchema.parse(body);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(ApiResponseHelper.error("No updates provided", "VALIDATION_ERROR"), { status: HttpStatus.BAD_REQUEST });
    }

    // Find the space in the nested structure
    const spaceTypes = ['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'cohort'];
    let spaceRef: any = null;
    let spaceType: string | null = null;

    // Search through all space types to find the space
    for (const type of spaceTypes) {
      const potentialSpaceRef = dbAdmin.collection("spaces").doc(type).collection("spaces").doc(spaceId);
      const potentialDoc = await potentialSpaceRef.get();
      
      if (potentialDoc.exists) {
        spaceRef = potentialSpaceRef;
        spaceType = type;
        break;
      }
    }

    if (!spaceRef) {
      return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Check if requesting user has permission to update space
    const memberDoc = await spaceRef.collection("members").doc(authContext.uid).get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const memberRole = memberDoc.data()?.role;
    const canUpdateSpace = ['owner', 'admin'].includes(memberRole);

    if (!canUpdateSpace) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to update space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Prepare update data
    const updateData: any = {
      ...updates,
      updatedAt: new Date(),
      updatedBy: authContext.uid
    };

    // Update space document
    await spaceRef.update(updateData);

    // Log the action
    await spaceRef.collection("activity").add({
      type: 'space_updated',
      performedBy: authContext.uid,
      details: {
        updates: Object.keys(updates),
        description: updates.description ? 'Updated space description' : undefined,
        name: updates.name ? 'Updated space name' : undefined
      },
      timestamp: new Date()
    });

    logger.info(`Space updated: ${spaceId} by ${authContext.uid}`, { updates: Object.keys(updates) });

    return NextResponse.json(ApiResponseHelper.success({
      message: "Space updated successfully",
      updates
    }));

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(ApiResponseHelper.error("Invalid update data", "VALIDATION_ERROR", error.errors), { status: HttpStatus.BAD_REQUEST });
    }

    logger.error(`Error updating space ${spaceId || "unknown"}`, {
      spaceId: spaceId || "unknown",
      error: error instanceof Error ? error.message : String(error),
      endpoint: "/api/spaces/[spaceId]",
      method: "PATCH"
    });
    return NextResponse.json(ApiResponseHelper.error("Failed to update space", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: false, // Space updates require authentication
  operation: 'update_space' 
});
