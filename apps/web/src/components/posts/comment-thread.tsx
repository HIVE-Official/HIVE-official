'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { logger } from '@hive/core/utils/logger';

import { formatDistanceToNow } from 'date-fns';
import { 
  MessageCircle, 
  Heart, 
  MoreVertical, 
  Send, 
  ChevronDown,
  ChevronUp,
  Flag,
  Trash2,
  Edit2,
  AtSign
} from 'lucide-react';
import { Button } from '@hive/ui';
import { Avatar } from '@hive/ui';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { doc, collection, addDoc, updateDoc, deleteDoc, serverTimestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRealtimeComments } from '@/hooks/use-realtime-comments';

interface Comment {
  id: string;
  postId: string;
  parentId?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: string[];
  mentions: string[];
  replies?: Comment[];
  createdAt: any;
  updatedAt?: any;
  edited?: boolean;
  deleted?: boolean;
}

interface CommentThreadProps {
  postId: string;
  spaceId: string;
  onClose?: () => void;
}

export function CommentThread({ postId, spaceId, onClose }: CommentThreadProps) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
  const [mentioning, setMentioning] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { comments, loading, error } = useRealtimeComments(postId);

  // Build comment tree structure
  const commentTree = useMemo(() => {
    if (!comments) return [];
    
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];
    
    // First pass: create map
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });
    
    // Second pass: build tree
    comments.forEach(comment => {
      const commentNode = commentMap.get(comment.id)!;
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies = parent.replies || [];
          parent.replies.push(commentNode);
        }
      } else {
        rootComments.push(commentNode);
      }
    });
    
    // Sort by newest first
    const sortComments = (comments: Comment[]) => {
      return comments.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 0;
        const bTime = b.createdAt?.toMillis?.() || 0;
        return bTime - aTime;
      });
    };
    
    // Recursively sort all levels
    const sortTree = (comments: Comment[]): Comment[] => {
      return sortComments(comments).map(comment => ({
        ...comment,
        replies: comment.replies ? sortTree(comment.replies) : []
      }));
    };
    
    return sortTree(rootComments);
  }, [comments]);

  const handleSubmitComment = async () => {
    if (!user || !commentText.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const commentData = {
        postId,
        parentId: replyingTo || null,
        userId: user.id,
        userName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        userAvatar: user.photoURL,
        content: commentText.trim(),
        likes: [],
        mentions: extractMentions(commentText),
        createdAt: serverTimestamp(),
        edited: false,
        deleted: false
      };
      
      await addDoc(collection(db, 'spaces', spaceId, 'posts', postId, 'comments'), commentData);
      
      // Update post comment count
      const postRef = doc(db, 'spaces', spaceId, 'posts', postId);
      await updateDoc(postRef, {
        commentCount: (comments?.length || 0) + 1,
        lastActivity: serverTimestamp()
      });
      
      setCommentText('');
      setReplyingTo(null);
    } catch (error) {
      logger.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editText.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const commentRef = doc(db, 'spaces', spaceId, 'posts', postId, 'comments', commentId);
      await updateDoc(commentRef, {
        content: editText.trim(),
        mentions: extractMentions(editText),
        updatedAt: serverTimestamp(),
        edited: true
      });
      
      setEditingComment(null);
      setEditText('');
    } catch (error) {
      logger.error('Error editing comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const commentRef = doc(db, 'spaces', spaceId, 'posts', postId, 'comments', commentId);
      // Soft delete to preserve thread structure
      await updateDoc(commentRef, {
        deleted: true,
        content: '[deleted]',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      logger.error('Error deleting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string, currentLikes: string[]) => {
    if (!user) return;
    
    try {
      const commentRef = doc(db, 'spaces', spaceId, 'posts', postId, 'comments', commentId);
      const isLiked = currentLikes.includes(user.id);
      
      await updateDoc(commentRef, {
        likes: isLiked ? arrayRemove(user.id) : arrayUnion(user.id)
      });
    } catch (error) {
      logger.error('Error liking comment:', error);
    }
  };

  const extractMentions = (text: string): string[] => {
    const mentionRegex = /@(\w+)/g;
    const mentions = [];
    let match;
    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1]);
    }
    return mentions;
  };

  const toggleThread = (commentId: string) => {
    setExpandedThreads(prev => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  const renderComment = (comment: Comment, depth: number = 0) => {
    const isExpanded = expandedThreads.has(comment.id);
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isAuthor = user?.id === comment.userId;
    const isEditing = editingComment === comment.id;
    const isLiked = user && comment.likes.includes(user.id);
    
    return (
      <div key={comment.id} className={cn("relative", depth > 0 && "ml-8 mt-2")}>
        {/* Thread line */}
        {depth > 0 && (
          <div className="absolute left-[-20px] top-0 bottom-0 w-[2px] bg-[var(--hive-border)]" />
        )}
        
        <div className={cn(
          "group relative rounded-lg transition-colors",
          !comment.deleted && "hover:bg-[var(--hive-background-secondary)]"
        )}>
          <div className="flex gap-3 p-3">
            <Avatar
              src={comment.userAvatar}
              alt={comment.userName}
              size="sm"
              fallback={comment.userName[0]?.toUpperCase()}
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{comment.userName}</span>
                <span className="text-xs text-[var(--hive-text-tertiary)]">
                  {comment.createdAt && formatDistanceToNow(comment.createdAt?.toDate ? comment.createdAt.toDate() : new Date(comment.createdAt), { addSuffix: true })}
                </span>
                {comment.edited && !comment.deleted && (
                  <span className="text-xs text-[var(--hive-text-tertiary)]">(edited)</span>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={editText}
                    onChange={(e: any) => setEditText(e.target.value)}
                    className="w-full p-2 bg-[var(--hive-background-primary)] border border-[var(--hive-border)] rounded-lg resize-none"
                    rows={3}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEditComment(comment.id)}
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingComment(null);
                        setEditText('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className={cn(
                  "text-sm whitespace-pre-wrap break-words",
                  comment.deleted && "italic text-[var(--hive-text-tertiary)]"
                )}>
                  {comment.content}
                </p>
              )}
              
              {!comment.deleted && !isEditing && (
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => handleLikeComment(comment.id, comment.likes)}
                    className={cn(
                      "flex items-center gap-1 text-xs transition-colors",
                      isLiked ? "text-red-500" : "text-[var(--hive-text-tertiary)] hover:text-red-500"
                    )}
                  >
                    <Heart className={cn("h-3 w-3", isLiked && "fill-current")} />
                    {comment.likes.length > 0 && comment.likes.length}
                  </button>
                  
                  <button
                    onClick={() => {
                      setReplyingTo(comment.id);
                      setCommentText(`@${comment.userName} `);
                    }}
                    className="flex items-center gap-1 text-xs text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] transition-colors"
                  >
                    <MessageCircle className="h-3 w-3" />
                    Reply
                  </button>
                  
                  {hasReplies && (
                    <button
                      onClick={() => toggleThread(comment.id)}
                      className="flex items-center gap-1 text-xs text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      {comment.replies!.length} {comment.replies!.length === 1 ? 'reply' : 'replies'}
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {!comment.deleted && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
                
                {isAuthor && (
                  <div className="absolute right-0 top-8 bg-[var(--hive-background-primary)] border border-[var(--hive-border)] rounded-lg shadow-lg p-1 hidden group-hover:block z-10">
                    <button
                      onClick={() => {
                        setEditingComment(comment.id);
                        setEditText(comment.content);
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--hive-background-secondary)] rounded w-full"
                    >
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--hive-background-secondary)] rounded w-full text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Render nested replies */}
          {hasReplies && isExpanded && (
            <div className="ml-8">
              {comment.replies!.map(reply => renderComment(reply, depth + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--hive-border)]">
        <h3 className="font-semibold">Comments ({comments?.length || 0})</h3>
        {onClose && (
          <Button size="sm" variant="ghost" onClick={onClose}>
            ✕
          </Button>
        )}
      </div>
      
      {/* Comments list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {commentTree.length === 0 ? (
          <div className="text-center py-8 text-[var(--hive-text-tertiary)]">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No comments yet</p>
            <p className="text-sm mt-1">Be the first to comment!</p>
          </div>
        ) : (
          commentTree.map(comment => renderComment(comment))
        )}
      </div>
      
      {/* Comment input */}
      {user && (
        <div className="border-t border-[var(--hive-border)] p-4">
          {replyingTo && (
            <div className="flex items-center justify-between mb-2 p-2 bg-[var(--hive-background-secondary)] rounded">
              <span className="text-sm text-[var(--hive-text-secondary)]">
                Replying to comment...
              </span>
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setCommentText('');
                }}
                className="text-xs text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
              >
                Cancel
              </button>
            </div>
          )}
          
          <div className="flex gap-2">
            <Avatar
              src={user.photoURL}
              alt={user.displayName || 'You'}
              size="sm"
              fallback={(user.displayName || user.email)?.[0]?.toUpperCase()}
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e: any) => setCommentText(e.target.value)}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!commentText.trim() || isSubmitting}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}