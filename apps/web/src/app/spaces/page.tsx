'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Input, Badge, Grid, useToast } from '@hive/ui';
import { Search, Plus, Users, TrendingUp, Shield, Sparkles, UserCheck, Lock } from 'lucide-react';
import { useAuth } from '@hive/auth-logic';
import { api } from '@/lib/api-client';
import { SpacesErrorBoundary } from '@/components/error-boundaries';
import { SpacesLoadingSkeleton } from '@/components/spaces/spaces-loading-skeleton';

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
  const { showToast } = useToast();
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
      const response = await api.get('/api/spaces/recommended');

      setPanicReliefSpaces(response.panicRelief || []);
      setFriendSpaces(response.whereYourFriendsAre || []);
      setInsiderSpaces(response.insiderAccess || []);

      // Load category spaces
      if (selectedCategory !== 'all') {
        const categoryResponse = await api.get('/api/spaces', {
          params: {
            category: selectedCategory,
            limit: 20
          }
        });
        setCategorySpaces(categoryResponse.spaces || []);
      }
    } catch (error) {
      console.error('Failed to load space recommendations:', error);
      showToast({
        message: 'Failed to load space recommendations. Please try again.',
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
      const response = await api.get('/api/spaces/search', {
        params: {
          q: searchQuery,
          limit: 20
        }
      });

      // Display search results in all sections
      const spaces = response.spaces || [];
      setPanicReliefSpaces(spaces.slice(0, 5));
      setFriendSpaces(spaces.slice(5, 10));
      setInsiderSpaces(spaces.slice(10, 15));
      setCategorySpaces(spaces.slice(15));
    } catch (error) {
      console.error('Search failed:', error);
      showToast({
        message: 'Search failed. Please try again.',
        type: 'error',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSpace = async (spaceId: string) => {
    try {
      await api.post(`/api/spaces/${spaceId}/join`);
      showToast({
        message: 'Successfully joined space!',
        type: 'success',
        duration: 3000
      });
      router.push(`/spaces/${spaceId}`);
    } catch (error) {
      console.error('Failed to join space:', error);
      showToast({
        message: 'Failed to join space. Please try again.',
        type: 'error',
        duration: 5000
      });
    }
  };

  if (loading) {
    return <SpacesLoadingSkeleton />;
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
                  onChange={(e: React.ChangeEvent) => setSearchQuery(e.target.value)}
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

// SPEC.md compliant Space Card
function SpaceCard({
  space,
  onJoin,
  onClick,
  showFriends = false,
  showExclusive = false
}: {
  space: SpaceRecommendation;
  onJoin: () => void;
  onClick: () => void;
  showFriends?: boolean;
  showExclusive?: boolean;
}) {
  const activityColors = {
    very_active: 'bg-green-500',
    active: 'bg-blue-500',
    moderate: 'bg-yellow-500',
    quiet: 'bg-gray-500'
  };

  return (
    <Card
      className="bg-gray-900/50 border-gray-800 hover:border-[var(--hive-brand-primary)] transition-all cursor-pointer group"
      onClick={onClick}
    >
      {/* Banner */}
      <div className="h-24 bg-gradient-to-br from-hive-gold/20 to-purple-600/20 relative">
        {space.bannerImage && (
          <img src={space.bannerImage} alt="" className="w-full h-full object-cover" />
        )}

        {/* Online indicator */}
        {space.onlineCount > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur rounded-full px-2 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-white">{space.onlineCount} online</span>
          </div>
        )}

        {/* Join Policy Badge */}
        {space.joinPolicy !== 'open' && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-black/60 text-white">
              {space.joinPolicy === 'approval' ? 'Approval Required' : 'Invite Only'}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-white group-hover:text-[var(--hive-brand-primary)] transition-colors">
              {space.name}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2 mt-1">
              {space.description}
            </p>
          </div>

          {/* Activity Level */}
          <div className={`w-2 h-2 rounded-full ${activityColors[space.activityLevel]}`} />
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{space.memberCount}</span>
          </div>

          {showFriends && space.friendsInSpace > 0 && (
            <div className="flex items-center gap-1 text-green-400">
              <UserCheck className="w-4 h-4" />
              <span>{space.friendsInSpace} friends</span>
            </div>
          )}

          {space.mutualConnections > 0 && (
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>{space.mutualConnections} mutual</span>
            </div>
          )}
        </div>

        {/* Behavioral Score Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {/* Anxiety Relief */}
            <div
              className="h-1 bg-red-400 rounded-full transition-all"
              style={{ width: `${space.anxietyReliefScore * 60}px` }}
            />
            {/* Social Proof */}
            <div
              className="h-1 bg-green-400 rounded-full transition-all"
              style={{ width: `${space.socialProofScore * 60}px` }}
            />
            {/* Insider Access */}
            {showExclusive && (
              <div
                className="h-1 bg-purple-400 rounded-full transition-all"
                style={{ width: `${space.insiderAccessScore * 60}px` }}
              />
            )}
          </div>

          {/* Join Button */}
          <Button
            size="sm"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onJoin();
            }}
            className="bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)] hover:text-black"
          >
            Join
          </Button>
        </div>

        {/* 70% Completion Rate Indicator */}
        {space.joinToActiveRate >= 0.7 && (
          <div className="mt-2 pt-2 border-t border-gray-800">
            <p className="text-xs text-green-400">
              ✓ {Math.round(space.joinToActiveRate * 100)}% become active members
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}