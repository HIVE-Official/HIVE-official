"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Grid as _Grid } from "@hive/ui";
import { Search, Users, ArrowRight, Plus, TrendingUp, Activity, Globe, Filter, Eye as _Eye, MapPin as _MapPin, Target, Zap, Heart } from "lucide-react";
import { type Space as _Space } from "@hive/core";
// Temporarily disabled to fix React context issue
// import { useFeatureFlags } from "@hive/hooks";

// Campus Visualization Component
const CampusVisualization = ({ totalSpaces, categoryBreakdown }: { totalSpaces?: number, categoryBreakdown?: Record<string, number> }) => (
  <div className="relative w-full h-64 bg-gradient-to-br from-[#0A0A0A]/50 to-[#1A1A1A]/50 border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden group">
    {/* Interactive Campus Map Background */}
    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Campus Buildings */}
        <rect x="50" y="80" width="30" height="40" className="fill-[#FFD700]/40 group-hover:fill-[#FFD700]/60 transition-colors duration-500" rx="2" />
        <rect x="100" y="60" width="40" height="60" className="fill-[#FFD700]/30 group-hover:fill-[#FFD700]/50 transition-colors duration-700" rx="2" />
        <rect x="200" y="90" width="35" height="35" className="fill-[#FFD700]/35 group-hover:fill-[#FFD700]/55 transition-colors duration-600" rx="2" />
        <rect x="300" y="70" width="45" height="50" className="fill-[#FFD700]/40 group-hover:fill-[#FFD700]/60 transition-colors duration-800" rx="2" />
        
        {/* Space Density Dots */}
        {[...Array(12)].map((_, i) => (
          <circle 
            key={i} 
            cx={60 + (i * 25)} 
            cy={140 + (Math.sin(i) * 10)} 
            r="2" 
            className="fill-white/40 group-hover:fill-[#FFD700]/80 transition-all duration-1000" 
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
        
        {/* Connection Lines */}
        <path d="M80,120 Q150,100 220,110 T340,100" className="stroke-[#FFD700]/20 stroke-2 fill-none group-hover:stroke-[#FFD700]/40 transition-all duration-1000" />
      </svg>
    </div>
    
    {/* Live Statistics Overlay */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-4xl font-bold text-white group-hover:text-[#FFD700] transition-colors duration-500">
          {totalSpaces || '360'}
        </div>
        <div className="text-sm text-neutral-400 group-hover:text-white/80 transition-colors">
          Active Communities
        </div>
        <div className="flex gap-4 text-xs text-neutral-400 group-hover:text-white/70 transition-colors">
          <span>🎓 {categoryBreakdown?.university_organizations || '180'}</span>
          <span>👥 {categoryBreakdown?.student_organizations || '120'}</span>
          <span>🏛️ {categoryBreakdown?.greek_life || '23'}</span>
          <span>🏠 {categoryBreakdown?.campus_living || '37'}</span>
        </div>
      </div>
    </div>
    
    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  </div>
);

// Enhanced Search Bar Component
const EnhancedSearchBar = ({ onSearch, placeholder = "Search spaces, organizations, communities..." }: { onSearch?: (query: string) => void, placeholder?: string }) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-16 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-neutral-400 focus:border-yellow-400/50 focus:bg-white/8 transition-all duration-300 focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && onSearch?.(query)}
        />
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-[#FFD700]/20"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 text-neutral-400 hover:text-yellow-400 transition-colors" />
        </Button>
      </div>
      
      {/* Quick Filter Tags */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[rgba(0,0,0,0.8)] border border-[rgba(255,255,255,0.1)] rounded-xl backdrop-blur-lg z-10">
          <div className="flex flex-wrap gap-2">
            {['Student Orgs', 'Greek Life', 'Academic', 'Sports', 'Arts', 'Tech'].map((tag) => (
              <Button key={tag} size="sm" variant="outline" className="border-white/20 text-neutral-400 hover:text-yellow-400 hover:border-yellow-400/30">
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Custom SVG Pattern Components
const NetworkPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <circle cx="8" cy="8" r="1.5" className="fill-white/60 group-hover:fill-[#FFD700] transition-colors duration-300" />
    <circle cx="24" cy="10" r="1.5" className="fill-white/80 group-hover:fill-[#FFD700] transition-colors duration-300 delay-75" />
    <circle cx="16" cy="20" r="1.5" className="fill-white/60 group-hover:fill-[#FFD700] transition-colors duration-300 delay-150" />
    <circle cx="20" cy="6" r="1" className="fill-white/40 group-hover:fill-[#FFD700]/80 transition-colors duration-300 delay-100" />
    <line x1="8" y1="8" x2="20" y2="6" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[#FFD700]/60 transition-all duration-300" />
    <line x1="20" y1="6" x2="24" y2="10" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[#FFD700]/60 transition-all duration-300 delay-75" />
    <line x1="24" y1="10" x2="16" y2="20" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[#FFD700]/60 transition-all duration-300 delay-150" />
    <line x1="8" y1="8" x2="16" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[#FFD700]/40 transition-all duration-300 delay-100" />
  </svg>
);

const HierarchyPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <rect x="14" y="4" width="4" height="3" rx="1" className="fill-white/80 group-hover:fill-[#FFD700] transition-colors duration-300" />
    <rect x="8" y="12" width="4" height="3" rx="1" className="fill-white/60 group-hover:fill-[#FFD700] transition-colors duration-300 delay-75" />
    <rect x="20" y="12" width="4" height="3" rx="1" className="fill-white/60 group-hover:fill-[#FFD700] transition-colors duration-300 delay-75" />
    <rect x="4" y="20" width="4" height="3" rx="1" className="fill-white/40 group-hover:fill-[#FFD700]/80 transition-colors duration-300 delay-150" />
    <rect x="12" y="20" width="4" height="3" rx="1" className="fill-white/40 group-hover:fill-[#FFD700]/80 transition-colors duration-300 delay-150" />
    <rect x="24" y="20" width="4" height="3" rx="1" className="fill-white/40 group-hover:fill-[#FFD700]/80 transition-colors duration-300 delay-150" />
    <line x1="16" y1="7" x2="10" y2="12" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[#FFD700]/60 transition-all duration-300" />
    <line x1="16" y1="7" x2="22" y2="12" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[#FFD700]/60 transition-all duration-300" />
    <line x1="10" y1="15" x2="6" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[#FFD700]/40 transition-all duration-300 delay-75" />
    <line x1="10" y1="15" x2="14" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[#FFD700]/40 transition-all duration-300 delay-75" />
    <line x1="22" y1="15" x2="26" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[#FFD700]/40 transition-all duration-300 delay-75" />
  </svg>
);

const ClusterPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="2" className="fill-white/80 group-hover:fill-[#FFD700] transition-colors duration-300" />
    <circle cx="16" cy="8" r="1.5" className="fill-white/60 group-hover:fill-[#FFD700]/80 transition-colors duration-300 delay-75" />
    <circle cx="24" cy="16" r="1.5" className="fill-white/60 group-hover:fill-[#FFD700]/80 transition-colors duration-300 delay-75" />
    <circle cx="16" cy="24" r="1.5" className="fill-white/60 group-hover:fill-[#FFD700]/80 transition-colors duration-300 delay-75" />
    <circle cx="8" cy="16" r="1.5" className="fill-white/60 group-hover:fill-[#FFD700]/80 transition-colors duration-300 delay-75" />
    <circle cx="22" cy="10" r="1" className="fill-white/40 group-hover:fill-[#FFD700]/60 transition-colors duration-300 delay-150" />
    <circle cx="10" cy="10" r="1" className="fill-white/40 group-hover:fill-[#FFD700]/60 transition-colors duration-300 delay-150" />
    <circle cx="22" cy="22" r="1" className="fill-white/40 group-hover:fill-[#FFD700]/60 transition-colors duration-300 delay-150" />
    <circle cx="10" cy="22" r="1" className="fill-white/40 group-hover:fill-[#FFD700]/60 transition-colors duration-300 delay-150" />
    <circle cx="16" cy="16" r="8" className="stroke-white/10 stroke-[0.5] fill-none group-hover:stroke-[#FFD700]/30 transition-all duration-300" />
  </svg>
);

const GridPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <rect x="6" y="6" width="6" height="6" rx="1" className="fill-white/20 stroke-white/30 stroke-[0.5] group-hover:fill-[#FFD700]/20 group-hover:stroke-[#FFD700]/60 transition-all duration-300" />
    <rect x="20" y="6" width="6" height="6" rx="1" className="fill-white/20 stroke-white/30 stroke-[0.5] group-hover:fill-[#FFD700]/20 group-hover:stroke-[#FFD700]/60 transition-all duration-300 delay-75" />
    <rect x="6" y="20" width="6" height="6" rx="1" className="fill-white/20 stroke-white/30 stroke-[0.5] group-hover:fill-[#FFD700]/20 group-hover:stroke-[#FFD700]/60 transition-all duration-300 delay-75" />
    <rect x="20" y="20" width="6" height="6" rx="1" className="fill-white/20 stroke-white/30 stroke-[0.5] group-hover:fill-[#FFD700]/20 group-hover:stroke-[#FFD700]/60 transition-all duration-300 delay-150" />
    <line x1="12" y1="9" x2="20" y2="9" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[#FFD700]/40 transition-all duration-300" />
    <line x1="9" y1="12" x2="9" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[#FFD700]/40 transition-all duration-300 delay-50" />
    <line x1="23" y1="12" x2="23" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[#FFD700]/40 transition-all duration-300 delay-100" />
    <line x1="12" y1="23" x2="20" y2="23" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[#FFD700]/40 transition-all duration-300 delay-150" />
    <circle cx="16" cy="16" r="1" className="fill-white/40 group-hover:fill-[#FFD700] transition-colors duration-300 delay-200" />
  </svg>
);

// Space categories with Firebase mapping - HIVE brand aligned
const SPACE_CATEGORIES = {
  student: {
    id: 'student_organizations',
    title: 'Student Spaces',
    subtitle: 'Student-led communities & clubs',
    icon: NetworkPattern,
    count: 120
  },
  university: {
    id: 'university_organizations',
    title: 'University Spaces',
    subtitle: 'Academic programs & official groups',
    icon: HierarchyPattern,
    count: 180
  },
  greek: {
    id: 'greek_life',
    title: 'Greek Life',
    subtitle: 'Fraternities & sororities',
    icon: ClusterPattern,
    count: 23
  },
  residential: {
    id: 'campus_living',
    title: 'Residential Life', 
    subtitle: 'Dorms & living communities',
    icon: GridPattern,
    count: 37
  }
} as const;

// Enhanced overview fetch with A/B testing support
async function fetchSpacesOverview(): Promise<{
  totalSpaces: number;
  categoryBreakdown: Record<string, number>;
  mySpaces?: any[];
  recentActivity?: any[];
}> {
  const headers: HeadersInit = {};
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
    } else {
      headers.Authorization = `Bearer test-token`;
    }
  } catch (error) {
    console.warn('Could not get auth token, using test token');
    headers.Authorization = `Bearer test-token`;
  }

  const response = await fetch('/api/spaces/overview', { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch spaces overview: ${response.status}`);
  }
  
  const data = await response.json();
  return {
    totalSpaces: data.totalSpaces,
    categoryBreakdown: data.categoryBreakdown,
    mySpaces: data.mySpaces || [],
    recentActivity: data.recentActivity || []
  };
}

// Unified Spaces Hub per @hive.md: Discovery, Your Spaces, Categories
export default function SpacesDiscoveryPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'your' | 'categories'>('discover');
  const [isClient, setIsClient] = useState(false);
  // Temporarily using default flags while fixing React context issue
  const flags = {
    spaceDiscovery: 'grid' as const,
    trackEvent: (feature: string, action: string, metadata?: any) => {
      console.log('Feature flag event:', { feature, action, metadata });
    }
  };
  
  // A/B test variant for personalization layer
  const showPersonalizationLayer = flags.spaceDiscovery === 'feed' || flags.spaceDiscovery === 'recommendations';
  
  useEffect(() => {
    setIsClient(true);
    // Track page view with variant
    flags.trackEvent('spaceDiscovery', 'view', { page: 'spaces-overview' });
  }, [flags]);

  const { data: overview, isLoading, error } = useQuery({
    queryKey: ["spaces-overview"],
    queryFn: fetchSpacesOverview,
    staleTime: 300000, // 5 minutes - less frequent updates for discovery page
    enabled: isClient
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A] relative overflow-hidden">
      {/* Header Section */}
      <div className="relative pb-8">
        {/* Background Ambient Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFD700]/3 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 pt-8 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFE255] rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#0A0A0A]" />
                  </div>
                  <h1 className="text-3xl font-bold text-white">Spaces</h1>
                </div>
                <p className="text-neutral-400">
                  Communities & groups - discover and join campus communities
                </p>
              </div>
              
              {/* Enhanced Search Bar */}
              <div className="w-96">
                <EnhancedSearchBar 
                  placeholder="Search spaces..."
                  onSearch={(query) => {
                    flags.trackEvent('spaceDiscovery', 'interact', { action: 'search', query });
                    setActiveTab('discover');
                  }}
                />
              </div>
            </div>
            
            {/* Three-Section Navigation per @hive.md */}
            <div className="flex items-center bg-[rgba(255,255,255,0.05)] rounded-lg p-1 mb-8">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-6 py-3 text-sm rounded-md transition-colors flex items-center gap-2 ${
                  activeTab === 'discover'
                    ? 'bg-[#FFD700] text-[#0A0A0A] font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Globe className="h-4 w-4" />
                Discover
              </button>
              <button
                onClick={() => setActiveTab('your')}
                className={`px-6 py-3 text-sm rounded-md transition-colors flex items-center gap-2 ${
                  activeTab === 'your'
                    ? 'bg-[#FFD700] text-[#0A0A0A] font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Heart className="h-4 w-4" />
                Your Spaces
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-6 py-3 text-sm rounded-md transition-colors flex items-center gap-2 ${
                  activeTab === 'categories'
                    ? 'bg-[#FFD700] text-[#0A0A0A] font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Filter className="h-4 w-4" />
                Categories
              </button>
            </div>
            
            {/* Campus Visualization - Only show on Discover tab */}
            {activeTab === 'discover' && (
              <div className="mb-8">
                <CampusVisualization 
                  totalSpaces={overview?.totalSpaces} 
                  categoryBreakdown={overview?.categoryBreakdown}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Error State */}
        {error && (
          <Card className="p-8 text-center border-red-500/20 bg-red-500/5 mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">Unable to Load Spaces</h3>
            <p className="text-neutral-400 mb-4">Please try again or browse manually.</p>
            <Button 
              onClick={() => window.location.href = "/spaces/browse"}
              className="bg-[#FFD700] text-[#0A0A0A]"
            >
              Browse Spaces
            </Button>
          </Card>
        )}

        {/* Tab Content */}
        {activeTab === 'discover' && !error && (
          <>
            {/* AI Recommendations */}
            <Card className="p-8 mb-8 bg-gradient-to-br from-[#FFD700]/5 to-[#FFD700]/10 border-[#FFD700]/20 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Target className="h-6 w-6 text-[#FFD700]" />
                    <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
                  </div>
                  <p className="text-neutral-400 max-w-2xl mx-auto">
                    Spaces recommended based on your interests and activity
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['AI/ML Research Group', 'Campus Sustainability', 'Student Government'].map((name, i) => (
                    <Card key={i} className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.04)] transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center text-white font-semibold">
                          {name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{name}</h3>
                          <p className="text-xs text-[#A1A1AA]">Recommended for you</p>
                        </div>
                        <Plus className="h-4 w-4 text-[#FFD700] group-hover:scale-110 transition-transform" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>

            {/* Campus Ecosystem */}
            <div className="mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-3">Browse by Category</h2>
                <p className="text-[#A1A1AA] max-w-2xl mx-auto">
                  Discover communities across student organizations, academic programs, Greek life, and residential communities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.values(SPACE_CATEGORIES).map((category) => {
                  const IconComponent = category.icon;
                  const categoryCount = overview?.categoryBreakdown?.[category.id];
                  
                  return (
                    <Card 
                      key={category.id}
                      className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-all cursor-pointer group relative overflow-hidden"
                      onClick={() => {
                        flags.trackEvent('spaceDiscovery', 'interact', { action: 'category_browse', category: category.id });
                        setActiveTab('categories');
                      }}
                    >
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl flex items-center justify-center group-hover:bg-[#FFD700]/20 group-hover:border-[#FFD700]/30 transition-all">
                            <IconComponent className="h-7 w-7" />
                          </div>
                          <ArrowRight className="h-5 w-5 text-[#A1A1AA] group-hover:translate-x-1 group-hover:text-[#FFD700] transition-all" />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors">{category.title}</h3>
                        <p className="text-sm text-[#A1A1AA] mb-4 group-hover:text-white/80 transition-colors">{category.subtitle}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-[#A1A1AA] group-hover:text-white/90 transition-colors">
                            <Users className="h-4 w-4 mr-2" />
                            {categoryCount !== undefined ? `${categoryCount} spaces` : 'Loading...'}
                          </div>
                          <TrendingUp className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#FFD700] transition-colors" />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === 'your' && (
          <div className="mb-8">
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-[#FFD700] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Your Spaces</h2>
              <p className="text-[#A1A1AA] mb-6 max-w-md mx-auto">
                Active communities you've joined and spaces you're a member of
              </p>
              <Button 
                className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
                onClick={() => setActiveTab('discover')}
              >
                Discover New Spaces
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">Browse by Type</h2>
              <p className="text-[#A1A1AA] max-w-2xl mx-auto">
                Explore spaces organized by their type and purpose on campus
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.values(SPACE_CATEGORIES).map((category) => {
                const IconComponent = category.icon;
                const categoryCount = overview?.categoryBreakdown?.[category.id];
                
                return (
                  <Card key={category.id} className="p-8 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl flex items-center justify-center">
                        <IconComponent className="h-10 w-10" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{category.title}</h3>
                        <p className="text-neutral-400">{category.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-neutral-400">
                        <Users className="h-4 w-4 mr-2" />
                        {categoryCount !== undefined ? `${categoryCount} spaces` : 'Loading...'}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
                      >
                        Browse All
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* New Space Experience Preview */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border-[#FFD700]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#FFD700]/10 -translate-x-full animate-pulse" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFE255] rounded-2xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-[#0A0A0A]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Rich Space Experience</h3>
              </div>
              <p className="text-[#A1A1AA] max-w-2xl mx-auto mb-6">
                Each space now features an interactive widget dashboard with post boards, events, member activity, and tools - all accessible through expandable modals.
              </p>
            </div>
            
            {/* Widget Preview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: MessageSquare, title: 'Post Board', desc: 'Threaded discussions' },
                { icon: Calendar, title: 'Events', desc: 'Calendar & RSVP' },
                { icon: Users, title: 'Members', desc: 'Community roster' },
                { icon: Target, title: 'Tools', desc: 'Student utilities' }
              ].map((widget, i) => {
                const Icon = widget.icon;
                return (
                  <div key={i} className="p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-center group hover:bg-[rgba(255,255,255,0.08)] transition-all">
                    <Icon className="h-6 w-6 text-[#FFD700] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-semibold text-white mb-1">{widget.title}</h4>
                    <p className="text-xs text-[#A1A1AA]">{widget.desc}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255] font-medium"
                onClick={() => {
                  flags.trackEvent('spaceDiscovery', 'interact', { action: 'cta_browse' });
                  window.location.href = '/spaces/browse';
                }}
              >
                <Search className="h-4 w-4 mr-2" />
                Explore All Spaces
              </Button>
              <Button 
                variant="outline" 
                className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
                onClick={() => {
                  flags.trackEvent('spaceDiscovery', 'interact', { action: 'cta_my_spaces' });
                  window.location.href = '/spaces/my';
                }}
              >
                <Heart className="h-4 w-4 mr-2" />
                My Spaces
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Quick Actions */}
        <Card className="p-6 text-center bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button 
              variant="outline"
              className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)] h-12"
              onClick={() => {
                flags.trackEvent('spaceDiscovery', 'interact', { action: 'browse_trending' });
                window.location.href = '/spaces/browse?sort=trending';
              }}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending Spaces
            </Button>
            <Button 
              variant="outline"
              className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)] h-12"
              onClick={() => {
                flags.trackEvent('spaceDiscovery', 'interact', { action: 'browse_new' });
                window.location.href = '/spaces/browse?sort=newest';
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Newest Spaces
            </Button>
            <Button 
              variant="outline"
              className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)] h-12"
              onClick={() => {
                flags.trackEvent('spaceDiscovery', 'interact', { action: 'browse_active' });
                window.location.href = '/spaces/browse?filter=active';
              }}
            >
              <Activity className="h-4 w-4 mr-2" />
              Most Active
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}