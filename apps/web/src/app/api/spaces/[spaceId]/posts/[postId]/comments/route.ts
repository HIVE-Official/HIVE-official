import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from 'firebase-admin/auth';
import * as admin from 'firebase-admin';
import { getAuthTokenFromRequest } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

const CreateCommentSchema = z.object({
  content: z.string().min(1).max(1000),
  parentCommentId: z.string().optional(), // For nested replies
});

const db = dbAdmin;

// GET /api/spaces/[spaceId]/posts/[postId]/comments - Get comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check if user is member of the space
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.id)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Verify post exists
    const postDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Post not found", "NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Get comments with nested replies
    const commentsSnapshot = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("createdAt", "asc")
      .get();

    const comments = [];
    const commentMap = new Map();

    // First pass: create all comments
    for (const doc of commentsSnapshot.docs) {
      const data = doc.data();
      
      // Get author info
      const authorDoc = await dbAdmin.collection("users").doc(data.authorId).get();
      const authorData = authorDoc.exists ? authorDoc.data() : null;

      const comment = {
        id: doc.id,
        content: data.content,
        authorId: data.authorId,
        author: authorData ? {
          id: authorData.id || data.authorId,
          fullName: authorData.displayName || "Unknown User",
          handle: authorData.handle || "unknown",
          photoURL: authorData.photoURL
        } : {
          id: data.authorId,
          fullName: "Unknown User",
          handle: "unknown"
        },
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        parentCommentId: data.parentCommentId || null,
        replies: [],
        reactions: data.reactions || { heart: 0 },
        isEdited: data.isEdited || false,
        isDeleted: data.isDeleted || false
      };

      commentMap.set(doc.id, comment);
    }

    // Second pass: nest replies
    for (const comment of commentMap.values()) {
      if (comment.parentCommentId) {
        const parent = commentMap.get(comment.parentCommentId);
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        comments.push(comment);
      }
    }

    return NextResponse.json(ApiResponseHelper.success({
      comments,
      total: comments.length
    }));

  } catch (error: any) {
    logger.error("Error fetching comments:", error);
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch comments", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// POST /api/spaces/[spaceId]/posts/[postId]/comments - Create a comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Parse request body
    const body = await request.json();
    const { content, parentCommentId } = CreateCommentSchema.parse(body);

    // Check if user is member of the space
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.id)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Verify post exists
    const postDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Post not found", "NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // If replying to a comment, verify parent comment exists
    if (parentCommentId) {
      const parentCommentDoc = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(parentCommentId)
        .get();

      if (!parentCommentDoc.exists) {
        return NextResponse.json(ApiResponseHelper.error("Parent comment not found", "NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
      }
    }

    // Get user info
    const userDoc = await dbAdmin.collection("users").doc(decodedToken.id).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    // Create comment
    const commentData = {
      content,
      authorId: decodedToken.id,
      spaceId,
      postId,
      parentCommentId: parentCommentId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      reactions: { heart: 0 },
      isEdited: false,
      isDeleted: false
    };

    const commentRef = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add(commentData);

    // Update post reply count and activity for hot threads
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .update({
        replyCount: admin.firestore.FieldValue.increment(1),
        commentCount: admin.firestore.FieldValue.increment(1), // For hot threads filtering
        lastActivity: new Date(), // For hot threads sorting
        updatedAt: new Date()
      });

    const comment = {
      id: commentRef.id,
      ...commentData,
      author: userData ? {
        id: userData.id || decodedToken.id,
        fullName: userData.displayName || "Unknown User",
        handle: userData.handle || "unknown",
        photoURL: userData.photoURL
      } : {
        id: decodedToken.id,
        fullName: "Unknown User",
        handle: "unknown"
      },
      replies: []
    };

    logger.info(`Comment created: ${commentRef.id} in post ${postId} by user ${decodedToken.id}`);

    return NextResponse.json(ApiResponseHelper.success(comment), { status: HttpStatus.CREATED });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(ApiResponseHelper.error("Invalid comment data", "VALIDATION_ERROR", error.errors), { status: HttpStatus.BAD_REQUEST });
    }

    logger.error("Error creating comment:", error);
    return NextResponse.json(ApiResponseHelper.error("Failed to create comment", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}