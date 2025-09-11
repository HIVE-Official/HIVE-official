import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, setDoc, deleteDoc, increment, serverTimestamp } from 'firebase/firestore';
import { logger } from '@/lib/logger';

interface RouteParams {
  params: Promise<{ postId: string }>;
}

// POST /api/posts/[postId]/like - Like a post
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { postId } = await params;
    const userId = session.user.id;

    // Check if post exists
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user already liked this post
    const likeRef = doc(db, 'posts', postId, 'likes', userId);
    const likeDoc = await getDoc(likeRef);

    if (likeDoc.exists()) {
      return NextResponse.json(
        { error: 'Already liked this post' },
        { status: 400 }
      );
    }

    // Add like record
    await setDoc(likeRef, {
      userId,
      userName: session.user.name,
      userImage: session.user.image,
      createdAt: serverTimestamp()
    });

    // Update post like count
    await updateDoc(postRef, {
      likeCount: increment(1),
      lastActivityAt: serverTimestamp()
    });

    // Create notification for post author (if not liking own post)
    const postData = postDoc.data();
    if (postData.authorId && postData.authorId !== userId) {
      const notificationRef = doc(db, 'notifications', `${postData.authorId}_${Date.now()}`);
      await setDoc(notificationRef, {
        recipientId: postData.authorId,
        type: 'like',
        postId,
        postTitle: postData.title || postData.content?.substring(0, 50),
        actorId: userId,
        actorName: session.user.name,
        actorImage: session.user.image,
        message: `${session.user.name} liked your post`,
        read: false,
        createdAt: serverTimestamp()
      });
    }

    logger.info('Post liked', { 
      postId, 
      userId,
      authorId: postData.authorId
    });

    return NextResponse.json({
      success: true,
      message: 'Post liked successfully',
      liked: true
    });

  } catch (error) {
    logger.error('Failed to like post', { error });
    return NextResponse.json(
      { error: 'Failed to like post' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[postId]/like - Unlike a post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { postId } = await params;
    const userId = session.user.id;

    // Check if post exists
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user has liked this post
    const likeRef = doc(db, 'posts', postId, 'likes', userId);
    const likeDoc = await getDoc(likeRef);

    if (!likeDoc.exists()) {
      return NextResponse.json(
        { error: 'Post not liked' },
        { status: 400 }
      );
    }

    // Remove like record
    await deleteDoc(likeRef);

    // Update post like count
    await updateDoc(postRef, {
      likeCount: increment(-1),
      lastActivityAt: serverTimestamp()
    });

    logger.info('Post unliked', { 
      postId, 
      userId
    });

    return NextResponse.json({
      success: true,
      message: 'Post unliked successfully',
      liked: false
    });

  } catch (error) {
    logger.error('Failed to unlike post', { error });
    return NextResponse.json(
      { error: 'Failed to unlike post' },
      { status: 500 }
    );
  }
}

// GET /api/posts/[postId]/like - Check if user has liked the post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({
        liked: false,
        requiresAuth: true
      });
    }

    const { postId } = await params;
    const userId = session.user.id;

    // Check if user has liked this post
    const likeRef = doc(db, 'posts', postId, 'likes', userId);
    const likeDoc = await getDoc(likeRef);

    return NextResponse.json({
      liked: likeDoc.exists(),
      requiresAuth: false
    });

  } catch (error) {
    logger.error('Failed to check like status', { error });
    return NextResponse.json({
      liked: false,
      error: 'Failed to check like status'
    });
  }
}