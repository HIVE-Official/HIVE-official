/**
 * Feed API Route - Firebase Direct Implementation
 * Provides feed data from Firestore
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
  Timestamp,
  documentId
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { logger } from '@/lib/logger';
import { z } from 'zod';

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

      const campusId = 'ub-buffalo';
      const constraints: any[] = [
        where('campusId', '==', campusId),
        where('isActive', '==', true),
        where('isDeleted', '!=', true)
      ];

      // Add type filter
      if (params.type !== 'all') {
        constraints.push(where('contentType', '==', params.type));
      }

      // Add space filter
      if (params.spaceId) {
        constraints.push(where('spaceId', '==', params.spaceId));
      }

      // Order by creation date
      constraints.push(orderBy('createdAt', 'desc'));

      // Add cursor for pagination
      if (params.cursor) {
        const cursorDoc = await getDocs(
          query(collection(db, 'posts'), where(documentId(), '==', params.cursor))
        );
        if (!cursorDoc.empty) {
          constraints.push(startAfter(cursorDoc.docs[0]));
        }
      }

      // Add limit
      constraints.push(limit(params.limit));

      // Execute query
      const postsQuery = query(collection(db, 'posts'), ...constraints);
      const snapshot = await getDocs(postsQuery);

      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        };
      });

      // Get cursor for next page
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      const nextCursor = lastDoc?.id;

      logger.info('Feed fetched', {
        userId: token.id,
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
      logger.error('Feed fetch error', { error: error instanceof Error ? error.message : String(error) });
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