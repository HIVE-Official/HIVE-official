import type { 
  AuthEvent, 
  OnboardingEvent, 
  UserEngagementEvent, 
  SystemMetric,
  AnalyticsConfig,
  AnalyticsError 
} from './analytics-types'

class AnalyticsClient {
  private config: AnalyticsConfig
  private eventQueue: Array<AuthEvent | OnboardingEvent | UserEngagementEvent | SystemMetric> = []
  private isInitialized = false

  constructor() {
    this.config = {
      sessionId: this.generateSessionId(),
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
      enabledFeatures: {
        userTracking: true,
        performanceTracking: true,
        errorTracking: true,
        engagementTracking: true
      }
    }
  }

  /**
   * Initialize analytics with user context
   */
  init(config: Partial<AnalyticsConfig> = {}) {
    this.config = { ...this.config, ...config }
    this.isInitialized = true
    
    // Process any queued events
    this.flushEventQueue()
    
    // Set up automatic error tracking
    if (this.config.enabledFeatures.errorTracking) {
      this.setupErrorTracking()
    }
    
    // Set up performance tracking
    if (this.config.enabledFeatures.performanceTracking) {
      this.setupPerformanceTracking()
    }
  }

  /**
   * Track authentication events
   */
  trackAuth(event: Omit<AuthEvent, 'timestamp' | 'sessionId' | 'userAgent'>) {
    const authEvent: AuthEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.config.sessionId,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server'
    }

    this.sendEvent(authEvent)
  }

  /**
   * Track onboarding flow events
   */
  trackOnboarding(event: Omit<OnboardingEvent, 'timestamp' | 'sessionId'>) {
    const onboardingEvent: OnboardingEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.config.sessionId,
      userId: this.config.userId
    }

    this.sendEvent(onboardingEvent)
  }

  /**
   * Track user engagement events
   */
  trackEngagement(event: Omit<UserEngagementEvent, 'timestamp' | 'sessionId'>) {
    const engagementEvent: UserEngagementEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.config.sessionId,
      userId: this.config.userId
    }

    this.sendEvent(engagementEvent)
  }

  /**
   * Track system metrics
   */
  trackMetric(metric: Omit<SystemMetric, 'timestamp'>) {
    const systemMetric: SystemMetric = {
      ...metric,
      timestamp: Date.now()
    }

    this.sendEvent(systemMetric)
  }

  /**
   * Track errors
   */
  trackError(error: Omit<AnalyticsError, 'timestamp' | 'sessionId'>) {
    const errorEvent: AnalyticsError = {
      ...error,
      timestamp: Date.now(),
      sessionId: this.config.sessionId,
      userId: this.config.userId
    }

    // Send immediately for errors
    this.sendEventToAPI('error', errorEvent)
  }

  /**
   * Set user ID after authentication
   */
  setUserId(userId: string) {
    this.config.userId = userId
  }

  /**
   * Update analytics configuration
   */
  updateConfig(config: Partial<AnalyticsConfig>) {
    this.config = { ...this.config, ...config }
  }

  /**
   * Helper: Track page view
   */
  trackPageView(page: string, metadata?: Record<string, unknown>) {
    this.trackEngagement({
      type: 'page_view',
      page,
      data: metadata
    })
  }

  /**
   * Helper: Track button click
   */
  trackClick(component: string, action: string, metadata?: Record<string, unknown>) {
    this.trackEngagement({
      type: 'button_click',
      component,
      action,
      data: metadata
    })
  }

  /**
   * Helper: Track form submission
   */
  trackFormSubmit(component: string, data?: Record<string, unknown>) {
    this.trackEngagement({
      type: 'form_submit',
      component,
      data
    })
  }

  // Private methods

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15)
  }

  private sendEvent(event: AuthEvent | OnboardingEvent | UserEngagementEvent | SystemMetric) {
    if (!this.isInitialized) {
      this.eventQueue.push(event)
      return
    }

    // In development, just log to console
    if (this.config.environment === 'development') {
      console.log('📊 Analytics Event:', event)
      return
    }

    // In production, send to API
    this.sendEventToAPI('events', event)
  }

  private async sendEventToAPI(endpoint: string, event: unknown) {
    try {
      await fetch(`/api/analytics/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
    } catch (error) {
      console.error('Failed to send analytics event:', error)
    }
  }

  private flushEventQueue() {
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift()
      if (event) {
        this.sendEvent(event)
      }
    }
  }

  private setupErrorTracking() {
    if (typeof window === 'undefined') return

    // Global error handler
    window.addEventListener('error', (event) => {
      this.trackError({
        message: event.message,
        stack: event.error?.stack,
        component: 'global',
        severity: 'medium'
      })
    })

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        component: 'promise',
        severity: 'high'
      })
    })
  }

  private setupPerformanceTracking() {
    if (typeof window === 'undefined') return

    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
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
          })
        }
      }, 0)
    })
  }
}

// Export singleton instance
export const analytics = new AnalyticsClient()

// Export class for testing
export { AnalyticsClient } 