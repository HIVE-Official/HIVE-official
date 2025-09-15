/**
 * HIVE Complete Spaces System: Leadership & Analytics Dashboard
 * Advanced space management, analytics, and leadership tools demonstration
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../atomic/atoms/button-enhanced';
import { Badge } from '../../../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../../../components/ui/avatar';
import { HiveProgress } from '../../../../components/hive-progress';
import { Separator } from '../../../../components/ui/separator';
import { Switch } from '../../../../components/ui/switch';
import { 
  Users, 
  Settings,
  BarChart3,
  Activity,
  TrendingUp,
  Crown,
  Shield,
  Eye,
  Edit,
  Trash2,
  UserX,
  Ban,
  AlertTriangle,
  CheckCircle,
  Calendar,
  MessageSquare,
  Code,
  Star,
  Clock,
  Target,
  Zap,
  Award,
  Heart,
  ThumbsUp,
  Share,
  Download,
  Filter,
  Search,
  Grid,
  List,
  Monitor,
  Palette,
  Bell,
  Mail,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  ExternalLink,
  PieChart,
  LineChart,
  Hash,
  MapPin,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Wrench
} from 'lucide-react';
import { useState, useEffect } from 'react';
import "../../../../hive-tokens.css";

const meta = {
  title: '06-Complete-Spaces-System/Leadership & Analytics',
  component: LeadershipAnalyticsDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Leadership & Analytics Dashboard

Comprehensive space leadership tools, analytics insights, and community management features for space owners, admins, and moderators.

## Leadership Modes
- **Configure Mode**: Space settings, layout customization, and feature management
- **Insights Mode**: Advanced analytics, member insights, and performance metrics
- **Manage Mode**: Member management, content moderation, and administrative actions

## Analytics Features
- Space health scoring and performance metrics
- Member engagement and activity analytics
- Content performance and interaction data
- Growth trends and retention insights
- Real-time activity monitoring

## Management Tools
- Advanced member management with role assignments
- Content moderation and post management
- Event coordination and calendar management
- Tool deployment and configuration
- Notification and communication systems
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock analytics data
const mockAnalyticsData = {
  spaceHealth: {
    score: 8.7,
    trend: 'up',
    factors: {
      activity: 'High',
      engagement: 'Excellent',
      growth: 'Growing',
      retention: 'Strong'
    },
    alerts: [
      {
        type: 'success',
        message: 'Engagement up 23% this week',
        timestamp: '2 hours ago'
      },
      {
        type: 'warning',
        message: 'Event attendance declining',
        timestamp: '1 day ago'
      }
    ]
  },
  memberMetrics: {
    total: 127,
    active: 89,
    newThisWeek: 8,
    retention: 94,
    engagementRate: 76,
    topContributors: [
      { id: 'user1', name: 'Marcus Johnson', posts: 23, score: 95 },
      { id: 'user2', name: 'Sarah Chen', posts: 18, score: 87 },
      { id: 'user3', name: 'Alex Kim', posts: 12, score: 73 }
    ],
    activityHeatmap: [
      { hour: 8, activity: 12 },
      { hour: 10, activity: 28 },
      { hour: 12, activity: 45 },
      { hour: 14, activity: 67 },
      { hour: 16, activity: 89 },
      { hour: 18, activity: 95 },
      { hour: 20, activity: 76 },
      { hour: 22, activity: 34 }
    ]
  },
  contentMetrics: {
    postsThisWeek: 23,
    totalPosts: 156,
    avgEngagement: 84,
    topPosts: [
      { id: 'post1', title: 'Study Session Tonight', engagement: 95, type: 'coordination' },
      { id: 'post2', title: 'Best Linear Algebra Resources', engagement: 87, type: 'discussion' },
      { id: 'post3', title: 'Group Schedule Update', engagement: 76, type: 'announcement' }
    ],
    contentTypes: {
      discussion: 45,
      coordination: 35,
      announcement: 15,
      question: 5
    }
  },
  eventsMetrics: {
    upcomingEvents: 4,
    totalEvents: 28,
    avgAttendance: 78,
    rsvpRate: 85,
    popularTimes: ['Tuesday 6PM', 'Thursday 7PM', 'Sunday 2PM'],
    eventTypes: {
      study: 60,
      social: 25,
      workshop: 10,
      other: 5
    }
  },
  toolsMetrics: {
    activeTools: 7,
    totalUses: 342,
    mostUsed: 'Study Schedule Coordinator',
    toolPerformance: [
      { name: 'Study Schedule', uses: 127, rating: 4.8 },
      { name: 'Resource Hub', uses: 89, rating: 4.6 },
      { name: 'Exam Timer', uses: 76, rating: 4.5 }
    ]
  }
};

const mockModerationQueue = [
  {
    id: 'mod1',
    type: 'reported_post',
    content: 'This study session is only for CS majors, others please leave',
    author: 'Anonymous User',
    reporter: 'Sarah Chen',
    reason: 'Exclusionary behavior',
    timestamp: '1 hour ago',
    status: 'pending'
  },
  {
    id: 'mod2',
    type: 'spam_detection',
    content: 'Check out my tutoring services! DM me for rates...',
    author: 'External User',
    reporter: 'Auto-detection',
    reason: 'Potential spam/commercial',
    timestamp: '3 hours ago',
    status: 'pending'
  }
];

const mockSpaceSettings = {
  general: {
    name: 'UB Study Group - CS & Math',
    description: 'Collaborative study space for Computer Science and Mathematics students at UB.',
    privacy: 'public',
    discoverability: true,
    autoApprove: true
  },
  features: {
    enableComments: true,
    enableEvents: true,
    enableTools: true,
    enableCoordination: true,
    enablePolls: true,
    allowFileUploads: true
  },
  moderation: {
    requireApproval: false,
    autoModeration: true,
    wordFilter: true,
    spamDetection: true,
    memberReporting: true
  },
  notifications: {
    newPosts: true,
    newMembers: true,
    events: true,
    mentions: true,
    moderation: true
  }
};

function LeadershipAnalyticsDemo() {
  const [leaderMode, setLeaderMode] = useState<'configure' | 'insights' | 'manage'>('insights');
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState<'overview' | 'members' | 'content' | 'events' | 'tools'>('overview');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-[var(--hive-text-primary)]">
      
      {/* Leadership Toolbar Header */}
      <div className="border-b border-gray-800 bg-[var(--hive-black)]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Leadership Dashboard</h1>
              <p className="text-gray-400">Advanced space management and analytics</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border-[var(--hive-gold)]/30">
                Space Leader
              </Badge>
              <Badge className="text-xs" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                UB Study Group
              </Badge>
            </div>
          </div>

          {/* Leadership Mode Selector */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {[
              { id: 'configure', label: 'Configure', icon: Settings, description: 'Space settings and customization' },
              { id: 'insights', label: 'Insights', icon: BarChart3, description: 'Analytics and performance metrics' },
              { id: 'manage', label: 'Manage', icon: Users, description: 'Member and content management' }
            ].map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                onClick={() => setLeaderMode(id as unknown)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  leaderMode === id
                    ? 'text-[var(--hive-black)] hive-interactive'
                    : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
                }`}
                style={leaderMode === id ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
                title={description}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode Content */}
      <div className="max-w-7xl mx-auto p-4">
        {leaderMode === 'configure' && <ConfigureMode />}
        {leaderMode === 'insights' && (
          <InsightsMode 
            activeTab={activeAnalyticsTab}
            onTabChange={setActiveAnalyticsTab}
            isLoading={isLoading}
          />
        )}
        {leaderMode === 'manage' && <ManageMode />}
      </div>
    </div>
  );
}

// Configure Mode Component
function ConfigureMode() {
  const [settings, setSettings] = useState(mockSpaceSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Configure Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">Space Configuration</h2>
          <p className="text-gray-400 text-sm">Customize space settings, features, and appearance</p>
        </div>
        
        {hasChanges && (
          <Button 
            className="bg-green-600 text-[var(--hive-text-primary)] hover:bg-green-700"
            onClick={() => setHasChanges(false)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* General Settings */}
        <Card className="bg-green-500/10 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-green-400">
              <Settings className="w-5 h-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-[var(--hive-text-primary)] text-sm font-medium">Space Name</label>
              <input
                type="text"
                value={settings.general.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSetting('general', 'name', e.target.value)}
                className="w-full mt-1 bg-gray-900 border border-green-500/30 rounded-lg px-3 py-2 text-[var(--hive-text-primary)]"
              />
            </div>
            
            <div>
              <label className="text-[var(--hive-text-primary)] text-sm font-medium">Description</label>
              <textarea
                value={settings.general.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateSetting('general', 'description', e.target.value)}
                rows={3}
                className="w-full mt-1 bg-gray-900 border border-green-500/30 rounded-lg px-3 py-2 text-[var(--hive-text-primary)] resize-none"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[var(--hive-text-primary)] text-sm">Public Discovery</span>
                <Switch 
                  checked={settings.general.discoverability}
                  onCheckedChange={(checked: any) => updateSetting('general', 'discoverability', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--hive-text-primary)] text-sm">Auto-approve Members</span>
                <Switch 
                  checked={settings.general.autoApprove}
                  onCheckedChange={(checked: any) => updateSetting('general', 'autoApprove', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Settings */}
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-400">
              <Zap className="w-5 h-5 mr-2" />
              Features & Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(settings.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center justify-between">
                <span className="text-[var(--hive-text-primary)] text-sm capitalize">
                  {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <Switch 
                  checked={enabled as boolean}
                  onCheckedChange={(checked: any) => updateSetting('features', feature, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Moderation Settings */}
        <Card className="bg-[var(--hive-gold)]/10 border-[var(--hive-gold)]/30">
          <CardHeader>
            <CardTitle className="flex items-center text-[var(--hive-gold)]">
              <Shield className="w-5 h-5 mr-2" />
              Moderation & Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(settings.moderation).map(([setting, enabled]) => (
              <div key={setting} className="flex items-center justify-between">
                <span className="text-[var(--hive-text-primary)] text-sm capitalize">
                  {setting.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <Switch 
                  checked={enabled as boolean}
                  onCheckedChange={(checked: any) => updateSetting('moderation', setting, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-[var(--hive-gold)]/10 border-[var(--hive-gold)]/30">
          <CardHeader>
            <CardTitle className="flex items-center text-[var(--hive-gold)]">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(settings.notifications).map(([notification, enabled]) => (
              <div key={notification} className="flex items-center justify-between">
                <span className="text-[var(--hive-text-primary)] text-sm capitalize">
                  {notification.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <Switch 
                  checked={enabled as boolean}
                  onCheckedChange={(checked: any) => updateSetting('notifications', notification, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Layout Customization */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-[var(--hive-text-primary)]">
            <Palette className="w-5 h-5 mr-2" />
            Layout Customization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-600 rounded-lg">
              <Grid className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h4 className="text-[var(--hive-text-primary)] font-medium mb-1">Widget Grid</h4>
              <p className="text-gray-400 text-sm">Desktop layout with widgets</p>
              <Button size="sm" className="mt-2 bg-gray-700 text-[var(--hive-text-primary)]">Current</Button>
            </div>
            <div className="text-center p-4 border border-gray-600 rounded-lg">
              <List className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h4 className="text-[var(--hive-text-primary)] font-medium mb-1">Tab Layout</h4>
              <p className="text-gray-400 text-sm">Mobile-friendly tabs</p>
              <Button size="sm" variant="secondary" className="mt-2 border-gray-600 text-[var(--hive-text-primary)]">Available</Button>
            </div>
            <div className="text-center p-4 border border-gray-600 rounded-lg">
              <Monitor className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h4 className="text-[var(--hive-text-primary)] font-medium mb-1">Custom Layout</h4>
              <p className="text-gray-400 text-sm">Advanced customization</p>
              <Button size="sm" variant="secondary" className="mt-2 border-yellow-600 text-[var(--hive-gold)]">Pro</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Insights Mode Component
function InsightsMode({ activeTab, onTabChange, isLoading }: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-6">
      
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">Analytics Insights</h2>
          <p className="text-gray-400 text-sm">Space performance metrics and member analytics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="bg-gray-900 border border-gray-700 text-[var(--hive-text-primary)] rounded-md px-3 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
          
          <Button 
            variant="secondary"
            className="border-gray-600 text-[var(--hive-text-primary)]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'members', label: 'Members', icon: Users },
          { id: 'content', label: 'Content', icon: MessageSquare },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'tools', label: 'Tools', icon: Code }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === id
                ? 'bg-[var(--hive-gold)] text-[var(--hive-text-primary)]'
                : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      {/* Analytics Content */}
      {activeTab === 'overview' && <OverviewAnalytics isLoading={isLoading} />}
      {activeTab === 'members' && <MemberAnalytics isLoading={isLoading} />}
      {activeTab === 'content' && <ContentAnalytics isLoading={isLoading} />}
      {activeTab === 'events' && <EventAnalytics isLoading={isLoading} />}
      {activeTab === 'tools' && <ToolAnalytics isLoading={isLoading} />}
    </div>
  );
}

// Manage Mode Component
function ManageMode() {
  const [activeManageTab, setActiveManageTab] = useState<'members' | 'content' | 'moderation'>('members');

  return (
    <div className="space-y-6">
      
      {/* Management Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">Space Management</h2>
          <p className="text-gray-400 text-sm">Member management, content moderation, and administrative tools</p>
        </div>
        
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
          Administrator Mode
        </Badge>
      </div>

      {/* Management Tabs */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        {[
          { id: 'members', label: 'Member Management', icon: Users },
          { id: 'content', label: 'Content Moderation', icon: MessageSquare },
          { id: 'moderation', label: 'Moderation Queue', icon: AlertTriangle }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveManageTab(id as unknown)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              activeManageTab === id
                ? 'bg-red-500 text-[var(--hive-text-primary)]'
                : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      {/* Management Content */}
      {activeManageTab === 'members' && <MemberManagement />}
      {activeManageTab === 'content' && <ContentModeration />}
      {activeManageTab === 'moderation' && <ModerationQueue />}
    </div>
  );
}

// Analytics Components
function OverviewAnalytics({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--hive-gold)]" />
        <span className="ml-3 text-gray-400">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Space Health Score */}
      <Card className="bg-[var(--hive-gold)]/10 border-[var(--hive-gold)]/30">
        <CardHeader>
          <CardTitle className="flex items-center text-[var(--hive-gold)]">
            <Target className="w-5 h-5 mr-2" />
            Space Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--hive-text-primary)]">{mockAnalyticsData.spaceHealth.score}</div>
              <div className="text-sm text-gray-400">Overall Score</div>
            </div>
            <div className="flex items-center text-green-400">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="text-sm">Trending up</span>
            </div>
          </div>
          
          <div className="mb-4">
            <HiveProgress value={mockAnalyticsData.spaceHealth.score * 10} className="bg-gray-700" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {Object.entries(mockAnalyticsData.spaceHealth.factors).map(([factor, status]) => (
              <div key={factor}>
                <div className={`text-sm font-medium ${
                  status === 'Excellent' || status === 'High' ? 'text-green-400' :
                  status === 'Good' || status === 'Growing' ? 'text-blue-400' :
                  'text-[var(--hive-gold)]'
                }`}>
                  {status}
                </div>
                <div className="text-xs text-gray-400 capitalize">{factor}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mockAnalyticsData.memberMetrics.total}</div>
            <div className="text-sm text-gray-400">Total Members</div>
            <div className="text-xs text-green-400 mt-1">+{mockAnalyticsData.memberMetrics.newThisWeek} this week</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mockAnalyticsData.memberMetrics.active}</div>
            <div className="text-sm text-gray-400">Active Members</div>
            <div className="text-xs text-blue-400 mt-1">{mockAnalyticsData.memberMetrics.engagementRate}% engagement</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-[var(--hive-gold)] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mockAnalyticsData.contentMetrics.postsThisWeek}</div>
            <div className="text-sm text-gray-400">Posts This Week</div>
            <div className="text-xs text-[var(--hive-gold)] mt-1">{mockAnalyticsData.contentMetrics.avgEngagement}% avg engagement</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-[var(--hive-gold)] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mockAnalyticsData.eventsMetrics.upcomingEvents}</div>
            <div className="text-sm text-gray-400">Upcoming Events</div>
            <div className="text-xs text-green-400 mt-1">{mockAnalyticsData.eventsMetrics.avgAttendance}% attendance</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-[var(--hive-text-primary)]">
            <Bell className="w-5 h-5 mr-2" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAnalyticsData.spaceHealth.alerts.map((alert, index) => (
              <div key={index} className={`flex items-start p-3 rounded-lg ${
                alert.type === 'success' ? 'bg-green-500/10 border-l-4 border-green-400' :
                'bg-[var(--hive-gold)]/10 border-l-4 border-[var(--hive-gold)]'
              }`}>
                <div className="flex-1">
                  <p className="text-[var(--hive-text-primary)] text-sm">{alert.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{alert.timestamp}</p>
                </div>
                <Button size="sm" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MemberAnalytics({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="space-y-6">
      
      {/* Member Growth Chart */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Member Growth & Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-900/50 rounded-lg">
            <div className="text-center">
              <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400">Activity heatmap and growth trends would be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Top Contributors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalyticsData.memberMetrics.topContributors.map((contributor, index) => (
              <div key={contributor.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-[var(--hive-gold)] flex items-center justify-center text-[var(--hive-text-primary)] text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-[var(--hive-text-primary)] font-medium">{contributor.name}</div>
                    <div className="text-gray-400 text-sm">{contributor.posts} posts</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[var(--hive-text-primary)] font-medium">{contributor.score}</div>
                  <div className="text-gray-400 text-sm">score</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ContentAnalytics({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="space-y-6">
      
      {/* Content Performance */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Top Performing Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalyticsData.contentMetrics.topPosts.map((post: any) => (
              <div key={post.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-[var(--hive-text-primary)] font-medium">{post.title}</h4>
                  <Badge variant="secondary" className="text-xs mt-1 border-blue-400/50 text-blue-400">
                    {post.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-[var(--hive-text-primary)] font-medium">{post.engagement}%</div>
                  <div className="text-gray-400 text-sm">engagement</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Type Distribution */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Content Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(mockAnalyticsData.contentMetrics.contentTypes).map(([type, percentage]) => (
              <div key={type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--hive-text-primary)] capitalize">{type}</span>
                  <span className="text-gray-400">{percentage}%</span>
                </div>
                <HiveProgress value={percentage as number} className="bg-gray-700" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EventAnalytics({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="space-y-6">
      
      {/* Event Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-[var(--hive-gold)] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mockAnalyticsData.eventsMetrics.totalEvents}</div>
            <div className="text-sm text-gray-400">Total Events</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mockAnalyticsData.eventsMetrics.avgAttendance}%</div>
            <div className="text-sm text-gray-400">Avg Attendance</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{mockAnalyticsData.eventsMetrics.rsvpRate}%</div>
            <div className="text-sm text-gray-400">RSVP Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Times */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Popular Event Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAnalyticsData.eventsMetrics.popularTimes.map((time, index) => (
              <div key={index} className="text-center p-3 bg-gray-900/50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-[var(--hive-text-primary)] font-medium">{time}</div>
                <div className="text-gray-400 text-sm">Peak attendance</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ToolAnalytics({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="space-y-6">
      
      {/* Tool Performance */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Tool Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalyticsData.toolsMetrics.toolPerformance.map((tool: any) => (
              <div key={tool.name} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <div className="flex items-center">
                  <Code className="w-6 h-6 text-cyan-400 mr-3" />
                  <div>
                    <div className="text-[var(--hive-text-primary)] font-medium">{tool.name}</div>
                    <div className="text-gray-400 text-sm">{tool.uses} uses • {tool.rating}★ rating</div>
                  </div>
                </div>
                <Button size="sm" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Management Components
function MemberManagement() {
  return (
    <div className="space-y-4">
      <div className="text-center py-8 text-gray-400">
        <Users className="w-12 h-12 mx-auto mb-3" />
        <p>Advanced member management interface would be displayed here</p>
        <p className="text-sm">Including bulk actions, role management, and member analytics</p>
      </div>
    </div>
  );
}

function ContentModeration() {
  return (
    <div className="space-y-4">
      <div className="text-center py-8 text-gray-400">
        <Shield className="w-12 h-12 mx-auto mb-3" />
        <p>Content moderation tools would be displayed here</p>
        <p className="text-sm">Including post management, comment moderation, and content filtering</p>
      </div>
    </div>
  );
}

function ModerationQueue() {
  return (
    <div className="space-y-4">
      {mockModerationQueue.map((item) => (
        <Card key={item.id} className="bg-[var(--hive-gold)]/10 border-[var(--hive-gold)]/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="border-[var(--hive-gold)]/50 text-[var(--hive-gold)] text-xs">
                    {item.type.replace('_', ' ')}
                  </Badge>
                  <span className="text-gray-400 text-sm">{item.timestamp}</span>
                </div>
                <p className="text-[var(--hive-text-primary)] mb-2">{item.content}</p>
                <p className="text-gray-400 text-sm">
                  Reported by {item.reporter} • Reason: {item.reason}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" className="bg-green-600 text-[var(--hive-text-primary)] hover:bg-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="secondary" className="border-red-600 text-red-400">
                  <Ban className="w-3 h-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export const LeadershipDashboard: Story = {
  render: () => <LeadershipAnalyticsDemo />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const ConfigureModeDemo: Story = {
  render: () => {
    const Component = () => {
      const [leaderMode] = useState('configure');
      return <LeadershipAnalyticsDemo />;
    };
    return <Component />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const InsightsModeDemo: Story = {
  render: () => {
    const Component = () => {
      const [leaderMode] = useState('insights');
      return <LeadershipAnalyticsDemo />;
    };
    return <Component />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const ManageModeDemo: Story = {
  render: () => {
    const Component = () => {
      const [leaderMode] = useState('manage');
      return <LeadershipAnalyticsDemo />;
    };
    return <Component />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};