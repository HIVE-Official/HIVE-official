import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";
import { getSpaceMember } from '@/lib/spaces/spaces-db';

const CreatePinnedItemSchema = z.object({
  type: z.enum(['post', 'link', 'document', 'announcement', 'resource']),
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  url: z.string().url().optional(),
  postId: z.string().optional(),
  priority: z.number().min(0).max(10).default(5),
  expiresAt: z.string().datetime().optional(),
  category: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional()
});

const db = dbAdmin;

// GET /api/spaces/[spaceId]/pinned - Get pinned items for a space
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check if user is member of the space
    const member = await getSpaceMember(spaceId, decodedToken.uid);
    if (!member) {
      return NextResponse.json(
        ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Get all pinned items
    const pinnedSnapshot = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("pinned")
      .where("isActive", "==", true)
      .orderBy("priority", "desc")
      .orderBy("pinnedAt", "desc")
      .get();

    const pinnedItems = [];

    for (const doc of pinnedSnapshot.docs) {
      const itemData = doc.data();
      
      // Skip expired items
      if (itemData.expiresAt && new Date(itemData.expiresAt) < new Date()) {
        continue;
      }

      // Get pinner info
      const pinnerDoc = await db
        .collection("users")
        .doc(itemData.pinnedBy)
        .get();
      const pinner = pinnerDoc.exists ? pinnerDoc.data() : null;

      // If it's a pinned post, get the post data
      let postData = null;
      if (itemData.type === 'post' && itemData.postId) {
        try {
          const postDoc = await db
            .collection("spaces")
            .doc(spaceId)
            .collection("posts")
            .doc(itemData.postId)
            .get();
          
          if (postDoc.exists) {
            const post = postDoc.data();
            const authorDoc = await db
              .collection("users")
              .doc(post?.authorId)
              .get();
            const author = authorDoc.exists ? authorDoc.data() : null;
            
            postData = {
              id: postDoc.id,
              ...post,
              author: author ? {
                id: authorDoc.id,
                fullName: author.fullName,
                handle: author.handle,
                photoURL: author.photoURL,
              } : null
            };
          }
        } catch (error) {
          logger.warn('Could not fetch pinned post', { postId: itemData.postId, error });
        }
      }

      pinnedItems.push({
        id: doc.id,
        ...itemData,
        pinnedBy: pinner ? {
          id: itemData.pinnedBy,
          fullName: pinner.fullName,
          handle: pinner.handle,
          photoURL: pinner.photoURL,
        } : null,
        post: postData,
        pinnedAt: itemData.pinnedAt?.toDate ? itemData.pinnedAt.toDate() : itemData.pinnedAt
      });
    }

    return NextResponse.json({
      items: pinnedItems,
      count: pinnedItems.length
    });

  } catch (error) {
    logger.error('Error fetching pinned items', { error, endpoint: '/api/spaces/[spaceId]/pinned' });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch pinned items", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// POST /api/spaces/[spaceId]/pinned - Pin a new item
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get auth header and verify token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check if user has permission to pin items
    const member = await getSpaceMember(spaceId, decodedToken.uid);
    if (!member) {
      return NextResponse.json(
        ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Only owners, admins, and moderators can pin items
    if (!['owner', 'admin', 'moderator'].includes(member.role)) {
      return NextResponse.json(
        ApiResponseHelper.error("Insufficient permissions to pin items", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    const body = await request.json();
    const validatedData = CreatePinnedItemSchema.parse(body);

    // If pinning a post, verify it exists
    if (validatedData.type === 'post' && validatedData.postId) {
      const postDoc = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .doc(validatedData.postId)
        .get();
      
      if (!postDoc.exists) {
        return NextResponse.json(
          ApiResponseHelper.error("Post not found", "NOT_FOUND"), 
          { status: HttpStatus.NOT_FOUND }
        );
      }

      // Also update the post to mark it as pinned
      await postDoc.ref.update({
        isPinned: true,
        pinnedAt: new Date(),
        pinnedBy: decodedToken.uid
      });
    }

    // Create pinned item document
    const pinnedData = {
      ...validatedData,
      spaceId,
      pinnedBy: decodedToken.uid,
      pinnedAt: new Date(),
      isActive: true,
      expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : null,
      viewCount: 0,
      clickCount: 0
    };

    const pinnedRef = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("pinned")
      .add(pinnedData);

    // Get user info for response
    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    const user = userDoc.data();

    const createdItem = {
      id: pinnedRef.id,
      ...pinnedData,
      pinnedBy: {
        id: decodedToken.uid,
        fullName: user?.fullName || "Unknown User",
        handle: user?.handle || "unknown",
        photoURL: user?.photoURL || null,
      }
    };

    // Log the action
    await db.collection("activityEvents").add({
      type: 'item_pinned',
      userId: decodedToken.uid,
      spaceId,
      itemId: pinnedRef.id,
      itemType: validatedData.type,
      timestamp: new Date()
    });

    return NextResponse.json({ item: createdItem }, { status: HttpStatus.CREATED });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid pinned item data",
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error creating pinned item', { error, endpoint: '/api/spaces/[spaceId]/pinned' });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to create pinned item", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// DELETE /api/spaces/[spaceId]/pinned/[itemId] - Unpin an item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");
    
    if (!itemId) {
      return NextResponse.json(
        ApiResponseHelper.error("Item ID is required", "VALIDATION_ERROR"), 
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check if user has permission to unpin items
    const member = await getSpaceMember(spaceId, decodedToken.uid);
    if (!member) {
      return NextResponse.json(
        ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Only owners, admins, and moderators can unpin items
    if (!['owner', 'admin', 'moderator'].includes(member.role)) {
      return NextResponse.json(
        ApiResponseHelper.error("Insufficient permissions to unpin items", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Get the pinned item
    const itemDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("pinned")
      .doc(itemId)
      .get();

    if (!itemDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Pinned item not found", "NOT_FOUND"), 
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const itemData = itemDoc.data()!;

    // If it's a pinned post, update the post to unmark it
    if (itemData.type === 'post' && itemData.postId) {
      try {
        await db
          .collection("spaces")
          .doc(spaceId)
          .collection("posts")
          .doc(itemData.postId)
          .update({
            isPinned: false,
            pinnedAt: null,
            pinnedBy: null
          });
      } catch (error) {
        logger.warn('Could not update post pinned status', { postId: itemData.postId, error });
      }
    }

    // Soft delete the pinned item
    await itemDoc.ref.update({
      isActive: false,
      unpinnedAt: new Date(),
      unpinnedBy: decodedToken.uid
    });

    // Log the action
    await db.collection("activityEvents").add({
      type: 'item_unpinned',
      userId: decodedToken.uid,
      spaceId,
      itemId,
      itemType: itemData.type,
      timestamp: new Date()
    });

    return NextResponse.json(
      ApiResponseHelper.success({ message: "Item unpinned successfully" })
    );

  } catch (error) {
    logger.error('Error unpinning item', { error, endpoint: '/api/spaces/[spaceId]/pinned' });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to unpin item", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// PATCH /api/spaces/[spaceId]/pinned/[itemId] - Update a pinned item
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    const body = await request.json();
    const { itemId, ...updateData } = body;
    
    if (!itemId) {
      return NextResponse.json(
        ApiResponseHelper.error("Item ID is required", "VALIDATION_ERROR"), 
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check permissions
    const member = await getSpaceMember(spaceId, decodedToken.uid);
    if (!member || !['owner', 'admin', 'moderator'].includes(member.role)) {
      return NextResponse.json(
        ApiResponseHelper.error("Insufficient permissions", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Update the pinned item
    const itemRef = db
      .collection("spaces")
      .doc(spaceId)
      .collection("pinned")
      .doc(itemId);

    const itemDoc = await itemRef.get();
    if (!itemDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Pinned item not found", "NOT_FOUND"), 
        { status: HttpStatus.NOT_FOUND }
      );
    }

    await itemRef.update({
      ...updateData,
      updatedAt: new Date(),
      updatedBy: decodedToken.uid
    });

    return NextResponse.json(
      ApiResponseHelper.success({ message: "Pinned item updated successfully" })
    );

  } catch (error) {
    logger.error('Error updating pinned item', { error });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to update pinned item", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}