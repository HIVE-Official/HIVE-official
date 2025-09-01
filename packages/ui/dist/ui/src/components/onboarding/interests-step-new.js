"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, Calculator, FlaskConical, Globe, Music, Camera, Gamepad2, Dumbbell, Coffee, BookOpen, Users, Plus, X } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Card, CardContent } from '../card.js';
import { Input } from '../../atomic/atoms/input-enhanced.js';
import { cn } from '../../lib/utils.js';
const PREDEFINED_INTERESTS = [
    // Academic
    { id: 'computer-science', name: 'Computer Science', icon: _jsx(Code, { className: "w-4 h-4" }), category: 'academic' },
    { id: 'mathematics', name: 'Mathematics', icon: _jsx(Calculator, { className: "w-4 h-4" }), category: 'academic' },
    { id: 'science', name: 'Science & Research', icon: _jsx(FlaskConical, { className: "w-4 h-4" }), category: 'academic' },
    { id: 'languages', name: 'Languages', icon: _jsx(Globe, { className: "w-4 h-4" }), category: 'academic' },
    { id: 'literature', name: 'Literature', icon: _jsx(BookOpen, { className: "w-4 h-4" }), category: 'academic' },
    // Creative
    { id: 'design', name: 'Design & Art', icon: _jsx(Palette, { className: "w-4 h-4" }), category: 'creative' },
    { id: 'music', name: 'Music', icon: _jsx(Music, { className: "w-4 h-4" }), category: 'creative' },
    { id: 'photography', name: 'Photography', icon: _jsx(Camera, { className: "w-4 h-4" }), category: 'creative' },
    // Social
    { id: 'gaming', name: 'Gaming', icon: _jsx(Gamepad2, { className: "w-4 h-4" }), category: 'social' },
    { id: 'community', name: 'Community Service', icon: _jsx(Users, { className: "w-4 h-4" }), category: 'social' },
    // Lifestyle
    { id: 'fitness', name: 'Fitness & Sports', icon: _jsx(Dumbbell, { className: "w-4 h-4" }), category: 'lifestyle' },
    { id: 'food', name: 'Food & Cooking', icon: _jsx(Coffee, { className: "w-4 h-4" }), category: 'lifestyle' }
];
const CATEGORY_LABELS = {
    academic: 'Academic',
    creative: 'Creative',
    social: 'Social',
    lifestyle: 'Lifestyle'
};
export const InterestsStepNew = ({ onInterestsChange, onContinue, selectedInterests = [], className }) => {
    const [localSelectedInterests, setLocalSelectedInterests] = useState(selectedInterests);
    const [customInterest, setCustomInterest] = useState('');
    const [customInterests, setCustomInterests] = useState([]);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const handleInterestToggle = (interestId) => {
        const newInterests = localSelectedInterests.includes(interestId)
            ? localSelectedInterests.filter(id => id !== interestId)
            : [...localSelectedInterests, interestId];
        setLocalSelectedInterests(newInterests);
        onInterestsChange([...newInterests, ...customInterests]);
    };
    const handleAddCustomInterest = () => {
        if (customInterest.trim() && !customInterests.includes(customInterest.trim())) {
            const newCustomInterests = [...customInterests, customInterest.trim()];
            setCustomInterests(newCustomInterests);
            setCustomInterest('');
            setShowCustomInput(false);
            onInterestsChange([...localSelectedInterests, ...newCustomInterests]);
        }
    };
    const handleRemoveCustomInterest = (interest) => {
        const newCustomInterests = customInterests.filter(i => i !== interest);
        setCustomInterests(newCustomInterests);
        onInterestsChange([...localSelectedInterests, ...newCustomInterests]);
    };
    const allSelectedInterests = [...localSelectedInterests, ...customInterests];
    const canContinue = allSelectedInterests.length >= 3;
    const categorizedInterests = PREDEFINED_INTERESTS.reduce((acc, interest) => {
        if (!acc[interest.category]) {
            acc[interest.category] = [];
        }
        acc[interest.category].push(interest);
        return acc;
    }, {});
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("w-full max-w-3xl mx-auto", className), children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-inverse)] mb-3", children: "What are you interested in?" }), _jsx("p", { className: "text-lg text-muted", children: "Select at least 3 interests to help us recommend relevant spaces and content" }), _jsxs("div", { className: "mt-2 text-sm text-muted", children: [allSelectedInterests.length, "/3+ selected"] })] }), _jsxs("div", { className: "space-y-8", children: [Object.entries(categorizedInterests).map(([category, interests]) => (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-inverse)]", children: CATEGORY_LABELS[category] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: interests.map((interest, index) => (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.05 }, children: _jsx(Card, { variant: localSelectedInterests.includes(interest.id) ? "accent" : "interactive", padding: "sm", className: "cursor-pointer transition-all duration-200 hover:scale-105", onClick: () => handleInterestToggle(interest.id), children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("p-2 rounded-lg", localSelectedInterests.includes(interest.id)
                                                            ? "bg-accent/20 text-accent"
                                                            : "bg-surface text-[var(--hive-text-inverse)]"), children: interest.icon }), _jsx("div", { className: "flex-1 min-w-0", children: _jsx("h3", { className: "font-medium text-[var(--hive-text-inverse)] text-sm truncate", children: interest.name }) })] }) }) }) }, interest.id))) })] }, category))), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-inverse)]", children: "Custom Interests" }), !showCustomInput && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: () => setShowCustomInput(true), children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Custom"] }))] }), _jsx(AnimatePresence, { children: showCustomInput && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "flex gap-2", children: [_jsx(Input, { type: "text", placeholder: "Enter custom interest...", value: customInterest, onChange: (e) => setCustomInterest(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleAddCustomInterest(), className: "flex-1" }), _jsx(Button, { variant: "primary", size: "sm", onClick: handleAddCustomInterest, disabled: !customInterest.trim(), children: "Add" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                                setShowCustomInput(false);
                                                setCustomInterest('');
                                            }, children: "Cancel" })] })) }), customInterests.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: customInterests.map((interest) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "flex items-center gap-2 bg-accent/20 text-accent px-3 py-2 rounded-lg text-sm", children: [_jsx("span", { children: interest }), _jsx("button", { onClick: () => handleRemoveCustomInterest(interest), className: "hover:bg-accent/30 rounded p-0.5 transition-colors", children: _jsx(X, { className: "w-3 h-3" }) })] }, interest))) }))] }), _jsxs("div", { className: "flex flex-col items-center gap-4 pt-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: cn("text-sm font-medium mb-2", canContinue ? "text-accent" : "text-muted"), children: canContinue
                                            ? "Great! You've selected enough interests"
                                            : `Select ${3 - allSelectedInterests.length} more interest${3 - allSelectedInterests.length === 1 ? '' : 's'} to continue` }), canContinue && (_jsx("div", { className: "text-xs text-muted", children: "You can always adjust these later in your profile" }))] }), _jsx(Button, { variant: "primary", size: "lg", onClick: onContinue, disabled: !canContinue, className: "min-w-[140px]", children: "Continue" })] })] })] }));
};
//# sourceMappingURL=interests-step-new.js.map