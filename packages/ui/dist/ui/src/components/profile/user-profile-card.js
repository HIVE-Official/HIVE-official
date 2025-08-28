/**
 * UserProfileCard - Purpose-built for UB student profiles
 *
 * Shows what students actually want to know about each other:
 * 1. Who is this person? (name, major, year)
 * 2. Are they active? (online status, recent activity)
 * 3. How do I connect? (message, add friend)
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MessageCircle, UserPlus, MapPin, GraduationCap, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
export function UserProfileCard({ profile, currentUserId, showBio = true, showStats = true, onMessage, onConnect, onViewProfile, isConnected = false, className }) {
    const isOwnProfile = currentUserId === profile.id;
    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'bg-green-400';
            case 'away': return 'bg-yellow-400';
            case 'studying': return 'bg-blue-400';
            case 'offline': return 'bg-gray-500';
        }
    };
    const getStatusText = (status, lastSeen) => {
        switch (status) {
            case 'online': return 'Active now';
            case 'away': return 'Away';
            case 'studying': return 'Studying';
            case 'offline': return lastSeen || 'Offline';
        }
    };
    const handleCardClick = () => {
        if (!isOwnProfile) {
            onViewProfile?.(profile.id);
        }
    };
    return (_jsx(Card, { className: cn("border border-gray-700 bg-gray-900 hover:border-gray-600", !isOwnProfile && "cursor-pointer hover:bg-gray-850", className), onClick: handleCardClick, children: _jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsxs("div", { className: "relative", children: [_jsxs(Avatar, { className: "h-12 w-12", children: [_jsx(AvatarImage, { src: profile.avatar, alt: profile.name }), _jsx(AvatarFallback, { className: "bg-gray-800 text-white", children: profile.name.split(' ').map(n => n[0]).join('').toUpperCase() })] }), _jsx("div", { className: cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-gray-900", getStatusColor(profile.status)) })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h3", { className: "font-semibold text-white text-base truncate", children: profile.name }), _jsx("p", { className: "text-sm text-gray-400", children: profile.handle })] }), (profile.major || profile.year) && (_jsxs("div", { className: "flex items-center gap-2 mt-2 text-xs text-gray-500", children: [_jsx(GraduationCap, { className: "h-3 w-3" }), _jsxs("span", { children: [profile.major, profile.major && profile.year && ' • ', profile.year] })] }))] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-xs text-gray-500", children: getStatusText(profile.status, profile.lastSeen) }), profile.isBuilder && (_jsxs(Badge, { variant: "secondary", className: "mt-1 text-xs", children: [_jsx(Zap, { className: "h-2.5 w-2.5 mr-1" }), "Builder"] }))] })] }), showBio && profile.bio && (_jsx("p", { className: "text-sm text-gray-400 leading-relaxed line-clamp-2", children: profile.bio })), (profile.location || showStats) && (_jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-500", children: [profile.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: profile.location })] })), showStats && (_jsxs(_Fragment, { children: [profile.spacesCount !== undefined && (_jsxs("div", { children: [profile.spacesCount, " spaces"] })), profile.toolsBuilt !== undefined && profile.toolsBuilt > 0 && (_jsxs("div", { children: [profile.toolsBuilt, " tools built"] })), profile.mutualSpaces !== undefined && profile.mutualSpaces > 0 && (_jsxs("div", { className: "text-amber-400", children: [profile.mutualSpaces, " spaces in common"] }))] }))] })), !isOwnProfile && (onMessage || onConnect) && (_jsxs("div", { className: "flex gap-2 pt-2", children: [onMessage && (_jsxs(Button, { size: "sm", variant: "secondary", onClick: (e) => {
                                e.stopPropagation();
                                onMessage(profile.id);
                            }, className: "flex-1", children: [_jsx(MessageCircle, { className: "h-3 w-3 mr-1" }), "Message"] })), onConnect && (_jsxs(Button, { size: "sm", variant: isConnected ? "secondary" : "primary", onClick: (e) => {
                                e.stopPropagation();
                                onConnect(profile.id);
                            }, className: "flex-1", children: [_jsx(UserPlus, { className: "h-3 w-3 mr-1" }), isConnected ? "Connected" : "Connect"] }))] }))] }) }));
}
// Compact version for lists and smaller spaces
export function UserProfileCardCompact({ profile, onMessage, className }) {
    return (_jsxs("div", { className: cn("flex items-center justify-between p-3 border-b border-gray-700 hover:bg-gray-800/50", className), children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsxs("div", { className: "relative", children: [_jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: profile.avatar, alt: profile.name }), _jsx(AvatarFallback, { className: "bg-gray-800 text-white text-xs", children: profile.name.split(' ').map(n => n[0]).join('').toUpperCase() })] }), _jsx("div", { className: cn("absolute -bottom-0 -right-0 h-2 w-2 rounded-full border border-gray-800", getStatusColor(profile.status)) })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-white text-sm truncate", children: profile.name }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [_jsx("span", { children: profile.handle }), profile.major && (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-1 w-1 bg-gray-500 rounded-full" }), _jsx("span", { children: profile.major })] }))] })] })] }), onMessage && (_jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => {
                    e.stopPropagation();
                    onMessage(profile.id);
                }, className: "text-xs px-2", children: _jsx(MessageCircle, { className: "h-3 w-3" }) }))] }));
}
// Helper function (extracted for reuse)
function getStatusColor(status) {
    switch (status) {
        case 'online': return 'bg-green-400';
        case 'away': return 'bg-yellow-400';
        case 'studying': return 'bg-blue-400';
        case 'offline': return 'bg-gray-500';
    }
}
//# sourceMappingURL=user-profile-card.js.map