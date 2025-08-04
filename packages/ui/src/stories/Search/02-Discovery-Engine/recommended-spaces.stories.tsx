import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Search/02-Discovery Engine/RecommendedSpaces',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Personalized space recommendations based on academic profile, connections, and interests'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface RecommendedSpace {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'interest';
  members: number;
  activity: 'high' | 'medium' | 'low';
  tags: string[];
  memberPhotos: string[];
  lastActive: string;
  recommendationReason: string;
  matchScore: number; // 0-100
  connections: {
    mutualFriends: number;
    friendsInSpace: string[];
  };
  coordinates?: {
    building?: string;
    room?: string;
  };
}

interface UserProfile {
  major: string;
  year: string;
  interests: string[];
  building: string;
  joinedSpaces: string[];
}

// Demo user profile
const DEMO_USER_PROFILE: UserProfile = {
  major: 'Computer Science',
  year: 'Junior',
  interests: ['Programming', 'Gaming', 'Music'],
  building: 'Richmond Quad',
  joinedSpaces: ['cs-220-study', 'richmond-floor-3']
};

// Demo recommended spaces
const RECOMMENDED_SPACES: RecommendedSpace[] = [
  {
    id: '1',
    name: 'CS 320 Systems Programming',
    description: 'Advanced systems programming course study group. Weekly coding sessions and project collaboration.',
    type: 'academic',
    members: 34,
    activity: 'high',
    tags: ['Computer Science', 'Systems Programming', 'C++'],
    memberPhotos: ['👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓'],
    lastActive: '30 minutes ago',
    recommendationReason: 'Matches your CS major and builds on CS 220',
    matchScore: 95,
    connections: {
      mutualFriends: 8,
      friendsInSpace: ['Alex Chen', 'Sarah Johnson', 'Mike Rodriguez']
    },
    coordinates: { building: 'Davis Hall', room: '203' }
  },
  {
    id: '2',
    name: 'Richmond Quad Gaming Lounge',
    description: 'Gaming community for Richmond residents. Weekly tournaments, LAN parties, and casual gaming.',
    type: 'residential',
    members: 45,
    activity: 'high',
    tags: ['Gaming', 'Richmond Quad', 'Tournaments'],
    memberPhotos: ['🎮', '👨‍💻', '👩‍💻', '👨‍🎓'],
    lastActive: '1 hour ago',
    recommendationReason: 'You live in Richmond Quad and love gaming',
    matchScore: 88,
    connections: {
      mutualFriends: 12,
      friendsInSpace: ['Emma Wilson', 'David Kim', 'Lisa Zhang', 'Tom Anderson']
    },
    coordinates: { building: 'Richmond Quad', room: 'Gaming Lounge' }
  },
  {
    id: '3',
    name: 'Campus Music Production',
    description: 'Create, share, and collaborate on music production. All genres and skill levels welcome.',
    type: 'interest',
    members: 67,
    activity: 'medium',
    tags: ['Music Production', 'Creative', 'Collaboration'],
    memberPhotos: ['🎵', '👨‍🎨', '👩‍🎨', '🎧'],
    lastActive: '2 hours ago',
    recommendationReason: 'Matches your interest in music',
    matchScore: 76,
    connections: {
      mutualFriends: 3,
      friendsInSpace: ['Maya Patel']
    }
  },
  {
    id: '4',
    name: 'Data Structures Study Circle',
    description: 'Peer tutoring and study sessions for data structures and algorithms courses.',
    type: 'academic',
    members: 89,
    activity: 'high',
    tags: ['Computer Science', 'Tutoring', 'Algorithms'],
    memberPhotos: ['👨‍🏫', '👩‍🏫', '👨‍💻', '👩‍💻'],
    lastActive: '45 minutes ago',
    recommendationReason: 'Popular with CS students in your year',
    matchScore: 84,
    connections: {
      mutualFriends: 6,
      friendsInSpace: ['Carlos Martinez', 'Jenny Liu']
    }
  },
  {
    id: '5',
    name: 'Junior CS Internship Prep',
    description: 'Career preparation specifically for junior CS students. Resume reviews, mock interviews, networking.',
    type: 'academic',
    members: 56,
    activity: 'medium',
    tags: ['Career Prep', 'Computer Science', 'Internships'],
    memberPhotos: ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻'],
    lastActive: '3 hours ago',
    recommendationReason: 'Perfect for junior CS students like you',
    matchScore: 92,
    connections: {
      mutualFriends: 4,
      friendsInSpace: ['Rachel Green', 'Kevin Wong']
    }
  },
  {
    id: '6',
    name: 'Residence Hall Programming',
    description: 'Learn programming in a casual dorm setting. Perfect for beginners and intermediates.',
    type: 'residential',
    members: 23,
    activity: 'low',
    tags: ['Programming', 'Beginner Friendly', 'Dorm Life'],
    memberPhotos: ['👨‍🎓', '👩‍🎓', '💻'],
    lastActive: '1 day ago',
    recommendationReason: 'Combines your CS interests with dorm community',
    matchScore: 71,
    connections: {
      mutualFriends: 2,
      friendsInSpace: ['Amanda Chen']
    },
    coordinates: { building: 'Richmond Quad', room: 'Study Lounge' }
  }
];

// Match Score Component
const MatchScore: React.FC<{ score: number }> = ({ score }) => {
  const getColor = (score: number) => {
    if (score >= 90) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (score >= 80) return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    if (score >= 70) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const getLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 80) return 'Great Match';
    if (score >= 70) return 'Good Match';
    return 'Fair Match';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`absolute inset-y-0 left-0 rounded-full ${getColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="text-xs">
        <div className="font-medium text-hive-text-primary">{score}%</div>
        <div className="text-hive-text-secondary">{getLabel(score)}</div>
      </div>
    </div>
  );
};

// Connections Component
const ConnectionsIndicator: React.FC<{ connections: RecommendedSpace['connections'] }> = ({ connections }) => {
  if (connections.mutualFriends === 0) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-hive-text-secondary">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span>{connections.mutualFriends} mutual connections</span>
      {connections.friendsInSpace.length > 0 && (
        <span>• {connections.friendsInSpace.slice(0, 2).join(', ')}{connections.friendsInSpace.length > 2 ? ` +${connections.friendsInSpace.length - 2} more` : ''}</span>
      )}
    </div>
  );
};

// Recommendation Reason Component
const RecommendationReason: React.FC<{ reason: string }> = ({ reason }) => {
  return (
    <div className="flex items-start gap-2 p-3 bg-hive-brand-primary/10 rounded-xl border border-hive-brand-primary/20">
      <div className="text-hive-brand-primary mt-0.5">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="text-sm text-hive-brand-primary font-medium">
        {reason}
      </div>
    </div>
  );
};

// Recommended Space Card Component
const RecommendedSpaceCard: React.FC<{ 
  space: RecommendedSpace; 
  onJoin: (spaceId: string) => void;
  onView: (spaceId: string) => void;
  onDismiss: (spaceId: string) => void;
}> = ({ space, onJoin, onView, onDismiss }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default hover:border-hive-brand-primary transition-all duration-200 p-6 group cursor-pointer relative" onClick={() => onView(space.id)}>
      {/* Dismiss Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(space.id);
        }}
        className="absolute top-4 right-4 w-6 h-6 bg-hive-background-primary hover:bg-red-100 rounded-full flex items-center justify-center text-hive-text-secondary hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-4 pr-8">
        <div className="flex-1">
          <h3 className="font-bold text-hive-text-primary text-lg mb-1 group-hover:text-hive-brand-primary transition-colors">
            {space.name}
          </h3>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-hive-text-secondary capitalize">{space.type}</span>
            <span className="text-hive-text-secondary">•</span>
            <span className="text-sm text-hive-text-secondary">{space.members} members</span>
            <span className="text-hive-text-secondary">•</span>
            <span className="text-sm text-hive-text-secondary">Active {space.lastActive}</span>
          </div>
        </div>
      </div>

      {/* Match Score */}
      <div className="mb-4">
        <MatchScore score={space.matchScore} />
      </div>

      {/* Recommendation Reason */}
      <div className="mb-4">
        <RecommendationReason reason={space.recommendationReason} />
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

      {/* Connections */}
      <div className="mb-4">
        <ConnectionsIndicator connections={space.connections} />
      </div>

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

// User Profile Display Component
const UserProfileDisplay: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-4">Your Profile</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-hive-brand-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
            {profile.major.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-hive-text-primary">{profile.major}</div>
            <div className="text-sm text-hive-text-secondary">{profile.year} • {profile.building}</div>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-hive-text-primary mb-2">Interests</div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span key={index} className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-hive-text-primary mb-2">Joined Spaces</div>
          <div className="text-sm text-hive-text-secondary">{profile.joinedSpaces.length} spaces</div>
        </div>
      </div>
    </div>
  );
};

// Main Recommended Spaces Component
const RecommendedSpaces: React.FC<{
  spaces: RecommendedSpace[];
  userProfile: UserProfile;
  onJoinSpace: (spaceId: string) => void;
  onViewSpace: (spaceId: string) => void;
  onDismissSpace: (spaceId: string) => void;
  onRefreshRecommendations: () => void;
  showProfile?: boolean;
  limit?: number;
}> = ({ 
  spaces, 
  userProfile,
  onJoinSpace, 
  onViewSpace, 
  onDismissSpace,
  onRefreshRecommendations,
  showProfile = true,
  limit 
}) => {
  const displaySpaces = limit ? spaces.slice(0, limit) : spaces;
  const sortedSpaces = [...displaySpaces].sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl">🎯</span>
          <h2 className="text-2xl font-bold text-hive-text-primary">Recommended for You</h2>
        </div>
        <p className="text-hive-text-secondary">
          Personalized space recommendations based on your academic profile and interests
        </p>
        <button
          onClick={onRefreshRecommendations}
          className="px-4 py-2 bg-white border border-hive-border-default text-hive-text-secondary rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors"
        >
          Refresh Recommendations
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedSpaces.map((space) => (
              <RecommendedSpaceCard
                key={space.id}
                space={space}
                onJoin={onJoinSpace}
                onView={onViewSpace}
                onDismiss={onDismissSpace}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        {showProfile && (
          <div className="lg:col-span-1">
            <UserProfileDisplay profile={userProfile} />
          </div>
        )}
      </div>
    </div>
  );
};

export const BasicRecommendedSpaces: Story = {
  name: '🎯 Basic Recommended Spaces',
  render: () => {
    const [spaces, setSpaces] = useState(RECOMMENDED_SPACES);

    const handleJoinSpace = (spaceId: string) => {
      console.log('Joining space:', spaceId);
    };

    const handleViewSpace = (spaceId: string) => {
      console.log('Viewing space:', spaceId);
    };

    const handleDismissSpace = (spaceId: string) => {
      setSpaces(prev => prev.filter(space => space.id !== spaceId));
      console.log('Dismissed space:', spaceId);
    };

    const handleRefreshRecommendations = () => {
      console.log('Refreshing recommendations...');
      // In real app, this would fetch new recommendations
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto">
          <RecommendedSpaces
            spaces={spaces}
            userProfile={DEMO_USER_PROFILE}
            onJoinSpace={handleJoinSpace}
            onViewSpace={handleViewSpace}
            onDismissSpace={handleDismissSpace}
            onRefreshRecommendations={handleRefreshRecommendations}
          />
        </div>
      </div>
    );
  }
};

export const RecommendedSpacesVariants: Story = {
  name: '🔄 Recommended Spaces Variants',
  render: () => {
    const [selectedVariant, setSelectedVariant] = useState<'full' | 'compact' | 'no-profile'>('full');
    const [spaces, setSpaces] = useState(RECOMMENDED_SPACES);

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
            <h1 className="text-3xl font-bold text-hive-text-primary">Recommended Spaces Variants</h1>
            <p className="text-hive-text-secondary">Different layouts and configurations</p>
          </div>

          {/* Variant Controls */}
          <div className="flex items-center justify-center gap-4">
            <VariantButton variant="full" label="Full Layout" />
            <VariantButton variant="compact" label="Top 4 Matches" />
            <VariantButton variant="no-profile" label="No Profile Sidebar" />
          </div>

          <RecommendedSpaces
            spaces={spaces}
            userProfile={DEMO_USER_PROFILE}
            onJoinSpace={(spaceId) => console.log('Join:', spaceId)}
            onViewSpace={(spaceId) => console.log('View:', spaceId)}
            onDismissSpace={(spaceId) => {
              setSpaces(prev => prev.filter(space => space.id !== spaceId));
              console.log('Dismissed:', spaceId);
            }}
            onRefreshRecommendations={() => console.log('Refresh')}
            showProfile={selectedVariant !== 'no-profile'}
            limit={selectedVariant === 'compact' ? 4 : undefined}
          />

          {/* Usage Guide */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Recommendation System</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Matching Factors</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Academic major and courses
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Residential location and community
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Interests and hobbies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                    Social connections and mutual friends
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-hive-text-primary">Match Scores</h3>
                <ul className="space-y-2 text-hive-text-secondary">
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-green-500 rounded-full" />
                    90-100%: Excellent Match
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-blue-500 rounded-full" />
                    80-89%: Great Match
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-yellow-500 rounded-full" />
                    70-79%: Good Match
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-gray-500 rounded-full" />
                    Below 70%: Fair Match
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