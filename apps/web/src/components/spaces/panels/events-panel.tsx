/**
 * Events Panel - Temporary stub for MVP
 * Will be fully implemented post-launch
 */

"use client";

import React from 'react';
import { Card } from '@hive/ui';

export const EventsPanel = ({ spaceId }: { spaceId: string }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Events</h2>
      <p className="text-[var(--hive-text-secondary)]">Events panel coming soon...</p>
    </Card>
  );
};

export default EventsPanel;
