"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, magneticHover } from '../motion/hive-motion-system';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

// HIVE Sidebar System - Matte Obsidian Glass with Liquid Metal Motion
// Sophisticated navigation sidebars that feel like premium hardware interfaces

const hiveSidebarVariants = cva(
  // Base sidebar styles - matte obsidian glass
  "relative h-full bg-black/40 backdrop-blur-xl border-r flex flex-col transition-all duration-300",
  {
    variants: {
      variant: {
        // Standard sidebar - matte obsidian glass
        default: "border-white/20",
        
        // Premium sidebar - gold accent
        premium: "border-yellow-500/30",
        
        // Minimal sidebar - subtle
        minimal: "border-white/10 bg-black/20",
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
    }
  },
  hover: {
    x: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  active: {
    x: 6,
    backgroundColor: 'rgba(255, 212, 0, 0.1)',
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

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  children?: SidebarItem[];
  isActive?: boolean;
  isDisabled?: boolean;
}

export interface HiveSidebarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>,
    VariantProps<typeof hiveSidebarVariants> {
  items: SidebarItem[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  showCollapseButton?: boolean;
  activeItemId?: string;
  onItemClick?: (item: SidebarItem) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isOverlay?: boolean;
  onOverlayClose?: () => void;
}

const HiveSidebar = React.forwardRef<HTMLDivElement, HiveSidebarProps>(
  ({ 
    className,
    variant,
    size: sizeProp,
    position,
    items,
    isCollapsed = false,
    onToggleCollapse,
    showCollapseButton = true,
    activeItemId,
    onItemClick,
    header,
    footer,
    isOverlay = false,
    onOverlayClose,
    ...props 
  }, ref) => {
    
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    
    // Determine actual size based on collapsed state
    const actualSize = isCollapsed ? 'sm' : sizeProp || 'default';
    
    const toggleExpanded = (itemId: string) => {
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      setExpandedItems(newExpanded);
    };
    
    const handleItemClick = (item: SidebarItem) => {
      if (item.isDisabled) return;
      
      if (item.children) {
        toggleExpanded(item.id);
      } else {
        onItemClick?.(item);
      }
    };
    
    const renderItem = (item: SidebarItem, level = 0) => {
      const isActive = activeItemId === item.id || item.isActive;
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = item.children && item.children.length > 0;
      
      return (
        <div key={item.id} className="w-full">
          <motion.button
            className={cn(
              "w-full flex items-center px-4 py-3 text-left transition-colors group",
              level > 0 && "pl-8",
              isCollapsed && "px-3 justify-center",
              item.isDisabled && "opacity-50 cursor-not-allowed",
              isActive && "text-yellow-400",
              !isActive && !item.isDisabled && "text-white/80 hover:text-white"
            )}
            variants={sidebarItemVariants}
            initial="rest"
            animate={isActive ? "active" : "rest"}
            whileHover={!item.isDisabled ? "hover" : "rest"}
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="text-current shrink-0">
                {item.icon}
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
                    <span className="font-medium truncate">
                      {item.label}
                    </span>
                    
                    <div className="flex items-center space-x-2 shrink-0">
                      {item.badge && (
                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      
                      {hasChildren && (
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: motionDurations.quick }}
                        >
                          <ChevronRight size={16} />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
          
          {/* Submenu */}
          <AnimatePresence>
            {hasChildren && isExpanded && !isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: motionDurations.smooth,
                  ease: liquidMetal.easing as any,
                }}
                className="overflow-hidden border-l border-white/10 ml-6"
              >
                {item.children?.map(child => renderItem(child, level + 1))}
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
                  <Menu size={20} className="text-white/60" />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1">
            {items.map(item => renderItem(item))}
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
                  <div className="w-8 h-8 bg-white/10 rounded-full" />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* Collapse Toggle Button */}
        {showCollapseButton && onToggleCollapse && (
          <motion.button
            className={cn(
              "absolute -right-3 top-6 w-6 h-6 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white/80 transition-colors",
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
            className="absolute top-4 right-4 w-8 h-8 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white/80 transition-colors"
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
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
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
export function useHiveSidebar(initialCollapsed = false) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [activeItemId, setActiveItemId] = useState<string | undefined>();
  
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const setCollapsed = (collapsed: boolean) => setIsCollapsed(collapsed);
  const setActiveItem = (itemId: string) => setActiveItemId(itemId);
  
  return {
    isCollapsed,
    activeItemId,
    toggleCollapse,
    setCollapsed,
    setActiveItem,
  };
}

export { 
  HiveSidebar,
  hiveSidebarVariants
};