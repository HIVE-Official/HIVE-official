/**
 * HIVE Comment System
 * Threaded comments with real-time updates and social interactions
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '../../ui/button';
import { Avatar, HiveBadge as Badge } from '../index'; // Use atomic components
import { 
  MessageCircle, 
  Heart, 
  Reply, 
  MoreHorizontal,
  Flag,
  Edit3,
  Trash2,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    role?: string;
    isVerified?: boolean;
  };
  timestamp: string;
  engagement: {
    likes: number;
    replies: number;
  };
  isLiked?: boolean;
  isEdited?: boolean;
  parentId?: string;
  replies?: Comment[];
  canEdit?: boolean;
  canDelete?: boolean;
}

interface CommentSystemProps {
  postId: string;
  comments: Comment[];
  currentUserId?: string;
  onAddComment?: (content: string, parentId?: string) => Promise<void>;
  onLikeComment?: (commentId: string) => Promise<void>;
  onEditComment?: (commentId: string, content: string) => Promise<void>;
  onDeleteComment?: (commentId: string) => Promise<void>;
  onReportComment?: (commentId: string, reason: string) => Promise<void>;
  isLoading?: boolean;
  maxDepth?: number;
  showCount?: boolean;
  enableFeatureFlag?: boolean;
}

interface CommentItemProps {
  comment: Comment;
  depth: number;
  maxDepth: number;
  currentUserId?: string;
  onLike?: (commentId: string) => Promise<void>;
  onReply?: (content: string, parentId: string) => Promise<void>;
  onEdit?: (commentId: string, content: string) => Promise<void>;
  onDelete?: (commentId: string) => Promise<void>;
  onReport?: (commentId: string, reason: string) => Promise<void>;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  depth,
  maxDepth,
  currentUserId,
  onLike,
  onReply,
  onEdit,
  onDelete,
  onReport
}) => {
  const [showReplies, setShowReplies] = useState(depth < 2);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [editContent, setEditContent] = useState(comment.content);
  const [showMenu, setShowMenu] = useState(false);

  const isOwnComment = currentUserId === comment.author.id;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const canReply = depth < maxDepth;

  const handleLike = useCallback(async () => {
    await onLike?.(comment.id);
  }, [comment.id, onLike]);

  const handleReply = useCallback(async () => {
    if (!replyContent.trim()) return;
    await onReply?.(replyContent, comment.id);
    setReplyContent('');
    setIsReplying(false);
    setShowReplies(true);
  }, [replyContent, comment.id, onReply]);

  const handleEdit = useCallback(async () => {
    if (!editContent.trim() || editContent === comment.content) {
      setIsEditing(false);
      return;
    }
    await onEdit?.(comment.id, editContent);
    setIsEditing(false);
  }, [editContent, comment.id, comment.content, onEdit]);

  const formatTimeAgo = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${depth > 0 ? 'ml-8 pl-4 border-l border-[var(--hive-border-subtle)]' : ''}`}
    >
      <div className="flex gap-3 group">
        {/* Avatar */}
        <Avatar 
          src={comment.author.avatar}
          initials={comment.author.name.charAt(0)}
          size="sm"
          className="flex-shrink-0"
        />

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Author Info */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-[var(--hive-text-primary)] text-sm hover:text-[var(--hive-primary)] cursor-pointer">
              {comment.author.name}
            </span>
            <span className="text-[var(--hive-text-muted)] text-xs">
              @{comment.author.handle}
            </span>
            {comment.author.role && (
              <Badge size="xs" variant="secondary">
                {comment.author.role}
              </Badge>
            )}
            <span className="text-[var(--hive-text-muted)] text-xs">
              {formatTimeAgo(comment.timestamp)}
            </span>
            {comment.isEdited && (
              <span className="text-[var(--hive-text-muted)] text-xs">(edited)</span>
            )}
          </div>

          {/* Comment Text */}
          {isEditing ? (
            <div className="mb-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 text-sm bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg resize-none focus:outline-none focus:border-[var(--hive-primary)]"
                rows={3}
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <Button size="xs" onClick={handleEdit}>
                  Save
                </Button>
                <Button size="xs" variant="ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-[var(--hive-text-primary)] text-sm mb-3 leading-relaxed">
              {comment.content}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 mb-3">
            <Button
              variant="ghost"
              size="xs"
              onClick={handleLike}
              className={`gap-1 ${comment.isLiked ? 'text-[var(--hive-accent)]' : 'text-[var(--hive-text-muted)]'} hover:text-[var(--hive-accent)]`}
            >
              <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}`} />
              {comment.engagement.likes > 0 && (
                <span className="text-xs">{comment.engagement.likes}</span>
              )}
            </Button>

            {canReply && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setIsReplying(!isReplying)}
                className="gap-1 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]"
              >
                <Reply className="w-3 h-3" />
                <span className="text-xs">Reply</span>
              </Button>
            )}

            {hasReplies && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setShowReplies(!showReplies)}
                className="gap-1 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]"
              >
                {showReplies ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
                <span className="text-xs">
                  {comment.replies?.length} {comment.replies?.length === 1 ? 'reply' : 'replies'}
                </span>
              </Button>
            )}

            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setShowMenu(!showMenu)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]"
              >
                <MoreHorizontal className="w-3 h-3" />
              </Button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-10 min-w-[120px]"
                  >
                    {isOwnComment && comment.canEdit && (
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </button>
                    )}
                    {isOwnComment && comment.canDelete && (
                      <button
                        onClick={() => {
                          onDelete?.(comment.id);
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-[var(--hive-status-error)]"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    )}
                    {!isOwnComment && (
                      <button
                        onClick={() => {
                          onReport?.(comment.id, 'inappropriate');
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-[var(--hive-status-warning)]"
                      >
                        <Flag className="w-3 h-3" />
                        Report
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Reply Input */}
          <AnimatePresence>
            {isReplying && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="flex gap-2">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 p-2 text-sm bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg resize-none focus:outline-none focus:border-[var(--hive-primary)]"
                    rows={2}
                    autoFocus
                  />
                  <div className="flex flex-col gap-1">
                    <Button size="xs" onClick={handleReply} disabled={!replyContent.trim()}>
                      <Send className="w-3 h-3" />
                    </Button>
                    <Button size="xs" variant="ghost" onClick={() => setIsReplying(false)}>
                      <span className="text-xs">Cancel</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nested Replies */}
          <AnimatePresence>
            {showReplies && hasReplies && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {comment.replies?.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    depth={depth + 1}
                    maxDepth={maxDepth}
                    currentUserId={currentUserId}
                    onLike={onLike}
                    onReply={onReply}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReport={onReport}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export const CommentSystem: React.FC<CommentSystemProps> = ({
  postId,
  comments,
  currentUserId,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
  onReportComment,
  isLoading = false,
  maxDepth = 3,
  showCount = true,
  enableFeatureFlag = true
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feature flag check
  if (!enableFeatureFlag) return null;

  const totalComments = useMemo(() => {
    const countComments = (commentList: Comment[]): number => {
      return commentList.reduce((count, comment) => {
        return count + 1 + (comment.replies ? countComments(comment.replies) : 0);
      }, 0);
    };
    return countComments(comments);
  }, [comments]);

  const handleSubmit = useCallback(async () => {
    if (!newComment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onAddComment?.(newComment);
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  }, [newComment, isSubmitting, onAddComment]);

  return (
    <div className="space-y-4">
      {/* Header */}
      {showCount && (
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[var(--hive-text-muted)]" />
          <span className="text-sm font-medium text-[var(--hive-text-primary)]">
            {totalComments} {totalComments === 1 ? 'Comment' : 'Comments'}
          </span>
        </div>
      )}

      {/* New Comment Input */}
      <div className="flex gap-3">
        <Avatar 
          initials="U"
          size="sm"
          className="flex-shrink-0"
        />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg resize-none focus:outline-none focus:border-[var(--hive-primary)] text-sm"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <Button 
              onClick={handleSubmit}
              disabled={!newComment.trim() || isSubmitting}
              size="sm"
            >
              {isSubmitting ? 'Posting...' : 'Comment'}
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-[var(--hive-primary)] border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-[var(--hive-text-muted)] mt-2">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" />
            <p className="text-sm text-[var(--hive-text-muted)]">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              maxDepth={maxDepth}
              currentUserId={currentUserId}
              onLike={onLikeComment}
              onReply={onAddComment}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
              onReport={onReportComment}
            />
          ))
        )}
      </div>
    </div>
  );
};