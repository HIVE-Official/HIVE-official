import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveCard, HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardContent, HiveCardFooter } from '../../components/hive-card';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { User, Settings, Share, Heart, MessageCircle, Star, Calendar, MapPin, Clock, Users, Eye, BookOpen, Zap, Crown } from 'lucide-react';
const meta = {
    title: '04-HIVE/Hive Card',
    component: HiveCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'The consolidated HIVE Card system featuring 20+ variants, liquid metal motion, magnetic interactions, and all semantic design tokens. Includes CardHeader, CardTitle, CardDescription, CardContent, and CardFooter components for structured card layouts.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'elevated', 'minimal', 'gold-accent', 'gold-featured', 'gold-premium', 'builder', 'student', 'space', 'tool', 'online', 'building', 'studying', 'clickable', 'selectable', 'selected', 'post', 'announcement', 'featured-post'],
            description: 'Comprehensive HIVE card variants for all platform use cases'
        },
        size: {
            control: 'select',
            options: ['compact', 'sm', 'default', 'lg', 'xl'],
            description: 'Card padding and size variants'
        },
        rounded: {
            control: 'select',
            options: ['sm', 'default', 'lg', 'full'],
            description: 'Border radius variants with luxury heavy radii'
        },
        magneticHover: {
            control: 'boolean',
            description: 'Enable magnetic hover interactions for premium cards'
        },
        interactive: {
            control: 'boolean',
        },
    },
};
export default meta;
export const Default = {
    args: {
        children: (_jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Default Card" }), _jsx("p", { className: "text-muted-foreground", children: "This is a default HIVE card with standard styling." })] })),
    },
};
export const CoreVariants = {
    render: () => (_jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveCard, { variant: "default", children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Default" }), _jsx(HiveCardDescription, { children: "Standard HIVE card styling" })] }) }), _jsx(HiveCard, { variant: "elevated", children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Elevated" }), _jsx(HiveCardDescription, { children: "Enhanced shadow and elevation" })] }) }), _jsx(HiveCard, { variant: "minimal", children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Minimal" }), _jsx(HiveCardDescription, { children: "Clean transparent styling" })] }) }), _jsx(HiveCard, { variant: "gold-accent", children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Gold Accent" }), _jsx(HiveCardDescription, { children: "Premium gold border highlights" })] }) }), _jsx(HiveCard, { variant: "builder", children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Builder" }), _jsx(HiveCardDescription, { children: "For tool builders and creators" })] }) }), _jsx(HiveCard, { variant: "space", children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Space" }), _jsx(HiveCardDescription, { children: "Campus space containers" })] }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Core HIVE card variants showcasing the primary styling patterns for campus infrastructure'
            }
        }
    }
};
export const StructuredCard = {
    render: () => (_jsx("div", { className: "max-w-md", children: _jsxs(HiveCard, { variant: "elevated", children: [_jsxs(HiveCardHeader, { children: [_jsx(HiveCardTitle, { children: "Tool Creation Workshop" }), _jsx(HiveCardDescription, { children: "Learn how to build custom tools using HIVE's Element system" })] }), _jsx(HiveCardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Calendar, { className: "w-4 h-4 text-[var(--hive-text-secondary)]" }), _jsx("span", { children: "Tuesday, March 15th at 2:00 PM" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Users, { className: "w-4 h-4 text-[var(--hive-text-secondary)]" }), _jsx("span", { children: "24 attending \u2022 6 spots left" })] })] }) }), _jsxs(HiveCardFooter, { children: [_jsx(HiveButton, { className: "flex-1", children: "Register" }), _jsx(HiveButton, { variant: "outline", children: _jsx(Share, { className: "w-4 h-4" }) })] })] }) })),
    parameters: {
        docs: {
            description: {
                story: 'Structured card using HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardContent, and HiveCardFooter components'
            }
        }
    }
};
export const StatusVariants = {
    render: () => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveCard, { variant: "online", interactive: true, children: _jsxs(HiveCardContent, { children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-3 h-3 bg-[var(--hive-status-success)] rounded-full" }), _jsx(HiveCardTitle, { children: "Online" })] }), _jsx(HiveCardDescription, { children: "User is currently active in space" })] }) }), _jsx(HiveCard, { variant: "building", interactive: true, children: _jsxs(HiveCardContent, { children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(Zap, { className: "w-5 h-5 text-[var(--hive-status-info)]" }), _jsx(HiveCardTitle, { children: "Building" })] }), _jsx(HiveCardDescription, { children: "Currently working on a tool" })] }) }), _jsx(HiveCard, { variant: "studying", interactive: true, children: _jsxs(HiveCardContent, { children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(BookOpen, { className: "w-5 h-5 text-purple-400" }), _jsx(HiveCardTitle, { children: "Studying" })] }), _jsx(HiveCardDescription, { children: "In focus mode for deep work" })] }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Status card variants for user activity states and space engagement'
            }
        }
    }
};
export const InteractionVariants = {
    render: () => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveCard, { variant: "selectable", interactive: true, children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Selectable" }), _jsx(HiveCardDescription, { children: "Hover for selection preview" })] }) }), _jsx(HiveCard, { variant: "selected", children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Selected" }), _jsx(HiveCardDescription, { children: "Currently selected state" })] }) }), _jsx(HiveCard, { variant: "clickable", interactive: true, onClick: () => alert('Card clicked!'), children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Clickable" }), _jsx(HiveCardDescription, { children: "Click me for action" })] }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Interactive card variants for selection and action patterns'
            }
        }
    }
};
export const Interactive = {
    render: () => (_jsxs("div", { className: "grid grid-cols-2 gap-6 w-full max-w-4xl", children: [_jsx(HiveCard, { interactive: true, children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Interactive Card" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "This card has hover effects and is clickable." }), _jsx(HiveButton, { size: "sm", children: "Click me" })] }) }), _jsx(HiveCard, { variant: "glass", interactive: true, children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Interactive Glass" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Glass morphism with interactive effects." }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Action" })] }) })] })),
};
export const PostCard = {
    render: () => (_jsx(HiveCard, { interactive: true, className: "max-w-md", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center", children: _jsx(User, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium", children: "Sarah Chen" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Computer Science \u2022 2h ago" })] }), _jsxs(HiveBadge, { variant: "premium", size: "sm", children: [_jsx(Crown, { className: "w-3 h-3 mr-1" }), "Pro"] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "font-medium mb-2", children: "New Study Group Tool Available!" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Just built a collaborative study planner that syncs with your calendar. Perfect for organizing group study sessions and tracking progress." })] }), _jsxs("div", { className: "flex gap-2 mb-4", children: [_jsx(HiveBadge, { variant: "outline", size: "sm", children: "Study Tools" }), _jsx(HiveBadge, { variant: "outline", size: "sm", children: "Calendar" }), _jsx(HiveBadge, { variant: "outline", size: "sm", children: "Collaboration" })] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("button", { className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [_jsx(Heart, { className: "w-4 h-4" }), _jsx("span", { children: "24" })] }), _jsxs("button", { className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [_jsx(MessageCircle, { className: "w-4 h-4" }), _jsx("span", { children: "8" })] }), _jsxs("button", { className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [_jsx(Share, { className: "w-4 h-4" }), _jsx("span", { children: "Share" })] })] }), _jsx(HiveButton, { size: "sm", variant: "ghost", children: "Try Tool" })] })] }) })),
};
export const SpaceCard = {
    render: () => (_jsx(HiveCard, { variant: "elevated", interactive: true, className: "max-w-sm", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center", children: _jsx(BookOpen, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "CS Study Hub" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Computer Science" })] })] }), _jsx(HiveBadge, { variant: "success", size: "sm", children: "Active" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-medium", children: "156" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Members" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-medium", children: "23" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Tools" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-medium", children: "4.8" }), _jsxs("div", { className: "text-xs text-muted-foreground flex items-center justify-center gap-1", children: [_jsx(Star, { className: "w-3 h-3 fill-yellow-400 text-yellow-400" }), "Rating"] })] })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Collaborative space for CS students to share study materials, build tools, and connect with peers across all CS courses." }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { className: "flex-1", children: "Join Space" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: _jsx(Eye, { className: "w-4 h-4" }) })] })] }) })),
};
export const EventCard = {
    render: () => (_jsx(HiveCard, { variant: "glass", className: "max-w-md", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-1", children: "HiveLAB Workshop" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Tool Building Fundamentals" })] }), _jsx(HiveBadge, { variant: "warning", size: "sm", children: "Tomorrow" })] }), _jsxs("div", { className: "space-y-3 mb-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { children: "Tuesday, March 15th" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Clock, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { children: "2:00 PM - 4:00 PM EST" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(MapPin, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { children: "Engineering Building, Room 204" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Users, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { children: "24 attending \u2022 6 spots left" })] })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Learn the basics of creating tools in HIVE's LAB environment. We'll cover Element composition, testing, and deployment." }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { className: "flex-1", children: "Register" }), _jsx(HiveButton, { variant: "outline", children: _jsx(Share, { className: "w-4 h-4" }) })] })] }) })),
};
export const ToolCard = {
    render: () => (_jsx(HiveCard, { interactive: true, className: "max-w-sm", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center", children: _jsx(Zap, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium", children: "GPA Calculator Pro" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "by Alex Johnson" })] }), _jsx(HiveBadge, { variant: "premium", size: "sm", children: "Pro" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: "4.9" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Rating" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: "1.2k" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Uses" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: "v2.1" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Version" })] })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Advanced GPA calculator with semester tracking, grade predictions, and goal setting. Supports weighted grades and credit hours." }), _jsxs("div", { className: "flex gap-2 mb-4", children: [_jsx(HiveBadge, { variant: "outline", size: "sm", children: "Academic" }), _jsx(HiveBadge, { variant: "outline", size: "sm", children: "Calculator" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { className: "flex-1", children: "Use Tool" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: _jsx(Heart, { className: "w-4 h-4" }) })] })] }) })),
};
export const ComprehensiveShowcase = {
    render: () => (_jsxs("div", { className: "space-y-8 p-8 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "HIVE Card System" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Comprehensive card variants for campus infrastructure" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Platform Variants" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(HiveCard, { variant: "builder", interactive: true, magneticHover: true, children: _jsxs(HiveCardContent, { children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Zap, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsx(HiveCardTitle, { children: "Builder" })] }), _jsx(HiveCardDescription, { children: "For tool creators" })] }) }), _jsx(HiveCard, { variant: "space", interactive: true, children: _jsxs(HiveCardContent, { children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(BookOpen, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }), _jsx(HiveCardTitle, { children: "Space" })] }), _jsx(HiveCardDescription, { children: "Campus containers" })] }) }), _jsx(HiveCard, { variant: "tool", interactive: true, children: _jsxs(HiveCardContent, { children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Settings, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }), _jsx(HiveCardTitle, { children: "Tool" })] }), _jsx(HiveCardDescription, { children: "Student-built tools" })] }) }), _jsx(HiveCard, { variant: "student", interactive: true, children: _jsxs(HiveCardContent, { children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(User, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }), _jsx(HiveCardTitle, { children: "Student" })] }), _jsx(HiveCardDescription, { children: "Profile cards" })] }) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Premium Gold Variants" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(HiveCard, { variant: "gold-accent", interactive: true, magneticHover: true, children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Gold Accent" }), _jsx(HiveCardDescription, { children: "Subtle gold highlights" })] }) }), _jsx(HiveCard, { variant: "gold-featured", interactive: true, magneticHover: true, children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Gold Featured" }), _jsx(HiveCardDescription, { children: "Featured content styling" })] }) }), _jsx(HiveCard, { variant: "gold-premium", interactive: true, magneticHover: true, children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Gold Premium" }), _jsx(HiveCardDescription, { children: "Maximum premium styling" })] }) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Content Variants" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(HiveCard, { variant: "post", interactive: true, children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Post" }), _jsx(HiveCardDescription, { children: "Social feed posts" })] }) }), _jsx(HiveCard, { variant: "announcement", children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Announcement" }), _jsx(HiveCardDescription, { children: "Important notices" })] }) }), _jsx(HiveCard, { variant: "featured-post", interactive: true, children: _jsxs(HiveCardContent, { children: [_jsx(HiveCardTitle, { children: "Featured Post" }), _jsx(HiveCardDescription, { children: "Highlighted content" })] }) })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive showcase of all HIVE card variants demonstrating the full system capabilities for campus infrastructure'
            }
        }
    }
};
// Re-export for migration compatibility
export { HiveCard as Card } from '../../components/hive-card';
//# sourceMappingURL=hive-card.stories.js.map