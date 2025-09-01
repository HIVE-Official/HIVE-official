"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SpaceRequestForm } from '@hive/ui';
import { type SpaceType } from '@hive/core';

export default function SpaceRequestPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSpaceRequest = async (data: {
    spaceId: string;
    spaceName: string;
    spaceType: SpaceType;
    claimReason: string;
    userRole: 'student' | 'faculty';
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/spaces/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit space request');
      }

      // Redirect to success page or back to onboarding
      router.push(`/spaces/request/success?spaceId=${result.spaceId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SpaceRequestForm
      onSubmit={handleSpaceRequest}
      onBack={handleBack}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
}