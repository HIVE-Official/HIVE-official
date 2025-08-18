"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../framer-motion-proxy';
import { 
  Edit3, 
  Settings, 
  Share2, 
  MoreHorizontal,
  Camera,
  Crown,
  Shield,
  Eye,
  EyeOff,
  Bell,
  MessageSquare,
  UserPlus,
  Calendar,
  Activity,
  Award,
  TrendingUp,
  Users,
  Zap,
  BookOpen,
  MapPin,
  Link,
  Clock,
  Star,
  Heart,
  Bookmark,
  Grid,
  List,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
// import { UniversalBottomNav } from '../navigation/universal-bottom-nav'; // Component doesn't exist
import { cn } from '../../lib/utils';

// Enhanced User Interface
export interface UniversalProfileUser {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: string;
  lastActive: string;
  
  // Academic Info
  major?: string;
  gradYear?: string;
  school?: string;
  gpa?: number;
  
  // Status & Privacy
  isBuilder: boolean;
  builderLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  isVerified: boolean;
  ghostMode: boolean;
  onlineStatus: 'online' | 'offline' | 'away' | 'busy';
  
  // Stats
  stats: {
    spacesJoined: number;
    spacesLed: number;
    toolsCreated: number;
    toolsUsed: number;
    connectionsCount: number;
    totalActivity: number;
    weekStreak: number;
    reputation: number;
  };
  
  // Preferences
  preferences: {
    showActivity: boolean;
    showSpaces: boolean;
    showConnections: boolean;
    allowMessages: boolean;
    showOnlineStatus: boolean;
  };
}

interface ProfileSpace {
  id: string;
  name: string;
  type: 'course' | 'housing' | 'club' | 'academic' | 'community';
  role: 'member' | 'moderator' | 'leader';
  memberCount: number;
  lastActivity: string;
  isPrivate: boolean;
  color: string;
  icon?: string;
}

interface ProfileTool {
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
  tags: string[];
}

interface ActivityItem {
  id: string;
  type: 'space_joined' | 'tool_created' | 'tool_used' | 'connection_made' | 'achievement_earned';
  title: string;
  description: string;
  timestamp: string;
  metadata?: any;
}

interface UniversalProfileSystemProps {
  user: UniversalProfileUser;
  spaces: ProfileSpace[];
  tools: ProfileTool[];
  recentActivity: ActivityItem[];
  isOwnProfile: boolean;
  isLoading?: boolean;
  onEditProfile?: () => void;
  onMessageUser?: () => void;
  onFollowUser?: () => void;
  onShareProfile?: () => void;
  onPrivacySettings?: () => void;
  className?: string;
}

export function UniversalProfileSystem({
  user,
  spaces,
  tools,
  recentActivity,
  isOwnProfile,
  isLoading = false,
  onEditProfile,
  onMessageUser,
  onFollowUser,
  onShareProfile,
  onPrivacySettings,
  className
}: UniversalProfileSystemProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAllSpaces, setShowAllSpaces] = useState(false);
  const [showAllTools, setShowAllTools] = useState(false);

  // Profile completion calculation
  const calculateCompletion = () => {
    let completed = 0;
    const total = 10;
    
    if (user.avatar) completed++;
    if (user.bio) completed++;
    if (user.location) completed++;
    if (user.major) completed++;
    if (user.gradYear) completed++;
    if (user.website) completed++;
    if (spaces.length > 0) completed++;
    if (tools.length > 0) completed++;
    if (user.stats.connectionsCount > 0) completed++;
    if (user.isVerified) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  // Get online status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-hive-background-primary">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 bg-[var(--hive-brand-secondary)]/20 rounded-full animate-pulse mx-auto mb-4" />
            <p className="text-hive-text-secondary">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-hive-background-primary pb-20 lg:pb-0", className)}>
      {/* Compact Header */}
      <div className="relative">
        {/* Smaller Cover Image */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-hive-gold/20 via-hive-brand-secondary/20 to-hive-gold/20 relative overflow-hidden">
          {user.coverImage ? (
            <img 
              src={user.coverImage} 
              alt={`${user.name}'s cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-hive-gold/10 via-transparent to-hive-brand-secondary/10" />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-hive-background-primary/50 to-transparent" />
          
          {/* Cover Actions */}
          {isOwnProfile && (
            <div className="absolute top-4 right-4">
              <Button variant="secondary" size="sm" className="bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border-white/20">
                <Camera className="h-4 w-4 mr-2" />
                Edit Cover
              </Button>
            </div>
          )}
        </div>

        {/* Compact Profile Header */}
        <div className="relative px-4 sm:px-6 -mt-12">
          <div className="flex flex-row items-end gap-4">
            {/* Smaller Avatar */}
            <div className="relative">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-hive-background-primary bg-hive-surface-elevated">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {/* Online Status */}
              {user.preferences.showOnlineStatus && (
                <div className={cn(
                  "absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-hive-background-primary",
                  getStatusColor(user.onlineStatus)
                )} />
              )}
              
              {/* Edit Avatar */}
              {isOwnProfile && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-hive-surface-elevated border border-hive-border-subtle"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Compact Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-hive-text-primary truncate">
                      {user.name}
                    </h1>
                    {user.isVerified && (
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-400/20">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {user.isBuilder && (
                      <Badge variant="secondary" className="bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-hive-gold/20">
                        <Crown className="h-3 w-3 mr-1" />
                        Builder
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-hive-text-secondary mb-2">@{user.handle}</p>
                  
                  {user.bio && (
                    <p className="text-hive-text-primary mb-3 max-w-2xl">{user.bio}</p>
                  )}
                  
                  {/* Profile Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-hive-text-secondary">
                    {user.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.website && (
                      <div className="flex items-center gap-1">
                        <Link className="h-4 w-4" />
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-[var(--hive-brand-secondary)] hover:underline">
                          {user.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {isOwnProfile ? (
                    <>
                      <Button variant="secondary" onClick={onEditProfile}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="secondary" onClick={onPrivacySettings}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={onMessageUser}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="secondary" onClick={onFollowUser}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="ghost" size="sm" onClick={onShareProfile}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Stats Bar */}
      <div className="px-4 sm:px-6 mt-4">
        <div className="bg-hive-surface-elevated rounded-xl p-4 border border-hive-border-subtle">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-hive-text-primary">{formatNumber(user.stats.spacesJoined)}</div>
              <div className="text-xs text-hive-text-secondary">Spaces</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-hive-text-primary">{formatNumber(user.stats.connectionsCount)}</div>
              <div className="text-xs text-hive-text-secondary">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-hive-text-primary">{formatNumber(user.stats.toolsCreated)}</div>
              <div className="text-xs text-hive-text-secondary">Tools</div>
            </div>
            <div className="text-center hidden sm:block">
              <div className="text-lg sm:text-xl font-bold text-hive-text-primary">{formatNumber(user.stats.reputation)}</div>
              <div className="text-xs text-hive-text-secondary">Reputation</div>
            </div>
            <div className="text-center hidden lg:block">
              <div className="text-lg sm:text-xl font-bold text-hive-text-primary">{user.stats.weekStreak}</div>
              <div className="text-xs text-hive-text-secondary">Streak</div>
            </div>
            <div className="text-center hidden lg:block">
              <div className="text-lg sm:text-xl font-bold text-hive-text-primary">{formatNumber(user.stats.totalActivity)}</div>
              <div className="text-xs text-hive-text-secondary">Activity</div>
            </div>
            <div className="text-center hidden lg:block">
              <div className="text-lg sm:text-xl font-bold text-[var(--hive-brand-secondary)]">{completionPercentage}%</div>
              <div className="text-xs text-hive-text-secondary">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Compact Tab Navigation */}
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid w-auto grid-cols-4 bg-hive-surface-elevated">
              <TabsTrigger value="overview" className="px-3 py-2">Overview</TabsTrigger>
              <TabsTrigger value="spaces" className="px-3 py-2">Spaces</TabsTrigger>
              <TabsTrigger value="tools" className="px-3 py-2">Tools</TabsTrigger>
              <TabsTrigger value="activity" className="px-3 py-2">Activity</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            <TabsContent value="overview" className="mt-0">
              <OverviewTab 
                user={user} 
                spaces={spaces.slice(0, 6)} 
                tools={tools.slice(0, 6)}
                recentActivity={recentActivity.slice(0, 10)}
                viewMode={viewMode}
                completionPercentage={completionPercentage}
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

            <TabsContent value="activity" className="mt-0">
              <ActivityTab activity={recentActivity} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Universal Bottom Navigation */}
      {/* <UniversalBottomNav user={user} /> Component doesn't exist */}
    </div>
  );
}

// Individual Tab Components
function OverviewTab({ 
  user, 
  spaces, 
  tools, 
  recentActivity, 
  viewMode, 
  completionPercentage 
}: {
  user: UniversalProfileUser;
  spaces: ProfileSpace[];
  tools: ProfileTool[];
  recentActivity: ActivityItem[];
  viewMode: 'grid' | 'list';
  completionPercentage: number;
}) {
  return (
    <div className="space-y-4">
      {/* Profile Completion Card - Compact */}
      {completionPercentage < 100 && (
        <Card className="bg-hive-surface-elevated border-hive-border-subtle">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Star className="h-5 w-5 text-[var(--hive-brand-secondary)] flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-1">
                  <span className="text-sm font-medium text-hive-text-primary">Complete Your Profile</span>
                  <span className="text-sm font-medium text-[var(--hive-brand-secondary)]">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-hive-background-primary rounded-full h-2">
                  <div 
                    className="bg-[var(--hive-brand-secondary)] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Spaces & Tools */}
        <div className="space-y-4">
          {/* Recent Spaces - Compact */}
          <Card className="bg-hive-surface-elevated border-hive-border-subtle">
            <CardHeader className="pb-3">
              <CardTitle className="text-hive-text-primary text-lg">Recent Spaces</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {spaces.slice(0, 4).map((space) => (
                  <SpaceCard key={space.id} space={space} compact={true} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Favorite Tools - Compact */}
          <Card className="bg-hive-surface-elevated border-hive-border-subtle">
            <CardHeader className="pb-3">
              <CardTitle className="text-hive-text-primary text-lg">Favorite Tools</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {tools.filter(tool => tool.isFavorite).slice(0, 3).map((tool) => (
                  <ToolCard key={tool.id} tool={tool} compact={true} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity */}
        <Card className="bg-hive-surface-elevated border-hive-border-subtle">
          <CardHeader className="pb-3">
            <CardTitle className="text-hive-text-primary text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {recentActivity.slice(0, 8).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
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
  onToggleShowAll: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-hive-text-primary">
          All Spaces ({spaces.length})
        </h3>
        {spaces.length > 12 && (
          <Button variant="ghost" onClick={onToggleShowAll}>
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
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
  );
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
  onToggleShowAll: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-hive-text-primary">
          All Tools ({tools.length})
        </h3>
        {tools.length > 12 && (
          <Button variant="ghost" onClick={onToggleShowAll}>
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
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
  );
}

function ActivityTab({ activity }: { activity: ActivityItem[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-hive-text-primary">
        Activity Feed ({activity.length})
      </h3>
      
      <div className="space-y-4">
        {activity.map((item) => (
          <ActivityItem key={item.id} activity={item} />
        ))}
      </div>
    </div>
  );
}

// Helper Components
function SpaceCard({ space, compact = false }: { space: ProfileSpace; compact?: boolean }) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'leader': return 'text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10';
      case 'moderator': return 'text-purple-400 bg-purple-400/10';
      default: return 'text-hive-text-secondary bg-hive-surface-elevated';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle hover:border-hive-gold/30 transition-colors cursor-pointer">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: space.color + '20', color: space.color }}
        >
          {space.icon || space.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-hive-text-primary truncate">{space.name}</h4>
          <p className="text-sm text-hive-text-secondary">{space.memberCount} members</p>
        </div>
        <Badge className={getRoleColor(space.role)}>
          {space.role}
        </Badge>
      </div>
    );
  }

  return (
    <Card className="bg-hive-surface-elevated border-hive-border-subtle hover:border-hive-gold/30 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: space.color + '20', color: space.color }}
          >
            {space.icon || space.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-hive-text-primary truncate">{space.name}</h4>
            <p className="text-sm text-hive-text-secondary mb-2">{space.memberCount} members</p>
            <div className="flex items-center gap-2">
              <Badge className={getRoleColor(space.role)}>
                {space.role}
              </Badge>
              {space.isPrivate && (
                <Badge variant="secondary">Private</Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ToolCard({ tool, compact = false }: { tool: ProfileTool; compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle hover:border-hive-gold/30 transition-colors cursor-pointer">
        <div className="w-10 h-10 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center text-lg">
          {tool.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-hive-text-primary truncate">{tool.name}</h4>
          <p className="text-sm text-hive-text-secondary truncate">{tool.description}</p>
        </div>
        <div className="flex items-center gap-1">
          {tool.isFavorite && <Heart className="h-4 w-4 text-red-400 fill-current" />}
          {tool.isCreated && <Crown className="h-4 w-4 text-[var(--hive-brand-secondary)]" />}
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-hive-surface-elevated border-hive-border-subtle hover:border-hive-gold/30 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center text-xl">
            {tool.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-hive-text-primary truncate">{tool.name}</h4>
              {tool.isFavorite && <Heart className="h-4 w-4 text-red-400 fill-current" />}
              {tool.isCreated && <Crown className="h-4 w-4 text-[var(--hive-brand-secondary)]" />}
            </div>
            <p className="text-sm text-hive-text-secondary mb-2 line-clamp-2">{tool.description}</p>
            <div className="flex items-center justify-between text-xs text-hive-text-secondary">
              <span>Used {tool.usageCount} times</span>
              {tool.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span>{tool.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ activity }: { activity: ActivityItem }) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'space_joined': return <Users className="h-4 w-4 text-blue-400" />;
      case 'tool_created': return <Zap className="h-4 w-4 text-[var(--hive-brand-secondary)]" />;
      case 'tool_used': return <Activity className="h-4 w-4 text-green-400" />;
      case 'connection_made': return <UserPlus className="h-4 w-4 text-purple-400" />;
      case 'achievement_earned': return <Award className="h-4 w-4 text-yellow-400" />;
      default: return <Activity className="h-4 w-4 text-hive-text-secondary" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-hive-surface-elevated/50 rounded-lg">
      <div className="flex-shrink-0 mt-0.5">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-hive-text-primary">{activity.title}</h4>
        <p className="text-sm text-hive-text-secondary mb-1">{activity.description}</p>
        <div className="flex items-center gap-1 text-xs text-hive-text-secondary">
          <Clock className="h-3 w-3" />
          <span>{activity.timestamp}</span>
        </div>
      </div>
    </div>
  );
}