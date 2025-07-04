"use client";

import React, { useState } from 'react';
import { UBEmailPopup } from './ub-email-popup';
import { Button } from '../button';

/**
 * Demo component to showcase the UB Email Popup functionality
 * This component demonstrates:
 * - Opening/closing the popup
 * - Handling successful email submission
 * - Integration with the existing auth flow
 */
export const UBEmailDemo: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState<string | null>(null);

  const handleEmailSuccess = (email: string) => {
    setLastSubmittedEmail(email);
    console.log('✅ Email submitted successfully:', email);
    // In a real app, this would trigger navigation to the next step
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <h1 className="text-h1 font-display text-white">
            UB Email Entry
          </h1>
          <p className="text-body text-muted">
            Demonstration of the University at Buffalo email entry popup component
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="ritual"
            size="lg"
            onClick={() => setIsPopupOpen(true)}
          >
            Open UB Email Popup
          </Button>

          {lastSubmittedEmail && (
            <div className="bg-surface border border-accent/20 rounded-lg p-4 text-left">
              <h3 className="text-h4 font-display text-white mb-2">
                Last Submission
              </h3>
              <p className="text-body text-muted">
                Email: <span className="text-white font-medium">{lastSubmittedEmail}</span>
              </p>
              <p className="text-caption text-muted mt-2">
                Magic link sent! Check your email to continue.
              </p>
            </div>
          )}

          <div className="text-caption text-muted space-y-1">
            <p>Features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>UB-specific email validation (buffalo.edu)</li>
              <li>Brand-consistent design system</li>
              <li>Firebase mock auth support</li>
              <li>Accessible keyboard navigation</li>
              <li>Responsive layout</li>
            </ul>
          </div>
        </div>
      </div>

      <UBEmailPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onSuccess={handleEmailSuccess}
      />
    </div>
  );
};