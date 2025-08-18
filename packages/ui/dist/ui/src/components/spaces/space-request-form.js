"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { Textarea } from '../textarea';
import { ArrowLeft, Building2, Users, Briefcase, Trophy, Heart, Loader2, Search, UserCheck } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';
const SPACE_TYPES = [
    {
        value: "social",
        label: "Social",
        description: "Social clubs, Greek life, and community groups",
        icon: Users,
    },
    {
        value: "academic",
        label: "Academic",
        description: "Academic clubs, study groups, and major-specific groups",
        icon: Trophy,
    },
    {
        value: "professional",
        label: "Professional",
        description: "Professional development and career-focused groups",
        icon: Briefcase,
    },
    {
        value: "sports",
        label: "Sports",
        description: "Sports clubs, intramurals, and athletic groups",
        icon: Trophy,
    },
    {
        value: "cultural",
        label: "Cultural",
        description: "Cultural clubs, heritage groups, and diversity organizations",
        icon: Heart,
    },
    {
        value: "service",
        label: "Service",
        description: "Community service and volunteer organizations",
        icon: Building2,
    },
];
export const SpaceRequestForm = ({ onSubmit, onBack, isSubmitting, error }) => {
    useAdaptiveMotion('academic'); // For consistency with motion system
    const [formData, setFormData] = useState({
        selectedSpaceId: '',
        claimReason: '',
        userRole: 'student'
    });
    const [availableSpaces, setAvailableSpaces] = useState([]);
    const [filteredSpaces, setFilteredSpaces] = useState([]);
    const [selectedSpaceType, setSelectedSpaceType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoadingSpaces, setIsLoadingSpaces] = useState(true);
    // Fetch available spaces
    useEffect(() => {
        const fetchAvailableSpaces = async () => {
            try {
                const response = await fetch('/api/spaces/available-for-claim');
                const data = await response.json();
                if (data.success) {
                    setAvailableSpaces(data.spaces);
                    setFilteredSpaces(data.spaces);
                }
            }
            catch (error) {
                console.error('Failed to fetch available spaces:', error);
            }
            finally {
                setIsLoadingSpaces(false);
            }
        };
        fetchAvailableSpaces();
    }, []);
    // Filter spaces based on type and search
    useEffect(() => {
        let filtered = availableSpaces;
        if (selectedSpaceType) {
            filtered = filtered.filter(space => space.type === selectedSpaceType);
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(space => space.name.toLowerCase().includes(query) ||
                space.description.toLowerCase().includes(query));
        }
        setFilteredSpaces(filtered);
    }, [availableSpaces, selectedSpaceType, searchQuery]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedSpace = availableSpaces.find(space => space.id === formData.selectedSpaceId);
        if (!selectedSpace || !formData.claimReason) {
            return;
        }
        onSubmit({
            spaceId: selectedSpace.id,
            spaceName: selectedSpace.name,
            spaceType: selectedSpace.type,
            claimReason: formData.claimReason,
            userRole: formData.userRole,
        });
    };
    const isFormValid = formData.selectedSpaceId && formData.claimReason;
    return (_jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" })] }), _jsxs(motion.div, { className: "w-full max-w-3xl relative z-10", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { className: "mb-6", variants: hiveVariants.item, children: _jsxs(Button, { variant: "ghost", onClick: onBack, className: "text-muted hover:text-foreground", children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Back"] }) }), _jsxs(motion.div, { className: "module-border module-surface module-padding space-y-8", variants: hiveVariants.item, children: [_jsxs(motion.div, { className: "text-center space-y-4", variants: hiveVariants.item, children: [_jsx("div", { className: "w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(Building2, { className: "w-8 h-8 text-accent" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-display font-semibold text-foreground", children: "Claim Leadership of a Space" }), _jsx("p", { className: "text-muted font-body mt-2", children: "Choose an existing space to claim leadership of. All requests are manually reviewed." })] })] }), _jsxs(motion.form, { onSubmit: handleSubmit, className: "space-y-6", variants: hiveVariants.container, children: [_jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsx(Label, { children: "I am a..." }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { type: "button", onClick: () => setFormData({ ...formData, userRole: 'student' }), className: `flex-1 p-4 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${formData.userRole === 'student'
                                                            ? 'border-accent bg-accent/10 text-accent'
                                                            : 'border-border bg-surface-01 text-muted hover:border-accent/30'}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-medium", children: "Student" }), _jsx("div", { className: "text-sm mt-1", children: "Claiming club/organization leadership" })] }) }), _jsx("button", { type: "button", onClick: () => setFormData({ ...formData, userRole: 'faculty' }), className: `flex-1 p-4 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${formData.userRole === 'faculty'
                                                            ? 'border-accent bg-accent/10 text-accent'
                                                            : 'border-border bg-surface-01 text-muted hover:border-accent/30'}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-medium", children: "Faculty/Staff" }), _jsx("div", { className: "text-sm mt-1", children: "Claiming course/department space" })] }) })] })] }), _jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsx(Label, { children: "Find a Space" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" }), _jsx(Input, { value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search spaces by name or description...", className: "pl-10", variant: "accent" })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("button", { type: "button", onClick: () => setSelectedSpaceType(''), className: `px-3 py-1.5 text-sm rounded-lg border transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${selectedSpaceType === ''
                                                            ? 'border-accent bg-accent/10 text-accent'
                                                            : 'border-border bg-surface-01 text-muted hover:border-accent/30'}`, children: "All Types" }), SPACE_TYPES.map((type) => (_jsx("button", { type: "button", onClick: () => setSelectedSpaceType(type.value), className: `px-3 py-1.5 text-sm rounded-lg border transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${selectedSpaceType === type.value
                                                            ? 'border-accent bg-accent/10 text-accent'
                                                            : 'border-border bg-surface-01 text-muted hover:border-accent/30'}`, children: type.label }, type.value)))] })] }), _jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsxs(Label, { children: ["Available Spaces (", filteredSpaces.length, ")"] }), isLoadingSpaces ? (_jsxs("div", { className: "flex items-center justify-center py-8", children: [_jsx(Loader2, { className: "w-6 h-6 animate-spin text-accent mr-2" }), _jsx("span", { className: "text-muted", children: "Loading available spaces..." })] })) : filteredSpaces.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-muted", children: [_jsx(Building2, { className: "w-12 h-12 mx-auto mb-3 opacity-50" }), _jsx("p", { children: "No available spaces found matching your criteria." }), _jsx("p", { className: "text-sm mt-1", children: "Try adjusting your search or filter." })] })) : (_jsx("div", { className: "space-y-3 max-h-96 overflow-y-auto", children: filteredSpaces.map((space) => {
                                                    const isSelected = formData.selectedSpaceId === space.id;
                                                    const spaceTypeInfo = SPACE_TYPES.find(t => t.value === space.type);
                                                    const Icon = spaceTypeInfo?.icon || Building2;
                                                    return (_jsx(motion.button, { type: "button", onClick: () => setFormData({ ...formData, selectedSpaceId: space.id }), className: `w-full p-4 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-left ${isSelected
                                                            ? 'border-accent bg-accent/10'
                                                            : 'border-border bg-surface-01 hover:border-accent/30'}`, whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: `p-2 rounded-lg flex-shrink-0 ${isSelected ? 'bg-accent text-background' : 'bg-surface-02 text-foreground'}`, children: _jsx(Icon, { className: "w-4 h-4" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: `font-medium ${isSelected ? 'text-accent' : 'text-foreground'}`, children: space.name }), isSelected && (_jsx(UserCheck, { className: "w-4 h-4 text-accent flex-shrink-0" }))] }), _jsx("div", { className: "text-sm text-muted mt-1 line-clamp-2", children: space.description }), _jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-muted", children: [_jsx("span", { className: "capitalize", children: spaceTypeInfo?.label }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [space.memberCount, " members"] })] })] })] }) }, space.id));
                                                }) }))] }), _jsxs(motion.div, { className: "space-y-2", variants: hiveVariants.item, children: [_jsx(Label, { htmlFor: "claimReason", children: formData.userRole === 'faculty' ? 'Why should you manage this space?' : 'Why should you lead this space?' }), _jsx(Textarea, { id: "claimReason", value: formData.claimReason, onChange: (e) => setFormData({ ...formData, claimReason: e.target.value }), placeholder: formData.userRole === 'faculty'
                                                    ? "Explain your teaching experience, course authority, and plan for moderating discussions."
                                                    : "Explain your experience, leadership qualifications, and vision for growing this community.", rows: 3, variant: "outline", required: true })] }), error && (_jsx(motion.div, { className: "p-4 bg-surface/50 border border-border rounded-lg", variants: hiveVariants.slideDown, initial: "hidden", animate: "visible", children: _jsx("p", { className: "text-muted-foreground text-sm", children: error }) })), _jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsx(Button, { type: "submit", variant: "ritual", size: "lg", className: "w-full", disabled: !isFormValid || isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }), "Submitting Request..."] })) : ('Submit Request') }), _jsx("div", { className: "text-center", children: _jsx("p", { className: "text-sm text-muted", children: "Your request will be manually reviewed. You'll receive an email when it's processed." }) })] })] })] })] })] }));
};
//# sourceMappingURL=space-request-form.js.map