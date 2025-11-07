"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import * as admin from "firebase-admin";
import { logger } from "@/lib/logger";
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { requireSpaceMembership } from "@/lib/space-security";
import { HttpStatus } from "@/lib/api-response-types";

const CreateCommentSchema = z.object({
  content: z.string().min(1).max(1000),
  parentCommentId: z.string().optional(),
});

async function ensureSpaceMembership(spaceId: string, userId: string) {
  const membership = await requireSpaceMembership(spaceId, userId);
  if (!membership.ok) {
    return {
      ok: false as const,
      status: membership.status,
      message: membership.error,
    };
  }

  const spaceData = membership.space;
  if (spaceData.campusId && spaceData.campusId !== CURRENT_CAMPUS_ID) {
    return {
      ok: false as const,
      status: HttpStatus.FORBIDDEN,
      message: "Access denied for this campus",
    };
  }

  return { ok: true as const };
}

async function ensurePostExists(spaceId: string, postId: string) {
  const postDoc = await dbAdmin
    .collection("spaces")
    .doc(spaceId)
    .collection("posts")
    .doc(postId)
    .get();
  if (!postDoc.exists) {
    return { ok: false as const, status: 404, message: "Post not found" };
  }

  const postData = postDoc.data();
  if (!postData) {
    return { ok: false as const, status: 404, message: "Post data missing" };
  }
  if (postData.campusId && postData.campusId !== CURRENT_CAMPUS_ID) {
    return { ok: false as const, status: HttpStatus.FORBIDDEN, message: "Access denied for this campus" };
  }

  return { ok: true as const, postDoc, postData };
}

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> },
  respond,
) => {
  try {
    const { spaceId, postId } = await params;
    const userId = getUserId(request);

    const membership = await ensureSpaceMembership(spaceId, userId);
    if (!membership.ok) {
      const code =
        membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(membership.message, code, { status: membership.status });
    }

    const post = await ensurePostExists(spaceId, postId);
    if (!post.ok) {
      return respond.error(post.message, "RESOURCE_NOT_FOUND", { status: post.status });
    }

    const commentsSnapshot = await dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("createdAt", "asc")
      .get();

    const commentMap = new Map<string, any>();
    const rootComments: any[] = [];

    for (const doc of commentsSnapshot.docs) {
      const data = doc.data();
      if (data.campusId && data.campusId !== CURRENT_CAMPUS_ID) {
        continue;
      }
      const authorDoc = await dbAdmin.collection("users").doc(data.authorId).get();
      const authorData = authorDoc.exists ? authorDoc.data() : null;

      const comment = {
        id: doc.id,
        content: data.content,
        authorId: data.authorId,
        author: authorData
          ? {
              id: authorDoc.id,
              fullName: authorData.fullName || "Unknown User",
              handle: authorData.handle || "unknown",
              photoURL: authorData.photoURL || null,
            }
          : {
              id: data.authorId,
              fullName: "Unknown User",
              handle: "unknown",
              photoURL: null,
            },
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        parentCommentId: data.parentCommentId || null,
        replies: [],
        reactions: data.reactions || { heart: 0 },
        isEdited: Boolean(data.isEdited),
        isDeleted: Boolean(data.isDeleted),
      };

      commentMap.set(doc.id, comment);
    }

    for (const comment of commentMap.values()) {
      if (comment.parentCommentId) {
        const parent = commentMap.get(comment.parentCommentId);
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    }

    return respond.success({
      comments: rootComments,
      total: rootComments.length,
    });
  } catch (error) {
    logger.error(
      "Error fetching comments at /api/spaces/[spaceId]/posts/[postId]/comments",
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error("Failed to fetch comments", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const POST = withAuthValidationAndErrors(
  CreateCommentSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string; postId: string }> },
    body,
    respond,
  ) => {
    try {
      const { spaceId, postId } = await params;
      const userId = getUserId(request);

      const membership = await ensureSpaceMembership(spaceId, userId);
      if (!membership.ok) {
        const code =
          membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
        return respond.error(membership.message, code, { status: membership.status });
      }

      const post = await ensurePostExists(spaceId, postId);
      if (!post.ok) {
        return respond.error(post.message, "RESOURCE_NOT_FOUND", { status: post.status });
      }

      if (body.parentCommentId) {
        const parentDoc = await dbAdmin
          .collection("spaces")
          .doc(spaceId)
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .doc(body.parentCommentId)
          .get();
        if (!parentDoc.exists) {
          return respond.error("Parent comment not found", "RESOURCE_NOT_FOUND", {
            status: HttpStatus.NOT_FOUND,
          });
        }
      }

      const userDoc = await dbAdmin.collection("users").doc(userId).get();
      const userData = userDoc.exists ? userDoc.data() : null;

      const now = new Date();
      const commentData = {
        authorId: userId,
        content: body.content,
        parentCommentId: body.parentCommentId || null,
        createdAt: now,
        updatedAt: now,
        reactions: { heart: 0 },
        reactedUsers: { heart: [] as string[] },
        isEdited: false,
        isDeleted: false,
        campusId: CURRENT_CAMPUS_ID,
      };

      const commentRef = await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add(commentData);

      await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .doc(postId)
        .update({
          replyCount: admin.firestore.FieldValue.increment(1),
          commentCount: admin.firestore.FieldValue.increment(1),
          lastActivity: now,
          updatedAt: now,
        });

      return respond.created({
        id: commentRef.id,
        ...commentData,
        author: userData
          ? {
              id: userId,
              fullName: userData.fullName || "Unknown User",
              handle: userData.handle || "unknown",
              photoURL: userData.photoURL || null,
            }
          : {
              id: userId,
              fullName: "Unknown User",
              handle: "unknown",
              photoURL: null,
            },
        replies: [],
      });
    } catch (error) {
      logger.error(
        "Error creating comment at /api/spaces/[spaceId]/posts/[postId]/comments",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error("Failed to create comment", "INTERNAL_ERROR", {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
