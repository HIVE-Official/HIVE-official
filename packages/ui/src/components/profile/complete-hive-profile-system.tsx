'use client';

import React, { useState } from 'react';
import { motion } from '../framer-motion-proxy';
import { 
  User, 
  Settings, 
  Edit3, 
  Calendar, 
  Users, 
  Zap, 
  Eye, 
  EyeOff, 
  Upload,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { ProfileHeader } from './profile-header';
import { ProfileStats } from './profile-stats';
import { MySpacesFeed } from './my-spaces-feed';
import { CalendarCard } from './calendar-card';
import { CampusConnections } from './campus-connections';
import { HiveLabSection } from './hive-lab-section';

// Enhanced Profile System component for production integration
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
  error?: string | null
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
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  // Loading state with skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Loader2 className="h-8 w-8 animate-spin text-[#FFD700] mx-auto mb-4" />
              <p className="text-gray-300">Loading your HIVE profile...</p>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <HiveCard className="p-6 text-center max-w-md">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Profile Error</h2>
              <p className="text-gray-400 mb-4">{error}</p>
              <HiveButton onClick={() => window.location.reload()}>
                Try Again
              </HiveButton>
            </HiveCard>
          </div>
        </div>
      </div>
    )
  }

  // Handle missing user data
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <HiveCard className="p-6 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Profile Not Found</h2>
              <p className="text-gray-400">Unable to load profile data</p>
            </HiveCard>
          </div>
        </div>
      </div>
    )
  }

  const mockSpaces = [
    {
      id: '1',
      name: 'CS 350 - Data Structures',
      type: 'course' as const,
      memberCount: 124,
      unreadCount: 3,
      lastActivity: '2h ago',
      recentPosts: []
    },
    {
      id: '2', 
      name: 'Governors Hall Floor 3',
      type: 'housing' as const,
      memberCount: 32,
      unreadCount: 7,
      lastActivity: '15m ago',
      recentPosts: []
    }
  ];

  const mockEvents = [
    {
      id: '1',
      title: 'CS 350 Lecture',
      time: '10:00 AM',
      type: 'class' as const,
      location: 'Davis Hall 101',
      attendees: []
    },
    {
      id: '2',
      title: 'Study Group',
      time: '2:00 PM', 
      type: 'academic' as const,
      location: 'Library',
      attendees: []
    }
  ];

  const mockConnections = [
    {
      id: '1',
      type: 'dorm_classmate' as const,
      message: '3 floor mates also in CS 350',
      people: ['Sarah K.', 'Mike R.', 'Alex P.'],
      action: 'Start study group'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileHeader
            user={user}
            showOnboarding={false}
            showPrivacyBanner={false}
            showGraduationBanner={false}
            completionStatus={completeness}
            onEditProfile={onEditModeToggle}
            onPrivacySettings={() => console.log('Privacy settings')}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HiveCard className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              <div className="flex items-center gap-2">
                {user?.privacy?.ghostMode && (
                  <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    <EyeOff className="w-3 h-3" />
                    Ghost Mode
                  </div>
                )}
                <HiveButton
                  variant="ghost"
                  size="sm"
                  onClick={onEditModeToggle}
                  className="text-gray-400 hover:text-white"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  {editMode ? 'Done' : 'Edit'}
                </HiveButton>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button 
                onClick={() => onWidgetConfigure?.('avatar')}
                className="flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm text-white">Avatar</span>
              </button>
              
              <button 
                onClick={onToggleGhostMode}
                className="flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {user?.privacy?.ghostMode ? (
                  <Eye className="w-4 h-4 text-green-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm text-white">Privacy</span>
              </button>
              
              <button 
                onClick={() => onWidgetConfigure?.('settings')}
                className="flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white">Settings</span>
              </button>
              
              <button 
                onClick={() => onWidgetConfigure?.('stats')}
                className="flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white">Stats</span>
              </button>
            </div>
          </HiveCard>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Profile Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ProfileStats 
                stats={stats || user?.stats}
              />
            </motion.div>

            {/* My Spaces Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <MySpacesFeed
                spaces={mockSpaces}
                onSpaceClick={(spaceId) => console.log('Space clicked:', spaceId)}
                onJoinSpace={() => console.log('Join space')}
              />
            </motion.div>

            {/* HIVE Lab Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HiveLabSection
                hiveLab={{
                  isLocked: false,
                  availableTools: [],
                  createdTools: [],
                  comingSoon: []
          }}
                onCreateTool={() => console.log('Create tool')}
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CalendarCard
                data={{
                  nextEvent: mockEvents[0],
                  upcomingEvents: mockEvents,
                  todaysEvents: mockEvents,
                  connections: [],
                  conflicts: [],
                  lastUpdated: new Date()
          }}
                state="default"
                onEventClick={(event) => console.log('Event clicked:', event.id)}
              />
            </motion.div>

            {/* Campus Connections */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CampusConnections
                connections={mockConnections}
                onConnectionClick={(connectionId) => console.log('Connection clicked:', connectionId)}
              />
            </motion.div>
          </div>
        </div>

        {/* Profile Completeness Banner */}
        {completeness && completeness.percentage < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <HiveCard className="p-4 border-l-4 border-[#FFD700]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1">Complete Your Profile</h4>
                  <p className="text-sm text-gray-400">
                    {completeness.percentage}% complete • {completeness.missing?.length || 0} items remaining
                  </p>
                </div>
                <HiveButton 
                  size="sm"
                  onClick={() => onWidgetConfigure?.('completeness')}
                  className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                >
                  Complete <ChevronRight className="w-4 h-4 ml-1" />
                </HiveButton>
              </div>
            </HiveCard>
          </motion.div>
        )}
      </div>
    </div>
  )
};