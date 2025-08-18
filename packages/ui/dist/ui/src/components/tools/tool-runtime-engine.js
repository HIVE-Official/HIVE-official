"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Tool Runtime Execution Engine
 *
 * This is the CRITICAL missing piece - the actual runtime where students use tools.
 * Takes a tool definition (composed of elements) and renders a working, interactive tool.
 */
import { useState, useCallback, useEffect } from 'react';
import { HiveButton } from '../index';
import { Play, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { MobileToolWrapper } from './mobile-tool-wrapper';
// Event Elements (complete 24-element library)
import { TextInputElement, DatePickerElement, SelectElement, NumberInputElement, CheckboxElement, RadioElement, EventCardElement, CounterElement, QRCodeElement, RSVPElement, FilterElement, AttendeeListElement, CalendarViewElement, NotificationElement, AnalyticsChartElement, FeedbackFormElement, ShareElement, RecurrenceElement, TagsElement, StatusElement, } from '../events/event-elements';
export function ToolRuntimeEngine({ tool, userId = 'current_user', spaceId, mode = 'production', onSave, onSubmit, className }) {
    // Runtime state management
    const [state, setState] = useState({
        values: {},
        errors: {},
        loading: false,
        actions: {},
    });
    // Update element value
    const updateValue = useCallback((elementId, value) => {
        setState(prev => ({
            ...prev,
            values: { ...prev.values, [elementId]: value },
            errors: { ...prev.errors, [elementId]: '' }, // Clear error when value changes
        }));
    }, []);
    // Validate element
    const validateElement = useCallback((element, value) => {
        const { validation } = element;
        if (!validation)
            return '';
        if (validation.required && (!value || value === '')) {
            return `${element.label || 'This field'} is required`;
        }
        if (validation.minLength && value && value.length < validation.minLength) {
            return `Minimum length is ${validation.minLength} characters`;
        }
        if (validation.maxLength && value && value.length > validation.maxLength) {
            return `Maximum length is ${validation.maxLength} characters`;
        }
        if (validation.pattern && value) {
            const regex = new RegExp(validation.pattern);
            if (!regex.test(value)) {
                return 'Invalid format';
            }
        }
        return '';
    }, []);
    // Execute tool action
    const executeAction = useCallback(async (action) => {
        setState(prev => ({ ...prev, actions: { ...prev.actions, [action.id]: true } }));
        try {
            switch (action.type) {
                case 'save':
                    if (onSave) {
                        await onSave(state.values);
                        setState(prev => ({ ...prev, lastSaved: new Date().toISOString() }));
                    }
                    break;
                case 'submit':
                    // Validate all elements first
                    const errors = {};
                    tool.elements.forEach(element => {
                        const error = validateElement(element, state.values[element.id]);
                        if (error)
                            errors[element.id] = error;
                    });
                    if (Object.keys(errors).length > 0) {
                        setState(prev => ({ ...prev, errors }));
                        return;
                    }
                    if (onSubmit) {
                        await onSubmit(state.values);
                    }
                    break;
                case 'show_message':
                    alert(action.config.message || 'Action completed!');
                    break;
                case 'calculate':
                    // Basic calculation example
                    if (action.config.formula && action.config.targetElement) {
                        try {
                            // Simple calculation - in production this would be more sophisticated
                            const result = eval(action.config.formula.replace(/\{(\w+)\}/g, (match, elementId) => {
                                return state.values[elementId] || 0;
                            }));
                            updateValue(action.config.targetElement, result);
                        }
                        catch (error) {
                            console.error('Calculation error:', error);
                        }
                    }
                    break;
                case 'update_element':
                    if (action.config.targetElement && action.config.value !== undefined) {
                        updateValue(action.config.targetElement, action.config.value);
                    }
                    break;
            }
        }
        catch (error) {
            console.error(`Action ${action.type} failed:`, error);
            // Show error to user
        }
        finally {
            setState(prev => ({ ...prev, actions: { ...prev.actions, [action.id]: false } }));
        }
    }, [state.values, tool.elements, validateElement, updateValue, onSave, onSubmit]);
    // Render individual element
    const renderElement = useCallback((element) => {
        const value = state.values[element.id];
        const error = state.errors[element.id];
        const onChange = (newValue) => updateValue(element.id, newValue);
        // Find actions triggered by this element
        const elementActions = tool.actions.filter(action => action.trigger === element.id);
        const commonProps = {
            id: element.id,
            label: element.label,
            value,
            onChange,
            disabled: state.loading,
            className: error ? 'border-red-300 ring-red-500' : undefined,
        };
        let elementComponent;
        switch (element.type) {
            case 'text_input':
                elementComponent = (_jsx(TextInputElement, { ...commonProps, placeholder: element.properties.placeholder, maxLength: element.properties.maxLength, required: element.validation?.required }));
                break;
            case 'textarea':
                elementComponent = (_jsxs("div", { className: "space-y-2", children: [element.label && (_jsxs("label", { className: "block text-sm font-medium text-gray-900", children: [element.label, " ", element.validation?.required && _jsx("span", { className: "text-red-500", children: "*" })] })), _jsx("textarea", { value: value || '', onChange: (e) => onChange(e.target.value), placeholder: element.properties.placeholder, rows: element.properties.rows || 3, disabled: state.loading, className: cn("w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", error && "border-red-300 ring-red-500") })] }));
                break;
            case 'date_picker':
                elementComponent = (_jsx(DatePickerElement, { ...commonProps, includeTime: element.properties.includeTime, minDate: element.properties.minDate ? new Date(element.properties.minDate) : undefined, maxDate: element.properties.maxDate ? new Date(element.properties.maxDate) : undefined, required: element.validation?.required }));
                break;
            case 'select':
                elementComponent = (_jsx(SelectElement, { ...commonProps, options: element.properties.options || [], placeholder: element.properties.placeholder, required: element.validation?.required }));
                break;
            case 'number_input':
                elementComponent = (_jsx(NumberInputElement, { ...commonProps, min: element.properties.min, max: element.properties.max, step: element.properties.step, placeholder: element.properties.placeholder, required: element.validation?.required }));
                break;
            case 'checkbox':
                elementComponent = (_jsx(CheckboxElement, { ...commonProps, description: element.properties.description }));
                break;
            case 'radio':
                elementComponent = (_jsx(RadioElement, { ...commonProps, options: element.properties.options || [] }));
                break;
            case 'button':
                elementComponent = (_jsxs(HiveButton, { onClick: () => {
                        elementActions.forEach(action => executeAction(action));
                    }, disabled: state.loading || elementActions.some(a => state.actions[a.id]), variant: element.properties.variant || 'default', size: element.properties.size || 'md', children: [elementActions.some(a => state.actions[a.id]) && (_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" })), element.label || 'Button'] }));
                break;
            case 'display_text':
                elementComponent = (_jsxs("div", { className: "space-y-1", children: [element.label && (_jsx("label", { className: "block text-sm font-medium text-gray-900", children: element.label })), _jsx("p", { className: cn("text-gray-700", element.properties.size === 'lg' && "text-lg", element.properties.size === 'xl' && "text-xl", element.properties.weight === 'bold' && "font-bold", element.properties.weight === 'semibold' && "font-semibold"), children: element.properties.text || 'Display text' })] }));
                break;
            case 'divider':
                elementComponent = _jsx("hr", { className: "border-gray-300 my-4" });
                break;
            case 'event_card':
                elementComponent = (_jsx(EventCardElement, { id: element.id, event: element.properties.event || {
                        title: 'Sample Event',
                        startDate: new Date(),
                        category: 'academic',
                        status: 'published'
                    }, showActions: element.properties.showActions, onRSVP: element.properties.onRSVP, onEdit: element.properties.onEdit, className: className }));
                break;
            case 'counter':
                elementComponent = (_jsx(CounterElement, { id: element.id, label: element.label, current: element.properties.current || 0, total: element.properties.total, color: element.properties.color, className: className }));
                break;
            case 'qr_code':
                elementComponent = (_jsx(QRCodeElement, { id: element.id, label: element.label, data: element.properties.data || 'https://hive.app', size: element.properties.size, onScan: element.properties.onScan, className: className }));
                break;
            case 'rsvp':
                elementComponent = (_jsx(RSVPElement, { id: element.id, eventId: element.properties.eventId || 'sample-event', currentResponse: value, allowGuests: element.properties.allowGuests, maxGuests: element.properties.maxGuests, onSubmit: (response) => {
                        onChange(response);
                        elementActions.forEach(action => executeAction(action));
                    }, className: className }));
                break;
            case 'attendee_list':
                elementComponent = (_jsx(AttendeeListElement, { id: element.id, attendees: element.properties.attendees || [], showCheckIn: element.properties.showCheckIn, onCheckIn: element.properties.onCheckIn, className: className }));
                break;
            case 'calendar_view':
                elementComponent = (_jsx(CalendarViewElement, { id: element.id, events: element.properties.events || [], currentDate: value || new Date(), onDateChange: onChange, onEventClick: element.properties.onEventClick, className: className }));
                break;
            case 'notification':
                elementComponent = (_jsx(NotificationElement, { id: element.id, notifications: element.properties.notifications || [], onMarkRead: element.properties.onMarkRead, onMarkAllRead: element.properties.onMarkAllRead, className: className }));
                break;
            case 'analytics_chart':
                elementComponent = (_jsx(AnalyticsChartElement, { id: element.id, data: element.properties.data || [], title: element.properties.title, type: element.properties.type, className: className }));
                break;
            case 'feedback_form':
                elementComponent = (_jsx(FeedbackFormElement, { id: element.id, eventId: element.properties.eventId || 'sample-event', questions: element.properties.questions, onSubmit: (feedback) => {
                        onChange(feedback);
                        elementActions.forEach(action => executeAction(action));
                    }, className: className }));
                break;
            case 'share':
                elementComponent = (_jsx(ShareElement, { id: element.id, eventId: element.properties.eventId || 'sample-event', eventTitle: element.properties.eventTitle || 'Sample Event', shareUrl: element.properties.shareUrl, onShare: element.properties.onShare, className: className }));
                break;
            case 'recurrence':
                elementComponent = (_jsx(RecurrenceElement, { id: element.id, recurrence: value || { type: 'none', interval: 1 }, onRecurrenceChange: onChange, className: className }));
                break;
            case 'tags':
                elementComponent = (_jsx(TagsElement, { id: element.id, tags: value || [], availableTags: element.properties.availableTags, onTagsChange: onChange, maxTags: element.properties.maxTags, className: className }));
                break;
            case 'status':
                elementComponent = (_jsx(StatusElement, { id: element.id, status: value || 'draft', statusHistory: element.properties.statusHistory, onStatusChange: (status, reason) => {
                        onChange({ status, reason });
                        elementActions.forEach(action => executeAction(action));
                    }, className: className }));
                break;
            case 'filter':
                elementComponent = (_jsx(FilterElement, { id: element.id, filters: value || {}, onFiltersChange: onChange, className: className }));
                break;
            default:
                elementComponent = (_jsx("div", { className: "p-3 bg-yellow-50 border border-yellow-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-yellow-800", children: ["Unknown element type: ", element.type] }) }));
        }
        return (_jsxs("div", { className: "space-y-2", children: [elementComponent, error && (_jsxs("div", { className: "flex items-center gap-1 text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), _jsx("span", { children: error })] }))] }, element.id));
    }, [state, tool.actions, updateValue, executeAction]);
    // Auto-save functionality
    useEffect(() => {
        if (mode === 'production' && Object.keys(state.values).length > 0) {
            const autoSave = setTimeout(() => {
                if (onSave) {
                    onSave(state.values).catch(console.error);
                }
            }, 2000); // Auto-save after 2 seconds of inactivity
            return () => clearTimeout(autoSave);
        }
    }, [state.values, mode, onSave]);
    const toolContent = (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "border-b border-gray-200 pb-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: tool.name }), tool.description && (_jsx("p", { className: "text-gray-600 mt-1", children: tool.description }))] }), mode === 'preview' && (_jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: "flex items-center gap-1 text-sm text-blue-600", children: [_jsx(Play, { className: "w-4 h-4" }), _jsx("span", { children: "Preview Mode" })] }) }))] }), state.lastSaved && (_jsxs("div", { className: "flex items-center gap-1 text-sm text-green-600 mt-2", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), _jsxs("span", { children: ["Last saved: ", new Date(state.lastSaved).toLocaleTimeString()] })] }))] }), _jsx("div", { className: "space-y-6", children: tool.elements
                    .sort((a, b) => a.position.y - b.position.y) // Sort by vertical position
                    .map(renderElement) }), tool.actions.filter(action => !action.trigger || action.trigger === 'global').length > 0 && (_jsx("div", { className: "border-t border-gray-200 pt-4", children: _jsx("div", { className: "flex gap-3 flex-wrap", children: tool.actions
                        .filter(action => !action.trigger || action.trigger === 'global')
                        .map(action => (_jsxs(HiveButton, { onClick: () => executeAction(action), disabled: state.loading || state.actions[action.id], variant: action.type === 'submit' ? 'primary' : 'outline', className: "flex-1 md:flex-none", children: [state.actions[action.id] && (_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" })), action.config.label || action.type] }, action.id))) }) })), mode === 'preview' && (_jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "\uD83D\uDD27 Runtime Information" }), _jsxs("div", { className: "text-sm text-blue-700 space-y-1", children: [_jsxs("p", { children: ["\u2022 Tool ID: ", tool.id] }), _jsxs("p", { children: ["\u2022 Elements: ", tool.elements.length] }), _jsxs("p", { children: ["\u2022 Actions: ", tool.actions.length] }), _jsxs("p", { children: ["\u2022 Current Values: ", JSON.stringify(state.values, null, 2)] })] })] }))] }));
    return (_jsx(MobileToolWrapper, { toolName: tool.name, showMobileMenu: mode === 'production', className: className, children: toolContent }));
}
// Helper function to create a simple tool for testing
export function createSampleTool() {
    return {
        id: 'sample-feedback-form',
        name: 'Event Feedback Form',
        description: 'Collect feedback from event attendees',
        version: '1.0.0',
        elements: [
            {
                id: 'event-rating',
                type: 'select',
                label: 'How would you rate this event?',
                properties: {
                    options: [
                        { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
                        { value: '4', label: '⭐⭐⭐⭐ Good' },
                        { value: '3', label: '⭐⭐⭐ Average' },
                        { value: '2', label: '⭐⭐ Poor' },
                        { value: '1', label: '⭐ Terrible' },
                    ],
                    placeholder: 'Select a rating...'
                },
                position: { x: 0, y: 0 },
                size: { width: 100, height: 60 },
                validation: { required: true }
            },
            {
                id: 'feedback-text',
                type: 'textarea',
                label: 'Additional Comments',
                properties: {
                    placeholder: 'Tell us what you thought about the event...',
                    rows: 4
                },
                position: { x: 0, y: 100 },
                size: { width: 100, height: 120 }
            },
            {
                id: 'recommend',
                type: 'radio',
                label: 'Would you recommend this event to others?',
                properties: {
                    options: [
                        { value: 'yes', label: 'Yes, definitely' },
                        { value: 'maybe', label: 'Maybe' },
                        { value: 'no', label: 'No' }
                    ]
                },
                position: { x: 0, y: 250 },
                size: { width: 100, height: 80 },
                validation: { required: true }
            },
            {
                id: 'submit-feedback',
                type: 'button',
                label: 'Submit Feedback',
                properties: {
                    variant: 'default',
                    size: 'md'
                },
                position: { x: 0, y: 350 },
                size: { width: 200, height: 40 }
            }
        ],
        actions: [
            {
                id: 'submit-action',
                trigger: 'submit-feedback',
                type: 'submit',
                config: {
                    endpoint: '/api/feedback/submit',
                    successMessage: 'Thank you for your feedback!'
                }
            }
        ],
        metadata: {
            createdBy: 'sample-user',
            createdAt: new Date().toISOString(),
            category: 'feedback',
            tags: ['event', 'feedback', 'form']
        }
    };
}
export default ToolRuntimeEngine;
//# sourceMappingURL=tool-runtime-engine.js.map