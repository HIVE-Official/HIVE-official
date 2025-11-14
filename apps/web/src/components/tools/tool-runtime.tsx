"use client";

/**
 * Tool Runtime - Temporary stub for MVP
 * Will be fully implemented post-launch
 */

import React from 'react';
import type { ToolComposition } from '@/lib/element-system';

export interface ToolRuntimeProps {
  composition: ToolComposition;
  userId: string;
  mode: 'preview' | 'run' | 'embed';
  onExecutionResult?: (result: unknown) => void;
  onError?: (error: Error) => void;
}

export const ToolRuntime: React.FC<ToolRuntimeProps> = ({ composition, mode }) => {
  return (
    <div className="p-6 rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
      <h3 className="text-lg font-bold text-[var(--hive-text-primary)] mb-2">
        {composition.name}
      </h3>
      <p className="text-[var(--hive-text-secondary)] mb-4">{composition.description}</p>
      <p className="text-sm text-[var(--hive-text-tertiary)]">
        Runtime mode: {mode} (Coming soon...)
      </p>
    </div>
  );
};

export default ToolRuntime;
