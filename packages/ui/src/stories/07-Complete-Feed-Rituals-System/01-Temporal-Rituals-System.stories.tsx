/**
 * HIVE Temporal Rituals System
 * Complete community formation and preparation system implementing ritual-driven temporal intelligence
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
  Sparkles,
  Users,
  Target,
  Crown,
  Calendar,
  MapPin,
  Clock,
  Star,
  Heart,
  Trophy,
  Flame,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ChevronRight,
  Globe,
  Network,
  Zap,
  BookOpen,
  Coffee,
  Moon,
  Sun,
  Activity,
  TrendingUp,
  Award,
  Eye,
  Shield,
  Link2,
  UserPlus,
  Settings,
  Bell,
  Home,
  Compass,
  RefreshCw,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';
import '../../hive-tokens.css';

const meta = {
  title: '06-Platform Systems/Temporal Rituals System',
  component: TemporalRitualsSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Temporal Rituals System

The complete community formation and preparation system implementing temporal intelligence as specified in the Feed & Rituals PRD. Features 4-week ritual progression, community investment tracking, and platform mastery development.

## Core Features
- **4-Week Ritual Progression**: Initialize → Discover → Connect → Deploy
- **Community Formation**: Collective progress visualization and shared experiences
- **Platform Investment**: Guided customization and capability discovery
- **Peer Discovery**: Strategic network building and compatibility matching
- **Campus Readiness**: Anxiety transformation and leadership development
- **Temporal Intelligence**: Phase-appropriate experiences for optimal psychological alignment
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for the 4-week ritual progression
const mockRitualProgression = {
  week1: {
    id: 'initialize',
    name: 'Initialize',
    title: 'Welcome to Your Campus Community',
    description: 'Set up your identity, discover platform capabilities, and join the UB community formation',
    phase: 'foundation',
    weekNumber: 1,
    status: 'completed',
    completedAt: new Date('2024-07-08'),
    objectives: [
      'Complete profile customization',
      'Understand community structure',
      'Set campus readiness goals',
      'Connect with platform capabilities'
    ],
    communityProgress: {
      totalParticipants: 1247,
      activeParticipants: 892,
      completionRate: 89,
      networkConnections: 3456
    },
    personalProgress: {
      completionPercentage: 100,
      profileCompleteness: 95,
      communityExploration: 85,
      platformMastery: 78
    },
    rewards: [
      { type: 'badge', name: 'Campus Pioneer', earned: true },
      { type: 'title', name: 'Community Founder', earned: true },
      { type: 'unlock', name: 'Advanced Customization', earned: true }
    ]
  },
  week2: {
    id: 'discover',
    name: 'Discover',
    title: 'Explore Your Academic & Social Communities',
    description: 'Daily missions to explore different community types, make decisions, and discover compatibility',
    phase: 'exploration',
    weekNumber: 2,
    status: 'completed',
    completedAt: new Date('2024-07-15'),
    objectives: [
      'Explore academic communities',
      'Join residential community',
      'Discover interest-based groups',
      'Make strategic membership decisions'
    ],
    dailyMissions: [
      { day: 1, title: 'Academic Community Tour', completed: true, type: 'exploration' },
      { day: 2, title: 'Dorm & Housing Discovery', completed: true, type: 'social' },
      { day: 3, title: 'Interest & Hobby Groups', completed: true, type: 'personal' },
      { day: 4, title: 'Career & Professional Networks', completed: true, type: 'professional' },
      { day: 5, title: 'Decision Day: Choose Your Communities', completed: true, type: 'commitment' }
    ],
    communityProgress: {
      totalParticipants: 1247,
      activeParticipants: 1089,
      completionRate: 94,
      networkConnections: 5678
    },
    personalProgress: {
      completionPercentage: 100,
      communitiesExplored: 23,
      communitiesJoined: 5,
      peerConnections: 12
    },
    rewards: [
      { type: 'badge', name: 'Community Explorer', earned: true },
      { type: 'insight', name: 'Compatibility Report', earned: true },
      { type: 'unlock', name: 'Peer Discovery Tools', earned: true }
    ]
  },
  week3: {
    id: 'connect',
    name: 'Connect',
    title: 'Build Your Campus Network',
    description: 'Strategic network building through limited invitations and community bridge formation',
    phase: 'networking',
    weekNumber: 3,
    status: 'in_progress',
    startedAt: new Date('2024-07-22'),
    objectives: [
      'Invite future classmates strategically',
      'Form study group partnerships',
      'Build cross-community bridges',
      'Establish leadership presence'
    ],
    networkingTools: {
      invitationsRemaining: 3,
      invitationsSent: 7,
      connectionsFormed: 15,
      bridgesBuilt: 4
    },
    communityProgress: {
      totalParticipants: 1247,
      activeParticipants: 1156,
      completionRate: 73,
      networkConnections: 8234
    },
    personalProgress: {
      completionPercentage: 65,
      networkSize: 28,
      bridgeConnections: 4,
      leadershipScore: 67
    },
    currentActivities: [
      { type: 'invitation', target: 'Roommate Discovery', status: 'pending' },
      { type: 'bridge', target: 'CS-Math Study Network', status: 'active' },
      { type: 'leadership', target: 'Photography Club Setup', status: 'leading' }
    ],
    rewards: [
      { type: 'badge', name: 'Network Builder', earned: false, progress: 65 },
      { type: 'title', name: 'Community Connector', earned: false, progress: 73 },
      { type: 'unlock', name: 'Leadership Tools', earned: true }
    ]
  },
  week4: {
    id: 'deploy',
    name: 'Deploy',
    title: 'Campus Readiness Assessment',
    description: 'Final preparation, confidence building, and platform mastery demonstration',
    phase: 'preparation',
    weekNumber: 4,
    status: 'upcoming',
    scheduledStart: new Date('2024-07-29'),
    objectives: [
      'Complete campus readiness checklist',
      'Demonstrate platform mastery',
      'Prepare for Feed activation',
      'Establish leadership readiness'
    ],
    readinessAssessment: {
      socialReadiness: 0,
      academicPreparation: 0,
      platformMastery: 0,
      leadershipConfidence: 0,
      overallReadiness: 0
    },
    communityProgress: {
      totalParticipants: 1247,
      projectedActiveParticipants: 1200,
      projectedCompletionRate: 85,
      projectedNetworkConnections: 12000
    },
    anticipatedRewards: [
      { type: 'badge', name: 'Campus Ready', description: 'Completed full preparation' },
      { type: 'title', name: 'HIVE Leader', description: 'Platform mastery demonstrated' },
      { type: 'unlock', name: 'Feed Early Access', description: 'First access to coordination features' }
    ]
  }
};

// Mock peer discovery and network data
const mockPeerNetwork = [
  {
    id: 'peer_1',
    name: 'Emma Rodriguez',
    handle: '@emmar',
    avatar: 'ER',
    compatibility: 92,
    sharedCommunities: ['CSE 442 - Software Engineering', 'UB Photography Club'],
    sharedInterests: ['Web Development', 'Digital Art', 'Campus Events'],
    connectionType: 'study_partner',
    status: 'connected',
    ritualProgress: { currentWeek: 3, completionRate: 87 }
  },
  {
    id: 'peer_2',
    name: 'Jordan Kim',
    handle: '@jordank',
    avatar: 'JK',
    compatibility: 88,
    sharedCommunities: ['Ellicott 3rd Floor', 'Pre-Med Society'],
    sharedInterests: ['Study Groups', 'Health & Wellness', 'Community Service'],
    connectionType: 'roommate_potential',
    status: 'invited',
    ritualProgress: { currentWeek: 3, completionRate: 91 }
  },
  {
    id: 'peer_3',
    name: 'Alex Chen',
    handle: '@alexc',
    avatar: 'AC',
    compatibility: 85,
    sharedCommunities: ['UB Student Builders', 'Hackathon Team'],
    sharedInterests: ['Innovation', 'Entrepreneurship', 'Tech Leadership'],
    connectionType: 'collaboration_partner',
    status: 'bridge_connection',
    ritualProgress: { currentWeek: 3, completionRate: 79 }
  }
];

// Mock community investment tracking
const mockCommunityInvestment = {
  platformMastery: {
    profileCustomization: 95,
    communityNavigation: 88,
    peerDiscovery: 92,
    toolUsage: 76,
    leadershipReadiness: 67
  },
  communityEngagement: {
    spacesJoined: 5,
    spacesActive: 4,
    peerConnections: 28,
    bridgeConnections: 4,
    leadershipRoles: 1
  },
  preparationProgress: {
    anxietyReduction: 78,
    confidenceBuilding: 84,
    campusReadiness: 71,
    socialSkills: 89
  }
};

function TemporalRitualsSystem() {
  const [activeWeek, setActiveWeek] = useState('week3');
  const [viewMode, setViewMode] = useState('overview');
  const [showPeerDiscovery, setShowPeerDiscovery] = useState(false);

  const currentRitual = mockRitualProgression[activeWeek as keyof typeof mockRitualProgression];

  const getWeekStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'upcoming': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'foundation': return <Home className="w-5 h-5" />;
      case 'exploration': return <Compass className="w-5 h-5" />;
      case 'networking': return <Network className="w-5 h-5" />;
      case 'preparation': return <Target className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Campus Rituals</h1>
                  <p className="text-gray-400">Community formation & preparation system</p>
                </div>
              </div>
              
              {/* Phase Indicator */}
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  vBETA Phase • Week 3 Active
                </Badge>
                <div className="text-sm text-gray-400">
                  1,156 students participating
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline" className="border-gray-600 text-white relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full" />
              </Button>
              <Button size="icon" variant="outline" className="border-gray-600 text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Ritual Progression Timeline */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {Object.entries(mockRitualProgression).map(([key, ritual]) => {
              const isActive = key === activeWeek;
              const isCompleted = ritual.status === 'completed';
              
              return (
                <Card 
                  key={key}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    isActive 
                      ? 'border-purple-500 bg-purple-500/10 shadow-lg' 
                      : isCompleted 
                        ? 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10' 
                        : 'border-gray-600 bg-gray-800/30 hover:bg-gray-800/50'
                  }`}
                  onClick={() => setActiveWeek(key)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : isActive ? 'bg-purple-500' : 'bg-gray-700'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          getPhaseIcon(ritual.phase)
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-white mb-1">
                      Week {ritual.weekNumber}: {ritual.name}
                    </div>
                    <Badge className={`text-xs ${getWeekStatusColor(ritual.status)}`}>
                      {ritual.status.replace('_', ' ')}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* View Mode Tabs */}
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <Activity className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                Community
              </TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                <Network className="w-4 h-4 mr-2" />
                Network
              </TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Progress
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        
        <TabsContent value="overview" className="mt-0">
          {/* Current Ritual Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Ritual Details */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                        {getPhaseIcon(currentRitual.phase)}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">
                          {currentRitual.title}
                        </CardTitle>
                        <p className="text-gray-400">{currentRitual.description}</p>
                      </div>
                    </div>
                    <Badge className={getWeekStatusColor(currentRitual.status)}>
                      {currentRitual.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Objectives */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">Week Objectives</h4>
                    <div className="space-y-2">
                      {currentRitual.objectives.map((objective, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {currentRitual.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          ) : currentRitual.status === 'in_progress' ? (
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              index < 2 ? 'bg-blue-500 border-blue-500' : 'border-gray-500'
                            }`}>
                              {index < 2 && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex-shrink-0" />
                          )}
                          <span className={`${
                            currentRitual.status === 'completed' || (currentRitual.status === 'in_progress' && index < 2) 
                              ? 'text-white' 
                              : 'text-gray-400'
                          }`}>
                            {objective}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily Missions (Week 2 specific) */}
                  {currentRitual.dailyMissions && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Daily Missions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {currentRitual.dailyMissions.map((mission) => (
                          <div key={mission.day} className={`p-3 rounded-lg border ${
                            mission.completed 
                              ? 'bg-green-500/10 border-green-500/30' 
                              : 'bg-gray-700 border-gray-600'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-gray-400">Day {mission.day}</span>
                              {mission.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                            </div>
                            <div className="text-sm font-medium text-white">{mission.title}</div>
                            <Badge variant="outline" className="text-xs mt-2">
                              {mission.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Activities (Week 3 specific) */}
                  {currentRitual.currentActivities && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Active Networking</h4>
                      <div className="space-y-3">
                        {currentRitual.currentActivities.map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${
                                activity.status === 'active' ? 'bg-blue-400' :
                                activity.status === 'leading' ? 'bg-purple-400' :
                                'bg-gray-400'
                              }`} />
                              <div>
                                <div className="text-sm font-medium text-white">{activity.target}</div>
                                <div className="text-xs text-gray-400">{activity.type.replace('_', ' ')}</div>
                              </div>
                            </div>
                            <Badge className={`text-xs ${
                              activity.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                              activity.status === 'leading' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {activity.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-700">
                    {currentRitual.status === 'completed' ? (
                      <Button disabled className="flex-1 bg-green-600 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </Button>
                    ) : currentRitual.status === 'in_progress' ? (
                      <Button className="flex-1 bg-purple-500 text-white hover:bg-purple-600">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Ritual
                      </Button>
                    ) : (
                      <Button disabled className="flex-1 bg-gray-700 text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        Starts {currentRitual.scheduledStart?.toLocaleDateString()}
                      </Button>
                    )}
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress & Rewards */}
            <div className="space-y-6">
              
              {/* Personal Progress */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentRitual.personalProgress && Object.entries(currentRitual.personalProgress).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                        <span className="text-white font-medium">
                          {typeof value === 'number' ? 
                            (key.includes('Percentage') || key.includes('Rate') ? `${value}%` : value) 
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

              {/* Rewards */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Rewards & Recognition</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(currentRitual.rewards || currentRitual.anticipatedRewards || []).map((reward, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      reward.earned ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-gray-700'
                    }`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        reward.earned ? 'bg-yellow-500' : 'bg-gray-600'
                      }`}>
                        {reward.type === 'badge' ? (
                          <Award className="w-4 h-4 text-white" />
                        ) : reward.type === 'title' ? (
                          <Crown className="w-4 h-4 text-white" />
                        ) : (
                          <Star className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${reward.earned ? 'text-yellow-400' : 'text-gray-300'}`}>
                          {reward.name}
                        </div>
                        {reward.description && (
                          <div className="text-xs text-gray-400">{reward.description}</div>
                        )}
                        {reward.progress && (
                          <div className="mt-2">
                            <HiveProgress value={reward.progress} className="bg-gray-600 h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="community" className="mt-0">
          {/* Community Formation Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* Community Stats */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Community Formation Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Overall Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">
                      {currentRitual.communityProgress?.totalParticipants}
                    </div>
                    <div className="text-sm text-gray-400">Total Students</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">
                      {currentRitual.communityProgress?.activeParticipants}
                    </div>
                    <div className="text-sm text-gray-400">Active This Week</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">
                      {currentRitual.communityProgress?.completionRate}%
                    </div>
                    <div className="text-sm text-gray-400">Completion Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400">
                      {currentRitual.communityProgress?.networkConnections?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Peer Connections</div>
                  </div>
                </div>

                {/* Community Health Indicators */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Community Health</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Network Density', value: 84, color: 'blue' },
                      { label: 'Cross-Community Bridges', value: 67, color: 'green' },
                      { label: 'Leadership Emergence', value: 72, color: 'purple' },
                      { label: 'Platform Investment', value: 89, color: 'orange' }
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">{metric.label}</span>
                          <span className="text-white font-medium">{metric.value}%</span>
                        </div>
                        <HiveProgress value={metric.value} className="bg-gray-700" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Activities */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Live Community Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Real-time activity feed */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {[
                    { user: 'Alex M.', action: 'completed networking objective', time: '2m ago', type: 'achievement' },
                    { user: 'Sarah L.', action: 'formed study group bridge', time: '5m ago', type: 'networking' },
                    { user: 'Jordan K.', action: 'joined Photography Club', time: '8m ago', type: 'community' },
                    { user: 'Emma R.', action: 'earned Community Explorer badge', time: '12m ago', type: 'achievement' },
                    { user: 'Marcus J.', action: 'sent peer invitation', time: '15m ago', type: 'networking' },
                    { user: 'Riley F.', action: 'created cross-community bridge', time: '18m ago', type: 'leadership' },
                    { user: 'Taylor S.', action: 'completed daily mission', time: '22m ago', type: 'ritual' },
                    { user: 'Casey W.', action: 'unlocked leadership tools', time: '25m ago', type: 'achievement' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'achievement' ? 'bg-yellow-400' :
                        activity.type === 'networking' ? 'bg-blue-400' :
                        activity.type === 'community' ? 'bg-green-400' :
                        activity.type === 'leadership' ? 'bg-purple-400' :
                        'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm text-white">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </div>
                        <div className="text-xs text-gray-400">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network" className="mt-0">
          {/* Peer Discovery & Network Building */}
          <div className="space-y-6">
            
            {/* Network Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {[
                { label: 'Network Size', value: currentRitual.personalProgress?.networkSize || 28, icon: Users, color: 'blue' },
                { label: 'Bridge Connections', value: currentRitual.personalProgress?.bridgeConnections || 4, icon: Link2, color: 'green' },
                { label: 'Leadership Score', value: currentRitual.personalProgress?.leadershipScore || 67, icon: Crown, color: 'purple' },
                { label: 'Invitations Left', value: currentRitual.networkingTools?.invitationsRemaining || 3, icon: UserPlus, color: 'orange' }
              ].map((stat) => (
                <Card key={stat.label} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="pt-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                      stat.color === 'blue' ? 'bg-blue-500/20' :
                      stat.color === 'green' ? 'bg-green-500/20' :
                      stat.color === 'purple' ? 'bg-purple-500/20' :
                      'bg-orange-500/20'
                    }`}>
                      <stat.icon className={`w-6 h-6 ${
                        stat.color === 'blue' ? 'text-blue-400' :
                        stat.color === 'green' ? 'text-green-400' :
                        stat.color === 'purple' ? 'text-purple-400' :
                        'text-orange-400'
                      }`} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Peer Discovery */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Recommended Connections</CardTitle>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-white hover:bg-gray-800"
                    onClick={() => setShowPeerDiscovery(!showPeerDiscovery)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockPeerNetwork.map((peer) => (
                    <Card key={peer.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {peer.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium text-white">{peer.name}</div>
                            <div className="text-sm text-gray-400">{peer.handle}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-400">{peer.compatibility}%</div>
                            <div className="text-xs text-gray-400">match</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Shared Communities:</div>
                            <div className="flex flex-wrap gap-1">
                              {peer.sharedCommunities.slice(0, 2).map((community) => (
                                <Badge key={community} variant="outline" className="text-xs bg-blue-500/10 text-blue-400">
                                  {community.split(' ')[0]}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Connection Type:</div>
                            <Badge className={`text-xs ${
                              peer.connectionType === 'study_partner' ? 'bg-blue-500/20 text-blue-400' :
                              peer.connectionType === 'roommate_potential' ? 'bg-green-500/20 text-green-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {peer.connectionType.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {peer.status === 'connected' ? (
                            <Button disabled className="w-full bg-green-600 text-white text-sm">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Connected
                            </Button>
                          ) : peer.status === 'invited' ? (
                            <Button disabled className="w-full bg-orange-600 text-white text-sm">
                              <Clock className="w-4 h-4 mr-2" />
                              Invitation Sent
                            </Button>
                          ) : (
                            <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 text-sm">
                              <UserPlus className="w-4 h-4 mr-2" />
                              Send Invitation
                            </Button>
                          )}
                          <div className="text-xs text-gray-400 text-center">
                            Week {peer.ritualProgress.currentWeek} • {peer.ritualProgress.completionRate}% complete
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-0">
          {/* Comprehensive Progress Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Platform Mastery */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Platform Mastery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(mockCommunityInvestment.platformMastery).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-white font-medium">{value}%</span>
                    </div>
                    <HiveProgress value={value} className="bg-gray-700" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Engagement */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Community Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(mockCommunityInvestment.communityEngagement).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                    </span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Preparation Progress */}
            <Card className="bg-gray-800/50 border-gray-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg text-white">Campus Preparation & Confidence Building</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(mockCommunityInvestment.preparationProgress).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-bold ${
                        value >= 80 ? 'bg-green-500/20 text-green-400' :
                        value >= 60 ? 'bg-blue-500/20 text-blue-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {value}%
                      </div>
                      <div className="text-sm text-gray-400">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </div>
    </div>
  );
}

export const WeeklyRitualProgression: Story = {
  render: () => <TemporalRitualsSystem />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
};

export const CommunityFormationView: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState('community');
    return <TemporalRitualsSystem />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
};

export const NetworkBuildingView: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState('network');
    return <TemporalRitualsSystem />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
};

export const MobileRitualsExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <TemporalRitualsSystem />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' }
  }
};