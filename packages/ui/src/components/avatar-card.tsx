'use client';

import React from 'react';
import { cn } from '../lib/utils';
import { Avatar } from '../atomic/atoms/avatar';
import { Check, Star, Crown, GraduationCap } from 'lucide-react';

const roleBadges = {
  student: { icon: GraduationCap, color: 'text-[var(--hive-status-info)]' },
  builder: { icon: Star, color: 'text-[var(--hive-brand-secondary)]' },
  leader: { icon: Crown, color: 'text-[var(--hive-brand-secondary)]' },
  verified: { icon: Check, color: 'text-[var(--hive-status-success)]' }
};

export interface AvatarCardProps {
  src?: string;
  name: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'ghost';
  role?: 'student' | 'builder' | 'leader' | 'verified';
  affiliation?: 'university' | 'residential' | 'greek';
  privacy?: 'public' | 'ghost' | 'anonymous';
  interactive?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  onClick?: () => void
}

const cardSizes = {
  sm: {
    avatar: 'sm' as const,
    padding: 'p-3',
    nameSize: 'text-sm',
    subtitleSize: 'text-xs'
  },
  md: {
    avatar: 'md' as const,
    padding: 'p-4',
    nameSize: 'text-base',
    subtitleSize: 'text-sm'
  },
  lg: {
    avatar: 'lg' as const,
    padding: 'p-5',
    nameSize: 'text-lg',
    subtitleSize: 'text-base'
  }
};

export const AvatarCard: React.FC<AvatarCardProps> = ({
  src,
  name,
  subtitle,
  size = 'md',
  status,
  role,
  affiliation,
  privacy = 'public',
  interactive = false,
  layout = 'horizontal',
  className,
  onClick,
}) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const sizeConfig = cardSizes[size];

  const baseClasses = [
    'rounded-2xl', // Chip feel
    'bg-[var(--hive-background-secondary)]',
    'border border-[var(--hive-border-default)]',
    'transition-all duration-200 ease-out',
    sizeConfig.padding,
    
    // Interactive states
    interactive && [
      'cursor-pointer',
      'hover:bg-[var(--hive-background-tertiary)]',
      'hover:border-[var(--hive-brand-secondary)]',
      'hover:shadow-lg',
      'active:scale-[0.98]'
    ].filter(Boolean).join(' ')
  ].filter(Boolean).join(' ');

  const contentClasses = layout === 'horizontal' 
    ? 'flex items-center space-x-3'
    : 'flex flex-col items-center space-y-3 text-center';

  return (
    <div 
      className={cn(baseClasses, className)}
      onClick={onClick}
    >
      <div className={contentClasses}>
        <Avatar
          src={src}
          initials={initials}
          size={sizeConfig.avatar}
          status={status}
          privacy={privacy}
          interactive={false}
          showBadge={false}
        />
        
        <div className={layout === 'horizontal' ? 'flex-1 min-w-0' : ''}>
          <h3 className={cn(
            'font-semibold text-[var(--hive-text-primary)] truncate',
            sizeConfig.nameSize
          )}>
            {name}
          </h3>
          
          {subtitle && (
            <p className={cn(
              'text-[var(--hive-text-secondary)] truncate',
              sizeConfig.subtitleSize
            )}>
              {subtitle}
            </p>
          )}
          
          {/* Status/Role indicators with icons */}
          {(status || role) && (
            <div className="flex items-center space-x-3 mt-1">
              {role && (
                <div className="flex items-center space-x-1">
                  {React.createElement(roleBadges[role].icon, {
                    size: 12,
                    className: roleBadges[role].color
          })}
                  <span className={cn(
                    'text-xs font-medium',
                    role === 'verified' && 'text-[var(--hive-status-success)]',
                    role === 'builder' && 'text-[var(--hive-brand-secondary)]',
                    role === 'leader' && 'text-[var(--hive-brand-secondary)]',
                    role === 'student' && 'text-[var(--hive-status-info)]'
                  )}>
                    {role === 'verified' ? 'Verified' : 
                     role === 'builder' ? 'Builder' :
                     role === 'leader' ? 'Leader' : 'Student'}
                  </span>
                </div>
              )}
              
              {status && status !== 'offline' && (
                <div className="flex items-center space-x-1">
                  <div className={cn(
                    'h-2 w-2 rounded-full',
                    status === 'online' && 'bg-[var(--hive-status-success)]',
                    status === 'away' && 'bg-[var(--hive-brand-secondary)]',
                    status === 'busy' && 'bg-[var(--hive-status-error)]',
                    status === 'ghost' && 'bg-[var(--hive-text-tertiary)]'
                  )} />
                  <span className={cn(
                    'text-xs',
                    status === 'online' && 'text-[var(--hive-status-success)]',
                    status === 'away' && 'text-[var(--hive-brand-secondary)]',
                    status === 'busy' && 'text-[var(--hive-status-error)]',
                    status === 'ghost' && 'text-[var(--hive-text-tertiary)]'
                  )}>
                    {status === 'online' ? 'Online' :
                     status === 'away' ? 'Away' :
                     status === 'busy' ? 'Busy' : 'Ghost'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
};