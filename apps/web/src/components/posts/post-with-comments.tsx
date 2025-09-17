'use client';

import React, { useState } from 'react';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Pin,
  Crown,
  Image as ImageIcon,
  X,
  Lock
} from 'lucide-react';
import { Button, Badge, Avatar } from '@hive/ui';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { CommentThread } from './comment-thread';
import { useSpacePosts } from '@/hooks/use-space-posts';

interface PostWithCommentsProps {
  post: any;
  spaceId: string;
  currentUserId?: string;
  onReaction?: (postId: string, emoji: string) => void;
  onShare?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  canModerate?: boolean;
}

export function PostWithComments({ 
  post, 
  spaceId, 
  currentUserId,
  onReaction,
  onShare,
  onDelete,
  canModerate 
}: PostWithCommentsProps) {
  const [showComments, setShowComments] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { toggleReaction } = useSpacePosts(spaceId);

  const isAuthor = currentUserId === post.author?.id;
  const isLiked = post.reactions?.find((r: any) => r.emoji === '❤️')?.userReacted;

  const handleReaction = async (emoji: string) => {
    if (onReaction) {
      onReaction(post.id, emoji);
    } else {
      await toggleReaction(post.id, emoji);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
  };

  return (
    <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border)] rounded-xl overflow-hidden">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar
              src={post.author?.avatar}
              alt={post.author?.name || 'User'}
              size="md"
              fallback={post.author?.name?.[0]?.toUpperCase() || 'U'}
            />
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[var(--hive-text-primary)]">
                  {post.author?.name || 'Anonymous'}
                </span>
                {post.author?.role === 'admin' && (
                  <Crown className="h-3 w-3 text-[var(--hive-brand-secondary)]" />
                )}
                {post.isPinned && (
                  <Pin className="h-3 w-3 text-[var(--hive-brand-secondary)]" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--hive-text-tertiary)]">
                <span className="capitalize">{post.type?.replace('_', ' ') || 'post'}</span>
                <span>•</span>
                <span>
                  {post.timestamp 
                    ? formatDistanceToNow(post.timestamp instanceof Date ? post.timestamp : post.timestamp?.toDate ? post.timestamp.toDate() : new Date(post.timestamp), { addSuffix: true })
                    : 'just now'}
                </span>
              </div>
            </div>
          </div>

          {(isAuthor || canModerate) && (
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Post Content */}
        <div className="mb-3">
          {post.title && (
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          )}
          <p className="text-[var(--hive-text-primary)] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className={cn(
            "grid gap-2 mb-3",
            post.images.length === 1 && "grid-cols-1",
            post.images.length === 2 && "grid-cols-2",
            post.images.length === 3 && "grid-cols-2",
            post.images.length >= 4 && "grid-cols-2"
          )}>
            {post.images.slice(0, 4).map((image: string, index: number) => (
              <div
                key={index}
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-lg bg-[var(--hive-background-tertiary)]",
                  post.images.length === 3 && index === 0 && "col-span-2",
                  "aspect-video"
                )}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                {post.images.length > 4 && index === 3 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">
                      +{post.images.length - 4}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Poll Data */}
        {post.pollData && (
          <div className="mb-3 p-3 bg-[var(--hive-background-tertiary)] rounded-lg">
            <h4 className="font-medium mb-3">{post.pollData.question}</h4>
            <div className="space-y-2">
              {post.pollData.options.map((option: any) => (
                <button
                  key={option.id}
                  className="w-full p-2 text-left bg-[var(--hive-background-secondary)] rounded hover:bg-[var(--hive-background-primary)] transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span>{option.text}</span>
                    <span className="text-sm text-[var(--hive-text-tertiary)]">
                      {option.votes} votes
                    </span>
                  </div>
                  {option.userVoted && (
                    <div className="mt-1 h-1 bg-[var(--hive-brand-primary)] rounded-full" 
                         style={{ width: `${(option.votes / 10) * 100}%` }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Coordination Data */}
        {post.coordinationData && (
          <div className="mb-3 p-3 bg-[var(--hive-background-tertiary)] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{post.coordinationData.title}</h4>
              <Badge variant={
                post.coordinationData.status === 'open' ? 'default' :
                post.coordinationData.status === 'full' ? 'destructive' :
                'secondary'
              }>
                {post.coordinationData.status}
              </Badge>
            </div>
            {post.coordinationData.description && (
              <p className="text-sm text-[var(--hive-text-secondary)] mb-2">
                {post.coordinationData.description}
              </p>
            )}
            {post.coordinationData.location && (
              <p className="text-sm text-[var(--hive-text-secondary)]">
                📍 {post.coordinationData.location}
              </p>
            )}
            {post.coordinationData.datetime && (
              <p className="text-sm text-[var(--hive-text-secondary)]">
                🕐 {new Date(post.coordinationData.datetime).toLocaleString()}
              </p>
            )}
            {post.coordinationData.responses && post.coordinationData.responses.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-[var(--hive-text-tertiary)]">
                  {post.coordinationData.responses.length} responses
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--hive-border)]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleReaction('❤️')}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              isLiked ? "text-red-500" : "text-[var(--hive-text-tertiary)] hover:text-red-500"
            )}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            {post.reactions?.reduce((sum: number, r: any) => sum + r.count, 0) || 0}
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-sm text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            {post.commentCount || 0}
          </button>
          
          <button
            onClick={() => onShare?.(post.id)}
            className="flex items-center gap-2 text-sm text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {isAuthor && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete?.(post.id)}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </Button>
        )}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-[var(--hive-border)]">
          <CommentThread
            postId={post.id}
            spaceId={spaceId}
          />
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && post.images && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={post.images[selectedImageIndex]}
              alt={`Post image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e: any) => e.stopPropagation()}
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
            {post.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {post.images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === selectedImageIndex ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}