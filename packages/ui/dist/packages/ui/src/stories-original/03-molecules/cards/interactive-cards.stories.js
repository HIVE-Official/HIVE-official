import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { HiveInput } from '../../../components/hive-input';
import { Text } from '../../../atomic/atoms/text';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { Plus, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart, Share2, Calendar, TrendingUp, Users, Edit3, Filter, Search, Grid, List, Timer, BarChart3, Activity } from 'lucide-react';
// Quick Action Card - Floating action interface
const QuickActionCard = ({ actions, className }) => {
    const [expanded, setExpanded] = useState(false);
    return (_jsxs("div", { className: `fixed bottom-6 right-6 ${className}`, children: [_jsx(AnimatePresence, { children: expanded && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", className: "mb-4 space-y-2", children: actions.map((action, index) => (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", transition: { delay: index * 0.1 }, children: _jsx(HiveCard, { className: "p-3 cursor-pointer hover:scale-105 transition-transform", size: "sm", children: _jsxs("div", { onClick: action.action, className: "flex items-center gap-3", children: [_jsx("div", { className: `p-2 rounded-lg ${action.color}`, children: action.icon }), _jsx(Text, { variant: "body-sm", className: "font-medium", children: action.label })] }) }) }, index))) })) }), _jsx(motion.button, { onClick: () => setExpanded(!expanded), className: "w-14 h-14 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(motion.div, { animate: { rotate: expanded ? 45 : 0 }, transition: { duration: 0.2 }, children: _jsx(Plus, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }) }) })] }));
};
// Media Player Card - Audio/video controls
const MediaPlayerCard = ({ media, className }) => {
    const [isPlaying, setIsPlaying] = useState(media.isPlaying);
    const [currentTime, setCurrentTime] = useState(media.currentTime);
    const [volume, setVolume] = useState(75);
    const [isMuted, setIsMuted] = useState(false);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    const progressPercentage = (currentTime / media.duration) * 100;
    return (_jsx(HiveCard, { className: `w-100 ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-lg bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] overflow-hidden", children: media.thumbnail ? (_jsx("img", { src: media.thumbnail, alt: media.title, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsx(Play, { className: "w-8 h-8 text-[var(--hive-text-primary)]" }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx(Text, { variant: "body-lg", className: "font-bold truncate", children: media.title }), _jsx(Text, { variant: "body-md", color: "secondary", className: "truncate", children: media.artist }), media.album && (_jsx(Text, { variant: "body-sm", color: "secondary", className: "truncate", children: media.album }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: _jsx(Heart, { className: "w-5 h-5 text-gray-400" }) }), _jsx("button", { className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: _jsx(Share2, { className: "w-5 h-5 text-gray-400" }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "relative w-full h-2 bg-[var(--hive-background-secondary)] rounded-full cursor-pointer", children: [_jsx("div", { className: "absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full transition-all duration-300", style: { width: `${progressPercentage}%` } }), _jsx("div", { className: "absolute w-4 h-4 bg-[var(--hive-text-primary)] rounded-full shadow-lg transform -translate-y-1 transition-all duration-300", style: { left: `calc(${progressPercentage}% - 2)` } })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: formatTime(currentTime) }), _jsx(Text, { variant: "body-sm", color: "secondary", children: formatTime(media.duration) })] })] }), _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx("button", { className: "p-3 hover:bg-[var(--hive-background-secondary)] rounded-full transition-colors", children: _jsx(SkipBack, { className: "w-5 h-5" }) }), _jsx("button", { onClick: () => setIsPlaying(!isPlaying), className: "w-12 h-12 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full flex items-center justify-center hover:shadow-lg transition-shadow", children: isPlaying ? (_jsx(Pause, { className: "w-6 h-6 text-[var(--hive-text-primary)]" })) : (_jsx(Play, { className: "w-6 h-6 text-[var(--hive-text-primary)] ml-0.5" })) }), _jsx("button", { className: "p-3 hover:bg-[var(--hive-background-secondary)] rounded-full transition-colors", children: _jsx(SkipForward, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => setIsMuted(!isMuted), className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: isMuted || volume === 0 ? (_jsx(VolumeX, { className: "w-5 h-5" })) : (_jsx(Volume2, { className: "w-5 h-5" })) }), _jsx("div", { className: "flex-1 relative", children: _jsx("input", { type: "range", min: "0", max: "100", value: isMuted ? 0 : volume, onChange: (e) => {
                                    const newVolume = parseInt(e.target.value);
                                    setVolume(newVolume);
                                    if (newVolume > 0)
                                        setIsMuted(false);
                                }, className: "w-full h-2 bg-[var(--hive-background-secondary)] rounded-full appearance-none cursor-pointer", style: {
                                    background: `linear-gradient(to right, var(--hive-primary) 0%, var(--hive-primary) ${isMuted ? 0 : volume}%, var(--hive-background-secondary) ${isMuted ? 0 : volume}%, var(--hive-background-secondary) 100%)`
                                } }) }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "w-8 text-right", children: isMuted ? 0 : volume })] })] }) }));
};
// Poll Card - Interactive voting interface
const PollCard = ({ poll, className }) => {
    const [selectedOption, setSelectedOption] = useState(poll.userVote || null);
    const [hasVoted, setHasVoted] = useState(poll.hasVoted);
    const handleVote = () => {
        if (selectedOption !== null) {
            setHasVoted(true);
        }
    };
    return (_jsx(HiveCard, { className: `w-[450px] ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: poll.question }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Text, { variant: "body-sm", color: "secondary", children: [poll.totalVotes, " votes total"] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Timer, { className: "w-4 h-4 text-orange-400" }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: [poll.timeLeft, " left"] })] })] })] }), _jsx("div", { className: "space-y-3", children: poll.options.map((option, index) => {
                        const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                        const isSelected = selectedOption === index;
                        const isUserVote = hasVoted && poll.userVote === index;
                        return (_jsxs(motion.div, { className: `relative overflow-hidden rounded-lg border transition-all duration-300 cursor-pointer ${isSelected && !hasVoted
                                ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/5'
                                : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-primary)]/50'} ${hasVoted ? 'cursor-default' : ''}`, onClick: () => !hasVoted && setSelectedOption(index), whileHover: !hasVoted ? { scale: 1.02 } : {}, whileTap: !hasVoted ? { scale: 0.98 } : {}, children: [hasVoted && (_jsx(motion.div, { className: `absolute inset-0 ${option.color}/20`, initial: { width: 0 }, animate: { width: `${percentage}%` }, transition: { duration: 1, delay: 0.2 } })), _jsxs("div", { className: "relative p-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-4 h-4 rounded-full border-2 transition-colors ${isSelected && !hasVoted
                                                        ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]'
                                                        : isUserVote
                                                            ? `${option.color} bg-current`
                                                            : 'border-gray-400'}`, children: (isSelected && !hasVoted) || isUserVote ? (_jsx("div", { className: "w-full h-full rounded-full bg-[var(--hive-text-primary)] scale-50" })) : null }), _jsx(Text, { variant: "body-md", className: "font-medium", children: option.text })] }), hasVoted && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Text, { variant: "body-sm", className: "font-bold", children: [percentage.toFixed(1), "%"] }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: ["(", option.votes, ")"] })] }))] })] }, index));
                    }) }), !hasVoted && (_jsx(HiveButton, { onClick: handleVote, disabled: selectedOption === null, variant: "premium", size: "lg", className: "w-full", children: "Cast Your Vote" })), hasVoted && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", className: "p-4 bg-[var(--hive-background-secondary)] rounded-lg", children: [_jsx(Text, { variant: "body-sm", className: "font-medium mb-2", children: "Poll Results" }), _jsx("div", { className: "space-y-1", children: poll.options
                                .map((option, index) => ({ ...option, index }))
                                .sort((a, b) => b.votes - a.votes)
                                .map((option, rank) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Text, { variant: "body-xs", children: ["#", rank + 1] }), _jsx(Text, { variant: "body-xs", className: "truncate", children: option.text })] }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [option.votes, " votes"] })] }, option.index))) })] }))] }) }));
};
// Live Stats Card - Real-time data display
const LiveStatsCard = ({ stats, className }) => {
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };
    return (_jsx(HiveCard, { className: `w-125 ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: stats.title }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: ["Last updated: ", stats.lastUpdated] })] }), _jsx("button", { onClick: handleRefresh, disabled: refreshing, className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: _jsx(motion.div, { animate: { rotate: refreshing ? 360 : 0 }, transition: { duration: 1, ease: "linear" }, children: _jsx(Activity, { className: "w-5 h-5" }) }) })] }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: stats.metrics.map((metric, index) => (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", transition: { delay: index * 0.1 }, className: "p-4 bg-[var(--hive-background-secondary)] rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: `p-2 ${metric.color}/20 rounded-lg`, children: metric.icon }), _jsxs("div", { className: `flex items-center gap-1 ${metric.change >= 0 ? 'text-green-400' : 'text-red-400'}`, children: [_jsx(TrendingUp, { className: `w-3 h-3 ${metric.change < 0 ? 'rotate-180' : ''}` }), _jsxs(Text, { variant: "body-xs", children: [metric.change >= 0 ? '+' : '', metric.change, "%"] })] })] }), _jsx(Text, { variant: "body-lg", className: "font-bold", children: metric.value.toLocaleString() }), _jsx(Text, { variant: "body-sm", color: "secondary", children: metric.label })] }, index))) }), _jsx("div", { className: "h-32 bg-[var(--hive-background-secondary)] rounded-lg flex items-center justify-center", children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx(BarChart3, { className: "w-8 h-8 mx-auto text-gray-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Live activity chart" })] }) })] }) }));
};
// Filter Control Card - Advanced filtering interface
const FilterControlCard = ({ filters, onFiltersChange, className }) => {
    const [expanded, setExpanded] = useState(false);
    const [localFilters, setLocalFilters] = useState(filters);
    const categories = [
        'Academic', 'Social', 'Sports', 'Arts', 'Technology', 'Health'
    ];
    const sortOptions = [
        { value: 'recent', label: 'Most Recent' },
        { value: 'popular', label: 'Most Popular' },
        { value: 'alphabetical', label: 'Alphabetical' }
    ];
    const applyFilters = () => {
        onFiltersChange(localFilters);
        setExpanded(false);
    };
    return (_jsx(HiveCard, { className: `w-100 ${className}`, variant: "elevated", size: "md", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-5 space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex-1", children: _jsx(HiveInput, { placeholder: "Search...", value: localFilters.search, onChange: (e) => setLocalFilters(prev => ({ ...prev, search: e.target.value })), className: "w-full", icon: _jsx(Search, { className: "w-4 h-4" }) }) }), _jsx("button", { onClick: () => setExpanded(!expanded), className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: _jsx(Filter, { className: "w-5 h-5" }) }), _jsxs("div", { className: "flex border border-[var(--hive-border-primary)] rounded-lg overflow-hidden", children: [_jsx("button", { onClick: () => setLocalFilters(prev => ({ ...prev, viewMode: 'grid' })), className: `p-2 transition-colors ${localFilters.viewMode === 'grid'
                                        ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                                        : 'hover:bg-[var(--hive-background-secondary)]'}`, children: _jsx(Grid, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => setLocalFilters(prev => ({ ...prev, viewMode: 'list' })), className: `p-2 transition-colors ${localFilters.viewMode === 'list'
                                        ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                                        : 'hover:bg-[var(--hive-background-secondary)]'}`, children: _jsx(List, { className: "w-4 h-4" }) })] })] }), _jsx(AnimatePresence, { children: expanded && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4 pt-4 border-t border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Categories" }), _jsx("div", { className: "flex flex-wrap gap-1", children: categories.map((category) => (_jsx("button", { onClick: () => {
                                                const newCategories = localFilters.categories.includes(category)
                                                    ? localFilters.categories.filter(c => c !== category)
                                                    : [...localFilters.categories, category];
                                                setLocalFilters(prev => ({ ...prev, categories: newCategories }));
                                            }, className: `px-3 py-1 rounded-full text-sm transition-colors ${localFilters.categories.includes(category)
                                                ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                                                : 'bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-primary)]/20'}`, children: category }, category))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Sort By" }), _jsx("select", { value: localFilters.sortBy, onChange: (e) => setLocalFilters(prev => ({ ...prev, sortBy: e.target.value })), className: "w-full p-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]", children: sortOptions.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { onClick: applyFilters, variant: "premium", size: "sm", className: "flex-1", children: "Apply Filters" }), _jsx(HiveButton, { onClick: () => {
                                            setLocalFilters({
                                                search: '',
                                                categories: [],
                                                dateRange: { start: '', end: '' },
                                                sortBy: 'recent',
                                                viewMode: 'grid'
                                            });
                                        }, variant: "outline", size: "sm", children: "Reset" })] })] })) })] }) }));
};
// Stories Configuration
const meta = {
    title: '03-molecules/Cards/Interactive Cards',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Interactive Cards** - Dynamic, stateful cards for enhanced user engagement

Molecular-level interactive cards designed specifically for the HIVE student platform experience. These cards go beyond static content to provide rich, interactive experiences that respond to user input and provide real-time feedback.

## Card Philosophy
- **Responsive Interaction**: Cards that adapt and respond to user actions in real-time
- **Progressive Enhancement**: Interfaces that reveal functionality as users engage
- **Campus Integration**: Interactive patterns designed for student workflows and behaviors
- **Micro-Interaction Rich**: Smooth animations and feedback for every user action

## Components
- **QuickActionCard**: Floating action interface for common campus tasks
- **MediaPlayerCard**: Full-featured audio/video controls for campus content
- **PollCard**: Interactive voting interface for student engagement
- **LiveStatsCard**: Real-time data display with refresh capabilities
- **FilterControlCard**: Advanced filtering and search interface

## Design Patterns
- **Contextual Actions**: Interactive elements that appear based on user context
- **Real-time Feedback**: Immediate visual response to user interactions
- **Progressive Disclosure**: Complex interfaces that reveal functionality gradually
- **State Management**: Cards that remember and respond to user preferences

## Interaction States
- **Idle**: Clean, inviting interface that hints at interactive capabilities
- **Active**: Rich feedback and animation during user interaction
- **Loading**: Smooth loading states that maintain user engagement
- **Success**: Clear confirmation of completed actions

## Tech Stack Integration
- HiveCard elevation system for consistent visual hierarchy
- HiveButton and HiveInput for interactive elements
- Framer Motion for rich micro-interactions and state transitions
- Atomic Text and Badge components for consistent information display
- Advanced state management for complex interactive behaviors
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Quick Action Card Stories
export const QuickActionDefault = {
    name: 'Quick Action - Campus Tasks',
    render: () => (_jsx("div", { className: "h-96 relative", children: _jsx(QuickActionCard, { actions: [
                {
                    label: 'Create Event',
                    icon: _jsx(Calendar, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }),
                    color: 'bg-blue-500',
                    action: () => console.log('Create Event')
                },
                {
                    label: 'Join Study Group',
                    icon: _jsx(Users, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }),
                    color: 'bg-green-500',
                    action: () => console.log('Join Study Group')
                },
                {
                    label: 'Share Resource',
                    icon: _jsx(Share2, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }),
                    color: 'bg-purple-500',
                    action: () => console.log('Share Resource')
                },
                {
                    label: 'Quick Note',
                    icon: _jsx(Edit3, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }),
                    color: 'bg-orange-500',
                    action: () => console.log('Quick Note')
                }
            ] }) }))
};
// Media Player Card Stories
export const MediaPlayerDefault = {
    name: 'Media Player - Lecture Recording',
    render: () => (_jsx(MediaPlayerCard, { media: {
            title: "Advanced Algorithms Lecture 15",
            artist: "Professor Johnson",
            album: "CS 161 - Spring 2024",
            duration: 3420, // 57 minutes
            currentTime: 1250,
            thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop",
            isPlaying: false
        } }))
};
export const MediaPlayerPodcast = {
    name: 'Media Player - Campus Podcast',
    render: () => (_jsx(MediaPlayerCard, { media: {
            title: "Campus Innovation Stories",
            artist: "HIVE Podcast Network",
            album: "Student Spotlight Series",
            duration: 2145, // 35 minutes
            currentTime: 856,
            thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop",
            isPlaying: true
        } }))
};
// Poll Card Stories
export const PollCardActive = {
    name: 'Poll - Active Voting',
    render: () => (_jsx(PollCard, { poll: {
            question: "What's the best time for our CS study group meetup?",
            options: [
                { text: "7:00 PM - 9:00 PM", votes: 23, color: "text-blue-500" },
                { text: "8:00 PM - 10:00 PM", votes: 31, color: "text-green-500" },
                { text: "6:00 PM - 8:00 PM", votes: 18, color: "text-purple-500" },
                { text: "Weekend afternoons", votes: 12, color: "text-orange-500" }
            ],
            totalVotes: 84,
            timeLeft: "2 days",
            hasVoted: false
        } }))
};
export const PollCardCompleted = {
    name: 'Poll - Completed Results',
    render: () => (_jsx(PollCard, { poll: {
            question: "Which programming language should we focus on next semester?",
            options: [
                { text: "Python", votes: 156, color: "text-blue-500" },
                { text: "JavaScript", votes: 134, color: "text-yellow-500" },
                { text: "Go", votes: 89, color: "text-cyan-500" },
                { text: "Rust", votes: 67, color: "text-orange-500" }
            ],
            totalVotes: 446,
            timeLeft: "Closed",
            hasVoted: true,
            userVote: 1
        } }))
};
// Live Stats Card Stories
export const LiveStatsDefault = {
    name: 'Live Stats - Campus Activity',
    render: () => (_jsx(LiveStatsCard, { stats: {
            title: "Campus Activity Dashboard",
            metrics: [
                {
                    label: "Active Students",
                    value: 1247,
                    change: 12.3,
                    icon: _jsx(Users, { className: "w-5 h-5 text-blue-500" }),
                    color: "text-blue-500"
                },
                {
                    label: "Events Today",
                    value: 18,
                    change: -5.2,
                    icon: _jsx(Calendar, { className: "w-5 h-5 text-green-500" }),
                    color: "text-green-500"
                },
                {
                    label: "Study Groups",
                    value: 89,
                    change: 8.7,
                    icon: _jsx(BookOpen, { className: "w-5 h-5 text-purple-500" }),
                    color: "text-purple-500"
                },
                {
                    label: "Resources Shared",
                    value: 234,
                    change: 15.6,
                    icon: _jsx(Share2, { className: "w-5 h-5 text-orange-500" }),
                    color: "text-orange-500"
                }
            ],
            lastUpdated: "2 minutes ago"
        } }))
};
// Filter Control Card Stories  
export const FilterControlDefault = {
    name: 'Filter Control - Content Discovery',
    render: () => {
        const [filters, setFilters] = useState({
            search: '',
            categories: ['Academic'],
            dateRange: { start: '', end: '' },
            sortBy: 'recent',
            viewMode: 'grid'
        });
        return (_jsx(FilterControlCard, { filters: filters, onFiltersChange: setFilters }));
    }
};
// Interactive Campus Dashboard
export const InteractiveCampusDashboard = {
    name: 'Interactive Campus Dashboard',
    render: () => {
        const [filters, setFilters] = useState({
            search: '',
            categories: [],
            dateRange: { start: '', end: '' },
            sortBy: 'recent',
            viewMode: 'grid'
        });
        return (_jsxs("div", { className: "relative min-h-screen p-6 space-y-6", children: [_jsxs("div", { className: "flex flex-wrap gap-6", children: [_jsx(LiveStatsCard, { stats: {
                                title: "Live Campus Metrics",
                                metrics: [
                                    {
                                        label: "Online Now",
                                        value: 892,
                                        change: 5.2,
                                        icon: _jsx(Activity, { className: "w-5 h-5 text-green-500" }),
                                        color: "text-green-500"
                                    },
                                    {
                                        label: "Events This Week",
                                        value: 47,
                                        change: 23.1,
                                        icon: _jsx(Calendar, { className: "w-5 h-5 text-blue-500" }),
                                        color: "text-blue-500"
                                    }
                                ],
                                lastUpdated: "30 seconds ago"
                            } }), _jsx(FilterControlCard, { filters: filters, onFiltersChange: setFilters })] }), _jsxs("div", { className: "flex flex-wrap gap-6", children: [_jsx(MediaPlayerCard, { media: {
                                title: "Campus Radio Live",
                                artist: "HIVE FM",
                                duration: 7200,
                                currentTime: 3420,
                                isPlaying: true
                            } }), _jsx(PollCard, { poll: {
                                question: "What should our next campus event focus on?",
                                options: [
                                    { text: "Career Fair", votes: 45, color: "text-blue-500" },
                                    { text: "Tech Conference", votes: 38, color: "text-green-500" },
                                    { text: "Social Mixer", votes: 29, color: "text-purple-500" },
                                    { text: "Study Marathon", votes: 22, color: "text-orange-500" }
                                ],
                                totalVotes: 134,
                                timeLeft: "3 hours",
                                hasVoted: false
                            } })] }), _jsx(QuickActionCard, { actions: [
                        {
                            label: 'New Post',
                            icon: _jsx(Plus, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }),
                            color: 'bg-blue-500',
                            action: () => console.log('New Post')
                        },
                        {
                            label: 'Create Poll',
                            icon: _jsx(BarChart3, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }),
                            color: 'bg-green-500',
                            action: () => console.log('Create Poll')
                        },
                        {
                            label: 'Schedule Event',
                            icon: _jsx(Calendar, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }),
                            color: 'bg-purple-500',
                            action: () => console.log('Schedule Event')
                        }
                    ] })] }));
    }
};
// Mobile Interactive Experience
export const MobileInteractiveExperience = {
    name: 'Mobile-First Interactive Cards',
    render: () => (_jsxs("div", { className: "max-w-sm mx-auto space-y-4", children: [_jsx(PollCard, { className: "w-full max-w-sm", poll: {
                    question: "Best study spot on campus?",
                    options: [
                        { text: "Main Library", votes: 67, color: "text-blue-500" },
                        { text: "Student Center", votes: 23, color: "text-green-500" },
                        { text: "Coffee Shop", votes: 45, color: "text-purple-500" }
                    ],
                    totalVotes: 135,
                    timeLeft: "1 day",
                    hasVoted: false
                } }), _jsx(MediaPlayerCard, { className: "w-full max-w-sm", media: {
                    title: "Study Music Mix",
                    artist: "Lo-Fi Campus Beats",
                    duration: 1800,
                    currentTime: 720,
                    isPlaying: true
                } })] })),
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
//# sourceMappingURL=interactive-cards.stories.js.map