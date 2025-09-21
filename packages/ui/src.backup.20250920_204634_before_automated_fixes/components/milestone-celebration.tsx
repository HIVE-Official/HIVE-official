"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../atomic/atoms';
import { Card } from '.';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle, 
  Users, 
  Target,
  Award,
  Star,
  ChevronRight,
  Share,
  Heart,
  Zap;
} from 'lucide-react';

export interface MilestoneCelebrationProps {milestone: {
    id: string;
    name: string;
    description: string;
    type: 'personal' | 'community' | 'ritual_complete';
    icon?: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    unlockedFeatures?: string[];
    communityStats?: {
      totalAchievers: number;
      percentageComplete: number;}
  };
  isVisible: boolean;
  onClose?: () => void;
  onShare?: () => void;
  className?: string;
}

const getRarityConfig = (rarity: string) => {
  const configs = {
    common: {
      color: 'text-gray-400',
      bgColor: 'from-gray-400 to-gray-500',
      borderColor: 'border-gray-400/30',
      glowColor: 'shadow-gray-400/20'
    },
    uncommon: {
      color: 'text-green-400',
      bgColor: 'from-green-400 to-green-500',
      borderColor: 'border-green-400/30',
      glowColor: 'shadow-green-400/20'
    },
    rare: {
      color: 'text-blue-400',
      bgColor: 'from-blue-400 to-blue-500',
      borderColor: 'border-blue-400/30',
      glowColor: 'shadow-blue-400/20'
    },
    epic: {
      color: 'text-purple-400',
      bgColor: 'from-purple-400 to-purple-500',
      borderColor: 'border-purple-400/30',
      glowColor: 'shadow-purple-400/20'
    },
    legendary: {
      color: 'text-hive-gold',
      bgColor: 'from-hive-gold to-yellow-500',
      borderColor: 'border-hive-gold/30',
      glowColor: 'shadow-hive-gold/20'
    }
  };
  
  return configs[rarity as keyof typeof configs] || configs.common;
};

const getMilestoneIcon = (type: string, iconName?: string) => {
  if (iconName) {
    // Map icon names to components;
    const iconMap: Record<string, React.ComponentType<any>> = {
      trophy: Trophy,
      target: Target,
      users: Users,
      heart: Heart,
      star: Star,
      award: Award,
      zap: Zap;
    };
    return iconMap[iconName] || Trophy;
  }
  
  switch (type) {
    case 'personal': return Target;
    case 'community': return Users;
    case 'ritual_complete': return Trophy;
    default: return CheckCircle;
  }
};

export function MilestoneCelebration({
  milestone,
  isVisible,
  onClose,
  onShare,
  className = ''
}: MilestoneCelebrationProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'enter' | 'celebrate' | 'settle'>('enter');
  
  const rarityConfig = getRarityConfig(milestone.rarity);
  const IconComponent = getMilestoneIcon(milestone.type, milestone.icon);
  
  useEffect(() => {
    if (isVisible) {
      setShowAnimation(true);
      setAnimationPhase('enter');
      
      // Trigger celebration animation after entry;
      const celebrateTimer = setTimeout(() => {
        setAnimationPhase('celebrate')
      }, 500);
      
      // Settle into final state;
      const settleTimer = setTimeout(() => {
        setAnimationPhase('settle')
      }, 2000);
      
      return () => {
        clearTimeout(celebrateTimer);
        clearTimeout(settleTimer)
      }}
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}>
      {/* Backdrop */}
      <div;
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />
      
      {/* Celebration Modal */}
      <Card className={`
        relative max-w-md w-full transform transition-all duration-500
        ${showAnimation;
          ? animationPhase === 'enter' 
            ? 'scale-50 opacity-0 translate-y-10' 
            : animationPhase === 'celebrate'
            ? 'scale-110 opacity-100 translate-y-0'
            : 'scale-100 opacity-100 translate-y-0'
          : 'scale-50 opacity-0'
        }
        border-2 ${rarityConfig.borderColor} shadow-2xl ${rarityConfig.glowColor}
      `}>
        {/* Animated background particles */}
        {animationPhase === 'celebrate' && (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {Array.from({length: 12)}.map((_, i) => (
              <div;
                key={i}
                className={`absolute w-2 h-2 ${rarityConfig.color} rounded-full animate-ping`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
          }}
              />
            ))}
          </div>
        )}
        
        <div className="p-8 text-center relative z-10">
          {/* Icon with glow effect */}
          <div className={`
            relative mx-auto mb-6 w-20 h-20 rounded-full;
            bg-gradient-to-r ${rarityConfig.bgColor}
            flex items-center justify-center;
            ${animationPhase === 'celebrate' ? 'animate-pulse shadow-2xl' : ''}
            transition-all duration-500
          `}>
            <IconComponent className="h-10 w-10 text-white" />
            
            {/* Sparkle effects */}
            {animationPhase === 'celebrate' && (
              <>
                <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-hive-gold animate-spin" />
                <Sparkles className="absolute -bottom-1 -left-2 h-3 w-3 text-hive-gold animate-spin" style={{ animationDelay: '0.5s' }} />
                <Sparkles className="absolute top-1 -right-3 h-2 w-2 text-hive-gold animate-spin" style={{ animationDelay: '1s' }} />
              </>
            )}
          </div>
          
          {/* Milestone Info */}
          <div className="mb-6">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${rarityConfig.color} bg-current/10`}>
              <Star className="h-3 w-3 mr-1" />
              {milestone.rarity.charAt(0).toUpperCase() + milestone.rarity.slice(1)} Milestone;
            </div>
            
            <h2 className="text-2xl font-bold text-hive-text-primary mb-2">
              {milestone.name}
            </h2>
            
            <p className="text-hive-text-secondary leading-relaxed">
              {milestone.description}
            </p>
          </div>
          
          {/* Community Stats */}
          {milestone.communityStats && (
            <div className="mb-6 p-4 bg-hive-surface-elevated rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-hive-brand-secondary" />
                  <span className="text-hive-text-secondary">Community Progress</span>
                </div>
                <span className="font-semibold text-hive-text-primary">
                  {milestone.communityStats.totalAchievers.toLocaleString()} achieved;
                </span>
              </div>
              <div className="mt-2 text-xs text-hive-text-secondary">
                {milestone.communityStats.percentageComplete}% of students have reached this milestone;
              </div>
            </div>
          )}
          
          {/* Unlocked Features */}
          {milestone.unlockedFeatures && milestone.unlockedFeatures.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-hive-gold/10 to-green-500/10 rounded-lg border border-hive-gold/20">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="h-4 w-4 text-hive-gold" />
                <span className="font-semibold text-hive-text-primary text-sm">
                  New Features Unlocked!
                </span>
              </div>
              <div className="space-y-1">
                {milestone.unlockedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    <span className="text-hive-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {onShare && (
              <Button;
                onClick={onShare}
                variant="secondary"
                className="flex-1 border-hive-gold/30 text-hive-gold hover:bg-hive-gold/10"
              >
                <Share className="h-4 w-4 mr-2" />
                Share Achievement;
              </Button>
            )}
            
            <Button;
              onClick={onClose}
              className="flex-1 bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90"
            >
              Continue Journey;
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        
        {/* Celebration confetti effect */}
        {animationPhase === 'celebrate' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-hive-gold transform rotate-45 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="absolute top-0 right-1/4 w-2 h-2 bg-purple-400 transform rotate-45 animate-bounce" style={{ animationDelay: '0.3s' }} />
            <div className="absolute bottom-0 left-1/3 w-2 h-2 bg-green-400 transform rotate-45 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-0 right-1/3 w-2 h-2 bg-blue-400 transform rotate-45 animate-bounce" style={{ animationDelay: '0.7s' }} />
          </div>
        )}
      </Card>
    </div>
  )
}