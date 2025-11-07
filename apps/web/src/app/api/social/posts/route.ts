import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

// Post creation schema
const CreatePostSchema = z.object({
  content: z.string().min(1).max(500),
  type: z.enum(['text', 'image', 'video', 'link', 'poll', 'event', 'tool', 'announcement']),
  visibility: z.enum(['public', 'space', 'private']).default('public'),
  spaceId: z.string().optional(),
  attachments: z.array(z.object({
    type: z.enum(['image', 'video', 'file', 'link', 'tool']),
    url: z.string().url(),
    name: z.string(),
    size: z.number().optional(),
    metadata: z.record(z.any()).optional()
  })).default([]),
  tags: z.array(z.string()).max(10).default([]),
  mentions: z.array(z.string()).max(20).default([]),
  poll: z.object({
    question: z.string(),
    options: z.array(z.string()).min(2).max(4),
    allowMultiple: z.boolean().default(false),
    expiresAt: z.string().datetime().optional()
  }).optional(),
  event: z.object({
    title: z.string(),
    description: z.string(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime().optional(),
    location: z.string().optional()
  }).optional()
});

/**
 * Posts API
 * POST - Create new post
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    const postData = CreatePostSchema.parse(body);

    logger.info('📝 Creating post', { 
      userId, 
      type: postData.type,
      spaceId: postData.spaceId,
      endpoint: '/api/social/posts'
    });

    // Create post document
    const postRef = dbAdmin.collection('posts').doc();
    const post = {
      id: postRef.id,
      authorId: userId,
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      campusId: CURRENT_CAMPUS_ID,
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0
      },
      reactions: {
        heart: 0,
        comments: 0,
        shares: 0,
        bookmarks: 0
      },
      // Convert date strings if present
      ...(postData.poll?.expiresAt && {
        poll: {
          ...postData.poll,
          expiresAt: new Date(postData.poll.expiresAt)
        }
      }),
      ...(postData.event && {
        event: {
          ...postData.event,
          startTime: new Date(postData.event.startTime),
          endTime: postData.event.endTime ? new Date(postData.event.endTime) : undefined
        }
      })
    };

    await postRef.set(post);

    // If posting to a space, also add to space's posts subcollection
    if (postData.spaceId) {
      await dbAdmin.collection('spaces')
        .doc(postData.spaceId)
        .collection('posts')
        .doc(postRef.id)
        .set({
          postId: postRef.id,
          authorId: userId,
          createdAt: new Date(),
          type: postData.type,
          summary: postData.content.substring(0, 100)
        });
    }

    logger.info('✅ Post created successfully', { 
      postId: postRef.id,
      userId,
      endpoint: '/api/social/posts'
    });

    return NextResponse.json({
      success: true,
      postId: postRef.id,
      post: {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      }
    });

  } catch (error: unknown) {
    logger.error(
      `Create post error at /api/social/posts`,
      error instanceof Error ? error.message : String(error)
    );

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid post data', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: false, // Post creation requires authentication
  operation: 'create_post' 
});
