"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../lib/utils';
import { 
  Users, 
  Calendar, 
  Sparkles, 
  Lock, 
  Unlock,
  ArrowRight,
  Clock,
  Star
} from 'lucide-react';

export interface SpaceCardProps {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'interest' | 'organization' | 'greek';
  status: 'preview' | 'active' | 'invite_only';
  memberCount?: number;
  potentialMembers?: number;
  recentActivity?: string;
  upcomingEvents?: number;
  leaders?: Array<{
    id: string;
    name: string;
    avatarUrl?: string;
  }>;
  isJoined?: boolean;
  canRequest?: boolean;
  onJoin?: () => void;
  onRequestAccess?: () => void;
  onViewSpace?: () => void;
  className?: string;
}

const spaceTypeConfig = {
  academic: {
    label: 'Academic',
    color: 'accent' as const,
    icon: Star,
  },
  residential: {
    label: 'Residential',
    color: 'chip' as const,
    icon: Users,
  },
  interest: {
    label: 'Interest',
    color: 'chip' as const,
    icon: Sparkles,
  },
  organization: {
    label: 'Organization',
    color: 'chip' as const,
    icon: Users,
  },
  greek: {
    label: 'Greek Life',
    color: 'accent' as const,
    icon: Star,
  },
};

const statusConfig = {
  preview: {
    label: 'Preview Mode',
    description: 'Space will activate when a leader requests access',
    icon: Clock,
    actionLabel: 'Request to Lead',
  },
  active: {
    label: 'Active',
    description: 'Join to participate in this community',
    icon: Unlock,
    actionLabel: 'Join Space',
  },
  invite_only: {
    label: 'Invite Only',
    description: 'Request access to join this exclusive space',
    icon: Lock,
    actionLabel: 'Request Access',
  },
};

export const SpaceCard: React.FC<SpaceCardProps> = ({
  id: _id,
  name,
  description,
  type,
  status,
  memberCount,
  potentialMembers,
  recentActivity,
  upcomingEvents,
  leaders = [],
  isJoined = false,
  canRequest = true,
  onJoin,
  onRequestAccess,
  onViewSpace,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const typeConfig = spaceTypeConfig[type];
  const statusInfo = statusConfig[status];
  const TypeIcon = typeConfig.icon;
  const StatusIcon = statusInfo.icon;

  const displayMemberCount = status === 'preview' ? potentialMembers : memberCount;

  const handlePrimaryAction = () => {
    if (isJoined) {
      onViewSpace?.();
    } else if (status === 'preview') {
      onRequestAccess?.();
    } else {
      onJoin?.();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative bg-surface border border-border rounded-lg overflow-hidden",
        "transition-all duration-base ease-brand cursor-pointer",
        "hover:border-accent/30 hover:shadow-lg group",
        isJoined && "ring-1 ring-accent/20",
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-surface-02 rounded-lg">
              <TypeIcon className="w-4 h-4 text-accent" />
            </div>
            <Badge variant={typeConfig.color} size="sm">
              {typeConfig.label}
            </Badge>
          </div>

          <Badge 
            variant={status === 'active' ? 'chip' : 'outline'} 
            size="xs"
          >
            <StatusIcon className="w-2 h-2 mr-1" />
            {statusInfo.label}
          </Badge>
        </div>

        <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
          {name}
        </h3>
        
        <p className="text-muted text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4 text-xs">
          {/* Members */}
          <div className="flex items-center gap-2">
            <Users className="w-3 h-3 text-muted" />
            <span className="text-muted">
              {status === 'preview' ? (
                <>
                  <span className="text-accent font-medium">
                    {displayMemberCount?.toLocaleString()}
                  </span>
                  <span> potential</span>
                </>
              ) : (
                <>
                  <span className="text-foreground font-medium">
                    {displayMemberCount?.toLocaleString()}
                  </span>
                  <span> members</span>
                </>
              )}
            </span>
          </div>

          {/* Events */}
          {upcomingEvents !== undefined && (
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-muted" />
              <span className="text-muted">
                <span className="text-foreground font-medium">{upcomingEvents}</span>
                <span> events</span>
              </span>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {recentActivity && (
          <div className="text-xs text-muted">
            <span className="opacity-75">Latest: </span>
            <span>{recentActivity}</span>
          </div>
        )}

        {/* Leaders */}
        {leaders.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Leaders:</span>
            <div className="flex -space-x-1">
              {leaders.slice(0, 3).map((leader, index) => (
                <div
                  key={leader.id}
                  className="w-5 h-5 bg-surface-02 rounded-full border border-border flex items-center justify-center text-xs text-muted"
                  style={{ zIndex: 10 - index }}
                >
                  {leader.avatarUrl ? (
                    <img 
                      src={leader.avatarUrl} 
                      alt={leader.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    leader.name?.charAt(0)?.toUpperCase() || "?"
                  )}
                </div>
              ))}
              {leaders.length > 3 && (
                <div className="w-5 h-5 bg-surface-03 rounded-full border border-border flex items-center justify-center text-xs text-muted">
                  +{leaders.length - 3}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border/50 bg-surface-01/50">
        <AnimatePresence mode="wait">
          {isJoined ? (
            <motion.div
              key="joined"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePrimaryAction}
                className="w-full group"
              >
                <span>View Space</span>
                <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ) : status === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <p className="text-xs text-muted text-center">
                {statusInfo.description}
              </p>
              <Button
                variant="accent"
                size="sm"
                onClick={handlePrimaryAction}
                disabled={!canRequest}
                className="w-full"
              >
                {statusInfo.actionLabel}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button
                variant={status === 'invite_only' ? 'outline' : 'default'}
                size="sm"
                onClick={handlePrimaryAction}
                disabled={!canRequest}
                className="w-full"
              >
                {statusInfo.actionLabel}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-accent/5 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};