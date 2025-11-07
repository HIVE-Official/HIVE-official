"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
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

const EditPostSchema = z.object({
  content: z.string().min(1).max(2000),
});

const ReactionSchema = z.object({
  reaction: z.enum(["heart", "thumbsUp", "laugh", "wow", "sad", "angry"]),
});

async function loadSpaceMembership(spaceId: string, userId: string) {
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

  return {
    ok: true as const,
    spaceData,
    membershipData: membership.membership,
  };
}

async function loadPost(spaceId: string, postId: string) {
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

    const membership = await loadSpaceMembership(spaceId, userId);
    if (!membership.ok) {
      const code =
        membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(membership.message, code, { status: membership.status });
    }

    const post = await loadPost(spaceId, postId);
    if (!post.ok) {
      return respond.error(post.message, "RESOURCE_NOT_FOUND", { status: post.status });
    }

    const authorDoc = await dbAdmin.collection("users").doc(post.postData.authorId).get();
    const authorData = authorDoc.exists ? authorDoc.data() : null;

    return respond.success({
      post: {
        id: post.postDoc.id,
        ...post.postData,
        author: authorData
          ? {
              id: authorDoc.id,
              fullName: authorData.fullName,
              handle: authorData.handle,
              photoURL: authorData.photoURL,
            }
          : null,
      },
    });
  } catch (error) {
    logger.error(
      "Error fetching post at /api/spaces/[spaceId]/posts/[postId]",
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error("Failed to fetch post", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const PATCH = withAuthValidationAndErrors(
  EditPostSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string; postId: string }> },
    body,
    respond,
  ) => {
    try {
      const { spaceId, postId } = await params;
      const userId = getUserId(request);

      const membership = await loadSpaceMembership(spaceId, userId);
      if (!membership.ok) {
        const code =
          membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
        return respond.error(membership.message, code, { status: membership.status });
      }

      const post = await loadPost(spaceId, postId);
      if (!post.ok) {
        return respond.error(post.message, "RESOURCE_NOT_FOUND", { status: post.status });
      }

      const createdAt = post.postData.createdAt?.toDate
        ? post.postData.createdAt.toDate()
        : new Date(post.postData.createdAt);
      const now = new Date();
      if (now.getTime() - createdAt.getTime() > 15 * 60 * 1000) {
        return respond.error(
          "Edit window has expired. Posts can only be edited within 15 minutes of creation.",
          "INVALID_INPUT",
          { status: HttpStatus.BAD_REQUEST },
        );
      }

      if (post.postData.authorId !== userId) {
        return respond.error("Only the author can edit this post", "FORBIDDEN", {
          status: HttpStatus.FORBIDDEN,
        });
      }

      await post.postDoc.ref.update({
        content: body.content,
        isEdited: true,
        updatedAt: new Date(),
      });

      const updatedDoc = await post.postDoc.ref.get();
      const updatedData = updatedDoc.data();
      if (!updatedData) {
        return respond.error("Updated post data not found", "RESOURCE_NOT_FOUND", {
          status: HttpStatus.NOT_FOUND,
        });
      }

      const authorDoc = await dbAdmin.collection("users").doc(updatedData.authorId).get();
      const author = authorDoc.data();

      return respond.success({
        post: {
          id: updatedDoc.id,
          ...updatedData,
          author: {
            id: updatedData.authorId,
            fullName: author?.fullName || "Unknown User",
            handle: author?.handle || "unknown",
            photoURL: author?.photoURL || null,
          },
        },
      });
    } catch (error) {
      logger.error(
        "Error editing post at /api/spaces/[spaceId]/posts/[postId]",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error("Failed to edit post", "INTERNAL_ERROR", {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);

export const DELETE = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> },
  respond,
) => {
  try {
    const { spaceId, postId } = await params;
    const userId = getUserId(request);

    const membership = await loadSpaceMembership(spaceId, userId);
    if (!membership.ok) {
      const code =
        membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(membership.message, code, { status: membership.status });
    }

    const post = await loadPost(spaceId, postId);
    if (!post.ok) {
      return respond.error(post.message, "RESOURCE_NOT_FOUND", { status: post.status });
    }

    const role = membership.membershipData.role;
    const canDelete =
      post.postData.authorId === userId || role === "builder" || role === "admin" || role === "owner";

    if (!canDelete) {
      return respond.error("Insufficient permissions to delete this post", "FORBIDDEN", {
        status: HttpStatus.FORBIDDEN,
      });
    }

    await post.postDoc.ref.update({
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: userId,
    });

    return respond.success({ message: "Post deleted successfully" });
  } catch (error) {
    logger.error(
      "Error deleting post at /api/spaces/[spaceId]/posts/[postId]",
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error("Failed to delete post", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const POST = withAuthValidationAndErrors(
  ReactionSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string; postId: string }> },
    body,
    respond,
  ) => {
    try {
      const { spaceId, postId } = await params;
      const userId = getUserId(request);

      const membership = await loadSpaceMembership(spaceId, userId);
    if (!membership.ok) {
      const code =
        membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(membership.message, code, { status: membership.status });
    }

      const post = await loadPost(spaceId, postId);
      if (!post.ok) {
        return respond.error(post.message, "RESOURCE_NOT_FOUND", { status: post.status });
      }

      const postRef = post.postDoc.ref;
      const postData = post.postData;

      const currentReactions = postData.reactions || {};
      const currentReactedUsers = postData.reactedUsers || {};

      if (!currentReactedUsers[body.reaction]) {
        currentReactedUsers[body.reaction] = [];
      }

      if (!currentReactedUsers[body.reaction].includes(userId)) {
        currentReactedUsers[body.reaction].push(userId);
        currentReactions[body.reaction] = (currentReactions[body.reaction] || 0) + 1;
      } else {
        currentReactedUsers[body.reaction] = currentReactedUsers[body.reaction].filter(
          (uid: string) => uid !== userId,
        );
        currentReactions[body.reaction] = Math.max(
          0,
          (currentReactions[body.reaction] || 0) - 1,
        );
      }

      await postRef.update({
        reactions: currentReactions,
        reactedUsers: currentReactedUsers,
        updatedAt: new Date(),
      });

      return respond.success({
        reactions: currentReactions,
        userReacted: currentReactedUsers[body.reaction].includes(userId),
      });
    } catch (error) {
      logger.error(
        "Error updating reaction at /api/spaces/[spaceId]/posts/[postId]",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error("Failed to update reaction", "INTERNAL_ERROR", {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
