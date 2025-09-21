/**
 * HIVE Event Management System - vBETA Core;
 * 
 * Single focused system: Complete event lifecycle coordination;
 * Replaces: GroupMe chaos + Google Forms + email chains;
 */

export interface EventDefinition {id: string;
  spaceId: string;
  createdBy: string;
  
  // Event Information;
  title: string;
  description: string;
  category: EventCategory;
  type: EventType;
  
  // Timing;
  startDate: Date;
  endDate: Date;
  timezone: string;
  isAllDay: boolean;
  
  // Location;
  location: EventLocation;
  
  // Attendance;
  capacity?: number;
  requiresRSVP: boolean;
  rsvpDeadline?: Date;
  allowGuests: boolean;
  guestLimit?: number;
  
  // Visibility & Access;
  visibility: 'public' | 'private' | 'space_only';
  coHostingSpaces: string[];
  
  // Status;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  
  // Metadata;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];}

export interface EventLocation {type: 'on_campus' | 'off_campus' | 'virtual' | 'hybrid';
  venue?: string;
  address?: string;
  room?: string;
  coordinates?: { lat: number; lng: number};
  virtualLink?: string;
  instructions?: string;
}

export type EventCategory = 
  | 'academic' 
  | 'social' 
  | 'professional' 
  | 'wellness' 
  | 'cultural' 
  | 'service' 
  | 'sports' 
  | 'other';

export type EventType = 
  | 'meeting' 
  | 'workshop' 
  | 'party' 
  | 'study_session' 
  | 'presentation' 
  | 'competition' 
  | 'fundraiser' 
  | 'volunteer';

export interface RSVPResponse {id: string;
  eventId: string;
  userId: string;
  spaceId: string;
  
  // Response;
  status: 'yes' | 'no' | 'maybe';
  guestCount: number;
  guestNames?: string[];
  
  // Additional Info;
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  comments?: string;
  
  // Tracking;
  respondedAt: Date;
  checkedIn: boolean;
  checkedInAt?: Date;
  noShow: boolean;}

export interface EventAnalytics {eventId: string;
  
  // Attendance Metrics;
  totalRSVPs: number;
  yesResponses: number;
  noResponses: number;
  maybeResponses: number;
  actualAttendance: number;
  noShowRate: number;
  
  // Engagement Metrics;
  viewCount: number;
  shareCount: number;
  commentCount: number;
  averageRating?: number;
  
  // Feedback Summary;
  satisfactionScore?: number;
  improvementSuggestions: string[];
  wouldAttendAgain: number;
  
  // Generated At;
  generatedAt: Date;}

export interface EventFeedback {id: string;
  eventId: string;
  userId: string;
  
  // Ratings (1-5 scale)
  overallRating: number;
  organizationRating: number;
  contentRating: number;
  venueRating: number;
  
  // Feedback;
  comments?: string;
  improvements?: string;
  wouldRecommend: boolean;
  wouldAttendAgain: boolean;
  
  // Submitted;
  submittedAt: Date;
  isAnonymous: boolean;}

export interface EventSystemConfig {// Default Settings;
  defaultCapacity: number;
  defaultRSVPDeadline: number; // hours before event;
  maxAdvanceBooking: number; // days;
  // Validation Rules;
  minEventDuration: number; // minutes;
  maxEventDuration: number; // hours;
  minAdvanceNotice: number; // hours;
  // Features;
  enableQRCheckin: boolean;
  enableGuestRSVPs: boolean;
  enableFeedbackCollection: boolean;
  enableCrossSpaceCohosting: boolean;
  
  // Limits (per space)
  maxEventsPerDay: number;
  maxEventsPerWeek: number;
  maxCoHostingSpaces: number;}

/**
 * Event System State Management;
 */
export interface EventSystemState {// Current Event Data;
  currentEvent: EventDefinition | null;
  events: EventDefinition[];
  myRSVPs: RSVPResponse[];
  
  // UI State;
  selectedDate: Date;
  viewMode: 'calendar' | 'list' | 'grid';
  filterCategory: EventCategory | 'all';
  
  // Loading States;
  loading: {
    events: boolean;
    rsvp: boolean;
    checkin: boolean;
    feedback: boolean;};
  
  // Error States;
  errors: {
    eventCreation?: string;
    rsvpSubmission?: string;
    checkinError?: string;
    feedbackError?: string;
  };
}

/**
 * Event System Actions;
 */
export interface EventSystemActions {// Event Management;
  createEvent: (event: Omit<EventDefinition, 'id' | 'createdAt' | 'updatedAt'>) => Promise<EventDefinition>;
  updateEvent: (eventId: string, updates: Partial<EventDefinition>) => Promise<EventDefinition>;
  deleteEvent: (eventId: string) => Promise<void>;
  publishEvent: (eventId: string) => Promise<void>;
  cancelEvent: (eventId: string, reason: string) => Promise<void>;
  
  // RSVP Management;
  submitRSVP: (eventId: string, response: Omit<RSVPResponse, 'id' | 'respondedAt'>) => Promise<RSVPResponse>;
  updateRSVP: (rsvpId: string, updates: Partial<RSVPResponse>) => Promise<RSVPResponse>;
  cancelRSVP: (rsvpId: string) => Promise<void>;
  
  // Check-in Management;
  checkInAttendee: (eventId: string, userId: string) => Promise<void>;
  generateCheckInQR: (eventId: string) => Promise<string>;
  scanCheckInQR: (qrCode: string) => Promise<{ eventId: string; success: boolean}>;
  
  // Feedback Management;
  submitFeedback: (eventId: string, feedback: Omit<EventFeedback, 'id' | 'submittedAt'>) => Promise<EventFeedback>;
  getEventAnalytics: (eventId: string) => Promise<EventAnalytics>;
  
  // Calendar Integration;
  exportEventToCalendar: (eventId: string, format: 'ics' | 'google' | 'outlook') => Promise<string>;
  syncWithPersonalCalendar: (events: EventDefinition[]) => Promise<void>;
  detectScheduleConflicts: (newEvent: EventDefinition) => Promise<EventDefinition[]>;
  
  // Discovery & Filtering;
  getEventsForSpace: (spaceId: string, filters?: EventFilters) => Promise<EventDefinition[]>;
  getUpcomingEvents: (limit?: number) => Promise<EventDefinition[]>;
  searchEvents: (query: string, filters?: EventFilters) => Promise<EventDefinition[]>;
  getRecommendedEvents: (userId: string) => Promise<EventDefinition[]>;
}

export interface EventFilters {category?: EventCategory;
  type?: EventType;
  dateRange?: { start: Date; end: Date};
  location?: string;
  spaceIds?: string[];
  requiresRSVP?: boolean;
  hasCapacity?: boolean;
}

/**
 * Event System Hooks for React Components;
 */
export interface EventSystemHooks {useEventSystem: () => EventSystemState & EventSystemActions;
  useEvent: (eventId: string) => { event: EventDefinition | null; loading: boolean; error?: string};
  useEventRSVPs: (eventId: string) => { rsvps: RSVPResponse[]; loading: boolean };
  useMyRSVPs: () => { rsvps: RSVPResponse[]; loading: boolean };
  useEventAnalytics: (eventId: string) => { analytics: EventAnalytics | null; loading: boolean };
  useUpcomingEvents: (limit?: number) => { events: EventDefinition[]; loading: boolean };
  useEventCalendar: (month: Date) => { events: EventDefinition[]; loading: boolean };
}

/**
 * Event System API Endpoints;
 */
export const EVENT_API_ENDPOINTS = {
  // Event CRUD;
  CREATE_EVENT: '/api/events',
  GET_EVENT: '/api/events/[eventId]',
  UPDATE_EVENT: '/api/events/[eventId]',
  DELETE_EVENT: '/api/events/[eventId]',
  
  // Event Actions;
  PUBLISH_EVENT: '/api/events/[eventId]/publish',
  CANCEL_EVENT: '/api/events/[eventId]/cancel',
  
  // RSVP Management;
  SUBMIT_RSVP: '/api/events/[eventId]/rsvp',
  UPDATE_RSVP: '/api/events/[eventId]/rsvp/[rsvpId]',
  GET_EVENT_RSVPS: '/api/events/[eventId]/rsvps',
  
  // Check-in;
  CHECKIN_ATTENDEE: '/api/events/[eventId]/checkin',
  GENERATE_QR: '/api/events/[eventId]/checkin/qr',
  SCAN_QR: '/api/events/checkin/scan',
  
  // Feedback & Analytics;
  SUBMIT_FEEDBACK: '/api/events/[eventId]/feedback',
  GET_ANALYTICS: '/api/events/[eventId]/analytics',
  
  // Discovery;
  GET_SPACE_EVENTS: '/api/spaces/[spaceId]/events',
  GET_UPCOMING_EVENTS: '/api/events/upcoming',
  SEARCH_EVENTS: '/api/events/search',
  GET_RECOMMENDED_EVENTS: '/api/events/recommended',
  
  // Calendar Integration;
  EXPORT_CALENDAR: '/api/events/[eventId]/export',
  SYNC_CALENDAR: '/api/events/calendar/sync',
  CHECK_CONFLICTS: '/api/events/calendar/conflicts',
} as const;

/**
 * Event System Configuration;
 */
export const DEFAULT_EVENT_CONFIG: EventSystemConfig = {
  // Defaults;
  defaultCapacity: 50,
  defaultRSVPDeadline: 2, // 2 hours before;
  maxAdvanceBooking: 90, // 90 days;
  // Validation;
  minEventDuration: 30, // 30 minutes;
  maxEventDuration: 12, // 12 hours;
  minAdvanceNotice: 1, // 1 hour;
  // Features;
  enableQRCheckin: true,
  enableGuestRSVPs: true,
  enableFeedbackCollection: true,
  enableCrossSpaceCohosting: true,
  
  // Limits;
  maxEventsPerDay: 5,
  maxEventsPerWeek: 20,
  maxCoHostingSpaces: 3,
};

/**
 * Event System Validation;
 */
export const validateEventDefinition = (event: Partial<EventDefinition>): string[] => {
  const errors: string[] = [];
  
  if (!event.title?.trim()) {
    errors.push('Event title is required');
  }
  }
  if (!event.startDate) {
    errors.push('Start date is required');
  }
  
  if (!event.endDate) {
    errors.push('End date is required');
  }
  
  if (event.startDate && event.endDate && event.startDate >= event.endDate) {
    errors.push('End date must be after start date');
  }
  
  if (event.capacity && event.capacity < 1) {
    errors.push('Capacity must be at least 1');
  }
  
  if (event.rsvpDeadline && event.startDate && event.rsvpDeadline > event.startDate) {
    errors.push('RSVP deadline must be before event start');
  }
  
  return errors;
};

export const validateRSVPResponse = (rsvp: Partial<RSVPResponse>): string[] => {
  const errors: string[] = [];
  
  if (!rsvp.status) {
    errors.push('RSVP status is required');
  }
  }
  if (rsvp.guestCount && rsvp.guestCount < 0) {
    errors.push('Guest count cannot be negative');
  }
  
  return errors;
};