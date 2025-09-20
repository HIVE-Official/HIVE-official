'use client';

import React, { useState } from 'react';
import { motion } from '../framer-motion-proxy';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Users, 
  TrendingUp, 
  MapPin, 
  Star,
  Plus,
  ArrowRight,
  Loader2,
  AlertCircle,
  ChevronDown,
  Eye,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveInput } from '../hive-input';
import { CategoryGridOrganism, SPACE_CATEGORIES } from './category-grid-organism';

// Enhanced Spaces System component for production integration
export interface CompleteHIVESpacesSystemProps {
  viewMode?: 'explore' | 'category' | 'space-preview' | 'space-board' | 'member-directory';
  userRole?: 'student' | 'leader' | 'admin';
  categoryType?: 'university' | 'residential' | 'greek' | 'student' | 'all';
  showDebugLabels?: boolean;
  onNavigate?: (view: string, data?: any) => void;
  spacesData?: any;
  loading?: boolean;
  error?: string | null
}

export const CompleteHIVESpacesSystem: React.FC<CompleteHIVESpacesSystemProps> = ({
  viewMode = 'explore',
  userRole = 'student',
  categoryType,
  showDebugLabels = false,
  onNavigate,
  spacesData,
  loading = false,
  error = null
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

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
              <p className="text-gray-300">Loading HIVE spaces...</p>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <HiveCard className="p-6 text-center max-w-md">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Spaces Error</h2>
              <p className="text-gray-400 mb-4">{error}</p>
              <HiveButton onClick={() => window.location.reload()}>
                Try Again
              </HiveButton>
            </HiveCard>
          </div>
        </div>
      </div>
    )
  }

  const mockFeaturedSpaces = [
    {
      id: '1',
      name: 'CS 350 - Data Structures',
      description: 'Advanced data structures and algorithms course with collaborative projects',
      memberCount: 124,
      category: 'university',
      isVerified: true,
      activityLevel: 'high',
      recentActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Governors Hall Community',
      description: 'Living community for residents of Governors Hall dormitory',
      memberCount: 89,
      category: 'residential',
      isVerified: true,
      activityLevel: 'high',
      recentActivity: '15 minutes ago'
    },
    {
      id: '3',
      name: 'UB ACM Chapter',
      description: 'Association for Computing Machinery student chapter at UB',
      memberCount: 256,
      category: 'student',
      isVerified: true,
      activityLevel: 'medium',
      recentActivity: '4 hours ago'
    }
  ];

  const mockTrendingSpaces = [
    {
      id: '4',
      name: 'Study Groups Hub',
      memberCount: 45,
      category: 'student',
      growthRate: '+32% this week'
    },
    {
      id: '5', 
      name: 'Campus Events',
      memberCount: 178,
      category: 'university',
      growthRate: '+18% this week'
    }
  ];

  // Category View
  if (viewMode === 'category' && categoryType) {
    const category = SPACE_CATEGORIES[categoryType];
    if (!category) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Category Not Found</h2>
              <p className="text-gray-400">The requested space category could not be found.</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto p-4 space-y-6">
          
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HiveCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFE255] rounded-2xl flex items-center justify-center">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{category.title}</h1>
                    <p className="text-gray-400">{category.subtitle}</p>
                  </div>
                </div>
                <HiveButton
                  variant="outline"
                  onClick={() => onNavigate?.('explore')}
                  className="text-gray-400 hover:text-white"
                >
                  ← Back to Explore
                </HiveButton>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <HiveInput
                    placeholder={`Search ${category.title.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <HiveButton
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </HiveButton>
                <div className="flex bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setLayoutMode('grid')}
                    className={`p-2 rounded ${layoutMode === 'grid' ? 'bg-[#FFD700] text-black' : 'text-gray-400'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayoutMode('list')}
                    className={`p-2 rounded ${layoutMode === 'list' ? 'bg-[#FFD700] text-black' : 'text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-700 pt-4"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Activity Level</label>
                      <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                        <option value="all">All Levels</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Member Count</label>
                      <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                        <option value="all">Any Size</option>
                        <option value="small">1-25 members</option>
                        <option value="medium">26-100 members</option>
                        <option value="large">100+ members</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Verification</label>
                      <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                        <option value="all">All Spaces</option>
                        <option value="verified">Verified Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Join Status</label>
                      <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                        <option value="all">All</option>
                        <option value="open">Open to Join</option>
                        <option value="request">Request Required</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </HiveCard>
          </motion.div>

          {/* Spaces Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {layoutMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFeaturedSpaces
                  .filter(space => !categoryType || categoryType === 'all' || space.category === categoryType)
                  .map((space) => (
                  <HiveCard key={space.id} className="p-6 hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{space.name}</h3>
                          <p className="text-sm text-gray-400">{space.memberCount} members</p>
                        </div>
                      </div>
                      {space.isVerified && (
                        <div className="bg-green-600 p-1 rounded-full">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">{space.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {space.activityLevel} activity
                      </span>
                      <span>{space.recentActivity}</span>
                    </div>
                    
                    <HiveButton
                      size="sm"
                      className="w-full bg-[#FFD700] text-black hover:bg-[#FFE255]"
                      onClick={() => onNavigate?.('space-preview', { spaceId: space.id }}
                    >
                      View Space
                    </HiveButton>
                  </HiveCard>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {mockFeaturedSpaces
                  .filter(space => !categoryType || categoryType === 'all' || space.category === categoryType)
                  .map((space) => (
                  <HiveCard key={space.id} className="p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{space.name}</h3>
                            {space.isVerified && (
                              <Star className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{space.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-white">{space.memberCount} members</p>
                          <p className="text-xs text-gray-400">{space.recentActivity}</p>
                        </div>
                        <HiveButton
                          size="sm"
                          className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                          onClick={() => onNavigate?.('space-preview', { spaceId: space.id }}
                        >
                          View
                        </HiveButton>
                      </div>
                    </div>
                  </HiveCard>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  // Main Explore View
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HiveCard className="p-8 text-center bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700">
            <h1 className="text-3xl font-bold text-white mb-4">
              Discover Your Campus Community
            </h1>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Connect with spaces that match your interests, studies, and campus life. From academic courses to residential communities.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <HiveInput
                  placeholder="Search spaces, courses, clubs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">450+</div>
                <div className="text-sm text-gray-400">Active Spaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">12K+</div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">98%</div>
                <div className="text-sm text-gray-400">Active Daily</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700]">24/7</div>
                <div className="text-sm text-gray-400">Community</div>
              </div>
            </div>
          </HiveCard>
        </motion.div>

        {/* Space Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CategoryGridOrganism 
            onCategoryClick={(categoryId) => onNavigate?.('category', { categoryType: categoryId }}
          />
        </motion.div>

        {/* Featured Spaces */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HiveCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Featured Spaces</h2>
              <HiveButton variant="outline" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </HiveButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFeaturedSpaces.map((space) => (
                <div key={space.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{space.name}</h3>
                        <p className="text-sm text-gray-400">{space.memberCount} members</p>
                      </div>
                    </div>
                    {space.isVerified && (
                      <Star className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">{space.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{space.recentActivity}</span>
                    <HiveButton
                      size="sm"
                      onClick={() => onNavigate?.('space-preview', { spaceId: space.id }}
                      className="bg-[#FFD700] text-black hover:bg-[#FFE255]"
                    >
                      Join
                    </HiveButton>
                  </div>
                </div>
              ))}
            </div>
          </HiveCard>
        </motion.div>

        {/* Trending Spaces */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <HiveCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FFD700]" />
                Trending This Week
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTrendingSpaces.map((space, index) => (
                <div key={space.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#FFD700] text-black rounded flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{space.name}</h4>
                      <p className="text-sm text-gray-400">{space.memberCount} members</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-400">{space.growthRate}</p>
                    <HiveButton 
                      size="sm" 
                      variant="outline"
                      onClick={() => onNavigate?.('space-preview', { spaceId: space.id }}
                    >
                      View
                    </HiveButton>
                  </div>
                </div>
              ))}
            </div>
          </HiveCard>
        </motion.div>

        {/* Debug Info */}
        {showDebugLabels && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HiveCard className="p-4 bg-gray-800 border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Debug Information</h3>
              <div className="text-xs text-gray-400 space-y-1">
                <div>View Mode: {viewMode}</div>
                <div>User Role: {userRole}</div>
                <div>Category Type: {categoryType || 'none'}</div>
                <div>Search Query: {searchQuery || 'none'}</div>
                <div>Layout Mode: {layoutMode}</div>
              </div>
            </HiveCard>
          </motion.div>
        )}
      </div>
    </div>
  )
};