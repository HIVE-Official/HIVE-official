"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingUtils = exports.activityTracker = void 0;
exports.useActivityTracker = useActivityTracker;
exports.withSpaceTracking = withSpaceTracking;
const jsx_runtime_1 = require("react/jsx-runtime");
// Activity tracking utility for logging user interactions
// This can be imported and used throughout the platform
const react_1 = __importDefault(require("react"));
class ActivityTracker {
    constructor() {
        this.sessionStartTime = null;
        this.currentSpaceId = null;
        this.spaceVisitStart = null;
        this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    }
    static getInstance() {
        if (!ActivityTracker.instance) {
            ActivityTracker.instance = new ActivityTracker();
        }
        return ActivityTracker.instance;
    }
    // Track an activity event
    async trackActivity(options) {
        try {
            const response = await fetch(`${this.baseUrl}/api/activity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options),
            });
            if (!response.ok) {
                console.warn('Failed to track activity:', response.statusText);
            }
        }
        catch (error) {
            console.warn('Error tracking activity:', error);
        }
    }
    // Session tracking
    startSession(userId) {
        this.sessionStartTime = Date.now();
        this.trackActivity({
            userId,
            type: 'session_start'
        });
    }
    endSession(userId) {
        if (this.sessionStartTime) {
            const duration = Math.round((Date.now() - this.sessionStartTime) / 1000);
            this.trackActivity({
                userId,
                type: 'session_end',
                duration
            });
        }
        this.sessionStartTime = null;
    }
    // Space tracking
    enterSpace(userId, spaceId) {
        // End previous space visit if exists
        if (this.currentSpaceId && this.spaceVisitStart) {
            this.exitSpace(userId);
        }
        this.currentSpaceId = spaceId;
        this.spaceVisitStart = Date.now();
        this.trackActivity({
            userId,
            type: 'space_visit',
            spaceId,
            metadata: { action: 'enter' }
        });
    }
    exitSpace(userId) {
        if (this.currentSpaceId && this.spaceVisitStart) {
            const duration = Math.round((Date.now() - this.spaceVisitStart) / 1000);
            this.trackActivity({
                userId,
                type: 'space_visit',
                spaceId: this.currentSpaceId,
                duration,
                metadata: { action: 'exit' }
            });
        }
        this.currentSpaceId = null;
        this.spaceVisitStart = null;
    }
    // Tool interaction tracking
    trackToolInteraction(userId, toolId, spaceId, metadata) {
        this.trackActivity({
            userId,
            type: 'tool_interaction',
            toolId,
            spaceId,
            metadata
        });
    }
    // Content creation tracking
    trackContentCreation(userId, contentId, spaceId, metadata) {
        this.trackActivity({
            userId,
            type: 'content_creation',
            contentId,
            spaceId,
            metadata
        });
    }
    // Social interaction tracking
    trackSocialInteraction(userId, spaceId, metadata) {
        this.trackActivity({
            userId,
            type: 'social_interaction',
            spaceId,
            metadata
        });
    }
    // Batch tracking for multiple events
    async trackBatch(events) {
        try {
            const response = await fetch(`${this.baseUrl}/api/activity/batch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events }),
            });
            if (!response.ok) {
                console.warn('Failed to track batch activities:', response.statusText);
            }
        }
        catch (error) {
            console.warn('Error tracking batch activities:', error);
        }
    }
}
// Export singleton instance
exports.activityTracker = ActivityTracker.getInstance();
// React hooks for easy integration
function useActivityTracker() {
    return exports.activityTracker;
}
// Higher-order component for automatic space tracking
function withSpaceTracking(Component) {
    return function TrackedComponent(props) {
        const tracker = useActivityTracker();
        react_1.default.useEffect(() => {
            // This would need to be implemented with auth context
            // const { user } = useAuth();
            // if (user && props.spaceId) {
            //   tracker.enterSpace(user.uid, props.spaceId);
            //   return () => tracker.exitSpace(user.uid);
            // }
        }, [props.spaceId, tracker]);
        return (0, jsx_runtime_1.jsx)(Component, { ...props });
    };
}
// Utility functions for common tracking scenarios
exports.trackingUtils = {
    // Track page views
    trackPageView: (userId, page, metadata) => {
        exports.activityTracker.trackActivity({
            userId,
            type: 'social_interaction',
            metadata: { action: 'page_view', page, ...metadata }
        });
    },
    // Track button clicks
    trackButtonClick: (userId, buttonId, spaceId, metadata) => {
        exports.activityTracker.trackActivity({
            userId,
            type: 'social_interaction',
            spaceId,
            metadata: { action: 'button_click', buttonId, ...metadata }
        });
    },
    // Track form submissions
    trackFormSubmission: (userId, formType, spaceId, metadata) => {
        exports.activityTracker.trackActivity({
            userId,
            type: 'content_creation',
            spaceId,
            metadata: { action: 'form_submission', formType, ...metadata }
        });
    },
    // Track search queries
    trackSearch: (userId, query, results, metadata) => {
        exports.activityTracker.trackActivity({
            userId,
            type: 'social_interaction',
            metadata: { action: 'search', query, results, ...metadata }
        });
    }
};
exports.default = ActivityTracker;
//# sourceMappingURL=activity-tracker.js.map