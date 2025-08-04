import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";
import { postCreationRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

const CreatePostSchema = z.object({
  content: z.string().min(1).max(2000),
  type: z.enum(["text", "image", "link", "tool"]).default("text"),
  imageUrl: z.string().url().optional(),
  linkUrl: z.string().url().optional(),
  toolId: z.string().optional() });

const db = dbAdmin;

// Simple profanity check - in production, use a proper service
const checkProfanity = (text: string): boolean => {
  const profanityWords = ["spam", "scam"]; // Minimal list for demo
  return profanityWords.some((word) => text.toLowerCase().includes(word));
};

// GET /api/spaces/[spaceId]/posts - Get posts for a space
export async function GET(
  request: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  try {
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const { spaceId } = await params;

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
    const lastPostId = searchParams.get("lastPostId");

    // Check if user is member of the space
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Build query for posts
    let query = db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(limit);

    if (lastPostId) {
      const lastPostDoc = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .doc(lastPostId)
        .get();

      if (lastPostDoc.exists) {
        query = query.startAfter(lastPostDoc);
      }
    }

    const postsSnapshot = await query.get();

    // Get pinned posts separately (always show at top)
    const pinnedQuery = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .where("isPinned", "==", true)
      .orderBy("pinnedAt", "desc")
      .get();

    const posts = [];
    const pinnedPosts = [];

    // Process pinned posts
    for (const doc of pinnedQuery.docs) {
      const postData = doc.data();

      // Get author info
      const authorDoc = await db
        .collection("users")
        .doc(postData.authorId)
        .get();
      const author = authorDoc.exists ? authorDoc.data() : null;

      pinnedPosts.push({
        id: doc.id,
        ...postData,
        author: author
          ? {
              id: authorDoc.id,
              fullName: author.fullName,
              handle: author.handle,
              photoURL: author.photoURL,
            }
          : null });
    }

    // Process regular posts
    for (const doc of postsSnapshot.docs) {
      const postData = doc.data();

      // Skip if already in pinned posts
      if (postData.isPinned) continue;

      // Get author info
      const authorDoc = await db
        .collection("users")
        .doc(postData.authorId)
        .get();
      const author = authorDoc.exists ? authorDoc.data() : null;

      posts.push({
        id: doc.id,
        ...postData,
        author: author
          ? {
              id: authorDoc.id,
              fullName: author.fullName,
              handle: author.handle,
              photoURL: author.photoURL,
            }
          : null });
    }

    return NextResponse.json({
      posts: [...pinnedPosts, ...posts],
      hasMore: postsSnapshot.docs.length === limit,
      lastPostId:
        postsSnapshot.docs.length > 0
          ? postsSnapshot.docs[postsSnapshot.docs.length - 1].id
          : null });
  } catch (error) {
    logger.error('Error fetching posts', { error: error, endpoint: '/api/spaces/[spaceId]/posts' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch posts", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// POST /api/spaces/[spaceId]/posts - Create a new post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;

    // Get auth header and verify token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check rate limiting
    const rateLimitResult = postCreationRateLimit.check(decodedToken.uid);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait before posting again.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(
              rateLimitResult.resetTime
            ).toISOString(),
          },
        }
      );
    }

    // Check if user is member of the space
    const memberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const body = (await request.json()) as unknown;
    const validatedData = CreatePostSchema.parse(body);

    // Check for profanity
    if (checkProfanity(validatedData.content)) {
      return NextResponse.json(
        {
          error:
            "Post contains inappropriate content. Please revise and try again.",
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Create post document
    const postData = {
      ...validatedData,
      authorId: decodedToken.uid,
      spaceId: spaceId,
      createdAt: new Date(),
      updatedAt: new Date(),
      reactions: {
        heart: 0,
      },
      reactedUsers: {
        heart: [],
      },
      isPinned: false,
      isEdited: false,
      isDeleted: false,
    };

    const postRef = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .add(postData);

    // Get the created post with author info
    const authorDoc = await dbAdmin.collection("users").doc(decodedToken.uid).get();
    const author = authorDoc.data();

    const createdPost = {
      id: postRef.id,
      ...postData,
      author: {
        id: decodedToken.uid,
        fullName: author?.fullName || "Unknown User",
        handle: author?.handle || "unknown",
        photoURL: author?.photoURL || null,
      },
    };

    return NextResponse.json({ post: createdPost }, { status: HttpStatus.CREATED });
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

    logger.error('Error creating post', { error: error, endpoint: '/api/spaces/[spaceId]/posts' });
    return NextResponse.json(ApiResponseHelper.error("Failed to create post", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
