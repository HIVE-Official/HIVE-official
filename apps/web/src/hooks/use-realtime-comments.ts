/**
 * Real-time Comments System
 * Live comment updates using Firebase
 */

import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '@hive/firebase';
import { useAuth } from '@hive/auth-logic';
import { logger } from '@/lib/logger';
import { sendNotification } from './use-notifications';

export interface Comment {
  id: string;
  postId: string;
  parentId?: string; // For nested comments
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  hasLiked?: boolean;
  replies?: Comment[];
  isDeleted?: boolean;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

/**
 * Hook for real-time comments on a post
 */
export function useRealtimeComments(postId: string | null) {
  const { user } = useAuth();
  const [state, setState] = useState<CommentState>({
    comments: [],
    loading: true,
    error: null,
    totalCount: 0
  });

  useEffect(() => {
    if (!postId) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(
      commentsRef,
      where('isDeleted', '!=', true),
      orderBy('isDeleted'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const comments: Comment[] = [];
        const commentMap = new Map<string, Comment>();

        // First pass: Create all comments
        snapshot.forEach((doc) => {
          const data = doc.data();
          const comment: Comment = {
            id: doc.id,
            postId,
            parentId: data.parentId,
            content: data.content,
            authorId: data.authorId,
            authorName: data.authorName,
            authorAvatar: data.authorAvatar,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.(),
            likes: data.likes || 0,
            hasLiked: user?.uid ? data.likedBy?.includes(user.uid) : false,
            replies: [],
            isDeleted: data.isDeleted
          };

          commentMap.set(comment.id, comment);

          // Only add top-level comments to main array
          if (!comment.parentId) {
            comments.push(comment);
          }
        });

        // Second pass: Build reply hierarchy
        commentMap.forEach(comment => {
          if (comment.parentId && commentMap.has(comment.parentId)) {
            const parent = commentMap.get(comment.parentId)!;
            parent.replies = parent.replies || [];
            parent.replies.push(comment);
          }
        });

        // Sort replies by date
        comments.forEach(comment => {
          if (comment.replies && comment.replies.length > 0) {
            comment.replies.sort((a, b) =>
              a.createdAt.getTime() - b.createdAt.getTime()
            );
          }
        });

        setState({
          comments,
          loading: false,
          error: null,
          totalCount: commentMap.size
        });

        // Log changes for development
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added' && !snapshot.metadata.hasPendingWrites) {
            logger.info('New comment added', { postId, commentId: change.doc.id });
          }
        });
      },
      (error) => {
        logger.error('Comments subscription error', { error, postId });
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    );

    return () => unsubscribe();
  }, [postId, user?.uid]);

  // Add a comment
  const addComment = useCallback(async (
    content: string,
    parentId?: string
  ): Promise<boolean> => {
    if (!user?.uid || !postId) return false;

    try {
      const commentsRef = collection(db, 'posts', postId, 'comments');
      const commentData = {
        postId,
        parentId: parentId || null,
        content,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        authorAvatar: user.photoURL || undefined,
        createdAt: serverTimestamp(),
        likes: 0,
        likedBy: [],
        isDeleted: false
      };

      const docRef = await addDoc(commentsRef, commentData);

      // Update post comment count
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        commentCount: increment(1),
        lastActivity: serverTimestamp()
      });

      // Send notification to post author
      // (Would need to fetch post author ID from post document)
      logger.info('Comment added', { postId, commentId: docRef.id });

      return true;
    } catch (error) {
      logger.error('Failed to add comment', { error, postId });
      return false;
    }
  }, [user, postId]);

  // Like a comment
  const likeComment = useCallback(async (commentId: string): Promise<boolean> => {
    if (!user?.uid || !postId) return false;

    try {
      const commentRef = doc(db, 'posts', postId, 'comments', commentId);
      const comment = state.comments.find(c => c.id === commentId);

      if (!comment) return false;

      const hasLiked = comment.hasLiked;

      await updateDoc(commentRef, {
        likes: increment(hasLiked ? -1 : 1),
        likedBy: hasLiked
          ? (comment as any).likedBy?.filter((id: string) => id !== user.uid)
          : [...((comment as any).likedBy || []), user.uid]
      });

      logger.info('Comment like toggled', { commentId, liked: !hasLiked });
      return true;
    } catch (error) {
      logger.error('Failed to like comment', { error, commentId });
      return false;
    }
  }, [user?.uid, postId, state.comments]);

  // Delete a comment (soft delete)
  const deleteComment = useCallback(async (commentId: string): Promise<boolean> => {
    if (!user?.uid || !postId) return false;

    try {
      const commentRef = doc(db, 'posts', postId, 'comments', commentId);
      const comment = state.comments.find(c => c.id === commentId);

      // Only author can delete
      if (comment?.authorId !== user.uid) {
        logger.warn('Unauthorized delete attempt', { commentId, userId: user.uid });
        return false;
      }

      await updateDoc(commentRef, {
        isDeleted: true,
        content: '[Deleted]',
        deletedAt: serverTimestamp()
      });

      // Update post comment count
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        commentCount: increment(-1)
      });

      logger.info('Comment deleted', { commentId });
      return true;
    } catch (error) {
      logger.error('Failed to delete comment', { error, commentId });
      return false;
    }
  }, [user?.uid, postId, state.comments]);

  // Edit a comment
  const editComment = useCallback(async (
    commentId: string,
    newContent: string
  ): Promise<boolean> => {
    if (!user?.uid || !postId) return false;

    try {
      const commentRef = doc(db, 'posts', postId, 'comments', commentId);
      const comment = state.comments.find(c => c.id === commentId);

      // Only author can edit
      if (comment?.authorId !== user.uid) {
        logger.warn('Unauthorized edit attempt', { commentId, userId: user.uid });
        return false;
      }

      await updateDoc(commentRef, {
        content: newContent,
        updatedAt: serverTimestamp(),
        isEdited: true
      });

      logger.info('Comment edited', { commentId });
      return true;
    } catch (error) {
      logger.error('Failed to edit comment', { error, commentId });
      return false;
    }
  }, [user?.uid, postId, state.comments]);

  return {
    comments: state.comments,
    loading: state.loading,
    error: state.error,
    totalCount: state.totalCount,
    addComment,
    likeComment,
    deleteComment,
    editComment,
    hasComments: state.totalCount > 0
  };
}