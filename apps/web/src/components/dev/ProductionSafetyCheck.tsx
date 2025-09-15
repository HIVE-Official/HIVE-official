"use client";

import { useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { isLocalDevelopment, getEnvironmentName } from '@/lib/dev-utils';

/**
 * Production Safety Check Component
 * 
 * This component runs checks to ensure dev features are disabled in production
 * It will throw errors if any unsafe conditions are detected
 */
export function ProductionSafetyCheck() {
  useEffect(() => {
    const environment = getEnvironmentName();
    
    // Log environment for transparency
    // CRITICAL SAFETY CHECK: Verify no dev features in production
    if (environment === 'Production' || !isLocalDevelopment()) {
      // Check for any accidentally exposed dev features
      const unsafeConditions = [];
      
      // Check window object for dev flags
      if (typeof window !== 'undefined') {
        if ((window as any).__DEV__) {
          unsafeConditions.push('__DEV__ flag is set');
        }
        if ((window as any).DEV_MODE) {
          unsafeConditions.push('DEV_MODE flag is set');
        }
        if ((window as any).SKIP_AUTH) {
          unsafeConditions.push('SKIP_AUTH flag is set');
        }
      }
      
      // Check localStorage for dev flags
      if (typeof localStorage !== 'undefined') {
        if (localStorage.getItem('dev_mode') === 'true') {
          unsafeConditions.push('dev_mode in localStorage');
          localStorage.removeItem('dev_mode'); // Remove it immediately
        }
        if (localStorage.getItem('skip_auth') === 'true') {
          unsafeConditions.push('skip_auth in localStorage');
          localStorage.removeItem('skip_auth'); // Remove it immediately
        }
      }
      
      // If any unsafe conditions found in production, log error (don't throw to not break app)
      if (unsafeConditions.length > 0 && environment === 'Production') {
        logger.error('⚠️ SECURITY WARNING: Development features detected in production:', unsafeConditions);
        // Could also send this to error tracking service
      }
    }
    
    // In development, log what features are enabled
    if (isLocalDevelopment()) {
      
    }
  }, []);
  
  return null; // This component doesn't render anything
}

/**
 * Hook to ensure we're in development
 * Throws error if used in production
 */
export function useDevOnly(featureName: string) {
  useEffect(() => {
    if (!isLocalDevelopment()) {
      throw new Error(`Feature "${featureName}" attempted to run in production! This is a critical security issue.`);
    }
  }, [featureName]);
  
  return isLocalDevelopment();
}