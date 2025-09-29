'use client';

import React from 'react';
import { Card } from '../atoms/card';
import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button';
import {
  Users,
  Lock,
  Unlock,
  Crown,
  Star,
  TrendingUp,
  Activity,
  ChevronRight,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';
import { PrivacyControl, type PrivacyLevel } from '../molecules/privacy-control';

export interface SpaceInfo {
  id: string;
  name: string;
  type: 'social' | 'academic' | 'event' | 'housing';
  memberCount: number;
  role: 'member' | 'moderator' | 'leader';
  isPrivate: boolean;
  lastActivity?: Date;
  activityLevel: 'high' | 'medium' | 'low';
  unreadCount?: number;
}

export interface MySpacesWidgetProps {
  spaces: SpaceInfo[];
  isOwnProfile?: boolean;
  privacyLevel?: PrivacyLevel;
  onPrivacyChange?: (level: PrivacyLevel) => void;
  onSpaceClick?: (spaceId: string) => void;
  onExploreSpaces?: () => void;
  className?: string;
}

/**
 * My Spaces Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - Luxury card design with subtle depth
 * - Gold accent for leadership/special roles
 * - 8px grid spacing
 * - Mobile-optimized cards
 */
export const MySpacesWidget: React.FC<MySpacesWidgetProps> = ({
  spaces = [],
  isOwnProfile = false,
  privacyLevel = 'public',
  onPrivacyChange,
  onSpaceClick,
  onExploreSpaces,
  className = ''
}) => {
  const getSpaceTypeColor = (type: SpaceInfo['type']) => {
    switch (type) {
      case 'academic':
        return 'text-blue-400';
      case 'social':
        return 'text-[#FFD700]';
      case 'event':
        return 'text-green-400';
      case 'housing':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getActivityIndicator = (level: SpaceInfo['activityLevel']) => {
    switch (level) {
      case 'high':
        return { color: 'bg-green-500', pulse: true };
      case 'medium':
        return { color: 'bg-[#FFD700]', pulse: false };
      case 'low':
        return { color: 'bg-gray-500', pulse: false };
    }
  };

  return (
    <Card
      className={`
        relative overflow-hidden
        bg-black border border-white/8
        p-6 space-y-4
        transition-all duration-300
        hover:border-white/16
        ${className}
      `}
    >
      {/* Header with Privacy Control */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-900 rounded-lg">
            <Users className="w-4 h-4 text-[#FFD700]" />
          </div>
          <h3 className="text-lg font-medium text-white">My Spaces</h3>
          {spaces.length > 0 && (
            <Badge variant="secondary" className="bg-gray-900 text-gray-300">
              {spaces.length}
            </Badge>
          )}
        </div>

        {isOwnProfile && onPrivacyChange && (
          <PrivacyControl
            level={privacyLevel}
            onLevelChange={onPrivacyChange}
            compact
            className="backdrop-blur-sm"
          />
        )}
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {spaces.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <Users className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No spaces joined yet</p>
            {isOwnProfile && (
              <button
                onClick={onExploreSpaces}
                className="
                  mt-4 px-4 py-2
                  bg-[#FFD700] hover:bg-[#FFD700]/90
                  text-black font-medium text-sm
                  rounded-lg
                  transition-all duration-200
                  min-h-[44px]
                "
              >
                Explore Spaces
              </button>
            )}
          </div>
        ) : (
          spaces.slice(0, 6).map((space) => {
            const activityIndicator = getActivityIndicator(space.activityLevel);

            return (
              <button
                key={space.id}
                onClick={() => onSpaceClick?.(space.id)}
                className="
                  group relative
                  bg-gray-900 hover:bg-gray-800
                  border border-white/8 hover:border-white/16
                  rounded-lg p-4
                  transition-all duration-200
                  text-left
                  min-h-[88px]
                "
              >
                {/* Leadership Badge */}
                {space.role === 'leader' && (
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-[#FFD700] rounded-full p-1">
                      <Crown className="w-3 h-3 text-black" />
                    </div>
                  </div>
                )}

                {/* Space Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white truncate">
                      {space.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {space.isPrivate ? (
                        <Lock className="w-3 h-3 text-gray-500" />
                      ) : (
                        <Unlock className="w-3 h-3 text-gray-500" />
                      )}
                      <span className={`text-xs ${getSpaceTypeColor(space.type)}`}>
                        {space.type}
                      </span>
                    </div>
                  </div>

                  {/* Activity Indicator */}
                  <div className="relative">
                    <div
                      className={`
                        w-2 h-2 rounded-full
                        ${activityIndicator.color}
                        ${activityIndicator.pulse ? 'animate-pulse' : ''}
                      `}
                    />
                    {space.unreadCount && space.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1">
                        <div className="bg-[#FFD700] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                          {space.unreadCount > 9 ? '9+' : space.unreadCount}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Space Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-400">
                        {space.memberCount}
                      </span>
                    </div>

                    {space.role === 'moderator' && (
                      <Star className="w-3 h-3 text-[#FFD700]" />
                    )}
                  </div>

                  <ChevronRight className="
                    w-4 h-4 text-gray-600
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                  " />
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Explore More Spaces */}
      {spaces.length > 0 && onExploreSpaces && (
        <button
          onClick={onExploreSpaces}
          className="
            w-full py-3 px-4
            bg-gray-900 hover:bg-gray-800
            border border-dashed border-white/8 hover:border-white/16
            text-sm text-gray-300 hover:text-white
            rounded-lg
            transition-all duration-200
            flex items-center justify-center gap-2
            min-h-[44px]
          "
        >
          <Plus className="w-4 h-4" />
          Discover more spaces
        </button>
      )}

      {/* Space Leadership Stats */}
      {spaces.some(s => s.role === 'leader' || s.role === 'moderator') && (
        <div className="pt-4 border-t border-white/8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#FFD700]" />
              <span className="text-xs text-gray-400">Leadership</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#FFD700] font-medium">
                {spaces.filter(s => s.role === 'leader').length} leading
              </span>
              {spaces.some(s => s.role === 'moderator') && (
                <>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-300">
                    {spaces.filter(s => s.role === 'moderator').length} moderating
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};