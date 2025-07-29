import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { HiveInput } from '../../../components/hive-input';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { Users, Shield, Crown, ArrowRight, ArrowLeft, Star, Target, Lightbulb, MessageCircle, UserPlus, Globe, Heart, Code, Palette, Book, Gamepad2, Dumbbell, Camera, Mic, GraduationCap, Building, Calendar, Award, Activity, Sparkles, Rocket } from 'lucide-react';
// Main Space Activation Form - Campus Community Creation
const SpaceActivationForm = ({ onSubmit, loading, className, spaceType = 'create' }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Basic Info
        spaceName: '',
        spaceDescription: '',
        spaceCategory: '',
        spaceTags: [],
        // Purpose & Goals
        spacePurpose: '',
        primaryGoals: [],
        targetAudience: '',
        meetingFrequency: '',
        // Leadership & Structure
        leadershipStyle: '',
        memberCapacity: '',
        membershipRequirements: '',
        onboardingProcess: '',
        // Campus Integration
        campusAffiliation: '',
        facultyAdvisor: '',
        departmentSponsorship: '',
        officialRecognition: false,
        // Verification & Contact
        leadershipExperience: '',
        previousRoles: [],
        contactMethods: [],
        socialLinks: '',
        // Space Settings
        visibility: 'campus',
        joinProcess: 'application',
        contentModeration: 'community',
        eventPermissions: 'members'
    });
    const spaceCategories = [
        { id: 'academic', label: 'Academic', desc: 'Study groups, research, coursework', icon: GraduationCap, color: 'blue' },
        { id: 'professional', label: 'Professional', desc: 'Career development, networking', icon: Target, color: 'green' },
        { id: 'social', label: 'Social', desc: 'Friendship, community, hangouts', icon: Users, color: 'purple' },
        { id: 'creative', label: 'Creative', desc: 'Arts, music, design, writing', icon: Palette, color: 'pink' },
        { id: 'sports', label: 'Sports & Fitness', desc: 'Athletics, wellness, outdoor', icon: Dumbbell, color: 'emerald' },
        { id: 'tech', label: 'Technology', desc: 'Coding, innovation, startups', icon: Code, color: 'cyan' },
        { id: 'service', label: 'Service', desc: 'Volunteering, community impact', icon: Heart, color: 'red' },
        { id: 'cultural', label: 'Cultural', desc: 'Heritage, diversity, identity', icon: Globe, color: 'orange' },
        { id: 'gaming', label: 'Gaming', desc: 'Video games, board games, esports', icon: Gamepad2, color: 'indigo' },
        { id: 'media', label: 'Media & Content', desc: 'Photography, film, podcasts', icon: Camera, color: 'amber' }
    ];
    const primaryGoals = [
        { id: 'learning', label: 'Collaborative Learning', icon: Book },
        { id: 'networking', label: 'Professional Networking', icon: UserPlus },
        { id: 'friendship', label: 'Building Friendships', icon: Heart },
        { id: 'projects', label: 'Group Projects', icon: Target },
        { id: 'events', label: 'Event Organization', icon: Calendar },
        { id: 'mentorship', label: 'Peer Mentorship', icon: Star },
        { id: 'advocacy', label: 'Campus Advocacy', icon: Mic },
        { id: 'competition', label: 'Competitions', icon: Award },
        { id: 'wellness', label: 'Wellness & Support', icon: Shield },
        { id: 'innovation', label: 'Innovation & Creation', icon: Lightbulb }
    ];
    const spaceTags = [
        'beginner-friendly', 'advanced', 'collaborative', 'competitive', 'casual',
        'intensive', 'weekly-meetings', 'project-based', 'discussion-focused',
        'hands-on', 'mentorship', 'peer-support', 'innovation', 'traditional',
        'experimental', 'interdisciplinary', 'focused', 'diverse', 'inclusive'
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
    const addTag = (tag) => {
        if (!formData.spaceTags.includes(tag)) {
            setFormData(prev => ({ ...prev, spaceTags: [...prev.spaceTags, tag] }));
        }
    };
    const removeTag = (tag) => {
        setFormData(prev => ({ ...prev, spaceTags: prev.spaceTags.filter(t => t !== tag) }));
    };
    const getFormTitle = () => {
        switch (spaceType) {
            case 'create': return 'Create New Space';
            case 'join': return 'Join Space Request';
            case 'request': return 'Request Space Activation';
            default: return 'Space Activation';
        }
    };
    const getFormDescription = () => {
        switch (spaceType) {
            case 'create': return 'Build a new campus community';
            case 'join': return 'Request to join an existing space';
            case 'request': return 'Request leadership verification';
            default: return 'Campus community management';
        }
    };
    const getFormIcon = () => {
        switch (spaceType) {
            case 'create': return Rocket;
            case 'join': return UserPlus;
            case 'request': return Crown;
            default: return Users;
        }
    };
    const FormIcon = getFormIcon();
    return (_jsx(HiveCard, { className: `w-[550px] ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-4", children: _jsx(FormIcon, { className: "w-8 h-8 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx(Badge, { variant: "primary", size: "sm", className: "mb-2", children: "Space Management" }), _jsx(Text, { variant: "heading-lg", className: "font-bold", children: getFormTitle() }), _jsx(Text, { variant: "body-md", color: "secondary", children: getFormDescription() })] })] }), _jsx("div", { className: "flex items-center gap-1", children: [1, 2, 3, 4].map((num) => (_jsx("div", { className: `flex-1 h-1 rounded-full transition-colors ${num <= step ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-800'}` }, num))) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs(AnimatePresence, { mode: "wait", children: [step === 1 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Space Identity" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Define your community's core identity" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Space Name" }), _jsx(HiveInput, { placeholder: "Stanford AI Research Collective", value: formData.spaceName, onChange: (e) => setFormData(prev => ({ ...prev, spaceName: e.target.value })), disabled: loading, className: "w-full", maxLength: 60 }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Text, { variant: "body-xs", color: "secondary", children: "Choose a clear, memorable name" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [formData.spaceName.length, "/60"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Space Description" }), _jsx("textarea", { placeholder: "Describe your space's mission, activities, and what makes it unique...", value: formData.spaceDescription, onChange: (e) => setFormData(prev => ({ ...prev, spaceDescription: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none", rows: 4, maxLength: 400 }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Text, { variant: "body-xs", color: "secondary", children: "Explain your purpose and what members can expect" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [formData.spaceDescription.length, "/400"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Category" }), _jsx("div", { className: "grid grid-cols-2 gap-2 max-h-64 overflow-y-auto", children: spaceCategories.map((category) => (_jsxs("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, spaceCategory: category.id })), className: `p-3 rounded-lg border transition-all text-left ${formData.spaceCategory === category.id
                                                                    ? 'border-indigo-500 bg-indigo-500/10 scale-105'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'}`, children: [_jsx(category.icon, { className: "h-5 w-5 mb-2" }), _jsx(Text, { variant: "body-sm", className: "font-medium", children: category.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: category.desc })] }, category.id))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Space Tags" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: formData.spaceTags.map((tag, index) => (_jsxs(Badge, { variant: "secondary", size: "sm", className: "flex items-center gap-1", children: [tag, _jsx("button", { type: "button", onClick: () => removeTag(tag), className: "ml-1 hover:text-red-400", children: _jsx(X, { className: "h-3 w-3" }) })] }, index))) }), _jsx("div", { className: "flex flex-wrap gap-2", children: spaceTags.filter(tag => !formData.spaceTags.includes(tag)).slice(0, 8).map((tag) => (_jsxs("button", { type: "button", onClick: () => addTag(tag), className: "px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full border border-[var(--hive-border-default)] transition-colors", children: ["+ ", tag] }, tag))) })] })] })] }, "basic")), step === 2 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Purpose & Goals" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Define what your space aims to achieve" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Primary Goals" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: primaryGoals.map((goal) => (_jsxs("button", { type: "button", onClick: () => toggleSelection(formData.primaryGoals, goal.id, 'primaryGoals'), className: `p-3 rounded-lg border transition-all text-left ${formData.primaryGoals.includes(goal.id)
                                                                    ? 'border-indigo-500 bg-indigo-500/10 scale-105'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'}`, children: [_jsx(goal.icon, { className: "h-5 w-5 mb-2" }), _jsx(Text, { variant: "body-sm", className: "font-medium", children: goal.label })] }, goal.id))) }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Selected: ", formData.primaryGoals.length, " goals"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Target Audience" }), _jsx("div", { className: "space-y-2", children: [
                                                                { value: 'all-students', label: 'All Students', desc: 'Open to entire campus community' },
                                                                { value: 'undergrad', label: 'Undergraduates', desc: 'Undergraduate students only' },
                                                                { value: 'grad', label: 'Graduate Students', desc: 'Graduate and PhD students' },
                                                                { value: 'major-specific', label: 'Major/Department', desc: 'Students in specific academic areas' },
                                                                { value: 'year-specific', label: 'Class Year', desc: 'Specific graduation years' },
                                                                { value: 'skill-based', label: 'Skill Level', desc: 'Based on experience or skill level' }
                                                            ].map((audience) => (_jsxs("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, targetAudience: audience.value })), className: `w-full p-3 rounded-lg border transition-colors text-left ${formData.targetAudience === audience.value
                                                                    ? 'border-indigo-500 bg-indigo-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: audience.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: audience.desc })] }, audience.value))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Meeting Frequency" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                                                                { value: 'weekly', label: 'Weekly' },
                                                                { value: 'biweekly', label: 'Bi-weekly' },
                                                                { value: 'monthly', label: 'Monthly' },
                                                                { value: 'irregular', label: 'Irregular' },
                                                                { value: 'event-based', label: 'Event-based' },
                                                                { value: 'continuous', label: 'Continuous' }
                                                            ].map((frequency) => (_jsx("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, meetingFrequency: frequency.value })), className: `p-3 rounded-lg border transition-colors ${formData.meetingFrequency === frequency.value
                                                                    ? 'border-indigo-500 bg-indigo-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: _jsx(Text, { variant: "body-sm", className: "font-medium", children: frequency.label }) }, frequency.value))) })] })] })] }, "purpose")), step === 3 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Leadership & Structure" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "How will your space be organized and led?" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Leadership Style" }), _jsx("div", { className: "space-y-2", children: [
                                                                { value: 'single-leader', label: 'Single Leader', desc: 'One primary organizer/president', icon: Crown },
                                                                { value: 'co-leadership', label: 'Co-Leadership', desc: 'Shared leadership model', icon: Users },
                                                                { value: 'rotating', label: 'Rotating Leadership', desc: 'Leadership rotates among members', icon: Activity },
                                                                { value: 'democratic', label: 'Democratic', desc: 'Group decisions and consensus', icon: Users },
                                                                { value: 'hierarchical', label: 'Hierarchical', desc: 'Traditional officer structure', icon: Building }
                                                            ].map((style) => (_jsx("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, leadershipStyle: style.value })), className: `w-full p-3 rounded-lg border transition-colors text-left ${formData.leadershipStyle === style.value
                                                                    ? 'border-indigo-500 bg-indigo-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(style.icon, { className: "h-4 w-4" }), _jsxs("div", { className: "flex-1", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: style.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: style.desc })] })] }) }, style.value))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Member Capacity" }), _jsx(HiveInput, { type: "number", placeholder: "25", value: formData.memberCapacity, onChange: (e) => setFormData(prev => ({ ...prev, memberCapacity: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Users, { className: "h-4 w-4" }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Leave empty for unlimited" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Join Process" }), _jsxs("select", { value: formData.joinProcess, onChange: (e) => setFormData(prev => ({ ...prev, joinProcess: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "open", children: "Open Join" }), _jsx("option", { value: "application", children: "Application Required" }), _jsx("option", { value: "invitation", children: "Invitation Only" }), _jsx("option", { value: "interview", children: "Interview Process" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Membership Requirements" }), _jsx("textarea", { placeholder: "What requirements or expectations do you have for members? (e.g., skill level, time commitment, prerequisites)", value: formData.membershipRequirements, onChange: (e) => setFormData(prev => ({ ...prev, membershipRequirements: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none", rows: 3, maxLength: 200 }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Text, { variant: "body-xs", color: "secondary", children: "Be clear about expectations and prerequisites" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [formData.membershipRequirements.length, "/200"] })] })] })] })] }, "leadership")), step === 4 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Leadership Verification" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Verify your ability to lead this campus community" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Leadership Experience" }), _jsx("textarea", { placeholder: "Describe your leadership experience, relevant skills, and why you're the right person to create this space...", value: formData.leadershipExperience, onChange: (e) => setFormData(prev => ({ ...prev, leadershipExperience: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none", rows: 4, maxLength: 300 }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Text, { variant: "body-xs", color: "secondary", children: "Include relevant experience, even if informal" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [formData.leadershipExperience.length, "/300"] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Campus Affiliation" }), _jsx(HiveInput, { placeholder: "Computer Science Department", value: formData.campusAffiliation, onChange: (e) => setFormData(prev => ({ ...prev, campusAffiliation: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Building, { className: "h-4 w-4" }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Department, college, or organization" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Faculty Advisor (Optional)" }), _jsx(HiveInput, { placeholder: "Prof. Jane Smith", value: formData.facultyAdvisor, onChange: (e) => setFormData(prev => ({ ...prev, facultyAdvisor: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(GraduationCap, { className: "h-4 w-4" }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Faculty support strengthens applications" })] })] }), _jsx("div", { className: "space-y-3", children: _jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: formData.officialRecognition, onChange: (e) => setFormData(prev => ({ ...prev, officialRecognition: e.target.checked })), className: "rounded border-gray-600 bg-gray-800" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Seek Official Recognition" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Apply for official student organization status" })] })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Contact Methods" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                                                                { value: 'email', label: 'Email', icon: MessageCircle },
                                                                { value: 'discord', label: 'Discord', icon: MessageCircle },
                                                                { value: 'slack', label: 'Slack', icon: MessageCircle },
                                                                { value: 'instagram', label: 'Instagram', icon: Camera },
                                                                { value: 'linkedin', label: 'LinkedIn', icon: Users },
                                                                { value: 'website', label: 'Website', icon: Globe }
                                                            ].map((method) => (_jsxs("button", { type: "button", onClick: () => toggleSelection(formData.contactMethods, method.value, 'contactMethods'), className: `p-3 rounded-lg border transition-colors ${formData.contactMethods.includes(method.value)
                                                                    ? 'border-indigo-500 bg-indigo-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(method.icon, { className: "h-4 w-4 mx-auto mb-1" }), _jsx(Text, { variant: "body-xs", className: "font-medium", children: method.label })] }, method.value))) })] }), _jsxs("div", { className: "p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/20", children: [_jsx(Text, { variant: "body-sm", className: "font-medium mb-3", children: "Space Preview" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "heading-sm", className: "font-bold", children: formData.spaceName || 'Your Space Name' }), _jsxs("div", { className: "flex items-center gap-2", children: [formData.spaceCategory && (_jsx(Badge, { variant: "primary", size: "sm", children: spaceCategories.find(c => c.id === formData.spaceCategory)?.label })), _jsx(Badge, { variant: "secondary", size: "sm", children: formData.memberCapacity ? `Max ${formData.memberCapacity} members` : 'Unlimited' })] }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "line-clamp-2", children: formData.spaceDescription || 'Space description will appear here...' }), formData.spaceTags.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1 mt-2", children: [formData.spaceTags.slice(0, 3).map((tag, index) => (_jsx(Badge, { variant: "secondary", size: "sm", children: tag }, index))), formData.spaceTags.length > 3 && (_jsxs(Badge, { variant: "secondary", size: "sm", children: ["+", formData.spaceTags.length - 3] }))] }))] })] })] })] }, "verification"))] }), _jsxs("div", { className: "flex items-center justify-between pt-4", children: [step > 1 && (_jsxs(HiveButton, { type: "button", variant: "outline", onClick: () => setStep(step - 1), disabled: loading, children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] })), _jsx(HiveButton, { type: "submit", className: step === 1 ? 'w-full' : 'ml-auto', loading: loading, variant: "premium", size: "lg", disabled: !formData.spaceName || !formData.spaceCategory, children: step === 4 ? (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "h-4 w-4 mr-2" }), spaceType === 'create' ? 'Create Space' : 'Submit Request'] })) : (_jsxs(_Fragment, { children: ["Continue", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })) })] })] }), _jsxs("div", { className: "text-center pt-4 border-t border-[var(--hive-border-default)]", children: [_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Step ", step, " of 4 \u2022 Space ", spaceType === 'create' ? 'Creation' : 'Request'] }), _jsxs("div", { className: "flex items-center justify-center gap-1 mt-2", children: [_jsx(FormIcon, { className: "h-3 w-3 text-indigo-500" }), _jsxs(Text, { variant: "body-xs", className: "text-indigo-400", children: [step === 1 && 'Defining space identity...', step === 2 && 'Setting goals and purpose...', step === 3 && 'Organizing leadership...', step === 4 && 'Verifying qualifications...'] })] })] })] }) }));
};
// Quick Space Join Form
const QuickSpaceJoinForm = ({ onSubmit, loading, className }) => {
    const [formData, setFormData] = useState({
        reason: '',
        experience: '',
        contribution: '',
        availability: '',
        contactPreference: 'hive-dm'
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    };
    return (_jsx(HiveCard, { className: `w-100 ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center", children: _jsx(UserPlus, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "font-bold", children: "Join Space Request" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Express interest in joining this community" })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Why do you want to join?" }), _jsx("textarea", { placeholder: "Share what interests you about this space and what you hope to gain...", value: formData.reason, onChange: (e) => setFormData(prev => ({ ...prev, reason: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none", rows: 3, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Relevant Experience" }), _jsx(HiveInput, { placeholder: "Any relevant background or experience...", value: formData.experience, onChange: (e) => setFormData(prev => ({ ...prev, experience: e.target.value })), className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "How can you contribute?" }), _jsx("textarea", { placeholder: "What unique skills, perspectives, or energy would you bring to this space?", value: formData.contribution, onChange: (e) => setFormData(prev => ({ ...prev, contribution: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none", rows: 2 })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Availability" }), _jsxs("select", { value: formData.availability, onChange: (e) => setFormData(prev => ({ ...prev, availability: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "", children: "Select your availability" }), _jsx("option", { value: "very-active", children: "Very Active (Daily participation)" }), _jsx("option", { value: "regular", children: "Regular (Few times per week)" }), _jsx("option", { value: "moderate", children: "Moderate (Weekly participation)" }), _jsx("option", { value: "casual", children: "Casual (When possible)" })] })] }), _jsxs(HiveButton, { type: "submit", className: "w-full", loading: loading, variant: "premium", size: "lg", children: [_jsx(UserPlus, { className: "h-4 w-4 mr-2" }), "Send Join Request"] })] }), _jsx("div", { className: "text-center", children: _jsx(Text, { variant: "body-xs", color: "secondary", children: "Space leaders will review your request" }) })] }) }));
};
// Stories Configuration
const meta = {
    title: '03-molecules/Forms/Space Activation Forms',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Space Activation Forms** - Campus community creation and management

Molecular forms for creating and managing campus Spaces - the community layer of HIVE that brings students together around shared interests, goals, and activities.

## Space Management Philosophy
- **Leadership Verification**: Ensuring quality community leadership through structured validation
- **Campus Integration**: Seamless connection with university departments and official recognition
- **Community Building**: Focus on sustainable, meaningful student communities
- **Inclusive Access**: Multiple pathways for community participation and leadership

## Form Types
- **Space Creation Form**: Complete 4-step community creation process
- **Space Join Request**: Quick application to join existing communities
- **Leadership Verification**: Validation process for space leadership capabilities

## Key Features
- **Multi-step Creation**: Identity → Purpose → Leadership → Verification
- **Category System**: Organized taxonomy for campus community types
- **Leadership Models**: Multiple governance structures for different community types
- **Campus Affiliation**: Integration with departments and official recognition
- **Membership Management**: Capacity, requirements, and join processes

## Design Patterns
- **Progressive Disclosure**: Complex community setup broken into logical steps
- **Leadership Validation**: Structured verification of community leadership capability
- **Campus Context**: University-specific terminology and integration points
- **Community Preview**: Real-time preview of space appearance and settings
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Space Creation Stories
export const SpaceCreationDefault = {
    name: 'Space Creation - Complete Flow',
    render: () => (_jsx(SpaceActivationForm, { spaceType: "create", onSubmit: async (data) => {
            console.log('Space Created:', data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('🎉 Space created successfully! Your campus community is now live.');
        } }))
};
export const SpaceCreationLoading = {
    name: 'Space Creation - Loading State',
    render: () => (_jsx(SpaceActivationForm, { spaceType: "create", loading: true, onSubmit: async (data) => {
            console.log('Space Created:', data);
        } }))
};
// Space Join Request Stories
export const SpaceJoinRequest = {
    name: 'Space Join - Quick Request',
    render: () => (_jsx(QuickSpaceJoinForm, { onSubmit: async (data) => {
            console.log('Join Request:', data);
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('✅ Join request sent! Space leaders will review your application.');
        } }))
};
export const SpaceJoinRequestLoading = {
    name: 'Space Join - Loading State',
    render: () => (_jsx(QuickSpaceJoinForm, { loading: true, onSubmit: async (data) => {
            console.log('Join Request:', data);
        } }))
};
// Leadership Verification Stories
export const LeadershipVerification = {
    name: 'Leadership Verification Request',
    render: () => (_jsx(SpaceActivationForm, { spaceType: "request", onSubmit: async (data) => {
            console.log('Leadership Request:', data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('📋 Leadership verification submitted! Campus admin will review your qualifications.');
        } }))
};
// Complete Space Management Flow
export const CompleteSpaceFlow = {
    name: 'Complete Space Management Flow',
    render: () => {
        const [currentForm, setCurrentForm] = useState('create');
        return (_jsxs("div", { className: "flex flex-col items-center gap-6", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setCurrentForm('create'), className: `px-4 py-2 rounded-lg transition-colors ${currentForm === 'create'
                                ? 'bg-indigo-500 text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: "Create Space" }), _jsx("button", { onClick: () => setCurrentForm('join'), className: `px-4 py-2 rounded-lg transition-colors ${currentForm === 'join'
                                ? 'bg-green-500 text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: "Join Request" }), _jsx("button", { onClick: () => setCurrentForm('request'), className: `px-4 py-2 rounded-lg transition-colors ${currentForm === 'request'
                                ? 'bg-purple-500 text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: "Leadership Verification" })] }), _jsxs(AnimatePresence, { mode: "wait", children: [currentForm === 'create' && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", children: _jsx(SpaceActivationForm, { spaceType: "create", onSubmit: async (data) => {
                                    console.log('Space Created:', data);
                                    await new Promise(resolve => setTimeout(resolve, 1500));
                                } }) }, "create")), currentForm === 'join' && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", children: _jsx(QuickSpaceJoinForm, { onSubmit: async (data) => {
                                    console.log('Join Request:', data);
                                    await new Promise(resolve => setTimeout(resolve, 1500));
                                } }) }, "join")), currentForm === 'request' && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", children: _jsx(SpaceActivationForm, { spaceType: "request", onSubmit: async (data) => {
                                    console.log('Leadership Request:', data);
                                    await new Promise(resolve => setTimeout(resolve, 1500));
                                } }) }, "request"))] })] }));
    }
};
// Mobile Space Management
export const MobileSpaceManagement = {
    name: 'Mobile-First Space Management',
    render: () => (_jsx("div", { className: "max-w-sm mx-auto", children: _jsx(SpaceActivationForm, { spaceType: "create", className: "w-full max-w-sm", onSubmit: async (data) => {
                console.log('Mobile Space:', data);
                await new Promise(resolve => setTimeout(resolve, 1500));
            } }) })),
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
//# sourceMappingURL=space-activation-forms.stories.js.map