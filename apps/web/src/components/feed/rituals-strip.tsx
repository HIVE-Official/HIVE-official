"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Timer, 
  Users, 
  Trophy,
  Play,
  ChevronRight,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// TODO: Connect to real Firebase rituals collection
// For now, showing minimal mock to demonstrate UI
const mockRituals = [
  {
    id: 'focus_ritual_1',
    name: 'Focus Flow',
    title: 'Daily Focus Session',
    type: 'community' as const,
    status: 'active' as const,
    participantCount: 42,
    timeRemaining: '2h 15m',
    userParticipation: {
      status: 'active',
      currentStreak: 3,
      progressPercentage: 85
    }
  }
];

const RITUAL_TYPE_CONFIG = {
  community: {
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20'
  }
};

export function RitualsStrip() {
  const activeRituals = mockRituals.filter(ritual => 
    ritual.status === 'active' && ritual.userParticipation
  );

  if (activeRituals.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#0D0D0E] to-[var(--hive-background-tertiary)] border-b border-[var(--hive-white)]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--hive-gold)]" />
            <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">Active Rituals</h3>
          </div>
          <button className="text-xs text-gray-400 hover:text-[var(--hive-gold)] transition-colors flex items-center gap-1">
            View All
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {activeRituals.map((ritual, index) => {
            const config = RITUAL_TYPE_CONFIG[ritual.type] || RITUAL_TYPE_CONFIG.community;
            const Icon = config.icon;
            
            return (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex-shrink-0 w-80 p-4 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border rounded-xl hover:from-white/[0.05] hover:to-white/[0.02] transition-all cursor-pointer group",
                  config.borderColor
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bgColor)}>
                      <Icon className={cn("h-5 w-5", config.color)} />
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--hive-text-primary)] text-sm group-hover:text-[var(--hive-gold)] transition-colors">
                        {ritual.title}
                      </h4>
                      <p className="text-xs text-gray-400">{ritual.participantCount} participants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-400/10 text-green-400 rounded-md text-xs">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Live
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">Your Progress</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {ritual.userParticipation.progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-[var(--hive-white)]/[0.05] rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-[var(--hive-gold)] to-[#FF6B35] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${ritual.userParticipation.progressPercentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-[var(--hive-gold)]" />
                      <span>{ritual.userParticipation.currentStreak} streak</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      <span>{ritual.timeRemaining} left</span>
                    </div>
                  </div>
                  
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] rounded-lg text-xs font-medium hover:bg-[var(--hive-gold)]/30 transition-all">
                    <Play className="w-3 h-3" />
                    Continue
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}