'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  Grid3X3,
  List,
  Users,
  Star,
  Clock,
  Zap,
  ArrowRight,
  Building2,
  Home,
  GraduationCap,
  UserCheck,
  Sparkles,
  TrendingUp,
  MapPin,
  Hash,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  UserPlus,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal
} from 'lucide-react';

export type SpaceCategory = 'university' | 'residential' | 'greek' | 'student';
export type SpaceStatus = 'active' | 'archived' | 'private' | 'pending';
export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'members' | 'activity' | 'created' | 'trending';
export type FilterOption = 'all' | 'joined' | 'bookmarked' | 'recommended' | 'trending';

export interface SpacePreview {
  id: string;
  name: string;
  description: string;
  category: SpaceCategory;
  status: SpaceStatus;
  
  // Visual
  avatar?: string;
  coverImage?: string;
  color?: string;
  
  // Metadata
  memberCount: number;
  postCount: number;
  toolCount: number;
  createdAt: string;
  lastActivity?: string;
  
  // User relationship
  isJoined: boolean;
  isBookmarked: boolean;
  userRole?: 'leader' | 'co_leader' | 'member';
  
  // Stats
  weeklyActivity: number;
  monthlyGrowth: number;
  engagementScore: number;
  
  // Features
  isRecommended: boolean;
  isTrending: boolean;
  isPrivate: boolean;
  requiresApproval: boolean;
  
  // Location (for residential/university spaces)
  location?: string;
  building?: string;
  floor?: number;
  
  // Tags
  tags: string[];
  
  // Preview content
  recentPosts?: Array<{
    id: string;
    content: string;
    author: string;
    timestamp: string;
  }>;
  
  activeTools?: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
}

export interface SpaceCategoryBrowserProps {
  spaces: SpacePreview[];
  selectedCategory?: SpaceCategory;
  initialViewMode?: ViewMode;
  showCategoryFilter?: boolean;
  showJoinActions?: boolean;
  onSpaceClick?: (spaceId: string) => void;
  onJoinSpace?: (spaceId: string) => Promise<void>;
  onLeaveSpace?: (spaceId: string) => Promise<void>;
  onBookmarkSpace?: (spaceId: string, bookmarked: boolean) => Promise<void>;
  onCreateSpace?: (category: SpaceCategory) => void;
  currentUserRole?: 'leader' | 'co_leader' | 'member';
  className?: string;
}

const CATEGORY_CONFIG = {
  university: {
    label: 'University',
    description: 'Academic departments, programs, and university-wide communities',
    icon: <Building2 className="w-5 h-5" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    gradient: 'from-blue-400/20 to-indigo-400/20',
  },
  residential: {
    label: 'Residential',
    description: 'Dorms, floors, and residential communities',
    icon: <Home className="w-5 h-5" />,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/30',
    gradient: 'from-green-400/20 to-emerald-400/20',
  },
  greek: {
    label: 'Greek Life',
    description: 'Fraternities, sororities, and Greek organizations',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30',
    gradient: 'from-purple-400/20 to-pink-400/20',
  },
  student: {
    label: 'Student Groups',
    description: 'Clubs, organizations, and student-led communities',
    icon: <UserCheck className="w-5 h-5" />,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
    gradient: 'from-orange-400/20 to-red-400/20',
  },
};

const FILTER_OPTIONS: Array<{ value: FilterOption; label: string; icon: React.ReactNode }> = [
  { value: 'all', label: 'All Spaces', icon: <Grid3X3 className="w-4 h-4" /> },
  { value: 'joined', label: 'My Spaces', icon: <UserCheck className="w-4 h-4" /> },
  { value: 'bookmarked', label: 'Bookmarked', icon: <Bookmark className="w-4 h-4" /> },
  { value: 'recommended', label: 'Recommended', icon: <Sparkles className="w-4 h-4" /> },
  { value: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
];

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'name', label: 'Name' },
  { value: 'members', label: 'Member Count' },
  { value: 'activity', label: 'Recent Activity' },
  { value: 'created', label: 'Recently Created' },
  { value: 'trending', label: 'Trending Score' },
];

export const SpaceCategoryBrowser: React.FC<SpaceCategoryBrowserProps> = ({
  spaces,
  selectedCategory,
  initialViewMode = 'grid',
  showCategoryFilter = true,
  showJoinActions = true,
  onSpaceClick,
  onJoinSpace,
  onLeaveSpace,
  onBookmarkSpace,
  onCreateSpace,
  currentUserRole = 'member',
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SpaceCategory | undefined>(selectedCategory);

  const filteredSpaces = useMemo(() => {
    const filtered = spaces.filter(space => {
      // Category filter
      if (activeCategory && space.category !== activeCategory) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = space.name.toLowerCase().includes(query);
        const matchesDescription = space.description.toLowerCase().includes(query);
        const matchesTags = space.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesLocation = space.location?.toLowerCase().includes(query);
        if (!matchesName && !matchesDescription && !matchesTags && !matchesLocation) return false;
      }
      
      // Content filter
      switch (selectedFilter) {
        case 'joined':
          return space.isJoined;
        case 'bookmarked':
          return space.isBookmarked;
        case 'recommended':
          return space.isRecommended;
        case 'trending':
          return space.isTrending;
        default:
          return true;
      }
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'members':
          return b.memberCount - a.memberCount;
        case 'activity': {
          const aActivity = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
          const bActivity = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
          return bActivity - aActivity;
        }
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'trending':
          return b.engagementScore - a.engagementScore;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [spaces, activeCategory, searchQuery, selectedFilter, sortBy]);

  const categoryStats = useMemo(() => {
    return Object.entries(CATEGORY_CONFIG).map(([category, config]) => ({
      category: category as SpaceCategory,
      ...config,
      count: spaces.filter(s => s.category === category).length,
      joined: spaces.filter(s => s.category === category && s.isJoined).length,
    }));
  }, [spaces]);

  const handleJoinSpace = async (spaceId: string) => {
    if (!onJoinSpace) return;
    try {
      await onJoinSpace(spaceId);
    } catch (error) {
      console.error('Failed to join space:', error);
    }
  };

  const handleLeaveSpace = async (spaceId: string) => {
    if (!onLeaveSpace) return;
    try {
      await onLeaveSpace(spaceId);
    } catch (error) {
      console.error('Failed to leave space:', error);
    }
  };

  const handleBookmarkSpace = async (spaceId: string, bookmarked: boolean) => {
    if (!onBookmarkSpace) return;
    try {
      await onBookmarkSpace(spaceId, bookmarked);
    } catch (error) {
      console.error('Failed to bookmark space:', error);
    }
  };

  const SpaceCard: React.FC<{ space: SpacePreview }> = ({ space }) => {
    const categoryConfig = CATEGORY_CONFIG[space.category];
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -2 }}
        className={cn(
          'group relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer',
          'bg-gradient-to-br from-[var(--hive-background-secondary)]/60 via-[var(--hive-background-tertiary)]/40 to-[var(--hive-background-interactive)]/60',
          'border-[var(--hive-border-primary)]/20',
          'hover:border-[var(--hive-brand-primary)]/30 hover:shadow-xl hover:shadow-[var(--hive-brand-primary)]/10',
          viewMode === 'list' && 'flex items-center gap-6'
        )}
        onClick={() => onSpaceClick?.(space.id)}
      >
        {/* Background Effects */}
        <div className={cn(
          'absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          `bg-gradient-to-br ${categoryConfig.gradient}`
        )} />
        
        {/* Status Indicators */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {space.isTrending && (
            <div className="px-2 py-1 rounded-full bg-orange-400/20 text-orange-400 text-xs font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </div>
          )}
          
          {space.isRecommended && (
            <div className="px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Recommended</span>
            </div>
          )}
          
          {space.isPrivate && (
            <div className="w-6 h-6 rounded-full bg-[var(--hive-background-tertiary)]/80 flex items-center justify-center">
              <Eye className="w-3 h-3 text-[var(--hive-text-muted)]" />
            </div>
          )}
        </div>

        <div className={cn(
          'relative z-10',
          viewMode === 'list' ? 'flex items-center gap-4 flex-1' : 'space-y-4'
        )}>
          {/* Avatar/Icon */}
          <div className={cn(
            'relative',
            viewMode === 'list' ? 'flex-shrink-0' : ''
          )}>
            <div className={cn(
              'rounded-2xl flex items-center justify-center font-bold text-[var(--hive-text-inverse)] relative overflow-hidden',
              viewMode === 'list' ? 'w-16 h-16 text-xl' : 'w-20 h-20 text-2xl',
              `bg-gradient-to-br ${categoryConfig.gradient}`
            )}>
              {space.avatar ? (
                <img src={space.avatar} alt={space.name} className="w-full h-full object-cover" />
              ) : (
                <span>{space.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            
            {space.isJoined && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-[var(--hive-background-secondary)] flex items-center justify-center">
                <UserCheck className="w-3 h-3 text-[var(--hive-text-inverse)]" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className={cn(
            viewMode === 'list' ? 'flex-1 min-w-0' : 'space-y-3'
          )}>
            {/* Header */}
            <div className={cn(
              viewMode === 'list' ? 'flex items-start justify-between' : 'space-y-2'
            )}>
              <div className={cn(viewMode === 'list' ? 'min-w-0 flex-1' : '')}>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[var(--hive-text-primary)] truncate">
                    {space.name}
                  </h3>
                  
                  {/* Category Badge */}
                  {viewMode === 'grid' && (
                    <div className={cn(
                      'px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1',
                      categoryConfig.bgColor,
                      categoryConfig.borderColor,
                      categoryConfig.color,
                      'border'
                    )}>
                      {categoryConfig.icon}
                      <span>{categoryConfig.label}</span>
                    </div>
                  )}
                </div>

                <p className={cn(
                  'text-[var(--hive-text-secondary)] line-clamp-2',
                  viewMode === 'list' ? 'text-sm' : 'text-sm mb-3'
                )}>
                  {space.description}
                </p>

                {/* Location */}
                {space.location && viewMode === 'grid' && (
                  <div className="flex items-center gap-1 text-xs text-[var(--hive-text-muted)] mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{space.location}</span>
                  </div>
                )}
              </div>

              {/* Actions (List mode) */}
              {viewMode === 'list' && showJoinActions && (
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkSpace(space.id, !space.isBookmarked);
                    }}
                    className="w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 hover:bg-[var(--hive-brand-primary)]/10 transition-colors duration-200 flex items-center justify-center"
                  >
                    {space.isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-[var(--hive-text-muted)]" />
                    )}
                  </button>

                  {space.isJoined ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLeaveSpace(space.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 transition-all duration-200 text-sm font-medium"
                    >
                      Leave
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinSpace(space.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-200 text-sm font-medium"
                    >
                      Join
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Stats */}
            {viewMode === 'grid' && (
              <div className="flex items-center gap-4 text-xs text-[var(--hive-text-muted)]">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{space.memberCount} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  <span>{space.postCount} posts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>{space.toolCount} tools</span>
                </div>
              </div>
            )}

            {/* Tags */}
            {space.tags.length > 0 && viewMode === 'grid' && (
              <div className="flex items-center gap-1 flex-wrap">
                {space.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-lg bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-muted)] text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {space.tags.length > 3 && (
                  <span className="text-xs text-[var(--hive-text-muted)]">
                    +{space.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Actions (Grid mode) */}
          {viewMode === 'grid' && showJoinActions && (
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmarkSpace(space.id, !space.isBookmarked);
                }}
                className="w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 hover:bg-[var(--hive-brand-primary)]/10 transition-colors duration-200 flex items-center justify-center"
              >
                {space.isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                ) : (
                  <Bookmark className="w-4 h-4 text-[var(--hive-text-muted)]" />
                )}
              </button>

              {space.isJoined ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--hive-text-muted)]">
                    {space.userRole && space.userRole !== 'member' ? space.userRole.replace('_', ' ') : 'Member'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLeaveSpace(space.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 transition-all duration-200 text-sm font-medium"
                  >
                    Leave
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoinSpace(space.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-200 font-medium flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Join</span>
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className={cn('h-full flex flex-col', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            {activeCategory ? CATEGORY_CONFIG[activeCategory].label : 'Browse Spaces'}
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-1">
            {filteredSpaces.length} spaces found
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-2xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200',
                viewMode === 'grid'
                  ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]'
                  : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200',
                viewMode === 'list'
                  ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]'
                  : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Create Space */}
          {onCreateSpace && (
            <button
              onClick={() => onCreateSpace(activeCategory || 'student')}
              className="px-4 py-2.5 rounded-2xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60 transition-all duration-300 font-semibold flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Space</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      {showCategoryFilter && !selectedCategory && (
        <div className="mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setActiveCategory(undefined)}
              className={cn(
                'px-4 py-2.5 rounded-2xl border transition-all duration-200 flex items-center gap-2',
                !activeCategory
                  ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40'
                  : 'bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30'
              )}
            >
              <Grid3X3 className="w-4 h-4" />
              <span>All Categories</span>
            </button>
            
            {categoryStats.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={cn(
                  'px-4 py-2.5 rounded-2xl border transition-all duration-200 flex items-center gap-2',
                  activeCategory === category.category
                    ? `${category.bgColor} ${category.color} ${category.borderColor}`
                    : 'bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30'
                )}
              >
                {category.icon}
                <span>{category.label}</span>
                <span className="text-xs opacity-80">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--hive-text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spaces by name, description, or tags..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'w-12 h-12 rounded-2xl border transition-all duration-200 flex items-center justify-center',
              showFilters
                ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40'
                : 'bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/30 hover:text-[var(--hive-text-primary)]'
            )}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={cn(
                      'px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2',
                      selectedFilter === option.value
                        ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30'
                        : 'bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30'
                    )}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--hive-text-secondary)]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Spaces Grid/List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredSpaces.length > 0 ? (
            <div className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            )}>
              {filteredSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/20 flex items-center justify-center">
                <Grid3X3 className="w-8 h-8 text-[var(--hive-text-muted)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                No spaces found
              </h3>
              <p className="text-[var(--hive-text-secondary)] max-w-sm mx-auto mb-6">
                {searchQuery
                  ? 'Try adjusting your search or filters to find spaces.'
                  : 'There are no spaces in this category yet.'}
              </p>
              
              {onCreateSpace && (
                <button
                  onClick={() => onCreateSpace(activeCategory || 'student')}
                  className="px-6 py-3 rounded-2xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300 font-semibold flex items-center gap-2 mx-auto"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create the First Space</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SpaceCategoryBrowser;