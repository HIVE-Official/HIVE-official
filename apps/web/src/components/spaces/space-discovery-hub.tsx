"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Users,
  Building2,
  Home,
  GraduationCap,
  TrendingUp,
  Clock,
  Sparkles,
  Activity,
  ChevronRight,
  Filter,
  Eye,
  UserPlus,
  Calendar,
  MessageSquare
} from 'lucide-react';
import {
  HiveCard,
  HiveButton,
  Badge,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@hive/ui';
import type { Space } from '@hive/core';
import { api } from '@/lib/api-client';
import type { SpaceType } from '@/lib/space-type-rules';

interface SpaceWithActivity extends Space {
  activeNow: number;
  recentPosts: number;
  upcomingEvents: number;
  memberGrowth: number;
  lastActivityAt: Date;
  topMembers?: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
}

interface CategoryConfig {
  id: SpaceType;
  label: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  description: string;
  searchPlaceholder: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: 'student_organizations',
    label: 'Student Orgs',
    icon: Users,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-blue-600/10',
    description: 'Clubs, organizations, and student groups',
    searchPlaceholder: 'Search clubs and organizations...'
  },
  {
    id: 'university_organizations',
    label: 'University',
    icon: GraduationCap,
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-purple-600/10',
    description: 'Classes, departments, and academic programs',
    searchPlaceholder: 'Search classes and departments...'
  },
  {
    id: 'residential_spaces',
    label: 'Residential',
    icon: Home,
    color: 'text-green-400',
    bgGradient: 'from-green-500/20 to-green-600/10',
    description: 'Dorms, residence halls, and living communities',
    searchPlaceholder: 'Search dorms and halls...'
  },
  {
    id: 'greek_life_spaces',
    label: 'Greek Life',
    icon: Building2,
    color: 'text-orange-400',
    bgGradient: 'from-orange-500/20 to-orange-600/10',
    description: 'Fraternities and sororities',
    searchPlaceholder: 'Search Greek organizations...'
  }
];

export function SpaceDiscoveryHub() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<SpaceType>('student_organizations');
  const [searchQuery, setSearchQuery] = useState('');
  const [spaces, setSpaces] = useState<SpaceWithActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activityView, setActivityView] = useState<'trending' | 'active' | 'new'>('trending');

  // Real-time activity tracking
  const [realtimeActivity, setRealtimeActivity] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    loadSpaces();
    setupRealtimeTracking();
  }, [selectedCategory]);

  const loadSpaces = async () => {
    try {
      setLoading(true);
      const response = await api.spaces.browse({
        category: selectedCategory,
        includeActivity: true,
        limit: 50
      });

      const result = await response.json();
      if (result.success) {
        setSpaces(result.data);
      }
    } catch (error) {
      console.error('Error loading spaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeTracking = () => {
    // Connect to SSE for real-time activity updates
    const eventSource = new EventSource(`/api/spaces/activity-stream?category=${selectedCategory}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'activity_update') {
        setRealtimeActivity(prev => {
          const newMap = new Map(prev);
          newMap.set(data.spaceId, data.activeUsers);
          return newMap;
        });
      }
    };

    return () => eventSource.close();
  };

  // Filter and sort spaces based on search and activity view
  const filteredSpaces = useMemo(() => {
    const filtered = spaces.filter(space =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply activity-based sorting
    switch (activityView) {
      case 'trending':
        return filtered.sort((a, b) => b.memberGrowth - a.memberGrowth);
      case 'active':
        return filtered.sort((a, b) => {
          const aActive = realtimeActivity.get(a.id) || a.activeNow;
          const bActive = realtimeActivity.get(b.id) || b.activeNow;
          return bActive - aActive;
        });
      case 'new':
        return filtered.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return filtered;
    }
  }, [spaces, searchQuery, activityView, realtimeActivity]);

  const currentCategory = CATEGORIES.find(c => c.id === selectedCategory)!;

  const getActivityIndicator = (space: SpaceWithActivity) => {
    const activeCount = realtimeActivity.get(space.id) || space.activeNow;

    if (activeCount > 20) return { label: '🔥 Very Active', color: 'text-red-500' };
    if (activeCount > 10) return { label: '✨ Active', color: 'text-orange-500' };
    if (activeCount > 5) return { label: '💬 Some Activity', color: 'text-yellow-500' };
    if (activeCount > 0) return { label: '👀 Few Online', color: 'text-green-500' };
    return { label: '😴 Quiet', color: 'text-gray-500' };
  };

  const handleSpaceClick = (spaceId: string) => {
    router.push(`/spaces/${spaceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Discover Spaces</h1>
              <p className="text-gray-400">Find your community at UB</p>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.bgGradient} border-2 border-gray-700`
                      : 'bg-gray-800/50 border-2 border-transparent hover:bg-gray-800'
                    }
                  `}
                >
                  <category.icon className={`w-5 h-5 ${category.color}`} />
                  <span className="text-white font-medium whitespace-nowrap">
                    {category.label}
                  </span>
                  <Badge className="bg-gray-700 text-gray-300">
                    {spaces.length}
                  </Badge>
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={currentCategory.searchPlaceholder}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Activity View Toggle */}
              <div className="flex gap-2">
                <HiveButton
                  variant={activityView === 'trending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivityView('trending')}
                  className={activityView === 'trending' ? 'bg-[var(--hive-brand-primary)] text-black' : ''}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Trending
                </HiveButton>
                <HiveButton
                  variant={activityView === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivityView('active')}
                  className={activityView === 'active' ? 'bg-[var(--hive-brand-primary)] text-black' : ''}
                >
                  <Activity className="w-4 h-4 mr-1" />
                  Active Now
                </HiveButton>
                <HiveButton
                  variant={activityView === 'new' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivityView('new')}
                  className={activityView === 'new' ? 'bg-[var(--hive-brand-primary)] text-black' : ''}
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  New
                </HiveButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Activity Heat Map */}
        <div className="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Campus Activity Right Now</h2>
            <span className="text-sm text-gray-400">
              {Array.from(realtimeActivity.values()).reduce((a, b) => a + b, 0)} people active
            </span>
          </div>

          {/* Activity bars visualization */}
          <div className="grid grid-cols-4 gap-4">
            {CATEGORIES.map(cat => {
              const categorySpaces = spaces.filter(s => s.type === cat.id);
              const totalActive = categorySpaces.reduce((sum, space) =>
                sum + (realtimeActivity.get(space.id) || space.activeNow), 0
              );

              return (
                <div key={cat.id} className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <cat.icon className={`w-4 h-4 ${cat.color}`} />
                    <span className="text-sm text-gray-300">{cat.label}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${cat.bgGradient} transition-all duration-500`}
                      style={{ width: `${Math.min(100, totalActive * 2)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{totalActive} active</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spaces Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-6xl animate-pulse mb-4">🍯</div>
              <span className="text-xl text-[var(--hive-brand-primary)]">Loading spaces...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.map(space => {
              const activity = getActivityIndicator(space);
              const activeCount = realtimeActivity.get(space.id) || space.activeNow;

              return (
                <HiveCard
                  key={space.id}
                  className="bg-gray-900/50 border-gray-800 hover:border-[var(--hive-brand-primary)]/50 transition-all cursor-pointer group"
                  onClick={() => handleSpaceClick(space.id)}
                >
                  <div className="p-6">
                    {/* Space Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">{(space as any).avatar || '🏛️'}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-[var(--hive-brand-primary)] transition-colors">
                            {space.name}
                          </h3>
                          <div className={`text-xs ${activity.color} font-medium`}>
                            {activity.label}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[var(--hive-brand-primary)] transition-colors" />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {space.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center p-2 bg-gray-800/50 rounded">
                        <div className="text-lg font-semibold text-white">{space.memberCount || 0}</div>
                        <div className="text-xs text-gray-500">members</div>
                      </div>
                      <div className="text-center p-2 bg-gray-800/50 rounded">
                        <div className="text-lg font-semibold text-green-400">{activeCount}</div>
                        <div className="text-xs text-gray-500">online</div>
                      </div>
                      <div className="text-center p-2 bg-gray-800/50 rounded">
                        <div className="text-lg font-semibold text-blue-400">{space.upcomingEvents}</div>
                        <div className="text-xs text-gray-500">events</div>
                      </div>
                    </div>

                    {/* Activity Indicators */}
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      {space.recentPosts > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{space.recentPosts} new posts</span>
                        </div>
                      )}
                      {space.memberGrowth > 0 && (
                        <div className="flex items-center gap-1 text-green-400">
                          <TrendingUp className="w-3 h-3" />
                          <span>+{space.memberGrowth}% growth</span>
                        </div>
                      )}
                    </div>

                    {/* Top Members Preview */}
                    {space.topMembers && space.topMembers.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {space.topMembers.slice(0, 4).map((member, idx) => (
                              <div
                                key={member.id}
                                className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-900 flex items-center justify-center"
                                title={member.name}
                              >
                                <span className="text-xs">
                                  {member.avatar || member.name.charAt(0)}
                                </span>
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            +{Math.max(0, space.memberCount - 4)} more
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </HiveCard>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredSpaces.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No spaces found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}