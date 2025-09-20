"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from './framer-motion-proxy';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, magneticHover, cascadeTiming } from '../motion/hive-motion-system';
import { 
  Search, 
  Command, 
  ArrowRight, 
  Hash, 
  User, 
  Settings, 
  FileText, 
  Folder, 
  Code, 
  Star, 
  Clock, 
  Zap,
  Users,
  Calendar,
  MessageSquare,
  Home,
  Compass,
  BookOpen,
  TrendingUp,
  Play,
  Edit,
  Plus,
  Heart
} from 'lucide-react';

// Enhanced HIVE Command Palette with Global Search
// Integrates search across spaces, tools, people, events, posts, and navigation

const enhancedCommandPaletteVariants = cva(
  "fixed inset-0 z-50 flex items-start justify-center pt-[20vh]",
  {
    variants: {
      variant: {
        default: "",
        premium: "",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const commandItemVariants = {
  rest: {
    x: 0,
    scale: 1,
    backgroundColor: 'color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  hover: {
    x: 4,
    scale: 1.01,
    backgroundColor: 'color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  selected: {
    x: 6,
    scale: 1.02,
    backgroundColor: 'color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

const paletteVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    }
  }
};

const resultListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: cascadeTiming.stagger,
      delayChildren: 0.1,
    }
  }
};

const resultItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    transition: { duration: motionDurations.quick }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    }
  }
};

// Enhanced interfaces with search data
export interface SearchableItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  category: string;
  type: 'space' | 'tool' | 'person' | 'event' | 'post' | 'navigation' | 'action';
  keywords: string[];
  action: () => void;
  shortcut?: string;
  metadata?: {
    memberCount?: number;
    rating?: number;
    creator?: string;
    date?: string;
    status?: string
  }
}

export interface SearchCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  searchEndpoint?: string; // API endpoint for live search
}

export interface EnhancedCommandPaletteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof enhancedCommandPaletteVariants> {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (item: SearchableItem) => void;
  onSearch?: (query: string, category?: string) => Promise<SearchableItem[]>;
  staticItems?: SearchableItem[];
  categories: SearchCategory[];
  placeholder?: string;
  hotkey?: string;
  recentItems?: SearchableItem[];
  maxResults?: number;
  enableLiveSearch?: boolean
}

const EnhancedHiveCommandPalette = React.forwardRef<HTMLDivElement, EnhancedCommandPaletteProps>(
  ({ 
    className,
    variant,
    isOpen,
    onClose,
    onSelect,
    onSearch,
    staticItems = [],
    categories,
    placeholder = "Search spaces, tools, people, events...",
    hotkey = "⌘K",
    recentItems = [],
    maxResults = 12,
    enableLiveSearch = true,
    ...props 
  }, ref) => {
    
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout>();
    
    // Combined items from static and search results
    const allItems = useMemo(() => {
      return [...staticItems, ...searchResults]
    }, [staticItems, searchResults]);
    
    // Filter and search logic
    const filteredItems = useMemo(() => {
      if (!query && !selectedCategory) {
        return recentItems.slice(0, maxResults)
      }
      
      let filtered = allItems;
      
      // Filter by category if selected
      if (selectedCategory) {
        filtered = filtered.filter(item => item.category === selectedCategory)
      }
      
      // Filter by search query
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(lowercaseQuery) ||
          item.description?.toLowerCase().includes(lowercaseQuery) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
        )
      }
      
      // Sort by relevance and type priority
      filtered.sort((a, b) => {
        const typeOrder: Record<string, number> = {
          navigation: 0,
          action: 1,
          space: 2,
          tool: 3,
          person: 4,
          event: 5,
          post: 6
        };
        return (typeOrder[a.type] || 10) - (typeOrder[b.type] || 10)
      });
      
      return filtered.slice(0, maxResults)
    }, [query, selectedCategory, allItems, recentItems, maxResults]);
    
    // Group filtered items by category
    const groupedItems = useMemo(() => {
      const groups: Record<string, SearchableItem[]> = {};
      filteredItems.forEach(item => {
        if (!groups[item.category]) {
          groups[item.category] = []
        }
        groups[item.category].push(item)
      });
      return groups
    }, [filteredItems]);
    
    // Live search with debouncing
    useEffect(() => {
      if (!enableLiveSearch || !onSearch || !query) {
        setSearchResults([]);
        return
      }
      
      // Clear previous timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      
      // Debounce search
      searchTimeoutRef.current = setTimeout(async () => {
        setIsSearching(true);
        try {
          const results = await onSearch(query, selectedCategory || undefined);
          setSearchResults(results)
        } catch (error) {
          console.warn('Search failed:', error);
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      }, 300);
      
      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current)
        }
      }
    }, [query, selectedCategory, onSearch, enableLiveSearch]);
    
    // Handle keyboard navigation
    useEffect(() => {
      if (!isOpen) return;
      
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            onClose();
            break;
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
            break;
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
            break;
          case 'Enter':
            e.preventDefault();
            if (filteredItems[selectedIndex]) {
              handleSelect(filteredItems[selectedIndex])
            }
            break;
          case 'Tab':
            e.preventDefault();
            // Cycle through categories
            const currentIndex = categories.findIndex(c => c.id === selectedCategory);
            const nextIndex = (currentIndex + 1) % (categories.length + 1);
            setSelectedCategory(nextIndex === 0 ? null : categories[nextIndex - 1].id);
            break
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, selectedIndex, filteredItems, selectedCategory, categories, onClose]);
    
    // Reset state when opening
    useEffect(() => {
      if (isOpen) {
        setQuery('');
        setSelectedIndex(0);
        setSelectedCategory(null);
        setSearchResults([]);
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }, [isOpen]);
    
    // Update selected index when filtered items change
    useEffect(() => {
      setSelectedIndex(0)
    }, [filteredItems]);
    
    const handleSelect = (item: SearchableItem) => {
      onSelect?.(item);
      item.action();
      onClose()
    };
    
    const handleCategorySelect = (categoryId: string) => {
      if (selectedCategory === categoryId) {
        setSelectedCategory(null)
      } else {
        setSelectedCategory(categoryId);
        setQuery('')
      }
    };
    
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    };
    
    const renderItemIcon = (item: SearchableItem) => {
      return (
        <div className={cn(
          "text-current shrink-0",
          selectedIndex === filteredItems.indexOf(item) ? "text-[var(--hive-brand-secondary)]" : "text-[var(--hive-text-primary)]/60"
        )}>
          {item.icon}
        </div>
      )
    };
    
    const renderItemMetadata = (item: SearchableItem) => {
      if (!item.metadata) return null;
      
      const metadata = [];
      if (item.metadata.memberCount) {
        metadata.push(`${item.metadata.memberCount} members`)
      }
      if (item.metadata.rating) {
        metadata.push(`${item.metadata.rating}★`)
      }
      if (item.metadata.creator) {
        metadata.push(`by ${item.metadata.creator}`)
      }
      if (item.metadata.date) {
        metadata.push(item.metadata.date)
      }
      
      return metadata.length > 0 ? (
        <div className="text-xs text-[var(--hive-text-primary)]/40 mt-0.5">
          {metadata.join(' • ')}
        </div>
      ) : null
    };
    
    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={ref}
            className={cn(enhancedCommandPaletteVariants({ variant, className }))}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleBackdropClick}
            {...(props as any)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Command Palette Container */}
            <motion.div
              className="relative w-full max-w-2xl mx-4 bg-[color-mix(in_srgb,var(--hive-background-primary)_95%,transparent)]/80 backdrop-blur-2xl border border-[color-mix(in_srgb,var(--hive-border-hover)_60%,transparent)] rounded-2xl shadow-2xl overflow-hidden"
              variants={paletteVariants}
            >
              {/* Search Header */}
              <div className="flex items-center px-6 py-4 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
                <Search className="text-[var(--hive-text-tertiary)] mr-3" size={20} />
                <input
                  ref={inputRef}
                  className="flex-1 bg-transparent text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] focus:outline-none text-lg"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {isSearching && (
                  <div className="text-[var(--hive-text-tertiary)] text-sm animate-spin">
                    ⟳
                  </div>
                )}
                <div className="text-[var(--hive-text-tertiary)] text-sm font-mono ml-3">
                  {hotkey}
                </div>
              </div>
              
              {/* Category Filter */}
              {!query && (
                <div className="px-6 py-4 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
                  <div className="flex items-center space-x-2 overflow-x-auto">
                    <motion.button
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0",
                        !selectedCategory 
                          ? "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30" 
                          : "bg-[var(--hive-interactive-hover)] text-[var(--hive-text-primary)]/60 hover:bg-[var(--hive-interactive-active)]"
                      )}
                      onClick={() => setSelectedCategory(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      All
                    </motion.button>
                    
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0",
                          selectedCategory === category.id
                            ? "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30"
                            : "bg-[var(--hive-interactive-hover)] text-[var(--hive-text-primary)]/60 hover:bg-[var(--hive-interactive-active)]"
                        )}
                        onClick={() => handleCategorySelect(category.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {category.icon}
                        <span>{category.title}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredItems.length > 0 ? (
                  <motion.div
                    className="p-2"
                    variants={resultListVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {Object.entries(groupedItems).map(([categoryId, categoryItems]) => {
                      const category = categories.find(c => c.id === categoryId);
                      return (
                        <div key={categoryId} className="mb-4 last:mb-0">
                          {/* Category Header */}
                          {category && Object.keys(groupedItems).length > 1 && (
                            <div className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-[var(--hive-text-primary)]/60 uppercase tracking-wider">
                              {category.icon}
                              <span>{category.title}</span>
                            </div>
                          )}
                          
                          {/* Category Items */}
                          {categoryItems.map((item, index) => {
                            const globalIndex = filteredItems.indexOf(item);
                            const isSelected = globalIndex === selectedIndex;
                            
                            return (
                              <motion.button
                                key={item.id}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left"
                                variants={commandItemVariants}
                                initial="rest"
                                animate={isSelected ? "selected" : "rest"}
                                whileHover={!isSelected ? "hover" : "selected"}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                              >
                                <motion.div 
                                  className="flex items-center space-x-3 flex-1 min-w-0"
                                  variants={resultItemVariants}
                                >
                                  {renderItemIcon(item)}
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className={cn(
                                      "font-medium truncate",
                                      isSelected ? "text-[var(--hive-text-primary)]" : "text-[var(--hive-text-primary)]/80"
                                    )}>
                                      {item.title}
                                    </div>
                                    {item.description && (
                                      <div className="text-sm text-[var(--hive-text-primary)]/50 truncate">
                                        {item.description}
                                      </div>
                                    )}
                                    {renderItemMetadata(item)}
                                  </div>
                                </motion.div>
                                
                                <div className="flex items-center space-x-2 shrink-0 ml-4">
                                  {item.shortcut && (
                                    <div className="text-xs font-mono text-[var(--hive-text-primary)]/40 bg-[var(--hive-interactive-hover)] px-2 py-1 rounded border border-[var(--hive-interactive-active)]">
                                      {item.shortcut}
                                    </div>
                                  )}
                                  <ArrowRight 
                                    className={cn(
                                      "transition-colors",
                                      isSelected ? "text-[var(--hive-brand-secondary)]" : "text-[var(--hive-text-primary)]/40"
                                    )} 
                                    size={16} 
                                  />
                                </div>
                              </motion.button>
                            )
          })
                        </div>
                      )
          }}
                  </motion.div>
                ) : (
                  <div className="px-6 py-12 text-center">
                    <Search className="mx-auto mb-4 text-[var(--hive-text-primary)]/40" size={48} />
                    <div className="text-[var(--hive-text-primary)]/60 font-medium mb-2">
                      {isSearching ? 'Searching...' : 'No results found'}
                    </div>
                    <div className="text-[var(--hive-text-primary)]/40 text-sm">
                      {query ? `Try different keywords or browse categories` : 'Start typing to search across all of HIVE'}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="px-6 py-3 bg-[var(--hive-background-primary)]/20 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
                <div className="flex items-center justify-between text-xs text-[var(--hive-text-primary)]/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-[var(--hive-interactive-active)] rounded border border-[var(--hive-border-hover)] flex items-center justify-center">
                        ↵
                      </div>
                      <span>select</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-[var(--hive-interactive-active)] rounded border border-[var(--hive-border-hover)] flex items-center justify-center">
                        ↓↑
                      </div>
                      <span>navigate</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-[var(--hive-interactive-active)] rounded border border-[var(--hive-border-hover)] flex items-center justify-center">
                        ⇥
                      </div>
                      <span>filter</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>esc</span>
                    <span>close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
);

EnhancedHiveCommandPalette.displayName = "EnhancedHiveCommandPalette";

// Pre-built categories for comprehensive search
export const comprehensiveSearchCategories: SearchCategory[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    icon: <Compass size={14} />,
    color: 'blue-400',
  },
  {
    id: 'spaces',
    title: 'Spaces',
    icon: <Users size={14} />,
    color: 'green-400',
    searchEndpoint: '/api/search/spaces'
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: <Code size={14} />,
    color: 'purple-400',
    searchEndpoint: '/api/search/tools'
  },
  {
    id: 'people',
    title: 'People',
    icon: <User size={14} />,
    color: 'orange-400',
    searchEndpoint: '/api/search/people'
  },
  {
    id: 'events',
    title: 'Events',
    icon: <Calendar size={14} />,
    color: 'pink-400',
    searchEndpoint: '/api/search/events'
  },
  {
    id: 'posts',
    title: 'Posts',
    icon: <MessageSquare size={14} />,
    color: 'cyan-400',
    searchEndpoint: '/api/search/posts'
  },
  {
    id: 'actions',
    title: 'Actions',
    icon: <Zap size={14} />,
    color: 'yellow-400',
  }
];

// Default navigation and action items
export const defaultSearchItems: SearchableItem[] = [
  // Main Navigation
  { 
    id: 'nav-dashboard',
    title: 'Dashboard',
    description: 'Your personal dashboard and activity feed',
    icon: <Home size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/',
    keywords: ['home', 'dashboard', 'feed', 'timeline', 'activity'],
    shortcut: '⌘1'
  },
  { 
    id: 'nav-spaces',
    title: 'Spaces',
    description: 'Join and browse campus communities',
    icon: <Users size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/spaces',
    keywords: ['spaces', 'communities', 'groups', 'social'],
    shortcut: '⌘2'
  },
  { 
    id: 'nav-spaces-browse',
    title: 'Browse Spaces',
    description: 'Discover new communities on campus',
    icon: <Compass size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/spaces/browse',
    keywords: ['browse', 'discover', 'explore', 'find', 'communities'],
  },
  { 
    id: 'nav-spaces-my',
    title: 'My Spaces',
    description: 'View your joined communities',
    icon: <Heart size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/spaces/my',
    keywords: ['my', 'joined', 'communities', 'spaces'],
  },
  { 
    id: 'nav-tools',
    title: 'Tools',
    description: 'Browse and manage campus tools',
    icon: <Code size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/tools',
    keywords: ['tools', 'apps', 'utilities', 'marketplace'],
    shortcut: '⌘3'
  },
  { 
    id: 'nav-hivelab',
    title: 'HiveLab',
    description: 'Build and deploy custom campus tools',
    icon: <Zap size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/build',
    keywords: ['hivelab', 'build', 'create', 'develop', 'maker', 'builder'],
    shortcut: '⌘4'
  },
  { 
    id: 'nav-calendar',
    title: 'Calendar',
    description: 'View your schedule and campus events',
    icon: <Calendar size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/calendar',
    keywords: ['calendar', 'events', 'schedule', 'meetings', 'dates'],
    shortcut: '⌘5'
  },
  { 
    id: 'nav-events',
    title: 'Events',
    description: 'Discover campus events and activities',
    icon: <Calendar size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/events',
    keywords: ['events', 'activities', 'campus', 'social', 'meetups']
  },
  { 
    id: 'nav-resources',
    title: 'Resources',
    description: 'Access campus resources and documentation',
    icon: <BookOpen size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/resources',
    keywords: ['resources', 'help', 'documentation', 'guides', 'support'],
    shortcut: '⌘6'
  },
  { 
    id: 'nav-profile',
    title: 'Profile',
    description: 'Manage your campus profile and settings',
    icon: <User size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/profile',
    keywords: ['profile', 'account', 'me', 'user', 'personal'],
    shortcut: '⌘7'
  },
  { 
    id: 'nav-settings',
    title: 'Settings',
    description: 'Account preferences and configuration',
    icon: <Settings size={16} />,
    category: 'navigation',
    type: 'navigation',
    action: () => window.location.href = '/settings',
    keywords: ['settings', 'preferences', 'config', 'account', 'privacy'],
    shortcut: '⌘,'
  },
  
  // Quick Actions
  { 
    id: 'action-create-tool',
    title: 'Create New Tool',
    description: 'Start building in HiveLab',
    icon: <Plus size={16} />,
    category: 'actions',
    type: 'action',
    action: () => window.location.href = '/build',
    keywords: ['create', 'new', 'tool', 'build', 'make', 'develop']
  },
  { 
    id: 'action-join-space',
    title: 'Join a Space',
    description: 'Find and join campus communities',
    icon: <Heart size={16} />,
    category: 'actions',
    type: 'action',
    action: () => window.location.href = '/spaces/browse',
    keywords: ['join', 'community', 'space', 'discover', 'connect']
  },
  { 
    id: 'action-create-event',
    title: 'Create Event',
    description: 'Schedule a new campus event',
    icon: <Calendar size={16} />,
    category: 'actions',
    type: 'action',
    action: () => window.location.href = '/calendar?create=true',
    keywords: ['create', 'event', 'schedule', 'meeting', 'activity']
  },
  { 
    id: 'action-search-people',
    title: 'Find People',
    description: 'Search for students and faculty',
    icon: <Users size={16} />,
    category: 'actions',
    type: 'action',
    action: () => window.location.href = '/people',
    keywords: ['find', 'search', 'people', 'students', 'faculty', 'connect']
  },
  { 
    id: 'action-browse-tools',
    title: 'Browse Tools',
    description: 'Explore available campus tools',
    icon: <TrendingUp size={16} />,
    category: 'actions',
    type: 'action',
    action: () => window.location.href = '/tools',
    keywords: ['browse', 'tools', 'explore', 'discover', 'apps']
  }
];

export { 
  EnhancedHiveCommandPalette,
  enhancedCommandPaletteVariants
};