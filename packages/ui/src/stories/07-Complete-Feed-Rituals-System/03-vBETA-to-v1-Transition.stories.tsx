/**
 * HIVE Feed & Rituals System: vBETA to v1 Transition Stories
 * 
 * Demonstrates the temporal phase transition from ritual-driven preparation (vBETA) 
 * to feed-driven coordination (v1), including the celebratory Feed activation 
 * and capability explanation as specified in the PRD.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { HiveProgress } from '../../components/hive-progress';
import { Separator } from '../../components/ui/separator';
import { Switch } from '../../components/ui/switch';
import { 
  Sparkles,
  Trophy,
  Rocket,
  Users,
  Calendar,
  Target,
  CheckCircle,
  ArrowRight,
  Crown,
  Star,
  Activity,
  TrendingUp,
  Zap,
  Heart,
  MessageSquare,
  Share,
  Clock,
  MapPin,
  Coffee,
  BookOpen,
  Award,
  PartyPopper,
  Confetti,
  Gift,
  Lightbulb,
  Globe,
  Network,
  ChevronRight,
  Eye,
  Bell,
  Play,
  Pause,
  AlertCircle,
  Info
} from 'lucide-react';
import { useState, useEffect } from 'react';
import '../../hive-tokens.css';

const meta = {
  title: '06-Platform Systems/vBETA to v1 Transition',
  component: TransitionSystemDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE vBETA to v1 Transition System

The temporal phase transition from ritual-driven preparation (vBETA) to feed-driven coordination (v1). This demonstrates the celebratory Feed activation moment and capability explanation that marks the evolution from foundation-building to full social utility platform.

## Key Transition Features
- **Phase Evolution**: From ritual focus to feed-centric coordination
- **Capability Unlock**: Progressive revelation of advanced features
- **Celebration Moments**: Acknowledging community achievement milestones
- **Seamless Migration**: Preserved data and relationships during transition
- **Enhanced Discovery**: Expanded content surfacing and recommendation systems
- **Social Proof Amplification**: Increased visibility of community success stories

## Temporal Intelligence
The system understands when communities are ready to transition from structured ritual participation to organic feed-driven coordination, creating natural evolution moments.
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for transition demonstrations
const mockTransitionData = {
  vBetaStats: {
    ritualsCompleted: 847,
    communitiesFormed: 156,
    studentsParticipated: 2834,
    toolsBuilt: 239,
    successStories: 67,
    campusEngagement: 0.73
  },
  v1Capabilities: {
    feedAlgorithm: 'Coordination-First Intelligence',
    realTimeUpdates: 'Live Activity Streams',
    smartRecommendations: 'Community-Aware Suggestions',
    crossSystemIntegration: 'Profile-Spaces-Tools Synthesis',
    temporalAwareness: 'Context-Sensitive Content',
    socialProof: 'Authentic Engagement Metrics'
  },
  transitionMilestones: [
    {
      id: 'ritual_mastery',
      title: 'Ritual Mastery Achieved',
      description: 'Community has successfully completed foundational rituals',
      progress: 100,
      status: 'completed',
      unlocks: ['Advanced Feed Features', 'Smart Recommendations']
    },
    {
      id: 'community_formation',
      title: 'Strong Communities Formed',
      description: 'Stable peer networks and collaboration patterns established',
      progress: 100,
      status: 'completed',
      unlocks: ['Cross-Community Discovery', 'Social Proof Systems']
    },
    {
      id: 'tool_ecosystem',
      title: 'Tool Ecosystem Thriving',
      description: 'Students actively building and sharing campus utilities',
      progress: 95,
      status: 'in_progress',
      unlocks: ['Tool Marketplace', 'Collaborative Building']
    },
    {
      id: 'campus_integration',
      title: 'Campus-Wide Adoption',
      description: 'Platform integrated into daily student life patterns',
      progress: 78,
      status: 'in_progress',
      unlocks: ['University Partnerships', 'Official Recognition']
    }
  ],
  celebrationMoments: [
    {
      id: 'feed_activation',
      title: 'Feed System Activated!',
      description: 'Your community has unlocked advanced coordination capabilities',
      timestamp: new Date().toISOString(),
      type: 'major_milestone',
      participants: 2834,
      achievement: 'First Campus to Achieve v1 Status'
    },
    {
      id: 'community_champion',
      title: 'Community Champion Status',
      description: 'UB recognized as a model HIVE campus community',
      timestamp: new Date().toISOString(),
      type: 'recognition',
      participants: 156,
      achievement: 'Outstanding Community Building'
    }
  ]
};

const TransitionSystemDemo = () => {
  const [currentPhase, setCurrentPhase] = useState<'vbeta' | 'transition' | 'v1'>('vbeta');
  const [showCelebration, setShowCelebration] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    if (currentPhase === 'transition') {
      const interval = setInterval(() => {
        setTransitionProgress(prev => {
          if (prev >= 100) {
            setCurrentPhase('v1');
            setShowCelebration(true);
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentPhase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="max-w-2xl mx-auto p-8 text-center space-y-6">
            <div className="text-8xl animate-bounce">🎉</div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--hive-brand-primary)' }}>
              Welcome to HIVE v1!
            </h1>
            <p className="text-xl text-gray-300">
              Your campus community has successfully transitioned to the full social utility platform
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <Badge className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                <Trophy className="w-4 h-4 mr-2" />
                Pioneer Campus
              </Badge>
              <Badge className="bg-purple-600 text-white">
                <Crown className="w-4 h-4 mr-2" />
                Community Champion
              </Badge>
            </div>
            <Button 
              onClick={() => setShowCelebration(false)}
              className="hive-interactive mt-6" 
              style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
            >
              Explore New Capabilities
            </Button>
          </div>
        </div>
      )}

      {/* Header with Phase Indicator */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Platform Evolution</h1>
              <p className="text-gray-400">From Ritual-Driven Foundation to Feed-Centric Coordination</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge 
                className={`${
                  currentPhase === 'vbeta' ? 'hive-interactive' : 'bg-gray-700'
                }`}
                style={currentPhase === 'vbeta' ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
              >
                vBETA
              </Badge>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <Badge 
                className={`${
                  currentPhase === 'v1' ? 'bg-purple-600 text-white' : 'bg-gray-700'
                }`}
              >
                v1
              </Badge>
            </div>
          </div>

          {/* Phase Controls */}
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant={currentPhase === 'vbeta' ? 'default' : 'outline'}
              onClick={() => {
                setCurrentPhase('vbeta');
                setTransitionProgress(0);
                setShowCelebration(false);
              }}
              className={currentPhase === 'vbeta' ? 'hive-interactive' : 'border-gray-600 text-white'}
              style={currentPhase === 'vbeta' ? {
                backgroundColor: 'var(--hive-brand-primary)',
                color: 'var(--hive-text-inverse)'
              } : {}}
            >
              Show vBETA Phase
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              onClick={() => {
                setCurrentPhase('transition');
                setTransitionProgress(0);
              }}
              className="border-gray-600 text-white"
              disabled={currentPhase === 'transition'}
            >
              Start Transition
            </Button>
            <Button 
              size="sm" 
              variant={currentPhase === 'v1' ? 'default' : 'outline'}
              onClick={() => {
                setCurrentPhase('v1');
                setTransitionProgress(100);
              }}
              className={currentPhase === 'v1' ? 'bg-purple-600 text-white' : 'border-gray-600 text-white'}
            >
              Show v1 Phase
            </Button>
          </div>
        </div>
      </div>

      {/* Transition Progress */}
      {currentPhase === 'transition' && (
        <div className="bg-gray-800/50 border-b border-gray-700">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center space-x-4">
              <Rocket className="w-6 h-6" style={{ color: 'var(--hive-brand-primary)' }} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Transitioning to v1...</span>
                  <span className="text-gray-400 text-sm">{transitionProgress}%</span>
                </div>
                <HiveProgress value={transitionProgress} className="h-2" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Migrating community data and activating advanced coordination features
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 space-y-8">

        {/* vBETA Phase Display */}
        {currentPhase === 'vbeta' && (
          <>
            {/* vBETA Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold" style={{ color: 'var(--hive-brand-primary)' }}>
                    {mockTransitionData.vBetaStats.ritualsCompleted}
                  </div>
                  <div className="text-sm text-gray-400">Rituals Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-blue-400">
                    {mockTransitionData.vBetaStats.communitiesFormed}
                  </div>
                  <div className="text-sm text-gray-400">Communities Formed</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-green-400">
                    {mockTransitionData.vBetaStats.studentsParticipated}
                  </div>
                  <div className="text-sm text-gray-400">Students Engaged</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-purple-400">
                    {mockTransitionData.vBetaStats.toolsBuilt}
                  </div>
                  <div className="text-sm text-gray-400">Tools Built</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-orange-400">
                    {mockTransitionData.vBetaStats.successStories}
                  </div>
                  <div className="text-sm text-gray-400">Success Stories</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-pink-400">
                    {Math.round(mockTransitionData.vBetaStats.campusEngagement * 100)}%
                  </div>
                  <div className="text-sm text-gray-400">Campus Engagement</div>
                </CardContent>
              </Card>
            </div>

            {/* Transition Readiness */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                  Transition Readiness Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTransitionData.transitionMilestones.map((milestone) => (
                  <div key={milestone.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle 
                          className={`w-5 h-5 mr-3 ${
                            milestone.status === 'completed' ? 'text-green-400' : 'text-gray-500'
                          }`} 
                        />
                        <div>
                          <h4 className="text-white font-medium">{milestone.title}</h4>
                          <p className="text-gray-400 text-sm">{milestone.description}</p>
                        </div>
                      </div>
                      <Badge 
                        className={`${
                          milestone.status === 'completed' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                        }`}
                      >
                        {milestone.progress}%
                      </Badge>
                    </div>
                    <div className="ml-8">
                      <HiveProgress value={milestone.progress} className="h-1 mb-2" />
                      <div className="flex flex-wrap gap-1">
                        {milestone.unlocks.map((unlock) => (
                          <Badge key={unlock} variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                            {unlock}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {/* v1 Phase Display */}
        {currentPhase === 'v1' && (
          <>
            {/* New Capabilities Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(mockTransitionData.v1Capabilities).map(([key, value]) => (
                <Card key={key} className="bg-gradient-to-br from-purple-900/50 to-gray-800/50 border-purple-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-base flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm">{value}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge className="bg-purple-600 text-white text-xs">
                        New in v1
                      </Badge>
                      <Button size="sm" variant="secondary" className="border-purple-600 text-purple-400">
                        <Eye className="w-3 h-3 mr-1" />
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Achievement Celebrations */}
            <Card className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Community Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTransitionData.celebrationMoments.map((moment) => (
                  <div key={moment.id} className="flex items-start space-x-4 p-4 bg-black/30 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                        {moment.type === 'major_milestone' ? (
                          <PartyPopper className="w-6 h-6 text-white" />
                        ) : (
                          <Award className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{moment.title}</h4>
                      <p className="text-gray-300 text-sm mt-1">{moment.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {moment.participants} participants
                        </span>
                        <Badge className="bg-yellow-600 text-black text-xs">
                          {moment.achievement}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Feed Preview */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                  Enhanced Feed Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Sample Enhanced Feed Items */}
                {[
                  {
                    type: 'coordination',
                    title: 'Study Group Formation',
                    description: 'CS majors organizing for finals week - 8 spots remaining',
                    urgency: 'high',
                    participants: 12,
                    timeframe: '2 hours'
                  },
                  {
                    type: 'tool_launch',
                    title: 'New Tool: Dining Hall Wait Times',
                    description: 'Real-time crowd tracking for all campus dining locations',
                    urgency: 'medium',
                    participants: 45,
                    timeframe: '1 day'
                  },
                  {
                    type: 'community_milestone',
                    title: 'Engineering Space Hits 500 Members',
                    description: 'Celebration event tomorrow at Alumni Arena',
                    urgency: 'low',
                    participants: 500,
                    timeframe: '3 days'
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge 
                            className={`text-xs ${
                              item.urgency === 'high' ? 'bg-red-600 text-white' :
                              item.urgency === 'medium' ? 'bg-yellow-600 text-black' :
                              'bg-green-600 text-white'
                            }`}
                          >
                            {item.type.replace('_', ' ')}
                          </Badge>
                          <span className="text-xs text-gray-500">{item.timeframe} ago</span>
                        </div>
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {item.participants}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.timeframe}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="secondary" className="border-gray-600 text-white">
                          <Heart className="w-3 h-3 mr-1" />
                          Save
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
          </>
        )}
      </div>
    </div>
  );
};

export const TransitionOverview: Story = {
  render: () => <TransitionSystemDemo />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const CelebrationMoment: Story = {
  render: () => {
    const CelebrationDemo = () => {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: `${Math.random() * 20 + 10}px`
                }}
              >
                ✨
              </div>
            ))}
          </div>

          {/* Main Celebration Content */}
          <div className="max-w-4xl mx-auto p-8 text-center space-y-8 relative z-10">
            <div className="text-9xl animate-bounce">🎉</div>
            
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                Welcome to HIVE v1!
              </h1>
              <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
                University at Buffalo has successfully transitioned to the full social utility platform
              </p>
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
                <Trophy className="w-5 h-5 mr-2" />
                Pioneer Campus
              </Badge>
              <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Crown className="w-5 h-5 mr-2" />
                Community Champion
              </Badge>
              <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <Star className="w-5 h-5 mr-2" />
                Excellence in Innovation
              </Badge>
            </div>

            {/* Stats Celebration */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-700">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-yellow-400">2,834</div>
                  <div className="text-yellow-300">Students Engaged</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-700">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-purple-400">156</div>
                  <div className="text-purple-300">Communities Formed</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-700">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-blue-400">847</div>
                  <div className="text-blue-300">Rituals Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-700">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-green-400">239</div>
                  <div className="text-green-300">Tools Built</div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="text-xl px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
              >
                <Rocket className="w-6 h-6 mr-3" />
                Explore v1 Capabilities
              </Button>
              <p className="text-gray-400 text-sm">
                Experience the full power of social utility coordination
              </p>
            </div>
          </div>
        </div>
      );
    };

    return <CelebrationDemo />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const CapabilityComparison: Story = {
  render: () => {
    const ComparisonDemo = () => {
      const capabilities = {
        vBeta: {
          title: 'vBETA: Foundation Building',
          color: 'var(--hive-brand-primary)',
          features: [
            { name: 'Structured Rituals', description: '4-week community formation cycles' },
            { name: 'Basic Tool Creation', description: 'Simple form builders and utilities' },
            { name: 'Peer Discovery', description: 'Find study partners and collaborators' },
            { name: 'Community Challenges', description: 'Gamified participation tracking' },
            { name: 'Profile Building', description: 'Academic and social identity formation' }
          ]
        },
        v1: {
          title: 'v1: Full Coordination Platform',
          color: '#8b5cf6',
          features: [
            { name: 'Intelligent Feed Algorithm', description: 'Coordination-first content surfacing' },
            { name: 'Advanced Tool Marketplace', description: 'Complex utilities with collaboration' },
            { name: 'Cross-System Integration', description: 'Seamless profile-spaces-tools synthesis' },
            { name: 'Real-Time Coordination', description: 'Live activity streams and notifications' },
            { name: 'Social Proof Systems', description: 'Authentic engagement and influence metrics' }
          ]
        }
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Platform Evolution</h1>
              <p className="text-xl text-gray-400">From Foundation to Full Coordination</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {Object.entries(capabilities).map(([phase, data]) => (
                <Card key={phase} className="bg-gray-800/50 border-gray-700 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <div 
                        className="w-6 h-6 rounded-full mr-3" 
                        style={{ backgroundColor: data.color }}
                      />
                      {data.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {data.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${data.color}20`, border: `2px solid ${data.color}` }}
                          >
                            <CheckCircle className="w-4 h-4" style={{ color: data.color }} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{feature.name}</h4>
                          <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-700">
                      <Badge 
                        className="w-full justify-center py-2 text-sm"
                        style={{ 
                          backgroundColor: phase === 'vBeta' ? 'var(--hive-brand-primary)' : '#8b5cf6',
                          color: 'white'
                        }}
                      >
                        {phase === 'vBeta' ? 'Foundation Phase Complete' : 'Full Platform Active'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl border border-purple-700">
                <ArrowRight className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Seamless Evolution</h3>
                  <p className="text-purple-300">All your data, relationships, and communities preserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return <ComparisonDemo />;
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const MobileTransitionExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <TransitionSystemDemo />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};