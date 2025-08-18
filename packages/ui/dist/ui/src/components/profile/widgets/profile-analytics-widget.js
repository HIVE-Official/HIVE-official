'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from '../../framer-motion-proxy';
import { BarChart3, TrendingUp, Users, BookOpen, Activity, Star, Zap, Lock } from 'lucide-react';
export const ProfileAnalyticsWidget = () => {
    const [joinedWaitlist, setJoinedWaitlist] = useState(false);
    const analyticsPreview = [
        { label: 'Engagement Score', value: '87%', color: 'purple', icon: Activity },
        { label: 'Study Hours', value: '24h', color: 'blue', icon: BookOpen },
        { label: 'Active Spaces', value: '6', color: 'green', icon: Users },
        { label: 'Campus Integration', value: '89%', color: 'yellow', icon: TrendingUp }
    ];
    const upcomingFeatures = [
        'Real-time engagement tracking',
        'Study efficiency analysis',
        'Social network growth metrics',
        'Personalized optimization tips',
        'Goal tracking and milestones',
        'Weekly progress reports'
    ];
    const handleJoinWaitlist = () => {
        setJoinedWaitlist(true);
        setTimeout(() => setJoinedWaitlist(false), 3000);
    };
    const getColorClasses = (color) => {
        switch (color) {
            case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'blue': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'green': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'yellow': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            default: return 'bg-hive-brand-secondary/10 text-hive-brand-secondary border-hive-brand-secondary/20';
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-hive-brand-secondary/10 rounded-xl mb-4 relative", children: [_jsx(BarChart3, { size: 28, className: "text-hive-brand-secondary" }), _jsx("div", { className: "absolute -top-1 -right-1 p-1 bg-hive-brand-secondary rounded-full", children: _jsx(Lock, { size: 12, className: "text-hive-background-primary" }) })] }), _jsx("h2", { className: "text-heading-lg font-semibold text-hive-text-primary mb-2", children: "Analytics" }), _jsx("p", { className: "text-body-md text-hive-text-secondary", children: "Your campus life insights and optimization opportunities" }), _jsxs("div", { className: "inline-flex items-center gap-2 mt-3 px-3 py-1 bg-hive-brand-secondary/10 rounded-full border border-hive-brand-secondary/20", children: [_jsx(Zap, { size: 14, className: "text-hive-brand-secondary" }), _jsx("span", { className: "text-sm font-medium text-hive-brand-secondary", children: "Coming in v1" })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-4 mb-8", children: analyticsPreview.map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (_jsxs(motion.div, { className: `p-4 rounded-xl border text-center relative overflow-hidden ${getColorClasses(metric.color)}`, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.1, duration: 0.3 }, children: [_jsx("div", { className: "absolute inset-0 bg-hive-background-primary/80 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity", children: _jsx(Lock, { size: 20, className: "text-hive-brand-secondary" }) }), _jsx(IconComponent, { size: 20, className: "mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-hive-text-primary mb-1", children: metric.value }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: metric.label })] }, metric.label));
                }) }), _jsxs("div", { className: "bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6", children: [_jsxs("h3", { className: "font-semibold text-hive-text-primary mb-4 flex items-center gap-2", children: [_jsx(Star, { size: 18, className: "text-hive-brand-secondary" }), "What You'll Track in v1"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2", children: upcomingFeatures.map((feature, index) => (_jsxs(motion.div, { className: "flex items-center gap-2 text-sm text-hive-text-secondary", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1, duration: 0.3 }, children: [_jsx("div", { className: "w-1 h-1 bg-hive-brand-secondary rounded-full" }), _jsx("span", { children: feature })] }, index))) })] }), _jsxs("div", { className: "bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6 relative", children: [_jsx("div", { className: "absolute inset-0 bg-hive-background-primary/90 backdrop-blur-sm rounded-xl flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Lock, { size: 32, className: "text-hive-brand-secondary mx-auto mb-3" }), _jsx("p", { className: "text-hive-text-primary font-medium mb-1", children: "Interactive Dashboard" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Unlocks with v1 launch" })] }) }), _jsx("h3", { className: "font-semibold text-hive-text-primary mb-4", children: "Weekly Activity Pattern" }), _jsx("div", { className: "h-32 flex items-end justify-between gap-2", children: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (_jsxs("div", { className: "flex flex-col items-center flex-1", children: [_jsx("div", { className: "w-full bg-hive-brand-secondary/20 rounded-t", style: { height: `${Math.random() * 80 + 20}%` } }), _jsx("span", { className: "text-xs text-hive-text-tertiary mt-2", children: day })] }, day))) })] }), _jsxs("div", { className: "text-center", children: [_jsx("button", { onClick: handleJoinWaitlist, disabled: joinedWaitlist, className: "px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-semibold hover:bg-hive-brand-hover disabled:opacity-50 transition-colors flex items-center gap-2 mx-auto", children: joinedWaitlist ? (_jsxs(_Fragment, { children: [_jsx(Star, { size: 18, className: "text-hive-gold" }), "Added to Waitlist!"] })) : (_jsxs(_Fragment, { children: [_jsx(BarChart3, { size: 18 }), "Join Analytics Waitlist"] })) }), _jsx("p", { className: "text-sm text-hive-text-tertiary mt-3", children: "Be first to unlock insights when v1 launches" })] })] }));
};
export default ProfileAnalyticsWidget;
//# sourceMappingURL=profile-analytics-widget.js.map