'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Users, Sparkles, ChevronRight } from 'lucide-react';
export const HiveSpaceCard = ({ space, currentUser, mutualConnections = [], onJoin, onView, showSocialProof = true, variant = 'default', className }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    // Calculate perfect match based on space type and user context
    const isPerfectMatch = React.useMemo(() => {
        if (!currentUser)
            return false;
        switch (space.type) {
            case 'university':
                return space.academic.department === currentUser.major;
            case 'residential':
                return space.housing.buildingName === currentUser.building;
            default:
                return false;
        }
    }, [space, currentUser]);
    // Get primary action based on space type
    const getPrimaryAction = () => {
        switch (space.type) {
            case 'university':
                const univSpace = space;
                switch (univSpace.enrollment.status) {
                    case 'open': return { text: 'Join Class', variant: 'primary' };
                    case 'waitlist': return { text: 'Join Waitlist', variant: 'secondary' };
                    case 'approval_required': return { text: 'Request Access', variant: 'secondary' };
                    case 'closed': return { text: 'View Details', variant: 'ghost' };
                }
                break;
            case 'greek':
                const greekSpace = space;
                return greekSpace.rush.isActive
                    ? { text: 'Show Interest', variant: 'primary' }
                    : { text: 'Learn More', variant: 'ghost' };
            case 'residential':
                return { text: 'Join Floor', variant: 'primary' };
            case 'student':
                return { text: 'Join Group', variant: 'primary' };
        }
    };
    const primaryAction = getPrimaryAction();
    const handleJoinClick = async (e) => {
        e.stopPropagation();
        setIsJoining(true);
        try {
            await onJoin?.(space);
        }
        finally {
            setIsJoining(false);
        }
    };
    const handleCardClick = () => {
        onView?.(space);
    };
    // Get space-specific icon and metadata
    const getSpaceIcon = () => {
        switch (space.type) {
            case 'university': return '🎓';
            case 'greek': return '👥';
            case 'residential': return '🏠';
            case 'student': return '⭐';
        }
    };
    const getSpaceMetadata = () => {
        switch (space.type) {
            case 'university':
                const univSpace = space;
                return [
                    univSpace.academic.department,
                    univSpace.academic.credits ? `${univSpace.academic.credits} credits` : null,
                    univSpace.academic.schedule
                ].filter(Boolean);
            case 'greek':
                const greekSpace = space;
                return [
                    greekSpace.organization.council,
                    greekSpace.community.averageGPA ? `${greekSpace.community.averageGPA} GPA` : null,
                    greekSpace.organization.founded ? `Est. ${greekSpace.organization.founded}` : null
                ].filter(Boolean);
            case 'residential':
                const resSpace = space;
                return [
                    resSpace.housing.buildingName,
                    resSpace.housing.floor ? `Floor ${resSpace.housing.floor}` : null,
                    resSpace.housing.buildingType
                ].filter(Boolean);
            case 'student':
                const studentSpace = space;
                return [
                    studentSpace.category,
                    studentSpace.creator.name,
                    studentSpace.creator.major
                ].filter(Boolean);
        }
    };
    const metadata = getSpaceMetadata();
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, whileHover: {
            y: -8,
            rotateX: 1,
            rotateY: 1,
            transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
        }, onHoverStart: () => setIsHovered(true), onHoverEnd: () => setIsHovered(false), onClick: handleCardClick, className: cn('relative group cursor-pointer overflow-hidden', 
        // HIVE Luxury Foundation
        'bg-gradient-to-br from-[var(--hive-background-secondary)]/95 via-[var(--hive-background-tertiary)]/90 to-[var(--hive-background-interactive)]/95', 'backdrop-blur-xl border border-[var(--hive-border-primary)]/30', 'hover:border-[var(--hive-brand-primary)]/40 hover:shadow-2xl hover:shadow-[var(--hive-brand-primary)]/8', 
        // HIVE Luxury Radius
        'rounded-3xl', 'transition-all duration-500 ease-out', 'transform-gpu perspective-1000', 
        // Responsive sizing
        variant === 'compact' ? 'h-72 max-w-72' : 'h-80 max-w-80', className), style: {
            transformStyle: 'preserve-3d'
        }, children: [isPerfectMatch && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, className: "absolute top-5 left-5 z-30", children: _jsxs("div", { className: "flex items-center gap-2 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl border border-[var(--hive-brand-primary)]/40 rounded-full px-4 py-2 shadow-lg", children: [_jsx(Sparkles, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "text-sm font-bold text-[var(--hive-brand-primary)]", children: "Perfect Match" })] }) })), _jsxs("div", { className: "absolute top-5 right-5 z-30 flex gap-2", children: [space.type === 'university' && space.academic.isOfficial && (_jsx("div", { className: "bg-[var(--hive-status-info)]/20 backdrop-blur-xl border border-[var(--hive-status-info)]/40 rounded-full px-3 py-1", children: _jsx("span", { className: "text-xs font-semibold text-[var(--hive-status-info)]", children: "Official" }) })), space.type === 'greek' && space.rush.isActive && (_jsx("div", { className: "bg-[var(--hive-status-success)]/20 backdrop-blur-xl border border-[var(--hive-status-success)]/40 rounded-full px-3 py-1", children: _jsx("span", { className: "text-xs font-semibold text-[var(--hive-status-success)]", children: "Rush Open" }) }))] }), _jsxs("div", { className: "relative h-28 overflow-hidden rounded-t-3xl", children: [space.bannerUrl ? (_jsx(motion.img, { src: space.bannerUrl, alt: "", className: "h-full w-full object-cover", whileHover: { scale: 1.02 }, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } })) : (_jsx("div", { className: "h-full w-full bg-gradient-to-br", style: {
                            background: space.primaryColor
                                ? `linear-gradient(135deg, ${space.primaryColor}40, ${space.primaryColor}20)`
                                : 'linear-gradient(135deg, var(--hive-status-info)/25, var(--hive-brand-primary)/15)'
                        } })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--hive-background-primary)]/90 via-[var(--hive-background-primary)]/20 to-transparent" }), _jsx("div", { className: "absolute bottom-4 left-5", children: space.logoUrl ? (_jsx(motion.div, { className: "w-14 h-14 rounded-2xl overflow-hidden bg-[var(--hive-background-secondary)]/90 backdrop-blur-xl border border-[var(--hive-border-primary)]/50 p-2 shadow-lg", whileHover: { scale: 1.05, rotateY: 5 }, transition: { duration: 0.3 }, children: _jsx("img", { src: space.logoUrl, alt: space.name, className: "w-full h-full object-contain" }) })) : (_jsx("div", { className: "w-14 h-14 rounded-2xl bg-[var(--hive-background-secondary)]/90 backdrop-blur-xl border border-[var(--hive-border-primary)]/50 flex items-center justify-center shadow-lg", children: _jsx("span", { className: "text-2xl", children: getSpaceIcon() }) })) }), _jsx("div", { className: "absolute bottom-4 right-5", children: _jsx("span", { className: "text-sm font-mono font-bold text-[var(--hive-text-primary)] bg-[var(--hive-background-primary)]/70 backdrop-blur-xl px-3 py-1 rounded-xl border border-[var(--hive-border-primary)]/40", children: space.type.toUpperCase() }) })] }), _jsxs("div", { className: "p-5 flex flex-col flex-1", children: [_jsxs("div", { className: "mb-4", children: [_jsx(motion.h3, { className: "font-bold text-[var(--hive-text-primary)] text-lg leading-tight mb-2 group-hover:text-[var(--hive-brand-primary)] transition-colors duration-300", layoutId: `space-title-${space.id}`, children: space.name }), _jsx("div", { className: "flex items-center gap-2 text-sm text-[var(--hive-text-secondary)] mb-2", children: metadata.slice(0, 2).map((item, index) => (_jsxs(React.Fragment, { children: [index > 0 && _jsx("div", { className: "w-1 h-1 rounded-full bg-[var(--hive-text-muted)]" }), _jsx("span", { className: "font-medium", children: item })] }, index))) })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] leading-relaxed mb-4 line-clamp-2 flex-1", children: space.description }), showSocialProof && mutualConnections.length > 0 && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "flex items-center gap-3 text-sm text-[var(--hive-status-success)] mb-4 p-3 bg-[var(--hive-status-success)]/10 rounded-2xl border border-[var(--hive-status-success)]/20", children: [_jsx("div", { className: "flex -space-x-2", children: mutualConnections.slice(0, 3).map((connection, index) => (_jsx("div", { className: "w-7 h-7 rounded-full bg-[var(--hive-status-success)]/30 border-2 border-[var(--hive-status-success)]/50 flex items-center justify-center text-xs font-bold", title: `${connection.name}${connection.role ? ` (${connection.role})` : ''}`, children: connection.name.charAt(0) }, connection.id))) }), _jsxs("span", { className: "font-semibold", children: [mutualConnections.slice(0, 2).map(c => c.name.split(' ')[0]).join(', '), mutualConnections.length > 2 && ` & ${mutualConnections.length - 2} others`, " here"] })] })), _jsxs("div", { className: "flex items-center justify-between mt-auto", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-[var(--hive-text-muted)]", children: [_jsx(Users, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: (space.memberCount || 0).toLocaleString() }), space.type === 'university' && space.enrollment.capacity && (_jsxs("span", { className: "text-[var(--hive-text-placeholder)]", children: ["/ ", space.enrollment.capacity] }))] }), _jsx(motion.button, { onClick: handleJoinClick, disabled: isJoining, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: cn('px-5 py-2.5 rounded-2xl text-sm font-bold border transition-all duration-300 shadow-lg', primaryAction.variant === 'primary' && [
                                    'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40',
                                    'hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60',
                                    'hover:shadow-[var(--hive-brand-primary)]/25'
                                ], primaryAction.variant === 'secondary' && [
                                    'bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border-[var(--hive-status-warning)]/40',
                                    'hover:bg-[var(--hive-status-warning)]/30 hover:border-[var(--hive-status-warning)]/60'
                                ], primaryAction.variant === 'ghost' && [
                                    'bg-[var(--hive-text-muted)]/10 text-[var(--hive-text-secondary)] border-[var(--hive-text-muted)]/30',
                                    'hover:bg-[var(--hive-text-muted)]/20 hover:border-[var(--hive-text-muted)]/50'
                                ], isJoining && 'opacity-60 cursor-not-allowed'), children: isJoining ? 'Joining...' : primaryAction.text })] })] }), _jsx(AnimatePresence, { children: isHovered && (_jsxs(motion.div, { className: "absolute bottom-4 right-4 flex items-center gap-1 text-xs text-[var(--hive-brand-primary)] font-bold", initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 }, transition: { duration: 0.2 }, children: [_jsx("span", { children: "View Details" }), _jsx(ChevronRight, { className: "w-3 h-3" })] })) }), _jsx(AnimatePresence, { children: isHovered && (_jsx(motion.div, { className: "absolute inset-0 bg-gradient-radial from-[var(--hive-brand-primary)]/5 via-transparent to-transparent pointer-events-none rounded-3xl", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, transition: { duration: 0.4 } })) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--hive-text-primary)]/3 via-transparent to-transparent pointer-events-none rounded-3xl" })] }));
};
export default HiveSpaceCard;
//# sourceMappingURL=hive-space-card.js.map