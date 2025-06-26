import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";

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
  const profanityWords = ["spam", "scam"]; // Minimal list for demo
  return profanityWords.some((word) => text.toLowerCase().includes(word));
};

// POST /api/spaces/[spaceId]/posts - Create a new post
export async function POST(
  request: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  try {
    const { spaceId } = params;

    // Get auth header and verify token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check rate limiting
    const rateLimitResult = await postCreationRateLimit.limit(decodedToken.uid);
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
      return NextResponse.json(
        { error: "Not a member of this space" },
        { status: 403 }
      );
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
        { status: 400 }
      );
    }

    // Create post
    const postRef = db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc();

    const post = {
      id: postRef.id,
      authorId: decodedToken.uid,
      content: validatedData.content,
      type: validatedData.type,
      imageUrl: validatedData.imageUrl,
      linkUrl: validatedData.linkUrl,
      toolId: validatedData.toolId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await postRef.set(post);

    return NextResponse.json({ success: true, post });
  } catch (error) {
    logger.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

 