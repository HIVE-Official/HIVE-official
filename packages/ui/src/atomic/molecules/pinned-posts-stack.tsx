'use client';

/**
 * PinnedPostsStack - Vertical stack of pinned posts (no carousel)
 * Simple gold left border indicates pinned status
 * Maximum 2 posts (per space rules: ≤2 pins, 7-day expiration)
 */

import React from 'react';
import { Pin } from 'lucide-react';
import { MotionDiv } from '../motion-safe';
import { HiveCard } from '../atoms/hive-card';

export interface PinnedPost {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
}

export interface PinnedPostsStackProps {
  posts: PinnedPost[];
  onPostClick?: (postId: string) => void;
}

const HIVE_EASING = {
  reveal: [0.23, 1, 0.32, 1] as const,
};

export function PinnedPostsStack({ posts, onPostClick }: PinnedPostsStackProps) {
  // Only show up to 2 posts (enforce space rule)
  const displayPosts = posts.slice(0, 2);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Section label */}
      <div className="flex items-center gap-2 px-1">
        <Pin className="w-3.5 h-3.5 text-hive-brand-primary" />
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
          Pinned by Leaders
        </span>
      </div>

      {/* Stacked posts */}
      <div className="space-y-2">
        {displayPosts.map((post, index) => (
          <MotionDiv
            key={post.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: HIVE_EASING.reveal,
            }}
          >
            <HiveCard
              variant="ghost"
              className="border-l-4 border-l-hive-brand-primary bg-hive-brand-primary/5 hover:bg-hive-brand-primary/8 transition-colors cursor-pointer"
              onClick={() => onPostClick?.(post.id)}
            >
              <div className="p-4 space-y-3">
                {/* Author + Timestamp */}
                <div className="flex items-center gap-3">
                  {post.authorAvatar && (
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {post.authorName}
                    </p>
                    <p className="text-xs text-white/50">{post.timestamp}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm text-white/90 line-clamp-3">
                  {post.content}
                </p>

                {/* Image (if present) */}
                {post.imageUrl && (
                  <div className="rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="w-full h-auto max-h-64 object-cover"
                    />
                  </div>
                )}
              </div>
            </HiveCard>
          </MotionDiv>
        ))}
      </div>

      {/* Pin expiration note (subtle) */}
      <p className="text-[10px] text-white/30 px-1">
        Pins expire after 7 days
      </p>
    </div>
  );
}
