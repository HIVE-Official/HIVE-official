"use client";

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system';
import { HiveSpaceCard } from '../spaces/hive-space-card';
import { HiveCommandPalette } from './hive-command-palette';
import { type Space, type SpaceType } from '@hive/core';
import { 
  Search,
  Filter,
  Grid,
  List,
  TrendingUp,
  Clock,
  Users,
  Star,
  BookOpen,
  Home,
  GraduationCap,
  Building,
  Zap,
  SortAsc,
  SortDesc,
  Eye,
  Plus,
  ArrowRight,
  Sparkles,
  Target
} from 'lucide-react';

// HIVE Space Directory - Comprehensive Space Discovery System
// Advanced filtering, search, and organization for the HIVE ecosystem

const hiveSpaceDirectoryVariants = cva(
  "relative w-full min-h-screen bg-[var(--hive-background-primary)]/5 backdrop-blur-sm",
  {
    variants: {
      layout: {
        grid: "",
        list: "",
        masonry: "",
      }
    },
    defaultVariants: {
      layout: "grid",
    },
  }
);

// Filter configurations
const spaceTypeFilters = [
  { 
    type: 'all' as const, 
    label: 'All Spaces', 
    icon: Target, 
    color: 'text-[var(--hive-text-primary)]',
    count: 0 
  },
  { 
    type: 'academic' as const, 
    label: 'Academic', 
    icon: GraduationCap, 
    color: 'text-blue-400',
    count: 0 
  },
  { 
    type: 'social' as const, 
    label: 'Social', 
    icon: Users, 
    color: 'text-green-400',
    count: 0 
  },
  { 
    type: 'residential' as const, 
    label: 'Residential', 
    icon: Home, 
    color: 'text-purple-400',
    count: 0 
  },
  { 
    type: 'administrative' as const, 
    label: 'Administrative', 
    icon: Building, 
    color: 'text-gray-400',
    count: 0 
  },
];

const sortOptions = [
  { key: 'trending' as const, label: 'Trending', icon: TrendingUp },
  { key: 'newest' as const, label: 'Newest', icon: Sparkles },
  { key: 'members' as const, label: 'Most Members', icon: Users },
  { key: 'activity' as const, label: 'Most Active', icon: Zap },
  { key: 'alphabetical' as const, label: 'A-Z', icon: SortAsc },
];

export interface HiveSpaceDirectoryProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveSpaceDirectoryVariants> {
  spaces: Space[];
  isLoading?: boolean;
  onSpaceClick?: (space: Space) => void;
  onSpaceJoin?: (space: Space) => void;
  onSpaceLeave?: (space: Space) => void;
  onCreateSpace?: () => void;
  joinedSpaceIds?: string[];
  trendingSpaceIds?: string[];
  searchPlaceholder?: string;
  showCreateButton?: boolean;
  showTrendingSection?: boolean;
  showFilters?: boolean;
  showLayoutToggle?: boolean;
  defaultSort?: string;
  maxSpacesPerRow?: number;
  enableVirtualization?: boolean
}

export const HiveSpaceDirectory = React.forwardRef<HTMLDivElement, HiveSpaceDirectoryProps>(
  ({ 
    className,
    layout,
    spaces = [],
    isLoading = false,
    onSpaceClick,
    onSpaceJoin,
    onSpaceLeave,
    onCreateSpace,
    joinedSpaceIds = [],
    trendingSpaceIds = [],
    searchPlaceholder = "Search spaces...",
    showCreateButton = true,
    showTrendingSection = true,
    showFilters = true,
    showLayoutToggle = true,
    defaultSort = 'trending',
    maxSpacesPerRow = 4,
    enableVirtualization = false,
    ...props 
  }, ref) => {
    
    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<'all' | 'academic' | 'social' | 'residential' | 'administrative'>('all');
    const [sortBy, setSortBy] = useState(defaultSort);
    const [viewLayout, setViewLayout] = useState<'grid' | 'list' | 'masonry'>(layout || 'grid');
    const [showSearch, setShowSearch] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    // Calculate filter counts
    const filterCounts = useMemo(() => {
      const counts = { all: spaces.length };
      spaces.forEach(space => {
        const type = space.tags?.[0]?.type || 'academic';
        counts[type] = (counts[type] || 0) + 1
      });
      return counts
    }, [spaces]);
    
    // Enhanced filtering and sorting logic
    const filteredAndSortedSpaces = useMemo(() => {
      let filtered = spaces.filter(space => {
        // Type filter
        const typeMatch = selectedType === 'all' || space.tags?.[0]?.type === (selectedType as any);
        
        // Search filter
        const searchMatch = searchQuery === '' || 
          space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          space.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          space.tags?.some(tag => 
            tag.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tag.sub_type?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        
        return typeMatch && searchMatch
      });
      
      // Sorting logic
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'trending':
            const aTrending = trendingSpaceIds.includes(a.id) ? 1 : 0;
            const bTrending = trendingSpaceIds.includes(b.id) ? 1 : 0;
            if (aTrending !== bTrending) return bTrending - aTrending;
            return b.memberCount - a.memberCount;
          
          case 'newest':
            const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt as any);
            const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt as any);
            return bDate.getTime() - aDate.getTime();
          
          case 'members':
            return b.memberCount - a.memberCount;
          
          case 'activity':
            // Mock activity score - in real app would come from backend
            return Math.random() - 0.5;
          
          case 'alphabetical':
            return a.name.localeCompare(b.name);
          
          default:
            return 0
        }
      })};
      
      return filtered
    }, [spaces, selectedType, searchQuery, sortBy, trendingSpaceIds]);
    
    // Separate trending spaces for special section
    const trendingSpaces = useMemo(() => 
      filteredAndSortedSpaces
        .filter(space => trendingSpaceIds.includes(space.id))
        .slice(0, 5)
    , [filteredAndSortedSpaces, trendingSpaceIds]);
    
    // Handle search toggle
    const handleSearchToggle = useCallback(() => {
      setShowSearch(prev => !prev);
      if (!showSearch) {
        setTimeout(() => searchInputRef.current?.focus(), 100)
      }
    }, [showSearch]);
    
    // Handle keyboard shortcuts
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === '/' && !showSearch) {
        e.preventDefault();
        handleSearchToggle()
      }
      if (e.key === 'Escape' && showSearch) {
        setShowSearch(false);
        setSearchQuery('')
      }
    }, [showSearch, handleSearchToggle]);
    
    return (
      <div
        ref={ref}
        className={cn(hiveSpaceDirectoryVariants({ layout: viewLayout, className }))}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        {...props}
      >
        {/* Header Section */}
        <div className="sticky top-0 z-30 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Title and Actions */}
            <div className="flex items-center justify-between mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: motionDurations.smooth }}
              >
                <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-2">Spaces</h1>
                <p className="text-gray-400">
                  Discover and join {spaces.length} campus communities
                </p>
              </motion.div>
              
              <div className="flex items-center gap-3">
                {/* Search Toggle */}
                <motion.button
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200",
                    showSearch 
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20"
                  )}
                  onClick={handleSearchToggle}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm">Search</span>
                  <kbd className="px-1.5 py-0.5 text-xs bg-[var(--hive-text-primary)]/10 rounded border border-white/20">
                    /
                  </kbd>
                </motion.button>
                
                {/* Layout Toggle */}
                {showLayoutToggle && (
                  <div className="flex bg-[var(--hive-background-primary)]/20 rounded-xl border border-white/10 p-1">
                    {[
                      { key: 'grid', icon: Grid },
                      { key: 'list', icon: List }
                    ].map(map}) => (
                      <motion.button
                        key={key}
                        className={cn(
                          "p-2 rounded-lg transition-all duration-200",
                          viewLayout === key
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "text-gray-400 hover:text-[var(--hive-text-primary)]"
                        )}
                        onClick={() => setViewLayout(key as 'grid' | 'list' | 'masonry')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.button>
                    ))}
                  </div>
                )}
                
                {/* Create Space Button */}
                {showCreateButton && (
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200"
                    onClick={onCreateSpace}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Create Space</span>
                  </motion.button>
                )}
              </div>
            </div>
            
            {/* Search Bar */}
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: motionDurations.smooth }}
                >
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/10 rounded-xl text-[var(--hive-text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/30 transition-all duration-200"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Filters and Sort */}
            {showFilters && (
              <div className="flex items-center justify-between">
                {/* Type Filters */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  {spaceTypeFilters.map((filter, index) => {
                    const Icon = filter.icon;
                    const count = filterCounts[filter.type] || 0;
                    const isActive = selectedType === filter.type;
                    
                    return (
                      <motion.button
                        key={filter.type}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap",
                          isActive
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20 hover:text-[var(--hive-text-primary)]"
                        )}
                        onClick={() => setSelectedType(filter.type)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={cn("w-4 h-4", isActive ? "text-yellow-400" : filter.color)} />
                        <span>{filter.label}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs",
                          isActive 
                            ? "bg-yellow-500/30 text-yellow-300"
                            : "bg-[var(--hive-text-primary)]/10 text-gray-500"
                        )}>
                          {count}
                        </span>
                      </motion.button>
                    )
          })}
                </div>
                
                {/* Sort Options */}
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm text-gray-400">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[var(--hive-background-primary)]/20 text-[var(--hive-text-primary)] border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  >
                    {sortOptions.map(option => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Trending Section */}
          {showTrendingSection && trendingSpaces.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">Trending Spaces</h2>
                </div>
                <div className="h-px bg-gradient-to-r from-yellow-500/30 to-transparent flex-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {trendingSpaces.map((space, index) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <HiveSpaceCard
                      space={space}
                      variant="featured"
                      size="sm"
                      onClick={onSpaceClick}
                      onJoin={onSpaceJoin}
                      onLeave={onSpaceLeave}
                      isJoined={joinedSpaceIds.includes(space.id)}
                      isTrending={true}
                      activityScore={Math.floor(Math.random() * 40) + 60}
                      showActivityIndicator={true}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
          
          {/* Main Spaces Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
                {searchQuery ? `Search Results (${filteredAndSortedSpaces.length})` : 'All Spaces'}
              </h2>
              
              {filteredAndSortedSpaces.length > 0 && (
                <span className="text-sm text-gray-400">
                  {filteredAndSortedSpaces.length} space{filteredAndSortedSpaces.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-64 bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/10 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            )}
            
            {/* Spaces Grid */}
            {!isLoading && filteredAndSortedSpaces.length > 0 && (
              <motion.div
                className={cn(
                  viewLayout === 'grid'
                    ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${Math.min(maxSpacesPerRow, 4)} gap-6`
                    : "space-y-4"
                )}
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
          }}
                initial="hidden"
                animate="show"
              >
                {filteredAndSortedSpaces.map((space, index) => (
                  <motion.div
                    key={space.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
          }}
                    transition={{ duration: motionDurations.smooth }}
                  >
                    <HiveSpaceCard
                      space={space}
                      variant={trendingSpaceIds.includes(space.id) ? "featured" : "default"}
                      size={viewLayout === 'list' ? 'sm' : 'md'}
                      onClick={onSpaceClick}
                      onJoin={onSpaceJoin}
                      onLeave={onSpaceLeave}
                      isJoined={joinedSpaceIds.includes(space.id)}
                      isTrending={trendingSpaceIds.includes(space.id)}
                      activityScore={Math.floor(Math.random() * 100)}
                      recentActivity={index % 3 === 0 ? "New post 2 hours ago" : undefined}
                      showActivityIndicator={true}
                      showMemberPreview={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Empty State */}
            {!isLoading && filteredAndSortedSpaces.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">No spaces found</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery 
                    ? `No spaces match "${searchQuery}". Try adjusting your search or filters.`
                    : "No spaces available in this category."
                  }
                </p>
                {searchQuery && (
                  <motion.button
                    className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200"
                    onClick={() => setSearchQuery('')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear search
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>
    )
  }
);

HiveSpaceDirectory.displayName = "HiveSpaceDirectory";

export { hiveSpaceDirectoryVariants };