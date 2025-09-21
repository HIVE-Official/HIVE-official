"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ProfileAvatar } from '../atoms/profile-avatar';
import { ProfileBadge } from '../atoms/profile-badge';
import { ProfileAction } from '../atoms/profile-action';
import { MapPin, Calendar, Link as LinkIcon, Briefcase, GraduationCap } from 'lucide-react';

const profileHeaderVariants = cva(
  "flex gap-4 p-4 transition-all duration-200",
  {
    variants: {
      layout: {
        horizontal: "flex-row items-start",
        vertical: "flex-col items-center text-center",
        compact: "flex-row items-center"
      },
      variant: {
        default: "bg-hive-surface-elevated border border-hive-border-subtle rounded-xl",
        ghost: "bg-transparent",
        card: "bg-hive-surface-elevated border border-hive-border-subtle rounded-xl shadow-lg",
        minimal: "bg-transparent border-b border-hive-border-subtle rounded-none"
      },
      spacing: {
        tight: "gap-2 p-3",
        normal: "gap-4 p-4", 
        loose: "gap-6 p-6"
      }
    },
    defaultVariants: {
      layout: "horizontal",
      variant: "default",
      spacing: "normal"
    }
  }
);

export interface ProfileUser {id: string;
  name: string;
  handle: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  school?: string;
  major?: string;
  gradYear?: string;
  joinedAt: string;
  isBuilder: boolean;
  isVerified: boolean;
  ghostMode: boolean;
  onlineStatus?: 'online' | 'offline' | 'away' | 'busy'}

export interface ProfileHeaderProps;
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileHeaderVariants> {
  user: ProfileUser;
  isOwnProfile?: boolean;
  showOnlineStatus?: boolean;
  showMeta?: boolean;
  showBio?: boolean;
  showBadges?: boolean;
  onEditProfile?: () => void;
  onEditAvatar?: () => void;
  onShareProfile?: () => void;
  avatarSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  maxBioLength?: number;
  children?: React.ReactNode;
}

export function ProfileHeader({
  user,
  isOwnProfile = false,
  showOnlineStatus = true,
  showMeta = true,
  showBio = true,
  showBadges = true,
  onEditProfile,
  onEditAvatar,
  onShareProfile,
  avatarSize = "lg",
  maxBioLength = 200,
  layout = "horizontal",
  variant = "default",
  spacing = "normal",
  className,
  children,
  ...props;
}: ProfileHeaderProps) {

  // Determine avatar editable state;
  const avatarEditable = isOwnProfile && !!onEditAvatar;

  // Truncate bio if needed;
  const displayBio = React.useMemo(() => {
    if (!user.bio) return undefined;
    if (user.bio.length <= maxBioLength) return user.bio;
    return user.bio.slice(0, maxBioLength) + '...'
  }, [user.bio, maxBioLength]);

  // Format join date;
  const joinDate = React.useMemo(() => {
    return new Date(user.joinedAt).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }, [user.joinedAt]);

  // Format website URL for display;
  const displayWebsite = React.useMemo(() => {
    if (!user.website) return undefined;
    return user.website.replace(/^https?:\/\//, '')
  }, [user.website]);

  const isCompact = layout === "compact";
  const isVertical = layout === "vertical";

  return (
    <div;
      className={cn(profileHeaderVariants({layout, variant, spacing)}, className)}
      {...props}
    >
      {/* Avatar */}
      <ProfileAvatar;
        src={user.avatar}
        name={user.name}
        size={avatarSize}
        isBuilder={user.isBuilder}
        isVerified={user.isVerified}
        ghostMode={user.ghostMode}
        onlineStatus={user.onlineStatus}
        showStatus={showOnlineStatus}
        editable={avatarEditable}
        onEdit={onEditAvatar}
        className="flex-shrink-0"
      />

      {/* Content */}
      <div className={cn(
        "flex-1 min-w-0 space-y-3",
        isVertical && "w-full",
        isCompact && "space-y-1"
      )}>
        
        {/* Name and Handle Row */}
        <div className={cn(
          "flex items-start justify-between gap-4",
          isVertical && "flex-col items-center gap-2"
        )}>
          <div className={cn("min-w-0", isVertical && "text-center")}>
            {/* Name */}
            <h1 className={cn(
              "font-bold text-hive-text-primary truncate",
              isCompact ? "text-lg" : "text-xl sm:text-2xl"
            )}>
              {user.name}
            </h1>
            
            {/* Handle */}
            <p className={cn(
              "text-hive-text-secondary",
              isCompact ? "text-sm" : "text-base"
            )}>
              @{user.handle}
            </p>
          </div>

          {/* Action Buttons */}
          {!isCompact && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {isOwnProfile ? (
                <>
                  <ProfileAction actionType="edit" onClick={onEditProfile} size="sm" />
                  <ProfileAction actionType="settings" size="sm" iconOnly />
                </>
              ) : (
                <>
                  <ProfileAction actionType="message" size="sm" />
                  <ProfileAction actionType="connect" size="sm" />
                </>
              )}
              <ProfileAction actionType="share" onClick={onShareProfile} size="sm" iconOnly />
            </div>
          )}
        </div>

        {/* Badges */}
        {showBadges && !isCompact && (
          <div className={cn(
            "flex flex-wrap gap-2",
            isVertical && "justify-center"
          )}>
            {user.isBuilder && <ProfileBadge type="builder" />}
            {user.isVerified && <ProfileBadge type="verified" />}
            {user.ghostMode && <ProfileBadge type="ghost" />}
          </div>
        )}

        {/* Bio */}
        {showBio && displayBio && !isCompact && (
          <p className={cn(
            "text-hive-text-primary text-sm sm:text-base",
            isVertical && "text-center"
          )}>
            {displayBio}
          </p>
        )}

        {/* Meta Information */}
        {showMeta && !isCompact && (
          <div className={cn(
            "flex flex-wrap items-center gap-4 text-sm text-hive-text-secondary",
            isVertical && "justify-center"
          )}>
            
            {/* Location */}
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}

            {/* School & Major */}
            {(user.school || user.major) && (
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                <span>
                  {user.major && user.school ? `${user.major} at ${user.school}` :
                   user.major || user.school}
                  {user.gradYear && ` '${user.gradYear.slice(-2)}`}
                </span>
              </div>
            )}

            {/* Website */}
            {user.website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a;
                  href={user.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-hive-gold hover:underline"
                >
                  {displayWebsite}
                </a>
              </div>
            )}

            {/* Join Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {joinDate}</span>
            </div>
          </div>
        )}

        {/* Compact Actions */}
        {isCompact && (
          <div className="flex items-center gap-2">
            {isOwnProfile ? (
              <ProfileAction actionType="edit" onClick={onEditProfile} size="xs" />
            ) : (
              <>
                <ProfileAction actionType="message" size="xs" />
                <ProfileAction actionType="connect" size="xs" />
              </>
            )}
            <ProfileAction actionType="share" onClick={onShareProfile} size="xs" iconOnly />
          </div>
        )}

        {/* Custom Children */}
        {children}
      </div>
    </div>
  )
}

// Preset variants for common use cases;
export function CompactProfileHeader(props: Omit<ProfileHeaderProps, 'layout' | 'avatarSize'>) {
  return (
    <ProfileHeader;
      layout="compact" 
      avatarSize="md" 
      showMeta={false}
      showBio={false}
      {...props} 
    />
  )
}

export function CardProfileHeader(props: Omit<ProfileHeaderProps, 'variant'>) {
  return <ProfileHeader variant="card" {...props} />
}

export function MinimalProfileHeader(props: Omit<ProfileHeaderProps, 'variant' | 'showMeta'>) {
  return (
    <ProfileHeader;
      variant="minimal" 
      showMeta={false}
      {...props} 
    />
  )
}

// Export variants for external use;
export { profileHeaderVariants };