"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Filter, 
  Search,
  Calendar as CalendarIcon,
  Trophy,
  Users,
  TrendingUp,
  Star,
  Grid3X3,
  List,
  Clock,
  Bell,
  Award,
  Target,
  Sparkles,
  Eye,
  Share2
} from 'lucide-react';
import { 
  Button, 
  Badge, 
  cn,
  RitualCreationModal,
  RitualParticipationTracker,
  RitualCalendar,
  RitualRewards,
  type RitualCreationModalProps,
  type RitualParticipationTrackerProps,
  type RitualCalendarProps,
  type RitualRewardsProps
} from '@hive/ui';
import { authenticatedFetch } from '@/lib/auth-utils';
import toast from '@/hooks/use-toast-notifications';

// Import our ritual components
import { RitualCard, type RitualCardProps } from '@/components/rituals/ritual-card';

interface RitualData extends RitualCardProps['ritual'] {
  // Additional fields for dashboard
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserParticipation {
  id: string;
  ritualId: string;
  userId: string;
  status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
  progress: number;
  score: number;
  rank?: number;
  joinedAt: string;
  lastActiveAt: string;
  completedActions: any[];
  milestonesReached: any[];
  streakDays: number;
  rewards: any[];
  achievements: any[];
}

export default function RitualsPage() {
  const [rituals, setRituals] = useState<RitualData[]>([]);
  const [userParticipations, setUserParticipations] = useState<UserParticipation[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI State
  const [activeTab, setActiveTab] = useState<'discover' | 'participating' | 'calendar' | 'rewards'>('discover');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: [] as string[],
    status: 'all' as string,
    participationType: [] as string[]
  });

  // Load data
  useEffect(() => {
    loadRitualsData();
  }, []);

  const loadRitualsData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load rituals from API
      const response = await authenticatedFetch('/api/rituals?limit=50');
      
      if (!response.ok) {
        throw new Error('Failed to fetch rituals');
      }
      
      const data = await response.json();
      setRituals(data.rituals || []);

    } catch (err) {
      console.error('Failed to load rituals data:', err);
      setError('Failed to load rituals data');
      
      // Set some mock data for development
      setRituals([
        {
          id: '1',
          name: 'welcome-week-2025',
          title: 'Welcome Week 2025',
          description: 'Get oriented with campus life and make new connections',
          tagline: 'Your journey begins here',
          type: 'onboarding',
          status: 'active',
          startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          participationType: 'collective',
          currentParticipants: 234,
          maxParticipants: 500,
          category: 'orientation',
          tags: ['welcome', 'orientation', 'networking']
        },
        {
          id: '2',
          name: 'study-group-formation',
          title: 'Study Group Formation',
          description: 'Find your study partners and create effective learning groups',
          tagline: 'Learn together, succeed together',
          type: 'community',
          status: 'active',
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          participationType: 'collaborative',
          currentParticipants: 89,
          maxParticipants: 200,
          category: 'academic',
          tags: ['study', 'groups', 'collaboration']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter rituals based on search and filters
  const filteredRituals = rituals.filter(ritual => {
    // Search filter
    if (searchQuery && !ritual.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ritual.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Type filter
    if (filters.type.length > 0 && !filters.type.includes(ritual.type)) {
      return false;
    }

    // Status filter for discovery tab
    if (activeTab === 'discover') {
      if (filters.status === 'active' && ritual.status !== 'active') return false;
      if (filters.status === 'upcoming' && ritual.status !== 'scheduled') return false;
    }

    return true;
  });

  // Get user's active participations for tracker
  const activeParticipations = userParticipations.filter(p => 
    ['joined', 'active'].includes(p.status)
  );

  // Handle ritual actions
  const handleJoinRitual = async (ritualId: string) => {
    try {
      const response = await authenticatedFetch(`/api/rituals/${ritualId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to join ritual');
      }

      toast.success('Joined ritual!', 'Your journey begins now');
      
      // Refresh data
      loadRitualsData();
      
    } catch (error) {
      console.error('Failed to join ritual:', error);
      toast.error('Failed to join ritual', 'Please try again');
    }
  };

  const handleCompleteRitual = async (ritualId: string) => {
    try {
      const response = await authenticatedFetch(`/api/rituals/${ritualId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to complete ritual');
      }

      toast.success('Ritual completed!', 'Congratulations on your achievement!');
      
      // Refresh data
      loadRitualsData();
      
    } catch (error) {
      console.error('Failed to complete ritual:', error);
      toast.error('Failed to complete ritual', 'Please try again');
    }
  };

  const handleShareRitual = (ritual: RitualData) => {
    if (navigator.share) {
      navigator.share({
        title: ritual.title,
        text: ritual.description,
        url: `${window.location.origin}/rituals/${ritual.id}`
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/rituals/${ritual.id}`);
      toast.success('Link copied!', 'Ritual link copied to clipboard');
    }
  };

  // Stats for dashboard header
  const stats = {
    totalRituals: rituals.length,
    activeParticipations: activeParticipations.length,
    completedRituals: userParticipations.filter(p => p.status === 'completed').length,
    totalRewards: rewards.length + achievements.length,
    totalScore: userParticipations.reduce((sum, p) => sum + (p.score || 0), 0),
    longestStreak: Math.max(...userParticipations.map(p => p.streakDays || 0), 0)
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[var(--hive-background-secondary)] rounded w-64"></div>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-[var(--hive-background-secondary)] rounded"></div>
              ))}
            </div>
            <div className="h-12 bg-[var(--hive-background-secondary)] rounded"></div>
            <div className="grid grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-[var(--hive-background-secondary)] rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[var(--hive-text-primary)]">Rituals Dashboard</h1>
              <p className="text-[var(--hive-text-secondary)]">
                Discover, participate, and track your ritual journey
              </p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-[var(--hive-gold)] text-[var(--hive-black)] hover:bg-[var(--hive-gold)]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Ritual
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-[var(--hive-background-secondary)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{stats.totalRituals}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Total Rituals</div>
            </div>
            <div className="bg-[var(--hive-background-secondary)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[var(--hive-gold)]">{stats.activeParticipations}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Active</div>
            </div>
            <div className="bg-[var(--hive-background-secondary)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.completedRituals}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Completed</div>
            </div>
            <div className="bg-[var(--hive-background-secondary)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.totalRewards}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Rewards</div>
            </div>
            <div className="bg-[var(--hive-background-secondary)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.totalScore.toLocaleString()}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Total Score</div>
            </div>
            <div className="bg-[var(--hive-background-secondary)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{stats.longestStreak}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Best Streak</div>
            </div>
          </div>

          {/* Search and View Controls */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-secondary)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rituals..."
                className="pl-10 pr-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-secondary)] w-64"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex bg-[var(--hive-background-secondary)] rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    view === 'grid'
                      ? "bg-[var(--hive-gold)] text-[var(--hive-black)]"
                      : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    view === 'list'
                      ? "bg-[var(--hive-gold)] text-[var(--hive-black)]"
                      : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <Button variant="secondary" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[var(--hive-border-subtle)]">
            {[
              { id: 'discover', label: 'Discover', icon: Sparkles },
              { id: 'participating', label: 'Participating', icon: Users },
              { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
              { id: 'rewards', label: 'Rewards', icon: Trophy }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2",
                    activeTab === tab.id
                      ? "text-[var(--hive-gold)] border-[var(--hive-gold)]"
                      : "text-[var(--hive-text-secondary)] border-transparent hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-text-secondary)]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Discover Tab */}
          {activeTab === 'discover' && (
            <>
              {/* Featured Ritual */}
              {filteredRituals.filter(r => r.status === 'active').slice(0, 1).map(ritual => (
                <RitualCard
                  key={`featured-${ritual.id}`}
                  ritual={ritual}
                  variant="featured"
                  onJoin={handleJoinRitual}
                  onComplete={handleCompleteRitual}
                  onShare={handleShareRitual}
                />
              ))}

              {/* All Rituals */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[var(--hive-text-primary)]">All Rituals</h2>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    {filteredRituals.length} ritual{filteredRituals.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                {filteredRituals.length > 0 ? (
                  <div className={cn(
                    view === 'grid'
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  )}>
                    {filteredRituals.map(ritual => (
                      <RitualCard
                        key={ritual.id}
                        ritual={ritual}
                        variant={view}
                        onJoin={handleJoinRitual}
                        onComplete={handleCompleteRitual}
                        onShare={handleShareRitual}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-[var(--hive-text-secondary)] mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
                      No rituals found
                    </h3>
                    <p className="text-[var(--hive-text-secondary)] mb-4">
                      Try adjusting your search or filters
                    </p>
                    <Button variant="secondary" onClick={() => setSearchQuery('')}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Participating Tab */}
          {activeTab === 'participating' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-[var(--hive-text-secondary)] mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
                  Your Active Rituals
                </h3>
                <p className="text-[var(--hive-text-secondary)] mb-4">
                  You're not currently participating in any rituals.
                </p>
                <Button onClick={() => setActiveTab('discover')} className="bg-[var(--hive-gold)] text-[var(--hive-black)] hover:bg-[var(--hive-gold)]/90">
                  Discover Rituals
                </Button>
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <RitualCalendar
              rituals={rituals.map(r => ({
                id: r.id,
                title: r.title,
                description: r.description,
                type: r.type,
                startTime: r.startTime,
                endTime: r.endTime,
                participationType: r.participationType,
                currentParticipants: r.currentParticipants || 0,
                maxParticipants: r.maxParticipants,
                status: r.status,
                tags: r.tags || [],
                category: r.category
              }))}
              onRitualSelect={(ritual) => {
                // Handle ritual selection
                console.log('Selected ritual:', ritual);
              }}
              onJoinRitual={handleJoinRitual}
            />
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <RitualRewards
              rewards={rewards}
              achievements={achievements}
              userParticipations={userParticipations}
              onClaimReward={(rewardId) => {
                console.log('Claiming reward:', rewardId);
                toast.success('Reward claimed!', 'Congratulations on your achievement!');
              }}
            />
          )}
        </div>

        {/* Create Ritual Modal */}
        <RitualCreationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={async (ritualData) => {
            try {
              const response = await authenticatedFetch('/api/rituals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ritualData)
              });

              if (!response.ok) {
                throw new Error('Failed to create ritual');
              }

              toast.success('Ritual created!', 'Your new ritual is ready to go');
              setShowCreateModal(false);
              
              // Refresh rituals data
              loadRitualsData();
            } catch (error) {
              console.error('Failed to create ritual:', error);
              toast.error('Failed to create ritual', 'Please try again');
            }
          }}
        />
      </div>
    </div>
  );
}