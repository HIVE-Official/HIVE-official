"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Event System Elements - vBETA Focus
 * Complete 24-Element Library for Event Coordination Tools
 *
 * This is the comprehensive element library that enables students to build
 * powerful event coordination tools through visual composition.
 *
 * ELEMENT CATEGORIES:
 *
 * INPUT ELEMENTS (8):
 * 1. TextInputElement - Basic text input with validation
 * 2. DatePickerElement - Date/time selection with constraints
 * 3. LocationElement - Event location with type and details
 * 4. SelectElement - Dropdown selection with descriptions
 * 5. NumberInputElement - Numeric input with min/max/step
 * 6. CheckboxElement - Boolean selection with description
 * 7. RadioElement - Single choice from multiple options
 * 8. TagsElement - Dynamic tag management with suggestions
 *
 * DISPLAY ELEMENTS (8):
 * 9. EventCardElement - Rich event display with actions
 * 10. CounterElement - Numeric display with icons/colors
 * 11. QRCodeElement - QR code generation and scanning
 * 12. AttendeeListElement - Attendee management with check-in
 * 13. CalendarViewElement - Monthly calendar with events
 * 14. NotificationElement - Notification center with actions
 * 15. AnalyticsChartElement - Data visualization (bar/line/pie)
 * 16. StatusElement - Event status management with history
 *
 * ACTION ELEMENTS (5):
 * 17. RSVPElement - Complete RSVP form with guest management
 * 18. FeedbackFormElement - Post-event feedback collection
 * 19. ShareElement - Social sharing across platforms
 * 20. RecurrenceElement - Event recurrence configuration
 * 21. FilterElement - Event filtering and search
 *
 * LOGIC ELEMENTS (3):
 * 22. ConditionalElement - Show/hide based on conditions
 * 23. FilterElement - Advanced filtering logic
 * 24. [Validator Element] - Input validation and error handling
 *
 * Each element is designed to work seamlessly with the Tool Runtime Engine,
 * providing students with building blocks for comprehensive event management.
 */
import { useState, useEffect } from 'react';
import { HiveCard, HiveButton, HiveInput, HiveTextarea, HiveBadge } from '../index';
import { Calendar, MapPin, Users, Clock, QrCode, Star, CheckSquare, AlertCircle, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
// Mobile-responsive utilities
const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);
    return isMobile;
};
const getMobileClasses = (isMobile) => ({
    card: isMobile ? "shadow-sm border-0 rounded-xl touch-manipulation" : "",
    button: isMobile ? "h-12 text-base touch-manipulation min-h-[48px]" : "",
    input: isMobile ? "h-12 text-base touch-manipulation" : "",
    grid: isMobile ? "grid-cols-1 gap-4" : "grid-cols-1 md:grid-cols-2 gap-3",
    spacing: isMobile ? "space-y-4" : "space-y-2",
    text: isMobile ? "text-base" : "text-sm",
});
export function TextInputElement({ id, label, value = '', onChange, placeholder, maxLength, required, disabled, className }) {
    return (_jsxs("div", { className: cn("space-y-2", className), children: [label && (_jsxs("label", { htmlFor: id, className: "block text-sm font-medium text-gray-900", children: [label, " ", required && _jsx("span", { className: "text-red-500", children: "*" })] })), _jsx(HiveInput, { id: id, value: value, onChange: (e) => onChange?.(e.target.value), placeholder: placeholder, maxLength: maxLength, required: required, disabled: disabled })] }));
}
export function DatePickerElement({ id, label, value, onChange, minDate, maxDate, includeTime = true, required, disabled, className }) {
    const formatDateForInput = (date) => {
        if (!date)
            return '';
        const d = new Date(date);
        if (includeTime) {
            return d.toISOString().slice(0, 16);
        }
        return d.toISOString().slice(0, 10);
    };
    return (_jsxs("div", { className: cn("space-y-2", className), children: [label && (_jsxs("label", { htmlFor: id, className: "block text-sm font-medium text-gray-900", children: [label, " ", required && _jsx("span", { className: "text-red-500", children: "*" })] })), _jsxs("div", { className: "relative", children: [_jsx("input", { id: id, type: includeTime ? "datetime-local" : "date", value: formatDateForInput(value), onChange: (e) => onChange?.(new Date(e.target.value)), min: minDate ? formatDateForInput(minDate) : undefined, max: maxDate ? formatDateForInput(maxDate) : undefined, required: required, disabled: disabled, className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" }), _jsx(Calendar, { className: "absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" })] })] }));
}
export function LocationElement({ id, label = "Event Location", value = { type: 'on_campus' }, onChange, allowedTypes = ['on_campus', 'off_campus', 'virtual', 'hybrid'], required, disabled, className }) {
    const location = value;
    const updateLocation = (updates) => {
        onChange?.({ ...location, ...updates });
    };
    return (_jsxs("div", { className: cn("space-y-4", className), children: [label && (_jsxs("label", { className: "block text-sm font-medium text-gray-900", children: [label, " ", required && _jsx("span", { className: "text-red-500", children: "*" })] })), _jsxs("select", { value: location.type, onChange: (e) => updateLocation({ type: e.target.value }), disabled: disabled, className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [allowedTypes.includes('on_campus') && _jsx("option", { value: "on_campus", children: "On Campus" }), allowedTypes.includes('off_campus') && _jsx("option", { value: "off_campus", children: "Off Campus" }), allowedTypes.includes('virtual') && _jsx("option", { value: "virtual", children: "Virtual" }), allowedTypes.includes('hybrid') && _jsx("option", { value: "hybrid", children: "Hybrid" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [_jsx(HiveInput, { value: location.venue || '', onChange: (e) => updateLocation({ venue: e.target.value }), placeholder: "Venue name...", disabled: disabled }), _jsx(HiveInput, { value: location.room || '', onChange: (e) => updateLocation({ room: e.target.value }), placeholder: location.type === 'virtual' ? 'Meeting link...' : 'Room/Address...', disabled: disabled })] })] }));
}
export function SelectElement({ id, label, value, onChange, options, placeholder = "Select an option...", required, disabled, className }) {
    return (_jsxs("div", { className: cn("space-y-2", className), children: [label && (_jsxs("label", { htmlFor: id, className: "block text-sm font-medium text-gray-900", children: [label, " ", required && _jsx("span", { className: "text-red-500", children: "*" })] })), _jsxs("select", { id: id, value: value || '', onChange: (e) => onChange?.(e.target.value), required: required, disabled: disabled, className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "", children: placeholder }), options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }), value && options.find(o => o.value === value)?.description && (_jsx("p", { className: "text-xs text-gray-500", children: options.find(o => o.value === value)?.description }))] }));
}
export function NumberInputElement({ id, label, value, onChange, min, max, step = 1, placeholder, required, disabled, className }) {
    return (_jsxs("div", { className: cn("space-y-2", className), children: [label && (_jsxs("label", { htmlFor: id, className: "block text-sm font-medium text-gray-900", children: [label, " ", required && _jsx("span", { className: "text-red-500", children: "*" })] })), _jsx(HiveInput, { id: id, type: "number", value: value || '', onChange: (e) => onChange?.(parseInt(e.target.value) || undefined), min: min, max: max, step: step, placeholder: placeholder, required: required, disabled: disabled })] }));
}
export function CheckboxElement({ id, label, value = false, onChange, description, disabled, className }) {
    return (_jsx("div", { className: cn("space-y-1", className), children: _jsxs("label", { htmlFor: id, className: "flex items-start gap-2 cursor-pointer", children: [_jsx("input", { id: id, type: "checkbox", checked: value, onChange: (e) => onChange?.(e.target.checked), disabled: disabled, className: "mt-0.5 rounded border-gray-300 focus:ring-amber-500" }), _jsxs("div", { children: [label && _jsx("span", { className: "text-sm font-medium text-gray-900", children: label }), description && _jsx("p", { className: "text-xs text-gray-500", children: description })] })] }) }));
}
export function RadioElement({ id, label, value, onChange, options, disabled, className }) {
    return (_jsxs("div", { className: cn("space-y-3", className), children: [label && (_jsx("label", { className: "block text-sm font-medium text-gray-900", children: label })), _jsx("div", { className: "space-y-2", children: options.map((option) => (_jsxs("label", { className: "flex items-start gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", name: id, value: option.value, checked: value === option.value, onChange: (e) => onChange?.(e.target.value), disabled: disabled, className: "mt-0.5 border-gray-300 focus:ring-amber-500" }), _jsxs("div", { children: [_jsx("span", { className: "text-sm font-medium text-gray-900", children: option.label }), option.description && (_jsx("p", { className: "text-xs text-gray-500", children: option.description }))] })] }, option.value))) })] }));
}
export function EventCardElement({ event, showActions = true, onRSVP, onEdit, className }) {
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };
    return (_jsxs(HiveCard, { className: cn("p-4", className), children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: event.title }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsx("span", { children: formatDate(event.startDate) })] })] }), event.status && (_jsx(HiveBadge, { variant: event.status === 'published' ? 'secondary' : 'outline', children: event.status }))] }), event.location && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600 mb-3", children: [_jsx(MapPin, { className: "w-4 h-4" }), _jsx("span", { children: event.location.venue || event.location.type })] })), (event.capacity || event.rsvpCount !== undefined) && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600 mb-3", children: [_jsx(Users, { className: "w-4 h-4" }), _jsxs("span", { children: [event.rsvpCount || 0, event.capacity && ` / ${event.capacity}`, " attendees"] })] })), showActions && (_jsxs("div", { className: "flex gap-2 pt-3 border-t", children: [onRSVP && (_jsx(HiveButton, { size: "sm", onClick: onRSVP, children: "RSVP" })), onEdit && (_jsx(HiveButton, { variant: "outline", size: "sm", onClick: onEdit, children: "Edit" }))] }))] }));
}
export function CounterElement({ label, current, total, icon: Icon = Users, color = 'default', className }) {
    const colorClasses = {
        default: 'text-gray-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        danger: 'text-red-600',
    };
    return (_jsxs("div", { className: cn("flex items-center gap-3 p-3 bg-gray-50 rounded-lg", className), children: [_jsx(Icon, { className: cn("w-5 h-5", colorClasses[color]) }), _jsxs("div", { children: [label && _jsx("p", { className: "text-sm font-medium text-gray-900", children: label }), _jsxs("p", { className: cn("text-lg font-bold", colorClasses[color]), children: [current, total && _jsxs("span", { className: "text-gray-400", children: [" / ", total] })] })] })] }));
}
export function QRCodeElement({ label, data, size = 200, onScan, className }) {
    // This would integrate with a QR code library like qrcode.js
    // For now, showing placeholder
    return (_jsxs("div", { className: cn("text-center space-y-3", className), children: [label && _jsx("p", { className: "font-medium text-gray-900", children: label }), _jsx("div", { className: "mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center", style: { width: size, height: size }, children: _jsxs("div", { className: "text-center", children: [_jsx(QrCode, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), _jsx("p", { className: "text-xs text-gray-500", children: "QR Code" }), _jsx("p", { className: "text-xs text-gray-400 mt-1 break-all px-2", children: data })] }) }), onScan && (_jsx(HiveButton, { size: "sm", onClick: () => onScan(data), children: "Scan Code" }))] }));
}
export function RSVPElement({ eventId, currentResponse, allowGuests = false, maxGuests = 1, onSubmit, className }) {
    const [response, setResponse] = useState(currentResponse || { status: 'yes', guestCount: 0 });
    const handleSubmit = () => {
        onSubmit?.(response);
    };
    return (_jsxs(HiveCard, { className: cn("p-4 space-y-4", className), children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "RSVP for this event" }), _jsx(RadioElement, { id: `rsvp-${eventId}`, label: "Will you attend?", value: response.status, onChange: (status) => setResponse(prev => ({ ...prev, status })), options: [
                    { value: 'yes', label: 'Yes, I\'ll be there' },
                    { value: 'maybe', label: 'Maybe' },
                    { value: 'no', label: 'Can\'t make it' },
                ] }), response.status === 'yes' && allowGuests && (_jsx(NumberInputElement, { id: `guests-${eventId}`, label: "Number of guests", value: response.guestCount, onChange: (guestCount) => setResponse(prev => ({ ...prev, guestCount })), min: 0, max: maxGuests, placeholder: "0" })), response.status === 'yes' && (_jsxs(_Fragment, { children: [_jsx(TextInputElement, { id: `dietary-${eventId}`, label: "Dietary restrictions (optional)", value: response.dietaryRestrictions || '', onChange: (dietaryRestrictions) => setResponse(prev => ({ ...prev, dietaryRestrictions })), placeholder: "Any allergies or dietary needs..." }), _jsx(TextInputElement, { id: `accessibility-${eventId}`, label: "Accessibility needs (optional)", value: response.accessibilityNeeds || '', onChange: (accessibilityNeeds) => setResponse(prev => ({ ...prev, accessibilityNeeds })), placeholder: "Any accommodations needed..." })] })), _jsx(HiveButton, { onClick: handleSubmit, className: "w-full", children: "Submit RSVP" })] }));
}
export function ConditionalElement({ condition, children, fallback }) {
    return condition ? _jsx(_Fragment, { children: children }) : _jsx(_Fragment, { children: fallback });
}
export function FilterElement({ filters, onFiltersChange, className }) {
    return (_jsxs(HiveCard, { className: cn("p-4 space-y-4", className), children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Filter Events" }), _jsx(SelectElement, { id: "category-filter", label: "Category", value: filters.categories?.[0] || '', onChange: (category) => onFiltersChange?.({
                    ...filters,
                    categories: category ? [category] : undefined
                }), options: [
                    { value: 'academic', label: 'Academic' },
                    { value: 'social', label: 'Social' },
                    { value: 'professional', label: 'Professional' },
                    { value: 'wellness', label: 'Wellness' },
                    { value: 'cultural', label: 'Cultural' },
                    { value: 'service', label: 'Service' },
                    { value: 'sports', label: 'Sports' },
                ], placeholder: "All categories" }), _jsx(CheckboxElement, { id: "has-capacity", label: "Only show events with available spots", value: filters.hasCapacity || false, onChange: (hasCapacity) => onFiltersChange?.({ ...filters, hasCapacity }) })] }));
}
export function AttendeeListElement({ attendees, showCheckIn = false, onCheckIn, className }) {
    const confirmedAttendees = attendees.filter(a => a.status === 'confirmed');
    const checkedInCount = attendees.filter(a => a.checkedIn).length;
    return (_jsxs(HiveCard, { className: cn("p-4 space-y-4", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Attendees" }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [_jsxs("span", { children: [confirmedAttendees.length, " confirmed"] }), showCheckIn && _jsxs("span", { children: [checkedInCount, " checked in"] })] })] }), _jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: attendees.map((attendee) => (_jsxs("div", { className: "flex items-center justify-between p-2 border border-gray-200 rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-gray-900", children: attendee.name }), _jsx("p", { className: "text-sm text-gray-600", children: attendee.email }), attendee.guestCount && attendee.guestCount > 0 && (_jsxs("p", { className: "text-xs text-gray-500", children: ["+", attendee.guestCount, " guests"] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveBadge, { variant: attendee.status === 'confirmed' ? 'secondary' : 'outline', children: attendee.status }), showCheckIn && attendee.status === 'confirmed' && (attendee.checkedIn ? (_jsx(HiveBadge, { variant: "secondary", className: "bg-green-100 text-green-800", children: "\u2713 Checked In" })) : (_jsx(HiveButton, { size: "sm", onClick: () => onCheckIn?.(attendee.id), children: "Check In" })))] })] }, attendee.id))) })] }));
}
export function CalendarViewElement({ events, currentDate = new Date(), onDateChange, onEventClick, className }) {
    const [viewDate, setViewDate] = useState(currentDate);
    const isMobile = useMobileDetection();
    const mobileClasses = getMobileClasses(isMobile);
    const changeMonth = (direction) => {
        const newDate = new Date(viewDate);
        newDate.setMonth(newDate.getMonth() + direction);
        setViewDate(newDate);
        onDateChange?.(newDate);
    };
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        const days = [];
        // Previous month's days
        for (let i = 0; i < startingDayOfWeek; i++) {
            const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
            days.push({ date: prevDate, isCurrentMonth: false, events: [] });
        }
        // Current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.startDate);
                return eventDate.toDateString() === date.toDateString();
            });
            days.push({ date, isCurrentMonth: true, events: dayEvents });
        }
        return days;
    };
    const days = getDaysInMonth(viewDate);
    return (_jsxs(HiveCard, { className: cn("p-4", mobileClasses.card, className), children: [_jsxs("div", { className: cn("flex items-center justify-between mb-4", isMobile && "flex-col gap-3"), children: [_jsx("h3", { className: cn("font-semibold text-gray-900", isMobile ? "text-xl" : "text-lg"), children: viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "outline", size: isMobile ? "default" : "sm", onClick: () => changeMonth(-1), className: mobileClasses.button, children: "\u2190" }), _jsx(HiveButton, { variant: "outline", size: isMobile ? "default" : "sm", onClick: () => changeMonth(1), className: mobileClasses.button, children: "\u2192" })] })] }), _jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: (isMobile ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).map((day, index) => (_jsx("div", { className: cn("p-2 text-center font-medium text-gray-600", mobileClasses.text), children: day }, index))) }), _jsx("div", { className: "grid grid-cols-7 gap-1", children: days.map((day, index) => (_jsxs("div", { className: cn("p-2 border border-gray-100 rounded cursor-pointer hover:bg-gray-50 touch-manipulation", isMobile ? "min-h-[80px]" : "min-h-[60px]", !day.isCurrentMonth && "text-gray-400 bg-gray-50"), children: [_jsx("div", { className: cn("font-medium mb-1", mobileClasses.text), children: day.date.getDate() }), day.events.slice(0, isMobile ? 1 : 2).map(event => (_jsx("div", { onClick: () => onEventClick?.(event.id), className: cn("p-1 bg-amber-100 text-amber-800 rounded mb-1 truncate cursor-pointer hover:bg-amber-200 touch-manipulation", isMobile ? "text-xs leading-tight" : "text-xs"), children: event.title }, event.id))), day.events.length > (isMobile ? 1 : 2) && (_jsxs("div", { className: "text-xs text-gray-500", children: ["+", day.events.length - (isMobile ? 1 : 2), " more"] }))] }, index))) })] }));
}
export function NotificationElement({ notifications, onMarkRead, onMarkAllRead, className }) {
    const unreadCount = notifications.filter(n => !n.read).length;
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'reminder': return Clock;
            case 'update': return AlertCircle;
            case 'rsvp': return Users;
            case 'checkin': return CheckSquare;
            default: return AlertCircle;
        }
    };
    return (_jsxs(HiveCard, { className: cn("p-4", className), children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Notifications" }), unreadCount > 0 && (_jsxs(HiveBadge, { className: "bg-red-100 text-red-800", children: [unreadCount, " new"] }))] }), unreadCount > 0 && (_jsx(HiveButton, { variant: "outline", size: "sm", onClick: onMarkAllRead, children: "Mark All Read" }))] }), _jsx("div", { className: "space-y-3 max-h-80 overflow-y-auto", children: notifications.length === 0 ? (_jsx("p", { className: "text-sm text-gray-500 text-center py-4", children: "No notifications" })) : (notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (_jsx("div", { className: cn("p-3 border rounded-lg cursor-pointer transition-colors", notification.read
                            ? "border-gray-200 bg-white"
                            : "border-amber-200 bg-amber-50"), onClick: () => onMarkRead?.(notification.id), children: _jsxs("div", { className: "flex gap-3", children: [_jsx(Icon, { className: "w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("h4", { className: "font-medium text-gray-900", children: notification.title }), _jsx("span", { className: "text-xs text-gray-500", children: notification.timestamp.toLocaleDateString() })] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: notification.message })] })] }) }, notification.id));
                })) })] }));
}
export function AnalyticsChartElement({ data, title = "Analytics", type = 'bar', className }) {
    const maxValue = Math.max(...data.map(d => d.value));
    return (_jsxs(HiveCard, { className: cn("p-4", className), children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: title }), _jsx(TrendingUp, { className: "w-5 h-5 text-gray-600" })] }), type === 'bar' && (_jsx("div", { className: "space-y-3", children: data.map((item, index) => (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-700", children: item.label }), _jsx("span", { className: "font-medium text-gray-900", children: item.value })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-amber-500 h-2 rounded-full transition-all duration-300", style: { width: `${(item.value / maxValue) * 100}%` } }) })] }, index))) })), type === 'line' && (_jsx("div", { className: "h-32 flex items-end justify-between border-b border-gray-200", children: data.map((item, index) => (_jsxs("div", { className: "flex flex-col items-center space-y-2", children: [_jsx("div", { className: "w-3 bg-amber-500 rounded-t", style: { height: `${(item.value / maxValue) * 100}%` } }), _jsx("span", { className: "text-xs text-gray-600 -rotate-45 transform origin-left", children: item.label })] }, index))) }))] }));
}
export function FeedbackFormElement({ eventId, questions = [
    { id: 'rating', question: 'How would you rate this event?', type: 'rating', required: true },
    { id: 'comments', question: 'Additional comments', type: 'text', required: false },
], onSubmit, className }) {
    const [responses, setResponses] = useState({});
    const updateResponse = (questionId, value) => {
        setResponses(prev => ({ ...prev, [questionId]: value }));
    };
    const handleSubmit = () => {
        onSubmit?.(responses);
    };
    return (_jsxs(HiveCard, { className: cn("p-4 space-y-4", className), children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Event Feedback" }), questions.map((question) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-900", children: [question.question, question.required && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), question.type === 'rating' && (_jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((rating) => (_jsx("button", { onClick: () => updateResponse(question.id, rating), className: cn("p-1 transition-colors", responses[question.id] >= rating
                                ? "text-yellow-400"
                                : "text-gray-300 hover:text-yellow-300"), children: _jsx(Star, { className: "w-6 h-6 fill-current" }) }, rating))) })), question.type === 'text' && (_jsx(HiveTextarea, { value: responses[question.id] || '', onChange: (e) => updateResponse(question.id, e.target.value), placeholder: "Share your thoughts...", rows: 3 })), question.type === 'select' && question.options && (_jsxs("select", { value: responses[question.id] || '', onChange: (e) => updateResponse(question.id, e.target.value), className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500", children: [_jsx("option", { value: "", children: "Select an option..." }), question.options.map((option) => (_jsx("option", { value: option, children: option }, option)))] }))] }, question.id))), _jsx(HiveButton, { onClick: handleSubmit, className: "w-full", children: "Submit Feedback" })] }));
}
export function ShareElement({ eventId, eventTitle, shareUrl = window.location.href, onShare, className }) {
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            // Could show toast notification here
        }
        catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };
    const shareOptions = [
        { platform: 'copy', label: 'Copy Link', action: copyToClipboard },
        { platform: 'email', label: 'Email', action: () => {
                window.location.href = `mailto:?subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(shareUrl)}`;
                onShare?.('email');
            } },
        { platform: 'twitter', label: 'Twitter', action: () => {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(eventTitle)}&url=${encodeURIComponent(shareUrl)}`);
                onShare?.('twitter');
            } },
        { platform: 'facebook', label: 'Facebook', action: () => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
                onShare?.('facebook');
            } },
    ];
    return (_jsxs(HiveCard, { className: cn("p-4", className), children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Share Event" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: shareOptions.map((option) => (_jsx(HiveButton, { variant: "outline", size: "sm", onClick: option.action, className: "justify-center", children: option.label }, option.platform))) })] }));
}
export function RecurrenceElement({ recurrence, onRecurrenceChange, className }) {
    const updateRecurrence = (updates) => {
        onRecurrenceChange?.({ ...recurrence, ...updates });
    };
    return (_jsxs(HiveCard, { className: cn("p-4 space-y-4", className), children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Event Recurrence" }), _jsx(SelectElement, { id: "recurrence-type", label: "Repeat", value: recurrence.type, onChange: (type) => updateRecurrence({ type }), options: [
                    { value: 'none', label: 'Does not repeat' },
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' },
                ] }), recurrence.type !== 'none' && (_jsxs(_Fragment, { children: [_jsx(NumberInputElement, { id: "recurrence-interval", label: `Repeat every ${recurrence.type === 'daily' ? 'day(s)' : recurrence.type === 'weekly' ? 'week(s)' : 'month(s)'}`, value: recurrence.interval, onChange: (interval) => updateRecurrence({ interval }), min: 1, max: 30 }), _jsx(DatePickerElement, { id: "recurrence-end", label: "End date", value: recurrence.endDate, onChange: (endDate) => updateRecurrence({ endDate }), includeTime: false })] }))] }));
}
export function TagsElement({ tags, availableTags = ['academic', 'social', 'professional', 'wellness', 'cultural', 'service', 'sports'], onTagsChange, maxTags = 5, className }) {
    const [inputValue, setInputValue] = useState('');
    const addTag = (tag) => {
        if (!tags.includes(tag) && tags.length < maxTags) {
            onTagsChange?.([...tags, tag]);
        }
    };
    const removeTag = (tagToRemove) => {
        onTagsChange?.(tags.filter(tag => tag !== tagToRemove));
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            addTag(inputValue.trim());
            setInputValue('');
        }
    };
    return (_jsxs("div", { className: cn("space-y-3", className), children: [_jsxs("label", { className: "block text-sm font-medium text-gray-900", children: ["Tags (", tags.length, "/", maxTags, ")"] }), _jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag) => (_jsxs(HiveBadge, { variant: "secondary", className: "cursor-pointer hover:bg-red-100 hover:text-red-800", onClick: () => removeTag(tag), children: [tag, " \u00D7"] }, tag))) }), _jsx(HiveInput, { value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyDown: handleKeyDown, placeholder: "Add a tag...", disabled: tags.length >= maxTags }), availableTags.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Suggested tags:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: availableTags
                            .filter(tag => !tags.includes(tag))
                            .slice(0, 8)
                            .map((tag) => (_jsxs(HiveBadge, { variant: "outline", className: "cursor-pointer hover:bg-amber-50", onClick: () => addTag(tag), children: ["+ ", tag] }, tag))) })] }))] }));
}
export function StatusElement({ status, statusHistory = [], onStatusChange, className }) {
    const [reason, setReason] = useState('');
    const [showReasonInput, setShowReasonInput] = useState(false);
    const statusConfig = {
        draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
        published: { color: 'bg-green-100 text-green-800', label: 'Published' },
        cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
        completed: { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
    };
    const handleStatusChange = (newStatus) => {
        if (newStatus === 'cancelled') {
            setShowReasonInput(true);
        }
        else {
            onStatusChange?.(newStatus);
        }
    };
    const submitStatusChange = () => {
        onStatusChange?.(showReasonInput ? 'cancelled' : status, reason);
        setReason('');
        setShowReasonInput(false);
    };
    return (_jsxs(HiveCard, { className: cn("p-4 space-y-4", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Event Status" }), _jsx(HiveBadge, { className: statusConfig[status].color, children: statusConfig[status].label })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-900", children: "Change Status" }), _jsxs("select", { value: status, onChange: (e) => handleStatusChange(e.target.value), className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500", children: [_jsx("option", { value: "draft", children: "Draft" }), _jsx("option", { value: "published", children: "Published" }), _jsx("option", { value: "cancelled", children: "Cancelled" }), _jsx("option", { value: "completed", children: "Completed" })] }), showReasonInput && (_jsxs("div", { className: "space-y-2", children: [_jsx(HiveTextarea, { value: reason, onChange: (e) => setReason(e.target.value), placeholder: "Reason for cancellation...", rows: 2 }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { size: "sm", onClick: submitStatusChange, children: "Confirm" }), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => setShowReasonInput(false), children: "Cancel" })] })] }))] }), statusHistory.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-sm font-medium text-gray-900", children: "Status History" }), _jsx("div", { className: "space-y-2 max-h-32 overflow-y-auto", children: statusHistory.map((entry, index) => (_jsxs("div", { className: "text-sm text-gray-600 p-2 bg-gray-50 rounded", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "font-medium", children: entry.status }), _jsx("span", { children: entry.timestamp.toLocaleDateString() })] }), _jsxs("p", { children: ["Changed by ", entry.changedBy] }), entry.reason && _jsxs("p", { className: "text-xs", children: ["Reason: ", entry.reason] })] }, index))) })] }))] }));
}
//# sourceMappingURL=event-elements.js.map