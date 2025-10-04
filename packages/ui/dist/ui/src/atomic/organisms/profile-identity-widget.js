'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../atoms/card.js';
import { Avatar } from '../atoms/avatar.js';
import { Camera, MapPin, GraduationCap, Sparkles, CheckCircle, Users, Activity } from 'lucide-react';
import { PresenceIndicator } from '../atoms/presence-indicator.js';
import { PrivacyControl } from '../molecules/privacy-control.js';
/**
 * Profile Identity Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - Luxury minimalism with gold accent
 * - 8px grid system
 * - Black/Gold/White/Gray palette only
 * - 5 states: default, hover, focus, active, disabled
 * - Mobile-first with 44px touch targets
 */
export const ProfileIdentityWidget = ({ profile, isOwnProfile = false, onEditPhoto, presenceStatus = 'offline', lastSeen, privacyLevel = 'public', onPrivacyChange, className = '' }) => {
    const completionPercentage = profile.metadata?.completionPercentage || 0;
    const isVerified = profile.verification?.facultyVerified;
    // SPEC: No handle display - use name and academic info
    const displayName = profile.identity.fullName || 'Anonymous Student';
    const academicInfo = profile.academic;
    const yearLabel = academicInfo.academicYear?.charAt(0).toUpperCase() +
        academicInfo.academicYear?.slice(1) || '';
    return (_jsxs(Card, { className: `
        relative overflow-hidden
        bg-black border border-white/8
        p-8 space-y-6
        transition-all duration-300
        hover:border-white/16
        ${className}
      `, children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-60" }), isOwnProfile && onPrivacyChange && (_jsx("div", { className: "absolute top-4 right-4 z-10", children: _jsx(PrivacyControl, { level: privacyLevel, onLevelChange: onPrivacyChange, compact: true, className: "backdrop-blur-sm" }) })), _jsxs("div", { className: "flex items-start gap-6", children: [_jsxs("div", { className: "relative group", children: [_jsx(Avatar, { className: "w-24 h-24 border-2 border-white/8 group-hover:border-[#FFD700]/40 transition-all duration-300", children: profile.identity.avatarUrl && (_jsx("img", { src: profile.identity.avatarUrl, alt: displayName, className: "w-full h-full object-cover" })) }), isOwnProfile && (_jsx("button", { onClick: onEditPhoto, className: "\n                absolute inset-0\n                bg-black/60 opacity-0\n                group-hover:opacity-100\n                transition-opacity duration-300\n                rounded-full\n                flex items-center justify-center\n                min-h-[44px] min-w-[44px]\n              ", "aria-label": "Change profile photo", children: _jsx(Camera, { className: "w-5 h-5 text-white" }) })), _jsx("div", { className: "absolute -bottom-1 -right-1 z-10", children: _jsx(PresenceIndicator, { status: presenceStatus, size: "lg", lastSeen: lastSeen }) }), isVerified && (_jsx("div", { className: "absolute -top-1 -right-1", children: _jsx("div", { className: "bg-[#FFD700] rounded-full p-1", children: _jsx(CheckCircle, { className: "w-4 h-4 text-black" }) }) }))] }), _jsxs("div", { className: "flex-1 space-y-3", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-white", children: displayName }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(GraduationCap, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "text-sm text-gray-300", children: [yearLabel, " ", academicInfo.major && `• ${academicInfo.major}`, academicInfo.graduationYear && ` '${String(academicInfo.graduationYear).slice(-2)}`] })] }), academicInfo.housing && (_jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(MapPin, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "text-sm text-gray-300", children: academicInfo.housing })] }))] }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "text-sm text-gray-300", children: [profile.social?.connections?.connectionIds?.length || 0, " connections"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { className: "text-sm text-gray-300", children: [profile.social?.mutualSpaces?.length || 0, " spaces"] })] })] })] })] }), profile.personal?.bio && (_jsx("div", { className: "pt-4 border-t border-white/8", children: _jsx("p", { className: "text-sm text-gray-300 leading-relaxed", children: profile.personal.bio }) })), isOwnProfile && completionPercentage < 70 && (_jsxs("div", { className: "pt-4 border-t border-white/8", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-xs text-gray-400", children: "Profile Strength" }), _jsxs("span", { className: "text-xs text-[#FFD700] font-medium", children: [completionPercentage, "% Complete"] })] }), _jsx("div", { className: "relative h-2 bg-gray-900 rounded-full overflow-hidden", children: _jsx("div", { className: "absolute inset-y-0 left-0 bg-gradient-to-r from-[#FFD700]/60 to-[#FFD700] transition-all duration-500", style: { width: `${completionPercentage}%` } }) }), completionPercentage < 50 && (_jsx("p", { className: "text-xs text-gray-400 mt-2", children: "Complete your profile to unlock all features" }))] })), profile.personal?.currentVibe && (_jsxs("div", { className: "flex items-center gap-2 pt-4 border-t border-white/8", children: [_jsx(Sparkles, { className: "w-4 h-4 text-[#FFD700]" }), _jsx("span", { className: "text-sm text-gray-300", children: profile.personal.currentVibe })] }))] }));
};
//# sourceMappingURL=profile-identity-widget.js.map