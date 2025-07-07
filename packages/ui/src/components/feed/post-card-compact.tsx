"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

export interface PostCardCompactProps {
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
    accentColor: '',
  },
  first_light: {
    badge: { label: '🕯️ First Light', variant: 'ritual' as const },
    icon: Flame,
    accentColor: 'border-l-accent',
  },
  ritual_response: {
    badge: { label: '✨ Ritual', variant: 'accent' as const },
    icon: Sparkles,
    accentColor: 'border-l-accent/60',
  },
  space_update: {
    badge: { label: '📢 Update', variant: 'chip' as const },
    icon: null,
    accentColor: 'border-l-border',
  },
};

const verificationConfig = {
  verified: { 
    icon: '✓', 
    color: 'text-accent',
    label: 'Verified Student'
  },
  'verified+': { 
    icon: '✓+', 
    color: 'text-accent font-semibold',
    label: 'Student Leader'
  },
  faculty: { 
    icon: '🎓', 
    color: 'text-accent',
    label: 'Faculty'
  },
};

export const PostCardCompact: React.FC<PostCardCompactProps> = ({
  id: _id,
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
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const config = postTypeConfig[type];
  const verification = verificationConfig[author.verificationLevel];

  const handleLike = () => {
    if (isLikeAnimating) return;
    setIsLikeAnimating(true);
    onLike?.();
    setTimeout(() => setIsLikeAnimating(false), 600);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative",
        "bg-surface border-l-2 border-r border-t border-b border-border rounded-r-lg",
        "p-3 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
        "hover:bg-surface-01 hover:shadow-sm",
        config.accentColor || 'border-l-border',
        className
      )}
    >
      {/* Header - Horizontal Layout */}
      <div className="flex items-start gap-3 mb-2">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {author.avatarUrl ? (
            <img
              src={author.avatarUrl}
              alt={author.displayName}
              className="w-8 h-8 rounded-full bg-surface-02"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface-02 flex items-center justify-center">
              <User className="w-4 h-4 text-muted" />
            </div>
          )}
          
          {/* Verification Badge */}
          <div className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full",
            "bg-surface border border-border flex items-center justify-center text-[10px]",
            verification.color
          )} title={verification.label}>
            {verification.icon}
          </div>
        </div>

        {/* Author Info & Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-medium text-foreground text-sm truncate">
              {author.displayName}
            </span>
            <span className="text-muted text-xs">@{author.handle}</span>
            <span className="text-muted text-xs">•</span>
            <span className="text-muted text-xs">{timestamp}</span>
            
            {/* Post Type Badge */}
            {config.badge && (
              <Badge variant={config.badge.variant} className="text-xs h-5">
                {config.badge.label}
              </Badge>
            )}
          </div>
          
          {/* Space/Ritual Context */}
          {(space || ritual) && (
            <div className="text-xs text-muted mt-1">
              {space && `in ${space.name}`}
              {ritual && `for ${ritual.name}`}
            </div>
          )}
        </div>

        {/* More Menu */}
        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-foreground text-sm leading-relaxed font-body">
          {content}
        </p>
      </div>

      {/* Actions - Horizontal */}
      <div className="flex items-center gap-4">
        {/* Like */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={cn(
            "h-6 px-2 gap-1.5 text-xs transition-colors duration-[180ms]",
            isLiked ? "text-accent" : "text-muted hover:text-foreground"
          )}
        >
          <motion.div
            animate={isLikeAnimating ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart 
              className={cn(
                "h-3 w-3 transition-all duration-[180ms]",
                isLiked && "fill-current"
              )} 
            />
          </motion.div>
          {likes > 0 && <span>{likes}</span>}
        </Button>

        {/* Comment */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onComment}
          className="h-6 px-2 gap-1.5 text-xs text-muted hover:text-foreground transition-colors duration-[180ms]"
        >
          <MessageCircle className="h-3 w-3" />
          {comments > 0 && <span>{comments}</span>}
        </Button>

        {/* Share */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="h-6 px-2 gap-1.5 text-xs text-muted hover:text-foreground transition-colors duration-[180ms] ml-auto"
        >
          <Share className="h-3 w-3" />
        </Button>
      </div>

      {/* Special Visual Elements */}
      {type === 'first_light' && (
        <motion.div
          className="absolute top-2 right-2 opacity-20"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Flame className="h-4 w-4 text-accent" />
        </motion.div>
      )}
    </motion.article>
  );
};