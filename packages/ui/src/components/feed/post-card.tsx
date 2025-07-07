"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../../lib/utils';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Flame,
  Sparkles,
  User
} from 'lucide-react';

export interface PostCardProps {
  id: string;
  author: {
    id: string;
    displayName: string;
    handle: string;
    avatarUrl?: string;
    verificationLevel: 'verified' | 'verified+' | 'faculty';
  };
  content: string;
  type: 'text' | 'first_light' | 'ritual_response' | 'space_update';
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  space?: {
    id: string;
    name: string;
  };
  ritual?: {
    id: string;
    name: string;
    type: string;
  };
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  className?: string;
}

const postTypeConfig = {
  text: {
    badge: null,
    icon: null,
    gradient: '',
  },
  first_light: {
    badge: { label: 'First Light', variant: 'ritual' as const },
    icon: Flame,
    gradient: 'from-accent/10 via-transparent to-transparent',
  },
  ritual_response: {
    badge: { label: 'Ritual', variant: 'accent' as const },
    icon: Sparkles,
    gradient: 'from-accent/5 via-transparent to-transparent',
  },
  space_update: {
    badge: { label: 'Space Update', variant: 'chip' as const },
    icon: null,
    gradient: '',
  },
};

export const PostCard: React.FC<PostCardProps> = ({
  id,
  author,
  content,
  type,
  timestamp,
  likes,
  comments,
  isLiked,
  space,
  ritual,
  onLike,
  onComment,
  onShare,
  className,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const config = postTypeConfig[type];

  const handleLike = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onLike?.();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative bg-surface border border-border rounded-lg p-4",
        "transition-all duration-base ease-brand",
        "hover:border-accent/20 hover:shadow-sm",
        className
      )}
    >
      {/* Background gradient for special posts */}
      {config.gradient && (
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br rounded-lg",
          config.gradient
        )} />
      )}

      <div className="relative space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 bg-surface-02 rounded-full flex items-center justify-center">
                {author.avatarUrl ? (
                  <img 
                    src={author.avatarUrl} 
                    alt={author.displayName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-muted" />
                )}
              </div>
              
              {/* Verification indicator */}
              {author.verificationLevel === 'verified+' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-background" />
                </div>
              )}
            </div>

            {/* Author info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground font-body truncate">
                  {author.displayName}
                </span>
                <span className="text-muted text-sm">@{author.handle}</span>
              </div>
              
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-muted text-xs">{timestamp}</span>
                
                {/* Space context */}
                {space && (
                  <>
                    <span className="text-muted text-xs">•</span>
                    <Badge variant="chip" size="xs">
                      {space.name}
                    </Badge>
                  </>
                )}
                
                {/* Post type badge */}
                {config.badge && (
                  <>
                    <span className="text-muted text-xs">•</span>
                    <Badge variant={config.badge.variant} size="xs">
                      {config.icon && <config.icon className="w-2 h-2 mr-1" />}
                      {config.badge.label}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* More actions */}
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-foreground font-body leading-relaxed whitespace-pre-wrap">
            {content}
          </p>

          {/* Ritual context */}
          {ritual && (
            <div className="p-3 bg-surface-01 border border-border rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-muted">
                  Responding to <span className="text-accent font-medium">{ritual.name}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-4">
            {/* Like */}
            <motion.button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-2 text-sm transition-colors",
                isLiked ? "text-accent" : "text-muted hover:text-accent"
              )}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isLiked && isAnimating ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0] 
                } : {}}
                transition={{ duration: 0.6 }}
              >
                <Heart className={cn(
                  "w-4 h-4 transition-all",
                  isLiked && "fill-current"
                )} />
              </motion.div>
              <span className="font-medium">{likes}</span>
            </motion.button>

            {/* Comment */}
            <button
              onClick={onComment}
              className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">{comments}</span>
            </button>
          </div>

          {/* Share */}
          <button
            onClick={onShare}
            className="p-2 text-muted hover:text-accent transition-colors rounded-lg hover:bg-surface-01"
          >
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};