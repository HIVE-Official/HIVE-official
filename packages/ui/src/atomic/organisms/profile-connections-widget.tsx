'use client';

import React, { useState } from 'react';
import { Card } from '../atoms/card';
import { Avatar } from '../atoms/avatar';
import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button';
import {
  Users,
  UserPlus,
  Heart,
  Link,
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff,
  Star,
  Shield
} from 'lucide-react';
import { PrivacyControl, type PrivacyLevel } from '../molecules/privacy-control';
import { PresenceIndicator, type PresenceStatus } from '../atoms/presence-indicator';

export interface Connection {
  id: string;
  name: string;
  avatarUrl?: string;
  major?: string;
  academicYear?: string;
  isFriend: boolean;
  mutualSpaces: number;
  connectionStrength: number; // 0-100
  lastInteraction?: Date;
  isOnline?: boolean;
  presenceStatus?: PresenceStatus;
  lastSeen?: Date;
}

export interface MyConnectionsWidgetProps {
  connections: Connection[];
  pendingFriendRequests?: number;
  isOwnProfile?: boolean;
  privacyLevel?: PrivacyLevel;
  onPrivacyChange?: (level: PrivacyLevel) => void;
  onConnectionClick?: (connectionId: string) => void;
  onViewAll?: () => void;
  onManageFriends?: () => void;
  className?: string;
}

/**
 * My Connections Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - Two-layer social graph visualization
 * - Gold accent for friends (inner circle)
 * - Connection strength algorithm visualization
 * - Mobile-optimized grid layout
 */
export const MyConnectionsWidget: React.FC<MyConnectionsWidgetProps> = ({
  connections = [],
  pendingFriendRequests = 0,
  isOwnProfile = false,
  privacyLevel = 'public',
  onPrivacyChange,
  onConnectionClick,
  onViewAll,
  onManageFriends,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'all' | 'friends'>('all');

  const friends = connections.filter(c => c.isFriend);
  const displayConnections = viewMode === 'friends' ? friends : connections;

  const getConnectionStrengthColor = (strength: number) => {
    if (strength >= 70) return 'border-[#FFD700]';
    if (strength >= 40) return 'border-white/40';
    return 'border-white/16';
  };

  const formatLastInteraction = (date?: Date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
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
          <h3 className="text-lg font-medium text-white">My Connections</h3>
          <Badge variant="secondary" className="bg-gray-900 text-gray-300">
            {connections.length}
          </Badge>
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

      {/* Two-Layer Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('all')}
          className={`
            flex-1 py-2 px-3
            text-sm font-medium
            rounded-lg transition-all duration-200
            min-h-[44px]
            ${viewMode === 'all'
              ? 'bg-gray-800 text-white border border-white/16'
              : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
            }
          `}
        >
          <div className="flex items-center justify-center gap-2">
            <Link className="w-3.5 h-3.5" />
            <span>All Connections</span>
            <Badge variant="secondary" className="bg-black/50 text-gray-300 text-xs">
              {connections.length}
            </Badge>
          </div>
        </button>

        <button
          onClick={() => setViewMode('friends')}
          className={`
            flex-1 py-2 px-3
            text-sm font-medium
            rounded-lg transition-all duration-200
            min-h-[44px]
            ${viewMode === 'friends'
              ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20'
              : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
            }
          `}
        >
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-3.5 h-3.5" />
            <span>Friends</span>
            <Badge variant="secondary" className="bg-black/50 text-[#FFD700] text-xs">
              {friends.length}
            </Badge>
          </div>
        </button>
      </div>

      {/* Pending Friend Requests Alert */}
      {isOwnProfile && pendingFriendRequests > 0 && (
        <button
          onClick={onManageFriends}
          className="
            w-full p-3
            bg-[#FFD700]/10 hover:bg-[#FFD700]/20
            border border-[#FFD700]/20 hover:border-[#FFD700]/30
            rounded-lg
            transition-all duration-200
            flex items-center justify-between
            group
          "
        >
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#FFD700]" />
            <span className="text-sm text-[#FFD700]">
              {pendingFriendRequests} pending friend request{pendingFriendRequests !== 1 ? 's' : ''}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#FFD700] opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      )}

      {/* Connections Grid */}
      <div className="space-y-2">
        {displayConnections.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400">
              {viewMode === 'friends' ? 'No friends yet' : 'No connections yet'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {viewMode === 'friends'
                ? 'Send friend requests to your closest connections'
                : 'Connect with people in your spaces'}
            </p>
          </div>
        ) : (
          displayConnections.slice(0, 8).map((connection) => (
            <button
              key={connection.id}
              onClick={() => onConnectionClick?.(connection.id)}
              className="
                group w-full
                flex items-center gap-3
                p-3 -m-3
                hover:bg-white/[0.02]
                rounded-lg
                transition-all duration-200
              "
            >
              {/* Avatar with Connection Strength */}
              <div className="relative">
                <div className={`p-0.5 rounded-full ${getConnectionStrengthColor(connection.connectionStrength)}`}>
                  <Avatar
                    className="w-10 h-10"
                  >
                    {connection.avatarUrl && (
                      <img
                        src={connection.avatarUrl}
                        alt={connection.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </Avatar>
                </div>

                {/* Presence Indicator */}
                {connection.presenceStatus && (
                  <div className="absolute -bottom-1 -right-1">
                    <PresenceIndicator
                      status={connection.presenceStatus}
                      size="sm"
                      lastSeen={connection.lastSeen}
                    />
                  </div>
                )}

                {/* Friend Badge */}
                {connection.isFriend && (
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-[#FFD700] rounded-full p-0.5">
                      <Heart className="w-2.5 h-2.5 text-black fill-black" />
                    </div>
                  </div>
                )}
              </div>

              {/* Connection Info */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white truncate">
                    {connection.name}
                  </p>
                  {connection.connectionStrength >= 70 && (
                    <Sparkles className="w-3 h-3 text-[#FFD700]" />
                  )}
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                  {connection.major && (
                    <span className="text-xs text-gray-400 truncate">
                      {connection.major}
                    </span>
                  )}
                  {connection.mutualSpaces > 0 && (
                    <>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {connection.mutualSpaces} shared space{connection.mutualSpaces !== 1 ? 's' : ''}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Connection Strength Indicator */}
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-500">
                  {formatLastInteraction(connection.lastInteraction)}
                </div>
                {connection.connectionStrength >= 40 && (
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-3 rounded-sm ${
                            connection.connectionStrength > (i + 1) * 33
                              ? 'bg-[#FFD700]'
                              : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hover Arrow */}
              <ChevronRight className="
                w-4 h-4 text-gray-600
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
              " />
            </button>
          ))
        )}
      </div>

      {/* View All Button */}
      {displayConnections.length > 8 && onViewAll && (
        <button
          onClick={onViewAll}
          className="
            w-full py-3 px-4
            bg-gray-900 hover:bg-gray-800
            text-sm text-gray-300 hover:text-white
            rounded-lg
            transition-all duration-200
            flex items-center justify-center gap-2
            min-h-[44px]
          "
        >
          View all {viewMode === 'friends' ? 'friends' : 'connections'}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Social Graph Stats */}
      <div className="pt-4 border-t border-white/8 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">Trust Network</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-300">
              {friends.length} close friends
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-400">
              {connections.filter(c => c.connectionStrength >= 70).length} strong bonds
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};