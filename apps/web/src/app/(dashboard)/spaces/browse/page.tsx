"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PageContainer, Button, Card } from "@hive/ui";
import { Search, Filter as _Filter, Grid, List, TrendingUp, Users as _Users, Star, MapPin as _MapPin, Clock as _Clock, AlertCircle, Compass, ArrowUpDown, Plus } from "lucide-react";
import { type SpaceType, type Space } from "@hive/core";
import { useDebounce } from "@hive/hooks";
import { cn } from "@hive/ui";
import { UnifiedSpaceCard } from "../components/unified-space-card";
import { CreateSpaceModal } from "../components/create-space-modal";
import { SpaceErrorBoundaryWrapper } from "../components/space-error-boundary";
import { SpaceLoadingSkeleton } from "../components/space-loading-skeleton";

// Space category filters - aligned with new HIVE system
const spaceTypeFilters = [
  { id: "all", label: "All Spaces", color: "bg-gray-500", emoji: "🌐", subtitle: "Every community" },
  { id: "student_organizations", label: "Student Spaces", color: "bg-blue-500", emoji: "🎯", subtitle: "Student-led communities" },
  { id: "university_organizations", label: "University Spaces", color: "bg-emerald-500", emoji: "🎓", subtitle: "Academic programs" },
  { id: "greek_life", label: "Greek Life", color: "bg-purple-500", emoji: "🏛️", subtitle: "Fraternities & sororities" },
  { id: "campus_living", label: "Residential Life", color: "bg-orange-500", emoji: "🏠", subtitle: "Dorms & living communities" },
  { id: "hive_exclusive", label: "HIVE Exclusive", color: "bg-indigo-500", emoji: "💎", subtitle: "Platform specials" },
];

async function fetchSpaces(filter: SpaceType | "all", searchTerm: string): Promise<Space[]> {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("type", filter);
  if (searchTerm) params.set("search", searchTerm);

  const headers: Record<string, string> = {};
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? `dev_token_${session.uid}` : session.token}`;
    }
  } catch (error) {
    console.error('Error getting session:', error);
  }

  const response = await fetch(`/api/spaces/browse?${params.toString()}`, { headers });
  if (!response.ok) throw new Error("Failed to fetch spaces");
  const data = await response.json();
  return data.spaces || [];
}

export default function BrowseSpacesPage() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<SpaceType | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"popular" | "trending" | "recent" | "alphabetical">("popular");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Handle URL parameters for deep linking
  useEffect(() => {
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    
    if (category && category !== 'all') {
      setFilter(category as SpaceType);
    }
    
    if (sort === 'trending') {
      setSortBy('trending');
    }
  }, [searchParams]);

  const { data: spaces = [], isLoading, error } = useQuery({
    queryKey: ["spaces", filter, debouncedSearchTerm],
    queryFn: () => fetchSpaces(filter, debouncedSearchTerm),
  });

  const filteredSpaces = useMemo(() => {
    if (!spaces) return [];
    
    const sortedSpaces = [...spaces];
    
    switch (sortBy) {
      case "popular":
        sortedSpaces.sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
        break;
      case "trending":
        // Mock trending calculation based on member count and recent activity
        sortedSpaces.sort((a, b) => {
          const aTrending = (a.memberCount || 0) * Math.random() * 2;
          const bTrending = (b.memberCount || 0) * Math.random() * 2;
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
  }, [spaces, sortBy]);

  const handleSpaceCreated = (newSpace: any) => {
    // Invalidate and refetch spaces data
    queryClient.invalidateQueries({ queryKey: ["spaces"] });
    // Navigate to the new space
    window.location.href = `/spaces/${newSpace.id}`;
  };

  return (
    <SpaceErrorBoundaryWrapper>
      <PageContainer
      title="Browse Spaces"
      subtitle="Discover communities and connect with others at your campus"
      breadcrumbs={[
        { label: "Spaces", href: "/spaces" },
        { label: "Browse" }
      ]}
      actions={
        <Button 
          className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Space
        </Button>
      }
      maxWidth="xl"
    >
      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search spaces, descriptions, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white placeholder:text-neutral-400 focus:border-yellow-400 focus:outline-none"
          />
        </div>

        {/* Sort Options */}
        <div className="flex items-center bg-white/[0.02] border border-white/[0.06] rounded-lg p-1">
          <ArrowUpDown className="h-4 w-4 text-neutral-400 mx-2" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-white text-sm focus:outline-none border-none"
          >
            <option value="popular" className="bg-neutral-950">Popular</option>
            <option value="trending" className="bg-neutral-950">Trending</option>
            <option value="recent" className="bg-neutral-950">Recent</option>
            <option value="alphabetical" className="bg-neutral-950">A-Z</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-white/[0.02] border border-white/[0.06] rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-yellow-400 text-neutral-950" : "text-white"}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-yellow-400 text-neutral-950" : "text-white"}
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
                ? "bg-yellow-400/10 border border-yellow-400/30 text-yellow-400"
                : "border border-white/10 text-white hover:bg-white/[0.05]"
            )}
          >
            <span className="text-2xl mb-2">{filterOption.emoji}</span>
            <span className="font-medium text-sm">{filterOption.label}</span>
            <span className="text-xs text-neutral-400 mt-1">{filterOption.subtitle}</span>
          </Button>
        ))}
      </div>


      {/* Loading State */}
      {isLoading && (
        <SpaceLoadingSkeleton variant="grid" count={6} />
      )}

      {/* Error State */}
      {error && (
        <Card className="p-8 text-center border-red-500/20 bg-red-500/5">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Unable to load spaces</h3>
          <p className="text-neutral-400 mb-4">There was an error loading the spaces. Please try again.</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </Card>
      )}

      {/* Results */}
      {!isLoading && !error && (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-neutral-400">
              {filteredSpaces.length} space{filteredSpaces.length !== 1 ? 's' : ''} found
              {filter !== 'all' && (
                <span className="ml-2 text-yellow-400 text-sm">
                  in {spaceTypeFilters.find(f => f.id === filter)?.label || filter}
                </span>
              )}
            </p>
            <div className="flex items-center gap-2">
              {sortBy === 'trending' && <TrendingUp className="h-4 w-4 text-yellow-400" />}
              <span className="text-sm text-neutral-400">
                Sorted by {sortBy === 'popular' ? 'popularity' : sortBy}
              </span>
            </div>
          </div>

          {/* Widget Experience Hint */}
          {filteredSpaces.length > 0 && (
            <Card className="p-4 mb-6 bg-gradient-to-r from-yellow-400/[0.05] to-transparent border-yellow-400/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Enhanced Space Experience</p>
                  <p className="text-xs text-neutral-400">Each space features interactive widgets: post boards, events, members, and tools</p>
                </div>
              </div>
            </Card>
          )}
          
          {/* Spaces Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredSpaces.map((space) => (
                <UnifiedSpaceCard key={space.id} space={space} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredSpaces.map((space) => (
                <UnifiedSpaceCard key={space.id} space={space} variant="list" />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredSpaces.length === 0 && (
            <Card className="p-12 text-center">
              <Compass className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No spaces found</h3>
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
                  className="border-white/20 text-white"
                >
                  Clear Search
                </Button>
                <Button 
                  onClick={() => setFilter("all")}
                  className="bg-yellow-400 text-neutral-950"
                >
                  Browse All Spaces
                </Button>
              </div>
            </Card>
          )}
        </>
      )}

      {/* Create Space Modal */}
      <CreateSpaceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleSpaceCreated}
      />
    </PageContainer>
    </SpaceErrorBoundaryWrapper>
  );
}


