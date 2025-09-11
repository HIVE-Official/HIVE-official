/**
 * HIVE Enhanced Feed Discovery System
 * Complete temporal intelligence-driven content discovery with coordination opportunities and community formation
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
  Users,
  BookOpen,
  Zap,
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
  Activity,
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
  AlertCircle,
  Info
} from 'lucide-react';
import { useState, useEffect } from 'react';
import '../../hive-tokens.css';

const meta = {
  title: '06-Platform Systems/Enhanced Feed Discovery',
  component: EnhancedFeedDiscoverySystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Enhanced Feed Discovery System

The complete temporal intelligence-driven content discovery system implementing the Feed & Rituals PRD. Features coordination-focused algorithms, community formation patterns, and utility-first content surfacing.

## Key Features
- **Temporal Intelligence**: Phase-appropriate content (vBETA Rituals → v1 Feed)
- **Coordination Focus**: Utility-first content over engagement optimization
- **Community Formation**: Content that builds genuine connections
- **Cross-System Integration**: Profile, Spaces, HiveLAB activity aggregation
- **Real-Time Coordination**: Live activity surfacing with immediate response
- **Student Agency**: Choice-driven discovery over algorithmic manipulation
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data representing cross-system integration
const mockEnhancedFeedContent = [
  {
    id: 'coord_1',
    type: 'coordination_opportunity',
    priority: 'urgent',
    author: {
      name: 'Sarah Chen',
      handle: '@sarahc',
      avatar: 'SC',
      role: 'Space Leader',
      isVerified: true
    },
    space: {
      name: 'Ellicott 3rd Floor',
      type: 'campus_living',
      memberCount: 47
    },
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    content: {
      title: 'Emergency Laundry Coordination',
      text: 'Washing machines are all broken on floors 2-4. We\'ve got 3 working ones in the basement. Who needs to do laundry today? Let\'s coordinate time slots so everyone gets a turn.',
      coordinationType: 'resource_sharing',
      urgency: 'high',
      responseDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      participantSlots: 12,
      currentParticipants: 7
    },
    engagement: {
      responses: 23,
      coordination_joins: 7,
      shares: 4,
      isUserParticipating: false
    },
    tags: ['urgent', 'dorm-life', 'coordination'],
    coordinationOutcome: 'active'
  },
  {
    id: 'academic_1',
    type: 'academic_coordination',
    priority: 'high',
    author: {
      name: 'Marcus Rodriguez',
      handle: '@marcusr',
      avatar: 'MR',
      role: 'Study Group Leader',
      isVerified: false
    },
    space: {
      name: 'CSE 442 - Software Engineering',
      type: 'academic',
      memberCount: 89
    },
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    content: {
      title: 'Group Project Teams Forming',
      text: 'Final project teams forming NOW. Looking for 2-3 people with React/Node experience. We already have the UI/UX designer and a backend dev. Project idea: Campus event coordination app.',
      coordinationType: 'team_formation',
      urgency: 'medium',
      skillsNeeded: ['React', 'Node.js', 'API Development'],
      teamSize: 5,
      currentTeamSize: 2,
      projectDeadline: 'December 15, 2024'
    },
    engagement: {
      responses: 12,
      coordination_joins: 3,
      shares: 8,
      isUserParticipating: false
    },
    tags: ['academics', 'team-formation', 'cse442'],
    coordinationOutcome: 'forming'
  },
  {
    id: 'tool_1',
    type: 'tool_deployment',
    priority: 'medium',
    author: {
      name: 'Alex Kim',
      handle: '@alexk',
      avatar: 'AK',
      role: 'Builder',
      isVerified: true
    },
    space: {
      name: 'UB Student Builders',
      type: 'community',
      memberCount: 156
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    content: {
      title: 'New Tool: Study Room Availability Tracker',
      text: 'Just deployed a real-time study room tracker for Lockwood Library! Shows availability, capacity, and noise levels. Already helping 200+ students find perfect study spots.',
      tool: {
        name: 'Study Room Finder',
        description: 'Real-time availability for all UB study spaces',
        category: 'Academic Tools',
        usageCount: 247,
        successRate: 94,
        deployedSpaces: ['Lockwood Library', 'Student Union', 'Capen Hall']
      },
      impact: {
        problemSolved: 'Study space coordination',
        studentsHelped: 247,
        timesSaved: '12 hours/student/week'
      }
    },
    engagement: {
      responses: 34,
      coordination_joins: 12,
      shares: 28,
      isUserParticipating: false
    },
    tags: ['tool-deployment', 'study-spaces', 'productivity'],
    coordinationOutcome: 'successful'
  },
  {
    id: 'social_1',
    type: 'social_coordination',
    priority: 'medium',
    author: {
      name: 'Jamie Thompson',
      handle: '@jamiet',
      avatar: 'JT',
      role: 'Event Coordinator',
      isVerified: false
    },
    space: {
      name: 'UB Photography Club',
      type: 'interest',
      memberCount: 73
    },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    content: {
      title: 'Golden Hour Photo Walk This Evening',
      text: 'Perfect lighting conditions today! Impromptu photo walk around campus at 6:30 PM. Meeting at the Student Union steps. Bring your cameras (phones totally fine too).',
      event: {
        title: 'Campus Golden Hour Photo Walk',
        startTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        location: 'Student Union Steps',
        estimatedDuration: '90 minutes',
        skillLevel: 'all_welcome',
        equipmentNeeded: 'camera_or_phone'
      },
      coordinationType: 'spontaneous_activity'
    },
    engagement: {
      responses: 18,
      coordination_joins: 14,
      shares: 6,
      isUserParticipating: false
    },
    tags: ['photography', 'campus-life', 'creative'],
    coordinationOutcome: 'confirmed'
  },
  {
    id: 'bridge_1',
    type: 'community_bridge',
    priority: 'high',
    author: {
      name: 'Riley Foster',
      handle: '@rileyf',
      avatar: 'RF',
      role: 'Community Bridge',
      isVerified: true
    },
    crossCommunities: [
      { name: 'Pre-Med Society', memberCount: 234 },
      { name: 'Biology Research Group', memberCount: 89 },
      { name: 'Chemistry Study Network', memberCount: 156 }
    ],
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    content: {
      title: 'Cross-Discipline MCAT Prep Network',
      text: 'Connecting pre-med, bio, and chem students for comprehensive MCAT prep. We\'ve got content experts in each area and are forming integrated study groups. Way more effective than solo prep.',
      coordinationType: 'network_formation',
      benefits: [
        'Comprehensive coverage across all MCAT sections',
        'Peer teaching reinforces learning',
        'Shared resource costs',
        'Built-in accountability network'
      ],
      commitmentLevel: 'high',
      timeframe: 'Spring 2025 semester'
    },
    engagement: {
      responses: 67,
      coordination_joins: 23,
      shares: 34,
      isUserParticipating: false
    },
    tags: ['mcat-prep', 'cross-community', 'pre-med'],
    coordinationOutcome: 'network_forming'
  }
];

// Algorithm demonstration data
const mockPersonalizationFactors = {
  communityRelevance: 0.4,
  temporalUrgency: 0.3,
  socialContext: 0.2,
  coordinationOpportunity: 0.1,
  userPreferences: {
    contentTypes: ['academic_coordination', 'tool_deployment', 'social_coordination'],
    priorityCommunities: ['Ellicott 3rd Floor', 'CSE 442 - Software Engineering', 'UB Photography Club'],
    coordinationStyle: 'active_participant',
    responseTimePreference: 'immediate'
  }
};

function EnhancedFeedDiscoverySystem() {
  const [activeView, setActiveView] = useState('coordination');
  const [feedFilter, setFeedFilter] = useState('all');
  const [showAlgorithmDetails, setShowAlgorithmDetails] = useState(false);
  const [realTimeMode, setRealTimeMode] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeMode) return;
    
    const interval = setInterval(() => {
      // Update timestamps and engagement metrics
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [realTimeMode]);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getContentPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-400 bg-red-500/10';
      case 'high': return 'border-[var(--hive-gold)] bg-[var(--hive-gold)]/10';
      case 'medium': return 'border-blue-400 bg-blue-500/10';
      default: return 'border-gray-600 bg-gray-800/50';
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'coordination_opportunity': return <Users className="h-5 w-5 text-red-400" />;
      case 'academic_coordination': return <BookOpen className="h-5 w-5 text-blue-400" />;
      case 'tool_deployment': return <Zap className="h-5 w-5 text-[var(--hive-gold)]" />;
      case 'social_coordination': return <Calendar className="h-5 w-5 text-green-400" />;
      case 'community_bridge': return <Sparkles className="h-5 w-5 text-[var(--hive-gold)]" />;
      default: return <Activity className="h-5 w-5 text-gray-400" />;
    }
  };

  const filteredContent = mockEnhancedFeedContent.filter(item => {
    if (feedFilter === 'all') return true;
    if (feedFilter === 'urgent') return item.priority === 'urgent';
    if (feedFilter === 'coordination') return item.type.includes('coordination');
    if (feedFilter === 'tools') return item.type === 'tool_deployment';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-[var(--hive-text-primary)]">
      
      {/* Enhanced Header with Temporal Intelligence */}
      <div className="border-b border-gray-800 bg-[var(--hive-black)]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-[var(--hive-gold)] rounded-xl flex items-center justify-center">
                  <Compass className="h-5 w-5 text-[var(--hive-text-primary)]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Campus Feed</h1>
                  <p className="text-gray-400">Coordination-focused discovery</p>
                </div>
              </div>
              
              {/* Phase Indicator */}
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                v1 Active • Live Coordination
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Real-time Toggle */}
              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2">
                <div className={`w-2 h-2 rounded-full ${realTimeMode ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-sm text-gray-400">
                  {realTimeMode ? 'Live' : 'Paused'}
                </span>
                <Switch 
                  checked={realTimeMode}
                  onCheckedChange={setRealTimeMode}
                  className="scale-75"
                />
              </div>
              
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Search className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  3
                </div>
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced Navigation with Algorithm Insight */}
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="coordination" className="data-[state=active]:bg-blue-500 data-[state=active]:text-[var(--hive-text-primary)]">
                <Users className="w-4 h-4 mr-2" />
                Coordination
              </TabsTrigger>
              <TabsTrigger value="discovery" className="data-[state=active]:bg-[var(--hive-gold)] data-[state=active]:text-[var(--hive-text-primary)]">
                <Compass className="w-4 h-4 mr-2" />
                Discovery  
              </TabsTrigger>
              <TabsTrigger value="communities" className="data-[state=active]:bg-green-500 data-[state=active]:text-[var(--hive-text-primary)]">
                <Globe className="w-4 h-4 mr-2" />
                Communities
              </TabsTrigger>
              <TabsTrigger value="algorithm" className="data-[state=active]:bg-[var(--hive-gold)] data-[state=active]:text-[var(--hive-text-primary)]">
                <Sparkles className="w-4 h-4 mr-2" />
                Algorithm
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Content Filters */}
          <div className="flex items-center space-x-2 mt-4">
            <div className="flex-1 flex space-x-2">
              {[
                { id: 'all', label: 'All Activity', count: mockEnhancedFeedContent.length },
                { id: 'urgent', label: 'Urgent', count: mockEnhancedFeedContent.filter(i => i.priority === 'urgent').length },
                { id: 'coordination', label: 'Coordination', count: mockEnhancedFeedContent.filter(i => i.type.includes('coordination')).length },
                { id: 'tools', label: 'Tools', count: mockEnhancedFeedContent.filter(i => i.type === 'tool_deployment').length },
              ].map(({ id, label, count }) => (
                <Button
                  key={id}
                  size="sm"
                  variant={feedFilter === id ? "default" : "outline"}
                  onClick={() => setFeedFilter(id)}
                  className={feedFilter === id 
                    ? "bg-blue-500 text-[var(--hive-text-primary)] border-blue-400"
                    : "border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800"
                  }
                >
                  {label} ({count})
                </Button>
              ))}
            </div>
            <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto p-4">
        
        <TabsContent value="coordination" className="mt-0">
          {/* Coordination Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-red-400">12</div>
                <div className="text-sm text-gray-400">Urgent Coordination</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-blue-400">34</div>
                <div className="text-sm text-gray-400">Active Opportunities</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-green-400">89</div>
                <div className="text-sm text-gray-400">Successful Today</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-[var(--hive-gold)]">156</div>
                <div className="text-sm text-gray-400">Students Coordinating</div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Feed Content */}
          <div className="space-y-6">
            {filteredContent.map((item: any) => (
              <Card key={item.id} className={`p-6 border-2 hover:shadow-xl transition-all duration-200 ${getContentPriorityColor(item.priority)}`}>
                
                {/* Content Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    {/* Content Type Icon */}
                    <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      {getContentTypeIcon(item.type)}
                    </div>
                    
                    {/* Author & Community Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-[var(--hive-text-primary)]">{item.author.name}</h4>
                        <span className="text-gray-400 text-sm">@{item.author.handle}</span>
                        {item.author.isVerified && (
                          <Award className="w-4 h-4 text-blue-400" />
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {item.author.role}
                        </Badge>
                      </div>
                      
                      {/* Community Context */}
                      {item.space && (
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>in</span>
                          <span className="font-medium text-blue-400">{item.space.name}</span>
                          <span>•</span>
                          <span>{item.space.memberCount} members</span>
                        </div>
                      )}
                      
                      {/* Cross-Community Bridge */}
                      {item.crossCommunities && (
                        <div className="flex items-center space-x-1 text-sm text-gray-400 mt-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Bridging {item.crossCommunities.length} communities</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Priority & Time */}
                  <div className="text-right">
                    <Badge className={`mb-2 ${
                      item.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                      item.priority === 'high' ? 'bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {item.priority} priority
                    </Badge>
                    <div className="text-xs text-gray-400">
                      {formatTimeAgo(item.timestamp)}
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">{item.content.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-3">{item.content.text}</p>
                  
                  {/* Coordination Details */}
                  {item.content.coordinationType && (
                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Target className="w-5 h-5 text-blue-400" />
                          <span className="font-medium text-[var(--hive-text-primary)]">
                            {item.content.coordinationType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                        {item.content.responseDeadline && (
                          <div className="flex items-center space-x-1 text-sm text-[var(--hive-gold)]">
                            <Clock className="w-4 h-4" />
                            <span>Respond by {item.content.responseDeadline.toLocaleTimeString()}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Participation Status */}
                      {item.content.participantSlots && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Participation</span>
                            <span className="text-[var(--hive-text-primary)]">
                              {item.content.currentParticipants}/{item.content.participantSlots} slots
                            </span>
                          </div>
                          <HiveProgress 
                            value={(item.content.currentParticipants / item.content.participantSlots) * 100}
                            className="bg-gray-700"
                          />
                        </div>
                      )}

                      {/* Skills Needed */}
                      {item.content.skillsNeeded && (
                        <div className="mb-3">
                          <span className="text-sm text-gray-400 block mb-2">Skills Needed:</span>
                          <div className="flex flex-wrap gap-1">
                            {item.content.skillsNeeded.map((skill: any) => (
                              <Badge key={skill} variant="secondary" className="text-xs bg-blue-500/10 text-blue-400">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tool Impact */}
                      {item.content.impact && (
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400 mb-2">Impact:</div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                            <div className="text-center p-2 bg-gray-700 rounded">
                              <div className="font-bold text-[var(--hive-text-primary)]">{item.content.impact.studentsHelped}</div>
                              <div className="text-gray-400">Students Helped</div>
                            </div>
                            <div className="text-center p-2 bg-gray-700 rounded">
                              <div className="font-bold text-green-400">{item.content.tool?.successRate}%</div>
                              <div className="text-gray-400">Success Rate</div>
                            </div>
                            <div className="text-center p-2 bg-gray-700 rounded">
                              <div className="font-bold text-blue-400">{item.content.impact.timesSaved}</div>
                              <div className="text-gray-400">Time Saved</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag: any) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-gray-800 text-gray-400">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Coordination Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-4">
                    {/* Primary Coordination Action */}
                    <Button 
                      className={`${
                        item.engagement.isUserParticipating
                          ? 'bg-green-600 text-[var(--hive-text-primary)]' 
                          : 'bg-blue-500 text-[var(--hive-text-primary)] hover:bg-blue-600'
                      }`}
                    >
                      {item.engagement.isUserParticipating ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Participating
                        </>
                      ) : item.type === 'coordination_opportunity' ? (
                        <>
                          <Users className="w-4 h-4 mr-2" />
                          Join Coordination
                        </>
                      ) : item.type === 'tool_deployment' ? (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Try Tool
                        </>
                      ) : (
                        <>
                          <ChevronRight className="w-4 h-4 mr-2" />
                          Get Involved
                        </>
                      )}
                    </Button>

                    {/* Secondary Actions */}
                    <Button variant="secondary" size="sm" className="border-gray-600 text-gray-400 hover:text-[var(--hive-text-primary)]">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {item.engagement.responses}
                    </Button>
                    <Button variant="secondary" size="sm" className="border-gray-600 text-gray-400 hover:text-[var(--hive-text-primary)]">
                      <Share className="w-4 h-4 mr-1" />
                      {item.engagement.shares}
                    </Button>
                  </div>

                  {/* Coordination Status */}
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${
                      item.coordinationOutcome === 'successful' ? 'bg-green-500/20 text-green-400' :
                      item.coordinationOutcome === 'active' ? 'bg-blue-500/20 text-blue-400' :
                      item.coordinationOutcome === 'forming' ? 'bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {item.coordinationOutcome.replace('_', ' ')}
                    </Badge>
                    {item.engagement.coordination_joins > 0 && (
                      <div className="text-xs text-gray-400">
                        +{item.engagement.coordination_joins} coordinating
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
              Load More Coordination Opportunities
            </Button>
          </div>
        </TabsContent>

        {/* Algorithm Insights Tab */}
        <TabsContent value="algorithm" className="mt-0">
          <div className="space-y-6">
            {/* Algorithm Explanation */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[var(--hive-gold)]" />
                  <span>Feed Algorithm: Coordination-First Intelligence</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Our feed algorithm prioritizes coordination opportunities over engagement optimization. 
                  Content is ranked based on utility-first principles that help students solve real problems and coordinate effectively.
                </p>
                
                {/* Algorithm Factors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[var(--hive-text-primary)]">Ranking Factors</h4>
                    <div className="space-y-2">
                      {Object.entries(mockPersonalizationFactors)
                        .filter(([key]) => key !== 'userPreferences')
                        .map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-gray-700 rounded">
                                <div 
                                  className="h-full bg-blue-400 rounded" 
                                  style={{ width: `${value * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-[var(--hive-text-primary)] font-medium">
                                {Math.round(value * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[var(--hive-text-primary)]">Your Preferences</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-400 block mb-1">Content Types:</span>
                        <div className="flex flex-wrap gap-1">
                          {mockPersonalizationFactors.userPreferences.contentTypes.map((type) => (
                            <Badge key={type} variant="secondary" className="text-xs bg-blue-500/10 text-blue-400">
                              {type.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400 block mb-1">Priority Communities:</span>
                        <div className="space-y-1">
                          {mockPersonalizationFactors.userPreferences.priorityCommunities.slice(0, 2).map((community: any) => (
                            <div key={community} className="text-xs text-[var(--hive-text-primary)] bg-gray-700 rounded px-2 py-1">
                              {community}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Algorithm Principles */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-[var(--hive-text-primary)] mb-3">Core Principles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-[var(--hive-text-primary)]">Utility-First Ranking</div>
                        <div className="text-gray-400">Content that enables coordination ranks higher than entertainment</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-[var(--hive-text-primary)]">Community Context</div>
                        <div className="text-gray-400">Content relevance based on your community memberships</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-[var(--hive-text-primary)]">Temporal Awareness</div>
                        <div className="text-gray-400">Time-sensitive coordination gets priority placement</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-[var(--hive-text-primary)]">Student Agency</div>
                        <div className="text-gray-400">You control preferences; we don't manipulate engagement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-Time Processing */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span>Real-Time Content Processing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Content Sources Active:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[var(--hive-text-primary)]">4 systems</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { name: 'Spaces', count: 23, status: 'active' },
                      { name: 'Profile', count: 12, status: 'active' },
                      { name: 'HiveLAB', count: 8, status: 'active' },
                      { name: 'Admin', count: 3, status: 'active' }
                    ].map((source: any) => (
                      <div key={source.name} className="bg-gray-700 rounded p-3">
                        <div className="text-lg font-bold text-[var(--hive-text-primary)]">{source.count}</div>
                        <div className="text-xs text-gray-400">{source.name} Events</div>
                        <div className="text-xs text-green-400 mt-1">● {source.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </div>
    </div>
  );
}

export const EnhancedCoordinationFeed: Story = {
  render: () => <EnhancedFeedDiscoverySystem />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
};

export const MobileFeedExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <EnhancedFeedDiscoverySystem />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' }
  }
};

export const AlgorithmDemonstration: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('algorithm');
    return <EnhancedFeedDiscoverySystem />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
};