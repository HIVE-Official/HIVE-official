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
  Clock,
  Users,
  ArrowUpRight
} from 'lucide-react';

export interface PostCardDetailedProps {
  id: string;
  author: {
    id: string;
    displayName: string;
    handle: string;
    avatarUrl?: string;
    verificationLevel: 'verified' | 'verified+' | 'faculty';
    bio?: string;
    yearLevel?: string;
  };
  content: string;
  type: 'text' | 'first_light' | 'ritual_response' | 'space_update';
  timestamp: string;
  likes: number;
  comments: number;
  shares?: number;
  isLiked: boolean;
  isBookmarked?: boolean;
  space?: {
    id: string;
    name: string;
    memberCount?: number;
    type: 'academic' | 'residential' | 'interest' | 'organization' | 'greek';
  };
  ritual?: {
    id: string;
    name: string;
    type: string;
    participantCount?: number;
  };
  engagement?: {
    recentLikes: Array<{ id: string; name: string; avatarUrl?: string }>;
    topComments: Array<{ id: string; author: string; content: string }>;
  };
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onViewSpace?: () => void;
  onViewProfile?: () => void;
  className?: string;
}

const postTypeConfig = {
  text: {
    badge: null,
    icon: null,
    gradient: '',
    borderColor: 'border-border',
  },
  first_light: {
    badge: { label: '🕯️ First Light', variant: 'ritual' as const },
    icon: Flame,
    gradient: 'bg-gradient-to-br from-accent/5 via-transparent to-transparent',
    borderColor: 'border-accent/30',
  },
  ritual_response: {
    badge: { label: '✨ Ritual Response', variant: 'accent' as const },
    icon: Sparkles,
    gradient: 'bg-gradient-to-br from-accent/3 via-transparent to-transparent',
    borderColor: 'border-accent/20',
  },
  space_update: {
    badge: { label: '📢 Space Update', variant: 'chip' as const },
    icon: null,
    gradient: '',
    borderColor: 'border-border',
  },
};

const verificationConfig = {
  verified: { 
    icon: '✓', 
    color: 'text-accent',
    label: 'Verified Student',
    bgColor: 'bg-accent/10'
  },
  'verified+': { 
    icon: '✓+', 
    color: 'text-accent font-semibold',
    label: 'Student Leader',
    bgColor: 'bg-accent/15'
  },
  faculty: { 
    icon: '🎓', 
    color: 'text-accent',
    label: 'Faculty',
    bgColor: 'bg-accent/10'
  },
};

export const PostCardDetailed: React.FC<PostCardDetailedProps> = ({
  id,
  author,
  content,
  type,
  timestamp,
  likes,
  comments,
  shares = 0,
  isLiked,
  isBookmarked = false,
  space,
  ritual,
  engagement,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onViewSpace,
  onViewProfile,
  className,
}) => {
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [showEngagement, setShowEngagement] = useState(false);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative",
        "bg-surface border rounded-lg overflow-hidden",
        "transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
        "hover:bg-surface-01 hover:shadow-lg hover:border-border-hover",
        config.borderColor,
        config.gradient,
        className
      )}
    >
      {/* Post Type Indicator */}
      {config.icon && (
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <config.icon className="h-6 w-6 text-accent" />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar with hover effect */}
          <button 
            onClick={onViewProfile}
            className="relative flex-shrink-0 group/avatar"
          >
            {author.avatarUrl ? (
              <img
                src={author.avatarUrl}
                alt={author.displayName}
                className="w-12 h-12 rounded-full bg-surface-02 transition-transform duration-[180ms] group-hover/avatar:scale-105"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-surface-02 flex items-center justify-center transition-transform duration-[180ms] group-hover/avatar:scale-105">
                <User className="w-6 h-6 text-muted" />
              </div>
            )}
            
            {/* Enhanced Verification Badge */}
            <div className={cn(
              "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-surface",
              "flex items-center justify-center text-xs font-medium",
              verification.bgColor,
              verification.color
            )} title={verification.label}>
              {verification.icon}
            </div>
          </button>

          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <button 
                onClick={onViewProfile}
                className="font-display font-semibold text-foreground hover:text-accent transition-colors duration-[180ms]"
              >
                {author.displayName}
              </button>
              
              {config.badge && (
                <Badge variant={config.badge.variant} className="text-xs">
                  {config.badge.label}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted">
              <span>@{author.handle}</span>
              {author.yearLevel && (
                <>
                  <span>•</span>
                  <span>{author.yearLevel}</span>
                </>
              )}
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timestamp}
              </span>
            </div>

            {author.bio && (
              <p className="text-xs text-muted mt-1 line-clamp-1">{author.bio}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-[180ms]">
            <Button variant="ghost" size="sm" onClick={onBookmark} className="h-8 w-8 p-0">
              <motion.div
                animate={isBookmarked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ⭐
              </motion.div>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Context Banner */}
        {(space || ritual) && (
          <div className="mb-4 p-3 bg-surface-01 border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {space && (
                  <>
                    <Users className="h-4 w-4 text-muted" />
                    <span className="text-sm font-medium text-foreground">{space.name}</span>
                    {space.memberCount && (
                      <span className="text-xs text-muted">
                        {space.memberCount.toLocaleString()} members
                      </span>
                    )}
                  </>
                )}
                {ritual && (
                  <>
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{ritual.name}</span>
                    {ritual.participantCount && (
                      <span className="text-xs text-muted">
                        {ritual.participantCount.toLocaleString()} participating
                      </span>
                    )}
                  </>
                )}
              </div>
              
              {space && (
                <Button variant="ghost" size="sm" onClick={onViewSpace} className="h-6 gap-1">
                  <span className="text-xs">View</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mb-6">
          <p className="text-foreground leading-relaxed font-body whitespace-pre-wrap">
            {content}
          </p>
        </div>

        {/* Engagement Preview */}
        {engagement && engagement.recentLikes.length > 0 && (
          <div className="mb-4 pb-4 border-b border-border">
            <button
              onClick={() => setShowEngagement(!showEngagement)}
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <div className="flex -space-x-1">
                {engagement.recentLikes.slice(0, 3).map((user, i) => (
                  <div key={user.id} className="w-5 h-5 rounded-full bg-surface-02 border border-surface flex-shrink-0" />
                ))}
              </div>
              <span>
                Liked by {engagement.recentLikes[0].name}
                {engagement.recentLikes.length > 1 && ` and ${engagement.recentLikes.length - 1} others`}
              </span>
            </button>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Like */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "h-8 px-3 gap-2 transition-colors duration-[180ms]",
                isLiked ? "text-accent" : "text-muted hover:text-foreground"
              )}
            >
              <motion.div
                animate={isLikeAnimating ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart 
                  className={cn(
                    "h-4 w-4 transition-all duration-[180ms]",
                    isLiked && "fill-current"
                  )} 
                />
              </motion.div>
              <span className="font-medium">{likes}</span>
            </Button>

            {/* Comment */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onComment}
              className="h-8 px-3 gap-2 text-muted hover:text-foreground transition-colors duration-[180ms]"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">{comments}</span>
            </Button>

            {/* Share */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="h-8 px-3 gap-2 text-muted hover:text-foreground transition-colors duration-[180ms]"
            >
              <Share className="h-4 w-4" />
              {shares > 0 && <span className="font-medium">{shares}</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Special Effects */}
      {type === 'first_light' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border border-accent/10 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </motion.article>
  );
};