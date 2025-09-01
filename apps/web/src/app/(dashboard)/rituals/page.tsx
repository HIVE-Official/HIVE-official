"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth, Badge } from '@hive/ui';
import { ErrorBoundary } from '../../../components/error-boundary';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Trophy, 
  Clock,
  Heart,
  Zap,
  Star,
  Target,
  ArrowRight,
  Play,
  CheckCircle,
  Timer
} from 'lucide-react';

// Types from rituals framework
interface Ritual {
  id: string;
  name: string;
  title: string;
  description: string;
  tagline: string;
  type: 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused' | 'cancelled' | 'archived';
  startTime: string;
  endTime?: string;
  duration?: number;
  participationType: 'individual' | 'collective' | 'progressive' | 'competitive' | 'collaborative' | 'creative' | 'social';
  maxParticipants?: number;
  universities: string[];
  isGlobal: boolean;
  metrics: {
    participationRate: number;
    completionRate: number;
    engagementScore: number;
    socialImpact: number;
  };
}

interface RitualParticipation {
  id: string;
  ritualId: string;
  userId: string;
  status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
  joinedAt: string;
  completedAt?: string;
  progressPercentage: number;
  rewardsEarned: string[];
  badgesAwarded: string[];
}

// Fetch rituals data with proper authentication
async function fetchRituals(user: any, getAuthToken: () => Promise<string | null>): Promise<{ rituals: Ritual[], participation: RitualParticipation[] }> {
  if (!user) {
    throw new Error('Authentication required');
  }

  const authToken = await getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };

  const response = await fetch('/api/rituals', { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch rituals: ${response.status}`);
  }
  
  const data = await response.json() as { rituals?: Ritual[]; participation?: RitualParticipation[] };
  return {
    rituals: data.rituals || [],
    participation: data.participation || []
  };
}

// Ritual type configurations
const RITUAL_TYPES = {
  onboarding: {
    icon: Sparkles,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    label: 'Welcome Experience'
  },
  seasonal: {
    icon: Calendar,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20',
    label: 'Campus Moment'
  },
  achievement: {
    icon: Trophy,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    label: 'Milestone'
  },
  community: {
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    label: 'Community Building'
  },
  creative: {
    icon: Star,
    color: 'text-pink-400',
    bgColor: 'bg-pink-900/20',
    label: 'Creative Challenge'
  },
  emergency: {
    icon: Zap,
    color: 'text-red-400',
    bgColor: 'bg-red-900/20',
    label: 'Campus Response'
  },
  legacy: {
    icon: Heart,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    label: 'Campus Tradition'
  }
};

// Participation type configurations
const PARTICIPATION_TYPES = {
  individual: { label: 'Personal Journey', icon: Target },
  collective: { label: 'Group Achievement', icon: Users },
  progressive: { label: 'Building Together', icon: ArrowRight },
  competitive: { label: 'Campus Challenge', icon: Trophy },
  collaborative: { label: 'Cross-Campus', icon: Heart },
  creative: { label: 'Creative Expression', icon: Star },
  social: { label: 'Social Connection', icon: Users }
};

export default function RitualsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const { user, getAuthToken } = useAuth();
  const isAuthenticated = !!user;

  const { data, isLoading, error } = useQuery({
    queryKey: ['rituals', user?.id],
    queryFn: () => fetchRituals(user, getAuthToken),
    staleTime: 300000, // 5 minutes
    enabled: isAuthenticated && !!user,
  });

  const rituals = data?.rituals || [];
  const participation = data?.participation || [];

  // Filter rituals by tab
  const filteredRituals = rituals.filter(ritual => {
    if (activeTab === 'active') return ritual.status === 'active';
    if (activeTab === 'upcoming') return ritual.status === 'scheduled';
    if (activeTab === 'completed') return ritual.status === 'completed';
    return false;
  });

  const handleJoinRitual = async (ritualId: string) => {
    if (!user) return;
    
    try {
      const authToken = await getAuthToken();
      const response = await fetch(`/api/rituals/${ritualId}/participate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ 
          action: 'join',
          entryPoint: 'ritual_browser'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to join ritual');
      }

      // Refresh data
      window.location.reload();
    } catch (error) {
      console.error('Failed to join ritual:', error);
      alert('Failed to join ritual. Please try again.');
    }
  };

  const getRitualParticipation = (ritualId: string) => {
    return participation.find(p => p.ritualId === ritualId);
  };

  const formatTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  // Show authentication required state
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-hive-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-hive-surface-elevated rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-hive-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
            Authentication Required
          </h3>
          <p className="text-hive-text-secondary">
            Please sign in to view campus rituals.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-hive-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-hive-brand-secondary rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-hive-text-secondary">Loading rituals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-hive-background flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-[var(--hive-text-inverse)]" />
          </div>
          <p className="text-hive-text-primary mb-2">Failed to load rituals</p>
          <p className="text-red-400 text-sm mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-hive-brand-secondary text-hive-text-primary rounded-lg hover:bg-hive-brand-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-hive-background">
        {/* Header */}
        <div className="border-b border-hive-border bg-hive-surface">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[var(--hive-text-inverse)]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-hive-text-primary">Campus Rituals</h1>
                <p className="text-hive-text-secondary">Shared experiences that build campus culture</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-hive-background rounded-lg p-1">
              {[
                { id: 'active', label: 'Active Now', icon: Play },
                { id: 'upcoming', label: 'Coming Soon', icon: Clock },
                { id: 'completed', label: 'Completed', icon: CheckCircle },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "active" | "upcoming" | "completed")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-hive-brand-secondary text-hive-text-primary shadow-sm'
                        : 'text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {filteredRituals.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-hive-surface rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-hive-text-secondary" />
              </div>
              <h3 className="text-lg font-medium text-hive-text-primary mb-2">
                {activeTab === 'active' && 'No active rituals'}
                {activeTab === 'upcoming' && 'No upcoming rituals'}
                {activeTab === 'completed' && 'No completed rituals'}
              </h3>
              <p className="text-hive-text-secondary">
                {activeTab === 'active' && 'Check back later for new campus experiences'}
                {activeTab === 'upcoming' && 'New rituals will appear here when scheduled'}
                {activeTab === 'completed' && 'Complete some rituals to see your history'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRituals.map((ritual) => {
                const typeConfig = RITUAL_TYPES[ritual.type];
                const participationConfig = PARTICIPATION_TYPES[ritual.participationType];
                const userParticipation = getRitualParticipation(ritual.id);
                const TypeIcon = typeConfig.icon;
                const ParticipationIcon = participationConfig.icon;

                return (
                  <div
                    key={ritual.id}
                    className="bg-hive-surface border border-hive-border rounded-xl p-6 hover:border-hive-brand-secondary/50 transition-all duration-200"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${typeConfig.bgColor} rounded-xl flex items-center justify-center`}>
                        <TypeIcon className={`h-6 w-6 ${typeConfig.color}`} />
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${typeConfig.bgColor} ${typeConfig.color}`}>
                          {typeConfig.label}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-hive-text-primary mb-1">
                        {ritual.title}
                      </h3>
                      <p className="text-hive-text-secondary text-sm mb-3">
                        {ritual.description}
                      </p>
                      <div className="flex items-center text-xs text-hive-text-secondary">
                        <ParticipationIcon className="h-3 w-3 mr-1" />
                        {participationConfig.label}
                      </div>
                    </div>

                    {/* Progress for active rituals */}
                    {ritual.status === 'active' && userParticipation && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-hive-text-secondary">Progress</span>
                          <span className="text-hive-text-primary font-medium">
                            {userParticipation.progressPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-hive-background rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-hive-brand-secondary to-hive-brand-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${userParticipation.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-2 bg-hive-background rounded-lg">
                        <div className="text-lg font-semibold text-hive-text-primary">
                          {Math.round(ritual.metrics.participationRate)}%
                        </div>
                        <div className="text-xs text-hive-text-secondary">Participation</div>
                      </div>
                      <div className="text-center p-2 bg-hive-background rounded-lg">
                        <div className="text-lg font-semibold text-hive-text-primary">
                          {Math.round(ritual.metrics.engagementScore)}
                        </div>
                        <div className="text-xs text-hive-text-secondary">Engagement</div>
                      </div>
                    </div>

                    {/* Time remaining for active rituals */}
                    {ritual.status === 'active' && ritual.endTime && (
                      <div className="flex items-center text-sm text-hive-text-secondary mb-4">
                        <Timer className="h-4 w-4 mr-2" />
                        {formatTimeRemaining(ritual.endTime)}
                      </div>
                    )}

                    {/* Rewards */}
                    {userParticipation && userParticipation.badgesAwarded.length > 0 && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-hive-text-secondary">
                          {userParticipation.badgesAwarded.length} badges earned
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-2 border-t border-hive-border">
                      {userParticipation ? (
                        userParticipation.status === 'completed' ? (
                          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-900/20 text-green-400 rounded-lg cursor-default">
                            <CheckCircle className="h-4 w-4" />
                            <span>Completed</span>
                          </button>
                        ) : (
                          <button 
                            onClick={() => window.location.href = `/rituals/${ritual.id}`}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-hive-brand-secondary text-hive-text-primary rounded-lg hover:bg-hive-brand-hover transition-colors"
                          >
                            <Play className="h-4 w-4" />
                            <span>Continue</span>
                          </button>
                        )
                      ) : ritual.status === 'active' ? (
                        <button 
                          onClick={() => handleJoinRitual(ritual.id)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-hive-brand-secondary to-hive-brand-primary text-[var(--hive-text-inverse)] rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <ArrowRight className="h-4 w-4" />
                          <span>Join Ritual</span>
                        </button>
                      ) : (
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-hive-surface text-hive-text-secondary rounded-lg cursor-default">
                          <Clock className="h-4 w-4" />
                          <span>
                            {ritual.status === 'scheduled' ? 'Starting Soon' : 'Ended'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}