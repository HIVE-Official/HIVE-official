/**
 * HIVE Cross-System Integration
 * Demonstrates how Feed & Rituals system integrates with Profile, Spaces, and HiveLAB systems
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import { HiveProgress } from '../../components/hive-progress';
import { Separator } from '../../components/ui/separator';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Activity,
  Users,
  Zap,
  User,
  Home,
  Search, 
  Filter, 
  Plus,
  Calendar,
  MapPin,
  Clock,
  Star,
  Heart,
  MessageSquare,
  Share,
  MoreVertical,
  Bell,
  Settings,
  BookOpen,
  TrendingUp,
  Award,
  Target,
  Flame,
  Coffee,
  Moon,
  Sun,
  Repeat,
  CheckCircle,
  Timer,
  Camera,
  Image,
  Link,
  Smile,
  Sparkles,
  Compass,
  Globe,
  ChevronRight,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Info,
  ArrowRight,
  Network,
  Database,
  Layers,
  GitBranch,
  Workflow,
  RefreshCw
} from 'lucide-react';
import { useState, useEffect } from 'react';
import '../../hive-tokens.css';

const meta = {
  title: '06-Platform Systems/Cross-System Integration',
  component: CrossSystemIntegration,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Cross-System Integration

Demonstrates the seamless integration between Feed & Rituals system and other HIVE systems (Profile, Spaces, HiveLAB). Shows real-time data flow, activity aggregation, and coordinated user experiences.

## Integration Features
- **Profile Integration**: Achievement celebrations, tool usage highlights, customization showcases
- **Spaces Integration**: Community events, tool installations, membership activity, leadership updates  
- **HiveLAB Integration**: Tool creation milestones, community impact, innovation showcases
- **Real-Time Synchronization**: Live activity aggregation and cross-system updates
- **Coordinated UX**: Consistent navigation and state management across systems
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data demonstrating cross-system integration
const mockCrossSystemActivity = {
  profileActivities: [
    {
      id: 'profile_1',
      type: 'profile_achievement',
      user: { name: 'Sarah Chen', handle: '@sarahc', avatar: 'SC' },
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      data: {
        achievement: 'Profile Master',
        description: 'Completed full profile customization',
        completionRate: 100,
        impact: 'Increased discoverability by 340%'
      },
      integration: {
        feedDisplay: 'Profile achievement celebration',
        spaceRelevance: ['UB Photography Club', 'CSE 442 Study Group'],
        ritualConnection: 'Week 1 Initialize objective completed'
      }
    },
    {
      id: 'profile_2',
      type: 'privacy_update',
      user: { name: 'Jordan Kim', handle: '@jordank', avatar: 'JK' },
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      data: {
        update: 'Ghost Mode Configured',
        description: 'Fine-tuned privacy settings for campus coordination',
        visibility: 'Study groups and academic spaces only'
      },
      integration: {
        feedDisplay: 'Privacy configuration completed',
        ritualConnection: 'Week 2 Discover privacy objective'
      }
    }
  ],

  spacesActivities: [
    {
      id: 'space_1',
      type: 'space_event',
      space: { name: 'Ellicott 3rd Floor', type: 'campus_living', memberCount: 47 },
      organizer: { name: 'Marcus Rodriguez', handle: '@marcusr', avatar: 'MR' },
      timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      data: {
        event: {
          title: 'Floor Study Marathon',
          time: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
          location: 'Ellicott Common Room',
          attendees: 23,
          coordination: 'Bring laptops, snacks provided'
        }
      },
      integration: {
        feedDisplay: 'Urgent coordination opportunity',
        profileRelevance: 'Matches study habits and schedule',
        toolIntegration: 'Study group coordination tool available'
      }
    },
    {
      id: 'space_2',
      type: 'tool_installation',
      space: { name: 'CSE 442 - Software Engineering', type: 'academic', memberCount: 89 },
      installer: { name: 'Alex Kim', handle: '@alexk', avatar: 'AK' },
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      data: {
        tool: {
          name: 'Project Team Matcher',
          description: 'Algorithm-based team formation for final projects',
          impact: 'Reduced team formation time by 80%',
          usage: 67
        }
      },
      integration: {
        feedDisplay: 'New coordination tool available',
        profileBenefit: 'Matches your React/Node.js skills',
        communityValue: 'Solving common team formation problem'
      }
    },
    {
      id: 'space_3',
      type: 'membership_milestone',
      space: { name: 'UB Photography Club', type: 'interest', memberCount: 156 },
      timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
      data: {
        milestone: '150 Member Milestone',
        description: 'Photography Club reaches largest size in 5 years',
        celebration: 'Special golden hour event this weekend',
        growth: '+40% this semester'
      },
      integration: {
        feedDisplay: 'Community milestone celebration',
        memberBenefit: 'Increased networking opportunities',
        eventCreation: 'Weekend celebration event auto-created'
      }
    }
  ],

  hivelabActivities: [
    {
      id: 'tool_1',
      type: 'tool_creation',
      creator: { name: 'Riley Foster', handle: '@rileyf', avatar: 'RF', isBuilder: true },
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      data: {
        tool: {
          name: 'Campus WiFi Optimizer',
          description: 'Real-time WiFi speed monitoring and optimal location finder',
          category: 'Campus Services',
          deploymentSpaces: ['Lockwood Library', 'Student Union', 'Engineering Building'],
          earlyUsers: 89,
          successRate: 96
        },
        innovation: {
          problemSolved: 'Inconsistent campus WiFi performance',
          studentImpact: '300+ hours saved weekly campus-wide',
          viralPotential: 'Very high - universal student need'
        }
      },
      integration: {
        feedDisplay: 'Innovation showcase and adoption opportunity',
        spaceDeployment: 'Automatically offered to relevant spaces',
        profileHighlight: 'Creator featured in builder community'
      }
    },
    {
      id: 'tool_2',
      type: 'community_impact',
      tool: { name: 'Study Room Finder', creator: '@alexk' },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      data: {
        impact: {
          totalUsage: 2847,
          studentsHelped: 456,
          timesSaved: '1,200+ hours this week',
          satisfaction: 94
        },
        expansion: {
          newSpaces: ['Medical Library', 'Law Library'],
          communityRequests: 34,
          adoptionRate: '89% of daily active students'
        }
      },
      integration: {
        feedDisplay: 'Tool success story and community impact',
        creatorRecognition: 'Builder achievement unlocked',
        spaceIntegration: 'Deployment requests from 12 new communities'
      }
    }
  ]
};

// Integration flow demonstration data
const mockIntegrationFlows = {
  profileToFeed: {
    trigger: 'Profile customization completed',
    process: [
      'Profile system detects completion',
      'Achievement data aggregated',
      'Feed content generated with community context',
      'Personalized distribution to relevant spaces',
      'Social proof and engagement tracking'
    ],
    outcome: 'Community celebrates achievement, drives peer engagement'
  },
  spaceToFeed: {
    trigger: 'Space event created',
    process: [
      'Space system captures event creation',
      'Member interests and availability analyzed',
      'Feed content prioritized by urgency and relevance',
      'Coordination tools automatically suggested',
      'Real-time RSVP and participation tracking'
    ],
    outcome: 'Optimal participation and successful coordination'
  },
  toolToFeed: {
    trigger: 'HiveLAB tool deployment',
    process: [
      'Tool creation milestone reached',
      'Community impact and problem-solving value assessed',
      'Feed content optimized for adoption and usage',
      'Creator recognition and community value highlighting',
      'Cross-space deployment facilitation'
    ],
    outcome: 'Rapid tool adoption and community problem-solving'
  }
};

// Real-time synchronization status
const mockSyncStatus = {
  systems: [
    { name: 'Profile System', status: 'active', lastSync: '2s ago', events: 145 },
    { name: 'Spaces System', status: 'active', lastSync: '1s ago', events: 289 },
    { name: 'HiveLAB System', status: 'active', lastSync: '3s ago', events: 67 },
    { name: 'Admin System', status: 'active', lastSync: '5s ago', events: 12 }
  ],
  performance: {
    avgResponseTime: '120ms',
    syncSuccess: 99.7,
    dataConsistency: 99.9,
    userExperienceScore: 4.8
  }
};

function CrossSystemIntegration() {
  const [activeTab, setActiveTab] = useState('live-feed');
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [showIntegrationFlow, setShowIntegrationFlow] = useState(false);

  // Simulate real-time activity updates
  const [activityCount, setActivityCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActivityCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Combine all activities for the feed
  const allActivities = [
    ...mockCrossSystemActivity.profileActivities.map(a => ({ ...a, system: 'profile' })),
    ...mockCrossSystemActivity.spacesActivities.map(a => ({ ...a, system: 'spaces' })),
    ...mockCrossSystemActivity.hivelabActivities.map(a => ({ ...a, system: 'hivelab' }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filteredActivities = selectedSystem === 'all' 
    ? allActivities 
    : allActivities.filter(a => a.system === selectedSystem);

  const getSystemIcon = (system: string) => {
    switch (system) {
      case 'profile': return <User className="w-5 h-5" />;
      case 'spaces': return <Users className="w-5 h-5" />;
      case 'hivelab': return <Zap className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getSystemColor = (system: string) => {
    switch (system) {
      case 'profile': return 'text-green-400 bg-green-500/20';
      case 'spaces': return 'text-blue-400 bg-blue-500/20';
      case 'hivelab': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Network className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">System Integration</h1>
                  <p className="text-gray-400">Cross-system data flow & synchronization</p>
                </div>
              </div>
              
              {/* Integration Status */}
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>All Systems Active</span>
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-600 text-white hover:bg-gray-800"
                onClick={() => setShowIntegrationFlow(!showIntegrationFlow)}
              >
                <Workflow className="w-4 h-4 mr-2" />
                {showIntegrationFlow ? 'Hide' : 'Show'} Flows
              </Button>
              <Button size="icon" variant="outline" className="border-gray-600 text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="border-gray-600 text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="live-feed" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Activity className="w-4 h-4 mr-2" />
                Live Integration
              </TabsTrigger>
              <TabsTrigger value="data-flows" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <GitBranch className="w-4 h-4 mr-2" />
                Data Flows
              </TabsTrigger>
              <TabsTrigger value="sync-status" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                <Database className="w-4 h-4 mr-2" />
                Sync Status
              </TabsTrigger>
              <TabsTrigger value="coordination" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Layers className="w-4 h-4 mr-2" />
                Coordination
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* System Filters */}
          {activeTab === 'live-feed' && (
            <div className="flex items-center space-x-2 mt-4">
              <div className="flex-1 flex space-x-2">
                {[
                  { id: 'all', label: 'All Systems', count: allActivities.length, icon: Globe },
                  { id: 'profile', label: 'Profile', count: mockCrossSystemActivity.profileActivities.length, icon: User },
                  { id: 'spaces', label: 'Spaces', count: mockCrossSystemActivity.spacesActivities.length, icon: Users },
                  { id: 'hivelab', label: 'HiveLAB', count: mockCrossSystemActivity.hivelabActivities.length, icon: Zap },
                ].map(({ id, label, count, icon: Icon }) => (
                  <Button
                    key={id}
                    size="sm"
                    variant={selectedSystem === id ? "default" : "outline"}
                    onClick={() => setSelectedSystem(id)}
                    className={selectedSystem === id 
                      ? "bg-blue-500 text-white border-blue-400"
                      : "border-gray-600 text-white hover:bg-gray-800"
                    }
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {label} ({count})
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        
        <TabsContent value="live-feed" className="mt-0">
          {/* Integration Activity Feed */}
          <div className="space-y-6">
            
            {/* Activity Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{activityCount + 156}</div>
                  <div className="text-sm text-gray-400">Cross-System Events</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-4 text-center">
                  <div className="text-2xl font-bold text-green-400">99.7%</div>
                  <div className="text-sm text-gray-400">Integration Success</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">120ms</div>
                  <div className="text-sm text-gray-400">Avg Response Time</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="pt-4 text-center">
                  <div className="text-2xl font-bold text-orange-400">4.8</div>
                  <div className="text-sm text-gray-400">UX Score</div>
                </CardContent>
              </Card>
            </div>

            {/* Integrated Activity Stream */}
            <div className="space-y-6">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-200">
                  <CardContent className="p-6">
                    
                    {/* Activity Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        {/* System Indicator */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getSystemColor(activity.system)}`}>
                          {getSystemIcon(activity.system)}
                        </div>
                        
                        {/* User Info */}
                        <div className="flex-1">
                          {activity.user && (
                            <div className="flex items-center space-x-2 mb-1">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                                  {activity.user.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-white">{activity.user.name}</span>
                              <span className="text-gray-400 text-sm">{activity.user.handle}</span>
                              {activity.creator?.isBuilder && (
                                <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400">
                                  Builder
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          {/* Space Context */}
                          {activity.space && (
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <span>in</span>
                              <span className="font-medium text-blue-400">{activity.space.name}</span>
                              <span>•</span>
                              <span>{activity.space.memberCount} members</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* System Badge & Time */}
                      <div className="text-right">
                        <Badge className={`mb-2 text-xs ${getSystemColor(activity.system)}`}>
                          {activity.system} system
                        </Badge>
                        <div className="text-xs text-gray-400">
                          {formatTimeAgo(activity.timestamp)}
                        </div>
                      </div>
                    </div>

                    {/* Activity Content */}
                    <div className="space-y-4">
                      
                      {/* Profile Activities */}
                      {activity.type === 'profile_achievement' && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <Award className="w-5 h-5 text-green-400" />
                            <h4 className="font-semibold text-white">{activity.data.achievement}</h4>
                          </div>
                          <p className="text-gray-300 mb-3">{activity.data.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-green-400 font-medium">
                              Impact: {activity.data.impact}
                            </div>
                            <Badge className="bg-green-500/20 text-green-400">
                              {activity.data.completionRate}% complete
                            </Badge>
                          </div>
                        </div>
                      )}

                      {activity.type === 'privacy_update' && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <Settings className="w-5 h-5 text-blue-400" />
                            <h4 className="font-semibold text-white">{activity.data.update}</h4>
                          </div>
                          <p className="text-gray-300 mb-2">{activity.data.description}</p>
                          <div className="text-sm text-blue-400">
                            Visibility: {activity.data.visibility}
                          </div>
                        </div>
                      )}

                      {/* Space Activities */}
                      {activity.type === 'space_event' && (
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-5 h-5 text-orange-400" />
                              <h4 className="font-semibold text-white">{activity.data.event.title}</h4>
                            </div>
                            <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600">
                              RSVP ({activity.data.event.attendees})
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center space-x-1 text-gray-300">
                              <Clock className="w-4 h-4" />
                              <span>{activity.data.event.time.toLocaleTimeString()}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-300">
                              <MapPin className="w-4 h-4" />
                              <span>{activity.data.event.location}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-300">
                              <Users className="w-4 h-4" />
                              <span>{activity.data.event.attendees} attending</span>
                            </div>
                          </div>
                          <div className="mt-3 text-sm text-gray-400">
                            {activity.data.event.coordination}
                          </div>
                        </div>
                      )}

                      {activity.type === 'tool_installation' && (
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Zap className="w-5 h-5 text-purple-400" />
                              <h4 className="font-semibold text-white">{activity.data.tool.name}</h4>
                            </div>
                            <Button size="sm" className="bg-purple-500 text-white hover:bg-purple-600">
                              Try Tool
                            </Button>
                          </div>
                          <p className="text-gray-300 mb-3">{activity.data.tool.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="text-sm">
                              <span className="text-gray-400">Impact: </span>
                              <span className="text-purple-400 font-medium">{activity.data.tool.impact}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-400">Usage: </span>
                              <span className="text-white font-medium">{activity.data.tool.usage} students</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activity.type === 'membership_milestone' && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            <h4 className="font-semibold text-white">{activity.data.milestone}</h4>
                          </div>
                          <p className="text-gray-300 mb-3">{activity.data.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-yellow-400 font-medium">
                              Growth: {activity.data.growth}
                            </div>
                            <div className="text-sm text-gray-400">
                              {activity.data.celebration}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* HiveLAB Activities */}
                      {activity.type === 'tool_creation' && (
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Sparkles className="w-5 h-5 text-purple-400" />
                              <h4 className="font-semibold text-white">New Innovation: {activity.data.tool.name}</h4>
                            </div>
                            <Badge className="bg-purple-500/20 text-purple-400">
                              {activity.data.tool.successRate}% success rate
                            </Badge>
                          </div>
                          <p className="text-gray-300 mb-3">{activity.data.tool.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 text-sm">
                            <div>
                              <span className="text-gray-400">Problem: </span>
                              <span className="text-white">{activity.data.innovation.problemSolved}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Impact: </span>
                              <span className="text-green-400">{activity.data.innovation.studentImpact}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Early Users: </span>
                              <span className="text-blue-400">{activity.data.tool.earlyUsers}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {activity.data.tool.deploymentSpaces.map((space) => (
                              <Badge key={space} variant="outline" className="text-xs bg-purple-500/10 text-purple-400">
                                {space}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {activity.type === 'community_impact' && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            <h4 className="font-semibold text-white">Tool Impact Report: {activity.tool.name}</h4>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div className="text-center p-3 bg-gray-700 rounded">
                              <div className="text-lg font-bold text-white">{activity.data.impact.totalUsage}</div>
                              <div className="text-xs text-gray-400">Total Usage</div>
                            </div>
                            <div className="text-center p-3 bg-gray-700 rounded">
                              <div className="text-lg font-bold text-green-400">{activity.data.impact.studentsHelped}</div>
                              <div className="text-xs text-gray-400">Students Helped</div>
                            </div>
                            <div className="text-center p-3 bg-gray-700 rounded">
                              <div className="text-lg font-bold text-blue-400">{activity.data.impact.satisfaction}%</div>
                              <div className="text-xs text-gray-400">Satisfaction</div>
                            </div>
                            <div className="text-center p-3 bg-gray-700 rounded">
                              <div className="text-lg font-bold text-purple-400">{activity.data.expansion.newSpaces.length}</div>
                              <div className="text-xs text-gray-400">New Spaces</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-400">
                            <strong className="text-green-400">{activity.data.impact.timesSaved}</strong> saved this week
                          </div>
                        </div>
                      )}

                      {/* Integration Details */}
                      {activity.integration && (
                        <div className="bg-gray-700 rounded-lg p-3 mt-4">
                          <div className="text-xs text-gray-400 mb-2">Cross-System Integration:</div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-2">
                              <Activity className="w-3 h-3 text-blue-400" />
                              <span className="text-gray-300">Feed Display: {activity.integration.feedDisplay}</span>
                            </div>
                            {activity.integration.spaceRelevance && (
                              <div className="flex items-center space-x-2">
                                <Users className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">Space Relevance: {activity.integration.spaceRelevance.join(', ')}</span>
                              </div>
                            )}
                            {activity.integration.ritualConnection && (
                              <div className="flex items-center space-x-2">
                                <Target className="w-3 h-3 text-purple-400" />
                                <span className="text-gray-300">Ritual Connection: {activity.integration.ritualConnection}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                          <Heart className="w-4 h-4 mr-1" />
                          Appreciate
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Comment
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                          <Share className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs bg-gray-800 text-gray-400">
                          Auto-aggregated from {activity.system}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data-flows" className="mt-0">
          {/* Integration Flow Visualization */}
          <div className="space-y-8">
            {Object.entries(mockIntegrationFlows).map(([flowKey, flow]) => (
              <Card key={flowKey} className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center space-x-2">
                    <GitBranch className="w-5 h-5" />
                    <span>{flow.trigger}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Process Steps */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">Integration Process:</h4>
                      <div className="space-y-2">
                        {flow.process.map((step, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                              {index + 1}
                            </div>
                            <div className="text-gray-300">{step}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Outcome */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="font-semibold text-white">Expected Outcome:</span>
                      </div>
                      <p className="text-gray-300">{flow.outcome}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sync-status" className="mt-0">
          {/* System Synchronization Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* System Status Overview */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSyncStatus.systems.map((system) => (
                  <div key={system.name} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        system.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <div className="font-medium text-white">{system.name}</div>
                        <div className="text-sm text-gray-400">Last sync: {system.lastSync}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        system.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {system.status}
                      </Badge>
                      <div className="text-sm text-gray-400 mt-1">{system.events} events/min</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(mockSyncStatus.performance).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                      </span>
                      <span className="text-white font-medium">
                        {typeof value === 'number' ? 
                          (key.includes('Success') || key.includes('Consistency') ? `${value}%` : 
                           key.includes('Score') ? `${value}/5` : 
                           value) 
                          : value
                        }
                      </span>
                    </div>
                    {typeof value === 'number' && value <= 100 && (
                      <HiveProgress value={value} className="bg-gray-700" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coordination" className="mt-0">
          {/* Cross-System Coordination Examples */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Cross-System Coordination</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                See how different HIVE systems work together to create seamless, coordinated user experiences 
                that enhance campus community formation and coordination.
              </p>
            </div>
            
            {/* Coordination Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Ritual → Profile → Spaces</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">Student completes Week 2 ritual objective</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 mx-auto" />
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Profile achievement unlocked and showcased</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 mx-auto" />
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">Achievement celebrated in relevant spaces</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Tool → Spaces → Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">HiveLAB tool reaches impact milestone</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 mx-auto" />
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">Relevant spaces get deployment offers</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 mx-auto" />
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-orange-400" />
                      <span className="text-gray-300">Success story surfaces in personalized feeds</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </div>
    </div>
  );
}

export const LiveIntegrationFeed: Story = {
  render: () => <CrossSystemIntegration />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
};

export const DataFlowVisualization: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('data-flows');
    return <CrossSystemIntegration />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
};

export const SystemSynchronization: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('sync-status');
    return <CrossSystemIntegration />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
};

export const MobileIntegrationView: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <CrossSystemIntegration />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' }
  }
};