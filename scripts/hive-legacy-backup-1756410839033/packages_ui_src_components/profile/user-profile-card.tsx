/**
 * UserProfileCard - Purpose-built for UB student profiles
 * 
 * Shows what students actually want to know about each other:
 * 1. Who is this person? (name, major, year)
 * 2. Are they active? (online status, recent activity)
 * 3. How do I connect? (message, add friend)
 */

'use client';

import React from 'react';
import { MessageCircle, UserPlus, MapPin, GraduationCap, Calendar, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;              // @alexchen
  major?: string;              // "Computer Science"
  year?: string;               // "Junior", "Class of 2025"
  avatar?: string;
  bio?: string;
  location?: string;           // "Ellicott Complex", "North Campus"
  status: 'online' | 'away' | 'studying' | 'offline';
  lastSeen?: string;           // "2 minutes ago", "Active now"
  
  // Campus activity
  spacesCount?: number;        // Number of spaces they're in
  isBuilder?: boolean;         // Do they build tools?
  toolsBuilt?: number;         // Number of tools they've created
  mutualSpaces?: number;       // Spaces in common with current user
}

export interface UserProfileCardProps {
  profile: UserProfile;
  currentUserId?: string;      // To hide self-interaction buttons
  showBio?: boolean;
  showStats?: boolean;
  onMessage?: (userId: string) => void;
  onConnect?: (userId: string) => void;
  onViewProfile?: (userId: string) => void;
  isConnected?: boolean;
  className?: string;
}

export function UserProfileCard({ 
  profile, 
  currentUserId,
  showBio = true,
  showStats = true,
  onMessage,
  onConnect,
  onViewProfile,
  isConnected = false,
  className 
}: UserProfileCardProps) {
  const isOwnProfile = currentUserId === profile.id;

  const getStatusColor = (status: UserProfile['status']) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'studying': return 'bg-blue-400';
      case 'offline': return 'bg-gray-500';
    }
  };

  const getStatusText = (status: UserProfile['status'], lastSeen?: string) => {
    switch (status) {
      case 'online': return 'Active now';
      case 'away': return 'Away';
      case 'studying': return 'Studying';
      case 'offline': return lastSeen || 'Offline';
    }
  };

  const handleCardClick = () => {
    if (!isOwnProfile) {
      onViewProfile?.(profile.id);
    }
  };

  return (
    <Card 
      className={cn(
        "border border-gray-700 bg-[var(--hive-background-primary)] hover:border-gray-600",
        !isOwnProfile && "cursor-pointer hover:bg-gray-850",
        className
      )}
      onClick={handleCardClick}
    >
      <div className="p-4 space-y-4">
        {/* Header with avatar and basic info */}
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-gray-800 text-[var(--hive-text-inverse)]">
                {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Status indicator */}
            <div 
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-gray-900",
                getStatusColor(profile.status)
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="space-y-1">
              <h3 className="font-semibold text-[var(--hive-text-inverse)] text-base truncate">
                {profile.name}
              </h3>
              <p className="text-sm text-gray-400">
                {profile.handle}
              </p>
            </div>

            {/* Academic info */}
            {(profile.major || profile.year) && (
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <GraduationCap className="h-3 w-3" />
                <span>
                  {profile.major}
                  {profile.major && profile.year && ' • '}
                  {profile.year}
                </span>
              </div>
            )}
          </div>

          {/* Status text */}
          <div className="text-right">
            <div className="text-xs text-gray-500">
              {getStatusText(profile.status, profile.lastSeen)}
            </div>
            {profile.isBuilder && (
              <Badge variant="secondary" className="mt-1 text-xs">
                <Zap className="h-2.5 w-2.5 mr-1" />
                Builder
              </Badge>
            )}
          </div>
        </div>

        {/* Bio */}
        {showBio && profile.bio && (
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {profile.bio}
          </p>
        )}

        {/* Location and stats */}
        {(profile.location || showStats) && (
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{profile.location}</span>
              </div>
            )}
            
            {showStats && (
              <>
                {profile.spacesCount !== undefined && (
                  <div>
                    {profile.spacesCount} spaces
                  </div>
                )}
                
                {profile.toolsBuilt !== undefined && profile.toolsBuilt > 0 && (
                  <div>
                    {profile.toolsBuilt} tools built
                  </div>
                )}
                
                {profile.mutualSpaces !== undefined && profile.mutualSpaces > 0 && (
                  <div className="text-amber-400">
                    {profile.mutualSpaces} spaces in common
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Actions - only show for other users */}
        {!isOwnProfile && (onMessage || onConnect) && (
          <div className="flex gap-2 pt-2">
            {onMessage && (
              <ButtonEnhanced
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onMessage(profile.id);
                }}
                className="flex-1"
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Message
              </ButtonEnhanced>
            )}
            
            {onConnect && (
              <ButtonEnhanced
                size="sm"
                variant={isConnected ? "secondary" : "primary"}
                onClick={(e) => {
                  e.stopPropagation();
                  onConnect(profile.id);
                }}
                className="flex-1"
              >
                <UserPlus className="h-3 w-3 mr-1" />
                {isConnected ? "Connected" : "Connect"}
              </ButtonEnhanced>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

// Compact version for lists and smaller spaces
export function UserProfileCardCompact({ profile, onMessage, className }: UserProfileCardProps) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 border-b border-gray-700 hover:bg-gray-800/50",
      className
    )}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-gray-800 text-[var(--hive-text-inverse)] text-xs">
              {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div 
            className={cn(
              "absolute -bottom-0 -right-0 h-2 w-2 rounded-full border border-gray-800",
              getStatusColor(profile.status)
            )}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-[var(--hive-text-inverse)] text-sm truncate">
            {profile.name}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{profile.handle}</span>
            {profile.major && (
              <>
                <div className="h-1 w-1 bg-gray-500 rounded-full" />
                <span>{profile.major}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {onMessage && (
        <ButtonEnhanced
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onMessage(profile.id);
          }}
          className="text-xs px-2"
        >
          <MessageCircle className="h-3 w-3" />
        </ButtonEnhanced>
      )}
    </div>
  );
}

// Helper function (extracted for reuse)
function getStatusColor(status: UserProfile['status']) {
  switch (status) {
    case 'online': return 'bg-green-400';
    case 'away': return 'bg-yellow-400';
    case 'studying': return 'bg-blue-400';
    case 'offline': return 'bg-gray-500';
  }
}