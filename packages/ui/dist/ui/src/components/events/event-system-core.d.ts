/**
 * HIVE Event Management System - vBETA Core
 *
 * Single focused system: Complete event lifecycle coordination
 * Replaces: GroupMe chaos + Google Forms + email chains
 */
export interface EventDefinition {
    id: string;
    spaceId: string;
    createdBy: string;
    title: string;
    description: string;
    category: EventCategory;
    type: EventType;
    startDate: Date;
    endDate: Date;
    timezone: string;
    isAllDay: boolean;
    location: EventLocation;
    capacity?: number;
    requiresRSVP: boolean;
    rsvpDeadline?: Date;
    allowGuests: boolean;
    guestLimit?: number;
    visibility: 'public' | 'private' | 'space_only';
    coHostingSpaces: string[];
    status: 'draft' | 'published' | 'cancelled' | 'completed';
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}
export interface EventLocation {
    type: 'on_campus' | 'off_campus' | 'virtual' | 'hybrid';
    venue?: string;
    address?: string;
    room?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    virtualLink?: string;
    instructions?: string;
}
export type EventCategory = 'academic' | 'social' | 'professional' | 'wellness' | 'cultural' | 'service' | 'sports' | 'other';
export type EventType = 'meeting' | 'workshop' | 'party' | 'study_session' | 'presentation' | 'competition' | 'fundraiser' | 'volunteer';
export interface RSVPResponse {
    id: string;
    eventId: string;
    userId: string;
    spaceId: string;
    status: 'yes' | 'no' | 'maybe';
    guestCount: number;
    guestNames?: string[];
    dietaryRestrictions?: string;
    accessibilityNeeds?: string;
    comments?: string;
    respondedAt: Date;
    checkedIn: boolean;
    checkedInAt?: Date;
    noShow: boolean;
}
export interface EventAnalytics {
    eventId: string;
    totalRSVPs: number;
    yesResponses: number;
    noResponses: number;
    maybeResponses: number;
    actualAttendance: number;
    noShowRate: number;
    viewCount: number;
    shareCount: number;
    commentCount: number;
    averageRating?: number;
    satisfactionScore?: number;
    improvementSuggestions: string[];
    wouldAttendAgain: number;
    generatedAt: Date;
}
export interface EventFeedback {
    id: string;
    eventId: string;
    userId: string;
    overallRating: number;
    organizationRating: number;
    contentRating: number;
    venueRating: number;
    comments?: string;
    improvements?: string;
    wouldRecommend: boolean;
    wouldAttendAgain: boolean;
    submittedAt: Date;
    isAnonymous: boolean;
}
export interface EventSystemConfig {
    defaultCapacity: number;
    defaultRSVPDeadline: number;
    maxAdvanceBooking: number;
    minEventDuration: number;
    maxEventDuration: number;
    minAdvanceNotice: number;
    enableQRCheckin: boolean;
    enableGuestRSVPs: boolean;
    enableFeedbackCollection: boolean;
    enableCrossSpaceCohosting: boolean;
    maxEventsPerDay: number;
    maxEventsPerWeek: number;
    maxCoHostingSpaces: number;
}
/**
 * Event System State Management
 */
export interface EventSystemState {
    currentEvent: EventDefinition | null;
    events: EventDefinition[];
    myRSVPs: RSVPResponse[];
    selectedDate: Date;
    viewMode: 'calendar' | 'list' | 'grid';
    filterCategory: EventCategory | 'all';
    loading: {
        events: boolean;
        rsvp: boolean;
        checkin: boolean;
        feedback: boolean;
    };
    errors: {
        eventCreation?: string;
        rsvpSubmission?: string;
        checkinError?: string;
        feedbackError?: string;
    };
}
/**
 * Event System Actions
 */
export interface EventSystemActions {
    createEvent: (event: Omit<EventDefinition, 'id' | 'createdAt' | 'updatedAt'>) => Promise<EventDefinition>;
    updateEvent: (eventId: string, updates: Partial<EventDefinition>) => Promise<EventDefinition>;
    deleteEvent: (eventId: string) => Promise<void>;
    publishEvent: (eventId: string) => Promise<void>;
    cancelEvent: (eventId: string, reason: string) => Promise<void>;
    submitRSVP: (eventId: string, response: Omit<RSVPResponse, 'id' | 'respondedAt'>) => Promise<RSVPResponse>;
    updateRSVP: (rsvpId: string, updates: Partial<RSVPResponse>) => Promise<RSVPResponse>;
    cancelRSVP: (rsvpId: string) => Promise<void>;
    checkInAttendee: (eventId: string, userId: string) => Promise<void>;
    generateCheckInQR: (eventId: string) => Promise<string>;
    scanCheckInQR: (qrCode: string) => Promise<{
        eventId: string;
        success: boolean;
    }>;
    submitFeedback: (eventId: string, feedback: Omit<EventFeedback, 'id' | 'submittedAt'>) => Promise<EventFeedback>;
    getEventAnalytics: (eventId: string) => Promise<EventAnalytics>;
    exportEventToCalendar: (eventId: string, format: 'ics' | 'google' | 'outlook') => Promise<string>;
    syncWithPersonalCalendar: (events: EventDefinition[]) => Promise<void>;
    detectScheduleConflicts: (newEvent: EventDefinition) => Promise<EventDefinition[]>;
    getEventsForSpace: (spaceId: string, filters?: EventFilters) => Promise<EventDefinition[]>;
    getUpcomingEvents: (limit?: number) => Promise<EventDefinition[]>;
    searchEvents: (query: string, filters?: EventFilters) => Promise<EventDefinition[]>;
    getRecommendedEvents: (userId: string) => Promise<EventDefinition[]>;
}
export interface EventFilters {
    category?: EventCategory;
    type?: EventType;
    dateRange?: {
        start: Date;
        end: Date;
    };
    location?: string;
    spaceIds?: string[];
    requiresRSVP?: boolean;
    hasCapacity?: boolean;
}
/**
 * Event System Hooks for React Components
 */
export interface EventSystemHooks {
    useEventSystem: () => EventSystemState & EventSystemActions;
    useEvent: (eventId: string) => {
        event: EventDefinition | null;
        loading: boolean;
        error?: string;
    };
    useEventRSVPs: (eventId: string) => {
        rsvps: RSVPResponse[];
        loading: boolean;
    };
    useMyRSVPs: () => {
        rsvps: RSVPResponse[];
        loading: boolean;
    };
    useEventAnalytics: (eventId: string) => {
        analytics: EventAnalytics | null;
        loading: boolean;
    };
    useUpcomingEvents: (limit?: number) => {
        events: EventDefinition[];
        loading: boolean;
    };
    useEventCalendar: (month: Date) => {
        events: EventDefinition[];
        loading: boolean;
    };
}
/**
 * Event System API Endpoints
 */
export declare const EVENT_API_ENDPOINTS: {
    readonly CREATE_EVENT: "/api/events";
    readonly GET_EVENT: "/api/events/[eventId]";
    readonly UPDATE_EVENT: "/api/events/[eventId]";
    readonly DELETE_EVENT: "/api/events/[eventId]";
    readonly PUBLISH_EVENT: "/api/events/[eventId]/publish";
    readonly CANCEL_EVENT: "/api/events/[eventId]/cancel";
    readonly SUBMIT_RSVP: "/api/events/[eventId]/rsvp";
    readonly UPDATE_RSVP: "/api/events/[eventId]/rsvp/[rsvpId]";
    readonly GET_EVENT_RSVPS: "/api/events/[eventId]/rsvps";
    readonly CHECKIN_ATTENDEE: "/api/events/[eventId]/checkin";
    readonly GENERATE_QR: "/api/events/[eventId]/checkin/qr";
    readonly SCAN_QR: "/api/events/checkin/scan";
    readonly SUBMIT_FEEDBACK: "/api/events/[eventId]/feedback";
    readonly GET_ANALYTICS: "/api/events/[eventId]/analytics";
    readonly GET_SPACE_EVENTS: "/api/spaces/[spaceId]/events";
    readonly GET_UPCOMING_EVENTS: "/api/events/upcoming";
    readonly SEARCH_EVENTS: "/api/events/search";
    readonly GET_RECOMMENDED_EVENTS: "/api/events/recommended";
    readonly EXPORT_CALENDAR: "/api/events/[eventId]/export";
    readonly SYNC_CALENDAR: "/api/events/calendar/sync";
    readonly CHECK_CONFLICTS: "/api/events/calendar/conflicts";
};
/**
 * Event System Configuration
 */
export declare const DEFAULT_EVENT_CONFIG: EventSystemConfig;
/**
 * Event System Validation
 */
export declare const validateEventDefinition: (event: Partial<EventDefinition>) => string[];
export declare const validateRSVPResponse: (rsvp: Partial<RSVPResponse>) => string[];
//# sourceMappingURL=event-system-core.d.ts.map