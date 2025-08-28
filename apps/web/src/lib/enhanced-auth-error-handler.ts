/**
 * Enhanced Authentication Error Handler for HIVE Platform
 * 
 * Provides comprehensive auth error handling with recovery mechanisms,
 * proper error classification, and security-focused error responses.
 */

import { NextRequest } from 'next/server';
import { StandardizedApiResponse } from '@/lib/api-error-standardizer';
import { ErrorCodes } from '@/lib/api-response-types';
import { logger } from '@/lib/logger';

/**
 * Authentication error types with proper classification
 */
export enum AuthErrorType {
  // Token Issues
  TOKEN_MISSING = 'TOKEN_MISSING',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  
  // Permission Issues
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  
  // Verification Issues
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  PHONE_NOT_VERIFIED = 'PHONE_NOT_VERIFIED',
  TWO_FACTOR_REQUIRED = 'TWO_FACTOR_REQUIRED',
  
  // Rate Limiting
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
  DEVICE_RATE_LIMITED = 'DEVICE_RATE_LIMITED',
  
  // Security Issues
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  GEO_BLOCKED = 'GEO_BLOCKED',
  DEVICE_NOT_TRUSTED = 'DEVICE_NOT_TRUSTED',
  
  // System Issues
  AUTH_SERVICE_UNAVAILABLE = 'AUTH_SERVICE_UNAVAILABLE',
  INTERNAL_AUTH_ERROR = 'INTERNAL_AUTH_ERROR'
}

/**
 * Auth error context for detailed error handling
 */
export interface AuthErrorContext {
  errorType: AuthErrorType;
  originalError?: unknown;
  userId?: string;
  userAgent?: string;
  ipAddress?: string;
  endpoint?: string;
  attemptCount?: number;
  lastAttempt?: Date;
  deviceId?: string;
  sessionId?: string;
}

/**
 * Auth error recovery suggestions
 */
export interface AuthErrorRecovery {
  canRetry: boolean;
  retryAfter?: number; // seconds
  maxRetries?: number;
  suggestedActions: string[];
  recoveryEndpoint?: string;
  requiresUserAction: boolean;
}

/**
 * Enhanced Auth Error class with recovery mechanisms
 */
export class EnhancedAuthError extends Error {
  public readonly errorType: AuthErrorType;
  public readonly context: AuthErrorContext;
  public readonly recovery: AuthErrorRecovery;
  public readonly httpStatus: number;
  public readonly isSecuritySensitive: boolean;

  constructor(
    errorType: AuthErrorType,
    message: string,
    context: Partial<AuthErrorContext> = {},
    recovery: Partial<AuthErrorRecovery> = {}
  ) {
    super(message);
    this.name = 'EnhancedAuthError';
    this.errorType = errorType;
    
    this.context = {
      errorType,
      ...context
    };

    this.recovery = {
      canRetry: false,
      suggestedActions: [],
      requiresUserAction: true,
      ...recovery
    };

    // Determine HTTP status and security sensitivity
    const { httpStatus, isSecuritySensitive } = this.getErrorClassification(errorType);
    this.httpStatus = httpStatus;
    this.isSecuritySensitive = isSecuritySensitive;
  }

  private getErrorClassification(errorType: AuthErrorType): { httpStatus: number; isSecuritySensitive: boolean } {
    switch (errorType) {
      case AuthErrorType.TOKEN_MISSING:
      case AuthErrorType.TOKEN_INVALID:
      case AuthErrorType.TOKEN_EXPIRED:
      case AuthErrorType.TOKEN_MALFORMED:
        return { httpStatus: 401, isSecuritySensitive: false };

      case AuthErrorType.INSUFFICIENT_PERMISSIONS:
        return { httpStatus: 403, isSecuritySensitive: false };

      case AuthErrorType.ACCOUNT_DISABLED:
      case AuthErrorType.ACCOUNT_SUSPENDED:
        return { httpStatus: 403, isSecuritySensitive: true };

      case AuthErrorType.EMAIL_NOT_VERIFIED:
      case AuthErrorType.PHONE_NOT_VERIFIED:
      case AuthErrorType.TWO_FACTOR_REQUIRED:
        return { httpStatus: 403, isSecuritySensitive: false };

      case AuthErrorType.TOO_MANY_ATTEMPTS:
      case AuthErrorType.DEVICE_RATE_LIMITED:
        return { httpStatus: 429, isSecuritySensitive: true };

      case AuthErrorType.SUSPICIOUS_ACTIVITY:
      case AuthErrorType.GEO_BLOCKED:
      case AuthErrorType.DEVICE_NOT_TRUSTED:
        return { httpStatus: 403, isSecuritySensitive: true };

      case AuthErrorType.AUTH_SERVICE_UNAVAILABLE:
      case AuthErrorType.INTERNAL_AUTH_ERROR:
        return { httpStatus: 503, isSecuritySensitive: false };

      default:
        return { httpStatus: 500, isSecuritySensitive: false };
    }
  }
}

/**
 * Enhanced Authentication Error Handler
 */
export class EnhancedAuthErrorHandler {
  /**
   * Handle authentication errors with proper classification and recovery
   */
  static handleAuthError(error: unknown, request: NextRequest, additionalContext: Record<string, any> = {}) {
    const context = this.extractRequestContext(request);
    
    // Classify the error
    const authError = this.classifyError(error, { ...context, ...additionalContext });
    
    // Log the error appropriately
    this.logAuthError(authError, context);
    
    // Return appropriate response
    return this.createErrorResponse(authError);
  }

  /**
   * Classify errors into proper auth error types
   */
  private static classifyError(error: unknown, context: Record<string, any>): EnhancedAuthError {
    // If already an EnhancedAuthError, return as-is
    if (error instanceof EnhancedAuthError) {
      return error;
    }

    // Handle Firebase Auth errors
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string; message: string };
      return this.mapFirebaseError(firebaseError, context);
    }

    // Handle custom API errors
    if (error && typeof error === 'object' && 'name' in error) {
      const customError = error as { name: string; message: string };
      if (customError.name === 'AuthenticationError') {
        return new EnhancedAuthError(
          AuthErrorType.TOKEN_INVALID,
          customError.message,
          context,
          {
            canRetry: true,
            maxRetries: 3,
            suggestedActions: ['Refresh your authentication token', 'Sign in again'],
            recoveryEndpoint: '/api/auth/refresh'
          }
        );
      }
      
      if (customError.name === 'AuthorizationError') {
        return new EnhancedAuthError(
          AuthErrorType.INSUFFICIENT_PERMISSIONS,
          customError.message,
          context,
          {
            canRetry: false,
            suggestedActions: ['Contact support for access', 'Check your account permissions'],
            requiresUserAction: true
          }
        );
      }
    }

    // Default to generic auth error
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
    return new EnhancedAuthError(
      AuthErrorType.INTERNAL_AUTH_ERROR,
      errorMessage,
      context,
      {
        canRetry: false,
        suggestedActions: ['Try again later', 'Contact support if the problem persists']
      }
    );
  }

  /**
   * Map Firebase errors to enhanced auth errors
   */
  private static mapFirebaseError(firebaseError: { code: string; message: string }, context: Record<string, any>): EnhancedAuthError {
    switch (firebaseError.code) {
      case 'auth/id-token-expired':
        return new EnhancedAuthError(
          AuthErrorType.TOKEN_EXPIRED,
          'Your session has expired',
          context,
          {
            canRetry: true,
            maxRetries: 1,
            suggestedActions: ['Sign in again to continue'],
            recoveryEndpoint: '/auth/login'
          }
        );

      case 'auth/id-token-revoked':
        return new EnhancedAuthError(
          AuthErrorType.TOKEN_INVALID,
          'Your session has been invalidated',
          context,
          {
            canRetry: false,
            suggestedActions: ['Sign in again with your credentials'],
            recoveryEndpoint: '/auth/login'
          }
        );

      case 'auth/user-disabled':
        return new EnhancedAuthError(
          AuthErrorType.ACCOUNT_DISABLED,
          'This account has been disabled',
          context,
          {
            canRetry: false,
            suggestedActions: ['Contact support for assistance'],
            requiresUserAction: true
          }
        );

      case 'auth/user-not-found':
        return new EnhancedAuthError(
          AuthErrorType.TOKEN_INVALID,
          'Account not found',
          context,
          {
            canRetry: false,
            suggestedActions: ['Verify your credentials', 'Create a new account'],
            recoveryEndpoint: '/auth/login'
          }
        );

      case 'auth/too-many-requests':
        return new EnhancedAuthError(
          AuthErrorType.TOO_MANY_ATTEMPTS,
          'Too many authentication attempts',
          context,
          {
            canRetry: true,
            retryAfter: 300, // 5 minutes
            maxRetries: 1,
            suggestedActions: ['Wait a few minutes before trying again'],
            requiresUserAction: true
          }
        );

      case 'auth/network-request-failed':
        return new EnhancedAuthError(
          AuthErrorType.AUTH_SERVICE_UNAVAILABLE,
          'Authentication service is temporarily unavailable',
          context,
          {
            canRetry: true,
            retryAfter: 30,
            maxRetries: 3,
            suggestedActions: ['Check your internet connection', 'Try again in a moment']
          }
        );

      default:
        return new EnhancedAuthError(
          AuthErrorType.INTERNAL_AUTH_ERROR,
          firebaseError.message || 'Authentication failed',
          context,
          {
            canRetry: false,
            suggestedActions: ['Try again', 'Contact support if the problem persists']
          }
        );
    }
  }

  /**
   * Extract relevant context from the request
   */
  private static extractRequestContext(request: NextRequest): Record<string, any> {
    return {
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 request.headers.get('cf-connecting-ip') || undefined,
      endpoint: new URL(request.url).pathname,
      timestamp: new Date().toISOString(),
      requestId: request.headers.get('x-request-id') || `auth_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
    };
  }

  /**
   * Log authentication errors appropriately
   */
  private static logAuthError(authError: EnhancedAuthError, context: Record<string, any>) {
    const logData = {
      errorType: authError.errorType,
      message: authError.message,
      httpStatus: authError.httpStatus,
      endpoint: context.endpoint,
      userAgent: context.userAgent,
      ipAddress: context.ipAddress,
      requestId: context.requestId,
      timestamp: context.timestamp
    };

    if (authError.isSecuritySensitive) {
      logger.warn('🚨 Security-sensitive auth error', logData);
      
      // Additional security logging could go here
      // e.g., alert security team, trigger additional monitoring, etc.
    } else {
      logger.info('🔐 Authentication error', logData);
    }

    // Log recovery information for monitoring
    if (authError.recovery.canRetry) {
      logger.info('🔄 Auth error recovery available', {
        errorType: authError.errorType,
        retryAfter: authError.recovery.retryAfter,
        maxRetries: authError.recovery.maxRetries,
        requestId: context.requestId
      });
    }
  }

  /**
   * Create standardized error response
   */
  private static createErrorResponse(authError: EnhancedAuthError) {
    const errorCode = this.mapErrorTypeToCode(authError.errorType);
    const isClientSafe = !authError.isSecuritySensitive;

    // For security-sensitive errors, provide generic messages
    const clientMessage = authError.isSecuritySensitive 
      ? 'Authentication failed for security reasons'
      : authError.message;

    const responseDetails: any = {
      errorType: authError.errorType,
      canRetry: authError.recovery.canRetry,
      suggestedActions: authError.recovery.suggestedActions
    };

    // Add recovery information if available
    if (authError.recovery.recoveryEndpoint) {
      responseDetails.recoveryEndpoint = authError.recovery.recoveryEndpoint;
    }

    if (authError.recovery.retryAfter) {
      responseDetails.retryAfter = authError.recovery.retryAfter;
    }

    if (authError.recovery.maxRetries) {
      responseDetails.maxRetries = authError.recovery.maxRetries;
    }

    return StandardizedApiResponse.error(
      clientMessage,
      errorCode,
      authError.httpStatus,
      isClientSafe ? responseDetails : undefined
    );
  }

  /**
   * Map error types to standard error codes
   */
  private static mapErrorTypeToCode(errorType: AuthErrorType): string {
    switch (errorType) {
      case AuthErrorType.TOKEN_MISSING:
      case AuthErrorType.TOKEN_INVALID:
      case AuthErrorType.TOKEN_EXPIRED:
      case AuthErrorType.TOKEN_MALFORMED:
        return ErrorCodes.TOKEN_INVALID;

      case AuthErrorType.INSUFFICIENT_PERMISSIONS:
        return ErrorCodes.FORBIDDEN;

      case AuthErrorType.ACCOUNT_DISABLED:
      case AuthErrorType.ACCOUNT_SUSPENDED:
        return ErrorCodes.FORBIDDEN;

      case AuthErrorType.EMAIL_NOT_VERIFIED:
      case AuthErrorType.PHONE_NOT_VERIFIED:
      case AuthErrorType.TWO_FACTOR_REQUIRED:
        return ErrorCodes.VALIDATION_ERROR;

      case AuthErrorType.TOO_MANY_ATTEMPTS:
      case AuthErrorType.DEVICE_RATE_LIMITED:
        return ErrorCodes.RATE_LIMIT_EXCEEDED;

      case AuthErrorType.SUSPICIOUS_ACTIVITY:
      case AuthErrorType.GEO_BLOCKED:
      case AuthErrorType.DEVICE_NOT_TRUSTED:
        return ErrorCodes.FORBIDDEN;

      case AuthErrorType.AUTH_SERVICE_UNAVAILABLE:
        return ErrorCodes.SERVICE_UNAVAILABLE;

      case AuthErrorType.INTERNAL_AUTH_ERROR:
      default:
        return ErrorCodes.INTERNAL_ERROR;
    }
  }

  /**
   * Create specific auth error types for common scenarios
   */
  static createTokenExpiredError(context: Record<string, any> = {}) {
    return new EnhancedAuthError(
      AuthErrorType.TOKEN_EXPIRED,
      'Your session has expired',
      context,
      {
        canRetry: true,
        maxRetries: 1,
        suggestedActions: ['Sign in again to continue'],
        recoveryEndpoint: '/auth/login',
        requiresUserAction: true
      }
    );
  }

  static createInsufficientPermissionsError(requiredRole?: string, context: Record<string, any> = {}) {
    const message = requiredRole 
      ? `${requiredRole} permissions required`
      : 'Insufficient permissions';

    return new EnhancedAuthError(
      AuthErrorType.INSUFFICIENT_PERMISSIONS,
      message,
      context,
      {
        canRetry: false,
        suggestedActions: ['Contact an administrator for access'],
        requiresUserAction: true
      }
    );
  }

  static createRateLimitError(retryAfter: number, context: Record<string, any> = {}) {
    return new EnhancedAuthError(
      AuthErrorType.TOO_MANY_ATTEMPTS,
      'Too many authentication attempts',
      context,
      {
        canRetry: true,
        retryAfter,
        maxRetries: 1,
        suggestedActions: [`Wait ${retryAfter} seconds before trying again`],
        requiresUserAction: true
      }
    );
  }
}