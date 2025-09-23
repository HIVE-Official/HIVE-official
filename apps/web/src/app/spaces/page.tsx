'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  HiveButton,
  HiveCard,
  HiveInput,
  Badge,
  Grid,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@hive/ui';
import { Search, Plus, Users, TrendingUp, Clock, Filter, Sparkles } from 'lucide-react';
import type { Space, SpaceType } from '@hive/core';
import { api } from '@/lib/api-client';
import { useApiSpaces } from '@/hooks/use-api-spaces';

// Space type configuration with emojis for that student feel
const SPACE_TYPES = {
  all: { label: 'All Spaces', emoji: '🌟' },
  student_organizations: { label: 'Student Orgs', emoji: '📚' },
  university_organizations: { label: 'University', emoji: '🏛️' },
  greek_life: { label: 'Greek Life', emoji: '🏛️' },
  campus_living: { label: 'Dorms', emoji: '🏠' },
  hive_exclusive: { label: 'HIVE Exclusive', emoji: '🍯' }
} as const;

export default function SpacesDiscoveryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<keyof typeof SPACE_TYPES>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Use API-based hook for authenticated access
  const { spaces, loading, error } = useApiSpaces({
    filterType: activeFilter === 'all' ? undefined : activeFilter,
    searchQuery,
    limitCount: 100
  });

  // Show error notification if something goes wrong
  useEffect(() => {
    if (error) {
      console.error('Error loading spaces:', error);
      // Could add a toast notification here
    }
  }, [error]);

  // Loading state with personality
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-pulse">🍯</div>
            <p className="text-hive-gold text-xl animate-pulse">
              Finding your communities...
            </p>
            <p className="text-gray-500 mt-2">
              {["Brewing coffee...", "Asking around campus...", "Checking the quad..."][Math.floor(Math.random() * 3)]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header Section - Mobile First */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold text-hive-gold flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Spaces
              </h1>
              <HiveButton
                size="sm"
                className="bg-hive-gold text-black hover:bg-yellow-400"
                onClick={() => router.push('/spaces/create')}
              >
                <Plus className="w-4 h-4" />
              </HiveButton>
            </div>

            {/* Search Bar - Full Width on Mobile */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <HiveInput
                type="text"
                placeholder="Find your people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Filter Tabs - Horizontally Scrollable */}
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="flex gap-2 pb-2">
                {Object.entries(SPACE_TYPES).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key as keyof typeof SPACE_TYPES)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      activeFilter === key
                        ? 'bg-hive-gold text-black font-semibold'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-2">{config.emoji}</span>
                    {config.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-4xl font-bold text-hive-gold flex items-center gap-3">
                <Sparkles className="w-10 h-10" />
                Discover Spaces
              </h1>

              {/* Desktop Search */}
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <HiveInput
                  type="text"
                  placeholder="Search spaces, clubs, communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </div>

            <HiveButton
              className="bg-hive-gold text-black hover:bg-yellow-400 font-semibold"
              onClick={() => router.push('/spaces/create')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Space
            </HiveButton>
          </div>

          {/* Desktop Filter Tabs */}
          <div className="hidden lg:block mt-6">
            <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as keyof typeof SPACE_TYPES)}>
              <TabsList className="bg-gray-900 border border-gray-700">
                {Object.entries(SPACE_TYPES).map(([key, config]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-hive-gold data-[state=active]:text-black"
                  >
                    <span className="mr-2">{config.emoji}</span>
                    {config.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Stats - Discord Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <HiveCard className="bg-gray-900/50 border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Now</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <div className="text-green-500">
                <Users className="w-8 h-8" />
              </div>
            </div>
          </HiveCard>

          <HiveCard className="bg-gray-900/50 border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Trending</p>
                <p className="text-2xl font-bold text-white">23</p>
              </div>
              <div className="text-hive-gold">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          </HiveCard>

          <HiveCard className="bg-gray-900/50 border-gray-800 p-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Happening Now</p>
                <p className="text-lg font-semibold text-white">CS Study Group in 5 min!</p>
              </div>
              <div className="text-red-500 animate-pulse">
                <Clock className="w-8 h-8" />
              </div>
            </div>
          </HiveCard>
        </div>

        {/* Spaces Grid */}
        {spaces.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-2xl font-bold text-white mb-2">No spaces found</h3>
            <p className="text-gray-400">
              {searchQuery
                ? `No spaces matching "${searchQuery}"`
                : "Be the first to create a space!"
              }
            </p>
            <HiveButton
              className="mt-6 bg-hive-gold text-black hover:bg-yellow-400"
              onClick={() => router.push('/spaces/create')}
            >
              Create the First Space
            </HiveButton>
          </div>
        ) : (
          <Grid
            columns={1}
            responsive="adaptive"
            gap={4}
          >
            {spaces.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                onClick={() => router.push(`/spaces/${space.id}`)}
              />
            ))}
          </Grid>
        )}
      </div>

      {/* Floating Action Button - Mobile Only */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <HiveButton
          size="lg"
          className="rounded-full bg-hive-gold text-black hover:bg-yellow-400 shadow-xl"
          onClick={() => router.push('/spaces/create')}
        >
          <Plus className="w-6 h-6" />
        </HiveButton>
      </div>
    </div>
  );
}

// Space Card Component with Discord-style presence
function SpaceCard({ space, onClick }: { space: Space; onClick: () => void }) {
  const isActive = Math.random() > 0.5; // Simulated for now
  const onlineCount = Math.floor(Math.random() * 50) + 1; // Simulated

  return (
    <HiveCard
      className="bg-gray-900/50 border-gray-800 hover:border-hive-gold transition-all cursor-pointer group hover:scale-105 hover:shadow-xl hover:shadow-hive-gold/20"
      onClick={onClick}
    >
      {/* Cover Image or Gradient */}
      <div className="h-32 bg-gradient-to-br from-hive-gold/20 to-purple-600/20 rounded-t-lg relative overflow-hidden">
        {space.bannerUrl && (
          <img
            src={space.bannerUrl}
            alt={space.name}
            className="w-full h-full object-cover"
          />
        )}

        {/* Active Indicator - Discord Style */}
        {isActive && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-white">{onlineCount} active</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-hive-gold transition-colors">
          {space.name}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-2 mb-3">
          {space.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-400">{space.memberCount} members</span>
          </div>

          {space.status === 'activated' && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Active
            </Badge>
          )}
        </div>
      </div>
    </HiveCard>
  );
}