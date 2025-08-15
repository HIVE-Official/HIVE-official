import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Search/02-Discovery Engine/TrendingSpaces',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Discover trending and popular spaces based on activity, growth, and engagement metrics'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface TrendingSpace {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'interest';
  members: number;
  growth: number; // percentage growth
  activity: 'high' | 'medium' | 'low';
  trending: 'hot' | 'rising' | 'steady';
  tags: string[];
  memberPhotos: string[];
  lastPost: string;
  postsToday: number;
  coordinates?: {
    building?: string;
    room?: string;
  };
}

// Demo data
const TRENDING_SPACES: TrendingSpace[] = [
  {
    id: '1',
    name: 'CS 220 Study Group',
    description: 'Weekly study sessions for Data Structures & Algorithms with collaborative problem solving.',
    type: 'academic',
    members: 47,
    growth: 23,
    activity: 'high',
    trending: 'hot',
    tags: ['Computer Science', 'Study Group', 'Algorithms'],
    memberPhotos: ['👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓'],
    lastPost: '5 minutes ago',
    postsToday: 12,
    coordinates: { building: 'Davis Hall', room: '101' }
  },
  {
    id: '2',
    name: 'Ultimate Frisbee Club',
    description: 'Competitive and recreational ultimate frisbee with tournaments and weekly practices.',
    type: 'interest',
    members: 89,
    growth: 15,
    activity: 'high',
    trending: 'rising',
    tags: ['Sports', 'Ultimate Frisbee', 'Recreation'],
    memberPhotos: ['🏃‍♂️', '🏃‍♀️', '👨‍🎓', '👩‍🎓', '👨‍💼'],
    lastPost: '2 hours ago',
    postsToday: 8
  },
  {
    id: '3',
    name: 'Richmond Quad Floor 3',
    description: 'Floor community for Richmond residents coordinating events and building friendships.',
    type: 'residential',
    members: 23,
    growth: 8,
    activity: 'medium',
    trending: 'steady',
    tags: ['Richmond Quad', 'Floor Community', 'Dorm Life'],
    memberPhotos: ['👨‍🎓', '👩‍🎓', '👨‍💼'],
    lastPost: '1 hour ago',
    postsToday: 4,
    coordinates: { building: 'Richmond Quad', room: 'Floor 3' }
  },
  {
    id: '4',
    name: 'Engineering Career Prep',
    description: 'Technical interview preparation, resume reviews, and career guidance for engineering students.',
    type: 'academic',
    members: 203,
    growth: 31,
    activity: 'high',
    trending: 'hot',
    tags: ['Engineering', 'Career Prep', 'Interview Prep'],
    memberPhotos: ['👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓', '👨‍💼', '👩‍💼'],
    lastPost: '30 minutes ago',
    postsToday: 15
  },
  {
    id: '5',
    name: 'South Campus Food Tours',
    description: 'Exploring campus dining options and organizing group food adventures.',
    type: 'interest',
    members: 45,
    growth: 12,
    activity: 'medium',
    trending: 'rising',
    tags: ['Food', 'Social', 'Campus Life'],
    memberPhotos: ['🍕', '👨‍🍳', '👩‍🍳', '👨‍🎓'],
    lastPost: '3 hours ago',
    postsToday: 6,
    coordinates: { building: 'South Campus', room: 'Various' }
  },
  {
    id: '6',
    name: 'Machine Learning Research',
    description: 'Undergraduate research group working on ML projects and paper discussions.',
    type: 'academic',
    members: 67,
    growth: 28,
    activity: 'high',
    trending: 'hot',
    tags: ['Machine Learning', 'Research', 'AI'],
    memberPhotos: ['👨‍🔬', '👩‍🔬', '👨‍💻', '👩‍💻'],
    lastPost: '15 minutes ago',
    postsToday: 9
  }
];

// Trending Badge Component
const TrendingBadge: React.FC<{ trending: TrendingSpace['trending'] }> = ({ trending }) => {
  const config = {
    hot: { 
      icon: '🔥', 
      label: 'Hot', 
      color: 'bg-gradient-to-r from-red-500 to-orange-500',
      pulse: true
    },
    rising: { 
      icon: '📈', 
      label: 'Rising', 
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      pulse: false
    },
    steady: { 
      icon: '📊', 
      label: 'Steady', 
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      pulse: false
    }
  };

  const { icon, label, color, pulse } = config[trending];

  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs text-white font-medium ${color} ${pulse ? 'animate-pulse' : ''}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

// Growth Indicator Component
const GrowthIndicator: React.FC<{ growth: number }> = ({ growth }) => {
  return (
    <div className="flex items-center gap-1">
      <svg className="w-3 h-3 text-hive-status-success" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
      <span className="text-xs text-hive-status-success font-medium">+{growth}%</span>
    </div>
  );
};

// Activity Stats Component
const ActivityStats: React.FC<{ postsToday: number; lastPost: string }> = ({ postsToday, lastPost }) => {
  return (
    <div className="flex items-center gap-4 text-xs text-hive-text-secondary">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-hive-status-success rounded-full" />
        <span>{postsToday} posts today</span>
      </div>
      <span>Last: {lastPost}</span>
    </div>
  );
};

// Trending Space Card Component
const TrendingSpaceCard: React.FC<{ 
  space: TrendingSpace; 
  rank: number;
  onJoin: (spaceId: string) => void;
  onView: (spaceId: string) => void;
}> = ({ space, rank, onJoin, onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default hover:border-hive-brand-primary transition-all duration-200 p-6 group cursor-pointer relative overflow-hidden" onClick={() => onView(space.id)}>
      {/* Trending Background Effect */}
      {space.trending === 'hot' && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-yellow-500/5 pointer-events-none" />
      )}
      
      {/* Rank Badge */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-hive-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
        #{rank}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4 pl-12">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-hive-text-primary text-lg group-hover:text-hive-brand-primary transition-colors">
              {space.name}
            </h3>
            <TrendingBadge trending={space.trending} />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-hive-text-secondary capitalize">{space.type}</span>
            <span className="text-hive-text-secondary">•</span>
            <span className="text-sm text-hive-text-secondary">{space.members} members</span>
            <GrowthIndicator growth={space.growth} />
          </div>
        </div>
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

      {/* Activity Stats */}
      <div className="mb-4">
        <ActivityStats postsToday={space.postsToday} lastPost={space.lastPost} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-hive-border-default">
        <div className="flex items-center gap-1">
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
          <span className="text-xs text-hive-text-secondary ml-2">Active members</span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onJoin(space.id);
          }}
          className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg text-sm font-medium hover:bg-hive-brand-primary/80 transition-colors"
        >
          Join Space
        </button>
      </div>
    </div>
  );
};

// Trending Categories Component
const TrendingCategories: React.FC<{
  spaces: TrendingSpace[];
  onCategorySelect: (category: string) => void;
}> = ({ spaces, onCategorySelect }) => {
  const categories = {
    academic: { name: 'Academic', icon: '🎓', count: 0 },
    residential: { name: 'Residential', icon: '🏠', count: 0 },
    interest: { name: 'Interest Groups', icon: '🎯', count: 0 }
  };

  // Count spaces by category
  spaces.forEach(space => {
    categories[space.type].count++;
  });

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-4">Trending Categories</h3>
      
      <div className="space-y-3">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => onCategorySelect(key)}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-hive-border-default hover:border-hive-brand-primary hover:bg-hive-background-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-hive-text-primary">{category.name}</div>
                <div className="text-sm text-hive-text-secondary">{category.count} trending spaces</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-hive-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Trending Spaces Component
const TrendingSpaces: React.FC<{
  spaces: TrendingSpace[];
  onJoinSpace: (spaceId: string) => void;
  onViewSpace: (spaceId: string) => void;
  onCategorySelect: (category: string) => void;
  showCategories?: boolean;
  limit?: number;
}> = ({ 
  spaces, 
  onJoinSpace, 
  onViewSpace, 
  onCategorySelect,
  showCategories = true,
  limit 
}) => {
  const displaySpaces = limit ? spaces.slice(0, limit) : spaces;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl">🔥</span>
          <h2 className="text-2xl font-bold text-hive-text-primary">Trending Spaces</h2>
        </div>
        <p className="text-hive-text-secondary">
          Discover the most active and fastest-growing communities on campus
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displaySpaces.map((space, index) => (
              <TrendingSpaceCard
                key={space.id}
                space={space}
                rank={index + 1}
                onJoin={onJoinSpace}
                onView={onViewSpace}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        {showCategories && (
          <div className="lg:col-span-1">
            <TrendingCategories
              spaces={spaces}
              onCategorySelect={onCategorySelect}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const BasicTrendingSpaces: Story = {
  name: '🔥 Basic Trending Spaces',
  render: () => {
    const handleJoinSpace = (spaceId: string) => {
      console.log('Joining space:', spaceId);
    };

    const handleViewSpace = (spaceId: string) => {
      console.log('Viewing space:', spaceId);
    };

    const handleCategorySelect = (category: string) => {
      console.log('Selected category:', category);
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto">
          <TrendingSpaces
            spaces={TRENDING_SPACES}
            onJoinSpace={handleJoinSpace}
            onViewSpace={handleViewSpace}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>
    );
  }
};

export const TrendingSpacesVariants: Story = {
  name: '📈 Trending Spaces Variants',
  render: () => {
    const [selectedVariant, setSelectedVariant] = useState<'full' | 'compact' | 'no-sidebar'>('full');

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
            <h1 className="text-3xl font-bold text-hive-text-primary">Trending Spaces Variants</h1>
            <p className="text-hive-text-secondary">Different layouts and configurations</p>
          </div>

          {/* Variant Controls */}
          <div className="flex items-center justify-center gap-4">
            <VariantButton variant="full" label="Full Layout" />
            <VariantButton variant="compact" label="Compact (4 spaces)" />
            <VariantButton variant="no-sidebar" label="No Sidebar" />
          </div>

          <TrendingSpaces
            spaces={TRENDING_SPACES}
            onJoinSpace={(spaceId) => console.log('Join:', spaceId)}
            onViewSpace={(spaceId) => console.log('View:', spaceId)}
            onCategorySelect={(category) => console.log('Category:', category)}
            showCategories={selectedVariant !== 'no-sidebar'}
            limit={selectedVariant === 'compact' ? 4 : undefined}
          />

          {/* Usage Guide */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Usage Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Trending Indicators</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    <span>Hot - Rapid growth and high activity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg">📈</span>
                    <span>Rising - Steady growth and engagement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-lg">📊</span>
                    <span>Steady - Consistent activity and membership</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Metrics</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Growth percentage (member increase)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Daily post activity and engagement
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Recent activity timestamps
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Active member participation
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