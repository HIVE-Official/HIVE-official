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
  User,
  Eye,
  Bookmark,
  TrendingUp,
  Zap
} from 'lucide-react';

export interface PostCardPremiumProps {
  id: string;
  author: {
    id: string;
    displayName: string;
    handle: string;
    avatarUrl?: string;
    verificationLevel: 'verified' | 'verified+' | 'faculty';
    reputation?: number;
    isOnline?: boolean;
  };
  content: string;
  type: 'text' | 'first_light' | 'ritual_response' | 'space_update';
  timestamp: string;
  likes: number;
  comments: number;
  views?: number;
  shares?: number;
  isLiked: boolean;
  isBookmarked?: boolean;
  isTrending?: boolean;
  engagementVelocity?: 'slow' | 'normal' | 'fast' | 'viral';
  space?: {
    id: string;
    name: string;
    verified?: boolean;
    memberCount?: number;
  };
  ritual?: {
    id: string;
    name: string;
    type: string;
    progress?: number;
  };
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onViewProfile?: () => void;
  className?: string;
}

const postTypeConfig = {
  text: {
    badge: null,
    icon: null,
    glow: '',
    borderAccent: '',
  },
  first_light: {
    badge: { label: '🕯️ First Light', variant: 'ritual' as const },
    icon: Flame,
    glow: 'shadow-accent/20',
    borderAccent: 'before:bg-gradient-to-r before:from-accent/30 before:via-accent/20 before:to-transparent',
  },
  ritual_response: {
    badge: { label: '✨ Ritual', variant: 'accent' as const },
    icon: Sparkles,
    glow: 'shadow-accent/10',
    borderAccent: 'before:bg-gradient-to-r before:from-accent/20 before:via-accent/10 before:to-transparent',
  },
  space_update: {
    badge: { label: '📢 Update', variant: 'chip' as const },
    icon: null,
    glow: '',
    borderAccent: '',
  },
};

const verificationConfig = {
  verified: { 
    icon: '✓', 
    color: 'text-accent',
    bgColor: 'bg-accent/15',
    label: 'Verified Student'
  },
  'verified+': { 
    icon: '✓+', 
    color: 'text-accent font-bold',
    bgColor: 'bg-gradient-to-r from-accent/20 to-accent/10',
    label: 'Student Leader'
  },
  faculty: { 
    icon: '🎓', 
    color: 'text-accent',
    bgColor: 'bg-accent/15',
    label: 'Faculty'
  },
};

const engagementVelocityConfig = {
  slow: { color: 'text-muted', intensity: 0 },
  normal: { color: 'text-foreground', intensity: 0.05 },
  fast: { color: 'text-accent', intensity: 0.1 },
  viral: { color: 'text-accent', intensity: 0.2 },
};

export const PostCardPremium: React.FC<PostCardPremiumProps> = ({
  id,
  author,
  content,
  type,
  timestamp,
  likes,
  comments,
  views = 0,
  shares = 0,
  isLiked,
  isBookmarked = false,
  isTrending = false,
  engagementVelocity = 'normal',
  space,
  ritual,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onViewProfile,
  className,
}) => {
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const config = postTypeConfig[type];
  const verification = verificationConfig[author.verificationLevel];
  const velocity = engagementVelocityConfig[engagementVelocity];

  const handleLike = () => {
    if (isLikeAnimating) return;
    setIsLikeAnimating(true);
    onLike?.();
    setTimeout(() => setIsLikeAnimating(false), 800);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2, ease: [0.33, 0.65, 0, 1] }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden cursor-pointer",
        "bg-gradient-to-br from-surface via-surface to-surface/95",
        "border border-border/60 backdrop-blur-sm",
        "rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.33,0.65,0,1)]",
        "hover:border-border-hover hover:shadow-2xl hover:shadow-black/20",
        config.glow,
        // Top accent line for special posts
        config.borderAccent && "before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5",
        config.borderAccent,
        className
      )}
      style={{
        background: `linear-gradient(135deg, 
          hsl(0 0% 6.7%) 0%, 
          hsl(0 0% 6.9%) 50%, 
          hsl(0 0% 6.5%) 100%)`
      }}
    >
      {/* Engagement velocity glow */}
      {engagementVelocity === 'viral' && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(255, 215, 0, 0)',
              '0 0 0 4px rgba(255, 215, 0, 0.1)',
              '0 0 0 0 rgba(255, 215, 0, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Content */}
      <div className="relative p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-5">
          {/* Author Info */}
          <div className="flex items-start gap-4 flex-1">
            {/* Avatar with advanced styling */}
            <button 
              onClick={onViewProfile}
              className="relative group/avatar flex-shrink-0"
            >
              <div className="relative">
                {author.avatarUrl ? (
                  <img
                    src={author.avatarUrl}
                    alt={author.displayName}
                    className={cn(
                      "w-12 h-12 rounded-2xl object-cover",
                      "ring-2 ring-border/40 transition-all duration-300",
                      "group-hover/avatar:ring-accent/40 group-hover/avatar:scale-105"
                    )}
                  />
                ) : (
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    "bg-gradient-to-br from-surface-02 via-surface-01 to-surface-02",
                    "ring-2 ring-border/40 transition-all duration-300",
                    "group-hover/avatar:ring-accent/40 group-hover/avatar:scale-105"
                  )}>
                    <User className="w-6 h-6 text-muted" />
                  </div>
                )}
                
                {/* Online status indicator */}
                {author.isOnline && (
                  <motion.div
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-surface"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
              
              {/* Enhanced verification badge */}
              <div className={cn(
                "absolute -bottom-1 -right-1 w-6 h-6 rounded-xl border-2 border-surface",
                "flex items-center justify-center text-xs font-bold shadow-lg",
                verification.bgColor,
                verification.color
              )}>
                {verification.icon}
              </div>
            </button>

            {/* Author details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <button 
                  onClick={onViewProfile}
                  className="font-display font-bold text-foreground text-lg hover:text-accent transition-colors duration-200"
                >
                  {author.displayName}
                </button>
                
                {config.badge && (
                  <Badge variant={config.badge.variant} className="text-xs font-medium px-2 py-1">
                    {config.badge.label}
                  </Badge>
                )}

                {isTrending && (
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1 px-2 py-1 bg-accent/10 border border-accent/30 rounded-lg"
                  >
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <span className="text-xs font-medium text-accent">Trending</span>
                  </motion.div>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="font-medium">@{author.handle}</span>
                {author.reputation && (
                  <>
                    <span className="text-border">•</span>
                    <span className="text-accent font-medium">{author.reputation} rep</span>
                  </>
                )}
                <span className="text-border">•</span>
                <span>{timestamp}</span>
                {engagementVelocity === 'viral' && (
                  <>
                    <span className="text-border">•</span>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="flex items-center gap-1 text-accent font-medium"
                    >
                      <Zap className="h-3 w-3" />
                      <span>Viral</span>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Context indicators */}
              {(space || ritual) && (
                <div className="mt-2 flex items-center gap-2">
                  {space && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-01/60 border border-border/40 rounded-lg">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-xs font-medium text-foreground">{space.name}</span>
                      {space.verified && <span className="text-accent text-xs">✓</span>}
                      {space.memberCount && (
                        <span className="text-xs text-muted">
                          {space.memberCount.toLocaleString()} members
                        </span>
                      )}
                    </div>
                  )}
                  
                  {ritual && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/30 rounded-lg">
                      <Sparkles className="h-3 w-3 text-accent" />
                      <span className="text-xs font-medium text-accent">{ritual.name}</span>
                      {ritual.progress && (
                        <div className="w-12 h-1 bg-surface-02 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${ritual.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action menu */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {(isHovered || showActions) && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-1"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBookmark}
                    className={cn(
                      "h-8 w-8 p-0 transition-all duration-200",
                      isBookmarked && "text-accent bg-accent/10"
                    )}
                  >
                    <motion.div
                      animate={isBookmarked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                    </motion.div>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              className="h-8 w-8 p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-foreground leading-relaxed font-body text-base whitespace-pre-wrap">
            {content}
          </p>
        </div>

        {/* Engagement metrics */}
        {views > 0 && (
          <div className="flex items-center gap-4 mb-4 text-sm text-muted">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{views.toLocaleString()} views</span>
            </div>
            {engagementVelocity !== 'slow' && (
              <div className={cn("flex items-center gap-1", velocity.color)}>
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">
                  {engagementVelocity === 'viral' ? 'Going viral' : 
                   engagementVelocity === 'fast' ? 'Trending' : 'Active'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Actions bar */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div className="flex items-center gap-6">
            {/* Like */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "gap-2 px-3 py-2 rounded-xl transition-all duration-200",
                isLiked 
                  ? "text-accent bg-accent/10 hover:bg-accent/15" 
                  : "text-muted hover:text-foreground hover:bg-surface-01"
              )}
            >
              <motion.div
                animate={isLikeAnimating ? { 
                  scale: [1, 1.4, 1],
                  rotate: [0, 10, -10, 0]
                } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.33, 0.65, 0, 1] }}
              >
                <Heart 
                  className={cn(
                    "h-5 w-5 transition-all duration-200",
                    isLiked && "fill-current"
                  )} 
                />
              </motion.div>
              <span className="font-semibold">{likes.toLocaleString()}</span>
            </Button>

            {/* Comment */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onComment}
              className="gap-2 px-3 py-2 rounded-xl text-muted hover:text-foreground hover:bg-surface-01 transition-all duration-200"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">{comments.toLocaleString()}</span>
            </Button>

            {/* Share */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="gap-2 px-3 py-2 rounded-xl text-muted hover:text-foreground hover:bg-surface-01 transition-all duration-200"
            >
              <Share className="h-5 w-5" />
              {shares > 0 && <span className="font-semibold">{shares.toLocaleString()}</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Special effects for first light */}
      {type === 'first_light' && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0) 0%, rgba(255, 215, 0, 0) 100%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.02) 0%, rgba(255, 215, 0, 0) 70%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0) 0%, rgba(255, 215, 0, 0) 100%)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.03) 0%, rgba(255, 215, 0, 0.01) 100%)'
            : 'transparent'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
};