import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';

// Interaction schema
const InteractionSchema = z.object({
  postId: z.string(),
  action: z.enum(['like', 'unlike', 'comment', 'share', 'bookmark', 'unbookmark']),
  content: z.string().optional(), // For comments
  metadata: z.record(z.any()).optional()
});

/**
 * Social Interactions API
 * POST - Like, comment, share, bookmark posts
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    const { postId, action, content, metadata } = InteractionSchema.parse(body);

    logger.info('💫 Social interaction', { 
      userId, 
      postId,
      action,
      endpoint: '/api/social/interactions'
    });

    const batch = dbAdmin.batch();
    const postRef = dbAdmin.collection('posts').doc(postId);

    // Verify post exists
    const postDoc = await postRef.get();
    if (!postDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Post not found", "POST_NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const postData = postDoc.data()!;
    
    switch (action) {
      case 'like': {
        // Check if user already liked
        const existingLike = await dbAdmin.collection('post_likes')
          .where('postId', '==', postId)
          .where('userId', '==', userId)
          .limit(1)
          .get();

        if (existingLike.empty) {
          // Add like
          const likeRef = dbAdmin.collection('post_likes').doc();
          batch.set(likeRef, {
            id: likeRef.id,
            postId,
            userId,
            createdAt: new Date(),
            campusId: 'ub-buffalo'
          });

          // Update post engagement
          batch.update(postRef, {
            'engagement.likes': (postData.engagement?.likes || 0) + 1,
            'reactions.heart': (postData.reactions?.heart || 0) + 1,
            updatedAt: new Date()
          });
        }
        break;
      }

      case 'unlike': {
        // Remove like
        const existingLike = await dbAdmin.collection('post_likes')
          .where('postId', '==', postId)
          .where('userId', '==', userId)
          .limit(1)
          .get();

        if (!existingLike.empty) {
          batch.delete(existingLike.docs[0].ref);
          
          // Update post engagement
          batch.update(postRef, {
            'engagement.likes': Math.max(0, (postData.engagement?.likes || 0) - 1),
            'reactions.heart': Math.max(0, (postData.reactions?.heart || 0) - 1),
            updatedAt: new Date()
          });
        }
        break;
      }

      case 'comment': {
        if (!content?.trim()) {
          return NextResponse.json(
            ApiResponseHelper.error("Comment content is required", "MISSING_CONTENT"),
            { status: HttpStatus.BAD_REQUEST }
          );
        }

        // Add comment
        const commentRef = dbAdmin.collection('post_comments').doc();
        batch.set(commentRef, {
          id: commentRef.id,
          postId,
          userId,
          content: content.trim(),
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          campusId: 'ub-buffalo',
          likes: 0,
          replies: 0
        });

        // Update post engagement
        batch.update(postRef, {
          'engagement.comments': (postData.engagement?.comments || 0) + 1,
          'reactions.comments': (postData.reactions?.comments || 0) + 1,
          updatedAt: new Date()
        });
        break;
      }

      case 'share': {
        // Check if user already shared
        const existingShare = await dbAdmin.collection('post_shares')
          .where('postId', '==', postId)
          .where('userId', '==', userId)
          .limit(1)
          .get();

        if (existingShare.empty) {
          // Add share
          const shareRef = dbAdmin.collection('post_shares').doc();
          batch.set(shareRef, {
            id: shareRef.id,
            postId,
            userId,
            createdAt: new Date(),
            campusId: 'ub-buffalo',
            metadata: metadata || {}
          });

          // Update post engagement
          batch.update(postRef, {
            'engagement.shares': (postData.engagement?.shares || 0) + 1,
            'reactions.shares': (postData.reactions?.shares || 0) + 1,
            updatedAt: new Date()
          });
        }
        break;
      }

      case 'bookmark': {
        // Check if user already bookmarked
        const existingBookmark = await dbAdmin.collection('post_bookmarks')
          .where('postId', '==', postId)
          .where('userId', '==', userId)
          .limit(1)
          .get();

        if (existingBookmark.empty) {
          // Add bookmark
          const bookmarkRef = dbAdmin.collection('post_bookmarks').doc();
          batch.set(bookmarkRef, {
            id: bookmarkRef.id,
            postId,
            userId,
            createdAt: new Date(),
            campusId: 'ub-buffalo'
          });

          // Update post engagement
          batch.update(postRef, {
            'reactions.bookmarks': (postData.reactions?.bookmarks || 0) + 1,
            updatedAt: new Date()
          });
        }
        break;
      }

      case 'unbookmark': {
        // Remove bookmark
        const existingBookmark = await dbAdmin.collection('post_bookmarks')
          .where('postId', '==', postId)
          .where('userId', '==', userId)
          .limit(1)
          .get();

        if (!existingBookmark.empty) {
          batch.delete(existingBookmark.docs[0].ref);
          
          // Update post engagement
          batch.update(postRef, {
            'reactions.bookmarks': Math.max(0, (postData.reactions?.bookmarks || 0) - 1),
            updatedAt: new Date()
          });
        }
        break;
      }
    }

    // Execute all operations
    await batch.commit();

    // Get updated post data
    const updatedPost = await postRef.get();
    const updatedData = updatedPost.data();

    logger.info('✅ Social interaction completed', { 
      userId, 
      postId,
      action,
      endpoint: '/api/social/interactions'
    });

    return NextResponse.json({
      success: true,
      action,
      engagement: updatedData?.engagement || {},
      reactions: updatedData?.reactions || {}
    });

  } catch (error: unknown) {
    logger.error('Social interaction error', { 
      error: error instanceof Error ? error.message : String(error),
      endpoint: '/api/social/interactions'
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid interaction data', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: false, // Social interactions require authentication
  operation: 'social_interaction' 
});