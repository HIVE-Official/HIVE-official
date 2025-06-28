export interface AuthEvent {
  type: 'email_entered' | 'magic_link_sent' | 'magic_link_clicked' | 'auth_success' | 'auth_error'
  email?: string
  schoolDomain?: string
  error?: string
  timestamp: number
  sessionId: string
  userAgent: string
}

export interface OnboardingEvent {
  type: 'step_started' | 'step_completed' | 'step_skipped' | 'step_error' | 'flow_completed' | 'flow_abandoned'
  step: 1 | 2 | 3 | 4 | 'complete'
  stepName: 'display_name_avatar' | 'academic' | 'interests' | 'complete'
  data?: Record<string, unknown>
  timeSpentSeconds?: number
  error?: string
  timestamp: number
  userId?: string
  sessionId: string
}

export interface UserEngagementEvent {
  type: 'page_view' | 'button_click' | 'form_submit' | 'search' | 'share' | 'error_encountered'
  page?: string
  component?: string
  action?: string
  data?: Record<string, unknown>
  timestamp: number
  userId?: string
  sessionId: string
}

export interface SystemMetric {
  type: 'performance' | 'error' | 'usage'
  metric: string
  value: number
  metadata?: Record<string, unknown>
  timestamp: number
}

export interface DailyAnalytics {
  date: string // YYYY-MM-DD format
  
  // Authentication Funnel
  authFunnel: {
    emailsEntered: number
    magicLinksSent: number
    magicLinksClicked: number
    authSuccesses: number
    authErrors: number
    conversionRate: number // authSuccesses / emailsEntered
  }
  
  // Onboarding Funnel  
  onboardingFunnel: {
    step1Started: number
    step1Completed: number
    step2Started: number
    step2Completed: number
    step3Started: number
    step3Completed: number
    step4Started: number
    step4Completed: number
    flowCompleted: number
    flowAbandoned: number
    completionRate: number // flowCompleted / step1Started
    avgTimeToComplete: number // in seconds
  }
  
  // User Activity
  userActivity: {
    newUsers: number
    activeUsers: number
    returningUsers: number
    totalPageViews: number
    avgSessionDuration: number
  }
  
  // Technical Metrics
  technical: {
    errorRate: number
    avgLoadTime: number
    mobileUsage: number
    desktopUsage: number
    topErrors: Array<{ error: string; count: number }>
  }
  
  // Content & Engagement
  engagement: {
    postsCreated: number
    spacesJoined: number
    searchQueries: number
    sharesGenerated: number
  }
  
  lastUpdated: number
}

export interface AnalyticsConfig {
  apiKey?: string
  userId?: string
  sessionId: string
  environment: 'development' | 'production'
  enabledFeatures: {
    userTracking: boolean
    performanceTracking: boolean
    errorTracking: boolean
    engagementTracking: boolean
  }
}

export interface AnalyticsError {
  message: string
  stack?: string
  component?: string
  userId?: string
  sessionId: string
  timestamp: number
  severity: 'low' | 'medium' | 'high' | 'critical'
} 