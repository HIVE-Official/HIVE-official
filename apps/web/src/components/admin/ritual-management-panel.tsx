"use client";

/**
 * Ritual Management Panel for HIVE Admin
 *
 * Control center for campus-wide rituals and competitions.
 * Rituals are time-bound engagement campaigns that create shared experiences
 * and drive specific behaviors across the entire student body.
 *
 * @educational This implements the Observer pattern for real-time updates
 * and the State pattern for ritual lifecycle management. Each ritual can
 * transition through states: draft → scheduled → active → completed.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import {
  Trophy,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Zap,
  Target,
  Gift,
  Activity,
  Pause,
  Play,
  StopCircle,
  Edit,
  Eye,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Medal,
  Crown,
  Flame,
  Star,
  Heart,
  Award,
  Flag,
  Rocket,
  ChevronRight
} from 'lucide-react';
import { format, formatDistanceToNow, addDays, differenceInHours } from 'date-fns';
import { useAuth } from '@hive/auth-logic';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

// ═══════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════

export interface Ritual {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'competition' | 'collective' | 'challenge' | 'social' | 'academic';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';

  // Timing
  startDate: Date;
  endDate: Date;
  duration: string; // '3_days' | '1_week' | '2_weeks' | 'weekend'

  // Visual
  icon: string;
  color: string;
  accentColor: string;
  coverImage?: string;

  // Mechanics
  mechanics: {
    scoringType: 'points' | 'percentage' | 'count' | 'milestone';
    targetMetric: string; // 'posts', 'likes', 'shares', 'space_joins', etc.
    targetValue: number;
    currentValue: number;
    allowTeams: boolean;
    teamSize?: number;
  };

  // Rewards
  rewards: {
    type: 'feature_unlock' | 'badge' | 'points' | 'recognition' | 'prize';
    description: string;
    value?: string | number;
    unlocksAt?: number; // Percentage of target
  }[];

  // Milestones
  milestones: {
    id: string;
    name: string;
    target: number;
    reward: string;
    achieved: boolean;
    achievedAt?: Date;
  }[];

  // Participation
  participation: {
    total: number;
    activeToday: number;
    growth: number; // Percentage
    topParticipants: {
      id: string;
      name: string;
      score: number;
      avatar?: string;
    }[];
  };

  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  launchedAt?: Date;
  completedAt?: Date;

  // Configuration
  config: {
    showInFeed: boolean;
    showLeaderboard: boolean;
    allowLateJoin: boolean;
    notifyOnMilestones: boolean;
    autoComplete: boolean;
  };
}

// Preset ritual templates for quick creation
const RITUAL_TEMPLATES = [
  {
    id: 'space_race',
    name: 'Space Race',
    type: 'competition',
    description: 'Spaces compete for the most active community',
    icon: 'rocket',
    color: '#8b5cf6',
    duration: '1_week',
    targetMetric: 'space_activity',
    rewards: ['Top space gets featured placement', 'Custom space badge']
  },
  {
    id: 'night_owl',
    name: '3AM Ritual',
    type: 'collective',
    description: 'Unite night owls in late-night solidarity',
    icon: 'moon',
    color: '#1e40af',
    duration: '3_days',
    targetMetric: 'posts_after_midnight',
    rewards: ['Unlock night mode theme', 'Night owl badge']
  },
  {
    id: 'study_streak',
    name: 'Study Streak Challenge',
    type: 'challenge',
    description: 'Maintain daily study group participation',
    icon: 'flame',
    color: '#dc2626',
    duration: '2_weeks',
    targetMetric: 'daily_study_posts',
    rewards: ['Priority study room booking', 'Academic achievement badge']
  },
  {
    id: 'campus_madness',
    name: 'Campus Madness',
    type: 'competition',
    description: 'March Madness-style tournament for spaces',
    icon: 'trophy',
    color: '#f59e0b',
    duration: '2_weeks',
    targetMetric: 'bracket_votes',
    rewards: ['Winning space becomes default for new users', 'Championship banner']
  },
  {
    id: 'welcome_week',
    name: 'Welcome Week',
    type: 'social',
    description: 'Help new students find their community',
    icon: 'heart',
    color: '#ec4899',
    duration: '1_week',
    targetMetric: 'welcomes_given',
    rewards: ['Mentor badge', 'Early access to events']
  }
];

// ═══════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════

export function RitualManagementPanel() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'completed' | 'create'>('active');
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form state for new ritual
  const [newRitual, setNewRitual] = useState<Partial<Ritual>>({
    title: '',
    subtitle: '',
    description: '',
    type: 'competition',
    duration: '1_week',
    icon: 'trophy',
    color: '#f59e0b',
    accentColor: '#d97706',
    mechanics: {
      scoringType: 'points',
      targetMetric: 'posts',
      targetValue: 1000,
      currentValue: 0,
      allowTeams: false
    },
    rewards: [],
    milestones: [],
    config: {
      showInFeed: true,
      showLeaderboard: true,
      allowLateJoin: true,
      notifyOnMilestones: true,
      autoComplete: true
    }
  });

  // Load rituals from Firebase
  useEffect(() => {
    if (!user) return;

    const ritualsQuery = query(
      collection(db, 'rituals'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(ritualsQuery, (snapshot) => {
      const loadedRituals: Ritual[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loadedRituals.push({
          id: doc.id,
          ...data,
          startDate: data.startDate?.toDate(),
          endDate: data.endDate?.toDate(),
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          launchedAt: data.launchedAt?.toDate(),
          completedAt: data.completedAt?.toDate(),
        } as Ritual);
      });
      setRituals(loadedRituals);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Create new ritual
  const createRitual = useCallback(async () => {
    if (!user || !newRitual.title) return;

    try {
      const ritualId = `ritual_${Date.now()}`;
      const startDate = new Date();
      const endDate = getEndDate(startDate, newRitual.duration || '1_week');

      const ritualData = {
        ...newRitual,
        id: ritualId,
        status: 'draft',
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
        createdBy: user.email || user.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        participation: {
          total: 0,
          activeToday: 0,
          growth: 0,
          topParticipants: []
        }
      };

      await setDoc(doc(db, 'rituals', ritualId), ritualData);

      toast({
        title: 'Ritual created',
        description: `${newRitual.title} has been created successfully`,
        type: 'success'
      });

      setShowCreateForm(false);
      resetForm();
    } catch (error) {
      console.error('Failed to create ritual:', error);
      toast({
        title: 'Failed to create ritual',
        type: 'error'
      });
    }
  }, [newRitual, user, toast]);

  // Launch ritual (activate it)
  const launchRitual = useCallback(async (ritualId: string) => {
    try {
      await updateDoc(doc(db, 'rituals', ritualId), {
        status: 'active',
        launchedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      toast({
        title: 'Ritual launched!',
        description: 'The ritual is now active for all students',
        type: 'success'
      });
    } catch (error) {
      console.error('Failed to launch ritual:', error);
      toast({
        title: 'Failed to launch ritual',
        type: 'error'
      });
    }
  }, [toast]);

  // Pause ritual
  const pauseRitual = useCallback(async (ritualId: string) => {
    try {
      await updateDoc(doc(db, 'rituals', ritualId), {
        status: 'paused',
        updatedAt: serverTimestamp()
      });

      toast({
        title: 'Ritual paused',
        description: 'The ritual has been temporarily paused',
        type: 'info'
      });
    } catch (error) {
      console.error('Failed to pause ritual:', error);
      toast({
        title: 'Failed to pause ritual',
        type: 'error'
      });
    }
  }, [toast]);

  // End ritual
  const endRitual = useCallback(async (ritualId: string) => {
    try {
      await updateDoc(doc(db, 'rituals', ritualId), {
        status: 'completed',
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      toast({
        title: 'Ritual completed',
        description: 'The ritual has been marked as completed',
        type: 'success'
      });
    } catch (error) {
      console.error('Failed to end ritual:', error);
      toast({
        title: 'Failed to end ritual',
        type: 'error'
      });
    }
  }, [toast]);

  // Helper functions
  const getEndDate = (start: Date, duration: string): Date => {
    switch (duration) {
      case '3_days': return addDays(start, 3);
      case '1_week': return addDays(start, 7);
      case '2_weeks': return addDays(start, 14);
      case 'weekend': return addDays(start, 2);
      default: return addDays(start, 7);
    }
  };

  const resetForm = () => {
    setNewRitual({
      title: '',
      subtitle: '',
      description: '',
      type: 'competition',
      duration: '1_week',
      icon: 'trophy',
      color: '#f59e0b',
      accentColor: '#d97706',
      mechanics: {
        scoringType: 'points',
        targetMetric: 'posts',
        targetValue: 1000,
        currentValue: 0,
        allowTeams: false
      },
      rewards: [],
      milestones: [],
      config: {
        showInFeed: true,
        showLeaderboard: true,
        allowLateJoin: true,
        notifyOnMilestones: true,
        autoComplete: true
      }
    });
  };

  const applyTemplate = (template: typeof RITUAL_TEMPLATES[0]) => {
    setNewRitual(prev => ({
      ...prev,
      title: template.name,
      type: template.type as Ritual['type'],
      description: template.description,
      icon: template.icon,
      color: template.color,
      duration: template.duration as Ritual['duration'],
      mechanics: {
        ...prev.mechanics!,
        targetMetric: template.targetMetric
      }
    }));
  };

  // Filter rituals by status
  const activeRituals = rituals.filter(r => r.status === 'active' || r.status === 'paused');
  const scheduledRituals = rituals.filter(r => r.status === 'scheduled' || r.status === 'draft');
  const completedRituals = rituals.filter(r => r.status === 'completed');

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <Activity className="h-6 w-6 animate-spin mr-2" />
          Loading rituals...
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-[var(--hive-brand-primary)]" />
            <div>
              <h2 className="text-xl font-bold text-hive-text-primary">Ritual Management</h2>
              <p className="text-sm text-hive-text-secondary">
                Create and manage campus-wide engagement campaigns
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              setActiveTab('create');
              setShowCreateForm(true);
            }}
            className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Ritual
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3">
          {[
            { id: 'active', label: 'Active', count: activeRituals.length, icon: Play },
            { id: 'scheduled', label: 'Scheduled', count: scheduledRituals.length, icon: Calendar },
            { id: 'completed', label: 'Completed', count: completedRituals.length, icon: CheckCircle },
            { id: 'create', label: 'Templates', icon: Sparkles }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count !== undefined && (
                <Badge className="ml-1">{tab.count}</Badge>
              )}
            </Button>
          ))}
        </div>
      </Card>

      {/* Active Rituals */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeRituals.length === 0 ? (
            <Card className="p-8 text-center">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
                No Active Rituals
              </h3>
              <p className="text-hive-text-secondary mb-4">
                Launch a ritual to engage the campus community
              </p>
              <Button
                onClick={() => {
                  setActiveTab('create');
                  setShowCreateForm(true);
                }}
                className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
              >
                Create Your First Ritual
              </Button>
            </Card>
          ) : (
            activeRituals.map((ritual) => (
              <RitualCard
                key={ritual.id}
                ritual={ritual}
                onLaunch={launchRitual}
                onPause={pauseRitual}
                onEnd={endRitual}
                onView={() => setSelectedRitual(ritual)}
              />
            ))
          )}
        </div>
      )}

      {/* Scheduled Rituals */}
      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          {scheduledRituals.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
                No Scheduled Rituals
              </h3>
              <p className="text-hive-text-secondary">
                Create and schedule upcoming rituals
              </p>
            </Card>
          ) : (
            scheduledRituals.map((ritual) => (
              <RitualCard
                key={ritual.id}
                ritual={ritual}
                onLaunch={launchRitual}
                onPause={pauseRitual}
                onEnd={endRitual}
                onView={() => setSelectedRitual(ritual)}
              />
            ))
          )}
        </div>
      )}

      {/* Completed Rituals */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedRituals.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
                No Completed Rituals
              </h3>
              <p className="text-hive-text-secondary">
                Completed rituals will appear here
              </p>
            </Card>
          ) : (
            completedRituals.map((ritual) => (
              <RitualCard
                key={ritual.id}
                ritual={ritual}
                onLaunch={launchRitual}
                onPause={pauseRitual}
                onEnd={endRitual}
                onView={() => setSelectedRitual(ritual)}
              />
            ))
          )}
        </div>
      )}

      {/* Create/Templates Tab */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          {/* Quick Templates */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">
              Quick Start Templates
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {RITUAL_TEMPLATES.map((template) => (
                <Card
                  key={template.id}
                  className="p-4 cursor-pointer hover:border-[var(--hive-brand-primary)] transition-colors"
                  onClick={() => applyTemplate(template)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${template.color}20` }}
                    >
                      {getIcon(template.icon, template.color)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-hive-text-primary mb-1">
                        {template.name}
                      </h4>
                      <p className="text-xs text-hive-text-secondary mb-2">
                        {template.description}
                      </p>
                      <Badge className="text-xs">{template.duration.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Create Form */}
          {showCreateForm && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">
                Create New Ritual
              </h3>

              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newRitual.title}
                      onChange={(e: React.ChangeEvent) => setNewRitual({ ...newRitual, title: (e.target as any).value })}
                      className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
                      placeholder="e.g., Spring Study Marathon"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">
                      Type
                    </label>
                    <select
                      value={newRitual.type}
                      onChange={(e: React.ChangeEvent) => setNewRitual({ ...newRitual, type: (e.target as any).value as Ritual['type'] })}
                      className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
                    >
                      <option value="competition">Competition</option>
                      <option value="collective">Collective</option>
                      <option value="challenge">Challenge</option>
                      <option value="social">Social</option>
                      <option value="academic">Academic</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-hive-text-primary mb-2">
                    Description
                  </label>
                  <textarea
                    value={newRitual.description}
                    onChange={(e: React.ChangeEvent) => setNewRitual({ ...newRitual, description: (e.target as any).value })}
                    className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
                    rows={3}
                    placeholder="Describe what students will do and why they should participate..."
                  />
                </div>

                {/* Duration and Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">
                      Duration
                    </label>
                    <select
                      value={newRitual.duration}
                      onChange={(e: React.ChangeEvent) => setNewRitual({ ...newRitual, duration: (e.target as any).value })}
                      className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
                    >
                      <option value="3_days">3 Days</option>
                      <option value="1_week">1 Week</option>
                      <option value="2_weeks">2 Weeks</option>
                      <option value="weekend">Weekend</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">
                      Target Metric
                    </label>
                    <select
                      value={newRitual.mechanics?.targetMetric}
                      onChange={(e: React.ChangeEvent) => setNewRitual({
                        ...newRitual,
                        mechanics: { ...newRitual.mechanics!, targetMetric: (e.target as any).value }
                      })}
                      className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
                    >
                      <option value="posts">Posts Created</option>
                      <option value="likes">Likes Given</option>
                      <option value="shares">Content Shared</option>
                      <option value="space_joins">Spaces Joined</option>
                      <option value="study_hours">Study Hours</option>
                      <option value="welcomes_given">Welcomes Given</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">
                      Target Value
                    </label>
                    <input
                      type="number"
                      value={newRitual.mechanics?.targetValue}
                      onChange={(e: React.ChangeEvent) => setNewRitual({
                        ...newRitual,
                        mechanics: { ...newRitual.mechanics!, targetValue: parseInt((e.target as any).value) }
                      })}
                      className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
                      placeholder="1000"
                    />
                  </div>
                </div>

                {/* Visual Customization */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">
                      Icon
                    </label>
                    <div className="flex gap-2">
                      {['trophy', 'flame', 'star', 'heart', 'rocket'].map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setNewRitual({ ...newRitual, icon })}
                          className={`p-2 rounded-lg border ${
                            newRitual.icon === icon
                              ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/20'
                              : 'border-hive-border'
                          }`}
                        >
                          {getIcon(icon)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      value={newRitual.color}
                      onChange={(e: React.ChangeEvent) => setNewRitual({ ...newRitual, color: (e.target as any).value })}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">
                      Accent Color
                    </label>
                    <input
                      type="color"
                      value={newRitual.accentColor}
                      onChange={(e: React.ChangeEvent) => setNewRitual({ ...newRitual, accentColor: (e.target as any).value })}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Configuration Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newRitual.config?.showInFeed}
                      onChange={(e: React.ChangeEvent) => setNewRitual({
                        ...newRitual,
                        config: { ...newRitual.config!, showInFeed: e.target.checked }
                      })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-hive-text-primary">Show in feed</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newRitual.config?.showLeaderboard}
                      onChange={(e: React.ChangeEvent) => setNewRitual({
                        ...newRitual,
                        config: { ...newRitual.config!, showLeaderboard: e.target.checked }
                      })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-hive-text-primary">Show leaderboard</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newRitual.config?.allowLateJoin}
                      onChange={(e: React.ChangeEvent) => setNewRitual({
                        ...newRitual,
                        config: { ...newRitual.config!, allowLateJoin: e.target.checked }
                      })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-hive-text-primary">Allow late joining</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={createRitual}
                    disabled={!newRitual.title || !newRitual.description}
                    className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
                  >
                    Create Ritual
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Ritual Detail Modal */}
      {selectedRitual && (
        <RitualDetailModal
          ritual={selectedRitual}
          onClose={() => setSelectedRitual(null)}
          onLaunch={launchRitual}
          onPause={pauseRitual}
          onEnd={endRitual}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════════

function RitualCard({
  ritual,
  onLaunch,
  onPause,
  onEnd,
  onView
}: {
  ritual: Ritual;
  onLaunch: (id: string) => void;
  onPause: (id: string) => void;
  onEnd: (id: string) => void;
  onView: () => void;
}) {
  const progress = ritual.mechanics.targetValue > 0
    ? Math.round((ritual.mechanics.currentValue / ritual.mechanics.targetValue) * 100)
    : 0;

  const timeRemaining = ritual.endDate
    ? formatDistanceToNow(ritual.endDate, { addSuffix: true })
    : null;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${ritual.color}20` }}
          >
            {getIcon(ritual.icon, ritual.color)}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-hive-text-primary">
                {ritual.title}
              </h3>
              <StatusBadge status={ritual.status} />
              <Badge variant="secondary">{ritual.type}</Badge>
            </div>

            <p className="text-sm text-hive-text-secondary mb-4">
              {ritual.description}
            </p>

            {/* Progress Bar */}
            {ritual.status === 'active' && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-hive-text-secondary">
                    Progress: {ritual.mechanics.currentValue} / {ritual.mechanics.targetValue}
                  </span>
                  <span className="text-sm font-medium text-[var(--hive-brand-primary)]">
                    {progress}%
                  </span>
                </div>
                <div className="h-2 bg-hive-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-hive-gold to-hive-champagne transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Metrics */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-hive-text-secondary" />
                <span className="text-hive-text-secondary">
                  {ritual.participation.total} participants
                </span>
              </div>
              {ritual.participation.growth > 0 && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">
                    +{ritual.participation.growth}% today
                  </span>
                </div>
              )}
              {timeRemaining && ritual.status === 'active' && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-hive-text-secondary" />
                  <span className="text-hive-text-secondary">
                    Ends {timeRemaining}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="max-w-sm"
            onClick={onView}
          >
            <Eye className="h-4 w-4" />
          </Button>

          {ritual.status === 'draft' && (
            <Button
              variant="default"
              className="max-w-sm"
              onClick={() => onLaunch(ritual.id)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Play className="h-4 w-4 mr-2" />
              Launch
            </Button>
          )}

          {ritual.status === 'active' && (
            <Button
              variant="outline"
              className="max-w-sm"
              onClick={() => onPause(ritual.id)}
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          )}

          {ritual.status === 'paused' && (
            <Button
              variant="default"
              className="max-w-sm"
              onClick={() => onLaunch(ritual.id)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Play className="h-4 w-4 mr-2" />
              Resume
            </Button>
          )}

          {(ritual.status === 'active' || ritual.status === 'paused') && (
            <Button
              variant="outline"
              className="max-w-sm"
              onClick={() => onEnd(ritual.id)}
              className="text-red-400 hover:text-red-500"
            >
              <StopCircle className="h-4 w-4 mr-2" />
              End
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function RitualDetailModal({
  ritual,
  onClose,
  onLaunch,
  onPause,
  onEnd
}: {
  ritual: Ritual;
  onClose: () => void;
  onLaunch: (id: string) => void;
  onPause: (id: string) => void;
  onEnd: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-hive-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${ritual.color}20` }}
              >
                {getIcon(ritual.icon, ritual.color)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-hive-text-primary">
                  {ritual.title}
                </h2>
                <p className="text-sm text-hive-text-secondary">
                  {ritual.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-hive-background-overlay rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Participation Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-hive-text-primary">
                {ritual.participation.total}
              </div>
              <div className="text-xs text-hive-text-secondary">Total Participants</div>
            </Card>

            <Card className="p-4 text-center">
              <Activity className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-hive-text-primary">
                {ritual.participation.activeToday}
              </div>
              <div className="text-xs text-hive-text-secondary">Active Today</div>
            </Card>

            <Card className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-hive-text-primary">
                +{ritual.participation.growth}%
              </div>
              <div className="text-xs text-hive-text-secondary">Growth Rate</div>
            </Card>

            <Card className="p-4 text-center">
              <Target className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-hive-text-primary">
                {Math.round((ritual.mechanics.currentValue / ritual.mechanics.targetValue) * 100)}%
              </div>
              <div className="text-xs text-hive-text-secondary">Completion</div>
            </Card>
          </div>

          {/* Leaderboard */}
          {ritual.participation.topParticipants.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">
                Top Participants
              </h3>
              <div className="space-y-3">
                {ritual.participation.topParticipants.map((participant, index) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 bg-hive-background-overlay rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-hive-surface text-hive-text-primary'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-hive-text-primary">
                        {participant.name}
                      </span>
                    </div>
                    <span className="font-bold text-[var(--hive-brand-primary)]">
                      {participant.score} pts
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Milestones */}
          {ritual.milestones.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">
                Milestones
              </h3>
              <div className="space-y-3">
                {ritual.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      milestone.achieved
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-hive-background-overlay'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {milestone.achieved ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <Target className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <p className="font-medium text-hive-text-primary">
                          {milestone.name}
                        </p>
                        <p className="text-xs text-hive-text-secondary">
                          Target: {milestone.target} • Reward: {milestone.reward}
                        </p>
                      </div>
                    </div>
                    {milestone.achievedAt && (
                      <span className="text-xs text-green-400">
                        Achieved {formatDistanceToNow(milestone.achievedAt, { addSuffix: true })}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>

            {ritual.status === 'draft' && (
              <Button
                onClick={() => {
                  onLaunch(ritual.id);
                  onClose();
                }}
                className="bg-green-500 hover:bg-green-600"
              >
                <Play className="h-4 w-4 mr-2" />
                Launch Ritual
              </Button>
            )}

            {ritual.status === 'active' && (
              <Button
                onClick={() => {
                  onEnd(ritual.id);
                  onClose();
                }}
                className="bg-red-500 hover:bg-red-600"
              >
                <StopCircle className="h-4 w-4 mr-2" />
                End Ritual
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: Ritual['status'] }) {
  const config = {
    draft: { color: 'bg-gray-500/20 text-gray-400', icon: Edit },
    scheduled: { color: 'bg-blue-500/20 text-blue-400', icon: Calendar },
    active: { color: 'bg-green-500/20 text-green-400', icon: Play },
    paused: { color: 'bg-orange-500/20 text-orange-400', icon: Pause },
    completed: { color: 'bg-purple-500/20 text-purple-400', icon: CheckCircle }
  };

  const { color, icon: Icon } = config[status];

  return (
    <Badge className={`${color} flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {status}
    </Badge>
  );
}

function getIcon(iconName: string, color?: string) {
  const iconProps = { className: "h-6 w-6", style: color ? { color } : {} };

  switch (iconName) {
    case 'trophy': return <Trophy {...iconProps} />;
    case 'flame': return <Flame {...iconProps} />;
    case 'star': return <Star {...iconProps} />;
    case 'heart': return <Heart {...iconProps} />;
    case 'rocket': return <Rocket {...iconProps} />;
    case 'medal': return <Medal {...iconProps} />;
    case 'crown': return <Crown {...iconProps} />;
    case 'flag': return <Flag {...iconProps} />;
    case 'award': return <Award {...iconProps} />;
    case 'zap': return <Zap {...iconProps} />;
    default: return <Trophy {...iconProps} />;
  }
}