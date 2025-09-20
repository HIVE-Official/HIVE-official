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
import React from 'react';
export interface ElementProps {
    id?: string;
    label?: string;
    value?: any;
    onChange?: (value: any) => void;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}
export interface EventLocation {
    type: 'on_campus' | 'off_campus' | 'virtual' | 'hybrid';
    venue?: string;
    address?: string;
    room?: string;
    virtualLink?: string;
}
export interface RSVPOption {
    status: 'yes' | 'no' | 'maybe';
    guestCount?: number;
    dietaryRestrictions?: string;
    accessibilityNeeds?: string;
}
export interface TextInputElementProps extends ElementProps {
    placeholder?: string;
    maxLength?: number;
}
export declare function TextInputElement({ id, label, value, onChange, placeholder, maxLength, required, disabled, className }: TextInputElementProps): import("react/jsx-runtime").JSX.Element;
export interface DatePickerElementProps extends ElementProps {
    minDate?: Date;
    maxDate?: Date;
    includeTime?: boolean;
}
export declare function DatePickerElement({ id, label, value, onChange, minDate, maxDate, includeTime, required, disabled, className }: DatePickerElementProps): import("react/jsx-runtime").JSX.Element;
export interface LocationElementProps extends ElementProps {
    allowedTypes?: EventLocation['type'][];
}
export declare function LocationElement({ id, label, value, onChange, allowedTypes, required, disabled, className }: LocationElementProps): import("react/jsx-runtime").JSX.Element;
export interface SelectElementProps extends ElementProps {
    options: {
        value: string;
        label: string;
        description?: string;
    }[];
    placeholder?: string;
}
export declare function SelectElement({ id, label, value, onChange, options, placeholder, required, disabled, className }: SelectElementProps): import("react/jsx-runtime").JSX.Element;
export interface NumberInputElementProps extends ElementProps {
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
}
export declare function NumberInputElement({ id, label, value, onChange, min, max, step, placeholder, required, disabled, className }: NumberInputElementProps): import("react/jsx-runtime").JSX.Element;
export interface CheckboxElementProps extends ElementProps {
    description?: string;
}
export declare function CheckboxElement({ id, label, value, onChange, description, disabled, className }: CheckboxElementProps): import("react/jsx-runtime").JSX.Element;
export interface RadioElementProps extends ElementProps {
    options: {
        value: string;
        label: string;
        description?: string;
    }[];
}
export declare function RadioElement({ id, label, value, onChange, options, disabled, className }: RadioElementProps): import("react/jsx-runtime").JSX.Element;
export interface EventCardElementProps extends ElementProps {
    event: {
        title: string;
        startDate: Date;
        endDate?: Date;
        location?: EventLocation;
        category?: string;
        capacity?: number;
        rsvpCount?: number;
        status?: 'draft' | 'published' | 'cancelled' | 'completed';
    };
    showActions?: boolean;
    onRSVP?: () => void;
    onEdit?: () => void;
}
export declare function EventCardElement({ event, showActions, onRSVP, onEdit, className }: EventCardElementProps): import("react/jsx-runtime").JSX.Element;
export interface CounterElementProps extends ElementProps {
    current: number;
    total?: number;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    color?: 'default' | 'success' | 'warning' | 'danger';
}
export declare function CounterElement({ label, current, total, icon: Icon, color, className }: CounterElementProps): import("react/jsx-runtime").JSX.Element;
export interface QRCodeElementProps extends ElementProps {
    data: string;
    size?: number;
    onScan?: (data: string) => void;
}
export declare function QRCodeElement({ label, data, size, onScan, className }: QRCodeElementProps): import("react/jsx-runtime").JSX.Element;
export interface RSVPElementProps extends ElementProps {
    eventId: string;
    currentResponse?: RSVPOption;
    allowGuests?: boolean;
    maxGuests?: number;
    onSubmit?: (response: RSVPOption) => void;
}
export declare function RSVPElement({ eventId, currentResponse, allowGuests, maxGuests, onSubmit, className }: RSVPElementProps): import("react/jsx-runtime").JSX.Element;
export interface ConditionalElementProps {
    condition: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}
export declare function ConditionalElement({ condition, children, fallback }: ConditionalElementProps): import("react/jsx-runtime").JSX.Element;
export interface FilterElementProps extends ElementProps {
    filters: {
        categories?: string[];
        dateRange?: {
            start: Date;
            end: Date;
        };
        location?: string;
        hasCapacity?: boolean;
    };
    onFiltersChange?: (filters: any) => void;
}
export declare function FilterElement({ filters, onFiltersChange, className }: FilterElementProps): import("react/jsx-runtime").JSX.Element;
export interface AttendeeListElementProps extends ElementProps {
    attendees: {
        id: string;
        name: string;
        email: string;
        status: 'confirmed' | 'pending' | 'declined';
        checkedIn?: boolean;
        guestCount?: number;
    }[];
    showCheckIn?: boolean;
    onCheckIn?: (attendeeId: string) => void;
}
export declare function AttendeeListElement({ attendees, showCheckIn, onCheckIn, className }: AttendeeListElementProps): import("react/jsx-runtime").JSX.Element;
export interface CalendarViewElementProps extends ElementProps {
    events: Array<{
        id: string;
        title: string;
        startDate: Date;
        endDate: Date;
        category?: string;
        status?: string;
    }>;
    currentDate?: Date;
    onDateChange?: (date: Date) => void;
    onEventClick?: (eventId: string) => void;
}
export declare function CalendarViewElement({ events, currentDate, onDateChange, onEventClick, className }: CalendarViewElementProps): import("react/jsx-runtime").JSX.Element;
export interface NotificationElementProps extends ElementProps {
    notifications: Array<{
        id: string;
        type: 'reminder' | 'update' | 'rsvp' | 'checkin';
        title: string;
        message: string;
        timestamp: Date;
        read: boolean;
        eventId?: string;
    }>;
    onMarkRead?: (notificationId: string) => void;
    onMarkAllRead?: () => void;
}
export declare function NotificationElement({ notifications, onMarkRead, onMarkAllRead, className }: NotificationElementProps): import("react/jsx-runtime").JSX.Element;
export interface AnalyticsChartElementProps extends ElementProps {
    data: Array<{
        label: string;
        value: number;
        trend?: number;
    }>;
    title?: string;
    type?: 'bar' | 'line' | 'pie';
}
export declare function AnalyticsChartElement({ data, title, type, className }: AnalyticsChartElementProps): import("react/jsx-runtime").JSX.Element;
export interface FeedbackFormElementProps extends ElementProps {
    eventId: string;
    questions?: Array<{
        id: string;
        question: string;
        type: 'rating' | 'text' | 'select';
        options?: string[];
        required?: boolean;
    }>;
    onSubmit?: (feedback: Record<string, any>) => void;
}
export declare function FeedbackFormElement({ eventId, questions, onSubmit, className }: FeedbackFormElementProps): import("react/jsx-runtime").JSX.Element;
export interface ShareElementProps extends ElementProps {
    eventId: string;
    eventTitle: string;
    shareUrl?: string;
    onShare?: (platform: string) => void;
}
export declare function ShareElement({ eventId, eventTitle, shareUrl, onShare, className }: ShareElementProps): import("react/jsx-runtime").JSX.Element;
export interface RecurrenceElementProps extends ElementProps {
    recurrence: {
        type: 'none' | 'daily' | 'weekly' | 'monthly';
        interval: number;
        endDate?: Date;
        weekdays?: number[];
    };
    onRecurrenceChange?: (recurrence: any) => void;
}
export declare function RecurrenceElement({ recurrence, onRecurrenceChange, className }: RecurrenceElementProps): import("react/jsx-runtime").JSX.Element;
export interface TagsElementProps extends ElementProps {
    tags: string[];
    availableTags?: string[];
    onTagsChange?: (tags: string[]) => void;
    maxTags?: number;
}
export declare function TagsElement({ tags, availableTags, onTagsChange, maxTags, className }: TagsElementProps): import("react/jsx-runtime").JSX.Element;
export interface StatusElementProps extends ElementProps {
    status: 'draft' | 'published' | 'cancelled' | 'completed';
    statusHistory?: Array<{
        status: string;
        timestamp: Date;
        changedBy: string;
        reason?: string;
    }>;
    onStatusChange?: (status: string, reason?: string) => void;
}
export declare function StatusElement({ status, statusHistory, onStatusChange, className }: StatusElementProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=event-elements.d.ts.map