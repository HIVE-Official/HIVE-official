import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

const EditPostSchema = z.object({
  content: z.string().min(1).max(2000) });

const ReactionSchema = z.object({
  reaction: z.enum(["heart", "thumbsUp", "laugh", "wow", "sad", "angry"]) });

const db = dbAdmin;

// GET /api/spaces/[spaceId]/posts/[postId] - Get a specific post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;

    // Get auth header and verify token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Check if user is member of the space
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get the post
    const postDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Post not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const postData = postDoc.data();

    if (!postData) {
      return NextResponse.json(ApiResponseHelper.error("Post data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Get author info
    const authorDoc = await dbAdmin.collection("users").doc(postData.authorId).get();
    const author = authorDoc.exists ? authorDoc.data() : null;

    const post = {
      id: postDoc.id,
      ...postData,
      author: author
        ? {
            id: authorDoc.id,
            fullName: author.fullName,
            handle: author.handle,
            photoURL: author.photoURL,
          }
        : null,
    };

    return NextResponse.json({ post });
  } catch (error) {
    logger.error('Error fetching post', { error: error, endpoint: '/api/spaces/[spaceId]/posts/[postId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch post", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PATCH /api/spaces/[spaceId]/posts/[postId] - Edit a post
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;

    // Get auth header and verify token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = (await request.json()) as unknown;
    const validatedData = EditPostSchema.parse(body);

    // Get the post
    const postDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Post not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const postData = postDoc.data();

    if (!postData) {
      return NextResponse.json(ApiResponseHelper.error("Post data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Check if post is within edit window (15 minutes)
    const createdAt = postData.createdAt?.toDate ? createdAt.toDate() : new Date(createdAt);
    const now = new Date();
    const editWindowMs = 15 * 60 * 1000; // 15 minutes

    if (now.getTime() - createdAt.getTime() > editWindowMs) {
      return NextResponse.json(
        {
          error:
            "Edit window has expired. Posts can only be edited within 15 minutes of creation.",
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Check permissions - only author can edit
    if (postData.authorId !== userId) {
      return NextResponse.json(ApiResponseHelper.error("Only the author can edit this post", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Update the post
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .update({
        ...validatedData,
        isEdited: true,
        updatedAt: new Date() });

    // Get updated post with author info
    const updatedPostDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .get();

    const updatedPostData = updatedPostDoc.data();

    if (!updatedPostData) {
      return NextResponse.json(ApiResponseHelper.error("Updated post data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const authorDoc = await db
      .collection("users")
      .doc(updatedPostData.authorId)
      .get();
    const author = authorDoc.data();

    const updatedPost = {
      id: updatedPostDoc.id,
      ...updatedPostData,
      author: {
        id: updatedPostData.authorId,
        fullName: author?.fullName || "Unknown User",
        handle: author?.handle || "unknown",
        photoURL: author?.photoURL || null,
      },
    };

    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid post data",
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error editing post', { error: error, endpoint: '/api/spaces/[spaceId]/posts/[postId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to edit post", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE /api/spaces/[spaceId]/posts/[postId] - Delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;

    // Get auth header and verify token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get the post
    const postDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Post not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const postData = postDoc.data();

    if (!postData) {
      return NextResponse.json(ApiResponseHelper.error("Post data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Check permissions - author, space builders, or admins can delete
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const memberData = memberDoc.data();

    if (!memberData) {
      return NextResponse.json(ApiResponseHelper.error("Member data not found", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const canDelete =
      postData.authorId === userId ||
      memberData.role === "builder" ||
      memberData.role === "admin";

    if (!canDelete) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to delete this post", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Soft delete the post
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .update({
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: userId });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    logger.error('Error deleting post', { error: error, endpoint: '/api/spaces/[spaceId]/posts/[postId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to delete post", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// POST /api/spaces/[spaceId]/posts/[postId] - React to a post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;

    // Get auth header and verify token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = (await request.json()) as unknown;
    const { reaction } = ReactionSchema.parse(body);

    // Check if user is member of the space
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get the post
    const postRef = db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId);

    const postDoc = await postRef.get();
    if (!postDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Post not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const postData = postDoc.data();

    if (!postData) {
      return NextResponse.json(ApiResponseHelper.error("Post data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Update reactions
    const currentReactions = postData.reactions || {};
    const currentReactedUsers = postData.reactedUsers || {};

    // Initialize reaction arrays if they don't exist
    if (!currentReactedUsers[reaction]) {
      currentReactedUsers[reaction] = [];
    }

    // Toggle reaction
    if (!currentReactedUsers[reaction].includes(userId)) {
      currentReactedUsers[reaction].push(userId);
      currentReactions[reaction] = (currentReactions[reaction] || 0) + 1;
    } else {
      // Remove reaction
      currentReactedUsers[reaction] = currentReactedUsers[reaction].filter(
        (uid: string) => uid !== userId
      );
      currentReactions[reaction] = Math.max(
        0,
        (currentReactions[reaction] || 0) - 1
      );
    }

    // Update the post
    await postRef.update({
      reactions: currentReactions,
      reactedUsers: currentReactedUsers,
      updatedAt: new Date() });

    return NextResponse.json({
      success: true,
      reactions: currentReactions,
      userReacted: currentReactedUsers[reaction].includes(userId) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid reaction data",
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error updating reaction', { error: error, endpoint: '/api/spaces/[spaceId]/posts/[postId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update reaction", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
