"use client";

import { useMemo } from "react";
import { useAuth } from "@auth";
import { useOnboardingFlow } from "@onboarding/hooks/useOnboardingFlow";

/**
 * Centralized leader posture resolver for the app shell.
 * Replace with real role/governance lookup when available.
 */
export function useLeaderPosture(): boolean {
  const { state: authState } = useAuth();
  const { state: obState } = useOnboardingFlow();

  return useMemo(() => {
    if (authState.status === "onboarding") {
      const draft = obState.submission?.leadership;
      return Boolean(
        draft?.isLeader || (draft?.spaces && draft.spaces.length > 0) || (draft?.classCodes && draft.classCodes.length > 0)
      );
    }
    if (authState.userType && authState.userType !== "student") return true;
    return false;
  }, [authState.status, authState.userType, obState.submission]);
}

