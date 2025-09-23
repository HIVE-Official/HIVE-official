/**
 * Feed Actions - Real implementations for post interactions
 * Replaces stub functions with working Firebase operations
 */

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  increment,
  getDoc,
  query,
  orderBy,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase';

interface PostData {
  content: string;
  type: string;
  visibility: string;
  attachments: any[];
  mentions: string[];
  tags: string[];
  poll?: any;
  event?: any;
  location?: any;
}

/**
 * Create a new post in the feed
 */
export async function createPost(userId: string, spaceId: string | null, postData: PostData) {
  if (!userId) throw new Error('User must be authenticated to create posts');

  try {
    // Determine the collection based on whether it's a space post or general feed
    const postsRef = spaceId
      ? collection(db, 'spaces', spaceId, 'posts')
      : collection(db, 'posts');

    const newPost = {
      ...postData,
      authorId: userId,
      spaceId: spaceId || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      likes: [],
      campusId: 'ub-buffalo', // Campus isolation for vBETA
      isActive: true,
      isPinned: false,
    };

    const docRef = await addDoc(postsRef, newPost);

    // Update user's post count
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'stats.postCount': increment(1),
      'lastActivityAt': serverTimestamp()
    });

    // If it's a space post, update space activity
    if (spaceId) {
      const spaceRef = doc(db, 'spaces', spaceId);
      await updateDoc(spaceRef, {
        'stats.postCount': increment(1),
        'lastActivityAt': serverTimestamp()
      });
    }

    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post. Please try again.');
  }
}

/**
 * Like or unlike a post
 */
export async function toggleLikePost(userId: string, postId: string, spaceId?: string) {
  if (!userId) throw new Error('User must be authenticated to like posts');

  try {
    const postRef = spaceId
      ? doc(db, 'spaces', spaceId, 'posts', postId)
      : doc(db, 'posts', postId);

    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      throw new Error('Post not found');
    }

    const postData = postSnap.data();
    const likes = postData.likes || [];
    const isLiked = likes.includes(userId);

    // Toggle like status
    await updateDoc(postRef, {
      likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
      likeCount: increment(isLiked ? -1 : 1),
      updatedAt: serverTimestamp()
    });

    // Create notification for post author (if liking, not unliking)
    if (!isLiked && postData.authorId !== userId) {
      await addDoc(collection(db, 'notifications'), {
        type: 'like',
        recipientId: postData.authorId,
        senderId: userId,
        postId: postId,
        spaceId: spaceId || null,
        message: 'liked your post',
        read: false,
        createdAt: serverTimestamp(),
        campusId: 'ub-buffalo'
      });
    }

    return !isLiked; // Return new like status
  } catch (error) {
    console.error('Error toggling like:', error);
    throw new Error('Failed to update like status. Please try again.');
  }
}

/**
 * Add a comment to a post
 */
export async function addComment(userId: string, postId: string, content: string, spaceId?: string) {
  if (!userId) throw new Error('User must be authenticated to comment');
  if (!content.trim()) throw new Error('Comment cannot be empty');

  try {
    // Get post reference
    const postRef = spaceId
      ? doc(db, 'spaces', spaceId, 'posts', postId)
      : doc(db, 'posts', postId);

    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      throw new Error('Post not found');
    }

    // Create comment in subcollection
    const commentsRef = collection(postRef, 'comments');
    const newComment = {
      content: content.trim(),
      authorId: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likeCount: 0,
      likes: [],
      campusId: 'ub-buffalo'
    };

    const commentDoc = await addDoc(commentsRef, newComment);

    // Update post comment count
    await updateDoc(postRef, {
      commentCount: increment(1),
      lastActivityAt: serverTimestamp()
    });

    // Create notification for post author
    const postData = postSnap.data();
    if (postData.authorId !== userId) {
      await addDoc(collection(db, 'notifications'), {
        type: 'comment',
        recipientId: postData.authorId,
        senderId: userId,
        postId: postId,
        commentId: commentDoc.id,
        spaceId: spaceId || null,
        message: 'commented on your post',
        preview: content.substring(0, 100),
        read: false,
        createdAt: serverTimestamp(),
        campusId: 'ub-buffalo'
      });
    }

    return { id: commentDoc.id, ...newComment };
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment. Please try again.');
  }
}

/**
 * Share a post (repost functionality)
 */
export async function sharePost(userId: string, postId: string, spaceId?: string, message?: string) {
  if (!userId) throw new Error('User must be authenticated to share posts');

  try {
    // Get original post
    const postRef = spaceId
      ? doc(db, 'spaces', spaceId, 'posts', postId)
      : doc(db, 'posts', postId);

    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      throw new Error('Post not found');
    }

    const originalPost = postSnap.data();

    // Create share/repost
    const shareData = {
      type: 'share',
      originalPostId: postId,
      originalAuthorId: originalPost.authorId,
      authorId: userId,
      content: message || '',
      sharedContent: {
        content: originalPost.content,
        attachments: originalPost.attachments || [],
        type: originalPost.type
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      likes: [],
      campusId: 'ub-buffalo',
      isActive: true
    };

    const shareRef = await addDoc(collection(db, 'posts'), shareData);

    // Update original post share count
    await updateDoc(postRef, {
      shareCount: increment(1)
    });

    // Notify original author
    if (originalPost.authorId !== userId) {
      await addDoc(collection(db, 'notifications'), {
        type: 'share',
        recipientId: originalPost.authorId,
        senderId: userId,
        postId: postId,
        shareId: shareRef.id,
        message: 'shared your post',
        preview: message?.substring(0, 100) || null,
        read: false,
        createdAt: serverTimestamp(),
        campusId: 'ub-buffalo'
      });
    }

    return { id: shareRef.id, ...shareData };
  } catch (error) {
    console.error('Error sharing post:', error);
    throw new Error('Failed to share post. Please try again.');
  }
}

/**
 * Get comments for a post
 */
export async function getPostComments(postId: string, spaceId?: string, limit = 20) {
  try {
    const postRef = spaceId
      ? doc(db, 'spaces', spaceId, 'posts', postId)
      : doc(db, 'posts', postId);

    const commentsQuery = query(
      collection(postRef, 'comments'),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(commentsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Failed to load comments');
  }
}