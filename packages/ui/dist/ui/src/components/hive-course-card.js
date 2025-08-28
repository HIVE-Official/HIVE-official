/**
 * HIVE Course Card Component
 *
 * Campus-focused course card built on the unified card system,
 * designed for academic program display, course enrollment, and
 * educational resource management.
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { HiveStructuredCard } from './card-system/hive-card-composition';
import { BookOpen, Users, Clock, MapPin, Calendar, Award, CheckCircle, AlertCircle, XCircle, Plus, Minus, ExternalLink, Heart, Share2, Bookmark, User } from 'lucide-react';
// ============================================================================
// COURSE CARD SYSTEM
// ============================================================================
const hiveCourseCardVariants = cva("group transition-all duration-300", {
    variants: {
        status: {
            open: "border-[var(--hive-status-success)] hover:shadow-[var(--hive-shadow-emerald-glow)]",
            waitlist: "border-[var(--hive-status-warning)] hover:shadow-[var(--hive-shadow-gold-glow)]",
            closed: "border-[var(--hive-status-error)] hover:shadow-[var(--hive-shadow-ruby-glow)]",
            enrolled: "border-[var(--hive-border-gold)] shadow-[var(--hive-shadow-gold-glow)]/50",
            completed: "border-[var(--hive-status-success)] bg-[var(--hive-overlay-glass)]",
        },
        difficulty: {
            beginner: "border-l-4 border-l-[var(--hive-status-success)]",
            intermediate: "border-l-4 border-l-[var(--hive-status-warning)]",
            advanced: "border-l-4 border-l-[var(--hive-status-error)]",
            expert: "border-l-4 border-l-[var(--hive-brand-primary)]",
        },
        courseType: {
            lecture: "",
            seminar: "ring-1 ring-[var(--hive-border-subtle)]",
            lab: "bg-gradient-to-br from-[var(--hive-overlay-glass)] to-transparent",
            project: "bg-gradient-to-br from-[var(--hive-overlay-glass)] to-transparent border border-[var(--hive-brand-secondary)]",
            independent: "border-dashed",
        },
    },
    defaultVariants: {
        status: "open",
        difficulty: "beginner",
        courseType: "lecture",
    },
});
const statusBadgeVariants = cva("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", {
    variants: {
        status: {
            open: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/30",
            waitlist: "bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border border-[var(--hive-status-warning)]/30",
            closed: "bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)] border border-[var(--hive-status-error)]/30",
            enrolled: "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30",
            completed: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/30",
        },
    },
    defaultVariants: {
        status: "open",
    },
});
const difficultyBadgeVariants = cva("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", {
    variants: {
        difficulty: {
            beginner: "bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)]",
            intermediate: "bg-[var(--hive-status-warning)]/10 text-[var(--hive-status-warning)]",
            advanced: "bg-[var(--hive-status-error)]/10 text-[var(--hive-status-error)]",
            expert: "bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)]",
        },
    },
    defaultVariants: {
        difficulty: "beginner",
    },
});
// ============================================================================
// COURSE CARD UTILITIES
// ============================================================================
const getStatusIcon = (status) => {
    switch (status) {
        case 'open':
            return _jsx(CheckCircle, { size: 12 });
        case 'waitlist':
            return _jsx(Clock, { size: 12 });
        case 'closed':
            return _jsx(XCircle, { size: 12 });
        case 'enrolled':
            return _jsx(BookOpen, { size: 12 });
        case 'completed':
            return _jsx(Award, { size: 12 });
        default:
            return _jsx(AlertCircle, { size: 12 });
    }
};
const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
        case 'beginner':
            return 'Beginner';
        case 'intermediate':
            return 'Intermediate';
        case 'advanced':
            return 'Advanced';
        case 'expert':
            return 'Expert';
        default:
            return 'Unknown';
    }
};
const formatEnrollmentStatus = (course) => {
    const { capacity, enrolled, waitlist } = course.metadata;
    const available = capacity - enrolled;
    if (course.status === 'closed') {
        return { text: 'Closed', color: 'error' };
    }
    if (available > 0) {
        return { text: `${available} spots left`, color: 'success' };
    }
    if (waitlist && waitlist > 0) {
        return { text: `${waitlist} on waitlist`, color: 'warning' };
    }
    return { text: 'Full', color: 'error' };
};
// ============================================================================
// COURSE CARD COMPONENT
// ============================================================================
const HiveCourseCard = React.forwardRef(({ className, course, status, difficulty, courseType, 
// Display configuration
showFullDetails = false, showPrerequisites = true, showInstructor = true, showSchedule = true, showEnrollment = true, showActions = true, 
// Interaction handlers
onEnroll, onDrop, onWaitlist, onViewDetails, onContactInstructor, onFavorite, onShare, onBookmark, onViewSpace, onViewPrerequisite, 
// State
isFavorited = false, isBookmarked = false, isEnrolled = false, userRole = 'student', ...cardProps }, ref) => {
    const enrollmentStatus = formatEnrollmentStatus(course);
    const canEnroll = course.status === 'open' && !isEnrolled;
    const canWaitlist = course.status === 'waitlist' && !isEnrolled;
    const canDrop = isEnrolled;
    // Generate primary action based on course status
    const getPrimaryAction = () => {
        if (canDrop) {
            return {
                label: 'Drop Course',
                icon: _jsx(Minus, { size: 16 }),
                onClick: () => onDrop?.(course.id),
                variant: 'danger',
            };
        }
        if (canEnroll) {
            return {
                label: 'Enroll',
                icon: _jsx(Plus, { size: 16 }),
                onClick: () => onEnroll?.(course.id),
                variant: 'primary',
            };
        }
        if (canWaitlist) {
            return {
                label: 'Join Waitlist',
                icon: _jsx(Clock, { size: 16 }),
                onClick: () => onWaitlist?.(course.id),
                variant: 'secondary',
            };
        }
        return {
            label: 'View Details',
            icon: _jsx(ExternalLink, { size: 16 }),
            onClick: () => onViewDetails?.(course.id),
            variant: 'secondary',
        };
    };
    const primaryAction = getPrimaryAction();
    return (_jsx(HiveStructuredCard, { ref: ref, className: cn(hiveCourseCardVariants({
            status: status || course.status,
            difficulty: difficulty || course.difficulty,
            courseType: courseType || course.courseType
        }), className), variant: "academic", interactive: !!onViewDetails, onClick: onViewDetails ? () => onViewDetails(course.id) : undefined, animateEntrance: "slideUp", goldAccent: course.status === 'enrolled', 
        // Header
        headerActions: _jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: cn(statusBadgeVariants({ status: course.status })), children: [getStatusIcon(course.status), _jsx("span", { className: "capitalize", children: course.status })] }) }), title: _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[var(--hive-brand-primary)] font-mono text-sm", children: course.code }), _jsx("div", { className: cn(difficultyBadgeVariants({ difficulty: course.difficulty })), children: getDifficultyLabel(course.difficulty) })] }), _jsx("div", { children: course.title })] }), description: course.description, descriptionLines: showFullDetails ? undefined : 2, content: _jsxs("div", { className: "space-y-4", children: [showInstructor && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--hive-background-tertiary)] border border-[var(--hive-brand-secondary)] flex items-center justify-center", children: _jsx(User, { size: 16, className: "text-[var(--hive-brand-primary)]" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: course.instructor.name }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: course.instructor.title })] })] })), showSchedule && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--hive-overlay-glass)] flex items-center justify-center", children: _jsx(Calendar, { size: 16, className: "text-[var(--hive-text-secondary)]" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "font-medium text-[var(--hive-text-primary)]", children: [course.schedule.days.join(', '), " \u2022 ", course.schedule.startTime, " - ", course.schedule.endTime] }), _jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)] flex items-center gap-1", children: [_jsx(MapPin, { size: 12 }), course.schedule.location] })] })] })), showEnrollment && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--hive-overlay-glass)] flex items-center justify-center", children: _jsx(Users, { size: 16, className: "text-[var(--hive-text-secondary)]" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "font-medium text-[var(--hive-text-primary)]", children: [course.metadata.enrolled, " / ", course.metadata.capacity, " enrolled"] }), _jsx("div", { className: cn("text-xs", enrollmentStatus.color === 'success' && "text-[var(--hive-status-success)]", enrollmentStatus.color === 'warning' && "text-[var(--hive-status-warning)]", enrollmentStatus.color === 'error' && "text-[var(--hive-status-error)]"), children: enrollmentStatus.text })] }), _jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: [course.metadata.credits, " credits"] })] })), showPrerequisites && course.prerequisites.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Prerequisites" }), _jsx("div", { className: "flex flex-wrap gap-2", children: course.prerequisites.map((prereq) => (_jsx(motion.button, { className: cn("px-2 py-1 rounded text-xs border transition-colors", prereq.required
                                    ? "bg-[var(--hive-status-error)]/10 border-[var(--hive-status-error)]/30 text-[var(--hive-status-error)]"
                                    : "bg-[var(--hive-overlay-glass)] border-[var(--hive-border-subtle)] text-[var(--hive-text-secondary)]"), onClick: (e) => {
                                    e.stopPropagation();
                                    onViewPrerequisite?.(prereq.id);
                                }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: prereq.code }, prereq.id))) })] })), course.tags && course.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: course.tags.map((tag) => (_jsx("span", { className: "px-2 py-1 bg-[var(--hive-overlay-glass)] border border-[var(--hive-border-subtle)] rounded text-xs text-[var(--hive-text-secondary)]", children: tag }, tag))) }))] }), footer: showActions && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(motion.button, { className: "p-2 rounded-lg hover:bg-[var(--hive-overlay-glass)] transition-colors", onClick: (e) => {
                                e.stopPropagation();
                                onFavorite?.(course.id);
                            }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Heart, { size: 16, className: cn("transition-colors", isFavorited
                                    ? "fill-[var(--hive-status-error)] text-[var(--hive-status-error)]"
                                    : "text-[var(--hive-text-secondary)]") }) }), _jsx(motion.button, { className: "p-2 rounded-lg hover:bg-[var(--hive-overlay-glass)] transition-colors", onClick: (e) => {
                                e.stopPropagation();
                                onBookmark?.(course.id);
                            }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Bookmark, { size: 16, className: cn("transition-colors", isBookmarked
                                    ? "fill-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]"
                                    : "text-[var(--hive-text-secondary)]") }) }), _jsx(motion.button, { className: "p-2 rounded-lg hover:bg-[var(--hive-overlay-glass)] transition-colors", onClick: (e) => {
                                e.stopPropagation();
                                onShare?.(course.id);
                            }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Share2, { size: 16, className: "text-[var(--hive-text-secondary)]" }) })] }), _jsxs(motion.button, { className: cn("px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2", primaryAction.variant === 'primary' && "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", primaryAction.variant === 'secondary' && "bg-[var(--hive-overlay-glass)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass-medium)]", primaryAction.variant === 'danger' && "bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-status-error)]/80"), onClick: (e) => {
                        e.stopPropagation();
                        primaryAction.onClick();
                    }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [primaryAction.icon, _jsx("span", { children: primaryAction.label })] })] })), ...cardProps }));
});
HiveCourseCard.displayName = "HiveCourseCard";
export { HiveCourseCard, hiveCourseCardVariants };
//# sourceMappingURL=hive-course-card.js.map