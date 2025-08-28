/**
 * HIVE Live Frontend: Tools Creation System
 * Complete tool building, marketplace, and deployment system as it appears in production
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
  Zap,
  Search, 
  Filter, 
  Plus,
  Code,
  Wrench,
  Settings,
  Star,
  Heart,
  MessageSquare,
  Share,
  MoreVertical,
  Bell,
  Users,
  TrendingUp,
  Award,
  Play,
  Download,
  Eye,
  Copy,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  Smartphone,
  Globe,
  Database,
  Palette,
  BarChart3,
  Calendar,
  MapPin,
  Clock,
  Activity,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Crown,
  Target,
  Layers,
  BookOpen,
  Coffee
} from 'lucide-react';
import { useState } from 'react';
import '../../../hive-tokens.css';

const meta = {
  title: '08-Live-Frontend/Tools System',
  component: ToolsCreationSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Live Tools System

The complete tool creation, marketplace, and deployment system as experienced by UB students in production. This showcases the full builder ecosystem for campus utilities.

## Key Features
- **Tool Builder**: Visual drag-and-drop tool creation interface
- **Marketplace**: Discover and install campus tools
- **Analytics**: Usage tracking and performance metrics
- **Deployment**: One-click publishing and sharing
- **Version Control**: Tool versioning and collaboration
- **Campus Integration**: UB-specific tool categories and data
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for tools system
const mockTools = [
  {
    id: 'study_room_finder',
    name: 'Study Room Finder',
    description: 'Find available study rooms across campus in real-time',
    category: 'Productivity',
    subcategory: 'Campus Navigation',
    author: {
      name: 'Sarah Chen',
      handle: '@sarahc',
      avatar: 'SC',
      isVerified: true,
      builderLevel: 'Expert'
    },
    stats: {
      usageCount: 2847,
      rating: 4.8,
      reviewCount: 156,
      installs: 1234,
      saves: 89
    },
    status: 'published',
    version: '2.1.0',
    lastUpdated: '2024-11-10T15:30:00Z',
    tags: ['study-rooms', 'campus-map', 'real-time', 'productivity'],
    features: ['Real-time availability', 'Booking system', 'Location mapping', 'Notifications'],
    pricing: 'free',
    permissions: ['location', 'calendar'],
    screenshots: ['screenshot1.png', 'screenshot2.png'],
    isInstalled: true,
    isFavorite: false,
    deploymentUrl: 'https://tools.hive.college/study-rooms',
    sourceVisible: true,
    collaborators: []
  },
  {
    id: 'laundry_tracker',
    name: 'Dorm Laundry Tracker',
    description: 'Check laundry machine availability and get notifications when cycles complete',
    category: 'Utility',
    subcategory: 'Dorm Life',
    author: {
      name: 'Marcus Johnson',
      handle: '@mjohnson',
      avatar: 'MJ',
      isVerified: false,
      builderLevel: 'Intermediate'
    },
    stats: {
      usageCount: 1432,
      rating: 4.6,
      reviewCount: 87,
      installs: 567,
      saves: 45
    },
    status: 'published',
    version: '1.3.2',
    lastUpdated: '2024-11-08T09:15:00Z',
    tags: ['laundry', 'dorm', 'notifications', 'utility'],
    features: ['Machine status', 'Timer notifications', 'Queue system', 'Usage stats'],
    pricing: 'free',
    permissions: ['notifications'],
    screenshots: ['laundry1.png', 'laundry2.png'],
    isInstalled: false,
    isFavorite: true,
    deploymentUrl: 'https://tools.hive.college/laundry',
    sourceVisible: false,
    collaborators: ['@alexl']
  }
];

const ToolsCreationSystem = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', label: 'All Tools', count: 156 },
    { id: 'productivity', label: 'Productivity', count: 45 },
    { id: 'social', label: 'Social', count: 32 },
    { id: 'utility', label: 'Utility', count: 28 },
    { id: 'academic', label: 'Academic', count: 51 }
  ];

  const filteredTools = mockTools.filter(tool => {
    if (selectedCategory !== 'all' && tool.category.toLowerCase() !== selectedCategory) return false;
    if (searchQuery && !tool.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Campus Tools</h1>
              <p className="text-gray-400">Build, discover, and share campus utilities</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button size="icon" variant="secondary" className="border-gray-600 text-white">
                <Bell className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-white">
                <Settings className="w-4 h-4" />
              </Button>
              <Button className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                <Plus className="w-4 h-4 mr-2" />
                Create Tool
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-4">
            {[
              { id: 'discover', label: 'Discover', icon: Search },
              { id: 'my-tools', label: 'My Tools', icon: Wrench },
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
                placeholder="Search tools by name, category, or functionality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="secondary" className="border-gray-600 text-white">
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
              <div className="text-sm text-gray-400">Available Tools</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-blue-400">12</div>
              <div className="text-sm text-gray-400">My Tools</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-green-400">8.4k</div>
              <div className="text-sm text-gray-400">Total Installs</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-purple-400">23</div>
              <div className="text-sm text-gray-400">New This Week</div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer transition-all duration-200"
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
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)' }}>
                      <Zap className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-base">{tool.name}</CardTitle>
                      <p className="text-gray-400 text-sm">{tool.subcategory}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" style={{ color: 'var(--hive-brand-primary)' }} />
                      <span className="text-white text-sm">{tool.stats.rating}</span>
                    </div>
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{tool.description}</p>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                        {tool.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-gray-400 text-sm">
                        By {tool.author.name}
                        {tool.author.isVerified && <Award className="w-3 h-3 ml-1 inline" style={{ color: 'var(--hive-brand-primary)' }} />}
                      </span>
                      <div className="flex items-center">
                        <Badge 
                          className={`text-xs mr-1 ${
                            tool.author.builderLevel === 'Expert' ? '' :
                            tool.author.builderLevel === 'Intermediate' ? 'bg-blue-500 text-white' :
                            'bg-green-500 text-white'
                          }`}
                          style={tool.author.builderLevel === 'Expert' ? {
                            backgroundColor: 'var(--hive-brand-primary)',
                            color: 'var(--hive-text-inverse)'
                          } : {}}
                        >
                          {tool.author.builderLevel}
                        </Badge>
                        <span className="text-gray-500 text-xs">
                          v{tool.version}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {tool.stats.installs}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tool.stats.usageCount}
                    </span>
                  </div>
                  <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                    {tool.status}
                  </Badge>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tool.tags.length > 3 && (
                    <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                      +{tool.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {tool.isInstalled ? (
                    <>
                      <Button size="sm" className="flex-1 bg-green-600 text-white hover:bg-green-700">
                        <Play className="w-4 h-4 mr-2" />
                        Launch Tool
                      </Button>
                      <Button size="icon" variant="secondary" className="border-gray-600 text-white hover:bg-gray-800">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" className="flex-1 hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                        <Download className="w-4 h-4 mr-2" />
                        Install
                      </Button>
                      <Button size="icon" variant="secondary" className="border-gray-600 text-white hover:bg-gray-800">
                        <Heart className={tool.isFavorite ? "w-4 h-4 fill-current text-red-400" : "w-4 h-4"} />
                      </Button>
                    </>
                  )}
                  <Button size="icon" variant="secondary" className="border-gray-600 text-white hover:bg-gray-800">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="secondary" className="border-gray-600 text-white hover:bg-gray-800">
            Load More Tools
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ToolsMarketplace: Story = {
  render: () => <ToolsCreationSystem />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const MobileToolsExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <ToolsCreationSystem />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};