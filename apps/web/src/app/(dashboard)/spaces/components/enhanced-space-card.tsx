"use client";

import Image from 'next/image';
import { useState, useRef } from "react";
import { Card, Button, Badge } from "@hive/ui";
import { 
  Users, 
  Heart, 
  Star as _Star, 
  Clock, 
  TrendingUp,
  Shield,
  Crown as _Crown,
  MessageSquare,
  Calendar as _Calendar,
  Zap as _Zap,
  Eye,
  UserPlus,
  ChevronRight as _ChevronRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Space } from "@hive/core";

interface EnhancedSpaceCardProps {
  space: Space & {
    // Enhanced metadata for discovery
    activityScore?: number;
    trendingRank?: number;
    friendsInSpace?: number;
    recentActivity?: {
      posts: number;
      events: number;
      activeMembers: number;
    };
    joinProbability?: number; // ML-driven prediction
    similarSpaces?: string[];
  };
  variant?: "grid" | "list" | "featured" | "compact";
  showPreview?: boolean;
  onJoin?: (_spaceId: string) => void;
  onPreview?: (_spaceId: string) => void;
  onFavorite?: (_spaceId: string) => void;
  userMembership?: {
    status: "member" | "pending" | "not_member";
    role?: "owner" | "admin" | "member";
  };
  discoveryContext?: {
    source: "browse" | "recommendation" | "search" | "friend";
    reason?: string;
    confidence?: number;
  };
}

export function EnhancedSpaceCard({ 
  space, 
  variant = "grid",
  showPreview = true,
  onJoin,
  onPreview,
  onFavorite,
  userMembership,
  discoveryContext
}: EnhancedSpaceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [_isPreviewOpen, _setIsPreviewOpen] = useState(false);
  const [_imageLoaded, _setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Psychology-driven join probability color coding
  const getProbabilityColor = (probability?: number) => {
    if (!probability) return "text-neutral-400";
    if (probability > 0.8) return "text-green-400";
    if (probability > 0.6) return "text-hive-gold";
    return "text-neutral-400";
  };

  // Activity level indicator
  const getActivityLevel = () => {
    const activity = space.recentActivity;
    if (!activity) return "quiet";
    
    const totalActivity = activity.posts + activity.events + activity.activeMembers;
    if (totalActivity > 50) return "very-active";
    if (totalActivity > 20) return "active";
    if (totalActivity > 5) return "moderate";
    return "quiet";
  };

  const activityConfig = {
    "very-active": { color: "text-green-400", label: "Very Active", pulse: true },
    "active": { color: "text-blue-400", label: "Active", pulse: false },
    "moderate": { color: "text-hive-gold", label: "Moderate", pulse: false },
    "quiet": { color: "text-neutral-400", label: "Quiet", pulse: false }
  };

  const activity = activityConfig[getActivityLevel()];

  // Render different variants
  if (variant === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className="group"
      >
        <Card className="p-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-4">
            {/* Avatar with status */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                {space.bannerUrl ? (
                  <Image 
                    src={space.bannerUrl} 
                    alt={space.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-xl"
                    onLoad={() => _setImageLoaded(true)}
                  />
                ) : (
                  <span className="text-xl font-bold text-white">
                    {space.name.charAt(0)}
                  </span>
                )}
              </div>
              
              {/* Activity indicator */}
              {activity.pulse && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white truncate">
                  {space.name}
                </h3>
                {space.trendingRank && space.trendingRank <= 10 && (
                  <Badge variant="active-tag" className="bg-orange-400/20 text-orange-400 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    #{space.trendingRank}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-neutral-300 line-clamp-2 mb-2">
                {space.description}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {space.memberCount}
                </span>
                <span className={`flex items-center gap-1 ${activity.color}`}>
                  <MessageSquare className="h-3 w-3" />
                  {activity.label}
                </span>
                {space.friendsInSpace && space.friendsInSpace > 0 && (
                  <span className="flex items-center gap-1 text-blue-400">
                    <Users className="h-3 w-3" />
                    {space.friendsInSpace} friends
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {showPreview && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onPreview?.(space.id)}
                  className="text-neutral-400 hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                size="sm"
                onClick={() => onJoin?.(space.id)}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                disabled={userMembership?.status === "member"}
              >
                {userMembership?.status === "member" ? "Joined" : 
                 userMembership?.status === "pending" ? "Pending" : "Join"}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Grid variant (default) - optimized for mobile-first
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
        {/* Discovery context indicator */}
        {discoveryContext?.source === "recommendation" && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-hive-gold/20 text-hive-gold text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              For You
            </Badge>
          </div>
        )}

        {/* Trending badge */}
        {space.trendingRank && space.trendingRank <= 5 && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-orange-400/20 text-orange-400 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              #{space.trendingRank}
            </Badge>
          </div>
        )}

        {/* Header with avatar and quick stats */}
        <div className="p-4 pb-2">
          <div className="flex items-center gap-3 mb-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                {space.bannerUrl ? (
                  <Image 
                    src={space.bannerUrl} 
                    alt={space.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-xl"
                    onLoad={() => _setImageLoaded(true)}
                  />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {space.name.charAt(0)}
                  </span>
                )}
              </div>
              
              {/* Activity pulse */}
              {activity.pulse && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>

            {/* Basic info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate text-sm">
                {space.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {space.memberCount}
                </span>
                <span className={`flex items-center gap-1 ${activity.color}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${activity.color.replace('text-', 'bg-')}`} />
                  {activity.label}
                </span>
              </div>
            </div>

            {/* Favorite button */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onFavorite?.(space.id)}
              className="text-neutral-400 hover:text-red-400 p-1"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-300 line-clamp-2 mb-3">
            {space.description}
          </p>

          {/* Social proof and engagement metrics */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
            <div className="flex items-center gap-3">
              {space.friendsInSpace && space.friendsInSpace > 0 && (
                <span className="flex items-center gap-1 text-blue-400">
                  <Users className="h-3 w-3" />
                  {space.friendsInSpace} friends
                </span>
              )}
              
              {space.recentActivity && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {space.recentActivity.posts} posts
                </span>
              )}
            </div>

            {/* Join probability (ML-driven) */}
            {space.joinProbability && (
              <span className={`text-xs ${getProbabilityColor(space.joinProbability)}`}>
                {Math.round(space.joinProbability * 100)}% match
              </span>
            )}
          </div>
        </div>

        {/* Preview section (expandable) */}
        <AnimatePresence>
          {isHovered && showPreview && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-2 border-t border-white/10"
            >
              <div className="py-2">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs font-medium text-white">
                      {space.recentActivity?.posts || 0}
                    </div>
                    <div className="text-xs text-neutral-400">Posts</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">
                      {space.recentActivity?.events || 0}
                    </div>
                    <div className="text-xs text-neutral-400">Events</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">
                      {space.recentActivity?.activeMembers || 0}
                    </div>
                    <div className="text-xs text-neutral-400">Active</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="p-4 pt-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPreview?.(space.id)}
              className="flex-1 text-xs border-white/20 text-neutral-300 hover:text-white"
            >
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>
            
            <Button
              size="sm"
              onClick={() => onJoin?.(space.id)}
              disabled={userMembership?.status === "member"}
              className={`
                flex-1 text-xs
                ${userMembership?.status === "member" 
                  ? "bg-green-400/20 text-green-400 cursor-default" 
                  : "bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                }
              `}
            >
              {userMembership?.status === "member" ? (
                <>
                  <Shield className="h-3 w-3 mr-1" />
                  Joined
                </>
              ) : userMembership?.status === "pending" ? (
                <>
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </>
              ) : (
                <>
                  <UserPlus className="h-3 w-3 mr-1" />
                  Join
                </>
              )}
            </Button>
          </div>

          {/* Discovery reason */}
          {discoveryContext?.reason && (
            <div className="mt-2 text-xs text-neutral-400 italic">
              "{discoveryContext.reason}"
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// Featured variant for homepage/recommendations
export function FeaturedSpaceCard(props: EnhancedSpaceCardProps) {
  return (
    <EnhancedSpaceCard 
      {...props} 
      variant="featured"
    />
  );
}

// Compact variant for sidebars
export function CompactSpaceCard(props: EnhancedSpaceCardProps) {
  return (
    <EnhancedSpaceCard 
      {...props} 
      variant="compact"
      showPreview={false}
    />
  );
}