"use client";

import React from 'react';
import { ProfileFoundationCards } from '../../../components/profile/foundation-cards/ProfileFoundationCards';
import { ProfileErrorBoundaryEnhanced } from '../../../components/profile/profile-error-boundary-enhanced';

export default function HiveProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <ProfileErrorBoundaryEnhanced 
        fallbackTitle="Profile Dashboard Error"
        showLogout={true}
        onRetry={() => window.location.reload()}
      >
        <ProfileFoundationCards />
      </ProfileErrorBoundaryEnhanced>
    </div>
  );
}