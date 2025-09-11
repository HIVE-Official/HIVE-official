import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, addDoc, collection, increment, serverTimestamp } from 'firebase/firestore';
import { logger } from '@/lib/logger';

interface RouteParams {
  params: Promise<{ postId: string }>;
}

// POST /api/posts/[postId]/share - Share a post
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    const { postId } = await params;
    const body = await request.json();
    const { platform, message, spaceId } = body;

    // Check if post exists
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const postData = postDoc.data();
    const userId = session?.user?.id || 'anonymous';

    // Record share activity
    const shareData = {
      postId,
      postTitle: postData.title || postData.content?.substring(0, 50),
      userId: session?.user?.id || null,
      userName: session?.user?.name || 'Anonymous',
      platform: platform || 'internal', // internal, twitter, facebook, linkedin, copy-link
      message: message || null,
      spaceId: spaceId || null,
      createdAt: serverTimestamp(),
      metadata: {
        postAuthorId: postData.authorId,
        postSpaceId: postData.spaceId,
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer')
      }
    };

    // Save share record
    await addDoc(collection(db, 'shares'), shareData);

    // Update post share count
    await updateDoc(postRef, {
      shareCount: increment(1),
      lastActivityAt: serverTimestamp()
    });

    // If sharing to another space (cross-posting)
    if (spaceId && session?.user) {
      // Check if user is member of target space
      const memberRef = doc(db, 'spaces', spaceId, 'members', session.user.id);
      const memberDoc = await getDoc(memberRef);

      if (memberDoc.exists()) {
        // Create a cross-post reference
        const crossPostData = {
          originalPostId: postId,
          originalSpaceId: postData.spaceId,
          targetSpaceId: spaceId,
          sharedBy: session.user.id,
          sharedByName: session.user.name,
          message: message || '',
          originalContent: postData.content,
          originalTitle: postData.title,
          originalAuthorId: postData.authorId,
          originalAuthorName: postData.authorName,
          type: 'cross-post',
          createdAt: serverTimestamp()
        };

        await addDoc(collection(db, 'posts'), crossPostData);
      }
    }

    // Create notification for post author (if not sharing own post)
    if (session?.user && postData.authorId && postData.authorId !== userId) {
      const notificationRef = doc(db, 'notifications', `${postData.authorId}_${Date.now()}`);
      await setDoc(notificationRef, {
        recipientId: postData.authorId,
        type: 'share',
        postId,
        postTitle: postData.title || postData.content?.substring(0, 50),
        actorId: userId,
        actorName: session.user.name,
        actorImage: session.user.image,
        message: `${session.user.name} shared your post`,
        platform,
        read: false,
        createdAt: serverTimestamp()
      });
    }

    // Generate share URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hive.buffalo.edu';
    const shareUrl = `${baseUrl}/posts/${postId}`;

    // Platform-specific share URLs
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(message || postData.title || '')}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      copyLink: shareUrl
    };

    logger.info('Post shared', { 
      postId, 
      userId,
      platform,
      hasMessage: !!message
    });

    return NextResponse.json({
      success: true,
      message: 'Post shared successfully',
      shareUrl,
      shareUrls,
      shareCount: (postData.shareCount || 0) + 1
    });

  } catch (error) {
    logger.error('Failed to share post', { error });
    return NextResponse.json(
      { error: 'Failed to share post' },
      { status: 500 }
    );
  }
}

// GET /api/posts/[postId]/share - Get share statistics
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { postId } = await params;

    // Check if post exists
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const postData = postDoc.data();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hive.buffalo.edu';
    const shareUrl = `${baseUrl}/posts/${postId}`;

    return NextResponse.json({
      shareCount: postData.shareCount || 0,
      shareUrl,
      title: postData.title || postData.content?.substring(0, 100),
      description: postData.description || postData.content?.substring(0, 200),
      image: postData.image || null
    });

  } catch (error) {
    logger.error('Failed to get share stats', { error });
    return NextResponse.json(
      { error: 'Failed to get share statistics' },
      { status: 500 }
    );
  }
}