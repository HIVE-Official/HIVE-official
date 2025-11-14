/**
 * Unified Space Interface - Temporary stub for MVP
 * Will be fully implemented post-launch
 */

"use client";

import React from 'react';
import { Card } from '@hive/ui';

export const UnifiedSpaceInterface = ({ spaceId, slug }: { spaceId?: string; slug?: string }) => {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-4">Space</h1>
        <p className="text-[var(--hive-text-secondary)]">Space interface coming soon...</p>
        <p className="text-[var(--hive-text-muted)] text-sm mt-2">Space ID: {spaceId || slug}</p>
      </Card>
    </div>
  );
};

export default UnifiedSpaceInterface;
