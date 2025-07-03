"use client";

import { useState } from 'react';
import AuthPageClient from '@/app/auth/AuthPageClient';

type AuthStep = 'email' | 'check_email';

export function AuthFlow() {
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep('check_email');
  };

  switch (step) {
    case 'email':
      // This is not ideal. We should refactor AuthPageClient to be more reusable.
      // For now, we are just wrapping it.
      // A better approach would be to pass `handleEmailSubmit` to a more generic `EmailGate` component.
      return <AuthPageClient />;
    case 'check_email':
      // Placeholder for the "Check Your Email" component
      return (
        <div>
          <h1>Check Your Email</h1>
          <p>We've sent a magic link to {email}.</p>
        </div>
      );
    default:
      return null;
  }
} 