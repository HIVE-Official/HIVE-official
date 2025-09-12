/**
 * HIVE Complete Spaces System: Enhanced Discovery & Browse
 * Comprehensive space discovery system with smart recommendations, advanced filtering, and category browsing
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../../../components/ui/avatar';
import { Input } from '../../../../components/ui/input';
import { Separator } from '../../../../components/ui/separator';
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
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Shield,
  Crown,
  Activity,
  Compass,
  Grid,
  List,
  ArrowUpDown,
  Eye,
  UserPlus,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import "../../../../hive-tokens.css";

const meta = {
  title: '06-Complete-Spaces-System/Enhanced Discovery',
  component: EnhancedSpaceDiscovery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Enhanced Space Discovery System

Complete space discovery system showcasing all discovery modes, smart recommendations, and advanced filtering capabilities as implemented in the production app.

## Key Features
- **Smart Discovery**: AI-powered space recommendations based on user profile
- **Advanced Filtering**: Category-based filtering with UB-specific space types
- **Social Proof**: Member counts, activity levels, and engagement metrics
- **Preview System**: Space preview cards with join/favorite actions
- **Trending Spaces**: Popular and trending space discovery
- **Category Organization**: Academic, Housing, Social, and Builder space categories
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Enhanced mock data with more variety and UB-specific content
const mockSpaces = [
  {
    id: 'cs220_algorithms',
    name: 'CS 220: Algorithms & Data Structures',
    description: 'Weekly study sessions, coding practice, and exam prep. Currently working through sorting algorithms and graph theory.',
    category: 'student_organizations',
    subcategory: 'Computer Science',
    memberCount: 47,
    isJoined: false,
    isPopular: true,
    isTrending: true,
    lastActivity: '15 minutes ago',
    activityLevel: 'very-high',
    privacy: 'public',
    status: 'activated',
    leader: {
      name: 'Prof. Sarah Kim',
      handle: '@profkim',
      avatar: 'SK',
      isVerified: true
    },
    stats: {
      postsThisWeek: 18,
      eventsThisMonth: 6,
      avgResponseTime: '12 mins',
      engagementRate: 94
    },
    tags: ['algorithms', 'data-structures', 'study-group', 'cse-building'],
    upcomingEvents: [
      {
        title: 'Midterm Review Session',
        date: '2024-11-16T18:00:00Z',
        location: 'Davis Hall 101'
      }
    ],
    preview: {
      recentPosts: 3,
      activeMembers: 12,
      weeklyActivity: 'High'
    }
  },
  {
    id: 'ellicott_complex',
    name: 'Ellicott Complex Community',
    description: 'Building community across all Ellicott halls. Coordinating events, study groups, and social activities.',
    category: 'campus_living',
    subcategory: 'Ellicott Complex',
    memberCount: 234,
    isJoined: true,
    isPopular: true,
    isTrending: false,
    lastActivity: '5 minutes ago',
    activityLevel: 'very-high',
    privacy: 'public',
    status: 'activated',
    leader: {
      name: 'Emily Rodriguez',
      handle: '@emily_r',
      avatar: 'ER',
      isVerified: false
    },
    stats: {
      postsThisWeek: 45,
      eventsThisMonth: 12,
      avgResponseTime: '8 mins',
      engagementRate: 87
    },
    tags: ['dorm-life', 'community', 'events', 'food-runs', 'study-spaces'],
    upcomingEvents: [
      {
        title: 'Fall Floor Mixer',
        date: '2024-11-17T20:00:00Z',
        location: 'Ellicott Complex Lounge'
      }
    ],
    preview: {
      recentPosts: 8,
      activeMembers: 28,
      weeklyActivity: 'Very High'
    }
  },
  {
    id: 'ub_pre_med',
    name: 'UB Pre-Med Society',
    description: 'Supporting pre-med students through MCAT prep, research opportunities, and med school applications.',
    category: 'student_organizations',
    subcategory: 'Pre-Professional',
    memberCount: 156,
    isJoined: false,
    isPopular: true,
    isTrending: true,
    lastActivity: '1 hour ago',
    activityLevel: 'high',
    privacy: 'public',
    status: 'activated',
    leader: {
      name: 'Dr. Michael Chen',
      handle: '@drchen',
      avatar: 'MC',
      isVerified: true
    },
    stats: {
      postsThisWeek: 12,
      eventsThisMonth: 8,
      avgResponseTime: '25 mins',
      engagementRate: 91
    },
    tags: ['pre-med', 'mcat', 'research', 'med-school', 'study-group'],
    upcomingEvents: [
      {
        title: 'MCAT Strategy Workshop',
        date: '2024-11-19T15:00:00Z',
        location: 'Cooke Hall 121'
      }
    ],
    preview: {
      recentPosts: 4,
      activeMembers: 23,
      weeklyActivity: 'High'
    }
  },
  {
    id: 'weekend_buffalo',
    name: 'Weekend Buffalo Adventures',
    description: 'Exploring Buffalo and surrounding areas. From Elmwood Village to Niagara Falls day trips.',
    category: 'hive_exclusive',
    subcategory: 'Local Exploration',
    memberCount: 89,
    isJoined: false,
    isPopular: false,
    isTrending: true,
    lastActivity: '3 hours ago',
    activityLevel: 'medium',
    privacy: 'public',
    status: 'activated',
    leader: {
      name: 'Alex Johnson',
      handle: '@buffalo_alex',
      avatar: 'AJ',
      isVerified: false
    },
    stats: {
      postsThisWeek: 6,
      eventsThisMonth: 4,
      avgResponseTime: '45 mins',
      engagementRate: 76
    },
    tags: ['buffalo', 'weekend', 'adventures', 'local', 'social'],
    upcomingEvents: [
      {
        title: 'Elmwood Art Walk',
        date: '2024-11-18T14:00:00Z',
        location: 'Elmwood Village'
      }
    ],
    preview: {
      recentPosts: 2,
      activeMembers: 8,
      weeklyActivity: 'Medium'
    }
  },
  {
    id: 'ub_builders_alpha',
    name: 'UB Builders Alpha',
    description: 'Early access to new HIVE tools and features. Help shape the future of campus collaboration.',
    category: 'hive_exclusive',
    subcategory: 'Builder Program',
    memberCount: 28,
    isJoined: true,
    isPopular: false,
    isTrending: false,
    lastActivity: '30 minutes ago',
    activityLevel: 'high',
    privacy: 'private',
    status: 'activated',
    leader: {
      name: 'HIVE Team',
      handle: '@hive_team',
      avatar: 'HT',
      isVerified: true
    },
    stats: {
      postsThisWeek: 8,
      eventsThisMonth: 3,
      avgResponseTime: '1 hour',
      engagementRate: 98
    },
    tags: ['builders', 'alpha', 'testing', 'feedback', 'exclusive'],
    upcomingEvents: [
      {
        title: 'Alpha Feature Demo',
        date: '2024-11-20T18:00:00Z',
        location: 'Virtual Meeting'
      }
    ],
    preview: {
      recentPosts: 3,
      activeMembers: 12,
      weeklyActivity: 'High'
    }
  },
  {
    id: 'greek_rush_fall24',
    name: 'Fall 2024 Greek Rush',
    description: 'Information and coordination for Fall 2024 Greek life recruitment across all organizations.',
    category: 'greek_life',
    subcategory: 'Recruitment',
    memberCount: 312,
    isJoined: false,
    isPopular: true,
    isTrending: false,
    lastActivity: '2 days ago',
    activityLevel: 'low',
    privacy: 'public',
    status: 'frozen',
    leader: {
      name: 'Greek Life Office',
      handle: '@ub_greek',
      avatar: 'GL',
      isVerified: true
    },
    stats: {
      postsThisWeek: 1,
      eventsThisMonth: 0,
      avgResponseTime: '2 hours',
      engagementRate: 45
    },
    tags: ['greek-life', 'rush', 'recruitment', 'social', 'archived'],
    upcomingEvents: [],
    preview: {
      recentPosts: 1,
      activeMembers: 2,
      weeklyActivity: 'Low'
    }
  }
];

// Space category filters with enhanced UB-specific data
const spaceTypeFilters = [
  { 
    id: "all", 
    label: "All Spaces", 
    color: "bg-gray-500", 
    emoji: "🌐", 
    subtitle: "Every community",
    count: 156,
    description: "Browse all available spaces on campus"
  },
  { 
    id: "student_organizations", 
    label: "Student Orgs", 
    color: "bg-blue-500", 
    emoji: "🎯", 
    subtitle: "Student-led communities",
    count: 67,
    description: "Academic clubs, professional societies, and special interest groups"
  },
  { 
    id: "university_organizations", 
    label: "University", 
    color: "bg-emerald-500", 
    emoji: "🎓", 
    subtitle: "Official programs",
    count: 23,
    description: "Official university departments and academic programs"
  },
  { 
    id: "greek_life", 
    label: "Greek Life", 
    color: "bg-[var(--hive-gold)]", 
    emoji: "🏛️", 
    subtitle: "Fraternities & sororities",
    count: 18,
    description: "Greek organizations and recruitment activities"
  },
  { 
    id: "campus_living", 
    label: "Campus Living", 
    color: "bg-[var(--hive-gold)]", 
    emoji: "🏠", 
    subtitle: "Residential communities",
    count: 31,
    description: "Dorm communities and residential life spaces"
  },
  { 
    id: "hive_exclusive", 
    label: "HIVE Exclusive", 
    color: "bg-indigo-500", 
    emoji: "💎", 
    subtitle: "Platform specials",
    count: 17,
    description: "Exclusive HIVE communities and builder programs"
  },
];

function EnhancedSpaceDiscovery() {
  const [activeView, setActiveView] = useState<'discover' | 'trending' | 'smart'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'trending' | 'recent' | 'alphabetical'>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredSpaces = mockSpaces.filter(space => {
    if (selectedCategory !== 'all' && space.category !== selectedCategory) return false;
    if (searchQuery && !space.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !space.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Filter by view type
    if (activeView === 'trending' && !space.isTrending) return false;
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.memberCount - a.memberCount;
      case 'trending':
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      case 'recent':
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const selectedFilter = spaceTypeFilters.find(f => f.id === selectedCategory) || spaceTypeFilters[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-[var(--hive-text-primary)]">
      
      {/* Enhanced Header */}
      <div className="border-b border-gray-800 bg-[var(--hive-black)]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-2">Campus Spaces</h1>
              <p className="text-gray-400">Discover and join your University at Buffalo communities</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Bell className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)]">
                <Settings className="w-4 h-4" />
              </Button>
              <Button className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                <Plus className="w-4 h-4 mr-2" />
                Create Space
              </Button>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-6">
            {[
              { id: 'discover', label: 'Discover', icon: Search, count: filteredSpaces.length },
              { id: 'trending', label: 'Trending', icon: TrendingUp, count: mockSpaces.filter(s => s.isTrending).length },
              { id: 'smart', label: 'Smart Discovery', icon: Sparkles, count: null },
            ].map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setActiveView(id as unknown)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeView === id
                    ? 'text-[var(--hive-black)] hive-interactive'
                    : 'text-gray-400 hover:text-[var(--hive-text-primary)]'
                }`}
                style={activeView === id ? {
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                } : {}}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
                {count !== null && (
                  <Badge className="ml-2 bg-gray-700 text-[var(--hive-text-primary)] text-xs">{count}</Badge>
                )}
              </button>
            ))}
          </div>

          {/* Enhanced Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search spaces by name, topic, or tags..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchQuery(e.target.value)}
                className="bg-gray-900 border-gray-700 text-[var(--hive-text-primary)] placeholder-gray-400 pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                size="icon" 
                variant="secondary" 
                className="border-gray-600 text-[var(--hive-text-primary)]"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
              </Button>
              
              <select 
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as string)}
                className="bg-gray-900 border border-gray-700 text-[var(--hive-text-primary)] rounded-md px-3 py-2 text-sm"
              >
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
                <option value="recent">Recently Active</option>
                <option value="alphabetical">A-Z</option>
              </select>
              
              <div className="flex border border-gray-700 rounded-md overflow-hidden">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  className={viewMode === 'grid' ? 'bg-gray-700' : 'text-gray-400'}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  className={viewMode === 'list' ? 'bg-gray-700' : 'text-gray-400'}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        
        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold" style={{ color: 'var(--hive-brand-primary)' }}>
                {spaceTypeFilters.reduce((sum, filter) => sum + (filter.id === 'all' ? 0 : filter.count), 0)}
              </div>
              <div className="text-sm text-gray-400">Total Active Spaces</div>
              <div className="text-xs text-green-400 mt-1">+12 this week</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-blue-400">
                {mockSpaces.filter(s => s.isJoined).length}
              </div>
              <div className="text-sm text-gray-400">Joined Spaces</div>
              <div className="text-xs text-blue-400 mt-1">Personal spaces</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-[var(--hive-gold)]">
                {mockSpaces.filter(s => s.isTrending).length}
              </div>
              <div className="text-sm text-gray-400">Trending Now</div>
              <div className="text-xs text-[var(--hive-gold)] mt-1">Hot topics</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700 text-center">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-[var(--hive-gold)]">
                {mockSpaces.reduce((sum, space) => sum + space.memberCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Members</div>
              <div className="text-xs text-[var(--hive-gold)] mt-1">Campus wide</div>
            </CardContent>
          </Card>
        </div>

        {/* Smart Discovery Mode */}
        {activeView === 'smart' && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-[var(--hive-gold)]/10 to-blue-500/10 border-[var(--hive-gold)]/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6" style={{ color: 'var(--hive-brand-primary)' }} />
                  <div>
                    <CardTitle className="text-[var(--hive-text-primary)]">Smart Discovery</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">
                      Personalized recommendations based on your major, interests, and campus activity
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[var(--hive-white)]/5 rounded-lg p-4">
                    <h4 className="text-[var(--hive-text-primary)] font-medium mb-2">📚 Based on Your Major</h4>
                    <p className="text-gray-400 text-sm mb-3">Computer Science student recommendations</p>
                    <div className="space-y-2">
                      <div className="text-sm text-blue-400">• CS 220: Algorithms & Data Structures</div>
                      <div className="text-sm text-blue-400">• UB Competitive Programming</div>
                      <div className="text-sm text-blue-400">• Software Engineering Club</div>
                    </div>
                  </div>
                  
                  <div className="bg-[var(--hive-white)]/5 rounded-lg p-4">
                    <h4 className="text-[var(--hive-text-primary)] font-medium mb-2">🎯 Interest Match</h4>
                    <p className="text-gray-400 text-sm mb-3">Based on your profile interests</p>
                    <div className="space-y-2">
                      <div className="text-sm text-green-400">• UB Hackathon Team</div>
                      <div className="text-sm text-green-400">• Tech Entrepreneurship</div>
                      <div className="text-sm text-green-400">• AI/ML Study Group</div>
                    </div>
                  </div>
                  
                  <div className="bg-[var(--hive-white)]/5 rounded-lg p-4">
                    <h4 className="text-[var(--hive-text-primary)] font-medium mb-2">🏠 Location Based</h4>
                    <p className="text-gray-400 text-sm mb-3">Your residence hall community</p>
                    <div className="space-y-2">
                      <div className="text-sm text-[var(--hive-gold)]">• Ellicott Complex Community</div>
                      <div className="text-sm text-[var(--hive-gold)]">• South Campus Activities</div>
                      <div className="text-sm text-[var(--hive-gold)]">• Hadley Village Events</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Category Filter Cards */}
        {activeView !== 'smart' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Browse by Category</h3>
              <div className="text-sm text-gray-400">
                {filteredSpaces.length} space{filteredSpaces.length !== 1 ? 's' : ''} 
                {selectedCategory !== 'all' && ` in ${selectedFilter.label}`}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {spaceTypeFilters.map((filterOption: any) => (
                <Button
                  key={filterOption.id}
                  variant="ghost"
                  onClick={() => setSelectedCategory(filterOption.id)}
                  className={`h-auto p-4 flex flex-col items-center text-center transition-all ${
                    selectedCategory === filterOption.id
                      ? 'border-hive-gold bg-hive-gold/10 text-hive-gold'
                      : 'border border-[var(--hive-white)]/10 text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/5'
                  }`}
                  style={selectedCategory === filterOption.id ? {
                    borderColor: 'var(--hive-border-gold)',
                    backgroundColor: 'var(--hive-overlay-gold-subtle)'
                  } : {}}
                >
                  <div className="text-2xl mb-2">{filterOption.emoji}</div>
                  <div className="font-medium text-sm">{filterOption.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{filterOption.count} spaces</div>
                  <div className="text-xs text-gray-500 mt-1 text-center line-clamp-2">
                    {filterOption.description}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Results Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-1">
              {activeView === 'trending' ? 'Trending Spaces' : 
               activeView === 'smart' ? 'Recommended for You' : 
               selectedCategory === 'all' ? 'All Spaces' : selectedFilter.label}
            </h3>
            <p className="text-gray-400 text-sm">
              {filteredSpaces.length} result{filteredSpaces.length !== 1 ? 's' : ''} • 
              Sorted by {sortBy === 'popular' ? 'popularity' : sortBy}
            </p>
          </div>
          
          {activeView === 'trending' && (
            <div className="flex items-center gap-2 text-[var(--hive-gold)]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Live trending data</span>
            </div>
          )}
        </div>

        {/* Enhanced Spaces Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSpaces.map((space: any) => (
              <SpacePreviewCard key={space.id} space={space} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSpaces.map((space: any) => (
              <SpaceListCard key={space.id} space={space} />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredSpaces.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800"
            >
              Load More Spaces
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredSpaces.length === 0 && (
          <div className="text-center py-12">
            <Compass className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">No spaces found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No spaces match "${searchQuery}". Try different keywords or browse all spaces.`
                : "No spaces available for this filter. Try selecting a different category."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => setSearchQuery("")}
                variant="secondary"
                className="border-[var(--hive-white)]/20 text-[var(--hive-text-primary)]"
              >
                Clear Search
              </Button>
              <Button 
                onClick={() => setSelectedCategory("all")}
                className="hive-interactive"
                style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
              >
                Browse All Spaces
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Space Preview Card Component
function SpacePreviewCard({ space }: { space: any }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer transition-all duration-200 group"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      style={isHovered ? {
        borderColor: 'var(--hive-border-gold)',
        boxShadow: 'var(--hive-shadow-gold-glow)'
      } : {}}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-3 ${
              space.category === 'student_organizations' ? 'bg-gradient-to-r from-blue-500 to-[var(--hive-gold)]' :
              space.category === 'campus_living' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
              space.category === 'greek_life' ? 'bg-gradient-to-r from-[var(--hive-gold)] to-pink-500' :
              space.category === 'university_organizations' ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
              'bg-gradient-to-r from-[var(--hive-gold)] to-[var(--hive-gold)]'
            }`}>
              {space.category === 'student_organizations' ? <BookOpen className="w-6 h-6 text-[var(--hive-text-primary)]" /> :
               space.category === 'campus_living' ? <Home className="w-6 h-6 text-[var(--hive-text-primary)]" /> :
               space.category === 'greek_life' ? <Users className="w-6 h-6 text-[var(--hive-text-primary)]" /> :
               space.category === 'university_organizations' ? <Award className="w-6 h-6 text-[var(--hive-text-primary)]" /> :
               <Lightbulb className="w-6 h-6 text-[var(--hive-black)]" />}
            </div>
            <div className="min-w-0">
              <CardTitle className="text-[var(--hive-text-primary)] text-base truncate">{space.name}</CardTitle>
              <p className="text-gray-400 text-sm truncate">{space.subcategory}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            {space.isPopular && (
              <Badge className="text-xs" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                Hot
              </Badge>
            )}
            {space.isTrending && (
              <Badge className="text-xs bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border-[var(--hive-gold)]/30">
                Trending
              </Badge>
            )}
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">{space.description}</p>

        {/* Enhanced Space Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {space.memberCount.toLocaleString()}
            </span>
            <span className="flex items-center">
              <Activity className={`w-4 h-4 mr-1 ${
                space.activityLevel === 'very-high' ? 'text-green-400' :
                space.activityLevel === 'high' ? 'text-[var(--hive-gold)]' :
                space.activityLevel === 'medium' ? 'text-blue-400' : 'text-gray-400'
              }`} />
              {space.lastActivity}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={space.privacy === 'private' ? 'secondary' : 'outline'} 
              className="text-xs"
            >
              {space.privacy === 'private' ? <Shield className="w-3 h-3 mr-1" /> : null}
              {space.privacy}
            </Badge>
            
            {space.status !== 'activated' && (
              <Badge variant="secondary" className="text-xs text-blue-400 border-blue-400/30">
                {space.status === 'dormant' ? 'Preview' : 'View Only'}
              </Badge>
            )}
          </div>
        </div>

        {/* Leader Info */}
        <div className="flex items-center">
          <Avatar className="w-6 h-6 mr-2">
            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-[var(--hive-gold)] text-[var(--hive-text-primary)] text-xs">
              {space.leader.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-gray-400 text-sm">
            Led by {space.leader.name}
            {space.leader.isVerified && (
              <Award className="w-3 h-3 ml-1 inline" style={{ color: 'var(--hive-brand-primary)' }} />
            )}
          </span>
        </div>

        {/* Preview Stats */}
        <div className="bg-gray-900/50 rounded-lg p-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-[var(--hive-text-primary)]">{space.preview.recentPosts}</div>
              <div className="text-xs text-gray-400">Recent Posts</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">{space.preview.activeMembers}</div>
              <div className="text-xs text-gray-400">Active Now</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">{space.stats.engagementRate}%</div>
              <div className="text-xs text-gray-400">Engagement</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {space.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="border-gray-600 text-gray-400 text-xs">
              {tag}
            </Badge>
          ))}
          {space.tags.length > 3 && (
            <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
              +{space.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Upcoming Events */}
        {space.upcomingEvents.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
              <span className="text-[var(--hive-text-primary)] text-sm font-medium">Next Event</span>
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
              <Button size="sm" className="flex-1 bg-green-600 text-[var(--hive-text-primary)] hover:bg-green-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Open Space
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
                <Settings className="w-4 h-4" />
              </Button>
            </>
          ) : space.status === 'dormant' ? (
            <>
              <Button size="sm" className="flex-1 bg-blue-600 text-[var(--hive-text-primary)] hover:bg-blue-700">
                <Eye className="w-4 h-4 mr-2" />
                Preview Space
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
                <Heart className="w-4 h-4" />
              </Button>
            </>
          ) : space.status === 'frozen' ? (
            <>
              <Button size="sm" className="flex-1 bg-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-700" disabled>
                <Eye className="w-4 h-4 mr-2" />
                View Only
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
                <Heart className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" className="flex-1 hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                <UserPlus className="w-4 h-4 mr-2" />
                Join Space
              </Button>
              <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
                <Heart className="w-4 h-4" />
              </Button>
            </>
          )}
          <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
            <Share className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Space List Card Component
function SpaceListCard({ space }: { space: any }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hive-interactive cursor-pointer transition-all duration-200"
          onMouseEnter={(e: any) => {
            e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
            e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
          }}
          onMouseLeave={(e: any) => {
            e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              space.category === 'student_organizations' ? 'bg-gradient-to-r from-blue-500 to-[var(--hive-gold)]' :
              space.category === 'campus_living' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
              space.category === 'greek_life' ? 'bg-gradient-to-r from-[var(--hive-gold)] to-pink-500' :
              space.category === 'university_organizations' ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
              'bg-gradient-to-r from-[var(--hive-gold)] to-[var(--hive-gold)]'
            }`}>
              {space.category === 'student_organizations' ? <BookOpen className="w-6 h-6 text-[var(--hive-text-primary)]" /> :
               space.category === 'campus_living' ? <Home className="w-6 h-6 text-[var(--hive-text-primary)]" /> :
               space.category === 'greek_life' ? <Users className="w-6 h-6 text-[var(--hive-text-primary)]" /> :
               space.category === 'university_organizations' ? <Award className="w-6 h-6 text-[var(--hive-text-primary)]" /> :
               <Lightbulb className="w-6 h-6 text-[var(--hive-black)]" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[var(--hive-text-primary)] font-semibold truncate">{space.name}</h3>
                {space.isPopular && (
                  <Badge className="text-xs" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                    Hot
                  </Badge>
                )}
                {space.isTrending && (
                  <Badge className="text-xs bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border-[var(--hive-gold)]/30">
                    Trending
                  </Badge>
                )}
              </div>
              <p className="text-gray-300 text-sm line-clamp-1 mb-2">{space.description}</p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {space.memberCount.toLocaleString()} members
                </span>
                <span className="flex items-center">
                  <Activity className={`w-3 h-3 mr-1 ${
                    space.activityLevel === 'very-high' ? 'text-green-400' :
                    space.activityLevel === 'high' ? 'text-[var(--hive-gold)]' :
                    space.activityLevel === 'medium' ? 'text-blue-400' : 'text-gray-400'
                  }`} />
                  {space.lastActivity}
                </span>
                <span className="text-green-400">{space.stats.engagementRate}% engagement</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {space.isJoined ? (
              <Button size="sm" className="bg-green-600 text-[var(--hive-text-primary)] hover:bg-green-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Open
              </Button>
            ) : space.status === 'dormant' ? (
              <Button size="sm" className="bg-blue-600 text-[var(--hive-text-primary)] hover:bg-blue-700">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            ) : space.status === 'frozen' ? (
              <Button size="sm" className="bg-gray-600 text-[var(--hive-text-primary)]" disabled>
                <Eye className="w-4 h-4 mr-2" />
                View Only
              </Button>
            ) : (
              <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                <UserPlus className="w-4 h-4 mr-2" />
                Join
              </Button>
            )}
            
            <Button size="icon" variant="secondary" className="border-gray-600 text-[var(--hive-text-primary)] hover:bg-gray-800">
              <Heart className="w-4 h-4" />
            </Button>
            
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const EnhancedDiscoverySystem: Story = {
  render: () => <EnhancedSpaceDiscovery />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
};

export const SmartDiscoveryMode: Story = {
  render: () => {
    const Component = () => {
      const [activeView] = useState('smart');
      return <EnhancedSpaceDiscovery />;
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

export const TrendingSpacesView: Story = {
  render: () => {
    const Component = () => {
      const [activeView] = useState('trending');
      return <EnhancedSpaceDiscovery />;
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

export const MobileDiscoveryExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <EnhancedSpaceDiscovery />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};