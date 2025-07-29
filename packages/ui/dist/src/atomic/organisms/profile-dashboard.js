'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
// Import our sophisticated molecules
import { CampusIdentityHeader } from '../molecules/campus-identity-header.js';
import { CampusSpacesCard } from '../molecules/campus-spaces-card.js';
import { CampusActivityFeed } from '../molecules/campus-activity-feed.js';
import { CampusBuilderTools } from '../molecules/campus-builder-tools.js';
export const ProfileDashboard = ({ user, spaces, activities, availableTools, createdTools, layout = 'desktop', variant = 'default', showBuilder = true, isLoading = {}, onAvatarClick, onEditProfile, onSpaceClick, onActivityClick, onToolClick, onCreateTool, onBecomeBuilder, onJoinSpace, onViewAllSpaces, onViewAllActivities, className }) => {
    const [loadedSections, setLoadedSections] = useState(new Set());
    const handleSectionLoad = (section) => {
        setLoadedSections(prev => new Set([...prev, section]));
    };
    // Desktop BentoGrid Layout
    const DesktopLayout = () => (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-3 space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }, onAnimationComplete: () => handleSectionLoad('identity'), children: _jsx(CampusIdentityHeader, { user: user, showStatus: true, onAvatarClick: onAvatarClick, onEditClick: onEditProfile }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }, onAnimationComplete: () => handleSectionLoad('activity'), children: _jsx(CampusActivityFeed, { activities: activities, isLoading: isLoading.activities, maxItems: 6, onActivityClick: onActivityClick, onViewAll: onViewAllActivities }) })] }), _jsxs("div", { className: "lg:col-span-1 space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }, onAnimationComplete: () => handleSectionLoad('spaces'), children: _jsx(CampusSpacesCard, { spaces: spaces, isLoading: isLoading.spaces, onSpaceClick: onSpaceClick, onJoinSpace: onJoinSpace, onViewAll: onViewAllSpaces }) }), showBuilder && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }, onAnimationComplete: () => handleSectionLoad('tools'), children: _jsx(CampusBuilderTools, { availableTools: availableTools, createdTools: createdTools, isBuilder: user.isBuilder, isLoading: isLoading.tools, onToolClick: onToolClick, onCreateTool: onCreateTool, onBecomeBuilder: onBecomeBuilder }) }))] })] }));
    // Tablet Layout - 2 Column
    const TabletLayout = () => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusIdentityHeader, { user: user, variant: "compact", showStatus: true, onAvatarClick: onAvatarClick, onEditClick: onEditProfile }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusSpacesCard, { spaces: spaces, isLoading: isLoading.spaces, onSpaceClick: onSpaceClick, onJoinSpace: onJoinSpace, onViewAll: onViewAllSpaces }) }), showBuilder && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusBuilderTools, { availableTools: availableTools, createdTools: createdTools, isBuilder: user.isBuilder, isLoading: isLoading.tools, variant: "compact", onToolClick: onToolClick, onCreateTool: onCreateTool, onBecomeBuilder: onBecomeBuilder }) }))] }), _jsx("div", { className: "space-y-6", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusActivityFeed, { activities: activities, isLoading: isLoading.activities, variant: "compact", maxItems: 8, onActivityClick: onActivityClick, onViewAll: onViewAllActivities }) }) })] }));
    // Mobile Layout - Single Column Stack
    const MobileLayout = () => (_jsxs("div", { className: "space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusIdentityHeader, { user: user, variant: "compact", showStatus: true, onAvatarClick: onAvatarClick, onEditClick: onEditProfile }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusActivityFeed, { activities: activities, isLoading: isLoading.activities, variant: "compact", maxItems: 5, onActivityClick: onActivityClick, onViewAll: onViewAllActivities }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusSpacesCard, { spaces: spaces, isLoading: isLoading.spaces, variant: "compact", onSpaceClick: onSpaceClick, onJoinSpace: onJoinSpace, onViewAll: onViewAllSpaces }) }), showBuilder && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusBuilderTools, { availableTools: availableTools, createdTools: createdTools, isBuilder: user.isBuilder, isLoading: isLoading.tools, variant: "subtle", onToolClick: onToolClick, onCreateTool: onCreateTool, onBecomeBuilder: onBecomeBuilder }) }))] }));
    const getLayout = () => {
        switch (layout) {
            case 'mobile':
                return _jsx(MobileLayout, {});
            case 'tablet':
                return _jsx(TabletLayout, {});
            default:
                return _jsx(DesktopLayout, {});
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 }, className: cn(
        // HIVE Foundation
        'min-h-screen bg-obsidian', 
        // Responsive padding with HIVE spacing
        'p-4 md:p-6 lg:p-8', 
        // Maximum width constraint
        'max-w-7xl mx-auto', className), children: [_jsxs("div", { className: "fixed inset-0 opacity-[0.02] pointer-events-none", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-platinum/10 to-transparent rounded-full blur-2xl" })] }), _jsx("div", { className: "relative z-10", children: getLayout() }), _jsx(AnimatePresence, { children: Object.values(isLoading).some(Boolean) && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "fixed bottom-6 right-6 z-50", children: _jsx("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 px-4 py-3 shadow-lg", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { className: "w-4 h-4 rounded-full bg-gradient-to-r from-gold to-champagne", animate: {
                                        rotate: 360,
                                        scale: [1, 1.1, 1]
                                    }, transition: {
                                        rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
                                    } }), _jsx("span", { className: "text-platinum text-sm font-medium", children: "Loading campus data..." })] }) }) })) }), _jsx(AnimatePresence, { children: loadedSections.size >= 3 && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { delay: 1 }, className: "fixed bottom-6 left-6 z-50", children: _jsx("div", { className: "rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-xl border border-emerald-500/20 px-4 py-3 shadow-lg", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_8px_color-mix(in_srgb,var(--hive-status-success)_50%,transparent)]" }), _jsx("span", { className: "text-emerald-400 text-sm font-medium", children: "Profile loaded successfully" })] }) }) })) })] }));
};
// Compound components for specific use cases
export const CompactProfileDashboard = (props) => (_jsx(ProfileDashboard, { ...props, variant: "compact" }));
export const FocusedProfileDashboard = (props) => (_jsx(ProfileDashboard, { ...props, variant: "focused", showBuilder: false }));
export default ProfileDashboard;
//# sourceMappingURL=profile-dashboard.js.map