/**
 * HIVE Complete Spaces System: Universal Surfaces
 * Comprehensive demonstration of all space widgets and surface components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../../../components/ui/avatar';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { Separator } from '../../../../components/ui/separator';
import { Switch } from '../../../../components/ui/switch';
import { 
  Users, 
  MessageSquare,
  Calendar,
  Code,
  Star,
  Clock,
  Heart,
  Share,
  MoreVertical,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Settings,
  Eye,
  Edit,
  Trash2,
  Pin,
  Reply,
  ThumbsUp,
  Award,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Download,
  ExternalLink,
  FileText,
  Image,
  Link,
  Paperclip,
  Send,
  Zap,
  Target,
  BarChart3,
  Calendar as CalendarIcon,
  UserCheck,
  UserX,
  Crown,
  Shield,
  Hash,
  Bell
} from 'lucide-react';
import { useState } from 'react';
import "../../../../hive-tokens.css";

const meta = {
  title: '06-Complete-Spaces-System/Universal Surfaces',
  component: UniversalSurfacesDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Universal Surfaces System

Complete demonstration of all universal surface widgets that power HIVE spaces. Each surface provides specific functionality while maintaining consistent design patterns.

## Universal Surfaces
- **Post Board**: Community discussions, coordination, and announcements
- **Events Surface**: Calendar management, RSVP tracking, and event coordination
- **Members Surface**: Directory, roles, permissions, and member management
- **Tools Surface**: Space-specific applications and form builders
- **Pinned Surface**: Resources, links, files, and important information

## Interactive Features
- Real-time updates and live activity indicators
- Moderation and leadership tools
- Coordination features for campus activities
- Rich content support and media handling
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for all surfaces
const mockSpace = {
  id: 'ub_study_group',
  name: 'UB Study Group - CS & Math',
  memberCount: 47,
  status: 'activated'
};

const mockPosts = [
  {
    id: 'post1',
    type: 'coordination',
    title: 'Study Session Tonight - CSE 220',
    content: 'Emergency study session for tomorrow\'s algorithm exam! Bring practice problems and laptops.',
    author: {
      id: 'user1',
      name: 'Marcus Johnson',
      handle: '@mjohnson',
      avatar: 'MJ',
      role: 'leader'
    },
    timestamp: '2 hours ago',
    engagement: {
      likes: 12,
      comments: 5,
      shares: 2
    },
    coordination: {
      type: 'study_session',
      location: 'Lockwood Library Room 204',
      time: '2024-11-16T19:00:00Z',
      spots: { current: 8, max: 15 },
      responses: [
        { userId: 'user2', name: 'Sarah Chen', response: 'attending', note: 'Bringing extra practice problems' },
        { userId: 'user3', name: 'Alex Kim', response: 'maybe', note: 'Depends on work schedule' }
      ]
    },
    isPinned: false,
    tags: ['study-session', 'cse220', 'algorithms']
  },
  {
    id: 'post2',
    type: 'discussion',
    title: 'Best Resources for Linear Algebra?',
    content: 'Looking for good supplementary materials for MTH 309. The textbook is pretty dense and I\'m struggling with eigenvalues.',
    author: {
      id: 'user2',
      name: 'Sarah Chen',
      handle: '@sarahc',
      avatar: 'SC',
      role: 'member'
    },
    timestamp: '5 hours ago',
    engagement: {
      likes: 8,
      comments: 12,
      shares: 1
    },
    isPinned: false,
    tags: ['linear-algebra', 'mth309', 'resources']
  },
  {
    id: 'post3',
    type: 'announcement',
    title: 'Group Study Schedule Updated',
    content: 'New weekly schedule is now available. We\'ve added Tuesday evening sessions for calculus review.',
    author: {
      id: 'user1',
      name: 'Marcus Johnson',
      handle: '@mjohnson',
      avatar: 'MJ',
      role: 'leader'
    },
    timestamp: '1 day ago',
    engagement: {
      likes: 15,
      comments: 3,
      shares: 4
    },
    isPinned: true,
    tags: ['announcement', 'schedule']
  }
];

const mockEvents = [
  {
    id: 'event1',
    title: 'Final Exam Study Marathon',
    description: 'All-day study session with multiple subjects and group collaboration.',
    date: '2024-11-20T09:00:00Z',
    endDate: '2024-11-20T21:00:00Z',
    location: 'Student Union Study Rooms',
    organizer: {
      name: 'Marcus Johnson',
      avatar: 'MJ'
    },
    rsvp: {
      attending: 23,
      maybe: 5,
      total: 28
    },
    type: 'study',
    isRecurring: false,
    tags: ['finals', 'study-marathon', 'group-study']
  },
  {
    id: 'event2',
    title: 'Weekly CS 220 Review',
    description: 'Regular weekly review session covering algorithms and data structures.',
    date: '2024-11-17T18:00:00Z',
    endDate: '2024-11-17T20:00:00Z',
    location: 'Davis Hall 101',
    organizer: {
      name: 'Sarah Chen',
      avatar: 'SC'
    },
    rsvp: {
      attending: 12,
      maybe: 3,
      total: 15
    },
    type: 'recurring',
    isRecurring: true,
    tags: ['cs220', 'weekly', 'algorithms']
  }
];

const mockMembers = [
  {
    id: 'user1',
    name: 'Marcus Johnson',
    handle: '@mjohnson',
    avatar: 'MJ',
    role: 'owner',
    permissions: ['moderate', 'manage', 'analytics'],
    joinDate: '2024-08-15',
    activity: 'very-active',
    contributions: {
      posts: 23,
      events: 8,
      helpfulVotes: 45
    },
    major: 'Computer Science',
    year: 'Junior',
    isOnline: true,
    lastSeen: 'now'
  },
  {
    id: 'user2', 
    name: 'Sarah Chen',
    handle: '@sarahc',
    avatar: 'SC',
    role: 'moderator',
    permissions: ['moderate'],
    joinDate: '2024-08-20',
    activity: 'active',
    contributions: {
      posts: 15,
      events: 3,
      helpfulVotes: 28
    },
    major: 'Mathematics',
    year: 'Senior',
    isOnline: true,
    lastSeen: '5 minutes ago'
  },
  {
    id: 'user3',
    name: 'Alex Kim',
    handle: '@alexk',
    avatar: 'AK',
    role: 'member',
    permissions: [],
    joinDate: '2024-09-01',
    activity: 'moderate',
    contributions: {
      posts: 8,
      events: 1,
      helpfulVotes: 12
    },
    major: 'Computer Science',
    year: 'Sophomore',
    isOnline: false,
    lastSeen: '2 hours ago'
  },
  {
    id: 'user4',
    name: 'Jennifer Liu',
    handle: '@jliu',
    avatar: 'JL',
    role: 'member',
    permissions: [],
    joinDate: '2024-09-15',
    activity: 'new',
    contributions: {
      posts: 2,
      events: 0,
      helpfulVotes: 3
    },
    major: 'Engineering',
    year: 'Freshman',
    isOnline: true,
    lastSeen: 'now'
  }
];

const mockTools = [
  {
    id: 'tool1',
    name: 'Study Schedule Coordinator',
    description: 'Coordinate group study times and find optimal meeting slots.',
    type: 'form',
    icon: CalendarIcon,
    usage: {
      thisWeek: 15,
      total: 127
    },
    status: 'active',
    creator: 'Marcus Johnson',
    lastUpdated: '2024-11-10',
    features: ['Time polling', 'Availability tracking', 'Auto-scheduling']
  },
  {
    id: 'tool2',
    name: 'Resource Share Hub',
    description: 'Upload and share study materials, notes, and practice problems.',
    type: 'file-sharing',
    icon: FileText,
    usage: {
      thisWeek: 8,
      total: 89
    },
    status: 'active',
    creator: 'Sarah Chen',
    lastUpdated: '2024-11-08',
    features: ['File uploads', 'Categorization', 'Version control']
  },
  {
    id: 'tool3',
    name: 'Exam Countdown Timer',
    description: 'Track upcoming exams and assignment deadlines.',
    type: 'utility',
    icon: Clock,
    usage: {
      thisWeek: 23,
      total: 156
    },
    status: 'active',
    creator: 'Alex Kim',
    lastUpdated: '2024-11-12',
    features: ['Deadline tracking', 'Notifications', 'Progress visualization']
  }
];

const mockPinnedItems = [
  {
    id: 'pin1',
    type: 'link',
    title: 'Course Syllabus - CS 220',
    description: 'Complete syllabus with assignment schedule and grading rubric.',
    url: 'https://cse.buffalo.edu/courses/cs220',
    pinnedBy: 'Marcus Johnson',
    pinnedDate: '2024-08-15',
    category: 'course-materials',
    icon: BookOpen
  },
  {
    id: 'pin2',
    type: 'file',
    title: 'Midterm Review Sheet',
    description: 'Comprehensive review covering chapters 1-8 with practice problems.',
    fileType: 'pdf',
    fileSize: '2.3 MB',
    pinnedBy: 'Sarah Chen', 
    pinnedDate: '2024-10-15',
    category: 'study-materials',
    icon: FileText,
    downloadCount: 34
  },
  {
    id: 'pin3',
    type: 'resource',
    title: 'Tutoring Schedule',
    description: 'Weekly tutoring hours and location information.',
    pinnedBy: 'Marcus Johnson',
    pinnedDate: '2024-09-01',
    category: 'schedule',
    icon: CalendarIcon
  }
];

function UniversalSurfacesDemo() {
  const [activeSurface, setActiveSurface] = useState<'posts' | 'events' | 'members' | 'tools' | 'pinned'>('posts');
  const [viewMode, setViewMode] = useState<'view' | 'manage'>('view');

  const surfaces = [
    { id: 'posts', label: 'Post Board', icon: MessageSquare, count: mockPosts.length },
    { id: 'events', label: 'Events', icon: Calendar, count: mockEvents.length },
    { id: 'members', label: 'Members', icon: Users, count: mockMembers.length },
    { id: 'tools', label: 'Tools', icon: Code, count: mockTools.length },
    { id: 'pinned', label: 'Pinned', icon: Star, count: mockPinnedItems.length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Universal Surfaces Demo</h1>
              <p className="text-gray-400">Interactive demonstration of all HIVE space widget components</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex border border-gray-700 rounded-md overflow-hidden">
                <Button
                  size="sm"
                  variant={viewMode === 'view' ? 'default' : 'ghost'}
                  className={viewMode === 'view' ? 'bg-gray-700' : 'text-gray-400'}
                  onClick={() => setViewMode('view')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Mode
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'manage' ? 'default' : 'ghost'}
                  className={viewMode === 'manage' ? 'bg-gray-700' : 'text-gray-400'}
                  onClick={() => setViewMode('manage')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Mode
                </Button>
              </div>
              
              <Badge className="text-xs" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                {mockSpace.name}
              </Badge>
            </div>
          </div>

          {/* Surface Navigation */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {surfaces.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setActiveSurface(id as any)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeSurface === id
                    ? 'text-black hive-interactive'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={activeSurface === id ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
                <Badge className="ml-2 bg-gray-700 text-white text-xs">{count}</Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Surface Content */}
      <div className="max-w-7xl mx-auto p-4">
        {activeSurface === 'posts' && <PostBoardSurface viewMode={viewMode} />}
        {activeSurface === 'events' && <EventsSurface viewMode={viewMode} />}
        {activeSurface === 'members' && <MembersSurface viewMode={viewMode} />}
        {activeSurface === 'tools' && <ToolsSurface viewMode={viewMode} />}
        {activeSurface === 'pinned' && <PinnedSurface viewMode={viewMode} />}
      </div>
    </div>
  );
}

// Post Board Surface Component
function PostBoardSurface({ viewMode }: { viewMode: 'view' | 'manage' }) {
  const [showComposer, setShowComposer] = useState(false);
  
  return (
    <div className="space-y-6">
      
      {/* Surface Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Post Board</h2>
          <p className="text-gray-400 text-sm">Community discussions and coordination</p>
        </div>
        
        <div className="flex items-center gap-3">
          {viewMode === 'manage' && (
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Management Mode
            </Badge>
          )}
          
          <Button 
            className="hive-interactive"
            style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
            onClick={() => setShowComposer(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Post Composer */}
      {showComposer && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Create Post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input 
                placeholder="Post title..."
                className="bg-gray-900 border-gray-700 text-white"
              />
              <Textarea 
                placeholder="What's happening in the study group?"
                className="bg-gray-900 border-gray-700 text-white"
                rows={3}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" className="border-gray-600 text-white">
                    <Calendar className="w-4 h-4 mr-1" />
                    Add Event
                  </Button>
                  <Button size="sm" variant="secondary" className="border-gray-600 text-white">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </Button>
                  <Button size="sm" variant="secondary" className="border-gray-600 text-white">
                    <Paperclip className="w-4 h-4 mr-1" />
                    Attach
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    className="border-gray-600 text-white"
                    onClick={() => setShowComposer(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="hive-interactive"
                    style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
                    onClick={() => setShowComposer(false)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}

// Events Surface Component  
function EventsSurface({ viewMode }: { viewMode: 'view' | 'manage' }) {
  const [viewType, setViewType] = useState<'list' | 'calendar'>('list');
  
  return (
    <div className="space-y-6">
      
      {/* Surface Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Events</h2>
          <p className="text-gray-400 text-sm">Calendar and event management</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-700 rounded-md overflow-hidden">
            <Button
              size="sm"
              variant={viewType === 'list' ? 'default' : 'ghost'}
              className={viewType === 'list' ? 'bg-gray-700' : 'text-gray-400'}
              onClick={() => setViewType('list')}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewType === 'calendar' ? 'default' : 'ghost'}
              className={viewType === 'calendar' ? 'bg-gray-700' : 'text-gray-400'}
              onClick={() => setViewType('calendar')}
            >
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            className="hive-interactive"
            style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}

// Members Surface Component
function MembersSurface({ viewMode }: { viewMode: 'view' | 'manage' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  return (
    <div className="space-y-6">
      
      {/* Surface Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Members</h2>
          <p className="text-gray-400 text-sm">Community directory and management</p>
        </div>
        
        <div className="flex items-center gap-3">
          {viewMode === 'manage' && (
            <Button 
              variant="secondary"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <UserX className="w-4 h-4 mr-2" />
              Bulk Actions
            </Button>
          )}
          
          <Button 
            className="hive-interactive"
            style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900 border-gray-700 text-white pl-10"
          />
        </div>
        
        <select 
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
        >
          <option value="all">All Roles</option>
          <option value="owner">Owners</option>
          <option value="moderator">Moderators</option>
          <option value="member">Members</option>
        </select>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMembers.map((member) => (
          <MemberCard key={member.id} member={member} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}

// Tools Surface Component
function ToolsSurface({ viewMode }: { viewMode: 'view' | 'manage' }) {
  return (
    <div className="space-y-6">
      
      {/* Surface Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Tools</h2>
          <p className="text-gray-400 text-sm">Space-specific applications and utilities</p>
        </div>
        
        <div className="flex items-center gap-3">
          {viewMode === 'manage' && (
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              Admin Only
            </Badge>
          )}
          
          <Button 
            className="hive-interactive"
            style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Tool
          </Button>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}

// Pinned Surface Component
function PinnedSurface({ viewMode }: { viewMode: 'view' | 'manage' }) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'course-materials', label: 'Course Materials' },
    { id: 'study-materials', label: 'Study Materials' },
    { id: 'schedule', label: 'Schedule' }
  ];
  
  return (
    <div className="space-y-6">
      
      {/* Surface Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Pinned Resources</h2>
          <p className="text-gray-400 text-sm">Important resources and announcements</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          
          <Button 
            className="hive-interactive"
            style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
          >
            <Pin className="w-4 h-4 mr-2" />
            Pin Resource
          </Button>
        </div>
      </div>

      {/* Pinned Items */}
      <div className="space-y-4">
        {mockPinnedItems.map((item) => (
          <PinnedItemCard key={item.id} item={item} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}

// Individual Card Components
function PostCard({ post, viewMode }: { post: any; viewMode: 'view' | 'manage' }) {
  const [showComments, setShowComments] = useState(false);
  
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        
        {/* Post Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-3">
              <AvatarFallback className={`text-white ${
                post.author.role === 'leader' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}>
                {post.author.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{post.author.name}</span>
                {post.author.role === 'leader' && <Crown className="w-4 h-4 text-yellow-400" />}
                {post.isPinned && <Pin className="w-4 h-4 text-blue-400" />}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>{post.timestamp}</span>
                {post.type === 'coordination' && (
                  <Badge className="text-xs bg-green-500/20 text-green-400">Coordination</Badge>
                )}
                {post.type === 'announcement' && (
                  <Badge className="text-xs bg-blue-500/20 text-blue-400">Announcement</Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {viewMode === 'manage' && (
              <>
                <Button size="icon" variant="secondary" className="border-gray-600 text-white h-8 w-8">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="icon" variant="secondary" className="border-red-600 text-red-400 h-8 w-8">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </>
            )}
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <h3 className="text-white font-medium mb-2">{post.title}</h3>
          <p className="text-gray-300">{post.content}</p>
        </div>

        {/* Coordination Details */}
        {post.type === 'coordination' && post.coordination && (
          <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="text-white font-medium">Study Session</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400 text-xs">
                {post.coordination.spots.current}/{post.coordination.spots.max} spots
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-300">
                <Clock className="w-3 h-3 mr-2" />
                {new Date(post.coordination.time).toLocaleString()}
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-3 h-3 mr-2" />
                {post.coordination.location}
              </div>
            </div>
            
            <div className="mt-3 flex gap-2">
              <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Attending
              </Button>
              <Button size="sm" variant="secondary" className="border-gray-600 text-white">
                <AlertCircle className="w-3 h-3 mr-1" />
                Maybe
              </Button>
            </div>
          </div>
        )}

        {/* Post Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="border-gray-600 text-gray-400 text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
              <Heart className="w-4 h-4 mr-1" />
              {post.engagement.likes}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-gray-400 hover:text-white"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              {post.engagement.comments}
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <Share className="w-4 h-4 mr-1" />
              {post.engagement.shares}
            </Button>
          </div>
          
          <div className="text-xs text-gray-500">
            {post.engagement.likes + post.engagement.comments} interactions
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs">
                    SC
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="text-white font-medium">Sarah Chen</span>
                    <span className="text-gray-400 ml-2">Great idea! I'll bring extra practice problems.</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs">
                    AK
                  </AvatarFallback>
                </Avatar>
                <Input 
                  placeholder="Add a comment..."
                  className="bg-gray-900 border-gray-700 text-white text-sm"
                />
                <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EventCard({ event, viewMode }: { event: any; viewMode: 'view' | 'manage' }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-white font-medium">{event.title}</h3>
              {event.isRecurring && (
                <Badge className="text-xs bg-purple-500/20 text-purple-400">Recurring</Badge>
              )}
            </div>
            
            <p className="text-gray-300 text-sm mb-3">{event.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                {event.rsvp.attending} attending, {event.rsvp.maybe} maybe
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {viewMode === 'manage' && (
              <div className="flex gap-1">
                <Button size="icon" variant="secondary" className="border-gray-600 text-white h-8 w-8">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="icon" variant="secondary" className="border-red-600 text-red-400 h-8 w-8">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              RSVP
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MemberCard({ member, viewMode }: { member: any; viewMode: 'view' | 'manage' }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="w-12 h-12 mr-3">
                <AvatarFallback className={`text-white ${
                  member.role === 'owner' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  member.role === 'moderator' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                  'bg-gradient-to-r from-gray-500 to-gray-600'
                }`}>
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
              {member.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-gray-800 rounded-full"></div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{member.name}</span>
                {member.role === 'owner' && <Crown className="w-4 h-4 text-yellow-400" />}
                {member.role === 'moderator' && <Shield className="w-4 h-4 text-blue-400" />}
              </div>
              <div className="text-gray-400 text-sm">{member.handle}</div>
              <div className="text-gray-500 text-xs">
                {member.year} • {member.major}
              </div>
            </div>
          </div>
          
          {viewMode === 'manage' && (
            <MoreVertical className="w-4 h-4 text-gray-500" />
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
          <div>
            <div className="text-white font-medium">{member.contributions.posts}</div>
            <div className="text-gray-400">Posts</div>
          </div>
          <div>
            <div className="text-white font-medium">{member.contributions.events}</div>
            <div className="text-gray-400">Events</div>
          </div>
          <div>
            <div className="text-white font-medium">{member.contributions.helpfulVotes}</div>
            <div className="text-gray-400">Helpful</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={`text-xs ${
            member.activity === 'very-active' ? 'border-green-400/50 text-green-400' :
            member.activity === 'active' ? 'border-blue-400/50 text-blue-400' :
            member.activity === 'moderate' ? 'border-yellow-400/50 text-yellow-400' :
            'border-gray-400/50 text-gray-400'
          }`}>
            {member.activity.replace('-', ' ')}
          </Badge>
          
          <span className="text-gray-500 text-xs">
            {member.isOnline ? 'Online now' : `Last seen ${member.lastSeen}`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ToolCard({ tool, viewMode }: { tool: any; viewMode: 'view' | 'manage' }) {
  const Icon = tool.icon;
  
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-3">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{tool.name}</h3>
              <Badge variant="secondary" className="text-xs mt-1 border-cyan-400/50 text-cyan-400">
                {tool.type}
              </Badge>
            </div>
          </div>
          
          {viewMode === 'manage' && (
            <div className="flex gap-1">
              <Button size="icon" variant="secondary" className="border-gray-600 text-white h-8 w-8">
                <Settings className="w-3 h-3" />
              </Button>
              <Button size="icon" variant="secondary" className="border-red-600 text-red-400 h-8 w-8">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
        
        <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
        
        <div className="space-y-2 text-xs mb-4">
          <div className="flex justify-between">
            <span className="text-gray-400">This Week</span>
            <span className="text-white">{tool.usage.thisWeek} uses</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Uses</span>
            <span className="text-white">{tool.usage.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Creator</span>
            <span className="text-white">{tool.creator}</span>
          </div>
        </div>
        
        <div className="space-y-1 mb-4">
          {tool.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center text-xs">
              <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full hive-interactive"
          style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          Launch Tool
        </Button>
      </CardContent>
    </Card>
  );
}

function PinnedItemCard({ item, viewMode }: { item: any; viewMode: 'view' | 'manage' }) {
  const Icon = item.icon;
  
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center flex-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-3">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-medium truncate">{item.title}</h3>
                <Badge variant="secondary" className="text-xs border-amber-400/50 text-amber-400">
                  {item.category.replace('-', ' ')}
                </Badge>
              </div>
              <p className="text-gray-300 text-sm mb-2 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>Pinned by {item.pinnedBy}</span>
                <span>{new Date(item.pinnedDate).toLocaleDateString()}</span>
                {item.downloadCount && (
                  <span>{item.downloadCount} downloads</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            {viewMode === 'manage' && (
              <Button size="icon" variant="secondary" className="border-red-600 text-red-400 h-8 w-8">
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
            
            {item.type === 'link' ? (
              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                <ExternalLink className="w-3 h-3 mr-1" />
                Visit
              </Button>
            ) : item.type === 'file' ? (
              <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
            ) : (
              <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const CompleteSurfacesDemo: Story = {
  render: () => <UniversalSurfacesDemo />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const PostBoardShowcase: Story = {
  render: () => {
    const Component = () => {
      const [activeSurface] = useState('posts');
      return <UniversalSurfacesDemo />;
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

export const EventsCalendarShowcase: Story = {
  render: () => {
    const Component = () => {
      const [activeSurface] = useState('events');
      return <UniversalSurfacesDemo />;
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

export const MembersDirectoryShowcase: Story = {
  render: () => {
    const Component = () => {
      const [activeSurface] = useState('members');
      return <UniversalSurfacesDemo />;
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

export const ToolsSystemShowcase: Story = {
  render: () => {
    const Component = () => {
      const [activeSurface] = useState('tools');
      return <UniversalSurfacesDemo />;
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

export const PinnedResourcesShowcase: Story = {
  render: () => {
    const Component = () => {
      const [activeSurface] = useState('pinned');
      return <UniversalSurfacesDemo />;
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