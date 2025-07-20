"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@hive/auth-logic';
import { getFeatureFlags, trackVariantEvent, type FeatureFlags } from '@hive/core';

export function useFeatureFlags(): FeatureFlags & { 
  trackEvent: (feature: keyof FeatureFlags, action: 'view' | 'interact' | 'complete' | 'abandon', metadata?: Record<string, unknown>) => void 
} {
  const { user } = useAuth();
  const [flags, setFlags] = useState<FeatureFlags>(getFeatureFlags('default'));

  useEffect(() => {
    if (user?.uid) {
      const userFlags = getFeatureFlags(user.uid);
      setFlags(userFlags);
    }
  }, [user?.uid]);

  const trackEvent = (feature: keyof FeatureFlags, action: 'view' | 'interact' | 'complete' | 'abandon', metadata?: Record<string, unknown>) => {
    if (user?.uid) {
      trackVariantEvent({
        userId: user.uid,
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