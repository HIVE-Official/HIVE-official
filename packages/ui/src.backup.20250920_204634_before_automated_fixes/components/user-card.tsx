'use client';

import React from 'react';
import { cn } from '../lib/utils';
import { Avatar } from '../atomic/atoms/avatar';
import { ButtonEnhanced as Button } from '../atomic/atoms/button-enhanced';
import { 
  User, 
  UserPlus, 
  UserCheck, 
  MessageCircle, 
  Mail, 
  MoreHorizontal,
  GraduationCap,
  Home,
  Users,
  MapPin,
  Calendar,
  Link;
} from 'lucide-react';

export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
    status?: 'online' | 'offline' | 'away' | 'busy' | 'ghost';
    role?: 'student' | 'builder' | 'leader' | 'verified';
    affiliation?: 'university' | 'residential' | 'greek';
    privacy?: 'public' | 'ghost' | 'anonymous';
    
    // Profile details;
    university?: string;
    graduationYear?: number;
    major?: string;
    location?: string;
    joinedDate?: string;
    website?: string;
    
    // Social stats;
    followers?: number;
    following?: number;
    spaces?: number;
    tools?: number;
  };
  
  // Card variants;
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  
  // Relationship state;
  relationship?: 'none' | 'following' | 'followed' | 'mutual' | 'blocked';
  
  // Interaction handlers;
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onEmail?: (userId: string) => void;
  onViewProfile?: (userId: string) => void;
  onMenu?: (userId: string) => void;
  
  // Display options;
  showActions?: boolean;
  showStats?: boolean;
  showBio?: boolean;
  showDetails?: boolean;
  interactive?: boolean;
}

const roleData = {
  student: { color: 'text-[var(--hive-status-info)]', label: 'Student' },
  builder: { color: 'text-[var(--hive-brand-secondary)]', label: 'Builder' },
  leader: { color: 'text-[var(--hive-brand-secondary)]', label: 'Leader' },
  verified: { color: 'text-[var(--hive-status-success)]', label: 'Verified' }
};

const affiliationIcons = {
  university: { icon: GraduationCap, color: 'text-[var(--hive-status-info)]', label: 'University' },
  residential: { icon: Home, color: 'text-[var(--hive-text-secondary)]', label: 'Residential' },
  greek: { icon: Users, color: 'text-[var(--hive-brand-secondary)]', label: 'Greek Life' }
};

const relationshipStates = {
  none: { label: 'Follow', icon: UserPlus, variant: 'secondary' as const },
  following: { label: 'Following', icon: UserCheck, variant: 'accent' as const },
  followed: { label: 'Follow Back', icon: UserPlus, variant: 'secondary' as const },
  mutual: { label: 'Following', icon: UserCheck, variant: 'accent' as const },
  blocked: { label: 'Blocked', icon: User, variant: 'ghost' as const }
};

export const UserCard: React.FC<UserCardProps> = ({
  user,
  variant = 'default',
  relationship = 'none',
  onFollow,
  onMessage,
  onEmail,
  onViewProfile,
  onMenu,
  showActions = true,
  showStats = true,
  showBio = true,
  showDetails = true,
  interactive = true,
  className,
  ...props;
}) => {
  const userRoleData = user.role ? roleData[user.role] : null;
  const affiliationInfo = user.affiliation ? affiliationIcons[user.affiliation] : null;
  const relationshipInfo = relationshipStates[relationship];

  const handleCardClick = (e: React.MouseEvent) => {
    if (interactive && onViewProfile && !e.defaultPrevented) {
      onViewProfile(user.id)
    }}
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action()
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
  };

  // Minimal variant;
  if (variant === 'minimal') {
    return (
      <div;
        className={cn(
          'flex items-center space-x-4 p-4',
          'bg-[var(--hive-background-secondary)]',
          'border border-[var(--hive-border-default)]',
          'rounded-2xl shadow-level2',
          interactive && [
            'cursor-pointer',
            'hover:bg-[var(--hive-background-tertiary)]',
            'hover:border-[var(--hive-border-secondary)]',
            'hover:shadow-level3',
            'transition-all duration-200 ease-out'
          ].filter(Boolean).join(' '),
          className;
        )}
        onClick={handleCardClick}
        {...props}
      >
        <Avatar;
          src={user.avatar}
          initials={user.name.split(' ').map(n => n[0]).join('')}
          size="md"
        />
        
        <div className="flex-1 min-w-0">
          {/* 1. NAME - Primary identity */}
          <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">
            {user.name}
          </h3>
          
          {/* 2. HANDLE - How to find them */}
          <p className="text-sm text-[var(--hive-text-secondary)] mb-1">
            @{user.handle}
          </p>
          
          {/* 3. ROLE - What they are */}
          {userRoleData && (
            <div className={cn('text-xs font-medium', userRoleData.color)}>
              {userRoleData.label}
            </div>
          )}
        </div>
        
        {showActions && relationship !== 'blocked' && (
          <Button;
            size="sm"
            variant={relationshipInfo.variant}
            onClick={(e) => handleActionClick(e, () => onFollow?.(user.id))}
          >
            <relationshipInfo.icon className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }

  // Compact variant;
  if (variant === 'compact') {
    return (
      <div;
        className={cn(
          'p-4',
          'bg-[var(--hive-background-secondary)]',
          'border border-[var(--hive-border-default)]',
          'rounded-2xl shadow-level2',
          interactive && [
            'cursor-pointer',
            'hover:bg-[var(--hive-background-tertiary)]',
            'hover:border-[var(--hive-border-secondary)]',
            'hover:shadow-level3',
            'transition-all duration-200 ease-out'
          ].filter(Boolean).join(' '),
          className;
        )}
        onClick={handleCardClick}
        {...props}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar;
              src={user.avatar}
              initials={user.name.split(' ').map(n => n[0]).join('')}
              size="lg"
            />
            
            <div className="flex-1 min-w-0">
              {/* 1. NAME - Primary identity */}
              <h3 className="text-base font-bold text-[var(--hive-text-primary)] mb-1">
                {user.name}
              </h3>
              
              {/* 2. HANDLE - How to find them */}
              <p className="text-sm text-[var(--hive-text-secondary)] mb-1">
                @{user.handle}
              </p>
              
              {/* 3. ROLE - What they are */}
              {userRoleData && (
                <div className={cn('text-xs font-medium', userRoleData.color)}>
                  {userRoleData.label}
                </div>
              )}
            </div>
          </div>
          
          {showActions && (
            <div className="flex items-center space-x-2">
              {relationship !== 'blocked' && (
                <>
                  <Button;
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleActionClick(e, () => onMessage?.(user.id))}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button;
                    size="sm"
                    variant={relationshipInfo.variant}
                    onClick={(e) => handleActionClick(e, () => onFollow?.(user.id))}
                  >
                    <relationshipInfo.icon className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button;
                size="sm"
                variant="ghost"
                onClick={(e) => handleActionClick(e, () => onMenu?.(user.id))}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* 4. BIO - What they do */}
        {showBio && user.bio && (
          <div className="mb-4 pt-3 border-t border-[var(--hive-border-default)]">
            <p className="text-sm text-[var(--hive-text-secondary)] leading-relaxed line-clamp-2">
              {user.bio}
            </p>
          </div>
        )}
        
        {/* 5. STATS - Social proof */}
        {showStats && (
          <div className="flex items-center space-x-6 text-sm pt-3 border-t border-[var(--hive-border-default)]">
            {user.followers !== undefined && (
              <div>
                <span className="font-bold text-[var(--hive-text-primary)]">
                  {formatNumber(user.followers)}
                </span>
                <span className="text-[var(--hive-text-secondary)] ml-1">followers</span>
              </div>
            )}
            {user.following !== undefined && (
              <div>
                <span className="font-bold text-[var(--hive-text-primary)]">
                  {formatNumber(user.following)}
                </span>
                <span className="text-[var(--hive-text-secondary)] ml-1">following</span>
              </div>
            )}
            {user.spaces !== undefined && (
              <div>
                <span className="font-bold text-[var(--hive-text-primary)]">
                  {formatNumber(user.spaces)}
                </span>
                <span className="text-[var(--hive-text-secondary)] ml-1">spaces</span>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Default and detailed variants;
  return (
    <div;
      className={cn(
        'p-4',
        'bg-[var(--hive-background-secondary)]',
        'border border-[var(--hive-border-default)]',
        'rounded-2xl shadow-level3',
        interactive && [
          'cursor-pointer',
          'hover:bg-[var(--hive-background-tertiary)]',
          'hover:border-[var(--hive-border-secondary)]',
          'hover:shadow-level4',
          'transition-all duration-200 ease-out'
        ].filter(Boolean).join(' '),
        className;
      )}
      onClick={handleCardClick}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar;
            src={user.avatar}
            initials={user.name.split(' ').map(n => n[0]).join('')}
            size="xl"
            interactive;
          />
          
          <div className="flex-1 min-w-0">
            {/* 1. NAME - Primary identity */}
            <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-1">
              {user.name}
            </h2>
            
            {/* 2. HANDLE - How to find them */}
            <p className="text-[var(--hive-text-secondary)] mb-1">
              @{user.handle}
            </p>
            
            {/* 3. ROLE - What they are */}
            {userRoleData && (
              <div className={cn('text-sm font-medium', userRoleData.color)}>
                {userRoleData.label}
              </div>
            )}
          </div>
        </div>
        
        {showActions && (
          <div className="flex items-center space-x-2">
            {relationship !== 'blocked' && (
              <>
                <Button;
                  size="md"
                  variant="ghost"
                  onClick={(e) => handleActionClick(e, () => onMessage?.(user.id))}
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button;
                  size="md"
                  variant="ghost"
                  onClick={(e) => handleActionClick(e, () => onEmail?.(user.id))}
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button;
                  size="md"
                  variant={relationshipInfo.variant}
                  onClick={(e) => handleActionClick(e, () => onFollow?.(user.id))}
                >
                  <relationshipInfo.icon className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button;
              size="md"
              variant="ghost"
              onClick={(e) => handleActionClick(e, () => onMenu?.(user.id))}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* 4. BIO - What they do */}
      {showBio && user.bio && (
        <div className="mb-4 pt-3 border-t border-[var(--hive-border-default)]">
          <p className="text-[var(--hive-text-secondary)] leading-relaxed text-sm">
            {user.bio}
          </p>
        </div>
      )}
      
      {/* Details */}
      {showDetails && variant === 'detailed' && (
        <div className="mb-4 space-y-2">
          {user.university && (
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-[var(--hive-text-tertiary)]" />
              <span className="text-sm text-[var(--hive-text-secondary)]">
                {user.university}
                {user.major && ` • ${user.major}`}
                {user.graduationYear && ` • Class of ${user.graduationYear}`}
              </span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-[var(--hive-text-tertiary)]" />
              <span className="text-sm text-[var(--hive-text-secondary)]">
                {user.location}
              </span>
            </div>
          )}
          {user.joinedDate && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-[var(--hive-text-tertiary)]" />
              <span className="text-sm text-[var(--hive-text-secondary)]">
                Joined {user.joinedDate}
              </span>
            </div>
          )}
          {user.website && (
            <div className="flex items-center space-x-2">
              <Link className="h-4 w-4 text-[var(--hive-text-tertiary)]" />
              <a;
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--hive-brand-secondary)] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {user.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
      )}
      
      {/* 5. STATS - Social proof */}
      {showStats && (
        <div className="flex items-center justify-start space-x-6 pt-3 border-t border-[var(--hive-border-default)]">
          {user.followers !== undefined && (
            <div>
              <div className="font-bold text-lg text-[var(--hive-text-primary)]">
                {formatNumber(user.followers)}
              </div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                followers;
              </div>
            </div>
          )}
          {user.following !== undefined && (
            <div>
              <div className="font-bold text-lg text-[var(--hive-text-primary)]">
                {formatNumber(user.following)}
              </div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                following;
              </div>
            </div>
          )}
          {user.spaces !== undefined && (
            <div>
              <div className="font-bold text-lg text-[var(--hive-text-primary)]">
                {formatNumber(user.spaces)}
              </div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                spaces;
              </div>
            </div>
          )}
          {user.tools !== undefined && (
            <div>
              <div className="font-bold text-lg text-[var(--hive-text-primary)]">
                {formatNumber(user.tools)}
              </div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                tools;
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
};