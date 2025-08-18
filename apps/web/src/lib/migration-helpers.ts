/**
 * Migration helpers for updating HIVE components to use new auth and logging systems
 * This file contains utilities for systematically updating legacy patterns
 */

import { authenticatedFetch } from './auth-utils';
import { logger } from './logger';

/**
 * Replace legacy console statements with proper logging
 */
export const legacyConsole = {
  log: (message: string, context?: any) => {
    logger.info(message, { metadata: context });
  },
  warn: (message: string, context?: any) => {
    logger.warn(message, { metadata: context });
  },
  error: (message: string, context?: any) => {
    logger.error(message, { metadata: context });
  },
  debug: (message: string, context?: any) => {
    logger.debug(message, { metadata: context });
  },
};

/**
 * Legacy auth handler that logs the usage and provides proper auth
 */
export async function legacyFetch(url: string, options: globalThis.RequestInit = {}): Promise<Response> {
  logger.warn('Using legacy fetch - should be migrated to authenticatedFetch', {
    action: 'legacy_fetch_usage',
    metadata: { url, method: options.method || 'GET' }
  });
  
  return authenticatedFetch(url, options);
}

/**
 * Handle navigation consistently across the app
 */
export function navigateTo(url: string, replace = false): void {
  if (typeof window !== 'undefined') {
    if (replace) {
      window.location.replace(url);
    } else {
      window.location.href = url;
    }
  }
}

/**
 * Safe localStorage access with error handling
 */
export const safeStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      logger.error('Failed to access localStorage', { 
        action: 'storage_access_error',
        metadata: { key }
      }, error as Error);
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      logger.error('Failed to write to localStorage', {
        action: 'storage_write_error', 
        metadata: { key }
      }, error as Error);
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.error('Failed to remove from localStorage', {
        action: 'storage_remove_error',
        metadata: { key }
      }, error as Error);
      return false;
    }
  },
};

/**
 * Error handler that provides consistent error handling across components
 */
export function handleComponentError(
  error: Error, 
  componentName: string, 
  context?: Record<string, any>
): void {
  logger.error(`Component error in ${componentName}`, {
    component: componentName,
    action: 'component_error',
    metadata: context
  }, error);
  
  // TODO: Send to error tracking service
  // if (config.logging.enableSentry) {
  //   Sentry.captureException(error, { 
  //     tags: { component: componentName },
  //     contexts: { custom: context }
  //   });
  // }
}

/**
 * Performance monitoring wrapper for async operations
 */
export async function monitorPerformance<T>(
  operationName: string,
  operation: () => Promise<T>,
  context?: Record<string, any>
): Promise<T> {
  const endTimer = logger.performanceStart(operationName);
  
  try {
    const result = await operation();
    endTimer();
    return result;
  } catch (error) {
    endTimer();
    logger.error(`Performance monitoring: ${operationName} failed`, {
      action: 'performance_error',
      metadata: { operation: operationName, ...context }
    }, error as Error);
    throw error;
  }
}

/**
 * Safe async operation wrapper with error handling
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback: T,
  errorContext?: Record<string, any>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    logger.error('Safe async operation failed', {
      action: 'safe_async_error',
      metadata: errorContext
    }, error as Error);
    return fallback;
  }
}

/**
 * Validate and sanitize user input
 */
export function sanitizeInput(input: string, maxLength = 1000): string {
  if (typeof input !== 'string') {
    logger.warn('Invalid input type for sanitization', {
      action: 'sanitize_invalid_type',
      metadata: { inputType: typeof input }
    });
    return '';
  }
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>"']/g, ''); // Basic XSS prevention
}

/**
 * Debounced function wrapper for search and input handlers
 */
export function debounce<T extends (..._args: any[]) => any>(
  func: T,
  delay: number
): (..._args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (..._args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(..._args), delay);
  };
}