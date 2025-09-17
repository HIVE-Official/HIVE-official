/**
 * HIVE Advanced Navigation: Command Interface System
 * 
 * Comprehensive command palette, global search, and contextual navigation patterns
 * that provide power users with efficient campus platform navigation.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { Avatar, AvatarFallback } from '../../atomic/atoms/avatar';
import { Input } from '../../atomic/atoms/input-enhanced';
import { HiveProgress } from '../../components/hive-progress';
import { Separator } from '../../components/ui/separator';
import { Switch } from '../../atomic/atoms/switch-enhanced';
import { 
  Command,
  Search,
  Navigation,
  Menu,
  ArrowRight,
  ChevronRight,
  Users,
  Calendar,
  Zap,
  Activity,
  Settings,
  Star,
  Heart,
  MessageSquare,
  Share,
  Bell,
  Plus,
  Filter,
  SortAsc,
  Globe,
  MapPin,
  Clock,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Download,
  Upload,
  Refresh,
  Home,
  User,
  Users2,
  Target,
  Wrench,
  BookOpen,
  Coffee,
  Award,
  Crown,
  Sparkles,
  Lightbulb,
  Rocket,
  Brain,
  Network,
  Database,
  Code,
  Layers,
  Grid3X3,
  List,
  BarChart3,
  PieChart,
  TrendingUp,
  Hash,
  AtSign,
  Folder,
  File,
  Image,
  Video,
  Mic,
  Phone,
  Mail,
  Link,
  Terminal
} from 'lucide-react';
import { useState, useEffect } from 'react';
import '../../hive-tokens.css';

const meta = {
  title: '06-Platform Systems/Navigation/Command Interface System',
  component: CommandInterfaceDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Advanced Navigation System

Powerful command interface and navigation patterns designed for efficient campus platform navigation. Includes global search, command palette, contextual actions, and intelligent suggestions.

## Core Navigation Features
- **Command Palette**: Quick access to all platform functions via keyboard shortcuts
- **Global Search**: Unified search across users, spaces, tools, content, and activities
- **Contextual Navigation**: Smart navigation suggestions based on current context
- **Quick Actions**: One-click access to common tasks and workflows
- **Intelligent Suggestions**: AI-powered recommendations for navigation and actions

## Command Categories
- **Navigation**: Quick jumps to spaces, profiles, tools, and system areas
- **Actions**: Create, edit, share, and manage content and communities
- **Search**: Find people, spaces, tools, content, and activities
- **System**: Settings, preferences, and platform management
- **Campus**: UB-specific shortcuts and campus-aware actions

## Keyboard Shortcuts
- **⌘+K**: Open command palette
- **⌘+/**: Global search
- **⌘+1-5**: Quick system navigation
- **⌘+N**: Create new (contextual)
- **⌘+E**: Quick edit (contextual)
- **Esc**: Close overlays and return to main view

## Search Intelligence
- **Semantic Search**: Natural language queries across platform content
- **Contextual Results**: Results prioritized by current user context and activity
- **Campus Integration**: Search includes UB-specific locations, events, and data
- **Cross-System**: Unified results from Profile, Spaces, Feed, Rituals, and HiveLAB
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for command interface
const mockCommands = [
  // Navigation Commands
  { 
    id: 'nav_profile', 
    category: 'Navigation', 
    title: 'Go to Profile', 
    description: 'View and edit your profile dashboard',
    shortcut: '⌘+1',
    icon: User,
    action: 'navigate',
    target: '/profile'
  },
  { 
    id: 'nav_spaces', 
    category: 'Navigation', 
    title: 'Browse Spaces', 
    description: 'Discover and join campus communities',
    shortcut: '⌘+2',
    icon: Users2,
    action: 'navigate',
    target: '/spaces'
  },
  { 
    id: 'nav_feed', 
    category: 'Navigation', 
    title: 'View Feed', 
    description: 'See latest campus activity and coordination',
    shortcut: '⌘+3',
    icon: Activity,
    action: 'navigate',
    target: '/feed'
  },
  { 
    id: 'nav_hivelab', 
    category: 'Navigation', 
    title: 'Open HiveLAB', 
    description: 'Build and deploy campus tools',
    shortcut: '⌘+4',
    icon: Wrench,
    action: 'navigate',
    target: '/hivelab'
  },
  { 
    id: 'nav_calendar', 
    category: 'Navigation', 
    title: 'View Calendar', 
    description: 'Check your academic and social schedule',
    shortcut: '⌘+5',
    icon: Calendar,
    action: 'navigate',
    target: '/calendar'
  },

  // Action Commands
  { 
    id: 'action_create_space', 
    category: 'Actions', 
    title: 'Create New Space', 
    description: 'Start a new campus community',
    shortcut: '⌘+Shift+S',
    icon: Plus,
    action: 'create',
    target: 'space'
  },
  { 
    id: 'action_create_tool', 
    category: 'Actions', 
    title: 'Build New Tool', 
    description: 'Create a campus utility in HiveLAB',
    shortcut: '⌘+Shift+T',
    icon: Zap,
    action: 'create',
    target: 'tool'
  },
  { 
    id: 'action_create_post', 
    category: 'Actions', 
    title: 'Create Post', 
    description: 'Share content with your communities',
    shortcut: '⌘+Shift+P',
    icon: Edit,
    action: 'create',
    target: 'post'
  },
  { 
    id: 'action_join_ritual', 
    category: 'Actions', 
    title: 'Join Ritual', 
    description: 'Participate in community building activities',
    shortcut: '⌘+Shift+R',
    icon: Target,
    action: 'join',
    target: 'ritual'
  },

  // System Commands
  { 
    id: 'system_settings', 
    category: 'System', 
    title: 'Open Settings', 
    description: 'Manage your account and preferences',
    shortcut: '⌘+,',
    icon: Settings,
    action: 'navigate',
    target: '/settings'
  },
  { 
    id: 'system_notifications', 
    category: 'System', 
    title: 'View Notifications', 
    description: 'Check your latest campus updates',
    shortcut: '⌘+Shift+N',
    icon: Bell,
    action: 'navigate',
    target: '/notifications'
  },
  { 
    id: 'system_help', 
    category: 'System', 
    title: 'Get Help', 
    description: 'Platform documentation and support',
    shortcut: '⌘+?',
    icon: BookOpen,
    action: 'navigate',
    target: '/help'
  },

  // Campus Commands
  { 
    id: 'campus_dining', 
    category: 'Campus', 
    title: 'Check Dining Halls', 
    description: 'View real-time dining hall status',
    shortcut: '',
    icon: Coffee,
    action: 'tool',
    target: 'dining-tracker'
  },
  { 
    id: 'campus_study_rooms', 
    category: 'Campus', 
    title: 'Find Study Rooms', 
    description: 'Locate available study spaces',
    shortcut: '',
    icon: BookOpen,
    action: 'tool',
    target: 'study-room-finder'
  },
  { 
    id: 'campus_events', 
    category: 'Campus', 
    title: 'Campus Events', 
    description: 'Discover upcoming UB events',
    shortcut: '',
    icon: Calendar,
    action: 'navigate',
    target: '/events'
  }
];

const mockSearchResults = [
  {
    type: 'user',
    id: 'user_sarah_chen',
    title: 'Sarah Chen',
    subtitle: 'CS Major, Junior • Expert Builder',
    icon: User,
    meta: '@sarahc • Engineering Space',
    relevance: 0.95
  },
  {
    type: 'space',
    id: 'space_cs_majors',
    title: 'CS Majors',
    subtitle: '456 members • Active community',
    icon: Users2,
    meta: 'Computer Science • Study Groups',
    relevance: 0.92
  },
  {
    type: 'tool',
    id: 'tool_study_finder',
    title: 'Study Room Finder',
    subtitle: 'Real-time room availability',
    icon: Wrench,
    meta: '1.2k installs • 4.8★',
    relevance: 0.88
  },
  {
    type: 'content',
    id: 'post_study_group',
    title: 'CS 350 Study Group Forming',
    subtitle: 'Finals prep - 3 spots remaining',
    icon: MessageSquare,
    meta: '2 hours ago • CS Majors Space',
    relevance: 0.85
  },
  {
    type: 'location',
    id: 'location_lockwood',
    title: 'Lockwood Library',
    subtitle: 'Study spaces and resources',
    icon: MapPin,
    meta: 'North Campus • Open 24/7',
    relevance: 0.80
  }
];

const CommandInterfaceDemo = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommand, setSelectedCommand] = useState(0);
  const [searchMode, setSearchMode] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState(mockCommands);

  // Simulate command filtering
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCommands(mockCommands);
    } else {
      const filtered = mockCommands.filter(cmd => 
        cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCommands(filtered);
    }
    setSelectedCommand(0);
  }, [searchQuery]);

  // Keyboard navigation simulation
  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(true);
        setSearchMode(false);
      } else if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(true);
        setSearchMode(true);
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setSearchQuery('');
        setSearchMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const commandCategories = [...new Set(filteredCommands.map(cmd => cmd.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Terminal className="w-6 h-6 mr-3" style={{ color: 'var(--hive-brand-primary)' }} />
                Command Interface
              </h1>
              <p className="text-gray-400">Advanced navigation and command system for power users</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={() => {
                  setCommandPaletteOpen(true);
                  setSearchMode(false);
                }}
                className="hive-interactive" 
                style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
              >
                <Command className="w-4 h-4 mr-2" />
                Open Command Palette
              </Button>
              <Button 
                onClick={() => {
                  setCommandPaletteOpen(true);
                  setSearchMode(true);
                }}
                variant="secondary" 
                className="border-gray-600 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Global Search
              </Button>
            </div>
          </div>

          {/* Quick Navigation Bar */}
          <div className="flex items-center space-x-1">
            {[
              { label: 'Profile', shortcut: '⌘+1', icon: User },
              { label: 'Spaces', shortcut: '⌘+2', icon: Users2 },
              { label: 'Feed', shortcut: '⌘+3', icon: Activity },
              { label: 'HiveLAB', shortcut: '⌘+4', icon: Wrench },
              { label: 'Calendar', shortcut: '⌘+5', icon: Calendar }
            ].map((item, index) => (
              <Button
                key={item.label}
                size="sm"
                variant="secondary"
                className="border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
                <Badge variant="secondary" className="ml-2 border-gray-500 text-gray-500 text-xs">
                  {item.shortcut}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Command Palette Overlay */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <Card className="w-full max-w-2xl bg-gray-900 border-gray-700 shadow-2xl">
            <CardContent className="p-0">
              {/* Search Input */}
              <div className="p-4 border-b border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={searchMode ? "Search across HIVE platform..." : "Type a command or search..."}
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pl-12 text-lg"
                    autoFocus
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                      {searchMode ? '⌘+/' : '⌘+K'}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setCommandPaletteOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ESC
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {searchMode && searchQuery.trim() !== '' ? (
                  // Search Results Mode
                  <div className="p-2">
                    {mockSearchResults
                      .filter(result => 
                        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        result.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((result, index) => (
                        <div
                          key={result.id}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                            index === selectedCommand ? 'bg-gray-700' : 'hover:bg-gray-800'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-700">
                              <result.icon className="w-4 h-4 text-gray-300" />
                            </div>
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-medium">{result.title}</h4>
                              <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs capitalize">
                                {result.type}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm">{result.subtitle}</p>
                            <p className="text-gray-500 text-xs mt-1">{result.meta}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-500 ml-2" />
                        </div>
                      ))}
                  </div>
                ) : (
                  // Command Mode
                  <div className="p-2">
                    {commandCategories.map((category: any) => (
                      <div key={category} className="mb-4">
                        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider px-3 py-2">
                          {category}
                        </h3>
                        {filteredCommands
                          .filter(cmd => cmd.category === category)
                          .map((command, index) => {
                            const globalIndex = filteredCommands.indexOf(command);
                            return (
                              <div
                                key={command.id}
                                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                  globalIndex === selectedCommand ? 'bg-gray-700' : 'hover:bg-gray-800'
                                }`}
                              >
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-700">
                                    <command.icon className="w-4 h-4 text-gray-300" />
                                  </div>
                                </div>
                                <div className="ml-3 flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-white font-medium">{command.title}</h4>
                                    {command.shortcut && (
                                      <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                                        {command.shortcut}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-gray-400 text-sm">{command.description}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-500 ml-2" />
                              </div>
                            );
                          })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs mr-1">↑↓</Badge>
                      Navigate
                    </span>
                    <span className="flex items-center">
                      <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs mr-1">↵</Badge>
                      Select
                    </span>
                    <span className="flex items-center">
                      <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs mr-1">ESC</Badge>
                      Close
                    </span>
                  </div>
                  <div className="text-gray-500">
                    {searchMode ? 'Search Mode' : 'Command Mode'} • {filteredCommands.length} results
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 space-y-6">

        {/* Navigation Patterns Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Command Shortcuts */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Command className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                Command Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCommands.filter(cmd => cmd.shortcut).slice(0, 8).map((command: any) => (
                <div key={command.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <command.icon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-300 text-sm">{command.title}</span>
                  </div>
                  <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                    {command.shortcut}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockCommands.filter(cmd => cmd.category === 'Actions').map((action: any) => (
                <Button
                  key={action.id}
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start border-gray-600 text-white hover:bg-gray-700"
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.title}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Campus Quick Access */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                Campus Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockCommands.filter(cmd => cmd.category === 'Campus').map((campus: any) => (
                <Button
                  key={campus.id}
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start border-gray-600 text-white hover:bg-gray-700"
                >
                  <campus.icon className="w-4 h-4 mr-2" />
                  {campus.title}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Search Intelligence */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
              Search Intelligence & Contextual Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Search Features */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Search Capabilities</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Semantic Search', description: 'Natural language queries across platform', icon: Brain },
                    { name: 'Cross-System Results', description: 'Unified results from all platform systems', icon: Network },
                    { name: 'Campus Integration', description: 'UB locations, events, and campus data', icon: MapPin },
                    { name: 'Real-time Indexing', description: 'Fresh results from live platform activity', icon: Refresh },
                    { name: 'Contextual Ranking', description: 'Results prioritized by user context', icon: Target },
                    { name: 'Smart Suggestions', description: 'AI-powered query completion', icon: Lightbulb }
                  ].map((feature: any) => (
                    <div key={feature.name} className="flex items-start">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gray-700">
                        <feature.icon className="w-4 h-4 text-gray-300" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-sm">{feature.name}</h5>
                        <p className="text-gray-400 text-xs">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result Types */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Search Result Types</h4>
                <div className="space-y-3">
                  {[
                    { type: 'Users', description: 'Students, builders, and community members', icon: User, count: '2.8k' },
                    { type: 'Spaces', description: 'Campus communities and study groups', icon: Users2, count: '156' },
                    { type: 'Tools', description: 'HiveLAB utilities and applications', icon: Wrench, count: '89' },
                    { type: 'Content', description: 'Posts, discussions, and shared resources', icon: MessageSquare, count: '1.2k' },
                    { type: 'Events', description: 'Campus events and coordination activities', icon: Calendar, count: '234' },
                    { type: 'Locations', description: 'UB buildings, rooms, and campus facilities', icon: MapPin, count: '67' }
                  ].map((resultType: any) => (
                    <div key={resultType.type} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                      <div className="flex items-center">
                        <resultType.icon className="w-4 h-4 mr-3 text-gray-400" />
                        <div>
                          <h5 className="text-white font-medium text-sm">{resultType.type}</h5>
                          <p className="text-gray-400 text-xs">{resultType.description}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                        {resultType.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Analytics */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
              Navigation Usage Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'var(--hive-brand-primary)' }}>847</div>
                <div className="text-gray-400 text-sm">Daily Command Uses</div>
                <div className="text-green-400 text-xs mt-1">+23% this week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">2.3s</div>
                <div className="text-gray-400 text-sm">Avg Search Time</div>
                <div className="text-green-400 text-xs mt-1">-0.5s improvement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">94%</div>
                <div className="text-gray-400 text-sm">Search Success Rate</div>
                <div className="text-green-400 text-xs mt-1">+3% this month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">67%</div>
                <div className="text-gray-400 text-sm">Keyboard Users</div>
                <div className="text-green-400 text-xs mt-1">Power user adoption</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const CommandInterface: Story = {
  render: () => <CommandInterfaceDemo />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const KeyboardShortcuts: Story = {
  render: () => {
    const shortcutCategories = {
      navigation: [
        { keys: '⌘ + K', action: 'Open Command Palette', description: 'Quick access to all platform functions' },
        { keys: '⌘ + /', action: 'Global Search', description: 'Search across entire platform' },
        { keys: '⌘ + 1', action: 'Go to Profile', description: 'Navigate to your profile dashboard' },
        { keys: '⌘ + 2', action: 'Browse Spaces', description: 'View campus communities' },
        { keys: '⌘ + 3', action: 'View Feed', description: 'See latest campus activity' },
        { keys: '⌘ + 4', action: 'Open HiveLAB', description: 'Access tool builder' },
        { keys: '⌘ + 5', action: 'View Calendar', description: 'Check your schedule' }
      ],
      actions: [
        { keys: '⌘ + N', action: 'Create New (Contextual)', description: 'Create content based on current page' },
        { keys: '⌘ + E', action: 'Edit (Contextual)', description: 'Edit current item or page' },
        { keys: '⌘ + S', action: 'Save', description: 'Save current changes' },
        { keys: '⌘ + ⇧ + S', action: 'Create Space', description: 'Start new campus community' },
        { keys: '⌘ + ⇧ + T', action: 'Build Tool', description: 'Create new HiveLAB tool' },
        { keys: '⌘ + ⇧ + P', action: 'Create Post', description: 'Share content with communities' }
      ],
      system: [
        { keys: '⌘ + ,', action: 'Open Settings', description: 'Access account preferences' },
        { keys: '⌘ + ⇧ + N', action: 'View Notifications', description: 'Check platform updates' },
        { keys: '⌘ + ?', action: 'Get Help', description: 'Open documentation' },
        { keys: 'Esc', action: 'Close/Cancel', description: 'Close modals and overlays' },
        { keys: '⌘ + R', action: 'Refresh', description: 'Reload current page content' }
      ]
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Keyboard Shortcuts</h1>
            <p className="text-gray-400">Master HIVE platform navigation with keyboard efficiency</p>
          </div>

          <div className="space-y-8">
            {Object.entries(shortcutCategories).map(([category, shortcuts]) => (
              <Card key={category} className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white capitalize flex items-center">
                    {category === 'navigation' && <Navigation className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />}
                    {category === 'actions' && <Zap className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />}
                    {category === 'system' && <Settings className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />}
                    {category} Shortcuts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {shortcuts.map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-white font-medium">{shortcut.action}</h4>
                            <div className="flex items-center space-x-1">
                              {shortcut.keys.split(' + ').map((key, keyIndex) => (
                                <Badge key={keyIndex} variant="secondary" className="border-gray-600 text-gray-300 text-xs">
                                  {key}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">{shortcut.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pro Tips */}
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-700 mt-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Crown className="w-5 h-5 mr-2 text-purple-400" />
                Power User Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <Lightbulb className="w-5 h-5 mr-3 text-yellow-400 mt-0.5" />
                <div>
                  <h5 className="text-white font-medium">Command Chaining</h5>
                  <p className="text-gray-300 text-sm">Use ⌘+K followed by typing to quickly chain commands without closing the palette</p>
                </div>
              </div>
              <div className="flex items-start">
                <Target className="w-5 h-5 mr-3 text-green-400 mt-0.5" />
                <div>
                  <h5 className="text-white font-medium">Context Awareness</h5>
                  <p className="text-gray-300 text-sm">Commands adapt based on your current page - ⌘+N creates different content types</p>
                </div>
              </div>
              <div className="flex items-start">
                <Search className="w-5 h-5 mr-3 text-blue-400 mt-0.5" />
                <div>
                  <h5 className="text-white font-medium">Smart Search</h5>
                  <p className="text-gray-300 text-sm">Search supports natural language - try "CS study groups this week" or "dining halls open now"</p>
                </div>
              </div>
            </CardContent>
          </Card>
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

export const MobileCommandExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <CommandInterfaceDemo />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};