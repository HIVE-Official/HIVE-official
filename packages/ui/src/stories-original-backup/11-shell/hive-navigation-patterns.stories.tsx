import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { 
  Home, 
  BookOpen, 
  Users, 
  Wrench, 
  Search, 
  Plus, 
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Pin,
  Calendar,
  Settings,
  Share,
  Crown,
  Bell,
  Hash,
  MapPin,
  Activity,
  Star,
  Building,
  GraduationCap,
  Sparkles,
  Zap,
  MessageCircle
} from 'lucide-react';

const meta: Meta = {
  title: '11. Shell/HIVE Navigation Patterns',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Navigation System - Scalable Foundation

## 🎯 Core Philosophy
**Simplified, Scalable, Signature HIVE Aesthetic**

The HIVE navigation system is built on a foundation of 4 core items that can scale elegantly as new features are added. Each pattern maintains the luxury design aesthetic while providing different interaction models for various use cases.

## 🏗️ Navigation Structure
- **Spaces** - Join and discover campus communities
- **Feed** - Latest posts and campus activity  
- **Profile** - Your profile and achievements
- **HiveLAB** - Build tools for your spaces (Coming Soon)

## 📱 Pattern Comparison

### Pattern 1: Persistent Sidebar
**Best For**: Desktop workflows, power users, multi-tasking
- Fixed sidebar with university branding
- Contextual content area based on active navigation
- Search and quick actions always available
- Space exploration with activity indicators

### Pattern 2: Dynamic Header  
**Best For**: Content-focused workflows, mobile-first design
- Horizontal navigation with HIVE branding
- Surface tabs appear for complex features (like Spaces)
- Breadcrumb navigation for spatial awareness
- Clean content-first layout

### Pattern 3: Mobile Responsive
**Best For**: Touch devices, limited screen space
- Horizontal scrolling navigation tabs
- Slide-out drawer for detailed navigation
- Touch-optimized interactions

## 🎨 Design System Integration
- **HIVE Design Tokens**: Consistent colors, spacing, typography
- **Glass Morphism**: Signature backdrop blur effects
- **Gold Accents**: Brand primary color for interactions
- **Luxury Aesthetics**: Premium feel with semantic design tokens
- **Scalable Architecture**: Easy to extend with new features

## 🚀 Extensibility
This foundation supports future features through:
- Dynamic navigation item loading
- Permission-based feature access
- Real-time notification system
- Sub-navigation (surfaces) for complex features
- Cross-device responsive patterns
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Core HIVE Navigation Structure - Simplified to 4 main items
const hiveNavigation = {
  mainNavItems: [
    {
      id: 'spaces',
      name: 'Spaces',
      icon: Building,
      path: '/spaces',
      isActive: true,
      hasNotifications: true,
      notificationCount: 3,
      description: 'Join and discover campus communities'
    },
    {
      id: 'feed',
      name: 'Feed',
      icon: Activity,
      path: '/feed',
      isActive: false,
      hasNotifications: false,
      notificationCount: 0,
      description: 'Latest posts and campus activity'
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: Users,
      path: '/profile',
      isActive: false,
      hasNotifications: false,
      notificationCount: 0,
      description: 'Your profile and achievements'
    },
    {
      id: 'hivelab',
      name: 'HiveLAB',
      icon: Wrench,
      path: '/hivelab',
      isActive: false,
      isDisabled: true, // Currently disabled/coming soon
      hasNotifications: false,
      notificationCount: 0,
      description: 'Build tools for your spaces (Coming Soon)'
    }
  ]
};

// Mock data for content areas
const mockSpaces = [
  { id: 'cs-department', name: 'Computer Science', members: 1247, isActive: true, activity: 'high' as const },
  { id: 'engineering', name: 'Engineering Hub', members: 2156, isActive: false, activity: 'medium' as const },
  { id: 'class-2026', name: 'Class of 2026', members: 3421, isActive: false, activity: 'low' as const },
  { id: 'study-groups', name: 'Study Groups', members: 567, isActive: false, activity: 'medium' as const }
];

const mockFeedItems = [
  { id: 1, type: 'post', title: 'New project showcase', author: 'Alex Chen', time: '2h ago' },
  { id: 2, type: 'event', title: 'Tech meetup tomorrow', author: 'CS Department', time: '4h ago' },
  { id: 3, type: 'achievement', title: 'Sarah completed Python course', author: 'Study Groups', time: '6h ago' }
];

const mockProfile = {
  name: 'Student Name',
  handle: '@student2026',
  achievements: 5,
  spacesJoined: 8,
  toolsBuilt: 0
};

const currentSpace = {
  id: 'spaces',
  name: 'Spaces',
  type: 'Main Navigation',
  members: '12.4k',
  activeTools: 24,
  surfaces: ['🏠 My Spaces', '🔍 Discover', '⭐ Favorites'],
  currentSurface: '🏠 My Spaces'
};

// HIVE Activity indicator with proper design tokens
function HiveActivityIndicator({ level }: { level: 'high' | 'medium' | 'low' }) {
  const activityStyles = {
    high: {
      bg: 'bg-[var(--hive-status-error)]',
      glow: 'shadow-[0_0_8px_color-mix(in_srgb,var(--hive-status-error)_40%,transparent)]',
      pulse: 'animate-pulse'
    },
    medium: {
      bg: 'bg-[var(--hive-status-warning)]', 
      glow: 'shadow-[0_0_8px_rgba(245,158,11,0.4)]',
      pulse: 'animate-pulse'
    },
    low: {
      bg: 'bg-[var(--hive-status-success)]',
      glow: 'shadow-[0_0_8px_rgba(16,185,129,0.4)]',
      pulse: 'animate-pulse'
    }
  };
  
  const style = activityStyles[level];
  
  return (
    <motion.div 
      className={`w-2 h-2 rounded-full ${style.bg} ${style.glow} ${style.pulse}`}
      initial={{ scale: 0.8, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}

// Pattern 1: Persistent Campus Sidebar with HIVE Design System
function PersistentCampusSidebar() {
  const [activeNavItem, setActiveNavItem] = useState('spaces');
  const [selectedSpace, setSelectedSpace] = useState('cs-department');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavItemClick = (navId: string) => {
    const navItem = hiveNavigation.mainNavItems.find(item => item.id === navId);
    if (navItem && !navItem.isDisabled) {
      setActiveNavItem(navId);
    } else if (navItem?.isDisabled) {
      alert('HiveLAB is coming soon! 🚀');
    }
  };

  const handleSpaceClick = (spaceId: string) => {
    setSelectedSpace(spaceId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getActiveNavItem = () => {
    return hiveNavigation.mainNavItems.find(item => item.id === activeNavItem) || hiveNavigation.mainNavItems[0];
  };

  const getSelectedSpaceInfo = () => {
    return mockSpaces.find(space => space.id === selectedSpace) || mockSpaces[0];
  };

  return (
    <div className="flex h-screen bg-[var(--hive-background-primary)] font-sans">
      {/* HIVE Sidebar with Glass Morphism */}
      <motion.div 
        className="w-80 bg-[var(--hive-overlay-glass)] backdrop-blur-xl border-r border-[var(--hive-border-glass)] flex flex-col"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* University Header with HIVE Branding */}
        <div className="p-6 border-b border-[var(--hive-border-glass)]">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-2xl flex items-center justify-center shadow-[var(--hive-shadow-gold-glow)] group-hover:shadow-[var(--hive-shadow-gold-glow-strong)] transition-all duration-300">
                <Building className="w-7 h-7 text-[var(--hive-text-inverse)]" />
              </div>
              <div className="absolute inset-0 bg-[var(--hive-overlay-gold-subtle)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-[var(--hive-text-primary)] tracking-tight">
                UB Buffalo
              </h2>
              <p className="text-sm text-[var(--hive-text-muted)] font-medium">Campus Digital Hub</p>
            </div>
          </motion.div>
        </div>

        {/* Core HIVE Navigation */}
        <div className="px-6 py-4">
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[var(--hive-brand-primary)]" />
              <h3 className="text-sm font-display font-semibold text-[var(--hive-text-muted)] uppercase tracking-wider">
                Navigation
              </h3>
            </div>
          </motion.div>
          
          <div className="space-y-3">
            {hiveNavigation.mainNavItems.map((navItem, index) => (
              <motion.div
                key={navItem.id}
                className="group relative"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <HiveCard
                  variant="glass"
                  className={`p-4 border-[var(--hive-border-glass)] transition-all duration-300 cursor-pointer group ${
                    navItem.isDisabled
                      ? 'opacity-50 hover:opacity-75 bg-[var(--hive-background-disabled)]/20 border-[var(--hive-border-disabled)]/30'
                      : activeNavItem === navItem.id 
                        ? 'bg-[var(--hive-overlay-gold-medium)] border-[var(--hive-border-gold)] shadow-[var(--hive-shadow-gold-glow)]' 
                        : 'hover:bg-[var(--hive-overlay-gold-subtle)] hover:border-[var(--hive-border-gold)]'
                  }`}
                  onClick={() => handleNavItemClick(navItem.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl transition-all duration-300 ${
                        navItem.isDisabled 
                          ? 'bg-[var(--hive-text-disabled)]/20'
                          : activeNavItem === navItem.id
                            ? 'bg-[var(--hive-brand-primary)]/20 group-hover:bg-[var(--hive-brand-primary)]/30'
                            : 'bg-[var(--hive-overlay-glass-medium)] group-hover:bg-[var(--hive-brand-primary)]/20'
                      }`}>
                        <navItem.icon className={`w-5 h-5 transition-colors ${
                          navItem.isDisabled
                            ? 'text-[var(--hive-text-disabled)]'
                            : activeNavItem === navItem.id 
                              ? 'text-[var(--hive-brand-primary)]'
                              : 'text-[var(--hive-text-muted)] group-hover:text-[var(--hive-brand-primary)]'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-semibold transition-colors ${
                            navItem.isDisabled
                              ? 'text-[var(--hive-text-disabled)]'
                              : activeNavItem === navItem.id 
                                ? 'text-[var(--hive-brand-primary)]' 
                                : 'text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)]'
                          }`}>
                            {navItem.name}
                          </span>
                          {navItem.isDisabled && (
                            <span className="text-xs bg-[var(--hive-text-disabled)]/20 text-[var(--hive-text-disabled)] px-2 py-1 rounded-full">
                              Soon
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-1 transition-colors ${
                          navItem.isDisabled
                            ? 'text-[var(--hive-text-disabled)]'
                            : 'text-[var(--hive-text-muted)]'
                        }`}>
                          {navItem.description}
                        </p>
                      </div>
                    </div>
                    {navItem.hasNotifications && navItem.notificationCount > 0 && (
                      <motion.div 
                        className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-[var(--hive-shadow-gold-glow)]"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {navItem.notificationCount}
                      </motion.div>
                    )}
                  </div>
                </HiveCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Navigation Content */}
        {activeNavItem === 'spaces' && (
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Building className="w-4 h-4 text-[var(--hive-brand-primary)]" />
              <h3 className="text-sm font-display font-semibold text-[var(--hive-text-muted)] uppercase tracking-wider">
                Your Spaces
              </h3>
            </motion.div>
            
            <div className="space-y-2">
              {mockSpaces.map((space, index) => (
                <motion.div
                  key={space.id}
                  className="group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                >
                  <HiveCard
                    variant="subtle"
                    className={`p-3 border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)] cursor-pointer transition-all duration-200 ${
                      selectedSpace === space.id 
                        ? 'bg-[var(--hive-overlay-gold-subtle)] border-[var(--hive-border-gold)]' 
                        : 'hover:bg-[var(--hive-overlay-glass-medium)]'
                    }`}
                    onClick={() => handleSpaceClick(space.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium transition-colors ${
                        selectedSpace === space.id 
                          ? 'text-[var(--hive-brand-primary)]' 
                          : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'
                      }`}>
                        {space.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[var(--hive-text-muted)] font-medium">{space.members}</span>
                        <HiveActivityIndicator level={space.activity} />
                      </div>
                    </div>
                  </HiveCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeNavItem === 'feed' && (
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Activity className="w-4 h-4 text-[var(--hive-brand-primary)]" />
              <h3 className="text-sm font-display font-semibold text-[var(--hive-text-muted)] uppercase tracking-wider">
                Recent Activity
              </h3>
            </motion.div>
            
            <div className="space-y-3">
              {mockFeedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                >
                  <HiveCard variant="subtle" className="p-3 border-[var(--hive-border-subtle)] hover:bg-[var(--hive-overlay-glass-medium)] transition-all duration-200">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-3 h-3 text-[var(--hive-brand-primary)]" />
                        <span className="text-sm font-medium text-[var(--hive-text-primary)]">{item.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-[var(--hive-text-muted)]">
                        <span>{item.author}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </HiveCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeNavItem === 'profile' && (
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Users className="w-4 h-4 text-[var(--hive-brand-primary)]" />
              <h3 className="text-sm font-display font-semibold text-[var(--hive-text-muted)] uppercase tracking-wider">
                Profile Overview
              </h3>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <HiveCard variant="glass" className="p-4 border-[var(--hive-border-glass)] bg-[var(--hive-overlay-glass-medium)]">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-[var(--hive-text-inverse)]" />
                    </div>
                    <div>
                      <div className="font-medium text-[var(--hive-text-primary)]">{mockProfile.name}</div>
                      <div className="text-sm text-[var(--hive-text-muted)]">{mockProfile.handle}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[var(--hive-brand-primary)]">{mockProfile.spacesJoined}</div>
                      <div className="text-xs text-[var(--hive-text-muted)]">Spaces</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[var(--hive-brand-primary)]">{mockProfile.achievements}</div>
                      <div className="text-xs text-[var(--hive-text-muted)]">Achievements</div>
                    </div>
                  </div>
                </div>
              </HiveCard>
            </motion.div>
          </div>
        )}

        {/* HIVE Bottom Actions */}
        <div className="p-6 border-t border-[var(--hive-border-glass)] space-y-4">
          <motion.div 
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search spaces..."
              className="w-full pl-11 pr-4 py-3 bg-[var(--hive-overlay-glass)] backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-border-gold)] focus:bg-[var(--hive-overlay-glass-medium)] focus:shadow-[var(--hive-shadow-focus)] transition-all duration-300 font-medium"
            />
            {searchQuery && (
              <motion.div 
                className="absolute top-full left-0 right-0 mt-2 bg-[var(--hive-overlay-glass-strong)] backdrop-blur-xl border border-[var(--hive-border-glass)] rounded-xl p-2 z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="text-xs text-[var(--hive-text-muted)] mb-2 px-2">
                  Search results for "{searchQuery}"
                </div>
                {mockSpaces
                  .filter(space => space.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .slice(0, 5)
                  .map(space => (
                    <div
                      key={space.id}
                      onClick={() => {
                        handleSpaceClick(space.id);
                        setSearchQuery('');
                        setActiveNavItem('spaces');
                      }}
                      className="p-2 hover:bg-[var(--hive-overlay-gold-subtle)] rounded-lg cursor-pointer transition-colors"
                    >
                      <span className="text-sm text-[var(--hive-text-primary)]">{space.name}</span>
                    </div>
                  ))}
              </motion.div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <HiveButton 
              variant="premium"
              className="w-full py-3 shadow-[var(--hive-shadow-gold-glow)] hover:shadow-[var(--hive-shadow-gold-glow-strong)] transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="font-semibold">New Space</span>
            </HiveButton>
          </motion.div>
        </div>
      </motion.div>

      {/* HIVE Main Content Area */}
      <div className="flex-1 bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            key={activeNavItem}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-display font-bold text-[var(--hive-text-primary)] mb-2 tracking-tight">
              Pattern 1: Persistent Campus Sidebar
            </h1>
            <p className="text-lg text-[var(--hive-text-muted)] mb-8 font-medium">
              Simplified 4-item navigation focused on core HIVE functionality
            </p>
          </motion.div>
          
          <motion.div
            key={`content-${activeNavItem}-${selectedSpace}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <HiveCard variant="elevated" className="p-8 bg-[var(--hive-overlay-glass)] backdrop-blur-xl border-[var(--hive-border-glass)]">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-2xl flex items-center justify-center shadow-[var(--hive-shadow-gold-glow)]">
                  {React.createElement(getActiveNavItem().icon, { className: "w-6 h-6 text-[var(--hive-text-inverse)]" })}
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-[var(--hive-text-primary)] mb-2">
                    {getActiveNavItem().name}
                  </h2>
                  <p className="text-[var(--hive-text-muted)] text-lg">
                    {getActiveNavItem().description}
                  </p>
                  {activeNavItem === 'spaces' && (
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                        <span className="text-sm font-medium text-[var(--hive-text-secondary)]">
                          {getSelectedSpaceInfo().members} members
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                        <span className="text-sm font-medium text-[var(--hive-text-secondary)]">
                          {getSelectedSpaceInfo().activity} activity
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {activeNavItem === 'spaces' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <HiveCard variant="glass" className="p-6 bg-[var(--hive-overlay-glass-medium)] border-[var(--hive-border-glass)]">
                    <div className="flex items-center space-x-3 mb-4">
                      <Activity className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Recent Activity</h3>
                    </div>
                    <p className="text-[var(--hive-text-muted)] font-medium">
                      Latest posts and discussions from {getSelectedSpaceInfo().name}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[var(--hive-status-success)] rounded-full" />
                        <span className="text-sm text-[var(--hive-text-secondary)]">New project collaboration started</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[var(--hive-status-warning)] rounded-full" />
                        <span className="text-sm text-[var(--hive-text-secondary)]">Study group forming for finals</span>
                      </div>
                    </div>
                  </HiveCard>
                  
                  <HiveCard variant="glass" className="p-6 bg-[var(--hive-overlay-glass-medium)] border-[var(--hive-border-glass)]">
                    <div className="flex items-center space-x-3 mb-4">
                      <Wrench className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Space Tools</h3>
                    </div>
                    <p className="text-[var(--hive-text-muted)] font-medium">
                      Custom tools built for this space community
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-3 h-3 text-[var(--hive-brand-primary)]" />
                        <span className="text-sm text-[var(--hive-text-secondary)]">CodeShare Pro</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-3 h-3 text-[var(--hive-brand-primary)]" />
                        <span className="text-sm text-[var(--hive-text-secondary)]">Study Scheduler</span>
                      </div>
                    </div>
                  </HiveCard>
                </div>
              )}

              {activeNavItem === 'feed' && (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <Activity className="w-16 h-16 text-[var(--hive-brand-primary)] mx-auto mb-4 opacity-60" />
                    <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">Campus Activity Feed</h3>
                    <p className="text-[var(--hive-text-muted)] max-w-md mx-auto">
                      Stay connected with posts, events, and updates from all your spaces in one unified feed.
                    </p>
                  </div>
                </div>
              )}

              {activeNavItem === 'profile' && (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-[var(--hive-brand-primary)] mx-auto mb-4 opacity-60" />
                    <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">Your HIVE Profile</h3>
                    <p className="text-[var(--hive-text-muted)] max-w-md mx-auto">
                      Manage your profile, view achievements, and track your journey across campus spaces.
                    </p>
                  </div>
                </div>
              )}

              {activeNavItem === 'hivelab' && (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <Wrench className="w-16 h-16 text-[var(--hive-text-disabled)] mx-auto mb-4 opacity-40" />
                    <h3 className="text-xl font-semibold text-[var(--hive-text-disabled)] mb-2">HiveLAB Coming Soon</h3>
                    <p className="text-[var(--hive-text-disabled)] max-w-md mx-auto">
                      Build custom tools and integrations for your spaces. The ultimate creator toolkit for HIVE communities.
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center px-4 py-2 bg-[var(--hive-text-disabled)]/10 border border-[var(--hive-text-disabled)]/20 rounded-full text-sm text-[var(--hive-text-disabled)]">
                        🚀 Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </HiveCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Pattern 2: Dynamic Context Header - Simplified Navigation
function DynamicContextHeader() {
  const [activeNavItem, setActiveNavItem] = useState('spaces');
  const [activeSurface, setActiveSurface] = useState('🏠 My Spaces');
  const [spaceData] = useState(currentSpace);
  const [breadcrumbs, setBreadcrumbs] = useState(['🏠 HIVE Campus', '📚 Spaces']);

  const handleNavItemClick = (navId: string) => {
    const navItem = hiveNavigation.mainNavItems.find(item => item.id === navId);
    if (navItem && !navItem.isDisabled) {
      setActiveNavItem(navId);
      // Update breadcrumbs based on navigation
      setBreadcrumbs(['🏠 HIVE Campus', `📚 ${navItem.name}`]);
    } else if (navItem?.isDisabled) {
      alert('HiveLAB is coming soon! 🚀');
    }
  };

  const handleSurfaceChange = (surface: string) => {
    setActiveSurface(surface);
  };

  const handleBreadcrumbClick = (index: number) => {
    // Navigate back in breadcrumb hierarchy
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);
  };

  return (
    <div className="h-screen bg-[var(--hive-background-primary)] flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-[var(--hive-background-secondary)]/30 backdrop-blur-xl border-b border-[var(--hive-border-primary)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-xl flex items-center justify-center">
                <Building className="w-5 h-5 text-[var(--hive-text-inverse)]" />
              </div>
              <span className="font-display font-bold text-[var(--hive-text-primary)]">HIVE</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {hiveNavigation.mainNavItems.map((navItem) => (
                <motion.button
                  key={navItem.id}
                  onClick={() => handleNavItemClick(navItem.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    navItem.isDisabled
                      ? 'text-[var(--hive-text-disabled)] cursor-not-allowed opacity-50'
                      : activeNavItem === navItem.id
                        ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)] shadow-[var(--hive-shadow-gold-glow)]'
                        : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass-medium)]'
                  }`}
                  whileHover={navItem.isDisabled ? {} : { scale: 1.05 }}
                  whileTap={navItem.isDisabled ? {} : { scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <navItem.icon className="w-4 h-4" />
                    <span>{navItem.name}</span>
                    {navItem.hasNotifications && navItem.notificationCount > 0 && (
                      <span className="bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {navItem.notificationCount}
                      </span>
                    )}
                    {navItem.isDisabled && (
                      <span className="text-xs bg-[var(--hive-text-disabled)]/20 text-[var(--hive-text-disabled)] px-1.5 py-0.5 rounded-full">
                        Soon
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-[var(--hive-text-muted)] cursor-pointer hover:text-[var(--hive-text-primary)] transition-colors" />
            <Bell className="w-5 h-5 text-[var(--hive-text-muted)] cursor-pointer hover:text-[var(--hive-text-primary)] transition-colors" />
            <div className="w-8 h-8 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center cursor-pointer">
              <Users className="w-4 h-4 text-[var(--hive-text-inverse)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Context Header */}
      <div className="bg-[var(--hive-background-secondary)]/50 backdrop-blur-xl border-b border-[var(--hive-border-primary)]">
        {/* Breadcrumb Navigation */}
        <div className="px-6 py-4 border-b border-[var(--hive-border-glass)]">
          <motion.div 
            className="flex items-center space-x-2 text-sm"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <motion.div 
                  className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                    index === breadcrumbs.length - 1 
                      ? 'text-[var(--hive-text-primary)]' 
                      : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'
                  }`}
                  onClick={() => handleBreadcrumbClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index === 0 ? (
                    <Home className="w-4 h-4" />
                  ) : (
                    <BookOpen className="w-4 h-4" />
                  )}
                  <span className={index === breadcrumbs.length - 1 ? 'font-medium' : ''}>
                    {crumb.replace('🏠 ', '').replace('📚 ', '')}
                  </span>
                </motion.div>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-[var(--hive-text-muted)]" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Space Header */}
        <div className="px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-[var(--hive-brand-primary)] rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[var(--hive-background-primary)]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">
                    {hiveNavigation.mainNavItems.find(item => item.id === activeNavItem)?.name || 'Spaces'}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-[var(--hive-text-muted)]">
                    {activeNavItem === 'spaces' && (
                      <>
                        <span>{currentSpace.members} members</span>
                        <span>•</span>
                        <span>{currentSpace.type}</span>
                        <span>•</span>
                        <span>{currentSpace.activeTools} tools active</span>
                      </>
                    )}
                    {activeNavItem === 'feed' && (
                      <>
                        <span>Campus-wide activity</span>
                        <span>•</span>
                        <span>Real-time updates</span>
                      </>
                    )}
                    {activeNavItem === 'profile' && (
                      <>
                        <span>Your HIVE profile</span>
                        <span>•</span>
                        <span>Achievements & spaces</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Surface Navigation - Only show for Spaces */}
              {activeNavItem === 'spaces' && (
                <div className="flex items-center space-x-2 mt-6">
                  {spaceData.surfaces.map((surface, index) => (
                    <motion.button
                      key={surface}
                      onClick={() => handleSurfaceChange(surface)}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        activeSurface === surface
                          ? 'bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] shadow-[var(--hive-shadow-gold-glow)]'
                          : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass-medium)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)]'
                      }`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {surface}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <motion.button 
                className="p-3 hover:bg-[var(--hive-overlay-glass-medium)] rounded-xl transition-all duration-300 group border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Share space functionality')}
              >
                <Share className="w-5 h-5 text-[var(--hive-text-muted)] group-hover:text-[var(--hive-brand-primary)] transition-colors" />
              </motion.button>
              
              <motion.button 
                className="p-3 hover:bg-[var(--hive-overlay-glass-medium)] rounded-xl transition-all duration-300 group border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Space settings')}
              >
                <Settings className="w-5 h-5 text-[var(--hive-text-muted)] group-hover:text-[var(--hive-brand-primary)] transition-colors" />
              </motion.button>
              
              <HiveButton 
                variant="premium"
                className="shadow-[var(--hive-shadow-gold-glow)] hover:shadow-[var(--hive-shadow-gold-glow-strong)]"
                onClick={() => alert('Become a builder!')}
              >
                <Crown className="w-4 h-4 mr-2" />
                <span className="font-semibold">Become Builder</span>
              </HiveButton>
            </div>
          </div>
        </div>

        {/* Active Surface Indicator */}
        <div className="px-6 pb-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-[var(--hive-text-muted)]">Currently viewing:</span>
            <span className="font-medium text-[var(--hive-text-primary)]">{activeSurface}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">
            Pattern 2: Dynamic Context Header
          </h1>
          <div className="bg-[var(--hive-background-secondary)]/30 rounded-xl p-6 border border-[var(--hive-border-primary)]">
            <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">
              {hiveNavigation.mainNavItems.find(item => item.id === activeNavItem)?.name || 'Content'} 
              {activeNavItem === 'spaces' && activeSurface ? ` - ${activeSurface}` : ''}
            </h2>
            <p className="text-[var(--hive-text-muted)] mb-6">
              Simplified navigation with top-level tabs for core HIVE functionality. 
              {activeNavItem === 'spaces' ? 'Surface navigation appears for deeper space exploration.' : ''}
            </p>
            
            {activeNavItem === 'spaces' && (
              <>
                {activeSurface === '🏠 My Spaces' && (
                  <div className="space-y-4">
                    {mockSpaces.map((space) => (
                      <div key={space.id} className="flex items-center space-x-3 p-4 bg-[var(--hive-background-tertiary)]/20 rounded-lg border border-[var(--hive-border-subtle)]">
                        <Building className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                        <div className="flex-1">
                          <h3 className="font-medium text-[var(--hive-text-primary)]">{space.name}</h3>
                          <p className="text-sm text-[var(--hive-text-muted)]">{space.members} members • {space.activity} activity</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSurface === '🔍 Discover' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-[var(--hive-background-tertiary)]/20 rounded-lg border border-[var(--hive-border-subtle)]">
                      <h3 className="font-medium text-[var(--hive-text-primary)] mb-2">Discover New Spaces</h3>
                      <p className="text-sm text-[var(--hive-text-muted)]">Find communities and spaces that match your interests and academic focus.</p>
                    </div>
                  </div>
                )}

                {activeSurface === '⭐ Favorites' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-[var(--hive-background-tertiary)]/20 rounded-lg border border-[var(--hive-border-subtle)]">
                      <Star className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                      <div>
                        <h3 className="font-medium text-[var(--hive-text-primary)]">Computer Science</h3>
                        <p className="text-sm text-[var(--hive-text-muted)]">Your primary academic space</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeNavItem === 'feed' && (
              <div className="space-y-4">
                {mockFeedItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-4 bg-[var(--hive-background-tertiary)]/20 rounded-lg border border-[var(--hive-border-subtle)]">
                    <Activity className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                    <div>
                      <h3 className="font-medium text-[var(--hive-text-primary)]">{item.title}</h3>
                      <p className="text-sm text-[var(--hive-text-muted)]">{item.author} • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeNavItem === 'profile' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[var(--hive-text-inverse)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">{mockProfile.name}</h3>
                  <p className="text-[var(--hive-text-muted)] mb-4">{mockProfile.handle}</p>
                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                    <div className="bg-[var(--hive-background-tertiary)]/20 rounded-lg p-3 border border-[var(--hive-border-subtle)]">
                      <div className="text-lg font-bold text-[var(--hive-brand-primary)]">{mockProfile.spacesJoined}</div>
                      <div className="text-sm text-[var(--hive-text-muted)]">Spaces</div>
                    </div>
                    <div className="bg-[var(--hive-background-tertiary)]/20 rounded-lg p-3 border border-[var(--hive-border-subtle)]">
                      <div className="text-lg font-bold text-[var(--hive-brand-primary)]">{mockProfile.achievements}</div>
                      <div className="text-sm text-[var(--hive-text-muted)]">Achievements</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const PersistentSidebarPattern: Story = {
  render: () => <PersistentCampusSidebar />,
  parameters: {
    docs: {
      description: {
        story: `
# Persistent Campus Sidebar Pattern

A permanent sidebar that provides:
- **Spatial Orientation**: Clear university context and location awareness
- **Quick Access Shortcuts**: Frequently used spaces with activity indicators  
- **Hierarchical Navigation**: Organized space categories (Academic, Residential, Social)
- **Progressive Discovery**: Collapsible sections that scale with user expertise
- **Live Activity**: Real-time activity indicators and unread counts

## Key Features
- 280px fixed width sidebar with university branding
- Activity dots (🔴 urgent, 🟡 moderate, 🟢 low) for real-time status
- Primary space indicators (⚡) for user's home bases  
- Drag & drop reordering for shortcuts (future enhancement)
- Always-visible search bar for quick space discovery
- One-click space creation

## UX Benefits
- Students never lose spatial orientation
- Quick access to most important spaces
- Clear visual hierarchy and organization
- Scales from newcomer to power user workflows
        `
      }
    }
  }
};

export const DynamicHeaderPattern: Story = {
  render: () => <DynamicContextHeader />,
  parameters: {
    docs: {
      description: {
        story: `
# Dynamic Context Header Pattern

A context-aware header system that provides:
- **Breadcrumb Navigation**: Clear path showing current location in campus hierarchy
- **Surface Switching**: Easy navigation between space surfaces (Pinned, Posts, Events, Tools)
- **Context Preservation**: Rich space information and status always visible
- **Action Integration**: Context-sensitive actions (share, settings, become builder)

## Key Features
- Breadcrumb trail with clickable navigation back up hierarchy
- Tab-style surface navigation with active state indicators
- Space metadata (members, type, active tools) prominently displayed
- Quick action buttons positioned for easy access
- Responsive design with horizontal scrolling on mobile

## UX Benefits
- Maintains context when moving between surfaces
- Clear indication of current location and available actions
- Fluid transitions feel like exploring connected territory
- Progressive disclosure of space features and capabilities
        `
      }
    }
  }
};

export const PatternComparison: Story = {
  render: () => {
    const [activePattern, setActivePattern] = useState<'sidebar' | 'header'>('sidebar');
    
    return (
      <div className="h-screen bg-[var(--hive-background-primary)] flex flex-col">
        {/* Pattern Switcher */}
        <div className="p-6 border-b border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)]/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-4">
              HIVE Navigation Pattern Comparison
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActivePattern('sidebar')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activePattern === 'sidebar'
                    ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]'
                    : 'bg-[var(--hive-background-tertiary)]/30 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'
                }`}
              >
                Persistent Campus Sidebar
              </button>
              <button
                onClick={() => setActivePattern('header')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activePattern === 'header'
                    ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]'
                    : 'bg-[var(--hive-background-tertiary)]/30 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'
                }`}
              >
                Dynamic Context Header
              </button>
            </div>
          </div>
        </div>
        
        {/* Pattern Display */}
        <div className="flex-1 overflow-hidden">
          {activePattern === 'sidebar' ? <PersistentCampusSidebar /> : <DynamicContextHeader />}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
# Interactive Pattern Comparison

Switch between both navigation patterns to compare their approaches:

## Decision Framework

**Choose Persistent Sidebar when:**
- Users need quick access to multiple spaces frequently
- Spatial orientation is critical (large campus, many spaces)  
- Power users who want maximum efficiency
- Desktop-first workflows with screen real estate

**Choose Dynamic Header when:**
- Focus should remain on current space content
- Mobile-first approach with limited screen space
- Emphasis on deep engagement within spaces
- Simpler mental model for casual users

## Hybrid Approach
Consider combining both patterns:
- Sidebar for power users (can be toggled/hidden)
- Header for consistent context and surface navigation
- Responsive behavior that adapts to screen size and user preference
        `
      }
    }
  }
};

export const MobileResponsive: Story = {
  render: () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('spaces');
    
    return (
      <div className="h-screen bg-[var(--hive-background-primary)] flex flex-col relative">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)]/50 backdrop-blur-xl">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[var(--hive-background-tertiary)]/30 rounded-lg transition-colors"
          >
            <MoreHorizontal className="w-6 h-6 text-[var(--hive-text-primary)]" />
          </button>
          
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-[var(--hive-brand-primary)]" />
            <span className="font-medium text-[var(--hive-text-primary)]">HIVE</span>
          </div>
          
          <button className="p-2 hover:bg-[var(--hive-background-tertiary)]/30 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-[var(--hive-text-muted)]" />
          </button>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex overflow-x-auto p-4 space-x-2 border-b border-[var(--hive-border-subtle)]">
          {hiveNavigation.mainNavItems.map((navItem) => (
            <button
              key={navItem.id}
              onClick={() => !navItem.isDisabled && setActiveNavItem(navItem.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                navItem.isDisabled
                  ? 'bg-[var(--hive-background-disabled)]/20 text-[var(--hive-text-disabled)] cursor-not-allowed'
                  : activeNavItem === navItem.id
                    ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]'
                    : 'bg-[var(--hive-background-tertiary)]/30 hover:bg-[var(--hive-brand-primary)]/10 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'
              }`}
            >
              <div className="flex items-center space-x-2">
                <navItem.icon className="w-4 h-4" />
                <span>{navItem.name}</span>
                {navItem.isDisabled && <span className="text-xs">Soon</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-[var(--hive-background-primary)]/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 bottom-0 w-80 bg-[var(--hive-background-secondary)] z-50 transform transition-transform">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-[var(--hive-text-primary)]">Navigation</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 hover:bg-[var(--hive-background-tertiary)]/30 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[var(--hive-text-muted)]" />
                  </button>
                </div>
                
                {/* Mobile navigation items */}
                <div className="space-y-3">
                  {hiveNavigation.mainNavItems.map((navItem) => (
                    <div
                      key={navItem.id}
                      onClick={() => !navItem.isDisabled && setActiveNavItem(navItem.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        navItem.isDisabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-[var(--hive-background-tertiary)]/20'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${navItem.isDisabled ? 'bg-[var(--hive-text-disabled)]/20' : 'bg-[var(--hive-brand-primary)]/20'}`}>
                        <navItem.icon className={`w-4 h-4 ${navItem.isDisabled ? 'text-[var(--hive-text-disabled)]' : 'text-[var(--hive-brand-primary)]'}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${navItem.isDisabled ? 'text-[var(--hive-text-disabled)]' : 'text-[var(--hive-text-primary)]'}`}>
                          {navItem.name}
                        </div>
                        <div className={`text-sm ${navItem.isDisabled ? 'text-[var(--hive-text-disabled)]' : 'text-[var(--hive-text-muted)]'}`}>
                          {navItem.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-[var(--hive-text-primary)]">
              Mobile Navigation Pattern
            </h1>
            <div className="bg-[var(--hive-background-secondary)]/30 rounded-xl p-4 border border-[var(--hive-border-primary)]">
              <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                {hiveNavigation.mainNavItems.find(item => item.id === activeNavItem)?.name}
              </h3>
              <p className="text-[var(--hive-text-muted)]">
                Optimized for mobile devices with horizontal navigation tabs and slide-out menu.
                Touch-friendly interactions focused on core HIVE functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: `
# Mobile Navigation Pattern

Responsive adaptation that provides:
- **Slide-out Navigation**: Hidden sidebar accessible via hamburger menu
- **Horizontal Surface Tabs**: Scrollable tabs for space surfaces
- **Touch Optimization**: Larger touch targets and simplified interactions  
- **Progressive Enhancement**: Core navigation available on all screen sizes

## Mobile Adaptations
- Sidebar becomes overlay with backdrop
- Surface navigation becomes horizontal scrolling tabs
- Reduced information density for clarity
- Gesture-friendly interactions (swipe to navigate)
        `
      }
    }
  }
};