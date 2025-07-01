import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";
import { postCreationRateLimit } from "@/lib/rate-limit";
import { logger } from "@hive/core";

const CreatePostSchema = z.object({
  content: z.string().min(1).max(2000),
  type: z.enum(["text", "image", "link", "tool"]).default("text"),
  imageUrl: z.string().url().optional(),
  linkUrl: z.string().url().optional(),
  toolId: z.string().optional(),
});

const db = dbAdmin;

// Simple profanity check - in production, use a proper service
const checkProfanity = (text: string): boolean => {
  const profanityWords = ["spam", "scam", "hack"];
  return profanityWords.some((word) => text.toLowerCase().includes(word));
};

// GET /api/spaces/[spaceId]/posts - Get posts for a space
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
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
      return NextResponse.json(
        { error: "Not a member of this space" },
        { status: 403 }
      );
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
          : null,
      });
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
          : null,
      });
    }

    return NextResponse.json({
      posts: [...pinnedPosts, ...posts],
      hasMore: postsSnapshot.docs.length === limit,
      lastPostId:
        postsSnapshot.docs.length > 0
          ? postsSnapshot.docs[postsSnapshot.docs.length - 1].id
          : null,
    });
  } catch (error) {
    logger.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check rate limiting
    const { success, limit, remaining, reset, pending } = await postCreationRateLimit.limit(decodedToken.uid);
    
    // Handle pending operations for edge functions
    if (pending) {
      request.signal.addEventListener("abort", () => {
        // Handle cleanup if needed
      });
    }

    if (!success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait before posting again.",
          limit,
          remaining,
          reset,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
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
      return NextResponse.json(
        { error: "Not a member of this space" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedBody = CreatePostSchema.parse(body);

    // Check for profanity
    if (checkProfanity(validatedBody.content)) {
      return NextResponse.json(
        { error: "Content contains inappropriate language" },
        { status: 400 }
      );
    }

    // Create post document
    const postRef = db.collection("spaces").doc(spaceId).collection("posts").doc();
    await postRef.set({
      id: postRef.id,
      ...validatedBody,
      authorId: decodedToken.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
    });

    return NextResponse.json({ id: postRef.id });
  } catch (error) {
    logger.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
