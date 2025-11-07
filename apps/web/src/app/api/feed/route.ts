/**
 * Feed API Route - Firebase Direct Implementation
 * Provides feed data from Firestore
 */

import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

// Feed query schema
const FeedQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  cursor: z.string().optional(),
  type: z.enum(['all', 'spaces', 'events', 'posts']).default('all'),
  spaceId: z.string().optional()
});

export const GET = withSecureAuth(
  async (request: NextRequest, token) => {
    try {
      const { searchParams } = new URL(request.url);
      const params = FeedQuerySchema.parse({
        limit: searchParams.get('limit'),
        cursor: searchParams.get('cursor'),
        type: searchParams.get('type'),
        spaceId: searchParams.get('spaceId')
      });

      const campusId = CURRENT_CAMPUS_ID;
      const postsRef = dbAdmin.collection('posts');
      let q: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = postsRef
        .where('campusId', '==', campusId)
        .where('isActive', '==', true)
        .where('isDeleted', '!=', true);

      if (params.type !== 'all') {
        q = q.where('type', '==', params.type);
      }
      if (params.spaceId) {
        q = q.where('spaceId', '==', params.spaceId);
      }

      q = q.orderBy('createdAt', 'desc');

      if (params.cursor) {
        const cursorSnap = await postsRef.doc(params.cursor).get();
        if (cursorSnap.exists) {
          q = q.startAfter(cursorSnap);
        }
      }

      q = q.limit(params.limit);

      const snapshot = await q.get();

      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || data.createdAt || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt || new Date()
        };
      });

      // Get cursor for next page
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      const nextCursor = lastDoc?.id;

      logger.info('Feed fetched', {
        userId: token.uid,
        count: posts.length,
        type: params.type
      });

      return NextResponse.json({
        success: true,
        posts,
        pagination: {
          limit: params.limit,
          cursor: params.cursor,
          nextCursor,
          hasMore: posts.length === params.limit
        }
      });
    } catch (error) {
      logger.error('Feed fetch error', { error: error instanceof Error ? error : new Error(String(error)) });
      return NextResponse.json(
        { success: false, error: 'Failed to fetch feed' },
        { status: 500 }
      );
    }
  },
  {
    allowAnonymous: false,
    rateLimit: { type: 'api' }
  }
);
