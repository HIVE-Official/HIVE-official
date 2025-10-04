'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Input, Badge, Grid } from '@hive/ui';
import {
  Search,
  Filter,
  Users,
  TrendingUp,
  Shield,
  Home,
  Building,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useAuth } from '@hive/auth-logic';
import { api } from '@/lib/api-client';

// SPEC.md categories
const CATEGORIES = {
  university_org: { label: 'University Org', icon: Shield, color: 'text-blue-400' },
  student_org: { label: 'Student Org', icon: Users, color: 'text-green-400' },
  residential: { label: 'Residential', icon: Home, color: 'text-yellow-400' },
  greek_life: { label: 'Greek Life', icon: Building, color: 'text-purple-400' }
};

const ACTIVITY_LEVELS = {
  very_active: { label: 'Very Active', color: 'bg-green-500' },
  active: { label: 'Active', color: 'bg-blue-500' },
  moderate: { label: 'Moderate', color: 'bg-yellow-500' },
  quiet: { label: 'Quiet', color: 'bg-gray-500' }
};

const JOIN_POLICIES = {
  open: { label: 'Open', description: 'Anyone can join' },
  approval: { label: 'Approval Required', description: 'Leaders must approve' },
  invite_only: { label: 'Invite Only', description: 'Invitation required' }
};

interface SearchFilters {
  category?: string;
  memberCountMin?: number;
  memberCountMax?: number;
  activityLevel?: string;
  joinPolicy?: string;
}

interface SpaceSearchResult {
  id: string;
  name: string;
  description: string;
  category: keyof typeof CATEGORIES;
  memberCount: number;
  onlineCount: number;
  activityLevel: keyof typeof ACTIVITY_LEVELS;
  joinPolicy: keyof typeof JOIN_POLICIES;
  tags: string[];
  bannerImage?: string;
  lastActivity: Date;

  // Mutual member data
  mutualMembers: Array<{
    id: string;
    name: string;
    isFriend: boolean;
  }>;
}

export default function SpacesBrowsePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<SpaceSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Load initial suggestions
  useEffect(() => {
    if (!hasSearched) {
      loadInitialSpaces();
    }
  }, []);

  const loadInitialSpaces = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/spaces', {
        params: { limit: 20 }
      });
      setResults(response.spaces || []);
    } catch (error) {
      console.error('Failed to load initial spaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery && Object.keys(filters).length === 0) {
      loadInitialSpaces();
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);

      // SPEC.md: Text search with fuzzy matching
      const response = await api.get('/api/spaces/search', {
        params: {
          q: searchQuery,
          ...filters,
          limit: 50
        }
      });

      setResults(response.spaces || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setHasSearched(false);
    loadInitialSpaces();
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Browse Spaces
            </h1>

            {/* Search Bar */}
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name, description, or tags..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent) => setSearchQuery((e.target as HTMLInputElement).value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 bg-gray-900 border-gray-700"
                />
              </div>

              <Button
                onClick={handleSearch}
                className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
              >
                Search
              </Button>

              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className={`border-gray-700 relative ${showFilters ? 'bg-gray-800' : ''}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--hive-brand-primary)] text-black text-xs rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Filters</h3>
                {activeFilterCount > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-red-400 hover:text-red-300"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Category</label>
                  <select
                    value={filters.category || ''}
                    onChange={(e: React.ChangeEvent) => handleFilterChange('category', (e.target as HTMLInputElement).value || undefined)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  >
                    <option value="">All Categories</option>
                    {Object.entries(CATEGORIES).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>

                {/* Member Count Range */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Member Count</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.memberCountMin || ''}
                      onChange={(e: React.ChangeEvent) => handleFilterChange('memberCountMin', (e.target as HTMLInputElement).value ? parseInt((e.target as HTMLInputElement).value) : undefined)}
                      className="w-1/2 bg-gray-800 border border-gray-700 rounded px-2 py-2 text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.memberCountMax || ''}
                      onChange={(e: React.ChangeEvent) => handleFilterChange('memberCountMax', (e.target as HTMLInputElement).value ? parseInt((e.target as HTMLInputElement).value) : undefined)}
                      className="w-1/2 bg-gray-800 border border-gray-700 rounded px-2 py-2 text-white text-sm"
                    />
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Activity Level</label>
                  <select
                    value={filters.activityLevel || ''}
                    onChange={(e: React.ChangeEvent) => handleFilterChange('activityLevel', (e.target as HTMLInputElement).value || undefined)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  >
                    <option value="">Any Activity</option>
                    {Object.entries(ACTIVITY_LEVELS).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>

                {/* Join Policy */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Join Policy</label>
                  <select
                    value={filters.joinPolicy || ''}
                    onChange={(e: React.ChangeEvent) => handleFilterChange('joinPolicy', (e.target as HTMLInputElement).value || undefined)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  >
                    <option value="">Any Policy</option>
                    {Object.entries(JOIN_POLICIES).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            {hasSearched
              ? `Found ${results.length} spaces`
              : `Showing ${results.length} popular spaces`}
          </p>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-[var(--hive-brand-primary)]">Searching spaces...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No spaces found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <Grid columns={1} responsive="adaptive" gap={4}>
            {results.map((space) => (
              <SpaceSearchCard
                key={space.id}
                space={space}
                onClick={() => router.push(`/spaces/${space.id}`)}
              />
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

// SPEC.md compliant search result card
function SpaceSearchCard({
  space,
  onClick
}: {
  space: SpaceSearchResult;
  onClick: () => void;
}) {
  const category = CATEGORIES[space.category];
  const activityLevel = ACTIVITY_LEVELS[space.activityLevel];
  const joinPolicy = JOIN_POLICIES[space.joinPolicy];

  return (
    <Card
      className="bg-gray-900/50 border-gray-800 hover:border-[var(--hive-brand-primary)] transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4">
        {/* Icon/Banner */}
        <div className="w-24 h-24 bg-gradient-to-br from-hive-gold/20 to-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
          {space.bannerImage ? (
            <img src={space.bannerImage} alt="" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <category.icon className={`w-10 h-10 ${category.color}`} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-white hover:text-[var(--hive-brand-primary)] transition-colors">
                {space.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {space.description}
              </p>
            </div>

            {/* Activity Indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${activityLevel.color}`} />
              {space.onlineCount > 0 && (
                <span className="text-xs text-green-400">{space.onlineCount} online</span>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {space.memberCount} members
            </span>
            <Badge className="bg-gray-800 text-gray-300">
              {category.label}
            </Badge>
            {joinPolicy.label !== 'Open' && (
              <Badge className="bg-yellow-500/20 text-yellow-400">
                {joinPolicy.label}
              </Badge>
            )}
          </div>

          {/* Tags */}
          {space.tags.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {space.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Mutual Members Preview */}
          {space.mutualMembers.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-800">
              <p className="text-xs text-gray-400">
                {space.mutualMembers.filter(m => m.isFriend).length > 0 && (
                  <span className="text-green-400">
                    {space.mutualMembers.filter(m => m.isFriend).length} friends
                  </span>
                )}
                {space.mutualMembers.filter(m => m.isFriend).length > 0 &&
                 space.mutualMembers.filter(m => !m.isFriend).length > 0 && ' and '}
                {space.mutualMembers.filter(m => !m.isFriend).length > 0 && (
                  <span className="text-blue-400">
                    {space.mutualMembers.filter(m => !m.isFriend).length} connections
                  </span>
                )}
                {' are members'}
              </p>
            </div>
          )}

          {/* Last Activity */}
          <div className="mt-2 text-xs text-gray-500">
            Last active: {formatLastActivity(space.lastActivity)}
          </div>
        </div>

        {/* Join Button */}
        <div className="flex-shrink-0">
          <Button
            size="sm"
            className="bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)] hover:text-black"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              // Handle join
            }}
          >
            View
          </Button>
        </div>
      </div>
    </Card>
  );
}

function formatLastActivity(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  if (hours < 48) return 'yesterday';
  if (hours < 168) return `${Math.floor(hours / 24)}d ago`;
  return d.toLocaleDateString();
}