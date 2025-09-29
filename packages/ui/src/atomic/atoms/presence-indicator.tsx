'use client';

import React from 'react';
import { cn } from '../../lib/utils';

/**
 * SPEC-COMPLIANT PRESENCE INDICATOR
 *
 * Per SPEC.md:
 * - Online presence with ghost mode support
 * - Three states: Online (green), Away (yellow), Ghost (invisible)
 * - Real-time updates via Firebase presence
 *
 * Behavioral Hook: Creates FOMO when someone is online but you're not connecting
 */

export type PresenceStatus = 'online' | 'away' | 'ghost' | 'offline';

export interface PresenceIndicatorProps {
  status: PresenceStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  lastSeen?: Date;
  className?: string;
}

const statusConfig = {
  online: {
    color: 'bg-green-500',
    ringColor: 'ring-green-500/20',
    label: 'Online',
    pulseAnimation: true
  },
  away: {
    color: 'bg-yellow-500',
    ringColor: 'ring-yellow-500/20',
    label: 'Away',
    pulseAnimation: false
  },
  ghost: {
    // Ghost mode: appears offline but user is actually online
    color: 'bg-gray-500',
    ringColor: 'ring-gray-500/20',
    label: 'Offline', // Intentionally misleading for ghost mode
    pulseAnimation: false
  },
  offline: {
    color: 'bg-gray-500',
    ringColor: 'ring-gray-500/20',
    label: 'Offline',
    pulseAnimation: false
  }
};

const sizeConfig = {
  sm: {
    dot: 'h-2 w-2',
    ring: 'h-3 w-3',
    text: 'text-xs'
  },
  md: {
    dot: 'h-3 w-3',
    ring: 'h-4 w-4',
    text: 'text-sm'
  },
  lg: {
    dot: 'h-4 w-4',
    ring: 'h-5 w-5',
    text: 'text-base'
  }
};

export const PresenceIndicator: React.FC<PresenceIndicatorProps> = ({
  status,
  size = 'md',
  showLabel = false,
  lastSeen,
  className
}) => {
  const config = statusConfig[status];
  const sizeClasses = sizeConfig[size];

  // Format last seen for offline/ghost users
  const getLastSeenText = () => {
    if (!lastSeen || status === 'online' || status === 'away') return null;

    const now = new Date();
    const diff = now.getTime() - lastSeen.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return 'Long ago';
  };

  const lastSeenText = getLastSeenText();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        {/* Pulse animation for online status */}
        {config.pulseAnimation && (
          <div
            className={cn(
              'absolute inset-0 animate-ping',
              sizeClasses.ring,
              config.color,
              'rounded-full opacity-75'
            )}
          />
        )}

        {/* Outer ring */}
        <div
          className={cn(
            'absolute inset-0',
            sizeClasses.ring,
            'rounded-full ring-2',
            config.ringColor
          )}
        />

        {/* Status dot */}
        <div
          className={cn(
            'relative',
            sizeClasses.dot,
            config.color,
            'rounded-full'
          )}
        />
      </div>

      {/* Label and last seen */}
      {showLabel && (
        <div className="flex flex-col">
          <span className={cn(sizeClasses.text, 'text-white font-medium')}>
            {config.label}
          </span>
          {lastSeenText && (
            <span className={cn('text-gray-500',
              size === 'sm' ? 'text-[10px]' : 'text-xs'
            )}>
              {lastSeenText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};