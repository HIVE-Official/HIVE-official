"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Input } from '../atoms';
import { Card } from '../molecules';
import { Compass, Users, BookOpen, Code, Palette, Dumbbell, Briefcase, Search, CheckCircle, Star, MapPin, Calendar, TrendingUp, UserPlus, Filter } from 'lucide-react';
// Mock space data based on user interests
const generateSpaceRecommendations = (interests = [], goals = []) => {
    const allSpaces = [
        {
            id: 'cs_study_group',
            name: 'CS Study Circle',
            description: 'Collaborative study sessions for computer science courses. Weekly algorithm practice and project help.',
            category: 'Academic',
            memberCount: 247,
            weeklyActivity: 89,
            isRecommended: true,
            matchScore: 95,
            tags: ['Study Groups', 'Coding', 'Academic'],
            recentActivity: 'Discussing midterm prep strategies',
            nextEvent: {
                title: 'Data Structures Review',
                date: '2024-08-15'
            }
        },
        {
            id: 'ub_hackers',
            name: 'UB Hackers',
            description: 'Build projects, learn new technologies, and connect with fellow developers.',
            category: 'Technology',
            memberCount: 189,
            weeklyActivity: 76,
            isRecommended: true,
            matchScore: 88,
            tags: ['Coding', 'AI/ML', 'Web Development'],
            recentActivity: 'Planning hackathon participation',
            nextEvent: {
                title: 'React Workshop',
                date: '2024-08-17'
            }
        },
        {
            id: 'pre_med_society',
            name: 'Pre-Med Society',
            description: 'Support network for pre-medical students. MCAT prep, volunteering opportunities, and mentorship.',
            category: 'Academic',
            memberCount: 312,
            weeklyActivity: 92,
            isRecommended: false,
            matchScore: 45,
            tags: ['Academic Clubs', 'Research', 'Career Development'],
            recentActivity: 'Sharing internship opportunities'
        },
        {
            id: 'design_collective',
            name: 'Design Collective',
            description: 'Creative space for designers, artists, and visual storytellers to collaborate and showcase work.',
            category: 'Creative',
            memberCount: 156,
            weeklyActivity: 67,
            isRecommended: false,
            matchScore: 72,
            tags: ['Design', 'Art', 'Photography'],
            recentActivity: 'Portfolio review session scheduled'
        },
        {
            id: 'intramural_basketball',
            name: 'Intramural Basketball',
            description: 'Competitive and recreational basketball leagues. All skill levels welcome.',
            category: 'Sports',
            memberCount: 423,
            weeklyActivity: 134,
            isRecommended: false,
            matchScore: 38,
            tags: ['Intramural Sports', 'Fitness', 'Social'],
            recentActivity: 'Season registration now open'
        },
        {
            id: 'entrepreneurship_hub',
            name: 'Entrepreneurship Hub',
            description: 'For aspiring entrepreneurs and business minds. Pitch practice, networking, and startup resources.',
            category: 'Professional',
            memberCount: 198,
            weeklyActivity: 58,
            isRecommended: true,
            matchScore: 82,
            tags: ['Entrepreneurship', 'Business', 'Networking'],
            recentActivity: 'Investor meet-and-greet planned'
        },
        {
            id: 'music_production',
            name: 'Music Production Club',
            description: 'Learn music production, share beats, and collaborate on musical projects.',
            category: 'Creative',
            memberCount: 89,
            weeklyActivity: 43,
            isRecommended: false,
            matchScore: 61,
            tags: ['Music', 'Creative Expression', 'Art'],
            recentActivity: 'Beat battle competition announced'
        },
        {
            id: 'research_opportunities',
            name: 'Undergraduate Research',
            description: 'Connect with faculty research opportunities across all disciplines.',
            category: 'Academic',
            memberCount: 267,
            weeklyActivity: 71,
            isRecommended: true,
            matchScore: 79,
            tags: ['Research', 'Academic Excellence', 'Career Development'],
            recentActivity: 'New lab positions posted'
        }
    ];
    // Score spaces based on user interests and goals
    return allSpaces.map(space => {
        let score = space.matchScore;
        // Boost score based on interest matches
        const interestMatches = space.tags.filter(tag => interests.some(interest => interest.toLowerCase().includes(tag.toLowerCase()) ||
            tag.toLowerCase().includes(interest.toLowerCase()))).length;
        score += interestMatches * 15;
        // Boost score based on goal matches
        const goalMatches = space.tags.filter(tag => goals.some(goal => goal.toLowerCase().includes(tag.toLowerCase()) ||
            tag.toLowerCase().includes(goal.toLowerCase()))).length;
        score += goalMatches * 20;
        return {
            ...space,
            matchScore: Math.min(100, score),
            isRecommended: score > 75
        };
    }).sort((a, b) => b.matchScore - a.matchScore);
};
const getCategoryIcon = (category) => {
    switch (category) {
        case 'Academic': return BookOpen;
        case 'Technology': return Code;
        case 'Creative': return Palette;
        case 'Sports': return Dumbbell;
        case 'Professional': return Briefcase;
        default: return Users;
    }
};
const SpaceExplorationStep = ({ onComplete, userInterests, userGoals }) => {
    const [spaces] = useState(() => generateSpaceRecommendations(userInterests, userGoals));
    const [selectedSpaces, setSelectedSpaces] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const categories = ['all', 'Academic', 'Technology', 'Creative', 'Sports', 'Professional'];
    const filteredSpaces = spaces.filter(space => {
        const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = categoryFilter === 'all' || space.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    const recommendedSpaces = filteredSpaces.filter(space => space.isRecommended);
    const otherSpaces = filteredSpaces.filter(space => !space.isRecommended);
    const toggleSpace = (spaceId) => {
        setSelectedSpaces(prev => prev.includes(spaceId)
            ? prev.filter(id => id !== spaceId)
            : [...prev, spaceId]);
    };
    const isValid = selectedSpaces.length >= 3;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-hive-brand-secondary to-purple-500 rounded-full flex items-center justify-center", children: _jsx(Compass, { className: "h-10 w-10 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-hive-text-primary mb-2", children: "Discover Your Communities" }), _jsx("p", { className: "text-hive-text-secondary", children: "Join at least 3 spaces to build your campus network" })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hive-text-secondary" }), _jsx(Input, { value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search spaces...", className: "pl-10" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Filter, { className: "h-4 w-4 text-hive-text-secondary" }), _jsx("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "p-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary", children: categories.map(category => (_jsx("option", { value: category, children: category === 'all' ? 'All Categories' : category }, category))) })] })] }), recommendedSpaces.length > 0 && (_jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [_jsx(Star, { className: "h-5 w-5 text-hive-gold" }), _jsx("h4", { className: "text-lg font-semibold text-hive-text-primary", children: "Recommended for You" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: recommendedSpaces.map(space => {
                            const IconComponent = getCategoryIcon(space.category);
                            const isSelected = selectedSpaces.includes(space.id);
                            return (_jsxs(Card, { className: `p-4 cursor-pointer transition-all hover:shadow-lg ${isSelected
                                    ? 'bg-hive-gold/10 border-hive-gold ring-2 ring-hive-gold/20'
                                    : 'hover:border-hive-gold/50'}`, onClick: () => toggleSpace(space.id), children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-12 h-12 rounded-lg flex items-center justify-center ${isSelected ? 'bg-hive-gold' : 'bg-hive-brand-secondary'}`, children: _jsx(IconComponent, { className: `h-6 w-6 ${isSelected ? 'text-hive-obsidian' : 'text-white'}` }) }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold text-hive-text-primary", children: space.name }), _jsxs("div", { className: "flex items-center space-x-2 text-sm text-hive-text-secondary", children: [_jsx(Users, { className: "h-3 w-3" }), _jsx("span", { children: space.memberCount }), _jsx(TrendingUp, { className: "h-3 w-3 ml-2" }), _jsxs("span", { children: [space.matchScore, "% match"] })] })] })] }), isSelected && (_jsx(CheckCircle, { className: "h-5 w-5 text-hive-gold" }))] }), _jsx("p", { className: "text-sm text-hive-text-secondary mb-3 line-clamp-2", children: space.description }), _jsx("div", { className: "flex flex-wrap gap-1 mb-3", children: space.tags.slice(0, 3).map(tag => (_jsx("span", { className: "px-2 py-1 bg-hive-surface-elevated text-xs rounded-full text-hive-text-secondary", children: tag }, tag))) }), space.nextEvent && (_jsxs("div", { className: "flex items-center space-x-2 text-xs text-hive-brand-secondary", children: [_jsx(Calendar, { className: "h-3 w-3" }), _jsx("span", { children: space.nextEvent.title })] }))] }, space.id));
                        }) })] })), otherSpaces.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "More Spaces" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: otherSpaces.map(space => {
                            const IconComponent = getCategoryIcon(space.category);
                            const isSelected = selectedSpaces.includes(space.id);
                            return (_jsxs(Card, { className: `p-4 cursor-pointer transition-all hover:shadow-lg ${isSelected
                                    ? 'bg-hive-gold/10 border-hive-gold ring-2 ring-hive-gold/20'
                                    : 'hover:border-hive-gold/50'}`, onClick: () => toggleSpace(space.id), children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'bg-hive-gold' : 'bg-hive-surface-elevated'}`, children: _jsx(IconComponent, { className: `h-5 w-5 ${isSelected ? 'text-hive-obsidian' : 'text-hive-text-secondary'}` }) }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold text-hive-text-primary", children: space.name }), _jsxs("div", { className: "flex items-center space-x-2 text-sm text-hive-text-secondary", children: [_jsx(Users, { className: "h-3 w-3" }), _jsx("span", { children: space.memberCount })] })] })] }), isSelected && (_jsx(CheckCircle, { className: "h-5 w-5 text-hive-gold" }))] }), _jsx("p", { className: "text-xs text-hive-text-secondary mb-2 line-clamp-2", children: space.description }), _jsx("div", { className: "flex flex-wrap gap-1", children: space.tags.slice(0, 2).map(tag => (_jsx("span", { className: "px-2 py-1 bg-hive-surface-elevated text-xs rounded-full text-hive-text-secondary", children: tag }, tag))) })] }, space.id));
                        }) })] })), _jsxs("div", { className: "bg-hive-surface-elevated p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Selected spaces:" }), _jsxs("span", { className: `font-semibold ${isValid ? 'text-hive-gold' : 'text-hive-text-secondary'}`, children: [selectedSpaces.length, "/3+ required"] })] }), selectedSpaces.length > 0 && (_jsxs("div", { className: "text-sm text-hive-text-secondary", children: ["You'll join: ", selectedSpaces.map(id => spaces.find(s => s.id === id)?.name).join(', ')] }))] }), _jsxs(Button, { onClick: () => onComplete({ selectedSpaces }), disabled: !isValid, className: "w-full bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90", children: ["Join Selected Spaces", _jsx(UserPlus, { className: "h-4 w-4 ml-2" })] })] }));
};
export function RitualDiscoverWorkflow({ currentStep = 0, onStepComplete, onRitualComplete, userInterests = [], userGoals = [], className = '' }) {
    const [isComplete, setIsComplete] = useState(false);
    const [joinedSpaces, setJoinedSpaces] = useState([]);
    const handleStepComplete = (data) => {
        setJoinedSpaces(data.selectedSpaces);
        onStepComplete?.('space_discovery', data);
        setIsComplete(true);
        onRitualComplete?.();
    };
    if (isComplete) {
        return (_jsx("div", { className: `space-y-8 ${className}`, children: _jsxs(Card, { className: "p-8 text-center bg-gradient-to-br from-hive-brand-secondary/10 to-purple-500/10 border-hive-brand-secondary/30", children: [_jsx("div", { className: "w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-hive-brand-secondary to-purple-500 rounded-full flex items-center justify-center", children: _jsx(CheckCircle, { className: "h-12 w-12 text-white" }) }), _jsx("h2", { className: "text-3xl font-bold text-hive-text-primary mb-4", children: "Discover Ritual Complete!" }), _jsxs("p", { className: "text-hive-text-secondary text-lg mb-6", children: ["Welcome to your new communities! You've joined ", joinedSpaces.length, " spaces that match your interests and goals. Your My Spaces Widget is now populated and ready for campus launch."] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "p-4 bg-hive-surface-elevated rounded-lg", children: [_jsx(Users, { className: "h-8 w-8 mx-auto mb-2 text-hive-brand-secondary" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Communities Joined" }), _jsxs("p", { className: "text-sm text-hive-text-secondary", children: [joinedSpaces.length, " active spaces"] })] }), _jsxs("div", { className: "p-4 bg-hive-surface-elevated rounded-lg", children: [_jsx(MapPin, { className: "h-8 w-8 mx-auto mb-2 text-purple-400" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Campus Network" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Ready for connections" })] }), _jsxs("div", { className: "p-4 bg-hive-surface-elevated rounded-lg", children: [_jsx(Calendar, { className: "h-8 w-8 mx-auto mb-2 text-green-400" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Events Access" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Space events unlocked" })] })] }), _jsxs("div", { className: "flex items-center justify-center space-x-2 text-hive-brand-secondary", children: [_jsx(UserPlus, { className: "h-5 w-5" }), _jsx("span", { className: "font-medium", children: "Ready for Week 3: Connect with Friends" })] })] }) }));
    }
    return (_jsxs("div", { className: `space-y-8 ${className}`, children: [_jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-hive-text-primary", children: "Discover Ritual" }), _jsx("p", { className: "text-hive-text-secondary", children: "Week 2 \u2022 Find your communities" })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "flex items-center space-x-2 text-hive-text-secondary text-sm", children: [_jsx(Compass, { className: "h-4 w-4" }), _jsx("span", { children: "Based on your interests" })] }) })] }) }), _jsx(Card, { className: "p-8", children: _jsx(SpaceExplorationStep, { onComplete: handleStepComplete, userInterests: userInterests, userGoals: userGoals }) })] }));
}
//# sourceMappingURL=ritual-discover-workflow.js.map