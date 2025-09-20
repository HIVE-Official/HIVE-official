"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { 
  Plus, 
  Zap, 
  Users, 
  Calendar, 
  MessageSquare, 
  Search,
  Settings,
  User,
  Home,
  Code,
  Heart,
  Share2,
  Edit,
  X
} from 'lucide-react';

export interface QuickAction {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'create' | 'navigate' | 'social' | 'system';
  shortcut?: string;
  disabled?: boolean
}

interface QuickActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: (action: QuickAction) => void;
  position?: { x: number; y: number } | null;
  className?: string
}

// Default quick actions
const defaultQuickActions: QuickAction[] = [
  // Create Actions
  {
    id: 'create-tool',
    title: 'Create Tool',
    description: 'Build a new tool in HiveLAB',
    icon: <Zap size={18} />,
    action: () => window.location.href = '/build',
    category: 'create',
    shortcut: '⌘T'
  },
  {
    id: 'create-event',
    title: 'Create Event',
    description: 'Schedule a new event',
    icon: <Calendar size={18} />,
    action: () => window.location.href = '/calendar?create=true',
    category: 'create',
    shortcut: '⌘E'
  },
  {
    id: 'create-post',
    title: 'Create Post',
    description: 'Share with your spaces',
    icon: <MessageSquare size={18} />,
    action: () => window.location.href = '/?compose=true',
    category: 'create'
  },
  
  // Navigate Actions
  {
    id: 'browse-spaces',
    title: 'Browse Spaces',
    description: 'Discover communities',
    icon: <Users size={18} />,
    action: () => window.location.href = '/spaces/browse',
    category: 'navigate',
    shortcut: '⌘2'
  },
  {
    id: 'tools-gallery',
    title: 'Tools Gallery',
    description: 'Explore available tools',
    icon: <Code size={18} />,
    action: () => window.location.href = '/tools',
    category: 'navigate',
    shortcut: '⌘3'
  },
  {
    id: 'my-profile',
    title: 'My Profile',
    description: 'View your profile',
    icon: <User size={18} />,
    action: () => window.location.href = '/profile',
    category: 'navigate',
    shortcut: '⌘5'
  },
  
  // Social Actions
  {
    id: 'join-space',
    title: 'Join Space',
    description: 'Find communities to join',
    icon: <Heart size={18} />,
    action: () => window.location.href = '/spaces?action=join',
    category: 'social'
  },
  {
    id: 'share-tool',
    title: 'Share Tool',
    description: 'Share a tool with spaces',
    icon: <Share2 size={18} />,
    action: () => window.location.href = '/tools?action=share',
    category: 'social'
  },
  
  // System Actions
  {
    id: 'search',
    title: 'Global Search',
    description: 'Search across HIVE',
    icon: <Search size={18} />,
    action: () => {
      // This would trigger the command palette
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        ctrlKey: true
      });
      document.dispatchEvent(event)
    },
    category: 'system',
    shortcut: '⌘K'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Account preferences',
    icon: <Settings size={18} />,
    action: () => window.location.href = '/settings',
    category: 'system'
  }
];

const categoryStyles = {
  create: 'text-green-400 bg-green-400/10',
  navigate: 'text-blue-400 bg-blue-400/10',
  social: 'text-purple-400 bg-purple-400/10',
  system: 'text-yellow-400 bg-yellow-400/10'
};

const categoryLabels = {
  create: 'Create',
  navigate: 'Navigate',
  social: 'Social',
  system: 'System'
};

export function QuickActionsMenu({
  isOpen,
  onClose,
  onAction,
  position = null,
  className
}: QuickActionsMenuProps) {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  
  const handleActionClick = (action: QuickAction) => {
    if (!action.disabled) {
      onAction?.(action);
      action.action();
      onClose()
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  };

  // Group actions by category
  const groupedActions = defaultQuickActions.reduce((groups, action) => {
    if (!groups[action.category]) {
      groups[action.category] = []
    }
    groups[action.category].push(action);
    return groups
  }, {} as Record<string, QuickAction[]>);

  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: position ? 0 : -20,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const,
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.1 }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.15, ease: "easeOut" as const }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--hive-background-primary)]/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Menu */}
          <motion.div
            className={cn(
              "fixed z-50 w-80 bg-[color-mix(in_srgb,var(--hive-background-primary)_95%,transparent)] backdrop-blur-xl border border-[color-mix(in_srgb,var(--hive-border-hover)_60%,transparent)] rounded-2xl shadow-2xl overflow-hidden",
              position 
                ? "absolute" 
                : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
              className
            )}
            style={position ? { 
              left: Math.min(position.x, window.innerWidth - 320),
              top: Math.min(position.y, window.innerHeight - 400)
            } : {}}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
              <h2 className="text-lg font-semibold text-[var(--hive-text-primary)]">Quick Actions</h2>
              <button
                onClick={onClose}
                className="p-1 text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] transition-colors rounded-lg hover:bg-[var(--hive-interactive-hover)]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Actions */}
            <div className="max-h-96 overflow-y-auto p-2">
              {Object.entries(groupedActions).map(([category, actions]) => (
                <div key={category} className="mb-4 last:mb-0">
                  {/* Category Header */}
                  <div className="px-3 py-2 text-xs font-medium text-[var(--hive-text-primary)]/60 uppercase tracking-wider">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </div>

                  {/* Category Actions */}
                  <div className="space-y-1">
                    {actions.map((action) => (
                      <motion.button
                        key={action.id}
                        variants={itemVariants}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200",
                          "hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)]",
                          hoveredAction === action.id && "bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)]",
                          action.disabled && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={() => handleActionClick(action)}
                        onMouseEnter={() => setHoveredAction(action.id)}
                        onMouseLeave={() => setHoveredAction(null)}
                        disabled={action.disabled}
                      >
                        {/* Icon */}
                        <div className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
                          categoryStyles[action.category],
                          hoveredAction === action.id && "scale-110"
                        )}>
                          {action.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[var(--hive-text-primary)] font-medium text-sm truncate">
                            {action.title}
                          </div>
                          {action.description && (
                            <div className="text-[var(--hive-text-primary)]/50 text-xs truncate">
                              {action.description}
                            </div>
                          )}
                        </div>

                        {/* Shortcut */}
                        {action.shortcut && (
                          <div className="text-xs font-mono text-[var(--hive-text-primary)]/40 bg-[var(--hive-interactive-hover)] px-2 py-1 rounded border border-[var(--hive-interactive-active)]">
                            {action.shortcut}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 bg-[var(--hive-background-primary)]/20 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
              <div className="text-xs text-[var(--hive-text-primary)]/50 text-center">
                Press <kbd className="px-1 py-0.5 bg-[var(--hive-text-primary)]/10 rounded text-[var(--hive-text-primary)]/60">Esc</kbd> to close
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hook for managing quick actions menu
export function useQuickActionsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const open = (pos?: { x: number; y: number }) => {
    if (pos) {
      setPosition(pos)
    } else {
      setPosition(null)
    }
    setIsOpen(true)
  };

  const close = () => {
    setIsOpen(false);
    setPosition(null)
  };

  const toggle = (pos?: { x: number; y: number }) => {
    if (isOpen) {
      close()
    } else {
      open(pos)
    }
  };

  return {
    isOpen,
    position,
    open,
    close,
    toggle
  }
}

