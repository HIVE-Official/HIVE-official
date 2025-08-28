"use client";

/**
 * Event Creator Tool - Built with Event Elements
 * 
 * This tool is composed entirely of reusable elements from the event system.
 * Students can see exactly how tools are built from elements.
 */

import React, { useState, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { Calendar, MapPin, Users, Eye, Save, Share, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { EventDefinition, EventCategory, EventType, validateEventDefinition } from './event-system-core';
import {
  TextInputElement,
  DatePickerElement,
  LocationElement,
  SelectElement,
  NumberInputElement,
  CheckboxElement,
  RadioElement,
  EventCardElement,
  ConditionalElement,
} from './event-elements';

interface EventCreatorToolProps {
  spaceId: string;
  onEventCreated?: (event: EventDefinition) => void;
  onCancel?: () => void;
  initialEvent?: Partial<EventDefinition>;
}

const EVENT_CATEGORIES = [
  { value: 'academic', label: 'Academic', description: 'Study sessions, lectures, workshops' },
  { value: 'social', label: 'Social', description: 'Parties, mixers, casual hangouts' },
  { value: 'professional', label: 'Professional', description: 'Networking, career events, speakers' },
  { value: 'wellness', label: 'Wellness', description: 'Fitness, mental health, outdoor activities' },
  { value: 'cultural', label: 'Cultural', description: 'Arts, music, cultural celebrations' },
  { value: 'service', label: 'Service', description: 'Volunteering, community service' },
  { value: 'sports', label: 'Sports', description: 'Athletic events, intramurals' },
  { value: 'other', label: 'Other', description: 'Miscellaneous events' },
] as const;

const EVENT_TYPES = [
  { value: 'meeting', label: 'Meeting' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'party', label: 'Party' },
  { value: 'study_session', label: 'Study Session' },
  { value: 'presentation', label: 'Presentation' },
  { value: 'competition', label: 'Competition' },
  { value: 'fundraiser', label: 'Fundraiser' },
  { value: 'volunteer', label: 'Volunteer Event' },
] as const;

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
] as const;

export function EventCreatorToolV2({ spaceId, onEventCreated, onCancel, initialEvent }: EventCreatorToolProps) {
  // Tool State - managed by the tool, not individual elements
  const [eventData, setEventData] = useState<Partial<EventDefinition>>({
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

  const [errors, setErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'basic' | 'datetime' | 'settings' | 'preview'>('basic');
  const [isLoading, setIsLoading] = useState(false);

  // Generic update function for any field
  const updateField = useCallback((field: keyof EventDefinition, value: any) => {
    setEventData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user makes changes
    if (errors.length > 0) {
      setErrors([]);
    }
  }, [errors.length]);

  const validateAndProceed = (nextStep: typeof currentStep) => {
    const validationErrors = validateEventDefinition(eventData);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      setCurrentStep(nextStep);
    }
  };

  const handleSaveEvent = async (publish: boolean = false) => {
    const validationErrors = validateEventDefinition(eventData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const newEvent: EventDefinition = {
        ...eventData,
        id: `event_${Date.now()}`,
        spaceId: spaceId,
        createdBy: 'current_user', // TODO: Get from auth context
        status: publish ? 'published' : 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
        // Required fields with fallbacks
        title: eventData.title!,
        description: eventData.description || '',
        category: eventData.category!,
        type: eventData.type!,
        startDate: eventData.startDate!,
        endDate: eventData.endDate!,
        timezone: eventData.timezone!,
        isAllDay: eventData.isAllDay!,
        location: eventData.location!,
        requiresRSVP: eventData.requiresRSVP!,
        allowGuests: eventData.allowGuests!,
        visibility: eventData.visibility!,
        coHostingSpaces: eventData.coHostingSpaces!,
        tags: eventData.tags!,
      };

      // TODO: API call to save event
      console.log('Saving event:', newEvent);
      onEventCreated?.(newEvent);
    } catch (error) {
      console.error('Error saving event:', error);
      setErrors(['Failed to save event. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Basic Information (Uses 4 elements)
  const renderBasicStep = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Tell us about your event</p>
      </div>

      {/* Element 1: TextInputElement for title */}
      <TextInputElement
        id="event-title"
        label="Event Title"
        value={eventData.title}
        onChange={(value) => updateField('title', value)}
        placeholder="Enter event title..."
        required
        maxLength={100}
      />

      {/* Element 2: TextAreaElement for description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Description
        </label>
        <textarea
          value={eventData.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Describe your event..."
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Element 3: SelectElement for category */}
        <SelectElement
          id="event-category"
          label="Category"
          value={eventData.category}
          onChange={(value) => updateField('category', value)}
          options={EVENT_CATEGORIES as any}
          required
        />

        {/* Element 4: SelectElement for type */}
        <SelectElement
          id="event-type"
          label="Event Type"
          value={eventData.type}
          onChange={(value) => updateField('type', value)}
          options={EVENT_TYPES as any}
          required
        />
      </div>
    </div>
  );

  // Step 2: Date & Location (Uses 3 elements)
  const renderDateTimeStep = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">When & Where</h2>
        <p className="text-gray-600">Set the date, time, and location</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Element 5: DatePickerElement for start date */}
        <DatePickerElement
          id="start-date"
          label="Start Date & Time"
          value={eventData.startDate}
          onChange={(value) => updateField('startDate', value)}
          minDate={new Date()}
          required
        />

        {/* Element 6: DatePickerElement for end date */}
        <DatePickerElement
          id="end-date"
          label="End Date & Time"
          value={eventData.endDate}
          onChange={(value) => updateField('endDate', value)}
          minDate={eventData.startDate}
          required
        />
      </div>

      {/* Element 7: CheckboxElement for all-day */}
      <CheckboxElement
        id="all-day"
        label="All-day event"
        value={eventData.isAllDay}
        onChange={(value) => updateField('isAllDay', value)}
        description="Event runs for the entire day"
      />

      {/* Element 8: LocationElement for location */}
      <LocationElement
        id="event-location"
        label="Location"
        value={eventData.location}
        onChange={(value) => updateField('location', value)}
        required
      />
    </div>
  );

  // Step 3: Settings (Uses 5 elements)
  const renderSettingsStep = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Event Settings</h2>
        <p className="text-gray-600">Configure attendance and visibility</p>
      </div>

      {/* Element 9: CheckboxElement for RSVP requirement */}
      <CheckboxElement
        id="requires-rsvp"
        label="Require RSVP"
        value={eventData.requiresRSVP}
        onChange={(value) => updateField('requiresRSVP', value)}
        description="Attendees must RSVP to attend this event"
      />

      {/* Element 10: ConditionalElement + NumberInputElement for capacity */}
      <ConditionalElement condition={eventData.requiresRSVP === true}>
        <NumberInputElement
          id="capacity"
          label="Capacity Limit"
          value={eventData.capacity}
          onChange={(value) => updateField('capacity', value)}
          min={1}
          max={1000}
          placeholder="Maximum attendees..."
        />
      </ConditionalElement>

      {/* Element 11: ConditionalElement + CheckboxElement for guests */}
      <ConditionalElement condition={eventData.requiresRSVP === true}>
        <CheckboxElement
          id="allow-guests"
          label="Allow guests"
          value={eventData.allowGuests}
          onChange={(value) => updateField('allowGuests', value)}
          description="Let attendees bring guests to the event"
        />
      </ConditionalElement>

      {/* Element 12: ConditionalElement + NumberInputElement for guest limit */}
      <ConditionalElement condition={eventData.allowGuests === true}>
        <NumberInputElement
          id="guest-limit"
          label="Guest limit per person"
          value={eventData.guestLimit}
          onChange={(value) => updateField('guestLimit', value)}
          min={1}
          max={10}
          placeholder="1"
        />
      </ConditionalElement>

      {/* Element 13: RadioElement for visibility */}
      <RadioElement
        id="visibility"
        label="Event Visibility"
        value={eventData.visibility}
        onChange={(value) => updateField('visibility', value)}
        options={VISIBILITY_OPTIONS as any}
      />
    </div>
  );

  // Step 4: Preview (Uses 1 element)
  const renderPreviewStep = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Preview Your Event</h2>
        <p className="text-gray-600">This is how your event will appear to others</p>
      </div>

      {/* Element 14: EventCardElement for preview */}
      <EventCardElement
        id="event-preview"
        event={{
          title: eventData.title || 'Untitled Event',
          startDate: eventData.startDate || new Date(),
          endDate: eventData.endDate,
          location: eventData.location,
          category: eventData.category,
          capacity: eventData.capacity,
          rsvpCount: 0,
          status: eventData.status,
        }}
        showActions={false}
      />

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 mb-1">Ready to publish?</h4>
            <p className="text-sm text-amber-700">
              Once published, your event will be visible to others and they can start RSVPing.
              You can always edit event details later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const steps = [
    { id: 'basic', label: 'Basic Info', component: renderBasicStep },
    { id: 'datetime', label: 'Date & Location', component: renderDateTimeStep },
    { id: 'settings', label: 'Settings', component: renderSettingsStep },
    { id: 'preview', label: 'Preview', component: renderPreviewStep },
  ] as const;

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const currentStepData = steps[currentStepIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Event</h1>
        <p className="text-gray-600">
          Built with <span className="font-medium text-amber-600">{steps.reduce((acc, step) => {
            if (step.id === 'basic') return acc + 4;
            if (step.id === 'datetime') return acc + 4;
            if (step.id === 'settings') return acc + 5;
            if (step.id === 'preview') return acc + 1;
            return acc;
          }, 0)} reusable elements</span> from the HIVE Event System
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = currentStepIndex > index;
            
            return (
              <React.Fragment key={step.id}>
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  isActive && "bg-amber-100 text-amber-800",
                  isCompleted && "bg-green-100 text-green-800",
                  !isActive && !isCompleted && "text-gray-500"
                )}>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                    isActive && "bg-amber-600 text-white",
                    isCompleted && "bg-green-600 text-white",
                    !isActive && !isCompleted && "bg-gray-300 text-gray-600"
                  )}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-px mx-4",
                    isCompleted ? "bg-green-300" : "bg-gray-300"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800 mb-1">Please fix the following errors:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <HiveCard className="p-8 mb-8">
        {currentStepData.component()}
      </HiveCard>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {onCancel && (
            <HiveButton variant="secondary" onClick={onCancel}>
              Cancel
            </HiveButton>
          )}
        </div>

        <div className="flex gap-3">
          {currentStepIndex > 0 && (
            <HiveButton
              variant="secondary"
              onClick={() => setCurrentStep(steps[currentStepIndex - 1].id)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </HiveButton>
          )}

          {currentStep === 'preview' ? (
            <>
              <HiveButton
                variant="secondary"
                onClick={() => handleSaveEvent(false)}
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </HiveButton>
              <HiveButton
                onClick={() => handleSaveEvent(true)}
                disabled={isLoading}
              >
                <Share className="w-4 h-4 mr-2" />
                Publish Event
              </HiveButton>
            </>
          ) : (
            <HiveButton
              onClick={() => validateAndProceed(steps[currentStepIndex + 1].id)}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </HiveButton>
          )}
        </div>
      </div>

      {/* Element Usage Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">🧩 Element System in Action</h4>
        <p className="text-sm text-blue-700 mb-2">
          This Event Creator tool is built from <strong>14 reusable elements</strong>:
        </p>
        <div className="text-xs text-blue-600 space-y-1">
          <p>• TextInputElement (title) • SelectElement (category, type) • DatePickerElement (dates)</p>
          <p>• LocationElement (venue) • CheckboxElement (settings) • NumberInputElement (capacity, guests)</p>
          <p>• RadioElement (visibility) • ConditionalElement (show/hide) • EventCardElement (preview)</p>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Students can create custom tools by combining these same elements in different ways!
        </p>
      </div>
    </div>
  );
}

export default EventCreatorToolV2;