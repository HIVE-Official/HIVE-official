/**
 * Event Card Component
 *
 * Implements SPEC.md event cards (lines 454-507) with behavioral psychology:
 * - Visual distinction from posts (colored border)
 * - Social proof ("Jake, Sarah +45 going")
 * - Urgency indicators with countdown timers
 * - One-tap RSVP from feed
 * - FOMO generation ("🔥 Filling up fast")
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Card } from "../atoms/card.js";
import { Button } from "../atoms/button.js";
import { Badge } from "../atoms/badge.js";
import { Avatar } from "../atoms/avatar.js";
import { Calendar, Clock, MapPin, Users, Heart, Share, Bookmark, TrendingUp, AlertCircle, CheckCircle, } from "lucide-react";
const EventCard = React.forwardRef(({ className, event, onRSVP, onShare, onSave, onSpaceClick, compact = false, enablePsychology = true, ...props }, ref) => {
    const [timeUntilEvent, setTimeUntilEvent] = React.useState('');
    const [isCountingDown, setIsCountingDown] = React.useState(false);
    // Calculate time until event for urgency
    React.useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const eventStart = new Date(event.startTime);
            const timeDiff = eventStart.getTime() - now.getTime();
            if (timeDiff < 0) {
                setTimeUntilEvent('Started');
                setIsCountingDown(false);
                return;
            }
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            if (hours < 2) {
                setTimeUntilEvent(`${hours}h ${minutes}m`);
                setIsCountingDown(true);
            }
            else if (hours < 24) {
                setTimeUntilEvent(`${hours} hours`);
                setIsCountingDown(false);
            }
            else {
                const days = Math.floor(hours / 24);
                setTimeUntilEvent(`${days} days`);
                setIsCountingDown(false);
            }
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [event.startTime]);
    // Calculate urgency color
    const urgencyColor = React.useMemo(() => {
        switch (event.urgencyLevel) {
            case 'high': return 'border-red-500 shadow-red-500/20';
            case 'medium': return 'border-orange-500 shadow-orange-500/20';
            default: return 'border-blue-500 shadow-blue-500/20';
        }
    }, [event.urgencyLevel]);
    // Format event time for display
    const formatEventTime = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (date.toDateString() === today.toDateString()) {
            return `Today ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        }
        else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        }
        else {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            });
        }
    };
    // Calculate capacity percentage for FOMO
    const capacityPercentage = event.rsvp.capacity
        ? (event.rsvp.going / event.rsvp.capacity) * 100
        : 0;
    return (_jsxs(Card, { ref: ref, className: cn("relative overflow-hidden border-l-4 transition-all duration-fast ease-smooth", "bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm", urgencyColor, compact ? "p-3" : "p-4", enablePsychology && isCountingDown && "animate-pulse", className), ...props, children: [event.isTrending && (_jsx("div", { className: "absolute top-3 right-3", children: _jsxs(Badge, { variant: "sophomore", className: "bg-[#FFD700] text-black text-xs font-semibold flex items-center gap-1", children: [_jsx(TrendingUp, { className: "h-3 w-3" }), "Trending"] }) })), enablePsychology && event.isFillingUp && capacityPercentage > 70 && (_jsx("div", { className: "absolute top-3 left-3", children: _jsx(Badge, { variant: "destructive", className: "bg-red-500 text-white text-xs font-semibold animate-bounce", children: "\uD83D\uDD25 Filling up fast" }) })), event.coverImage && !compact && (_jsxs("div", { className: "relative w-full h-32 mb-3 rounded-lg overflow-hidden", children: [_jsx("img", { src: event.coverImage, alt: event.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" })] })), _jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: cn("font-semibold text-white line-clamp-2", compact ? "text-sm" : "text-lg"), children: event.title }), _jsxs("button", { onClick: () => onSpaceClick?.(event.hostSpace.id), className: "text-xs text-white/70 hover:text-[#FFD700] transition-colors mt-1", children: ["Hosted by ", event.hostSpace.name] })] }), enablePsychology && (_jsxs("div", { className: "flex items-center gap-1 ml-3", children: [isCountingDown ? (_jsx(AlertCircle, { className: "h-4 w-4 text-red-500 animate-pulse" })) : (_jsx(Clock, { className: "h-4 w-4 text-white/60" })), _jsx("span", { className: cn("text-xs font-medium", isCountingDown ? "text-red-400" : "text-white/70"), children: timeUntilEvent })] }))] }), _jsxs("div", { className: "space-y-2 mb-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-white/80", children: [_jsx(Calendar, { className: "h-4 w-4 text-white/60" }), _jsx("span", { children: formatEventTime(event.startTime) })] }), event.location && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-white/80", children: [_jsx(MapPin, { className: "h-4 w-4 text-white/60" }), _jsx("span", { children: event.location.building && event.location.room
                                    ? `${event.location.building} ${event.location.room}`
                                    : event.location.name }), event.location.isOnCampus && (_jsx(Badge, { variant: "freshman", className: "text-xs border-white/20 text-white/70", children: "On Campus" }))] })), event.rsvp.capacity && capacityPercentage > 80 && enablePsychology && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-orange-400", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsxs("span", { children: [event.rsvp.capacity - event.rsvp.going, " spots left"] })] }))] }), event.attendees && event.attendees.preview.length > 0 && (_jsx("div", { className: "mb-4", children: _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "flex -space-x-2", children: event.attendees.preview.slice(0, 3).map((attendee, idx) => (_jsx(Avatar, { className: "h-6 w-6 border-2 border-black", children: _jsx("img", { src: attendee.avatar || '/default-avatar.png', alt: attendee.name }) }, idx))) }), _jsx("div", { className: "text-xs text-white/70", children: event.attendees.friendsGoing.length > 0 ? (_jsxs("span", { className: "text-[#FFD700] font-medium", children: [event.attendees.friendsGoing.slice(0, 2).join(', '), event.attendees.friendsGoing.length > 2 && ` +${event.attendees.friendsGoing.length - 2} friends`, ' ', "going"] })) : (_jsxs("span", { children: [event.rsvp.going, " going", event.rsvp.interested > 0 && `, ${event.rsvp.interested} interested`] })) })] }) })), !compact && event.description && (_jsx("p", { className: "text-sm text-white/70 mb-4 line-clamp-2", children: event.description })), _jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/10", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: event.rsvp.rsvpType === 'going' ? 'default' : 'outline', size: "sm", className: cn("flex-1 transition-all duration-fast ease-smooth", event.rsvp.rsvpType === 'going' && "bg-[#FFD700] text-black hover:bg-[#FFD700]/90"), onClick: () => onRSVP?.(event.id, 'going'), children: [event.rsvp.rsvpType === 'going' ? (_jsx(CheckCircle, { className: "h-4 w-4 mr-1" })) : (_jsx(Users, { className: "h-4 w-4 mr-1" })), "Going"] }), _jsx(Button, { variant: event.rsvp.rsvpType === 'interested' ? 'default' : 'ghost', size: "sm", className: "transition-all duration-fast ease-smooth", onClick: () => onRSVP?.(event.id, 'interested'), children: _jsx(Heart, { className: cn("h-4 w-4", event.rsvp.rsvpType === 'interested' && "fill-current text-red-500") }) })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", onClick: () => onShare?.(event.id), children: _jsx(Share, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", onClick: () => onSave?.(event.id), children: _jsx(Bookmark, { className: "h-4 w-4" }) })] })] })] }));
});
EventCard.displayName = "EventCard";
export { EventCard };
//# sourceMappingURL=event-card.js.map