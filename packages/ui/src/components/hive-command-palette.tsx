"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Zap 
} from 'lucide-react';

// HIVE Command Palette - Magnetic Search with Liquid Metal Motion
// Sophisticated command interface with magnetic interactions and builder-focused actions

const hiveCommandPaletteVariants = cva(
  // Base palette styles - matte obsidian glass with heavy backdrop blur
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

// Command item animation variants with magnetic effects
const commandItemVariants = {
  rest: {
    x: 0,
    scale: 1,
    backgroundColor: 'var(--hive-interactive-hover)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  hover: {
    x: 4,
    scale: 1.01,
    backgroundColor: 'var(--hive-interactive-active)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  selected: {
    x: 6,
    scale: 1.02,
    backgroundColor: 'var(--hive-brand-primary)/15',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

// Palette entrance animation
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

// Result list stagger animation
const resultListVariants = {
  hidden: {
    opacity: 0,
  },
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
    transition: {
      duration: motionDurations.quick,
    }
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

export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  category: string;
  keywords: string[];
  action: () => void;
  shortcut?: string
}

export interface CommandCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string
}

export interface HiveCommandPaletteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof hiveCommandPaletteVariants> {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (item: CommandItem) => void;
  items: CommandItem[];
  categories: CommandCategory[];
  placeholder?: string;
  hotkey?: string;
  recentItems?: CommandItem[];
  maxResults?: number
}

const HiveCommandPalette = React.forwardRef<HTMLDivElement, HiveCommandPaletteProps>(
  ({ 
    className,
    variant,
    isOpen,
    onClose,
    onSelect,
    items,
    categories,
    placeholder = "Search for commands, tools, spaces...",
    hotkey = "⌘K",
    recentItems = [],
    maxResults = 8,
    ...props 
  }, ref) => {
    
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Filter and search logic
    const filteredItems = useMemo(() => {
      if (!query && !selectedCategory) {
        return recentItems.slice(0, maxResults)
      }
      
      let filtered = items;
      
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
      
      return filtered.slice(0, maxResults)
    }, [query, selectedCategory, items, recentItems, maxResults]);
    
    // Group filtered items by category
    const groupedItems = useMemo(() => {
      const groups: Record<string, CommandItem[]> = {};
      filteredItems.forEach(item => {
        if (!groups[item.category]) {
          groups[item.category] = []
        }
        groups[item.category].push(item)
      });
      return groups
    }, [filteredItems]);
    
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
            break
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, selectedIndex, filteredItems, onClose]);
    
    // Reset state when opening
    useEffect(() => {
      if (isOpen) {
        setQuery('');
        setSelectedIndex(0);
        setSelectedCategory(null);
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }, [isOpen]);
    
    // Update selected index when filtered items change
    useEffect(() => {
      setSelectedIndex(0)
    }, [filteredItems]);
    
    const handleSelect = (item: CommandItem) => {
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
    
    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={ref}
            className={cn(hiveCommandPaletteVariants({ variant, className }))}
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
              className="relative w-full max-w-2xl mx-4 bg-[var(--hive-background-primary)]/60 backdrop-blur-2xl border border-[var(--hive-border-primary)] rounded-2xl shadow-2xl overflow-hidden"
              variants={paletteVariants}
            >
              {/* Search Header */}
              <div className="flex items-center px-6 py-4 border-b border-[var(--hive-border-primary)]">
                <Search className="text-[var(--hive-text-muted)] mr-3" size={20} />
                <input
                  ref={inputRef}
                  className="flex-1 bg-transparent text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none text-lg"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="text-[var(--hive-text-muted)] text-sm font-mono">
                  {hotkey}
                </div>
              </div>
              
              {/* Category Filter */}
              {!query && (
                <div className="px-6 py-4 border-b border-white/10">
                  <div className="flex items-center space-x-2 overflow-x-auto">
                    <motion.button
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0",
                        !selectedCategory 
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                          : "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-primary)]/60 hover:bg-[var(--hive-text-primary)]/10"
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
                            ? `bg-${category.color}/20 text-${category.color} border border-${category.color}/30`
                            : "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-primary)]/60 hover:bg-[var(--hive-text-primary)]/10"
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
                                  <div className={cn(
                                    "text-current shrink-0",
                                    isSelected ? "text-yellow-400" : "text-[var(--hive-text-primary)]/60"
                                  )}>
                                    {item.icon}
                                  </div>
                                  
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
                                  </div>
                                </motion.div>
                                
                                <div className="flex items-center space-x-2 shrink-0 ml-4">
                                  {item.shortcut && (
                                    <div className="text-xs font-mono text-[var(--hive-text-primary)]/40 bg-[var(--hive-text-primary)]/5 px-2 py-1 rounded border border-white/10">
                                      {item.shortcut}
                                    </div>
                                  )}
                                  <ArrowRight 
                                    className={cn(
                                      "transition-colors",
                                      isSelected ? "text-yellow-400" : "text-[var(--hive-text-primary)]/40"
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
                    <div className="text-[var(--hive-text-primary)]/60 font-medium mb-2">No results found</div>
                    <div className="text-[var(--hive-text-primary)]/40 text-sm">
                      Try searching for tools, spaces, or actions
                    </div>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="px-6 py-3 bg-[var(--hive-background-primary)]/20 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-[var(--hive-text-primary)]/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-[var(--hive-text-primary)]/10 rounded border border-white/20 flex items-center justify-center">
                        ↵
                      </div>
                      <span>select</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-[var(--hive-text-primary)]/10 rounded border border-white/20 flex items-center justify-center">
                        ↓↑
                      </div>
                      <span>navigate</span>
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

HiveCommandPalette.displayName = "HiveCommandPalette";

// Hook for managing command palette state and hotkey
export function useHiveCommandPalette(hotkey = 'mod+k') {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      
      if (hotkey === 'mod+k' && isMod && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true)
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [hotkey]);
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);
  
  return {
    isOpen,
    open,
    close,
    toggle,
  }
}

// Pre-built command categories for builder tools
export const builderCategories: CommandCategory[] = [
  {
    id: 'tools',
    title: 'Tools',
    icon: <Code size={14} />,
    color: 'blue-400',
  },
  {
    id: 'spaces',
    title: 'Spaces',
    icon: <Folder size={14} />,
    color: 'green-400',
  },
  {
    id: 'people',
    title: 'People',
    icon: <User size={14} />,
    color: 'purple-400',
  },
  {
    id: 'actions',
    title: 'Actions',
    icon: <Zap size={14} />,
    color: 'yellow-400',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings size={14} />,
    color: 'gray-400',
  },
];

export { 
  HiveCommandPalette,
  hiveCommandPaletteVariants
};