import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { 
  Users, Search, Plus, Settings, Bell, BookOpen, Coffee, GamepadIcon, 
  Calendar, MapPin, Star, Heart, MessageCircle, Share, ChevronRight, 
  ChevronDown, Filter, Grid, List, X, ArrowLeft, User, Clock, 
  Activity, Target, Zap, Shield, Eye, EyeOff, Lock, Globe, 
  UserPlus, UserMinus, MoreHorizontal, Edit, Trash2, AlertCircle,
  CheckCircle, TrendingUp, BarChart3, PieChart, Users2, Archive
} from 'lucide-react';

// Spaces System Props Interface
interface SpacesSystemProps {
  viewMode?: 'explore' | 'category' | 'space-preview' | 'space-board' | 'discovery' | 'management' | 'creation';
  userRole?: 'student' | 'leader' | 'admin';
  showDebugLabels?: boolean;
  categoryType?: 'university' | 'residential' | 'greek' | 'student';
}

// HIVE Spaces System - Complete vBETA Implementation
const CompleteSpacesSystem = ({ 
  viewMode = 'explore',
  userRole = 'student',
  showDebugLabels = false,
  categoryType = 'university'
}: SpacesSystemProps = {}) => {
  // Page Navigation State
  const [currentView, setCurrentView] = React.useState(viewMode);
  const [currentCategory, setCurrentCategory] = React.useState(categoryType);
  const [navigationHistory, setNavigationHistory] = React.useState<string[]>([]);
  
  // Space Selection State
  const [selectedSpace, setSelectedSpace] = React.useState<any>(null);
  const [previewSpaceData, setPreviewSpaceData] = React.useState<any>(null);
  const [activeBoardSpace, setActiveBoardSpace] = React.useState<any>(null);
  
  // UI State
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('trending');
  const [viewLayout, setViewLayout] = React.useState<'grid' | 'list'>('grid');
  
  // Modal State
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showJoinModal, setShowJoinModal] = React.useState(false);
  const [joinSpaceData, setJoinSpaceData] = React.useState<any>(null);
  const [showActivationFlow, setShowActivationFlow] = React.useState(false);
  const [showLeadershipPanel, setShowLeadershipPanel] = React.useState(false);
  const [showToolLibrary, setShowToolLibrary] = React.useState(false);
  const [leadershipTab, setLeadershipTab] = React.useState('dashboard');

  // Navigation Functions
  const navigateTo = (view: string, data?: any) => {
    setNavigationHistory(prev => [...prev, currentView]);
    setCurrentView(view);
    if (data) {
      if (view === 'space-preview') setPreviewSpaceData(data);
      if (view === 'space-board') setActiveBoardSpace(data);
      if (view === 'category') setCurrentCategory(data);
    }
  };
  
  const navigateBack = () => {
    if (navigationHistory.length > 0) {
      const previousView = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentView(previousView);
    }
  };

  // Mock data for spaces
  const [spaces, setSpaces] = React.useState([
    {
      id: 1,
      name: 'CS 220 Study Group',
      description: 'Collaborative learning for Data Structures & Algorithms. Weekly study sessions, code reviews, and exam prep.',
      category: 'academic',
      subcategory: 'Computer Science',
      members: 47,
      maxMembers: 60,
      isPublic: true,
      joinType: 'request', // 'open', 'request', 'invite'
      tags: ['algorithms', 'coding', 'study-group', 'weekly'],
      leader: { name: 'Alex Chen', avatar: 'AC', isOnline: true },
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
      stats: {
        engagement: 92,
        weeklyActivity: 15,
        avgRating: 4.8,
        eventsThisMonth: 8
      },
      recentActivity: '2 hours ago',
      trending: true,
      featured: false,
      userIsMember: false,
      userIsLeader: false,
      notifications: 0,
      isActive: true
    },
    {
      id: 2,
      name: 'UB Athletics Fans',
      description: 'Connect with fellow Bulls! Game discussions, tailgate planning, and sports news. All UB sports welcome.',
      category: 'interest',
      subcategory: 'Sports',
      members: 234,
      maxMembers: 500,
      isPublic: true,
      joinType: 'open',
      tags: ['sports', 'tailgate', 'games', 'bulls'],
      leader: { name: 'Jamie Rodriguez', avatar: 'JR', isOnline: false },
      coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop',
      stats: {
        engagement: 76,
        weeklyActivity: 32,
        avgRating: 4.6,
        eventsThisMonth: 12
      },
      recentActivity: '1 day ago',
      trending: false,
      featured: true,
      userIsMember: true,
      userIsLeader: false,
      notifications: 3
    },
    {
      id: 3,
      name: 'Governors 3rd Floor',
      description: 'Our floor community! Laundry coordination, study sessions, movie nights, and general floor coordination.',
      category: 'residential',
      subcategory: 'Governors Hall',
      members: 28,
      maxMembers: 30,
      isPublic: false,
      joinType: 'invite',
      tags: ['dorm', 'floor', 'community', 'coordination'],
      leader: { name: 'Taylor Kim', avatar: 'TK', isOnline: true },
      coverImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=200&fit=crop',
      stats: {
        engagement: 88,
        weeklyActivity: 45,
        avgRating: 4.9,
        eventsThisMonth: 6
      },
      recentActivity: '30 minutes ago',
      trending: false,
      featured: false,
      userIsMember: true,
      userIsLeader: userRole === 'leader',
      notifications: 2,
      isActive: true
    },
    {
      id: 4,
      name: 'Startup Founders Circle',
      description: 'Building the next generation of student entrepreneurs. Pitch practice, networking, and startup resources.',
      category: 'interest',
      subcategory: 'Entrepreneurship',
      members: 89,
      maxMembers: 100,
      isPublic: true,
      joinType: 'request',
      tags: ['startup', 'entrepreneurship', 'networking', 'business'],
      leader: { name: 'Morgan Davis', avatar: 'MD', isOnline: true },
      coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop',
      stats: {
        engagement: 84,
        weeklyActivity: 28,
        avgRating: 4.7,
        eventsThisMonth: 10
      },
      recentActivity: '4 hours ago',
      trending: true,
      featured: false,
      userIsMember: false,
      userIsLeader: false,
      notifications: 0,
      isActive: true
    },
    {
      id: 5,
      name: 'Mock Trial Team',
      description: 'Competitive collegiate mock trial team. Practice sessions, case prep, and tournament coordination.',
      category: 'academic',
      subcategory: 'Pre-Law',
      members: 15,
      maxMembers: 20,
      isPublic: false,
      joinType: 'invite',
      tags: ['mock-trial', 'law', 'competition', 'practice'],
      leader: { name: 'Sam Wilson', avatar: 'SW', isOnline: false },
      coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop',
      stats: {
        engagement: 95,
        weeklyActivity: 22,
        avgRating: 4.9,
        eventsThisMonth: 14
      },
      recentActivity: '6 hours ago',
      trending: false,
      featured: true,
      userIsMember: true,
      userIsLeader: false,
      notifications: 5
    },
    {
      id: 6,
      name: 'Campus Photography',
      description: 'Capture UB life through our lenses. Photo walks, editing workshops, and showcasing our campus beauty.',
      category: 'interest',
      subcategory: 'Creative Arts',
      members: 63,
      maxMembers: 80,
      isPublic: true,
      joinType: 'open',
      tags: ['photography', 'creative', 'workshops', 'campus'],
      leader: { name: 'Casey Park', avatar: 'CP', isOnline: true },
      coverImage: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400&h=200&fit=crop',
      stats: {
        engagement: 71,
        weeklyActivity: 18,
        avgRating: 4.5,
        eventsThisMonth: 7
      },
      recentActivity: '1 hour ago',
      trending: false,
      featured: false,
      userIsMember: false,
      userIsLeader: false,
      notifications: 0,
      isActive: true
    },
    // Inactive pre-seeded spaces
    {
      id: 7,
      name: 'Porter Hall 4th Floor',
      description: 'Residential community for Porter Hall 4th Floor residents. Connect with your floormates for study sessions, social events, and daily coordination.',
      category: 'residential',
      subcategory: 'Porter Hall',
      members: 0,
      potentialMembers: 28,
      maxMembers: 30,
      isPublic: false,
      joinType: 'automatic',
      tags: ['dorm', 'porter-hall', 'floor-4', 'residential'],
      leader: null,
      isActive: false,
      preSeeded: true,
      coverImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=200&fit=crop',
      stats: {
        engagement: 0,
        weeklyActivity: 0,
        avgRating: 0,
        eventsThisMonth: 0
      },
      recentActivity: null,
      trending: false,
      featured: false,
      userIsMember: false,
      userIsLeader: false,
      notifications: 0,
      isActive: true,
      officialAnnouncements: [
        { title: 'Move-in Day Information', date: '2024-08-15', source: 'Housing Office' },
        { title: 'Floor Meeting Schedule', date: '2024-08-20', source: 'Resident Advisor' },
        { title: 'Study Room Reservations', date: '2024-08-25', source: 'Housing Office' }
      ]
    },
    {
      id: 8,
      name: 'Alpha Beta Gamma Chapter',
      description: 'Official chapter space for Alpha Beta Gamma fraternity. Brotherhood events, philanthropy coordination, and academic support.',
      category: 'greek',
      subcategory: 'Fraternity',
      members: 0,
      potentialMembers: 45,
      maxMembers: 60,
      isPublic: false,
      joinType: 'verification',
      tags: ['fraternity', 'alpha-beta-gamma', 'brotherhood'],
      leader: null,
      isActive: false,
      preSeeded: true,
      coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop',
      stats: {
        engagement: 0,
        weeklyActivity: 0,
        avgRating: 0,
        eventsThisMonth: 0
      },
      recentActivity: null,
      trending: false,
      featured: false,
      userIsMember: false,
      userIsLeader: false,
      notifications: 0,
      isActive: true,
      officialAnnouncements: [
        { title: 'Rush Week Schedule', date: '2024-08-30', source: 'Greek Life Office' },
        { title: 'Philanthropy Event Planning', date: '2024-09-05', source: 'Greek Life Office' },
        { title: 'Academic Standards Meeting', date: '2024-09-10', source: 'Greek Life Office' }
      ]
    }
  ]);

  // Filter and sort spaces
  const filteredSpaces = React.useMemo(() => {
    let filtered = spaces.filter(space => {
      const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = filterCategory === 'all' || space.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort spaces
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.stats.engagement - a.stats.engagement;
        case 'members':
          return b.members - a.members;
        case 'activity':
          return b.stats.weeklyActivity - a.stats.weeklyActivity;
        case 'rating':
          return b.stats.avgRating - a.stats.avgRating;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [spaces, searchQuery, filterCategory, sortBy]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-4 h-4" />;
      case 'interest': return <Target className="w-4 h-4" />;
      case 'residential': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'interest': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'residential': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleJoinSpace = (space: any) => {
    if (space.joinType === 'open') {
      // Join immediately
      setSpaces(prev => prev.map(s => 
        s.id === space.id 
          ? { ...s, userIsMember: true, members: s.members + 1 }
          : s
      ));
    } else {
      // Show join modal for request/invite spaces
      setJoinSpaceData(space);
      setShowJoinModal(true);
    }
  };

  const handleLeaveSpace = (spaceId: number) => {
    setSpaces(prev => prev.map(s => 
      s.id === spaceId 
        ? { ...s, userIsMember: false, members: s.members - 1 }
        : s
    ));
  };

  const SpaceCard = ({ space, compact = false }: { space: any; compact?: boolean }) => (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-lg group ${compact ? 'p-4' : 'p-0'}`}>
      {!compact && (
        <div className="relative h-32 overflow-hidden">
          <img 
            src={space.coverImage} 
            alt={space.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Status badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {space.trending && (
              <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-medium backdrop-blur-sm">
                🔥 Trending
              </div>
            )}
            {space.featured && (
              <div className="px-2 py-1 bg-white/20 text-white border border-white/30 rounded-full text-xs font-medium backdrop-blur-sm">
                ⭐ Featured
              </div>
            )}
          </div>

          {/* Privacy indicator */}
          <div className="absolute top-3 right-3">
            {space.isPublic ? (
              <Globe className="w-4 h-4 text-white/70" />
            ) : (
              <Lock className="w-4 h-4 text-yellow-400" />
            )}
          </div>

          {/* Member count overlay */}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 text-white rounded-full text-xs font-medium backdrop-blur-sm">
            {space.members}/{space.maxMembers}
          </div>
        </div>
      )}

      <div className={compact ? '' : 'p-4'}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-white text-lg group-hover:text-yellow-400 transition-colors duration-200">
                {space.name}
              </h3>
              {space.notifications > 0 && (
                <div className="w-5 h-5 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-bold">
                  {space.notifications}
                </div>
              )}
            </div>
            
            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
              {space.description}
            </p>

            {/* Category and leader info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 ${getCategoryColor(space.category)}`}>
                  {getCategoryIcon(space.category)}
                  {space.subcategory}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-400">
                {space.leader ? (
                  <div className="flex items-center gap-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${space.leader.isOnline ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {space.leader.avatar}
                    </div>
                    <span>{space.leader.name}</span>
                    {space.leader.isOnline && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>Needs Leader</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {space.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs">
                  #{tag}
                </span>
              ))}
              {space.tags.length > 3 && (
                <span className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs">
                  +{space.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 mb-4 text-center">
              <div className="p-2 bg-white/5 rounded-lg">
                <div className="text-sm font-bold text-white">{space.stats.engagement}%</div>
                <div className="text-xs text-gray-400">Engagement</div>
              </div>
              <div className="p-2 bg-white/5 rounded-lg">
                <div className="text-sm font-bold text-white">{space.stats.weeklyActivity}</div>
                <div className="text-xs text-gray-400">Weekly</div>
              </div>
              <div className="p-2 bg-white/5 rounded-lg">
                <div className="text-sm font-bold text-white">{space.stats.avgRating}</div>
                <div className="text-xs text-gray-400">Rating</div>
              </div>
              <div className="p-2 bg-white/5 rounded-lg">
                <div className="text-sm font-bold text-white">{space.stats.eventsThisMonth}</div>
                <div className="text-xs text-gray-400">Events</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {space.isActive === false ? (
            /* Inactive space - preview mode */
            <div className="flex gap-2 w-full">
              <button 
                onClick={() => navigateTo('space-preview', space)}
                className="flex-1 px-4 py-2 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Preview Space
              </button>
              <button 
                onClick={() => {
                  // Show get notified confirmation
                  alert('You\'ll be notified when this space becomes active!');
                }}
                className="px-4 py-2 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200 text-gray-400 hover:text-yellow-400"
              >
                <Bell className="w-4 h-4" />
              </button>
            </div>
          ) : space.userIsMember ? (
            <div className="flex gap-2 w-full">
              <button 
                onClick={() => navigateTo('space-board', space)}
                className="flex-1 px-4 py-2 bg-white text-black hover:bg-gray-100 border border-white/20 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Open Space
              </button>
              <button 
                onClick={() => handleLeaveSpace(space.id)}
                className="px-4 py-2 bg-white/10 border border-white/20 hover:border-red-500 rounded-lg text-sm font-medium transition-all duration-200 hover:text-red-400"
              >
                Leave
              </button>
              {space.userIsLeader && (
                <button 
                  onClick={() => {
                    setActiveBoardSpace(space);
                    setShowLeadershipPanel(true);
                  }}
                  className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200 text-yellow-400"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-2 w-full">
              <button 
                onClick={() => handleJoinSpace(space)}
                className="flex-1 px-4 py-2 bg-white text-black hover:bg-gray-100 border border-white/20 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {space.joinType === 'open' ? 'Join Space' : space.joinType === 'request' ? 'Request to Join' : 'Invite Only'}
              </button>
              <button className="px-4 py-2 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200">
                <Heart className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200">
                <Share className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-gray-400">
            {space.isActive === false ? (
              <>
                <span>Potential members: {space.potentialMembers}</span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <AlertCircle className="w-3 h-3" />
                  <span>Awaiting leader</span>
                </div>
              </>
            ) : (
              <>
                <span>Last activity: {space.recentActivity}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Active space</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // PAGE COMPONENTS - Full Frontend Implementation
  
  // 1. Main Explore Page - Primary landing for community discovery
  const MainExplorePage = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Discover Your Communities
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Find spaces where you belong, collaborate on projects, and build meaningful connections with your campus community.
        </p>
      </div>

      {/* Recommended For You Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recommended For You</h2>
          <button className="text-sm text-gray-400 hover:text-white transition-colors">
            View All Recommendations
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.slice(0, 3).map(space => (
            <div key={space.id} className="relative">
              <SpaceCard space={space} />
              <div className="absolute top-3 left-3 px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-medium backdrop-blur-sm">
                Recommended
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Four Core Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Explore by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              type: 'university',
              title: 'University Spaces',
              description: 'Academic departments, courses, and official university communities',
              icon: '🎓',
              examples: ['CS Department', 'Engineering Students', 'Pre-Med Society'],
              color: 'from-blue-500/20 to-indigo-500/20',
              borderColor: 'border-blue-500/30',
              textColor: 'text-blue-400'
            },
            {
              type: 'residential',
              title: 'Residential Spaces',
              description: 'Dorm floors, residential halls, and housing communities',
              icon: '🏠',
              examples: ['Ellicott 3rd Floor', 'Governors Hall', 'Off-Campus Commons'],
              color: 'from-purple-500/20 to-pink-500/20',
              borderColor: 'border-purple-500/30',
              textColor: 'text-purple-400'
            },
            {
              type: 'greek',
              title: 'Greek Life',
              description: 'Fraternities, sororities, and Greek organization chapters',
              icon: '🏛️',
              examples: ['Alpha Beta Gamma', 'Delta Sigma Phi', 'Kappa Alpha Theta'],
              color: 'from-yellow-500/20 to-orange-500/20',
              borderColor: 'border-yellow-500/30',
              textColor: 'text-yellow-400'
            },
            {
              type: 'student',
              title: 'Student Organizations',
              description: 'Clubs, societies, interest groups, and student-led initiatives',
              icon: '🌟',
              examples: ['Photography Club', 'Debate Society', 'Entrepreneurship Hub'],
              color: 'from-green-500/20 to-emerald-500/20',
              borderColor: 'border-green-500/30',
              textColor: 'text-green-400'
            }
          ].map(category => (
            <div 
              key={category.type}
              onClick={() => navigateTo('category', category.type)}
              className={`bg-gradient-to-br ${category.color} border ${category.borderColor} rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 group`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold ${category.textColor} mb-2`}>
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 ${category.textColor} group-hover:translate-x-1 transition-transform`} />
              </div>
              
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Popular Spaces</div>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map(example => (
                    <span key={example} className="px-2 py-1 bg-white/10 text-gray-300 rounded-lg text-xs">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-2">Can't find what you're looking for?</h3>
            <p className="text-sm text-gray-400">Create your own community space or request a new category.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-yellow-500 text-black hover:bg-yellow-400 rounded-lg font-medium transition-all duration-200"
            >
              Create Space
            </button>
            <button className="px-4 py-2 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg font-medium transition-all duration-200">
              Request Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. Category Browse Pages - Tailored for each category type
  const CategoryBrowsePage = () => {
    const getCategoryInfo = (type: string) => {
      switch (type) {
        case 'university':
          return {
            title: 'University Spaces',
            subtitle: 'Academic departments, courses, and official university communities',
            icon: '🎓',
            color: 'blue',
            userSection: 'YOUR ACADEMIC PROFILE',
            userSpaces: spaces.filter(s => s.category === 'academic' && s.userIsMember),
            isExploratoryUI: true
          };
        case 'residential':
          return {
            title: 'Residential Spaces',
            subtitle: 'Your home away from home - connect with your floor and building',
            icon: '🏠',
            color: 'purple',
            userSection: 'YOUR RESIDENCE',
            userSpaces: spaces.filter(s => s.category === 'residential' && s.userIsMember),
            isExploratoryUI: false
          };
        case 'greek':
          return {
            title: 'Greek Life',
            subtitle: 'Brotherhood, sisterhood, and Greek organization communities',
            icon: '🏛️',
            color: 'yellow',
            userSection: 'YOUR CHAPTER',
            userSpaces: spaces.filter(s => s.category === 'greek' && s.userIsMember),
            isExploratoryUI: false
          };
        case 'student':
          return {
            title: 'Student Organizations',
            subtitle: 'Clubs, societies, and student-led communities',
            icon: '🌟',
            color: 'green',
            userSection: 'YOUR INTERESTS',
            userSpaces: spaces.filter(s => s.category === 'interest' && s.userIsMember),
            isExploratoryUI: true
          };
        default:
          return {
            title: 'Spaces',
            subtitle: 'Discover communities',
            icon: '📁',
            color: 'gray',
            userSection: 'YOUR SPACES',
            userSpaces: [],
            isExploratoryUI: true
          };
      }
    };

    const categoryInfo = getCategoryInfo(currentCategory);
    const categorySpaces = spaces.filter(space => {
      const categoryMap: { [key: string]: string[] } = {
        'university': ['academic'],
        'residential': ['residential'],
        'greek': ['greek'],
        'student': ['interest']
      };
      return categoryMap[currentCategory]?.includes(space.category);
    });

    return (
      <div className="space-y-8">
        {/* Category Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={navigateBack}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="text-4xl">{categoryInfo.icon}</div>
            <div>
              <h1 className="text-3xl font-bold">{categoryInfo.title}</h1>
              <p className="text-gray-400">{categoryInfo.subtitle}</p>
            </div>
          </div>
        </div>

        {/* User's Designated Community (for Residential & Greek) */}
        {!categoryInfo.isExploratoryUI && categoryInfo.userSpaces.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className={`w-5 h-5 text-${categoryInfo.color}-400`} />
              <h2 className="text-xl font-semibold">{categoryInfo.userSection}</h2>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
              <SpaceCard space={categoryInfo.userSpaces[0]} />
            </div>
          </div>
        )}

        {/* User's Academic Profile/Interests (for University & Student) */}
        {categoryInfo.isExploratoryUI && categoryInfo.userSpaces.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className={`w-5 h-5 text-${categoryInfo.color}-400`} />
                <h2 className="text-xl font-semibold">{categoryInfo.userSection}</h2>
              </div>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Manage Profile
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryInfo.userSpaces.map(space => (
                <SpaceCard key={space.id} space={space} compact={true} />
              ))}
            </div>
          </div>
        )}

        {/* Discovery Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Discover More Spaces</h2>
            <div className="text-sm text-gray-400">
              {categorySpaces.length} spaces available
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 w-64"
              />
            </div>
            
            <button
              onClick={() => setViewLayout(viewLayout === 'grid' ? 'list' : 'grid')}
              className="w-10 h-10 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              {viewLayout === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Spaces Grid */}
        <div className={`grid gap-6 ${viewLayout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {categorySpaces
            .filter(space => 
              space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              space.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(space => (
              <SpaceCard key={space.id} space={space} compact={viewLayout === 'list'} />
            ))}
        </div>
      </div>
    );
  };

  // 3. Space Preview Page - Full page for inactive spaces
  const SpacePreviewPage = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={navigateBack}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{previewSpaceData?.name}</h1>
            <p className="text-yellow-400 font-medium">Pre-seeded • Awaiting Leader</p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 rounded-2xl overflow-hidden">
        <img 
          src={previewSpaceData?.coverImage} 
          alt={previewSpaceData?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-lg border text-sm font-medium flex items-center gap-1 ${getCategoryColor(previewSpaceData?.category)}`}>
                {getCategoryIcon(previewSpaceData?.category)}
                {previewSpaceData?.subcategory}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{previewSpaceData?.potentialMembers}</div>
              <div className="text-sm text-gray-300">Potential Members</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">About this Space</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {previewSpaceData?.description}
            </p>
          </div>

          {/* Official Announcements */}
          {previewSpaceData?.officialAnnouncements && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Official Announcements
              </h2>
              <div className="space-y-4">
                {previewSpaceData.officialAnnouncements.map((announcement: any, index: number) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <span className="text-sm text-gray-400">{announcement.date}</span>
                    </div>
                    <p className="text-sm text-gray-400">From {announcement.source}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Community Tags</h2>
            <div className="flex flex-wrap gap-3">
              {previewSpaceData?.tags.map((tag: string) => (
                <span key={tag} className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Potential */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
            <h3 className="font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Community Potential
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{previewSpaceData?.potentialMembers}</div>
                <div className="text-sm text-gray-400">Students could join</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-yellow-400">{previewSpaceData?.category}</div>
                <div className="text-sm text-gray-400">Category</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => setShowActivationFlow(true)}
              className="w-full px-6 py-4 bg-yellow-500 text-black hover:bg-yellow-400 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Request to Lead
            </button>
            <button className="w-full px-6 py-4 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
              <Bell className="w-5 h-5" />
              Get Notified
            </button>
          </div>

          {/* Leadership Requirements */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold mb-3">Leadership Requirements</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                Be an active member of this community
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                Commit to regular engagement
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                Help organize community activities
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. Individual Space Page (Board Template) - Full page
  const SpaceBoardPage = () => (
    <div className="min-h-screen flex flex-col">
      {/* Space Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={navigateBack}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <img 
                src={activeBoardSpace?.coverImage} 
                alt={activeBoardSpace?.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{activeBoardSpace?.name}</h1>
                <p className="text-gray-400">{activeBoardSpace?.members} members • {activeBoardSpace?.subcategory}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg transition-all duration-200">
              <Bell className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg transition-all duration-200">
              <Share className="w-4 h-4" />
            </button>
            {activeBoardSpace?.userIsLeader && (
              <button 
                onClick={() => setShowLeadershipPanel(true)}
                className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:border-yellow-500 rounded-lg transition-all duration-200"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Board Layout: 60/40 split */}
      <div className="flex-1 flex">
        {/* Post Board (60%) */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Community Activity</h2>
              <button className="px-6 py-3 bg-yellow-500 text-black hover:bg-yellow-400 rounded-xl font-semibold transition-all duration-200">
                Create Post
              </button>
            </div>

            {/* Activity Feed */}
            {[
              { type: 'event', title: 'Weekly Study Session', author: 'Taylor Kim', time: '2 hours ago', content: 'Join us for our weekly CS 220 study session in the library. We\'ll be covering binary trees and hash tables this week. Bring your laptops and questions!', reactions: 15, comments: 8 },
              { type: 'poll', title: 'Best time for group meetings?', author: 'Jordan Lee', time: '5 hours ago', content: 'Help us decide the best recurring time for our study sessions. Vote for your preferred time slot so we can maximize attendance.', reactions: 12, comments: 5 },
              { type: 'announcement', title: 'New Resource Library Added', author: 'Alex Chen', time: '1 day ago', content: 'I\'ve added a comprehensive algorithm cheat sheet and practice problems to our shared Google Drive. Perfect for upcoming midterms!', reactions: 23, comments: 12 },
              { type: 'event', title: 'Code Review Session', author: 'Casey Park', time: '2 days ago', content: 'Bring your current projects for peer review. Great opportunity to get feedback and learn from each other\'s coding approaches.', reactions: 9, comments: 3 }
            ].map((post, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold">{post.author}</div>
                      <div className="text-sm text-gray-400">{post.time}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.type === 'event' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    post.type === 'poll' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {post.type}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-3">{post.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{post.content}</p>
                
                <div className="flex items-center gap-6 text-gray-400">
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{post.reactions}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tool Grid (40%) */}
        <div className="w-2/5 border-l border-white/10 p-8 bg-white/5">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Community Tools</h2>
              <button 
                onClick={() => setShowToolLibrary(true)}
                className="w-10 h-10 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:border-yellow-500 rounded-xl flex items-center justify-center transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Event Calendar', icon: Calendar, description: 'Upcoming events and meetings', active: true },
                { name: 'Study Groups', icon: Users, description: 'Active study sessions', active: true },
                { name: 'File Sharing', icon: Archive, description: 'Shared resources', active: true },
                { name: 'Member Directory', icon: User, description: 'Community members', active: true },
                { name: 'Polls & Voting', icon: Activity, description: 'Community decisions', active: true },
                { name: 'Announcements', icon: Bell, description: 'Important updates', active: false }
              ].map((tool, index) => (
                <div 
                  key={tool.name} 
                  className={`rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                    tool.active 
                      ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <tool.icon className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">{tool.name}</span>
                  </div>
                  <p className="text-xs text-gray-400">{tool.description}</p>
                  {!tool.active && (
                    <div className="mt-2">
                      <button className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                        Install Tool
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Space Health</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Weekly Activity</span>
                  <span className="text-sm font-medium">{activeBoardSpace?.stats?.weeklyActivity || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Engagement</span>
                  <span className="text-sm font-medium">{activeBoardSpace?.stats?.engagement || 'N/A'}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Events This Month</span>
                  <span className="text-sm font-medium">{activeBoardSpace?.stats?.eventsThisMonth || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CreateSpaceModal = () => (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-2xl h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plus className="w-6 h-6 text-white" />
              <div>
                <h2 className="text-xl font-bold">Create New Space</h2>
                <p className="text-sm text-gray-400">Build a community around your interests or needs</p>
              </div>
            </div>
            <button onClick={() => setShowCreateModal(false)} className="w-10 h-10 bg-black/80 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form className="space-y-6">
            
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Space Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., CS 220 Study Group"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe what your space is about, what activities you'll do, and who should join..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-200 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white transition-all duration-200">
                    <option value="">Select category</option>
                    <option value="academic">Academic</option>
                    <option value="interest">Interest & Hobbies</option>
                    <option value="residential">Residential</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Max Members</label>
                  <input 
                    type="number" 
                    placeholder="50"
                    min="5"
                    max="500"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Privacy & Access</h3>
              
              <div className="space-y-3">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="font-medium">Public Space</div>
                        <div className="text-sm text-gray-400">Anyone can discover and see content</div>
                      </div>
                    </div>
                    <input type="radio" name="privacy" value="public" className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="font-medium">Private Space</div>
                        <div className="text-sm text-gray-400">Invite-only, content hidden from non-members</div>
                      </div>
                    </div>
                    <input type="radio" name="privacy" value="private" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Join Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">How People Can Join</h3>
              
              <div className="space-y-3">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserPlus className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="font-medium">Open to Join</div>
                        <div className="text-sm text-gray-400">Anyone can join immediately</div>
                      </div>
                    </div>
                    <input type="radio" name="joinType" value="open" className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="font-medium">Request to Join</div>
                        <div className="text-sm text-gray-400">Leaders approve join requests</div>
                      </div>
                    </div>
                    <input type="radio" name="joinType" value="request" className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="font-medium">Invite Only</div>
                        <div className="text-sm text-gray-400">Only leaders can invite new members</div>
                      </div>
                    </div>
                    <input type="radio" name="joinType" value="invite" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4 border-t border-white/20">
              <button 
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-xl font-medium transition-all duration-200"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 px-6 py-3 bg-white text-black hover:bg-gray-100 border border-white/20 hover:border-yellow-500 rounded-xl font-medium transition-all duration-200"
              >
                Create Space
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const JoinSpaceModal = () => (
    joinSpaceData && (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowJoinModal(false)}>
        <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
          
          {/* Modal Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserPlus className="w-6 h-6 text-white" />
                <div>
                  <h2 className="text-xl font-bold">Join Space</h2>
                  <p className="text-sm text-gray-400">{joinSpaceData.name}</p>
                </div>
              </div>
              <button onClick={() => setShowJoinModal(false)} className="w-10 h-10 bg-black/80 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              
              {/* Space preview */}
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(joinSpaceData.category)}`}>
                    {getCategoryIcon(joinSpaceData.category)}
                  </div>
                  <div>
                    <div className="font-semibold">{joinSpaceData.name}</div>
                    <div className="text-sm text-gray-400">{joinSpaceData.members} members</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{joinSpaceData.description}</p>
              </div>

              {joinSpaceData.joinType === 'request' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Why do you want to join?</label>
                  <textarea 
                    rows={3}
                    placeholder="Tell the space leaders why you'd like to join and what you can contribute..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-200 resize-none"
                  />
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    handleJoinSpace(joinSpaceData);
                    setShowJoinModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-white text-black hover:bg-gray-100 border border-white/20 hover:border-yellow-500 rounded-lg font-medium transition-all duration-200"
                >
                  {joinSpaceData.joinType === 'request' ? 'Send Request' : 'Join Space'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Space Preview Modal for inactive spaces
  const SpacePreviewModal = () => (
    previewSpaceData && (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowSpacePreview(false)}>
        <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="relative">
            <img 
              src={previewSpaceData.coverImage} 
              alt={previewSpaceData.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <button 
              onClick={() => setShowSpacePreview(false)} 
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{previewSpaceData.name}</h2>
                  <p className="text-yellow-400 font-medium">Pre-seeded • Awaiting Leader</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Community potential */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-yellow-400">Community Potential</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{previewSpaceData.potentialMembers}</div>
                  <div className="text-sm text-gray-400">Potential Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{previewSpaceData.category}</div>
                  <div className="text-sm text-gray-400">Category</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{previewSpaceData.subcategory}</div>
                  <div className="text-sm text-gray-400">Type</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-3">About this Space</h3>
              <p className="text-gray-400 leading-relaxed">{previewSpaceData.description}</p>
            </div>

            {/* Official announcements */}
            {previewSpaceData.officialAnnouncements && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Official Announcements
                </h3>
                <div className="space-y-3">
                  {previewSpaceData.officialAnnouncements.map((announcement: any, index: number) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-white">{announcement.title}</h4>
                          <p className="text-xs text-gray-400 mt-1">From {announcement.source}</p>
                        </div>
                        <span className="text-xs text-gray-400">{announcement.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {previewSpaceData.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button 
                onClick={() => {
                  setShowSpacePreview(false);
                  setShowActivationFlow(true);
                }}
                className="flex-1 px-6 py-3 bg-yellow-500 text-black hover:bg-yellow-400 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Request to Lead
              </button>
              <button className="flex-1 px-6 py-3 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2">
                <Bell className="w-4 h-4" />
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Activation Flow Modal - Multi-step leadership request
  const ActivationFlowModal = () => (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowActivationFlow(false)}>
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Request Space Leadership</h2>
                <p className="text-sm text-gray-400">Apply to lead {previewSpaceData?.name}</p>
              </div>
            </div>
            <button onClick={() => setShowActivationFlow(false)} className="w-10 h-10 bg-black/50 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-400 mb-2">Leadership Requirements</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Be an active member of the community this space serves</li>
                <li>• Commit to regular engagement and moderation</li>
                <li>• Help organize events and coordinate activities</li>
                <li>• Foster a positive and inclusive community environment</li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Qualifications</label>
              <textarea 
                rows={4}
                placeholder="Describe your connection to this community and why you'd be a good leader..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Leadership Experience</label>
              <textarea 
                rows={3}
                placeholder="Any relevant leadership or community management experience..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Initial Plans</label>
              <textarea 
                rows={3}
                placeholder="What are your initial plans for building and growing this community?"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-200 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowActivationFlow(false)}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg font-medium transition-all duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowActivationFlow(false);
                  alert('Leadership request submitted for review!');
                }}
                className="flex-1 px-4 py-3 bg-yellow-500 text-black hover:bg-yellow-400 rounded-lg font-medium transition-all duration-200"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Leadership Panel Modal with 4 tabs
  const LeadershipPanelModal = () => (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowLeadershipPanel(false)}>
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Leadership Panel</h2>
                <p className="text-sm text-gray-400">Manage {activeBoardSpace?.name}</p>
              </div>
            </div>
            <button onClick={() => setShowLeadershipPanel(false)} className="w-10 h-10 bg-black/50 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mt-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'members', label: 'Members', icon: Users },
              { id: 'tools', label: 'Tool Management', icon: Settings },
              { id: 'settings', label: 'Space Settings', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setLeadershipTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  leadershipTab === tab.id 
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                    : 'bg-white/5 border border-white/10 hover:border-yellow-500/30'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-auto max-h-[60vh]">
          {leadershipTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{activeBoardSpace?.members}</div>
                  <div className="text-sm text-gray-400">Total Members</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">3</div>
                  <div className="text-sm text-gray-400">Pending Requests</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">24</div>
                  <div className="text-sm text-gray-400">Active Tools</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">89%</div>
                  <div className="text-sm text-gray-400">Health Score</div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-semibold mb-3">Recent Activity</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>3 new join requests</span>
                    <span className="text-gray-400">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Event: Study Session created</span>
                    <span className="text-gray-400">5 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New tool: Calendar Sync installed</span>
                    <span className="text-gray-400">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {leadershipTab === 'members' && (
            <div className="space-y-6">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <h3 className="font-semibold text-yellow-400 mb-3">Pending Join Requests (3)</h3>
                <div className="space-y-3">
                  {['Sarah Johnson', 'Mike Chen', 'Alex Rivera'].map(name => (
                    <div key={name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-500/20 rounded-full flex items-center justify-center">
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium">{name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm">
                          Accept
                        </button>
                        <button className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm">
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Member Directory</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Taylor Kim (Leader)', 'Jordan Lee', 'Sam Park', 'Casey Brown'].map(name => (
                    <div key={name} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                      <span className="font-medium">{name}</span>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {leadershipTab === 'tools' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Installed Tools</h3>
                <button 
                  onClick={() => {
                    setShowLeadershipPanel(false);
                    setShowToolLibrary(true);
                  }}
                  className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm hover:border-yellow-500 transition-all duration-200"
                >
                  Browse Tool Library
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {['Event Calendar', 'Study Groups', 'File Sharing', 'Polls & Voting', 'Announcements', 'Resource Library'].map(tool => (
                  <div key={tool} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="font-medium mb-2">{tool}</div>
                    <div className="text-xs text-gray-400 mb-3">Active</div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-xs">
                        Configure
                      </button>
                      <button className="px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {leadershipTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Privacy Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                    <span>Space Visibility</span>
                    <select className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm">
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                    <span>Join Approval</span>
                    <select className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm">
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual Review</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Space Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Space Name</label>
                    <input 
                      type="text" 
                      defaultValue={activeBoardSpace?.name}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea 
                      rows={3}
                      defaultValue={activeBoardSpace?.description}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Tool Library Modal
  const ToolLibraryModal = () => (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowToolLibrary(false)}>
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                <Grid className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Tool Library</h2>
                <p className="text-sm text-gray-400">Add functional capabilities to your space</p>
              </div>
            </div>
            <button onClick={() => setShowToolLibrary(false)} className="w-10 h-10 bg-black/50 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto max-h-[70vh]">
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Event Management System', description: 'Create, manage, and track community events', category: 'Featured', icon: Calendar, color: 'yellow' },
              { name: 'Study Group Coordinator', description: 'Organize study sessions and academic collaboration', category: 'Academic', icon: BookOpen, color: 'blue' },
              { name: 'File Sharing Hub', description: 'Share documents, notes, and resources', category: 'Productivity', icon: Archive, color: 'green' },
              { name: 'Polls & Voting', description: 'Make community decisions together', category: 'Engagement', icon: Activity, color: 'purple' },
              { name: 'Member Directory', description: 'Connect members with skills and interests', category: 'Social', icon: Users, color: 'pink' },
              { name: 'Resource Library', description: 'Curated collection of useful links and materials', category: 'Productivity', icon: BookOpen, color: 'indigo' }
            ].map((tool, index) => (
              <div key={tool.name} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 bg-${tool.color}-500/20 border border-${tool.color}-500/30 rounded-lg flex items-center justify-center`}>
                    <tool.icon className={`w-5 h-5 text-${tool.color}-400`} />
                  </div>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{tool.description}</p>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-white text-black hover:bg-gray-100 rounded-lg text-sm font-medium transition-all duration-200">
                    Install
                  </button>
                  <button className="px-3 py-2 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg text-sm transition-all duration-200">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Space Board Modal - Individual Space Page (Board Template)
  const SpaceBoardModal = () => (
    <div className="fixed inset-0 z-50 bg-black backdrop-blur-sm flex flex-col" onClick={() => setShowSpaceBoard(false)}>
      <div className="flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        {/* Space Header */}
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowSpaceBoard(false)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <img 
                  src={activeBoardSpace?.coverImage} 
                  alt={activeBoardSpace?.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold">{activeBoardSpace?.name}</h1>
                  <p className="text-sm text-gray-400">{activeBoardSpace?.members} members • {activeBoardSpace?.subcategory}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg text-sm transition-all duration-200">
                <Bell className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg text-sm transition-all duration-200">
                <Share className="w-4 h-4" />
              </button>
              {activeBoardSpace?.userIsLeader && (
                <button 
                  onClick={() => {
                    setShowSpaceBoard(false);
                    setShowLeadershipPanel(true);
                  }}
                  className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:border-yellow-500 rounded-lg text-sm transition-all duration-200"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Board Layout: 60/40 split */}
        <div className="flex h-full">
          {/* Post Board (60%) */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Activity Feed</h2>
                <button className="px-4 py-2 bg-yellow-500 text-black hover:bg-yellow-400 rounded-lg text-sm font-medium transition-all duration-200">
                  Create Post
                </button>
              </div>

              {/* Activity Cards */}
              {[
                { type: 'event', title: 'Study Session Tomorrow', author: 'Taylor Kim', time: '2 hours ago', content: 'Weekly CS 220 study session in the library. Covering binary trees and hash tables.' },
                { type: 'poll', title: 'Best time for group meetings?', author: 'Jordan Lee', time: '5 hours ago', content: 'Help us decide the best recurring time for our study sessions.' },
                { type: 'announcement', title: 'New Resource Added', author: 'Alex Chen', time: '1 day ago', content: 'Added comprehensive algorithm cheat sheet to our shared drive.' }
              ].map((post, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{post.author}</div>
                        <div className="text-xs text-gray-400">{post.time}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.type === 'event' ? 'bg-blue-500/20 text-blue-400' :
                      post.type === 'poll' ? 'bg-green-500/20 text-green-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {post.type}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{post.content}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>12</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>5</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tool Grid (40%) */}
          <div className="w-2/5 border-l border-white/10 p-6 bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Community Tools</h2>
              <button 
                onClick={() => {
                  setShowSpaceBoard(false);
                  setShowToolLibrary(true);
                }}
                className="w-8 h-8 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:border-yellow-500 rounded-lg flex items-center justify-center transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Event Calendar', icon: Calendar, description: 'Upcoming events and meetings' },
                { name: 'Study Groups', icon: Users, description: 'Active study sessions' },
                { name: 'File Sharing', icon: Archive, description: 'Shared resources' },
                { name: 'Member Directory', icon: User, description: 'Community members' },
                { name: 'Polls & Voting', icon: Activity, description: 'Community decisions' },
                { name: 'Announcements', icon: Bell, description: 'Important updates' }
              ].map((tool, index) => (
                <div key={tool.name} className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <tool.icon className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium text-sm">{tool.name}</span>
                  </div>
                  <p className="text-xs text-gray-400">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: '04-Spaces System/Complete Spaces System',
  component: CompleteSpacesSystem,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        component: '🏠 **HIVE Spaces System Kitchen Sink** - Complete frontend implementation with full page navigation, all flows, and comprehensive demos. This is the definitive kitchen sink showcasing the entire HIVE Spaces System including Main Explore Page, Category Browse Pages, Space Preview, Individual Space Boards, and all modals with proper navigation between views.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    viewMode: {
      control: { type: 'select' },
      options: ['explore', 'category', 'space-preview', 'space-board', 'discovery', 'management', 'creation'],
      description: 'Current view mode for the system',
    },
    userRole: {
      control: { type: 'select' },
      options: ['student', 'leader', 'admin'],
      description: 'User role affecting available actions and interface',
    },
    showDebugLabels: {
      control: { type: 'boolean' },
      description: 'Show debug overlay with current state information',
    },
  },
} satisfies Meta<typeof CompleteSpacesSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

// KITCHEN SINK STORIES - Complete Frontend Flows

export const MainExplorePage: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'explore',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '🏠 **Main Explore Page** - Primary landing page with 4 core categories (University, Residential, Greek, Student) plus personalized recommendations. This is the main entry point for community discovery.',
      },
    },
  },
};

export const CategoryBrowsePage: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'category',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '📂 **Category Browse Page** - Dedicated browse experience for a specific category with tailored filtering and space layouts.',
      },
    },
  },
};

export const UniversitySpacesPage: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'category',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '📂 **Category Browse Page** - Dedicated browse experience for a specific category with tailored filtering and space layouts.',
      },
    },
  },
};

export const SpacePreviewFlow: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'space-preview',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '👁️ **Space Preview Flow** - Full-page preview for inactive spaces with activation request functionality.',
      },
    },
  },
};

export const IndividualSpaceBoard: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'space-board',
    userRole: 'leader',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '🏗️ **Individual Space Board** - 60/40 split layout with Post Board and Tool Grid for active spaces.',
      },
    },
  },
};

export const KitchenSinkWithDebug: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'explore',
    userRole: 'leader',
    showDebugLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: '🔧 **Kitchen Sink with Debug** - Complete system with debug overlay showing current view, navigation state, and all system variables for development.',
      },
    },
  },
};
