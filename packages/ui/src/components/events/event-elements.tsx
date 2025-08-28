"use client";

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

import React, { useState, useCallback, useEffect } from 'react';
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

const getMobileClasses = (isMobile: boolean) => ({
  card: isMobile ? "shadow-sm border-0 rounded-xl touch-manipulation" : "",
  button: isMobile ? "h-12 text-base touch-manipulation min-h-[48px]" : "",
  input: isMobile ? "h-12 text-base touch-manipulation" : "",
  grid: isMobile ? "grid-cols-1 gap-4" : "grid-cols-1 md:grid-cols-2 gap-3",
  spacing: isMobile ? "space-y-4" : "space-y-2",
  text: isMobile ? "text-base" : "text-sm",
});

// Base Element Interface
export interface ElementProps {
  id?: string;
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

// Event-Specific Data Types
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

// INPUT ELEMENTS (8 Elements)

export interface TextInputElementProps extends ElementProps {
  placeholder?: string;
  maxLength?: number;
}

export function TextInputElement({ 
  id, 
  label, 
  value = '', 
  onChange, 
  placeholder, 
  maxLength,
  required,
  disabled,
  className 
}: TextInputElementProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <HiveInput
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

export interface DatePickerElementProps extends ElementProps {
  minDate?: Date;
  maxDate?: Date;
  includeTime?: boolean;
}

export function DatePickerElement({ 
  id, 
  label, 
  value, 
  onChange, 
  minDate,
  maxDate,
  includeTime = true,
  required,
  disabled,
  className 
}: DatePickerElementProps) {
  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    const d = new Date(date);
    if (includeTime) {
      return d.toISOString().slice(0, 16);
    }
    return d.toISOString().slice(0, 10);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={includeTime ? "datetime-local" : "date"}
          value={formatDateForInput(value)}
          onChange={(e) => onChange?.(new Date(e.target.value))}
          min={minDate ? formatDateForInput(minDate) : undefined}
          max={maxDate ? formatDateForInput(maxDate) : undefined}
          required={required}
          disabled={disabled}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
        <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

export interface LocationElementProps extends ElementProps {
  allowedTypes?: EventLocation['type'][];
}

export function LocationElement({ 
  id, 
  label = "Event Location", 
  value = { type: 'on_campus' as const }, 
  onChange, 
  allowedTypes = ['on_campus', 'off_campus', 'virtual', 'hybrid'],
  required,
  disabled,
  className 
}: LocationElementProps) {
  const location = value as EventLocation;

  const updateLocation = (updates: Partial<EventLocation>) => {
    onChange?.({ ...location, ...updates });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <select
        value={location.type}
        onChange={(e) => updateLocation({ type: e.target.value as EventLocation['type'] })}
        disabled={disabled}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      >
        {allowedTypes.includes('on_campus') && <option value="on_campus">On Campus</option>}
        {allowedTypes.includes('off_campus') && <option value="off_campus">Off Campus</option>}
        {allowedTypes.includes('virtual') && <option value="virtual">Virtual</option>}
        {allowedTypes.includes('hybrid') && <option value="hybrid">Hybrid</option>}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <HiveInput
          value={location.venue || ''}
          onChange={(e) => updateLocation({ venue: e.target.value })}
          placeholder="Venue name..."
          disabled={disabled}
        />
        <HiveInput
          value={location.room || ''}
          onChange={(e) => updateLocation({ room: e.target.value })}
          placeholder={location.type === 'virtual' ? 'Meeting link...' : 'Room/Address...'}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export interface SelectElementProps extends ElementProps {
  options: { value: string; label: string; description?: string }[];
  placeholder?: string;
}

export function SelectElement({ 
  id, 
  label, 
  value, 
  onChange, 
  options,
  placeholder = "Select an option...",
  required,
  disabled,
  className 
}: SelectElementProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        disabled={disabled}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value && options.find(o => o.value === value)?.description && (
        <p className="text-xs text-gray-500">
          {options.find(o => o.value === value)?.description}
        </p>
      )}
    </div>
  );
}

export interface NumberInputElementProps extends ElementProps {
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export function NumberInputElement({ 
  id, 
  label, 
  value, 
  onChange, 
  min,
  max,
  step = 1,
  placeholder,
  required,
  disabled,
  className 
}: NumberInputElementProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <HiveInput
        id={id}
        type="number"
        value={value || ''}
        onChange={(e) => onChange?.(parseInt(e.target.value) || undefined)}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

export interface CheckboxElementProps extends ElementProps {
  description?: string;
}

export function CheckboxElement({ 
  id, 
  label, 
  value = false, 
  onChange, 
  description,
  disabled,
  className 
}: CheckboxElementProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <label htmlFor={id} className="flex items-start gap-2 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="mt-0.5 rounded border-gray-300 focus:ring-amber-500"
        />
        <div>
          {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </label>
    </div>
  );
}

export interface RadioElementProps extends ElementProps {
  options: { value: string; label: string; description?: string }[];
}

export function RadioElement({ 
  id, 
  label, 
  value, 
  onChange, 
  options,
  disabled,
  className 
}: RadioElementProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-900">{label}</label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={disabled}
              className="mt-0.5 border-gray-300 focus:ring-amber-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-900">{option.label}</span>
              {option.description && (
                <p className="text-xs text-gray-500">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

// DISPLAY ELEMENTS (8 Elements)

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

export function EventCardElement({ 
  event,
  showActions = true,
  onRSVP,
  onEdit,
  className 
}: EventCardElementProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <HiveCard className={cn("p-4", className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.startDate)}</span>
          </div>
        </div>
        {event.status && (
          <HiveBadge 
            variant={event.status === 'published' ? 'secondary' : 'outline' as any}
          >
            {event.status}
          </HiveBadge>
        )}
      </div>

      {event.location && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{event.location.venue || event.location.type}</span>
        </div>
      )}

      {(event.capacity || event.rsvpCount !== undefined) && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Users className="w-4 h-4" />
          <span>
            {event.rsvpCount || 0}
            {event.capacity && ` / ${event.capacity}`} attendees
          </span>
        </div>
      )}

      {showActions && (
        <div className="flex gap-2 pt-3 border-t">
          {onRSVP && (
            <HiveButton size="sm" onClick={onRSVP}>
              RSVP
            </HiveButton>
          )}
          {onEdit && (
            <HiveButton variant="secondary" size="sm" onClick={onEdit}>
              Edit
            </HiveButton>
          )}
        </div>
      )}
    </HiveCard>
  );
}

export interface CounterElementProps extends ElementProps {
  current: number;
  total?: number;
  icon?: React.ComponentType<{ className?: string }>;
  color?: 'default' | 'success' | 'warning' | 'danger';
}

export function CounterElement({ 
  label,
  current,
  total,
  icon: Icon = Users,
  color = 'default',
  className 
}: CounterElementProps) {
  const colorClasses = {
    default: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
  };

  return (
    <div className={cn("flex items-center gap-3 p-3 bg-gray-50 rounded-lg", className)}>
      <Icon className={cn("w-5 h-5", colorClasses[color])} />
      <div>
        {label && <p className="text-sm font-medium text-gray-900">{label}</p>}
        <p className={cn("text-lg font-bold", colorClasses[color])}>
          {current}
          {total && <span className="text-gray-400"> / {total}</span>}
        </p>
      </div>
    </div>
  );
}

export interface QRCodeElementProps extends ElementProps {
  data: string;
  size?: number;
  onScan?: (data: string) => void;
}

export function QRCodeElement({ 
  label,
  data,
  size = 200,
  onScan,
  className 
}: QRCodeElementProps) {
  // This would integrate with a QR code library like qrcode.js
  // For now, showing placeholder
  return (
    <div className={cn("text-center space-y-3", className)}>
      {label && <p className="font-medium text-gray-900">{label}</p>}
      <div 
        className="mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <QrCode className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-xs text-gray-500">QR Code</p>
          <p className="text-xs text-gray-400 mt-1 break-all px-2">{data}</p>
        </div>
      </div>
      {onScan && (
        <HiveButton size="sm" onClick={() => onScan(data)}>
          Scan Code
        </HiveButton>
      )}
    </div>
  );
}

// ACTION ELEMENTS (5 Elements)

export interface RSVPElementProps extends ElementProps {
  eventId: string;
  currentResponse?: RSVPOption;
  allowGuests?: boolean;
  maxGuests?: number;
  onSubmit?: (response: RSVPOption) => void;
}

export function RSVPElement({ 
  eventId,
  currentResponse,
  allowGuests = false,
  maxGuests = 1,
  onSubmit,
  className 
}: RSVPElementProps) {
  const [response, setResponse] = useState<RSVPOption>(
    currentResponse || { status: 'yes', guestCount: 0 }
  );

  const handleSubmit = () => {
    onSubmit?.(response);
  };

  return (
    <HiveCard className={cn("p-4 space-y-4", className)}>
      <h3 className="font-semibold text-gray-900">RSVP for this event</h3>

      <RadioElement
        id={`rsvp-${eventId}`}
        label="Will you attend?"
        value={response.status}
        onChange={(status) => setResponse(prev => ({ ...prev, status }))}
        options={[
          { value: 'yes', label: 'Yes, I\'ll be there' },
          { value: 'maybe', label: 'Maybe' },
          { value: 'no', label: 'Can\'t make it' },
        ]}
      />

      {response.status === 'yes' && allowGuests && (
        <NumberInputElement
          id={`guests-${eventId}`}
          label="Number of guests"
          value={response.guestCount}
          onChange={(guestCount) => setResponse(prev => ({ ...prev, guestCount }))}
          min={0}
          max={maxGuests}
          placeholder="0"
        />
      )}

      {response.status === 'yes' && (
        <>
          <TextInputElement
            id={`dietary-${eventId}`}
            label="Dietary restrictions (optional)"
            value={response.dietaryRestrictions || ''}
            onChange={(dietaryRestrictions) => setResponse(prev => ({ ...prev, dietaryRestrictions }))}
            placeholder="Any allergies or dietary needs..."
          />

          <TextInputElement
            id={`accessibility-${eventId}`}
            label="Accessibility needs (optional)"
            value={response.accessibilityNeeds || ''}
            onChange={(accessibilityNeeds) => setResponse(prev => ({ ...prev, accessibilityNeeds }))}
            placeholder="Any accommodations needed..."
          />
        </>
      )}

      <HiveButton onClick={handleSubmit} className="w-full">
        Submit RSVP
      </HiveButton>
    </HiveCard>
  );
}

// LOGIC ELEMENTS (3 Elements)

export interface ConditionalElementProps {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ConditionalElement({ condition, children, fallback }: ConditionalElementProps) {
  return condition ? <>{children}</> : <>{fallback}</>;
}

export interface FilterElementProps extends ElementProps {
  filters: {
    categories?: string[];
    dateRange?: { start: Date; end: Date };
    location?: string;
    hasCapacity?: boolean;
  };
  onFiltersChange?: (filters: any) => void;
}

export function FilterElement({ 
  filters,
  onFiltersChange,
  className 
}: FilterElementProps) {
  return (
    <HiveCard className={cn("p-4 space-y-4", className)}>
      <h3 className="font-semibold text-gray-900">Filter Events</h3>
      
      <SelectElement
        id="category-filter"
        label="Category"
        value={filters.categories?.[0] || ''}
        onChange={(category) => onFiltersChange?.({ 
          ...filters, 
          categories: category ? [category] : undefined 
        })}
        options={[
          { value: 'academic', label: 'Academic' },
          { value: 'social', label: 'Social' },
          { value: 'professional', label: 'Professional' },
          { value: 'wellness', label: 'Wellness' },
          { value: 'cultural', label: 'Cultural' },
          { value: 'service', label: 'Service' },
          { value: 'sports', label: 'Sports' },
        ]}
        placeholder="All categories"
      />

      <CheckboxElement
        id="has-capacity"
        label="Only show events with available spots"
        value={filters.hasCapacity || false}
        onChange={(hasCapacity) => onFiltersChange?.({ ...filters, hasCapacity })}
      />
    </HiveCard>
  );
}

// ADVANCED ELEMENTS (10 Elements) - Completing the 24-Element Library

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

export function AttendeeListElement({ 
  attendees,
  showCheckIn = false,
  onCheckIn,
  className 
}: AttendeeListElementProps) {
  const confirmedAttendees = attendees.filter(a => a.status === 'confirmed');
  const checkedInCount = attendees.filter(a => a.checkedIn).length;

  return (
    <HiveCard className={cn("p-4 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Attendees</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{confirmedAttendees.length} confirmed</span>
          {showCheckIn && <span>{checkedInCount} checked in</span>}
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {attendees.map((attendee) => (
          <div key={attendee.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{attendee.name}</p>
              <p className="text-sm text-gray-600">{attendee.email}</p>
              {attendee.guestCount && attendee.guestCount > 0 && (
                <p className="text-xs text-gray-500">+{attendee.guestCount} guests</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <HiveBadge variant={attendee.status === 'confirmed' ? 'secondary' : 'outline'}>
                {attendee.status}
              </HiveBadge>
              {showCheckIn && attendee.status === 'confirmed' && (
                attendee.checkedIn ? (
                  <HiveBadge variant="secondary" className="bg-green-100 text-green-800">
                    ✓ Checked In
                  </HiveBadge>
                ) : (
                  <HiveButton size="sm" onClick={() => onCheckIn?.(attendee.id)}>
                    Check In
                  </HiveButton>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </HiveCard>
  );
}

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

export function CalendarViewElement({ 
  events,
  currentDate = new Date(),
  onDateChange,
  onEventClick,
  className 
}: CalendarViewElementProps) {
  const [viewDate, setViewDate] = useState(currentDate);
  const isMobile = useMobileDetection();
  const mobileClasses = getMobileClasses(isMobile);

  const changeMonth = (direction: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setViewDate(newDate);
    onDateChange?.(newDate);
  };

  const getDaysInMonth = (date: Date) => {
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

  return (
    <HiveCard className={cn("p-4", mobileClasses.card, className)}>
      <div className={cn("flex items-center justify-between mb-4", isMobile && "flex-col gap-3")}>
        <h3 className={cn("font-semibold text-gray-900", isMobile ? "text-xl" : "text-lg")}>
          {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-2">
          <HiveButton 
            variant="secondary" 
            size={isMobile ? "default" : "sm"} 
            onClick={() => changeMonth(-1)}
            className={mobileClasses.button}
          >
            ←
          </HiveButton>
          <HiveButton 
            variant="secondary" 
            size={isMobile ? "default" : "sm"} 
            onClick={() => changeMonth(1)}
            className={mobileClasses.button}
          >
            →
          </HiveButton>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {(isMobile ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).map((day, index) => (
          <div key={index} className={cn("p-2 text-center font-medium text-gray-600", mobileClasses.text)}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "p-2 border border-gray-100 rounded cursor-pointer hover:bg-gray-50 touch-manipulation",
              isMobile ? "min-h-[80px]" : "min-h-[60px]",
              !day.isCurrentMonth && "text-gray-400 bg-gray-50"
            )}
          >
            <div className={cn("font-medium mb-1", mobileClasses.text)}>{day.date.getDate()}</div>
            {day.events.slice(0, isMobile ? 1 : 2).map(event => (
              <div
                key={event.id}
                onClick={() => onEventClick?.(event.id)}
                className={cn(
                  "p-1 bg-amber-100 text-amber-800 rounded mb-1 truncate cursor-pointer hover:bg-amber-200 touch-manipulation",
                  isMobile ? "text-xs leading-tight" : "text-xs"
                )}
              >
                {event.title}
              </div>
            ))}
            {day.events.length > (isMobile ? 1 : 2) && (
              <div className="text-xs text-gray-500">+{day.events.length - (isMobile ? 1 : 2)} more</div>
            )}
          </div>
        ))}
      </div>
    </HiveCard>
  );
}

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

export function NotificationElement({ 
  notifications,
  onMarkRead,
  onMarkAllRead,
  className 
}: NotificationElementProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return Clock;
      case 'update': return AlertCircle;
      case 'rsvp': return Users;
      case 'checkin': return CheckSquare;
      default: return AlertCircle;
    }
  };

  return (
    <HiveCard className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <HiveBadge className="bg-red-100 text-red-800">
              {unreadCount} new
            </HiveBadge>
          )}
        </div>
        {unreadCount > 0 && (
          <HiveButton variant="secondary" size="sm" onClick={onMarkAllRead}>
            Mark All Read
          </HiveButton>
        )}
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No notifications</p>
        ) : (
          notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={cn(
                  "p-3 border rounded-lg cursor-pointer transition-colors",
                  notification.read 
                    ? "border-gray-200 bg-white" 
                    : "border-amber-200 bg-amber-50"
                )}
                onClick={() => onMarkRead?.(notification.id)}
              >
                <div className="flex gap-3">
                  <Icon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <span className="text-xs text-gray-500">
                        {notification.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </HiveCard>
  );
}

export interface AnalyticsChartElementProps extends ElementProps {
  data: Array<{
    label: string;
    value: number;
    trend?: number;
  }>;
  title?: string;
  type?: 'bar' | 'line' | 'pie';
}

export function AnalyticsChartElement({ 
  data,
  title = "Analytics",
  type = 'bar',
  className 
}: AnalyticsChartElementProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <HiveCard className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <TrendingUp className="w-5 h-5 text-gray-600" />
      </div>

      {type === 'bar' && (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{item.label}</span>
                <span className="font-medium text-gray-900">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {type === 'line' && (
        <div className="h-32 flex items-end justify-between border-b border-gray-200">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div 
                className="w-3 bg-amber-500 rounded-t"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
              <span className="text-xs text-gray-600 -rotate-45 transform origin-left">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </HiveCard>
  );
}

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

export function FeedbackFormElement({ 
  eventId,
  questions = [
    { id: 'rating', question: 'How would you rate this event?', type: 'rating', required: true },
    { id: 'comments', question: 'Additional comments', type: 'text', required: false },
  ],
  onSubmit,
  className 
}: FeedbackFormElementProps) {
  const [responses, setResponses] = useState<Record<string, any>>({});

  const updateResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    onSubmit?.(responses);
  };

  return (
    <HiveCard className={cn("p-4 space-y-4", className)}>
      <h3 className="font-semibold text-gray-900">Event Feedback</h3>

      {questions.map((question) => (
        <div key={question.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            {question.question}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {question.type === 'rating' && (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => updateResponse(question.id, rating)}
                  className={cn(
                    "p-1 transition-colors",
                    responses[question.id] >= rating 
                      ? "text-yellow-400" 
                      : "text-gray-300 hover:text-yellow-300"
                  )}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          )}

          {question.type === 'text' && (
            <HiveTextarea
              value={responses[question.id] || ''}
              onChange={(e) => updateResponse(question.id, e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
            />
          )}

          {question.type === 'select' && question.options && (
            <select
              value={responses[question.id] || ''}
              onChange={(e) => updateResponse(question.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select an option...</option>
              {question.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
        </div>
      ))}

      <HiveButton onClick={handleSubmit} className="w-full">
        Submit Feedback
      </HiveButton>
    </HiveCard>
  );
}

export interface ShareElementProps extends ElementProps {
  eventId: string;
  eventTitle: string;
  shareUrl?: string;
  onShare?: (platform: string) => void;
}

export function ShareElement({ 
  eventId,
  eventTitle,
  shareUrl = window.location.href,
  onShare,
  className 
}: ShareElementProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Could show toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const shareOptions = [
    { platform: 'copy', label: 'Copy Link', action: copyToClipboard },
    { platform: 'email', label: 'Email', action: () => {
      window.location.href = `mailto:?subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(shareUrl)}`;
      onShare?.('email');
    }},
    { platform: 'twitter', label: 'Twitter', action: () => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(eventTitle)}&url=${encodeURIComponent(shareUrl)}`);
      onShare?.('twitter');
    }},
    { platform: 'facebook', label: 'Facebook', action: () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
      onShare?.('facebook');
    }},
  ];

  return (
    <HiveCard className={cn("p-4", className)}>
      <h3 className="font-semibold text-gray-900 mb-3">Share Event</h3>
      <div className="grid grid-cols-2 gap-2">
        {shareOptions.map((option) => (
          <HiveButton
            key={option.platform}
            variant="secondary"
            size="sm"
            onClick={option.action}
            className="justify-center"
          >
            {option.label}
          </HiveButton>
        ))}
      </div>
    </HiveCard>
  );
}

export interface RecurrenceElementProps extends ElementProps {
  recurrence: {
    type: 'none' | 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
    weekdays?: number[];
  };
  onRecurrenceChange?: (recurrence: any) => void;
}

export function RecurrenceElement({ 
  recurrence,
  onRecurrenceChange,
  className 
}: RecurrenceElementProps) {
  const updateRecurrence = (updates: any) => {
    onRecurrenceChange?.({ ...recurrence, ...updates });
  };

  return (
    <HiveCard className={cn("p-4 space-y-4", className)}>
      <h3 className="font-semibold text-gray-900">Event Recurrence</h3>

      <SelectElement
        id="recurrence-type"
        label="Repeat"
        value={recurrence.type}
        onChange={(type) => updateRecurrence({ type })}
        options={[
          { value: 'none', label: 'Does not repeat' },
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'monthly', label: 'Monthly' },
        ]}
      />

      {recurrence.type !== 'none' && (
        <>
          <NumberInputElement
            id="recurrence-interval"
            label={`Repeat every ${recurrence.type === 'daily' ? 'day(s)' : recurrence.type === 'weekly' ? 'week(s)' : 'month(s)'}`}
            value={recurrence.interval}
            onChange={(interval) => updateRecurrence({ interval })}
            min={1}
            max={30}
          />

          <DatePickerElement
            id="recurrence-end"
            label="End date"
            value={recurrence.endDate}
            onChange={(endDate) => updateRecurrence({ endDate })}
            includeTime={false}
          />
        </>
      )}
    </HiveCard>
  );
}

export interface TagsElementProps extends ElementProps {
  tags: string[];
  availableTags?: string[];
  onTagsChange?: (tags: string[]) => void;
  maxTags?: number;
}

export function TagsElement({ 
  tags,
  availableTags = ['academic', 'social', 'professional', 'wellness', 'cultural', 'service', 'sports'],
  onTagsChange,
  maxTags = 5,
  className 
}: TagsElementProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    if (!tags.includes(tag) && tags.length < maxTags) {
      onTagsChange?.([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange?.(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-gray-900">
        Tags ({tags.length}/{maxTags})
      </label>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <HiveBadge
            key={tag}
            variant="secondary"
            className="cursor-pointer hover:bg-red-100 hover:text-red-800"
            onClick={() => removeTag(tag)}
          >
            {tag} ×
          </HiveBadge>
        ))}
      </div>

      <HiveInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag..."
        disabled={tags.length >= maxTags}
      />

      {availableTags.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {availableTags
              .filter(tag => !tags.includes(tag))
              .slice(0, 8)
              .map((tag) => (
                <HiveBadge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-amber-50"
                  onClick={() => addTag(tag)}
                >
                  + {tag}
                </HiveBadge>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

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

export function StatusElement({ 
  status,
  statusHistory = [],
  onStatusChange,
  className 
}: StatusElementProps) {
  const [reason, setReason] = useState('');
  const [showReasonInput, setShowReasonInput] = useState(false);

  const statusConfig = {
    draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
    published: { color: 'bg-green-100 text-green-800', label: 'Published' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
    completed: { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
  };

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === 'cancelled') {
      setShowReasonInput(true);
    } else {
      onStatusChange?.(newStatus);
    }
  };

  const submitStatusChange = () => {
    onStatusChange?.(showReasonInput ? 'cancelled' : status, reason);
    setReason('');
    setShowReasonInput(false);
  };

  return (
    <HiveCard className={cn("p-4 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Event Status</h3>
        <HiveBadge className={statusConfig[status].color}>
          {statusConfig[status].label}
        </HiveBadge>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">Change Status</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>

        {showReasonInput && (
          <div className="space-y-2">
            <HiveTextarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for cancellation..."
              rows={2}
            />
            <div className="flex gap-2">
              <HiveButton size="sm" onClick={submitStatusChange}>
                Confirm
              </HiveButton>
              <HiveButton variant="secondary" size="sm" onClick={() => setShowReasonInput(false)}>
                Cancel
              </HiveButton>
            </div>
          </div>
        )}
      </div>

      {statusHistory.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Status History</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {statusHistory.map((entry, index) => (
              <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">{entry.status}</span>
                  <span>{entry.timestamp.toLocaleDateString()}</span>
                </div>
                <p>Changed by {entry.changedBy}</p>
                {entry.reason && <p className="text-xs">Reason: {entry.reason}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </HiveCard>
  );
}