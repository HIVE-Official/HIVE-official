"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3, 
  Crown,
  ChevronUp,
  ChevronDown,
  Pin,
  Trash2,
  Lock,
  UserCog,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button, Badge } from "@hive/ui";
import { cn } from '../../lib/utils';

export type LeaderMode = 'moderate' | 'manage' | 'configure' | 'insights' | null;

interface LeaderToolbarProps {
  isVisible: boolean;
  currentMode: LeaderMode;
  onModeChange: (mode: LeaderMode) => void;
  spaceRole: 'owner' | 'admin' | 'moderator';
  className?: string;
}

const LEADER_MODES = {
  moderate: {
    icon: Shield,
    label: 'Moderate',
    description: 'Pin, delete, and manage content',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  manage: {
    icon: Users,
    label: 'Manage',
    description: 'Member roles and permissions',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  },
  configure: {
    icon: Settings,
    label: 'Configure',
    description: 'Space settings and rules',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  insights: {
    icon: BarChart3,
    label: 'Insights',
    description: 'Analytics and engagement data',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  }
} as const;

export function LeaderToolbar({ 
  isVisible, 
  currentMode, 
  onModeChange, 
  spaceRole,
  className 
}: LeaderToolbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const availableModes = Object.entries(LEADER_MODES).filter(([mode]) => {
    // All roles can moderate and manage
    if (mode === 'moderate' || mode === 'manage') return true;
    // Only admin+ can configure and view insights
    if (mode === 'configure' || mode === 'insights') return spaceRole === 'owner' || spaceRole === 'admin';
    return true;
  });

  if (!isVisible) return null;

  return (
    <motion.div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Main Toolbar */}
      <div className="relative">
        {/* Expanded Mode Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-16 right-0 space-y-2 w-48"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {availableModes.map(([modeKey, modeConfig]) => {
                const mode = modeKey as LeaderMode;
                const ModeIcon = modeConfig.icon;
                const isActive = currentMode === mode;
                
                return (
                  <motion.button
                    key={mode}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0A] border transition-all text-left",
                      isActive 
                        ? `${modeConfig.borderColor} ${modeConfig.bgColor}` 
                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                    )}
                    onClick={() => {
                      onModeChange(isActive ? null : mode);
                      setIsExpanded(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ModeIcon className={cn(
                      "w-5 h-5",
                      isActive ? modeConfig.color : "text-neutral-400"
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        "font-medium text-sm",
                        isActive ? "text-white" : "text-neutral-300"
                      )}>
                        {modeConfig.label}
                      </div>
                      <div className="text-xs text-neutral-400 truncate">
                        {modeConfig.description}
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        className={cn("w-2 h-2 rounded-full", modeConfig.color.replace('text-', 'bg-'))}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          className={cn(
            "flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm border transition-all shadow-lg",
            currentMode 
              ? `${LEADER_MODES[currentMode].borderColor} ${LEADER_MODES[currentMode].bgColor}` 
              : "bg-[#0A0A0A]/90 border-white/10 hover:border-white/20"
          )}
          onClick={() => {
            if (currentMode) {
              onModeChange(null);
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentMode ? (
            // Active Mode Display
            <>
              {React.createElement(LEADER_MODES[currentMode].icon, {
                className: cn("w-5 h-5", LEADER_MODES[currentMode].color)
              })}
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">
                  {LEADER_MODES[currentMode].label} Mode
                </span>
                <Badge variant="leadership" className="text-xs px-2 py-0.5 bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                  Active
                </Badge>
              </div>
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FFD700]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </>
          ) : (
            // Default Leadership Button
            <>
              <Crown className="w-5 h-5 text-[#FFD700]" />
              <span className="text-white font-medium text-sm">Leadership</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUp className="w-4 h-4 text-neutral-400" />
              </motion.div>
            </>
          )}
        </motion.button>

        {/* Mode Indicator Help */}
        {currentMode && (
          <motion.div
            className="absolute -top-12 right-0 bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-300 whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            {LEADER_MODES[currentMode].description}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/10" />
          </motion.div>
        )}
      </div>

      {/* Quick Actions (when in active mode) */}
      {currentMode && (
        <motion.div
          className="absolute -top-16 right-0 flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          {currentMode === 'moderate' && (
            <>
              <Button size="sm" variant="outline" className="border-red-400/30 text-red-400 hover:bg-red-400/10">
                <Pin className="w-3 h-3 mr-1" />
                Pin
              </Button>
              <Button size="sm" variant="outline" className="border-red-400/30 text-red-400 hover:bg-red-400/10">
                <Lock className="w-3 h-3 mr-1" />
                Lock
              </Button>
            </>
          )}
          
          {currentMode === 'manage' && (
            <>
              <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10">
                <UserCog className="w-3 h-3 mr-1" />
                Roles
              </Button>
              <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10">
                <Users className="w-3 h-3 mr-1" />
                Members
              </Button>
            </>
          )}
          
          {currentMode === 'insights' && (
            <Button size="sm" variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10">
              <Eye className="w-3 h-3 mr-1" />
              Analytics
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Helper hook for leader mode context
export function useLeaderMode() {
  const [currentMode, setCurrentMode] = useState<LeaderMode>(null);
  
  const toggleMode = (mode: LeaderMode) => {
    setCurrentMode(currentMode === mode ? null : mode);
  };
  
  const exitMode = () => {
    setCurrentMode(null);
  };
  
  return {
    currentMode,
    toggleMode,
    exitMode,
    isInMode: (mode: LeaderMode) => currentMode === mode,
    isInAnyMode: currentMode !== null
  };
}