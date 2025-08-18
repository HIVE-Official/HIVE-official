"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Plus, CheckCircle, Search } from 'lucide-react';
import { Button } from '../button';
import { Card, CardContent } from '../card';
import { Input } from '../input';
import { Alert } from '../alert';
import { cn } from '../lib/utils';
const DEMO_SPACES = [
    // Academic
    {
        id: 'cs-study-group',
        name: 'CS Study Group',
        description: 'Weekly study sessions for computer science courses',
        type: 'academic',
        memberCount: 47,
        isActive: true,
        category: 'Computer Science',
        isSuggested: true
    },
    {
        id: 'math-tutoring',
        name: 'Math Tutoring Hub',
        description: 'Peer tutoring for all mathematics courses',
        type: 'academic',
        memberCount: 89,
        isActive: true,
        category: 'Mathematics',
        isSuggested: true
    },
    {
        id: 'engineering-lounge',
        name: 'Engineering Lounge',
        description: 'General space for all engineering students',
        type: 'academic',
        memberCount: 234,
        isActive: true,
        category: 'Engineering'
    },
    // Dorms
    {
        id: 'freshman-dorms',
        name: 'Freshman Dorms',
        description: 'Connect with students in freshman housing',
        type: 'dorm',
        memberCount: 156,
        isActive: true,
        category: 'Housing'
    },
    {
        id: 'west-campus',
        name: 'West Campus',
        description: 'Students living in west campus area',
        type: 'dorm',
        memberCount: 203,
        isActive: true,
        category: 'Housing'
    },
    // Clubs
    {
        id: 'photography-club',
        name: 'Photography Club',
        description: 'Campus photography enthusiasts and workshops',
        type: 'club',
        memberCount: 67,
        isActive: true,
        category: 'Creative',
        isSuggested: true
    },
    {
        id: 'fitness-group',
        name: 'Campus Fitness Group',
        description: 'Workout buddies and fitness challenges',
        type: 'club',
        memberCount: 123,
        isActive: true,
        category: 'Fitness'
    },
    {
        id: 'game-dev',
        name: 'Game Development Club',
        description: 'Building games and learning together',
        type: 'club',
        memberCount: 34,
        isActive: true,
        category: 'Technology'
    }
];
const SPACE_TYPE_LABELS = {
    academic: 'Academic',
    dorm: 'Housing',
    club: 'Clubs & Organizations',
    interest: 'Interest Groups'
};
export const SpacesDiscoveryStep = ({ onSpacesChange, onContinue, selectedSpaces = [], userInterests = [], userRole = '', className }) => {
    const [localSelectedSpaces, setLocalSelectedSpaces] = useState(selectedSpaces);
    const [searchQuery, setSearchQuery] = useState('');
    // Filter and organize spaces
    const filteredSpaces = DEMO_SPACES.filter(space => space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const suggestedSpaces = filteredSpaces.filter(space => space.isSuggested);
    const otherSpaces = filteredSpaces.filter(space => !space.isSuggested);
    const handleSpaceToggle = (spaceId) => {
        const newSpaces = localSelectedSpaces.includes(spaceId)
            ? localSelectedSpaces.filter(id => id !== spaceId)
            : [...localSelectedSpaces, spaceId];
        setLocalSelectedSpaces(newSpaces);
        onSpacesChange(newSpaces);
    };
    const canContinue = localSelectedSpaces.length >= 2;
    const SpaceCard = ({ space }) => {
        const isSelected = localSelectedSpaces.includes(space.id);
        return (_jsx(Card, { variant: isSelected ? "accent" : "interactive", padding: "md", className: "cursor-pointer transition-all duration-200 hover:scale-[1.02]", onClick: () => handleSpaceToggle(space.id), children: _jsx(CardContent, { className: "p-4", children: _jsx("div", { className: "flex items-start justify-between mb-3", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-white", children: space.name }), isSelected && _jsx(CheckCircle, { className: "w-4 h-4 text-accent" })] }), _jsx("p", { className: "text-sm text-muted leading-relaxed mb-2", children: space.description }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-muted", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [space.memberCount, " members"] })] }), _jsx("span", { className: "text-accent", children: space.category })] })] }) }) }) }));
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("w-full max-w-3xl mx-auto", className), children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-3", children: "Discover spaces" }), _jsx("p", { className: "text-lg text-muted", children: "Join at least 2 spaces to start connecting with your campus community" }), _jsxs("div", { className: "mt-2 text-sm text-muted", children: [localSelectedSpaces.length, "/2+ selected"] })] }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" }), _jsx(Input, { type: "text", placeholder: "Search spaces...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10", variant: "search" })] }), suggestedSpaces.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Star, { className: "w-5 h-5 text-accent" }), _jsx("h2", { className: "text-lg font-semibold text-white", children: "Suggested for you" })] }), _jsx(Alert, { variant: "info", children: _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Personalized recommendations" }), _jsx("p", { className: "text-sm", children: "Based on your interests and role, these spaces might be a great fit." })] }) }), _jsx("div", { className: "grid gap-4", children: suggestedSpaces.map((space, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(SpaceCard, { space: space }) }, space.id))) })] })), otherSpaces.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: "All spaces" }), _jsx("div", { className: "grid gap-3", children: otherSpaces.map((space, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: (suggestedSpaces.length + index) * 0.05 }, children: _jsx(SpaceCard, { space: space }) }, space.id))) })] })), filteredSpaces.length === 0 && searchQuery && (_jsxs("div", { className: "text-center py-8", children: [_jsxs("div", { className: "text-muted mb-4", children: ["No spaces found matching \"", searchQuery, "\""] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Request new space"] })] })), _jsxs("div", { className: "flex flex-col items-center gap-4 pt-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: cn("text-sm font-medium mb-2", canContinue ? "text-accent" : "text-muted"), children: canContinue
                                            ? "Perfect! You're ready to join your campus community"
                                            : `Select ${2 - localSelectedSpaces.length} more space${2 - localSelectedSpaces.length === 1 ? '' : 's'} to continue` }), canContinue && (_jsx("div", { className: "text-xs text-muted", children: "You can discover and join more spaces anytime" }))] }), _jsx(Button, { variant: "primary", size: "lg", onClick: onContinue, disabled: !canContinue, className: "min-w-[140px]", children: "Continue" })] }), _jsx("div", { className: "text-center text-sm text-muted border-t border-border pt-4", children: "Spaces are where your campus community gathers to share resources, coordinate events, and build connections." })] })] }));
};
//# sourceMappingURL=spaces-discovery-step.js.map