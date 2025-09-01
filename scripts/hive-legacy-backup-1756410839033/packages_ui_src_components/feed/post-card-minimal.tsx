"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { cn } from '../lib/utils';
import { 
  Heart, 
  MessageCircle, 
  User,
  Flame
} from 'lucide-react';

export interface PostCardMinimalProps {
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
  onLike?: () => void;
  onComment?: () => void;
  className?: string;
}

const verificationConfig = {
  verified: '✓',
  'verified+': '✓+',
  faculty: '🎓',
};

export const PostCardMinimal: React.FC<PostCardMinimalProps> = ({
  id: _id,
  author,
  content,
  type,
  timestamp,
  likes,
  comments,
  isLiked,
  onLike,
  onComment,
  className,
}) => {
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const verification = verificationConfig[author.verificationLevel];

  const handleLike = () => {
    if (isLikeAnimating) return;
    setIsLikeAnimating(true);
    onLike?.();
    setTimeout(() => setIsLikeAnimating(false), 400);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "group py-3 px-1 transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
        "hover:bg-surface/30 -mx-1 rounded-lg",
        "border-b border-border/50 last:border-b-0",
        className
      )}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {author.avatarUrl ? (
            <img
              src={author.avatarUrl}
              alt={author.displayName}
              className="w-6 h-6 rounded-full bg-surface-02"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-surface-02 flex items-center justify-center">
              <User className="w-3 h-3 text-muted" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-display font-medium text-foreground text-sm">
              {author.displayName}
            </span>
            <span className="text-accent text-xs">{verification}</span>
            <span className="text-muted text-xs">@{author.handle}</span>
            <span className="text-muted text-xs">·</span>
            <span className="text-muted text-xs">{timestamp}</span>
            
            {type === 'first_light' && (
              <Flame className="h-3 w-3 text-accent ml-1" />
            )}
          </div>

          {/* Content */}
          <p className="text-foreground text-sm leading-relaxed font-body mb-2">
            {content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity duration-[180ms]">
            <ButtonEnhanced
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "h-5 px-0 gap-1 text-xs",
                isLiked ? "text-accent" : "text-muted hover:text-foreground"
              )}
            >
              <motion.div
                animate={isLikeAnimating ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Heart 
                  className={cn(
                    "h-3 w-3",
                    isLiked && "fill-current"
                  )} 
                />
              </motion.div>
              {likes > 0 && <span>{likes}</span>}
            </ButtonEnhanced>

            <ButtonEnhanced
              variant="ghost"
              size="sm"
              onClick={onComment}
              className="h-5 px-0 gap-1 text-xs text-muted hover:text-foreground"
            >
              <MessageCircle className="h-3 w-3" />
              {comments > 0 && <span>{comments}</span>}
            </ButtonEnhanced>
          </div>
        </div>
      </div>
    </motion.article>
  );
};