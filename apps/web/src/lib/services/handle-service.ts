import { dbAdmin } from '../firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';

import type { Transaction } from 'firebase-admin/firestore';

/**
 * Centralized handle validation service
 * Fixes race condition between check-handle and complete-onboarding APIs
 */

export interface HandleValidationResult {
  isAvailable: boolean;
  error?: string;
  normalizedHandle?: string;
}

// Reserved handles that cannot be claimed
const RESERVED_HANDLES = new Set([
  'admin', 'administrator', 'root', 'system', 'api', 'www', 'mail', 'email',
  'support', 'help', 'info', 'contact', 'about', 'terms', 'privacy', 'legal',
  'security', 'safety', 'abuse', 'spam', 'test', 'testing', 'dev', 'development',
  'staging', 'prod', 'production', 'demo', 'example', 'sample', 'null', 'undefined',
  'true', 'false', 'none', 'empty', 'blank', 'default', 'config', 'settings',
  'profile', 'account', 'user', 'users', 'public', 'private', 'internal',
  'external', 'guest', 'anonymous', 'unknown', 'temp', 'temporary', 'delete',
  'remove', 'banned', 'blocked', 'suspended', 'hive', 'hivecampus', 'campus'
]);

/**
 * Validate handle format
 */
export function validateHandleFormat(handle: string): HandleValidationResult {
  if (!handle || typeof handle !== 'string') {
    return { isAvailable: false, error: 'Handle is required' };
  }

  const normalizedHandle = handle.toLowerCase().trim();

  // Length validation
  if (normalizedHandle.length < 3) {
    return { isAvailable: false, error: 'Handle must be at least 3 characters long' };
  }

  if (normalizedHandle.length > 20) {
    return { isAvailable: false, error: 'Handle must be at most 20 characters long' };
  }

  // Format validation - only letters, numbers, underscores, periods, hyphens
  const handleRegex = /^[a-zA-Z0-9._-]+$/;
  if (!handleRegex.test(normalizedHandle)) {
    return { 
      isAvailable: false, 
      error: 'Handle can only contain letters, numbers, periods, underscores, and hyphens' 
    };
  }

  // Additional format rules
  if (normalizedHandle.startsWith('_') || normalizedHandle.endsWith('_')) {
    return { isAvailable: false, error: 'Handle cannot start or end with underscore' };
  }

  if (normalizedHandle.startsWith('.') || normalizedHandle.endsWith('.')) {
    return { isAvailable: false, error: 'Handle cannot start or end with period' };
  }

  if (normalizedHandle.startsWith('-') || normalizedHandle.endsWith('-')) {
    return { isAvailable: false, error: 'Handle cannot start or end with hyphen' };
  }

  // Consecutive special characters
  if (/__+/.test(normalizedHandle) || /\.\.+/.test(normalizedHandle) || /--+/.test(normalizedHandle)) {
    return { isAvailable: false, error: 'Handle cannot contain consecutive special characters' };
  }

  // Reserved handles
  if (RESERVED_HANDLES.has(normalizedHandle)) {
    return { isAvailable: false, error: 'This handle is reserved and cannot be used' };
  }

  return { isAvailable: true, normalizedHandle };
}

/**
 * Check handle availability with atomic database validation
 * This function should be used within a Firestore transaction for consistency
 */
export async function checkHandleAvailabilityInTransaction(
  transaction: Transaction,
  handle: string
): Promise<HandleValidationResult> {
  // First validate format
  const formatResult = validateHandleFormat(handle);
  if (!formatResult.isAvailable) {
    return formatResult;
  }

  const normalizedHandle = formatResult.normalizedHandle!;

  try {
    // Check both collections atomically within the transaction
    const [userQuery, handleDoc] = await Promise.all([
      // Check if any user already has this handle
      transaction.get(
        dbAdmin.collection('users')
          .where('handle', '==', normalizedHandle)
          .limit(1)
      ),
      // Check if handle is reserved in handles collection
      transaction.get(dbAdmin.collection('handles').doc(normalizedHandle))
    ]);

    // Handle is taken if either check returns results
    if (!userQuery.empty || handleDoc.exists) {
      return { 
        isAvailable: false, 
        error: 'This handle is already taken',
        normalizedHandle 
      };
    }

    return { 
      isAvailable: true, 
      normalizedHandle 
    };
  } catch (error) {
    logger.error('Error checking handle availability:', { error: String(error) });
    return { 
      isAvailable: false, 
      error: 'Unable to verify handle availability. Please try again.' 
    };
  }
}

/**
 * Reserve a handle atomically within a transaction
 * This should only be called after checkHandleAvailabilityInTransaction confirms availability
 */
export function reserveHandleInTransaction(
  transaction: Transaction,
  handle: string,
  userId: string,
  userEmail: string
): void {
  const now = new Date();
  
  // Reserve in handles collection
  transaction.set(dbAdmin.collection('handles').doc(handle), {
    userId,
    userEmail,
    reservedAt: now,
    handle // Store the handle for easier queries
  });
}

/**
 * Non-transactional handle availability check for API endpoints
 * This provides a quick check but should not be relied upon for final validation
 */
export async function checkHandleAvailability(handle: string): Promise<HandleValidationResult> {
  // First validate format
  const formatResult = validateHandleFormat(handle);
  if (!formatResult.isAvailable) {
    return formatResult;
  }

  const normalizedHandle = formatResult.normalizedHandle!;

  try {
    // Check both collections (but not atomically)
    const [userQuery, handleDoc] = await Promise.all([
      dbAdmin.collection('users')
        .where('handle', '==', normalizedHandle)
        .limit(1)
        .get(),
      dbAdmin.collection('handles').doc(normalizedHandle).get()
    ]);

    if (!userQuery.empty || handleDoc.exists) {
      return { 
        isAvailable: false, 
        error: 'This handle is already taken',
        normalizedHandle 
      };
    }

    return { 
      isAvailable: true, 
      normalizedHandle 
    };
  } catch (error) {
    logger.error('Error checking handle availability:', { error: String(error) });
    return { 
      isAvailable: false, 
      error: 'Unable to verify handle availability. Please try again.' 
    };
  }
}

/**
 * Release a handle reservation (for cleanup or error recovery)
 */
export async function releaseHandleReservation(handle: string): Promise<void> {
  try {
    await dbAdmin.collection('handles').doc(handle).delete();
  } catch (error) {
    logger.error('Error releasing handle reservation:', { error: String(error) });
    // Don't throw - this is cleanup, should not break the main flow
  }
}