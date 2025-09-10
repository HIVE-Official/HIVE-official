import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-client-admin';
import { 
  collection,
  doc,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  getDoc
} from 'firebase/firestore';
import { logger } from '@/lib/structured-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface RouteParams {
  params: Promise<{
    postId: string;
  }>;
}

// GET /api/posts/[postId]/comments - Get comments for a post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { postId } = await params;
    const { searchParams } = new URL(request.url);
    const limitCount = parseInt(searchParams.get('limit') || '50');
    const sortBy = searchParams.get('sort') || 'newest'; // 'newest', 'oldest', 'popular'

    // Get post to ensure it exists
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Query comments
    const commentsRef = collection(db, 'posts', postId, 'comments');
    let commentsQuery;

    switch (sortBy) {
      case 'oldest':
        commentsQuery = query(
          commentsRef,
          orderBy('createdAt', 'asc'),
          limit(limitCount)
        );
        break;
      case 'popular':
        commentsQuery = query(
          commentsRef,
          orderBy('likeCount', 'desc'),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
        break;
      case 'newest':
      default:
        commentsQuery = query(
          commentsRef,
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
        break;
    }

    const snapshot = await getDocs(commentsQuery);
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt,
    }));

    // Get nested replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const repliesRef = collection(db, 'posts', postId, 'comments', comment.id, 'replies');
        const repliesQuery = query(
          repliesRef,
          orderBy('createdAt', 'asc'),
          limit(10)
        );
        const repliesSnapshot = await getDocs(repliesQuery);
        const replies = repliesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
        }));

        return {
          ...comment,
          replies,
          replyCount: replies.length
        };
      })
    );

    return NextResponse.json({
      comments: commentsWithReplies,
      total: comments.length
    });

  } catch (error) {
    logger.error('Failed to fetch comments', { error });
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST /api/posts/[postId]/comments - Add a comment to a post
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
    const body = await request.json();
    const { content, parentCommentId } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }

    // Check if post exists
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const commentData = {
      content: content.trim(),
      authorId: session.user.id,
      authorName: session.user.name,
      authorImage: session.user.image,
      likeCount: 0,
      replyCount: 0,
      isEdited: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    let commentRef;

    if (parentCommentId) {
      // This is a reply to another comment
      const parentRef = doc(db, 'posts', postId, 'comments', parentCommentId);
      const parentDoc = await getDoc(parentRef);
      
      if (!parentDoc.exists()) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        );
      }

      // Add as a nested reply
      commentRef = await addDoc(
        collection(db, 'posts', postId, 'comments', parentCommentId, 'replies'),
        commentData
      );

      // Update parent comment's reply count
      await updateDoc(parentRef, {
        replyCount: increment(1)
      });
    } else {
      // This is a top-level comment
      commentRef = await addDoc(
        collection(db, 'posts', postId, 'comments'),
        commentData
      );
    }

    // Update post's comment count
    await updateDoc(postRef, {
      commentCount: increment(1),
      lastActivityAt: serverTimestamp()
    });

    logger.info('Comment added', { 
      postId, 
      commentId: commentRef.id,
      userId: session.user.id,
      isReply: !!parentCommentId
    });

    return NextResponse.json({
      success: true,
      commentId: commentRef.id,
      message: 'Comment added successfully'
    });

  } catch (error) {
    logger.error('Failed to add comment', { error });
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[postId]/comments/[commentId] - Edit a comment
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { postId } = await params;
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');
    
    if (!commentId) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { content } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }

    // Get the comment
    const commentRef = doc(db, 'posts', postId, 'comments', commentId);
    const commentDoc = await getDoc(commentRef);
    
    if (!commentDoc.exists()) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    const commentData = commentDoc.data();
    
    // Check if user is the author
    if (commentData.authorId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only edit your own comments' },
        { status: 403 }
      );
    }

    // Update the comment
    await updateDoc(commentRef, {
      content: content.trim(),
      isEdited: true,
      updatedAt: serverTimestamp()
    });

    logger.info('Comment edited', { 
      postId, 
      commentId,
      userId: session.user.id
    });

    return NextResponse.json({
      success: true,
      message: 'Comment updated successfully'
    });

  } catch (error) {
    logger.error('Failed to edit comment', { error });
    return NextResponse.json(
      { error: 'Failed to edit comment' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[postId]/comments/[commentId] - Delete a comment
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
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');
    const parentCommentId = searchParams.get('parentId');
    
    if (!commentId) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    let commentRef;
    let commentDoc;

    if (parentCommentId) {
      // This is a reply
      commentRef = doc(db, 'posts', postId, 'comments', parentCommentId, 'replies', commentId);
      commentDoc = await getDoc(commentRef);
    } else {
      // This is a top-level comment
      commentRef = doc(db, 'posts', postId, 'comments', commentId);
      commentDoc = await getDoc(commentRef);
    }
    
    if (!commentDoc.exists()) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    const commentData = commentDoc.data();
    
    // Check if user is the author or has moderation rights
    if (commentData.authorId !== session.user.id) {
      // TODO: Add moderation rights check
      return NextResponse.json(
        { error: 'You can only delete your own comments' },
        { status: 403 }
      );
    }

    // Delete the comment
    await deleteDoc(commentRef);

    // Update counts
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      commentCount: increment(-1)
    });

    if (parentCommentId) {
      // Update parent comment's reply count
      const parentRef = doc(db, 'posts', postId, 'comments', parentCommentId);
      await updateDoc(parentRef, {
        replyCount: increment(-1)
      });
    }

    logger.info('Comment deleted', { 
      postId, 
      commentId,
      userId: session.user.id,
      isReply: !!parentCommentId
    });

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully'
    });

  } catch (error) {
    logger.error('Failed to delete comment', { error });
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}