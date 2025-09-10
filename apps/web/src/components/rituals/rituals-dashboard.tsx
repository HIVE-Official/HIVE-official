'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Trophy, 
  Sparkles, 
  Star,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Target,
  Share2,
  Bell,
  ArrowRight
} from 'lucide-react';
import { Button, Card, Badge, Progress } from '@hive/ui';
import { formatDistanceToNow } from 'date-fns';

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
  participationType: 'individual' | 'collective' | 'progressive' | 'competitive' | 'collaborative' | 'creative' | 'social';
  maxParticipants?: number;
  currentParticipants: number;
  progress?: number;
  userParticipation?: {
    status: 'active' | 'completed' | 'dropped';
    joinedAt: string;
    progress: number;
    lastActivity: string;
  };
  milestones: Array<{
    id: string;
    name: string;
    description: string;
    isReached: boolean;
    participantThreshold: number;
    progressThreshold: number;
  }>;
  rewards: Array<{
    id: string;
    type: 'badge' | 'feature' | 'access' | 'recognition' | 'tool' | 'customization';
    name: string;
    description: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  }>;
}

interface RitualsDashboardProps {
  className?: string;
}

export function RitualsDashboard({ className = '' }: RitualsDashboardProps) {
  const [activeRituals, setActiveRituals] = useState<Ritual[]>([]);
  const [upcomingRituals, setUpcomingRituals] = useState<Ritual[]>([]);
  const [completedRituals, setCompletedRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');

  useEffect(() => {
    fetchRituals();
  }, []);

  const fetchRituals = async () => {
    try {
      setLoading(true);

      // Fetch active rituals
      const activeResponse = await fetch('/api/rituals?status=active&includeEligible=true');
      const activeData = await activeResponse.json();
      
      // Fetch upcoming rituals
      const upcomingResponse = await fetch('/api/rituals?status=scheduled&includeEligible=true');
      const upcomingData = await upcomingResponse.json();
      
      // Fetch completed rituals
      const completedResponse = await fetch('/api/rituals?status=completed&includeEligible=true');
      const completedData = await completedResponse.json();

      setActiveRituals(activeData.rituals || []);
      setUpcomingRituals(upcomingData.rituals || []);
      setCompletedRituals(completedData.rituals || []);
    } catch (error) {
      console.error('Error fetching rituals:', error);
      // Set empty arrays on error
      setActiveRituals([]);
      setUpcomingRituals([]);
      setCompletedRituals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRitual = async (ritualId: string) => {
    try {
      const response = await fetch(`/api/rituals/${ritualId}/join`, {
        method: 'POST'
      });
      
      if (response.ok) {
        // Refresh rituals data
        fetchRituals();
      }
    } catch (error) {
      console.error('Error joining ritual:', error);
    }
  };

  const getRitualTypeIcon = (type: string) => {
    switch (type) {
      case 'onboarding': return Target;
      case 'seasonal': return Calendar;
      case 'achievement': return Trophy;
      case 'community': return Users;
      case 'creative': return Sparkles;
      case 'emergency': return AlertCircle;
      case 'legacy': return Star;
      default: return Calendar;
    }
  };

  const getRitualTypeColor = (type: string) => {
    switch (type) {
      case 'onboarding': return 'text-blue-400 bg-blue-500/20';
      case 'seasonal': return 'text-green-400 bg-green-500/20';
      case 'achievement': return 'text-yellow-400 bg-yellow-500/20';
      case 'community': return 'text-purple-400 bg-purple-500/20';
      case 'creative': return 'text-pink-400 bg-pink-500/20';
      case 'emergency': return 'text-red-400 bg-red-500/20';
      case 'legacy': return 'text-indigo-400 bg-indigo-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const renderRitual = (ritual: Ritual) => {
    const TypeIcon = getRitualTypeIcon(ritual.type);
    const isParticipating = !!ritual.userParticipation;
    const canJoin = ritual.status === 'active' && !isParticipating && 
                    (!ritual.maxParticipants || ritual.currentParticipants < ritual.maxParticipants);

    return (
      <Card key={ritual.id} className="p-6 hover:bg-white/[0.02] transition-colors">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${getRitualTypeColor(ritual.type)}`}>
            <TypeIcon className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-[var(--hive-text-inverse)] mb-1">
                  {ritual.title}
                </h3>
                <p className="text-sm text-[var(--hive-gold)] font-medium">
                  {ritual.tagline}
                </p>
              </div>
              <Badge className="bg-white/10 text-[var(--hive-text-inverse)]">
                {ritual.type}
              </Badge>
            </div>

            <p className="text-sm text-gray-300 mb-4 line-clamp-2">
              {ritual.description}
            </p>

            {/* Progress and Participation */}
            <div className="space-y-3 mb-4">
              {ritual.progress !== undefined && (
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Overall Progress</span>
                    <span>{ritual.progress}%</span>
                  </div>
                  <Progress value={ritual.progress} className="h-2" />
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{ritual.currentParticipants} participants</span>
                  {ritual.maxParticipants && (
                    <span className="text-gray-500">/ {ritual.maxParticipants}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {ritual.status === 'active' 
                      ? `Started ${formatDistanceToNow(new Date(ritual.startTime))} ago`
                      : `Starts ${formatDistanceToNow(new Date(ritual.startTime))}`
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Milestones */}
            {ritual.milestones.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Milestones</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {ritual.milestones.slice(0, 3).map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                        milestone.isReached
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {milestone.isReached && <CheckCircle className="h-3 w-3" />}
                      {milestone.name}
                    </div>
                  ))}
                  {ritual.milestones.length > 3 && (
                    <div className="px-2 py-1 rounded text-xs bg-gray-500/20 text-gray-400">
                      +{ritual.milestones.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rewards */}
            {ritual.rewards.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Rewards</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {ritual.rewards.slice(0, 4).map((reward) => (
                    <div
                      key={reward.id}
                      className={`px-2 py-1 rounded text-xs ${getRarityColor(reward.rarity)} bg-current/20`}
                    >
                      {reward.name}
                    </div>
                  ))}
                  {ritual.rewards.length > 4 && (
                    <div className="px-2 py-1 rounded text-xs bg-gray-500/20 text-gray-400">
                      +{ritual.rewards.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {canJoin && (
                  <Button
                    size="sm"
                    onClick={() => handleJoinRitual(ritual.id)}
                    className="bg-[var(--hive-gold)] text-[var(--hive-obsidian)]"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Join Ritual
                  </Button>
                )}
                
                {isParticipating && (
                  <Button size="sm" variant="outline">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Continue
                  </Button>
                )}
                
                <Button size="sm" variant="ghost">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {isParticipating && ritual.userParticipation && (
                <div className="text-xs text-gray-400">
                  Your progress: {ritual.userParticipation.progress}%
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-[var(--hive-gold)] animate-pulse" />
          <span className="text-[var(--hive-text-inverse)]">Loading rituals...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-[var(--hive-gold)]" />
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)]">
              Campus Rituals
            </h2>
            <p className="text-gray-400">
              Shared experiences that build genuine community
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-lg w-fit">
        {[
          { id: 'active' as const, label: 'Active', count: activeRituals.length },
          { id: 'upcoming' as const, label: 'Upcoming', count: upcomingRituals.length },
          { id: 'completed' as const, label: 'Completed', count: completedRituals.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-[var(--hive-gold)] text-[var(--hive-obsidian)]'
                : 'text-gray-400 hover:text-[var(--hive-text-inverse)]'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'active' && (
            <div className="space-y-4">
              {activeRituals.length === 0 ? (
                <div className="text-center py-12">
                  <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[var(--hive-text-inverse)] mb-2">
                    No active rituals right now
                  </h3>
                  <p className="text-gray-400">
                    Check back soon for new campus-wide experiences!
                  </p>
                </div>
              ) : (
                activeRituals.map(renderRitual)
              )}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {upcomingRituals.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[var(--hive-text-inverse)] mb-2">
                    No upcoming rituals scheduled
                  </h3>
                  <p className="text-gray-400">
                    New experiences are being planned. Stay tuned!
                  </p>
                </div>
              ) : (
                upcomingRituals.map(renderRitual)
              )}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-4">
              {completedRituals.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[var(--hive-text-inverse)] mb-2">
                    No completed rituals yet
                  </h3>
                  <p className="text-gray-400">
                    Participate in active rituals to build your legacy!
                  </p>
                </div>
              ) : (
                completedRituals.map(renderRitual)
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}