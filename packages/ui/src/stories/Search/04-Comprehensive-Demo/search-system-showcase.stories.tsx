import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Search/04-Comprehensive Demo/SearchSystemShowcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete Search & Discovery System showcase demonstrating all components working together'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Import types and components from previous stories (simplified for demo)
interface Space {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'interest';
  members: number;
  activity: 'high' | 'medium' | 'low';
  tags: string[];
  lastActive: string;
  isJoined: boolean;
  trending?: 'hot' | 'rising' | 'steady';
  matchScore?: number;
  growth?: number;
}

// Demo data
const DEMO_SPACES: Space[] = [
  {
    id: '1',
    name: 'CS 220 Study Group',
    description: 'Weekly study sessions for Data Structures & Algorithms with collaborative problem solving.',
    type: 'academic',
    members: 47,
    activity: 'high',
    tags: ['Computer Science', 'Study Group', 'Algorithms'],
    lastActive: '5 minutes ago',
    isJoined: true,
    trending: 'hot',
    matchScore: 95,
    growth: 23
  },
  {
    id: '2',
    name: 'Richmond Quad Gaming',
    description: 'Gaming community for Richmond residents with tournaments and casual sessions.',
    type: 'residential',
    members: 45,
    activity: 'high',
    tags: ['Gaming', 'Richmond Quad', 'Tournaments'],
    lastActive: '1 hour ago',
    isJoined: false,
    trending: 'rising',
    matchScore: 88,
    growth: 15
  },
  {
    id: '3',
    name: 'Ultimate Frisbee Club',
    description: 'Competitive and recreational ultimate frisbee with weekly practices.',
    type: 'interest',
    members: 89,
    activity: 'high',
    tags: ['Sports', 'Ultimate Frisbee', 'Recreation'],
    lastActive: '2 hours ago',
    isJoined: false,
    trending: 'rising',
    growth: 12
  },
  {
    id: '4',
    name: 'Engineering Career Prep',
    description: 'Technical interview preparation and career guidance for engineering students.',
    type: 'academic',
    members: 203,
    activity: 'high',
    tags: ['Engineering', 'Career Prep', 'Interview Prep'],
    lastActive: '30 minutes ago',
    isJoined: false,
    trending: 'hot',
    matchScore: 92,
    growth: 31
  },
  {
    id: '5',
    name: 'Photography Enthusiasts',
    description: 'Campus photography group for sharing tips and organizing photo walks.',
    type: 'interest',
    members: 34,
    activity: 'medium',
    tags: ['Photography', 'Art', 'Creative'],
    lastActive: '4 hours ago',
    isJoined: false,
    matchScore: 76
  },
  {
    id: '6',
    name: 'Machine Learning Research',
    description: 'Undergraduate research group working on ML projects and paper discussions.',
    type: 'academic',
    members: 67,
    activity: 'high',
    tags: ['Machine Learning', 'Research', 'AI'],
    lastActive: '15 minutes ago',
    isJoined: false,
    trending: 'hot',
    matchScore: 84,
    growth: 28
  }
];

// Tab Navigation Component
const TabNavigation: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { id: string; label: string; icon: string; count?: number }[];
}> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-2">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors flex-1
              ${activeTab === tab.id
                ? 'bg-hive-brand-primary text-white'
                : 'text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-primary'
              }
            `}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-hive-background-primary text-hive-text-secondary'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Search Header Component
const SearchHeader: React.FC<{
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  onCommandPalette: () => void;
}> = ({ query, onQueryChange, onSearch, onCommandPalette }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl">🔍</span>
          <h1 className="text-3xl font-bold text-hive-text-primary">Search & Discovery</h1>
        </div>
        <p className="text-hive-text-secondary">
          Find spaces, discover communities, and connect with your campus
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center bg-white rounded-2xl border-2 border-hive-border-default focus-within:border-hive-brand-primary transition-colors">
            <div className="pl-6 pr-4 py-4">
              <svg className="w-5 h-5 text-hive-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search spaces, communities, and interests..."
              className="flex-1 py-4 pr-6 text-hive-text-primary placeholder-hive-text-secondary bg-transparent border-none outline-none text-lg"
            />
            
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                className="mr-6 p-1 rounded-full hover:bg-hive-background-primary transition-colors"
              >
                <svg className="w-4 h-4 text-hive-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center justify-center gap-4 text-sm text-hive-text-secondary">
          <span>Quick access:</span>
          <button
            onClick={onCommandPalette}
            className="flex items-center gap-1 px-3 py-1 bg-white border border-hive-border-default rounded-lg hover:border-hive-brand-primary transition-colors"
          >
            <kbd className="px-1 bg-hive-background-primary rounded text-xs">⌘K</kbd>
            <span>Command Palette</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Space Card Component
const SpaceCard: React.FC<{ 
  space: Space; 
  variant?: 'default' | 'trending' | 'recommended';
  onJoin: (spaceId: string) => void;
  onView: (spaceId: string) => void;
}> = ({ space, variant = 'default', onJoin, onView }) => {
  const TrendingBadge = () => {
    if (!space.trending) return null;
    
    const config = {
      hot: { icon: '🔥', label: 'Hot', color: 'bg-gradient-to-r from-red-500 to-orange-500' },
      rising: { icon: '📈', label: 'Rising', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
      steady: { icon: '📊', label: 'Steady', color: 'bg-gradient-to-r from-blue-500 to-indigo-500' }
    };

    const { icon, label, color } = config[space.trending];

    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white font-medium ${color}`}>
        <span>{icon}</span>
        <span>{label}</span>
      </div>
    );
  };

  const MatchScore = () => {
    if (!space.matchScore) return null;
    
    return (
      <div className="flex items-center gap-2">
        <div className="relative w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
            style={{ width: `${space.matchScore}%` }}
          />
        </div>
        <span className="text-xs font-medium text-hive-text-primary">{space.matchScore}%</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default hover:border-hive-brand-primary transition-all duration-200 p-6 group cursor-pointer" onClick={() => onView(space.id)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-hive-text-primary text-lg group-hover:text-hive-brand-primary transition-colors">
              {space.name}
            </h3>
            {variant === 'trending' && <TrendingBadge />}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-hive-text-secondary capitalize">{space.type}</span>
            <span className="text-hive-text-secondary">•</span>
            <span className="text-sm text-hive-text-secondary">{space.members} members</span>
            <span className="text-hive-text-secondary">•</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                space.activity === 'high' ? 'bg-hive-status-success' :
                space.activity === 'medium' ? 'bg-hive-status-warning' :
                'bg-hive-status-error'
              }`} />
              <span className="text-sm text-hive-text-secondary">{space.activity} activity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Match Score for recommended variant */}
      {variant === 'recommended' && (
        <div className="mb-4">
          <MatchScore />
        </div>
      )}

      {/* Growth indicator for trending variant */}
      {variant === 'trending' && space.growth && (
        <div className="flex items-center gap-1 mb-4 text-hive-status-success">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">+{space.growth}% growth this week</span>
        </div>
      )}

      {/* Description */}
      <p className="text-hive-text-secondary text-sm mb-4 line-clamp-2">
        {space.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {space.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
            {tag}
          </span>
        ))}
        {space.tags.length > 3 && (
          <span className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
            +{space.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-hive-border-default">
        <span className="text-xs text-hive-text-secondary">Active {space.lastActive}</span>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onJoin(space.id);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            space.isJoined
              ? 'bg-hive-status-success text-white'
              : 'bg-hive-brand-primary text-white hover:bg-hive-brand-primary/80'
          }`}
          disabled={space.isJoined}
        >
          {space.isJoined ? 'Joined' : 'Join Space'}
        </button>
      </div>
    </div>
  );
};

// Main Search System Showcase Component
const SearchSystemShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedSpaces, setJoinedSpaces] = useState<Set<string>>(new Set(['1']));

  const tabs = [
    { id: 'search', label: 'Search', icon: '🔍', count: 6 },
    { id: 'trending', label: 'Trending', icon: '🔥', count: 4 },
    { id: 'recommended', label: 'For You', icon: '🎯', count: 5 },
    { id: 'browse', label: 'Browse', icon: '📋' }
  ];

  const handleJoinSpace = (spaceId: string) => {
    setJoinedSpaces(prev => new Set([...prev, spaceId]));
  };

  const handleViewSpace = (spaceId: string) => {
    console.log('Viewing space:', spaceId);
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    setActiveTab('search');
  };

  const handleCommandPalette = () => {
    console.log('Opening command palette...');
  };

  // Filter spaces based on active tab
  const getFilteredSpaces = () => {
    const spacesWithJoinStatus = DEMO_SPACES.map(space => ({
      ...space,
      isJoined: joinedSpaces.has(space.id)
    }));

    switch (activeTab) {
      case 'trending':
        return spacesWithJoinStatus.filter(space => space.trending).slice(0, 4);
      case 'recommended':
        return spacesWithJoinStatus.filter(space => space.matchScore).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 5);
      case 'browse':
        return spacesWithJoinStatus.slice(0, 3);
      default:
        return searchQuery 
          ? spacesWithJoinStatus.filter(space => 
              space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            )
          : spacesWithJoinStatus;
    }
  };

  const filteredSpaces = getFilteredSpaces();

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search Header */}
        <SearchHeader
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onSearch={handleSearch}
          onCommandPalette={handleCommandPalette}
        />

        {/* Tab Navigation */}
        <div className="max-w-2xl mx-auto">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs}
          />
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Section Header */}
          <div className="text-center space-y-2">
            {activeTab === 'search' && (
              <>
                <h2 className="text-2xl font-bold text-hive-text-primary">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'All Spaces'}
                </h2>
                <p className="text-hive-text-secondary">
                  {searchQuery ? `Found ${filteredSpaces.length} spaces matching your search` : 'Discover all available spaces on campus'}
                </p>
              </>
            )}
            {activeTab === 'trending' && (
              <>
                <h2 className="text-2xl font-bold text-hive-text-primary">🔥 Trending Spaces</h2>
                <p className="text-hive-text-secondary">Most active and fastest-growing communities this week</p>
              </>
            )}
            {activeTab === 'recommended' && (
              <>
                <h2 className="text-2xl font-bold text-hive-text-primary">🎯 Recommended for You</h2>
                <p className="text-hive-text-secondary">Personalized space recommendations based on your profile</p>
              </>
            )}
            {activeTab === 'browse' && (
              <>
                <h2 className="text-2xl font-bold text-hive-text-primary">📋 Browse Categories</h2>
                <p className="text-hive-text-secondary">Explore spaces organized by academic, residential, and interest categories</p>
              </>
            )}
          </div>

          {/* Results Grid */}
          {filteredSpaces.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-hive-text-primary mb-2">No spaces found</h3>
              <p className="text-hive-text-secondary">Try adjusting your search terms or browse our categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  variant={activeTab === 'trending' ? 'trending' : activeTab === 'recommended' ? 'recommended' : 'default'}
                  onJoin={handleJoinSpace}
                  onView={handleViewSpace}
                />
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h3 className="text-xl font-bold text-hive-text-primary mb-6 text-center">Campus Community Stats</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-hive-brand-primary mb-2">847</div>
              <div className="text-sm text-hive-text-secondary">Total Spaces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hive-brand-primary mb-2">12.4k</div>
              <div className="text-sm text-hive-text-secondary">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hive-brand-primary mb-2">156</div>
              <div className="text-sm text-hive-text-secondary">New This Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hive-brand-primary mb-2">89%</div>
              <div className="text-sm text-hive-text-secondary">Match Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompleteSearchSystem: Story = {
  name: '🎯 Complete Search System',
  render: () => <SearchSystemShowcase />
};