/**
 * Standardized API Response Types for HIVE
 * Ensures consistent response formats across all API endpoints
 */

export interface StandardSuccessResponse<T = unknown> {
  success: true;
  data?: T;
  message?: string;
  meta?: {
    pagination?: PaginationInfo;
    timestamp: string;
    total?: number;
  };
}

export interface StandardErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: unknown;
  meta?: {
    timestamp: string;
    endpoint?: string;
  };
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  offset?: number;
}

export interface ValidationErrorDetails {
  field: string;
  message: string;
  code: string;
}

export type ApiResponse<T = unknown> = StandardSuccessResponse<T> | StandardErrorResponse;

/**
 * Helper functions for creating consistent API responses
 */
export class ApiResponseHelper {
  static success<T>(data?: T, message?: string, meta?: StandardSuccessResponse<T>['meta']): StandardSuccessResponse<T> {
    return {
      success: true,
      ...(data !== undefined && { data }),
      ...(message && { message }),
      meta: {
        timestamp: new Date().toISOString(),
        ...meta
      }
    };
  }

  static error(
    error: string, 
    code?: string, 
    details?: unknown, 
    endpoint?: string
  ): StandardErrorResponse {
    return {
      success: false,
      error,
      ...(code && { code }),
      ...(details && { details }),
      meta: {
        timestamp: new Date().toISOString(),
        ...(endpoint && { endpoint })
      }
    };
  }

  static validationError(
    errors: ValidationErrorDetails[], 
    endpoint?: string
  ): StandardErrorResponse {
    return {
      success: false,
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: errors,
      meta: {
        timestamp: new Date().toISOString(),
        ...(endpoint && { endpoint })
      }
    };
  }

  static paginated<T>(
    data: T[], 
    pagination: PaginationInfo, 
    message?: string
  ): StandardSuccessResponse<T[]> {
    return {
      success: true,
      data,
      ...(message && { message }),
      meta: {
        timestamp: new Date().toISOString(),
        pagination,
        total: pagination.total
      }
    };
  }
}

/**
 * Standard HTTP Status Codes for HIVE API
 */
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,       // Authentication required/invalid
  FORBIDDEN: 403,          // Insufficient permissions
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422, // Validation errors
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const;

/**
 * Standard Error Codes for HIVE API
 */
export const ErrorCodes = {
  // Authentication & Authorization
  TOKEN_INVALID: 'TOKEN_INVALID',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  
  // Resource Management
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  RESOURCE_LIMIT_EXCEEDED: 'RESOURCE_LIMIT_EXCEEDED',
  
  // System
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED'
} as const;
