/**
 * HIVE Complete Spaces System: Space Preview & Activation Flow
 * Showcases the space lifecycle from dormant preview to full activation with universal surfaces
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../atomic/atoms/button-enhanced';
import { Badge } from '../../../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../../../components/ui/avatar';
import { HiveProgress } from '../../../../components/hive-progress';
import { Separator } from '../../../../components/ui/separator';
import { 
  Users, 
  Eye,
  UserPlus,
  Hash,
  Home,
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  Star,
  Heart,
  MessageSquare,
  Share,
  Settings,
  Zap,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Shield,
  Crown,
  Activity,
  PlayCircle,
  Lock,
  CheckCircle,
  AlertCircle,
  Monitor,
  Grid,
  List,
  Code
} from 'lucide-react';
import { useState } from 'react';
import "../../../../hive-tokens.css";

const meta = {
  title: '06-Complete-Spaces-System/Space Preview & Activation',
  component: SpacePreviewActivationFlow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Space Preview & Activation System

Complete space lifecycle demonstration showing how spaces progress from preview (dormant) to fully activated communities with all universal surfaces.

## Space States
- **Preview Mode (Dormant)**: Limited view with activation options
- **View Only (Frozen)**: Read-only access for archived spaces  
- **Active**: Full community features with all universal surfaces

## Universal Surfaces
- **Post Board**: Community discussions and coordination
- **Events**: Calendar and event management
- **Members**: Directory and member management
- **Tools**: Space-specific tools and applications
- **Pinned**: Important resources and announcements
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock space data for different states
const mockPreviewSpace = {
  id: 'cse442_preview',
  name: 'CSE 442: Software Engineering',
  description: 'Collaborative space for CSE 442 students. Project coordination, code reviews, and team building.',
  category: 'student_organizations',
  subcategory: 'Computer Science',
  memberCount: 0,
  estimatedMembers: 35, // Projected enrollment
  isJoined: false,
  isPopular: false,
  isTrending: false,
  lastActivity: 'Not yet active',
  activityLevel: 'dormant',
  privacy: 'public',
  status: 'dormant',
  leader: {
    name: 'Prof. Jennifer Martinez',
    handle: '@profmartinez',
    avatar: 'JM',
    isVerified: true
  },
  activationRequirements: {
    minMembers: 10,
    currentInterest: 7,
    estimatedActivation: '3 days',
    progressPercentage: 70
  },
  previewFeatures: [
    'Course syllabus and schedule',
    'Assignment submission portal', 
    'Team formation tools',
    'Code review system',
    'Project showcase gallery'
  ],
  tags: ['software-engineering', 'programming', 'projects', 'teamwork', 'cse'],
  bannerUrl: null
};

const mockFrozenSpace = {
  id: 'spring23_events',
  name: 'Spring 2023 Campus Events',
  description: 'Archive of Spring 2023 semester events and activities. Historical reference and memories.',
  category: 'university_organizations',
  subcategory: 'Campus Events',
  memberCount: 245,
  isJoined: true,
  isPopular: false,
  isTrending: false,
  lastActivity: '4 months ago',
  activityLevel: 'archived',
  privacy: 'public',
  status: 'frozen',
  leader: {
    name: 'Student Activities',
    handle: '@ub_activities',
    avatar: 'SA',
    isVerified: true
  },
  archiveInfo: {
    archivedDate: '2023-05-15',
    totalEvents: 47,
    totalAttendees: 1250,
    topEvent: 'Spring Fest 2023'
  },
  tags: ['spring-2023', 'events', 'archived', 'memories', 'campus-life'],
  bannerUrl: null
};

const mockActiveSpace = {
  id: 'ub_hackers_active',
  name: 'UB Hackers',
  description: 'University at Buffalo\'s premier computer science and hackathon community. Building innovative solutions and fostering tech talent.',
  category: 'student_organizations',
  subcategory: 'Technology',
  memberCount: 127,
  isJoined: true,
  isPopular: true,
  isTrending: true,
  lastActivity: '12 minutes ago',
  activityLevel: 'very-high',
  privacy: 'public',
  status: 'activated',
  leader: {
    name: 'Alex Thompson',
    handle: '@alex_codes',
    avatar: 'AT',
    isVerified: false
  },
  stats: {
    postsThisWeek: 23,
    eventsThisMonth: 4,
    avgResponseTime: '15 mins',
    engagementRate: 89
  },
  tags: ['hackathon', 'programming', 'innovation', 'networking', 'tech'],
  upcomingEvents: [
    {
      title: 'HackUB 2024 Planning',
      date: '2024-11-18T19:00:00Z',
      location: 'Davis Hall 101'
    }
  ],
  bannerUrl: null
};

// Widget configurations for active spaces
const WIDGET_CONFIGS = [
  {
    id: 'posts',
    title: 'Post Board',
    icon: MessageSquare,
    description: 'Community discussions, announcements, and coordination',
    activeFeatures: ['Rich text posts', 'Coordination tools', 'Live activity', 'Threaded comments']
  },
  {
    id: 'events',
    title: 'Events',
    icon: Calendar,
    description: 'Calendar, event management, and RSVP system',
    activeFeatures: ['Event creation', 'RSVP tracking', 'Calendar integration', 'Reminders']
  },
  {
    id: 'members',
    title: 'Members',
    icon: Users,
    description: 'Member directory, roles, and community management',
    activeFeatures: ['Member profiles', 'Role management', 'Activity tracking', 'Directory search']
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Code,
    description: 'Space-specific tools and applications',
    activeFeatures: ['Custom tools', 'Form builders', 'Integrations', 'Analytics'],
    adminOnly: true
  },
  {
    id: 'pinned',
    title: 'Pinned',
    icon: Star,
    description: 'Important resources, links, and announcements',
    activeFeatures: ['Resource library', 'Link sharing', 'File uploads', 'Categorization']
  }
];

function SpacePreviewActivationFlow() {
  const [activeDemo, setActiveDemo] = useState<'preview' | 'frozen' | 'active'>('preview');
  const [showActivationFlow, setShowActivationFlow] = useState(false);
  const [activationStep, setActivationStep] = useState(0);

  const currentSpace = activeDemo === 'preview' ? mockPreviewSpace : 
                     activeDemo === 'frozen' ? mockFrozenSpace : 
                     mockActiveSpace;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-[var(--hive-text-primary)]">
      
      {/* Demo Control Header */}
      <div className="border-b border-gray-800 bg-[var(--hive-black)]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Space Lifecycle Demonstration</h1>
              <p className="text-gray-400">Preview different space states and activation flows</p>
            </div>
            <Badge className="text-xs" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
              Interactive Demo
            </Badge>
          </div>

          {/* State Selector */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {[
              { id: 'preview', label: 'Preview Mode', icon: Eye, description: 'Dormant space ready for activation' },
              { id: 'frozen', label: 'View Only', icon: Lock, description: 'Archived space with read-only access' },
              { id: 'active', label: 'Active Space', icon: CheckCircle, description: 'Fully activated community' },
            ].map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                onClick={() => setActiveDemo(id as unknown)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeDemo === id
                    ? 'text-[var(--hive-black)] hive-interactive'
                    : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
                }`}
                style={activeDemo === id ? {
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

      {/* Space Content */}
      <div className="max-w-7xl mx-auto p-4">
        
        {/* Space Header */}
        <div className="relative h-48 w-full md:h-64 lg:h-80 -mt-4 mb-8 rounded-xl overflow-hidden">
          {currentSpace.bannerUrl ? (
            <img
              src={currentSpace.bannerUrl}
              alt={`${currentSpace.name} banner`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`h-full w-full ${
              activeDemo === 'preview' ? 'bg-gradient-to-br from-blue-800 to-blue-900' :
              activeDemo === 'frozen' ? 'bg-gradient-to-br from-gray-700 to-gray-800' :
              'bg-gradient-to-br from-purple-800 to-indigo-900'
            }`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          
          {/* Space Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-[var(--hive-text-primary)] truncate">
                    {currentSpace.name}
                  </h1>
                  <SpaceStatusBadge status={currentSpace.status} />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>
                      {activeDemo === 'preview' 
                        ? `${currentSpace.estimatedMembers} expected members`
                        : `${currentSpace.memberCount.toLocaleString()} members`
                      }
                    </span>
                  </div>
                  
                  <Badge variant="major-tag" className="capitalize text-xs">
                    {currentSpace.category.replace('_', ' ')}
                  </Badge>
                  
                  <span className="text-gray-400">{currentSpace.subcategory}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                {activeDemo === 'preview' ? (
                  <Button 
                    className="bg-blue-600 text-[var(--hive-text-primary)] hover:bg-blue-700"
                    onClick={() => setShowActivationFlow(true)}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Request Activation
                  </Button>
                ) : activeDemo === 'frozen' ? (
                  <Button 
                    variant="secondary" 
                    className="border-gray-500/50 text-gray-400"
                    disabled
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    View Only
                  </Button>
                ) : (
                  <Button 
                    className="bg-green-600 text-[var(--hive-text-primary)] hover:bg-green-700"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Enter Space
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Mode Content */}
        {activeDemo === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Preview Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Activation Progress */}
              <Card className="bg-blue-500/10 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-400">
                    <Target className="w-5 h-5 mr-2" />
                    Activation Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Interest Level</span>
                        <span className="text-[var(--hive-text-primary)]">{mockPreviewSpace.activationRequirements.currentInterest}/{mockPreviewSpace.activationRequirements.minMembers} minimum</span>
                      </div>
                      <HiveProgress 
                        value={mockPreviewSpace.activationRequirements.progressPercentage} 
                        className="bg-gray-700" 
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Estimated activation: {mockPreviewSpace.activationRequirements.estimatedActivation}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-400">{mockPreviewSpace.activationRequirements.currentInterest}</div>
                        <div className="text-xs text-gray-400">Interested Users</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-400">{mockPreviewSpace.activationRequirements.progressPercentage}%</div>
                        <div className="text-xs text-gray-400">Progress</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[var(--hive-gold)]">{mockPreviewSpace.estimatedMembers}</div>
                        <div className="text-xs text-gray-400">Expected Members</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preview Features */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-[var(--hive-text-primary)]">What's Coming</CardTitle>
                  <p className="text-gray-400 text-sm">Features available once this space activates</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockPreviewSpace.previewFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="bg-gray-700 my-4" />
                  
                  <div className="text-center">
                    <Button 
                      className="bg-blue-600 text-[var(--hive-text-primary)] hover:bg-blue-700"
                      onClick={() => setShowActivationFlow(true)}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Show Interest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <PreviewSidebarInfo space={mockPreviewSpace} />
            </div>
          </div>
        )}

        {/* Frozen Mode Content */}
        {activeDemo === 'frozen' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Archive Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Archive Notice */}
              <Card className="bg-gray-500/10 border-gray-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-400">
                    <Lock className="w-5 h-5 mr-2" />
                    Archived Space
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    This space has been archived and is now read-only. Content is preserved for historical reference.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-gray-400">{mockFrozenSpace.archiveInfo.totalEvents}</div>
                      <div className="text-xs text-gray-500">Total Events</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-400">{mockFrozenSpace.archiveInfo.totalAttendees.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Attendees</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-400">{mockFrozenSpace.memberCount}</div>
                      <div className="text-xs text-gray-500">Members</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-400">4 mo</div>
                      <div className="text-xs text-gray-500">Archived</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Archive Highlights */}
              <Card className="bg-gray-800/30 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-[var(--hive-text-primary)]">Archive Highlights</CardTitle>
                  <p className="text-gray-400 text-sm">Most popular content from this space</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-[var(--hive-gold)] mr-2" />
                        <span className="text-[var(--hive-text-primary)] font-medium">Top Event</span>
                      </div>
                      <p className="text-gray-300">{mockFrozenSpace.archiveInfo.topEvent}</p>
                      <p className="text-gray-400 text-sm">450 attendees • April 2023</p>
                    </div>
                    
                    <div className="text-center text-gray-400">
                      <Lock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">More archive content available in read-only mode</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <FrozenSidebarInfo space={mockFrozenSpace} />
            </div>
          </div>
        )}

        {/* Active Mode Content */}
        {activeDemo === 'active' && (
          <div className="space-y-6">
            
            {/* Universal Surfaces Overview */}
            <Card className="bg-green-500/10 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-green-400">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Active Community - All Features Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  This space is fully activated with all universal surfaces and community features enabled.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-400">{mockActiveSpace.stats.postsThisWeek}</div>
                    <div className="text-xs text-gray-400">Posts This Week</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-400">{mockActiveSpace.stats.eventsThisMonth}</div>
                    <div className="text-xs text-gray-400">Events This Month</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--hive-gold)]">{mockActiveSpace.memberCount}</div>
                    <div className="text-xs text-gray-400">Active Members</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--hive-gold)]">{mockActiveSpace.stats.engagementRate}%</div>
                    <div className="text-xs text-gray-400">Engagement</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Universal Surfaces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WIDGET_CONFIGS.map((widget: any) => (
                <UniversalSurfaceCard key={widget.id} widget={widget} space={mockActiveSpace} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Activation Flow Modal */}
      {showActivationFlow && (
        <ActivationFlowModal 
          isOpen={showActivationFlow}
          onClose={() => {
            setShowActivationFlow(false);
            setActivationStep(0);
          }}
          space={mockPreviewSpace}
          currentStep={activationStep}
          onStepChange={setActivationStep}
        />
      )}
    </div>
  );
}

// Helper Components
function SpaceStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    dormant: { label: "Preview Mode", variant: "outline" as const, color: "text-blue-400 border-blue-400/50" },
    frozen: { label: "View Only", variant: "outline" as const, color: "text-gray-400 border-gray-400/50" },
    activated: { label: "Active", variant: "outline" as const, color: "text-green-400 border-green-400/50" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.activated;

  return (
    <Badge variant={config.variant} className={`text-xs ${config.color}`}>
      {config.label}
    </Badge>
  );
}

function PreviewSidebarInfo({ space }: { space: any }) {
  return (
    <>
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-sm mb-4">{space.description}</p>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-blue-400">Preview Mode</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Expected Members</span>
              <span className="text-[var(--hive-text-primary)]">{space.estimatedMembers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Interest Level</span>
              <span className="text-green-400">{space.activationRequirements.progressPercentage}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Course Leader</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-3">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-[var(--hive-gold)] text-[var(--hive-text-primary)]">
                {space.leader.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-[var(--hive-text-primary)] font-medium">{space.leader.name}</div>
              <div className="text-gray-400 text-sm">{space.leader.handle}</div>
            </div>
            {space.leader.isVerified && (
              <Award className="w-4 h-4 ml-auto" style={{ color: 'var(--hive-brand-primary)' }} />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function FrozenSidebarInfo({ space }: { space: any }) {
  return (
    <>
      <Card className="bg-gray-800/30 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Archive Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-sm mb-4">{space.description}</p>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-gray-400">Archived</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Archived Date</span>
              <span className="text-[var(--hive-text-primary)]">{new Date(space.archiveInfo.archivedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Final Members</span>
              <span className="text-[var(--hive-text-primary)]">{space.memberCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/30 border-gray-700">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">Archive Access</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-sm mb-4">
            You can browse historical content but cannot post or interact.
          </p>
          
          <Button 
            variant="secondary" 
            className="w-full border-gray-600 text-gray-400"
            disabled
          >
            <Lock className="w-4 h-4 mr-2" />
            Read Only Access
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

function UniversalSurfaceCard({ widget, space }: { widget: any; space: any }) {
  const Icon = widget.icon;
  
  return (
    <Card className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer"
          onMouseEnter={(e: any) => {
            e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
            e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
          }}
          onMouseLeave={(e: any) => {
            e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6" style={{ color: 'var(--hive-brand-primary)' }} />
            <div>
              <CardTitle className="text-[var(--hive-text-primary)]">{widget.title}</CardTitle>
              {widget.adminOnly && (
                <Badge variant="secondary" className="text-xs mt-1 border-[var(--hive-gold)]/30 text-[var(--hive-gold)]">
                  Admin Only
                </Badge>
              )}
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-green-400" />
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-400 text-sm mb-4">{widget.description}</p>
        
        <div className="space-y-2">
          <h4 className="text-[var(--hive-text-primary)] text-sm font-medium">Active Features:</h4>
          {widget.activeFeatures.map((feature: string, index: number) => (
            <div key={index} className="flex items-center text-sm">
              <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full mt-4 hive-interactive"
          style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
        >
          Open {widget.title}
        </Button>
      </CardContent>
    </Card>
  );
}

function ActivationFlowModal({ isOpen, onClose, space, currentStep, onStepChange }: {
  isOpen: boolean;
  onClose: () => void;
  space: any;
  currentStep: number;
  onStepChange: (step: number) => void;
}) {
  const steps = [
    {
      title: "Show Interest",
      description: "Join the waitlist for space activation",
      icon: Heart,
      action: "Join Waitlist"
    },
    {
      title: "Invite Others",
      description: "Help reach the minimum member threshold",
      icon: UserPlus,
      action: "Send Invites"
    },
    {
      title: "Activation Ready",
      description: "Space will activate automatically when ready",
      icon: Zap,
      action: "Complete"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--hive-black)]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--hive-background-primary)] border border-[var(--hive-white)]/[0.1] rounded-2xl w-full max-w-md">
        
        {/* Header */}
        <div className="p-6 border-b border-[var(--hive-white)]/[0.06]">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">Activate Space</h2>
          <p className="text-gray-400 text-sm">{space.name}</p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            
            {/* Progress */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' : 
                      isActive ? 'bg-blue-500' : 'bg-gray-700'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-[var(--hive-text-primary)]" />
                      ) : (
                        <Icon className="w-4 h-4 text-[var(--hive-text-primary)]" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-2 ${
                        index < currentStep ? 'bg-green-500' : 'bg-gray-700'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Current Step */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-400 text-sm">
                {steps[currentStep].description}
              </p>
            </div>
            
            {/* Step-specific content */}
            {currentStep === 0 && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {space.activationRequirements.currentInterest}/{space.activationRequirements.minMembers}
                  </div>
                  <div className="text-sm text-gray-400">interested users</div>
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter email to invite"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-[var(--hive-text-primary)] placeholder-gray-400"
                />
                <p className="text-xs text-gray-400">
                  Invite classmates and friends to help activate this space
                </p>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 text-sm">Ready for activation!</p>
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button 
              variant="secondary" 
              className="flex-1 border-[var(--hive-white)]/20 text-[var(--hive-text-primary)]"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 hive-interactive"
              style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  onStepChange(currentStep + 1);
                } else {
                  onClose();
                }
              }}
            >
              {steps[currentStep].action}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const PreviewModeSpace: Story = {
  render: () => <SpacePreviewActivationFlow />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const FrozenArchiveSpace: Story = {
  render: () => {
    const Component = () => {
      const [activeDemo] = useState('frozen');
      return <SpacePreviewActivationFlow />;
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

export const ActiveCommunitySpace: Story = {
  render: () => {
    const Component = () => {
      const [activeDemo] = useState('active');
      return <SpacePreviewActivationFlow />;
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

export const ActivationFlowDemo: Story = {
  render: () => {
    const Component = () => {
      const [showActivationFlow] = useState(true);
      return <SpacePreviewActivationFlow />;
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