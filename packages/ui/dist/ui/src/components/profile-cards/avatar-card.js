'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from '../framer-motion-proxy';
import { cn } from '../../lib/utils';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveProgressBar } from '../hive-progress';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Camera, Upload, Sparkles, Trophy, Shield, Lock, Plus } from 'lucide-react';
const badgeVariants = {
    builder: {
        icon: Trophy,
        label: 'Builder',
        color: 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border-hive-gold/30',
    },
    verified: {
        icon: Shield,
        label: 'Verified Student',
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    }
};
export const AvatarCard = ({ user, completionStatus, showOnboarding = false, isEditMode = false, onPhotoUpload, onGenerateAvatar, onEditProfile, onPrivacySettings, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (file && onPhotoUpload) {
            setIsUploading(true);
            try {
                await onPhotoUpload(file);
            }
            finally {
                setIsUploading(false);
            }
        }
    };
    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    return (_jsxs(HiveCard, { variant: user.isBuilder ? "gold-featured" : "elevated", magneticHover: true, magneticIntensity: "medium", interactive: true, className: cn('h-full flex flex-col', className), children: [_jsxs("div", { className: "p-6 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Your Profile" }), isEditMode && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: onEditProfile, className: "text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80", children: "Edit" }))] }), _jsxs("div", { className: "flex flex-col items-center mb-6", children: [_jsxs(motion.div, { className: "relative", onHoverStart: () => setIsHovered(true), onHoverEnd: () => setIsHovered(false), whileHover: { scale: 1.05 }, transition: { type: "spring", stiffness: 300, damping: 25 }, children: [_jsxs(Avatar, { className: "h-20 w-20 ring-2 ring-white/10", children: [_jsx(AvatarImage, { src: user.avatar, alt: user.name, className: "object-cover" }), _jsx(AvatarFallback, { className: "bg-gradient-to-br from-hive-gold/20 to-hive-gold/5 text-[var(--hive-brand-secondary)] text-xl font-semibold", children: getInitials(user.name) })] }), _jsx(AnimatePresence, { children: (isHovered || isEditMode) && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "absolute inset-0 rounded-full bg-[var(--hive-background-primary)]/60 flex items-center justify-center", children: isUploading ? (_jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" }, children: _jsx(Upload, { className: "h-5 w-5 text-[var(--hive-text-primary)]" }) })) : (_jsx(Camera, { className: "h-5 w-5 text-[var(--hive-text-primary)]" })) })) }), _jsx(AnimatePresence, { children: (isHovered || isEditMode) && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 }, className: "absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1", children: [_jsx(HiveButton, { size: "sm", variant: "outline", onClick: triggerFileUpload, className: "h-6 px-2 text-xs", disabled: isUploading, children: _jsx(Upload, { className: "h-3 w-3" }) }), onGenerateAvatar && (_jsx(HiveButton, { size: "sm", variant: "outline", onClick: onGenerateAvatar, className: "h-6 px-2 text-xs", disabled: isUploading, children: _jsx(Sparkles, { className: "h-3 w-3" }) }))] })) }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileUpload, className: "hidden" })] }), _jsxs("div", { className: "text-center mt-4", children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-1", children: user.name }), user.campus && (_jsxs("p", { className: "text-sm text-gray-400 mb-2", children: [user.major ? `${user.major} • ` : '', user.campus, user.gradYear && ` '${user.gradYear.slice(-2)}`] }))] }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [user.isBuilder && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: "spring", delay: 0.2 }, children: _jsxs(HiveBadge, { variant: "tools-guru", className: badgeVariants.builder.color, children: [_jsx(badgeVariants.builder.icon, { className: "h-3 w-3 mr-1" }), badgeVariants.builder.label] }) })), user.isVerifiedStudent && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: "spring", delay: 0.3 }, children: _jsxs(HiveBadge, { variant: "deans-list", className: badgeVariants.verified.color, children: [_jsx(badgeVariants.verified.icon, { className: "h-3 w-3 mr-1" }), badgeVariants.verified.label] }) }))] })] }), completionStatus && completionStatus.overall < 100 && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "mb-6", children: [_jsxs("div", { className: "mb-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Profile Completion" }), _jsxs("span", { className: "text-sm text-[var(--hive-brand-secondary)] font-medium", children: [completionStatus.overall, "%"] })] }), _jsx(HiveProgressBar, { value: completionStatus.overall, className: "h-2" })] }), _jsx("div", { className: "space-y-2", children: completionStatus.sections && Object.entries(completionStatus.sections).map(([key, section]) => (!section.completed && (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, className: "flex items-center gap-2 text-xs", children: [_jsx(Plus, { className: "h-3 w-3 text-[var(--hive-brand-secondary)]" }), _jsxs("span", { className: "text-gray-300", children: ["Add ", section.label] })] }, key)))) })] })), user.stats && (_jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: user.stats.spacesJoined }), _jsx("div", { className: "text-xs text-gray-400", children: "Spaces" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: user.stats.toolsUsed }), _jsx("div", { className: "text-xs text-gray-400", children: "Tools" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: user.stats.connectionsCount }), _jsxs("div", { className: "text-xs text-gray-400 flex items-center justify-center gap-1", children: ["Connections", _jsx(Lock, { className: "h-3 w-3" })] })] })] })), _jsx(AnimatePresence, { children: showOnboarding && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-4 p-3 rounded-lg bg-[var(--hive-brand-secondary)]/10 border border-hive-gold/20", children: _jsx("p", { className: "text-xs text-[var(--hive-brand-secondary)] text-center", children: "Complete your profile to unlock more HIVE features" }) })) })] }), _jsx("div", { className: "p-4 border-t border-white/10", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: onEditProfile, className: "flex-1", children: "Edit Profile" }), _jsx(HiveButton, { variant: "ghost", size: "sm", onClick: onPrivacySettings, className: "px-3", children: _jsx(Lock, { className: "h-4 w-4" }) })] }) })] }));
};
export default AvatarCard;
//# sourceMappingURL=avatar-card.js.map