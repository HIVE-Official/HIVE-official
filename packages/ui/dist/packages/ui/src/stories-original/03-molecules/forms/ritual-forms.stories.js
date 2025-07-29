import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { HiveInput } from '../../../components/hive-input';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { Zap, Search, Users, Rocket, ArrowRight, ArrowLeft, Star, MapPin, Code, Palette, Music, Camera, Book, Gamepad2, Heart, Sparkles, Shield, Award, Building, GraduationCap, Coffee, Headphones, Dumbbell, Brush, Calculator } from 'lucide-react';
// Initialize Ritual - Student Campus Identity Formation
const InitializeRitualForm = ({ onSubmit, loading, className }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        campusGoals: [],
        interests: [],
        availability: '',
        personalityType: '',
        campusExperience: '',
        connectionStyle: '',
        profileVisibility: 'campus',
        bio: '',
        pronouns: ''
    });
    const campusGoals = [
        { id: 'academic', label: 'Academic Excellence', icon: GraduationCap },
        { id: 'social', label: 'Social Connections', icon: Users },
        { id: 'leadership', label: 'Leadership Growth', icon: Star },
        { id: 'creativity', label: 'Creative Expression', icon: Palette },
        { id: 'wellness', label: 'Health & Wellness', icon: Heart },
        { id: 'career', label: 'Career Preparation', icon: Rocket }
    ];
    const interests = [
        { id: 'tech', label: 'Technology', icon: Code },
        { id: 'design', label: 'Design', icon: Palette },
        { id: 'music', label: 'Music', icon: Music },
        { id: 'sports', label: 'Sports', icon: Dumbbell },
        { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
        { id: 'food', label: 'Food & Cooking', icon: Coffee },
        { id: 'reading', label: 'Reading', icon: Book },
        { id: 'photography', label: 'Photography', icon: Camera },
        { id: 'art', label: 'Visual Arts', icon: Brush },
        { id: 'math', label: 'Mathematics', icon: Calculator },
        { id: 'fitness', label: 'Fitness', icon: Dumbbell },
        { id: 'podcasts', label: 'Podcasts', icon: Headphones }
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < 4) {
            setStep(step + 1);
        }
        else {
            onSubmit?.(formData);
        }
    };
    const toggleSelection = (array, item, key) => {
        const newArray = array.includes(item)
            ? array.filter(i => i !== item)
            : [...array, item];
        setFormData(prev => ({ ...prev, [key]: newArray }));
    };
    return (_jsx(HiveCard, { className: `w-125 ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center mb-4", children: _jsx(Zap, { className: "w-8 h-8 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx(Badge, { variant: "primary", size: "sm", className: "mb-2", children: "Ritual 1 of 4" }), _jsx(Text, { variant: "heading-lg", className: "font-bold", children: "Initialize" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Define your campus identity and goals" })] })] }), _jsx("div", { className: "flex items-center gap-1", children: [1, 2, 3, 4].map((num) => (_jsx("div", { className: `flex-1 h-1 rounded-full transition-colors ${num <= step ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-800'}` }, num))) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs(AnimatePresence, { mode: "wait", children: [step === 1 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "What are your campus goals?" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Select all that resonate with your university journey" })] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: campusGoals.map((goal) => (_jsxs("button", { type: "button", onClick: () => toggleSelection(formData.campusGoals, goal.id, 'campusGoals'), className: `p-4 rounded-lg border transition-all ${formData.campusGoals.includes(goal.id)
                                                    ? 'border-blue-500 bg-blue-500/10 scale-105'
                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'}`, children: [_jsx(goal.icon, { className: "h-6 w-6 mx-auto mb-2" }), _jsx(Text, { variant: "body-sm", className: "font-medium", children: goal.label })] }, goal.id))) })] }, "goals")), step === 2 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "What interests you?" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Help us connect you with like-minded peers" })] }), _jsx("div", { className: "grid grid-cols-3 gap-3 max-h-80 overflow-y-auto", children: interests.map((interest) => (_jsxs("button", { type: "button", onClick: () => toggleSelection(formData.interests, interest.id, 'interests'), className: `p-3 rounded-lg border transition-all ${formData.interests.includes(interest.id)
                                                    ? 'border-blue-500 bg-blue-500/10 scale-105'
                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'}`, children: [_jsx(interest.icon, { className: "h-5 w-5 mx-auto mb-1" }), _jsx(Text, { variant: "body-xs", className: "font-medium", children: interest.label })] }, interest.id))) }), _jsx("div", { className: "text-center", children: _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Selected: ", formData.interests.length, " interests"] }) })] }, "interests")), step === 3 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Campus Preferences" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Tell us about your availability and style" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "When are you most available?" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                                                                { value: 'morning', label: 'Morning Person' },
                                                                { value: 'afternoon', label: 'Afternoon' },
                                                                { value: 'evening', label: 'Evening' },
                                                                { value: 'night', label: 'Night Owl' }
                                                            ].map((time) => (_jsx("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, availability: time.value })), className: `p-3 rounded-lg border transition-colors ${formData.availability === time.value
                                                                    ? 'border-blue-500 bg-blue-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: _jsx(Text, { variant: "body-sm", children: time.label }) }, time.value))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "How do you prefer to connect?" }), _jsx("div", { className: "space-y-2", children: [
                                                                { value: 'groups', label: 'Large Groups & Events', desc: 'Thrive in bigger social settings' },
                                                                { value: 'small', label: 'Small Groups', desc: 'Prefer intimate gatherings' },
                                                                { value: 'one-on-one', label: 'One-on-One', desc: 'Best in personal connections' },
                                                                { value: 'online', label: 'Digital First', desc: 'Online before in-person' }
                                                            ].map((style) => (_jsxs("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, connectionStyle: style.value })), className: `w-full p-3 rounded-lg border transition-colors text-left ${formData.connectionStyle === style.value
                                                                    ? 'border-blue-500 bg-blue-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: style.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: style.desc })] }, style.value))) })] })] })] }, "preferences")), step === 4 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Complete Your Profile" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Help your peers get to know you" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Pronouns (Optional)" }), _jsx(HiveInput, { placeholder: "they/them, she/her, he/him, etc.", value: formData.pronouns, onChange: (e) => setFormData(prev => ({ ...prev, pronouns: e.target.value })), className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Bio" }), _jsx("textarea", { placeholder: "Tell your campus community about yourself...", value: formData.bio, onChange: (e) => setFormData(prev => ({ ...prev, bio: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none", rows: 4, maxLength: 200 }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Text, { variant: "body-xs", color: "secondary", children: "Share your story, goals, or fun facts" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [formData.bio.length, "/200"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Profile Visibility" }), _jsx("div", { className: "space-y-2", children: [
                                                                { value: 'campus', label: 'Campus Community', desc: 'Visible to verified students & faculty', icon: Building },
                                                                { value: 'friends', label: 'Friends Only', desc: 'Only people you connect with', icon: Users },
                                                                { value: 'private', label: 'Private', desc: 'Only you can see your profile', icon: Shield }
                                                            ].map((visibility) => (_jsx("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, profileVisibility: visibility.value })), className: `w-full p-3 rounded-lg border transition-colors text-left ${formData.profileVisibility === visibility.value
                                                                    ? 'border-blue-500 bg-blue-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(visibility.icon, { className: "h-4 w-4" }), _jsxs("div", { className: "flex-1", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: visibility.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: visibility.desc })] })] }) }, visibility.value))) })] })] })] }, "profile"))] }), _jsxs("div", { className: "flex items-center justify-between pt-4", children: [step > 1 && (_jsxs(HiveButton, { type: "button", variant: "outline", onClick: () => setStep(step - 1), disabled: loading, children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] })), _jsx(HiveButton, { type: "submit", className: step === 1 ? 'w-full' : 'ml-auto', loading: loading, variant: "premium", size: "lg", disabled: step === 1 && formData.campusGoals.length === 0, children: step === 4 ? (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "h-4 w-4 mr-2" }), "Complete Initialize Ritual"] })) : (_jsxs(_Fragment, { children: ["Continue", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })) })] })] }), _jsxs("div", { className: "text-center pt-4 border-t border-[var(--hive-border-default)]", children: [_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Step ", step, " of 4 \u2022 Initialize Ritual"] }), _jsxs("div", { className: "flex items-center justify-center gap-1 mt-2", children: [_jsx(Zap, { className: "h-3 w-3 text-blue-500" }), _jsx(Text, { variant: "body-xs", className: "text-blue-400", children: "Building your campus identity..." })] })] })] }) }));
};
// Discover Ritual - Campus Community & Space Discovery
const DiscoverRitualForm = ({ onSubmit, loading, className }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        explorationStyle: '',
        spaceTypes: [],
        commitmentLevel: '',
        leadershipInterest: '',
        discoveryPreferences: [],
        campusAreas: []
    });
    const spaceTypes = [
        { id: 'academic', label: 'Study Groups', desc: 'Collaborative learning', icon: Book },
        { id: 'social', label: 'Social Clubs', desc: 'Fun & friendship', icon: Users },
        { id: 'professional', label: 'Career Dev', desc: 'Professional growth', icon: Rocket },
        { id: 'creative', label: 'Creative Arts', desc: 'Artistic expression', icon: Palette },
        { id: 'wellness', label: 'Health & Fitness', desc: 'Physical & mental wellness', icon: Heart },
        { id: 'service', label: 'Community Service', desc: 'Give back together', icon: Star }
    ];
    const campusAreas = [
        { id: 'library', label: 'Library & Study Spaces', icon: Book },
        { id: 'union', label: 'Student Union', icon: Building },
        { id: 'rec', label: 'Recreation Center', icon: Dumbbell },
        { id: 'dining', label: 'Dining Areas', icon: Coffee },
        { id: 'outdoor', label: 'Outdoor Spaces', icon: MapPin },
        { id: 'labs', label: 'Labs & Workshops', icon: Code }
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        }
        else {
            onSubmit?.(formData);
        }
    };
    const toggleSelection = (array, item, key) => {
        const newArray = array.includes(item)
            ? array.filter(i => i !== item)
            : [...array, item];
        setFormData(prev => ({ ...prev, [key]: newArray }));
    };
    return (_jsx(HiveCard, { className: `w-125 ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center mb-4", children: _jsx(Search, { className: "w-8 h-8 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx(Badge, { variant: "success", size: "sm", className: "mb-2", children: "Ritual 2 of 4" }), _jsx(Text, { variant: "heading-lg", className: "font-bold", children: "Discover" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Explore campus communities and spaces" })] })] }), _jsx("div", { className: "flex items-center gap-1", children: [1, 2, 3].map((num) => (_jsx("div", { className: `flex-1 h-1 rounded-full transition-colors ${num <= step ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-800'}` }, num))) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs(AnimatePresence, { mode: "wait", children: [step === 1 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "What spaces interest you?" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Select the types of communities you'd like to explore" })] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: spaceTypes.map((space) => (_jsxs("button", { type: "button", onClick: () => toggleSelection(formData.spaceTypes, space.id, 'spaceTypes'), className: `p-4 rounded-lg border transition-all text-left ${formData.spaceTypes.includes(space.id)
                                                    ? 'border-green-500 bg-green-500/10 scale-105'
                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'}`, children: [_jsx(space.icon, { className: "h-6 w-6 mb-2" }), _jsx(Text, { variant: "body-sm", className: "font-medium", children: space.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: space.desc })] }, space.id))) })] }, "spaces")), step === 2 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Where do you spend time?" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Select your favorite campus areas" })] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: campusAreas.map((area) => (_jsxs("button", { type: "button", onClick: () => toggleSelection(formData.campusAreas, area.id, 'campusAreas'), className: `p-4 rounded-lg border transition-all ${formData.campusAreas.includes(area.id)
                                                    ? 'border-green-500 bg-green-500/10 scale-105'
                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'}`, children: [_jsx(area.icon, { className: "h-6 w-6 mx-auto mb-2" }), _jsx(Text, { variant: "body-sm", className: "font-medium text-center", children: area.label })] }, area.id))) })] }, "areas")), step === 3 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Discovery Preferences" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "How would you like to explore communities?" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Exploration Style" }), _jsx("div", { className: "space-y-2", children: [
                                                                { value: 'browse', label: 'Browse & Explore', desc: 'Look around before joining' },
                                                                { value: 'recommended', label: 'Get Recommendations', desc: 'Show me suggested spaces' },
                                                                { value: 'search', label: 'Search Specific', desc: 'I know what I\'m looking for' },
                                                                { value: 'events', label: 'Event-Based', desc: 'Discover through events' }
                                                            ].map((style) => (_jsxs("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, explorationStyle: style.value })), className: `w-full p-3 rounded-lg border transition-colors text-left ${formData.explorationStyle === style.value
                                                                    ? 'border-green-500 bg-green-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: style.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: style.desc })] }, style.value))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Commitment Level" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                                                                { value: 'casual', label: 'Casual Explorer', desc: 'Drop in when interested' },
                                                                { value: 'regular', label: 'Regular Member', desc: 'Consistent participation' },
                                                                { value: 'active', label: 'Active Contributor', desc: 'Help organize & lead' },
                                                                { value: 'leader', label: 'Future Leader', desc: 'Want to create impact' }
                                                            ].map((level) => (_jsxs("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, commitmentLevel: level.value })), className: `p-3 rounded-lg border transition-colors text-left ${formData.commitmentLevel === level.value
                                                                    ? 'border-green-500 bg-green-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: level.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: level.desc })] }, level.value))) })] })] })] }, "preferences"))] }), _jsxs("div", { className: "flex items-center justify-between pt-4", children: [step > 1 && (_jsxs(HiveButton, { type: "button", variant: "outline", onClick: () => setStep(step - 1), disabled: loading, children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] })), _jsx(HiveButton, { type: "submit", className: step === 1 ? 'w-full' : 'ml-auto', loading: loading, variant: "premium", size: "lg", disabled: step === 1 && formData.spaceTypes.length === 0, children: step === 3 ? (_jsxs(_Fragment, { children: [_jsx(Search, { className: "h-4 w-4 mr-2" }), "Complete Discover Ritual"] })) : (_jsxs(_Fragment, { children: ["Continue", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })) })] })] }), _jsxs("div", { className: "text-center pt-4 border-t border-[var(--hive-border-default)]", children: [_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Step ", step, " of 3 \u2022 Discover Ritual"] }), _jsxs("div", { className: "flex items-center justify-center gap-1 mt-2", children: [_jsx(Search, { className: "h-3 w-3 text-green-500" }), _jsx(Text, { variant: "body-xs", className: "text-green-400", children: "Exploring campus communities..." })] })] })] }) }));
};
// Stories Configuration
const meta = {
    title: '03-molecules/Forms/Ritual Forms',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Ritual Forms** - Student progression through campus social rituals

Core molecular forms for the four HIVE rituals that guide students through intentional campus community formation. Each ritual builds upon the previous to create deep, meaningful connections.

## The Four Rituals
1. **Initialize** - Campus identity formation and goal setting
2. **Discover** - Community exploration and space discovery  
3. **Connect** - Peer relationship building and social integration
4. **Deploy** - Leadership development and community contribution

## Design Philosophy
- **Progressive Revelation**: Each step builds emotional investment
- **Gamified Experience**: Visual progress and achievement unlocks
- **Social Context**: Always emphasizing community over individual
- **Campus-Specific**: Tailored to university life and student needs

## Form Patterns
- **Multi-step Wizards**: Prevent cognitive overload while building engagement
- **Visual Selection**: Icon-based choices for intuitive interaction
- **Progress Tracking**: Clear visual feedback on ritual completion
- **Contextual Help**: Guidance that feels supportive, not instructional

## Technical Features
- **Smooth Transitions**: गति motion system for fluid step progression
- **State Management**: Complex form state with validation
- **Responsive Design**: Mobile-first for campus student usage
- **Accessibility**: Screen reader support and keyboard navigation
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Initialize Ritual Stories
export const InitializeRitualDefault = {
    name: 'Initialize Ritual - Complete Flow',
    render: () => (_jsx(InitializeRitualForm, { onSubmit: async (data) => {
            console.log('Initialize Ritual:', data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('🎉 Initialize Ritual Complete! Welcome to your HIVE journey.');
        } }))
};
export const InitializeRitualLoading = {
    name: 'Initialize Ritual - Loading State',
    render: () => (_jsx(InitializeRitualForm, { loading: true, onSubmit: async (data) => {
            console.log('Initialize Ritual:', data);
        } }))
};
// Discover Ritual Stories
export const DiscoverRitualDefault = {
    name: 'Discover Ritual - Complete Flow',
    render: () => (_jsx(DiscoverRitualForm, { onSubmit: async (data) => {
            console.log('Discover Ritual:', data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('🌟 Discover Ritual Complete! Ready to explore your campus.');
        } }))
};
export const DiscoverRitualLoading = {
    name: 'Discover Ritual - Loading State',
    render: () => (_jsx(DiscoverRitualForm, { loading: true, onSubmit: async (data) => {
            console.log('Discover Ritual:', data);
        } }))
};
// Complete Ritual Journey
export const CompleteRitualJourney = {
    name: 'Complete Ritual Journey',
    render: () => {
        const [currentRitual, setCurrentRitual] = useState('initialize');
        const [completedRituals, setCompletedRituals] = useState([]);
        const handleRitualComplete = async (ritualName, data) => {
            console.log(`${ritualName} completed:`, data);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setCompletedRituals(prev => [...prev, ritualName]);
            if (ritualName === 'initialize') {
                setCurrentRitual('discover');
            }
            else if (ritualName === 'discover') {
                setCurrentRitual('complete');
            }
        };
        if (currentRitual === 'complete') {
            return (_jsx(HiveCard, { className: "w-100", variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", className: "p-6 text-center space-y-4", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-4", children: _jsx(Award, { className: "w-8 h-8 text-[var(--hive-text-primary)]" }) }), _jsx(Text, { variant: "heading-lg", className: "font-bold", children: "Rituals Complete!" }), _jsxs(Text, { variant: "body-md", color: "secondary", children: ["You've completed ", completedRituals.length, " rituals and are ready to Connect and Deploy on your campus."] }), _jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: completedRituals.map(ritual => (_jsxs(Badge, { variant: "success", size: "sm", children: ["\u2713 ", ritual] }, ritual))) })] }) }));
        }
        return (_jsxs("div", { className: "flex flex-col items-center gap-6", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { onClick: () => setCurrentRitual('initialize'), className: `px-4 py-2 rounded-lg transition-colors ${currentRitual === 'initialize'
                                ? 'bg-blue-500 text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: ["Initialize ", completedRituals.includes('initialize') && '✓'] }), _jsxs("button", { onClick: () => setCurrentRitual('discover'), className: `px-4 py-2 rounded-lg transition-colors ${currentRitual === 'discover'
                                ? 'bg-green-500 text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: ["Discover ", completedRituals.includes('discover') && '✓'] })] }), _jsxs(AnimatePresence, { mode: "wait", children: [currentRitual === 'initialize' && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", children: _jsx(InitializeRitualForm, { onSubmit: (data) => handleRitualComplete('initialize', data) }) }, "initialize")), currentRitual === 'discover' && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", children: _jsx(DiscoverRitualForm, { onSubmit: (data) => handleRitualComplete('discover', data) }) }, "discover"))] })] }));
    }
};
// Mobile Ritual Experience
export const MobileRitualExperience = {
    name: 'Mobile-First Ritual Experience',
    render: () => (_jsx("div", { className: "max-w-sm mx-auto", children: _jsx(InitializeRitualForm, { className: "w-full max-w-sm", onSubmit: async (data) => {
                console.log('Mobile Initialize:', data);
                await new Promise(resolve => setTimeout(resolve, 1500));
            } }) })),
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
//# sourceMappingURL=ritual-forms.stories.js.map