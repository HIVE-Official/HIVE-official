/**
 * HIVE Platform Integration: Cross-System Workflows
 * 
 * Demonstrates seamless integration between Profile, Spaces, Feed, Rituals, and HiveLAB
 * systems, showcasing unified user journeys and coordinated platform experiences.
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
import { 
  Network,
  ArrowRight,
  Users,
  Calendar,
  Zap,
  Activity,
  Settings,
  Eye,
  Share,
  Heart,
  MessageSquare,
  Star,
  Crown,
  Award,
  Target,
  Layers,
  Workflow,
  GitBranch,
  Sparkles,
  Globe,
  MapPin,
  Clock,
  Bell,
  CheckCircle,
  ArrowUpRight,
  ExternalLink,
  Link,
  Shuffle,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Users2,
  Coffee,
  BookOpen,
  Wrench,
  Code,
  Rocket,
  Brain,
  Lightbulb,
  Database,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Grid3X3,
  List,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { useState, useEffect } from 'react';
import '../../hive-tokens.css';

const meta = {
  title: '06-Platform Systems/Platform Integration/Cross-System Workflows',
  component: CrossSystemWorkflowsDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Cross-System Integration Workflows

Comprehensive demonstration of how Profile, Spaces, Feed, Rituals, and HiveLAB systems work together seamlessly to create unified user experiences and coordinated campus community building.

## Integration Highlights
- **Unified Data Flow**: Seamless information sharing between all platform systems
- **Coordinated User Journeys**: Natural workflows that span multiple systems
- **Cross-System Notifications**: Intelligent updates that connect related activities
- **Shared State Management**: Consistent user experience across all platform areas
- **Contextual Cross-References**: Smart linking between related content and communities

## Workflow Examples
- **Study Group Formation**: Profile → Spaces → Feed → Rituals coordination
- **Tool Creation to Community**: HiveLAB → Spaces → Feed distribution
- **Academic Calendar Integration**: Calendar → Rituals → Spaces → Profile sync
- **Campus Event Coordination**: Spaces → Feed → Profile → Notifications flow
- **Community Building Journey**: Rituals → Spaces → Profile → Tools progression

## System Interconnections
- **Profile ↔ Spaces**: Community membership and participation tracking
- **Spaces ↔ Feed**: Community activity and content surfacing
- **Feed ↔ Rituals**: Temporal coordination and community formation
- **HiveLAB ↔ All Systems**: Tool creation and deployment across platform
- **Real-time Sync**: Live updates and notifications across all systems
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for cross-system integration
const mockIntegratedUser = {
  profile: {
    id: 'user_sarah_chen',
    name: 'Sarah Chen',
    handle: '@sarahc',
    avatar: 'SC',
    email: 'sarahchen@buffalo.edu',
    year: 'Junior',
    major: 'Computer Science',
    dorm: 'Ellicott Complex',
    interests: ['Machine Learning', 'Web Development', 'Study Groups'],
    builderLevel: 'Expert',
    reputation: 847,
    joinedDate: '2023-08-15'
  },
  spaces: {
    memberOf: [
      { id: 'cs_majors', name: 'CS Majors', role: 'member', joinDate: '2023-09-01' },
      { id: 'ellicott_floor_3', name: 'Ellicott Floor 3', role: 'admin', joinDate: '2023-08-20' },
      { id: 'web_dev_study', name: 'Web Dev Study Group', role: 'moderator', joinDate: '2023-10-15' }
    ],
    created: [
      { id: 'ml_beginners', name: 'ML for Beginners', members: 89, created: '2024-02-10' }
    ]
  },
  feed: {
    recentActivity: [
      { type: 'tool_shared', content: 'Shared Study Room Finder', timestamp: '2024-11-15T10:30:00Z' },
      { type: 'space_joined', content: 'Joined Advanced Algorithms Study Group', timestamp: '2024-11-14T16:45:00Z' },
      { type: 'ritual_completed', content: 'Completed Week 3 of Community Building Ritual', timestamp: '2024-11-13T14:20:00Z' }
    ],
    engagement: {
      postsCreated: 23,
      commentsGiven: 156,
      helpfulVotes: 234,
      toolsShared: 12
    }
  },
  rituals: {
    completed: [
      { id: 'community_builder', name: 'Community Builder', completedWeeks: 4, status: 'completed' },
      { id: 'academic_coordinator', name: 'Academic Coordinator', completedWeeks: 2, status: 'in_progress' }
    ],
    achievements: [
      { id: 'peer_connector', name: 'Peer Connector', earned: '2024-10-20' },
      { id: 'study_organizer', name: 'Study Organizer', earned: '2024-11-01' }
    ]
  },
  hivelab: {
    toolsCreated: [
      { id: 'study_room_finder', name: 'Study Room Finder', installs: 1234, rating: 4.8 },
      { id: 'dining_tracker', name: 'Dining Hall Tracker', installs: 567, rating: 4.6 }
    ],
    collaborations: [
      { id: 'laundry_tracker', name: 'Laundry Tracker', role: 'contributor', owner: '@mjohnson' }
    ]
  }
};

const mockCrossSystemActivities = [
  {
    id: 'study_group_formation',
    title: 'CS 350 Study Group Formation',
    type: 'cross_system_workflow',
    systems: ['profile', 'spaces', 'feed', 'rituals'],
    timeline: [
      { 
        system: 'profile', 
        action: 'Calendar shows CS 350 final approaching', 
        timestamp: '2024-11-10T09:00:00Z',
        icon: Calendar 
      },
      { 
        system: 'rituals', 
        action: 'Academic Coordinator ritual suggests study group formation', 
        timestamp: '2024-11-10T09:15:00Z',
        icon: Target 
      },
      { 
        system: 'spaces', 
        action: 'CS Majors space receives study group request', 
        timestamp: '2024-11-10T09:30:00Z',
        icon: Users 
      },
      { 
        system: 'feed', 
        action: 'Study group coordination surfaced to relevant peers', 
        timestamp: '2024-11-10T09:45:00Z',
        icon: Activity 
      }
    ],
    outcome: {
      success: true,
      participants: 8,
      spacesCreated: 1,
      toolsUsed: ['Study Room Finder', 'Calendar Sync'],
      engagement: 'High community response with successful coordination'
    }
  },
  {
    id: 'tool_to_community',
    title: 'Dining Tracker Tool Distribution',
    type: 'cross_system_workflow',
    systems: ['hivelab', 'spaces', 'feed', 'profile'],
    timeline: [
      { 
        system: 'hivelab', 
        action: 'Dining Hall Tracker tool completed and deployed', 
        timestamp: '2024-11-08T14:00:00Z',
        icon: Wrench 
      },
      { 
        system: 'spaces', 
        action: 'Tool shared in Campus Life and Dorm spaces', 
        timestamp: '2024-11-08T14:15:00Z',
        icon: Users 
      },
      { 
        system: 'feed', 
        action: 'Tool launch featured in campus-wide feed', 
        timestamp: '2024-11-08T14:30:00Z',
        icon: Activity 
      },
      { 
        system: 'profile', 
        action: 'Creator reputation increased, builder level advanced', 
        timestamp: '2024-11-08T15:00:00Z',
        icon: Award 
      }
    ],
    outcome: {
      success: true,
      installs: 567,
      spacesReached: 12,
      profileBoost: '+50 reputation',
      engagement: 'Viral spread across campus dining community'
    }
  }
];

const CrossSystemWorkflowsDemo = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(0);
  const [viewMode, setViewMode] = useState('timeline');
  const [showSystemConnections, setShowSystemConnections] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Network className="w-6 h-6 mr-3" style={{ color: 'var(--hive-brand-primary)' }} />
                Cross-System Integration
              </h1>
              <p className="text-gray-400">Unified workflows across Profile, Spaces, Feed, Rituals, and HiveLAB</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={showSystemConnections} 
                  onCheckedChange={setShowSystemConnections}
                />
                <span className="text-sm text-gray-400">Show Connections</span>
              </div>
              <Button size="icon" variant="secondary" className="border-gray-600 text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* System Overview */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            {[
              { name: 'Profile', icon: Users, color: 'var(--hive-brand-primary)', status: 'active' },
              { name: 'Spaces', icon: Users2, color: '#3b82f6', status: 'active' },
              { name: 'Feed', icon: Activity, color: '#10b981', status: 'active' },
              { name: 'Rituals', icon: Target, color: '#f59e0b', status: 'active' },
              { name: 'HiveLAB', icon: Wrench, color: '#8b5cf6', status: 'active' }
            ].map((system, index) => (
              <Card key={system.name} className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4 pb-4">
                  <system.icon className="w-6 h-6 mx-auto mb-2" style={{ color: system.color }} />
                  <div className="text-sm font-medium text-white">{system.name}</div>
                  <div className={`w-2 h-2 rounded-full mx-auto mt-2 ${
                    system.status === 'active' ? 'bg-green-400' : 'bg-gray-600'
                  }`} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 space-y-6">

        {/* User Integration Overview */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
              Integrated User Profile: {mockIntegratedUser.profile.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              
              {/* Profile System */}
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center">
                  <Users className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                  Profile
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {mockIntegratedUser.profile.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white">{mockIntegratedUser.profile.name}</div>
                      <div className="text-gray-400 text-xs">{mockIntegratedUser.profile.major}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Builder Level</span>
                    <Badge className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                      {mockIntegratedUser.profile.builderLevel}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Reputation</span>
                    <span className="text-white">{mockIntegratedUser.profile.reputation}</span>
                  </div>
                </div>
              </div>

              {/* Spaces System */}
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center">
                  <Users2 className="w-4 h-4 mr-2 text-blue-400" />
                  Spaces
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Member of</span>
                    <span className="text-white">{mockIntegratedUser.spaces.memberOf.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Created</span>
                    <span className="text-white">{mockIntegratedUser.spaces.created.length}</span>
                  </div>
                  {mockIntegratedUser.spaces.memberOf.slice(0, 2).map((space) => (
                    <div key={space.id} className="p-2 bg-black/30 rounded text-xs">
                      <div className="text-white font-medium">{space.name}</div>
                      <div className="text-gray-400">{space.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feed System */}
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-green-400" />
                  Feed
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Posts</span>
                    <span className="text-white">{mockIntegratedUser.feed.engagement.postsCreated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Comments</span>
                    <span className="text-white">{mockIntegratedUser.feed.engagement.commentsGiven}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Helpful Votes</span>
                    <span className="text-white">{mockIntegratedUser.feed.engagement.helpfulVotes}</span>
                  </div>
                  <div className="p-2 bg-black/30 rounded text-xs">
                    <div className="text-green-400">Recent: Tool Shared</div>
                    <div className="text-gray-400">2 hours ago</div>
                  </div>
                </div>
              </div>

              {/* Rituals System */}
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center">
                  <Target className="w-4 h-4 mr-2 text-yellow-400" />
                  Rituals
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Completed</span>
                    <span className="text-white">{mockIntegratedUser.rituals.completed.filter(r => r.status === 'completed').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">In Progress</span>
                    <span className="text-white">{mockIntegratedUser.rituals.completed.filter(r => r.status === 'in_progress').length}</span>
                  </div>
                  {mockIntegratedUser.rituals.completed.map((ritual) => (
                    <div key={ritual.id} className="p-2 bg-black/30 rounded text-xs">
                      <div className="text-white font-medium">{ritual.name}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Week {ritual.completedWeeks}/4</span>
                        <Badge className={`text-xs ${
                          ritual.status === 'completed' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-black'
                        }`}>
                          {ritual.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HiveLAB System */}
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center">
                  <Wrench className="w-4 h-4 mr-2 text-purple-400" />
                  HiveLAB
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tools Created</span>
                    <span className="text-white">{mockIntegratedUser.hivelab.toolsCreated.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Installs</span>
                    <span className="text-white">
                      {mockIntegratedUser.hivelab.toolsCreated.reduce((sum, tool) => sum + tool.installs, 0)}
                    </span>
                  </div>
                  {mockIntegratedUser.hivelab.toolsCreated.slice(0, 2).map((tool) => (
                    <div key={tool.id} className="p-2 bg-black/30 rounded text-xs">
                      <div className="text-white font-medium">{tool.name}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">{tool.installs} installs</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                          <span className="text-white">{tool.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cross-System Workflows */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Cross-System Workflows</h2>
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant={viewMode === 'timeline' ? 'default' : 'outline'}
                onClick={() => setViewMode('timeline')}
                className={viewMode === 'timeline' ? 'hive-interactive' : 'border-gray-600 text-white'}
                style={viewMode === 'timeline' ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
              >
                Timeline
              </Button>
              <Button 
                size="sm" 
                variant={viewMode === 'system' ? 'default' : 'outline'}
                onClick={() => setViewMode('system')}
                className={viewMode === 'system' ? 'hive-interactive' : 'border-gray-600 text-white'}
                style={viewMode === 'system' ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
              >
                System View
              </Button>
            </div>
          </div>

          {/* Workflow Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {mockCrossSystemActivities.map((workflow, index) => (
              <Card 
                key={workflow.id} 
                className={`cursor-pointer transition-all ${
                  selectedWorkflow === index 
                    ? 'bg-gray-700/50 border-gray-600' 
                    : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/30'
                }`}
                onClick={() => setSelectedWorkflow(index)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{workflow.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{workflow.type.replace('_', ' ')}</p>
                      <div className="flex flex-wrap gap-1">
                        {workflow.systems.map((system) => (
                          <Badge key={system} variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                            {system}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedWorkflow === index && (
                      <CheckCircle className="w-5 h-5" style={{ color: 'var(--hive-brand-primary)' }} />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Workflow Details */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Workflow className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                {mockCrossSystemActivities[selectedWorkflow].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode === 'timeline' ? (
                <div className="space-y-6">
                  {mockCrossSystemActivities[selectedWorkflow].timeline.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                             style={{ 
                               borderColor: 'var(--hive-brand-primary)',
                               backgroundColor: 'var(--hive-brand-primary)20'
                             }}>
                          <step.icon className="w-6 h-6" style={{ color: 'var(--hive-brand-primary)' }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                            {step.system}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(step.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <h5 className="text-white font-medium">{step.action}</h5>
                      </div>
                      {index < mockCrossSystemActivities[selectedWorkflow].timeline.length - 1 && (
                        <div className="absolute left-6 mt-12 w-px h-6 bg-gray-600" />
                      )}
                    </div>
                  ))}

                  {/* Outcome */}
                  <div className="mt-8 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                    <h5 className="text-green-400 font-medium mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Workflow Outcome
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {Object.entries(mockCrossSystemActivities[selectedWorkflow].outcome).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <div className="text-white font-semibold">{value.toString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {mockCrossSystemActivities[selectedWorkflow].systems.map((system, index) => (
                    <Card key={system} className="bg-black/30 border-gray-600">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm capitalize flex items-center">
                          {system === 'profile' && <Users className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />}
                          {system === 'spaces' && <Users2 className="w-4 h-4 mr-2 text-blue-400" />}
                          {system === 'feed' && <Activity className="w-4 h-4 mr-2 text-green-400" />}
                          {system === 'rituals' && <Target className="w-4 h-4 mr-2 text-yellow-400" />}
                          {system === 'hivelab' && <Wrench className="w-4 h-4 mr-2 text-purple-400" />}
                          {system}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-300">
                          {mockCrossSystemActivities[selectedWorkflow].timeline
                            .filter(step => step.system === system)
                            .map((step, stepIndex) => (
                              <div key={stepIndex} className="mb-2 last:mb-0">
                                <div className="text-white font-medium text-xs mb-1">{step.action}</div>
                                <div className="text-gray-500 text-xs">
                                  {new Date(step.timestamp).toLocaleTimeString()}
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* System Integration Metrics */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
              Integration Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'var(--hive-brand-primary)' }}>97%</div>
                <div className="text-gray-400 text-sm">Cross-System Sync</div>
                <div className="text-green-400 text-xs mt-1">+2% this week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">2.3s</div>
                <div className="text-gray-400 text-sm">Avg Integration Time</div>
                <div className="text-green-400 text-xs mt-1">-0.4s improvement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">156</div>
                <div className="text-gray-400 text-sm">Daily Cross-System Workflows</div>
                <div className="text-green-400 text-xs mt-1">+23 this week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">4.8</div>
                <div className="text-gray-400 text-sm">User Experience Rating</div>
                <div className="text-green-400 text-xs mt-1">+0.3 this month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const CrossSystemWorkflows: Story = {
  render: () => <CrossSystemWorkflowsDemo />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const SystemDataFlow: Story = {
  render: () => {
    const [activeSystem, setActiveSystem] = useState('profile');
    
    const systemConnections = {
      profile: {
        name: 'Profile System',
        color: 'var(--hive-brand-primary)',
        connections: [
          { to: 'spaces', type: 'membership', data: 'User community participation' },
          { to: 'feed', type: 'activity', data: 'Personal activity and engagement' },
          { to: 'rituals', type: 'progress', data: 'Ritual completion and achievements' },
          { to: 'hivelab', type: 'creation', data: 'Tool creation and reputation' }
        ],
        dataTypes: ['User Identity', 'Preferences', 'Activity History', 'Achievements', 'Reputation']
      },
      spaces: {
        name: 'Spaces System',
        color: '#3b82f6',
        connections: [
          { to: 'profile', type: 'membership', data: 'Community participation tracking' },
          { to: 'feed', type: 'content', data: 'Space activities and discussions' },
          { to: 'rituals', type: 'coordination', data: 'Community ritual participation' },
          { to: 'hivelab', type: 'tools', data: 'Space-specific tool usage' }
        ],
        dataTypes: ['Community Data', 'Member Lists', 'Space Activities', 'Coordination Events', 'Resources']
      },
      feed: {
        name: 'Feed System',
        color: '#10b981',
        connections: [
          { to: 'profile', type: 'personalization', data: 'Personalized content delivery' },
          { to: 'spaces', type: 'aggregation', data: 'Community content surfacing' },
          { to: 'rituals', type: 'coordination', data: 'Ritual-driven content' },
          { to: 'hivelab', type: 'discovery', data: 'Tool discovery and sharing' }
        ],
        dataTypes: ['Content Stream', 'Engagement Metrics', 'Recommendations', 'Real-time Updates', 'Social Proof']
      },
      rituals: {
        name: 'Rituals System',
        color: '#f59e0b',
        connections: [
          { to: 'profile', type: 'progression', data: 'Personal development tracking' },
          { to: 'spaces', type: 'formation', data: 'Community building activities' },
          { to: 'feed', type: 'coordination', data: 'Temporal coordination content' },
          { to: 'hivelab', type: 'creation', data: 'Collaborative tool building' }
        ],
        dataTypes: ['Ritual Progress', 'Community Formation', 'Temporal Patterns', 'Achievement Tracking', 'Peer Discovery']
      },
      hivelab: {
        name: 'HiveLAB System',
        color: '#8b5cf6',
        connections: [
          { to: 'profile', type: 'reputation', data: 'Builder reputation and achievements' },
          { to: 'spaces', type: 'deployment', data: 'Tool deployment to communities' },
          { to: 'feed', type: 'sharing', data: 'Tool discovery and promotion' },
          { to: 'rituals', type: 'collaboration', data: 'Collaborative building activities' }
        ],
        dataTypes: ['Tool Metadata', 'Creation History', 'Usage Analytics', 'Collaboration Data', 'Deployment Status']
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">System Data Flow Visualization</h1>
            <p className="text-gray-400">Understanding how data flows between platform systems</p>
          </div>

          {/* System Selector */}
          <div className="flex justify-center space-x-4 mb-8">
            {Object.entries(systemConnections).map(([key, system]) => (
              <Button
                key={key}
                variant={activeSystem === key ? 'default' : 'outline'}
                onClick={() => setActiveSystem(key)}
                className={activeSystem === key ? 'hive-interactive' : 'border-gray-600 text-white'}
                style={activeSystem === key ? {
                  backgroundColor: system.color,
                  color: 'white'
                } : {}}
              >
                {system.name}
              </Button>
            ))}
          </div>

          {/* Data Flow Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Central System */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Database className="w-5 h-5 mr-2" style={{ color: systemConnections[activeSystem].color }} />
                  {systemConnections[activeSystem].name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-3">Data Types</h4>
                  <div className="space-y-2">
                    {systemConnections[activeSystem].dataTypes.map((dataType, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded mr-3"
                          style={{ backgroundColor: systemConnections[activeSystem].color }}
                        />
                        <span className="text-gray-300 text-sm">{dataType}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <h4 className="text-white font-medium mb-3">System Connections</h4>
                  <div className="space-y-3">
                    {systemConnections[activeSystem].connections.map((connection, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2" style={{ color: systemConnections[activeSystem].color }} />
                          <span className="text-white font-medium capitalize">{connection.to}</span>
                        </div>
                        <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                          {connection.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connection Details */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Data Exchange Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemConnections[activeSystem].connections.map((connection, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-medium capitalize">→ {connection.to}</h5>
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: systemConnections[connection.to]?.color || '#666',
                          color: 'white'
                        }}
                      >
                        {connection.type}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{connection.data}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Real-time sync
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const MobileCrossSystemExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <CrossSystemWorkflowsDemo />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};