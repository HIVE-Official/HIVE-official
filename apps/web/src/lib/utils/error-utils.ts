/**
 * Error handling utilities for consistent error processing
 */

import { logger } from '@/lib/logger';

/**
 * Safely converts unknown error to Error object
 */
export function toError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === 'string') {
    return new Error(error);
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return new Error(String(error.message));
  }
  return new Error('An unknown error occurred');
}

/**
 * Gets error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  return toError(error).message;
}

/**
 * Logs error with proper type handling
 */
export function logError(message: string, error: unknown): void {
  const err = toError(error);
  logger.error(message, { 
    error: err.message,
    stack: err.stack 
  });
}

/**
 * Type guard for Error objects
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Creates a standardized error response
 */
export interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
}

export function createErrorResponse(
  error: unknown,
  defaultMessage = 'An error occurred'
): ErrorResponse {
  const err = toError(error);
  return {
    error: err.name || 'Error',
    message: err.message || defaultMessage,
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };
}