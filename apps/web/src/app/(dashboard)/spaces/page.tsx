"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { authenticatedFetch } from '../../../lib/auth-utils';
import { Button, Card } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { Heart, Users, Settings as _Settings, Star, Clock, Activity, Plus, Crown, Search, Grid, List, TrendingUp, ArrowUpDown, Compass, AlertCircle } from "lucide-react";
import { type Space, type SpaceType } from "@hive/core";
import { useDebounce } from "@hive/hooks";
import { cn } from "@hive/ui";
import { UnifiedSpaceCard } from "./components/unified-space-card";
import { SpaceLoadingSkeleton } from "./components/space-loading-skeleton";
import { SmartSpaceDiscovery } from "../../../components/spaces/smart-space-discovery";
import { ErrorBoundary } from '../../../components/error-boundary';
import { useSession } from '../../../hooks/use-session';

// Dynamic imports for heavy components - reduces initial bundle size
const CreateSpaceModal = dynamic(
  async () => {
    const mod = await import("../../../components/spaces/create-space-modal");
    return { default: mod.CreateSpaceModal };
  },
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-[var(--hive-black)]/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hive-gold"></div>
      </div>
    )
  }
);

// Space category filters - aligned with new HIVE system
const spaceTypeFilters = [
  { id: "all", label: "All Spaces", color: "bg-neutral-500", icon: Compass, subtitle: "Every community" },
  { id: "student_organizations", label: "Student Spaces", color: "bg-blue-500", icon: Users, subtitle: "Student-led communities" },
  { id: "university_organizations", label: "University Spaces", color: "bg-emerald-500", icon: Crown, subtitle: "Academic programs" },
  { id: "greek_life", label: "Greek Life", color: "bg-amber-500", icon: Heart, subtitle: "Fraternities & sororities" },
  { id: "campus_living", label: "Residential Life", color: "bg-amber-500", icon: Grid, subtitle: "Dorms & living communities" },
  { id: "hive_exclusive", label: "HIVE Exclusive", color: "bg-indigo-500", icon: Star, subtitle: "Platform specials" },
];

async function fetchMySpaces(): Promise<{
  joined: Space[];
  favorited: Space[];
  owned: Space[];
  recent: Space[];
}> {
  const response = await authenticatedFetch('/api/profile/my-spaces');
  if (!response.ok) {
    throw new Error(`Failed to fetch my spaces: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (data.success && data.spaces) {
    return {
      joined: data.spaces,
      favorited: [], // Would come from user preferences
      owned: data.spaces.filter((space: any) => space.membership?.role === 'admin' || space.membership?.role === 'owner'),
      recent: data.spaces.slice(0, 3) // Most recent 3
    };
  }
  
  return {
    joined: [],
    favorited: [],
    owned: [],
    recent: []
  };
}

async function fetchBrowseSpaces(filter: SpaceType | "all", searchTerm: string): Promise<Space[]> {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("type", filter);
  if (searchTerm) params.set("search", searchTerm);

  const response = await authenticatedFetch(`/api/spaces/browse?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch spaces");
  const data = await response.json();
  return data.spaces || [];
}

// Unified Spaces Hub - Consolidates My/Browse/Trending into single interface
export default function UnifiedSpacesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: _user } = useSession();
  
  // Tab management - My Spaces vs Browse
  const [activeView, setActiveView] = useState<"my" | "browse">("my");
  const [mySpacesTab, setMySpacesTab] = useState<"joined" | "favorited" | "owned" | "recent">("joined");
  
  // Browse functionality
  const [filter, setFilter] = useState<SpaceType | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"popular" | "trending" | "recent" | "alphabetical">("popular");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSmartDiscovery, setShowSmartDiscovery] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Handle URL parameters for deep linking
  useEffect(() => {
    const view = searchParams.get('view');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    
    if (view === 'browse') {
      setActiveView('browse');
    }
    
    if (category && category !== 'all') {
      setFilter(category as SpaceType);
    }
    
    if (sort === 'trending') {
      setSortBy('trending');
    }
  }, [searchParams]);

  // Fetch my spaces with retry and better error handling
  const { data: mySpacesData, isLoading: mySpacesLoading, error: mySpacesError, refetch: refetchMySpaces } = useQuery({
    queryKey: ["my-spaces"],
    queryFn: fetchMySpaces,
    enabled: activeView === "my",
    staleTime: 300000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error?.message.includes('401') || error?.message.includes('unauthorized')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Fetch browse spaces with retry and better error handling
  const { data: browseSpaces = [], isLoading: browseLoading, error: browseError, refetch: refetchBrowseSpaces } = useQuery({
    queryKey: ["spaces", filter, debouncedSearchTerm],
    queryFn: () => fetchBrowseSpaces(filter, debouncedSearchTerm),
    enabled: activeView === "browse",
    staleTime: 180000, // 3 minutes - browse data changes more frequently
    retry: (failureCount, error) => {
      if (error?.message.includes('401') || error?.message.includes('unauthorized')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Filter and sort browse spaces
  const filteredBrowseSpaces = useMemo(() => {
    if (!browseSpaces) return [];
    
    const sortedSpaces = [...browseSpaces];
    
    switch (sortBy) {
      case "popular":
        sortedSpaces.sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
        break;
      case "trending":
        sortedSpaces.sort((a, b) => {
          // Calculate trending score based on recent growth and engagement
          const now = Date.now();
          const dayMs = 24 * 60 * 60 * 1000;
          
          const aCreated = a.createdAt?.toDate?.() || new Date(0);
          const bCreated = b.createdAt?.toDate?.() || new Date(0);
          
          // Recent spaces get boost, older spaces penalized
          const aAge = Math.max(1, (now - aCreated.getTime()) / dayMs);
          const bAge = Math.max(1, (now - bCreated.getTime()) / dayMs);
          
          // Trending = members / age (recent spaces with members trend higher)
          const aTrending = (a.memberCount || 0) / Math.sqrt(aAge);
          const bTrending = (b.memberCount || 0) / Math.sqrt(bAge);
          
          return bTrending - aTrending;
        });
        break;
      case "recent":
        sortedSpaces.sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(0);
          return bTime.getTime() - aTime.getTime();
        });
        break;
      case "alphabetical":
        sortedSpaces.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return sortedSpaces;
  }, [browseSpaces, sortBy]);

  const mySpaceTabs = [
    { id: "joined", label: "Joined", icon: Users, count: mySpacesData?.joined.length || 0 },
    { id: "favorited", label: "Favorited", icon: Heart, count: mySpacesData?.favorited.length || 0 },
    { id: "owned", label: "Owned", icon: Crown, count: mySpacesData?.owned.length || 0 },
    { id: "recent", label: "Recent", icon: Clock, count: mySpacesData?.recent.length || 0 },
  ];

  const currentMySpaces = mySpacesData?.[mySpacesTab] || [];

  const [_createError, _setCreateError] = useState<string | null>(null);
  const [_isCreatingSpace, _setIsCreatingSpace] = useState(false);

  const _handleSpaceCreated = async (spaceData: any) => {
    _setIsCreatingSpace(true);
    _setCreateError(null);
    
    try {
      const response = await authenticatedFetch('/api/spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: spaceData.name,
          description: spaceData.description,
          type: spaceData.type === 'academic' ? 'student_organizations' :
                spaceData.type === 'residential' ? 'campus_living' :
                spaceData.type === 'professional' ? 'student_organizations' :
                spaceData.type === 'recreational' ? 'student_organizations' :
                spaceData.type === 'project' ? 'student_organizations' : 'student_organizations',
          isPrivate: spaceData.visibility === 'private' || spaceData.visibility === 'invite_only',
          tags: spaceData.customizations?.tags || []
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to create space (${response.status})`);
      }

      const result = await response.json();
      const newSpace = result.data;

      // Close modal first
      setShowCreateModal(false);
      
      // Invalidate caches
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      queryClient.invalidateQueries({ queryKey: ["my-spaces"] });
      
      // Show success feedback
      if (newSpace?.id) {
        // Small delay to let user see success state
        setTimeout(() => {
          router.push(`/spaces/${newSpace.id}`);
        }, 500);
      }
    } catch (error) {
      console.error('Failed to create space:', error);
      _setCreateError(error instanceof Error ? error.message : 'Failed to create space. Please try again.');
    } finally {
      _setIsCreatingSpace(false);
    }
  };

  const [joiningSpaces, setJoiningSpaces] = useState<Set<string>>(new Set());
  const [_joinErrors, _setJoinErrors] = useState<Record<string, string>>({});

  const handleJoinSpace = async (spaceId: string) => {
    if (joiningSpaces.has(spaceId)) return; // Prevent double-joining
    
    setJoiningSpaces(prev => new Set(prev).add(spaceId));
    _setJoinErrors(prev => {
      const { [spaceId]: _, ...rest } = prev;
      return rest;
    });
    
    try {
      const response = await authenticatedFetch('/api/spaces/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spaceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to join space (${response.status})`);
      }

      // Invalidate caches to update space lists
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      queryClient.invalidateQueries({ queryKey: ["my-spaces"] });
      
      // Show success feedback - could add toast here
      
      
    } catch (error) {
      console.error('Failed to join space:', error);
      _setJoinErrors(prev => ({
        ...prev,
        [spaceId]: error instanceof Error ? error.message : 'Failed to join space'
      }));
    } finally {
      setJoiningSpaces(prev => {
        const updated = new Set(prev);
        updated.delete(spaceId);
        return updated;
      });
    }
  };

  const handleViewSpace = (spaceId: string) => {
    router.push(`/spaces/${spaceId}`);
  };

  // Mock user profile for smart discovery
  const mockUserProfile = {
    id: 'current-user',
    interests: ['computer-science', 'algorithms', 'web-development'],
    major: 'Computer Science',
    year: 'Junior'
  };

  const isLoading = activeView === "my" ? mySpacesLoading : browseLoading;
  const error = activeView === "my" ? mySpacesError : browseError;

  return (
    <ErrorBoundary>
      <PageContainer
        title="HIVE Spaces"
        subtitle="Your campus communities - discover, join, and create meaningful connections"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Spaces" }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            {activeView === "browse" && (
              <Button 
                variant="outline"
                onClick={() => setShowSmartDiscovery(!showSmartDiscovery)}
                className="border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/10"
              >
                <Compass className="h-4 w-4 mr-2" />
                {showSmartDiscovery ? 'Classic Browse' : 'Smart Discovery'}
              </Button>
            )}
            <Button 
              className="bg-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/50 hover:bg-[var(--hive-brand-secondary)]/40 transition-colors"
              onClick={() => setShowCreateModal(true)}
              title="Space Creation coming in v1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Space
              <span className="ml-2 text-xs bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-full">v1</span>
            </Button>
          </div>
        }
        maxWidth="xl"
      >
        {/* Unified Navigation Tabs */}
        <div className="flex border-b border-[var(--hive-white)]/10 mb-8">
          <button
            onClick={() => setActiveView("my")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors",
              activeView === "my"
                ? "border-hive-gold text-hive-gold"
                : "border-transparent text-neutral-400 hover:text-[var(--hive-text-inverse)]"
            )}
          >
            <Users className="h-4 w-4" />
            My Spaces
            {mySpacesData && (
              <span className={cn(
                "px-2 py-0.5 text-xs rounded-full",
                activeView === "my"
                  ? "bg-hive-gold text-hive-obsidian"
                  : "bg-[var(--hive-white)]/10 text-neutral-400"
              )}>
                {mySpacesData.joined.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveView("browse")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors",
              activeView === "browse"
                ? "border-hive-gold text-hive-gold"
                : "border-transparent text-neutral-400 hover:text-[var(--hive-text-inverse)]"
            )}
          >
            <Compass className="h-4 w-4" />
            Browse & Discover
          </button>
        </div>

        {/* My Spaces View */}
        {activeView === "my" && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{mySpacesData?.joined.length || 0}</div>
                <div className="text-sm text-neutral-400">Joined</div>
              </Card>

              <Card className="p-4 text-center bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{mySpacesData?.favorited.length || 0}</div>
                <div className="text-sm text-neutral-400">Favorited</div>
              </Card>

              <Card className="p-4 text-center bg-gradient-to-br from-hive-gold/10 to-hive-gold/10 border-hive-gold/20">
                <Crown className="h-8 w-8 mx-auto mb-2 text-hive-gold" />
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{mySpacesData?.owned.length || 0}</div>
                <div className="text-sm text-neutral-400">Owned</div>
              </Card>

              <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">
                  {(mySpacesData?.joined.length || 0) + (mySpacesData?.owned.length || 0)}
                </div>
                <div className="text-sm text-neutral-400">Total Active</div>
              </Card>
            </div>

            {/* My Spaces Tab Navigation */}
            <div className="flex border-b border-[var(--hive-white)]/10 mb-8">
              {mySpaceTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setMySpacesTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                      mySpacesTab === tab.id
                        ? "border-hive-gold text-hive-gold"
                        : "border-transparent text-neutral-400 hover:text-[var(--hive-text-inverse)]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                    {tab.count > 0 && (
                      <span className={cn(
                        "px-2 py-0.5 text-xs rounded-full",
                        mySpacesTab === tab.id
                          ? "bg-hive-gold text-hive-obsidian"
                          : "bg-[var(--hive-white)]/10 text-neutral-400"
                      )}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Browse View */}
        {activeView === "browse" && !showSmartDiscovery && (
          <>
            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search spaces, descriptions, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--hive-white)]/[0.02] border border-[var(--hive-white)]/[0.06] rounded-lg text-[var(--hive-text-inverse)] placeholder:text-neutral-400 focus:border-hive-gold focus:outline-none"
                />
              </div>

              <div className="flex items-center bg-[var(--hive-white)]/[0.02] border border-[var(--hive-white)]/[0.06] rounded-lg p-1">
                <ArrowUpDown className="h-4 w-4 text-neutral-400 mx-2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[var(--hive-text-inverse)] text-sm focus:outline-none border-none"
                >
                  <option value="popular" className="bg-neutral-950">Popular</option>
                  <option value="trending" className="bg-neutral-950">Trending</option>
                  <option value="recent" className="bg-neutral-950">Recent</option>
                  <option value="alphabetical" className="bg-neutral-950">A-Z</option>
                </select>
              </div>

              <div className="flex items-center bg-[var(--hive-white)]/[0.02] border border-[var(--hive-white)]/[0.06] rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-hive-gold text-hive-obsidian" : "text-[var(--hive-text-inverse)]"}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-hive-gold text-hive-obsidian" : "text-[var(--hive-text-inverse)]"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Category Filter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
              {spaceTypeFilters.map((filterOption) => (
                <Button
                  key={filterOption.id}
                  variant="ghost"
                  onClick={() => setFilter(filterOption.id as SpaceType | "all")}
                  className={cn(
                    "h-auto p-4 flex flex-col items-center text-center transition-all",
                    filter === filterOption.id
                      ? "bg-hive-gold/10 border border-hive-gold/30 text-hive-gold"
                      : "border border-[var(--hive-white)]/10 text-[var(--hive-text-inverse)] hover:bg-[var(--hive-white)]/[0.05]"
                  )}
                >
                  <span className="text-2xl mb-2">{filterOption.emoji}</span>
                  <span className="font-medium text-sm">{filterOption.label}</span>
                  <span className="text-xs text-neutral-400 mt-1">{filterOption.subtitle}</span>
                </Button>
              ))}
            </div>
          </>
        )}

        {/* Smart Discovery Mode */}
        {activeView === "browse" && showSmartDiscovery && (
          <SmartSpaceDiscovery
            currentUserId={mockUserProfile.id}
            userInterests={mockUserProfile.interests}
            userMajor={mockUserProfile.major}
            userYear={mockUserProfile.year}
            onJoinSpace={handleJoinSpace}
            onViewSpace={handleViewSpace}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <SpaceLoadingSkeleton variant="grid" count={6} />
        )}

        {/* Error State */}
        {error && (
          <Card className="p-8 text-center border-red-500/20 bg-red-500/5">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">Unable to load spaces</h3>
            <p className="text-neutral-400 mb-4">
              {error?.message?.includes('401') || error?.message?.includes('unauthorized') 
                ? 'Please sign in again to view your spaces.'
                : 'There was an error loading the spaces. Please check your connection and try again.'
              }
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => {
                  if (activeView === "my") {
                    refetchMySpaces();
                  } else {
                    refetchBrowseSpaces();
                  }
                }} 
                variant="outline"
                className="border-[var(--hive-white)]/20 text-[var(--hive-text-inverse)] hover:bg-[var(--hive-white)]/5"
              >
                Try Again
              </Button>
              {(error?.message?.includes('401') || error?.message?.includes('unauthorized')) && (
                <Button 
                  onClick={() => router.push('/auth/login')}
                  className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                >
                  Sign In
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Results */}
        {!isLoading && !error && !showSmartDiscovery && (
          <>
            {/* Widget Experience Hint */}
            {((activeView === "my" && currentMySpaces.length > 0) || (activeView === "browse" && filteredBrowseSpaces.length > 0)) && (
              <Card className="p-4 mb-6 bg-gradient-to-r from-hive-gold/[0.05] to-transparent border-hive-gold/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-hive-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-hive-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--hive-text-inverse)]">Enhanced Space Experience</p>
                    <p className="text-xs text-neutral-400">Each space features interactive widgets: post boards, events, members, and tools</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Browse Results Header */}
            {activeView === "browse" && (
              <div className="flex items-center justify-between mb-6">
                <p className="text-neutral-400">
                  {filteredBrowseSpaces.length} space{filteredBrowseSpaces.length !== 1 ? 's' : ''} found
                  {filter !== 'all' && (
                    <span className="ml-2 text-hive-gold text-sm">
                      in {spaceTypeFilters.find(f => f.id === filter)?.label || filter}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  {sortBy === 'trending' && <TrendingUp className="h-4 w-4 text-hive-gold" />}
                  <span className="text-sm text-neutral-400">
                    Sorted by {sortBy === 'popular' ? 'popularity' : sortBy}
                  </span>
                </div>
              </div>
            )}
            
            {/* Spaces Grid/List */}
            {activeView === "my" && currentMySpaces.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMySpaces.map((space) => (
                  <UnifiedSpaceCard 
                    key={space.id} 
                    space={space} 
                    variant="grid"
                    showMembership={true}
                    membershipRole={mySpacesTab === "owned" ? "owner" : "member"}
                  />
                ))}
              </div>
            )}

            {activeView === "browse" && filteredBrowseSpaces.length > 0 && (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredBrowseSpaces.map((space) => (
                    <UnifiedSpaceCard key={space.id} space={space} variant="grid" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {filteredBrowseSpaces.map((space) => (
                    <UnifiedSpaceCard key={space.id} space={space} variant="list" />
                  ))}
                </div>
              )
            )}

            {/* Empty States */}
            {activeView === "my" && currentMySpaces.length === 0 && (
              <MySpacesEmptyState 
                activeTab={mySpacesTab} 
                onSwitchToBrowse={() => {
                  setActiveView("browse");
                  router.push("/spaces?view=browse");
                }} 
              />
            )}

            {activeView === "browse" && filteredBrowseSpaces.length === 0 && (
              <BrowseEmptyState searchTerm={searchTerm} filter={filter} setSearchTerm={setSearchTerm} setFilter={setFilter} />
            )}
          </>
        )}

        {/* Create Space Modal - Dynamic Loading */}
        {showCreateModal && (
          <CreateSpaceModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreateSpace={_handleSpaceCreated}
            isLoading={_isCreatingSpace}
            error={_createError}
          />
        )}
      </PageContainer>
    </ErrorBoundary>
  );
}

// Empty State Components
function MySpacesEmptyState({ activeTab, onSwitchToBrowse }: { activeTab: string; onSwitchToBrowse: () => void }) {
  const getEmptyContent = () => {
    switch (activeTab) {
      case "joined":
        return {
          icon: Users,
          title: "No spaces joined yet",
          description: "Start by browsing and joining spaces that interest you.",
          action: "Browse Spaces",
        };
      case "favorited":
        return {
          icon: Heart,
          title: "No favorite spaces",
          description: "Heart spaces you love to keep them easily accessible.",
          action: "Browse Spaces",
        };
      case "owned":
        return {
          icon: Crown,
          title: "No spaces owned",
          description: "Space creation is coming in v1! For now, browse and join existing communities to get started.",
          action: "Browse Spaces",
        };
      case "recent":
        return {
          icon: Clock,
          title: "No recent activity",
          description: "Your recent space activity will appear here.",
          action: "Browse Spaces",
        };
      default:
        return {
          icon: Users,
          title: "No spaces found",
          description: "Get started by joining or creating spaces.",
          action: "Browse Spaces",
        };
    }
  };

  const { icon: Icon, title, description, action } = getEmptyContent();

  return (
    <Card className="p-12 text-center">
      <Icon className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">{title}</h3>
      <p className="text-neutral-400 mb-6">{description}</p>
      <Button 
        onClick={onSwitchToBrowse}
        className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
      >
        {action}
      </Button>
    </Card>
  );
}

function BrowseEmptyState({ 
  searchTerm, 
  setSearchTerm, 
  setFilter 
}: { 
  searchTerm: string; 
  filter: SpaceType | "all"; 
  setSearchTerm: (_term: string) => void; 
  setFilter: (filter: SpaceType | "all") => void; 
}) {
  return (
    <Card className="p-12 text-center">
      <Compass className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">No spaces found</h3>
      <p className="text-neutral-400 mb-6">
        {searchTerm 
          ? `No spaces match "${searchTerm}". Try different keywords or browse all spaces.`
          : "No spaces available for this filter. Try selecting a different category."
        }
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          onClick={() => setSearchTerm("")}
          variant="outline"
          className="border-[var(--hive-white)]/20 text-[var(--hive-text-inverse)]"
        >
          Clear Search
        </Button>
        <Button 
          onClick={() => setFilter("all")}
          className="bg-hive-gold text-hive-obsidian"
        >
          Browse All Spaces
        </Button>
      </div>
    </Card>
  );
}