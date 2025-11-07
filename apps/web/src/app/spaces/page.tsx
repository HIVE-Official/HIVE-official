'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Grid, SpaceCard } from '@hive/ui';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, Users, Shield, Sparkles, UserCheck, Lock } from 'lucide-react';
import { useAuth } from '@hive/auth-logic';
import { secureApiFetch } from '@/lib/secure-auth-utils';
import { SpacesErrorBoundary } from '@/components/error-boundaries';
import { SpacesDiscoverySkeleton } from '@hive/ui';

// SPEC.md compliant space discovery sections
const DISCOVERY_SECTIONS = {
  panicRelief: {
    title: 'Panic Relief',
    description: 'Spaces that solve immediate anxieties',
    icon: Sparkles,
    color: 'text-red-400'
  },
  whereYourFriendsAre: {
    title: 'Where Your Friends Are',
    description: 'Spaces with existing connections',
    icon: UserCheck,
    color: 'text-green-400'
  },
  insiderAccess: {
    title: 'Insider Access',
    description: 'Exclusive communities',
    icon: Lock,
    color: 'text-purple-400'
  }
};

// SPEC.md categories
const SPACE_CATEGORIES = {
  university_org: { label: 'University Org', icon: Shield },
  student_org: { label: 'Student Org', icon: Users },
  residential: { label: 'Residential', icon: '🏠' },
  greek_life: { label: 'Greek Life', icon: '🏛️' }
};

interface SpaceRecommendation {
  id: string;
  name: string;
  description: string;
  category: keyof typeof SPACE_CATEGORIES;
  memberCount: number;
  onlineCount: number;
  activityLevel: 'very_active' | 'active' | 'moderate' | 'quiet';
  joinPolicy: 'open' | 'approval' | 'invite_only';
  bannerImage?: string;

  // Behavioral scores (calculated server-side)
  anxietyReliefScore: number;
  socialProofScore: number;
  insiderAccessScore: number;
  recommendationScore: number;

  // Engagement metrics
  joinToActiveRate: number;
  mutualConnections: number;
  friendsInSpace: number;
}

export default function SpacesDirectoryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // SPEC.md: Three discovery sections based on behavioral psychology
  const [panicReliefSpaces, setPanicReliefSpaces] = useState<SpaceRecommendation[]>([]);
  const [friendSpaces, setFriendSpaces] = useState<SpaceRecommendation[]>([]);
  const [insiderSpaces, setInsiderSpaces] = useState<SpaceRecommendation[]>([]);
  const [categorySpaces, setCategorySpaces] = useState<SpaceRecommendation[]>([]);

  // SPEC.md: Load 20 recommended spaces based on user profile
  useEffect(() => {
    loadRecommendations();
  }, [user]);

  const loadRecommendations = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // SPEC.md: Fetch recommendations based on behavioral algorithm
      const res = await secureApiFetch('/api/spaces/recommended', { method: 'GET' });
      const response = await res.json();

      setPanicReliefSpaces(response?.panicRelief || []);
      setFriendSpaces(response?.whereYourFriendsAre || []);
      setInsiderSpaces(response?.insiderAccess || []);

      // Load category spaces
      if (selectedCategory !== 'all') {
        const params = new URLSearchParams({ category: String(selectedCategory), limit: '20' });
        const catRes = await secureApiFetch(`/api/spaces?${params.toString()}`, { method: 'GET' });
        const categoryResponse = await catRes.json();
        setCategorySpaces(categoryResponse?.spaces || []);
      }
    } catch (error) {
      console.error('Failed to load space recommendations:', error);
      toast({
        title: 'Failed to load recommendations',
        description: 'Please try again.',
        type: 'error',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      loadRecommendations();
      return;
    }

    try {
      setLoading(true);
      const res = await secureApiFetch('/api/spaces/search', {
        method: 'POST',
        body: JSON.stringify({ q: searchQuery, limit: 20 })
      });
      const response = await res.json();

      // Display search results in all sections
      const spaces = response?.spaces || [];
      setPanicReliefSpaces(spaces.slice(0, 5));
      setFriendSpaces(spaces.slice(5, 10));
      setInsiderSpaces(spaces.slice(10, 15));
      setCategorySpaces(spaces.slice(15));
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: 'Search failed',
        description: 'Please try again.',
        type: 'error',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSpace = async (spaceId: string) => {
    try {
      const res = await secureApiFetch(`/api/spaces/join`, {
        method: 'POST',
        body: JSON.stringify({ spaceId }),
      });
      if (!res.ok) throw new Error(`Join failed: ${res.status}`);
      toast({
        title: 'Joined space',
        description: 'Welcome aboard!',
        type: 'success',
        duration: 3000
      });
      router.push(`/spaces/${spaceId}`);
    } catch (error) {
      console.error('Failed to join space:', error);
      toast({
        title: 'Failed to join space',
        description: 'Please try again.',
        type: 'error',
        duration: 5000
      });
    }
  };

  if (loading) {
    return <SpacesDiscoverySkeleton />;
  }

  return (
    <SpacesErrorBoundary context="directory">
      <div className="min-h-screen bg-black">
      {/* Header with Search */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Discover Spaces
            </h1>

            <div className="flex items-center gap-3 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search spaces, clubs, communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 bg-gray-900 border-gray-700"
                />
              </div>

              <Button
                onClick={() => router.push('/spaces/browse')}
                variant="outline"
                className="border-gray-700"
              >
                Browse All
              </Button>

              <Button
                onClick={() => router.push('/spaces/create')}
                className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
              >
                <Plus className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline">Create Space</span>
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[var(--hive-brand-primary)] text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Categories
            </button>
            {Object.entries(SPACE_CATEGORIES).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 ${
                  selectedCategory === key
                    ? 'bg-[var(--hive-brand-primary)] text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {typeof config.icon === 'string' ? (
                  <span>{config.icon}</span>
                ) : (
                  <config.icon className="w-4 h-4" />
                )}
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - SPEC.md Discovery Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Panic Relief Section */}
        {panicReliefSpaces.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-red-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Panic Relief</h2>
                <p className="text-sm text-gray-400">Spaces that solve immediate anxieties</p>
              </div>
            </div>
            <Grid columns={1} responsive="adaptive" gap={4}>
              {panicReliefSpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  onJoin={() => handleJoinSpace(space.id)}
                  onClick={() => router.push(`/spaces/${space.id}`)}
                />
              ))}
            </Grid>
          </section>
        )}

        {/* Where Your Friends Are Section */}
        {friendSpaces.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-green-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Where Your Friends Are</h2>
                <p className="text-sm text-gray-400">Spaces with existing connections</p>
              </div>
            </div>
            <Grid columns={1} responsive="adaptive" gap={4}>
              {friendSpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  onJoin={() => handleJoinSpace(space.id)}
                  onClick={() => router.push(`/spaces/${space.id}`)}
                  showFriends
                />
              ))}
            </Grid>
          </section>
        )}

        {/* Insider Access Section */}
        {insiderSpaces.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-purple-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Insider Access</h2>
                <p className="text-sm text-gray-400">Exclusive communities</p>
              </div>
            </div>
            <Grid columns={1} responsive="adaptive" gap={4}>
              {insiderSpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  onJoin={() => handleJoinSpace(space.id)}
                  onClick={() => router.push(`/spaces/${space.id}`)}
                  showExclusive
                />
              ))}
            </Grid>
          </section>
        )}

        {/* Category Spaces */}
        {selectedCategory !== 'all' && categorySpaces.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {SPACE_CATEGORIES[selectedCategory as keyof typeof SPACE_CATEGORIES]?.label} Spaces
                </h2>
                <p className="text-sm text-gray-400">Browse by category</p>
              </div>
            </div>
            <Grid columns={1} responsive="adaptive" gap={4}>
              {categorySpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  onJoin={() => handleJoinSpace(space.id)}
                  onClick={() => router.push(`/spaces/${space.id}`)}
                />
              ))}
            </Grid>
          </section>
        )}

        {/* Empty State */}
        {panicReliefSpaces.length === 0 &&
         friendSpaces.length === 0 &&
         insiderSpaces.length === 0 &&
         categorySpaces.length === 0 && (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No spaces found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery
                ? `No spaces matching "${searchQuery}"`
                : "Be the first to create a space!"}
            </p>
            <Button
              onClick={() => router.push('/spaces/create')}
              className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
            >
              Create the First Space
            </Button>
          </div>
        )}
      </div>
      </div>
    </SpacesErrorBoundary>
  );
}

// SpaceCard is now provided by @hive/ui
