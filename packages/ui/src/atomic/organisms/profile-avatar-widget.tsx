'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Avatar } from '../atoms/avatar';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { 
  Camera, 
  Edit3, 
  MapPin, 
  GraduationCap, 
  Calendar,
  Users,
  Star,
  Award,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';

export interface ProfileAvatarWidgetProps {
  user: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    major?: string;
    year?: string;
    residence?: string;
    bio?: string;
    isOnline?: boolean;
    lastSeen?: string;
    profileViews?: number;
    achievements?: number;
    connections?: number;
    isGhostMode?: boolean;
  };
  isEditable?: boolean;
  onEditProfile?: () => void;
  onUploadPhoto?: () => void;
  onToggleVisibility?: () => void;
  onViewProfile?: () => void;
  className?: string;
}

export const ProfileAvatarWidget: React.FC<ProfileAvatarWidgetProps> = ({
  user,
  isEditable = true,
  onEditProfile,
  onUploadPhoto,
  onToggleVisibility,
  onViewProfile,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]',
        isHovered && 'scale-[1.02]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text variant="body-sm" color="gold" weight="medium">
              Profile Identity
            </Text>
            {user.isGhostMode && (
              <Badge variant="outline" className="text-xs">
                <EyeOff className="h-3 w-3 mr-1" />
                Ghost Mode
              </Badge>
            )}
          </div>
          {isEditable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEditProfile}
              className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Avatar Section */}
        <div className="relative group">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar
                src={user.avatar}
                alt={user.name}
                fallback={user.name.split(' ').map(n => n[0]).join('')}
                size="lg"
                className="ring-2 ring-[var(--hive-border-primary)] ring-offset-2 ring-offset-[var(--hive-background-primary)]"
              />
              
              {/* Online Status Indicator */}
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[var(--hive-background-primary)] rounded-full" />
              )}
              
              {/* Photo Upload Overlay */}
              {isEditable && (
                <div 
                  className={cn(
                    'absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer transition-opacity',
                    'opacity-0 group-hover:opacity-100'
                  )}
                  onClick={onUploadPhoto}
                >
                  <Camera className="h-5 w-5 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Text 
                  variant="heading-sm" 
                  color="primary" 
                  className="truncate"
                >
                  {user.name}
                </Text>
                {user.achievements && user.achievements > 10 && (
                  <Award className="h-4 w-4 text-[var(--hive-gold)]" />
                )}
              </div>
              <Text 
                variant="body-sm" 
                color="secondary" 
                className="truncate"
              >
                @{user.handle}
              </Text>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-1 mt-1">
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  user.isOnline ? 'bg-green-500' : 'bg-[var(--hive-text-muted)]'
                )} />
                <Text variant="body-xs" color="secondary">
                  {user.isOnline ? 'Online' : user.lastSeen}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-6">
            {user.major && (
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <GraduationCap className="h-4 w-4 text-[var(--hive-text-secondary)] flex-shrink-0" />
                <Text variant="body-sm" color="primary" className="truncate">
                  {user.major}
                </Text>
              </div>
            )}
            
            {user.year && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--hive-text-secondary)]" />
                <Text variant="body-sm" color="secondary">
                  {user.year}
                </Text>
              </div>
            )}
          </div>

          {user.residence && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" color="secondary">
                {user.residence}
              </Text>
            </div>
          )}
        </div>

        {/* Bio Section */}
        {user.bio && (
          <div className="space-y-2">
            <Text 
              variant="body-sm" 
              color="primary" 
              className="line-clamp-3 leading-relaxed"
            >
              {user.bio}
            </Text>
          </div>
        )}

        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[var(--hive-border-primary)]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Eye className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {user.profileViews?.toLocaleString() || '0'}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Profile Views
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {user.connections?.toLocaleString() || '0'}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Connections
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-3 w-3 text-[var(--hive-gold)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {user.achievements?.toLocaleString() || '0'}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Achievements
            </Text>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {onViewProfile && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewProfile}
              className="flex-1"
            >
              <Eye className="h-3 w-3 mr-1" />
              View Profile
            </Button>
          )}
          
          {isEditable && onEditProfile && (
            <Button
              variant="default"
              size="sm"
              onClick={onEditProfile}
              className="flex-1"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              Edit Profile
            </Button>
          )}
          
          {isEditable && onToggleVisibility && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleVisibility}
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              {user.isGhostMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          )}
        </div>

      </CardContent>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--hive-gold)]/5 to-[var(--hive-brand-secondary)]/5 rounded-lg blur-xl" />
      )}
    </Card>
  );
};