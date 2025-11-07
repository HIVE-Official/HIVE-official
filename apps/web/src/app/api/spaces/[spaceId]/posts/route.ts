"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { postCreationRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { sseRealtimeService } from "@/lib/sse-realtime-service";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { requireSpaceMembership } from "@/lib/space-security";
import { HttpStatus } from "@/lib/api-response-types";

const profanityWords = ["spam", "scam"];
const containsProfanity = (text: string) =>
  profanityWords.some((word) => text.toLowerCase().includes(word));

const GetPostsSchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  lastPostId: z.string().optional(),
  type: z.enum(["hot_threads", "latest"]).optional(),
  minReplies: z.coerce.number().min(0).default(0),
});

const CreatePostSchema = z.object({
  content: z.string().min(1).max(2000),
  type: z.enum(["text", "image", "link", "tool"]).default("text"),
  imageUrl: z.string().url().optional(),
  linkUrl: z.string().url().optional(),
  toolId: z.string().optional(),
});

async function ensureSpaceAndMembership(spaceId: string, userId: string) {
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

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond,
) => {
  try {
    const { spaceId } = await params;
    const userId = getUserId(request);
    const queryParams = GetPostsSchema.parse(
      Object.fromEntries(request.nextUrl.searchParams.entries()),
    );

    const membership = await ensureSpaceAndMembership(spaceId, userId);
    if (!membership.ok) {
      const code =
        membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(membership.message, code, { status: membership.status });
    }

    let query = dbAdmin.collection("spaces").doc(spaceId).collection("posts");

    if (queryParams.type === "hot_threads") {
      query = query
        .where("commentCount", ">=", queryParams.minReplies)
        .orderBy("commentCount", "desc")
        .orderBy("lastActivity", "desc");
    } else {
      query = query.orderBy("createdAt", "desc");
    }

    query = query.limit(queryParams.limit);

    if (queryParams.lastPostId) {
      const lastDoc = await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .doc(queryParams.lastPostId)
        .get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const postsSnapshot = await query.get();

    const pinnedSnapshot = await dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .where("isPinned", "==", true)
      .get();

    const posts: any[] = [];
    const pinnedPosts: any[] = [];

    const attachAuthor = async (authorId: string) => {
      const authorDoc = await dbAdmin.collection("users").doc(authorId).get();
      const authorData = authorDoc.exists ? authorDoc.data() : null;
      return authorData
        ? {
            id: authorDoc.id,
            fullName: authorData.fullName,
            handle: authorData.handle,
            photoURL: authorData.photoURL,
          }
        : null;
    };

    for (const doc of pinnedSnapshot.docs) {
      const data = doc.data();
      if (data.campusId && data.campusId !== CURRENT_CAMPUS_ID) {
        continue;
      }
      pinnedPosts.push({
        id: doc.id,
        ...data,
        author: await attachAuthor(data.authorId),
      });
    }

    for (const doc of postsSnapshot.docs) {
      const data = doc.data();
      if (data.isPinned) continue;
      if (data.campusId && data.campusId !== CURRENT_CAMPUS_ID) {
        continue;
      }
      posts.push({
        id: doc.id,
        ...data,
        author: await attachAuthor(data.authorId),
      });
    }

    return respond.success({
      posts: [...pinnedPosts, ...posts],
      hasMore: postsSnapshot.docs.length === queryParams.limit,
      lastPostId:
        postsSnapshot.docs.length > 0
          ? postsSnapshot.docs[postsSnapshot.docs.length - 1].id
          : null,
    });
  } catch (error) {
    logger.error(
      "Error fetching posts at /api/spaces/[spaceId]/posts",
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error("Failed to fetch posts", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export const POST = withAuthValidationAndErrors(
  CreatePostSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string }> },
    body,
    respond,
  ) => {
    let spaceId = "";
    let userId = "";
    try {
      const resolved = await params;
      spaceId = resolved.spaceId;
      userId = getUserId(request);

      const membership = await ensureSpaceAndMembership(spaceId, userId);
      if (!membership.ok) {
        const code =
          membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
        return respond.error(membership.message, code, { status: membership.status });
      }

      await postCreationRateLimit.check(userId);

      if (containsProfanity(body.content)) {
        return respond.error("Post contains inappropriate content", "INVALID_INPUT", {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const now = new Date();
      const postData = {
        authorId: userId,
        content: body.content,
        type: body.type,
        imageUrl: body.imageUrl || null,
        linkUrl: body.linkUrl || null,
        toolId: body.toolId || null,
        replyCount: 0,
        commentCount: 0,
        reactions: { heart: 0 },
        reactedUsers: { heart: [] as string[] },
        createdAt: now,
        updatedAt: now,
        lastActivity: now,
        isPinned: false,
        isDeleted: false,
        campusId: CURRENT_CAMPUS_ID,
      };

      const postRef = await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .add(postData);

      await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .update({
          lastActivity: now,
          updatedAt: now,
        });

      try {
        await sseRealtimeService.sendMessage({
          type: "chat",
          channel: `space:${spaceId}:posts`,
          senderId: userId,
          content: {
            type: "post_created",
            postId: postRef.id,
            content: postData.content,
            authorId: userId,
          },
          metadata: {
            timestamp: now.toISOString(),
            priority: "normal",
            requiresAck: false,
            retryCount: 0,
          },
        });
      } catch (broadcastError) {
        logger.warn("Failed to broadcast new post via SSE", {
          broadcastError,
          spaceId,
        });
      }

      return respond.created({
        post: {
          id: postRef.id,
          ...postData,
        },
      });
    } catch (error) {
      logger.error(
        "Error creating post at /api/spaces/[spaceId]/posts",
        error instanceof Error ? error : new Error(String(error)),
        { spaceId, userId },
      );
      return respond.error("Failed to create post", "INTERNAL_ERROR", {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);
