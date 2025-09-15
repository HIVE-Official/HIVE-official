/**
 * API Response Type Definitions
 * 
 * Centralized type definitions for API responses across the HIVE platform.
 * This ensures consistency in API response structures and provides
 * TypeScript support for frontend-backend communication.
 */

/**
 * Standard API Response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
  requestId?: string;
}

/**
 * API Error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  field?: string;
  statusCode?: number;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  nextCursor?: string;
}

/**
 * Activity API Response Types
 */
export interface ActivityResponse {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, any>;
  timestamp: string;
  spaceId?: string;
  targetId?: string;
  targetType?: string;
}

export type ActivityType = 
  | 'post_created'
  | 'post_liked'
  | 'post_commented'
  | 'space_joined'
  | 'space_left'
  | 'event_created'
  | 'event_rsvp'
  | 'profile_updated'
  | 'tool_created'
  | 'tool_installed';

/**
 * Batch Activity Response
 */
export interface BatchActivityResponse {
  activities: ActivityResponse[];
  processed: number;
  failed: number;
  errors?: Array<{
    index: number;
    error: string;
  }>;
}

/**
 * Activity Insights Response
 */
export interface ActivityInsightsResponse {
  totalActivities: number;
  activeUsers: number;
  topActivities: Array<{
    type: ActivityType;
    count: number;
  }>;
  hourlyDistribution: Array<{
    hour: number;
    count: number;
  }>;
  spaceActivity: Array<{
    spaceId: string;
    spaceName: string;
    activityCount: number;
  }>;
  dateRange: {
    start: string;
    end: string;
  };
}

/**
 * User Activity Summary
 */
export interface UserActivitySummary {
  userId: string;
  totalActivities: number;
  lastActive: string;
  activityBreakdown: Record<ActivityType, number>;
  engagementScore: number;
}

/**
 * Space Analytics Response
 */
export interface SpaceAnalyticsResponse {
  spaceId: string;
  metrics: {
    totalMembers: number;
    activeMembers: number;
    totalPosts: number;
    totalEvents: number;
    engagementRate: number;
  };
  trends: {
    memberGrowth: number;
    activityGrowth: number;
    engagementGrowth: number;
  };
  topContributors: Array<{
    userId: string;
    displayName: string;
    contributions: number;
  }>;
}

/**
 * Feed Response Types
 */
export interface FeedItemResponse {
  id: string;
  type: 'post' | 'event' | 'announcement' | 'poll';
  content: any;
  author: {
    id: string;
    displayName: string;
    avatarUrl?: string;
    handle?: string;
  };
  spaceId?: string;
  spaceName?: string;
  createdAt: string;
  updatedAt: string;
  interactions: {
    likes: number;
    comments: number;
    shares: number;
    hasLiked?: boolean;
  };
}

/**
 * Notification Response
 */
export interface NotificationResponse {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export type NotificationType =
  | 'mention'
  | 'like'
  | 'comment'
  | 'follow'
  | 'space_invite'
  | 'event_reminder'
  | 'system';

/**
 * Search Results Response
 */
export interface SearchResponse<T = any> {
  results: T[];
  totalResults: number;
  searchQuery: string;
  filters?: Record<string, any>;
  suggestions?: string[];
  facets?: Record<string, Array<{
    value: string;
    count: number;
  }>>;
}

/**
 * Upload Response
 */
export interface UploadResponse {
  fileId: string;
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  size: number;
  filename: string;
  uploadedAt: string;
}

/**
 * Auth Response Types
 */
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    emailVerified: boolean;
  };
  token: string;
  refreshToken?: string;
  expiresIn: number;
  isNewUser: boolean;
}

/**
 * Profile Response
 */
export interface ProfileResponse {
  id: string;
  email: string;
  displayName: string;
  handle?: string;
  bio?: string;
  avatarUrl?: string;
  coverPhotoUrl?: string;
  major?: string;
  graduationYear?: number;
  schoolId?: string;
  interests?: string[];
  socialLinks?: Record<string, string>;
  privacy: {
    profileVisibility: 'public' | 'campus' | 'connections' | 'private';
    showEmail: boolean;
    showActivity: boolean;
  };
  stats: {
    connections: number;
    posts: number;
    spaces: number;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Generic success response
 */
export interface SuccessResponse {
  success: true;
  message?: string;
  data?: any;
}

/**
 * Generic error response
 */
export interface ErrorResponse {
  success: false;
  error: ApiError;
  message: string;
}

/**
 * Helper type guards
 */
export function isApiError(response: any): response is ErrorResponse {
  return response && response.success === false && response.error;
}

export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.success === true && response.data !== undefined;
}

/**
 * Re-export HttpStatus from http-status module
 */
export { HttpStatus } from '../../utils/http-status';

/**
 * Standardized Error Codes for API responses
 * These provide machine-readable error identifiers that clients can use
 * to handle specific error conditions programmatically
 */
export enum ErrorCodes {
  // ============= General Errors (1000-1099) =============
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  TIMEOUT = 'TIMEOUT',
  
  // ============= Validation Errors (1100-1199) =============
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_FIELD = 'MISSING_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  INVALID_TYPE = 'INVALID_TYPE',
  VALUE_TOO_LONG = 'VALUE_TOO_LONG',
  VALUE_TOO_SHORT = 'VALUE_TOO_SHORT',
  VALUE_OUT_OF_RANGE = 'VALUE_OUT_OF_RANGE',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PHONE = 'INVALID_PHONE',
  INVALID_URL = 'INVALID_URL',
  INVALID_DATE = 'INVALID_DATE',
  
  // ============= Authentication Errors (1200-1299) =============
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_MISSING = 'TOKEN_MISSING',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  ACCOUNT_NOT_VERIFIED = 'ACCOUNT_NOT_VERIFIED',
  TWO_FACTOR_REQUIRED = 'TWO_FACTOR_REQUIRED',
  TWO_FACTOR_INVALID = 'TWO_FACTOR_INVALID',
  
  // ============= Authorization Errors (1300-1399) =============
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  ROLE_REQUIRED = 'ROLE_REQUIRED',
  SUBSCRIPTION_REQUIRED = 'SUBSCRIPTION_REQUIRED',
  FEATURE_DISABLED = 'FEATURE_DISABLED',
  ACCESS_DENIED = 'ACCESS_DENIED',
  IP_BLOCKED = 'IP_BLOCKED',
  
  // ============= Resource Errors (1400-1499) =============
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  SPACE_NOT_FOUND = 'SPACE_NOT_FOUND',
  POST_NOT_FOUND = 'POST_NOT_FOUND',
  EVENT_NOT_FOUND = 'EVENT_NOT_FOUND',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  
  // ============= Conflict Errors (1500-1599) =============
  CONFLICT = 'CONFLICT',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  USERNAME_TAKEN = 'USERNAME_TAKEN',
  RESOURCE_LOCKED = 'RESOURCE_LOCKED',
  CONCURRENT_MODIFICATION = 'CONCURRENT_MODIFICATION',
  
  // ============= Rate Limiting Errors (1600-1699) =============
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  BANDWIDTH_EXCEEDED = 'BANDWIDTH_EXCEEDED',
  
  // ============= Business Logic Errors (1700-1799) =============
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  PREREQUISITE_FAILED = 'PREREQUISITE_FAILED',
  WORKFLOW_ERROR = 'WORKFLOW_ERROR',
  INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION',
  OPERATION_NOT_PERMITTED = 'OPERATION_NOT_PERMITTED',
  
  // ============= Space-Specific Errors (2000-2099) =============
  SPACE_FULL = 'SPACE_FULL',
  SPACE_ARCHIVED = 'SPACE_ARCHIVED',
  SPACE_PRIVATE = 'SPACE_PRIVATE',
  NOT_SPACE_MEMBER = 'NOT_SPACE_MEMBER',
  ALREADY_SPACE_MEMBER = 'ALREADY_SPACE_MEMBER',
  SPACE_INVITATION_REQUIRED = 'SPACE_INVITATION_REQUIRED',
  SPACE_INVITATION_EXPIRED = 'SPACE_INVITATION_EXPIRED',
  
  // ============= Event-Specific Errors (2100-2199) =============
  EVENT_FULL = 'EVENT_FULL',
  EVENT_CANCELLED = 'EVENT_CANCELLED',
  EVENT_ENDED = 'EVENT_ENDED',
  EVENT_NOT_STARTED = 'EVENT_NOT_STARTED',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  ALREADY_REGISTERED = 'ALREADY_REGISTERED',
  NOT_REGISTERED = 'NOT_REGISTERED',
  
  // ============= File/Upload Errors (2200-2299) =============
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  STORAGE_QUOTA_EXCEEDED = 'STORAGE_QUOTA_EXCEEDED',
  
  // ============= Payment Errors (2300-2399) =============
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  CARD_DECLINED = 'CARD_DECLINED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  SUBSCRIPTION_EXPIRED = 'SUBSCRIPTION_EXPIRED',
  
  // ============= External Service Errors (2400-2499) =============
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  THIRD_PARTY_API_ERROR = 'THIRD_PARTY_API_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  CACHE_ERROR = 'CACHE_ERROR',
  EMAIL_SERVICE_ERROR = 'EMAIL_SERVICE_ERROR',
  SMS_SERVICE_ERROR = 'SMS_SERVICE_ERROR'
}

/**
 * Helper function to get user-friendly message for error code
 */
export function getErrorMessage(code: ErrorCodes): string {
  const messages: Record<ErrorCodes, string> = {
    // General
    [ErrorCodes.UNKNOWN_ERROR]: 'An unknown error occurred',
    [ErrorCodes.INTERNAL_ERROR]: 'Internal server error',
    [ErrorCodes.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable',
    [ErrorCodes.METHOD_NOT_ALLOWED]: 'Method not allowed',
    [ErrorCodes.NOT_IMPLEMENTED]: 'Feature not yet implemented',
    [ErrorCodes.TIMEOUT]: 'Request timed out',
    
    // Validation
    [ErrorCodes.VALIDATION_ERROR]: 'Validation failed',
    [ErrorCodes.INVALID_INPUT]: 'Invalid input provided',
    [ErrorCodes.MISSING_FIELD]: 'Required field is missing',
    [ErrorCodes.INVALID_FORMAT]: 'Invalid format',
    [ErrorCodes.INVALID_TYPE]: 'Invalid data type',
    [ErrorCodes.VALUE_TOO_LONG]: 'Value exceeds maximum length',
    [ErrorCodes.VALUE_TOO_SHORT]: 'Value below minimum length',
    [ErrorCodes.VALUE_OUT_OF_RANGE]: 'Value out of acceptable range',
    [ErrorCodes.INVALID_EMAIL]: 'Invalid email address',
    [ErrorCodes.INVALID_PHONE]: 'Invalid phone number',
    [ErrorCodes.INVALID_URL]: 'Invalid URL',
    [ErrorCodes.INVALID_DATE]: 'Invalid date',
    
    // Authentication
    [ErrorCodes.UNAUTHORIZED]: 'Authentication required',
    [ErrorCodes.INVALID_CREDENTIALS]: 'Invalid credentials',
    [ErrorCodes.TOKEN_EXPIRED]: 'Authentication token expired',
    [ErrorCodes.TOKEN_INVALID]: 'Invalid authentication token',
    [ErrorCodes.TOKEN_MISSING]: 'Authentication token missing',
    [ErrorCodes.SESSION_EXPIRED]: 'Session has expired',
    [ErrorCodes.ACCOUNT_LOCKED]: 'Account is locked',
    [ErrorCodes.ACCOUNT_SUSPENDED]: 'Account has been suspended',
    [ErrorCodes.ACCOUNT_NOT_VERIFIED]: 'Account not verified',
    [ErrorCodes.TWO_FACTOR_REQUIRED]: 'Two-factor authentication required',
    [ErrorCodes.TWO_FACTOR_INVALID]: 'Invalid two-factor code',
    
    // Authorization
    [ErrorCodes.FORBIDDEN]: 'Access forbidden',
    [ErrorCodes.INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions',
    [ErrorCodes.ROLE_REQUIRED]: 'Required role not found',
    [ErrorCodes.SUBSCRIPTION_REQUIRED]: 'Subscription required',
    [ErrorCodes.FEATURE_DISABLED]: 'Feature is disabled',
    [ErrorCodes.ACCESS_DENIED]: 'Access denied',
    [ErrorCodes.IP_BLOCKED]: 'IP address blocked',
    
    // Resources
    [ErrorCodes.NOT_FOUND]: 'Resource not found',
    [ErrorCodes.RESOURCE_NOT_FOUND]: 'Requested resource not found',
    [ErrorCodes.USER_NOT_FOUND]: 'User not found',
    [ErrorCodes.SPACE_NOT_FOUND]: 'Space not found',
    [ErrorCodes.POST_NOT_FOUND]: 'Post not found',
    [ErrorCodes.EVENT_NOT_FOUND]: 'Event not found',
    [ErrorCodes.FILE_NOT_FOUND]: 'File not found',
    
    // Conflicts
    [ErrorCodes.CONFLICT]: 'Resource conflict',
    [ErrorCodes.DUPLICATE_ENTRY]: 'Duplicate entry',
    [ErrorCodes.ALREADY_EXISTS]: 'Resource already exists',
    [ErrorCodes.EMAIL_ALREADY_EXISTS]: 'Email already registered',
    [ErrorCodes.USERNAME_TAKEN]: 'Username already taken',
    [ErrorCodes.RESOURCE_LOCKED]: 'Resource is locked',
    [ErrorCodes.CONCURRENT_MODIFICATION]: 'Concurrent modification detected',
    
    // Rate Limiting
    [ErrorCodes.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
    [ErrorCodes.QUOTA_EXCEEDED]: 'Quota exceeded',
    [ErrorCodes.TOO_MANY_REQUESTS]: 'Too many requests',
    [ErrorCodes.BANDWIDTH_EXCEEDED]: 'Bandwidth limit exceeded',
    
    // Business Logic
    [ErrorCodes.BUSINESS_RULE_VIOLATION]: 'Business rule violation',
    [ErrorCodes.PREREQUISITE_FAILED]: 'Prerequisites not met',
    [ErrorCodes.WORKFLOW_ERROR]: 'Workflow error',
    [ErrorCodes.INVALID_STATE_TRANSITION]: 'Invalid state transition',
    [ErrorCodes.OPERATION_NOT_PERMITTED]: 'Operation not permitted',
    
    // Space-Specific
    [ErrorCodes.SPACE_FULL]: 'Space is at capacity',
    [ErrorCodes.SPACE_ARCHIVED]: 'Space has been archived',
    [ErrorCodes.SPACE_PRIVATE]: 'Space is private',
    [ErrorCodes.NOT_SPACE_MEMBER]: 'Not a member of this space',
    [ErrorCodes.ALREADY_SPACE_MEMBER]: 'Already a member of this space',
    [ErrorCodes.SPACE_INVITATION_REQUIRED]: 'Invitation required',
    [ErrorCodes.SPACE_INVITATION_EXPIRED]: 'Invitation has expired',
    
    // Event-Specific
    [ErrorCodes.EVENT_FULL]: 'Event is at capacity',
    [ErrorCodes.EVENT_CANCELLED]: 'Event has been cancelled',
    [ErrorCodes.EVENT_ENDED]: 'Event has ended',
    [ErrorCodes.EVENT_NOT_STARTED]: 'Event has not started',
    [ErrorCodes.REGISTRATION_CLOSED]: 'Registration is closed',
    [ErrorCodes.ALREADY_REGISTERED]: 'Already registered for this event',
    [ErrorCodes.NOT_REGISTERED]: 'Not registered for this event',
    
    // Files
    [ErrorCodes.FILE_TOO_LARGE]: 'File size exceeds limit',
    [ErrorCodes.INVALID_FILE_TYPE]: 'Invalid file type',
    [ErrorCodes.UPLOAD_FAILED]: 'Upload failed',
    [ErrorCodes.STORAGE_QUOTA_EXCEEDED]: 'Storage quota exceeded',
    
    // Payments
    [ErrorCodes.PAYMENT_REQUIRED]: 'Payment required',
    [ErrorCodes.PAYMENT_FAILED]: 'Payment failed',
    [ErrorCodes.CARD_DECLINED]: 'Card declined',
    [ErrorCodes.INSUFFICIENT_FUNDS]: 'Insufficient funds',
    [ErrorCodes.SUBSCRIPTION_EXPIRED]: 'Subscription expired',
    
    // External Services
    [ErrorCodes.EXTERNAL_SERVICE_ERROR]: 'External service error',
    [ErrorCodes.THIRD_PARTY_API_ERROR]: 'Third-party API error',
    [ErrorCodes.DATABASE_ERROR]: 'Database error',
    [ErrorCodes.CACHE_ERROR]: 'Cache error',
    [ErrorCodes.EMAIL_SERVICE_ERROR]: 'Email service error',
    [ErrorCodes.SMS_SERVICE_ERROR]: 'SMS service error'
  };
  
  return messages[code] || 'An error occurred';
}

/**
 * API Response Helper for constructing consistent responses
 */
export const ApiResponseHelper = {
  success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message
    };
  },

  error(message: string, code?: string, details?: any): ErrorResponse {
    return {
      success: false,
      error: {
        code: code || 'UNKNOWN_ERROR',
        message,
        details
      },
      message
    };
  },

  paginated<T>(data: T[], pagination: { page: number; limit: number; total: number }): ApiResponse<PaginatedResponse<T>> {
    return {
      success: true,
      data: {
        items: data,
        pagination: {
          ...pagination,
          hasMore: pagination.page * pagination.limit < pagination.total
        }
      }
    };
  }
};