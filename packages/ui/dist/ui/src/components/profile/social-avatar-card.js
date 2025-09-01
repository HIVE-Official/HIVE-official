/**
 * Social Avatar Card - Tinder-Style Profile Identity
 * Portrait design with swipe gestures and social context
 */
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { User, Edit3, Shield, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Badge } from '../ui/badge.js';
import { motion } from '../../lib/motion.js';
import { butterClasses } from '../../lib/motion.js';
import '../../styles/social-profile.css';
export function SocialAvatarCard({ user, socialProof, isOwn = false, onEditProfile, onPrivacySettings, onPhotoUpload, onConnect, onMessage, className }) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
    const fileInputRef = useRef(null);
    const photos = user.photos || (user.avatar ? [user.avatar] : []);
    const hasMultiplePhotos = photos.length > 1;
    const handlePhotoNavigation = (direction) => {
        if (!hasMultiplePhotos)
            return;
        setCurrentPhotoIndex(prev => {
            if (direction === 'next') {
                return prev === photos.length - 1 ? 0 : prev + 1;
            }
            else {
                return prev === 0 ? photos.length - 1 : prev - 1;
            }
        });
    };
    const handlePhotoUpload = (event) => {
        const file = event.target.files?.[0];
        if (file && onPhotoUpload) {
            onPhotoUpload(file);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'var(--social-green)';
            case 'away': return 'var(--alert-orange)';
            case 'studying': return 'var(--campus-blue)';
            default: return 'var(--text-inactive)';
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'online': return 'Online now';
            case 'away': return 'Away';
            case 'studying': return 'Studying';
            case 'offline': return user.lastSeen ? `Last seen ${user.lastSeen}` : 'Offline';
            default: return '';
        }
    };
    return (_jsxs(motion.div, { className: cn("portrait-avatar-card social-profile-card", butterClasses.card, className), style: { gridArea: 'avatar' }, initial: { opacity: 0, y: 24, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }, whileHover: { y: -4, scale: 1.01, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }, children: [_jsxs(motion.div, { className: "portrait-photo-container group photo-butter-hover", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, children: [hasMultiplePhotos && (_jsx(motion.div, { className: "photo-indicators", initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }, children: photos.map((_, index) => (_jsx(motion.div, { className: cn("photo-indicator", {
                                active: index === currentPhotoIndex
                            }), whileHover: { scale: 1.2 }, animate: {
                                scale: index === currentPhotoIndex ? 1.1 : 1,
                                opacity: index === currentPhotoIndex ? 1 : 0.6
                            }, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }, index))) })), _jsx(motion.div, { className: cn("online-status status-butter", user.onlineStatus), style: { background: getStatusColor(user.onlineStatus) }, initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.6, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }, whileHover: { scale: 1.1, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } } }), photos[currentPhotoIndex] ? (_jsx(motion.img, { src: photos[currentPhotoIndex], alt: `${user.fullName}`, className: cn("portrait-photo", butterClasses.image), onClick: () => setIsPhotoExpanded(true), whileHover: { scale: 1.02, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }, whileTap: { scale: 0.99, transition: { duration: 0.2 } }, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } })) : (_jsx(motion.div, { className: "portrait-photo bg-gray-800 flex items-center justify-center", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, whileHover: { scale: 1.02, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }, children: _jsx(User, { size: 48, className: "text-[var(--hive-text-muted)]" }) })), hasMultiplePhotos && (_jsxs(_Fragment, { children: [_jsx(motion.button, { onClick: () => handlePhotoNavigation('prev'), className: cn("absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", butterClasses.button), whileHover: { scale: 1.05, backgroundColor: 'rgba(0, 0, 0, 0.7)', transition: { duration: 0.3 } }, whileTap: { scale: 0.95 }, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }, children: _jsx(ChevronLeft, { size: 16, className: "text-[var(--hive-text-inverse)]" }) }), _jsx(motion.button, { onClick: () => handlePhotoNavigation('next'), className: cn("absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", butterClasses.button), whileHover: { scale: 1.05, backgroundColor: 'rgba(0, 0, 0, 0.7)', transition: { duration: 0.3 } }, whileTap: { scale: 0.95 }, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }, children: _jsx(ChevronRight, { size: 16, className: "text-[var(--hive-text-inverse)]" }) })] })), isOwn && (_jsxs("div", { className: "absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center", children: [_jsxs(Button, { variant: "secondary", size: "sm", onClick: () => fileInputRef.current?.click(), className: "bg-white/20 backdrop-blur-sm border-white/30", children: [_jsx(Camera, { size: 16, className: "mr-2" }), "Change Photo"] }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handlePhotoUpload, className: "hidden" })] })), hasMultiplePhotos && (_jsx(motion.div, { className: "swipe-hint", initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }, children: "Swipe for more photos" }))] }), _jsxs(motion.div, { className: "portrait-content", initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, children: [_jsxs(motion.div, { className: "flex items-baseline gap-3 mb-2", initial: { opacity: 0, x: -12 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.5, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }, children: [_jsx("h2", { className: "portrait-name", children: user.fullName }), user.isBuilder && (_jsx(motion.div, { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.5, duration: 0.3, type: "spring", stiffness: 400, damping: 25 }, whileHover: { scale: 1.1 }, children: _jsx(Badge, { className: "builder-badge badge-butter-enter", children: "\uD83C\uDFD7\uFE0F Builder" }) }))] }), _jsx(motion.div, { className: "portrait-details mb-4", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.5, duration: 0.3 }, children: user.academicYear && user.major ? (`${user.academicYear} • ${user.major}`) : user.major ? (user.major) : user.academicYear ? (user.academicYear) : (`@${user.handle}`) }), _jsxs(motion.div, { className: "flex items-center gap-2 mb-4", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.6, duration: 0.3 }, children: [_jsx(motion.div, { className: "w-2 h-2 rounded-full", style: { background: getStatusColor(user.onlineStatus) }, initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.7, duration: 0.2, type: "spring", stiffness: 400, damping: 25 }, whileHover: { scale: 1.5 } }), _jsx("span", { className: "profile-caption text-tertiary", children: getStatusText(user.onlineStatus) })] }), user.isBuilder && (user.toolsCreated || user.campusImpact) && (_jsxs(motion.div, { className: "flex gap-6 mb-4", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7, duration: 0.3 }, children: [user.toolsCreated && (_jsxs(motion.div, { className: "text-center", whileHover: { scale: 1.05 }, transition: { duration: 0.2 }, children: [_jsx("div", { className: "profile-caption font-semibold text-primary", children: user.toolsCreated }), _jsx("div", { className: "profile-fine text-tertiary", children: "Tools Created" })] })), user.campusImpact && (_jsxs(motion.div, { className: "text-center", whileHover: { scale: 1.05 }, transition: { duration: 0.2 }, children: [_jsx("div", { className: "profile-caption font-semibold text-primary", children: user.campusImpact }), _jsx("div", { className: "profile-fine text-tertiary", children: "Campus Impact" })] }))] })), user.bio && (_jsxs(motion.p, { className: "portrait-bio mb-6", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.8, duration: 0.3 }, children: ["\"", user.bio, "\""] })), _jsx(motion.div, { className: "flex gap-3 mt-2", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.9, duration: 0.3 }, children: isOwn ? (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "flex-1", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs(Button, { onClick: onEditProfile, className: cn("social-action-button flex-1", butterClasses.button), children: [_jsx(Edit3, { size: 16 }), "Edit Profile"] }) }), _jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsx(Button, { onClick: onPrivacySettings, className: cn("social-action-button secondary", butterClasses.button), variant: "secondary", children: _jsx(Shield, { size: 16 }) }) })] })) : (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "flex-1", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsx(Button, { onClick: onConnect, className: cn("social-action-button flex-1", butterClasses.button), children: "Connect" }) }), _jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsx(Button, { onClick: onMessage, className: cn("social-action-button secondary", butterClasses.button), variant: "secondary", children: "Message" }) })] })) }), !isOwn && (_jsxs(motion.div, { className: "social-proof mt-4", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.0, duration: 0.3 }, children: [_jsx("span", { className: "social-count", children: socialProof?.mutualConnections || 0 }), _jsxs("span", { children: [" mutual connection", (socialProof?.mutualConnections || 0) === 1 ? '' : 's'] })] }))] }), isPhotoExpanded && (_jsxs("div", { className: "fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4", onClick: () => setIsPhotoExpanded(false), children: [_jsx("img", { src: photos[currentPhotoIndex], alt: `${user.fullName} - Photo ${currentPhotoIndex + 1}`, className: "max-w-full max-h-full object-contain" }), _jsx("button", { onClick: () => setIsPhotoExpanded(false), className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-[var(--hive-text-inverse)] hover:bg-white/30 transition-colors", children: "\u00D7" })] }))] }));
}
export default SocialAvatarCard;
//# sourceMappingURL=social-avatar-card.js.map