"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlignJustify, 
  Search, 
  Bell, 
  Command, 
  Zap, 
  Settings,
  ChevronDown,
  Users,
  Home,
  Calendar,
  BookOpen,
  Code,
  Compass,
  Star,
  UserPlus,
  Plus,
  Bookmark,
  Activity,
  Coffee,
  Globe,
  Headphones,
  MessageSquare,
  Camera,
  PenTool,
  Layers,
  Database,
  BarChart3,
  GitBranch,
  Shield,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';

// Navigation item types
interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  description?: string;
  featured?: boolean;
  children?: NavItem[];
  disabled?: boolean;
  external?: boolean;
}

interface User {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  builderStatus?: 'none' | 'pending' | 'active';
  role?: 'student' | 'faculty' | 'admin';
}

interface EnhancedNavigationBarProps {
  user?: User | null;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
  showGlobalSearch?: boolean;
  showNotifications?: boolean;
  onOpenNotifications?: () => void;
  onOpenCommandPalette?: () => void;
  unreadNotificationCount?: number;
  className?: string;
  navigationItems?: NavItem[];
  onToggleNavigationMode?: () => void;
}

// Default navigation structure with nested items
const defaultNavigationItems: NavItem[] = [
  {
    id: 'spaces',
    label: 'Spaces',
    icon: <Users size={16} />,
    children: [
      {
        id: 'my-spaces',
        label: 'My Spaces',
        icon: <Home size={14} />,
        href: '/spaces',
        description: 'Spaces you\'re a member of'
      },
      {
        id: 'discover-spaces',
        label: 'Discover',
        icon: <Compass size={14} />,
        href: '/spaces/discover',
        description: 'Find new spaces to join'
      },
      {
        id: 'create-space',
        label: 'Create Space',
        icon: <Plus size={14} />,
        href: '/spaces/create',
        description: 'Start a new space',
        featured: true
      },
      {
        id: 'space-categories',
        label: 'Categories',
        icon: <Layers size={14} />,
        children: [
          {
            id: 'academic',
            label: 'Academic',
            icon: <BookOpen size={12} />,
            href: '/spaces/category/academic'
          },
          {
            id: 'social',
            label: 'Social',
            icon: <Coffee size={12} />,
            href: '/spaces/category/social'
          },
          {
            id: 'professional',
            label: 'Professional',
            icon: <Star size={12} />,
            href: '/spaces/category/professional'
          },
          {
            id: 'creative',
            label: 'Creative',
            icon: <Camera size={12} />,
            href: '/spaces/category/creative'
          }
        ]
      }
    ]
  },
  {
    id: 'hivelab',
    label: 'HiveLab',
    icon: <Zap size={16} />,
    children: [
      {
        id: 'builder-console',
        label: 'Builder Console',
        icon: <Code size={14} />,
        href: '/hivelab/console',
        description: 'Manage your tools and projects'
      },
      {
        id: 'tool-templates',
        label: 'Templates',
        icon: <PenTool size={14} />,
        href: '/hivelab/templates',
        description: 'Pre-built tool templates'
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: <BarChart3 size={14} />,
        href: '/hivelab/analytics',
        description: 'Usage insights and metrics'
      },
      {
        id: 'builder-tools',
        label: 'Builder Tools',
        icon: <GitBranch size={14} />,
        children: [
          {
            id: 'visual-builder',
            label: 'Visual Builder',
            icon: <Layers size={12} />,
            href: '/hivelab/build/visual',
            featured: true
          },
          {
            id: 'code-editor',
            label: 'Code Editor',
            icon: <Code size={12} />,
            href: '/hivelab/build/code'
          },
          {
            id: 'database',
            label: 'Database Tools',
            icon: <Database size={12} />,
            href: '/hivelab/build/database'
          }
        ]
      }
    ]
  },
  {
    id: 'feed',
    label: 'Feed',
    icon: <Activity size={16} />,
    children: [
      {
        id: 'home-feed',
        label: 'Home',
        icon: <Home size={14} />,
        href: '/feed',
        description: 'Your personalized activity feed'
      },
      {
        id: 'trending',
        label: 'Trending',
        icon: <Sparkles size={14} />,
        href: '/feed/trending',
        description: 'Popular content across campus'
      },
      {
        id: 'bookmarks',
        label: 'Bookmarks',
        icon: <Bookmark size={14} />,
        href: '/feed/bookmarks',
        description: 'Saved posts and content'
      },
      {
        id: 'discussions',
        label: 'Discussions',
        icon: <MessageSquare size={14} />,
        href: '/feed/discussions',
        description: 'Active conversations'
      }
    ]
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: <BookOpen size={16} />,
    children: [
      {
        id: 'help-center',
        label: 'Help Center',
        icon: <Headphones size={14} />,
        href: '/help',
        description: 'Documentation and guides'
      },
      {
        id: 'community',
        label: 'Community',
        icon: <Globe size={14} />,
        href: '/community',
        description: 'Connect with other users'
      },
      {
        id: 'campus-guide',
        label: 'Campus Guide',
        icon: <Compass size={14} />,
        href: '/guide',
        description: 'Navigate your institution'
      }
    ]
  }
];

// Dropdown menu animation variants
const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any
    }
  }
};

const submenuVariants = {
  hidden: {
    opacity: 0,
    x: -10,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any
    }
  }
};

// Dropdown Menu Component
function DropdownMenu({ 
  trigger, 
  items, 
  isOpen, 
  onToggle, 
  onClose 
}: {
  trigger: React.ReactNode;
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
        setActiveSubmenu(null);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isSubmenuActive = activeSubmenu === item.id;

    return (
      <div key={item.id} className="relative">
        <motion.button
          className={cn(
            "w-full flex items-center justify-between px-3 py-2.5 text-left text-sm rounded-lg transition-colors",
            level === 0 ? "hover:bg-[var(--hive-text-primary)]/10" : "hover:bg-[var(--hive-text-primary)]/5",
            item.featured && "bg-yellow-500/10 border border-yellow-500/20",
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => {
            if (hasChildren) {
              setActiveSubmenu(isSubmenuActive ? null : item.id);
            } else {
              item.onClick?.();
              onClose();
            }
          }}
          onMouseEnter={() => hasChildren && setActiveSubmenu(item.id)}
          disabled={item.disabled}
          whileHover={{ x: level === 0 ? 2 : 1 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {item.icon && (
              <div className={cn(
                "text-current shrink-0",
                item.featured && "text-yellow-400"
              )}>
                {item.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className={cn(
                "font-medium truncate",
                level === 0 ? "text-[var(--hive-text-primary)]" : "text-[var(--hive-text-primary)]/90",
                item.featured && "text-yellow-400"
              )}>
                {item.label}
              </div>
              {item.description && level === 0 && (
                <div className="text-xs text-[var(--hive-text-primary)]/60 truncate mt-0.5">
                  {item.description}
                </div>
              )}
            </div>
            {item.badge && (
              <span className="bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronDown 
                className={cn(
                  "w-4 h-4 transition-transform shrink-0",
                  level > 0 ? "rotate-[-90deg]" : "",
                  isSubmenuActive && level === 0 && "rotate-180"
                )}
              />
            )}
          </div>
        </motion.button>

        {/* Submenu */}
        {hasChildren && (
          <AnimatePresence>
            {isSubmenuActive && (
              <motion.div
                className={cn(
                  level === 0 
                    ? "absolute left-full top-0 ml-1 w-64 bg-[var(--hive-background-primary)]/90 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl z-50"
                    : "mt-1 ml-6 space-y-1"
                )}
                variants={level === 0 ? submenuVariants : dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {item.children!.map(child => renderNavItem(child, level + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={onToggle}>
        {trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-80 bg-[var(--hive-background-primary)]/90 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl z-50"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="space-y-1">
              {items.map(item => renderNavItem(item))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// User Menu Component
function UserMenu({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);

  const userMenuItems: NavItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <Users size={14} />,
      href: '/profile',
      description: 'View and edit your profile'
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: <Settings size={14} />,
      children: [
        {
          id: 'privacy',
          label: 'Privacy',
          icon: <Shield size={12} />,
          href: '/settings/privacy'
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: <Bell size={12} />,
          href: '/settings/notifications'
        },
        {
          id: 'preferences',
          label: 'Preferences',
          icon: <Settings size={12} />,
          href: '/settings/preferences'
        }
      ]
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: <Users size={14} />,
      onClick: () => console.log('Logout')
    }
  ];

  const userInitial = user.avatar || user.name[0] || 'U';

  return (
    <DropdownMenu
      trigger={
        <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[var(--hive-text-primary)]/10 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[var(--hive-background-primary)] text-sm font-medium">
            {userInitial}
          </div>
          <ChevronDown className="w-4 h-4 text-[var(--hive-text-primary)]/60" />
        </button>
      }
      items={userMenuItems}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onClose={() => setIsOpen(false)}
    />
  );
}

// Main Enhanced Navigation Bar
export function EnhancedNavigationBar({
  user,
  onToggleSidebar,
  sidebarCollapsed,
  showGlobalSearch = true,
  showNotifications = true,
  onOpenNotifications,
  onOpenCommandPalette,
  unreadNotificationCount = 0,
  className,
  navigationItems = defaultNavigationItems,
  onToggleNavigationMode
}: EnhancedNavigationBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16",
        "backdrop-blur-xl border-b",
        "flex items-center justify-between px-6",
        "transition-all duration-300 ease-out",
        className
      )}
      style={{
        background: 'color-mix(in_srgb,var(--hive-background-primary)_80%,transparent)',
        backdropFilter: 'blur(4) saturate(180%)',
        borderColor: 'var(--hive-interactive-active)',
      }}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        {/* Sidebar Toggle */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors"
          >
            <AlignJustify className="w-5 h-5" />
          </button>
        )}

        {/* HIVE Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-[var(--hive-background-primary)] rounded-sm" />
          </div>
          <span className="font-bold text-xl text-[var(--hive-text-primary)] tracking-tight">
            HIVE
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <DropdownMenu
              key={item.id}
              trigger={
                <button className="flex items-center space-x-1 px-3 py-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {item.children && (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
              }
              items={item.children || []}
              isOpen={openDropdown === item.id}
              onToggle={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
              onClose={closeAllDropdowns}
            />
          ))}
        </nav>
      </div>

      {/* Center Section - Global Search */}
      {showGlobalSearch && (
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-primary)]/40" />
            <input
              type="text"
              placeholder="Search spaces, people, tools..."
              onClick={onOpenCommandPalette}
              readOnly
              className="w-full h-10 pl-10 pr-16 bg-[var(--hive-text-primary)]/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm text-[var(--hive-text-primary)] placeholder-white/40 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 cursor-pointer hover:border-white/30"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <kbd className="inline-flex items-center px-1.5 py-0.5 rounded-lg text-xs bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/60 border border-white/20">
                <Command className="w-3 h-3 mr-1" />
                K
              </kbd>
            </div>
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Navigation Mode Toggle */}
        {onToggleNavigationMode && (
          <button
            onClick={onToggleNavigationMode}
            className="p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors"
            title="Switch to Sidebar Navigation"
          >
            <AlignJustify className="w-5 h-5" />
          </button>
        )}

        {/* Builder Access */}
        {user?.builderStatus !== 'none' && (
          <button className="p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors relative">
            <Zap className="w-5 h-5" />
            {user?.builderStatus === 'active' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            )}
          </button>
        )}

        {/* Notifications */}
        {showNotifications && (
          <button 
            onClick={onOpenNotifications}
            className="p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center rounded-full font-medium bg-yellow-400 text-[var(--hive-background-primary)]">
                {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
              </div>
            )}
          </button>
        )}

        {/* Settings */}
        <button className="p-2 rounded-lg text-[var(--hive-text-primary)]/80 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/10 transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* User Menu */}
        {user ? (
          <UserMenu user={user} />
        ) : (
          <button className="px-4 py-2 bg-yellow-400 text-[var(--hive-background-primary)] rounded-lg font-medium hover:bg-yellow-300 transition-colors">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}