'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Text } from '../../ui/typography';
import { cn } from '../lib/utils';
import { Eye, Share2, Settings, CheckSquare, Clock, Users, Calendar, FileText, Zap } from 'lucide-react';
export const UB_TOOL_TEMPLATES = [
    {
        id: 'study-group-scheduler',
        name: 'Study Group Scheduler',
        description: 'Coordinate study sessions with availability polling and location booking',
        category: 'academic',
        icon: Calendar,
        complexity: 'simple',
        campusUseCase: 'CS students organizing algorithm study sessions in Lockwood Library',
        expectedUsers: 25,
        buildTime: '5 minutes'
    },
    {
        id: 'dorm-laundry-tracker',
        name: 'Dorm Laundry Tracker',
        description: 'Track laundry machine availability and queue notifications',
        category: 'campus-life',
        icon: Clock,
        complexity: 'simple',
        campusUseCase: 'Ellicott residents coordinating laundry room usage',
        expectedUsers: 150,
        buildTime: '3 minutes'
    },
    {
        id: 'group-food-orders',
        name: 'Group Food Orders',
        description: 'Coordinate bulk food orders with cost splitting and delivery',
        category: 'social',
        icon: Users,
        complexity: 'medium',
        campusUseCase: 'Governors residents ordering from local Buffalo restaurants',
        expectedUsers: 40,
        buildTime: '10 minutes'
    },
    {
        id: 'project-team-matcher',
        name: 'Project Team Matcher',
        description: 'Match students for class projects based on skills and availability',
        category: 'academic',
        icon: Users,
        complexity: 'medium',
        campusUseCase: 'Engineering students forming capstone project teams',
        expectedUsers: 80,
        buildTime: '15 minutes'
    },
    {
        id: 'campus-event-poll',
        name: 'Campus Event Poll',
        description: 'Quick polls for event planning and decision making',
        category: 'coordination',
        icon: CheckSquare,
        complexity: 'simple',
        campusUseCase: 'Student org planning Spring Fest activities',
        expectedUsers: 200,
        buildTime: '2 minutes'
    },
    {
        id: 'room-booking-helper',
        name: 'Room Booking Helper',
        description: 'Coordinate group bookings of study rooms and meeting spaces',
        category: 'academic',
        icon: FileText,
        complexity: 'simple',
        campusUseCase: 'Group study sessions in Student Union conference rooms',
        expectedUsers: 60,
        buildTime: '5 minutes'
    }
];
export function SimpleToolBuilder({ selectedTemplate, onTemplateSelect, onBuildTool, className }) {
    const [buildConfig, setBuildConfig] = React.useState({
        toolName: '',
        description: '',
        targetSpace: '',
        isPublic: false,
        settings: {}
    });
    const [activeStep, setActiveStep] = React.useState('select');
    React.useEffect(() => {
        if (selectedTemplate) {
            setBuildConfig(prev => ({
                ...prev,
                toolName: selectedTemplate.name,
                description: selectedTemplate.description
            }));
            setActiveStep('configure');
        }
    }, [selectedTemplate]);
    return (_jsxs("div", { className: cn("max-w-4xl mx-auto space-y-6", className), children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [_jsx(Zap, { className: "h-6 w-6 text-[var(--hive-brand-secondary)]" }), _jsx(Text, { variant: "h1", weight: "bold", children: "UB Campus Tool Builder" })] }), _jsx(Text, { variant: "body-lg", color: "secondary", children: "Build coordination tools for your campus community in minutes" })] }), _jsx("div", { className: "flex items-center justify-center gap-4 mb-8", children: ['select', 'configure', 'preview'].map((step, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", activeStep === step
                                ? "bg-[var(--hive-brand-secondary)] text-white"
                                : index < ['select', 'configure', 'preview'].indexOf(activeStep)
                                    ? "bg-[var(--hive-status-success)] text-white"
                                    : "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)]"), children: index + 1 }), _jsx(Text, { variant: "body-sm", weight: "medium", color: activeStep === step ? 'primary' : 'secondary', children: step === 'select' ? 'Choose Template' :
                                step === 'configure' ? 'Configure Tool' : 'Preview & Build' }), index < 2 && (_jsx("div", { className: "w-8 h-px bg-[var(--hive-border-default)]" }))] }, step))) }), activeStep === 'select' && (_jsx(ToolTemplateSelection, { templates: UB_TOOL_TEMPLATES, onSelectTemplate: (template) => {
                    onTemplateSelect?.(template);
                    setActiveStep('configure');
                } })), activeStep === 'configure' && selectedTemplate && (_jsx(ToolConfiguration, { template: selectedTemplate, config: buildConfig, onConfigChange: setBuildConfig, onNext: () => setActiveStep('preview'), onBack: () => setActiveStep('select') })), activeStep === 'preview' && selectedTemplate && (_jsx(ToolPreview, { template: selectedTemplate, config: buildConfig, onBuild: () => onBuildTool?.(selectedTemplate, buildConfig), onBack: () => setActiveStep('configure') }))] }));
}
export function ToolTemplateSelection({ templates, onSelectTemplate }) {
    const categorizedTemplates = templates.reduce((acc, template) => {
        if (!acc[template.category])
            acc[template.category] = [];
        acc[template.category].push(template);
        return acc;
    }, {});
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "h2", weight: "semibold", className: "mb-2", children: "Choose Your Tool Template" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Select from UB-optimized templates designed for campus life" })] }), Object.entries(categorizedTemplates).map(([category, categoryTemplates]) => (_jsxs("div", { children: [_jsxs(Text, { variant: "h3", weight: "semibold", className: "mb-4 capitalize", children: [category.replace('-', ' '), " Tools"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: categoryTemplates.map((template) => (_jsx(ToolTemplateCard, { template: template, onSelect: () => onSelectTemplate(template) }, template.id))) })] }, category)))] }));
}
function ToolTemplateCard({ template, onSelect }) {
    const IconComponent = template.icon;
    return (_jsxs(Card, { className: "group hover:shadow-lg transition-all duration-200 cursor-pointer border-[var(--hive-border-default)]", onClick: onSelect, children: [_jsx(CardHeader, { className: "pb-3", children: _jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-[var(--hive-brand-secondary)] bg-opacity-10", children: _jsx(IconComponent, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: template.name }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { variant: "secondary", className: "text-xs", children: template.complexity }), _jsx(Badge, { variant: "ghost", className: "text-xs", children: template.buildTime })] })] })] }) }) }), _jsxs(CardContent, { className: "pt-0", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-3", children: template.description }), _jsxs("div", { className: "p-3 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] mb-4", children: [_jsx(Text, { variant: "body-xs", weight: "medium", className: "mb-1", children: "Campus Use Case:" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: template.campusUseCase })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4 text-[var(--hive-text-secondary)]" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["~", template.expectedUsers, " users"] })] }), _jsx(Button, { variant: "primary", size: "sm", children: "Build This Tool" })] })] })] }));
}
export function ToolConfiguration({ template, config, onConfigChange, onNext, onBack }) {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Settings, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" }), "Configure: ", template.name] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", weight: "medium", className: "mb-2", children: "Tool Name" }), _jsx("input", { type: "text", value: config.toolName, onChange: (e) => onConfigChange({ ...config, toolName: e.target.value }), placeholder: "Enter a name for your tool...", className: "w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", weight: "medium", className: "mb-2", children: "Description" }), _jsx("textarea", { value: config.description, onChange: (e) => onConfigChange({ ...config, description: e.target.value }), placeholder: "Describe how your UB community will use this tool...", className: "w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", rows: 3 })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", weight: "medium", className: "mb-2", children: "Target Space (Optional)" }), _jsxs("select", { value: config.targetSpace, onChange: (e) => onConfigChange({ ...config, targetSpace: e.target.value }), className: "w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "", children: "Available to all spaces" }), _jsx("option", { value: "cse-department", children: "CSE Department" }), _jsx("option", { value: "ellicott-complex", children: "Ellicott Complex" }), _jsx("option", { value: "governors-complex", children: "Governors Complex" }), _jsx("option", { value: "student-union", children: "Student Union" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", id: "isPublic", checked: config.isPublic, onChange: (e) => onConfigChange({ ...config, isPublic: e.target.checked }), className: "rounded border-[var(--hive-border-default)]" }), _jsx("label", { htmlFor: "isPublic", children: _jsx(Text, { variant: "body-sm", weight: "medium", children: "Make tool publicly visible in campus marketplace" }) })] }), _jsxs("div", { className: "flex items-center gap-3 pt-4", children: [_jsx(Button, { variant: "secondary", onClick: onBack, children: "Back to Templates" }), _jsx(Button, { variant: "primary", onClick: onNext, disabled: !config.toolName.trim(), children: "Preview Tool" })] })] })] }));
}
export function ToolPreview({ template, config, onBuild, onBack }) {
    const IconComponent = template.icon;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Eye, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" }), "Preview: ", config.toolName] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "p-6 rounded-lg border-2 border-dashed border-[var(--hive-border-default)] bg-[var(--hive-background-primary)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "p-3 rounded-lg bg-[var(--hive-brand-secondary)] bg-opacity-10", children: _jsx(IconComponent, { className: "h-6 w-6 text-[var(--hive-brand-secondary)]" }) }), _jsxs("div", { children: [_jsx(Text, { variant: "h3", weight: "semibold", children: config.toolName }), _jsx(Text, { variant: "body-sm", color: "secondary", children: config.description })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4", children: [_jsxs("div", { className: "text-center p-3 rounded-lg bg-[var(--hive-background-secondary)]", children: [_jsx(Text, { variant: "body-sm", weight: "medium", children: "Category" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "capitalize", children: template.category.replace('-', ' ') })] }), _jsxs("div", { className: "text-center p-3 rounded-lg bg-[var(--hive-background-secondary)]", children: [_jsx(Text, { variant: "body-sm", weight: "medium", children: "Expected Users" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["~", template.expectedUsers, " UB students"] })] }), _jsxs("div", { className: "text-center p-3 rounded-lg bg-[var(--hive-background-secondary)]", children: [_jsx(Text, { variant: "body-sm", weight: "medium", children: "Availability" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: config.isPublic ? 'Campus-wide' : 'Space-specific' })] })] }), _jsxs("div", { className: "text-center py-8 border-2 border-dashed border-[var(--hive-border-default)] rounded-lg", children: [_jsx(Text, { variant: "body-md", color: "secondary", children: "\uD83D\uDEE0\uFE0F Interactive tool interface will appear here" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Ready to deploy to your UB community" })] })] }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Button, { variant: "secondary", onClick: onBack, children: "Back to Configuration" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(Share2, { className: "h-4 w-4 mr-2" }), "Share Preview"] }), _jsxs(Button, { variant: "primary", onClick: onBuild, children: [_jsx(Zap, { className: "h-4 w-4 mr-2" }), "Build & Deploy Tool"] })] })] })] }));
}
//# sourceMappingURL=simple-tool-builder.js.map