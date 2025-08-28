'use client';

import React, { useState } from 'react';
import { motion } from '../framer-motion-proxy';
import { 
  MessageSquare, 
  Timer, 
  Calculator, 
  BarChart3, 
  Download, 
  Star, 
  Eye,
  Search,
  Filter,
  Plus,
  Zap,
  Code,
  Palette,
  Users,
  TrendingUp,
  Play,
  Settings,
  Share,
  Bookmark,
  Grid,
  List,
  ChevronDown,
  ArrowRight,
  Loader2,
  AlertCircle,
  Heart,
  Globe,
  Lock,
  Clock,
  Tag,
  Activity,
  User,
  Calendar
} from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveInput } from '../hive-input';

// Enhanced Tools System component for production integration
export interface CompleteHIVEToolsSystemProps {
  activeTab?: 'marketplace' | 'personal' | 'hivelab';
  userRole?: 'student' | 'leader' | 'admin';
  selectedCategory?: string;
  searchQuery?: string;
  viewMode?: 'grid' | 'list';
  onTabChange?: (tab: 'marketplace' | 'personal' | 'hivelab') => void;
  onToolInstall?: (toolId: string) => void;
  onToolAction?: (toolId: string, action: string) => void;
  onToolPreview?: (toolId: string) => void;
  onCreateTool?: (mode: 'visual' | 'template' | 'wizard') => void;
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  onToolFavorite?: (toolId: string) => void;
  onToolShare?: (toolId: string) => void;
  marketplaceTools?: any[];
  personalTools?: any[];
  loading?: boolean;
  error?: string | null;
  showDebugLabels?: boolean;
}

export const CompleteHIVEToolsSystem: React.FC<CompleteHIVEToolsSystemProps> = ({
  activeTab = 'marketplace',
  userRole = 'student',
  selectedCategory = 'all',
  searchQuery = '',
  viewMode = 'grid',
  onTabChange,
  onToolInstall,
  onToolAction,
  onToolPreview,
  onCreateTool,
  onSearchChange,
  onCategoryChange,
  onViewModeChange,
  onToolFavorite,
  onToolShare,
  marketplaceTools = [],
  personalTools = [],
  loading = false,
  error = null,
  showDebugLabels = false
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  const [internalSearchQuery, setInternalSearchQuery] = useState(searchQuery);
  const [internalCategory, setInternalCategory] = useState(selectedCategory);
  const [internalViewMode, setInternalViewMode] = useState(viewMode);
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteTools, setFavoriteTools] = useState<string[]>([]);

  const handleTabChange = (tab: 'marketplace' | 'personal' | 'hivelab') => {
    setInternalActiveTab(tab);
    onTabChange?.(tab);
  };

  const handleSearchChange = (query: string) => {
    setInternalSearchQuery(query);
    onSearchChange?.(query);
  };

  const handleCategoryChange = (category: string) => {
    setInternalCategory(category);
    onCategoryChange?.(category);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setInternalViewMode(mode);
    onViewModeChange?.(mode);
  };

  const handleFavoriteToggle = (toolId: string) => {
    setFavoriteTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
    onToolFavorite?.(toolId);
  };

  const toolCategories = [
    { id: 'all', name: 'All Tools', count: 145 },
    { id: 'productivity', name: 'Productivity', count: 42 },
    { id: 'academic', name: 'Academic', count: 38 },
    { id: 'social', name: 'Social', count: 25 },
    { id: 'utilities', name: 'Utilities', count: 18 },
    { id: 'campus', name: 'Campus Life', count: 22 }
  ];

  const mockMarketplaceTools = [
    {
      id: 'poll-maker',
      name: 'Interactive Poll Maker',
      description: 'Create engaging polls and surveys for spaces, events, and classroom discussions with real-time results',
      category: 'social',
      icon: MessageSquare,
      color: '#3B82F6',
      downloads: 1247,
      rating: 4.8,
      ratingCount: 89,
      creator: 'HIVE Team',
      creatorVerified: true,
      isInstalled: true,
      isPremium: false,
      isFeatured: true,
      lastUpdated: '2 days ago',
      tags: ['polls', 'engagement', 'surveys', 'real-time'],
      compatibility: ['web', 'mobile'],
      screenshots: 3
    },
    {
      id: 'study-timer',
      name: 'Focus Study Timer',
      description: 'Advanced Pomodoro timer with focus tracking, break reminders, and productivity analytics for better study habits',
      category: 'productivity',
      icon: Timer,
      color: '#FFD700',
      downloads: 2892,
      rating: 4.6,
      ratingCount: 167,
      creator: 'Focus Labs',
      creatorVerified: false,
      isInstalled: false,
      isPremium: false,
      isFeatured: false,
      lastUpdated: '1 week ago',
      tags: ['pomodoro', 'focus', 'productivity', 'timer'],
      compatibility: ['web', 'mobile', 'desktop'],
      screenshots: 5
    },
    {
      id: 'grade-calculator',
      name: 'Smart GPA Calculator',
      description: 'Calculate GPA, track academic progress across semesters, and predict graduation outcomes with grade forecasting',
      category: 'academic',
      icon: Calculator,
      color: '#F59E0B',
      downloads: 3156,
      rating: 4.9,
      ratingCount: 234,
      creator: 'Academic Tools',
      creatorVerified: true,
      isInstalled: true,
      isPremium: false,
      isFeatured: true,
      lastUpdated: '3 days ago',
      tags: ['gpa', 'grades', 'academic', 'tracking'],
      compatibility: ['web', 'mobile'],
      screenshots: 4
    },
    {
      id: 'analytics-dashboard',
      name: 'Space Analytics Pro',
      description: 'Comprehensive analytics dashboard for tracking space engagement, member activity, and community growth metrics',
      category: 'productivity',
      icon: BarChart3,
      color: '#10B981',
      downloads: 1543,
      rating: 4.7,
      ratingCount: 98,
      creator: 'HIVE Team',
      creatorVerified: true,
      isInstalled: false,
      isPremium: true,
      isFeatured: false,
      lastUpdated: '5 days ago',
      tags: ['analytics', 'dashboard', 'metrics', 'engagement'],
      compatibility: ['web'],
      screenshots: 6
    },
    {
      id: 'meal-planner',
      name: 'Campus Meal Planner',
      description: 'Plan meals with dining hall menus, track nutrition, and coordinate group dining with friends and floor mates',
      category: 'campus',
      icon: Users,
      color: '#EC4899',
      downloads: 967,
      rating: 4.4,
      ratingCount: 78,
      creator: 'Campus Life',
      creatorVerified: false,
      isInstalled: false,
      isPremium: false,
      isFeatured: false,
      lastUpdated: '1 week ago',
      tags: ['dining', 'nutrition', 'campus', 'social'],
      compatibility: ['web', 'mobile'],
      screenshots: 4
    },
    {
      id: 'schedule-optimizer',
      name: 'Smart Schedule Builder',
      description: 'AI-powered course scheduling that optimizes your timetable for minimal conflicts and maximum efficiency',
      category: 'academic',
      icon: Calendar,
      color: '#8B5CF6',
      downloads: 2234,
      rating: 4.8,
      ratingCount: 156,
      creator: 'Smart Campus',
      creatorVerified: true,
      isInstalled: false,
      isPremium: true,
      isFeatured: true,
      lastUpdated: '1 day ago',
      tags: ['scheduling', 'ai', 'optimization', 'courses'],
      compatibility: ['web', 'mobile'],
      screenshots: 5
    }
  ];

  const tools = marketplaceTools.length > 0 ? marketplaceTools : mockMarketplaceTools;
  const installed = personalTools.length > 0 ? personalTools : tools.filter(t => t.isInstalled);
  
  // Filter tools based on search and category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(internalSearchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(internalSearchQuery.toLowerCase()) ||
                         tool.tags?.some(tag => tag.toLowerCase().includes(internalSearchQuery.toLowerCase()));
    const matchesCategory = internalCategory === 'all' || tool.category === internalCategory;
    return matchesSearch && matchesCategory;
  });
  
  const featuredTools = tools.filter(tool => tool.isFeatured);
  const trendingTools = tools.sort((a, b) => b.downloads - a.downloads).slice(0, 4);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Loader2 className="h-8 w-8 animate-spin text-[#FFD700] mx-auto mb-4" />
              <p className="text-gray-300">Loading HIVE tools...</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <HiveCard className="p-6 text-center max-w-md">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Tools Error</h2>
              <p className="text-gray-400 mb-4">{error}</p>
              <HiveButton onClick={() => window.location.reload()}>
                Try Again
              </HiveButton>
            </HiveCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HiveCard className="p-8 text-center bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700">
            <h1 className="text-3xl font-bold text-white mb-4">
              HIVE Tools Ecosystem
            </h1>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Discover powerful tools, manage your productivity stack, and build custom solutions with HiveLab. Transform how you work and collaborate on campus.
            </p>
            
            {/* Create Tool Actions */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <HiveButton
                variant="secondary"
                onClick={() => onCreateTool?.('template')}
                className="text-gray-300 border-gray-600 hover:border-[#FFD700] hover:text-[#FFD700]"
              >
                <Code className="w-4 h-4 mr-2" />
                Use Template
              </HiveButton>
              <HiveButton
                variant="secondary"
                onClick={() => onCreateTool?.('wizard')}
                className="text-gray-300 border-gray-600 hover:border-[#FFD700] hover:text-[#FFD700]"
              >
                <Zap className="w-4 h-4 mr-2" />
                Quick Builder
              </HiveButton>
              <HiveButton
                onClick={() => onCreateTool?.('visual')}
                className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Tool
              </HiveButton>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">150+</div>
                <div className="text-sm text-gray-400">Available Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">25K+</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">4.7★</div>
                <div className="text-sm text-gray-400">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">24/7</div>
                <div className="text-sm text-gray-400">Available</div>
              </div>
            </div>
          </HiveCard>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HiveCard className="p-1">
            <div className="flex items-center bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => handleTabChange('marketplace')}
                className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors ${
                  internalActiveTab === 'marketplace'
                    ? 'bg-[#FFD700] text-black font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4 mr-2 inline" />
                Marketplace
              </button>
              <button
                onClick={() => handleTabChange('personal')}
                className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors ${
                  internalActiveTab === 'personal'
                    ? 'bg-[#FFD700] text-black font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <User className="w-4 h-4 mr-2 inline" />
                Personal Tools
              </button>
              <button
                onClick={() => handleTabChange('hivelab')}
                className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors ${
                  internalActiveTab === 'hivelab'
                    ? 'bg-[#FFD700] text-black font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4 mr-2 inline" />
                HiveLab
              </button>
            </div>
          </HiveCard>
        </motion.div>

        {/* Marketplace Tab */}
        {internalActiveTab === 'marketplace' && (
          <div className="space-y-6">
            
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HiveCard className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <HiveInput
                        placeholder="Search tools, creators, or tags..."
                        value={internalSearchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <HiveButton
                    variant="secondary"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </HiveButton>
                  <div className="flex bg-gray-800 rounded-lg p-1">
                    <button
                      onClick={() => handleViewModeChange('grid')}
                      className={`p-2 rounded ${internalViewMode === 'grid' ? 'bg-[#FFD700] text-black' : 'text-gray-400'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleViewModeChange('list')}
                      className={`p-2 rounded ${internalViewMode === 'list' ? 'bg-[#FFD700] text-black' : 'text-gray-400'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {toolCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        internalCategory === category.id
                          ? 'bg-[#FFD700] text-black'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-700"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                        <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                          <option value="all">All Ratings</option>
                          <option value="4+">4+ Stars</option>
                          <option value="3+">3+ Stars</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                        <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                          <option value="all">All Tools</option>
                          <option value="free">Free Only</option>
                          <option value="premium">Premium Only</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Updated</label>
                        <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                          <option value="all">Any Time</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Creator</label>
                        <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                          <option value="all">All Creators</option>
                          <option value="verified">Verified Only</option>
                          <option value="community">Community</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </HiveCard>
            </motion.div>

            {/* Featured Tools */}
            {featuredTools.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <HiveCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">Featured Tools</h2>
                    <HiveButton variant="secondary" size="sm">
                      View All <ArrowRight className="w-4 h-4 ml-1" />
                    </HiveButton>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredTools.slice(0, 3).map((tool) => {
                      const IconComponent = tool.icon;
                      const isFavorited = favoriteTools.includes(tool.id);
                      
                      return (
                        <div key={tool.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: tool.color }}
                              >
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{tool.name}</h3>
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-gray-400">{tool.creator}</span>
                                  {tool.creatorVerified && (
                                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleFavoriteToggle(tool.id)}
                                className={`p-1 rounded transition-colors ${
                                  isFavorited ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                              </button>
                              <button
                                onClick={() => onToolShare?.(tool.id)}
                                className="p-1 text-gray-400 hover:text-white transition-colors"
                              >
                                <Share className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{tool.description}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span>{tool.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                <span>{tool.downloads.toLocaleString()}</span>
                              </div>
                            </div>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {tool.lastUpdated}
                            </span>
                          </div>
                          
                          <div className="flex gap-2">
                            {!tool.isInstalled ? (
                              <HiveButton
                                size="sm"
                                onClick={() => onToolInstall?.(tool.id)}
                                className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFE255]"
                              >
                                {tool.isPremium ? 'Get Premium' : 'Install'}
                              </HiveButton>
                            ) : (
                              <HiveButton
                                size="sm"
                                onClick={() => onToolAction?.(tool.id, 'run')}
                                className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFE255]"
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Run
                              </HiveButton>
                            )}
                            <HiveButton
                              size="sm"
                              variant="secondary"
                              onClick={() => onToolPreview?.(tool.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </HiveButton>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </HiveCard>
              </motion.div>
            )}

            {/* All Tools Grid/List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HiveCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    {internalCategory === 'all' ? 'All Tools' : `${toolCategories.find(c => c.id === internalCategory)?.name} Tools`}
                    <span className="text-sm text-gray-400 font-normal ml-2">({filteredTools.length})</span>
                  </h2>
                  <div className="text-sm text-gray-400">
                    {internalSearchQuery && (
                      <span>Results for "{internalSearchQuery}"</span>
                    )}
                  </div>
                </div>
                
                {internalViewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map((tool) => {
                      const IconComponent = tool.icon;
                      const isFavorited = favoriteTools.includes(tool.id);
                      
                      return (
                        <div key={tool.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: tool.color }}
                              >
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{tool.name}</h3>
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-gray-400">{tool.creator}</span>
                                  {tool.creatorVerified && (
                                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {tool.isInstalled && (
                                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                                  Installed
                                </span>
                              )}
                              {tool.isPremium && (
                                <Lock className="w-3 h-3 text-yellow-400" />
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{tool.description}</p>
                          
                          {/* Tags */}
                          <div className="flex items-center gap-1 mb-3 flex-wrap">
                            {tool.tags?.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span>{tool.rating} ({tool.ratingCount})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                <span>{tool.downloads.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {!tool.isInstalled ? (
                              <HiveButton
                                size="sm"
                                onClick={() => onToolInstall?.(tool.id)}
                                className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFE255]"
                              >
                                {tool.isPremium ? 'Get Premium' : 'Install'}
                              </HiveButton>
                            ) : (
                              <HiveButton
                                size="sm"
                                onClick={() => onToolAction?.(tool.id, 'run')}
                                className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFE255]"
                              >
                                Run
                              </HiveButton>
                            )}
                            <HiveButton
                              size="sm"
                              variant="secondary"
                              onClick={() => onToolPreview?.(tool.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </HiveButton>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTools.map((tool) => {
                      const IconComponent = tool.icon;
                      const isFavorited = favoriteTools.includes(tool.id);
                      
                      return (
                        <div key={tool.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: tool.color }}
                              >
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium text-white">{tool.name}</h3>
                                  {tool.creatorVerified && (
                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  )}
                                  {tool.isInstalled && (
                                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Installed</span>
                                  )}
                                  {tool.isPremium && (
                                    <Lock className="w-4 h-4 text-yellow-400" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-300 mb-1">{tool.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                  <span>{tool.creator}</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400" />
                                    <span>{tool.rating} ({tool.ratingCount})</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Download className="w-3 h-3" />
                                    <span>{tool.downloads.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!tool.isInstalled ? (
                                <HiveButton
                                  size="sm"
                                  onClick={() => onToolInstall?.(tool.id)}
                                  className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                                >
                                  {tool.isPremium ? 'Get Premium' : 'Install'}
                                </HiveButton>
                              ) : (
                                <HiveButton
                                  size="sm"
                                  onClick={() => onToolAction?.(tool.id, 'run')}
                                  className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                                >
                                  Run
                                </HiveButton>
                              )}
                              <HiveButton
                                size="sm"
                                variant="secondary"
                                onClick={() => onToolPreview?.(tool.id)}
                              >
                                <Eye className="w-4 h-4" />
                              </HiveButton>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </HiveCard>
            </motion.div>
          </div>
        )}

        {/* Personal Tools Tab */}
        {internalActiveTab === 'personal' && (
          <div className="space-y-6">
            
            {/* Personal Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HiveCard className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{installed.length}</div>
                    <div className="text-sm text-gray-400">Installed Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-sm text-gray-400">Daily Uses</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{favoriteTools.length}</div>
                    <div className="text-sm text-gray-400">Favorites</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">87%</div>
                    <div className="text-sm text-gray-400">Productivity</div>
                  </div>
                </div>
              </HiveCard>
            </motion.div>

            {installed.length > 0 ? (
              <>
                {/* Quick Access */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <HiveCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-white">Quick Access</h2>
                      <HiveButton variant="secondary" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Customize
                      </HiveButton>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {installed.slice(0, 4).map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                          <button
                            key={tool.id}
                            onClick={() => onToolAction?.(tool.id, 'run')}
                            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group text-left"
                          >
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                              style={{ backgroundColor: tool.color }}
                            >
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-medium text-white text-sm mb-1">{tool.name}</h3>
                            <p className="text-xs text-gray-400">Last used recently</p>
                          </button>
                        );
                      })}
                    </div>
                  </HiveCard>
                </motion.div>

                {/* All Personal Tools */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <HiveCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-white">My Tools</h2>
                      <div className="flex items-center gap-2">
                        <HiveButton variant="secondary" size="sm">
                          <Share className="w-4 h-4 mr-2" />
                          Export List
                        </HiveButton>
                        <HiveButton 
                          size="sm"
                          onClick={() => handleTabChange('marketplace')}
                          className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add More
                        </HiveButton>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {installed.map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                          <div key={tool.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: tool.color }}
                                >
                                  <IconComponent className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium text-white">{tool.name}</h3>
                                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Installed</span>
                                  </div>
                                  <p className="text-sm text-gray-300 mb-1">{tool.description}</p>
                                  <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span>Last used: 2 hours ago</span>
                                    <span>Version: 1.2.0</span>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 text-yellow-400" />
                                      <span>{tool.rating}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <HiveButton
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => onToolAction?.(tool.id, 'settings')}
                                >
                                  <Settings className="w-4 h-4" />
                                </HiveButton>
                                <HiveButton
                                  size="sm"
                                  onClick={() => onToolAction?.(tool.id, 'run')}
                                  className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                                >
                                  <Play className="w-4 h-4 mr-1" />
                                  Run
                                </HiveButton>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </HiveCard>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <HiveCard className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Download className="w-8 h-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    No Tools Installed Yet
                  </h2>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Start building your personal productivity suite by installing tools from the marketplace. 
                    Tools you install will appear here for easy access.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <HiveButton
                      onClick={() => handleTabChange('marketplace')}
                      className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Browse Marketplace
                    </HiveButton>
                    <HiveButton
                      variant="secondary"
                      onClick={() => handleTabChange('hivelab')}
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      Create Your Own
                    </HiveButton>
                  </div>
                </HiveCard>
              </motion.div>
            )}
          </div>
        )}

        {/* HiveLab Tab */}
        {internalActiveTab === 'hivelab' && (
          <div className="space-y-6">
            
            {/* HiveLab Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HiveCard className="p-8 text-center bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-700/30">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFE255] rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-10 h-10 text-black" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Welcome to HiveLab
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Your creative workspace for building custom campus tools. Design, develop, and deploy solutions that solve real problems for your community. No coding required.
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <HiveButton
                    onClick={() => onCreateTool?.('visual')}
                    className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Start Building
                  </HiveButton>
                  <HiveButton
                    variant="secondary"
                    onClick={() => onCreateTool?.('template')}
                    className="border-gray-600 text-gray-300 hover:border-[#FFD700] hover:text-[#FFD700]"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Browse Templates
                  </HiveButton>
                </div>

                {/* Builder Stats */}
                <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                  <div className="text-center">
                    <div className="text-xl font-bold text-[#FFD700]">12</div>
                    <div className="text-sm text-gray-400">Tools Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-[#FFD700]">156</div>
                    <div className="text-sm text-gray-400">Community Uses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-[#FFD700]">4.9★</div>
                    <div className="text-sm text-gray-400">Avg Rating</div>
                  </div>
                </div>
              </HiveCard>
            </motion.div>
            
            {/* Creation Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <HiveCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Choose Your Creation Method</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Quick Builder */}
                  <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors group cursor-pointer">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Quick Builder</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Fast tool creation with guided steps and smart defaults. Perfect for simple utilities and forms.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>5-10 minutes</span>
                      </div>
                      <div className="text-xs text-gray-400">Beginner Friendly</div>
                    </div>
                    <HiveButton 
                      size="sm"
                      onClick={() => onCreateTool?.('wizard')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Start Wizard
                    </HiveButton>
                  </div>
                  
                  {/* Template Builder */}
                  <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors group cursor-pointer">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Template Builder</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Start with pre-built templates for common campus tools. Customize to fit your needs.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>10-20 minutes</span>
                      </div>
                      <div className="text-xs text-gray-400">15+ Templates</div>
                    </div>
                    <HiveButton 
                      size="sm"
                      onClick={() => onCreateTool?.('template')}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Browse Templates
                    </HiveButton>
                  </div>
                  
                  {/* Visual Builder */}
                  <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors group cursor-pointer border-2 border-[#FFD700]/30">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFE255] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Palette className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Visual Builder</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Full drag-and-drop interface for complex tools. Complete creative control with advanced features.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>30+ minutes</span>
                      </div>
                      <div className="text-xs text-[#FFD700]">Recommended</div>
                    </div>
                    <HiveButton 
                      size="sm"
                      onClick={() => onCreateTool?.('visual')}
                      className="w-full bg-[#FFD700] text-black hover:bg-[#FFE255]"
                    >
                      Open Builder
                    </HiveButton>
                  </div>
                </div>
              </HiveCard>
            </motion.div>

            {/* Popular Templates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HiveCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Popular Templates</h3>
                  <HiveButton variant="secondary" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </HiveButton>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Poll & Survey Tool</h4>
                        <p className="text-xs text-gray-400">Most Popular</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">Create interactive polls for classes and events</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>127 uses</span>
                      <span>★ 4.8</span>
                    </div>
                    <HiveButton size="sm" className="w-full" onClick={() => onCreateTool?.('template')}>
                      Use Template
                    </HiveButton>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Event Coordinator</h4>
                        <p className="text-xs text-gray-400">New</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">Organize campus events and track RSVPs</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>89 uses</span>
                      <span>★ 4.6</span>
                    </div>
                    <HiveButton size="sm" className="w-full" onClick={() => onCreateTool?.('template')}>
                      Use Template
                    </HiveButton>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Grade Tracker</h4>
                        <p className="text-xs text-gray-400">Updated</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">Track assignments and calculate final grades</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>203 uses</span>
                      <span>★ 4.9</span>
                    </div>
                    <HiveButton size="sm" className="w-full" onClick={() => onCreateTool?.('template')}>
                      Use Template
                    </HiveButton>
                  </div>
                </div>
              </HiveCard>
            </motion.div>

            {/* Getting Started Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <HiveCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Getting Started with HiveLab</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#FFD700] text-black rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Choose Your Approach
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Quick Builder for simple tools (5-10 min)</li>
                      <li>• Templates for common use cases (10-20 min)</li>
                      <li>• Visual Builder for custom solutions (30+ min)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#FFD700] text-black rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Design & Build
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Drag-and-drop interface</li>
                      <li>• Pre-built components and widgets</li>
                      <li>• Real-time preview and testing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#FFD700] text-black rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Test & Refine
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Preview with sample data</li>
                      <li>• Share with friends for feedback</li>
                      <li>• Iterate based on user testing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#FFD700] text-black rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      Deploy & Share
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• One-click deployment to HIVE</li>
                      <li>• Share with spaces and communities</li>
                      <li>• Track usage and gather feedback</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                  <p className="text-gray-300 mb-4">
                    Ready to build something amazing for your campus community?
                  </p>
                  <HiveButton
                    onClick={() => onCreateTool?.('visual')}
                    className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start Your First Tool
                  </HiveButton>
                </div>
              </HiveCard>
            </motion.div>
          </div>
        )}

        {/* Debug Labels */}
        {showDebugLabels && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <HiveCard className="p-4 bg-gray-800 border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Debug Information</h3>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Active Tab: {internalActiveTab}</div>
                <div>User Role: {userRole}</div>
                <div>Search Query: {internalSearchQuery || 'none'}</div>
                <div>Selected Category: {internalCategory}</div>
                <div>View Mode: {internalViewMode}</div>
                <div>Total Tools: {tools.length}</div>
                <div>Filtered Tools: {filteredTools.length}</div>
                <div>Personal Tools: {installed.length}</div>
                <div>Favorite Tools: {favoriteTools.length}</div>
                <div>Featured Tools: {featuredTools.length}</div>
                <div>Show Filters: {showFilters ? 'yes' : 'no'}</div>
              </div>
            </HiveCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};