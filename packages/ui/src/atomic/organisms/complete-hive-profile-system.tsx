'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Card } from '../atoms/card';
import { Button } from '../atoms/button';
import { Badge } from '../atoms/badge';
import { Avatar } from '../atoms/avatar';
import {
  User,
  Settings,
  Camera,
  MapPin,
  GraduationCap,
  Calendar,
  Users,
  Zap,
  Activity,
  Clock,
  Star,
  Edit3,
  ChevronRight
} from 'lucide-react';
import { ProfileBentoGrid } from './profile-bento-grid';

export interface CompleteHIVEProfileSystemProps {
  user?: any;
  stats?: any;
  editMode?: boolean;
  onEditModeToggle?: () => void;
  onWidgetConfigure?: (widgetId: string) => void;
  completeness?: any;
  onUploadAvatar?: (file: File) => void;
  onToggleGhostMode?: () => void;
  loading?: boolean;
  error?: string | null;
}

export const CompleteHIVEProfileSystem: React.FC<CompleteHIVEProfileSystemProps> = ({
  user,
  stats,
  editMode = false,
  onEditModeToggle,
  onWidgetConfigure,
  completeness,
  onUploadAvatar,
  onToggleGhostMode,
  loading = false,
  error = null
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'spaces' | 'tools'>('overview');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Mock profile data for demo purposes - simple structure for bento grid
  const mockProfileSystem = useMemo(() => ({
    userId: user?.id || 'demo-user',
    campusId: 'ub-buffalo',
    handle: user?.handle || 'demo-handle',
    identity: {
      academic: {},
      photoCarousel: { photos: [] },
      badges: []
    },
    connections: {
      friends: [
        { id: '1', name: 'Sarah Chen', avatar: '', lastSeen: new Date(), sharedSpaces: ['cs-370', 'study-hall'] },
        { id: '2', name: 'Mike Rodriguez', avatar: '', lastSeen: new Date(), sharedSpaces: ['math-club'] },
        { id: '3', name: 'Emma Thompson', avatar: '', lastSeen: new Date(), sharedSpaces: ['cs-370'] }
      ],
      connections: [
        { id: '4', name: 'Alex Kim', avatar: '', connectionDate: new Date(), sharedSpaces: ['ub-builders'] },
        { id: '5', name: 'Jordan Smith', avatar: '', connectionDate: new Date(), sharedSpaces: ['design-collective'] }
      ]
    },
    presence: {
      vibe: 'Focused on finals',
      beacon: { active: true, location: 'Lockwood Library' },
      lastActive: new Date()
    },
    intelligence: {
      overlaps: [
        { type: 'class', name: 'CSE 370', time: '10:00 AM', building: 'Davis Hall' },
        { type: 'study', name: 'Math Study Group', time: '2:00 PM', building: 'Knox Hall' }
      ],
      suggestions: [
        { type: 'space', name: 'UB Data Science Club', relevance: 0.9, reason: 'Matches your interests' },
        { type: 'event', name: 'Career Fair Prep', relevance: 0.8, reason: 'Popular with your major' }
      ]
    },
    personal: {},
    privacy: {},
    grid: {
      cards: [
        { id: 'spaces-hub', type: 'spaces_hub', size: '2x1' as const, position: { x: 0, y: 0 }, visible: true },
        { id: 'friends-network', type: 'friends_network', size: '1x1' as const, position: { x: 2, y: 0 }, visible: true },
        { id: 'schedule-overlap', type: 'schedule_overlap', size: '1x1' as const, position: { x: 3, y: 0 }, visible: true },
        { id: 'active-now', type: 'active_now', size: '1x1' as const, position: { x: 0, y: 1 }, visible: true },
        { id: 'vibe-check', type: 'vibe_check', size: '1x1' as const, position: { x: 1, y: 1 }, visible: true },
        { id: 'discovery', type: 'discovery', size: '2x1' as const, position: { x: 2, y: 1 }, visible: true }
      ],
      mobileLayout: [
        { id: 'spaces-hub', type: 'spaces_hub', size: '2x1' as const, position: { x: 0, y: 0 }, visible: true },
        { id: 'friends-network', type: 'friends_network', size: '1x1' as const, position: { x: 0, y: 1 }, visible: true },
        { id: 'active-now', type: 'active_now', size: '1x1' as const, position: { x: 1, y: 1 }, visible: true },
        { id: 'vibe-check', type: 'vibe_check', size: '2x1' as const, position: { x: 0, y: 2 }, visible: true }
      ],
      lastModified: new Date()
    }
  } as any), [user]);

  const handleAvatarUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onUploadAvatar) return;

    setIsUploadingAvatar(true);
    try {
      await onUploadAvatar(file);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    } finally {
      setIsUploadingAvatar(false);
    }
  }, [onUploadAvatar]);

  if (loading) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-accent mx-auto mb-4"></div>
          <p className="text-hive-text-secondary">Loading profile dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <Card className="max-w-md">
          <div className="p-6 text-center">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Profile Error</h3>
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hive-background-primary">
      {/* Mobile-first responsive layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-hive-text-primary">
              Profile Dashboard
            </h1>
            <p className="text-hive-text-secondary text-sm">
              Welcome back, {user?.name?.split(' ')[0] || 'Student'}
            </p>
          </div>
          <div className="flex gap-2">
            {onEditModeToggle && (
              <Button
                variant="outline"
                onClick={onEditModeToggle}
                className="flex items-center gap-2"
                size="sm"
              >
                <Settings size={16} />
                {editMode ? 'Save' : 'Edit Profile'}
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-hive-accent/10 to-blue-600/10 h-32 relative">
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
          <div className="p-6 -mt-16 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              {/* Avatar Section */}
              <div className="relative">
                <div className="w-24 h-24 border-4 border-hive-background-primary shadow-lg bg-hive-background-secondary rounded-full overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user?.name || 'User'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={40} className="text-hive-text-secondary" />
                    </div>
                  )}
                </div>
                {onUploadAvatar && (
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-hive-accent rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                    <Camera size={16} className="text-hive-background-primary" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                )}
                {isUploadingAvatar && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-hive-text-primary">
                    {user?.name || 'User Name'}
                  </h2>
                  {user?.isBuilder && (
                    <Badge variant="secondary" className="bg-hive-accent/10 text-hive-accent border-hive-accent/20 w-fit">
                      <Zap size={12} className="mr-1" />
                      Builder
                    </Badge>
                  )}
                </div>

                <p className="text-hive-text-secondary mb-2">@{user?.handle || 'handle'}</p>

                {user?.bio && (
                  <p className="text-hive-text-primary mb-3">{user.bio}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-hive-text-secondary">
                  {user?.school && (
                    <div className="flex items-center gap-1">
                      <GraduationCap size={14} />
                      <span>{user.school}</span>
                    </div>
                  )}
                  {user?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user?.memberSince && (
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Joined {new Date(user.memberSince).getFullYear()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              {user?.isOnline && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Online</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent mb-1">
                {stats?.spaces || mockProfileSystem.connections.connections.length}
              </div>
              <div className="text-xs text-hive-text-secondary">Spaces</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent mb-1">
                {stats?.connections || mockProfileSystem.connections.friends.length}
              </div>
              <div className="text-xs text-hive-text-secondary">Friends</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent mb-1">
                {stats?.tools || 0}
              </div>
              <div className="text-xs text-hive-text-secondary">Tools</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent mb-1">
                {completeness?.percentage || 75}%
              </div>
              <div className="text-xs text-hive-text-secondary">Complete</div>
            </div>
          </Card>
        </div>

        {/* Profile Completeness */}
        {completeness && completeness.percentage < 100 && (
          <Card className="mb-6 border-hive-accent/20">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-hive-text-primary">
                  Complete your profile ({completeness.completed}/{completeness.total})
                </h3>
                <Button variant="ghost" size="sm" onClick={onEditModeToggle}>
                  <Edit3 size={14} className="mr-1" />
                  Update
                </Button>
              </div>
              <div className="w-full bg-hive-background-secondary rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-hive-accent to-blue-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${completeness.percentage || 0}%` }}
                />
              </div>
              <p className="text-xs text-hive-text-secondary">
                Complete your profile to get better recommendations and connect with more students
              </p>
            </div>
          </Card>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-hive-background-secondary/50 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'activity', label: 'Activity', icon: Activity },
            { id: 'spaces', label: 'Spaces', icon: Users },
            { id: 'tools', label: 'Tools', icon: Zap }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                  ${activeTab === tab.id
                    ? 'bg-hive-background-primary text-hive-text-primary shadow-sm'
                    : 'text-hive-text-secondary hover:text-hive-text-primary'
                  }
                `}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Bento Grid */}
            <ProfileBentoGrid
              profile={mockProfileSystem}
              editable={editMode}
              onLayoutChange={(layout) => console.log('Layout changed:', layout)}
            />

            {/* Recent Activity */}
            <Card>
              <div className="p-4 border-b border-hive-border">
                <h3 className="font-semibold text-hive-text-primary">Recent Activity</h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { action: 'Joined', target: 'CS 370 Study Group', time: '2 hours ago', icon: Users },
                  { action: 'Created', target: 'GPA Calculator Tool', time: '1 day ago', icon: Zap },
                  { action: 'Connected with', target: 'Sarah Chen', time: '2 days ago', icon: User }
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-hive-accent/10 rounded-full flex items-center justify-center">
                        <Icon size={14} className="text-hive-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-hive-text-primary">
                          {activity.action} <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-hive-text-secondary">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'activity' && (
          <Card>
            <div className="p-6 text-center">
              <Activity size={48} className="text-hive-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Activity Timeline</h3>
              <p className="text-hive-text-secondary">Your activity timeline will appear here</p>
            </div>
          </Card>
        )}

        {activeTab === 'spaces' && (
          <Card>
            <div className="p-6 text-center">
              <Users size={48} className="text-hive-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Your Spaces</h3>
              <p className="text-hive-text-secondary">Spaces you've joined will appear here</p>
            </div>
          </Card>
        )}

        {activeTab === 'tools' && (
          <Card>
            <div className="p-6 text-center">
              <Zap size={48} className="text-hive-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Your Tools</h3>
              <p className="text-hive-text-secondary">Tools you've created will appear here</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};