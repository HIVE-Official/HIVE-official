/**
 * HIVE Feed & Rituals System: Real-Time Intelligence Features
 * 
 * Demonstrates the advanced real-time coordination features including live updates,
 * intelligent content surfacing, temporal awareness, and community formation tracking.
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
  Activity,
  Zap,
  Users,
  Clock,
  TrendingUp,
  Bell,
  MapPin,
  Calendar,
  MessageSquare,
  Heart,
  Share,
  Star,
  Eye,
  ChevronRight,
  Sparkles,
  Target,
  Network,
  Radio,
  Wifi,
  Signal,
  Pulse,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Timer,
  Globe,
  Coffee,
  BookOpen,
  Users2,
  Crown,
  Award,
  Flame,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Brain,
  Lightbulb,
  Rocket,
  Layers,
  Filter,
  Search,
  Settings,
  Play,
  Pause,
  Volume2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import '../../hive-tokens.css';

const meta = {
  title: '06-Platform Systems/Real-Time Intelligence',
  component: RealTimeIntelligenceDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Real-Time Intelligence System

Advanced real-time coordination features that power the Feed & Rituals system with temporal awareness, intelligent content surfacing, and live community formation tracking.

## Core Intelligence Features
- **Live Activity Streams**: Real-time updates from across the platform
- **Temporal Coordination**: Time-sensitive content prioritization
- **Community Formation Tracking**: Live peer discovery and group formation
- **Smart Content Surfacing**: Coordination-first algorithm with context awareness
- **Predictive Suggestions**: Anticipating user needs based on campus patterns
- **Social Proof Amplification**: Real-time engagement and influence metrics

## Real-Time Capabilities
- **WebSocket Connections**: Live bidirectional communication
- **Presence Tracking**: Online/offline status and activity indicators
- **Live Collaboration**: Real-time co-creation and coordination
- **Push Notifications**: Smart, context-aware campus notifications
- **Event Streaming**: Live campus activity and coordination events

## Intelligence Algorithm
- **Coordination Priority**: Utility-focused content ranking over engagement optimization
- **Temporal Awareness**: Academic calendar, daily schedules, and campus rhythms
- **Social Context**: Peer networks, community membership, and collaboration history
- **Campus Integration**: Location awareness, building proximity, and university events
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for real-time intelligence
const mockRealTimeActivities = [
  {
    id: 'coordination_urgent',
    type: 'coordination',
    priority: 'urgent',
    title: 'Study Group Forming - CS 350 Final',
    description: '3 spots remaining for tomorrow\'s review session',
    location: 'Lockwood Library, Room 506',
    timeframe: '2 minutes ago',
    urgency: 'high',
    participants: 7,
    maxParticipants: 10,
    author: { name: 'Sarah Chen', avatar: 'SC' },
    engagement: { saves: 23, shares: 8, participants: 7 },
    deadline: '18:00 today',
    category: 'academic',
    tags: ['finals', 'computer-science', 'study-group']
  },
  {
    id: 'tool_launch',
    type: 'tool_launch',
    priority: 'medium',
    title: 'New Tool: Dining Hall Wait Times',
    description: 'Real-time crowd tracking for all campus dining locations',
    location: 'Campus-wide',
    timeframe: '8 minutes ago',
    urgency: 'medium',
    participants: 156,
    author: { name: 'Marcus Johnson', avatar: 'MJ' },
    engagement: { saves: 67, shares: 34, installs: 156 },
    category: 'utility',
    tags: ['dining', 'campus-life', 'real-time']
  },
  {
    id: 'community_milestone',
    type: 'milestone',
    priority: 'low',
    title: 'Engineering Space Hits 500 Members',
    description: 'Community celebration tomorrow at Alumni Arena',
    location: 'Alumni Arena',
    timeframe: '15 minutes ago',
    urgency: 'low',
    participants: 500,
    author: { name: 'Engineering Space', avatar: 'ES' },
    engagement: { saves: 89, shares: 45, attending: 234 },
    category: 'community',
    tags: ['engineering', 'milestone', 'celebration']
  }
];

const mockTemporalPatterns = {
  currentTime: '14:30',
  currentPeriod: 'afternoon_peak',
  campusRhythm: {
    activeUsers: 2847,
    peakActivity: '12:00-14:00',
    nextPeak: '18:00-20:00',
    currentTrend: 'rising'
  },
  academicContext: {
    week: 'Finals Week',
    semester: 'Fall 2024',
    daysUntilBreak: 4,
    urgentDeadlines: 12,
    studyGroupDemand: 'very_high'
  },
  weatherContext: {
    condition: 'Snow',
    temperature: '28°F',
    impact: 'indoor_preference',
    libraryCapacity: 'high'
  }
};

const mockIntelligenceMetrics = {
  algorithmPerformance: {
    coordinationSuccessRate: 0.847,
    relevanceScore: 0.923,
    timeToAction: '2.3 minutes',
    userSatisfaction: 4.7
  },
  realTimeStats: {
    activeConnections: 1247,
    messagesPerSecond: 45,
    avgLatency: '120ms',
    uptime: '99.97%'
  },
  contentIntelligence: {
    coordinationContent: 0.45,
    socialContent: 0.25,
    utilityContent: 0.20,
    entertainmentContent: 0.10
  }
};

const RealTimeIntelligenceDemo = () => {
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('coordination');
  const [activityFilter, setActivityFilter] = useState('all');
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [realtimeActivities, setRealtimeActivities] = useState(mockRealTimeActivities);

  // Simulate real-time updates
  useEffect(() => {
    if (!liveUpdates) return;

    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity = {
        id: `activity_${Date.now()}`,
        type: ['coordination', 'tool_launch', 'milestone'][Math.floor(Math.random() * 3)],
        priority: ['urgent', 'medium', 'low'][Math.floor(Math.random() * 3)],
        title: 'New Campus Activity',
        description: 'Live activity update from campus',
        timeframe: 'Just now',
        participants: Math.floor(Math.random() * 100) + 1,
        author: { name: 'Live User', avatar: 'LU' },
        engagement: { saves: Math.floor(Math.random() * 50), shares: Math.floor(Math.random() * 20) }
      };

      setRealtimeActivities(prev => [newActivity, ...prev.slice(0, 9)])
    }, 5000);

    return () => clearInterval(interval)
  }, [liveUpdates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Brain className="w-6 h-6 mr-3" style={{ color: 'var(--hive-brand-primary)' }} />
                Real-Time Intelligence
              </h1>
              <p className="text-gray-400">Live coordination intelligence and temporal awareness</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                <span className="text-sm text-gray-400 capitalize">{connectionStatus}</span>
              </div>
              <Switch 
                checked={liveUpdates} 
                onCheckedChange={setLiveUpdates}
              />
              <span className="text-sm text-gray-400">Live Updates</span>
            </div>
          </div>

          {/* Real-Time Status Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-green-400">{mockTemporalPatterns.campusRhythm.activeUsers}</div>
                    <div className="text-xs text-gray-400">Active Users</div>
                  </div>
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold" style={{ color: 'var(--hive-brand-primary)' }}>
                      {mockIntelligenceMetrics.realTimeStats.messagesPerSecond}
                    </div>
                    <div className="text-xs text-gray-400">Updates/sec</div>
                  </div>
                  <Pulse className="w-5 h-5" style={{ color: 'var(--hive-brand-primary)' }} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-blue-400">{mockIntelligenceMetrics.realTimeStats.avgLatency}</div>
                    <div className="text-xs text-gray-400">Latency</div>
                  </div>
                  <Signal className="w-5 h-5 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-purple-400">
                      {Math.round(mockIntelligenceMetrics.algorithmPerformance.coordinationSuccessRate * 100)}%
                    </div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 space-y-6">

        {/* Temporal Context Panel */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
              Campus Temporal Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Current Context */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Current Context</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Campus Period</span>
                    <Badge className="bg-blue-600 text-white">{mockTemporalPatterns.currentPeriod.replace('_', ' ')}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Academic Week</span>
                    <Badge className="bg-red-600 text-white">{mockTemporalPatterns.academicContext.week}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Weather Impact</span>
                    <Badge className="bg-cyan-600 text-white">{mockTemporalPatterns.weatherContext.impact.replace('_', ' ')}</Badge>
                  </div>
                </div>
              </div>

              {/* Activity Patterns */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Activity Patterns</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Current Trend</span>
                    <div className="flex items-center">
                      <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 capitalize">{mockTemporalPatterns.campusRhythm.currentTrend}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Peak Activity</span>
                    <span className="text-white">{mockTemporalPatterns.campusRhythm.peakActivity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Next Peak</span>
                    <span className="text-white">{mockTemporalPatterns.campusRhythm.nextPeak}</span>
                  </div>
                </div>
              </div>

              {/* Intelligence Metrics */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Intelligence Performance</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Relevance Score</span>
                    <div className="flex items-center">
                      <div className="text-white font-semibold">{mockIntelligenceMetrics.algorithmPerformance.relevanceScore}</div>
                      <Star className="w-4 h-4 ml-1" style={{ color: 'var(--hive-brand-primary)' }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Time to Action</span>
                    <span className="text-white">{mockIntelligenceMetrics.algorithmPerformance.timeToAction}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">User Satisfaction</span>
                    <div className="flex items-center">
                      <span className="text-white">{mockIntelligenceMetrics.algorithmPerformance.userSatisfaction}</span>
                      <Heart className="w-4 h-4 ml-1 text-red-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Radio className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                    Live Activity Stream
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-white">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-white">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {realtimeActivities.map((activity, index) => (
                  <div key={activity.id} className={`p-4 rounded-lg border transition-all ${
                    index === 0 && liveUpdates ? 'bg-blue-900/20 border-blue-600 animate-pulse' : 'bg-black/30 border-gray-700'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge 
                            className={`text-xs ${
                              activity.priority === 'urgent' ? 'bg-red-600 text-white' :
                              activity.priority === 'medium' ? 'bg-yellow-600 text-black' :
                              'bg-green-600 text-white'
                            }`}
                          >
                            {activity.type?.replace('_', ' ') || 'activity'}
                          </Badge>
                          <span className="text-xs text-gray-500">{activity.timeframe}</span>
                          {index === 0 && liveUpdates && (
                            <Badge className="bg-blue-600 text-white text-xs animate-pulse">LIVE</Badge>
                          )}
                        </div>
                        <h4 className="text-white font-medium mb-1">{activity.title}</h4>
                        <p className="text-gray-300 text-sm mb-2">{activity.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          {activity.location && (
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {activity.location}
                            </span>
                          )}
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {activity.participants}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button size="sm" variant="outline" className="border-gray-600 text-white">
                          <Heart className="w-3 h-3" />
                        </Button>
                        <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                          Join
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Intelligence Dashboard */}
          <div className="space-y-6">
            
            {/* Algorithm Performance */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                  Algorithm Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-sm">Coordination Focus</span>
                      <span className="text-white text-sm">{Math.round(mockIntelligenceMetrics.contentIntelligence.coordinationContent * 100)}%</span>
                    </div>
                    <HiveProgress value={mockIntelligenceMetrics.contentIntelligence.coordinationContent * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-sm">Social Content</span>
                      <span className="text-white text-sm">{Math.round(mockIntelligenceMetrics.contentIntelligence.socialContent * 100)}%</span>
                    </div>
                    <HiveProgress value={mockIntelligenceMetrics.contentIntelligence.socialContent * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-sm">Utility Content</span>
                      <span className="text-white text-sm">{Math.round(mockIntelligenceMetrics.contentIntelligence.utilityContent * 100)}%</span>
                    </div>
                    <HiveProgress value={mockIntelligenceMetrics.contentIntelligence.utilityContent * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connection Status */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Wifi className="w-4 h-4 mr-2 text-green-400" />
                  Real-Time Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Active Connections</span>
                  <span className="text-green-400 font-semibold">{mockIntelligenceMetrics.realTimeStats.activeConnections}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">System Uptime</span>
                  <span className="text-green-400 font-semibold">{mockIntelligenceMetrics.realTimeStats.uptime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Response Time</span>
                  <span className="text-blue-400 font-semibold">{mockIntelligenceMetrics.realTimeStats.avgLatency}</span>
                </div>
                <Separator className="bg-gray-700" />
                <div className="flex items-center justify-center space-x-2 pt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">System Operational</span>
                </div>
              </CardContent>
            </Card>

            {/* Predictive Insights */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                  Predictive Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
                    <div>
                      <h5 className="text-yellow-400 text-sm font-medium">Study Group Surge Expected</h5>
                      <p className="text-gray-400 text-xs mt-1">Finals week patterns suggest 300% increase in study coordination requests</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5" />
                    <div>
                      <h5 className="text-blue-400 text-sm font-medium">Optimal Posting Time</h5>
                      <p className="text-gray-400 text-xs mt-1">Evening peak (6-8 PM) shows highest coordination success rates</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
                  <div className="flex items-start">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                    <div>
                      <h5 className="text-green-400 text-sm font-medium">Community Growth</h5>
                      <p className="text-gray-400 text-xs mt-1">Engineering spaces showing 45% weekly growth in active participation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
};

export const RealTimeIntelligence: Story = {
  render: () => <RealTimeIntelligenceDemo />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const AlgorithmVisualization: Story = {
  render: () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('coordination');
    
    const algorithms = {
      coordination: {
        name: 'Coordination-First Algorithm',
        description: 'Prioritizes utility and community coordination over engagement metrics',
        factors: [
          { name: 'Community Relevance', weight: 0.4, color: 'var(--hive-brand-primary)' },
          { name: 'Temporal Urgency', weight: 0.3, color: '#3b82f6' },
          { name: 'Social Context', weight: 0.2, color: '#10b981' },
          { name: 'Engagement Quality', weight: 0.1, color: '#f59e0b' }
        ]
      },
      temporal: {
        name: 'Temporal Intelligence',
        description: 'Time-aware content surfacing based on campus rhythms and academic calendar',
        factors: [
          { name: 'Academic Calendar', weight: 0.35, color: '#8b5cf6' },
          { name: 'Daily Patterns', weight: 0.25, color: '#06b6d4' },
          { name: 'Deadline Proximity', weight: 0.25, color: '#ef4444' },
          { name: 'Weather Context', weight: 0.15, color: '#84cc16' }
        ]
      },
      social: {
        name: 'Social Proof Amplification',
        description: 'Authentic engagement metrics that reflect real community value',
        factors: [
          { name: 'Community Validation', weight: 0.4, color: '#ec4899' },
          { name: 'Peer Participation', weight: 0.3, color: '#f97316' },
          { name: 'Success Outcomes', weight: 0.2, color: '#22c55e' },
          { name: 'Viral Potential', weight: 0.1, color: '#a855f7' }
        ]
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Algorithm Intelligence Visualization</h1>
            <p className="text-gray-400">Understanding how HIVE's coordination-first algorithms work</p>
          </div>

          {/* Algorithm Selector */}
          <div className="flex justify-center space-x-4 mb-8">
            {Object.entries(algorithms).map(([key, algorithm]) => (
              <Button
                key={key}
                variant={selectedAlgorithm === key ? 'default' : 'outline'}
                onClick={() => setSelectedAlgorithm(key)}
                className={selectedAlgorithm === key ? 'hive-interactive' : 'border-gray-600 text-white'}
                style={selectedAlgorithm === key ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
              >
                {algorithm.name}
              </Button>
            ))}
          </div>

          {/* Algorithm Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Algorithm Description */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{algorithms[selectedAlgorithm].name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300">{algorithms[selectedAlgorithm].description}</p>
                
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Ranking Factors</h4>
                  {algorithms[selectedAlgorithm].factors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">{factor.name}</span>
                        <span className="text-white font-semibold">{Math.round(factor.weight * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${factor.weight * 100}%`,
                            backgroundColor: factor.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Visual Representation */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Algorithm Weights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-64 h-64 mx-auto">
                  {/* Pie Chart Visualization */}
                  <div className="w-full h-full rounded-full relative overflow-hidden">
                    {algorithms[selectedAlgorithm].factors.map((factor, index) => {
                      const previousWeights = algorithms[selectedAlgorithm].factors
                        .slice(0, index)
                        .reduce((sum, f) => sum + f.weight, 0);
                      const rotation = previousWeights * 360;
                      const angle = factor.weight * 360;
                      
                      return (
                        <div
                          key={index}
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `conic-gradient(from ${rotation}deg, ${factor.color} 0deg, ${factor.color} ${angle}deg, transparent ${angle}deg)`,
                            mask: 'radial-gradient(circle at center, transparent 30%, black 30%)'
                          }}
                        />
                      )
                    })
                  </div>
                  
                  {/* Center Label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--hive-brand-primary)' }} />
                      <div className="text-sm text-gray-400">Algorithm</div>
                      <div className="text-sm text-gray-400">Intelligence</div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 space-y-2">
                  {algorithms[selectedAlgorithm].factors.map((factor, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded mr-3"
                        style={{ backgroundColor: factor.color }}
                      />
                      <span className="text-sm text-gray-400">{factor.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const MobileRealTimeExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <RealTimeIntelligenceDemo />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};