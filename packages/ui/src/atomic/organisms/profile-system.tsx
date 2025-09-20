"use client";

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ProfileCard, type ActivityItem } from './profile-card';
import { ProfileHeader, type ProfileUser } from '../molecules/profile-header';
import { ProfileStats, type HiveProfileStats as ProfileStatsType } from '../molecules/profile-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { 
  LayoutGrid, 
  List, 
  Filter, 
  Search, 
  Users, 
  Zap, 
  Activity,
  Settings,
  Edit3,
  Share2
} from 'lucide-react';

const profileSystemVariants = cva(
  "min-h-screen bg-hive-background-primary",
  {
    variants: {
      layout: {
        desktop: "pb-0",
        mobile: "pb-20"
      },
      spacing: {
        tight: "px-3 py-4",
        normal: "px-4 py-6",
        loose: "px-6 py-8"
      }
    },
    defaultVariants: {
      layout: "desktop",
      spacing: "normal"
    }
  }
);

export interface ProfileSpace {
  id: string;
  name: string;
  type: 'course' | 'housing' | 'club' | 'academic' | 'community';
  role: 'member' | 'moderator' | 'leader';
  memberCount: number;
  lastActivity: string;
  isPrivate: boolean;
  color?: string;
  icon?: string
}

export interface ProfileTool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  lastUsed: string;
  usageCount: number;
  isCreated: boolean;
  isFavorite: boolean;
  rating?: number;
  tags: string[]
}

export interface ProfileSystemProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileSystemVariants> {
  user: ProfileUser;
  stats: ProfileStatsType;
  spaces: ProfileSpace[];
  tools: ProfileTool[];
  recentActivity: ActivityItem[];
  isOwnProfile?: boolean;
  loading?: boolean;
  onEditProfile?: () => void;
  onEditAvatar?: () => void;
  onShareProfile?: () => void;
  onMessageUser?: () => void;
  onFollowUser?: () => void;
  onPrivacySettings?: () => void
}

export function ProfileSystem({
  user,
  stats,
  spaces,
  tools,
  recentActivity,
  isOwnProfile = false,
  loading = false,
  onEditProfile,
  onEditAvatar,
  onShareProfile,
  onMessageUser,
  onFollowUser,
  onPrivacySettings,
  layout = "desktop",
  spacing = "normal",
  className,
  ...props
}: ProfileSystemProps) {
  
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAllSpaces, setShowAllSpaces] = useState(false);
  const [showAllTools, setShowAllTools] = useState(false);

  // Mobile detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Calculate profile completion
  const calculateCompletion = () => {
    let completed = 0;
    const total = 8;
    
    if (user.avatar) completed++;
    if (user.bio) completed++;
    if (user.location) completed++;
    if (user.major) completed++;
    if (user.website) completed++;
    if (spaces.length > 0) completed++;
    if (tools.length > 0) completed++;
    if (stats.connectionsCount > 0) completed++;
    
    return Math.round((completed / total) * 100)
  };

  const completionPercentage = calculateCompletion();

  if (loading) {
    return (
      <div className={cn(profileSystemVariants({ layout, spacing }), className)}>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Header skeleton */}
            <div className="bg-hive-surface-elevated rounded-xl p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-hive-background-primary rounded-full" />
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-hive-background-primary rounded" />
                  <div className="h-4 w-24 bg-hive-background-primary rounded" />
                </div>
              </div>
            </div>
            
            {/* Stats skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-hive-surface-elevated rounded-xl p-4 animate-pulse">
                  <div className="h-8 w-16 bg-hive-background-primary rounded mb-2" />
                  <div className="h-4 w-12 bg-hive-background-primary rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(profileSystemVariants({ layout, spacing }), className)} {...props}>
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <ProfileHeader
          user={user}
          isOwnProfile={isOwnProfile}
          onEditProfile={onEditProfile}
          onEditAvatar={onEditAvatar}
          onShareProfile={onShareProfile}
          variant="card"
          avatarSize={isMobile ? "lg" : "xl"}
          className="mb-6"
        />

        {/* Profile Completion (for own profile only) */}
        {isOwnProfile && completionPercentage < 100 && (
          <Card className="mb-6 bg-gradient-to-r from-hive-gold/10 to-hive-brand-secondary/10 border-hive-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-hive-text-primary">
                      Complete Your Profile
                    </span>
                    <span className="text-sm font-bold text-hive-gold">
                      {completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-hive-background-primary rounded-full h-2">
                    <div 
                      className="bg-hive-gold h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <ProfileStats
          stats={stats}
          layout={isMobile ? "vertical" : "grid"}
          variant="card"
          priority={user.isBuilder 
            ? ['toolsUsed', 'spacesJoined', 'reputation', 'connectionsCount']
            : ['spacesJoined', 'connectionsCount', 'currentStreak', 'reputation']
          }
          className="mb-6"
        />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-auto grid-cols-3 bg-hive-surface-elevated">
              <TabsTrigger value="overview" className="px-4 py-2">
                Overview
              </TabsTrigger>
              <TabsTrigger value="spaces" className="px-4 py-2">
                Spaces ({spaces.length})
              </TabsTrigger>
              <TabsTrigger value="tools" className="px-4 py-2">
                Tools ({tools.length})
              </TabsTrigger>
            </TabsList>
            
            {/* View Options */}
            {(activeTab === 'spaces' || activeTab === 'tools') && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors"
                >
                  {viewMode === 'grid' ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                </button>
                <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Tab Content */}
          <TabsContent value="overview" className="mt-0">
            <OverviewTab 
              user={user}
              stats={stats}
              spaces={spaces.slice(0, 6)} 
              tools={tools.slice(0, 6)}
              recentActivity={recentActivity.slice(0, 8)}
              isOwnProfile={isOwnProfile}
            />
          </TabsContent>

          <TabsContent value="spaces" className="mt-0">
            <SpacesTab 
              spaces={showAllSpaces ? spaces : spaces.slice(0, 12)} 
              viewMode={viewMode}
              showAll={showAllSpaces}
              onToggleShowAll={() => setShowAllSpaces(!showAllSpaces)}
            />
          </TabsContent>

          <TabsContent value="tools" className="mt-0">
            <ToolsTab 
              tools={showAllTools ? tools : tools.slice(0, 12)} 
              viewMode={viewMode}
              showAll={showAllTools}
              onToggleShowAll={() => setShowAllTools(!showAllTools)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Tab Components
function OverviewTab({ 
  user, 
  stats,
  spaces, 
  tools, 
  recentActivity,
  isOwnProfile 
}: {
  user: ProfileUser;
  stats: ProfileStatsType;
  spaces: ProfileSpace[];
  tools: ProfileTool[];
  recentActivity: ActivityItem[];
  isOwnProfile: boolean
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Spaces */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent Spaces
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {spaces.slice(0, 4).map((space) => (
              <SpaceItem key={space.id} space={space} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Favorite Tools */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {isOwnProfile ? 'Your Tools' : 'Created Tools'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tools.slice(0, 4).map((tool) => (
              <ToolItem key={tool.id} tool={tool} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SpacesTab({ 
  spaces, 
  viewMode, 
  showAll, 
  onToggleShowAll 
}: {
  spaces: ProfileSpace[];
  viewMode: 'grid' | 'list';
  showAll: boolean;
  onToggleShowAll: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-hive-text-primary">
          All Spaces ({spaces.length})
        </h3>
        {spaces.length > 12 && (
          <button 
            onClick={onToggleShowAll}
            className="text-hive-gold hover:underline"
          >
            {showAll ? 'Show Less' : 'Show All'}
          </button>
        )}
      </div>
      
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-3"
      )}>
        {spaces.map((space) => (
          <SpaceCard key={space.id} space={space} compact={viewMode === 'list'} />
        ))}
      </div>
    </div>
  )
}

function ToolsTab({ 
  tools, 
  viewMode, 
  showAll, 
  onToggleShowAll 
}: {
  tools: ProfileTool[];
  viewMode: 'grid' | 'list';
  showAll: boolean;
  onToggleShowAll: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-hive-text-primary">
          All Tools ({tools.length})
        </h3>
        {tools.length > 12 && (
          <button 
            onClick={onToggleShowAll}
            className="text-hive-gold hover:underline"
          >
            {showAll ? 'Show Less' : 'Show All'}
          </button>
        )}
      </div>
      
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-3"
      )}>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} compact={viewMode === 'list'} />
        ))}
      </div>
    </div>
  )
}

// Helper Components
function SpaceItem({ space }: { space: ProfileSpace }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-hive-background-interactive transition-colors">
      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
        <span className="text-sm">{space.icon || space.name[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-hive-text-primary truncate">{space.name}</h4>
        <p className="text-sm text-hive-text-secondary">{space.memberCount} members</p>
      </div>
    </div>
  )
}

function ToolItem({ tool }: { tool: ProfileTool }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-hive-background-interactive transition-colors">
      <div className="w-10 h-10 rounded-lg bg-hive-gold/20 flex items-center justify-center">
        <span className="text-sm">{tool.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-hive-text-primary truncate">{tool.name}</h4>
        <p className="text-sm text-hive-text-secondary truncate">{tool.description}</p>
      </div>
    </div>
  )
}

function SpaceCard({ space, compact = false }: { space: ProfileSpace; compact?: boolean }) {
  if (compact) {
    return <SpaceItem space={space} />
  }

  return (
    <Card className="hover:border-hive-gold/30 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <span className="text-lg">{space.icon || space.name[0]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-hive-text-primary truncate">{space.name}</h4>
            <p className="text-sm text-hive-text-secondary mb-2">{space.memberCount} members</p>
            <div className="text-xs text-hive-text-secondary">{space.role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ToolCard({ tool, compact = false }: { tool: ProfileTool; compact?: boolean }) {
  if (compact) {
    return <ToolItem tool={tool} />
  }

  return (
    <Card className="hover:border-hive-gold/30 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-hive-gold/20 flex items-center justify-center">
            <span className="text-lg">{tool.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-hive-text-primary truncate">{tool.name}</h4>
            <p className="text-sm text-hive-text-secondary mb-2 line-clamp-2">{tool.description}</p>
            <div className="text-xs text-hive-text-secondary">Used {tool.usageCount} times</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ activity }: { activity: ActivityItem }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-hive-surface-elevated/50 rounded-lg">
      <div className="flex-shrink-0 mt-0.5">
        <Activity className="h-4 w-4 text-hive-text-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-hive-text-primary">{activity.title}</h4>
        <p className="text-sm text-hive-text-secondary mb-1">{activity.description}</p>
        <div className="text-xs text-hive-text-secondary">{activity.timestamp}</div>
      </div>
    </div>
  )
}

// Export variants for external use
export { profileSystemVariants };