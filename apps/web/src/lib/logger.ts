/**
 * Centralized logging system for HIVE application
 * Replaces console.log statements with proper structured logging
 */

import { config } from './config';
import type { HiveUser, Space, Post, HiveEvent, Notification, AppError } from '@/types/global';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  // Core identifiers
  userId?: string;
  spaceId?: string;
  toolId?: string;

  // Component and action tracking
  component?: string;
  action?: string;
  endpoint?: string;
  type?: string;
  sort?: string;
  fields?: string[];
  updates?: Record<string, unknown>;
  id?: string;

  // Error handling
  error?: Error | AppError | string;
  stack?: string;

  // Request tracking
  requestId?: string;
  requestData?: Record<string, unknown>;

  // User-related data
  adminUserId?: string;
  memberUserId?: string;
  moderatorId?: string;
  userData?: Partial<HiveUser>;
  usersData?: Array<Partial<HiveUser>>;

  // Space-related data
  spacesData?: Array<Partial<Space>>;
  membershipData?: {
    userId: string;
    spaceId: string;
    role?: string;
    joinedAt?: Date;
  };

  // Content-related data
  feedData?: Array<Partial<Post>>;
  eventData?: Partial<HiveEvent>;
  notificationData?: Partial<Notification>;

  // Analytics and monitoring
  analyticsData?: {
    eventName: string;
    properties?: Record<string, unknown>;
  };
  builderRequestId?: string;

  // Audit and security
  auditData?: {
    action: string;
    timestamp: Date;
    changes?: Record<string, unknown>;
  };
  permissionData?: {
    resource: string;
    action: string;
    granted: boolean;
  };
  authToken?: string;
  authData?: {
    method: string;
    success: boolean;
    userId?: string;
  };

  // Session management
  sessionData?: {
    sessionId: string;
    startTime: Date;
    duration?: number;
  };

  // Data changes
  oldData?: Record<string, unknown>;
  newData?: Record<string, unknown>;

  // Calendar and scheduling
  calendarData?: {
    date: Date;
    events?: Array<Partial<HiveEvent>>;
  };
  conflictData?: {
    type: string;
    resources: string[];
    resolution?: string;
  };

  // File operations
  fileData?: {
    filename: string;
    size?: number;
    mimeType?: string;
    operation: 'upload' | 'download' | 'delete';
  };

  // Bulk operations
  bulkData?: {
    operation: string;
    count: number;
    items?: unknown[];
  };

  // Cohort management
  cohortData?: {
    cohortId: string;
    size?: number;
    criteria?: Record<string, unknown>;
  };

  // Debug information
  debugData?: Record<string, unknown>;

  // Generic metadata
  metadata?: Record<string, unknown>;

  // Generic data field for backward compatibility
  data?: Record<string, unknown>;

  // Privacy and security
  privacyData?: {
    level: 'public' | 'private' | 'members';
    settings?: Record<string, boolean>;
  };

  // Content identifiers
  postId?: string;
  spaceCampusId?: string;
  currentCampusId?: string;
  cursor?: string;
  filterType?: string;
  operation?: string;

  // Statistics
  entriesRemoved?: number;
  totalEntries?: number;
  totalSpaces?: number;
  membershipCount?: number;
  friendCount?: number;
  detectCount?: number;
  postsChecked?: number;
  postsPromoted?: number;
  fieldsUpdated?: number;

  // Domain and network
  blocked_domain?: string;

  // Names and identifiers
  name?: string;
  ritualName?: string;
  ritualId?: string;
  participationId?: string;
  timestamp?: string;
  searchTerm?: string;
  errorId?: string;
  normalizedHandle?: string;
  reportId?: string;
  ruleId?: string;
  workflowId?: string;
  workflowName?: string;
  reporterId?: string;
  search?: string;
  previousRole?: string;
  eventId?: string;
  conflictId?: string;
  deploymentId?: string;
  feedPostId?: string;
  memberId?: string;
  sseError?: string;

  // Feature flags
  ghostMode?: boolean;

  // Specific data types
  profileData?: Partial<HiveUser>;
  activityData?: {
    type: string;
    timestamp: Date;
    details?: Record<string, unknown>;
  };
  completionData?: {
    percentage: number;
    completedSteps: string[];
    remainingSteps: string[];
  };
  avatarData?: {
    url: string;
    size?: number;
    format?: string;
  };
  spaceData?: Partial<Space>;
  memberData?: {
    userId: string;
    role: string;
    joinedAt: Date;
  };
  postData?: Partial<Post>;
  widgetData?: {
    type: string;
    config?: Record<string, unknown>;
    position?: { x: number; y: number };
  };
  coordinationType?: string;
  activationData?: {
    activatedAt: Date;
    method: string;
  };
  joinData?: {
    spaceId: string;
    userId: string;
    timestamp: Date;
  };
  leaveData?: {
    spaceId: string;
    userId: string;
    timestamp: Date;
    reason?: string;
  };
  migrationData?: {
    fromVersion: string;
    toVersion: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    migratedCount?: number;
  };
  range?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  seedData?: {
    source: string;
    count: number;
    timestamp: Date;
  };
  socialProofData?: {
    type: 'likes' | 'views' | 'shares' | 'comments';
    count: number;
    users?: string[];
  };
  reason?: string;
  updatedFields?: string[];
  deletedAt?: string;
  testData?: {
    testName: string;
    status: 'pass' | 'fail' | 'skip';
    duration?: number;
  };
  updateData?: Record<string, unknown>;
  deploymentData?: {
    version: string;
    environment: string;
    timestamp: Date;
  };
  reviewData?: {
    reviewerId: string;
    status: 'approved' | 'rejected' | 'pending';
    comments?: string;
  };
  stateData?: Record<string, unknown>;
  executeData?: {
    command: string;
    result?: unknown;
    duration?: number;
  };
  integrationData?: {
    service: string;
    status: 'connected' | 'disconnected' | 'error';
    config?: Record<string, unknown>;
  };
  installData?: {
    package: string;
    version: string;
    timestamp: Date;
  };
  personalData?: {
    type: string;
    encrypted: boolean;
    purpose?: string;
  };
  publishData?: {
    contentId: string;
    platform?: string;
    timestamp: Date;
  };
  recommendationData?: {
    type: string;
    items: unknown[];
    algorithm?: string;
  };
  usageData?: {
    feature: string;
    count: number;
    duration?: number;
  };
  waitlistData?: {
    position: number;
    totalWaiting: number;
    estimatedWait?: string;
  };
  // Additional properties found in recent codebase usage
  attempt?: number;
  attempts?: number;
  attemptNumber?: number;
  autoGeneratedSpaces?: Array<Partial<Space>>;
  cohortSpacesLength?: number;
  componentStack?: string;
  connectionCount?: number;
  connectionId?: string;
  count?: number;
  created?: boolean;
  currentCount?: number;
  durationMinutes?: number;
  email?: string;
  emailDomain?: string;
  eventCount?: number;
  exists?: boolean;
  feedType?: string;
  finalTotal?: number;
  fromSpaceId?: string;
  graduationYearsLength?: number;
  handle?: string;
  isDevelopmentUser?: boolean;
  major?: string;
  matchingSpace?: any;
  memberships?: any;
  membershipsSnapshot?: any;
  method?: string;
  notificationId?: string;
  oldEventsSnapshot?: any;
  oldSummariesSnapshot?: any;
  operationCount?: number;
  operationId?: string;
  operationsCompleted?: number;
  projectId?: string;
  queryParams?: any;
  requestRefId?: string;
  result?: any;
  ritualCount?: number;
  ritualDataName?: string;
  sourceId?: string;
  sourceType?: string;
  spaceConfig?: any;
  spaceConfigId?: string;
  spaceCount?: number;
  spaces?: any;
  spacesSnapshot?: any;
  spacesWithoutUB?: any;
  spaceType?: string;
  status?: string;
  targetId?: string;
  targetTotal?: number;
  targetUserId?: string;
  timeRange?: string;
  toolDataOwnerId?: string;
  toolRefId?: string;
  UB_MAJORSLength?: number;
  userSpaceIds?: any;
  userUid?: string;
  // Additional recently found properties
  currentRitual?: any;
  isLocalEnvironment?: boolean;
  schoolId?: string;
  size?: number;
  spaceName?: string;
  targetCount?: number;
  toSpaceId?: string;
  totalConnections?: number;
  totalToCreate?: number;
  // Additional error boundary and system properties
  errorBoundary?: string;
  spaceContext?: string;
  // Additional properties for profile analytics
  includeInsights?: boolean;
  analyticsKeys?: string[];
  connectionRequest?: any;
  updatedRequest?: any;
  connection?: any;
  // Firebase real-time service properties
  messageId?: string;
  channel?: string;
  channels?: string | string[];
  userIds?: string | string[];
  // Feature flag service properties
  flagId?: string;
  flagCount?: number;
  enabled?: boolean;
  category?: string;
  // Additional missing properties from API routes
  clientIP?: string;
  limit?: number;
  detected?: string;
  userAgent?: string;
  // Properties from admin routes and error handling
  analysis?: any;
  collection?: string;
  engagementVelocity?: number;
  duration?: number;
  recentCount?: number;
  variable?: string;
  userCampusId?: string;
  origin?: string;
  identifier?: string;
  limitType?: string;
  campusId?: string;
  level?: string;
  resolved?: boolean;
  message?: string;
  commentId?: string;
  variant?: string;
  indexName?: string;
  totalEngagement?: number;
  spacesChecked?: number;
  url?: string;
  params?: any;
  itemCount?: number;
  itemId?: string;
  interaction?: string;
  preferences?: any;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: Error;
}

class Logger {
  private isDevelopment = config.app.environment === 'development';
  private enableConsole = config.logging.enableConsole;

  private formatMessage(entry: LogEntry): string {
    const { timestamp, level, message, context } = entry;
    const contextStr = context ? ` [${JSON.stringify(context)}]` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    
    const configLevel = config.logging.level as LogLevel;
    return levels[level] >= levels[configLevel];
  }

  private createLogEntry(level: LogLevel, message: string, context?: LogContext, error?: Error): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    };
  }

  private log(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return;

    // Console logging for development
    if (this.enableConsole) {
      const formattedMessage = this.formatMessage(entry);
      
      switch (entry.level) {
        case 'debug':
          break;
        case 'info':
          console.info(formattedMessage);
          break;
        case 'warn':
          break;
        case 'error':
          break;
      }
    }

    // TODO: Send to external logging service (e.g., Datadog, LogRocket)
    // if (config.logging.enableExternal) {
    //   this.sendToExternalService(entry);
    // }

    // TODO: Send errors to Sentry
    // if (entry.level === 'error' && config.logging.enableSentry && entry.error) {
    //   Sentry.captureException(entry.error, { contexts: { custom: entry.context } });
    // }
  }

  // Flexible logger methods accept overloaded signatures:
  // - (message)
  // - (message, context)
  // - (message, error)
  // - (message, context, error)
  // - (message, error, context)
  // - (contextOnly)
  private parseArgs(level: LogLevel, a?: unknown, b?: unknown, c?: unknown): { message: string; context?: LogContext; error?: Error } {
    // If only a single object is provided and it's not a string, treat as context-only
    if (typeof a !== 'string' && a && b === undefined && c === undefined) {
      const ctx = a as LogContext;
      const message = (ctx.message || ctx.action || 'log');
      // Remove message from context to avoid duplication
      const { message: _m, ...rest } = ctx as any;
      return { message, context: rest };
    }

    const message = (typeof a === 'string') ? a : 'log';
    let context: LogContext | undefined;
    let error: Error | undefined;

    // Determine second/third args flexibly
    const candidates = [b, c];
    for (const candidate of candidates) {
      if (!candidate) continue;
      if (candidate instanceof Error) {
        error = candidate;
      } else if (typeof candidate === 'object') {
        context = { ...(context || {}), ...(candidate as LogContext) };
      } else if (typeof candidate === 'string') {
        // Attach arbitrary string into context.message for compatibility
        context = { ...(context || {}), message: candidate };
      }
    }

    return { message, context, error };
  }

  debug(a?: unknown, b?: unknown): void {
    const { message, context } = this.parseArgs('debug', a, b);
    this.log(this.createLogEntry('debug', message, context));
  }

  info(a?: unknown, b?: unknown): void {
    const { message, context } = this.parseArgs('info', a, b);
    this.log(this.createLogEntry('info', message, context));
  }

  warn(a?: unknown, b?: unknown, c?: unknown): void {
    const { message, context, error } = this.parseArgs('warn', a, b, c);
    this.log(this.createLogEntry('warn', message, context, error));
  }

  error(a?: unknown, b?: unknown, c?: unknown): void {
    const { message, context, error } = this.parseArgs('error', a, b, c);
    this.log(this.createLogEntry('error', message, context, error));
  }

  // Specialized logging methods for common patterns
  apiCall(endpoint: string, method: string, context?: LogContext): void {
    this.debug(`API Call: ${method} ${endpoint}`, {
      ...context,
      action: 'api_call',
      metadata: { endpoint, method },
    });
  }

  userAction(action: string, context?: LogContext): void {
    this.info(`User Action: ${action}`, {
      ...context,
      action: 'user_action',
    });
  }

  spaceEvent(event: string, spaceId: string, context?: LogContext): void {
    this.info(`Space Event: ${event}`, {
      ...context,
      spaceId,
      action: 'space_event',
    });
  }

  authEvent(event: string, context?: LogContext): void {
    this.info(`Auth Event: ${event}`, {
      ...context,
      action: 'auth_event',
    });
  }

  performanceStart(operation: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      this.debug(`Performance: ${operation} completed in ${duration.toFixed(2)}ms`, {
        action: 'performance',
        metadata: { operation, duration },
      });
    };
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const { debug, info, warn, error, apiCall, userAction, spaceEvent, authEvent } = logger;
