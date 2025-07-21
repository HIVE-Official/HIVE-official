'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../framer-motion-proxy';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Shield, 
  Users, 
  Activity, 
  Settings,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { usePrivacyUtils } from '@hive/core';

interface GhostModeCardProps {
  userId?: string;
  isActive?: boolean;
  level?: 'invisible' | 'minimal' | 'selective' | 'normal';
  onToggle?: (enabled: boolean, level?: 'invisible' | 'minimal' | 'selective' | 'normal') => Promise<boolean>;
  onSettings?: () => void;
  className?: string;
}

const levelConfig = {
  invisible: {
    label: 'Invisible',
    description: 'Completely hidden from all discovery',
    icon: EyeOff,
    color: 'red',
    features: ['Hidden from directories', 'No activity tracking', 'Anonymous in spaces', 'No search results']
  },
  minimal: {
    label: 'Minimal',
    description: 'Basic visibility to space members only',
    icon: Eye,
    color: 'yellow',
    features: ['Visible to space members', 'Limited activity sharing', 'No public discovery', 'Private last seen']
  },
  selective: {
    label: 'Selective',
    description: 'Choose what to share and with whom',
    icon: Shield,
    color: 'blue',
    features: ['Custom visibility rules', 'Selective activity sharing', 'Space-specific settings', 'Friends list control']
  },
  normal: {
    label: 'Normal',
    description: 'Standard visibility and sharing',
    icon: Users,
    color: 'green',
    features: ['Full platform visibility', 'Activity sharing enabled', 'Discoverable in search', 'Public profile']
  }
};

export const GhostModeCard: React.FC<GhostModeCardProps> = ({
  userId,
  isActive = false,
  level = 'selective',
  onToggle,
  onSettings,
  className
}) => {
  const [loading, setLoading] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(level);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [scheduledEnd, setScheduledEnd] = useState<Date | null>(null);
  const privacyUtils = usePrivacyUtils();

  useEffect(() => {
    // Load current ghost mode status
    const loadGhostModeStatus = async () => {
      try {
        const status = await privacyUtils.getGhostModeStatus(userId);
        if (status) {
          setCurrentLevel(status.level as typeof level);
          if (status.duration) {
            setScheduledEnd(new Date(Date.now() + status.duration * 1000));
          }
        }
      } catch (error) {
        console.warn('Failed to load ghost mode status:', error);
      }
    };

    loadGhostModeStatus();
  }, [userId, privacyUtils]);

  const handleToggle = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const success = await (onToggle?.(
        !isActive, 
        !isActive ? currentLevel : undefined
      ) ?? privacyUtils.toggleGhostMode(!isActive, currentLevel));
      
      if (!success) {
        throw new Error('Failed to toggle ghost mode');
      }
    } catch (error) {
      console.error('Ghost mode toggle failed:', error);
      // TODO: Show error toast
    } finally {
      setLoading(false);
    }
  };

  const handleLevelChange = async (newLevel: typeof level) => {
    if (loading) return;

    setLoading(true);
    try {
      const success = await (onToggle?.(true, newLevel) ?? privacyUtils.toggleGhostMode(true, newLevel));
      
      if (success) {
        setCurrentLevel(newLevel);
        setShowLevelSelector(false);
      } else {
        throw new Error('Failed to change ghost mode level');
      }
    } catch (error) {
      console.error('Ghost mode level change failed:', error);
      // TODO: Show error toast
    } finally {
      setLoading(false);
    }
  };

  const currentConfig = levelConfig[currentLevel];
  const IconComponent = currentConfig.icon;

  return (
    <HiveCard className={cn('h-full p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2 rounded-lg',
            isActive ? 'bg-red-500/20' : 'bg-gray-500/20'
          )}>
            <IconComponent className={cn(
              'h-5 w-5',
              isActive ? 'text-red-400' : 'text-gray-400'
            )} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Ghost Mode</h3>
            <p className="text-xs text-gray-400">Privacy & Visibility Control</p>
          </div>
        </div>
        
        {onSettings && (
          <HiveButton
            variant="ghost"
            size="sm"
            onClick={onSettings}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="h-4 w-4" />
          </HiveButton>
        )}
      </div>

      {/* Status Display */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <HiveBadge 
            variant={isActive ? "active-tag" : "course-tag"}
            className={cn(
              'text-xs',
              isActive ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
            )}
          >
            {isActive ? 'ACTIVE' : 'INACTIVE'}
          </HiveBadge>
          
          {isActive && (
            <HiveBadge variant="tool-tag" className="text-xs">
              {currentConfig.label}
            </HiveBadge>
          )}
        </div>

        <p className="text-sm text-gray-300">
          {isActive 
            ? `You're currently ${currentConfig.label.toLowerCase()} on HIVE`
            : 'You\'re fully visible on HIVE'
          }
        </p>

        {scheduledEnd && isActive && (
          <div className="flex items-center gap-1 mt-2 text-xs text-yellow-400">
            <Clock className="h-3 w-3" />
            <span>Ends {scheduledEnd.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Current Level Info (when active) */}
      {isActive && (
        <div className="mb-6 p-4 rounded-lg bg-gray-800/50">
          <p className="text-sm text-gray-300 mb-3">{currentConfig.description}</p>
          <div className="space-y-1">
            {currentConfig.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-1 h-1 rounded-full bg-gray-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <HiveButton
          variant={isActive ? "outline" : "primary"}
          size="sm"
          onClick={handleToggle}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Updating...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {isActive ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              <span>{isActive ? 'Turn Off' : 'Turn On'} Ghost Mode</span>
            </div>
          )}
        </HiveButton>

        {isActive && (
          <HiveButton
            variant="ghost"
            size="sm"
            onClick={() => setShowLevelSelector(!showLevelSelector)}
            className="w-full text-gray-400 hover:text-white"
          >
            <Settings className="h-4 w-4 mr-2" />
            Change Privacy Level
          </HiveButton>
        )}
      </div>

      {/* Level Selector */}
      <AnimatePresence>
        {showLevelSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2 border-t border-gray-700 pt-4"
          >
            <p className="text-xs text-gray-400 mb-3">Choose your privacy level:</p>
            
            {Object.entries(levelConfig).map(([key, config]) => {
              const LevelIcon = config.icon;
              const isSelected = currentLevel === key;
              
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLevelChange(key as typeof level)}
                  disabled={loading || isSelected}
                  className={cn(
                    'w-full p-3 rounded-lg border text-left transition-colors',
                    isSelected
                      ? 'bg-hive-gold/20 border-hive-gold/30 text-hive-gold'
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 text-gray-300'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <LevelIcon className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{config.label}</p>
                      <p className="text-xs opacity-75 truncate">{config.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-hive-gold flex-shrink-0" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Warning for Invisible Mode */}
      {isActive && currentLevel === 'invisible' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-red-300 font-medium">Complete Privacy Mode</p>
              <p className="text-xs text-red-400/80 mt-1">
                You're completely hidden from discovery. Space leaders can still see you for moderation purposes.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </HiveCard>
  );
};

export default GhostModeCard;