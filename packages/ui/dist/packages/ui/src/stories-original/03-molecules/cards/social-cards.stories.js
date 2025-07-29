import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { Heart, MessageCircle, Share2, BookOpen, Calendar, MapPin, Users, Zap, ChevronDown, ChevronUp, ExternalLink, Star, Clock, Target, Sparkles, Eye, MoreHorizontal, UserCheck, TrendingUp } from 'lucide-react';
// Student Profile Card - Campus social connection
const StudentProfileCard = ({ student, className, interactive = true, expandable = false }) => {
    const [expanded, setExpanded] = useState(false);
    const [following, setFollowing] = useState(false);
    return (_jsx(HiveCard, { className: `w-[350px] ${className}`, variant: "elevated", size: "md", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-5 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] p-0.5", children: _jsx("img", { src: student.avatar, alt: student.name, className: "w-full h-full rounded-full object-cover bg-[var(--hive-background-secondary)]" }) }), student.verified && (_jsx("div", { className: "absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center", children: _jsx(UserCheck, { className: "w-3 h-3 text-[var(--hive-text-primary)]" }) }))] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-md", className: "font-semibold", children: student.name }), _jsx(Badge, { variant: "secondary", size: "sm", children: student.year })] }), _jsx(Text, { variant: "body-sm", color: "secondary", children: student.major }), _jsx(Text, { variant: "body-xs", color: "secondary", children: student.university })] })] }), interactive && (_jsx("button", { className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }))] }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-4 h-4 text-gray-400" }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: [student.mutualConnections, " mutual"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "w-4 h-4 text-gray-400" }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: ["Joined ", student.joinedDate] })] })] }), student.bio && (_jsx(Text, { variant: "body-sm", className: "line-clamp-2", children: student.bio })), _jsxs("div", { className: "flex flex-wrap gap-1", children: [student.interests.slice(0, 3).map((interest, index) => (_jsx(Badge, { variant: "outline", size: "sm", children: interest }, index))), student.interests.length > 3 && expandable && (_jsxs(Badge, { variant: "outline", size: "sm", children: ["+", student.interests.length - 3] }))] }), expandable && (_jsx(AnimatePresence, { children: expanded && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-3 pt-3 border-t border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Interests" }), _jsx("div", { className: "flex flex-wrap gap-1", children: student.interests.map((interest, index) => (_jsx(Badge, { variant: "outline", size: "sm", children: interest }, index))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Campus Activity" }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(BookOpen, { className: "w-4 h-4 text-green-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Active in 3 study groups" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Calendar, { className: "w-4 h-4 text-blue-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Attended 12 campus events" })] })] })] })] })) })), interactive && (_jsxs("div", { className: "flex items-center gap-2 pt-2", children: [_jsx(HiveButton, { variant: following ? "outline" : "premium", size: "sm", className: "flex-1", onClick: () => setFollowing(!following), children: following ? "Following" : "Follow" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: _jsx(MessageCircle, { className: "w-4 h-4" }) }), expandable && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => setExpanded(!expanded), children: expanded ? _jsx(ChevronUp, { className: "w-4 h-4" }) : _jsx(ChevronDown, { className: "w-4 h-4" }) }))] }))] }) }));
};
// Event Card - Campus event discovery
const EventCard = ({ event, className, interactive = true, expandable = false }) => {
    const [expanded, setExpanded] = useState(false);
    const [attending, setAttending] = useState(event.isAttending);
    const [interested, setInterested] = useState(false);
    return (_jsx(HiveCard, { className: `w-100 ${className}`, variant: "elevated", size: "md", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "overflow-hidden", children: [event.image && (_jsxs("div", { className: "h-48 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] relative", children: [_jsx("img", { src: event.image, alt: event.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute top-3 left-3", children: _jsx(Badge, { variant: event.price ? "default" : "success", children: event.price || "Free" }) }), _jsx("div", { className: "absolute top-3 right-3", children: _jsx("button", { onClick: () => setInterested(!interested), className: "p-2 bg-[var(--hive-background-primary)]/20 backdrop-blur-sm rounded-full hover:bg-[var(--hive-background-primary)]/30 transition-colors", children: _jsx(Heart, { className: `w-4 h-4 ${interested ? 'text-red-400 fill-red-400' : 'text-[var(--hive-text-primary)]'}` }) }) })] })), _jsxs("div", { className: "p-5 space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "flex items-start justify-between", children: _jsx(Text, { variant: "heading-md", className: "font-bold line-clamp-2 flex-1", children: event.title }) }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "line-clamp-2", children: event.description })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "w-4 h-4 text-blue-400" }), _jsxs(Text, { variant: "body-sm", children: [event.date, " at ", event.time] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-green-400" }), _jsx(Text, { variant: "body-sm", children: event.location })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4 text-purple-400" }), _jsxs(Text, { variant: "body-sm", children: [event.attendees, " attending", event.maxAttendees && ` • ${event.maxAttendees - event.attendees} spots left`] })] })] }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [event.tags.slice(0, 3).map((tag, index) => (_jsx(Badge, { variant: "secondary", size: "sm", children: tag }, index))), event.tags.length > 3 && (_jsxs(Badge, { variant: "outline", size: "sm", children: ["+", event.tags.length - 3] }))] }), expandable && (_jsx(AnimatePresence, { children: expanded && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-3 pt-3 border-t border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "About this event" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Join us for an incredible evening of networking, learning, and campus community building. This event is perfect for students looking to connect with peers in their field and explore new opportunities on campus." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Organizer" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full" }), _jsx(Text, { variant: "body-sm", children: event.organizer })] })] }), _jsx("div", { className: "flex flex-wrap gap-1", children: event.tags.map((tag, index) => (_jsx(Badge, { variant: "secondary", size: "sm", children: tag }, index))) })] })) })), interactive && (_jsxs("div", { className: "flex items-center gap-2 pt-2", children: [_jsx(HiveButton, { variant: attending ? "outline" : "premium", size: "sm", className: "flex-1", onClick: () => setAttending(!attending), children: attending ? "Attending" : "Attend Event" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: _jsx(Share2, { className: "w-4 h-4" }) }), expandable && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => setExpanded(!expanded), children: expanded ? _jsx(ChevronUp, { className: "w-4 h-4" }) : _jsx(ChevronDown, { className: "w-4 h-4" }) }))] }))] })] }) }));
};
// Tool Card - Student-built campus tools
const ToolCard = ({ tool, className, interactive = true, expandable = false }) => {
    const [expanded, setExpanded] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    return (_jsx(HiveCard, { className: `w-[380px] ${className}`, variant: "elevated", size: "md", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-5 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-xl flex items-center justify-center", children: _jsx(Zap, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-md", className: "font-bold", children: tool.name }), tool.featured && (_jsx(Sparkles, { className: "w-4 h-4 text-yellow-400" }))] }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: ["by ", tool.creator] }), _jsx(Badge, { variant: "secondary", size: "sm", children: tool.category })] })] }), interactive && (_jsx("button", { onClick: () => setBookmarked(!bookmarked), className: "p-2 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors", children: _jsx(Star, { className: `w-4 h-4 ${bookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}` }) }))] }), _jsx(Text, { variant: "body-sm", className: "line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-4 h-4 text-blue-400" }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: [tool.usage, " uses"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: tool.rating.toFixed(1) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-4 h-4 text-green-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: tool.lastUpdated })] })] }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [tool.tags.slice(0, 3).map((tag, index) => (_jsx(Badge, { variant: "outline", size: "sm", children: tag }, index))), tool.tags.length > 3 && (_jsxs(Badge, { variant: "outline", size: "sm", children: ["+", tool.tags.length - 3] }))] }), expandable && (_jsx(AnimatePresence, { children: expanded && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-3 pt-3 border-t border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "How it works" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "This tool helps students streamline their campus experience by providing automated solutions for common academic and social tasks. Built with modern web technologies and designed specifically for student workflows." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Recent Updates" }), _jsxs("div", { className: "space-y-1", children: [_jsx(Text, { variant: "body-xs", color: "secondary", children: "\u2022 Added dark mode support" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "\u2022 Improved mobile responsiveness" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "\u2022 Fixed calendar integration" })] })] }), _jsx("div", { className: "flex flex-wrap gap-1", children: tool.tags.map((tag, index) => (_jsx(Badge, { variant: "outline", size: "sm", children: tag }, index))) })] })) })), interactive && (_jsxs("div", { className: "flex items-center gap-2 pt-2", children: [_jsxs(HiveButton, { variant: "premium", size: "sm", className: "flex-1", children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Use Tool"] }), _jsx(HiveButton, { variant: "outline", size: "sm", children: _jsx(ExternalLink, { className: "w-4 h-4" }) }), expandable && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => setExpanded(!expanded), children: expanded ? _jsx(ChevronUp, { className: "w-4 h-4" }) : _jsx(ChevronDown, { className: "w-4 h-4" }) }))] }))] }) }));
};
// Space Card - Campus community discovery
const SpaceCard = ({ space, className, interactive = true, expandable = false }) => {
    const [expanded, setExpanded] = useState(false);
    const [joined, setJoined] = useState(space.isJoined);
    return (_jsx(HiveCard, { className: `w-[360px] ${className}`, variant: "elevated", size: "md", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "overflow-hidden", children: [_jsxs("div", { className: "h-32 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] relative p-4 flex items-end", children: [space.image ? (_jsx("img", { src: space.image, alt: space.name, className: "absolute inset-0 w-full h-full object-cover" })) : (_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[var(--hive-primary)]/80 to-[var(--hive-accent)]/80" })), _jsx("div", { className: "relative z-10 flex items-center justify-between w-full", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-lg", className: "font-bold text-[var(--hive-text-primary)]", children: space.name }), space.trending && (_jsx(TrendingUp, { className: "w-4 h-4 text-yellow-300" }))] }), _jsxs(Badge, { variant: space.privacy === 'private' ? 'default' : 'secondary', size: "sm", children: [space.privacy === 'private' ? 'Private' : 'Public', " Space"] })] }) })] }), _jsxs("div", { className: "p-5 space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "line-clamp-2", children: space.description }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-4 h-4 text-blue-400" }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: [space.members, " members"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Target, { className: "w-4 h-4 text-green-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: space.activity })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Badge, { variant: "secondary", size: "sm", children: space.category }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [space.tags.slice(0, 2).map((tag, index) => (_jsx(Badge, { variant: "outline", size: "sm", children: tag }, index))), space.tags.length > 2 && (_jsxs(Badge, { variant: "outline", size: "sm", children: ["+", space.tags.length - 2] }))] })] }), expandable && (_jsx(AnimatePresence, { children: expanded && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-3 pt-3 border-t border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Moderators" }), _jsx("div", { className: "flex flex-wrap gap-2", children: space.moderators.map((mod, index) => (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "w-6 h-6 bg-gradient-to-r from-[var(--hive-primary)] to-[var(--hive-accent)] rounded-full" }), _jsx(Text, { variant: "body-xs", children: mod })] }, index))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Recent Activity" }), _jsxs("div", { className: "space-y-1", children: [_jsx(Text, { variant: "body-xs", color: "secondary", children: "\u2022 New event: Study Group Meetup" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "\u2022 15 new members this week" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "\u2022 Updated community guidelines" })] })] }), _jsx("div", { className: "flex flex-wrap gap-1", children: space.tags.map((tag, index) => (_jsx(Badge, { variant: "outline", size: "sm", children: tag }, index))) })] })) })), interactive && (_jsxs("div", { className: "flex items-center gap-2 pt-2", children: [_jsx(HiveButton, { variant: joined ? "outline" : "premium", size: "sm", className: "flex-1", onClick: () => setJoined(!joined), children: joined ? "Joined" : "Join Space" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: _jsx(Share2, { className: "w-4 h-4" }) }), expandable && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => setExpanded(!expanded), children: expanded ? _jsx(ChevronUp, { className: "w-4 h-4" }) : _jsx(ChevronDown, { className: "w-4 h-4" }) }))] }))] })] }) }));
};
// Stories Configuration
const meta = {
    title: '03-molecules/Cards/Social Cards',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Social Cards** - Expandable, modular social cards for campus community

Molecular-level card components designed specifically for the HIVE student platform experience. These cards combine multiple atomic components to create rich, interactive social experiences that drive campus engagement and community building.

## Card Philosophy
- **Campus-Centric**: Every card emphasizes university context and peer connections
- **Progressive Disclosure**: Expandable content reveals deeper engagement opportunities
- **Social Actions**: Built-in interaction patterns for following, joining, and sharing
- **Mobile-First**: Optimized for mobile-first student usage patterns

## Components
- **StudentProfileCard**: Campus social profiles with verification and mutual connections
- **EventCard**: Campus event discovery with attendance tracking and rich details
- **ToolCard**: Student-built campus tools with usage stats and community ratings
- **SpaceCard**: Campus community discovery with member activity and trending indicators

## Design Patterns
- **Liquid Motion**: Smooth expand/collapse using HIVE's गति motion system
- **Contextual Actions**: Smart action buttons that adapt to user state
- **Visual Hierarchy**: Clear information architecture optimized for scanning
- **Accessibility First**: Screen reader friendly with proper ARIA support

## Interaction States
- **Default**: Clean, scannable card layout with key information
- **Expanded**: Rich detail view with additional context and actions
- **Interactive**: Hover states, button feedback, and micro-interactions
- **Connected**: Social proof through mutual connections and community activity

## Tech Stack Integration
- HiveCard elevation system for consistent visual hierarchy
- HiveButton variants for contextual actions
- Atomic Text components for consistent typography  
- Framer Motion for smooth expand/collapse animations
- Lucide React for consistent iconography across campus features
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Student Profile Card Stories
export const StudentProfileDefault = {
    name: 'Student Profile - Default',
    render: () => (_jsx(StudentProfileCard, { student: {
            name: "Sarah Chen",
            major: "Computer Science",
            year: "Junior",
            university: "Stanford University",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=400&h=400&fit=crop&crop=face",
            verified: true,
            mutualConnections: 12,
            bio: "Passionate about AI and machine learning. Always looking to collaborate on cool projects and meet fellow CS students!",
            interests: ["Machine Learning", "React", "Startups", "Design", "Photography"],
            joinedDate: "Sep 2023"
        } }))
};
export const StudentProfileExpandable = {
    name: 'Student Profile - Expandable',
    render: () => (_jsx(StudentProfileCard, { expandable: true, student: {
            name: "Marcus Johnson",
            major: "Business Administration",
            year: "Senior",
            university: "UC Berkeley",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            verified: true,
            mutualConnections: 8,
            bio: "Entrepreneur building the next big thing. Love connecting with innovative minds and exploring new business opportunities.",
            interests: ["Entrepreneurship", "Finance", "Networking", "Basketball", "Travel", "Blockchain", "Sustainability"],
            joinedDate: "Aug 2022"
        } }))
};
// Event Card Stories
export const EventCardDefault = {
    name: 'Campus Event - Default',
    render: () => (_jsx(EventCard, { event: {
            title: "CS Department Networking Night",
            description: "Join fellow computer science students for an evening of networking, pizza, and career discussions. Industry professionals will be present!",
            date: "March 15, 2024",
            time: "6:00 PM",
            location: "Gates Building, Room 104",
            organizer: "CS Student Association",
            attendees: 47,
            maxAttendees: 100,
            tags: ["Networking", "Computer Science", "Career", "Free Food"],
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
            isAttending: false,
            price: undefined
        } }))
};
export const EventCardExpandable = {
    name: 'Campus Event - Expandable',
    render: () => (_jsx(EventCard, { expandable: true, event: {
            title: "Spring Career Fair 2024",
            description: "The biggest career fair of the year! Connect with top tech companies, startups, and consulting firms actively recruiting students.",
            date: "April 22, 2024",
            time: "10:00 AM - 4:00 PM",
            location: "Memorial Auditorium",
            organizer: "Career Services Center",
            attendees: 234,
            maxAttendees: 500,
            tags: ["Career Fair", "Recruiting", "Tech", "Business", "Internships"],
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
            isAttending: true,
            price: undefined
        } }))
};
export const EventCardPaid = {
    name: 'Campus Event - Paid Event',
    render: () => (_jsx(EventCard, { event: {
            title: "Spring Formal Dance",
            description: "Celebrate the end of finals with an elegant evening of dancing, dinner, and entertainment at the historic Grand Ballroom.",
            date: "May 10, 2024",
            time: "7:00 PM - 12:00 AM",
            location: "Grand Ballroom, Downtown",
            organizer: "Student Activities Board",
            attendees: 156,
            maxAttendees: 300,
            tags: ["Formal", "Dance", "Social", "End of Year"],
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop",
            isAttending: false,
            price: "$45"
        } }))
};
// Tool Card Stories
export const ToolCardDefault = {
    name: 'Campus Tool - Default',
    render: () => (_jsx(ToolCard, { tool: {
            name: "Schedule Optimizer",
            description: "AI-powered course scheduling tool that finds the perfect class combinations while avoiding conflicts and optimizing your daily routine.",
            creator: "Alex Rivera",
            category: "Academic",
            usage: 1247,
            rating: 4.8,
            tags: ["Scheduling", "AI", "Academic", "Productivity"],
            lastUpdated: "2 hours ago",
            featured: true
        } }))
};
export const ToolCardExpandable = {
    name: 'Campus Tool - Expandable',
    render: () => (_jsx(ToolCard, { expandable: true, tool: {
            name: "Campus Ride Share",
            description: "Connect with fellow students for shared rides to campus, events, and around the city. Save money and make new friends!",
            creator: "Transportation Club",
            category: "Transportation",
            usage: 892,
            rating: 4.6,
            tags: ["Transportation", "Social", "Money Saving", "Sustainability", "Community"],
            lastUpdated: "1 day ago",
            featured: false
        } }))
};
// Space Card Stories
export const SpaceCardDefault = {
    name: 'Campus Space - Default',
    render: () => (_jsx(SpaceCard, { space: {
            name: "Stanford Startup Founders",
            description: "A community for aspiring entrepreneurs and startup founders. Share ideas, find co-founders, and get mentorship from successful alumni.",
            category: "Entrepreneurship",
            members: 342,
            activity: "Very active",
            privacy: "public",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=150&fit=crop",
            moderators: ["Sarah Kim", "David Chen"],
            tags: ["Startups", "Entrepreneurship", "Networking"],
            isJoined: false,
            trending: true
        } }))
};
export const SpaceCardExpandable = {
    name: 'Campus Space - Expandable',
    render: () => (_jsx(SpaceCard, { expandable: true, space: {
            name: "CS Study Group Hub",
            description: "Central hub for computer science students to form study groups, share resources, and collaborate on projects. All skill levels welcome!",
            category: "Academic",
            members: 156,
            activity: "Daily posts",
            privacy: "public",
            moderators: ["Prof. Johnson", "Teaching Assistant Maya"],
            tags: ["Computer Science", "Study Groups", "Collaboration", "Projects", "Resources"],
            isJoined: true,
            trending: false
        } }))
};
export const SpaceCardPrivate = {
    name: 'Campus Space - Private Community',
    render: () => (_jsx(SpaceCard, { space: {
            name: "Honors Program Network",
            description: "Exclusive community for honors program students. Share opportunities, collaborate on research, and connect with high-achieving peers.",
            category: "Academic",
            members: 89,
            activity: "Weekly posts",
            privacy: "private",
            moderators: ["Dr. Martinez", "Academic Advisor"],
            tags: ["Honors Program", "Research", "Academic Excellence"],
            isJoined: true,
            trending: false
        } }))
};
// Interactive Campus Feed
export const CampusSocialFeed = {
    name: 'Campus Social Feed',
    render: () => {
        const [filter, setFilter] = useState('all');
        const students = [
            {
                name: "Emma Rodriguez",
                major: "Environmental Science",
                year: "Sophomore",
                university: "UC Berkeley",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
                verified: true,
                mutualConnections: 5,
                bio: "Passionate about sustainability and environmental justice.",
                interests: ["Climate Change", "Research", "Activism"],
                joinedDate: "Jan 2024"
            }
        ];
        const events = [
            {
                title: "Weekly Study Session",
                description: "Join us for collaborative studying in the library!",
                date: "Today",
                time: "7:00 PM",
                location: "Main Library",
                organizer: "Study Group",
                attendees: 12,
                tags: ["Study", "Library"],
                isAttending: false
            }
        ];
        return (_jsxs("div", { className: "flex flex-col items-center gap-6 max-w-4xl", children: [_jsx("div", { className: "flex gap-2 p-1 bg-[var(--hive-background-secondary)] rounded-lg", children: [
                        { key: 'all', label: 'All' },
                        { key: 'people', label: 'People' },
                        { key: 'events', label: 'Events' },
                        { key: 'tools', label: 'Tools' },
                        { key: 'spaces', label: 'Spaces' }
                    ].map((tab) => (_jsx("button", { onClick: () => setFilter(tab.key), className: `px-4 py-2 rounded-md transition-colors ${filter === tab.key
                            ? 'bg-[var(--hive-primary)] text-[var(--hive-text-primary)]'
                            : 'text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: tab.label }, tab.key))) }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6", children: _jsxs(AnimatePresence, { mode: "wait", children: [(filter === 'all' || filter === 'people') && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", children: _jsx(StudentProfileCard, { student: students[0], expandable: true }) }, "student-card")), (filter === 'all' || filter === 'events') && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", children: _jsx(EventCard, { event: events[0], expandable: true }) }, "event-card")), (filter === 'all' || filter === 'tools') && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", children: _jsx(ToolCard, { expandable: true, tool: {
                                        name: "Study Buddy Finder",
                                        description: "Match with students in your classes for study sessions and project collaboration.",
                                        creator: "Academic Success Team",
                                        category: "Academic",
                                        usage: 456,
                                        rating: 4.7,
                                        tags: ["Study", "Collaboration", "Academic"],
                                        lastUpdated: "3 hours ago",
                                        featured: false
                                    } }) }, "tool-card")), (filter === 'all' || filter === 'spaces') && (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", children: _jsx(SpaceCard, { expandable: true, space: {
                                        name: "Photography Club",
                                        description: "Capture campus life and improve your photography skills with fellow students.",
                                        category: "Arts & Creative",
                                        members: 78,
                                        activity: "Weekly meetups",
                                        privacy: "public",
                                        moderators: ["Photo Club President"],
                                        tags: ["Photography", "Arts", "Creative"],
                                        isJoined: false,
                                        trending: false
                                    } }) }, "space-card"))] }) })] }));
    }
};
// Mobile-First Cards
export const MobileSocialCards = {
    name: 'Mobile-First Card Experience',
    render: () => (_jsxs("div", { className: "max-w-sm mx-auto space-y-4", children: [_jsx(StudentProfileCard, { className: "w-full max-w-sm", student: {
                    name: "Jordan Park",
                    major: "Psychology",
                    year: "Junior",
                    university: "UCLA",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
                    verified: false,
                    mutualConnections: 3,
                    interests: ["Psychology", "Research"],
                    joinedDate: "Oct 2023"
                } }), _jsx(EventCard, { className: "w-full max-w-sm", event: {
                    title: "Campus Coffee Chat",
                    description: "Casual networking over coffee!",
                    date: "Tomorrow",
                    time: "3:00 PM",
                    location: "Student Center",
                    organizer: "Networking Club",
                    attendees: 8,
                    maxAttendees: 15,
                    tags: ["Networking", "Social"],
                    isAttending: false
                } })] })),
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
//# sourceMappingURL=social-cards.stories.js.map