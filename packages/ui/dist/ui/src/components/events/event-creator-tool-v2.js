"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Event Creator Tool - Built with Event Elements
 *
 * This tool is composed entirely of reusable elements from the event system.
 * Students can see exactly how tools are built from elements.
 */
import React, { useState, useCallback } from 'react';
import { Save, Share, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { validateEventDefinition } from './event-system-core.js';
import { TextInputElement, DatePickerElement, LocationElement, SelectElement, NumberInputElement, CheckboxElement, RadioElement, EventCardElement, ConditionalElement, } from './event-elements.js';
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
const VISIBILITY_OPTIONS = [
    {
        value: 'space_only',
        label: 'Space Members Only',
        description: 'Only members of this space can see and attend'
    },
    {
        value: 'public',
        label: 'Public (Campus-wide)',
        description: 'Anyone on campus can discover and attend'
    },
    {
        value: 'private',
        label: 'Private (Invite Only)',
        description: 'Only invited people can see and attend'
    },
];
export function EventCreatorToolV2({ spaceId, onEventCreated, onCancel, initialEvent }) {
    // Tool State - managed by the tool, not individual elements
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
    // Generic update function for any field
    const updateField = useCallback((field, value) => {
        setEventData(prev => ({ ...prev, [field]: value }));
        // Clear errors when user makes changes
        if (errors.length > 0) {
            setErrors([]);
        }
    }, [errors.length]);
    const validateAndProceed = (nextStep) => {
        const validationErrors = validateEventDefinition(eventData);
        setErrors(validationErrors);
        if (validationErrors.length === 0) {
            setCurrentStep(nextStep);
        }
    };
    const handleSaveEvent = async (publish = false) => {
        const validationErrors = validateEventDefinition(eventData);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
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
                // Required fields with fallbacks
                title: eventData.title,
                description: eventData.description || '',
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
    // Step 1: Basic Information (Uses 4 elements)
    const renderBasicStep = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Basic Information" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Tell us about your event" })] }), _jsx(TextInputElement, { id: "event-title", label: "Event Title", value: eventData.title, onChange: (value) => updateField('title', value), placeholder: "Enter event title...", required: true, maxLength: 100 }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-900", children: "Description" }), _jsx("textarea", { value: eventData.description || '', onChange: (e) => updateField('description', e.target.value), placeholder: "Describe your event...", rows: 4, className: "w-full p-2 border border-[var(--hive-border-default)] rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(SelectElement, { id: "event-category", label: "Category", value: eventData.category, onChange: (value) => updateField('category', value), options: EVENT_CATEGORIES, required: true }), _jsx(SelectElement, { id: "event-type", label: "Event Type", value: eventData.type, onChange: (value) => updateField('type', value), options: EVENT_TYPES, required: true })] })] }));
    // Step 2: Date & Location (Uses 3 elements)
    const renderDateTimeStep = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "When & Where" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Set the date, time, and location" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(DatePickerElement, { id: "start-date", label: "Start Date & Time", value: eventData.startDate, onChange: (value) => updateField('startDate', value), minDate: new Date(), required: true }), _jsx(DatePickerElement, { id: "end-date", label: "End Date & Time", value: eventData.endDate, onChange: (value) => updateField('endDate', value), minDate: eventData.startDate, required: true })] }), _jsx(CheckboxElement, { id: "all-day", label: "All-day event", value: eventData.isAllDay, onChange: (value) => updateField('isAllDay', value), description: "Event runs for the entire day" }), _jsx(LocationElement, { id: "event-location", label: "Location", value: eventData.location, onChange: (value) => updateField('location', value), required: true })] }));
    // Step 3: Settings (Uses 5 elements)
    const renderSettingsStep = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Event Settings" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Configure attendance and visibility" })] }), _jsx(CheckboxElement, { id: "requires-rsvp", label: "Require RSVP", value: eventData.requiresRSVP, onChange: (value) => updateField('requiresRSVP', value), description: "Attendees must RSVP to attend this event" }), _jsx(ConditionalElement, { condition: eventData.requiresRSVP === true, children: _jsx(NumberInputElement, { id: "capacity", label: "Capacity Limit", value: eventData.capacity, onChange: (value) => updateField('capacity', value), min: 1, max: 1000, placeholder: "Maximum attendees..." }) }), _jsx(ConditionalElement, { condition: eventData.requiresRSVP === true, children: _jsx(CheckboxElement, { id: "allow-guests", label: "Allow guests", value: eventData.allowGuests, onChange: (value) => updateField('allowGuests', value), description: "Let attendees bring guests to the event" }) }), _jsx(ConditionalElement, { condition: eventData.allowGuests === true, children: _jsx(NumberInputElement, { id: "guest-limit", label: "Guest limit per person", value: eventData.guestLimit, onChange: (value) => updateField('guestLimit', value), min: 1, max: 10, placeholder: "1" }) }), _jsx(RadioElement, { id: "visibility", label: "Event Visibility", value: eventData.visibility, onChange: (value) => updateField('visibility', value), options: VISIBILITY_OPTIONS })] }));
    // Step 4: Preview (Uses 1 element)
    const renderPreviewStep = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Preview Your Event" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "This is how your event will appear to others" })] }), _jsx(EventCardElement, { id: "event-preview", event: {
                    title: eventData.title || 'Untitled Event',
                    startDate: eventData.startDate || new Date(),
                    endDate: eventData.endDate,
                    location: eventData.location,
                    category: eventData.category,
                    capacity: eventData.capacity,
                    rsvpCount: 0,
                    status: eventData.status,
                }, showActions: false }), _jsx("div", { className: "bg-amber-50 border border-amber-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-amber-600 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-amber-800 mb-1", children: "Ready to publish?" }), _jsx("p", { className: "text-sm text-amber-700", children: "Once published, your event will be visible to others and they can start RSVPing. You can always edit event details later." })] })] }) })] }));
    const steps = [
        { id: 'basic', label: 'Basic Info', component: renderBasicStep },
        { id: 'datetime', label: 'Date & Location', component: renderDateTimeStep },
        { id: 'settings', label: 'Settings', component: renderSettingsStep },
        { id: 'preview', label: 'Preview', component: renderPreviewStep },
    ];
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);
    const currentStepData = steps[currentStepIndex];
    return (_jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Create Event" }), _jsxs("p", { className: "text-[var(--hive-text-muted)]", children: ["Built with ", _jsxs("span", { className: "font-medium text-amber-600", children: [steps.reduce((acc, step) => {
                                        if (step.id === 'basic')
                                            return acc + 4;
                                        if (step.id === 'datetime')
                                            return acc + 4;
                                        if (step.id === 'settings')
                                            return acc + 5;
                                        if (step.id === 'preview')
                                            return acc + 1;
                                        return acc;
                                    }, 0), " reusable elements"] }), " from the HIVE Event System"] })] }), _jsx("div", { className: "mb-8", children: _jsx("div", { className: "flex items-center justify-between", children: steps.map((step, index) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = currentStepIndex > index;
                        return (_jsxs(React.Fragment, { children: [_jsxs("div", { className: cn("flex items-center gap-2 px-4 py-2 rounded-lg transition-colors", isActive && "bg-amber-100 text-amber-800", isCompleted && "bg-green-100 text-green-800", !isActive && !isCompleted && "text-gray-500"), children: [_jsx("div", { className: cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium", isActive && "bg-amber-600 text-[var(--hive-text-inverse)]", isCompleted && "bg-green-600 text-[var(--hive-text-inverse)]", !isActive && !isCompleted && "bg-gray-300 text-[var(--hive-text-muted)]"), children: index + 1 }), _jsx("span", { className: "text-sm font-medium", children: step.label })] }), index < steps.length - 1 && (_jsx("div", { className: cn("flex-1 h-px mx-4", isCompleted ? "bg-green-300" : "bg-gray-300") }))] }, step.id));
                    }) }) }), errors.length > 0 && (_jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-red-800 mb-1", children: "Please fix the following errors:" }), _jsx("ul", { className: "text-sm text-red-700 space-y-1", children: errors.map((error, index) => (_jsxs("li", { children: ["\u2022 ", error] }, index))) })] })] }) })), _jsx(Card, { className: "p-8 mb-8", children: currentStepData.component() }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex gap-3", children: onCancel && (_jsx(Button, { variant: "secondary", onClick: onCancel, children: "Cancel" })) }), _jsxs("div", { className: "flex gap-3", children: [currentStepIndex > 0 && (_jsxs(Button, { variant: "secondary", onClick: () => setCurrentStep(steps[currentStepIndex - 1].id), children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Back"] })), currentStep === 'preview' ? (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "secondary", onClick: () => handleSaveEvent(false), disabled: isLoading, children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Save Draft"] }), _jsxs(Button, { onClick: () => handleSaveEvent(true), disabled: isLoading, children: [_jsx(Share, { className: "w-4 h-4 mr-2" }), "Publish Event"] })] })) : (_jsxs(Button, { onClick: () => validateAndProceed(steps[currentStepIndex + 1].id), children: ["Next", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }))] })] }), _jsxs("div", { className: "mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [_jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "\uD83E\uDDE9 Element System in Action" }), _jsxs("p", { className: "text-sm text-blue-700 mb-2", children: ["This Event Creator tool is built from ", _jsx("strong", { children: "14 reusable elements" }), ":"] }), _jsxs("div", { className: "text-xs text-blue-600 space-y-1", children: [_jsx("p", { children: "\u2022 TextInputElement (title) \u2022 SelectElement (category, type) \u2022 DatePickerElement (dates)" }), _jsx("p", { children: "\u2022 LocationElement (venue) \u2022 CheckboxElement (settings) \u2022 NumberInputElement (capacity, guests)" }), _jsx("p", { children: "\u2022 RadioElement (visibility) \u2022 ConditionalElement (show/hide) \u2022 EventCardElement (preview)" })] }), _jsx("p", { className: "text-xs text-blue-600 mt-2", children: "Students can create custom tools by combining these same elements in different ways!" })] })] }));
}
export default EventCreatorToolV2;
//# sourceMappingURL=event-creator-tool-v2.js.map