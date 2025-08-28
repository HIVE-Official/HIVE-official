export interface BaseAnalyticsEvent {
    type: string;
    timestamp: string;
    userId?: string;
    sessionId: string;
    metadata?: Record<string, unknown>;
}
export interface LogMetadata {
    component?: string;
    action?: string;
    duration?: number;
    error?: Error;
    requestId?: string;
    userId?: string;
    sessionId?: string;
    timestamp?: string;
    stack?: string;
    componentStack?: string;
    [key: string]: unknown;
}
export interface LogEvent extends BaseAnalyticsEvent {
    level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'API' | 'STATE' | 'VALID';
    message: string;
    metadata?: LogMetadata;
    error?: Error;
}
export interface AuthEvent extends BaseAnalyticsEvent {
    type: 'email_entered' | 'magic_link_sent' | 'magic_link_clicked' | 'auth_success' | 'auth_error';
    email?: string;
    schoolDomain?: string;
    error?: string;
    userAgent: string;
}
export interface OnboardingEvent extends BaseAnalyticsEvent {
    type: 'step_started' | 'step_completed' | 'step_skipped' | 'step_error' | 'flow_completed' | 'flow_abandoned';
    step: 1 | 2 | 3 | 4 | 'complete';
    stepName: 'display_name_avatar' | 'academic' | 'interests' | 'complete';
    data?: Record<string, unknown>;
    timeSpentSeconds?: number;
    error?: string;
}
export interface UserEngagementEvent extends BaseAnalyticsEvent {
    type: 'page_view' | 'button_click' | 'form_submit' | 'search' | 'share' | 'error_encountered';
    page?: string;
    component?: string;
    action?: string;
    data?: Record<string, unknown>;
}
export interface SystemMetric extends BaseAnalyticsEvent {
    type: 'performance' | 'error' | 'usage';
    metric: string;
    value: number;
    metadata?: Record<string, unknown>;
}
export interface DailyAnalytics {
    date: string;
    authFunnel: {
        emailsEntered: number;
        magicLinksSent: number;
        magicLinksClicked: number;
        authSuccesses: number;
        authErrors: number;
        conversionRate: number;
    };
    onboardingFunnel: {
        step1Started: number;
        step1Completed: number;
        step2Started: number;
        step2Completed: number;
        step3Started: number;
        step3Completed: number;
        step4Started: number;
        step4Completed: number;
        flowCompleted: number;
        flowAbandoned: number;
        completionRate: number;
        avgTimeToComplete: number;
    };
    userActivity: {
        newUsers: number;
        activeUsers: number;
        returningUsers: number;
        totalPageViews: number;
        avgSessionDuration: number;
    };
    technical: {
        errorRate: number;
        avgLoadTime: number;
        mobileUsage: number;
        desktopUsage: number;
        topErrors: Array<{
            error: string;
            count: number;
        }>;
    };
    engagement: {
        postsCreated: number;
        spacesJoined: number;
        searchQueries: number;
        sharesGenerated: number;
    };
    lastUpdated: number;
}
export interface AnalyticsConfig {
    apiKey?: string;
    userId?: string;
    sessionId: string;
    environment: 'development' | 'production';
    enabledFeatures: {
        userTracking: boolean;
        performanceTracking: boolean;
        errorTracking: boolean;
        engagementTracking: boolean;
    };
}
export interface AnalyticsError {
    message: string;
    stack?: string;
    component?: string;
    userId?: string;
    sessionId: string;
    timestamp: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
}
export type AnalyticsEvent = LogEvent | AuthEvent | OnboardingEvent | UserEngagementEvent | SystemMetric;
export interface AnalyticsProvider {
    trackEvent: (event: AnalyticsEvent) => void;
    trackError: (error: Error, metadata?: LogMetadata) => void;
}
//# sourceMappingURL=analytics-types.d.ts.map