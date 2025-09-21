'use client';

import React from 'react';
import { motion } from './framer-motion-proxy';
import { cn } from '../lib/utils';

export interface CampusIdentityHeaderProps {user: {
    name: string;
    handle: string;
    avatar?: string;
    year: string;
    major: string;
    dorm?: string;
    isOnline?: boolean;
    isBuilder?: boolean;
    completionPercentage?: number;};
  variant?: 'default' | 'compact' | 'detailed';
  showStatus?: boolean;
  onAvatarClick?: () => void;
  onEditClick?: () => void;
  className?: string;
}

export const CampusIdentityHeader: React.FC<CampusIdentityHeaderProps> = ({
  user,
  variant = 'default',
  showStatus = true,
  onAvatarClick,
  onEditClick,
  className;
}) => {
  const {
    name,
    handle,
    avatar,
    year,
    major,
    dorm,
    isOnline = false,
    isBuilder = false,
    completionPercentage = 0
  } = user || {};

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name;
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatHandle = (handle?: string) => {
    if (!handle) return '@user';
    return handle.startsWith('@') ? handle : `@${handle}`;
  };

  return (
    <motion.div;
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] // HIVE liquid metal easing;
      }}
      className={cn(
        // BentoGrid-inspired card treatment;
        'relative overflow-hidden rounded-2xl',
        // HIVE luxury background with sophisticated glass morphism;
        'bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90',
        'backdrop-blur-xl border border-steel/10',
        // Subtle inner glow for premium feel;
        'shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]',
        // Interactive hover states with magnetic feel;
        'hover:border-steel/20 hover:shadow-[inset_0_1px_0_0_var(--hive-interactive-active)]',
        'transition-all duration-300 ease-hive-smooth',
        // Responsive padding with bento spacing;
        'p-6 md:p-8 lg:p-10',
        // Mobile-first layout;
        'flex items-center gap-6',
        className;
      )}
    >
      {/* Sophisticated Background Pattern - BentoGrid Feel */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-platinum/10 to-transparent rounded-full blur-lg" />
      </div>

      {/* Avatar Section with Magnetic Hover */}
      <motion.div;
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onAvatarClick}
        className="relative cursor-pointer group flex-shrink-0"
      >
        {/* Avatar Ring with Completion Progress */}
        <div className="relative">
          {/* Progress Ring */}
          {completionPercentage > 0 && (
            <svg;
              className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 -rotate-90 transform"
              viewBox="0 0 96 96"
            >
              <circle;
                cx="48"
                cy="48"
                r="42"
                className="fill-none stroke-steel/20"
                strokeWidth="2"
              />
              <circle;
                cx="48"
                cy="48"
                r="42"
                className="fill-none stroke-gold transition-all duration-1000 drop-shadow-[0_0_6px_color-mix(in_srgb,var(--hive-brand-secondary)_50%,transparent)]"
                strokeWidth="2"
                strokeDasharray={`${(completionPercentage / 100) * 264} 264`}
                strokeLinecap="round"
              />
            </svg>
          )}
          
          {/* Avatar with Premium Treatment */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal via-graphite to-charcoal border-2 border-steel/20 group-hover:border-gold/40 transition-all duration-300 shadow-lg">
            {avatar ? (
              <img;
                src={avatar}
                alt={`${name || 'User'}'s avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-charcoal via-graphite to-slate text-platinum font-bold text-xl md:text-2xl">
                {getInitials(name)}
              </div>
            )}
            
            {/* Subtle overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Online Status Indicator */}
          {showStatus && (
            <div className={cn(
              'absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full border-3 border-charcoal shadow-lg',
              isOnline ? 'bg-emerald' : 'bg-steel'
            )}>
              {isOnline && (
                <motion.div;
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full bg-emerald rounded-full shadow-[0_0_8px_color-mix(in_srgb,var(--hive-status-success)_60%,transparent)]"
                />
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Identity Information with BentoGrid Hierarchy */}
      <div className="flex-1 min-w-0 relative">
        {/* Primary Identity Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-platinum font-bold text-xl md:text-2xl truncate tracking-tight">
                {name || 'Unknown User'}
              </h2>
              
              {/* Builder Badge - Sophisticated Subtle Treatment */}
              {isBuilder && (
                <motion.div;
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.4, 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20
                  }}
                  className="relative"
                >
                  <div className="px-3 py-1 bg-gradient-to-r from-gold/20 to-champagne/20 border border-gold/30 rounded-full backdrop-blur-sm">
                    <span className="text-gold text-xs font-semibold tracking-wide">Builder</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent rounded-full blur-sm" />
                </motion.div>
              )}
            </div>

            {/* Handle with Premium Typography */}
            <p className="text-silver/80 text-sm font-mono tracking-wider mb-3">
              {formatHandle(handle)}
            </p>
          </div>
        </div>

        {/* Campus Context - Sophisticated Information Architecture */}
        <div className="space-y-2">
          {/* Academic Identity */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
              <span className="text-platinum font-medium">{major || 'Undeclared'}</span>
              <span className="text-steel/60">•</span>
              <span className="text-mercury font-medium">Class of '{year ? year.slice(-2) : 'TBD'}</span>
            </div>
          </div>

          {/* Campus Location */}
          {dorm && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-platinum/40" />
              <span className="text-mercury">{dorm}</span>
            </div>
          )}

          {/* Campus Presence Status */}
          {showStatus && (
            <div className="flex items-center gap-2 text-sm">
              <div className={cn(
                'w-1.5 h-1.5 rounded-full',
                isOnline ? 'bg-emerald shadow-[0_0_4px_color-mix(in_srgb,var(--hive-status-success)_50%,transparent)]' : 'bg-steel/60'
              )} />
              <span className={cn(
                'font-medium text-sm',
                isOnline ? 'text-emerald' : 'text-steel'
              )}>
                {isOnline ? 'Active on Campus' : 'Away'}
              </span>
            </div>
          )}
        </div>

        {/* Completion Progress Indicator */}
        {completionPercentage > 0 && completionPercentage < 100 && (
          <div className="mt-4 pt-3 border-t border-steel/10">
            <div className="flex items-center justify-between text-xs text-mercury">
              <span>Profile Completion</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <div className="mt-1 h-1 bg-steel/20 rounded-full overflow-hidden">
              <motion.div;
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="h-full bg-gradient-to-r from-gold to-champagne rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Edit Action - Sophisticated BentoGrid Treatment */}
      {onEditClick && (
        <motion.button;
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 2 32px color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onEditClick}
          className={cn(
            'relative p-3 rounded-2xl bg-gradient-to-br from-charcoal/60 to-graphite/60',
            'border border-steel/20 backdrop-blur-md',
            'hover:border-gold/40 hover:from-charcoal/80 hover:to-graphite/80',
            'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-transparent',
            'transition-all duration-300 ease-hive-smooth',
            'shadow-lg hover:shadow-xl',
            'flex-shrink-0 group'
          )}
          aria-label="Edit campus profile"
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Edit Icon */}
          <svg;
            className="w-5 h-5 text-silver group-hover:text-gold transition-colors duration-300 relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path;
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
};

// Compact variant for use in navigation or cards;
export const CompactCampusIdentity: React.FC<Omit<CampusIdentityHeaderProps, 'variant'>> = (props) => (
  <CampusIdentityHeader {...props} variant="compact" />
);

export default CampusIdentityHeader;