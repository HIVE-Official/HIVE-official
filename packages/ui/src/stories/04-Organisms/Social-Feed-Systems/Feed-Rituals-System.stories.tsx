/**
 * HIVE Live Frontend: Feed & Rituals System
 * Complete social content discovery and campus ritual engagement system as it appears in production
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
  Smile
} from 'lucide-react';
import { useState } from 'react';
import '../../../hive-tokens.css';

const meta = {
  title: '07-Live-Frontend/Feed & Rituals System',
  component: CampusFeedSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Live Feed & Rituals System

The complete campus social content discovery and ritual engagement system as experienced by UB students in production. This showcases both the social feed for campus content and the rituals system for building healthy campus habits.

## Key Features
- **Campus Feed**: Real-time social content from spaces and connections
- **Ritual System**: Campus-specific habit building and community challenges
- **Content Creation**: Rich post composer with events, polls, and media
- **Social Engagement**: Likes, comments, shares with campus context
- **Trending Content**: Algorithm-driven campus content discovery
- **Ritual Tracking**: Personal and community habit streaks
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for feed and rituals
const mockFeedPosts = [
  {
    id: 'post_1',
    type: 'event_announcement',
    author: {
      name: 'Marcus Johnson',
      handle: '@mjohnson',
      avatar: 'MJ',
      isVerified: true,
      role: 'Space Leader'
    },
    space: {
      name: 'CS 101 Study Group',
      id: 'cs101_study'
    },
    timestamp: '2024-11-15T20:00:00Z',
    content: {
      text: 'Emergency study session tonight at 8 PM in Lockwood Library! We\'re going over the midterm review and working through practice problems. Bring your laptops!',
      event: {
        title: 'Midterm Review Session',
        date: '2024-11-15T20:00:00Z',
        location: 'Lockwood Library, Room 204',
        rsvpCount: 12
      }
    },
    engagement: {
      likes: 23,
      comments: 8,
      shares: 4,
      isLiked: false
    },
    tags: ['study-session', 'midterm', 'programming']
  },
  {
    id: 'post_2',
    type: 'tool_share',
    author: {
      name: 'Sarah Chen',
      handle: '@sarahc',
      avatar: 'SC',
      isVerified: false,
      role: 'Builder'
    },
    space: null,
    timestamp: '2024-11-15T16:30:00Z',
    content: {
      text: 'Just built a study room finder for UB! Check availability across campus in real-time. Perfect for finding quiet spots during finals season 📚',
      tool: {
        name: 'Study Room Finder',
        description: 'Find available study rooms across campus',
        usageCount: 847,
        category: 'Productivity'
      }
    },
    engagement: {
      likes: 156,
      comments: 32,
      shares: 28,
      isLiked: true
    },
    tags: ['campus-tools', 'study-rooms', 'productivity']
  },
  {
    id: 'post_3',
    type: 'ritual_completion',
    author: {
      name: 'Alex Liu',
      handle: '@alexl',
      avatar: 'AL',
      isVerified: false,
      role: 'Student'
    },
    space: null,
    timestamp: '2024-11-15T07:15:00Z',
    content: {
      text: 'Just completed my 7-day morning gym streak! 💪 Starting to feel more energized during lectures. Who wants to join the challenge?',
      ritual: {
        name: 'Morning Gym Ritual',
        streak: 7,
        participants: 23,
        category: 'Health & Wellness'
      }
    },
    engagement: {
      likes: 45,
      comments: 12,
      shares: 6,
      isLiked: false
    },
    tags: ['morning-routine', 'fitness', 'wellness']
  },
  {
    id: 'post_4',
    type: 'space_activity',
    author: {
      name: 'Kim Park',
      handle: '@kpark',
      avatar: 'KP',
      isVerified: false,
      role: 'Floor Leader'
    },
    space: {
      name: 'Ellicott 3rd Floor',
      id: 'ellicott_3rd'
    },
    timestamp: '2024-11-15T14:45:00Z',
    content: {
      text: 'Floor movie night this Friday! We\'re watching The Social Network (how fitting 😄). Bring snacks and we\'ll provide the popcorn!',
      poll: {
        question: 'What time works best for everyone?',
        options: [
          { text: '7:00 PM', votes: 8 },
          { text: '8:00 PM', votes: 12 },
          { text: '9:00 PM', votes: 3 }
        ],
        totalVotes: 23,
        userVoted: false
      }
    },
    engagement: {
      likes: 34,
      comments: 15,
      shares: 2,
      isLiked: false
    },
    tags: ['movie-night', 'dorm-life', 'social']
  }
];

const mockRituals = [
  {
    id: 'morning_gym',
    name: 'Morning Gym Ritual',
    description: 'Hit the gym before classes start',
    category: 'Health & Wellness',
    icon: '💪',
    difficulty: 'Medium',
    duration: '45-60 min',
    bestTime: '6:00 AM - 9:00 AM',
    participants: 156,
    myStreak: 7,
    personalBest: 12,
    isActive: true,
    todayCompleted: true,
    weeklyTarget: 5,
    weeklyProgress: 4,
    campusRanking: 23,
    rewards: [
      { type: 'badge', name: 'Early Bird', earned: true },
      { type: 'points', amount: 50, earned: true },
      { type: 'badge', name: 'Gym Warrior', earned: false, requirement: '30-day streak' }
    ]
  },
  {
    id: 'study_pomodoro',
    name: 'Study Pomodoro Sessions',
    description: 'Focused 25-minute study blocks',
    category: 'Academic',
    icon: '📚',
    difficulty: 'Easy',
    duration: '25 min',
    bestTime: 'Any time',
    participants: 234,
    myStreak: 0,
    personalBest: 5,
    isActive: false,
    todayCompleted: false,
    weeklyTarget: 10,
    weeklyProgress: 0,
    campusRanking: null,
    rewards: [
      { type: 'badge', name: 'Focus Master', earned: false, requirement: '7-day streak' },
      { type: 'points', amount: 25, earned: false }
    ]
  },
  {
    id: 'evening_reflection',
    name: 'Evening Reflection',
    description: 'Daily gratitude and planning',
    category: 'Mindfulness',
    icon: '🌅',
    difficulty: 'Easy',
    duration: '10 min',
    bestTime: '8:00 PM - 11:00 PM',
    participants: 89,
    myStreak: 3,
    personalBest: 8,
    isActive: true,
    todayCompleted: false,
    weeklyTarget: 7,
    weeklyProgress: 3,
    campusRanking: 45,
    rewards: [
      { type: 'badge', name: 'Mindful Student', earned: true },
      { type: 'points', amount: 30, earned: true }
    ]
  },
  {
    id: 'campus_walk',
    name: 'Daily Campus Walk',
    description: 'Explore campus and get fresh air',
    category: 'Health & Wellness',
    icon: '🚶',
    difficulty: 'Easy',
    duration: '20-30 min',
    bestTime: 'Between classes',
    participants: 67,
    myStreak: 14,
    personalBest: 21,
    isActive: true,
    todayCompleted: true,
    weeklyTarget: 5,
    weeklyProgress: 5,
    campusRanking: 8,
    rewards: [
      { type: 'badge', name: 'Campus Explorer', earned: true },
      { type: 'badge', name: 'Streak Master', earned: true },
      { type: 'points', amount: 100, earned: true }
    ]
  }
];

const CampusFeedSystem = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [feedFilter, setFeedFilter] = useState('all');
  const [postText, setPostText] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-[var(--hive-text-primary)]">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-[var(--hive-black)]/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Campus Feed</h1>
              <p className="text-gray-400">What's happening at UB</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Search className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-4">
            {[
              { id: 'feed', label: 'Feed', icon: Home },
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'spaces', label: 'My Spaces', icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === id
                    ? 'text-[var(--hive-black)] hive-interactive'
                    : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
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

          {/* Feed Filters */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1 flex space-x-2">
              {[
                { id: 'all', label: 'All Posts' },
                { id: 'events', label: 'Events' },
                { id: 'tools', label: 'Tools' },
                { id: 'rituals', label: 'Rituals' },
              ].map(({ id, label }) => (
                <Button
                  key={id}
                  size="sm"
                  variant={feedFilter === id ? "default" : "outline"}
                  onClick={() => setFeedFilter(id)}
                  className={feedFilter === id 
                    ? "hive-interactive"
                    : "border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800"
                  }
                  style={feedFilter === id ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)'
                  } : {}
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
            <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        
        {/* Post Composer */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>SC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="What's happening on campus?"
                  value={postText}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPostText(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-[var(--hive-text-primary)] placeholder-gray-400 mb-3"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                      <Camera className="w-4 h-4 mr-1" />
                      Photo
                    </Button>
                    <Button size="sm" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                      <Calendar className="w-4 h-4 mr-1" />
                      Event
                    </Button>
                    <Button size="sm" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                      <Target className="w-4 h-4 mr-1" />
                      Poll
                    </Button>
                  </div>
                  <Button 
                    size="sm" 
                    className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
                    disabled={!postText.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        <div className="space-y-6">
          {mockFeedPosts.map((post: any) => (
            <Card key={post.id} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                
                {/* Post Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarFallback className={`${
                        post.author.role === 'Builder' ? '' :
                        post.author.role === 'Space Leader' ? 'bg-blue-500 text-[var(--hive-text-primary)]' :
                        'bg-gradient-to-r from-green-500 to-teal-500 text-[var(--hive-text-primary)]'
                      }`}>
                        {post.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-[var(--hive-text-primary)] font-medium mr-2">{post.author.name}</h4>
                        {post.author.isVerified && <Award className="w-4 h-4" style={{ color: 'var(--hive-brand-primary)' }} />}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {post.author.handle}
                        {post.space && <> • {post.space.name}</>}
                        <> • {new Date(post.timestamp).toLocaleTimeString()}</>
                      </p>
                    </div>
                  </div>
                  <MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
                </div>

                {/* Post Content */}
                <p className="text-gray-300 mb-4">{post.content.text}</p>

                {/* Event Content */}
                {post.content.event && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-4 border hive-interactive" style={{ borderColor: 'var(--hive-border-gold)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                        <h4 className="text-[var(--hive-text-primary)] font-semibold">{post.content.event.title}</h4>
                      </div>
                      <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                        RSVP ({post.content.event.rsvpCount})
                      </Button>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm space-x-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(post.content.event.date).toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {post.content.event.location}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tool Content */}
                {post.content.tool && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-blue-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <Zap className="w-6 h-6 text-[var(--hive-text-primary)]" />
                        </div>
                        <div>
                          <h4 className="text-[var(--hive-text-primary)] font-semibold">{post.content.tool.name}</h4>
                          <p className="text-gray-400 text-sm">{post.content.tool.description}</p>
                          <div className="flex items-center mt-1">
                            <Badge className="bg-blue-500/20 text-blue-400 mr-2">{post.content.tool.category}</Badge>
                            <span className="text-gray-400 text-xs">{post.content.tool.usageCount} uses</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-500 text-[var(--hive-text-primary)] hover:bg-blue-600">
                        Try Tool
                      </Button>
                    </div>
                  </div>
                )}

                {/* Ritual Content */}
                {post.content.ritual && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-green-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                          <Flame className="w-6 h-6 text-[var(--hive-text-primary)]" />
                        </div>
                        <div>
                          <h4 className="text-[var(--hive-text-primary)] font-semibold">{post.content.ritual.name}</h4>
                          <div className="flex items-center mt-1">
                            <Badge className="bg-green-500/20 text-green-400 mr-2">{post.content.ritual.category}</Badge>
                            <span className="font-semibold" style={{ color: 'var(--hive-brand-primary)' }}>{post.content.ritual.streak} day streak!</span>
                          </div>
                          <p className="text-gray-400 text-xs mt-1">
                            {post.content.ritual.participants} students participating
                          </p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-green-500 text-[var(--hive-text-primary)] hover:bg-green-600">
                        Join Challenge
                      </Button>
                    </div>
                  </div>
                )}

                {/* Poll Content */}
                {post.content.poll && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <h4 className="text-[var(--hive-text-primary)] font-medium mb-3">{post.content.poll.question}</h4>
                    <div className="space-y-2 mb-3">
                      {post.content.poll.options.map((option, index) => {
                        const percentage = (option.votes / post.content.poll.totalVotes) * 100;
                        return (
                          <div
                            key={index}
                            className="relative bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors"
                          >
                            <div
                              className="absolute inset-0 rounded-lg"
                              style={{ 
                                backgroundColor: 'var(--hive-overlay-gold-subtle)', 
                                width: `${percentage}%` 
                              }}
                            />
                            <div className="relative flex justify-between items-center">
                              <span className="text-[var(--hive-text-primary)]">{option.text}</span>
                              <span className="text-gray-300">{option.votes} ({Math.round(percentage)}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-gray-400 text-sm">{post.content.poll.totalVotes} total votes</p>
                  </div>
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag: any) => (
                      <Badge key={tag} variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Engagement */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className={`${post.engagement.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${post.engagement.isLiked ? 'fill-current' : ''}`} />
                      {post.engagement.likes}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-[var(--hive-text-primary)]">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {post.engagement.comments}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-[var(--hive-text-primary)]">
                      <Share className="w-4 h-4 mr-1" />
                      {post.engagement.shares}
                    </Button>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i: any) => (
                      <Avatar key={i} className="w-6 h-6 border-2 border-gray-800">
                        <AvatarFallback className="bg-gradient-to-r from-[var(--hive-gold)] to-pink-500 text-[var(--hive-text-primary)] text-xs">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

const CampusRitualsSystem = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('my-rituals');

  const categories = [
    { id: 'all', label: 'All Rituals', count: 25 },
    { id: 'academic', label: 'Academic', count: 8 },
    { id: 'health', label: 'Health & Wellness', count: 12 },
    { id: 'mindfulness', label: 'Mindfulness', count: 5 }
  ];

  const filteredRituals = mockRituals.filter(ritual => {
    if (activeCategory !== 'all' && !ritual.category.toLowerCase().includes(activeCategory)) return false;
    if (viewMode === 'my-rituals' && !ritual.isActive) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-[var(--hive-text-primary)]">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-[var(--hive-black)]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Campus Rituals</h1>
              <p className="text-gray-400">Build healthy habits with your campus community</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Search className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Settings className="w-4 h-4" />
              </Button>
              <Button className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                <Plus className="w-4 h-4 mr-2" />
                Create Ritual
              </Button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-4">
            {[
              { id: 'my-rituals', label: 'My Rituals', icon: Target },
              { id: 'discover', label: 'Discover', icon: Search },
              { id: 'leaderboard', label: 'Leaderboard', icon: Award },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  viewMode === id
                    ? 'text-[var(--hive-black)] hive-interactive'
                    : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
                  }`}
                  style={viewMode === id ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)'
                  } : {}}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-2">
            {categories.map(({ id, label, count }) => (
              <Button
                key={id}
                size="sm"
                variant={activeCategory === id ? "default" : "outline"}
                onClick={() => setActiveCategory(id)}
                className={activeCategory === id 
                  ? "hive-interactive"
                  : "border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800"
                }
                style={activeCategory === id ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
              >
                {label} ({count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        
        {/* Daily Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold" style={{ color: 'var(--hive-brand-primary)' }}>3</div>
              <div className="text-sm text-gray-400">Active Rituals</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-green-400">2</div>
              <div className="text-sm text-gray-400">Completed Today</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-blue-400">7</div>
              <div className="text-sm text-gray-400">Longest Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-[var(--hive-gold)]">23</div>
              <div className="text-sm text-gray-400">Campus Ranking</div>
            </CardContent>
          </Card>
        </div>

        {/* Rituals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRituals.map((ritual: any) => (
            <Card key={ritual.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{ritual.icon}</div>
                    <div>
                      <CardTitle className="text-[var(--hive-text-primary)] text-base">{ritual.name}</CardTitle>
                      <p className="text-gray-400 text-sm">{ritual.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {ritual.todayCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                
                {/* Ritual Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Duration</span>
                    <div className="text-[var(--hive-text-primary)] font-medium">{ritual.duration}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Difficulty</span>
                    <div className="text-[var(--hive-text-primary)] font-medium">{ritual.difficulty}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Best Time</span>
                    <div className="text-[var(--hive-text-primary)] font-medium">{ritual.bestTime}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Participants</span>
                    <div className="text-[var(--hive-text-primary)] font-medium">{ritual.participants}</div>
                  </div>
                </div>

                {/* Streak Info */}
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[var(--hive-text-primary)] font-medium">Current Streak</span>
                    <div className="flex items-center">
                      <Flame className="w-4 h-4 mr-1" style={{ color: 'var(--hive-brand-primary)' }} />
                      <span className="font-bold" style={{ color: 'var(--hive-brand-primary)' }}>{ritual.myStreak} days</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Personal Best: {ritual.personalBest} days</span>
                    {ritual.campusRanking && (
                      <span>Campus Rank: #{ritual.campusRanking}</span>
                    )}
                  </div>
                </div>

                {/* Weekly Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[var(--hive-text-primary)] font-medium">This Week</span>
                    <span className="text-gray-400 text-sm">
                      {ritual.weeklyProgress}/{ritual.weeklyTarget}
                    </span>
                  </div>
                  <HiveProgress 
                    value={(ritual.weeklyProgress / ritual.weeklyTarget) * 100} 
                    className="bg-gray-700"
                  />
                </div>

                {/* Rewards */}
                {ritual.rewards.length > 0 && (
                  <div>
                    <span className="text-[var(--hive-text-primary)] font-medium mb-2 block">Rewards</span>
                    <div className="flex flex-wrap gap-1">
                      {ritual.rewards.map((reward, index) => (
                        <Badge 
                          key={index}
                          className={`text-xs ${
                            reward.earned 
                              ? '' 
                              : 'bg-gray-700 text-gray-400'
                          }`}
                          style={reward.earned ? {
                            backgroundColor: 'var(--hive-brand-primary)',
                            color: 'var(--hive-text-inverse)'
                          } : {}}
                        >
                          {reward.type === 'badge' ? (
                            <>🏆 {reward.name}</>
                          ) : (
                            <>⭐ {reward.amount} pts</>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {ritual.isActive ? (
                    <>
                      {ritual.todayCompleted ? (
                        <Button size="sm" className="flex-1 bg-green-600 text-[var(--hive-text-primary)]" disabled>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed Today
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1 hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                          <Timer className="w-4 h-4 mr-2" />
                          Complete Now
                        </Button>
                      )}
                      <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" className="flex-1 bg-blue-500 text-[var(--hive-text-primary)] hover:bg-blue-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Start Ritual
                      </Button>
                      <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Discover More */}
        {viewMode === 'my-rituals' && (
          <div className="text-center mt-8">
            <Button 
              variant="secondary" 
              className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800"
              onClick={() => setViewMode('discover')}
            >
              Discover More Rituals
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const CampusFeedDashboard: Story = {
  render: () => <CampusFeedSystem />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const CampusRitualsDashboard: Story = {
  render: () => <CampusRitualsSystem />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const MobileFeedExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <CampusFeedSystem />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const MobileRitualsExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <CampusRitualsSystem />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};