/**
 * HIVE Event Management System - vBETA Core
 *
 * Single focused system: Complete event lifecycle coordination
 * Replaces: GroupMe chaos + Google Forms + email chains
 */
/**
 * Event System API Endpoints
 */
export const EVENT_API_ENDPOINTS = {
    // Event CRUD
    CREATE_EVENT: '/api/events',
    GET_EVENT: '/api/events/[eventId]',
    UPDATE_EVENT: '/api/events/[eventId]',
    DELETE_EVENT: '/api/events/[eventId]',
    // Event Actions
    PUBLISH_EVENT: '/api/events/[eventId]/publish',
    CANCEL_EVENT: '/api/events/[eventId]/cancel',
    // RSVP Management
    SUBMIT_RSVP: '/api/events/[eventId]/rsvp',
    UPDATE_RSVP: '/api/events/[eventId]/rsvp/[rsvpId]',
    GET_EVENT_RSVPS: '/api/events/[eventId]/rsvps',
    // Check-in
    CHECKIN_ATTENDEE: '/api/events/[eventId]/checkin',
    GENERATE_QR: '/api/events/[eventId]/checkin/qr',
    SCAN_QR: '/api/events/checkin/scan',
    // Feedback & Analytics
    SUBMIT_FEEDBACK: '/api/events/[eventId]/feedback',
    GET_ANALYTICS: '/api/events/[eventId]/analytics',
    // Discovery
    GET_SPACE_EVENTS: '/api/spaces/[spaceId]/events',
    GET_UPCOMING_EVENTS: '/api/events/upcoming',
    SEARCH_EVENTS: '/api/events/search',
    GET_RECOMMENDED_EVENTS: '/api/events/recommended',
    // Calendar Integration
    EXPORT_CALENDAR: '/api/events/[eventId]/export',
    SYNC_CALENDAR: '/api/events/calendar/sync',
    CHECK_CONFLICTS: '/api/events/calendar/conflicts',
};
/**
 * Event System Configuration
 */
export const DEFAULT_EVENT_CONFIG = {
    // Defaults
    defaultCapacity: 50,
    defaultRSVPDeadline: 2, // 2 hours before
    maxAdvanceBooking: 90, // 90 days
    // Validation
    minEventDuration: 30, // 30 minutes
    maxEventDuration: 12, // 12 hours
    minAdvanceNotice: 1, // 1 hour
    // Features
    enableQRCheckin: true,
    enableGuestRSVPs: true,
    enableFeedbackCollection: true,
    enableCrossSpaceCohosting: true,
    // Limits
    maxEventsPerDay: 5,
    maxEventsPerWeek: 20,
    maxCoHostingSpaces: 3,
};
/**
 * Event System Validation
 */
export const validateEventDefinition = (event) => {
    const errors = [];
    if (!event.title?.trim()) {
        errors.push('Event title is required');
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
export const validateRSVPResponse = (rsvp) => {
    const errors = [];
    if (!rsvp.status) {
        errors.push('RSVP status is required');
    }
    if (rsvp.guestCount && rsvp.guestCount < 0) {
        errors.push('Guest count cannot be negative');
    }
    return errors;
};
//# sourceMappingURL=event-system-core.js.map