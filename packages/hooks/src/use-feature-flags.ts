"use client";

import { useState, useEffect } from 'react';
import { getFeatureFlags, trackVariantEvent, type FeatureFlags } from '@hive/core';

export function useFeatureFlags(): FeatureFlags & { 
  trackEvent: (feature: keyof FeatureFlags, action: 'view' | 'interact' | 'complete' | 'abandon', metadata?: Record<string, unknown>) => void 
} {
  const [flags, setFlags] = useState<FeatureFlags>(getFeatureFlags('default'));
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check for user session in localStorage (matches the web app's auth pattern)
    const checkUserSession = () => {
      try {
        // Check for hive session (used in web app)
        const hiveSession = window.localStorage.getItem('hive_session');
        if (hiveSession) {
          const session = JSON.parse(hiveSession);
          if (session.user?.uid) {
            setUserId(session.user.uid);
            return;
          }
        }

        // Check for dev mode user
        const devAuthMode = window.localStorage.getItem('dev_auth_mode');
        const devUserData = window.localStorage.getItem('dev_user');
        if (devAuthMode === 'true' && devUserData) {
          const devUser = JSON.parse(devUserData);
          if (devUser.uid) {
            setUserId(devUser.uid);
            return;
          }
        }

        // Fallback to test user for development
        if (process.env.NODE_ENV === 'development') {
          setUserId('test-user-id');
          return;
        }
      } catch (error) {
        console.warn('Error checking user session for feature flags:', error);
      }

      setUserId(null);
    };

    checkUserSession();

    // Listen for storage changes to update user session
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'hive_session' || e.key === 'dev_user' || e.key === 'dev_auth_mode') {
        checkUserSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (userId) {
      const userFlags = getFeatureFlags(userId);
      setFlags(userFlags);
    } else {
      const defaultFlags = getFeatureFlags('default');
      setFlags(defaultFlags);
    }
  }, [userId]);

  const trackEvent = (feature: keyof FeatureFlags, action: 'view' | 'interact' | 'complete' | 'abandon', metadata?: Record<string, unknown>) => {
    if (userId) {
      trackVariantEvent({
        userId,
        variant: String(flags[feature]),
        feature,
        action,
        metadata,
      });
    }
  };

  return {
    ...flags,
    trackEvent,
  };
}

// Convenience hooks for specific features
export function useToolBuilderVariant() {
  const flags = useFeatureFlags();
  return {
    variant: flags.toolBuilderVariant,
    trackEvent: (action: 'view' | 'interact' | 'complete' | 'abandon', metadata?: Record<string, unknown>) => 
      flags.trackEvent('toolBuilderVariant', action, metadata),
  };
}

export function useNavigationVariant() {
  const flags = useFeatureFlags();
  return {
    variant: flags.navigationVariant,
    trackEvent: (action: 'view' | 'interact' | 'complete' | 'abandon', metadata?: Record<string, unknown>) => 
      flags.trackEvent('navigationVariant', action, metadata),
  };
}