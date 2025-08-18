'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ButtonEnhanced as Button } from '../../atomic/atoms/button-enhanced';
import { Text } from '../../atomic/atoms/text';
import { Icon } from '../../ui/icon';
import { cn } from '../lib/utils';
import { Building2, GraduationCap, Users, Coffee, BookOpen, Heart, Calendar, MapPin } from 'lucide-react';
export const UB_SPACE_TEMPLATES = [
    // Residential Spaces
    {
        id: 'ellicott-complex',
        name: 'Ellicott Complex',
        category: 'residential',
        description: 'North Campus residential community with modern amenities and dining',
        expectedMembers: 1247,
        icon: Building2,
        isActive: false
    },
    {
        id: 'governors-complex',
        name: 'Governors Complex',
        category: 'residential',
        description: 'South Campus apartment-style living for upperclassmen',
        expectedMembers: 892,
        icon: Building2,
        isActive: true,
        activationRequest: {
            requesterName: 'Sarah Chen',
            requesterEmail: 'schen23@buffalo.edu',
            dateRequested: '2024-08-10',
            leadershipExperience: 'RA in Ellicott, Student Government'
        }
    },
    // Academic Spaces
    {
        id: 'cse-department',
        name: 'Computer Science & Engineering',
        category: 'academic',
        description: 'CSE majors, course coordination, research opportunities, tech events',
        expectedMembers: 1456,
        icon: GraduationCap,
        isActive: true,
        activationRequest: {
            requesterName: 'Alex Rodriguez',
            requesterEmail: 'alexr24@buffalo.edu',
            dateRequested: '2024-08-08',
            leadershipExperience: 'ACM President, CS Teaching Assistant'
        }
    },
    {
        id: 'engineering-school',
        name: 'School of Engineering',
        category: 'academic',
        description: 'All engineering majors, cross-disciplinary projects, career resources',
        expectedMembers: 2341,
        icon: GraduationCap,
        isActive: false
    },
    // Social/Cultural Spaces
    {
        id: 'student-union',
        name: 'Student Union Community',
        category: 'social',
        description: 'Campus events, student organizations, dining and social coordination',
        expectedMembers: 3456,
        icon: Users,
        isActive: false
    },
    {
        id: 'international-students',
        name: 'International Student Community',
        category: 'cultural',
        description: 'Support network for international students, cultural events, visa help',
        expectedMembers: 2103,
        icon: Heart,
        isActive: false
    }
];
export function UBSpaceTemplateCard({ space, onRequestActivation, onViewDetails, className }) {
    const IconComponent = space.icon;
    return (_jsxs(Card, { className: cn("group hover:shadow-lg transition-all duration-200", "border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]", space.isActive && "ring-2 ring-[var(--hive-brand-secondary)] ring-opacity-20", className), children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("p-2 rounded-lg", space.isActive
                                        ? "bg-[var(--hive-brand-secondary)] bg-opacity-10"
                                        : "bg-[var(--hive-background-tertiary)]"), children: _jsx(IconComponent, { className: cn("h-5 w-5", space.isActive
                                            ? "text-[var(--hive-brand-secondary)]"
                                            : "text-[var(--hive-text-secondary)]") }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: space.name }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { variant: "secondary", className: "text-xs", children: space.category }), space.isActive && (_jsx(Badge, { variant: "success", className: "text-xs", children: "Active" }))] })] })] }), _jsx("div", { className: "text-right", children: _jsxs(Text, { variant: "body-sm", color: "secondary", children: [space.expectedMembers.toLocaleString(), " students"] }) })] }) }), _jsxs(CardContent, { className: "pt-0", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-4", children: space.description }), space.isActive && space.activationRequest && (_jsxs("div", { className: "mb-4 p-3 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Icon, { icon: Users, size: "sm", color: "primary" }), _jsxs(Text, { variant: "body-sm", weight: "medium", children: ["Led by ", space.activationRequest.requesterName] })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: space.activationRequest.leadershipExperience })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { icon: MapPin, size: "sm", color: "secondary" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "University at Buffalo" })] }), _jsx("div", { className: "flex items-center gap-2", children: space.isActive ? (_jsx(Button, { variant: "primary", size: "sm", onClick: () => onViewDetails?.(space.id), children: "Join Space" })) : (_jsx(Button, { variant: "secondary", size: "sm", onClick: () => onRequestActivation?.(space.id), children: "Request to Lead" })) })] })] })] }));
}
export function UBSpacesDirectory({ spaces = UB_SPACE_TEMPLATES, onRequestActivation, onViewDetails, filterCategory, className }) {
    const filteredSpaces = filterCategory
        ? spaces.filter(space => space.category === filterCategory)
        : spaces;
    const activeSpaces = filteredSpaces.filter(space => space.isActive);
    const previewSpaces = filteredSpaces.filter(space => !space.isActive);
    return (_jsxs("div", { className: cn("space-y-6", className), children: [activeSpaces.length > 0 && (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Icon, { icon: Calendar, size: "sm", color: "primary" }), _jsx(Text, { variant: "h3", weight: "semibold", children: "Active Communities" }), _jsx(Badge, { variant: "success", children: activeSpaces.length })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: activeSpaces.map((space) => (_jsx(UBSpaceTemplateCard, { space: space, onRequestActivation: onRequestActivation, onViewDetails: onViewDetails }, space.id))) })] })), previewSpaces.length > 0 && (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Icon, { icon: BookOpen, size: "sm", color: "secondary" }), _jsx(Text, { variant: "h3", weight: "semibold", children: "Coming Soon" }), _jsx(Badge, { variant: "secondary", children: previewSpaces.length })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: previewSpaces.map((space) => (_jsx(UBSpaceTemplateCard, { space: space, onRequestActivation: onRequestActivation, onViewDetails: onViewDetails }, space.id))) })] })), filteredSpaces.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Icon, { icon: Coffee, size: "lg", color: "secondary", className: "mx-auto mb-4" }), _jsx(Text, { variant: "h3", color: "secondary", className: "mb-2", children: "No spaces found" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Try adjusting your filter or check back later for new communities." })] }))] }));
}
export function SpaceActivationModal({ spaceId, spaceName, isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = React.useState({
        leadershipExperience: '',
        communityVision: '',
        commitmentLevel: '',
        contactInfo: ''
    });
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: _jsxs(Card, { className: "w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Icon, { icon: Users, size: "sm", color: "primary" }), "Request to Lead: ", spaceName] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Help us understand why you'd be a great leader for this UB community." }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", weight: "medium", className: "mb-2", children: "Leadership Experience" }), _jsx("textarea", { value: formData.leadershipExperience, onChange: (e) => setFormData(prev => ({ ...prev, leadershipExperience: e.target.value })), placeholder: "Describe your leadership experience at UB or elsewhere...", className: "w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", rows: 3 })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", weight: "medium", className: "mb-2", children: "Community Vision" }), _jsx("textarea", { value: formData.communityVision, onChange: (e) => setFormData(prev => ({ ...prev, communityVision: e.target.value })), placeholder: "What's your vision for this community? How will you help UB students connect and succeed?", className: "w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", rows: 4 })] })] }), _jsxs("div", { className: "flex items-center gap-3 pt-4", children: [_jsx(Button, { variant: "secondary", onClick: onClose, children: "Cancel" }), _jsx(Button, { variant: "primary", onClick: () => onSubmit(formData), children: "Submit Request" })] })] })] }) }));
}
//# sourceMappingURL=ub-space-templates.js.map