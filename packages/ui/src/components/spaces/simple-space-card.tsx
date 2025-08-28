/**
 * SpaceCard - Purpose-built for UB campus spaces
 * 
 * Shows the information students actually scan for:
 * 1. What's the space about? (name, activity)
 * 2. Who's there? (member count, activity level)
 * 3. How do I join? (clear action)
 */

'use client';

import React from 'react';
import { Users, MessageSquare, MapPin, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export interface Space {
  id: string;
  name: string;
  description?: string;
  location?: string;          // "Davis Hall Room 101", "Ellicott Complex"
  memberCount: number;
  isActive: boolean;          // Has recent activity
  recentActivity?: string;    // "3 people studying now", "Last post 2h ago"
  category: 'academic' | 'residential' | 'social' | 'professional';
  isPrivate: boolean;
  lastActive?: string;        // "Active now", "2 hours ago"
}

export interface SpaceCardProps {
  space: Space;
  showLocation?: boolean;
  showActivity?: boolean;
  onJoin?: (spaceId: string) => void;
  onView?: (spaceId: string) => void;
  isJoined?: boolean;
  className?: string;
}

export function SpaceCard({ 
  space, 
  showLocation = true,
  showActivity = true,
  onJoin,
  onView,
  isJoined = false,
  className 
}: SpaceCardProps) {
  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoin?.(space.id);
  };

  const handleCardClick = () => {
    onView?.(space.id);
  };

  const categoryColors = {
    academic: 'bg-blue-500/10 text-blue-400 border-blue-400/30',
    residential: 'bg-green-500/10 text-green-400 border-green-400/30', 
    social: 'bg-purple-500/10 text-purple-400 border-purple-400/30',
    professional: 'bg-amber-500/10 text-amber-400 border-amber-400/30'
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer border border-gray-700 bg-gray-900 hover:border-gray-600 hover:bg-gray-850",
        className
      )}
      onClick={handleCardClick}
    >
      <div className="p-4 space-y-3">
        {/* Priority 1: Core information students scan for */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-white text-base leading-tight line-clamp-2">
              {space.name}
            </h3>
            {space.isActive && (
              <div className="flex-shrink-0 h-2 w-2 bg-green-400 rounded-full animate-pulse" 
                   title="Active now" />
            )}
          </div>
          
          {space.description && (
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {space.description}
            </p>
          )}
        </div>

        {/* Priority 2: Practical details */}
        <div className="space-y-2">
          {/* Location and activity info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {showLocation && space.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{space.location}</span>
              </div>
            )}
            {showActivity && space.recentActivity && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{space.recentActivity}</span>
              </div>
            )}
          </div>

          {/* Member count and category */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="h-3 w-3" />
                <span>
                  {space.memberCount} {space.memberCount === 1 ? 'member' : 'members'}
                </span>
              </div>
              
              <Badge 
                variant="secondary"
                className={cn(
                  "text-xs px-2 py-0.5 border",
                  categoryColors[space.category]
                )}
              >
                {space.category}
              </Badge>
              
              {space.isPrivate && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  Private
                </Badge>
              )}
            </div>

            {/* Join action - thumb-friendly */}
            <Button
              size="sm"
              variant={isJoined ? "secondary" : "primary"}
              onClick={handleJoinClick}
              className="text-xs px-3 py-1.5 h-auto"
            >
              {isJoined ? "Joined ✓" : "Join"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Compact version for lists
export function SpaceCardCompact({ space, onJoin, isJoined, className }: SpaceCardProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-3 border-b border-gray-700 hover:bg-gray-800/50",
        className
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm truncate">{space.name}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Users className="h-3 w-3" />
            <span>{space.memberCount} members</span>
            {space.isActive && (
              <>
                <div className="h-1 w-1 bg-gray-500 rounded-full" />
                <span className="text-green-400">Active</span>
              </>
            )}
          </div>
        </div>
      </div>

      <Button
        size="sm"
        variant={isJoined ? "secondary" : "primary"}
        onClick={(e) => {
          e.stopPropagation();
          onJoin?.(space.id);
        }}
        className="text-xs px-3 py-1.5 h-auto flex-shrink-0"
      >
        {isJoined ? "Joined" : "Join"}
      </Button>
    </div>
  );
}

// Loading skeleton
export function SpaceCardSkeleton() {
  return (
    <Card className="border border-gray-700 bg-gray-900">
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2" />
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-800 rounded animate-pulse w-1/3" />
            <div className="h-8 bg-gray-800 rounded animate-pulse w-16" />
          </div>
        </div>
      </div>
    </Card>
  );
}