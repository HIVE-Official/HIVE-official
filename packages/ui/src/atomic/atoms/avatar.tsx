'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { User, Check, Star, Crown, Eye, GraduationCap, Home, Users } from 'lucide-react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'ghost';
  initials?: string;
  placeholder?: React.ReactNode;
  interactive?: boolean;
  // Social platform roles & indicators
  role?: 'student' | 'builder' | 'leader' | 'verified';
  affiliation?: 'university' | 'residential' | 'greek';
  privacy?: 'public' | 'ghost' | 'anonymous';
  showBadge?: boolean;
}

const avatarSizes = {
  xs: 'h-6 w-6 text-xs',      // 24px
  sm: 'h-8 w-8 text-sm',      // 32px
  md: 'h-10 w-10 text-base',  // 10
  lg: 'h-12 w-12 text-lg',    // 48px
  xl: 'h-16 w-16 text-xl',    // 64px
  '2xl': 'h-20 w-20 text-2xl' // 80px
};

const statusColors = {
  online: 'bg-[var(--hive-status-success)] border-[var(--hive-status-success)]',
  offline: 'bg-[var(--hive-background-tertiary)] border-[var(--hive-border-default)]', 
  away: 'bg-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)]',
  busy: 'bg-[var(--hive-status-error)] border-[var(--hive-status-error)]',
  ghost: 'bg-[var(--hive-text-tertiary)] border-[var(--hive-text-tertiary)]'
};

const roleBadges = {
  student: { icon: GraduationCap, color: 'text-[var(--hive-status-info)]' },
  builder: { icon: Star, color: 'text-[var(--hive-brand-secondary)]' },
  leader: { icon: Crown, color: 'text-[var(--hive-brand-secondary)]' },
  verified: { icon: Check, color: 'text-[var(--hive-status-success)]' }
};

const affiliationBadges = {
  university: { icon: GraduationCap, color: 'text-[var(--hive-status-info)]' },
  residential: { icon: Home, color: 'text-[var(--hive-text-secondary)]' },
  greek: { icon: Users, color: 'text-[var(--hive-brand-secondary)]' }
};

const statusSizes = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5', 
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
  '2xl': 'h-4 w-4'
};

const badgeSizes = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
  '2xl': 'h-7 w-7'
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  status,
  initials,
  placeholder,
  interactive = false,
  role,
  affiliation,
  privacy = 'public',
  showBadge = true,
  className,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const baseClasses = [
    'relative inline-flex items-center justify-center',
    'rounded-2xl', // Card shape with chip feel
    'bg-[var(--hive-background-tertiary)]',
    'border-2 border-[var(--hive-border-default)]',
    'overflow-hidden',
    avatarSizes[size],
    
    // Privacy mode styling
    privacy === 'ghost' && 'opacity-60 grayscale',
    privacy === 'anonymous' && 'bg-[var(--hive-background-secondary)] border-dashed',
    
    // Interactive states
    interactive && [
      'cursor-pointer',
      'hover:border-[var(--hive-brand-secondary)]',
      'focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-secondary)] focus:ring-offset-2',
      'transition-all duration-200 ease-out'
    ].filter(Boolean).join(' ')
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    // Try image first
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      );
    }
    
    // Try initials
    if (initials) {
      return (
        <span className="font-medium text-[var(--hive-text-primary)]">
          {initials.slice(0, 2).toUpperCase()}
        </span>
      );
    }
    
    // Try custom placeholder
    if (placeholder) {
      return placeholder;
    }
    
    // Default fallback
    return (
      <User className={cn(
        'text-[var(--hive-text-secondary)]',
        size === 'xs' && 'h-3 w-3',
        size === 'sm' && 'h-4 w-4',
        size === 'md' && 'h-5 w-5',
        size === 'lg' && 'h-6 w-6', 
        size === 'xl' && 'h-8 w-8',
        size === '2xl' && 'h-10 w-10'
      )} />
    );
  };

  return (
    <div className={cn(baseClasses, className)} {...props}>
      {renderContent()}
      
      {/* Status Indicator */}
      {status && (
        <div className={cn(
          'absolute -bottom-0.5 -right-0.5',
          'rounded-full',
          'border-2 border-[var(--hive-background-primary)]',
          statusSizes[size],
          statusColors[status]
        )} />
      )}
      
    </div>
  );
};