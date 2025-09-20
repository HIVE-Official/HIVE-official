'use client';

import React from 'react';
import { ProfileStatsProps } from './types';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { TrendingUp, Users, Wrench, Zap, Calendar, Activity, Loader2 } from 'lucide-react';

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  stats,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <HiveCard className="p-6">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--hive-brand-secondary)]" />
        </div>
      </HiveCard>
    )
  }

  const statItems = [
    {
      icon: <Users className="h-5 w-5" />,
      label: 'Total Spaces',
      value: stats.totalSpaces,
      subValue: `${stats.activeSpaces} active`,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      label: 'Tools Created',
      value: stats.toolsCreated,
      subValue: 'Builder status',
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: 'Connections',
      value: stats.connectionsCount,
      subValue: 'Campus network',
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500/30'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: 'Day Streak',
      value: stats.streakDays,
      subValue: 'Keep it up!',
      color: 'text-[var(--hive-brand-secondary)]',
      bgColor: 'from-hive-gold/20 to-yellow-400/20',
      borderColor: 'border-hive-gold/30'
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: 'Total Activity',
      value: stats.totalActivity,
      subValue: 'All time',
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-500/30'
    }
  ];

  return (
    <HiveCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
          Your Stats
        </h2>
        <HiveButton variant="outline" size="sm">
          View Analytics
        </HiveButton>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statItems.map((stat) => (
          <div 
            key={stat.label}
            className={`bg-gradient-to-r ${stat.bgColor} border ${stat.borderColor} rounded-lg p-4 text-center hover:border-opacity-60 transition-all`}
          >
            <div className={`w-12 h-12 bg-[var(--hive-text-primary)]/10 rounded-lg flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            
            <div className="text-2xl font-bold text-[var(--hive-text-primary)] mb-1">
              {stat.value}
            </div>
            
            <div className="text-sm font-medium text-gray-300 mb-1">
              {stat.label}
            </div>
            
            <div className="text-xs text-gray-400">
              {stat.subValue}
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="mt-8 pt-6 border-t border-hive-border-secondary">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Recent Achievements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.streakDays >= 7 && (
            <div className="flex items-center gap-3 p-3 bg-[var(--hive-brand-secondary)]/10 rounded-lg border border-hive-gold/20">
              <div className="w-10 h-10 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
              </div>
              <div>
                <div className="font-medium text-[var(--hive-text-primary)]">Week Warrior</div>
                <div className="text-sm text-gray-400">7+ day activity streak</div>
              </div>
            </div>
          )}
          
          {stats.totalSpaces >= 5 && (
            <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="font-medium text-[var(--hive-text-primary)]">Community Explorer</div>
                <div className="text-sm text-gray-400">Joined 5+ spaces</div>
              </div>
            </div>
          )}
          
          {stats.toolsCreated >= 1 && (
            <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Wrench className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="font-medium text-[var(--hive-text-primary)]">Tool Creator</div>
                <div className="text-sm text-gray-400">Built your first tool</div>
              </div>
            </div>
          )}
          
          {stats.connectionsCount >= 50 && (
            <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="font-medium text-[var(--hive-text-primary)]">Super Connector</div>
                <div className="text-sm text-gray-400">50+ campus connections</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-hive-gold/10 to-yellow-400/10 rounded-lg border border-hive-gold/20">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
          <span className="text-sm font-medium text-[var(--hive-text-primary)]">Activity Insights</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-400">Most Active</div>
            <div className="text-[var(--hive-text-primary)]">Weekday afternoons</div>
          </div>
          <div>
            <div className="text-gray-400">Best Streak</div>
            <div className="text-[var(--hive-text-primary)]">{Math.max(stats.streakDays, 12)} days</div>
          </div>
        </div>
      </div>
    </HiveCard>
  )
};

export default ProfileStats;