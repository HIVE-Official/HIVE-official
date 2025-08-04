import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Search/01-Search Interface/SearchResults',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Search results display with grid and list views, showing space information and member activity'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface Space {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'interest';
  members: number;
  activity: 'high' | 'medium' | 'low';
  privacy: 'public' | 'private' | 'invite-only';
  tags: string[];
  image?: string;
  lastActive: string;
  memberPhotos: string[];
  isJoined: boolean;
  coordinates?: {
    building?: string;
    room?: string;
  };
}

type ViewMode = 'grid' | 'list';
type LoadingState = 'idle' | 'loading' | 'error' | 'empty';

// Demo data
const DEMO_SPACES: Space[] = [
  {
    id: '1',
    name: 'CS 220 Study Group',
    description: 'Weekly study sessions for Data Structures & Algorithms. We meet every Tuesday and Thursday to work through problem sets and prepare for exams.',
    type: 'academic',
    members: 47,
    activity: 'high',
    privacy: 'public',
    tags: ['Computer Science', 'Study Group', 'Algorithms'],
    lastActive: '2 minutes ago',
    memberPhotos: ['👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓'],
    isJoined: true,
    coordinates: { building: 'Davis Hall', room: '101' }
  },
  {
    id: '2',
    name: 'Richmond Quad Floor 3',
    description: 'Floor community for Richmond Quad third floor residents. Coordinate laundry, study sessions, floor events, and build friendships.',
    type: 'residential',
    members: 23,
    activity: 'medium',
    privacy: 'private',
    tags: ['Richmond Quad', 'Floor Community', 'Dorm Life'],
    lastActive: '15 minutes ago',
    memberPhotos: ['👨‍🎓', '👩‍🎓', '👨‍💼'],
    isJoined: false,
    coordinates: { building: 'Richmond Quad', room: 'Floor 3' }
  },
  {
    id: '3',
    name: 'Ultimate Frisbee Club',
    description: 'Competitive and recreational ultimate frisbee. Practice twice a week, tournaments on weekends. All skill levels welcome!',
    type: 'interest',
    members: 89,
    activity: 'high',
    privacy: 'public',
    tags: ['Sports', 'Ultimate Frisbee', 'Recreation'],
    lastActive: '1 hour ago',
    memberPhotos: ['🏃‍♂️', '🏃‍♀️', '👨‍🎓', '👩‍🎓', '👨‍💼'],
    isJoined: false
  },
  {
    id: '4',
    name: 'Data Structures & Algorithms',
    description: 'CS students working together on advanced algorithms, preparing for technical interviews, and building competitive programming skills.',
    type: 'academic',
    members: 156,
    activity: 'high',
    privacy: 'public',
    tags: ['Computer Science', 'Algorithms', 'Interview Prep'],
    lastActive: '30 minutes ago',
    memberPhotos: ['👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓', '👨‍💼', '👩‍💼'],
    isJoined: true
  },
  {
    id: '5',
    name: 'Photography Enthusiasts',
    description: 'Campus photography group for sharing tips, organizing photo walks, and showcasing our work. All equipment levels welcome.',
    type: 'interest',
    members: 34,
    activity: 'low',
    privacy: 'public',
    tags: ['Photography', 'Art', 'Creative'],
    lastActive: '2 days ago',
    memberPhotos: ['📸', '👨‍🎨', '👩‍🎨'],
    isJoined: false
  },
  {
    id: '6',
    name: 'Ellicott Complex Gaming',
    description: 'Gaming community for Ellicott residents. Weekly tournaments, LAN parties, and casual gaming sessions. Console and PC players welcome.',
    type: 'residential',
    members: 67,
    activity: 'medium',
    privacy: 'invite-only',
    tags: ['Gaming', 'Ellicott', 'Tournaments'],
    lastActive: '3 hours ago',
    memberPhotos: ['🎮', '👨‍💻', '👩‍💻', '👨‍🎓'],
    isJoined: false,
    coordinates: { building: 'Ellicott Complex', room: 'Gaming Lounge' }
  }
];

// Activity indicator component
const ActivityIndicator: React.FC<{ activity: Space['activity'] }> = ({ activity }) => {
  const config = {
    high: { color: 'bg-hive-status-success', label: 'High Activity' },
    medium: { color: 'bg-hive-status-warning', label: 'Medium Activity' },
    low: { color: 'bg-hive-status-error', label: 'Low Activity' }
  };

  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full ${config[activity].color}`} />
      <span className="text-xs text-hive-text-secondary">{config[activity].label}</span>
    </div>
  );
};

// Privacy badge component
const PrivacyBadge: React.FC<{ privacy: Space['privacy'] }> = ({ privacy }) => {
  const config = {
    public: { icon: '🌐', label: 'Public', color: 'bg-hive-status-success' },
    private: { icon: '🔒', label: 'Private', color: 'bg-hive-status-warning' },
    'invite-only': { icon: '📧', label: 'Invite Only', color: 'bg-hive-status-error' }
  };

  const { icon, label, color } = config[privacy];

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${color}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

// Space Card Component (Grid View)
const SpaceCard: React.FC<{ 
  space: Space; 
  onJoin: (spaceId: string) => void;
  onView: (spaceId: string) => void;
}> = ({ space, onJoin, onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default hover:border-hive-brand-primary transition-colors p-6 group cursor-pointer" onClick={() => onView(space.id)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-hive-text-primary text-lg mb-1 group-hover:text-hive-brand-primary transition-colors">
            {space.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-hive-text-secondary capitalize">{space.type}</span>
            <span className="text-hive-text-secondary">•</span>
            <span className="text-sm text-hive-text-secondary">{space.members} members</span>
          </div>
        </div>
        <PrivacyBadge privacy={space.privacy} />
      </div>

      {/* Description */}
      <p className="text-hive-text-secondary text-sm mb-4 line-clamp-2">
        {space.description}
      </p>

      {/* Location (if available) */}
      {space.coordinates && (
        <div className="flex items-center gap-2 mb-4 text-sm text-hive-text-secondary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{space.coordinates.building} {space.coordinates.room}</span>
        </div>
      )}

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ActivityIndicator activity={space.activity} />
          <span className="text-xs text-hive-text-secondary">Active {space.lastActive}</span>
        </div>
        
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
          {space.isJoined ? 'Joined' : 'Join'}
        </button>
      </div>

      {/* Member photos */}
      <div className="flex items-center gap-1 mt-4 pt-4 border-t border-hive-border-default">
        <div className="flex -space-x-1">
          {space.memberPhotos.slice(0, 4).map((photo, index) => (
            <div key={index} className="w-6 h-6 bg-hive-background-primary border-2 border-white rounded-full flex items-center justify-center text-xs">
              {photo}
            </div>
          ))}
          {space.memberPhotos.length > 4 && (
            <div className="w-6 h-6 bg-hive-text-secondary border-2 border-white rounded-full flex items-center justify-center text-xs text-white">
              +{space.memberPhotos.length - 4}
            </div>
          )}
        </div>
        <span className="text-xs text-hive-text-secondary ml-2">Recent members</span>
      </div>
    </div>
  );
};

// Space List Item Component (List View)
const SpaceListItem: React.FC<{ 
  space: Space; 
  onJoin: (spaceId: string) => void;
  onView: (spaceId: string) => void;
}> = ({ space, onJoin, onView }) => {
  return (
    <div className="bg-white rounded-xl border border-hive-border-default hover:border-hive-brand-primary transition-colors p-6 group cursor-pointer" onClick={() => onView(space.id)}>
      <div className="flex items-center gap-6">
        {/* Space Icon/Type */}
        <div className="w-12 h-12 bg-hive-background-primary rounded-xl flex items-center justify-center text-xl">
          {space.type === 'academic' ? '🎓' : space.type === 'residential' ? '🏠' : '🎯'}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-hive-text-primary text-lg group-hover:text-hive-brand-primary transition-colors">
                {space.name}
              </h3>
              <div className="flex items-center gap-3 text-sm text-hive-text-secondary">
                <span className="capitalize">{space.type}</span>
                <span>•</span>
                <span>{space.members} members</span>
                <span>•</span>
                <ActivityIndicator activity={space.activity} />
                <span>•</span>
                <span>Active {space.lastActive}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PrivacyBadge privacy={space.privacy} />
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
                {space.isJoined ? 'Joined' : 'Join'}
              </button>
            </div>
          </div>

          <p className="text-hive-text-secondary text-sm mb-3 line-clamp-1">
            {space.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {space.tags.slice(0, 4).map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
                  {tag}
                </span>
              ))}
              {space.tags.length > 4 && (
                <span className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
                  +{space.tags.length - 4}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <div className="flex -space-x-1">
                {space.memberPhotos.slice(0, 3).map((photo, index) => (
                  <div key={index} className="w-5 h-5 bg-hive-background-primary border border-white rounded-full flex items-center justify-center text-xs">
                    {photo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Search Results Component
const SearchResults: React.FC<{
  spaces: Space[];
  viewMode: ViewMode;
  loadingState: LoadingState;
  searchQuery?: string;
  onJoinSpace: (spaceId: string) => void;
  onViewSpace: (spaceId: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}> = ({ 
  spaces, 
  viewMode, 
  loadingState, 
  searchQuery,
  onJoinSpace, 
  onViewSpace,
  onLoadMore,
  hasMore = false
}) => {
  if (loadingState === 'loading') {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-2xl border border-hive-border-default p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-hive-background-primary rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-hive-background-primary rounded w-1/3" />
                <div className="h-3 bg-hive-background-primary rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (loadingState === 'error') {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-hive-text-primary mb-2">Something went wrong</h3>
        <p className="text-hive-text-secondary mb-4">We couldn't load the search results. Please try again.</p>
        <button className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  if (loadingState === 'empty' || spaces.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-hive-text-primary mb-2">
          {searchQuery ? `No results for "${searchQuery}"` : 'No spaces found'}
        </h3>
        <p className="text-hive-text-secondary mb-4">
          {searchQuery 
            ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
            : 'Try adjusting your filters or browse our categories to discover spaces.'
          }
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors">
            Browse Categories
          </button>
          <button className="px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors">
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-hive-text-secondary">
          {searchQuery ? (
            <span>Found {spaces.length} spaces for "{searchQuery}"</span>
          ) : (
            <span>Showing {spaces.length} spaces</span>
          )}
        </div>
      </div>

      {/* Results Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onJoin={onJoinSpace}
              onView={onViewSpace}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {spaces.map((space) => (
            <SpaceListItem
              key={space.id}
              space={space}
              onJoin={onJoinSpace}
              onView={onViewSpace}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-white border border-hive-border-default text-hive-text-primary rounded-xl hover:border-hive-brand-primary hover:text-hive-brand-primary transition-colors"
          >
            Load More Spaces
          </button>
        </div>
      )}
    </div>
  );
};

export const BasicSearchResults: Story = {
  name: '📋 Basic Search Results',
  render: () => {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [joinedSpaces, setJoinedSpaces] = useState<Set<string>>(new Set(['1', '4']));

    const handleJoinSpace = (spaceId: string) => {
      setJoinedSpaces(prev => new Set([...prev, spaceId]));
    };

    const handleViewSpace = (spaceId: string) => {
      console.log('Viewing space:', spaceId);
    };

    const spacesWithJoinStatus = DEMO_SPACES.map(space => ({
      ...space,
      isJoined: joinedSpaces.has(space.id)
    }));

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Search Results</h1>
            <p className="text-hive-text-secondary">Display search results in grid or list format</p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-hive-text-primary">Results</div>
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-hive-border-default">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-hive-brand-primary text-white'
                    : 'text-hive-text-secondary hover:text-hive-text-primary'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-hive-brand-primary text-white'
                    : 'text-hive-text-secondary hover:text-hive-text-primary'
                }`}
              >
                List View
              </button>
            </div>
          </div>

          <SearchResults
            spaces={spacesWithJoinStatus}
            viewMode={viewMode}
            loadingState="idle"
            searchQuery="CS"
            onJoinSpace={handleJoinSpace}
            onViewSpace={handleViewSpace}
            hasMore={true}
            onLoadMore={() => console.log('Load more')}
          />
        </div>
      </div>
    );
  }
};

export const SearchResultStates: Story = {
  name: '🎯 Search Result States',
  render: () => {
    const [currentState, setCurrentState] = useState<LoadingState>('idle');
    
    const StateButton: React.FC<{ state: LoadingState; label: string }> = ({ state, label }) => (
      <button
        onClick={() => setCurrentState(state)}
        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
          currentState === state
            ? 'bg-hive-brand-primary text-white'
            : 'bg-white border border-hive-border-default text-hive-text-secondary hover:border-hive-brand-primary'
        }`}
      >
        {label}
      </button>
    );

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Search Result States</h1>
            <p className="text-hive-text-secondary">Different loading and error states</p>
          </div>

          {/* State Controls */}
          <div className="flex items-center justify-center gap-4">
            <StateButton state="idle" label="With Results" />
            <StateButton state="loading" label="Loading" />
            <StateButton state="empty" label="Empty Results" />
            <StateButton state="error" label="Error State" />
          </div>

          <SearchResults
            spaces={currentState === 'idle' ? DEMO_SPACES : []}
            viewMode="grid"
            loadingState={currentState}
            searchQuery={currentState === 'empty' ? 'nonexistent query' : 'CS'}
            onJoinSpace={(spaceId) => console.log('Join:', spaceId)}
            onViewSpace={(spaceId) => console.log('View:', spaceId)}
          />
        </div>
      </div>
    );
  }
};