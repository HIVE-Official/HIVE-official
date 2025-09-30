"use client";

import React, { useState } from 'react';
import { Card, Badge } from '@hive/ui';
import {
  Sparkles,
  Users,
  Trophy,
  Calendar,
  Star,
  Zap,
  Heart,
  Play,
  CheckCircle,
  Timer,
  ChevronRight
} from 'lucide-react';

interface Ritual {
  id: string;
  name: string;
  title: string;
  description: string;
  type: 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
  status: 'active' | 'upcoming' | 'completed';
  startTime?: string;
  endTime?: string;
  participation?: {
    progressPercentage: number;
    status: 'joined' | 'active' | 'completed';
  };
  metrics: {
    participationRate: number;
    engagementScore: number;
  };
}

interface RitualStoriesStripProps {
  rituals: Ritual[];
  onRitualClick: (ritual: Ritual) => void;
  className?: string;
}

const RITUAL_ICONS = {
  onboarding: Sparkles,
  seasonal: Calendar,
  achievement: Trophy,
  community: Users,
  creative: Star,
  emergency: Zap,
  legacy: Heart
};

const RITUAL_COLORS = {
  onboarding: 'from-purple-500 to-pink-500',
  seasonal: 'from-orange-500 to-red-500',
  achievement: 'from-yellow-500 to-orange-500',
  community: 'from-blue-500 to-purple-500',
  creative: 'from-pink-500 to-purple-500',
  emergency: 'from-red-500 to-orange-500',
  legacy: 'from-green-500 to-blue-500'
};

export function RitualStoriesStrip({ rituals, onRitualClick, className = '' }: RitualStoriesStripProps) {
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);

  if (!rituals || rituals.length === 0) {
    return null; // Hide strip when no rituals
  }

  const handleRitualClick = (ritual: Ritual) => {
    setSelectedRitual(ritual.id);
    onRitualClick(ritual);
  };

  const formatTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Ended';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d remaining`;
    return `${hours}h remaining`;
  };

  return (
    <div className={`bg-hive-surface border-b border-hive-border ${className}`}>
      <div className="max-w-2xl mx-auto px-6 py-4">
        {/* Stories Strip */}
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
          {rituals.map((ritual) => {
            const RitualIcon = RITUAL_ICONS[ritual.type];
            const gradientColor = RITUAL_COLORS[ritual.type];
            const isActive = ritual.status === 'active';
            const isCompleted = ritual.participation?.status === 'completed';
            const hasProgress = ritual.participation && ritual.participation.progressPercentage > 0;

            return (
              <div key={ritual.id} className="flex-shrink-0">
                <button
                  onClick={() => handleRitualClick(ritual)}
                  className="relative flex flex-col items-center space-y-2 group"
                >
                  {/* Story Ring */}
                  <div className={`relative w-16 h-16 rounded-full p-0.5 ${
                    isActive && hasProgress
                      ? `bg-gradient-to-r ${gradientColor}`
                      : isCompleted
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-hive-border'
                  }`}>
                    {/* Progress Ring for Active Rituals */}
                    {isActive && hasProgress && (
                      <svg className="absolute inset-0 w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="text-hive-surface"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={`${(ritual.participation!.progressPercentage / 100) * 175.93} 175.93`}
                          className="text-white"
                        />
                      </svg>
                    )}

                    {/* Icon Container */}
                    <div className="w-full h-full bg-hive-background rounded-full flex items-center justify-center">
                      {isCompleted ? (
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      ) : (
                        <RitualIcon className={`h-8 w-8 ${
                          isActive ? 'text-white' : 'text-hive-text-secondary'
                        }`} />
                      )}
                    </div>

                    {/* Status Indicator */}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-hive-surface flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Ritual Name */}
                  <div className="text-center max-w-[80px]">
                    <p className="text-xs font-medium text-hive-text-primary truncate">
                      {ritual.name}
                    </p>
                    {isActive && ritual.endTime && (
                      <p className="text-xs text-hive-text-secondary">
                        {formatTimeRemaining(ritual.endTime)}
                      </p>
                    )}
                    {ritual.status === 'upcoming' && (
                      <p className="text-xs text-orange-400">
                        Coming Soon
                      </p>
                    )}
                  </div>
                </button>
              </div>
            );
          })}

          {/* View All Rituals Button */}
          <div className="flex-shrink-0 ml-2">
            <button
              onClick={() => window.location.href = '/rituals'}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="w-16 h-16 border-2 border-dashed border-hive-border rounded-full flex items-center justify-center group-hover:border-[var(--hive-brand-primary)] transition-colors">
                <ChevronRight className="h-6 w-6 text-hive-text-secondary group-hover:text-[var(--hive-brand-primary)] transition-colors" />
              </div>
              <p className="text-xs text-hive-text-secondary group-hover:text-[var(--hive-brand-primary)] transition-colors">
                View All
              </p>
            </button>
          </div>
        </div>

        {/* Active Ritual Quick Info */}
        {rituals.some(r => r.status === 'active') && (
          <div className="mt-4 p-3 bg-hive-background-overlay rounded-lg">
            {rituals
              .filter(r => r.status === 'active')
              .slice(0, 1)
              .map(ritual => (
                <div key={ritual.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Play className="h-4 w-4 text-[var(--hive-brand-primary)]" />
                      <span className="text-sm font-medium text-hive-text-primary">
                        {ritual.title}
                      </span>
                    </div>
                    {ritual.metrics?.participationRate !== undefined && (
                      <Badge className="text-xs bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]">
                        {Math.round(ritual.metrics.participationRate)}% participating
                      </Badge>
                    )}
                  </div>

                  <button
                    onClick={() => handleRitualClick(ritual)}
                    className="text-sm text-[var(--hive-brand-primary)] hover:text-hive-champagne transition-colors"
                  >
                    {ritual.participation?.status === 'active' ? 'Continue' : 'Join'}
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}