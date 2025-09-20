"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useCallback } from 'react';
import { HiveCard, HiveButton, HiveInput, HiveTextarea, HiveBadge } from '../index';
import { Calendar, MapPin, Users, Settings, Eye, Save, Share, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { validateEventDefinition } from './event-system-core';
const EVENT_CATEGORIES = [
    { value: 'academic', label: 'Academic', description: 'Study sessions, lectures, workshops' },
    { value: 'social', label: 'Social', description: 'Parties, mixers, casual hangouts' },
    { value: 'professional', label: 'Professional', description: 'Networking, career events, speakers' },
    { value: 'wellness', label: 'Wellness', description: 'Fitness, mental health, outdoor activities' },
    { value: 'cultural', label: 'Cultural', description: 'Arts, music, cultural celebrations' },
    { value: 'service', label: 'Service', description: 'Volunteering, community service' },
    { value: 'sports', label: 'Sports', description: 'Athletic events, intramurals' },
    { value: 'other', label: 'Other', description: 'Miscellaneous events' },
];
const EVENT_TYPES = [
    { value: 'meeting', label: 'Meeting' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'party', label: 'Party' },
    { value: 'study_session', label: 'Study Session' },
    { value: 'presentation', label: 'Presentation' },
    { value: 'competition', label: 'Competition' },
    { value: 'fundraiser', label: 'Fundraiser' },
    { value: 'volunteer', label: 'Volunteer Event' },
];
export function EventCreatorTool({ spaceId, onEventCreated, onCancel, initialEvent }) {
    const [eventData, setEventData] = useState({
        spaceId,
        title: '',
        description: '',
        category: 'social',
        type: 'meeting',
        startDate: new Date(),
        endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours later
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        isAllDay: false,
        location: {
            type: 'on_campus',
            venue: '',
            room: '',
        },
        capacity: 50,
        requiresRSVP: true,
        allowGuests: false,
        guestLimit: 1,
        visibility: 'space_only',
        coHostingSpaces: [],
        status: 'draft',
        tags: [],
        ...initialEvent,
    });
    const [errors, setErrors] = useState([]);
    const [currentStep, setCurrentStep] = useState('basic');
    const [isLoading, setIsLoading] = useState(false);
    const updateEventData = useCallback((updates) => {
        setEventData(prev => ({ ...prev, ...updates }));
        // Clear errors when user makes changes
        if (errors.length > 0) {
            setErrors([]);
        }
    }, [errors.length]);
    const validateCurrentStep = () => {
        const validationErrors = validateEventDefinition(eventData);
        setErrors(validationErrors);
        return validationErrors.length === 0;
    };
    const handleStepChange = (step) => {
        if (step === 'preview' && !validateCurrentStep()) {
            return;
        }
        setCurrentStep(step);
    };
    const formatDateTime = (date) => {
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };
    const handleSaveEvent = async (publish = false) => {
        if (!validateCurrentStep()) {
            return;
        }
        setIsLoading(true);
        try {
            const newEvent = {
                ...eventData,
                id: `event_${Date.now()}`,
                spaceId: spaceId,
                createdBy: 'current_user', // TODO: Get from auth context
                status: publish ? 'published' : 'draft',
                createdAt: new Date(),
                updatedAt: new Date(),
                title: eventData.title,
                description: eventData.description,
                category: eventData.category,
                type: eventData.type,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                timezone: eventData.timezone,
                isAllDay: eventData.isAllDay,
                location: eventData.location,
                requiresRSVP: eventData.requiresRSVP,
                allowGuests: eventData.allowGuests,
                visibility: eventData.visibility,
                coHostingSpaces: eventData.coHostingSpaces,
                tags: eventData.tags,
            };
            // TODO: API call to save event
            console.log('Saving event:', newEvent);
            onEventCreated?.(newEvent);
        }
        catch (error) {
            console.error('Error saving event:', error);
            setErrors(['Failed to save event. Please try again.']);
        }
        finally {
            setIsLoading(false);
        }
    };
    const renderBasicInfo = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Event Title *" }), _jsx(HiveInput, { value: eventData.title || '', onChange: (e) => updateEventData({ title: e.target.value }), placeholder: "Enter event title...", className: "text-lg font-semibold" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Description" }), _jsx(HiveTextarea, { value: eventData.description || '', onChange: (e) => updateEventData({ description: e.target.value }), placeholder: "Describe your event...", rows: 4 })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Category" }), _jsx("select", { value: eventData.category, onChange: (e) => updateEventData({ category: e.target.value }), className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: EVENT_CATEGORIES.map(cat => (_jsx("option", { value: cat.value, children: cat.label }, cat.value))) }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: EVENT_CATEGORIES.find(c => c.value === eventData.category)?.description })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Event Type" }), _jsx("select", { value: eventData.type, onChange: (e) => updateEventData({ type: e.target.value }), className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: EVENT_TYPES.map(type => (_jsx("option", { value: type.value, children: type.label }, type.value))) })] })] })] }));
    const renderDateTime = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Start Date & Time *" }), _jsx("input", { type: "datetime-local", value: eventData.startDate?.toISOString().slice(0, 16) || '', onChange: (e) => updateEventData({ startDate: new Date(e.target.value) }), className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "End Date & Time *" }), _jsx("input", { type: "datetime-local", value: eventData.endDate?.toISOString().slice(0, 16) || '', onChange: (e) => updateEventData({ endDate: new Date(e.target.value) }), className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] })] }), _jsx("div", { children: _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: eventData.isAllDay, onChange: (e) => updateEventData({ isAllDay: e.target.checked }), className: "rounded border-gray-300 focus:ring-amber-500" }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: "All-day event" })] }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Location" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("select", { value: eventData.location?.type || 'on_campus', onChange: (e) => updateEventData({
                                    location: { ...eventData.location, type: e.target.value }
                                }), className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "on_campus", children: "On Campus" }), _jsx("option", { value: "off_campus", children: "Off Campus" }), _jsx("option", { value: "virtual", children: "Virtual" }), _jsx("option", { value: "hybrid", children: "Hybrid" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [_jsx(HiveInput, { value: eventData.location?.venue || '', onChange: (e) => updateEventData({
                                            location: { ...eventData.location, venue: e.target.value }
                                        }), placeholder: "Venue name..." }), _jsx(HiveInput, { value: eventData.location?.room || '', onChange: (e) => updateEventData({
                                            location: { ...eventData.location, room: e.target.value }
                                        }), placeholder: "Room/Address..." })] })] })] })] }));
    const renderSettings = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "RSVP Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: eventData.requiresRSVP, onChange: (e) => updateEventData({ requiresRSVP: e.target.checked }), className: "rounded border-gray-300 focus:ring-amber-500" }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: "Require RSVP" })] }), eventData.requiresRSVP && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Capacity Limit" }), _jsx(HiveInput, { type: "number", value: eventData.capacity || '', onChange: (e) => updateEventData({ capacity: parseInt(e.target.value) || undefined }), placeholder: "Maximum attendees...", min: "1" })] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: eventData.allowGuests, onChange: (e) => updateEventData({ allowGuests: e.target.checked }), className: "rounded border-gray-300 focus:ring-amber-500" }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: "Allow guests" })] }), eventData.allowGuests && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Guest limit per person" }), _jsx(HiveInput, { type: "number", value: eventData.guestLimit || 1, onChange: (e) => updateEventData({ guestLimit: parseInt(e.target.value) || 1 }), min: "1", max: "10" })] }))] }))] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Visibility" }), _jsxs("select", { value: eventData.visibility, onChange: (e) => updateEventData({ visibility: e.target.value }), className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "space_only", children: "Space Members Only" }), _jsx("option", { value: "public", children: "Public (Campus-wide)" }), _jsx("option", { value: "private", children: "Private (Invite Only)" })] })] })] }));
    const renderPreview = () => (_jsx("div", { className: "space-y-6", children: _jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: eventData.title }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600 mb-4", children: [_jsx(HiveBadge, { variant: "outline", children: EVENT_CATEGORIES.find(c => c.value === eventData.category)?.label }), _jsx(HiveBadge, { variant: "outline", children: EVENT_TYPES.find(t => t.value === eventData.type)?.label })] })] }), _jsx(HiveBadge, { variant: eventData.status === 'published' ? 'default' : 'outline', children: eventData.status })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Calendar, { className: "w-5 h-5 text-amber-600 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: eventData.startDate && formatDateTime(eventData.startDate) }), eventData.endDate && (_jsxs("p", { className: "text-sm text-gray-600", children: ["Until ", formatDateTime(eventData.endDate)] }))] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(MapPin, { className: "w-5 h-5 text-amber-600 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: eventData.location?.venue || 'TBD' }), eventData.location?.room && (_jsx("p", { className: "text-sm text-gray-600", children: eventData.location.room }))] })] }), eventData.requiresRSVP && (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Users, { className: "w-5 h-5 text-amber-600 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "RSVP Required" }), eventData.capacity && (_jsxs("p", { className: "text-sm text-gray-600", children: ["Limited to ", eventData.capacity, " attendees"] }))] })] }))] }), eventData.description && (_jsx("div", { className: "mt-6 pt-6 border-t border-gray-200", children: _jsx("p", { className: "text-gray-700 whitespace-pre-wrap", children: eventData.description }) }))] }) }));
    const steps = [
        { id: 'basic', label: 'Basic Info', icon: Settings },
        { id: 'details', label: 'Date & Location', icon: Calendar },
        { id: 'settings', label: 'Settings', icon: Users },
        { id: 'preview', label: 'Preview', icon: Eye },
    ];
    return (_jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Create Event" }), _jsx("p", { className: "text-gray-600", children: "Plan and coordinate campus events with your community" })] }), _jsx("div", { className: "mb-8", children: _jsx("div", { className: "flex items-center justify-between", children: steps.map((step, index) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                        return (_jsxs(React.Fragment, { children: [_jsxs("button", { onClick: () => handleStepChange(step.id), className: cn("flex items-center gap-2 px-4 py-2 rounded-lg transition-colors", isActive && "bg-amber-100 text-amber-800", isCompleted && "bg-green-100 text-green-800", !isActive && !isCompleted && "text-gray-500 hover:text-gray-700"), children: [_jsx(step.icon, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: step.label })] }), index < steps.length - 1 && (_jsx("div", { className: cn("flex-1 h-px mx-4", isCompleted ? "bg-green-300" : "bg-gray-300") }))] }, step.id));
                    }) }) }), errors.length > 0 && (_jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-red-800 mb-1", children: "Please fix the following errors:" }), _jsx("ul", { className: "text-sm text-red-700 space-y-1", children: errors.map((error, index) => (_jsxs("li", { children: ["\u2022 ", error] }, index))) })] })] }) })), _jsxs(HiveCard, { className: "p-8 mb-8", children: [currentStep === 'basic' && renderBasicInfo(), currentStep === 'details' && renderDateTime(), currentStep === 'settings' && renderSettings(), currentStep === 'preview' && renderPreview()] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex gap-3", children: onCancel && (_jsx(HiveButton, { variant: "outline", onClick: onCancel, children: "Cancel" })) }), _jsxs("div", { className: "flex gap-3", children: [currentStep !== 'basic' && (_jsx(HiveButton, { variant: "outline", onClick: () => {
                                    const currentIndex = steps.findIndex(s => s.id === currentStep);
                                    if (currentIndex > 0) {
                                        setCurrentStep(steps[currentIndex - 1].id);
                                    }
                                } })), "> Back"] }), ")}", currentStep === 'preview' ? (_jsxs(_Fragment, { children: [_jsxs(HiveButton, { variant: "outline", onClick: () => handleSaveEvent(false), disabled: isLoading, children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Save Draft"] }), _jsxs(HiveButton, { onClick: () => handleSaveEvent(true), disabled: isLoading, children: [_jsx(Share, { className: "w-4 h-4 mr-2" }), "Publish Event"] })] })) : (_jsx(HiveButton, { onClick: () => {
                            const currentIndex = steps.findIndex(s => s.id === currentStep);
                            if (currentIndex < steps.length - 1) {
                                handleStepChange(steps[currentIndex + 1].id);
                            }
                        } })), "> Next"] }), ")}"] }));
    div >
    ;
    div >
    ;
}
export default EventCreatorTool;
//# sourceMappingURL=event-creator-tool.js.map