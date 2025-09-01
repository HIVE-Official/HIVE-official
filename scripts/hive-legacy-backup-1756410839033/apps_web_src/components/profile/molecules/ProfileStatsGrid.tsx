"use client";

import React from 'react';
import { Users, Zap, TrendingUp, Award } from 'lucide-react';
import { ProfileStat } from '../atoms/ProfileStat';

interface ProfileStatsGridProps {
  stats: {
    connections?: number;
    spaces?: number;
    tools?: number;
    achievements?: number;
  };
  trends?: {
    connections?: { direction: 'up' | 'down' | 'neutral'; value: string };
    spaces?: { direction: 'up' | 'down' | 'neutral'; value: string };
    tools?: { direction: 'up' | 'down' | 'neutral'; value: string };
    achievements?: { direction: 'up' | 'down' | 'neutral'; value: string };
  };
  onStatClick?: (statType: 'connections' | 'spaces' | 'tools' | 'achievements') => void;
  isLoading?: boolean;
  className?: string;
}

export function ProfileStatsGrid({ 
  stats, 
  trends, 
  onStatClick,
  isLoading = false,
  className = '' 
}: ProfileStatsGridProps) {
  return (
    <div className={`
      grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4
      ${className}
    `}>
      <ProfileStat
        icon={Users}
        label="Connections"
        value={stats.connections || 0}
        trend={trends?.connections}
        onClick={onStatClick ? () => onStatClick('connections') : undefined}
        isLoading={isLoading}
      />
      
      <ProfileStat
        icon={Zap}
        label="Spaces"
        value={stats.spaces || 0}
        trend={trends?.spaces}
        onClick={onStatClick ? () => onStatClick('spaces') : undefined}
        isLoading={isLoading}
      />
      
      <ProfileStat
        icon={TrendingUp}
        label="Tools Used"
        value={stats.tools || 0}
        trend={trends?.tools}
        onClick={onStatClick ? () => onStatClick('tools') : undefined}
        isLoading={isLoading}
      />
      
      <ProfileStat
        icon={Award}
        label="Achievements"
        value={stats.achievements || 0}
        trend={trends?.achievements}
        onClick={onStatClick ? () => onStatClick('achievements') : undefined}
        isLoading={isLoading}
      />
    </div>
  );
}