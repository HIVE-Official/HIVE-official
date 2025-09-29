/**
 * Campus Isolation Security Layer
 * Enforces data isolation between different university campuses
 * CRITICAL: Every Firebase query must use these validators
 */

import { Query, query, where, QueryConstraint } from 'firebase/firestore';
import { logger } from './structured-logger';

/**
 * Get the current campus ID for the user's session
 * In production, this MUST always return 'ub-buffalo' for UB launch
 */
export function getCurrentCampusId(): string {
  // For UB launch, hardcode to UB campus
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
    return 'ub-buffalo';
  }

  // In development, can be configured
  return process.env.NEXT_PUBLIC_CAMPUS_ID || 'ub-buffalo';
}

/**
 * Validate that a campus ID matches the current environment
 */
export function validateCampusAccess(requestedCampusId: string | undefined): boolean {
  const currentCampusId = getCurrentCampusId();

  if (!requestedCampusId) {
    logger.error('SECURITY: Missing campus ID in request');
    return false;
  }

  if (requestedCampusId !== currentCampusId) {
    logger.error('SECURITY: Campus isolation violation', {
      requested: requestedCampusId,
      current: currentCampusId
    });
    return false;
  }

  return true;
}

/**
 * Add campus isolation constraint to a Firestore query
 * MUST be used on every collection query
 */
export function withCampusIsolation<T extends Query<any>>(baseQuery: T): T {
  const campusId = getCurrentCampusId();
  return query(baseQuery, where('campusId', '==', campusId)) as T;
}

/**
 * Create campus isolation constraints for a query
 */
export function getCampusConstraints(): QueryConstraint[] {
  const campusId = getCurrentCampusId();
  return [where('campusId', '==', campusId)];
}

/**
 * Validate that a document belongs to the current campus
 */
export function validateDocumentCampus(doc: any): boolean {
  const campusId = getCurrentCampusId();

  if (!doc?.campusId) {
    logger.error('SECURITY: Document missing campus ID', { docId: doc?.id });
    return false;
  }

  if (doc.campusId !== campusId) {
    logger.error('SECURITY: Cross-campus data access attempted', {
      docCampus: doc.campusId,
      currentCampus: campusId,
      docId: doc.id
    });
    return false;
  }

  return true;
}

/**
 * Sanitize user data to ensure campus isolation
 */
export function sanitizeUserData(userData: any): any {
  const campusId = getCurrentCampusId();

  return {
    ...userData,
    campusId, // Always override with current campus
    schoolId: campusId,
    // Remove any sensitive cross-campus references
    crossCampusPermissions: undefined,
    globalAdmin: undefined
  };
}

/**
 * Check if a user's email belongs to the current campus
 */
export function validateEmailCampus(email: string): boolean {
  const campusId = getCurrentCampusId();
  const emailDomain = email.split('@')[1]?.toLowerCase();

  if (campusId === 'ub-buffalo') {
    return emailDomain === 'buffalo.edu';
  }

  // Add other campus validations as needed
  return false;
}

/**
 * Security audit function for campus violations
 */
export function auditCampusViolation(
  operation: string,
  details: Record<string, any>
): void {
  logger.error('CAMPUS_ISOLATION_VIOLATION', {
    operation,
    timestamp: new Date().toISOString(),
    currentCampus: getCurrentCampusId(),
    ...details
  });

  // In production, this should trigger alerts
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
    // Send to monitoring service
    // notifySecurityTeam({ type: 'campus_violation', operation, details });
  }
}