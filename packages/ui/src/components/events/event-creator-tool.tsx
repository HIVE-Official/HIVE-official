"use client";

import React, { useState, useCallback } from 'react';
import { HiveCard, HiveButton, HiveInput, HiveTextarea, HiveBadge } from '../index';
import { Calendar, MapPin, Users, Clock, Settings, Eye, Save, Share, Plus, X, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { EventDefinition, EventCategory, EventType, EventLocation, validateEventDefinition } from './event-system-core';

interface EventCreatorProps {
  spaceId: string;
  onEventCreated?: (event: EventDefinition) => void;
  onCancel?: () => void;
  initialEvent?: Partial<EventDefinition>
}

const EVENT_CATEGORIES: { value: EventCategory; label: string; description: string }[] = [
  { value: 'academic', label: 'Academic', description: 'Study sessions, lectures, workshops' },
  { value: 'social', label: 'Social', description: 'Parties, mixers, casual hangouts' },
  { value: 'professional', label: 'Professional', description: 'Networking, career events, speakers' },
  { value: 'wellness', label: 'Wellness', description: 'Fitness, mental health, outdoor activities' },
  { value: 'cultural', label: 'Cultural', description: 'Arts, music, cultural celebrations' },
  { value: 'service', label: 'Service', description: 'Volunteering, community service' },
  { value: 'sports', label: 'Sports', description: 'Athletic events, intramurals' },
  { value: 'other', label: 'Other', description: 'Miscellaneous events' },
];

const EVENT_TYPES: { value: EventType; label: string }[] = [
  { value: 'meeting', label: 'Meeting' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'party', label: 'Party' },
  { value: 'study_session', label: 'Study Session' },
  { value: 'presentation', label: 'Presentation' },
  { value: 'competition', label: 'Competition' },
  { value: 'fundraiser', label: 'Fundraiser' },
  { value: 'volunteer', label: 'Volunteer Event' },
];

export function EventCreatorTool({ spaceId, onEventCreated, onCancel, initialEvent }: EventCreatorProps) {
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
  const [currentStep, setCurrentStep] = useState<'basic' | 'details' | 'settings' | 'preview'>('basic');
  const [isLoading, setIsLoading] = useState(false);

  const updateEventData = useCallback((updates: Partial<EventDefinition>) => {
    setEventData(prev => ({ ...prev, ...updates }));
    // Clear errors when user makes changes
    if (errors.length > 0) {
      setErrors([])
    }
  }, [errors.length]);

  const validateCurrentStep = (): boolean => {
    const validationErrors = validateEventDefinition(eventData);
    setErrors(validationErrors);
    return validationErrors.length === 0
  };

  const handleStepChange = (step: typeof currentStep) => {
    if (step === 'preview' && !validateCurrentStep()) {
      return
    }
    setCurrentStep(step)
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  };

  const handleSaveEvent = async (publish: boolean = false) => {
    if (!validateCurrentStep()) {
      return
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
        title: eventData.title!,
        description: eventData.description!,
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
      
      onEventCreated?.(newEvent)
    } catch (error) {
      console.error('Error saving event:', error);
      setErrors(['Failed to save event. Please try again.'])
    } finally {
      setIsLoading(false)
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Event Title *
        </label>
        <HiveInput
          value={eventData.title || ''}
          onChange={(e) => updateEventData({ title: e.target.value }}
          placeholder="Enter event title..."
          className="text-lg font-semibold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Description
        </label>
        <HiveTextarea
          value={eventData.description || ''}
          onChange={(e) => updateEventData({ description: e.target.value }}
          placeholder="Describe your event..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Category
          </label>
          <select
            value={eventData.category}
            onChange={(e) => updateEventData({ category: e.target.value as EventCategory }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            {EVENT_CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {EVENT_CATEGORIES.find(c => c.value === eventData.category)?.description}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Event Type
          </label>
          <select
            value={eventData.type}
            onChange={(e) => updateEventData({ type: e.target.value as EventType }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            {EVENT_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderDateTime = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Start Date & Time *
          </label>
          <input
            type="datetime-local"
            value={eventData.startDate?.toISOString().slice(0, 16) || ''}
            onChange={(e) => updateEventData({ startDate: new Date(e.target.value) }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            End Date & Time *
          </label>
          <input
            type="datetime-local"
            value={eventData.endDate?.toISOString().slice(0, 16) || ''}
            onChange={(e) => updateEventData({ endDate: new Date(e.target.value) }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={eventData.isAllDay}
            onChange={(e) => updateEventData({ isAllDay: e.target.checked }}
            className="rounded border-gray-300 focus:ring-amber-500"
          />
          <span className="text-sm font-medium text-gray-900">All-day event</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Location
        </label>
        <div className="space-y-3">
          <select
            value={eventData.location?.type || 'on_campus'}
            onChange={(e) => updateEventData({
              location: { ...eventData.location, type: e.target.value as EventLocation['type'] }
          })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="on_campus">On Campus</option>
            <option value="off_campus">Off Campus</option>
            <option value="virtual">Virtual</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <HiveInput
              value={eventData.location?.venue || ''}
              onChange={(e) => updateEventData({
                location: { ...eventData.location, venue: e.target.value }
          })}
              placeholder="Venue name..."
            />
            <HiveInput
              value={eventData.location?.room || ''}
              onChange={(e) => updateEventData({
                location: { ...eventData.location, room: e.target.value }
          })}
              placeholder="Room/Address..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">RSVP Settings</h3>
        
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={eventData.requiresRSVP}
              onChange={(e) => updateEventData({ requiresRSVP: e.target.checked }}
              className="rounded border-gray-300 focus:ring-amber-500"
            />
            <span className="text-sm font-medium text-gray-900">Require RSVP</span>
          </label>

          {eventData.requiresRSVP && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Capacity Limit
                </label>
                <HiveInput
                  type="number"
                  value={eventData.capacity || ''}
                  onChange={(e) => updateEventData({ capacity: parseInt(e.target.value) || undefined }}
                  placeholder="Maximum attendees..."
                  min="1"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={eventData.allowGuests}
                  onChange={(e) => updateEventData({ allowGuests: e.target.checked }}
                  className="rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-sm font-medium text-gray-900">Allow guests</span>
              </label>

              {eventData.allowGuests && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Guest limit per person
                  </label>
                  <HiveInput
                    type="number"
                    value={eventData.guestLimit || 1}
                    onChange={(e) => updateEventData({ guestLimit: parseInt(e.target.value) || 1 }}
                    min="1"
                    max="10"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visibility</h3>
        
        <select
          value={eventData.visibility}
          onChange={(e) => updateEventData({ visibility: e.target.value as EventDefinition['visibility'] }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="space_only">Space Members Only</option>
          <option value="public">Public (Campus-wide)</option>
          <option value="private">Private (Invite Only)</option>
        </select>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <HiveCard className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{eventData.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <HiveBadge variant="outline">
                {EVENT_CATEGORIES.find(c => c.value === eventData.category)?.label}
              </HiveBadge>
              <HiveBadge variant="outline">
                {EVENT_TYPES.find(t => t.value === eventData.type)?.label}
              </HiveBadge>
            </div>
          </div>
          <HiveBadge variant={eventData.status === 'published' ? 'default' : 'outline'}>
            {eventData.status}
          </HiveBadge>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">
                {eventData.startDate && formatDateTime(eventData.startDate)}
              </p>
              {eventData.endDate && (
                <p className="text-sm text-gray-600">
                  Until {formatDateTime(eventData.endDate)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">
                {eventData.location?.venue || 'TBD'}
              </p>
              {eventData.location?.room && (
                <p className="text-sm text-gray-600">{eventData.location.room}</p>
              )}
            </div>
          </div>

          {eventData.requiresRSVP && (
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  RSVP Required
                </p>
                {eventData.capacity && (
                  <p className="text-sm text-gray-600">
                    Limited to {eventData.capacity} attendees
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {eventData.description && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-700 whitespace-pre-wrap">{eventData.description}</p>
          </div>
        )}
      </HiveCard>
    </div>
  );

  const steps = [
    { id: 'basic', label: 'Basic Info', icon: Settings },
    { id: 'details', label: 'Date & Location', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Users },
    { id: 'preview', label: 'Preview', icon: Eye },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Event</h1>
        <p className="text-gray-600">Plan and coordinate campus events with your community</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
            
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => handleStepChange(step.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    isActive && "bg-amber-100 text-amber-800",
                    isCompleted && "bg-green-100 text-green-800",
                    !isActive && !isCompleted && "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.label}</span>
                </button>
                
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-px mx-4",
                    isCompleted ? "bg-green-300" : "bg-gray-300"
                  )} />
                )}
              </React.Fragment>
            )
          })
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
        {currentStep === 'basic' && renderBasicInfo()}
        {currentStep === 'details' && renderDateTime()}
        {currentStep === 'settings' && renderSettings()}
        {currentStep === 'preview' && renderPreview()}
      </HiveCard>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {onCancel && (
            <HiveButton variant="outline" onClick={onCancel}>
              Cancel
            </HiveButton>
          )}
        </div>

        <div className="flex gap-3">
          {currentStep !== 'basic' && (
            <HiveButton
              variant="outline"
              onClick={() => {
                const currentIndex = steps.findIndex(s => s.id === currentStep);
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1].id)
                }
          })}
            >
              Back
            </HiveButton>
          )}

          {currentStep === 'preview' ? (
            <>
              <HiveButton
                variant="outline"
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
              onClick={() => {
                const currentIndex = steps.findIndex(s => s.id === currentStep);
                if (currentIndex < steps.length - 1) {
                  handleStepChange(steps[currentIndex + 1].id)
                }
          })}
            >
              Next
            </HiveButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventCreatorTool;