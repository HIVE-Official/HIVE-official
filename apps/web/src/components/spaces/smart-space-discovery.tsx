"use client";

import { useState, useEffect } from "react";
import { Button, Card, Badge, HiveModal, HiveInput } from "@hive/ui";
import { 
  Search, 
  Filter, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Star, 
  MapPin, 
  Calendar, 
  Zap,
  Plus,
  Eye,
  Heart,
  MessageSquare,
  ArrowRight,
  Shuffle,
  Target,
  Brain,
  Compass,
  Activity,
  Clock,
  BookOpen,
  Coffee,
  Gamepad2,
  Briefcase,
  Music,
  Palette,
  Code,
  FlaskConical,
  X,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  List
} from "lucide-react";

interface DiscoverableSpace {
  id: string;
  name: string;
  description: string;
  type: 'university' | 'residential' | 'greek' | 'student';
  category: string;
  memberCount: number;
  avatar?: string;
  coverImage?: string;
  privacy: 'public' | 'private' | 'invite_only';
  tags: Array<{
    id: string;
    name: string;
    category: string;
  }>;
  stats: {
    weeklyActivity: number;
    activeTools: number;
    upcomingEvents: number;
    recentPosts: number;
    engagementScore: number;
  };
  leadership: Array<{
    id: string;
    name: string;
    handle: string;
    role: string;
    verified?: boolean;
  }>;
  joinRequirements?: string[];
  isJoined: boolean;
  isPending: boolean;
  matchScore?: number;
  recommendationReason?: string;
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: string;
  }>;
  established: string;
}

interface SmartSpaceDiscoveryProps {
  currentUserId: string;
  userInterests: string[];
  userMajor?: string;
  userYear?: string;
  onJoinSpace?: (spaceId: string) => void;
  onViewSpace?: (spaceId: string) => void;
}

type DiscoveryMode = 'ai-recommended' | 'trending' | 'for-you' | 'similar' | 'new' | 'all';
type FilterCategory = 'all' | 'academic' | 'social' | 'professional' | 'recreational';

export function SmartSpaceDiscovery({ 
  currentUserId, 
  userInterests, 
  userMajor, 
  userYear,
  onJoinSpace,
  onViewSpace
}: SmartSpaceDiscoveryProps) {
  const [discoveryMode, setDiscoveryMode] = useState<DiscoveryMode>('ai-recommended');
  const [spaces, setSpaces] = useState<DiscoverableSpace[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<DiscoverableSpace[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<DiscoverableSpace | null>(null);
  const [showSpacePreview, setShowSpacePreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchDiscoverableSpaces = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockSpaces: DiscoverableSpace[] = [
        {
          id: 'space-ai-1',
          name: 'AI & Machine Learning Hub',
          description: 'Explore the frontiers of artificial intelligence with hands-on projects, research discussions, and industry connections.',
          type: 'student',
          category: 'Academic',
          memberCount: 234,
          privacy: 'public',
          tags: [
            { id: '1', name: 'artificial-intelligence', category: 'technology' },
            { id: '2', name: 'machine-learning', category: 'technology' },
            { id: '3', name: 'deep-learning', category: 'technology' },
            { id: '4', name: 'research', category: 'academic' }
          ],
          stats: {
            weeklyActivity: 92,
            activeTools: 8,
            upcomingEvents: 4,
            recentPosts: 15,
            engagementScore: 88
          },
          leadership: [
            { id: '1', name: 'Dr. Sarah Kim', handle: 'sarahkim', role: 'Faculty Advisor', verified: true },
            { id: '2', name: 'Alex Chen', handle: 'alexc', role: 'President' }
          ],
          isJoined: false,
          isPending: false,
          matchScore: 94,
          recommendationReason: 'Based on your interest in computer science and AI-related activities',
          recentActivity: [
            { type: 'event', description: 'Neural Networks Workshop scheduled', timestamp: '2024-02-01T10:00:00Z' },
            { type: 'project', description: 'New research project on NLP started', timestamp: '2024-01-31T15:30:00Z' }
          ],
          established: '2023-09-15T10:00:00Z'
        },
        {
          id: 'space-data-2',
          name: 'Data Science Collective',
          description: 'Transform data into insights through collaborative projects, competitions, and real-world applications.',
          type: 'student',
          category: 'Academic',
          memberCount: 189,
          privacy: 'public',
          tags: [
            { id: '5', name: 'data-science', category: 'technology' },
            { id: '6', name: 'analytics', category: 'technology' },
            { id: '7', name: 'visualization', category: 'skill' },
            { id: '8', name: 'statistics', category: 'academic' }
          ],
          stats: {
            weeklyActivity: 85,
            activeTools: 6,
            upcomingEvents: 2,
            recentPosts: 12,
            engagementScore: 82
          },
          leadership: [
            { id: '3', name: 'Maria Rodriguez', handle: 'mariar', role: 'Co-President' },
            { id: '4', name: 'James Liu', handle: 'jamesliu', role: 'Co-President' }
          ],
          isJoined: false,
          isPending: false,
          matchScore: 89,
          recommendationReason: 'Popular among CS students and matches your analytical interests',
          recentActivity: [
            { type: 'competition', description: 'Kaggle competition team formed', timestamp: '2024-02-01T14:20:00Z' },
            { type: 'workshop', description: 'Python for Data Analysis workshop', timestamp: '2024-01-30T16:45:00Z' }
          ],
          established: '2023-08-20T10:00:00Z'
        },
        {
          id: 'space-web-3',
          name: 'Full Stack Developers United',
          description: 'Building the web of tomorrow through collaborative projects, hackathons, and skill sharing.',
          type: 'student',
          category: 'Technical',
          memberCount: 167,
          privacy: 'public',
          tags: [
            { id: '9', name: 'web-development', category: 'technology' },
            { id: '10', name: 'javascript', category: 'programming' },
            { id: '11', name: 'react', category: 'framework' },
            { id: '12', name: 'nodejs', category: 'backend' }
          ],
          stats: {
            weeklyActivity: 78,
            activeTools: 5,
            upcomingEvents: 3,
            recentPosts: 18,
            engagementScore: 79
          },
          leadership: [
            { id: '5', name: 'Emma Johnson', handle: 'emmaj', role: 'Lead Developer' },
            { id: '6', name: 'Ryan Park', handle: 'ryanp', role: 'Project Manager' }
          ],
          isJoined: false,
          isPending: false,
          matchScore: 76,
          recommendationReason: 'Strong community for building practical development skills',
          recentActivity: [
            { type: 'project', description: 'New e-commerce project launched', timestamp: '2024-02-01T09:15:00Z' },
            { type: 'event', description: 'React 18 features workshop', timestamp: '2024-01-29T19:30:00Z' }
          ],
          established: '2023-10-05T10:00:00Z'
        },
        {
          id: 'space-startup-4',
          name: 'Campus Entrepreneurs',
          description: 'Where innovative ideas meet execution. Build your startup with fellow student entrepreneurs.',
          type: 'student',
          category: 'Professional',
          memberCount: 143,
          privacy: 'public',
          tags: [
            { id: '13', name: 'entrepreneurship', category: 'business' },
            { id: '14', name: 'startups', category: 'business' },
            { id: '15', name: 'innovation', category: 'mindset' },
            { id: '16', name: 'networking', category: 'professional' }
          ],
          stats: {
            weeklyActivity: 71,
            activeTools: 4,
            upcomingEvents: 2,
            recentPosts: 9,
            engagementScore: 74
          },
          leadership: [
            { id: '7', name: 'Sofia Martinez', handle: 'sofiam', role: 'Founder', verified: true },
            { id: '8', name: 'David Wong', handle: 'davidw', role: 'VP Operations' }
          ],
          isJoined: false,
          isPending: false,
          matchScore: 68,
          recommendationReason: 'Great for developing business and leadership skills',
          recentActivity: [
            { type: 'pitch', description: 'Monthly pitch competition announced', timestamp: '2024-01-31T12:00:00Z' },
            { type: 'mentorship', description: 'Industry mentor session scheduled', timestamp: '2024-01-30T10:30:00Z' }
          ],
          established: '2023-09-01T10:00:00Z'
        },
        {
          id: 'space-gaming-5',
          name: 'Campus Gaming Collective',
          description: 'Unite through gaming! Esports tournaments, game development, and community events.',
          type: 'student',
          category: 'Social',
          memberCount: 298,
          privacy: 'public',
          tags: [
            { id: '17', name: 'gaming', category: 'entertainment' },
            { id: '18', name: 'esports', category: 'competition' },
            { id: '19', name: 'game-development', category: 'technology' },
            { id: '20', name: 'community', category: 'social' }
          ],
          stats: {
            weeklyActivity: 95,
            activeTools: 7,
            upcomingEvents: 5,
            recentPosts: 23,
            engagementScore: 91
          },
          leadership: [
            { id: '9', name: 'Tyler Brooks', handle: 'tylerb', role: 'Guild Master' },
            { id: '10', name: 'Luna Chang', handle: 'lunac', role: 'Event Coordinator' }
          ],
          isJoined: false,
          isPending: false,
          matchScore: 45,
          recommendationReason: 'High engagement and active community',
          recentActivity: [
            { type: 'tournament', description: 'Fall semester championship starting', timestamp: '2024-02-01T18:00:00Z' },
            { type: 'workshop', description: 'Unity game dev workshop', timestamp: '2024-01-31T20:15:00Z' }
          ],
          established: '2023-08-15T10:00:00Z'
        }
      ];
      
      setSpaces(mockSpaces);
      setFilteredSpaces(mockSpaces);
      setIsLoading(false);
    };

    fetchDiscoverableSpaces();
  }, []);

  useEffect(() => {
    let filtered = spaces.filter(space => {
      const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           space.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || 
                              space.category.toLowerCase() === categoryFilter ||
                              space.tags.some(tag => tag.category === categoryFilter);
      
      return matchesSearch && matchesCategory;
    });
    
    // Apply discovery mode sorting
    switch (discoveryMode) {
      case 'ai-recommended':
        filtered = filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        break;
      case 'trending':
        filtered = filtered.sort((a, b) => b.stats.weeklyActivity - a.stats.weeklyActivity);
        break;
      case 'for-you':
        filtered = filtered.sort((a, b) => b.stats.engagementScore - a.stats.engagementScore);
        break;
      case 'new':
        filtered = filtered.sort((a, b) => new Date(b.established).getTime() - new Date(a.established).getTime());
        break;
      default:
        break;
    }
    
    setFilteredSpaces(filtered);
  }, [spaces, searchQuery, categoryFilter, discoveryMode]);

  const getDiscoveryModeIcon = (mode: DiscoveryMode) => {
    switch (mode) {
      case 'ai-recommended': return Sparkles;
      case 'trending': return TrendingUp;
      case 'for-you': return Target;
      case 'similar': return Compass;
      case 'new': return Clock;
      default: return Search;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'academic': return BookOpen;
      case 'social': return Coffee;
      case 'professional': return Briefcase;
      case 'recreational': return Gamepad2;
      case 'technical': return Code;
      case 'creative': return Palette;
      case 'research': return FlaskConical;
      default: return Users;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleJoinSpace = async (spaceId: string) => {
    // Update local state optimistically
    setSpaces(prev => prev.map(space => 
      space.id === spaceId 
        ? { ...space, isJoined: true, memberCount: space.memberCount + 1 }
        : space
    ));
    
    if (onJoinSpace) {
      onJoinSpace(spaceId);
    }
  };

  const handleViewSpace = (space: DiscoverableSpace) => {
    setSelectedSpace(space);
    setShowSpacePreview(true);
    
    if (onViewSpace) {
      onViewSpace(space.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-white">Discovering spaces for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
            <Brain className="h-8 w-8 text-hive-gold mr-3" />
            Smart Space Discovery
          </h2>
          <p className="text-zinc-400">AI-powered recommendations based on your interests and activity</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Discovery Mode Tabs */}
      <div className="flex items-center space-x-1 bg-zinc-800/50 rounded-lg p-1 overflow-x-auto">
        {[
          { id: 'ai-recommended', label: 'AI Recommended', description: 'Personalized for you' },
          { id: 'trending', label: 'Trending', description: 'Most active spaces' },
          { id: 'for-you', label: 'For You', description: 'High engagement' },
          { id: 'similar', label: 'Similar', description: 'Like your spaces' },
          { id: 'new', label: 'New', description: 'Recently created' },
          { id: 'all', label: 'All', description: 'Browse everything' }
        ].map((mode) => {
          const Icon = getDiscoveryModeIcon(mode.id as DiscoveryMode);
          return (
            <button
              key={mode.id}
              onClick={() => setDiscoveryMode(mode.id as DiscoveryMode)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                discoveryMode === mode.id
                  ? 'bg-hive-gold text-hive-obsidian font-medium'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">{mode.label}</div>
                {discoveryMode === mode.id && (
                  <div className="text-xs opacity-75">{mode.description}</div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spaces by name, description, or tags..."
              className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-hive-gold focus:outline-none w-full"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Randomize the order for discovery
              setFilteredSpaces(prev => [...prev].sort(() => Math.random() - 0.5));
            }}
            className="text-zinc-400 hover:text-white"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
        </div>
        
        {showFilters && (
          <Card className="p-4 bg-zinc-800/30 border-zinc-700">
            <div className="flex items-center space-x-4">
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as FilterCategory)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:border-hive-gold focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="academic">Academic</option>
                  <option value="social">Social</option>
                  <option value="professional">Professional</option>
                  <option value="recreational">Recreational</option>
                </select>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* AI Insights Banner */}
      {discoveryMode === 'ai-recommended' && filteredSpaces.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-hive-gold/10 to-purple-500/10 border-hive-gold/30">
          <div className="flex items-center space-x-3">
            <Lightbulb className="h-8 w-8 text-hive-gold" />
            <div>
              <h3 className="font-semibold text-white">AI Recommendations</h3>
              <p className="text-sm text-zinc-300">
                Based on your {userMajor} major{userInterests.length > 0 && `, interests: ${userInterests.slice(0, 3).join(', ')}`}, 
                and activity patterns, we found {filteredSpaces.length} spaces that match your profile.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Spaces Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {filteredSpaces.map((space) => {
          const CategoryIcon = getCategoryIcon(space.category);
          
          return viewMode === 'grid' ? (
            <Card 
              key={space.id} 
              className="p-6 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-all cursor-pointer group"
              onClick={() => handleViewSpace(space)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-12 h-12 bg-zinc-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CategoryIcon className="h-6 w-6 text-hive-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1 line-clamp-1">{space.name}</h3>
                    <p className="text-sm text-zinc-400 line-clamp-2 mb-2">{space.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="skill-tag" className="text-xs capitalize">
                        {space.category}
                      </Badge>
                      {space.privacy === 'private' && (
                        <Badge variant="destructive" className="text-xs">Private</Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {discoveryMode === 'ai-recommended' && space.matchScore && (
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-hive-gold" />
                    <span className="text-sm font-medium text-hive-gold">{space.matchScore}%</span>
                  </div>
                )}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-zinc-400" />
                  <span className="text-white">{space.memberCount}</span>
                  <span className="text-zinc-400">members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-zinc-400" />
                  <span className="text-white">{space.stats.weeklyActivity}%</span>
                  <span className="text-zinc-400">active</span>
                </div>
              </div>
              
              {/* AI Recommendation Reason */}
              {space.recommendationReason && discoveryMode === 'ai-recommended' && (
                <div className="bg-zinc-800/50 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <Brain className="h-4 w-4 text-hive-gold mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-zinc-300">{space.recommendationReason}</p>
                  </div>
                </div>
              )}
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {space.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag.id} variant="skill-tag" className="text-xs">
                    #{tag.name}
                  </Badge>
                ))}
                {space.tags.length > 3 && (
                  <span className="text-xs text-zinc-500">+{space.tags.length - 3} more</span>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-700">
                <div className="flex items-center space-x-4 text-xs text-zinc-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{space.stats.upcomingEvents} events</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>{space.stats.activeTools} tools</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {space.isJoined ? (
                    <Badge variant="building-tools" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Joined
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinSpace(space.id);
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Join
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            // List View
            <Card 
              key={space.id} 
              className="p-6 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-all cursor-pointer"
              onClick={() => handleViewSpace(space)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 bg-zinc-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CategoryIcon className="h-8 w-8 text-hive-gold" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{space.name}</h3>
                      {discoveryMode === 'ai-recommended' && space.matchScore && (
                        <div className="flex items-center space-x-1">
                          <Sparkles className="h-4 w-4 text-hive-gold" />
                          <span className="text-sm font-medium text-hive-gold">{space.matchScore}% match</span>
                        </div>
                      )}
                      <Badge variant="skill-tag" className="text-xs capitalize">
                        {space.category}
                      </Badge>
                    </div>
                    
                    <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{space.description}</p>
                    
                    {space.recommendationReason && discoveryMode === 'ai-recommended' && (
                      <div className="bg-zinc-800/50 rounded-lg p-3 mb-3">
                        <div className="flex items-start space-x-2">
                          <Brain className="h-4 w-4 text-hive-gold mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-zinc-300">{space.recommendationReason}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-6 text-sm text-zinc-400">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{space.memberCount} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="h-4 w-4" />
                        <span>{space.stats.weeklyActivity}% active</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{space.stats.upcomingEvents} events</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4" />
                        <span>{space.stats.activeTools} tools</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  {space.isJoined ? (
                    <Badge variant="building-tools" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Joined
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinSpace(space.id);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Join Space
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredSpaces.length === 0 && (
        <Card className="p-12 bg-zinc-800/50 border-zinc-700 text-center">
          <Search className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No spaces found</h3>
          <p className="text-zinc-400 mb-6">
            Try adjusting your search terms or filters to discover more spaces.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setDiscoveryMode('all');
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}

      {/* Space Preview Modal */}
      <HiveModal
        isOpen={showSpacePreview}
        onClose={() => setShowSpacePreview(false)}
        title={selectedSpace?.name || ''}
        size="xl"
      >
        {selectedSpace && (
          <div className="space-y-6">
            {/* Space Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-16 h-16 bg-zinc-600 rounded-xl flex items-center justify-center">
                  {(() => {
                    const Icon = getCategoryIcon(selectedSpace.category);
                    return <Icon className="h-8 w-8 text-hive-gold" />;
                  })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-xl font-bold text-white">{selectedSpace.name}</h2>
                    {selectedSpace.matchScore && (
                      <div className="flex items-center space-x-1">
                        <Sparkles className="h-4 w-4 text-hive-gold" />
                        <span className="text-sm font-medium text-hive-gold">{selectedSpace.matchScore}% match</span>
                      </div>
                    )}
                  </div>
                  <p className="text-zinc-300 mb-3">{selectedSpace.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="skill-tag" className="text-xs capitalize">
                      {selectedSpace.category}
                    </Badge>
                    <Badge variant="skill-tag" className="text-xs capitalize">
                      {selectedSpace.type}
                    </Badge>
                    {selectedSpace.privacy === 'private' && (
                      <Badge variant="destructive" className="text-xs">Private</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Recommendation */}
            {selectedSpace.recommendationReason && (
              <Card className="p-4 bg-gradient-to-r from-hive-gold/10 to-purple-500/10 border-hive-gold/30">
                <div className="flex items-start space-x-3">
                  <Brain className="h-5 w-5 text-hive-gold mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Why we recommend this space</h4>
                    <p className="text-sm text-zinc-300">{selectedSpace.recommendationReason}</p>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                <div className="text-2xl font-bold text-white">{selectedSpace.memberCount}</div>
                <div className="text-sm text-zinc-400">Members</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                <div className="text-2xl font-bold text-white">{selectedSpace.stats.weeklyActivity}%</div>
                <div className="text-sm text-zinc-400">Active</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                <div className="text-2xl font-bold text-white">{selectedSpace.stats.upcomingEvents}</div>
                <div className="text-sm text-zinc-400">Events</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                <div className="text-2xl font-bold text-white">{selectedSpace.stats.activeTools}</div>
                <div className="text-sm text-zinc-400">Tools</div>
              </div>
            </div>
            
            {/* Leadership */}
            <div>
              <h4 className="font-medium text-white mb-3">Leadership</h4>
              <div className="space-y-2">
                {selectedSpace.leadership.map((leader) => (
                  <div key={leader.id} className="flex items-center space-x-3 p-2 bg-zinc-800/30 rounded-lg">
                    <div className="w-8 h-8 bg-zinc-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{leader.name}</div>
                      <div className="text-zinc-400 text-xs">@{leader.handle} • {leader.role}</div>
                    </div>
                    {leader.verified && <Star className="h-4 w-4 text-hive-gold fill-current" />}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <h4 className="font-medium text-white mb-3">Topics & Interests</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSpace.tags.map((tag) => (
                  <Badge key={tag.id} variant="skill-tag" className="text-xs">
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Recent Activity */}
            <div>
              <h4 className="font-medium text-white mb-3">Recent Activity</h4>
              <div className="space-y-2">
                {selectedSpace.recentActivity.slice(0, 3).map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-zinc-800/30 rounded-lg">
                    <Activity className="h-4 w-4 text-hive-gold" />
                    <div className="flex-1">
                      <div className="text-white text-sm">{activity.description}</div>
                      <div className="text-zinc-400 text-xs">{formatTimeAgo(activity.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <div className="text-sm text-zinc-400">
                Established {formatTimeAgo(selectedSpace.established)}
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Space
                </Button>
                {selectedSpace.isJoined ? (
                  <Badge variant="building-tools">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Already Joined
                  </Badge>
                ) : (
                  <Button
                    className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                    onClick={() => {
                      handleJoinSpace(selectedSpace.id);
                      setShowSpacePreview(false);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Join Space
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </HiveModal>
    </div>
  );
}