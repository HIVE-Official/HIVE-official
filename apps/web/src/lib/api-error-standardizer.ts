/**
 * API Error Response Standardizer for HIVE Platform
 * 
 * This utility helps standardize all API error responses across the platform
 * to use the ApiResponseHelper consistently and fix common error patterns.
 */

import { NextResponse } from 'next/server';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from '@/lib/api-response-types';

/**
 * Enhanced API Response Helper with better error handling
 */
export class StandardizedApiResponse {
  /**
   * Create a standardized success response
   */
  static success<T>(data?: T, message?: string, status: number = HttpStatus.OK) {
    return NextResponse.json(
      ApiResponseHelper.success(data, message),
      { status }
    );
  }

  /**
   * Create a standardized error response
   */
  static error(
    message: string,
    code: string = ErrorCodes.INTERNAL_ERROR,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: any
  ) {
    return NextResponse.json(
      ApiResponseHelper.error(message, code, details),
      { status }
    );
  }

  /**
   * Authentication required error
   */
  static authRequired(message: string = "Authentication required") {
    return this.error(
      message,
      ErrorCodes.UNAUTHORIZED,
      HttpStatus.UNAUTHORIZED
    );
  }

  /**
   * Insufficient permissions error
   */
  static forbidden(message: string = "Access denied") {
    return this.error(
      message,
      ErrorCodes.FORBIDDEN,
      HttpStatus.FORBIDDEN
    );
  }

  /**
   * Validation error with field details
   */
  static validationError(message: string = "Validation failed", details?: any) {
    return this.error(
      message,
      ErrorCodes.VALIDATION_ERROR,
      HttpStatus.UNPROCESSABLE_ENTITY,
      details
    );
  }

  /**
   * Bad request error
   */
  static badRequest(message: string, details?: any) {
    return this.error(
      message,
      ErrorCodes.INVALID_INPUT,
      HttpStatus.BAD_REQUEST,
      details
    );
  }

  /**
   * Not found error
   */
  static notFound(message: string = "Resource not found") {
    return this.error(
      message,
      ErrorCodes.RESOURCE_NOT_FOUND,
      HttpStatus.NOT_FOUND
    );
  }

  /**
   * Rate limit exceeded error
   */
  static rateLimitExceeded(message: string = "Rate limit exceeded") {
    return this.error(
      message,
      ErrorCodes.RATE_LIMIT_EXCEEDED,
      HttpStatus.TOO_MANY_REQUESTS
    );
  }

  /**
   * Server error with proper error handling
   */
  static serverError(error: unknown, endpoint?: string) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    
    // Log the error securely (without sensitive data)
    console.error(`API Error at ${endpoint || 'unknown'}:`, {
      message: errorMessage,
      timestamp: new Date().toISOString(),
      endpoint
    });

    return this.error(
      "Internal server error",
      ErrorCodes.INTERNAL_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  /**
   * Handle try-catch wrapper with standardized error response
   */
  static async withErrorHandling<T>(
    operation: () => Promise<NextResponse>,
    endpoint?: string
  ): Promise<NextResponse> {
    try {
      return await operation();
    } catch (error) {
      return this.serverError(error, endpoint);
    }
  }
}

/**
 * Common API validation patterns
 */
export class ApiValidation {
  /**
   * Validate required fields
   */
  static validateRequired(data: any, requiredFields: string[]): string[] {
    const missingFields: string[] = [];
    
    for (const field of requiredFields) {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        missingFields.push(field);
      }
    }
    
    return missingFields;
  }

  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate string length
   */
  static validateLength(value: string, min?: number, max?: number): boolean {
    const length = value.length;
    if (min && length < min) return false;
    if (max && length > max) return false;
    return true;
  }
}

/**
 * Error code mapping for common typos found in the codebase
 */
export const ErrorCodeFixes = {
  // Fix common typos
  'INVALIDINPUT': ErrorCodes.INVALID_INPUT,
  'INTERNALERROR': ErrorCodes.INTERNAL_ERROR,
  'INTERNAL_SERVERERROR': ErrorCodes.INTERNAL_ERROR,
  'NOTFOUND': ErrorCodes.RESOURCE_NOT_FOUND,
  'NOT_FOUND': ErrorCodes.RESOURCE_NOT_FOUND,
  
  // Standardize variations
  'AUTH_REQUIRED': ErrorCodes.UNAUTHORIZED,
  'ACCESS_DENIED': ErrorCodes.FORBIDDEN,
  'INVALID_REQUEST': ErrorCodes.INVALID_INPUT,
  'SERVER_ERROR': ErrorCodes.INTERNAL_ERROR,
} as const;

/**
 * HTTP Status code fixes for common typos
 */
export const HttpStatusFixes = {
  'NOTFOUND': HttpStatus.NOT_FOUND,
  'INTERNAL_SERVERERROR': HttpStatus.INTERNAL_SERVER_ERROR,
  'BAD_REQUEST': HttpStatus.BAD_REQUEST,
  'UNPROCESSABLE_CONTENT': HttpStatus.UNPROCESSABLE_ENTITY,
} as const;