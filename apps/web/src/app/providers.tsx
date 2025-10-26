// Bounded Context Owner: Identity & Access Management Guild
"use client";

import type { PropsWithChildren } from "react";
import { AuthProvider } from "@auth/providers/AuthProvider";
import { OnboardingFlowProvider } from "@onboarding/providers/OnboardingFlowProvider";
import { ThemeProvider, Toaster } from "@hive/ui";
import { ProfileProvider } from "@profile";

export const Providers = ({ children }: PropsWithChildren) => (
  <AuthProvider>
    <OnboardingFlowProvider>
      <ProfileProvider>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </ProfileProvider>
    </OnboardingFlowProvider>
  </AuthProvider>
);
