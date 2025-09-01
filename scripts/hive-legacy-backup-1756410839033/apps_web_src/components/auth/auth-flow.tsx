"use client";

import AuthPageClient from '@/app/auth/AuthPageClient';

export function AuthFlow() {
  // This is not ideal. We should refactor AuthPageClient to be more reusable.
  // For now, we are just wrapping it.
  // A better approach would be to pass `handleEmailSubmit` to a more generic `EmailGate` component.
  return <AuthPageClient />;
} 