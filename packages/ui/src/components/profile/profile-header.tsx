'use client';

import React from 'react';
import { ProfileHeaderProps } from './types';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { User, Edit3, Shield, Award, Calendar, MapPin, Mail, GraduationCap, Settings } from 'lucide-react';

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  showOnboarding = false,
  showPrivacyBanner = false,
  showGraduationBanner = false,
  completionStatus,
  onEditProfile,
  onPrivacySettings
}) => {
  return (
    <HiveCard className="p-6 border-hive-gold/20">
      {/* Banners */}
      {showGraduationBanner && (
        <div className="mb-4 p-3 bg-gradient-to-r from-hive-gold/20 to-yellow-400/20 rounded-lg border border-hive-gold/30">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            <span className="text-[var(--hive-text-primary)] font-medium">Graduation in 3 weeks! 🎓</span>
          </div>
        </div>
      )}

      {showPrivacyBanner && (
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-[var(--hive-text-primary)] font-medium">Ghost Mode Active - Limited visibility</span>
          </div>
        </div>
      )}

      {/* Profile Completion */}
      {showOnboarding && completionStatus && (
        <div className="mb-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[var(--hive-text-primary)] font-medium">Profile {completionStatus.percentage}% complete</span>
              <p className="text-sm text-gray-400">Add {completionStatus.missing.join(', ')} to unlock full features</p>
            </div>
            <HiveButton size="sm" onClick={onEditProfile}>
              Complete Profile
            </HiveButton>
          </div>
        </div>
      )}

      {/* Main Profile Info */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="relative">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-hive-gold/30"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-hive-gold to-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-[var(--hive-background-primary)]">
              {user.fullName?.[0] || user.email?.[0] || 'U'}
            </div>
          )}
          
          {/* Online Status */}
          {user.onlineStatus === 'online' && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[var(--hive-border-default)]" />
          )}
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">{user.fullName}</h1>
            {user.isBuilder && (
              <HiveBadge variant="active-tag" className="text-xs">
                {user.builderLevel || 'Builder'}
              </HiveBadge>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-[var(--hive-brand-secondary)] font-medium">@{user.handle}</span>
            {user.isPublic && (
              <HiveBadge variant="skill-tag" className="text-xs">
                Public
              </HiveBadge>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-gray-300 mb-3 max-w-2xl">{user.bio}</p>
          )}

          {/* Profile Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {user.email && (
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            )}
            
            {user.major && (
              <div className="flex items-center gap-2 text-gray-400">
                <GraduationCap className="h-4 w-4" />
                <span>{user.major}</span>
              </div>
            )}
            
            {user.school && (
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{user.school}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>Joined {new Date(user.memberSince).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Interests */}
          {user.interests.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <HiveBadge key={interest} variant="skill-tag" className="text-xs">
                    {interest}
                  </HiveBadge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <HiveButton 
            variant="outline" 
            size="sm" 
            onClick={onEditProfile}
            className="flex items-center gap-2"
          >
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </HiveButton>
          
          <HiveButton 
            variant="ghost" 
            size="sm" 
            onClick={onPrivacySettings}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </HiveButton>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-hive-border-secondary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-[var(--hive-text-primary)]">{user.stats.totalSpaces}</div>
            <div className="text-sm text-gray-400">Spaces</div>
          </div>
          <div>
            <div className="text-xl font-bold text-[var(--hive-text-primary)]">{user.stats.connectionsCount}</div>
            <div className="text-sm text-gray-400">Connections</div>
          </div>
          <div>
            <div className="text-xl font-bold text-[var(--hive-text-primary)]">{user.stats.streakDays}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
          <div>
            <div className="text-xl font-bold text-[var(--hive-text-primary)]">{user.stats.toolsCreated}</div>
            <div className="text-sm text-gray-400">Tools Created</div>
          </div>
        </div>
      </div>
    </HiveCard>
  );
};

export default ProfileHeader;