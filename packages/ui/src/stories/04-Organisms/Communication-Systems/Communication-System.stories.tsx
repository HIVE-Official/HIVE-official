import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../atomic/ui/card';
import { Button } from '../../../atomic/atoms/button-enhanced';
import { Input } from '../../../atomic/atoms/input-enhanced';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../atomic/atoms/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../atomic/atoms/avatar';
import { Progress } from '../../../components/ui/progress';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../atomic/ui/tabs';
import { Alert, AlertDescription } from '../../../atomic/molecules/alert-toast-system';
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Circle,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  User,
  Mail,
  School,
  MapPin,
  Calendar,
  MessageCircle,
  Users,
  Plus,
  Settings,
  Heart,
  Share,
  Bookmark,
  Search,
  Filter,
  Bell,
  Home,
  Compass,
  BookOpen,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Star,
  Award,
  Wifi,
  Smartphone,
  Monitor,
  Coffee,
  Moon,
  Sun,
  GraduationCap,
  Building,
  PlusCircle,
  UserPlus,
  Camera,
  Edit3,
  Send,
  Video,
  Phone,
  Files,
  Activity,
  BarChart3,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  RefreshCw
} from 'lucide-react';

/**
 * # HIVE Complete User Flows System
 * 
 * End-to-end user journey documentation for the HIVE platform.
 * Shows how all individual systems work together to create seamless campus experiences.
 * 
 * ## Key User Journeys:
 * - **New Student Journey**: From discovery through active community member
 * - **Daily Usage Patterns**: Typical student interactions throughout the day
 * - **Social Engagement Flow**: Making connections and building community
 * - **Academic Integration**: Study groups, class coordination, resource sharing
 * - **Campus Event Coordination**: Planning, discovery, and participation
 * - **Tool Creation & Sharing**: Building and sharing campus utilities
 * - **Crisis & Support Flows**: Help, safety, and community support
 */

const meta: Meta<typeof React.Fragment> = {
  title: '17-Live Frontend/Complete User Flows System',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete end-to-end user journey documentation showing how all HIVE systems work together'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Flow State Management
const useUserFlows = () => {
  const [activeFlow, setActiveFlow] = useState('new-student');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const playFlow = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const pauseFlow = () => {
    setIsPlaying(false);
  };

  const resetFlow = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const nextStep = (flowSteps: unknown[]) => {
    if (currentStep < flowSteps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setCompletedSteps(prev => prev.slice(0, -1));
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setCompletedSteps(Array.from({ length: step }, (_, i) => i));
  };

  return {
    activeFlow,
    setActiveFlow,
    currentStep,
    setCurrentStep,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    completedSteps,
    playFlow,
    pauseFlow,
    resetFlow,
    nextStep,
    prevStep,
    goToStep
  };
};

// User Flow Data
const USER_FLOWS = {
  'new-student': {
    title: 'New Student Journey',
    description: 'From discovery to active community member on HIVE',
    duration: '15-20 minutes',
    category: 'Onboarding',
    icon: GraduationCap,
    steps: [
      {
        id: 'discovery',
        title: 'Discovery',
        description: 'Student hears about HIVE from classmate',
        duration: '30 seconds',
        system: 'Marketing/Referral',
        actions: ['Receives text/DM about HIVE', 'Visits landing page', 'Learns about UB-only community'],
        mockup: 'Landing page with UB branding',
        keyElements: ['UB verification badge', 'Student testimonials', 'Feature overview']
      },
      {
        id: 'signup',
        title: 'Account Creation',
        description: 'Creates account with buffalo.edu email',
        duration: '2 minutes',
        system: 'Authentication',
        actions: ['Enters @buffalo.edu email', 'Receives verification code', 'Sets initial password'],
        mockup: 'Clean signup form with UB validation',
        keyElements: ['Email verification', 'Strong password requirements', 'Terms acceptance']
      },
      {
        id: 'onboarding',
        title: 'Profile Setup',
        description: 'Completes comprehensive campus profile',
        duration: '5-7 minutes',
        system: 'Onboarding Wizard',
        actions: ['Uploads photo', 'Sets handle', 'Selects major/year', 'Chooses dorm', 'Adds bio'],
        mockup: '7-step onboarding wizard',
        keyElements: ['Progress indicator', 'Skip options', 'Smart defaults', 'Photo guidelines']
      },
      {
        id: 'space-discovery',
        title: 'First Space Joins',
        description: 'Discovers and joins relevant campus spaces',
        duration: '3-5 minutes',
        system: 'Spaces Discovery',
        actions: ['Views recommended spaces', 'Joins CS major space', 'Joins dorm space', 'Joins interest space'],
        mockup: 'Smart space recommendations',
        keyElements: ['Algorithmic suggestions', 'One-click joining', 'Preview content']
      },
      {
        id: 'first-interactions',
        title: 'Initial Engagement',
        description: 'Makes first posts and connections',
        duration: '5-8 minutes',
        system: 'Social Feed',
        actions: ['Makes introduction post', 'Comments on space posts', 'Reacts to content', 'Follows interesting students'],
        mockup: 'Guided first post experience',
        keyElements: ['Introduction prompts', 'Engagement suggestions', 'Positive reinforcement']
      },
      {
        id: 'tool-exploration',
        title: 'Tool Discovery',
        description: 'Explores and uses campus tools',
        duration: '2-3 minutes',
        system: 'Tools System',
        actions: ['Browses tool marketplace', 'Uses study room finder', 'Bookmarks useful tools'],
        mockup: 'Featured tools for new students',
        keyElements: ['Popular tools', 'New student category', 'Quick actions']
      },
      {
        id: 'habit-formation',
        title: 'Daily Ritual Creation',
        description: 'Sets up daily campus habits',
        duration: '2 minutes',
        system: 'Rituals System',
        actions: ['Creates "check campus events" ritual', 'Sets study time reminder', 'Joins morning motivation space'],
        mockup: 'Suggested ritual templates',
        keyElements: ['Pre-made templates', 'Campus-specific suggestions', 'Easy scheduling']
      }
    ]
  },
  'daily-usage': {
    title: 'Daily Usage Pattern',
    description: 'Typical student interactions throughout a UB day',
    duration: 'Throughout day',
    category: 'Daily Flows',
    icon: Clock,
    steps: [
      {
        id: 'morning-check',
        title: 'Morning Campus Check',
        description: 'Student checks HIVE before leaving for classes',
        duration: '2-3 minutes',
        system: 'Feed + Calendar',
        actions: ['Checks notifications', 'Reviews calendar', 'Scans campus weather', 'Reads space updates'],
        mockup: 'Mobile morning dashboard',
        keyElements: ['Quick scan layout', 'Weather widget', 'Today\'s schedule', 'Important notifications']
      },
      {
        id: 'between-classes',
        title: 'Between Classes',
        description: 'Quick social interactions while walking',
        duration: '1-2 minutes',
        system: 'Mobile Feed',
        actions: ['Likes posts while walking', 'Quick comments', 'Shares funny content', 'Checks space activity'],
        mockup: 'Optimized mobile experience',
        keyElements: ['Thumb-friendly design', 'Quick actions', 'Readable while walking', 'Offline support']
      },
      {
        id: 'lunch-social',
        title: 'Lunch Break Social',
        description: 'Deeper engagement during lunch break',
        duration: '10-15 minutes',
        system: 'Spaces + Tools',
        actions: ['Posts lunch spot photo', 'Plans study session', 'Uses dining hall tool', 'Joins lunch meetup'],
        mockup: 'Social coordination interface',
        keyElements: ['Location sharing', 'Event creation', 'Friend coordination', 'Dining integration']
      },
      {
        id: 'study-coordination',
        title: 'Study Session Setup',
        description: 'Coordinates group study for upcoming exam',
        duration: '5-7 minutes',
        system: 'Spaces + Communication',
        actions: ['Posts in CS study space', 'Books library room', 'Invites study partners', 'Shares resources'],
        mockup: 'Study coordination workflow',
        keyElements: ['Room booking integration', 'Group messaging', 'Resource sharing', 'Calendar integration']
      },
      {
        id: 'evening-planning',
        title: 'Evening Event Planning',
        description: 'Plans weekend activities with friends',
        duration: '8-10 minutes',
        system: 'Events + Social',
        actions: ['Browses weekend events', 'Creates group chat', 'Polls friend preferences', 'Coordinates transportation'],
        mockup: 'Event planning interface',
        keyElements: ['Event discovery', 'Group decision tools', 'Transportation coordination', 'RSVP management']
      },
      {
        id: 'night-reflection',
        title: 'Night Wrap-up',
        description: 'Reviews day and prepares for tomorrow',
        duration: '3-5 minutes',
        system: 'Profile + Rituals',
        actions: ['Completes daily ritual', 'Reviews tomorrow\'s schedule', 'Sets study goals', 'Checks messages'],
        mockup: 'Evening dashboard',
        keyElements: ['Ritual completion', 'Tomorrow preview', 'Goal tracking', 'Message summary']
      }
    ]
  },
  'social-engagement': {
    title: 'Social Engagement Flow',
    description: 'Building connections and community on campus',
    duration: '15-30 minutes',
    category: 'Social',
    icon: Users,
    steps: [
      {
        id: 'content-creation',
        title: 'Content Creation',
        description: 'Student creates engaging post for campus community',
        duration: '3-5 minutes',
        system: 'Feed Composer',
        actions: ['Takes campus photo', 'Writes engaging caption', 'Tags relevant spaces', 'Adds location'],
        mockup: 'Rich post composer',
        keyElements: ['Photo editing', 'Smart tagging', 'Location integration', 'Preview mode']
      },
      {
        id: 'community-response',
        title: 'Community Engagement',
        description: 'Responds to engagement from other students',
        duration: '5-10 minutes',
        system: 'Notifications + Messaging',
        actions: ['Responds to comments', 'Likes supportive reactions', 'DMs interested students', 'Shares to spaces'],
        mockup: 'Engagement management',
        keyElements: ['Smart notifications', 'Quick responses', 'Connection suggestions', 'Conversation starters']
      },
      {
        id: 'space-participation',
        title: 'Space Community Building',
        description: 'Active participation in campus spaces',
        duration: '10-15 minutes',
        system: 'Spaces System',
        actions: ['Moderates dorm space', 'Organizes study group', 'Shares useful resources', 'Welcomes new members'],
        mockup: 'Space management dashboard',
        keyElements: ['Moderation tools', 'Event creation', 'Resource library', 'Member onboarding']
      }
    ]
  },
  'academic-integration': {
    title: 'Academic Integration',
    description: 'Study groups, class coordination, and academic success',
    duration: '20-25 minutes',
    category: 'Academic',
    icon: BookOpen,
    steps: [
      {
        id: 'study-group-formation',
        title: 'Study Group Creation',
        description: 'Forms study group for upcoming midterm',
        duration: '7-10 minutes',
        system: 'Spaces + Events',
        actions: ['Creates CS 115 study space', 'Invites classmates', 'Schedules study sessions', 'Shares study materials'],
        mockup: 'Study group setup wizard',
        keyElements: ['Class integration', 'Member invitations', 'Schedule coordination', 'Resource sharing']
      },
      {
        id: 'resource-collaboration',
        title: 'Academic Resource Sharing',
        description: 'Collaborates on shared study materials',
        duration: '8-10 minutes',
        system: 'Tools + File Sharing',
        actions: ['Uploads practice exams', 'Creates study guide tool', 'Organizes notes library', 'Sets up Q&A board'],
        mockup: 'Academic collaboration space',
        keyElements: ['File organization', 'Collaborative editing', 'Q&A system', 'Progress tracking']
      },
      {
        id: 'exam-preparation',
        title: 'Exam Coordination',
        description: 'Coordinates final exam preparation',
        duration: '5-7 minutes',
        system: 'Calendar + Communication',
        actions: ['Books group study rooms', 'Creates exam countdown', 'Schedules review sessions', 'Sets up accountability partners'],
        mockup: 'Exam preparation dashboard',
        keyElements: ['Room booking', 'Countdown timers', 'Progress tracking', 'Peer accountability']
      }
    ]
  },
  'campus-event': {
    title: 'Campus Event Coordination',
    description: 'Planning and participating in campus events',
    duration: '25-35 minutes',
    category: 'Events',
    icon: Calendar,
    steps: [
      {
        id: 'event-discovery',
        title: 'Event Discovery',
        description: 'Discovers interesting campus events',
        duration: '5-7 minutes',
        system: 'Events Feed',
        actions: ['Browses campus events', 'Filters by interests', 'Checks friend attendance', 'Saves interesting events'],
        mockup: 'Event discovery interface',
        keyElements: ['Smart filtering', 'Social proof', 'Calendar integration', 'Interest matching']
      },
      {
        id: 'friend-coordination',
        title: 'Friend Group Coordination',
        description: 'Coordinates attendance with friend group',
        duration: '10-12 minutes',
        system: 'Groups + Messaging',
        actions: ['Creates event group chat', 'Polls attendance interest', 'Plans transportation', 'Coordinates meetup'],
        mockup: 'Group coordination tools',
        keyElements: ['Group chat creation', 'Polling system', 'Transportation planning', 'Meetup coordination']
      },
      {
        id: 'event-participation',
        title: 'Live Event Experience',
        description: 'Participates and shares during event',
        duration: '5-8 minutes',
        system: 'Live Sharing',
        actions: ['Checks in at event', 'Shares photos/stories', 'Connects with new people', 'Participates in event activities'],
        mockup: 'Live event interface',
        keyElements: ['Check-in system', 'Live sharing', 'People discovery', 'Event-specific features']
      },
      {
        id: 'post-event-followup',
        title: 'Post-Event Community',
        description: 'Continues connections after event',
        duration: '5-8 minutes',
        system: 'Social + Spaces',
        actions: ['Connects with new people met', 'Shares event highlights', 'Joins related spaces', 'Plans follow-up activities'],
        mockup: 'Post-event engagement',
        keyElements: ['Connection suggestions', 'Highlight sharing', 'Community building', 'Follow-up planning']
      }
    ]
  },
  'tool-creation': {
    title: 'Tool Creation & Sharing',
    description: 'Building and sharing campus utilities with community',
    duration: '30-45 minutes',
    category: 'Creation',
    icon: Zap,
    steps: [
      {
        id: 'problem-identification',
        title: 'Campus Problem Identification',
        description: 'Identifies need for laundry tracking tool',
        duration: '5 minutes',
        system: 'Community Feedback',
        actions: ['Observes dorm laundry frustrations', 'Discusses with floormates', 'Validates problem scope', 'Researches existing solutions'],
        mockup: 'Problem discovery interface',
        keyElements: ['Problem validation', 'Community feedback', 'Solution research', 'Scope definition']
      },
      {
        id: 'tool-building',
        title: 'Tool Development',
        description: 'Uses HIVE builder to create laundry tracker',
        duration: '15-20 minutes',
        system: 'Tool Builder',
        actions: ['Designs tool interface', 'Sets up laundry machine tracking', 'Creates notification system', 'Tests functionality'],
        mockup: 'Visual tool builder interface',
        keyElements: ['Drag-and-drop builder', 'Real-time preview', 'Component library', 'Testing environment']
      },
      {
        id: 'community-sharing',
        title: 'Community Distribution',
        description: 'Shares tool with dorm community',
        duration: '7-10 minutes',
        system: 'Tool Marketplace',
        actions: ['Publishes to dorm space', 'Creates tutorial video', 'Onboards first users', 'Gathers initial feedback'],
        mockup: 'Tool sharing workflow',
        keyElements: ['Publishing system', 'Tutorial creation', 'User onboarding', 'Feedback collection']
      },
      {
        id: 'iteration-improvement',
        title: 'Iterative Improvement',
        description: 'Improves tool based on community feedback',
        duration: '5-10 minutes',
        system: 'Analytics + Updates',
        actions: ['Reviews usage analytics', 'Responds to feedback', 'Implements improvements', 'Releases updates'],
        mockup: 'Tool analytics dashboard',
        keyElements: ['Usage metrics', 'Feedback management', 'Version control', 'Update distribution']
      }
    ]
  }
};

// Flow Visualization Component
const FlowVisualization = ({ 
  flow, 
  currentStep, 
  completedSteps, 
  onStepClick 
}: { 
  flow: any; 
  currentStep: number; 
  completedSteps: number[]; 
  onStepClick: (step: number) => void;
}) => (
  <div className="space-y-6">
    {/* Flow Header */}
    <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-lg border border-gray-800">
      <div className="flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full">
        <flow.icon className="h-8 w-8 text-black" />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-white">{flow.title}</h2>
        <p className="text-gray-400">{flow.description}</p>
        <div className="flex items-center space-x-4 mt-2">
          <Badge variant="secondary" className="bg-blue-900 text-blue-300">
            {flow.category}
          </Badge>
          <Badge variant="secondary" className="border-gray-600 text-gray-300">
            <Clock className="mr-1 h-3 w-3" />
            {flow.duration}
          </Badge>
          <Badge variant="secondary" className="border-gray-600 text-gray-300">
            {flow.steps.length} steps
          </Badge>
        </div>
      </div>
    </div>

    {/* Progress Bar */}
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Progress</span>
        <span className="text-white">{completedSteps.length + 1} of {flow.steps.length}</span>
      </div>
      <Progress 
        value={(completedSteps.length / flow.steps.length) * 100} 
        className="h-2 bg-gray-800"
      />
    </div>

    {/* Steps Timeline */}
    <div className="space-y-4">
      {flow.steps.map((step: any, index: number) => (
        <div
          key={step.id}
          onClick={() => onStepClick(index)}
          className={`relative flex items-start space-x-4 p-4 rounded-lg border cursor-pointer transition-all ${
            index === currentStep
              ? 'bg-yellow-500/10 border-yellow-500 shadow-lg'
              : completedSteps.includes(index)
              ? 'bg-green-500/10 border-green-500'
              : 'bg-gray-900 border-gray-800 hover:border-gray-700'
          }`}
        >
          {/* Step Number/Status */}
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            index === currentStep
              ? 'bg-yellow-500 text-black'
              : completedSteps.includes(index)
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}>
            {completedSteps.includes(index) ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              index + 1
            )}
          </div>

          {/* Step Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-semibold ${
                index === currentStep ? 'text-yellow-400' : 'text-white'
              }`}>
                {step.title}
              </h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                  {step.duration}
                </Badge>
                <Badge className="bg-blue-900 text-blue-300 text-xs">
                  {step.system}
                </Badge>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">{step.description}</p>
            
            {/* Key Actions */}
            <div className="flex flex-wrap gap-1 mb-2">
              {step.actions.slice(0, 3).map((action: string, i: number) => (
                <Badge key={i} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                  {action}
                </Badge>
              ))}
              {step.actions.length > 3 && (
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                  +{step.actions.length - 3} more
                </Badge>
              )}
            </div>

            {/* Current Step Details */}
            {index === currentStep && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h4 className="text-white font-medium mb-2">Current Actions:</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  {step.actions.map((action: string, i: number) => (
                    <li key={i} className="flex items-center">
                      <Circle className="mr-2 h-3 w-3 text-gray-500" />
                      {action}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                    <div>
                      <strong className="text-white">Mockup:</strong><br />
                      {step.mockup}
                    </div>
                    <div>
                      <strong className="text-white">Key Elements:</strong><br />
                      {step.keyElements.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Connection Line */}
          {index < flow.steps.length - 1 && (
            <div className="absolute left-6 top-12 w-0.5 h-4 bg-gray-700" />
          )}
        </div>
      ))}
    </div>
  </div>
);

// Flow Controls Component
const FlowControls = ({ 
  flows, 
  activeFlow, 
  setActiveFlow, 
  isPlaying, 
  speed, 
  setSpeed, 
  onPlay, 
  onPause, 
  onReset, 
  onNext, 
  onPrev, 
  currentStep, 
  totalSteps 
}: {
  flows: any;
  activeFlow: string;
  setActiveFlow: (flow: string) => void;
  isPlaying: boolean;
  speed: number;
  setSpeed: (speed: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}) => (
  <div className="space-y-4">
    {/* Flow Selection */}
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Compass className="mr-2 h-5 w-5" />
          User Flow Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(flows).map(([flowId, flow]: [string, any]) => (
            <Button
              key={flowId}
              variant={activeFlow === flowId ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFlow(flowId)}
              className={`h-auto p-3 text-left ${
                activeFlow === flowId
                  ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                  : 'border-gray-700 text-white hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <flow.icon className="h-4 w-4" />
                <div>
                  <div className="font-medium text-xs">{flow.title}</div>
                  <div className="text-xs opacity-75">{flow.category}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Playback Controls */}
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Play className="mr-2 h-5 w-5" />
          Flow Playback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Controls */}
        <div className="flex items-center justify-center space-x-2">
          <Button size="sm" onClick={onPrev} disabled={currentStep === 0} variant="secondary" className="border-gray-700">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={isPlaying ? onPause : onPlay} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button size="sm" onClick={onNext} disabled={currentStep >= totalSteps - 1} variant="secondary" className="border-gray-700">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={onReset} variant="secondary" className="border-gray-700">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <Label className="text-white text-sm">Playback Speed</Label>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={speed === 0.5 ? "default" : "outline"}
              onClick={() => setSpeed(0.5)}
              className={speed === 0.5 ? "bg-yellow-500 text-black" : "border-gray-700 text-white"}
            >
              0.5x
            </Button>
            <Button
              size="sm"
              variant={speed === 1 ? "default" : "outline"}
              onClick={() => setSpeed(1)}
              className={speed === 1 ? "bg-yellow-500 text-black" : "border-gray-700 text-white"}
            >
              1x
            </Button>
            <Button
              size="sm"
              variant={speed === 2 ? "default" : "outline"}
              onClick={() => setSpeed(2)}
              className={speed === 2 ? "bg-yellow-500 text-black" : "border-gray-700 text-white"}
            >
              2x
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Flow Stats */}
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Flow Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-xl font-bold text-yellow-500">{totalSteps}</div>
            <div className="text-xs text-gray-400">Total Steps</div>
          </div>
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-xl font-bold text-blue-400">{flows[activeFlow]?.duration}</div>
            <div className="text-xs text-gray-400">Duration</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Systems Involved:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {[...new Set(flows[activeFlow]?.steps.map((step: any) => step.system) || [])].map((system: string) => (
              <Badge key={system} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                {system}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Main User Flows Interface
const UserFlowsSystem = () => {
  const flows = useUserFlows();
  const currentFlow = USER_FLOWS[flows.activeFlow as keyof typeof USER_FLOWS];
  const totalSteps = currentFlow?.steps.length || 0;

  // Auto-play functionality
  useEffect(() => {
    if (flows.isPlaying && currentFlow) {
      const timer = setTimeout(() => {
        flows.nextStep(currentFlow.steps);
      }, (3000 / flows.speed));
      
      return () => clearTimeout(timer);
    }
  }, [flows.isPlaying, flows.currentStep, flows.speed, currentFlow]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Target className="mr-4 h-10 w-10" />
            Complete User Flows System
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            End-to-end user journey documentation showing how all HIVE systems work together 
            to create seamless campus experiences for UB students.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1">
            <FlowControls
              flows={USER_FLOWS}
              activeFlow={flows.activeFlow}
              setActiveFlow={flows.setActiveFlow}
              isPlaying={flows.isPlaying}
              speed={flows.speed}
              setSpeed={flows.setSpeed}
              onPlay={flows.playFlow}
              onPause={flows.pauseFlow}
              onReset={flows.resetFlow}
              onNext={() => flows.nextStep(currentFlow?.steps || [])}
              onPrev={flows.prevStep}
              currentStep={flows.currentStep}
              totalSteps={totalSteps}
            />
          </div>

          {/* Main Flow Visualization */}
          <div className="lg:col-span-3">
            {currentFlow && (
              <FlowVisualization
                flow={currentFlow}
                currentStep={flows.currentStep}
                completedSteps={flows.completedSteps}
                onStepClick={flows.goToStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Story Exports
export const CompleteUserFlowsSystem: Story = {
  render: () => <UserFlowsSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete end-to-end user journey documentation with interactive flow visualization'
      }
    }
  }
};

export const NewStudentJourney: Story = {
  render: () => {
    const flows = useUserFlows();
    flows.setActiveFlow('new-student');
    return <UserFlowsSystem />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete new student onboarding journey from discovery to active community member'
      }
    }
  }
};

export const DailyUsagePattern: Story = {
  render: () => {
    const flows = useUserFlows();
    flows.setActiveFlow('daily-usage');
    return <UserFlowsSystem />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Typical student interactions with HIVE throughout a campus day'
      }
    }
  }
};

export const SocialEngagementFlow: Story = {
  render: () => {
    const flows = useUserFlows();
    flows.setActiveFlow('social-engagement');
    return <UserFlowsSystem />;
  },
  parameters: {
    docs: {
      description: {
        story: 'How students build connections and engage with campus community'
      }
    }
  }
};

export const AcademicIntegration: Story = {
  render: () => {
    const flows = useUserFlows();
    flows.setActiveFlow('academic-integration');
    return <UserFlowsSystem />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Academic collaboration flows including study groups and resource sharing'
      }
    }
  }
};

export const CampusEventCoordination: Story = {
  render: () => {
    const flows = useUserFlows();
    flows.setActiveFlow('campus-event');
    return <UserFlowsSystem />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete campus event discovery, planning, and participation flow'
      }
    }
  }
};

export const ToolCreationSharing: Story = {
  render: () => {
    const flows = useUserFlows();
    flows.setActiveFlow('tool-creation');
    return <UserFlowsSystem />;
  },
  parameters: {
    docs: {
      description: {
        story: 'End-to-end tool creation, sharing, and iteration process'
      }
    }
  }
};

export const MobileUserFlows: Story = {
  render: () => <UserFlowsSystem />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized user flow documentation and visualization'
      }
    }
  }
};
