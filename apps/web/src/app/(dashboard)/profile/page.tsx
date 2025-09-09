"use client";

import React from 'react';
import { ProfilePage } from '../../../components/profile/profile-page';
import { ProfileErrorBoundary } from '../../../components/profile/profile-error-boundary';

export default function HiveProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <ProfileErrorBoundary 
        fallbackTitle="Profile Dashboard Error"
        showLogout={true}
        onRetry={() => window.location.reload()}
      >
        <ProfilePage />
      </ProfileErrorBoundary>
    </div>
  );
}