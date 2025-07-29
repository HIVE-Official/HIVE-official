import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { Heart, MessageCircle, Share2, Play, Download, ExternalLink, ChevronDown, ChevronUp, Clock, Bookmark, MoreHorizontal, FileText, Video, Music, Mic, Link as LinkIcon, Award, Star } from 'lucide-react';
// Post Card - Student social posts and updates
const PostCard = ({ post, className, interactive = true, expandable = false }) => {
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(post.isLiked);
    const [bookmarked, setBookmarked] = useState(post.isBookmarked);
    return (_jsx(HiveCard, { className: `w-125 ${className}`, variant: "elevated", size: "md", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-5 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] p-0.5", children: _jsx("img", { src: post.author.avatar, alt: post.author.name, className: "w-full h-full rounded-full object-cover bg-[var(--hive-background-secondary)]" }) }), post.author.verified && (_jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center", children: _jsx(Star, { className: "w-2.5 h-2.5 text-[var(--hive-text-primary)]" }) }))] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-md", className: "font-semibold", children: post.author.name }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: ["@", post.author.username] })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: post.timestamp })] })] }), interactive && (_jsx("button", { className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Text, { variant: "body-md", className: expandable && !expanded ? "line-clamp-3" : "", children: post.content }), post.media && (_jsxs("div", { className: "rounded-lg overflow-hidden bg-[var(--hive-background-secondary)]", children: [post.media.type === 'image' ? (_jsx("img", { src: post.media.url, alt: post.media.caption || "Post image", className: "w-full h-64 object-cover" })) : (_jsxs("div", { className: "relative h-64 bg-[var(--hive-background-primary)] flex items-center justify-center", children: [_jsx(Play, { className: "w-12 h-12 text-[var(--hive-text-primary)] opacity-70" }), _jsx("video", { src: post.media.url, className: "absolute inset-0 w-full h-full object-cover", poster: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMTExODI3Ii8+Cjwvc3ZnPgo=" })] })), post.media.caption && (_jsx("div", { className: "p-3", children: _jsx(Text, { variant: "body-sm", color: "secondary", children: post.media.caption }) }))] })), post.tags && post.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1", children: post.tags.map((tag, index) => (_jsxs(Badge, { variant: "secondary", size: "sm", children: ["#", tag] }, index))) }))] }), expandable && (_jsx(AnimatePresence, { children: expanded && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "pt-3 border-t border-[var(--hive-border-primary)]", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Engagement Insights" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-lg", className: "font-bold", children: post.likes }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Likes" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-lg", className: "font-bold", children: post.comments }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Comments" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-lg", className: "font-bold", children: post.shares }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Shares" })] })] })] }) })) })), interactive && (_jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("button", { onClick: () => setLiked(!liked), className: "flex items-center gap-2 p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: [_jsx(Heart, { className: `w-4 h-4 ${liked ? 'text-red-400 fill-red-400' : 'text-gray-400'}` }), _jsx(Text, { variant: "body-sm", color: "secondary", children: post.likes + (liked && !post.isLiked ? 1 : 0) })] }), _jsxs("button", { className: "flex items-center gap-2 p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: [_jsx(MessageCircle, { className: "w-4 h-4 text-gray-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: post.comments })] }), _jsxs("button", { className: "flex items-center gap-2 p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: [_jsx(Share2, { className: "w-4 h-4 text-gray-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: post.shares })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setBookmarked(!bookmarked), className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: _jsx(Bookmark, { className: `w-4 h-4 ${bookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}` }) }), expandable && (_jsx("button", { onClick: () => setExpanded(!expanded), className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: expanded ? _jsx(ChevronUp, { className: "w-4 h-4" }) : _jsx(ChevronDown, { className: "w-4 h-4" }) }))] })] }))] }) }));
};
// Resource Card - Academic resources and study materials
const ResourceCard = ({ resource, className, interactive = true, expandable = false }) => {
    const [expanded, setExpanded] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const getTypeIcon = () => {
        switch (resource.type) {
            case 'document': return _jsx(FileText, { className: "w-5 h-5 text-blue-400" });
            case 'video': return _jsx(Video, { className: "w-5 h-5 text-red-400" });
            case 'audio': return _jsx(Music, { className: "w-5 h-5 text-green-400" });
            case 'link': return _jsx(LinkIcon, { className: "w-5 h-5 text-purple-400" });
            default: return _jsx(FileText, { className: "w-5 h-5 text-gray-400" });
        }
    };
    return (_jsx(HiveCard, { className: `w-100 ${className}`, variant: "elevated", size: "md", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-5 space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "p-3 bg-[var(--hive-background-secondary)] rounded-lg", children: getTypeIcon() }), _jsxs("div", { className: "flex-1", children: [_jsx(Text, { variant: "body-lg", className: "font-bold line-clamp-2", children: resource.title }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs(Text, { variant: "body-sm", color: "secondary", children: ["by ", resource.author] }), resource.course && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-gray-600", children: "\u2022" }), _jsx(Badge, { variant: "secondary", size: "sm", children: resource.course })] }))] })] }), interactive && (_jsx("button", { onClick: () => setBookmarked(!bookmarked), className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: _jsx(Bookmark, { className: `w-4 h-4 ${bookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}` }) }))] }), resource.thumbnail && (_jsxs("div", { className: "relative rounded-lg overflow-hidden bg-[var(--hive-background-secondary)] h-48", children: [_jsx("img", { src: resource.thumbnail, alt: resource.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-[var(--hive-background-primary)]/20 flex items-center justify-center", children: resource.type === 'video' ? (_jsx(Play, { className: "w-12 h-12 text-[var(--hive-text-primary)] opacity-70" })) : resource.type === 'audio' ? (_jsx(Mic, { className: "w-12 h-12 text-[var(--hive-text-primary)] opacity-70" })) : null })] })), _jsx(Text, { variant: "body-sm", className: expandable && !expanded ? "line-clamp-2" : "", children: resource.description }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Download, { className: "w-4 h-4 text-blue-400" }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: [resource.downloads, " downloads"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: resource.rating.toFixed(1) })] }), resource.fileSize && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(FileText, { className: "w-4 h-4 text-gray-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: resource.fileSize })] })), resource.duration && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-4 h-4 text-gray-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: resource.duration })] }))] }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [resource.tags.slice(0, 3).map((tag, index) => (_jsx(Badge, { variant: "outline", size: "sm", children: tag }, index))), resource.tags.length > 3 && (_jsxs(Badge, { variant: "outline", size: "sm", children: ["+", resource.tags.length - 3] }))] }), expandable && (_jsx(AnimatePresence, { children: expanded && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-3 pt-3 border-t border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Resource Details" }), _jsxs("div", { className: "space-y-1", children: [_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["\u2022 Uploaded on ", resource.uploadDate] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "\u2022 Compatible with all devices" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "\u2022 Updated with latest information" })] })] }), _jsx("div", { className: "flex flex-wrap gap-1", children: resource.tags.map((tag, index) => (_jsx(Badge, { variant: "outline", size: "sm", children: tag }, index))) })] })) })), interactive && (_jsxs("div", { className: "flex items-center gap-2 pt-2", children: [_jsx(HiveButton, { variant: "premium", size: "sm", className: "flex-1", children: resource.type === 'link' ? (_jsxs(_Fragment, { children: [_jsx(ExternalLink, { className: "w-4 h-4 mr-2" }), "Open Link"] })) : (_jsxs(_Fragment, { children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Download"] })) }), _jsx(HiveButton, { variant: "outline", size: "sm", children: _jsx(Share2, { className: "w-4 h-4" }) }), expandable && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => setExpanded(!expanded), children: expanded ? _jsx(ChevronUp, { className: "w-4 h-4" }) : _jsx(ChevronDown, { className: "w-4 h-4" }) }))] }))] }) }));
};
// Achievement Card - Student accomplishments and milestones
const AchievementCard = ({ achievement, className, interactive = true, expandable = false }) => {
    const [expanded, setExpanded] = useState(false);
    const getRarityColor = () => {
        switch (achievement.rarity) {
            case 'legendary': return 'from-yellow-400 to-orange-500';
            case 'rare': return 'from-purple-400 to-pink-500';
            case 'common': return 'from-blue-400 to-green-500';
            default: return 'from-gray-400 to-gray-600';
        }
    };
    return (_jsx(HiveCard, { className: `w-[350px] ${className}`, variant: "elevated", size: "md", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-5 space-y-4", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: `w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${getRarityColor()} p-1`, children: _jsx("div", { className: "w-full h-full bg-[var(--hive-background-primary)] rounded-full flex items-center justify-center", children: _jsx(Award, { className: "w-8 h-8 text-[var(--hive-text-primary)]" }) }) }), _jsxs("div", { className: "space-y-1", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: achievement.title }), _jsx(Badge, { variant: achievement.rarity === 'legendary' ? 'default' : 'secondary', size: "sm", className: achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-[var(--hive-background-primary)]' : '', children: achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1) })] })] }), _jsx(Text, { variant: "body-sm", className: "text-center line-clamp-2", children: achievement.description }), _jsxs("div", { className: "flex items-center justify-center gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-lg", className: "font-bold text-[var(--hive-primary)]", children: achievement.points }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Points" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-md", className: "font-semibold", children: achievement.category }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Category" })] })] }), achievement.progress && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx(Text, { variant: "body-sm", children: "Progress" }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: [achievement.progress.current, "/", achievement.progress.total] })] }), _jsx("div", { className: "w-full bg-[var(--hive-background-secondary)] rounded-full h-2", children: _jsx("div", { className: "bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] h-2 rounded-full transition-all duration-500", style: { width: `${(achievement.progress.current / achievement.progress.total) * 100}%` } }) })] })), expandable && (_jsx(AnimatePresence, { children: expanded && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-3 pt-3 border-t border-[var(--hive-border-primary)]", children: [achievement.requirements && (_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Requirements" }), _jsx("div", { className: "space-y-1", children: achievement.requirements.map((req, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-[var(--hive-primary)] rounded-full" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: req })] }, index))) })] })), _jsx("div", { className: "text-center", children: _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Earned on ", achievement.earnedDate] }) })] })) })), interactive && (_jsxs("div", { className: "flex items-center gap-2 pt-2", children: [_jsxs(HiveButton, { variant: "outline", size: "sm", className: "flex-1", children: [_jsx(Share2, { className: "w-4 h-4 mr-2" }), "Share Achievement"] }), expandable && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => setExpanded(!expanded), children: expanded ? _jsx(ChevronUp, { className: "w-4 h-4" }) : _jsx(ChevronDown, { className: "w-4 h-4" }) }))] }))] }) }));
};
// Stories Configuration
const meta = {
    title: '03-molecules/Cards/Content Cards',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Content Cards** - Rich content display for campus social platform

Molecular-level content cards designed specifically for the HIVE student platform experience. These cards handle various content types from social posts to academic resources, creating engaging content discovery and interaction patterns.

## Card Philosophy
- **Content-First**: Optimized display for different media types and content formats
- **Social Engagement**: Built-in interaction patterns for likes, comments, and sharing
- **Academic Context**: Specialized layouts for educational resources and achievements
- **Progressive Enhancement**: Expandable content reveals deeper engagement opportunities

## Components
- **PostCard**: Social media posts with rich media support and engagement metrics
- **ResourceCard**: Academic resources with download tracking and rating systems
- **AchievementCard**: Student accomplishments with progress tracking and rarity indicators

## Design Patterns
- **Adaptive Layouts**: Cards adjust based on content type and available media
- **Engagement Metrics**: Clear display of social proof and interaction data
- **Rich Media Support**: Optimized handling of images, videos, and documents
- **Accessibility First**: Screen reader friendly with proper ARIA support

## Interaction States
- **Default**: Clean content presentation with key engagement metrics
- **Expanded**: Additional context, full descriptions, and detailed metadata
- **Interactive**: Hover states, action feedback, and micro-interactions
- **Engaged**: Visual feedback for likes, bookmarks, and other user actions

## Tech Stack Integration
- HiveCard elevation system for consistent visual hierarchy
- HiveButton variants for contextual actions
- Atomic Text and Badge components for content organization
- Framer Motion for smooth expand/collapse animations
- Lucide React for consistent iconography across content types
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Post Card Stories
export const PostCardDefault = {
    name: 'Social Post - Text Only',
    render: () => (_jsx(PostCard, { post: {
            id: "1",
            author: {
                name: "Alex Chen",
                username: "alexc_cs",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
                verified: true
            },
            content: "Just finished my final project for CS 142! Really excited about the web application we built - it's a study group matching platform that uses machine learning to connect students with similar learning styles and schedules. Can't wait to deploy it for the whole campus to use! 🚀",
            timestamp: "2 hours ago",
            likes: 24,
            comments: 8,
            shares: 3,
            tags: ["CS142", "WebDev", "MachineLearning", "StudyGroups"],
            isLiked: false,
            isBookmarked: false
        } }))
};
export const PostCardWithImage = {
    name: 'Social Post - With Image',
    render: () => (_jsx(PostCard, { post: {
            id: "2",
            author: {
                name: "Sarah Kim",
                username: "sarahk_design",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=400&h=400&fit=crop&crop=face",
                verified: false
            },
            content: "Beautiful sunset from the library roof! Sometimes you need to take a break from studying and appreciate the campus views. Who else is pulling an all-nighter for finals?",
            timestamp: "4 hours ago",
            likes: 67,
            comments: 15,
            shares: 12,
            tags: ["CampusLife", "Finals", "Photography"],
            media: {
                type: "image",
                url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
                caption: "Sunset view from the main library"
            },
            isLiked: true,
            isBookmarked: false
        } }))
};
export const PostCardExpandable = {
    name: 'Social Post - Expandable',
    render: () => (_jsx(PostCard, { expandable: true, post: {
            id: "3",
            author: {
                name: "Marcus Johnson",
                username: "marcus_biz",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
                verified: true
            },
            content: "Incredible turnout at today's entrepreneurship workshop! We had over 100 students attend and the energy was amazing. Special thanks to our guest speakers from Y Combinator who shared their insights on building successful startups. The Q&A session went way over time because everyone had such great questions. Already planning the next event for next month - thinking about focusing on fundraising strategies. What topics would you all like to see covered?",
            timestamp: "6 hours ago",
            likes: 89,
            comments: 23,
            shares: 18,
            tags: ["Entrepreneurship", "Workshop", "YCombinator", "Startups"],
            isLiked: false,
            isBookmarked: true
        } }))
};
// Resource Card Stories
export const ResourceCardDocument = {
    name: 'Academic Resource - Document',
    render: () => (_jsx(ResourceCard, { resource: {
            title: "Calculus II Final Exam Study Guide",
            description: "Comprehensive study guide covering all topics from integration techniques to series convergence. Includes practice problems with detailed solutions and key formula references.",
            type: "document",
            author: "Professor Martinez",
            course: "MATH 152",
            downloads: 245,
            rating: 4.8,
            tags: ["Calculus", "Final Exam", "Study Guide", "Mathematics"],
            fileSize: "2.3 MB",
            uploadDate: "March 10, 2024",
            thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop"
        } }))
};
export const ResourceCardVideo = {
    name: 'Academic Resource - Video',
    render: () => (_jsx(ResourceCard, { resource: {
            title: "Introduction to React Hooks",
            description: "Complete tutorial covering useState, useEffect, and custom hooks with practical examples. Perfect for CS students learning modern React development patterns.",
            type: "video",
            author: "Teaching Assistant Emily",
            course: "CS 142",
            downloads: 156,
            rating: 4.9,
            tags: ["React", "Hooks", "JavaScript", "WebDev", "Tutorial"],
            duration: "45:32",
            uploadDate: "March 12, 2024",
            thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop"
        } }))
};
export const ResourceCardExpandable = {
    name: 'Academic Resource - Expandable',
    render: () => (_jsx(ResourceCard, { expandable: true, resource: {
            title: "Data Structures & Algorithms Cheat Sheet",
            description: "Quick reference guide for common data structures and algorithms including time/space complexity analysis, implementation tips, and interview preparation notes.",
            type: "document",
            author: "CS Study Group",
            course: "CS 161",
            downloads: 1247,
            rating: 4.7,
            tags: ["DataStructures", "Algorithms", "CheatSheet", "Interview", "BigO", "Programming"],
            fileSize: "1.8 MB",
            uploadDate: "February 28, 2024"
        } }))
};
// Achievement Card Stories
export const AchievementCardCommon = {
    name: 'Achievement - Common',
    render: () => (_jsx(AchievementCard, { achievement: {
            title: "First Post",
            description: "Welcome to HIVE! You've shared your first post with the campus community.",
            type: "social",
            earnedDate: "March 15, 2024",
            points: 50,
            rarity: "common",
            category: "Social",
            requirements: ["Create your first post", "Get at least one interaction"]
        } }))
};
export const AchievementCardRare = {
    name: 'Achievement - Rare',
    render: () => (_jsx(AchievementCard, { achievement: {
            title: "Study Group Leader",
            description: "You've successfully organized and led multiple study groups, helping fellow students achieve academic success.",
            type: "academic",
            earnedDate: "March 10, 2024",
            points: 200,
            rarity: "rare",
            category: "Academic",
            requirements: [
                "Organize 5 study groups",
                "Maintain 4.5+ rating from participants",
                "Help 20+ students improve their grades"
            ]
        } }))
};
export const AchievementCardLegendary = {
    name: 'Achievement - Legendary',
    render: () => (_jsx(AchievementCard, { expandable: true, achievement: {
            title: "Campus Innovation Champion",
            description: "Your student-built tools have positively impacted over 1000 fellow students, revolutionizing how our campus community learns and connects.",
            type: "project",
            earnedDate: "March 1, 2024",
            points: 1000,
            rarity: "legendary",
            category: "Innovation",
            requirements: [
                "Build tool used by 1000+ students",
                "Maintain 4.8+ average rating",
                "Create positive campus impact",
                "Receive recognition from faculty"
            ]
        } }))
};
export const AchievementCardProgress = {
    name: 'Achievement - With Progress',
    render: () => (_jsx(AchievementCard, { achievement: {
            title: "Event Organizer",
            description: "On your way to becoming a master event organizer by successfully hosting engaging campus events.",
            type: "social",
            earnedDate: "In Progress",
            points: 150,
            rarity: "rare",
            category: "Leadership",
            progress: {
                current: 3,
                total: 5
            },
            requirements: [
                "Organize 5 successful events",
                "Achieve 80+ average attendance",
                "Receive positive feedback from attendees"
            ]
        } }))
};
// Campus Content Feed
export const CampusContentFeed = {
    name: 'Campus Content Feed',
    render: () => {
        const [filter, setFilter] = useState('all');
        return (_jsxs("div", { className: "flex flex-col items-center gap-6 max-w-4xl", children: [_jsx("div", { className: "flex gap-2 p-1 bg-[var(--hive-background-secondary)] rounded-lg", children: [
                        { key: 'all', label: 'All Content' },
                        { key: 'posts', label: 'Posts' },
                        { key: 'resources', label: 'Resources' },
                        { key: 'achievements', label: 'Achievements' }
                    ].map((tab) => (_jsx("button", { onClick: () => setFilter(tab.key), className: `px-4 py-2 rounded-md transition-colors ${filter === tab.key
                            ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                            : 'text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: tab.label }, tab.key))) }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: _jsxs(AnimatePresence, { mode: "wait", children: [(filter === 'all' || filter === 'posts') && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", children: _jsx(PostCard, { expandable: true, post: {
                                        id: "feed-1",
                                        author: {
                                            name: "Jordan Park",
                                            username: "jordanp_cs",
                                            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
                                            verified: false
                                        },
                                        content: "Working late in the lab on our machine learning project. The neural network is finally converging! 🧠✨",
                                        timestamp: "1 hour ago",
                                        likes: 12,
                                        comments: 4,
                                        shares: 2,
                                        tags: ["MachineLearning", "LateNight", "Projects"],
                                        isLiked: false,
                                        isBookmarked: false
                                    } }) }, "post-card")), (filter === 'all' || filter === 'resources') && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", children: _jsx(ResourceCard, { expandable: true, resource: {
                                        title: "Python Data Analysis Toolkit",
                                        description: "Complete collection of Python scripts for data analysis, visualization, and statistical modeling. Perfect for research projects.",
                                        type: "document",
                                        author: "Data Science Club",
                                        course: "CS 229",
                                        downloads: 89,
                                        rating: 4.6,
                                        tags: ["Python", "DataScience", "Analysis", "Research"],
                                        fileSize: "5.2 MB",
                                        uploadDate: "March 8, 2024"
                                    } }) }, "resource-card")), (filter === 'all' || filter === 'achievements') && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "lg:col-span-2 flex justify-center", children: _jsx(AchievementCard, { expandable: true, achievement: {
                                        title: "Knowledge Sharer",
                                        description: "Your shared resources have helped fellow students succeed in their studies.",
                                        type: "academic",
                                        earnedDate: "March 14, 2024",
                                        points: 300,
                                        rarity: "rare",
                                        category: "Academic",
                                        requirements: [
                                            "Share 10 high-quality resources",
                                            "Receive 100+ downloads",
                                            "Maintain 4.0+ rating average"
                                        ]
                                    } }) }, "achievement-card"))] }) })] }));
    }
};
// Mobile Content Cards
export const MobileContentCards = {
    name: 'Mobile-First Content Experience',
    render: () => (_jsxs("div", { className: "max-w-sm mx-auto space-y-4", children: [_jsx(PostCard, { className: "w-full max-w-sm", post: {
                    id: "mobile-1",
                    author: {
                        name: "Riley Chen",
                        username: "riley_design",
                        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
                        verified: true
                    },
                    content: "Quick sketch break between classes! 🎨",
                    timestamp: "30 min ago",
                    likes: 18,
                    comments: 5,
                    shares: 2,
                    tags: ["Art", "Break"],
                    media: {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop"
                    },
                    isLiked: true,
                    isBookmarked: false
                } }), _jsx(ResourceCard, { className: "w-full max-w-sm", resource: {
                    title: "Quick Math Reference",
                    description: "Essential formulas for midterm",
                    type: "document",
                    author: "Study Group",
                    downloads: 45,
                    rating: 4.5,
                    tags: ["Math", "Reference"],
                    fileSize: "0.8 MB",
                    uploadDate: "Today"
                } })] })),
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
//# sourceMappingURL=content-cards.stories.js.map