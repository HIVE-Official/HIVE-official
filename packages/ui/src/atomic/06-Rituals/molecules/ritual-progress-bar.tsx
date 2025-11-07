'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Progress } from '../atoms/progress';
import { CheckCircleIcon } from '../atoms';

export interface RitualMilestone {
  percentage: number;
  label: string;
  isCompleted: boolean;
}

export interface RitualProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number; // 0-100
  milestones?: RitualMilestone[];
  showPercentage?: boolean;
  label?: string;
  variant?: 'default' | 'compact';
}

const defaultMilestones: RitualMilestone[] = [
  { percentage: 25, label: '25%', isCompleted: false },
  { percentage: 50, label: '50%', isCompleted: false },
  { percentage: 75, label: '75%', isCompleted: false },
  { percentage: 100, label: '100%', isCompleted: false },
];

export const RitualProgressBar = React.forwardRef<HTMLDivElement, RitualProgressBarProps>(
  (
    {
      progress,
      milestones = defaultMilestones,
      showPercentage = true,
      label,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    // Clamp progress between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progress));

    // Update milestones based on current progress
    const updatedMilestones = milestones.map((milestone) => ({
      ...milestone,
      isCompleted: clampedProgress >= milestone.percentage,
    }));

    const isCompact = variant === 'compact';

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-3', className)}
        {...props}
      >
        {/* Label and Percentage */}
        {(label || showPercentage) && (
          <div className="flex items-center justify-between gap-2">
            {label && (
              <span className={cn(
                'font-semibold text-[var(--hive-text-primary)]',
                isCompact ? 'text-xs' : 'text-sm'
              )}>
                {label}
              </span>
            )}
            {showPercentage && (
              <span className={cn(
                'font-bold text-[var(--hive-brand-primary)]',
                isCompact ? 'text-xs' : 'text-sm'
              )}>
                {Math.round(clampedProgress)}%
              </span>
            )}
          </div>
        )}

        {/* Progress Bar Container */}
        <div className="relative">
          {/* Progress Bar */}
          <Progress
            value={clampedProgress}
            className={cn(
              'h-3 bg-[var(--hive-background-tertiary)] border border-[color-mix(in_srgb,var(--hive-border-default) 50%,transparent)]',
              isCompact && 'h-2'
            )}
            indicatorClassName="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] shadow-[0_0_12px_rgba(255,215,0,0.4)]"
          />

          {/* Milestone Markers */}
          {!isCompact && updatedMilestones.length > 0 && (
            <div className="absolute inset-0 flex items-center">
              {updatedMilestones.map((milestone) => (
                <div
                  key={milestone.percentage}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${milestone.percentage}%`, transform: 'translateX(-50%)' }}
                >
                  {/* Marker Dot */}
                  <div
                    className={cn(
                      'z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-240',
                      milestone.isCompleted
                        ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)] shadow-[0_0_8px_rgba(255,215,0,0.6)]'
                        : 'border-[var(--hive-border-default)] bg-[var(--hive-background-tertiary)]'
                    )}
                  >
                    {milestone.isCompleted && (
                      <CheckCircleIcon className="h-3 w-3 text-black" />
                    )}
                  </div>

                  {/* Marker Label */}
                  <span
                    className={cn(
                      'mt-2 text-[10px] font-medium uppercase tracking-[0.16em]',
                      milestone.isCompleted
                        ? 'text-[var(--hive-brand-primary)]'
                        : 'text-[var(--hive-text-tertiary)]'
                    )}
                  >
                    {milestone.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Milestone Labels Row (Compact Variant) */}
        {isCompact && updatedMilestones.length > 0 && (
          <div className="flex items-center justify-between">
            {updatedMilestones.map((milestone) => (
              <span
                key={milestone.percentage}
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.16em]',
                  milestone.isCompleted
                    ? 'text-[var(--hive-brand-primary)]'
                    : 'text-[var(--hive-text-tertiary)]'
                )}
              >
                {milestone.label}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

RitualProgressBar.displayName = 'RitualProgressBar';
