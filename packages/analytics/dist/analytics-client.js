class AnalyticsClient {
    constructor() {
        this.eventQueue = [];
        this.isInitialized = false;
        this.config = {
            sessionId: this.generateSessionId(),
            environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
            enabledFeatures: {
                userTracking: true,
                performanceTracking: true,
                errorTracking: true,
                engagementTracking: true
            }
        };
    }
    /**
     * Initialize analytics with user context
     */
    init(config = {}) {
        this.config = { ...this.config, ...config };
        this.isInitialized = true;
        // Process any queued events
        this.flushEventQueue();
        // Set up automatic error tracking
        if (this.config.enabledFeatures.errorTracking) {
            this.setupErrorTracking();
        }
        // Set up performance tracking
        if (this.config.enabledFeatures.performanceTracking) {
            this.setupPerformanceTracking();
        }
    }
    /**
     * Track authentication events
     */
    trackAuth(event) {
        const authEvent = {
            ...event,
            timestamp: new Date().toISOString(),
            sessionId: this.config.sessionId,
            userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server'
        };
        this.sendEvent(authEvent);
    }
    /**
     * Track onboarding flow events
     */
    trackOnboarding(event) {
        const onboardingEvent = {
            ...event,
            timestamp: new Date().toISOString(),
            sessionId: this.config.sessionId,
            userId: this.config.userId
        };
        this.sendEvent(onboardingEvent);
    }
    /**
     * Track user engagement events
     */
    trackEngagement(event) {
        const engagementEvent = {
            ...event,
            timestamp: new Date().toISOString(),
            sessionId: this.config.sessionId,
            userId: this.config.userId
        };
        this.sendEvent(engagementEvent);
    }
    /**
     * Track system metrics
     */
    trackMetric(metric) {
        const systemMetric = {
            ...metric,
            timestamp: new Date().toISOString(),
            sessionId: this.config.sessionId,
            userId: this.config.userId
        };
        this.sendEvent(systemMetric);
    }
    /**
     * Track errors with metadata
     */
    trackError(error, metadata) {
        const systemMetric = {
            type: 'error',
            metric: error.name,
            value: 1,
            metadata: {
                ...metadata,
                message: error.message,
                stack: error.stack,
            },
            timestamp: new Date().toISOString(),
            sessionId: this.config.sessionId,
            userId: this.config.userId,
        };
        // Send immediately for errors
        this.sendEventToAPI('error', systemMetric);
    }
    /**
     * Set user ID after authentication
     */
    setUserId(userId) {
        this.config.userId = userId;
    }
    /**
     * Update analytics configuration
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    /**
     * Helper: Track page view
     */
    trackPageView(page, metadata) {
        this.trackEngagement({
            type: 'page_view',
            page,
            data: metadata
        });
    }
    /**
     * Helper: Track button click
     */
    trackClick(component, action, metadata) {
        this.trackEngagement({
            type: 'button_click',
            component,
            action,
            data: metadata
        });
    }
    /**
     * Helper: Track form submission
     */
    trackFormSubmit(component, data) {
        this.trackEngagement({
            type: 'form_submit',
            component,
            data
        });
    }
    /**
     * Track generic analytics events (used by logger)
     */
    trackEvent(event) {
        const enrichedEvent = {
            ...event,
            timestamp: event.timestamp ?? new Date().toISOString(),
            sessionId: event.sessionId ?? this.config.sessionId,
            userId: event.userId ?? this.config.userId
        };
        this.sendEvent(enrichedEvent);
    }
    // Private methods
    generateSessionId() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }
    sendEvent(event) {
        if (!this.isInitialized) {
            this.eventQueue.push(event);
            return;
        }
        // In development, just log to console
        if (this.config.environment === 'development') {
            console.warn('📊 Analytics Event:', event);
            return;
        }
        // In production, send to API
        this.sendEventToAPI('events', event);
    }
    async sendEventToAPI(endpoint, event) {
        try {
            await fetch(`/api/analytics/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });
        }
        catch (error) {
            console.error('Failed to send analytics event:', error);
        }
    }
    flushEventQueue() {
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift();
            if (event) {
                this.sendEvent(event);
            }
        }
    }
    setupErrorTracking() {
        if (typeof window !== 'undefined') {
            // Global error handler
            window.onerror = (message, source, lineno, colno, error) => {
                const metadata = {
                    source,
                    lineno,
                    colno,
                    component: 'global'
                };
                this.trackError(error || new Error(String(message)), metadata);
            };
            // Unhandled promise rejection handler
            window.onunhandledrejection = (event) => {
                const metadata = {
                    component: 'promise',
                    reason: event.reason
                };
                this.trackError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)), metadata);
            };
        }
    }
    setupPerformanceTracking() {
        if (typeof window === 'undefined')
            return;
        // Track page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.trackMetric({
                        type: 'performance',
                        metric: 'page_load_time',
                        value: perfData.loadEventEnd - perfData.fetchStart,
                        metadata: {
                            page: window.location.pathname,
                            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
                            firstPaint: perfData.loadEventStart - perfData.fetchStart
                        }
                    });
                }
            }, 0);
        });
    }
}
// Export singleton instance
export const analytics = new AnalyticsClient();
// Export class for testing
export { AnalyticsClient };
//# sourceMappingURL=analytics-client.js.map