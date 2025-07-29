"use client";

import { 
  PageContainer, 
  Button, 
  Card, 
  CalendarCard, 
  adaptSmartCalendarProps as _adaptSmartCalendarProps,
  PersonalTools as _PersonalTools,
  Badge,
  Progress as _Progress,
} from '@hive/ui';
import { 
  User, 
  Plus as _Plus, 
  Zap, 
  Users, 
  TrendingUp as _TrendingUp, 
  Clock, 
  Star, 
  Award, 
  Calendar, 
  Settings, 
  ArrowRight, 
  BarChart3 as _BarChart3, 
  Target as _Target, 
  Activity,
  Bell,
  Sparkles as _Sparkles,
  Eye,
  EyeOff,
  RefreshCw as _RefreshCw,
  Grid as _Grid,
  ChevronRight as _ChevronRight,
  BookOpen,
  MessageCircle as _MessageCircle,
  Heart,
  Ghost as _Ghost,
  Upload,
  Edit3,
  MapPin as _MapPin,
  GraduationCap,
  Hash as _Hash,
  Wrench,
  Home as _Home
} from 'lucide-react';
import { useSession } from '../../../hooks/use-session';
import { useCalendarData } from '../../../hooks/use-calendar-data';
import { useDashboardData as _useDashboardData } from '../../../hooks/use-dashboard-data';
import { useState, useEffect } from 'react';

// Profile data interfaces per @hive.md Personal Campus Dashboard
interface ProfileData {
  user: {
    id: string;
    fullName: string;
    handle: string;
    profilePhotoUrl?: string;
    major?: string;
    academicYear?: string;
    housing?: string;
    pronouns?: string;
    bio?: string;
    joinedAt: string;
    lastActive: string;
    isBuilder: boolean;
    ghostMode: boolean;
  };
  stats: {
    spacesJoined: number;
    spacesActive: number;
    toolsBuilt: number;
    toolsUsed: number;
    connectionsCount: number;
    weekStreak: number;
    reputation: number;
    achievements: number;
  };
  spaces: Array<{
    id: string;
    name: string;
    type: string;
    memberCount: number;
    role: string;
    lastActivity: string;
    isActive: boolean;
  }>;
  tools: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    lastUsed: string;
    usageCount: number;
    isCreated: boolean;
    isFavorite: boolean;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'space' | 'tool' | 'social' | 'academic';
    action: string;
    title: string;
    timestamp: string;
    metadata?: any;
  }>;
}

export default function ProfilePage() {
  const { user } = useSession();
  const { data: calendarData, state: calendarState } = useCalendarData();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Mock profile data (in production, this would come from API)
  useEffect(() => {
    const mockData: ProfileData = {
      user: {
        id: user?.uid || 'user-1',
        fullName: user?.fullName || 'Jacob Student',
        handle: user?.handle || 'jacob_student',
        profilePhotoUrl: user?.profilePhotoUrl,
        major: 'Computer Science',
        academicYear: 'Junior',
        housing: 'Ellicott Complex, Red 3rd Floor',
        pronouns: 'he/him',
        bio: 'Building tools to optimize campus life. Always down to collaborate on projects!',
        joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        lastActive: new Date().toISOString(),
        isBuilder: true,
        ghostMode: false
      },
      stats: {
        spacesJoined: 12,
        spacesActive: 5,
        toolsBuilt: 8,
        toolsUsed: 24,
        connectionsCount: 156,
        weekStreak: 12,
        reputation: 2340,
        achievements: 7
      },
      spaces: [
        {
          id: 'space-1',
          name: 'CS Study Group',
          type: 'academic',
          memberCount: 89,
          role: 'moderator',
          lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isActive: true
        },
        {
          id: 'space-2',
          name: 'Ellicott Complex',
          type: 'housing',
          memberCount: 1892,
          role: 'member',
          lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          isActive: true
        },
        {
          id: 'space-3',
          name: 'Mock Trial Club',
          type: 'student',
          memberCount: 23,
          role: 'member',
          lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          isActive: true
        }
      ],
      tools: [
        {
          id: 'tool-1',
          name: 'GPA Calculator',
          description: 'Calculate semester and cumulative GPA',
          category: 'academic',
          lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          usageCount: 45,
          isCreated: true,
          isFavorite: true
        },
        {
          id: 'tool-2',
          name: 'Study Session Timer',
          description: 'Pomodoro timer for focused studying',
          category: 'productivity',
          lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          usageCount: 23,
          isCreated: false,
          isFavorite: true
        }
      ],
      recentActivity: [
        {
          id: '1',
          type: 'tool',
          action: 'created',
          title: 'GPA Calculator v2.0',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          type: 'space',
          action: 'joined',
          title: 'Mock Trial Club',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        }
      ]
    };
    
    setProfileData(mockData);
    setIsLoading(false);
  }, [user]);

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  if (!user || !profileData || isLoading) {
    return (
      <PageContainer title="Loading Profile..." maxWidth="xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-white">Loading your profile...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Your Profile"
      subtitle="Personal Campus Dashboard"
      breadcrumbs={[
        { label: "Profile", icon: User }
      ]}
      actions={
        <div className="flex items-center space-x-3">
          {/* Ghost Mode Toggle */}
          <Button 
            variant={profileData.user.ghostMode ? "default" : "outline"} 
            size="sm"
            className={profileData.user.ghostMode ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            {profileData.user.ghostMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {profileData.user.ghostMode ? 'Ghost Mode' : 'Visible'}
          </Button>
          
          {/* Edit Profile */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          
          {/* Settings */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/settings'}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      }
      maxWidth="xl"
    >
      {/* Bento Grid Layout per @hive.md */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Avatar Card (1x1) */}
        <Card className="p-6 bg-hive-background-overlay border-hive-border-default hover:bg-hive-background-interactive transition-colors">
          <div className="text-center">
            {/* Profile Photo */}
            <div className="relative mx-auto mb-4">
              {profileData.user.profilePhotoUrl ? (
                <img 
                  src={profileData.user.profilePhotoUrl} 
                  alt={profileData.user.fullName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-hive-gold to-hive-champagne rounded-full flex items-center justify-center text-2xl font-bold text-hive-obsidian">
                  {profileData.user.fullName.charAt(0).toUpperCase()}
                </div>
              )}
              {editMode && (
                <Button size="sm" className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-hive-gold text-hive-obsidian">
                  <Upload className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            {/* Name & Info */}
            <h2 className="text-xl font-semibold text-white mb-1">{profileData.user.fullName}</h2>
            <p className="text-hive-text-mutedLight text-sm mb-2">@{profileData.user.handle}</p>
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                <GraduationCap className="h-3 w-3 mr-1" />
                {profileData.user.academicYear}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <BookOpen className="h-3 w-3 mr-1" />
                {profileData.user.major}
              </Badge>
            </div>
            
            {/* Builder Status */}
            {profileData.user.isBuilder && (
              <Badge className="bg-hive-gold text-hive-obsidian text-xs mb-3">
                <Wrench className="h-3 w-3 mr-1" />
                Builder
              </Badge>
            )}
            
            {/* Bio */}
            {profileData.user.bio && (
              <p className="text-sm text-hive-text-mutedLight leading-relaxed">
                {profileData.user.bio}
              </p>
            )}
          </div>
        </Card>

        {/* Calendar Card (2x1) */}
        <div className="md:col-span-2">
          <CalendarCard
            state={calendarState}
            data={calendarData}
            variant="desktop"
            onViewCalendar={() => window.location.href = '/calendar'}
            onConnectCalendar={(type) => console.log('Connect calendar:', type)}
            onAddEvent={() => console.log('Add event clicked')}
            onSyncCalendar={(connectionId) => console.log('Sync calendar:', connectionId)}
            onEventClick={(event) => console.log('Event clicked:', event)}
            onResolveConflict={(conflictId) => console.log('Resolve conflict:', conflictId)}
          />
        </div>

        {/* Tools Card (1x2) */}
        <Card className="row-span-2 p-6 bg-hive-background-overlay border-hive-border-default">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Zap className="h-5 w-5 mr-2 text-purple-400" />
              Your Tools
            </h3>
            <Badge variant="secondary" className="text-xs">
              {profileData.stats.toolsBuilt} built
            </Badge>
          </div>
          
          <div className="space-y-3 mb-4">
            {profileData.tools.slice(0, 4).map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-3 rounded-lg bg-hive-background-tertiary hover:bg-hive-background-interactive transition-colors cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white group-hover:text-hive-gold transition-colors">
                      {tool.name}
                    </p>
                    <p className="text-xs text-hive-text-mutedLight">
                      Used {tool.usageCount} times
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {tool.isCreated && (
                    <Badge variant="outline" className="text-xs">Created</Badge>
                  )}
                  {tool.isFavorite && (
                    <Heart className="h-3 w-3 text-pink-400 fill-current" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => window.location.href = '/tools'}
          >
            View All Tools
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Card>

        {/* HiveLab Card (1x1) */}
        <Card className="p-6 bg-gradient-to-br from-hive-gold/10 to-hive-champagne/10 border-hive-gold/20 hover:bg-hive-background-interactive transition-colors cursor-pointer group"
              onClick={() => window.location.href = '/tools/hivelab'}>
          <div className="text-center">
            <div className="w-12 h-12 bg-hive-gold rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Wrench className="h-6 w-6 text-hive-obsidian" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-hive-gold transition-colors">HiveLab</h3>
            <p className="text-sm text-hive-text-mutedLight mb-3">
              {profileData.user.isBuilder ? 'Build new tools' : 'Unlock with Builder status'}
            </p>
            <Badge className="bg-hive-gold text-hive-obsidian text-xs">
              {profileData.stats.toolsBuilt} tools built
            </Badge>
          </div>
        </Card>

        {/* Activity Card (2x1) */}
        <div className="md:col-span-2">
          <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </h3>
              <Button variant="ghost" size="sm" className="text-hive-gold">
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {profileData.recentActivity.slice(0, 3).map((activity) => {
                const getActivityIcon = () => {
                  switch (activity.type) {
                    case 'tool': return <Zap className="h-4 w-4 text-purple-400" />;
                    case 'space': return <Users className="h-4 w-4 text-blue-400" />;
                    case 'social': return <Heart className="h-4 w-4 text-pink-400" />;
                    case 'academic': return <BookOpen className="h-4 w-4 text-green-400" />;
                    default: return <Activity className="h-4 w-4 text-gray-400" />;
                  }
                };
                
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-hive-background-tertiary hover:bg-hive-background-interactive transition-colors">
                    <div className="flex-shrink-0 mt-0.5">
                      {getActivityIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm">
                        {activity.action} <span className="text-hive-gold">{activity.title}</span>
                      </p>
                      <p className="text-xs text-hive-text-mutedLight mt-1">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Spaces Card (1x2) */}
        <Card className="row-span-2 p-6 bg-hive-background-overlay border-hive-border-default">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-400" />
              Your Spaces
            </h3>
            <Badge variant="secondary" className="text-xs">
              {profileData.stats.spacesActive}/{profileData.stats.spacesJoined}
            </Badge>
          </div>
          
          <div className="space-y-3 mb-4">
            {profileData.spaces.slice(0, 4).map((space) => {
              const getSpaceColor = (type: string) => {
                switch (type) {
                  case 'academic': return 'bg-blue-500';
                  case 'housing': return 'bg-green-500';
                  case 'student': return 'bg-purple-500';
                  default: return 'bg-gray-500';
                }
              };
              
              return (
                <div key={space.id} className="flex items-center justify-between p-3 rounded-lg bg-hive-background-tertiary hover:bg-hive-background-interactive transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${getSpaceColor(space.type)} rounded-lg flex items-center justify-center`}>
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white group-hover:text-hive-gold transition-colors">
                        {space.name}
                      </p>
                      <p className="text-xs text-hive-text-mutedLight">
                        {space.memberCount} members • {space.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {space.isActive && (
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => window.location.href = '/spaces'}
          >
            Browse All Spaces
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Card>

        {/* Ghost Mode Card (1x1) */}
        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:bg-hive-background-interactive transition-colors cursor-pointer">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              {profileData.user.ghostMode ? <EyeOff className="h-6 w-6 text-white" /> : <Eye className="h-6 w-6 text-white" />}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ghost Mode</h3>
            <p className="text-sm text-hive-text-mutedLight mb-3">
              Currently: {profileData.user.ghostMode ? 'Hidden' : 'Visible'}
            </p>
            <Button 
              variant={profileData.user.ghostMode ? "default" : "outline"} 
              size="sm"
              className={profileData.user.ghostMode ? "bg-purple-600 hover:bg-purple-700" : "border-purple-500 text-purple-400 hover:bg-purple-500/10"}
            >
              {profileData.user.ghostMode ? 'Turn Off' : 'Turn On'}
            </Button>
          </div>
        </Card>

        {/* Settings Card (2x1) */}
        <div className="md:col-span-2">
          <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Quick Settings
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" size="sm" className="justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Privacy
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <Users className="h-6 w-6 mx-auto mb-2 text-blue-400" />
          <div className="text-lg font-bold text-white">{profileData.stats.connectionsCount}</div>
          <div className="text-xs text-hive-text-mutedLight">Connections</div>
        </Card>
        
        <Card className="p-4 text-center bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <Star className="h-6 w-6 mx-auto mb-2 text-purple-400" />
          <div className="text-lg font-bold text-white">{profileData.stats.reputation}</div>
          <div className="text-xs text-hive-text-mutedLight">Reputation</div>
        </Card>
        
        <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <Award className="h-6 w-6 mx-auto mb-2 text-green-400" />
          <div className="text-lg font-bold text-white">{profileData.stats.achievements}</div>
          <div className="text-xs text-hive-text-mutedLight">Achievements</div>
        </Card>
        
        <Card className="p-4 text-center bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <Clock className="h-6 w-6 mx-auto mb-2 text-orange-400" />
          <div className="text-lg font-bold text-white">{profileData.stats.weekStreak}</div>
          <div className="text-xs text-hive-text-mutedLight">Day Streak</div>
        </Card>
      </div>
    </PageContainer>
  );
}