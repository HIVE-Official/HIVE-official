"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, BookOpen, Lightbulb, Zap, Users, Puzzle, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card.js';
import { Button } from '../../hive-button.js';
import { Badge } from '../../ui/badge.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs.js';
import { cn } from '../../../lib/utils.js';
// Foundation features available
const FOUNDATION_FEATURES = [
    {
        id: 'element-explorer',
        title: 'Element Explorer',
        description: 'Discover the building blocks that power the Event System',
        icon: Puzzle,
        status: 'available',
        learnMoreUrl: '/docs/elements'
    },
    {
        id: 'tutorials',
        title: 'Creation Tutorials',
        description: 'Learn how professional tools like Event Creator are built',
        icon: BookOpen,
        status: 'available',
        learnMoreUrl: '/docs/tutorials'
    },
    {
        id: 'inspiration',
        title: 'Tool Inspiration',
        description: 'Explore ideas for future campus productivity tools',
        icon: Lightbulb,
        status: 'available',
        learnMoreUrl: '/docs/inspiration'
    },
    {
        id: 'community',
        title: 'Builder Community',
        description: 'Connect with other students creating amazing tools',
        icon: Users,
        status: 'coming_soon',
        learnMoreUrl: '/community'
    }
];
// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1
        }
    }
};
const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};
export const HiveLabWorkspace = ({ isFoundationMode = true, onCreateTool, onLearnMore, className }) => {
    const [activeTab, setActiveTab] = useState('explore');
    return (_jsxs(motion.div, { className: cn("hive-lab-workspace space-y-6", className), variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "bg-gradient-to-br from-[var(--hive-status-info)]/10 to-[var(--hive-status-info)]/5 border-[var(--hive-status-info)]/20", children: _jsx(CardHeader, { children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center space-x-3 mb-4", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-status-info)] rounded-2xl flex items-center justify-center", children: _jsx(Code2, { className: "h-8 w-8 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "HiveLAB" }), _jsx("p", { className: "text-sm text-gray-600", children: "Foundation Workspace" })] })] }), isFoundationMode && (_jsxs("div", { className: "bg-[var(--hive-status-info)]/10 border border-[var(--hive-status-info)]/20 rounded-lg p-4 mb-4", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2 mb-2", children: [_jsx(Rocket, { className: "h-5 w-5 text-[var(--hive-status-info)]" }), _jsx("span", { className: "font-semibold text-[var(--hive-status-info)]", children: "Foundation Mode" })] }), _jsx("p", { className: "text-sm text-gray-700", children: "Explore tool creation concepts and learn from the Event System's architecture. Full tool building capabilities coming soon!" })] })), _jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Learn how HIVE tools are built and discover the future of campus productivity" })] }) }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Zap, { className: "h-5 w-5 text-[var(--hive-status-info)]" }), _jsx("span", { children: "Foundation Features" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: FOUNDATION_FEATURES.map(feature => {
                                    const IconComponent = feature.icon;
                                    return (_jsx(Card, { className: cn("transition-all duration-200 hover:shadow-md", feature.status === 'available'
                                            ? "cursor-pointer hover:border-[var(--hive-status-info)]/50"
                                            : "opacity-60"), onClick: () => feature.status === 'available' && onLearnMore?.(), children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center", style: {
                                                            backgroundColor: feature.status === 'available' ? 'var(--hive-status-info)20' : 'var(--hive-text-disabled)20',
                                                            color: feature.status === 'available' ? 'var(--hive-status-info)' : 'var(--hive-text-disabled)'
                                                        }, children: _jsx(IconComponent, { className: "h-6 w-6" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "font-semibold", children: feature.title }), _jsx(Badge, { variant: feature.status === 'available' ? 'default' : 'secondary', className: "text-xs", children: feature.status === 'available' ? 'Available' : 'Coming Soon' })] }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: feature.description }), feature.status === 'available' && (_jsxs(Button, { size: "sm", variant: "outline", className: "border-[var(--hive-status-info)] text-[var(--hive-status-info)] hover:bg-[var(--hive-status-info)]/10", children: [_jsx(BookOpen, { className: "h-4 w-4 mr-2" }), "Explore"] }))] })] }) }) }, feature.id));
                                }) }) })] }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Learn Tool Creation" }) }), _jsx(CardContent, { children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "explore", children: "Explore" }), _jsx(TabsTrigger, { value: "learn", children: "Learn" }), _jsx(TabsTrigger, { value: "roadmap", children: "Roadmap" })] }), _jsx(TabsContent, { value: "explore", className: "space-y-4", children: _jsxs("div", { className: "bg-gradient-to-r from-[var(--hive-status-warning)]/10 to-[var(--hive-status-warning)]/5 border border-[var(--hive-status-warning)]/20 rounded-lg p-6", children: [_jsxs("h3", { className: "font-semibold text-lg mb-3 flex items-center space-x-2", children: [_jsx(Puzzle, { className: "h-5 w-5 text-[var(--hive-status-warning)]" }), _jsx("span", { children: "Event System Architecture" })] }), _jsx("p", { className: "text-gray-700 mb-4", children: "Discover how the Event Management System is built using HIVE's Element Library. Learn about component composition, data flow, and integration patterns." }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: [
                                                        'Form Elements',
                                                        'Calendar Elements',
                                                        'Notification Elements',
                                                        'Data Elements',
                                                        'UI Elements',
                                                        'Integration Elements'
                                                    ].map(element => (_jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg p-3 border border-gray-200", children: [_jsx("div", { className: "text-sm font-medium", children: element }), _jsx("div", { className: "text-xs text-gray-500", children: "Used in Event System" })] }, element))) })] }) }), _jsx(TabsContent, { value: "learn", className: "space-y-4", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "border rounded-lg p-4", children: [_jsx("h4", { className: "font-semibold mb-2", children: "\uD83D\uDCDA Understanding Elements" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Learn how Elements are the building blocks of all HIVE tools" }), _jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(BookOpen, { className: "h-4 w-4 mr-2" }), "Read Guide"] })] }), _jsxs("div", { className: "border rounded-lg p-4", children: [_jsx("h4", { className: "font-semibold mb-2", children: "\uD83C\uDFAF Event System Case Study" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Deep dive into how the Event Management System was architected" }), _jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Play, { className: "h-4 w-4 mr-2" }), "Watch Tutorial"] })] }), _jsxs("div", { className: "border rounded-lg p-4", children: [_jsx("h4", { className: "font-semibold mb-2", children: "\uD83D\uDCA1 Tool Ideas Workshop" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Brainstorm and plan your own campus productivity tools" }), _jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Lightbulb, { className: "h-4 w-4 mr-2" }), "Start Workshop"] })] })] }) }), _jsx(TabsContent, { value: "roadmap", className: "space-y-4", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-semibold text-lg", children: "HiveLAB Development Roadmap" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-green-800", children: "Phase 1: Foundation" }), _jsx("div", { className: "text-sm text-green-700", children: "Element exploration and learning resources" })] }), _jsx("div", { className: "ml-auto", children: _jsx(Badge, { className: "bg-green-500", children: "Current" }) })] }), _jsxs("div", { className: "flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-blue-800", children: "Phase 2: Basic Builder" }), _jsx("div", { className: "text-sm text-blue-700", children: "Simple tool creation with guided templates" })] }), _jsx("div", { className: "ml-auto", children: _jsx(Badge, { variant: "outline", className: "border-blue-500 text-blue-700", children: "Q2 2025" }) })] }), _jsxs("div", { className: "flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200", children: [_jsx("div", { className: "w-2 h-2 bg-purple-500 rounded-full" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-purple-800", children: "Phase 3: Advanced Tools" }), _jsx("div", { className: "text-sm text-purple-700", children: "Full drag-and-drop builder with custom elements" })] }), _jsx("div", { className: "ml-auto", children: _jsx(Badge, { variant: "outline", className: "border-purple-500 text-purple-700", children: "Q3 2025" }) })] }), _jsxs("div", { className: "flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200", children: [_jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-gray-800", children: "Phase 4: Marketplace" }), _jsx("div", { className: "text-sm text-gray-700", children: "Student tool publishing and sharing platform" })] }), _jsx("div", { className: "ml-auto", children: _jsx(Badge, { variant: "outline", className: "border-gray-400 text-gray-700", children: "Q4 2025" }) })] })] })] }) })] }) })] }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "bg-gradient-to-r from-[var(--hive-status-info)]/5 to-[var(--hive-status-info)]/3 border-[var(--hive-status-info)]/20", children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Ready to Build the Future?" }), _jsx("p", { className: "text-gray-600 mb-6 max-w-md mx-auto", children: "Start exploring tool creation concepts and join the community of student builders shaping campus productivity." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs(Button, { onClick: onLearnMore, className: "bg-[var(--hive-status-info)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-status-info)]", children: [_jsx(BookOpen, { className: "h-4 w-4 mr-2" }), "Start Learning"] }), _jsxs(Button, { variant: "outline", className: "border-[var(--hive-status-info)] text-[var(--hive-status-info)] hover:bg-[var(--hive-status-info)]/10", children: [_jsx(Users, { className: "h-4 w-4 mr-2" }), "Join Community"] })] })] }) }) })] }));
};
export default HiveLabWorkspace;
//# sourceMappingURL=HiveLabWorkspace.js.map