"use client";

// import { useState, useEffect } from 'react'; // TODO: For future interactive features
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useSession } from '../../../../hooks/use-session';
import { ErrorBoundary } from '../../../../components/error-boundary';
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
  // Badge, // TODO: For future badge display features
  ArrowRight,
  // Play, // TODO: For future video/interactive features
  CheckCircle,
  Timer,
  ArrowLeft,
  Award,
  Flame
} from 'lucide-react';

// Types from rituals framework
interface RitualDetail {
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
  universities: string[];
  actions: RitualAction[];
  milestones: RitualMilestone[];
  rewards: RitualReward[];
  metrics: {
    participationRate: number;
    completionRate: number;
    engagementScore: number;
    socialImpact: number;
  };
  userParticipation?: {
    id: string;
    status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
    joinedAt: string;
    completedAt?: string;
    progressPercentage: number;
    actionsCompleted: string[];
    rewardsEarned: string[];
    badgesAwarded: string[];
  };
}

interface RitualAction {
  id: string;
  type: 'post' | 'join_space' | 'create_tool' | 'interact' | 'vote' | 'share' | 'comment' | 'attend';
  name: string;
  description: string;
  isRequired: boolean;
  weight: number;
  maxOccurrences?: number;
  timeLimit?: number;
}

interface RitualMilestone {
  id: string;
  name: string;
  description: string;
  participantThreshold: number;
  progressThreshold: number;
  isReached: boolean;
  reachedAt?: string;
}

interface RitualReward {
  id: string;
  type: 'badge' | 'feature' | 'access' | 'recognition' | 'tool' | 'customization';
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  isTimeLimited: boolean;
  expiresAt?: string;
}

// Fetch ritual detail
async function fetchRitualDetail(ritualId: string): Promise<RitualDetail> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson) as { token: string };
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
    } else {
      headers.Authorization = `Bearer test-token`;
    }
  } catch {
    headers.Authorization = `Bearer test-token`;
  }

  const response = await fetch(`/api/rituals/${ritualId}`, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ritual: ${response.status}`);
  }
  
  const data = await response.json() as { ritual: RitualDetail };
  return data.ritual;
}

// Ritual type configurations
const RITUAL_TYPES = {
  onboarding: {
    icon: Sparkles,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    gradient: 'from-purple-400 to-pink-400',
    label: 'Welcome Experience'
  },
  seasonal: {
    icon: Calendar,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20',
    gradient: 'from-orange-400 to-red-400',
    label: 'Campus Moment'
  },
  achievement: {
    icon: Trophy,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    gradient: 'from-yellow-400 to-orange-400',
    label: 'Milestone'
  },
  community: {
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    gradient: 'from-blue-400 to-cyan-400',
    label: 'Community Building'
  },
  creative: {
    icon: Star,
    color: 'text-pink-400',
    bgColor: 'bg-pink-900/20',
    gradient: 'from-pink-400 to-purple-400',
    label: 'Creative Challenge'
  },
  emergency: {
    icon: Zap,
    color: 'text-red-400',
    bgColor: 'bg-red-900/20',
    gradient: 'from-red-400 to-pink-400',
    label: 'Campus Response'
  },
  legacy: {
    icon: Heart,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    gradient: 'from-green-400 to-teal-400',
    label: 'Campus Tradition'
  }
};

const ACTION_TYPES = {
  post: { icon: Star, label: 'Share Post' },
  join_space: { icon: Users, label: 'Join Space' },
  create_tool: { icon: Zap, label: 'Create Tool' },
  interact: { icon: Heart, label: 'Interact' },
  vote: { icon: Target, label: 'Vote' },
  share: { icon: ArrowRight, label: 'Share' },
  comment: { icon: Star, label: 'Comment' },
  attend: { icon: Calendar, label: 'Attend Event' }
};

export default function RitualDetailPage() {
  const params = useParams();
  const ritualId = params.ritualId as string;
  useSession(); // TODO: Will be used for personalization features

  const { data: ritual, isLoading, error } = useQuery({
    queryKey: ['ritual', ritualId],
    queryFn: () => fetchRitualDetail(ritualId),
    staleTime: 300000, // 5 minutes
  });

  const handleCompleteAction = async (actionId: string) => {
    try {
      const response = await fetch(`/api/rituals/${ritualId}/participate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer test-token`,
        },
        body: JSON.stringify({ 
          action: 'complete_action',
          actionId 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete action');
      }

      // Refresh data
      window.location.reload();
    } catch (error) {
      console.error('Failed to complete action:', error);
      alert('Failed to complete action. Please try again.');
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-hive-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-hive-brand-secondary rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-hive-text-secondary">Loading ritual...</p>
        </div>
      </div>
    );
  }

  if (error || !ritual) {
    return (
      <div className="min-h-screen bg-hive-background flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-[var(--hive-text-inverse)]" />
          </div>
          <p className="text-hive-text-primary mb-2">Ritual not found</p>
          <p className="text-red-400 text-sm mb-4">{error?.message || 'This ritual does not exist'}</p>
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 bg-hive-brand-secondary text-hive-text-primary rounded-lg hover:bg-hive-brand-hover transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const typeConfig = RITUAL_TYPES[ritual.type];
  const TypeIcon = typeConfig.icon;
  const isParticipating = !!ritual.userParticipation;
  const progress = ritual.userParticipation?.progressPercentage || 0;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-hive-background">
        {/* Header */}
        <div className="border-b border-hive-border bg-hive-surface">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Back button */}
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-hive-text-secondary hover:text-hive-text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Rituals</span>
            </button>

            {/* Ritual Header */}
            <div className="flex items-start space-x-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${typeConfig.gradient} rounded-2xl flex items-center justify-center`}>
                <TypeIcon className="h-8 w-8 text-[var(--hive-text-inverse)]" />
              </div>
              
              <div className="flex-1">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${typeConfig.bgColor} ${typeConfig.color} mb-2`}>
                  {typeConfig.label}
                </div>
                <h1 className="text-3xl font-bold text-hive-text-primary mb-2">{ritual.title}</h1>
                <p className="text-lg text-hive-text-secondary mb-4">{ritual.description}</p>
                <p className="text-hive-text-accent font-medium italic">&ldquo;{ritual.tagline}&rdquo;</p>
              </div>
            </div>

            {/* Status and Progress */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-hive-background rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="h-4 w-4 text-hive-text-secondary" />
                  <span className="text-sm text-hive-text-secondary">Time Remaining</span>
                </div>
                <div className="text-lg font-semibold text-hive-text-primary">
                  {ritual.endTime ? formatTimeRemaining(ritual.endTime) : 'No time limit'}
                </div>
              </div>

              <div className="bg-hive-background rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-hive-text-secondary" />
                  <span className="text-sm text-hive-text-secondary">Participation</span>
                </div>
                <div className="text-lg font-semibold text-hive-text-primary">
                  {Math.round(ritual.metrics.participationRate)}%
                </div>
              </div>

              <div className="bg-hive-background rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Flame className="h-4 w-4 text-hive-text-secondary" />
                  <span className="text-sm text-hive-text-secondary">Engagement</span>
                </div>
                <div className="text-lg font-semibold text-hive-text-primary">
                  {Math.round(ritual.metrics.engagementScore)}
                </div>
              </div>

              <div className="bg-hive-background rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="h-4 w-4 text-hive-text-secondary" />
                  <span className="text-sm text-hive-text-secondary">Completion Rate</span>
                </div>
                <div className="text-lg font-semibold text-hive-text-primary">
                  {Math.round(ritual.metrics.completionRate)}%
                </div>
              </div>
            </div>

            {/* Personal Progress */}
            {isParticipating && (
              <div className="mt-6 bg-gradient-to-r from-hive-brand-secondary/10 to-hive-brand-primary/10 rounded-lg p-6 border border-hive-brand-secondary/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-hive-text-primary">Your Progress</h3>
                  <span className="text-2xl font-bold text-hive-brand-primary">{progress}%</span>
                </div>
                <div className="w-full bg-hive-background rounded-full h-3 mb-4">
                  <div 
                    className={`bg-gradient-to-r ${typeConfig.gradient} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">
                      {ritual.userParticipation?.actionsCompleted.length || 0}/{ritual.actions.length}
                    </div>
                    <div className="text-sm text-hive-text-secondary">Actions</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">
                      {ritual.userParticipation?.badgesAwarded.length || 0}
                    </div>
                    <div className="text-sm text-hive-text-secondary">Badges</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">
                      {ritual.userParticipation?.rewardsEarned.length || 0}
                    </div>
                    <div className="text-sm text-hive-text-secondary">Rewards</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Actions */}
              <div className="bg-hive-surface border border-hive-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-hive-text-primary mb-4">Actions to Complete</h2>
                <div className="space-y-4">
                  {ritual.actions.map((action) => {
                    const ActionIcon = ACTION_TYPES[action.type].icon;
                    const isCompleted = ritual.userParticipation?.actionsCompleted.includes(action.id);
                    
                    return (
                      <div 
                        key={action.id}
                        className={`p-4 rounded-lg border transition-all ${
                          isCompleted 
                            ? 'bg-green-900/20 border-green-500/30' 
                            : 'bg-hive-background border-hive-border hover:border-hive-brand-secondary/50'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isCompleted ? 'bg-green-500' : 'bg-hive-brand-secondary'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-[var(--hive-text-inverse)]" />
                            ) : (
                              <ActionIcon className="h-5 w-5 text-[var(--hive-text-inverse)]" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-hive-text-primary">{action.name}</h3>
                              {action.isRequired && (
                                <span className="px-2 py-1 text-xs bg-red-900/20 text-red-400 rounded">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-hive-text-secondary mb-3">{action.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-xs text-hive-text-secondary">
                                <span>Weight: {action.weight}%</span>
                                {action.maxOccurrences && (
                                  <span>Max: {action.maxOccurrences}x</span>
                                )}
                                {action.timeLimit && (
                                  <span>Time: {action.timeLimit}min</span>
                                )}
                              </div>
                              
                              {!isCompleted && isParticipating && (
                                <button 
                                  onClick={() => handleCompleteAction(action.id)}
                                  className="px-3 py-1 bg-hive-brand-secondary text-[var(--hive-text-inverse)] rounded text-sm hover:bg-hive-brand-hover transition-colors"
                                >
                                  Complete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-hive-surface border border-hive-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-hive-text-primary mb-4">Milestones</h2>
                <div className="space-y-4">
                  {ritual.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.isReached 
                          ? 'bg-green-500' 
                          : 'bg-hive-background border-2 border-hive-border'
                      }`}>
                        {milestone.isReached ? (
                          <CheckCircle className="h-4 w-4 text-[var(--hive-text-inverse)]" />
                        ) : (
                          <span className="text-sm font-medium text-hive-text-secondary">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          milestone.isReached ? 'text-green-400' : 'text-hive-text-primary'
                        }`}>
                          {milestone.name}
                        </h3>
                        <p className="text-sm text-hive-text-secondary">{milestone.description}</p>
                        {milestone.isReached && milestone.reachedAt && (
                          <p className="text-xs text-green-400 mt-1">
                            Reached {new Date(milestone.reachedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Join/Status Card */}
              <div className="bg-hive-surface border border-hive-border rounded-xl p-6">
                {isParticipating ? (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-[var(--hive-text-inverse)]" />
                    </div>
                    <h3 className="font-semibold text-hive-text-primary mb-2">You&apos;re Participating!</h3>
                    <p className="text-sm text-hive-text-secondary mb-4">
                      Keep completing actions to earn rewards
                    </p>
                    <div className="text-lg font-bold text-hive-brand-primary">{progress}% Complete</div>
                  </div>
                ) : ritual.status === 'active' ? (
                  <div className="text-center">
                    <div className={`w-12 h-12 bg-gradient-to-br ${typeConfig.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <TypeIcon className="h-6 w-6 text-[var(--hive-text-inverse)]" />
                    </div>
                    <h3 className="font-semibold text-hive-text-primary mb-2">Join This Ritual</h3>
                    <p className="text-sm text-hive-text-secondary mb-4">
                      Be part of this campus experience
                    </p>
                    <button 
                      onClick={() => window.location.href = `/rituals?join=${ritual.id}`}
                      className={`w-full px-4 py-2 bg-gradient-to-r ${typeConfig.gradient} text-[var(--hive-text-inverse)] rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      Join Ritual
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-hive-background rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-6 w-6 text-hive-text-secondary" />
                    </div>
                    <h3 className="font-semibold text-hive-text-primary mb-2">
                      {ritual.status === 'scheduled' ? 'Coming Soon' : 'Ended'}
                    </h3>
                    <p className="text-sm text-hive-text-secondary">
                      {ritual.status === 'scheduled' 
                        ? 'This ritual will start soon' 
                        : 'This ritual has ended'
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Rewards */}
              <div className="bg-hive-surface border border-hive-border rounded-xl p-6">
                <h3 className="font-semibold text-hive-text-primary mb-4">Rewards</h3>
                <div className="space-y-3">
                  {ritual.rewards.map((reward) => (
                    <div key={reward.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        reward.rarity === 'legendary' ? 'bg-yellow-500' :
                        reward.rarity === 'epic' ? 'bg-purple-500' :
                        reward.rarity === 'rare' ? 'bg-blue-500' :
                        'bg-hive-brand-secondary'
                      }`}>
                        <Award className="h-4 w-4 text-[var(--hive-text-inverse)]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-hive-text-primary">{reward.name}</h4>
                        <p className="text-xs text-hive-text-secondary">{reward.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}