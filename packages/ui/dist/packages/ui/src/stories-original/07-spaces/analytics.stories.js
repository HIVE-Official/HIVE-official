import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Text } from '../../atomic/atoms/text';
import { TrendingUp, TrendingDown, Activity, Users, MessageSquare, Heart, Eye, Calendar, Star, Download, RefreshCw, ExternalLink, Minus, MapPin, Smartphone, Monitor, Tablet, UserPlus, MessageCircle, ThumbsUp, Crown, Shield } from 'lucide-react';
const meta = {
    title: '07-Spaces/Analytics',
    parameters: {
        docs: {
            description: {
                component: 'Comprehensive analytics components for HIVE Spaces - Engagement metrics, growth tracking, activity timelines, and performance insights with kitchen sink variants',
            },
        },
    },
};
export default meta;
// Mock analytics data for comprehensive testing
const mockAnalyticsData = {
    overview: {
        totalMembers: 1247,
        activeMembersToday: 89,
        postsToday: 23,
        engagementRate: 0.74,
        growthRate: 0.12,
        averageSessionTime: '8m 32s',
        retentionRate: 0.89
    },
    timeRanges: {
        '7d': {
            members: [120, 125, 130, 128, 135, 142, 147],
            posts: [12, 15, 8, 22, 18, 25, 23],
            engagement: [65, 72, 58, 81, 76, 88, 89],
            views: [450, 520, 380, 680, 590, 750, 680]
        },
        '30d': {
            members: Array.from({ length: 30 }, (_, i) => 1200 + Math.floor(Math.random() * 50)),
            posts: Array.from({ length: 30 }, (_, i) => 10 + Math.floor(Math.random() * 20)),
            engagement: Array.from({ length: 30 }, (_, i) => 50 + Math.floor(Math.random() * 40)),
            views: Array.from({ length: 30 }, (_, i) => 300 + Math.floor(Math.random() * 500))
        },
        '90d': {
            members: Array.from({ length: 90 }, (_, i) => 1100 + Math.floor(Math.random() * 150)),
            posts: Array.from({ length: 90 }, (_, i) => 5 + Math.floor(Math.random() * 25)),
            engagement: Array.from({ length: 90 }, (_, i) => 40 + Math.floor(Math.random() * 50)),
            views: Array.from({ length: 90 }, (_, i) => 200 + Math.floor(Math.random() * 600))
        }
    },
    demographics: {
        membersByRole: {
            members: 1180,
            moderators: 5,
            admins: 2,
            owner: 1
        },
        membersByStatus: {
            active: 1089,
            inactive: 158
        },
        deviceTypes: {
            mobile: 687,
            desktop: 423,
            tablet: 137
        },
        timeZones: {
            'EST': 456,
            'PST': 324,
            'CST': 289,
            'MST': 123,
            'Other': 55
        }
    },
    content: {
        postTypes: {
            text: 456,
            image: 289,
            link: 234,
            video: 89,
            event: 45
        },
        engagementByType: {
            text: { posts: 456, avgLikes: 8.2, avgComments: 3.4 },
            image: { posts: 289, avgLikes: 12.7, avgComments: 5.1 },
            link: { posts: 234, avgLikes: 6.8, avgComments: 2.9 },
            video: { posts: 89, avgLikes: 18.4, avgComments: 7.2 },
            event: { posts: 45, avgLikes: 15.6, avgComments: 8.9 }
        },
        topPerformers: [
            {
                id: 'post1',
                title: 'Machine Learning Workshop Recap',
                author: 'Sarah Chen',
                type: 'text',
                metrics: { likes: 47, comments: 23, shares: 8, views: 234 },
                createdAt: '2023-10-18'
            },
            {
                id: 'post2',
                title: 'Interactive Data Structures Visualization',
                author: 'Marcus Rodriguez',
                type: 'link',
                metrics: { likes: 41, comments: 19, shares: 12, views: 189 },
                createdAt: '2023-10-19'
            },
            {
                id: 'post3',
                title: 'Study Group Schedule Update',
                author: 'Elena Vasquez',
                type: 'event',
                metrics: { likes: 38, comments: 15, shares: 6, views: 156 },
                createdAt: '2023-10-20'
            }
        ]
    },
    activity: {
        dailyActivity: Array.from({ length: 24 }, (_, hour) => ({
            hour,
            posts: Math.floor(Math.random() * 10),
            comments: Math.floor(Math.random() * 25),
            likes: Math.floor(Math.random() * 50),
            members: Math.floor(Math.random() * 30)
        })),
        weeklyPattern: [
            { day: 'Monday', activity: 78 },
            { day: 'Tuesday', activity: 85 },
            { day: 'Wednesday', activity: 92 },
            { day: 'Thursday', activity: 88 },
            { day: 'Friday', activity: 76 },
            { day: 'Saturday', activity: 45 },
            { day: 'Sunday', activity: 52 }
        ],
        recentActivity: [
            {
                id: 'act1',
                type: 'member_joined',
                user: 'Alex Thompson',
                timestamp: '2023-10-20T15:30:00Z',
                details: 'New member joined the space'
            },
            {
                id: 'act2',
                type: 'post_created',
                user: 'Jessica Wong',
                timestamp: '2023-10-20T15:15:00Z',
                details: 'Created post: "Algorithm Study Tips"'
            },
            {
                id: 'act3',
                type: 'comment_added',
                user: 'David Park',
                timestamp: '2023-10-20T14:45:00Z',
                details: 'Commented on "Machine Learning Workshop Recap"'
            },
            {
                id: 'act4',
                type: 'content_liked',
                user: 'Maria Santos',
                timestamp: '2023-10-20T14:30:00Z',
                details: 'Liked "Interactive Data Structures Visualization"'
            }
        ]
    }
};
const AnalyticsOverview = ({ data, timeRange = '7d', onTimeRangeChange, variant = 'full' }) => {
    const [selectedMetric, setSelectedMetric] = useState('members');
    const formatNumber = (num) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };
    const formatPercentage = (value) => {
        return `${(value * 100).toFixed(1)}%`;
    };
    const getGrowthIndicator = (value) => {
        if (value > 0) {
            return { icon: TrendingUp, color: 'text-green-400', symbol: '+' };
        }
        else if (value < 0) {
            return { icon: TrendingDown, color: 'text-red-400', symbol: '' };
        }
        return { icon: Minus, color: 'text-gray-400', symbol: '' };
    };
    const metrics = [
        {
            key: 'members',
            label: 'Total Members',
            value: data.overview.totalMembers,
            change: 0.12,
            icon: Users,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10'
        },
        {
            key: 'activeMembers',
            label: 'Active Today',
            value: data.overview.activeMembersToday,
            change: 0.08,
            icon: Activity,
            color: 'text-green-400',
            bgColor: 'bg-green-500/10'
        },
        {
            key: 'posts',
            label: 'Posts Today',
            value: data.overview.postsToday,
            change: -0.05,
            icon: MessageSquare,
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/10'
        },
        {
            key: 'engagement',
            label: 'Engagement Rate',
            value: data.overview.engagementRate,
            change: 0.15,
            icon: Heart,
            color: 'text-red-400',
            bgColor: 'bg-red-500/10',
            isPercentage: true
        }
    ];
    if (variant === 'compact') {
        return (_jsxs(Card, { className: "p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx(Text, { variant: "heading-sm", className: "text-[var(--hive-text-primary)]", children: "Analytics Overview" }), _jsxs("select", { value: timeRange, onChange: (e) => onTimeRangeChange?.(e.target.value), className: "px-2 py-1 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded text-[var(--hive-text-primary)] text-xs", children: [_jsx("option", { value: "7d", children: "7 days" }), _jsx("option", { value: "30d", children: "30 days" }), _jsx("option", { value: "90d", children: "90 days" })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: metrics.slice(0, 4).map((metric) => {
                        const Icon = metric.icon;
                        const growth = getGrowthIndicator(metric.change);
                        const GrowthIcon = growth.icon;
                        return (_jsxs("div", { className: "p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx(Icon, { className: `h-4 w-4 ${metric.color}` }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(GrowthIcon, { className: `h-3 w-3 ${growth.color}` }), _jsxs(Text, { variant: "body-xs", className: growth.color, children: [growth.symbol, formatPercentage(Math.abs(metric.change))] })] })] }), _jsx(Text, { variant: "body-lg", className: "text-[var(--hive-text-primary)] font-bold", children: metric.isPercentage ? formatPercentage(metric.value) : formatNumber(metric.value) }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: metric.label })] }, metric.key));
                    }) })] }));
    }
    if (variant === 'widget') {
        return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: metrics.map((metric) => {
                const Icon = metric.icon;
                const growth = getGrowthIndicator(metric.change);
                const GrowthIcon = growth.icon;
                return (_jsxs(Card, { className: `p-4 ${metric.bgColor} border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]`, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx(Icon, { className: `h-6 w-6 ${metric.color}` }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(GrowthIcon, { className: `h-4 w-4 ${growth.color}` }), _jsxs(Text, { variant: "body-sm", className: growth.color, children: [growth.symbol, formatPercentage(Math.abs(metric.change))] })] })] }), _jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-1", children: metric.isPercentage ? formatPercentage(metric.value) : formatNumber(metric.value) }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: metric.label })] }, metric.key));
            }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Text, { variant: "heading-xl", className: "text-[var(--hive-text-primary)] mb-2", children: "Space Analytics" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: "Track engagement, growth, and community health" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("select", { value: timeRange, onChange: (e) => onTimeRangeChange?.(e.target.value), className: "px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "7d", children: "Last 7 days" }), _jsx("option", { value: "30d", children: "Last 30 days" }), _jsx("option", { value: "90d", children: "Last 90 days" })] }), _jsxs(Button, { size: "sm", variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] }), _jsxs(Button, { size: "sm", className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: metrics.map((metric) => {
                    const Icon = metric.icon;
                    const growth = getGrowthIndicator(metric.change);
                    const GrowthIcon = growth.icon;
                    return (_jsxs(Card, { className: `p-6 ${metric.bgColor} border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]`, children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx(Icon, { className: `h-8 w-8 ${metric.color}` }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(GrowthIcon, { className: `h-4 w-4 ${growth.color}` }), _jsxs(Text, { variant: "body-sm", className: growth.color, children: [growth.symbol, formatPercentage(Math.abs(metric.change))] })] })] }), _jsx(Text, { variant: "heading-xl", className: "text-[var(--hive-text-primary)] mb-2", children: metric.isPercentage ? formatPercentage(metric.value) : formatNumber(metric.value) }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: metric.label }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)] mt-1", children: ["vs previous ", timeRange] })] }, metric.key));
                }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)]", children: "Member Growth" }), _jsxs("select", { value: selectedMetric, onChange: (e) => setSelectedMetric(e.target.value), className: "px-2 py-1 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "members", children: "Members" }), _jsx("option", { value: "posts", children: "Posts" }), _jsx("option", { value: "engagement", children: "Engagement" }), _jsx("option", { value: "views", children: "Views" })] })] }), _jsx("div", { className: "h-64 flex items-end justify-between gap-1", children: data.timeRanges[timeRange][selectedMetric].map((value, index) => {
                                    const maxValue = Math.max(...data.timeRanges[timeRange][selectedMetric]);
                                    const height = (value / maxValue) * 100;
                                    return (_jsxs("div", { className: "flex-1 flex flex-col items-center", children: [_jsx("div", { className: "w-full bg-[var(--hive-brand-secondary)] rounded-t", style: { height: `${height}%` } }), timeRange === '7d' && (_jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)] mt-2 transform -rotate-45", children: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] }))] }, index));
                                }) })] }), _jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Engagement Breakdown" }), _jsx("div", { className: "space-y-4", children: [
                                    { label: 'Likes', value: 432, total: 1000, color: 'bg-red-400' },
                                    { label: 'Comments', value: 289, total: 1000, color: 'bg-blue-400' },
                                    { label: 'Shares', value: 156, total: 1000, color: 'bg-green-400' },
                                    { label: 'Bookmarks', value: 123, total: 1000, color: 'bg-purple-400' }
                                ].map((item) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: item.label }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: item.value })] }), _jsx("div", { className: "w-full bg-[var(--hive-interactive-active)] rounded-full h-2", children: _jsx("div", { className: `h-2 ${item.color} rounded-full`, style: { width: `${(item.value / item.total) * 100}%` } }) })] }, item.label))) })] })] })] }));
};
const MemberAnalytics = ({ data, timeRange = '7d' }) => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: "Member Analytics" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Members by Role" }), _jsx("div", { className: "space-y-4", children: Object.entries(data.membersByRole).map(([role, count]) => {
                                    const total = Object.values(data.membersByRole).reduce((sum, val) => sum + val, 0);
                                    const percentage = (count / total) * 100;
                                    const roleConfig = {
                                        owner: { icon: Crown, color: 'text-yellow-400' },
                                        admins: { icon: Shield, color: 'text-blue-400' },
                                        moderators: { icon: Star, color: 'text-purple-400' },
                                        members: { icon: Users, color: 'text-gray-400' }
                                    };
                                    const config = roleConfig[role] || roleConfig.members;
                                    const Icon = config.icon;
                                    return (_jsxs("div", { className: "flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: `h-5 w-5 ${config.color}` }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] capitalize", children: role })] }), _jsxs("div", { className: "text-right", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] font-medium", children: count.toLocaleString() }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: [percentage.toFixed(1), "%"] })] })] }, role));
                                }) })] }), _jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Device Usage" }), _jsx("div", { className: "space-y-4", children: Object.entries(data.deviceTypes).map(([device, count]) => {
                                    const total = Object.values(data.deviceTypes).reduce((sum, val) => sum + val, 0);
                                    const percentage = (count / total) * 100;
                                    const deviceConfig = {
                                        mobile: { icon: Smartphone, color: 'text-green-400' },
                                        desktop: { icon: Monitor, color: 'text-blue-400' },
                                        tablet: { icon: Tablet, color: 'text-purple-400' }
                                    };
                                    const config = deviceConfig[device];
                                    const Icon = config.icon;
                                    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: `h-5 w-5 ${config.color}` }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] capitalize", children: device })] }), _jsxs("div", { className: "text-right", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] font-medium", children: count.toLocaleString() }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: [percentage.toFixed(1), "%"] })] })] }), _jsx("div", { className: "w-full bg-[var(--hive-interactive-active)] rounded-full h-2", children: _jsx("div", { className: `h-2 ${config.color.replace('text', 'bg')} rounded-full`, style: { width: `${percentage}%` } }) })] }, device));
                                }) })] }), _jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Member Activity Status" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: Object.entries(data.membersByStatus).map(([status, count]) => {
                                    const total = Object.values(data.membersByStatus).reduce((sum, val) => sum + val, 0);
                                    const percentage = (count / total) * 100;
                                    const statusConfig = {
                                        active: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
                                        inactive: { color: 'text-gray-400', bgColor: 'bg-gray-500/10' }
                                    };
                                    const config = statusConfig[status];
                                    return (_jsxs("div", { className: `p-4 ${config.bgColor} rounded-lg text-center`, children: [_jsx(Text, { variant: "heading-lg", className: config.color, children: count.toLocaleString() }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] capitalize", children: status }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: [percentage.toFixed(1), "%"] })] }, status));
                                }) })] }), _jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Geographic Distribution" }), _jsx("div", { className: "space-y-3", children: Object.entries(data.timeZones).map(([timezone, count]) => {
                                    const total = Object.values(data.timeZones).reduce((sum, val) => sum + val, 0);
                                    const percentage = (count / total) * 100;
                                    return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(MapPin, { className: "h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: timezone })] }), _jsxs("div", { className: "text-right", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] font-medium", children: count }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: [percentage.toFixed(1), "%"] })] })] }, timezone));
                                }) })] })] })] }));
};
const ContentAnalytics = ({ data }) => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: "Content Analytics" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Content Types" }), _jsx("div", { className: "space-y-4", children: Object.entries(data.postTypes).map(([type, count]) => {
                                    const total = Object.values(data.postTypes).reduce((sum, val) => sum + val, 0);
                                    const percentage = (count / total) * 100;
                                    const typeConfig = {
                                        text: { icon: MessageSquare, color: 'text-blue-400' },
                                        image: { icon: Eye, color: 'text-green-400' },
                                        link: { icon: ExternalLink, color: 'text-purple-400' },
                                        video: { icon: Activity, color: 'text-red-400' },
                                        event: { icon: Calendar, color: 'text-yellow-400' }
                                    };
                                    const config = typeConfig[type];
                                    const Icon = config.icon;
                                    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: `h-5 w-5 ${config.color}` }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] capitalize", children: type })] }), _jsxs("div", { className: "text-right", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] font-medium", children: count }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: [percentage.toFixed(1), "%"] })] })] }), _jsx("div", { className: "w-full bg-[var(--hive-interactive-active)] rounded-full h-2", children: _jsx("div", { className: `h-2 ${config.color.replace('text', 'bg')} rounded-full`, style: { width: `${percentage}%` } }) })] }, type));
                                }) })] }), _jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Engagement by Type" }), _jsx("div", { className: "space-y-4", children: Object.entries(data.engagementByType).map(([type, metrics]) => {
                                    const typeConfig = {
                                        text: { icon: MessageSquare, color: 'text-blue-400' },
                                        image: { icon: Eye, color: 'text-green-400' },
                                        link: { icon: ExternalLink, color: 'text-purple-400' },
                                        video: { icon: Activity, color: 'text-red-400' },
                                        event: { icon: Calendar, color: 'text-yellow-400' }
                                    };
                                    const config = typeConfig[type];
                                    const Icon = config.icon;
                                    return (_jsxs("div", { className: "p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(Icon, { className: `h-4 w-4 ${config.color}` }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] capitalize", children: type })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 text-center", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Avg Likes" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] font-medium", children: metrics.avgLikes.toFixed(1) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Avg Comments" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] font-medium", children: metrics.avgComments.toFixed(1) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Posts" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] font-medium", children: metrics.posts })] })] })] }, type));
                                }) })] })] }), _jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)]", children: "Top Performing Content" }), _jsxs(Button, { size: "sm", variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(Eye, { className: "h-4 w-4 mr-2" }), "View All"] })] }), _jsx("div", { className: "space-y-4", children: data.topPerformers.map((post, index) => {
                            const typeConfig = {
                                text: { icon: MessageSquare, color: 'text-blue-400' },
                                image: { icon: Eye, color: 'text-green-400' },
                                link: { icon: ExternalLink, color: 'text-purple-400' },
                                video: { icon: Activity, color: 'text-red-400' },
                                event: { icon: Calendar, color: 'text-yellow-400' }
                            };
                            const config = typeConfig[post.type];
                            const Icon = config.icon;
                            return (_jsxs("div", { className: "flex items-center justify-between p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `w-8 h-8 rounded-full ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'} flex items-center justify-center text-[var(--hive-text-primary)] font-bold text-sm`, children: index + 1 }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: `h-5 w-5 ${config.color}` }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)]", children: post.title }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: ["by ", post.author, " \u2022 ", new Date(post.createdAt).toLocaleDateString()] })] })] })] }), _jsxs("div", { className: "flex items-center gap-6 text-sm", children: [_jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Likes" }), _jsx(Text, { variant: "body-sm", className: "text-red-400 font-medium", children: post.metrics.likes })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Comments" }), _jsx(Text, { variant: "body-sm", className: "text-blue-400 font-medium", children: post.metrics.comments })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Views" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] font-medium", children: post.metrics.views })] })] })] }, post.id));
                        }) })] })] }));
};
const ActivityTimeline = ({ data, variant = 'full' }) => {
    const [viewMode, setViewMode] = useState('recent');
    const getActivityIcon = (type) => {
        switch (type) {
            case 'member_joined': return { icon: UserPlus, color: 'text-green-400' };
            case 'post_created': return { icon: MessageSquare, color: 'text-blue-400' };
            case 'comment_added': return { icon: MessageCircle, color: 'text-purple-400' };
            case 'content_liked': return { icon: ThumbsUp, color: 'text-red-400' };
            default: return { icon: Activity, color: 'text-gray-400' };
        }
    };
    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours < 1)
            return 'Just now';
        if (diffHours < 24)
            return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };
    if (variant === 'compact') {
        return (_jsxs(Card, { className: "p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-sm", className: "text-[var(--hive-text-primary)] mb-4", children: "Recent Activity" }), _jsx("div", { className: "space-y-3", children: data.recentActivity.slice(0, 5).map((activity) => {
                        const { icon: Icon, color } = getActivityIcon(activity.type);
                        return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: `h-4 w-4 ${color}` }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-primary)] truncate", children: [_jsx("span", { className: "font-medium", children: activity.user }), " ", activity.details] }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: formatTimeAgo(activity.timestamp) })] })] }, activity.id));
                    }) })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: "Activity Timeline" }), _jsx("div", { className: "flex items-center gap-2", children: ['hourly', 'daily', 'recent'].map((mode) => (_jsx(Button, { size: "sm", variant: viewMode === mode ? 'default' : 'ghost', onClick: () => setViewMode(mode), className: viewMode === mode ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' : 'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]', children: mode.charAt(0).toUpperCase() + mode.slice(1) }, mode))) })] }), viewMode === 'hourly' && (_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "24-Hour Activity Pattern" }), _jsx("div", { className: "h-64 flex items-end justify-between gap-1", children: data.dailyActivity.map((hourData) => {
                            const maxActivity = Math.max(...data.dailyActivity.map(h => h.posts + h.comments + h.likes));
                            const totalActivity = hourData.posts + hourData.comments + hourData.likes;
                            const height = maxActivity > 0 ? (totalActivity / maxActivity) * 100 : 0;
                            return (_jsxs("div", { className: "flex-1 flex flex-col items-center", children: [_jsx("div", { className: "w-full bg-[var(--hive-brand-secondary)] rounded-t hover:bg-[var(--hive-brand-secondary)] transition-colors cursor-pointer", style: { height: `${height}%` }, title: `${hourData.hour}:00 - ${totalActivity} activities` }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)] mt-2", children: hourData.hour.toString().padStart(2, '0') })] }, hourData.hour));
                        }) })] })), viewMode === 'daily' && (_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Weekly Activity Pattern" }), _jsx("div", { className: "space-y-4", children: data.weeklyPattern.map((day) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: day.day }), _jsxs(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: [day.activity, "% active"] })] }), _jsx("div", { className: "w-full bg-[var(--hive-interactive-active)] rounded-full h-2", children: _jsx("div", { className: "h-2 bg-[var(--hive-brand-secondary)] rounded-full", style: { width: `${day.activity}%` } }) })] }, day.day))) })] })), viewMode === 'recent' && (_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Recent Activity Feed" }), _jsx("div", { className: "space-y-4", children: data.recentActivity.map((activity, index) => {
                            const { icon: Icon, color } = getActivityIcon(activity.type);
                            return (_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `w-8 h-8 rounded-full bg-[var(--hive-interactive-hover)] flex items-center justify-center border border-[var(--hive-interactive-active)]`, children: _jsx(Icon, { className: `h-4 w-4 ${color}` }) }), _jsxs("div", { className: "flex-1", children: [_jsxs(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: [_jsx("span", { className: "font-medium", children: activity.user }), " ", activity.details] }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: formatTimeAgo(activity.timestamp) })] }), index < data.recentActivity.length - 1 && (_jsx("div", { className: "absolute left-4 top-8 w-px h-6 bg-[var(--hive-interactive-active)]" }))] }, activity.id));
                        }) }), _jsx("div", { className: "mt-6 text-center", children: _jsx(Button, { size: "sm", variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: "Load More Activity" }) })] }))] }));
};
// ============================================================================
// STORYBOOK STORIES
// ============================================================================
export const AnalyticsOverviewDefault = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(AnalyticsOverview, { data: mockAnalyticsData, timeRange: "7d", onTimeRangeChange: (range) => console.log('Time range changed:', range) }) })),
};
export const AnalyticsOverviewCompact = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(AnalyticsOverview, { data: mockAnalyticsData, variant: "compact", timeRange: "30d" }) })),
};
export const AnalyticsOverviewWidgets = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(AnalyticsOverview, { data: mockAnalyticsData, variant: "widget", timeRange: "90d" }) })),
};
export const MemberAnalyticsDefault = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(MemberAnalytics, { data: mockAnalyticsData.demographics, timeRange: "30d" }) })),
};
export const ContentAnalyticsDefault = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(ContentAnalytics, { data: mockAnalyticsData.content }) })),
};
export const ActivityTimelineDefault = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(ActivityTimeline, { data: mockAnalyticsData.activity }) })),
};
export const ActivityTimelineCompact = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(ActivityTimeline, { data: mockAnalyticsData.activity, variant: "compact" }) })),
};
export const KitchenSinkAnalytics = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Space Analytics - Kitchen Sink" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Key Metrics" }), _jsx(AnalyticsOverview, { data: mockAnalyticsData, variant: "widget" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Member Insights" }), _jsx(MemberAnalytics, { data: mockAnalyticsData.demographics })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Content Performance" }), _jsx(ContentAnalytics, { data: mockAnalyticsData.content })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Recent Activity" }), _jsx(ActivityTimeline, { data: mockAnalyticsData.activity, variant: "compact" })] })] })),
};
export const AnalyticsDashboard = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Complete Analytics Dashboard" }), _jsx(AnalyticsOverview, { data: mockAnalyticsData, timeRange: "30d" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx("div", { children: _jsx(MemberAnalytics, { data: mockAnalyticsData.demographics }) }), _jsx("div", { children: _jsx(ActivityTimeline, { data: mockAnalyticsData.activity }) })] }), _jsx(ContentAnalytics, { data: mockAnalyticsData.content })] })),
};
export const EdgeCasesAnalytics = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Analytics - Edge Cases" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Empty Analytics" }), _jsx(AnalyticsOverview, { data: {
                            ...mockAnalyticsData,
                            overview: {
                                ...mockAnalyticsData.overview,
                                totalMembers: 0,
                                activeMembersToday: 0,
                                postsToday: 0,
                                engagementRate: 0
                            }
                        } })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Single Member Space" }), _jsx(MemberAnalytics, { data: {
                            ...mockAnalyticsData.demographics,
                            membersByRole: {
                                members: 1,
                                moderators: 0,
                                admins: 0,
                                owner: 1
                            }
                        } })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "No Recent Activity" }), _jsx(ActivityTimeline, { data: {
                            ...mockAnalyticsData.activity,
                            recentActivity: []
                        } })] })] })),
};
//# sourceMappingURL=analytics.stories.js.map