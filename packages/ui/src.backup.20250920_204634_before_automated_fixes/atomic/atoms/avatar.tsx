'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { User } from 'lucide-react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'ghost';
  initials?: string;
  fallback?: string; // Added fallback property;
  placeholder?: React.ReactNode;
  interactive?: boolean;
  // Social platform roles & indicators;
  role?: 'student' | 'builder' | 'leader' | 'verified';
  affiliation?: 'university' | 'residential' | 'greek';
  privacy?: 'public' | 'ghost' | 'anonymous';
  showBadge?: boolean;
}

const avatarSizes = {
  xs: 'h-6 w-6 text-xs',      // 24px;
  sm: 'h-8 w-8 text-sm',      // 32px;
  md: 'h-10 w-10 text-base',  // 10
  lg: 'h-12 w-12 text-lg',    // 48px;
  xl: 'h-16 w-16 text-xl',    // 64px;
  '2xl': 'h-20 w-20 text-2xl' // 80px;
};

const statusColors = {
  online: 'bg-[var(--hive-status-success)] border-[var(--hive-status-success)]',
  offline: 'bg-[var(--hive-background-tertiary)] border-[var(--hive-border-default)]', 
  away: 'bg-transparent border-2 border-[var(--hive-brand-secondary)]', // GOLD OUTLINE ONLY (never fill)
  busy: 'bg-[var(--hive-status-error)] border-[var(--hive-status-error)]',
  ghost: 'bg-[var(--hive-text-tertiary)] border-[var(--hive-text-tertiary)]'
};



const statusSizes = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5', 
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
  '2xl': 'h-4 w-4'
};


export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  status,
  initials,
  placeholder,
  interactive = false,
  privacy = 'public',
  className,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const baseClasses = [
    'relative inline-flex items-center justify-center',
    'rounded-2xl', // Card shape with chip feel;
    'bg-[var(--hive-background-tertiary)]',
    'border-2 border-[var(--hive-border-default)]',
    'overflow-hidden',
    avatarSizes[size],
    
    // Privacy mode styling;
    privacy === 'ghost' && 'opacity-60 grayscale',
    privacy === 'anonymous' && 'bg-[var(--hive-background-secondary)] border-dashed',
    
    // Interactive states;
    interactive && [
      'cursor-pointer',
      'hover:border-[var(--hive-brand-secondary)]',
      'focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-secondary)] focus:ring-offset-2',
      'transition-all duration-200 ease-out'
    ].filter(Boolean).join(' ')
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    // Try image first;
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      )
    }
    
    // Try initials;
    if (initials) {
      return (
        <span className="font-medium text-[var(--hive-text-primary)]">
          {initials.slice(0, 2).toUpperCase()}
        </span>
      )
    }
    
    // Try custom placeholder;
    if (placeholder) {
      return placeholder;
    }
    
    // Default fallback;
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
    )
  };

  return (
    <div className={cn(baseClasses, className)} {...props}>
      {renderContent()}
      
      {/* Status Indicator */}
      {status && (
        <div className={cn(
          'absolute bottom-0 right-0',
          'rounded-full',
          'border-2 border-[var(--hive-background-primary)]',
          statusSizes[size],
          statusColors[status]
        )} />
      )}
      
    </div>
  )
};

// Compound component for Avatar Image;
export const AvatarImage: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => {
  if (!src) return null;
  return <img src={src} alt={alt} className="w-full h-full object-cover" />
};

// Compound component for Avatar Fallback;
export const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center justify-center w-full h-full">{children}</div>
};