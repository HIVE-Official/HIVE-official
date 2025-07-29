"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Settings, Save, ChevronRight, Plus, X, AlertCircle, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../hive-button';
import { Input } from '../../../hive-input';
import { Textarea } from '../../../hive-textarea';
import { Label } from '../../../ui/label';
import { Badge } from '../../../ui/badge';
import { Switch } from '../../../hive-switch';
import { cn } from '../../../../lib/utils';
// Event type templates
const EVENT_TEMPLATES = {
    study_session: {
        title: 'Study Session',
        type: 'study_session',
        duration: 120, // minutes
        location: 'Library - Group Study Room',
        description: 'Collaborative study session for [Course/Subject]',
        tags: ['study', 'academic', 'collaboration'],
        requiresRSVP: true,
        capacity: 8
    },
    social_meetup: {
        title: 'Social Meetup',
        type: 'social_meetup',
        duration: 90,
        location: 'Student Union - Lounge',
        description: 'Casual meetup to connect and socialize',
        tags: ['social', 'networking', 'casual'],
        requiresRSVP: true,
        capacity: 20
    },
    project_work: {
        title: 'Project Work Session',
        type: 'project_work',
        duration: 180,
        location: 'Innovation Lab',
        description: 'Focused work session for group project',
        tags: ['project', 'work', 'collaboration'],
        requiresRSVP: true,
        capacity: 6
    },
    organization_meeting: {
        title: 'Organization Meeting',
        type: 'organization_meeting',
        duration: 60,
        location: 'Conference Room A',
        description: 'Regular organization meeting',
        tags: ['meeting', 'organization', 'official'],
        requiresRSVP: true,
        capacity: 50
    }
};
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
export const EventCreatorTool = ({ config, onEventCreate, onEventUpdate, onConfigChange, existingEvent, className }) => {
    // Form state
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        endTime: '',
        location: '',
        type: 'study_session',
        capacity: 10,
        isPublic: true,
        requiresRSVP: true,
        allowGuests: false,
        tags: [],
        recurrence: {
            type: 'none',
            interval: 1
        },
        ...existingEvent
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [error, setError] = useState(null);
    const [newTag, setNewTag] = useState('');
    const [activeTab, setActiveTab] = useState('details');
    // Form steps
    const FORM_STEPS = [
        { id: 'template', title: 'Choose Template', icon: Calendar },
        { id: 'details', title: 'Event Details', icon: Settings },
        { id: 'settings', title: 'Event Settings', icon: Users },
        { id: 'review', title: 'Review & Create', icon: Check }
    ];
    // Load existing event data
    useEffect(() => {
        if (existingEvent) {
            setEventData(existingEvent);
            setCurrentStep(1); // Skip template selection for existing events
        }
    }, [existingEvent]);
    // Form validation
    const validateForm = useCallback(() => {
        const errors = {};
        if (!eventData.title.trim()) {
            errors.title = 'Event title is required';
        }
        if (!eventData.date) {
            errors.date = 'Event date is required';
        }
        if (!eventData.time) {
            errors.time = 'Event time is required';
        }
        if (!eventData.location.trim()) {
            errors.location = 'Event location is required';
        }
        if (eventData.capacity && eventData.capacity < 1) {
            errors.capacity = 'Capacity must be at least 1';
        }
        if (eventData.capacity && eventData.capacity > config.maxCapacity) {
            errors.capacity = `Capacity cannot exceed ${config.maxCapacity}`;
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }, [eventData, config.maxCapacity]);
    // Handle template selection
    const handleTemplateSelect = (templateKey) => {
        const template = EVENT_TEMPLATES[templateKey];
        const now = new Date();
        const eventDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
        const eventTime = '14:00'; // 2 PM
        const endTime = new Date(eventDate.getTime() + template.duration * 60 * 1000);
        setEventData(prev => ({
            ...prev,
            title: template.title,
            type: template.type,
            location: template.location,
            description: template.description,
            tags: template.tags,
            requiresRSVP: template.requiresRSVP,
            capacity: template.capacity,
            date: eventDate.toISOString().split('T')[0],
            time: eventTime,
            endTime: `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`
        }));
        setCurrentStep(1);
    };
    // Handle form updates
    const updateEventData = (field, value) => {
        setEventData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear validation error for this field
        if (validationErrors[field]) {
            setValidationErrors(prev => {
                const { [field]: removed, ...rest } = prev;
                return rest;
            });
        }
    };
    // Handle tag management
    const addTag = () => {
        if (newTag.trim() && !eventData.tags.includes(newTag.trim())) {
            updateEventData('tags', [...eventData.tags, newTag.trim()]);
            setNewTag('');
        }
    };
    const removeTag = (tagToRemove) => {
        updateEventData('tags', eventData.tags.filter(tag => tag !== tagToRemove));
    };
    // Handle event creation
    const handleCreateEvent = async () => {
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            if (existingEvent) {
                await onEventUpdate?.(existingEvent.id, eventData);
            }
            else {
                await onEventCreate?.(eventData);
            }
            // Reset form for new events
            if (!existingEvent) {
                setEventData({
                    title: '',
                    description: '',
                    date: '',
                    time: '',
                    endTime: '',
                    location: '',
                    type: 'study_session',
                    capacity: 10,
                    isPublic: true,
                    requiresRSVP: true,
                    allowGuests: false,
                    tags: [],
                    recurrence: { type: 'none', interval: 1 }
                });
                setCurrentStep(0);
            }
        }
        catch (error) {
            console.error('Failed to create/update event:', error);
            setError(error instanceof Error
                ? error.message
                : 'Failed to create event. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    const canProceedToNextStep = () => {
        switch (currentStep) {
            case 0:
                return true; // Template selection is optional
            case 1:
                return eventData.title.trim() && eventData.date && eventData.time && eventData.location.trim();
            case 2:
                return true; // Settings step is optional
            case 3:
                return validateForm();
            default:
                return false;
        }
    };
    return (_jsxs(motion.div, { className: cn("event-creator-tool space-y-6", className), variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "bg-gradient-to-br from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5 border-[var(--hive-brand-secondary)]/20", children: _jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-brand-secondary)] rounded-xl flex items-center justify-center", children: _jsx(Calendar, { className: "h-5 w-5 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-bold", children: existingEvent ? 'Edit Event' : 'Create New Event' }), _jsx("p", { className: "text-sm text-gray-600", children: "Professional event planning made simple" })] })] }), existingEvent && (_jsx(Badge, { variant: "outline", className: "bg-blue-50 text-blue-700 border-blue-200", children: "Editing" }))] }) }) }) }), !existingEvent && (_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsx("div", { className: "flex items-center justify-between", children: FORM_STEPS.map((step, index) => {
                                const IconComponent = step.icon;
                                const isActive = index === currentStep;
                                const isCompleted = index < currentStep;
                                return (_jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: cn("flex items-center space-x-2 px-3 py-2 rounded-lg transition-all", isActive && "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]", isCompleted && "text-green-600", !isActive && !isCompleted && "text-gray-400"), children: [_jsx("div", { className: cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", isActive && "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", isCompleted && "bg-green-500 text-[var(--hive-text-primary)]", !isActive && !isCompleted && "bg-gray-200 text-gray-600"), children: isCompleted ? _jsx(Check, { className: "h-3 w-3" }) : index + 1 }), _jsx("span", { className: "text-sm font-medium hidden sm:inline", children: step.title })] }), index < FORM_STEPS.length - 1 && (_jsx(ChevronRight, { className: "h-4 w-4 text-gray-400 mx-2" }))] }, step.id));
                            }) }) }) }) })), _jsxs(AnimatePresence, { mode: "wait", children: [currentStep === 0 && !existingEvent && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Choose an Event Template" }), _jsx("p", { className: "text-sm text-gray-600", children: "Start with a template or create from scratch" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: Object.entries(EVENT_TEMPLATES).map(([key, template]) => (_jsx(Card, { className: "cursor-pointer hover:border-[var(--hive-brand-secondary)]/50 hover:shadow-md transition-all", onClick: () => handleTemplateSelect(key), children: _jsxs(CardContent, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-2", children: template.title }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: template.description }), _jsx("div", { className: "flex flex-wrap gap-1", children: template.tags.map(tag => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, tag))) }), _jsxs("div", { className: "mt-3 text-xs text-gray-500", children: [template.duration, " min \u2022 up to ", template.capacity, " people"] })] }) }, key))) }), _jsx(Button, { variant: "outline", onClick: () => setCurrentStep(1), className: "w-full", children: "Start from Scratch" })] })] }) }, "template")), (currentStep === 1 || existingEvent) && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Event Details" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", children: "Event Title *" }), _jsx(Input, { id: "title", value: eventData.title, onChange: (e) => updateEventData('title', e.target.value), placeholder: "Enter event title", className: validationErrors.title ? "border-red-500" : "" }), validationErrors.title && (_jsxs("p", { className: "text-sm text-red-500 mt-1 flex items-center", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), validationErrors.title] }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", value: eventData.description, onChange: (e) => updateEventData('description', e.target.value), placeholder: "Describe your event...", rows: 3 })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "date", children: "Date *" }), _jsx(Input, { id: "date", type: "date", value: eventData.date, onChange: (e) => updateEventData('date', e.target.value), className: validationErrors.date ? "border-red-500" : "" }), validationErrors.date && (_jsxs("p", { className: "text-sm text-red-500 mt-1 flex items-center", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), validationErrors.date] }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "time", children: "Start Time *" }), _jsx(Input, { id: "time", type: "time", value: eventData.time, onChange: (e) => updateEventData('time', e.target.value), className: validationErrors.time ? "border-red-500" : "" }), validationErrors.time && (_jsxs("p", { className: "text-sm text-red-500 mt-1 flex items-center", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), validationErrors.time] }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "endTime", children: "End Time" }), _jsx(Input, { id: "endTime", type: "time", value: eventData.endTime || '', onChange: (e) => updateEventData('endTime', e.target.value) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "location", children: "Location *" }), _jsx(Input, { id: "location", value: eventData.location, onChange: (e) => updateEventData('location', e.target.value), placeholder: "Enter event location", className: validationErrors.location ? "border-red-500" : "" }), validationErrors.location && (_jsxs("p", { className: "text-sm text-red-500 mt-1 flex items-center", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), validationErrors.location] }))] }), _jsxs("div", { children: [_jsx(Label, { children: "Event Type" }), _jsxs(Select, { value: eventData.type, onValueChange: (value) => updateEventData('type', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "study_session", children: "Study Session" }), _jsx(SelectItem, { value: "social_meetup", children: "Social Meetup" }), _jsx(SelectItem, { value: "project_work", children: "Project Work" }), _jsx(SelectItem, { value: "organization_meeting", children: "Organization Meeting" }), _jsx(SelectItem, { value: "campus_event", children: "Campus Event" }), _jsx(SelectItem, { value: "custom", children: "Custom" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: eventData.tags.map(tag => (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [tag, _jsx("button", { onClick: () => removeTag(tag), className: "ml-1 hover:text-red-500", children: _jsx(X, { className: "h-3 w-3" }) })] }, tag))) }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { value: newTag, onChange: (e) => setNewTag(e.target.value), placeholder: "Add a tag", onKeyPress: (e) => e.key === 'Enter' && addTag() }), _jsx(Button, { onClick: addTag, size: "sm", children: _jsx(Plus, { className: "h-4 w-4" }) })] })] })] })] }) }, "details")), currentStep === 2 && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Event Settings" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "capacity", children: "Event Capacity" }), _jsx(Input, { id: "capacity", type: "number", min: "1", max: config.maxCapacity, value: eventData.capacity || '', onChange: (e) => updateEventData('capacity', e.target.value ? parseInt(e.target.value) : undefined), placeholder: "No limit", className: validationErrors.capacity ? "border-red-500" : "" }), validationErrors.capacity && (_jsxs("p", { className: "text-sm text-red-500 mt-1 flex items-center", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), validationErrors.capacity] }))] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { children: "Public Event" }), _jsx("p", { className: "text-sm text-gray-600", children: "Anyone can see this event" })] }), _jsx(Switch, { checked: eventData.isPublic, onCheckedChange: (checked) => updateEventData('isPublic', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { children: "Require RSVP" }), _jsx("p", { className: "text-sm text-gray-600", children: "Attendees must RSVP to join" })] }), _jsx(Switch, { checked: eventData.requiresRSVP, onCheckedChange: (checked) => updateEventData('requiresRSVP', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { children: "Allow Guests" }), _jsx("p", { className: "text-sm text-gray-600", children: "Members can bring guests" })] }), _jsx(Switch, { checked: eventData.allowGuests, onCheckedChange: (checked) => updateEventData('allowGuests', checked) })] })] }), config.allowRecurring && (_jsxs("div", { children: [_jsx(Label, { children: "Recurrence" }), _jsxs(Select, { value: eventData.recurrence?.type || 'none', onValueChange: (value) => updateEventData('recurrence', {
                                                        ...eventData.recurrence,
                                                        type: value
                                                    }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "none", children: "One-time event" }), _jsx(SelectItem, { value: "daily", children: "Daily" }), _jsx(SelectItem, { value: "weekly", children: "Weekly" }), _jsx(SelectItem, { value: "monthly", children: "Monthly" })] })] })] }))] })] }) }, "settings")), currentStep === 3 && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Review Your Event" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "bg-gray-50 rounded-lg p-4 space-y-3", children: [_jsx("h3", { className: "font-semibold text-lg", children: eventData.title }), eventData.description && (_jsx("p", { className: "text-gray-600", children: eventData.description })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-gray-500" }), _jsx("span", { children: new Date(eventData.date).toLocaleDateString() })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "h-4 w-4 text-gray-500" }), _jsxs("span", { children: [eventData.time, " - ", eventData.endTime || 'No end time'] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-gray-500" }), _jsx("span", { children: eventData.location })] }), eventData.capacity && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "h-4 w-4 text-gray-500" }), _jsxs("span", { children: ["Up to ", eventData.capacity, " people"] })] }))] }), eventData.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1", children: eventData.tags.map(tag => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, tag))) })), _jsxs("div", { className: "flex flex-wrap gap-2 text-xs", children: [eventData.isPublic && _jsx(Badge, { variant: "outline", children: "Public" }), eventData.requiresRSVP && _jsx(Badge, { variant: "outline", children: "RSVP Required" }), eventData.allowGuests && _jsx(Badge, { variant: "outline", children: "Guests Allowed" })] })] }) }) })] }) }, "review"))] }), error && (_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "border-red-200 bg-red-50", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center space-x-2 text-red-700", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx("span", { children: error }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setError(null), className: "ml-auto h-6 w-6 p-0", children: _jsx(X, { className: "h-3 w-3" }) })] }) }) }) })), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep(prev => Math.max(0, prev - 1)), disabled: currentStep === 0 || !!existingEvent, children: "Previous" }), _jsx("div", { className: "flex space-x-2", children: currentStep < 3 && !existingEvent ? (_jsxs(Button, { onClick: () => setCurrentStep(prev => prev + 1), disabled: !canProceedToNextStep(), className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", children: ["Next", _jsx(ChevronRight, { className: "h-4 w-4 ml-1" })] })) : (_jsxs(Button, { onClick: handleCreateEvent, disabled: !validateForm() || isLoading, className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), isLoading ? 'Creating...' : existingEvent ? 'Update Event' : 'Create Event'] })) })] }) }) }) })] }));
};
export default EventCreatorTool;
//# sourceMappingURL=EventCreatorTool.js.map