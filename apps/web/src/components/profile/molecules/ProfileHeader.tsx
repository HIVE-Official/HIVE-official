"use client";

import React from 'react';
import { Edit3, MapPin, School, Calendar } from 'lucide-react';
import { ProfileAvatar } from '../atoms/ProfileAvatar';

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
    location?: string;
    school?: string;
    major?: string;
    year?: string;
    joinedAt?: string;
    status?: 'online' | 'offline' | 'busy' | 'away' | 'studying';
  };
  completionPercentage: number;
  isOnline: boolean;
  onEdit?: () => void;
  onAvatarChange?: (file: File) => void;
  className?: string;
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-hive-text-disabled',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
  studying: 'bg-hive-brand-secondary'
};

const statusLabels = {
  online: 'Online',
  offline: 'Offline', 
  busy: 'Busy',
  away: 'Away',
  studying: 'Studying'
};

export function ProfileHeader({ 
  user, 
  completionPercentage, 
  onEdit, 
  onAvatarChange,
  className = '' 
}: ProfileHeaderProps) {
  const statusColor = statusColors[user.status || 'offline'];
  const statusLabel = statusLabels[user.status || 'offline'];
  
  const joinedDate = user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : '';

  return (
    <div className={`
      p-4 sm:p-6 rounded-xl border border-hive-border-subtle
      bg-gradient-to-br from-hive-background-secondary/80 to-hive-background-secondary/40
      backdrop-blur-sm
      ${className}
    `}>
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Avatar with Status */}
        <div className="relative">
          <ProfileAvatar
            user={user}
            className="max-w-lg"
            isEditable={!!onAvatarChange}
            onAvatarChange={onAvatarChange}
          />
          <div className={`
            absolute -bottom-1 -right-1 w-6 h-6 
            ${statusColor} border-2 border-hive-background-primary
            rounded-full
          `} title={statusLabel} />
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-hive-text-primary mb-1">
                {user.name}
              </h1>
              <p className="text-sm sm:text-base text-hive-brand-secondary font-medium mb-2">
                @{user.handle}
              </p>
            </div>
            
            {onEdit && (
              <button
                onClick={onEdit}
                className="
                  p-3 sm:p-2 rounded-lg border border-hive-border-subtle
                  hover:border-hive-border-focus hover:bg-hive-background-secondary
                  transition-all text-hive-text-secondary hover:text-hive-text-primary
                  touch-manipulation active:scale-95 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px]
                  flex items-center justify-center
                "
              >
                <Edit3 className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm sm:text-base text-hive-text-secondary mb-3 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Academic & Location Info */}
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-hive-text-secondary mb-3">
            {user.major && user.year && (
              <div className="flex items-center gap-1">
                <School className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{user.major} • {user.year}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{user.location}</span>
              </div>
            )}
            {joinedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Joined {joinedDate}</span>
              </div>
            )}
          </div>

          {/* Profile Completion */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 max-w-40 sm:max-w-48">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-hive-text-secondary">Profile</span>
                <span className="text-hive-text-primary font-medium">{completionPercentage}%</span>
              </div>
              <div className="h-2 bg-hive-background-primary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-hive-brand-secondary to-hive-gold transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            
            {completionPercentage < 100 && (
              <button
                onClick={onEdit}
                className="text-xs text-hive-brand-secondary hover:text-hive-brand-hover font-medium touch-manipulation p-1 -m-1"
              >
                Complete Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}