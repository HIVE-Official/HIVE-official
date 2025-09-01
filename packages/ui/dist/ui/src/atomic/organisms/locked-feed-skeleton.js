"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button, Progress } from '../atoms/index.js';
import { Card } from '../molecules/index.js';
import { Lock, Calendar, Heart, MessageCircle, Share, Bookmark, User, Hash, Clock, Sparkles, Target, ArrowRight } from 'lucide-react';
export function LockedFeedSkeleton({ activationDate = new Date('2024-08-15'), // Default fall semester start
currentRitualProgress = 45, className = '' }) {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const targetTime = activationDate.getTime();
            const difference = targetTime - now;
            if (difference > 0) {
                setTimeRemaining({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [activationDate]);
    const mockPosts = [
        {
            id: '1',
            type: 'space_event',
            title: 'CS Study Group',
            preview: 'Join us for our weekly algorithms review session. We\'ll be covering dynamic programming and graph theory...',
            author: 'Sarah Chen',
            space: 'Computer Science',
            timeAgo: '2h ago',
            engagement: { likes: 24, comments: 8, shares: 3 }
        },
        {
            id: '2',
            type: 'tool_success',
            title: 'New Tool: Campus Food Tracker',
            preview: 'Just launched a tool that tracks dining hall wait times and menu updates in real-time...',
            author: 'Alex Rodriguez',
            space: 'HIVE Tools',
            timeAgo: '4h ago',
            engagement: { likes: 67, comments: 15, shares: 12 }
        },
        {
            id: '3',
            type: 'community_post',
            title: 'Looking for Study Partners',
            preview: 'Anyone else taking Organic Chemistry this fall? Would love to form a study group...',
            author: 'Jordan Kim',
            space: 'Pre-Med',
            timeAgo: '6h ago',
            engagement: { likes: 12, comments: 23, shares: 1 }
        }
    ];
    const getPostIcon = (type) => {
        switch (type) {
            case 'space_event': return Calendar;
            case 'tool_success': return Target;
            case 'community_post': return MessageCircle;
            default: return Hash;
        }
    };
    return (_jsxs("div", { className: `space-y-8 ${className}`, children: [_jsxs(Card, { className: "p-8 text-center bg-gradient-to-br from-hive-gold/10 to-hive-brand-secondary/10 border-hive-gold/30", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 bg-hive-gold/20 rounded-full flex items-center justify-center", children: _jsx(Lock, { className: "h-10 w-10 text-hive-gold" }) }), _jsx("h1", { className: "text-3xl font-bold text-hive-text-primary mb-3", children: "Activity Feed Launching Soon" }), _jsx("p", { className: "text-hive-text-secondary text-lg mb-6 max-w-2xl mx-auto", children: "Your personalized campus activity feed will activate when the semester begins. Complete your summer rituals to unlock the full experience." }), _jsx("div", { className: "grid grid-cols-4 gap-4 max-w-md mx-auto mb-6", children: Object.entries(timeRemaining).map(([unit, value]) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-hive-gold mb-1", children: value.toString().padStart(2, '0') }), _jsx("div", { className: "text-xs text-hive-text-secondary uppercase tracking-wide", children: unit })] }, unit))) }), _jsxs("div", { className: "text-sm text-hive-text-secondary mb-6", children: ["Activates on ", activationDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })] }), _jsxs("div", { className: "bg-hive-surface-elevated rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Sparkles, { className: "h-5 w-5 text-hive-gold" }), _jsx("span", { className: "font-semibold text-hive-text-primary", children: "Summer Ritual Progress" })] }), _jsxs("span", { className: "text-sm text-hive-text-secondary", children: [currentRitualProgress, "% complete"] })] }), _jsx(Progress, { value: currentRitualProgress, className: "h-2 mb-3" }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: "Complete your rituals to unlock personalized feed content" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-bold text-hive-text-primary", children: "Feed Preview" }), _jsx("span", { className: "text-sm text-hive-text-secondary", children: "What you'll see when activated" })] }), _jsx("div", { className: "space-y-4", children: mockPosts.map((post, index) => {
                            const IconComponent = getPostIcon(post.type);
                            return (_jsxs(Card, { className: "p-6 relative overflow-hidden opacity-60 hover:opacity-80 transition-opacity", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-hive-surface-base/50 to-transparent pointer-events-none" }), _jsxs("div", { className: "relative", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-sm font-bold text-hive-obsidian", children: post.author.charAt(0) }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h3", { className: "font-semibold text-hive-text-primary", children: post.author }), _jsx(IconComponent, { className: "h-4 w-4 text-hive-brand-secondary" })] }), _jsxs("p", { className: "text-sm text-hive-text-secondary", children: [post.space, " \u2022 ", post.timeAgo] })] })] }), _jsx(Clock, { className: "h-4 w-4 text-hive-text-secondary" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: post.title }), _jsx("p", { className: "text-hive-text-secondary", children: post.preview })] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-hive-border-subtle", children: [_jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs("div", { className: "flex items-center space-x-2 text-hive-text-secondary", children: [_jsx(Heart, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: post.engagement.likes })] }), _jsxs("div", { className: "flex items-center space-x-2 text-hive-text-secondary", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: post.engagement.comments })] }), _jsxs("div", { className: "flex items-center space-x-2 text-hive-text-secondary", children: [_jsx(Share, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: post.engagement.shares })] })] }), _jsx(Bookmark, { className: "h-4 w-4 text-hive-text-secondary" })] })] })] }, post.id));
                        }) }), _jsxs(Card, { className: "p-6 text-center bg-hive-surface-elevated border-hive-brand-secondary/30", children: [_jsx(Target, { className: "w-12 h-12 mx-auto mb-4 text-hive-brand-secondary" }), _jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: "Complete Your Summer Rituals" }), _jsx("p", { className: "text-hive-text-secondary mb-4", children: "Build your profile, discover spaces, and connect with peers to unlock personalized feed content tailored to your campus experience." }), _jsxs(Button, { className: "bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90", children: ["Continue Rituals", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })] })] }), _jsxs(Card, { className: "p-6 bg-hive-surface-elevated", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "What to Expect in Your Activity Feed" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 mx-auto mb-3 bg-hive-gold/20 rounded-lg flex items-center justify-center", children: _jsx(Calendar, { className: "h-6 w-6 text-hive-gold" }) }), _jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: "Space Events" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Study sessions, meetings, and activities from your joined spaces" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 mx-auto mb-3 bg-hive-brand-secondary/20 rounded-lg flex items-center justify-center", children: _jsx(Target, { className: "h-6 w-6 text-hive-brand-secondary" }) }), _jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: "Tool Successes" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "New tools, achievements, and collaborative projects from the community" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 mx-auto mb-3 bg-purple-400/20 rounded-lg flex items-center justify-center", children: _jsx(User, { className: "h-6 w-6 text-purple-400" }) }), _jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: "Campus Updates" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Relevant posts and discussions from your campus community" })] })] })] })] }));
}
//# sourceMappingURL=locked-feed-skeleton.js.map