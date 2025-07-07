"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../../lib/utils';
import { 
  Flame, 
  Users, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';

export interface RitualCardCelebrationProps {
  id: string;
  title: string;
  description: string;
  type: 'first_light' | 'torch_pass' | 'space_hunt' | 'builder_spotlight' | 'wave';
  participantCount: number;
  timeRemaining?: string;
  isActive: boolean;
  hasParticipated: boolean;
  celebrationMoment?: boolean;
  onParticipate?: () => void;
  className?: string;
}

const ritualConfig = {
  first_light: {
    icon: Flame,
    color: 'ritual' as const,
    label: 'First Light',
    gradient: 'from-accent/20 via-accent/10 to-transparent',
    celebrationColor: 'from-accent/30 via-accent/15 to-transparent',
    emoji: '🕯️',
    particleColor: '#FFD700',
  },
  torch_pass: {
    icon: Flame,
    color: 'accent' as const,
    label: 'Torch Pass',
    gradient: 'from-accent/15 via-accent/5 to-transparent',
    celebrationColor: 'from-accent/25 via-accent/10 to-transparent',
    emoji: '🔥',
    particleColor: '#FFD700',
  },
  space_hunt: {
    icon: Sparkles,
    color: 'accent' as const,
    label: 'Space Hunt',
    gradient: 'from-accent/15 via-accent/5 to-transparent',
    celebrationColor: 'from-accent/25 via-accent/10 to-transparent',
    emoji: '🎯',
    particleColor: '#FFD700',
  },
  builder_spotlight: {
    icon: Users,
    color: 'accent' as const,
    label: 'Builder Spotlight',
    gradient: 'from-accent/15 via-accent/5 to-transparent',
    celebrationColor: 'from-accent/25 via-accent/10 to-transparent',
    emoji: '🌟',
    particleColor: '#FFD700',
  },
  wave: {
    icon: Zap,
    color: 'accent' as const,
    label: 'Wave',
    gradient: 'from-accent/15 via-accent/5 to-transparent',
    celebrationColor: 'from-accent/25 via-accent/10 to-transparent',
    emoji: '🌊',
    particleColor: '#FFD700',
  },
};

// Particle component for celebration effects
const Particle: React.FC<{ delay: number; color: string }> = ({ delay, color }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full"
    style={{ backgroundColor: color }}
    initial={{ 
      scale: 0, 
      x: 0, 
      y: 0,
      opacity: 1
    }}
    animate={{ 
      scale: [0, 1, 0],
      x: Math.random() * 200 - 100,
      y: Math.random() * 150 - 75,
      opacity: [1, 1, 0]
    }}
    transition={{
      duration: 2,
      delay: delay,
      ease: "easeOut"
    }}
  />
);

export const RitualCardCelebration: React.FC<RitualCardCelebrationProps> = ({
  id: _id,
  title,
  description,
  type,
  participantCount,
  timeRemaining,
  isActive,
  hasParticipated,
  celebrationMoment = false,
  onParticipate,
  className,
}) => {
  const [isParticipating, setIsParticipating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(celebrationMoment);
  const [particles, setParticles] = useState<number[]>([]);
  const config = ritualConfig[type];

  useEffect(() => {
    if (showCelebration) {
      // Generate particles for celebration
      const particleArray = Array.from({ length: 20 }, (_, i) => i);
      setParticles(particleArray);
      
      // Auto-hide celebration after animation
      const timer = setTimeout(() => {
        setShowCelebration(false);
        setParticles([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  const handleParticipate = () => {
    if (isParticipating || hasParticipated) return;
    
    setIsParticipating(true);
    setShowCelebration(true);
    onParticipate?.();
    
    setTimeout(() => {
      setIsParticipating(false);
    }, 2000);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative overflow-hidden",
        "bg-surface border rounded-xl",
        "transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
        "hover:shadow-lg hover:border-accent/30",
        className
      )}
    >
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
        showCelebration ? config.celebrationColor : config.gradient
      )} />

      {/* Celebration Particles */}
      <AnimatePresence>
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {particles.map((particle) => (
                <Particle
                  key={particle}
                  delay={particle * 0.1}
                  color={config.particleColor}
                />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                "bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30"
              )}
              animate={showCelebration ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl">{config.emoji}</span>
            </motion.div>
            
            <div>
              <Badge variant={config.color} className="mb-2">
                {config.label}
              </Badge>
              <h3 className="font-display font-bold text-foreground text-xl leading-tight">
                {title}
              </h3>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex flex-col items-end gap-2">
            {hasParticipated && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="flex items-center gap-1 px-2 py-1 bg-accent/20 border border-accent/30 rounded-full"
              >
                <CheckCircle className="h-3 w-3 text-accent" />
                <span className="text-xs font-medium text-accent">Completed</span>
              </motion.div>
            )}
            
            {isActive && !hasParticipated && (
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex items-center gap-1 px-2 py-1 bg-accent/10 border border-accent/20 rounded-full"
              >
                <Sparkles className="h-3 w-3 text-accent" />
                <span className="text-xs font-medium text-accent">Active</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted font-body leading-relaxed mb-6">
          {description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-surface-01/50 border border-border/50 rounded-lg">
            <Users className="h-5 w-5 text-accent" />
            <div>
              <div className="font-display font-semibold text-foreground text-lg">
                {participantCount.toLocaleString()}
              </div>
              <div className="text-xs text-muted">Participants</div>
            </div>
          </div>
          
          {timeRemaining && (
            <div className="flex items-center gap-3 p-3 bg-surface-01/50 border border-border/50 rounded-lg">
              <Clock className="h-5 w-5 text-muted" />
              <div>
                <div className="font-display font-semibold text-foreground text-lg">
                  {timeRemaining}
                </div>
                <div className="text-xs text-muted">Remaining</div>
              </div>
            </div>
          )}
        </div>

        {/* Participation Progress */}
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Star className="h-5 w-5 text-accent" />
              </motion.div>
              <div>
                <p className="font-medium text-accent text-sm">
                  🎉 Ritual Completed!
                </p>
                <p className="text-xs text-muted">
                  You've joined {participantCount.toLocaleString()} others in this campus moment
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <AnimatePresence mode="wait">
          {hasParticipated ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center p-4 bg-accent/5 border border-accent/20 rounded-lg"
            >
              <CheckCircle className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-medium text-accent">
                Thank you for participating!
              </p>
              <p className="text-xs text-muted mt-1">
                Your contribution helps build our campus community
              </p>
            </motion.div>
          ) : (
            <Button
              key="participate"
              variant="ritual"
              size="lg"
              onClick={handleParticipate}
              disabled={!isActive || isParticipating}
              className={cn(
                "w-full gap-3 font-semibold text-lg py-4",
                isParticipating && "animate-pulse"
              )}
            >
              <motion.div
                animate={isParticipating ? { 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                } : { rotate: 0, scale: 1 }}
                transition={{ 
                  duration: isParticipating ? 1 : 0.2,
                  repeat: isParticipating ? Infinity : 0
                }}
              >
                <config.icon className="h-5 w-5" />
              </motion.div>
              
              {isParticipating ? 'Participating...' : 'Join Ritual'}
              
              {!isParticipating && <ArrowRight className="h-5 w-5" />}
            </Button>
          )}
        </AnimatePresence>
      </div>

      {/* Glow Effect */}
      {showCelebration && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1, repeat: 2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
        </motion.div>
      )}
    </motion.article>
  );
};