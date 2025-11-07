'use client';

import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { PercentBar } from '../atoms/percent-bar';

export interface FeatureUsageStats {
  installs?: number;
  activeUsers?: number;
  completionRate?: number; // 0-100
}

export interface RitualFeatureDropProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  countdownLabel?: string;
  onUnlock?: () => void;
  stats?: FeatureUsageStats;
}

export const RitualFeatureDrop: React.FC<RitualFeatureDropProps> = ({
  title,
  description,
  countdownLabel,
  onUnlock,
  stats,
  ...props
}) => {
  const percent = Math.max(0, Math.min(100, Math.round(stats?.completionRate ?? 0)));

  return (
    <Card className="border-white/10 bg-white/5 p-5" {...props}>
      <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">Feature Drop</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="mt-1 text-sm text-white/70">{description}</p>}
      {countdownLabel && (
        <p className="mt-2 text-xs text-white/60">{countdownLabel}</p>
      )}
      <div className="mt-4">
        <PercentBar value={percent} />
        <div className="mt-1 text-xs text-white/60">{percent}% unlocked</div>
      </div>
      <div className="mt-4">
        <Button onClick={onUnlock}>Unlock</Button>
      </div>
    </Card>
  );
};

