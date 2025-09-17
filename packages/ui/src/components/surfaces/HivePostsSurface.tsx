"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { Card as HiveCard, CardHeader as HiveCardHeader, CardTitle as HiveCardTitle, CardContent as HiveCardContent } from '../../atomic/ui/card';
import { Button as HiveButton } from '../../atomic/atoms/button-enhanced';
import { HiveTextarea } from '../hive-textarea';
import { Avatar as HiveAvatar } from '../../atomic/atoms/avatar';
import { HiveBadge } from '../hive-badge';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  MoreVertical, 
  Send,
  Image,
  Link,
  Hash,
  Smile,
  Plus
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useRealtimePosts, useOptimisticUpdates } from '../../hooks/use-live-updates';
import { type Post as CorePost } from '@hive/core';

// Extended Post interface for UI compatibility while we transition
interface Post extends Partial<CorePost> {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: 'member' | 'moderator' | 'admin' | 'leader';
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  hasLiked?: boolean;
  attachments?: {
    type: 'image' | 'link';
    url: string;
    title?: string;
  }[];
  tags?: string[];
}

export interface HivePostsSurfaceProps {
  spaceId: string;
  spaceName?: string;
  isLeader?: boolean;
  currentUserId?: string;
  className?: string;
  variant?: 'widget' | 'full' | 'compact';
  onPostCreate?: (content: string) => Promise<void>;
  onPostLike?: (postId: string) => Promise<void>;
  onPostComment?: (postId: string, comment: string) => Promise<void>;
  posts?: Post[];
  loading?: boolean;
  error?: Error | null;
}

// Individual Post Component
const PostCard: React.FC<{
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  variant?: 'widget' | 'full' | 'compact';
}> = ({ post, onLike, onComment, onShare, variant = 'widget' }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

  const roleColors = {
    leader: 'bg-purple-100 text-purple-800 border-purple-300',
    admin: 'bg-red-100 text-red-800 border-red-300',
    moderator: 'bg-blue-100 text-blue-800 border-blue-300',
    member: 'bg-gray-100 text-gray-700 border-gray-300'
  };

  return (
    <div className={cn(
      "bg-[var(--hive-white)] rounded-lg border border-gray-200 p-4 space-y-3",
      variant === 'compact' && "p-3"
    )}>
      {/* Author Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <HiveAvatar
            src={post.authorAvatar}
            alt={post.authorName}
            initials={post.authorName.slice(0, 2).toUpperCase()}
            size="sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{post.authorName}</span>
              {post.authorRole && post.authorRole !== 'member' && (
                <HiveBadge 
                  variant="secondary" 
                  className={cn("text-xs", roleColors[post.authorRole])}
                >
                  {post.authorRole}
                </HiveBadge>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(post.timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Post Content */}
      <div className="text-gray-800 whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span key={tag} className="text-sm text-blue-600 hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Attachments */}
      {post.attachments && post.attachments.length > 0 && (
        <div className="space-y-2">
          {post.attachments.map((attachment, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden border border-gray-200">
              {attachment.type === 'image' ? (
                <img 
                  src={attachment.url} 
                  alt={attachment.title || 'Attachment'} 
                  className="w-full h-auto max-h-96 object-cover"
                />
              ) : (
                <a 
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 hover:bg-gray-50"
                >
                  <Link className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-blue-600 hover:underline">
                    {attachment.title || attachment.url}
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Engagement Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{post.likes} likes</span>
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onLike}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors",
            post.hasLiked 
              ? "text-red-600 bg-red-50 hover:bg-red-100" 
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <Heart className={cn("h-4 w-4", post.hasLiked && "fill-current")} />
          <span className="text-sm">Like</span>
        </button>
        
        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">Comment</span>
        </button>
        
        <button
          onClick={onShare}
          className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Share2 className="h-4 w-4" />
          <span className="text-sm">Share</span>
        </button>
      </div>

      {/* Comment Input */}
      {showCommentInput && (
        <div className="flex gap-2 pt-2">
          <HiveAvatar
            src={undefined}
            alt="You"
            initials="ME"
            size="xs"
          />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)] focus:border-transparent"
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' && comment.trim()) {
                  onComment?.();
                  setComment('');
                  setShowCommentInput(false);
                }
              }}
            />
            <button
              onClick={() => {
                if (comment.trim()) {
                  onComment?.();
                  setComment('');
                  setShowCommentInput(false);
                }
              }}
              className="p-1.5 text-[var(--hive-gold-dark)] hover:bg-orange-50 rounded-lg transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Create Post Component
const CreatePost: React.FC<{
  onSubmit: (content: string) => void;
  variant?: 'widget' | 'full' | 'compact';
}> = ({ onSubmit, variant = 'widget' }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
      setIsExpanded(false);
    }
  };

  if (!isExpanded && variant !== 'full') {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full bg-[var(--hive-white)] rounded-lg border border-gray-200 p-4 text-left hover:border-gray-300 transition-colors"
      >
        <div className="flex items-center gap-3">
          <HiveAvatar
            src={undefined}
            alt="You"
            initials="ME"
            size="sm"
          />
          <span className="text-gray-500">Share something with the space...</span>
        </div>
      </button>
    );
  }

  return (
    <HiveCard className="p-4">
      <div className="space-y-3">
        <HiveTextarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          placeholder="Share something with the space..."
          className="min-h-[100px] resize-none"
          autoFocus={isExpanded}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Image className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Link className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Hash className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Smile className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {variant !== 'full' && (
              <HiveButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsExpanded(false);
                  setContent('');
                }}
              >
                Cancel
              </HiveButton>
            )}
            <HiveButton
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              disabled={!content.trim()}
            >
              Post
            </HiveButton>
          </div>
        </div>
      </div>
    </HiveCard>
  );
};

// Main Surface Component
export const HivePostsSurface: React.FC<HivePostsSurfaceProps> = ({
  spaceId,
  spaceName,
  isLeader = false,
  currentUserId,
  className,
  variant = 'widget',
  onPostCreate,
  onPostLike,
  onPostComment,
  posts: propPosts,
  loading = false,
  error = null,
}) => {
  // Real-time posts data
  const { data: realtimePosts, loading: realtimeLoading, error: realtimeError } = useRealtimePosts(spaceId);
  const { data: optimisticPosts, addOptimisticItem, removeOptimisticItem } = useOptimisticUpdates<Post>((propPosts || realtimePosts || []) as Post[]);
  
  // Mock data for development (fallback)
  const mockPosts: Post[] = useMemo(() => [
    {
      id: '1',
      content: 'Welcome to our space! Excited to collaborate with everyone here. Looking forward to building amazing things together! 🚀',
      authorId: '1',
      authorName: 'Sarah Chen',
      authorRole: 'leader',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likes: 12,
      comments: 5,
      shares: 2,
      hasLiked: true,
      tags: ['welcome', 'collaboration']
    },
    {
      id: '2',
      content: 'Just scheduled our weekly sync for Thursday at 3pm. Check the events tab for details and RSVP!',
      authorId: '2',
      authorName: 'Marcus Johnson',
      authorRole: 'moderator',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 8,
      comments: 3,
      shares: 1,
      hasLiked: false,
      attachments: [{
        type: 'link',
        url: '#',
        title: 'Weekly Sync Meeting - Thursday 3pm'
      }]
    },
    {
      id: '3',
      content: 'Great discussion in today\'s meeting! Here are the key takeaways:\n\n1. Focus on user research this week\n2. Design review scheduled for Friday\n3. Beta launch targeted for end of month\n\nLet me know if I missed anything!',
      authorId: '3',
      authorName: 'Emily Rodriguez',
      authorRole: 'member',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      likes: 15,
      comments: 7,
      shares: 3,
      hasLiked: false,
      tags: ['meeting-notes', 'updates']
    }
  ], []);

  // Use optimistic posts for immediate UI updates, fallback to empty array
  const posts = optimisticPosts || [];
  const isLoading = loading || realtimeLoading;
  const displayError = error || realtimeError;

  const handlePostCreate = useCallback(async (content: string) => {
    if (!currentUserId) return;
    
    // Create optimistic post
    const optimisticPost: Post = {
      id: `temp-${Date.now()}`,
      content,
      authorId: currentUserId,
      authorName: 'You', // Will be updated when real data comes back
      authorRole: isLeader ? 'leader' : 'member',
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      hasLiked: false,
      tags: []
    };

    // Add optimistically
    addOptimisticItem(optimisticPost, async () => {
      if (onPostCreate) {
        await onPostCreate(content);
      } else {
      }
    });
  }, [onPostCreate, currentUserId, isLeader, addOptimisticItem]);

  const handlePostLike = useCallback(async (postId: string) => {
    if (onPostLike) {
      await onPostLike(postId);
    } else {
    }
  }, [onPostLike]);

  const handlePostComment = useCallback(async (postId: string, comment: string) => {
    if (onPostComment) {
      await onPostComment(postId, comment);
    } else {
    }
  }, [onPostComment]);

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i: number) => (
              <div key={i} className="bg-gray-100 rounded-lg h-40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (displayError) {
    return (
      <HiveCard className={cn("p-6", className)}>
        <div className="text-center space-y-2">
          <p className="text-gray-600">Unable to load posts</p>
          <p className="text-sm text-gray-500">{displayError.message}</p>
        </div>
      </HiveCard>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header for full variant */}
      {variant === 'full' && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {spaceName ? `${spaceName} Posts` : 'Posts'}
          </h2>
          <HiveButton variant="ghost" size="sm">
            Filter
          </HiveButton>
        </div>
      )}

      {/* Create Post */}
      {(isLeader || variant === 'full') && (
        <CreatePost onSubmit={handlePostCreate} variant={variant} />
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <HiveCard className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">
                  {isLeader ? "Be the first to share something with your space!" : "Check back later for updates"}
                </p>
              </div>
              {isLeader && (
                <HiveButton
                  variant="primary"
                  size="sm"
                  onClick={() => handlePostCreate('')}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create First Post
                </HiveButton>
              )}
            </div>
          </HiveCard>
        ) : (
          posts.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              variant={variant}
              onLike={() => handlePostLike(post.id)}
              onComment={() => handlePostComment(post.id, '')}
              onShare={() => {}}
            />
          ))
        )}
      </div>

      {/* Load More for widget variant */}
      {variant === 'widget' && posts.length > 3 && (
        <button className="w-full py-2 text-sm text-[var(--hive-gold-dark)] hover:text-orange-700 font-medium">
          View all posts →
        </button>
      )}
    </div>
  );
};

// Export display name for debugging
HivePostsSurface.displayName = 'HivePostsSurface';