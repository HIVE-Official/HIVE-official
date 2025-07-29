import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { Home, BookOpen, Users, Wrench, Search, Plus, MoreHorizontal, ChevronRight, Settings, Share, Crown, Bell, Activity, Star, Building, Sparkles, Zap, MessageCircle } from 'lucide-react';
const meta = {
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
    { id: 'cs-department', name: 'Computer Science', members: 1247, isActive: true, activity: 'high' },
    { id: 'engineering', name: 'Engineering Hub', members: 2156, isActive: false, activity: 'medium' },
    { id: 'class-2026', name: 'Class of 2026', members: 3421, isActive: false, activity: 'low' },
    { id: 'study-groups', name: 'Study Groups', members: 567, isActive: false, activity: 'medium' }
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
function HiveActivityIndicator({ level }) {
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
    return (_jsx(motion.div, { className: `w-2 h-2 rounded-full ${style.bg} ${style.glow} ${style.pulse}`, initial: { scale: 0.8, opacity: 0.6 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.3, ease: "easeOut" } }));
}
// Pattern 1: Persistent Campus Sidebar with HIVE Design System
function PersistentCampusSidebar() {
    const [activeNavItem, setActiveNavItem] = useState('spaces');
    const [selectedSpace, setSelectedSpace] = useState('cs-department');
    const [searchQuery, setSearchQuery] = useState('');
    const handleNavItemClick = (navId) => {
        const navItem = hiveNavigation.mainNavItems.find(item => item.id === navId);
        if (navItem && !navItem.isDisabled) {
            setActiveNavItem(navId);
        }
        else if (navItem?.isDisabled) {
            alert('HiveLAB is coming soon! 🚀');
        }
    };
    const handleSpaceClick = (spaceId) => {
        setSelectedSpace(spaceId);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const getActiveNavItem = () => {
        return hiveNavigation.mainNavItems.find(item => item.id === activeNavItem) || hiveNavigation.mainNavItems[0];
    };
    const getSelectedSpaceInfo = () => {
        return mockSpaces.find(space => space.id === selectedSpace) || mockSpaces[0];
    };
    return (_jsxs("div", { className: "flex h-screen bg-[var(--hive-background-primary)] font-sans", children: [_jsxs(motion.div, { className: "w-80 bg-[var(--hive-overlay-glass)] backdrop-blur-xl border-r border-[var(--hive-border-glass)] flex flex-col", initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.6, ease: "easeOut" }, children: [_jsx("div", { className: "p-6 border-b border-[var(--hive-border-glass)]", children: _jsxs(motion.div, { className: "flex items-center space-x-4", initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.2, duration: 0.5 }, children: [_jsxs("div", { className: "relative group", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-2xl flex items-center justify-center shadow-[var(--hive-shadow-gold-glow)] group-hover:shadow-[var(--hive-shadow-gold-glow-strong)] transition-all duration-300", children: _jsx(Building, { className: "w-7 h-7 text-[var(--hive-text-inverse)]" }) }), _jsx("div", { className: "absolute inset-0 bg-[var(--hive-overlay-gold-subtle)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-display font-semibold text-[var(--hive-text-primary)] tracking-tight", children: "UB Buffalo" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)] font-medium", children: "Campus Digital Hub" })] })] }) }), _jsxs("div", { className: "px-6 py-4", children: [_jsx(motion.div, { className: "flex items-center justify-between mb-4", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.3, duration: 0.5 }, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Sparkles, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" }), _jsx("h3", { className: "text-sm font-display font-semibold text-[var(--hive-text-muted)] uppercase tracking-wider", children: "Navigation" })] }) }), _jsx("div", { className: "space-y-3", children: hiveNavigation.mainNavItems.map((navItem, index) => (_jsx(motion.div, { className: "group relative", initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { delay: 0.4 + index * 0.1, duration: 0.5 }, children: _jsx(HiveCard, { variant: "glass", className: `p-4 border-[var(--hive-border-glass)] transition-all duration-300 cursor-pointer group ${navItem.isDisabled
                                            ? 'opacity-50 hover:opacity-75 bg-[var(--hive-background-disabled)]/20 border-[var(--hive-border-disabled)]/30'
                                            : activeNavItem === navItem.id
                                                ? 'bg-[var(--hive-overlay-gold-medium)] border-[var(--hive-border-gold)] shadow-[var(--hive-shadow-gold-glow)]'
                                                : 'hover:bg-[var(--hive-overlay-gold-subtle)] hover:border-[var(--hive-border-gold)]'}`, onClick: () => handleNavItemClick(navItem.id), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `p-2 rounded-xl transition-all duration-300 ${navItem.isDisabled
                                                                ? 'bg-[var(--hive-text-disabled)]/20'
                                                                : activeNavItem === navItem.id
                                                                    ? 'bg-[var(--hive-brand-primary)]/20 group-hover:bg-[var(--hive-brand-primary)]/30'
                                                                    : 'bg-[var(--hive-overlay-glass-medium)] group-hover:bg-[var(--hive-brand-primary)]/20'}`, children: _jsx(navItem.icon, { className: `w-5 h-5 transition-colors ${navItem.isDisabled
                                                                    ? 'text-[var(--hive-text-disabled)]'
                                                                    : activeNavItem === navItem.id
                                                                        ? 'text-[var(--hive-brand-primary)]'
                                                                        : 'text-[var(--hive-text-muted)] group-hover:text-[var(--hive-brand-primary)]'}` }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `text-sm font-semibold transition-colors ${navItem.isDisabled
                                                                                ? 'text-[var(--hive-text-disabled)]'
                                                                                : activeNavItem === navItem.id
                                                                                    ? 'text-[var(--hive-brand-primary)]'
                                                                                    : 'text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)]'}`, children: navItem.name }), navItem.isDisabled && (_jsx("span", { className: "text-xs bg-[var(--hive-text-disabled)]/20 text-[var(--hive-text-disabled)] px-2 py-1 rounded-full", children: "Soon" }))] }), _jsx("p", { className: `text-xs mt-1 transition-colors ${navItem.isDisabled
                                                                        ? 'text-[var(--hive-text-disabled)]'
                                                                        : 'text-[var(--hive-text-muted)]'}`, children: navItem.description })] })] }), navItem.hasNotifications && navItem.notificationCount > 0 && (_jsx(motion.div, { className: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-[var(--hive-shadow-gold-glow)]", animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity }, children: navItem.notificationCount }))] }) }) }, navItem.id))) })] }), activeNavItem === 'spaces' && (_jsxs("div", { className: "flex-1 px-6 py-4 overflow-y-auto", children: [_jsxs(motion.div, { className: "flex items-center space-x-2 mb-4", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.6, duration: 0.5 }, children: [_jsx(Building, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" }), _jsx("h3", { className: "text-sm font-display font-semibold text-[var(--hive-text-muted)] uppercase tracking-wider", children: "Your Spaces" })] }), _jsx("div", { className: "space-y-2", children: mockSpaces.map((space, index) => (_jsx(motion.div, { className: "group", initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { delay: 0.7 + index * 0.1, duration: 0.3 }, children: _jsx(HiveCard, { variant: "subtle", className: `p-3 border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)] cursor-pointer transition-all duration-200 ${selectedSpace === space.id
                                            ? 'bg-[var(--hive-overlay-gold-subtle)] border-[var(--hive-border-gold)]'
                                            : 'hover:bg-[var(--hive-overlay-glass-medium)]'}`, onClick: () => handleSpaceClick(space.id), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: `text-sm font-medium transition-colors ${selectedSpace === space.id
                                                        ? 'text-[var(--hive-brand-primary)]'
                                                        : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'}`, children: space.name }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs text-[var(--hive-text-muted)] font-medium", children: space.members }), _jsx(HiveActivityIndicator, { level: space.activity })] })] }) }) }, space.id))) })] })), activeNavItem === 'feed' && (_jsxs("div", { className: "flex-1 px-6 py-4 overflow-y-auto", children: [_jsxs(motion.div, { className: "flex items-center space-x-2 mb-4", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.6, duration: 0.5 }, children: [_jsx(Activity, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" }), _jsx("h3", { className: "text-sm font-display font-semibold text-[var(--hive-text-muted)] uppercase tracking-wider", children: "Recent Activity" })] }), _jsx("div", { className: "space-y-3", children: mockFeedItems.map((item, index) => (_jsx(motion.div, { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { delay: 0.7 + index * 0.1, duration: 0.3 }, children: _jsx(HiveCard, { variant: "subtle", className: "p-3 border-[var(--hive-border-subtle)] hover:bg-[var(--hive-overlay-glass-medium)] transition-all duration-200", children: _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MessageCircle, { className: "w-3 h-3 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: item.title })] }), _jsxs("div", { className: "flex items-center space-x-2 text-xs text-[var(--hive-text-muted)]", children: [_jsx("span", { children: item.author }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: item.time })] })] }) }) }, item.id))) })] })), activeNavItem === 'profile' && (_jsxs("div", { className: "flex-1 px-6 py-4 overflow-y-auto", children: [_jsxs(motion.div, { className: "flex items-center space-x-2 mb-4", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.6, duration: 0.5 }, children: [_jsx(Users, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" }), _jsx("h3", { className: "text-sm font-display font-semibold text-[var(--hive-text-muted)] uppercase tracking-wider", children: "Profile Overview" })] }), _jsx(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.7, duration: 0.5 }, children: _jsx(HiveCard, { variant: "glass", className: "p-4 border-[var(--hive-border-glass)] bg-[var(--hive-overlay-glass-medium)]", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center", children: _jsx(Users, { className: "w-4 h-4 text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: mockProfile.name }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: mockProfile.handle })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 pt-2", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-bold text-[var(--hive-brand-primary)]", children: mockProfile.spacesJoined }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Spaces" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-bold text-[var(--hive-brand-primary)]", children: mockProfile.achievements }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Achievements" })] })] })] }) }) })] })), _jsxs("div", { className: "p-6 border-t border-[var(--hive-border-glass)] space-y-4", children: [_jsxs(motion.div, { className: "relative", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 1, duration: 0.5 }, children: [_jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", value: searchQuery, onChange: handleSearchChange, placeholder: "Search spaces...", className: "w-full pl-11 pr-4 py-3 bg-[var(--hive-overlay-glass)] backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-border-gold)] focus:bg-[var(--hive-overlay-glass-medium)] focus:shadow-[var(--hive-shadow-focus)] transition-all duration-300 font-medium" }), searchQuery && (_jsxs(motion.div, { className: "absolute top-full left-0 right-0 mt-2 bg-[var(--hive-overlay-glass-strong)] backdrop-blur-xl border border-[var(--hive-border-glass)] rounded-xl p-2 z-50", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, children: [_jsxs("div", { className: "text-xs text-[var(--hive-text-muted)] mb-2 px-2", children: ["Search results for \"", searchQuery, "\""] }), mockSpaces
                                                .filter(space => space.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .slice(0, 5)
                                                .map(space => (_jsx("div", { onClick: () => {
                                                    handleSpaceClick(space.id);
                                                    setSearchQuery('');
                                                    setActiveNavItem('spaces');
                                                }, className: "p-2 hover:bg-[var(--hive-overlay-gold-subtle)] rounded-lg cursor-pointer transition-colors", children: _jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: space.name }) }, space.id)))] }))] }), _jsx(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 1.1, duration: 0.5 }, children: _jsxs(HiveButton, { variant: "premium", className: "w-full py-3 shadow-[var(--hive-shadow-gold-glow)] hover:shadow-[var(--hive-shadow-gold-glow-strong)] transition-all duration-300", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), _jsx("span", { className: "font-semibold", children: "New Space" })] }) })] })] }), _jsx("div", { className: "flex-1 bg-[var(--hive-background-primary)] p-8", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs(motion.div, { initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6 }, children: [_jsx("h1", { className: "text-4xl font-display font-bold text-[var(--hive-text-primary)] mb-2 tracking-tight", children: "Pattern 1: Persistent Campus Sidebar" }), _jsx("p", { className: "text-lg text-[var(--hive-text-muted)] mb-8 font-medium", children: "Simplified 4-item navigation focused on core HIVE functionality" })] }, activeNavItem), _jsx(motion.div, { initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6 }, children: _jsxs(HiveCard, { variant: "elevated", className: "p-8 bg-[var(--hive-overlay-glass)] backdrop-blur-xl border-[var(--hive-border-glass)]", children: [_jsxs("div", { className: "flex items-start space-x-4 mb-6", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-2xl flex items-center justify-center shadow-[var(--hive-shadow-gold-glow)]", children: React.createElement(getActiveNavItem().icon, { className: "w-6 h-6 text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-display font-bold text-[var(--hive-text-primary)] mb-2", children: getActiveNavItem().name }), _jsx("p", { className: "text-[var(--hive-text-muted)] text-lg", children: getActiveNavItem().description }), activeNavItem === 'spaces' && (_jsxs("div", { className: "flex items-center space-x-4 mt-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" }), _jsxs("span", { className: "text-sm font-medium text-[var(--hive-text-secondary)]", children: [getSelectedSpaceInfo().members, " members"] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Activity, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" }), _jsxs("span", { className: "text-sm font-medium text-[var(--hive-text-secondary)]", children: [getSelectedSpaceInfo().activity, " activity"] })] })] }))] })] }), activeNavItem === 'spaces' && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(HiveCard, { variant: "glass", className: "p-6 bg-[var(--hive-overlay-glass-medium)] border-[var(--hive-border-glass)]", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(Activity, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Recent Activity" })] }), _jsxs("p", { className: "text-[var(--hive-text-muted)] font-medium", children: ["Latest posts and discussions from ", getSelectedSpaceInfo().name] }), _jsxs("div", { className: "mt-4 space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-[var(--hive-status-success)] rounded-full" }), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: "New project collaboration started" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-[var(--hive-status-warning)] rounded-full" }), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Study group forming for finals" })] })] })] }), _jsxs(HiveCard, { variant: "glass", className: "p-6 bg-[var(--hive-overlay-glass-medium)] border-[var(--hive-border-glass)]", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(Wrench, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Space Tools" })] }), _jsx("p", { className: "text-[var(--hive-text-muted)] font-medium", children: "Custom tools built for this space community" }), _jsxs("div", { className: "mt-4 space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Zap, { className: "w-3 h-3 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: "CodeShare Pro" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Zap, { className: "w-3 h-3 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Study Scheduler" })] })] })] })] })), activeNavItem === 'feed' && (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "text-center py-8", children: [_jsx(Activity, { className: "w-16 h-16 text-[var(--hive-brand-primary)] mx-auto mb-4 opacity-60" }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Campus Activity Feed" }), _jsx("p", { className: "text-[var(--hive-text-muted)] max-w-md mx-auto", children: "Stay connected with posts, events, and updates from all your spaces in one unified feed." })] }) })), activeNavItem === 'profile' && (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "text-center py-8", children: [_jsx(Users, { className: "w-16 h-16 text-[var(--hive-brand-primary)] mx-auto mb-4 opacity-60" }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Your HIVE Profile" }), _jsx("p", { className: "text-[var(--hive-text-muted)] max-w-md mx-auto", children: "Manage your profile, view achievements, and track your journey across campus spaces." })] }) })), activeNavItem === 'hivelab' && (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "text-center py-8", children: [_jsx(Wrench, { className: "w-16 h-16 text-[var(--hive-text-disabled)] mx-auto mb-4 opacity-40" }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-disabled)] mb-2", children: "HiveLAB Coming Soon" }), _jsx("p", { className: "text-[var(--hive-text-disabled)] max-w-md mx-auto", children: "Build custom tools and integrations for your spaces. The ultimate creator toolkit for HIVE communities." }), _jsx("div", { className: "mt-6", children: _jsx("span", { className: "inline-flex items-center px-4 py-2 bg-[var(--hive-text-disabled)]/10 border border-[var(--hive-text-disabled)]/20 rounded-full text-sm text-[var(--hive-text-disabled)]", children: "\uD83D\uDE80 Coming Soon" }) })] }) }))] }) }, `content-${activeNavItem}-${selectedSpace}`)] }) })] }));
}
// Pattern 2: Dynamic Context Header - Simplified Navigation
function DynamicContextHeader() {
    const [activeNavItem, setActiveNavItem] = useState('spaces');
    const [activeSurface, setActiveSurface] = useState('🏠 My Spaces');
    const [spaceData] = useState(currentSpace);
    const [breadcrumbs, setBreadcrumbs] = useState(['🏠 HIVE Campus', '📚 Spaces']);
    const handleNavItemClick = (navId) => {
        const navItem = hiveNavigation.mainNavItems.find(item => item.id === navId);
        if (navItem && !navItem.isDisabled) {
            setActiveNavItem(navId);
            // Update breadcrumbs based on navigation
            setBreadcrumbs(['🏠 HIVE Campus', `📚 ${navItem.name}`]);
        }
        else if (navItem?.isDisabled) {
            alert('HiveLAB is coming soon! 🚀');
        }
    };
    const handleSurfaceChange = (surface) => {
        setActiveSurface(surface);
    };
    const handleBreadcrumbClick = (index) => {
        // Navigate back in breadcrumb hierarchy
        const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
        setBreadcrumbs(newBreadcrumbs);
    };
    return (_jsxs("div", { className: "h-screen bg-[var(--hive-background-primary)] flex flex-col", children: [_jsx("div", { className: "bg-[var(--hive-background-secondary)]/30 backdrop-blur-xl border-b border-[var(--hive-border-primary)] px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-xl flex items-center justify-center", children: _jsx(Building, { className: "w-5 h-5 text-[var(--hive-text-inverse)]" }) }), _jsx("span", { className: "font-display font-bold text-[var(--hive-text-primary)]", children: "HIVE" })] }), _jsx("div", { className: "flex items-center space-x-2", children: hiveNavigation.mainNavItems.map((navItem) => (_jsx(motion.button, { onClick: () => handleNavItemClick(navItem.id), className: `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${navItem.isDisabled
                                            ? 'text-[var(--hive-text-disabled)] cursor-not-allowed opacity-50'
                                            : activeNavItem === navItem.id
                                                ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)] shadow-[var(--hive-shadow-gold-glow)]'
                                                : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass-medium)]'}`, whileHover: navItem.isDisabled ? {} : { scale: 1.05 }, whileTap: navItem.isDisabled ? {} : { scale: 0.95 }, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(navItem.icon, { className: "w-4 h-4" }), _jsx("span", { children: navItem.name }), navItem.hasNotifications && navItem.notificationCount > 0 && (_jsx("span", { className: "bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold", children: navItem.notificationCount })), navItem.isDisabled && (_jsx("span", { className: "text-xs bg-[var(--hive-text-disabled)]/20 text-[var(--hive-text-disabled)] px-1.5 py-0.5 rounded-full", children: "Soon" }))] }) }, navItem.id))) })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Search, { className: "w-5 h-5 text-[var(--hive-text-muted)] cursor-pointer hover:text-[var(--hive-text-primary)] transition-colors" }), _jsx(Bell, { className: "w-5 h-5 text-[var(--hive-text-muted)] cursor-pointer hover:text-[var(--hive-text-primary)] transition-colors" }), _jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center cursor-pointer", children: _jsx(Users, { className: "w-4 h-4 text-[var(--hive-text-inverse)]" }) })] })] }) }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)]/50 backdrop-blur-xl border-b border-[var(--hive-border-primary)]", children: [_jsx("div", { className: "px-6 py-4 border-b border-[var(--hive-border-glass)]", children: _jsx(motion.div, { className: "flex items-center space-x-2 text-sm", initial: { y: -10, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.4 }, children: breadcrumbs.map((crumb, index) => (_jsxs(React.Fragment, { children: [_jsxs(motion.div, { className: `flex items-center space-x-2 cursor-pointer transition-colors ${index === breadcrumbs.length - 1
                                            ? 'text-[var(--hive-text-primary)]'
                                            : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'}`, onClick: () => handleBreadcrumbClick(index), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [index === 0 ? (_jsx(Home, { className: "w-4 h-4" })) : (_jsx(BookOpen, { className: "w-4 h-4" })), _jsx("span", { className: index === breadcrumbs.length - 1 ? 'font-medium' : '', children: crumb.replace('🏠 ', '').replace('📚 ', '') })] }), index < breadcrumbs.length - 1 && (_jsx(ChevronRight, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }))] }, index))) }) }), _jsx("div", { className: "px-6 py-6", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-brand-primary)] rounded-xl flex items-center justify-center", children: _jsx(BookOpen, { className: "w-6 h-6 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: hiveNavigation.mainNavItems.find(item => item.id === activeNavItem)?.name || 'Spaces' }), _jsxs("div", { className: "flex items-center space-x-4 text-sm text-[var(--hive-text-muted)]", children: [activeNavItem === 'spaces' && (_jsxs(_Fragment, { children: [_jsxs("span", { children: [currentSpace.members, " members"] }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: currentSpace.type }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [currentSpace.activeTools, " tools active"] })] })), activeNavItem === 'feed' && (_jsxs(_Fragment, { children: [_jsx("span", { children: "Campus-wide activity" }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: "Real-time updates" })] })), activeNavItem === 'profile' && (_jsxs(_Fragment, { children: [_jsx("span", { children: "Your HIVE profile" }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: "Achievements & spaces" })] }))] })] })] }), activeNavItem === 'spaces' && (_jsx("div", { className: "flex items-center space-x-2 mt-6", children: spaceData.surfaces.map((surface, index) => (_jsx(motion.button, { onClick: () => handleSurfaceChange(surface), className: `px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeSurface === surface
                                                    ? 'bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] shadow-[var(--hive-shadow-gold-glow)]'
                                                    : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass-medium)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)]'}`, initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.2 + index * 0.1, duration: 0.4 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: surface }, surface))) }))] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(motion.button, { className: "p-3 hover:bg-[var(--hive-overlay-glass-medium)] rounded-xl transition-all duration-300 group border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)]", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => alert('Share space functionality'), children: _jsx(Share, { className: "w-5 h-5 text-[var(--hive-text-muted)] group-hover:text-[var(--hive-brand-primary)] transition-colors" }) }), _jsx(motion.button, { className: "p-3 hover:bg-[var(--hive-overlay-glass-medium)] rounded-xl transition-all duration-300 group border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)]", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => alert('Space settings'), children: _jsx(Settings, { className: "w-5 h-5 text-[var(--hive-text-muted)] group-hover:text-[var(--hive-brand-primary)] transition-colors" }) }), _jsxs(HiveButton, { variant: "premium", className: "shadow-[var(--hive-shadow-gold-glow)] hover:shadow-[var(--hive-shadow-gold-glow-strong)]", onClick: () => alert('Become a builder!'), children: [_jsx(Crown, { className: "w-4 h-4 mr-2" }), _jsx("span", { className: "font-semibold", children: "Become Builder" })] })] })] }) }), _jsx("div", { className: "px-6 pb-4", children: _jsxs("div", { className: "flex items-center space-x-2 text-sm", children: [_jsx("span", { className: "text-[var(--hive-text-muted)]", children: "Currently viewing:" }), _jsx("span", { className: "font-medium text-[var(--hive-text-primary)]", children: activeSurface })] }) })] }), _jsx("div", { className: "flex-1 p-8 overflow-y-auto", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Pattern 2: Dynamic Context Header" }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)]/30 rounded-xl p-6 border border-[var(--hive-border-primary)]", children: [_jsxs("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-4", children: [hiveNavigation.mainNavItems.find(item => item.id === activeNavItem)?.name || 'Content', activeNavItem === 'spaces' && activeSurface ? ` - ${activeSurface}` : ''] }), _jsxs("p", { className: "text-[var(--hive-text-muted)] mb-6", children: ["Simplified navigation with top-level tabs for core HIVE functionality.", activeNavItem === 'spaces' ? 'Surface navigation appears for deeper space exploration.' : ''] }), activeNavItem === 'spaces' && (_jsxs(_Fragment, { children: [activeSurface === '🏠 My Spaces' && (_jsx("div", { className: "space-y-4", children: mockSpaces.map((space) => (_jsxs("div", { className: "flex items-center space-x-3 p-4 bg-[var(--hive-background-tertiary)]/20 rounded-lg border border-[var(--hive-border-subtle)]", children: [_jsx(Building, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: space.name }), _jsxs("p", { className: "text-sm text-[var(--hive-text-muted)]", children: [space.members, " members \u2022 ", space.activity, " activity"] })] })] }, space.id))) })), activeSurface === '🔍 Discover' && (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "p-4 bg-[var(--hive-background-tertiary)]/20 rounded-lg border border-[var(--hive-border-subtle)]", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)] mb-2", children: "Discover New Spaces" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Find communities and spaces that match your interests and academic focus." })] }) })), activeSurface === '⭐ Favorites' && (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "flex items-center space-x-3 p-4 bg-[var(--hive-background-tertiary)]/20 rounded-lg border border-[var(--hive-border-subtle)]", children: [_jsx(Star, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: "Computer Science" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Your primary academic space" })] })] }) }))] })), activeNavItem === 'feed' && (_jsx("div", { className: "space-y-4", children: mockFeedItems.map((item) => (_jsxs("div", { className: "flex items-center space-x-3 p-4 bg-[var(--hive-background-tertiary)]/20 rounded-lg border border-[var(--hive-border-subtle)]", children: [_jsx(Activity, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: item.title }), _jsxs("p", { className: "text-sm text-[var(--hive-text-muted)]", children: [item.author, " \u2022 ", item.time] })] })] }, item.id))) })), activeNavItem === 'profile' && (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Users, { className: "w-8 h-8 text-[var(--hive-text-inverse)]" }) }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: mockProfile.name }), _jsx("p", { className: "text-[var(--hive-text-muted)] mb-4", children: mockProfile.handle }), _jsxs("div", { className: "grid grid-cols-2 gap-4 max-w-sm mx-auto", children: [_jsxs("div", { className: "bg-[var(--hive-background-tertiary)]/20 rounded-lg p-3 border border-[var(--hive-border-subtle)]", children: [_jsx("div", { className: "text-lg font-bold text-[var(--hive-brand-primary)]", children: mockProfile.spacesJoined }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Spaces" })] }), _jsxs("div", { className: "bg-[var(--hive-background-tertiary)]/20 rounded-lg p-3 border border-[var(--hive-border-subtle)]", children: [_jsx("div", { className: "text-lg font-bold text-[var(--hive-brand-primary)]", children: mockProfile.achievements }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Achievements" })] })] })] }) }))] })] }) })] }));
}
export const PersistentSidebarPattern = {
    render: () => _jsx(PersistentCampusSidebar, {}),
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
export const DynamicHeaderPattern = {
    render: () => _jsx(DynamicContextHeader, {}),
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
export const PatternComparison = {
    render: () => {
        const [activePattern, setActivePattern] = useState('sidebar');
        return (_jsxs("div", { className: "h-screen bg-[var(--hive-background-primary)] flex flex-col", children: [_jsx("div", { className: "p-6 border-b border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)]/30", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-4", children: "HIVE Navigation Pattern Comparison" }), _jsxs("div", { className: "flex space-x-4", children: [_jsx("button", { onClick: () => setActivePattern('sidebar'), className: `px-6 py-3 rounded-xl font-medium transition-all ${activePattern === 'sidebar'
                                            ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]'
                                            : 'bg-[var(--hive-background-tertiary)]/30 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'}`, children: "Persistent Campus Sidebar" }), _jsx("button", { onClick: () => setActivePattern('header'), className: `px-6 py-3 rounded-xl font-medium transition-all ${activePattern === 'header'
                                            ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]'
                                            : 'bg-[var(--hive-background-tertiary)]/30 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'}`, children: "Dynamic Context Header" })] })] }) }), _jsx("div", { className: "flex-1 overflow-hidden", children: activePattern === 'sidebar' ? _jsx(PersistentCampusSidebar, {}) : _jsx(DynamicContextHeader, {}) })] }));
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
export const MobileResponsive = {
    render: () => {
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [activeNavItem, setActiveNavItem] = useState('spaces');
        return (_jsxs("div", { className: "h-screen bg-[var(--hive-background-primary)] flex flex-col relative", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)]/50 backdrop-blur-xl", children: [_jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "p-2 hover:bg-[var(--hive-background-tertiary)]/30 rounded-lg transition-colors", children: _jsx(MoreHorizontal, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Building, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "font-medium text-[var(--hive-text-primary)]", children: "HIVE" })] }), _jsx("button", { className: "p-2 hover:bg-[var(--hive-background-tertiary)]/30 rounded-lg transition-colors", children: _jsx(Bell, { className: "w-5 h-5 text-[var(--hive-text-muted)]" }) })] }), _jsx("div", { className: "flex overflow-x-auto p-4 space-x-2 border-b border-[var(--hive-border-subtle)]", children: hiveNavigation.mainNavItems.map((navItem) => (_jsx("button", { onClick: () => !navItem.isDisabled && setActiveNavItem(navItem.id), className: `flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${navItem.isDisabled
                            ? 'bg-[var(--hive-background-disabled)]/20 text-[var(--hive-text-disabled)] cursor-not-allowed'
                            : activeNavItem === navItem.id
                                ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]'
                                : 'bg-[var(--hive-background-tertiary)]/30 hover:bg-[var(--hive-brand-primary)]/10 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'}`, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(navItem.icon, { className: "w-4 h-4" }), _jsx("span", { children: navItem.name }), navItem.isDisabled && _jsx("span", { className: "text-xs", children: "Soon" })] }) }, navItem.id))) }), sidebarOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-[var(--hive-background-primary)]/50 z-40", onClick: () => setSidebarOpen(false) }), _jsx("div", { className: "fixed left-0 top-0 bottom-0 w-80 bg-[var(--hive-background-secondary)] z-50 transform transition-transform", children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Navigation" }), _jsx("button", { onClick: () => setSidebarOpen(false), className: "p-2 hover:bg-[var(--hive-background-tertiary)]/30 rounded-lg transition-colors", children: _jsx(ChevronRight, { className: "w-5 h-5 text-[var(--hive-text-muted)]" }) })] }), _jsx("div", { className: "space-y-3", children: hiveNavigation.mainNavItems.map((navItem) => (_jsxs("div", { onClick: () => !navItem.isDisabled && setActiveNavItem(navItem.id), className: `flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${navItem.isDisabled
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-[var(--hive-background-tertiary)]/20'}`, children: [_jsx("div", { className: `p-2 rounded-lg ${navItem.isDisabled ? 'bg-[var(--hive-text-disabled)]/20' : 'bg-[var(--hive-brand-primary)]/20'}`, children: _jsx(navItem.icon, { className: `w-4 h-4 ${navItem.isDisabled ? 'text-[var(--hive-text-disabled)]' : 'text-[var(--hive-brand-primary)]'}` }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: `font-medium ${navItem.isDisabled ? 'text-[var(--hive-text-disabled)]' : 'text-[var(--hive-text-primary)]'}`, children: navItem.name }), _jsx("div", { className: `text-sm ${navItem.isDisabled ? 'text-[var(--hive-text-disabled)]' : 'text-[var(--hive-text-muted)]'}`, children: navItem.description })] })] }, navItem.id))) })] }) })] })), _jsx("div", { className: "flex-1 p-4 overflow-y-auto", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: "Mobile Navigation Pattern" }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)]/30 rounded-xl p-4 border border-[var(--hive-border-primary)]", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: hiveNavigation.mainNavItems.find(item => item.id === activeNavItem)?.name }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Optimized for mobile devices with horizontal navigation tabs and slide-out menu. Touch-friendly interactions focused on core HIVE functionality." })] })] }) })] }));
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
//# sourceMappingURL=hive-navigation-patterns.stories.js.map