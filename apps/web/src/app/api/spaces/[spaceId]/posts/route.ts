"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { withAuthAndErrors, type AuthenticatedRequest } from "@/lib/middleware";
import { postCreationRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { HttpStatus } from "@/lib/api-response-types";
import { sseRealtimeService } from "@/lib/sse-realtime-service";

const CreatePostSchema = z.object({
  content: z.string().min(1).max(2000),
  type: z.enum(["text", "image", "link", "tool"]).default("text"),
  imageUrl: z.string().url().optional(),
  linkUrl: z.string().url().optional(),
  toolId: z.string().optional(),
});

// Simple profanity check - in production, use a proper service
const checkProfanity = (text: string): boolean => {
  const profanityWords = ["spam", "scam"]; // Minimal list for demo
  return profanityWords.some((word) => text.toLowerCase().includes(word));
};

async function buildPostResponse(doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>) {
  const data = doc.data();
  const authorDoc = await dbAdmin.collection("users").doc(data.authorId).get();
  const author = authorDoc.exists ? authorDoc.data() : null;

  return {
    id: doc.id,
    ...data,
    author: author
      ? {
          id: authorDoc.id,
          fullName: author.displayName ?? "Unknown User",
          handle: author.handle ?? "unknown",
          photoURL: author.photoURL ?? null,
        }
      : null,
  };
}

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const spaceId = context.params.spaceId;

  if (!spaceId) {
    return respond.error("Space ID is required", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
  }

  const userId = request.user.id;

  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);
    const lastPostId = searchParams.get("lastPostId");
    const type = searchParams.get("type");
    const minReplies = parseInt(searchParams.get("minReplies") ?? "0", 10);

    // Membership check
    const membershipSnapshot = await dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!membershipSnapshot.exists || !membershipSnapshot.data()?.isActive) {
      return respond.error("Not a member of this space", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("posts");

    if (type === "hot_threads") {
      query = query.where("commentCount", ">=", minReplies).orderBy("commentCount", "desc").orderBy("lastActivity", "desc");
    } else {
      query = query.orderBy("createdAt", "desc");
    }

    query = query.limit(limit);

    if (lastPostId) {
      const lastPostDoc = await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .doc(lastPostId)
        .get();

      if (lastPostDoc.exists) {
        query = query.startAfter(lastPostDoc);
      }
    }

    const [postsSnapshot, pinnedSnapshot] = await Promise.all([
      query.get(),
      dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .where("isPinned", "==", true)
        .get(),
    ]);

    const pinnedPosts = await Promise.all(pinnedSnapshot.docs.map(buildPostResponse));
    const pinnedIds = new Set(pinnedPosts.map((post) => post.id));

    const posts = (
      await Promise.all(
        postsSnapshot.docs.map(async (doc) => {
          if (pinnedIds.has(doc.id)) {
            return null;
          }
          return buildPostResponse(doc);
        })
      )
    ).filter(Boolean) as Array<Awaited<ReturnType<typeof buildPostResponse>>>;

    const combined = [...pinnedPosts, ...posts];
    const lastDoc = postsSnapshot.docs[postsSnapshot.docs.length - 1];

    return respond.success({
      posts: combined,
      pagination: {
        hasMore: postsSnapshot.docs.length === limit,
        lastPostId: lastDoc ? lastDoc.id : null,
      },
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error fetching posts for space", err, {
      spaceId,
      userId,
      endpoint: "/api/spaces/[spaceId]/posts",
    });

    return respond.error("Failed to fetch posts", "INTERNAL_ERROR", { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const spaceId = context.params.spaceId;

  if (!spaceId) {
    return respond.error("Space ID is required", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
  }

  const userId = request.user.id;

  try {
    const rateLimitResult = postCreationRateLimit.check(userId);
    if (!rateLimitResult.success) {
      const rateLimitedResponse = respond.error(
        "Rate limit exceeded. Please wait before posting again.",
        "RATE_LIMITED",
        { status: HttpStatus.TOO_MANY_REQUESTS }
      );
      rateLimitedResponse.headers.set("X-RateLimit-Limit", rateLimitResult.limit.toString());
      rateLimitedResponse.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
      rateLimitedResponse.headers.set("X-RateLimit-Reset", new Date(rateLimitResult.resetTime).toISOString());
      return rateLimitedResponse;
    }

    const membershipSnapshot = await dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!membershipSnapshot.exists || !membershipSnapshot.data()?.isActive) {
      return respond.error("Not a member of this space", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    const parsedBody = CreatePostSchema.parse(await request.json());

    if (checkProfanity(parsedBody.content)) {
      return respond.error(
        "Post contains inappropriate content. Please revise and try again.",
        "INVALID_CONTENT",
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const now = new Date();
    const postData = {
      ...parsedBody,
      authorId: userId,
      spaceId,
      createdAt: now,
      updatedAt: now,
      lastActivity: now,
      commentCount: 0,
      reactions: { heart: 0 },
      reactedUsers: { heart: [] as string[] },
      isPinned: false,
      isEdited: false,
      isDeleted: false,
    };

    const postsCollection = dbAdmin.collection("spaces").doc(spaceId).collection("posts");
    const postRef = await postsCollection.add(postData);

    const authorDoc = await dbAdmin.collection("users").doc(userId).get();
    const author = authorDoc.data();

    const createdPost = {
      id: postRef.id,
      ...postData,
      author: {
        id: userId,
        fullName: author?.displayName ?? "Unknown User",
        handle: author?.handle ?? "unknown",
        photoURL: author?.photoURL ?? null,
      },
    };

    try {
      await sseRealtimeService.sendMessage({
        type: "chat",
        channel: `space:${spaceId}:posts`,
        senderId: userId,
        content: {
          type: "new_post",
          post: createdPost,
          spaceId,
        },
        metadata: {
          timestamp: now.toISOString(),
          priority: "normal",
          requiresAck: false,
          retryCount: 0,
        },
      });
    } catch (sseError) {
      const err = sseError instanceof Error ? sseError : new Error(String(sseError));
      logger.warn("Failed to broadcast new post via SSE", {
        postId: postRef.id,
        metadata: {
          message: err.message,
        },
      });
    }

    return respond.success(
      { post: createdPost },
      { status: HttpStatus.CREATED, message: "Post created successfully" }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return respond.error("Invalid post data", "INVALID_INPUT", {
        status: HttpStatus.BAD_REQUEST,
        details: error.errors,
      });
    }

    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Failed to create space post", err, {
      spaceId,
      userId,
      endpoint: "/api/spaces/[spaceId]/posts",
    });

    return respond.error("Failed to create post", "INTERNAL_ERROR", { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});
