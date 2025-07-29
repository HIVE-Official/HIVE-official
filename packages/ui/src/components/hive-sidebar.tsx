"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, magneticHover } from '../motion/hive-motion-system';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  Users,
  User,
  Zap,
  Home,
  Plus,
  Bell,
  Settings,
  Star,
  Clock,
  MessageCircle,
  Activity
} from 'lucide-react';

// HIVE Sidebar System - Section-Based Navigation
// Organized into logical sections: Spaces, Profile, HiveLab, Feed

const hiveSidebarVariants = cva(
  // Base sidebar styles - matte obsidian glass
  "relative h-full bg-[var(--hive-background-primary)]/40 backdrop-blur-xl border-r flex flex-col transition-all duration-300",
  {
    variants: {
      variant: {
        // Standard sidebar - matte obsidian glass
        default: "border-white/20",
        
        // Premium sidebar - gold accent
        premium: "border-yellow-500/30",
        
        // Minimal sidebar - subtle
        minimal: "border-white/10 bg-[var(--hive-background-primary)]/20",
      },
      
      size: {
        sm: "w-16", // Icon-only collapsed
        default: "w-64", // Standard width
        lg: "w-80", // Wider for more content
        xl: "w-96", // Extra wide
      },
      
      position: {
        left: "left-0",
        right: "right-0 border-r-0 border-l",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "left",
    },
  }
);

// Sidebar item animation variants
const sidebarItemVariants = {
  rest: {
    x: 0,
    backgroundColor: 'var(--hive-interactive-hover)',
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
    }
  },
  hover: {
    x: 4,
    backgroundColor: 'var(--hive-interactive-active)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  active: {
    x: 6,
    backgroundColor: 'color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

// Collapse animation variants
const collapseVariants = {
  expanded: {
    width: 'auto',
    opacity: 1,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
    }
  },
  collapsed: {
    width: 0,
    opacity: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
    }
  }
};

// Section Interfaces
export interface SidebarSection {
  id: 'spaces' | 'profile' | 'hivelab' | 'feed';
  title: string;
  icon: React.ReactNode;
  items: SidebarItem[];
  quickActions?: QuickAction[];
  badge?: string | number;
  isExpanded?: boolean;
  previewContent?: React.ReactNode;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  isActive?: boolean;
  isDisabled?: boolean;
  subtitle?: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  lastActivity?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'ghost';
}

export interface HiveSidebarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>,
    VariantProps<typeof hiveSidebarVariants> {
  sections: SidebarSection[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  showCollapseButton?: boolean;
  activeItemId?: string;
  onItemClick?: (item: SidebarItem, sectionId: string) => void;
  onSectionToggle?: (sectionId: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isOverlay?: boolean;
  onOverlayClose?: () => void;
  user?: {
    name: string;
    avatar?: string;
    handle: string;
    status?: 'online' | 'offline' | 'busy' | 'away';
  };
}

const HiveSidebar = React.forwardRef<HTMLDivElement, HiveSidebarProps>(
  ({ 
    className,
    variant,
    size: sizeProp,
    position,
    sections,
    isCollapsed = true,
    onToggleCollapse,
    showCollapseButton = true,
    activeItemId,
    onItemClick,
    onSectionToggle,
    header,
    footer,
    isOverlay = false,
    onOverlayClose,
    user,
    ...props 
  }, ref) => {
    
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
      new Set(sections.filter(s => s.isExpanded !== false).map(s => s.id))
    );
    
    // Determine actual size based on collapsed state
    const actualSize = isCollapsed ? 'sm' : sizeProp || 'default';
    
    const toggleSection = (sectionId: string) => {
      const newExpanded = new Set(expandedSections);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      setExpandedSections(newExpanded);
      onSectionToggle?.(sectionId);
    };
    
    const handleItemClick = (item: SidebarItem, sectionId: string) => {
      if (item.isDisabled) return;
      onItemClick?.(item, sectionId);
    };
    
    const renderQuickAction = (action: QuickAction) => (
      <motion.button
        key={action.id}
        className={cn(
          "p-2 rounded-lg transition-colors text-xs flex items-center space-x-1",
          action.variant === 'primary' && "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30",
          action.variant === 'ghost' && "text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10",
          (!action.variant || action.variant === 'default') && "bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/20"
        )}
        onClick={action.onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {action.icon}
        {!isCollapsed && <span className="text-xs">{action.label}</span>}
      </motion.button>
    );

    const renderItem = (item: SidebarItem, sectionId: string) => {
      const isActive = activeItemId === item.id || item.isActive;
      
      return (
        <motion.button
          key={item.id}
          className={cn(
            "w-full flex items-center px-3 py-2.5 text-left transition-colors group rounded-lg mx-2",
            isCollapsed && "px-2 justify-center mx-1",
            item.isDisabled && "opacity-50 cursor-not-allowed",
            isActive && "bg-yellow-500/20 text-yellow-400",
            !isActive && !item.isDisabled && "text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10"
          )}
          variants={sidebarItemVariants}
          initial="rest"
          animate={isActive ? "active" : "rest"}
          whileHover={!item.isDisabled ? "hover" : "rest"}
          onClick={() => handleItemClick(item, sectionId)}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Icon or Avatar */}
            <div className="text-current shrink-0 relative">
              {item.avatar ? (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[var(--hive-background-primary)] text-xs font-medium">
                  {item.avatar}
                </div>
              ) : (
                item.icon
              )}
              {item.status && (
                <div className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-black",
                  item.status === 'online' && "bg-green-400",
                  item.status === 'busy' && "bg-red-400",
                  item.status === 'away' && "bg-yellow-400",
                  item.status === 'offline' && "bg-gray-500"
                )} />
              )}
            </div>
            
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  className="flex items-center justify-between flex-1 min-w-0"
                  variants={collapseVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate text-sm">
                      {item.label}
                    </div>
                    {item.subtitle && (
                      <div className="text-xs text-[var(--hive-text-primary)]/50 truncate">
                        {item.subtitle}
                      </div>
                    )}
                    {item.lastActivity && (
                      <div className="text-xs text-[var(--hive-text-primary)]/40 truncate">
                        {item.lastActivity}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 shrink-0">
                    {item.badge && (
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      );
    };

    const renderSection = (section: SidebarSection) => {
      const isExpanded = expandedSections.has(section.id);
      
      return (
        <div key={section.id} className="mb-6">
          {/* Section Header */}
          <motion.button
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 text-left transition-colors group",
              isCollapsed && "px-3 justify-center"
            )}
            onClick={() => toggleSection(section.id)}
            whileHover={{ backgroundColor: 'var(--hive-interactive-hover)' }}
          >
            <div className="flex items-center space-x-3">
              <div className="text-yellow-400 shrink-0">
                {section.icon}
              </div>
              
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    className="flex items-center space-x-2"
                    variants={collapseVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                  >
                    <span className="font-semibold text-[var(--hive-text-primary)] text-sm">
                      {section.title}
                    </span>
                    {section.badge && (
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full font-medium">
                        {section.badge}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {!isCollapsed && (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: motionDurations.quick }}
                className="text-[var(--hive-text-primary)]/60"
              >
                <ChevronRight size={16} />
              </motion.div>
            )}
          </motion.button>

          {/* Quick Actions */}
          {!isCollapsed && section.quickActions && section.quickActions.length > 0 && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-2"
            >
              <div className="flex flex-wrap gap-1">
                {section.quickActions.map(renderQuickAction)}
              </div>
            </motion.div>
          )}

          {/* Section Items */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: motionDurations.smooth,
                  ease: liquidMetal.easing as any,
                }}
                className="overflow-hidden"
              >
                <div className="space-y-1 pb-2">
                  {section.items.map(item => renderItem(item, section.id))}
                </div>
                
                {/* Preview Content */}
                {!isCollapsed && section.previewContent && (
                  <div className="px-4 pb-2">
                    {section.previewContent}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };
    
    const sidebarContent = (
      <motion.div
        ref={ref}
        className={cn(hiveSidebarVariants({ variant, size: actualSize, position, className }))}
        initial={{ x: position === 'right' ? 100 : -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: position === 'right' ? 100 : -100, opacity: 0 }}
        transition={{
          duration: motionDurations.smooth,
          ease: liquidMetal.easing as any,
          type: "spring" as const,
          stiffness: 300,
          damping: 25,
        }}
        {...(props as any)}
      >
        {/* Header */}
        {header && (
          <div className={cn(
            "px-4 py-6 border-b border-white/10",
            isCollapsed && "px-3 py-4"
          )}>
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  variants={collapseVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                >
                  {header}
                </motion.div>
              ) : (
                <div className="flex justify-center">
                  <Menu size={20} className="text-[var(--hive-text-primary)]/60" />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* User Profile Section */}
        {user && !isCollapsed && (
          <div className="px-4 py-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[var(--hive-background-primary)] text-sm font-medium relative">
                {user.avatar || user.name[0]}
                {user.status && (
                  <div className={cn(
                    "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-black",
                    user.status === 'online' && "bg-green-400",
                    user.status === 'busy' && "bg-red-400",
                    user.status === 'away' && "bg-yellow-400",
                    user.status === 'offline' && "bg-gray-500"
                  )} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[var(--hive-text-primary)] text-sm truncate">
                  {user.name}
                </div>
                <div className="text-xs text-[var(--hive-text-primary)]/60 truncate">
                  @{user.handle}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav>
            {sections.map(renderSection)}
          </nav>
        </div>
        
        {/* Footer */}
        {footer && (
          <div className={cn(
            "px-4 py-6 border-t border-white/10 mt-auto",
            isCollapsed && "px-3 py-4"
          )}>
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  variants={collapseVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                >
                  {footer}
                </motion.div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-[var(--hive-text-primary)]/10 rounded-full" />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* Collapse Toggle Button */}
        {showCollapseButton && onToggleCollapse && (
          <motion.button
            className={cn(
              "absolute -right-3 top-6 w-6 h-6 bg-[var(--hive-background-primary)]/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 transition-colors",
              position === 'right' && "-left-3"
            )}
            onClick={onToggleCollapse}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </motion.button>
        )}
        
        {/* Overlay Close Button */}
        {isOverlay && onOverlayClose && (
          <motion.button
            className="absolute top-4 right-4 w-8 h-8 bg-[var(--hive-background-primary)]/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 transition-colors"
            onClick={onOverlayClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>
        )}
      </motion.div>
    );
    
    if (isOverlay) {
      return (
        <AnimatePresence>
          <div className="fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onOverlayClose}
            />
            
            {/* Sidebar */}
            <div className={cn(
              "relative z-50",
              position === 'right' && "ml-auto"
            )}>
              {sidebarContent}
            </div>
          </div>
        </AnimatePresence>
      );
    }
    
    return sidebarContent;
  }
);

HiveSidebar.displayName = "HiveSidebar";

// Pre-built Sidebar Hook for easy state management
export function useHiveSidebar(initialCollapsed = true, initialSections: SidebarSection[] = []) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [activeItemId, setActiveItemId] = useState<string | undefined>();
  const [sections, setSections] = useState<SidebarSection[]>(initialSections);
  
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const setCollapsed = (collapsed: boolean) => setIsCollapsed(collapsed);
  const setActiveItem = (itemId: string) => setActiveItemId(itemId);
  
  const updateSection = (sectionId: string, updates: Partial<SidebarSection>) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };
  
  const updateSectionItems = (sectionId: string, items: SidebarItem[]) => {
    updateSection(sectionId, { items });
  };
  
  const addSectionItem = (sectionId: string, item: SidebarItem) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, items: [...section.items, item] }
        : section
    ));
  };
  
  const removeSectionItem = (sectionId: string, itemId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, items: section.items.filter(item => item.id !== itemId) }
        : section
    ));
  };
  
  return {
    isCollapsed,
    activeItemId,
    sections,
    toggleCollapse,
    setCollapsed,
    setActiveItem,
    setSections,
    updateSection,
    updateSectionItems,
    addSectionItem,
    removeSectionItem,
  };
}

// Helper function to create default HIVE sections
export function createDefaultHiveSections(): SidebarSection[] {
  return [
    {
      id: 'spaces',
      title: 'Spaces',
      icon: <Users size={18} />,
      items: [],
      quickActions: [
        {
          id: 'create-space',
          label: 'Create',
          icon: <Plus size={14} />,
          onClick: () => console.log('Create space'),
          variant: 'primary'
        },
        {
          id: 'join-space',
          label: 'Join',
          icon: <Users size={14} />,
          onClick: () => console.log('Join space'),
          variant: 'default'
        }
      ],
      isExpanded: true
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: <User size={18} />,
      items: [],
      quickActions: [
        {
          id: 'edit-profile',
          label: 'Edit',
          icon: <Settings size={14} />,
          onClick: () => console.log('Edit profile'),
          variant: 'ghost'
        }
      ],
      isExpanded: false
    },
    {
      id: 'hivelab',
      title: 'HiveLab',
      icon: <Zap size={18} />,
      items: [],
      quickActions: [
        {
          id: 'create-tool',
          label: 'Create',
          icon: <Plus size={14} />,
          onClick: () => console.log('Create tool'),
          variant: 'primary'
        }
      ],
      isExpanded: true
    },
    {
      id: 'feed',
      title: 'Feed',
      icon: <Home size={18} />,
      items: [],
      badge: '5',
      isExpanded: true
    }
  ];
}

export { 
  HiveSidebar,
  hiveSidebarVariants
};