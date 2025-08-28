"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../lib/utils';
import { 
  Flame, 
  Users, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle 
} from 'lucide-react';

export interface RitualCardProps {
  id: string;
  title: string;
  description: string;
  type: 'first_light' | 'torch_pass' | 'space_hunt' | 'builder_spotlight' | 'wave';
  participantCount: number;
  timeRemaining?: string;
  isActive: boolean;
  hasParticipated: boolean;
  onParticipate?: () => void;
  className?: string;
}

const ritualConfig = {
  first_light: {
    icon: Flame,
    color: 'ritual' as const,
    label: 'First Light',
    gradient: 'from-accent/20 via-accent/10 to-transparent',
  },
  torch_pass: {
    icon: Flame,
    color: 'accent' as const,
    label: 'Torch Pass',
    gradient: 'from-accent/15 via-accent/5 to-transparent',
  },
  space_hunt: {
    icon: Sparkles,
    color: 'accent' as const,
    label: 'Space Hunt',
    gradient: 'from-accent/15 via-accent/5 to-transparent',
  },
  builder_spotlight: {
    icon: Users,
    color: 'accent' as const,
    label: 'Builder Spotlight',
    gradient: 'from-accent/15 via-accent/5 to-transparent',
  },
  wave: {
    icon: Sparkles,
    color: 'accent' as const,
    label: 'Wave',
    gradient: 'from-accent/20 via-accent/10 to-transparent',
  },
};

export const RitualCard: React.FC<RitualCardProps> = ({
  id: _id,
  title,
  description,
  type,
  participantCount,
  timeRemaining,
  isActive,
  hasParticipated,
  onParticipate,
  className,
}) => {
  const config = ritualConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-surface",
        "transition-all duration-base ease-brand",
        "hover:border-accent/30 hover:shadow-lg",
        isActive && "ring-1 ring-accent/20",
        className
      )}
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50",
        config.gradient
      )} />

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg transition-all duration-base",
              hasParticipated 
                ? "bg-accent/20 text-accent" 
                : "bg-surface-02 text-muted hover:text-accent"
            )}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">
                {title}
              </h3>
              <Badge 
                variant={hasParticipated ? "ritual" : "chip"} 
                size="sm"
              >
                {config.label}
              </Badge>
            </div>
          </div>

          {hasParticipated && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-1 bg-accent/20 rounded-full"
            >
              <CheckCircle className="w-4 h-4 text-accent" />
            </motion.div>
          )}
        </div>

        {/* Description */}
        <p className="text-muted font-body text-sm leading-relaxed">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{participantCount.toLocaleString()} participated</span>
          </div>
          
          {timeRemaining && isActive && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{timeRemaining} remaining</span>
            </div>
          )}
        </div>

        {/* Action */}
        <AnimatePresence mode="wait">
          {!hasParticipated && isActive ? (
            <motion.div
              key="participate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button
                variant="primary"
                size="sm"
                onClick={onParticipate}
                className="w-full group"
              >
                <span>Join Ritual</span>
                <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ) : hasParticipated ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-2"
            >
              <span className="text-accent text-sm font-medium">
                ✨ Ritual completed
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-2"
            >
              <span className="text-muted text-sm">
                Ritual will begin soon
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pulse effect for active rituals */}
      {isActive && !hasParticipated && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-accent/50"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};