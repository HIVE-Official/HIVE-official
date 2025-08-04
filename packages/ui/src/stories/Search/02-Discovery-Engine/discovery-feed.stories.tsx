import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';

const meta = {
  title: 'Search/02-Discovery Engine/DiscoveryFeed',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Curated discovery feed combining trending spaces, recommendations, and activity updates'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
type FeedItemType = 'trending' | 'recommended' | 'new' | 'activity' | 'milestone' | 'event';

interface DiscoveryFeedItem {
  id: string;
  type: FeedItemType;
  timestamp: string;
  title: string;
  description: string;
  space: {
    id: string;
    name: string;
    type: 'academic' | 'residential' | 'interest';
    members: number;
    image?: string;
  };
  metadata?: {
    growth?: number;
    matchScore?: number;
    eventDate?: string;
    milestone?: string;
    connections?: number;
  };
  actions: string[];
}

// Demo data
const DISCOVERY_FEED_ITEMS: DiscoveryFeedItem[] = [
  {
    id: '1',
    type: 'trending',
    timestamp: '2 minutes ago',
    title: 'CS 220 Study Group is trending',
    description: 'This academic space has grown 23% this week with high activity and engagement.',
    space: {
      id: 'cs-220',
      name: 'CS 220 Study Group',
      type: 'academic',
      members: 47
    },
    metadata: { growth: 23 },
    actions: ['Join Space', 'View Details']
  },
  {
    id: '2',
    type: 'recommended',
    timestamp: '5 minutes ago',
    title: 'Perfect match for your interests',
    description: 'Richmond Quad Gaming Lounge matches your location and gaming interests.',
    space: {
      id: 'richmond-gaming',
      name: 'Richmond Quad Gaming Lounge',
      type: 'residential',
      members: 45
    },
    metadata: { matchScore: 88, connections: 12 },
    actions: ['Join Space', 'See Why']
  },
  {
    id: '3',
    type: 'new',
    timestamp: '15 minutes ago',
    title: 'New space in your building',
    description: 'Richmond Floor 4 Study Hub just launched and is looking for founding members.',
    space: {
      id: 'richmond-floor-4',
      name: 'Richmond Floor 4 Study Hub',
      type: 'residential',
      members: 8
    },
    actions: ['Be a Founder', 'Learn More']
  },
  {
    id: '4',
    type: 'activity',
    timestamp: '30 minutes ago',
    title: 'Your connections are active',
    description: 'Sarah and 3 other connections just joined Ultimate Frisbee Club.',
    space: {
      id: 'ultimate-frisbee',
      name: 'Ultimate Frisbee Club',
      type: 'interest',
      members: 89
    },
    metadata: { connections: 4 },
    actions: ['Join Friends', 'View Space']
  },
  {
    id: '5',
    type: 'milestone',
    timestamp: '1 hour ago',
    title: 'Community milestone reached',
    description: 'Engineering Career Prep just reached 200 members and is celebrating!',
    space: {
      id: 'eng-career',
      name: 'Engineering Career Prep',
      type: 'academic',
      members: 203
    },
    metadata: { milestone: '200 members' },
    actions: ['Join Celebration', 'View Space']
  },
  {
    id: '6',
    type: 'event',
    timestamp: '2 hours ago',
    title: 'Upcoming event in your area',
    description: 'Campus Music Production is hosting a collaborative session this Friday.',
    space: {
      id: 'music-production',
      name: 'Campus Music Production',
      type: 'interest',
      members: 67
    },
    metadata: { eventDate: 'This Friday, 7 PM' },
    actions: ['RSVP', 'Join Space']
  }
];

// Feed Item Icon Component
const FeedItemIcon: React.FC<{ type: FeedItemType }> = ({ type }) => {
  const iconConfig = {
    trending: { icon: '🔥', color: 'bg-gradient-to-br from-red-500 to-orange-500' },
    recommended: { icon: '🎯', color: 'bg-gradient-to-br from-blue-500 to-indigo-500' },
    new: { icon: '✨', color: 'bg-gradient-to-br from-green-500 to-emerald-500' },
    activity: { icon: '👥', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    milestone: { icon: '🎉', color: 'bg-gradient-to-br from-yellow-500 to-orange-500' },
    event: { icon: '📅', color: 'bg-gradient-to-br from-indigo-500 to-purple-500' }
  };

  const { icon, color } = iconConfig[type];

  return (
    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
      {icon}
    </div>
  );
};

// Space Type Badge Component
const SpaceTypeBadge: React.FC<{ type: 'academic' | 'residential' | 'interest' }> = ({ type }) => {
  const config = {
    academic: { icon: '🎓', label: 'Academic', color: 'bg-blue-100 text-blue-800' },
    residential: { icon: '🏠', label: 'Residential', color: 'bg-green-100 text-green-800' },
    interest: { icon: '🎯', label: 'Interest', color: 'bg-purple-100 text-purple-800' }
  };

  const { icon, label, color } = config[type];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
};

// Metadata Display Component
const MetadataDisplay: React.FC<{ type: FeedItemType; metadata?: DiscoveryFeedItem['metadata'] }> = ({ type, metadata }) => {
  if (!metadata) return null;

  return (
    <div className="flex flex-wrap gap-3 text-sm">
      {metadata.growth && (
        <div className="flex items-center gap-1 text-hive-status-success">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span>+{metadata.growth}% growth</span>
        </div>
      )}
      
      {metadata.matchScore && (
        <div className="flex items-center gap-1 text-hive-brand-primary">
          <div className="w-3 h-3 bg-hive-brand-primary rounded-full" />
          <span>{metadata.matchScore}% match</span>
        </div>
      )}
      
      {metadata.connections && (
        <div className="flex items-center gap-1 text-hive-text-secondary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{metadata.connections} connections</span>
        </div>
      )}
      
      {metadata.milestone && (
        <div className="flex items-center gap-1 text-yellow-600">
          <span>🏆</span>
          <span>{metadata.milestone}</span>
        </div>
      )}
      
      {metadata.eventDate && (
        <div className="flex items-center gap-1 text-indigo-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{metadata.eventDate}</span>
        </div>
      )}
    </div>
  );
};

// Discovery Feed Item Component
const DiscoveryFeedItem: React.FC<{ 
  item: DiscoveryFeedItem; 
  onAction: (itemId: string, action: string) => void;
  onSpaceClick: (spaceId: string) => void;
}> = ({ item, onAction, onSpaceClick }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default hover:border-hive-brand-primary/50 transition-all duration-200 p-6 group">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <FeedItemIcon type={item.type} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-hive-text-primary text-lg group-hover:text-hive-brand-primary transition-colors">
              {item.title}
            </h3>
            <span className="text-sm text-hive-text-secondary whitespace-nowrap">
              {item.timestamp}
            </span>
          </div>
          
          <p className="text-hive-text-secondary text-sm mb-3">
            {item.description}
          </p>
          
          <MetadataDisplay type={item.type} metadata={item.metadata} />
        </div>
      </div>

      {/* Space Info */}
      <div 
        className="flex items-center gap-4 p-4 bg-hive-background-primary rounded-xl mb-4 cursor-pointer hover:bg-hive-brand-primary/5 transition-colors"
        onClick={() => onSpaceClick(item.space.id)}
      >
        <div className="w-12 h-12 bg-hive-brand-primary rounded-xl flex items-center justify-center text-white text-xl font-bold">
          {item.space.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="font-semibold text-hive-text-primary">{item.space.name}</div>
          <div className="flex items-center gap-3 text-sm text-hive-text-secondary">
            <SpaceTypeBadge type={item.space.type} />
            <span>•</span>
            <span>{item.space.members} members</span>
          </div>
        </div>
        
        <svg className="w-5 h-5 text-hive-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {item.actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onAction(item.id, action)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              index === 0
                ? 'bg-hive-brand-primary text-white hover:bg-hive-brand-primary/80'
                : 'bg-white border border-hive-border-default text-hive-text-secondary hover:border-hive-brand-primary hover:text-hive-text-primary'
            }`}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

// Feed Filter Component
const FeedFilter: React.FC<{
  activeFilters: FeedItemType[];
  onFiltersChange: (filters: FeedItemType[]) => void;
}> = ({ activeFilters, onFiltersChange }) => {
  const filterOptions: { type: FeedItemType; label: string; icon: string }[] = [
    { type: 'trending', label: 'Trending', icon: '🔥' },
    { type: 'recommended', label: 'For You', icon: '🎯' },
    { type: 'new', label: 'New Spaces', icon: '✨' },
    { type: 'activity', label: 'Friend Activity', icon: '👥' },
    { type: 'milestone', label: 'Milestones', icon: '🎉' },
    { type: 'event', label: 'Events', icon: '📅' }
  ];

  const toggleFilter = (type: FeedItemType) => {
    if (activeFilters.includes(type)) {
      onFiltersChange(activeFilters.filter(f => f !== type));
    } else {
      onFiltersChange([...activeFilters, type]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-4">Filter Discovery Feed</h3>
      
      <div className="space-y-2">
        {filterOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => toggleFilter(option.type)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
              activeFilters.includes(option.type)
                ? 'bg-hive-brand-primary/10 border-hive-brand-primary text-hive-text-primary'
                : 'bg-white border-hive-border-default text-hive-text-secondary hover:border-hive-brand-primary hover:bg-hive-background-primary'
            }`}
          >
            <span className="text-lg">{option.icon}</span>
            <span className="font-medium">{option.label}</span>
            {activeFilters.includes(option.type) && (
              <svg className="w-4 h-4 ml-auto text-hive-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Discovery Feed Component
const DiscoveryFeed: React.FC<{
  items: DiscoveryFeedItem[];
  onAction: (itemId: string, action: string) => void;
  onSpaceClick: (spaceId: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  showFilters?: boolean;
}> = ({ 
  items, 
  onAction, 
  onSpaceClick, 
  onLoadMore, 
  hasMore = false,
  showFilters = true 
}) => {
  const [activeFilters, setActiveFilters] = useState<FeedItemType[]>(['trending', 'recommended', 'new', 'activity', 'milestone', 'event']);
  const [isLoading, setIsLoading] = useState(false);

  const filteredItems = items.filter(item => activeFilters.includes(item.type));

  const handleLoadMore = async () => {
    if (onLoadMore) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      onLoadMore();
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl">🧭</span>
          <h2 className="text-2xl font-bold text-hive-text-primary">Discovery Feed</h2>
        </div>
        <p className="text-hive-text-secondary">
          Stay updated with trending spaces, personalized recommendations, and community activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-hive-text-primary mb-2">No items match your filters</h3>
                <p className="text-hive-text-secondary">Try adjusting your feed filters to see more content.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <DiscoveryFeedItem
                  key={item.id}
                  item={item}
                  onAction={onAction}
                  onSpaceClick={onSpaceClick}
                />
              ))
            )}

            {/* Load More */}
            {hasMore && filteredItems.length > 0 && (
              <div className="text-center pt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-6 py-3 bg-white border border-hive-border-default text-hive-text-primary rounded-xl hover:border-hive-brand-primary hover:text-hive-brand-primary transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Load More Updates'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {showFilters && (
          <div className="lg:col-span-1">
            <FeedFilter
              activeFilters={activeFilters}
              onFiltersChange={setActiveFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const BasicDiscoveryFeed: Story = {
  name: '🧭 Basic Discovery Feed',
  render: () => {
    const handleAction = (itemId: string, action: string) => {
      console.log('Action:', action, 'on item:', itemId);
    };

    const handleSpaceClick = (spaceId: string) => {
      console.log('Viewing space:', spaceId);
    };

    const handleLoadMore = () => {
      console.log('Loading more items...');
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto">
          <DiscoveryFeed
            items={DISCOVERY_FEED_ITEMS}
            onAction={handleAction}
            onSpaceClick={handleSpaceClick}
            onLoadMore={handleLoadMore}
            hasMore={true}
          />
        </div>
      </div>
    );
  }
};

export const DiscoveryFeedVariants: Story = {
  name: '🔄 Discovery Feed Variants',
  render: () => {
    const [selectedVariant, setSelectedVariant] = useState<'full' | 'no-filters' | 'compact'>('full');

    const VariantButton: React.FC<{ variant: typeof selectedVariant; label: string }> = ({ variant, label }) => (
      <button
        onClick={() => setSelectedVariant(variant)}
        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
          selectedVariant === variant
            ? 'bg-hive-brand-primary text-white'
            : 'bg-white border border-hive-border-default text-hive-text-secondary hover:border-hive-brand-primary'
        }`}
      >
        {label}
      </button>
    );

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Discovery Feed Variants</h1>
            <p className="text-hive-text-secondary">Different layouts and filtering options</p>
          </div>

          {/* Variant Controls */}
          <div className="flex items-center justify-center gap-4">
            <VariantButton variant="full" label="Full Feed" />
            <VariantButton variant="no-filters" label="No Filters" />
            <VariantButton variant="compact" label="Compact View" />
          </div>

          <DiscoveryFeed
            items={selectedVariant === 'compact' ? DISCOVERY_FEED_ITEMS.slice(0, 3) : DISCOVERY_FEED_ITEMS}
            onAction={(itemId, action) => console.log('Action:', action, 'on item:', itemId)}
            onSpaceClick={(spaceId) => console.log('Viewing space:', spaceId)}
            onLoadMore={() => console.log('Loading more')}
            hasMore={selectedVariant !== 'compact'}
            showFilters={selectedVariant !== 'no-filters'}
          />

          {/* Usage Guide */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Discovery Feed Types</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Content Types</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    <span>Trending spaces and growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    <span>Personalized recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <span>New spaces in your area</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Social Updates</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="text-lg">👥</span>
                    <span>Friend activity and joins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg">🎉</span>
                    <span>Community milestones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <span>Upcoming events</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Features</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Real-time activity updates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Customizable content filters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Infinite scroll loading
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};