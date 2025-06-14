import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/firebase-admin';
import { PostSchema, CreatePostSchema } from '@hive/core';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Simple profanity filter (in production, use more sophisticated service)
const PROFANITY_WORDS = [
  'spam', 'scam', 'fake', 'bot', 'advertisement', 'ad', 'promotion',
  // Add more words as needed - keeping minimal for vBETA
];

const checkProfanity = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return PROFANITY_WORDS.some(word => lowerText.includes(word));
};

const checkRateLimit = (userId: string): boolean => {
  const now = Date.now();
  const userLimit = rateLimitStore.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset window (5 minutes)
    rateLimitStore.set(userId, { count: 1, resetTime: now + 5 * 60 * 1000 });
    return true;
  }
  
  if (userLimit.count >= 10) { // Max 10 posts per 5 minutes
    return false;
  }
  
  userLimit.count++;
  return true;
};

// GET /api/spaces/[spaceId]/posts - Fetch posts for a space
export async function GET(
  request: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const lastPostId = searchParams.get('lastPostId');

    // Check if user is member of the space
    const memberDoc = await db
      .collection('spaces')
      .doc(params.spaceId)
      .collection('members')
      .doc(user.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json({ error: 'Not a member of this space' }, { status: 403 });
    }

    // Build query for posts
    let query = db
      .collection('spaces')
      .doc(params.spaceId)
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(limit);

    if (lastPostId) {
      const lastPostDoc = await db
        .collection('spaces')
        .doc(params.spaceId)
        .collection('posts')
        .doc(lastPostId)
        .get();
      
      if (lastPostDoc.exists) {
        query = query.startAfter(lastPostDoc);
      }
    }

    const postsSnapshot = await query.get();
    
    // Get pinned posts separately (always show at top)
    const pinnedQuery = await db
      .collection('spaces')
      .doc(params.spaceId)
      .collection('posts')
      .where('isPinned', '==', true)
      .orderBy('pinnedAt', 'desc')
      .get();

    const posts = [];
    const pinnedPosts = [];

    // Process pinned posts
    for (const doc of pinnedQuery.docs) {
      const postData = doc.data();
      
      // Get author info
      const authorDoc = await db.collection('users').doc(postData.authorId).get();
      const author = authorDoc.exists ? authorDoc.data() : null;

      pinnedPosts.push({
        id: doc.id,
        ...postData,
        author: author ? {
          id: authorDoc.id,
          fullName: author.fullName,
          handle: author.handle,
          photoURL: author.photoURL,
        } : null,
      });
    }

    // Process regular posts
    for (const doc of postsSnapshot.docs) {
      const postData = doc.data();
      
      // Skip if already in pinned posts
      if (postData.isPinned) continue;
      
      // Get author info
      const authorDoc = await db.collection('users').doc(postData.authorId).get();
      const author = authorDoc.exists ? authorDoc.data() : null;

      posts.push({
        id: doc.id,
        ...postData,
        author: author ? {
          id: authorDoc.id,
          fullName: author.fullName,
          handle: author.handle,
          photoURL: author.photoURL,
        } : null,
      });
    }

    return NextResponse.json({
      posts: [...pinnedPosts, ...posts],
      hasMore: postsSnapshot.docs.length === limit,
      lastPostId: postsSnapshot.docs.length > 0 ? postsSnapshot.docs[postsSnapshot.docs.length - 1].id : null,
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST /api/spaces/[spaceId]/posts - Create a new post
export async function POST(
  request: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check rate limiting
    if (!checkRateLimit(user.uid)) {
      return NextResponse.json({ 
        error: 'Rate limit exceeded. Please wait before posting again.' 
      }, { status: 429 });
    }

    // Check if user is member of the space
    const memberDoc = await db
      .collection('spaces')
      .doc(params.spaceId)
      .collection('members')
      .doc(user.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json({ error: 'Not a member of this space' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = CreatePostSchema.parse(body);

    // Check for profanity
    if (checkProfanity(validatedData.content)) {
      return NextResponse.json({ 
        error: 'Post contains inappropriate content. Please revise and try again.' 
      }, { status: 400 });
    }

    // Create post document
    const postData = {
      ...validatedData,
      authorId: user.uid,
      spaceId: params.spaceId,
      createdAt: new Date(),
      updatedAt: new Date(),
      reactions: {
        heart: 0
      },
      reactedUsers: {
        heart: []
      },
      isPinned: false,
      isEdited: false,
      isDeleted: false,
    };

    const postRef = await db
      .collection('spaces')
      .doc(params.spaceId)
      .collection('posts')
      .add(postData);

    // Get the created post with author info
    const authorDoc = await db.collection('users').doc(user.uid).get();
    const author = authorDoc.data();

    const createdPost = {
      id: postRef.id,
      ...postData,
      author: {
        id: user.uid,
        fullName: author?.fullName || 'Unknown User',
        handle: author?.handle || 'unknown',
        photoURL: author?.photoURL || null,
      }
    };

    return NextResponse.json({ post: createdPost }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid post data', 
        details: error.errors 
      }, { status: 400 });
    }

    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
} 