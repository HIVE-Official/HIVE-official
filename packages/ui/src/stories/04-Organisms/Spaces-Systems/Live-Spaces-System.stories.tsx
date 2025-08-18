/**
 * HIVE Live Frontend: Spaces System
 * Complete spaces discovery, management, and interaction system as it appears in production
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Input } from '../../../components/ui/input';
import { HiveProgress } from '../../../components/hive-progress';
import { Separator } from '../../../components/ui/separator';
import { Switch } from '../../../components/ui/switch';
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Home,
  BookOpen,
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
  ChevronRight,
  Zap,
  User,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Shield,
  Crown,
  Activity
} from 'lucide-react';
import { useState } from 'react';
import '../../../hive-tokens.css';

const meta = {
  title: '06-Live-Frontend/Spaces System',
  component: SpaceDiscoverySystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Live Spaces System

The complete spaces discovery, management, and community interaction system as experienced by UB students in production. This showcases the full campus community building features.

## Key Features
- **Space Discovery**: AI-powered recommendations and search
- **Community Management**: Complete moderation and member tools
- **Real-time Interaction**: Live posts, comments, and activity
- **Campus Integration**: UB-specific spaces and categories
- **Social Proof**: Engagement metrics and community health
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for spaces system
const mockSpaces = [
  {
    id: 'cs101_study',
    name: 'CS 101 Study Group',
    description: 'Weekly study sessions for intro programming. Collaborative coding and exam prep.',
    category: 'academic',
    subcategory: 'Computer Science',
    memberCount: 24,
    isJoined: false,
    isPopular: true,
    lastActivity: '2 hours ago',
    activityLevel: 'high',
    privacy: 'public',
    leader: {
      name: 'Marcus Johnson',
      handle: '@mjohnson',
      avatar: 'MJ',
      isVerified: true
    },
    stats: {
      postsThisWeek: 12,
      eventsThisMonth: 4,
      avgResponseTime: '15 mins'
    },
    tags: ['study-group', 'programming', 'exam-prep', 'lockwood-library'],
    upcomingEvents: [
      {
        title: 'Midterm Review Session',
        date: '2024-11-16T18:00:00Z',
        location: 'Lockwood Library Room 204'
      }
    ]
  },
  {
    id: 'ellicott_3rd',
    name: 'Ellicott 3rd Floor',
    description: 'Third floor community space. Coordinating laundry, food orders, and floor events.',
    category: 'housing',
    subcategory: 'Ellicott Complex',
    memberCount: 17,
    isJoined: true,
    isPopular: false,
    lastActivity: '30 minutes ago',
    activityLevel: 'very-high',
    privacy: 'private',
    leader: {
      name: 'Sarah Chen',
      handle: '@sarahc',
      avatar: 'SC',
      isVerified: false
    },
    stats: {
      postsThisWeek: 28,
      eventsThisMonth: 8,
      avgResponseTime: '5 mins'
    },
    tags: ['dorm-life', 'community', 'events', 'food-orders'],
    upcomingEvents: [
      {
        title: 'Floor Movie Night',
        date: '2024-11-16T19:00:00Z',
        location: '3rd Floor Lounge'
      }
    ]
  },
  {
    id: 'weekend_events',
    name: 'Weekend Campus Events',
    description: 'Discover and coordinate weekend activities. From parties to study sessions.',
    category: 'social',
    subcategory: 'Campus Events',
    memberCount: 156,
    isJoined: false,
    isPopular: true,
    lastActivity: '1 hour ago',
    activityLevel: 'high',
    privacy: 'public',
    leader: {
      name: 'Alex Liu',
      handle: '@alexl',
      avatar: 'AL',
      isVerified: false
    },
    stats: {
      postsThisWeek: 8,
      eventsThisMonth: 15,
      avgResponseTime: '30 mins'
    },
    tags: ['weekend', 'parties', 'social', 'events'],
    upcomingEvents: []
  },
  {
    id: 'ub_builders',
    name: 'UB Builders Hub',
    description: 'For students building tools, apps, and solutions for campus life.',
    category: 'builder',
    subcategory: 'Tech & Innovation',
    memberCount: 43,
    isJoined: true,
    isPopular: true,
    lastActivity: '45 minutes ago',
    activityLevel: 'medium',
    privacy: 'public',
    leader: {
      name: 'Tech Team',
      handle: '@ubtech',
      avatar: 'TT',
      isVerified: true
    },
    stats: {
      postsThisWeek: 6,
      eventsThisMonth: 3,
      avgResponseTime: '2 hours'
    },
    tags: ['builders', 'tech', 'innovation', 'tools'],
    upcomingEvents: [
      {
        title: 'Builder Showcase',
        date: '2024-11-18T16:00:00Z',
        location: 'Student Union Tech Space'
      }
    ]
  }
];

const SpaceDiscoverySystem = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', label: 'All Spaces', count: 156 },
    { id: 'academic', label: 'Academic', count: 45 },
    { id: 'social', label: 'Social', count: 67 },
    { id: 'housing', label: 'Housing', count: 23 },
    { id: 'builder', label: 'Builder', count: 21 }
  ];

  const filteredSpaces = mockSpaces.filter(space => {
    if (selectedCategory !== 'all' && space.category !== selectedCategory) return false;
    if (searchQuery && !space.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Campus Spaces</h1>
              <p className="text-gray-400">Discover and join your campus communities</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button size="icon" variant="outline" className="border-gray-600 text-white">
                <Bell className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="border-gray-600 text-white">
                <Settings className="w-4 h-4" />
              </Button>
              <Button className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                <Plus className="w-4 h-4 mr-2" />
                Create Space
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-4">
            {[
              { id: 'discover', label: 'Discover', icon: Search },
              { id: 'my-spaces', label: 'My Spaces', icon: Users },
              { id: 'trending', label: 'Trending', icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === id
                    ? 'text-black hive-interactive'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={activeTab === id ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search spaces by name, topic, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline" className="border-gray-600 text-white">
                <Filter className="w-4 h-4" />
              </Button>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold" style={{ color: 'var(--hive-brand-primary)' }}>156</div>
              <div className="text-sm text-gray-400">Active Spaces</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-blue-400">12</div>
              <div className="text-sm text-gray-400">Joined Spaces</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-green-400">2.4k</div>
              <div className="text-sm text-gray-400">Total Members</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-purple-400">48</div>
              <div className="text-sm text-gray-400">New This Week</div>
            </CardContent>
          </Card>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSpaces.map((space) => (
            <Card key={space.id} className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                    e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-3 ${
                      space.category === 'academic' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                      space.category === 'housing' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                      space.category === 'social' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      'bg-gradient-to-r from-yellow-400 to-amber-500'
                    }`}>
                      {space.category === 'academic' ? <BookOpen className="w-6 h-6 text-white" /> :
                       space.category === 'housing' ? <Home className="w-6 h-6 text-white" /> :
                       space.category === 'social' ? <Calendar className="w-6 h-6 text-white" /> :
                       <Lightbulb className="w-6 h-6 text-black" />}
                    </div>
                    <div>
                      <CardTitle className="text-white text-base">{space.name}</CardTitle>
                      <p className="text-gray-400 text-sm">{space.subcategory}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {space.isPopular && <Badge className="text-xs" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>Hot</Badge>}
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{space.description}</p>

                {/* Space Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {space.memberCount}
                    </span>
                    <span className="flex items-center">
                      <Activity className={`w-4 h-4 mr-1 ${
                        space.activityLevel === 'very-high' ? 'text-green-400' :
                        space.activityLevel === 'high' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`} />
                      {space.lastActivity}
                    </span>
                  </div>
                  <Badge variant={space.privacy === 'private' ? 'secondary' : 'outline'} className="text-xs">
                    {space.privacy === 'private' ? <Shield className="w-3 h-3 mr-1" /> : null}
                    {space.privacy}
                  </Badge>
                </div>

                {/* Leader Info */}
                <div className="flex items-center">
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs">
                      {space.leader.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-400 text-sm">
                    Led by {space.leader.name}
                    {space.leader.isVerified && <Award className="w-3 h-3 ml-1 inline" style={{ color: 'var(--hive-brand-primary)' }} />}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {space.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {space.tags.length > 3 && (
                    <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                      +{space.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Upcoming Events */}
                {space.upcomingEvents.length > 0 && (
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                      <span className="text-white text-sm font-medium">Upcoming Event</span>
                    </div>
                    <div className="text-gray-300 text-sm">{space.upcomingEvents[0].title}</div>
                    <div className="flex items-center text-gray-400 text-xs mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(space.upcomingEvents[0].date).toLocaleDateString()}
                      <MapPin className="w-3 h-3 ml-3 mr-1" />
                      {space.upcomingEvents[0].location}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {space.isJoined ? (
                    <>
                      <Button size="sm" className="flex-1 bg-green-600 text-white hover:bg-green-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Open Chat
                      </Button>
                      <Button size="icon" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" className="flex-1 hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Join Space
                      </Button>
                      <Button size="icon" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <Button size="icon" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
            Load More Spaces
          </Button>
        </div>
      </div>
    </div>
  );
};

const SpaceManagementSystem = () => {
  const [activeSpace] = useState(mockSpaces[0]);
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Space Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{activeSpace.name}</h1>
                <p className="text-gray-400">{activeSpace.description}</p>
                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {activeSpace.memberCount} members
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {activeSpace.lastActivity}
                  </span>
                  <Badge style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>{activeSpace.category}</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline" className="border-gray-600 text-white">
                <Bell className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="border-gray-600 text-white">
                <Settings className="w-4 h-4" />
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-700">
                Leave Space
              </Button>
            </div>
          </div>

          {/* Space Navigation */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {[
              { id: 'posts', label: 'Posts', count: 24 },
              { id: 'members', label: 'Members', count: activeSpace.memberCount },
              { id: 'events', label: 'Events', count: 3 },
              { id: 'resources', label: 'Resources', count: 8 },
              { id: 'settings', label: 'Settings', count: null },
            ].map(({ id, label, count }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === id
                    ? 'text-black hive-interactive'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={activeTab === id ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
              >
                {label}
                {count && (
                  <Badge className="ml-2 bg-gray-700 text-white text-xs">{count}</Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Space Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Post Composer */}
            <Card className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                    e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Share something with the study group..."
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-white">
                          <Calendar className="w-4 h-4 mr-1" />
                          Event
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-white">
                          <MapPin className="w-4 h-4 mr-1" />
                          Location
                        </Button>
                      </div>
                      <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <div className="space-y-4">
              {/* Study Session Post */}
              <Card className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                    e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarFallback className="bg-blue-500 text-white">MJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">Marcus Johnson</h4>
                      <p className="text-gray-400 text-sm">Space Leader • 2 hours ago</p>
                    </div>
                    <Crown className="w-5 h-5" style={{ color: 'var(--hive-brand-primary)' }} />
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    Emergency study session tonight at 8 PM in Lockwood Library! We're going over 
                    the midterm review and working through practice problems. Bring your laptops!
                  </p>
                  
                  <div className="bg-gray-800 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                        <span className="text-white font-medium">Tonight at 8:00 PM</span>
                      </div>
                      <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                        RSVP (12)
                      </Button>
                    </div>
                    <div className="flex items-center mt-2">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-400 text-sm">Lockwood Library, Room 204</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button size="sm" variant="ghost" className="text-red-400">
                        <Heart className="w-4 h-4 mr-1 fill-current" />
                        12
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        5
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <Avatar key={i} className="w-6 h-6 border-2 border-gray-800">
                          <AvatarFallback className="bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs">
                            {String.fromCharCode(65 + i)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resource Share Post */}
              <Card className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                    e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarFallback className="bg-green-500 text-white">AL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">Alex Liu</h4>
                      <p className="text-gray-400 text-sm">4 hours ago</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    Found some great practice problems for our upcoming midterm. These really helped me understand pointers!
                  </p>
                  
                  <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-blue-500/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">C++ Practice Problems</h4>
                          <p className="text-gray-400 text-sm">pointers-and-memory-management.pdf</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                        <Heart className="w-4 h-4 mr-1" />
                        8
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        3
                      </Button>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400">Study Resource</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Space Stats */}
            <Card className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                    e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Space Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Posts this week</span>
                  <span className="text-white font-medium">{activeSpace.stats.postsThisWeek}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Events this month</span>
                  <span className="text-white font-medium">{activeSpace.stats.eventsThisMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg response time</span>
                  <span className="text-green-400 font-medium">{activeSpace.stats.avgResponseTime}</span>
                </div>
                
                <Separator className="bg-gray-700" />
                
                <div>
                  <h4 className="text-white font-medium mb-2">Engagement Level</h4>
                  <HiveProgress value={85} className="bg-gray-700" />
                  <p className="text-gray-400 text-sm mt-1">Very Active Community</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Members */}
            <Card className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                    e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                  <Users className="w-5 h-5 mr-2" />
                  Recent Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Kim Park', handle: '@kpark', avatar: 'KP', time: '2 hours ago' },
                  { name: 'David Wong', handle: '@dwong', avatar: 'DW', time: '1 day ago' },
                  { name: 'Lisa Chen', handle: '@lchen', avatar: 'LC', time: '3 days ago' },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarFallback className={`text-white text-sm ${
                          index % 3 === 0 ? 'bg-gradient-to-r from-pink-500 to-purple-500' :
                          index % 3 === 1 ? 'bg-gradient-to-r from-blue-500 to-teal-500' :
                          'bg-gradient-to-r from-orange-500 to-red-500'
                        }`}>
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white text-sm font-medium">{member.name}</div>
                        <div className="text-gray-400 text-xs">{member.time}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-600 text-white text-xs">
                      Follow
                    </Button>
                  </div>
                ))}
                
                <Button variant="ghost" className="w-full hive-interactive" style={{ color: 'var(--hive-brand-primary)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--hive-overlay-gold-subtle)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                  View All {activeSpace.memberCount} Members
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                    e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full hive-interactive justify-start" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800 justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Invite Members
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800 justify-start">
                  <Share className="w-4 h-4 mr-2" />
                  Share Space
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SpaceDiscoveryDashboard: Story = {
  render: () => <SpaceDiscoverySystem />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const SpaceManagementDashboard: Story = {
  render: () => <SpaceManagementSystem />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const MobileSpacesExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <SpaceDiscoverySystem />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};