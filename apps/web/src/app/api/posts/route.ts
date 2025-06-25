import { NextRequest, NextResponse } from "next/server";
import {
  PostCreationEngine,
  CreatePostSchema,
  PostAnalyticsTracker,
  type CreatePostRequest,
  logger,
} from "@hive/core";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  increment,
  getDocs,
  where,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

/**
 * POST /api/posts
 * Create a new post
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    // Parse and validate request body
    const body = await request.json();
    const validation = CreatePostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validation.error.errors.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    const createPostRequest: CreatePostRequest = validation.data;

    // Get user profile information
    // TODO: Implement proper user profile fetching
    const userProfile = {
      handle: user.email?.split("@")[0] || "user",
      fullName: user.email?.split("@")[0] || "User",
    };

    // Create post using engine
    const result = await PostCreationEngine.createPost(
      user.uid,
      userProfile.handle,
      userProfile.fullName,
      createPostRequest
    );

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Failed to create post",
          details: result.errors,
        },
        { status: 400 }
      );
    }

    const post = result.post!;

    // Save to Firestore
    const postRef = doc(collection(db, "posts"), post.id);
    const postData = {
      ...post,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: post.publishedAt ? serverTimestamp() : null,
      scheduledAt: post.scheduledAt ? post.scheduledAt : null,
    };

    await setDoc(postRef, postData);

    // If posting to a space, update the space's post count and activity
    if (post.spaceId) {
      try {
        const spaceRef = doc(db, "spaces", post.spaceId);
        await setDoc(
          spaceRef,
          {
            lastPostAt: serverTimestamp(),
            postCount: increment(1),
            lastActivity: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (error) {
        logger.error("Failed to update space activity:", error);
        // Don't fail the request if space update fails
      }
    }

    // Track analytics
    PostAnalyticsTracker.trackPostCreated(post);

    // Return created post
    return NextResponse.json(
      {
        success: true,
        post: {
          ...post,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
          publishedAt: post.publishedAt?.toISOString(),
          scheduledAt: post.scheduledAt?.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Post creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/posts
 * Retrieve posts (feed)
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user (required but user object not used in this endpoint)
    const _user = await requireAuth(request);

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get("spaceId");
    const _limit = parseInt(searchParams.get("limit") || "20");
    const _offset = parseInt(searchParams.get("offset") || "0");
    const type =
      (searchParams.get("type") as "public" | "space" | "personal") || "public";

    // Build query based on parameters
    const postsCollection = collection(db, "posts");
    const constraints = [];

    // Filter by space if specified
    if (spaceId) {
      constraints.push(where("spaceId", "==", spaceId));
    } else if (type === "public") {
      constraints.push(where("visibility", "==", "public"));
      constraints.push(where("status", "==", "published"));
    }

    // Add ordering and pagination
    constraints.push(orderBy("publishedAt", "desc"));
    constraints.push(limit(_limit));
    // TODO: Implement cursor-based pagination instead of offset
    // Firestore doesn't support offset efficiently for large datasets

    const postsSnapshot = await getDocs(query(postsCollection, ...constraints));
    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString(),
      updatedAt: doc.data().updatedAt?.toDate()?.toISOString(),
      publishedAt: doc.data().publishedAt?.toDate()?.toISOString(),
      scheduledAt: doc.data().scheduledAt?.toDate()?.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        limit: _limit,
        offset: _offset,
        hasMore: posts.length === _limit,
      },
    });
  } catch (error) {
    logger.error("Posts retrieval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
