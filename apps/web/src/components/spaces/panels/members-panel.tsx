/**
 * Members Panel - Temporary stub for MVP
 * Will be fully implemented post-launch
 */

"use client";

import React from 'react';
import { Card } from '@hive/ui';

export const MembersPanel = ({ spaceId }: { spaceId: string }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Members</h2>
      <p className="text-[var(--hive-text-secondary)]">Members panel coming soon...</p>
    </Card>
  );
};

export default MembersPanel;
