/**
 * HIVE Profile Page - Social-First Implementation
 * Tinder-style social + student utility design
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-session';
import { useProfile } from '@/hooks/use-profile';
import { SocialProfileLayout } from '@hive/ui/components/profile/social-profile-layout';
import { Skeleton } from '@hive/ui';
import '@hive/ui/styles/test-minimal.css';

// Mock data generator for demo purposes
const generateMockData = (profile: any) => ({
  user: {
    id: profile?.id || 'user-1',
    fullName: profile?.fullName || 'Sarah Chen',
    handle: profile?.handle || 'sarahchen',
    bio: profile?.bio || 'Ready to debug life and build cool things together 🚀',
    avatar: profile?.avatarUrl || profile?.profilePhotoUrl,
    photos: [
      profile?.avatarUrl || '/api/placeholder/320/400',
      '/api/placeholder/320/400',
      '/api/placeholder/320/400'
    ],
    major: profile?.major || 'Computer Science',
    academicYear: profile?.academicYear || 'Junior',
    isBuilder: profile?.builderOptIn || profile?.isBuilder || true,
    builderLevel: 'Advanced',
    toolsCreated: 3,
    campusImpact: 247,
    onlineStatus: 'online' as const,
    lastSeen: undefined,
  },
  
  events: [
    {
      id: 'event-1',
      title: 'Data Structures',
      time: '9:00 AM',
      endTime: '10:30 AM',
      type: 'class' as const,
      location: 'Baldy Hall',
      room: 'Room 22',
      professor: 'Johnson',
      canJoin: false,
    },
    {
      id: 'event-2',
      title: 'Mock Trial Practice',
      time: '2:00 PM',
      endTime: '4:00 PM',
      type: 'social' as const,
      location: 'Student Union',
      room: 'Room B',
      attendees: {
        going: 12,
        maybe: 3,
        spotsLeft: 2
      },
      canJoin: true,
      userStatus: null,
      friends: ['Alex', 'Jamie']
    },
    {
      id: 'event-3',
      title: 'CS Study Group',
      time: '7:00 PM',
      endTime: '9:00 PM',
      type: 'study' as const,
      location: 'Library',
      room: 'Group Study Room 4',
      attendees: {
        going: 8,
        maybe: 3,
        spotsLeft: 2
      },
      canJoin: true,
      userStatus: 'maybe',
      friends: ['Alex', 'Morgan', 'Taylor']
    }
  ],
  
  tools: [
    {
      id: 'tool-1',
      name: 'GPA Calc',
      icon: '🧮',
      category: 'academic' as const,
      rating: 4.2,
      usageCount: 156,
      socialProof: {
        friendsUsed: ['Alex', 'Jamie'],
        totalUsers: 1247,
        trending: true
      },
      isCreated: true,
      lastUsed: '2024-01-15'
    },
    {
      id: 'tool-2',
      name: 'Poll Maker',
      icon: '📊',
      category: 'social' as const,
      rating: 3.8,
      usageCount: 89,
      socialProof: {
        friendsUsed: ['Morgan'],
        totalUsers: 567,
        trending: true
      },
      isCreated: false,
      lastUsed: '2024-01-14'
    },
    {
      id: 'tool-3',
      name: 'Study Timer',
      icon: '⏰',
      category: 'productivity' as const,
      rating: 4.5,
      usageCount: 234,
      socialProof: {
        friendsUsed: ['Alex', 'Sarah', 'Jamie'],
        totalUsers: 892,
        trending: false
      },
      isNew: true,
      lastUsed: '2024-01-15'
    },
    {
      id: 'tool-4',
      name: 'Study Match',
      icon: '🤝',
      category: 'social' as const,
      rating: 4.1,
      usageCount: 67,
      socialProof: {
        friendsUsed: ['Taylor'],
        totalUsers: 334,
        trending: false
      },
      isNew: true,
      lastUsed: '2024-01-13'
    }
  ],
  
  spaces: [
    {
      id: 'space-1',
      name: 'CS Majors',
      type: 'academic' as const,
      memberCount: 1247,
      role: 'member' as const,
      activityLevel: 'active' as const,
      unreadCount: 5,
      recentActivity: {
        type: 'poll' as const,
        author: 'Sarah',
        content: 'Which programming language should we focus on for the hackathon?',
        timestamp: '2024-01-15T14:30:00Z'
      },
      upcomingEvents: {
        count: 3,
        nextEvent: 'Study Session - Thursday 7 PM'
      },
      isPrivate: false,
      color: '#3B82F6',
      icon: '🎓',
      lastActivity: '2024-01-15T15:00:00Z'
    },
    {
      id: 'space-2',
      name: 'Ellicott Complex',
      type: 'housing' as const,
      memberCount: 342,
      role: 'member' as const,
      activityLevel: 'quiet' as const,
      unreadCount: 0,
      recentActivity: {
        type: 'post' as const,
        author: 'ResidentAdvisor',
        content: 'Group pizza order tonight! Join in the common room at 6 PM',
        timestamp: '2024-01-15T12:00:00Z'
      },
      upcomingEvents: {
        count: 1,
        nextEvent: 'Floor Meeting - Friday 8 PM'
      },
      isPrivate: false,
      color: '#10B981',
      icon: '🏠',
      lastActivity: '2024-01-15T12:00:00Z'
    },
    {
      id: 'space-3',
      name: 'Mock Trial Club',
      type: 'club' as const,
      memberCount: 89,
      role: 'moderator' as const,
      activityLevel: 'busy' as const,
      unreadCount: 12,
      recentActivity: {
        type: 'announcement' as const,
        author: 'ClubPresident',
        content: 'Tournament preparation starts this week. All members please attend Thursday practice.',
        timestamp: '2024-01-15T10:00:00Z'
      },
      upcomingEvents: {
        count: 2,
        nextEvent: 'Practice - Thursday 2 PM'
      },
      isPrivate: false,
      color: '#9333EA',
      icon: '⚖️',
      lastActivity: '2024-01-15T13:45:00Z'
    }
  ],
  
  privacy: {
    ghostMode: false,
    isPublic: profile?.isPublic ?? true,
    showActivity: true,
  }
});

export default function SocialProfilePage() {
  const router = useRouter();
  const { user } = useSession();
  const { profile, isLoading, error, updateProfile } = useProfile();
  const [profileData, setProfileData] = useState<any>(null);
  
  useEffect(() => {
    if (profile) {
      setProfileData(generateMockData(profile));
    }
  }, [profile]);
  
  const handleEditProfile = () => {
    router.push('/profile/edit');
  };
  
  const handlePrivacySettings = () => {
    router.push('/profile/settings');
  };
  
  const handleSettings = () => {
    router.push('/profile/settings');
  };
  
  const handleCustomizeLayout = () => {
    // TODO: Implement layout customization
    console.log('Customize layout');
  };
  
  const handlePhotoUpload = async (file: File) => {
    // TODO: Implement photo upload
    console.log('Photo upload:', file.name);
  };
  
  if (isLoading || !profileData) {
    return <SocialProfileSkeleton />;
  }
  
  if (error) {
    return (
      <div className="social-profile-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="profile-heading text-primary mb-2">Something went wrong</h2>
            <p className="profile-body text-tertiary mb-4">
              We couldn't load your profile right now.
            </p>
            <ButtonEnhanced onClick={() => window.location.reload()} className="social-action-button">
              Try Again
            </ButtonEnhanced>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <SocialProfileLayout
      data={profileData}
      isOwn={true}
      onEditProfile={handleEditProfile}
      onPrivacySettings={handlePrivacySettings}
      onSettings={handleSettings}
      onCustomizeLayout={handleCustomizeLayout}
      onPhotoUpload={handlePhotoUpload}
    />
  );
}

function SocialProfileSkeleton() {
  return (
    <div className="social-profile-container">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
      
      {/* Bento Grid Skeleton */}
      <div className="profile-bento-grid">
        {/* Avatar Card Skeleton */}
        <div className="portrait-avatar-card">
          <div className="portrait-photo-container">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="portrait-content">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex gap-3">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>
        
        {/* Other Cards Skeletons */}
        <div className="social-profile-card" style={{ gridArea: 'calendar' }}>
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        
        <div className="social-profile-card" style={{ gridArea: 'tools' }}>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        
        <div className="social-profile-card" style={{ gridArea: 'spaces' }}>
          <Skeleton className="h-6 w-36 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        
        <div className="social-profile-card" style={{ gridArea: 'activity' }}>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        
        <div className="social-profile-card" style={{ gridArea: 'ghost' }}>
          <Skeleton className="h-6 w-28 mb-4" />
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}