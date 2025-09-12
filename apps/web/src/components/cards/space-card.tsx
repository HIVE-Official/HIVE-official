"use client";

import React from 'react';
import { Card, CardContent, CardHeader, Badge, Avatar, AvatarImage, AvatarFallback } from '@hive/ui';
import { Users, Crown, Heart, MessageCircle, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@hive/ui';
import Link from 'next/link';
import { type Space } from '@hive/core';

interface SpaceCardProps {
  space: Space;
  showJoinButton?: boolean;
  onJoin?: (spaceId: string) => void;
  onLeave?: (spaceId: string) => void;
  isJoined?: boolean;
  className?: string;
}

export function SpaceCard({ 
  space, 
  showJoinButton = true, 
  onJoin, 
  onLeave, 
  isJoined = false,
  className 
}: SpaceCardProps) {
  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isJoined && onLeave) {
      onLeave(space.id);
    } else if (!isJoined && onJoin) {
      onJoin(space.id);
    }
  };

  return (
    <Link href={`/spaces/${space.id}`} className={cn("block", className)}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group cursor-pointer border-2 hover:border-[var(--hive-brand-primary)]/20">
        {/* Header with space image/avatar */}
        <div className="relative h-32 bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-secondary)]/20 rounded-t-lg overflow-hidden">
          {space.imageUrl ? (
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${space.imageUrl})` }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl font-bold text-[var(--hive-brand-primary)]">
                {space.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          
          {/* Space type badge */}
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="bg-white/90 text-gray-700 text-xs font-medium"
            >
              {space.type}
            </Badge>
          </div>

          {/* Premium/featured indicator */}
          {space.featured && (
            <div className="absolute top-3 right-3">
              <Crown className="h-5 w-5 text-yellow-500 fill-current" />
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg group-hover:text-[var(--hive-brand-primary)] transition-colors line-clamp-1">
                {space.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {space.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Space stats */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{space.memberCount || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{space.postCount || 0}</span>
            </div>
            {space.nextEventDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">
                  {new Date(space.nextEventDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Location if available */}
          {space.location && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
              <MapPin className="h-3 w-3" />
              <span>{space.location}</span>
            </div>
          )}

          {/* Tags */}
          {space.tags && space.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {space.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
              {space.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{space.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Join/Leave button */}
          {showJoinButton && (
            <button
              onClick={handleJoinClick}
              className={cn(
                "w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                isJoined
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  : "bg-[var(--hive-brand-primary)] text-white hover:bg-[var(--hive-brand-primary)]/90"
              )}
            >
              {isJoined ? 'Leave Space' : 'Join Space'}
            </button>
          )}

          {/* Activity indicator */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {space.recentMembers && space.recentMembers.length > 0 && (
                <div className="flex -space-x-1">
                  {space.recentMembers.slice(0, 3).map((member, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <div className={cn(
                "w-2 h-2 rounded-full",
                space.isActive ? "bg-green-400" : "bg-gray-300"
              )} />
              <span>{space.isActive ? 'Active' : 'Quiet'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default SpaceCard;