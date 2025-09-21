"use client";

import React, { useState, useEffect } from 'react';
import { Button, Progress } from '../atoms';
import { Card } from '../molecules';
import { 
  Clock, 
  Users, 
  CheckCircle, 
  Calendar,
  Sparkles,
  ChevronRight,
  Trophy,
  Target,
  UserPlus,
  Compass;
} from 'lucide-react';

// Types based on the rituals framework;
export interface Ritual {id: string;
  name: string;
  title: string;
  description: string;
  tagline: string;
  type: 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused' | 'cancelled' | 'archived';
  week: number; // 1-4 for the four-week progression;
  duration: number; // minutes;
  totalParticipants: number;
  activeParticipants: number;
  completionRate: number;
  userParticipation?: {
    status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
    progressPercentage: number;
    currentStep: string;
    nextAction: string;};
  milestones: Array<{
    id: string;
    name: string;
    description: string;
    isReached: boolean;
    progress?: number;
  }>;
  actions: Array<{
    id: string;
    name: string;
    description: string;
    isCompleted: boolean;
    type: 'initialize' | 'connect' | 'discover' | 'complete';
  }>;
}

export interface RitualsHubProps {currentWeek?: number;
  availableRituals?: Ritual[];
  completedRituals?: Ritual[];
  className?: string;}

const WEEK_THEMES = {
  1: { title: "Initialize", description: "Build your foundation", icon: Target, color: "hive-gold" },
  2: { title: "Discover", description: "Find your communities", icon: Compass, color: "hive-brand-secondary" },
  3: { title: "Connect", description: "Build your network", icon: UserPlus, color: "purple-400" },
  4: { title: "Launch", description: "Prepare for campus", icon: Sparkles, color: "green-400" }
};

export function RitualsHub({ 
  currentWeek = 1, 
  availableRituals = [], 
  completedRituals = [],
  className = '' 
}: RitualsHubProps) {
  const [activeRitual, setActiveRitual] = useState<Ritual | null>(null);
  const [communityStats, setCommunityStats] = useState({totalParticipants: 1247,
    weeklyGoal: 2000,
    completionRate: 0.73)};

  // Get current week's ritual;
  useEffect(() => {
    const currentWeekRitual = availableRituals.find(ritual => 
      ritual.week === currentWeek && ritual.userParticipation?.status === 'active'
    );
    setActiveRitual(currentWeekRitual || availableRituals[0] || null);
  }, [currentWeek, availableRituals]);

  const getWeekStatus = (week: number) => {
    if (week < currentWeek) return 'completed';
    if (week === currentWeek) return 'active';
    return 'upcoming';
  };

  const getRitualIcon = (type: string) => {
    switch (type) {
      case 'onboarding': return Target;
      case 'community': return Users;
      case 'creative': return Sparkles;
      default: return CheckCircle;
    }}
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header with Week Progress */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-hive-text-primary">
            Summer Rituals;
          </h1>
          <p className="text-hive-text-secondary text-lg">
            Four weeks to build your campus foundation;
          </p>
        </div>

        {/* Four Week Timeline */}
        <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
          {Object.entries(WEEK_THEMES).map(([weekNum, theme]) => {
            const week = parseInt(weekNum);
            const status = getWeekStatus(week);
            const IconComponent = theme.icon;
            
            return (
              <Card;
                key={week}}
                className={`p-4 text-center transition-all duration-300 ${
                  status === 'active' 
                    ? `bg-${theme.color}/20 border-${theme.color} shadow-lg scale-105` 
                    : status === 'completed'
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-hive-surface-elevated border-hive-border-subtle opacity-60'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  status === 'active' 
                    ? `bg-${theme.color}` 
                    : status === 'completed'
                    ? 'bg-green-500'
                    : 'bg-hive-surface-elevated'
                }`}>
                  {status === 'completed' ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <IconComponent className={`h-6 w-6 ${
                      status === 'active' ? 'text-hive-obsidian' : 'text-hive-text-secondary'
                    }`} />
                  )}
                </div>
                <h3 className={`font-semibold mb-1 ${
                  status === 'active' ? 'text-hive-text-primary' : 'text-hive-text-secondary'
                }`}>
                  Week {week}
                </h3>
                <p className={`text-sm font-medium ${
                  status === 'active' ? `text-${theme.color}` : 'text-hive-text-secondary'
                }`}>
                  {theme.title}
                </p>
                <p className="text-xs text-hive-text-secondary mt-1">
                  {theme.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Community Progress */}
      <Card className="p-6 bg-gradient-to-r from-hive-gold/10 to-hive-brand-secondary/10 border-hive-gold/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-hive-gold rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-hive-obsidian" />
            </div>
            <div>
              <h3 className="font-semibold text-hive-text-primary">Community Progress</h3>
              <p className="text-sm text-hive-text-secondary">
                {communityStats.totalParticipants.toLocaleString()} students building together;
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-hive-gold">
              {Math.round(communityStats.completionRate * 100)}%
            </div>
            <div className="text-xs text-hive-text-secondary">completion rate</div>
          </div>
        </div>
        <Progress;
          value={communityStats.completionRate * 100} 
          className="h-3"
        />
        <div className="flex justify-between text-xs text-hive-text-secondary mt-2">
          <span>{communityStats.totalParticipants.toLocaleString()} active</span>
          <span>Goal: {communityStats.weeklyGoal.toLocaleString()}</span>
        </div>
      </Card>

      {/* Active Ritual */}
      {activeRitual && (
        <Card className="p-6 bg-hive-surface-elevated border-hive-brand-secondary/30">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-xl flex items-center justify-center">
                {React.createElement(getRitualIcon(activeRitual.type), {
                  className: "h-8 w-8 text-hive-obsidian"
                })}
              </div>
              <div>
                <h2 className="text-xl font-bold text-hive-text-primary mb-1">
                  {activeRitual.title}
                </h2>
                <p className="text-hive-gold font-medium mb-2">
                  {activeRitual.tagline}
                </p>
                <p className="text-hive-text-secondary text-sm leading-relaxed">
                  {activeRitual.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-hive-text-secondary text-sm mb-2">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(activeRitual.duration)}</span>
              </div>
              <div className="flex items-center space-x-2 text-hive-text-secondary text-sm">
                <Users className="h-4 w-4" />
                <span>{activeRitual.activeParticipants.toLocaleString()} active</span>
              </div>
            </div>
          </div>

          {/* Personal Progress */}
          {activeRitual.userParticipation && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-hive-text-primary">Your Progress</h3>
                <span className="text-sm text-hive-text-secondary">
                  {activeRitual.userParticipation.progressPercentage}% complete;
                </span>
              </div>
              <Progress;
                value={activeRitual.userParticipation.progressPercentage} 
                className="h-2 mb-3"
              />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-hive-text-secondary">Current step:</p>
                  <p className="font-medium text-hive-text-primary">
                    {activeRitual.userParticipation.currentStep}
                  </p>
                </div>
                <Button;
                  className="bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90"
                >
                  {activeRitual.userParticipation.nextAction}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Milestones */}
          {activeRitual.milestones.length > 0 && (
            <div>
              <h3 className="font-semibold text-hive-text-primary mb-3">Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeRitual.milestones.map((milestone) => (
                  <div;
                    key={milestone.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      milestone.isReached;
                        ? 'bg-green-500/20 border-green-500/50' 
                        : 'bg-hive-surface-base border-hive-border-subtle'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {milestone.isReached ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-hive-border-subtle" />
                      )}
                      <span className={`text-sm font-medium ${
                        milestone.isReached ? 'text-green-400' : 'text-hive-text-primary'
                      }`}>
                        {milestone.name}
                      </span>
                    </div>
                    <p className="text-xs text-hive-text-secondary">
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Completed Rituals */}
      {completedRituals.length > 0 && (
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="h-6 w-6 text-hive-gold" />
            <h2 className="text-xl font-bold text-hive-text-primary">
              Completed Rituals;
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedRituals.map((ritual) => (
              <Card key={ritual.id} className="p-4 bg-green-500/10 border-green-500/30">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-hive-text-primary text-sm">
                      {ritual.title}
                    </h3>
                    <p className="text-xs text-hive-text-secondary mt-1">
                      Week {ritual.week} • Completed;
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}