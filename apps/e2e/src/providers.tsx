"use client";

import type { PropsWithChildren } from "react";
import { AuthProvider } from "@auth/providers/AuthProvider";
import { OnboardingFlowProvider } from "@onboarding/providers/OnboardingFlowProvider";
import { ProfileProvider } from "@profile/providers/ProfileProvider";
import { createInMemoryProfileClient } from "@profile/services/profileClient";
import { defaultProfileBundle } from "@profile/sample";
import { ThemeProvider, Toaster, HiveMotionConfig } from "@hive/ui";

const profileClient = createInMemoryProfileClient(defaultProfileBundle);

export function E2EProviders({ children }: PropsWithChildren): JSX.Element {
  return (
    <AuthProvider>
      <OnboardingFlowProvider>
        <ProfileProvider client={profileClient}>
          <ThemeProvider>
            <HiveMotionConfig>
              {children}
              <Toaster />
            </HiveMotionConfig>
          </ThemeProvider>
        </ProfileProvider>
      </OnboardingFlowProvider>
    </AuthProvider>
  );
}
