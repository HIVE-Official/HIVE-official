"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { authenticatedFetch } from '../../../../lib/auth-utils';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { 
  UBSpaceTemplateCard,
  UBSpacesDirectory,
  SpaceActivationModal,
  UB_SPACE_TEMPLATES,
  type ActivationRequestData
} from "@hive/ui/src/components/spaces/ub-space-templates";
import { type Space, type SpaceType } from "@hive/core";
import { useDebounce } from "@hive/hooks";
import { cn } from "@hive/ui";
import { 
  Users, 
  Search, 
  Plus, 
  Compass, 
  AlertCircle,
  Star,
  Activity,
  TrendingUp,
  Grid,
  List,
  ArrowUpDown,
  Heart,
  Crown,
  Clock,
  Building2,
  GraduationCap,
  MapPin
} from "lucide-react";
import { useSession } from '../../../../hooks/use-session';

// Enhanced space type filters with UB-specific categories
const enhancedSpaceTypeFilters = [
  { id: "all", label: "All Spaces", color: "bg-gray-500", emoji: "🌐", subtitle: "Every community" },
  { id: "campus_living", label: "Residential", color: "bg-orange-500", emoji: "🏠", subtitle: "Dorms & living communities" },
  { id: "student_organizations", label: "Academic", color: "bg-blue-500", emoji: "🎓", subtitle: "Departments & courses" },
  { id: "university_organizations", label: "Official", color: "bg-emerald-500", emoji: "🏛️", subtitle: "University programs" },
  { id: "greek_life", label: "Greek Life", color: "bg-purple-500", emoji: "🏛️", subtitle: "Fraternities & sororities" },
  { id: "hive_exclusive", label: "HIVE Special", color: "bg-indigo-500", emoji: "💎", subtitle: "Platform exclusive" },
];

interface EnhancedSpacesSystemProps {
  initialView?: 'discovery' | 'my-spaces' | 'ub-templates';
  showTemplates?: boolean;
}

export function EnhancedSpacesSystem({ 
  initialView = 'discovery', 
  showTemplates = true 
}: EnhancedSpacesSystemProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useSession();
  
  // Enhanced state management
  const [activeView, setActiveView] = useState<'discovery' | 'my-spaces' | 'ub-templates'>(initialView);
  const [mySpacesTab, setMySpacesTab] = useState<'joined' | 'favorited' | 'owned' | 'recent'>('joined');
  const [filter, setFilter] = useState<SpaceType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'trending' | 'recent' | 'alphabetical'>('popular');
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Handle URL parameters
  useEffect(() => {
    const view = searchParams.get('view');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    
    if (view === 'templates' && showTemplates) {
      setActiveView('ub-templates');
    } else if (view === 'my-spaces') {
      setActiveView('my-spaces');
    }
    
    if (category && category !== 'all') {
      setFilter(category as SpaceType);
    }
    
    if (sort === 'trending') {
      setSortBy('trending');
    }
  }, [searchParams, showTemplates]);

  // Fetch functions
  const fetchMySpaces = async () => {
    const response = await authenticatedFetch('/api/profile/my-spaces');
    if (!response.ok) throw new Error(`Failed to fetch my spaces: ${response.status}`);
    
    const data = await response.json();
    if (data.success && data.spaces) {
      return {
        joined: data.spaces,
        favorited: [],
        owned: data.spaces.filter((space: any) => space.membership?.role === 'admin' || space.membership?.role === 'owner'),
        recent: data.spaces.slice(0, 3)
      };
    }
    return { joined: [], favorited: [], owned: [], recent: [] };
  };

  const fetchBrowseSpaces = async () => {
    const params = new URLSearchParams();
    if (filter !== 'all') params.set('type', filter);
    if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);

    const response = await authenticatedFetch(`/api/spaces/browse?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch spaces');
    const data = await response.json();
    return data.spaces || [];
  };

  // Queries
  const { data: mySpacesData, isLoading: mySpacesLoading, error: mySpacesError } = useQuery({
    queryKey: ['my-spaces'],
    queryFn: fetchMySpaces,
    enabled: activeView === 'my-spaces' && !!user,
    staleTime: 300000,
  });

  const { data: browseSpaces = [], isLoading: browseLoading, error: browseError } = useQuery({
    queryKey: ['spaces-browse', filter, debouncedSearchTerm],
    queryFn: fetchBrowseSpaces,
    enabled: activeView === 'discovery',
    staleTime: 180000,
  });

  // Enhanced template handling
  const handleTemplateActivation = (templateId: string) => {
    const template = UB_SPACE_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template.name);
      setShowActivationModal(true);
    }
  };

  const handleActivationSubmit = async (data: ActivationRequestData) => {
    // Here we would submit the activation request to the API
    console.log('Activation request submitted:', { templateId: selectedTemplate, ...data });
    setShowActivationModal(false);
    setSelectedTemplate('');
    // Show success toast or notification
  };

  // Enhanced space actions
  const handleJoinSpace = async (spaceId: string) => {
    try {
      const response = await authenticatedFetch('/api/spaces/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join space');
      }

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['spaces-browse'] });
      queryClient.invalidateQueries({ queryKey: ['my-spaces'] });
      
      console.log('Successfully joined space:', spaceId);
    } catch (error) {
      console.error('Error joining space:', error);
    }
  };

  const handleViewSpace = (spaceId: string) => {
    router.push(`/spaces/${spaceId}`);
  };

  // Filter and sort browse spaces
  const filteredBrowseSpaces = useMemo(() => {
    if (!browseSpaces) return [];
    
    const sorted = [...browseSpaces];
    
    switch (sortBy) {
      case 'popular':
        sorted.sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
        break;
      case 'trending':
        sorted.sort((a, b) => {
          const aTrending = (a.memberCount || 0) * Math.random() * 2;
          const bTrending = (b.memberCount || 0) * Math.random() * 2;
          return bTrending - aTrending;
        });
        break;
      case 'recent':
        sorted.sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        });
        break;
      case 'alphabetical':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return sorted;
  }, [browseSpaces, sortBy]);

  const mySpaceTabs = [
    { id: 'joined', label: 'Joined', icon: Users, count: mySpacesData?.joined.length || 0 },
    { id: 'favorited', label: 'Favorited', icon: Heart, count: mySpacesData?.favorited.length || 0 },
    { id: 'owned', label: 'Owned', icon: Crown, count: mySpacesData?.owned.length || 0 },
    { id: 'recent', label: 'Recent', icon: Clock, count: mySpacesData?.recent.length || 0 },
  ];

  const currentMySpaces = mySpacesData?.[mySpacesTab] || [];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Enhanced Header with UB Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[var(--hive-brand-primary)]/10">
              <Building2 className="h-8 w-8 text-[var(--hive-brand-primary)]" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] bg-clip-text text-transparent">
              Campus Spaces
            </h1>
          </div>
          <p className="text-xl text-[var(--hive-text-secondary)] mb-2">
            University at Buffalo Community Platform
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--hive-text-secondary)]">
            <MapPin className="h-4 w-4" />
            <span>North & South Campus</span>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="flex flex-wrap justify-center border-b border-[var(--hive-border-default)] mb-8">
          <button
            onClick={() => setActiveView('discovery')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors",
              activeView === 'discovery'
                ? "border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]"
                : "border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            )}
          >
            <Compass className="h-4 w-4" />
            Discover Spaces
          </button>
          
          <button
            onClick={() => setActiveView('my-spaces')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors",
              activeView === 'my-spaces'
                ? "border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]"
                : "border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            )}
          >
            <Users className="h-4 w-4" />
            My Spaces
            {mySpacesData && (
              <Badge variant="secondary" className="ml-1">
                {mySpacesData.joined.length}
              </Badge>
            )}
          </button>

          {showTemplates && (
            <button
              onClick={() => setActiveView('ub-templates')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                activeView === 'ub-templates'
                  ? "border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]"
                  : "border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
              )}
            >
              <GraduationCap className="h-4 w-4" />
              UB Communities
              <Badge variant="outline" className="ml-1">
                {UB_SPACE_TEMPLATES.length}
              </Badge>
            </button>
          )}
        </div>

        {/* Discovery View */}
        {activeView === 'discovery' && (
          <div className="space-y-8">
            {/* Enhanced Search and Controls */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search UB communities, courses, dorms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-secondary)] focus:border-[var(--hive-brand-primary)] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-1">
                  <ArrowUpDown className="h-4 w-4 text-[var(--hive-text-secondary)] mx-2" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-[var(--hive-text-primary)] text-sm focus:outline-none border-none"
                  >
                    <option value="popular" className="bg-[var(--hive-background-primary)]">Popular</option>
                    <option value="trending" className="bg-[var(--hive-background-primary)]">Trending</option>
                    <option value="recent" className="bg-[var(--hive-background-primary)]">Recent</option>
                    <option value="alphabetical" className="bg-[var(--hive-background-primary)]">A-Z</option>
                  </select>
                </div>

                <div className="flex items-center bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-[var(--hive-brand-primary)] text-white' : 'text-[var(--hive-text-primary)]'}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-[var(--hive-brand-primary)] text-white' : 'text-[var(--hive-text-primary)]'}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Category Filters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {enhancedSpaceTypeFilters.map((filterOption) => (
                <Button
                  key={filterOption.id}
                  variant="ghost"
                  onClick={() => setFilter(filterOption.id as SpaceType | 'all')}
                  className={cn(
                    "h-auto p-4 flex flex-col items-center text-center transition-all",
                    filter === filterOption.id
                      ? "bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)]"
                      : "border border-[var(--hive-border-default)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]"
                  )}
                >
                  <span className="text-2xl mb-2">{filterOption.emoji}</span>
                  <span className="font-medium text-sm">{filterOption.label}</span>
                  <span className="text-xs text-[var(--hive-text-secondary)] mt-1">{filterOption.subtitle}</span>
                </Button>
              ))}
            </div>

            {/* Spaces Results */}
            {browseLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-[var(--hive-background-secondary)] rounded-lg animate-pulse" />
                ))}
              </div>
            )}

            {browseError && (
              <Card className="p-8 text-center border-red-500/20 bg-red-500/5">
                <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Unable to load spaces</h3>
                <p className="text-[var(--hive-text-secondary)]">Please check your connection and try again.</p>
              </Card>
            )}

            {!browseLoading && !browseError && filteredBrowseSpaces.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-[var(--hive-text-secondary)]">
                    {filteredBrowseSpaces.length} space{filteredBrowseSpaces.length !== 1 ? 's' : ''} found
                    {filter !== 'all' && (
                      <span className="ml-2 text-[var(--hive-brand-primary)] text-sm">
                        in {enhancedSpaceTypeFilters.find(f => f.id === filter)?.label || filter}
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    {sortBy === 'trending' && <TrendingUp className="h-4 w-4 text-[var(--hive-brand-primary)]" />}
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Sorted by {sortBy === 'popular' ? 'popularity' : sortBy}
                    </span>
                  </div>
                </div>
                
                <div className={cn(
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                )}>
                  {filteredBrowseSpaces.map((space) => (
                    <div key={space.id} className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">{space.name}</h3>
                          <p className="text-sm text-[var(--hive-text-secondary)] mb-2">{space.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{space.type}</Badge>
                            <span className="text-sm text-[var(--hive-text-secondary)]">
                              {space.memberCount} members
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewSpace(space.id)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleJoinSpace(space.id)}
                        >
                          Join Space
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* My Spaces View */}
        {activeView === 'my-spaces' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mySpacesData?.joined.length || 0}</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Joined</div>
              </Card>

              <Card className="p-4 text-center bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mySpacesData?.favorited.length || 0}</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Favorited</div>
              </Card>

              <Card className="p-4 text-center bg-gradient-to-br from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/20">
                <Crown className="h-8 w-8 mx-auto mb-2 text-[var(--hive-brand-primary)]" />
                <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mySpacesData?.owned.length || 0}</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Owned</div>
              </Card>

              <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                  {(mySpacesData?.joined.length || 0) + (mySpacesData?.owned.length || 0)}
                </div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Total Active</div>
              </Card>
            </div>

            {/* My Spaces Tab Navigation */}
            <div className="flex border-b border-[var(--hive-border-default)]">
              {mySpaceTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setMySpacesTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                      mySpacesTab === tab.id
                        ? "border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]"
                        : "border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                    {tab.count > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {tab.count}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>

            {/* My Spaces Content */}
            {currentMySpaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMySpaces.map((space) => (
                  <div key={space.id} className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">{space.name}</h3>
                        <p className="text-sm text-[var(--hive-text-secondary)] mb-2">{space.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{space.type}</Badge>
                          <span className="text-sm text-[var(--hive-text-secondary)]">
                            {space.memberCount} members
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSpace(space.id)}
                      className="w-full"
                    >
                      Open Space
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Users className="h-16 w-16 text-[var(--hive-text-secondary)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">No spaces found</h3>
                <p className="text-[var(--hive-text-secondary)] mb-6">Get started by browsing and joining communities.</p>
                <Button onClick={() => setActiveView('discovery')}>
                  Browse Spaces
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* UB Templates View */}
        {activeView === 'ub-templates' && showTemplates && (
          <div className="space-y-8">
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                  <GraduationCap className="w-5 h-5" />
                  University at Buffalo Campus Communities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--hive-text-secondary)] mb-6">
                  Pre-seeded campus communities based on UB's academic departments, residence halls, 
                  and student organizations. Request to lead a community or join existing ones.
                </p>
                <UBSpacesDirectory
                  spaces={UB_SPACE_TEMPLATES}
                  onRequestActivation={handleTemplateActivation}
                  onViewDetails={(spaceId) => console.log('View template details:', spaceId)}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Space Activation Modal */}
        {showActivationModal && (
          <SpaceActivationModal
            spaceId={selectedTemplate}
            spaceName={selectedTemplate}
            isOpen={showActivationModal}
            onClose={() => {
              setShowActivationModal(false);
              setSelectedTemplate('');
            }}
            onSubmit={handleActivationSubmit}
          />
        )}
      </div>
    </div>
  );
}