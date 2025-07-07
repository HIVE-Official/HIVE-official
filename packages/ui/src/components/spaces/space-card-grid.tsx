"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../../lib/utils';
import { 
  Users, 
  Calendar, 
  Sparkles, 
  Star,
  ArrowRight,
  Flame,
  Zap
} from 'lucide-react';

export interface SpaceCardGridProps {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'interest' | 'organization' | 'greek';
  status: 'preview' | 'active' | 'invite_only';
  memberCount?: number;
  potentialMembers?: number;
  recentActivity?: string;
  upcomingEvents?: number;
  activityLevel: 'low' | 'medium' | 'high';
  leaders?: Array<{
    id: string;
    name: string;
    avatarUrl?: string;
  }>;
  isJoined?: boolean;
  onJoin?: () => void;
  onViewSpace?: () => void;
  className?: string;
}

const spaceTypeConfig = {
  academic: {
    label: 'Academic',
    icon: Star,
    color: 'accent',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
  },
  residential: {
    label: 'Residential',
    icon: Users,
    color: 'chip',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
  },
  interest: {
    label: 'Interest',
    icon: Sparkles,
    color: 'chip',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)',
  },
  organization: {
    label: 'Organization',
    icon: Users,
    color: 'chip',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
  },
  greek: {
    label: 'Greek Life',
    icon: Star,
    color: 'accent',
    bgPattern: 'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
  },
};

const statusConfig = {
  preview: {
    label: 'Preview',
    icon: Zap,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  active: {
    label: 'Active',
    icon: Flame,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  invite_only: {
    label: 'Invite Only',
    icon: Star,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
};

const activityLevelConfig = {
  low: { intensity: 0.3, color: 'text-muted' },
  medium: { intensity: 0.6, color: 'text-foreground' },
  high: { intensity: 1, color: 'text-accent' },
};

export const SpaceCardGrid: React.FC<SpaceCardGridProps> = ({
  id,
  name,
  description,
  type,
  status,
  memberCount,
  potentialMembers,
  recentActivity,
  upcomingEvents = 0,
  activityLevel,
  leaders = [],
  isJoined = false,
  onJoin,
  onViewSpace,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = spaceTypeConfig[type];
  const statusInfo = statusConfig[status];
  const activityInfo = activityLevelConfig[activityLevel];

  const displayMemberCount = status === 'preview' ? potentialMembers : memberCount;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative bg-surface border border-border rounded-xl overflow-hidden",
        "transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
        "hover:shadow-xl hover:border-border-hover",
        "cursor-pointer",
        className
      )}
      style={{
        backgroundImage: config.bgPattern,
      }}
    >
      {/* Header */}
      <div className="p-4 pb-0">
        <div className="flex items-start justify-between mb-3">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            statusInfo.bgColor
          )}>
            <config.icon className={cn(
              "h-4 w-4",
              config.color === 'accent' ? 'text-accent' : 'text-foreground'
            )} />
          </div>
          
          <div className="flex items-center gap-1">
            <statusInfo.icon className={cn("h-3 w-3", statusInfo.color)} />
            <span className={cn("text-xs font-medium", statusInfo.color)}>
              {statusInfo.label}
            </span>
          </div>
        </div>

        <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-2 line-clamp-2">
          {name}
        </h3>
        
        <Badge variant={config.color as any} className="text-xs mb-3">
          {config.label}
        </Badge>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-muted font-body text-xs leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-center">
          <div className="p-2 bg-surface-01/50 border border-border/50 rounded-lg">
            <div className="text-lg font-display font-semibold text-foreground">
              {displayMemberCount ? displayMemberCount.toLocaleString() : '0'}
            </div>
            <div className="text-xs text-muted">
              {status === 'preview' ? 'Potential' : 'Members'}
            </div>
          </div>
          
          <div className="p-2 bg-surface-01/50 border border-border/50 rounded-lg">
            <div className="text-lg font-display font-semibold text-foreground">
              {upcomingEvents}
            </div>
            <div className="text-xs text-muted">Events</div>
          </div>
        </div>

        {/* Activity Indicator */}
        {recentActivity && (
          <div className="mb-4 p-2 bg-surface-01/30 border border-border/30 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className={cn(
                "w-2 h-2 rounded-full",
                activityLevel === 'high' ? 'bg-accent animate-pulse' : 
                activityLevel === 'medium' ? 'bg-foreground/60' : 'bg-muted'
              )} />
              <span className="text-xs font-medium text-foreground">Recent Activity</span>
            </div>
            <p className="text-xs text-muted line-clamp-1">{recentActivity}</p>
          </div>
        )}

        {/* Leaders */}
        {leaders.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-muted mb-2">Leaders</div>
            <div className="flex items-center gap-1">
              <div className="flex -space-x-1">
                {leaders.slice(0, 3).map((leader, index) => (
                  <div
                    key={leader.id}
                    className="w-5 h-5 rounded-full bg-surface-02 border border-surface flex-shrink-0"
                    title={leader.name}
                  />
                ))}
              </div>
              {leaders.length > 3 && (
                <span className="text-xs text-muted ml-1">+{leaders.length - 3}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="p-4 pt-0">
        {isJoined ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onViewSpace}
            className="w-full gap-2 text-xs"
          >
            View Space
            <ArrowRight className="h-3 w-3" />
          </Button>
        ) : (
          <Button
            variant={status === 'preview' ? 'ritual' : 'default'}
            size="sm"
            onClick={onJoin}
            className="w-full gap-2 text-xs"
          >
            {status === 'preview' ? (
              <>
                <Sparkles className="h-3 w-3" />
                Request to Lead
              </>
            ) : status === 'invite_only' ? (
              'Request Access'
            ) : (
              'Join Space'
            )}
          </Button>
        )}
      </div>

      {/* Hover Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
      </motion.div>

      {/* Activity Pulse */}
      {activityLevel === 'high' && (
        <motion.div
          className="absolute top-2 right-2 w-1 h-1 bg-accent rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.article>
  );
};