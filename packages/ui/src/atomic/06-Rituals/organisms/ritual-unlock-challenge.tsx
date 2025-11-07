'use client';

import * as React from 'react';
import { Card } from '../atoms/card';
import { Button } from '../atoms/button';
import { Badge } from '../atoms/badge';
import { PercentBar } from '../atoms/percent-bar';
import { cn } from '../../lib/utils';

export interface UnlockMilestone {
  threshold: number;
  unlock: string;
  message: string;
  completed: boolean;
}

export interface UnlockReward {
  type: 'ritual' | 'feature' | 'content' | 'prize';
  name: string;
  description: string;
  teaser: string;
  preview?: string;
}

export interface RecentActivity {
  id: string;
  userName: string;
  action: string;
  timestamp: string;
}

export interface RitualUnlockChallengeProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  goalMetric: string;
  targetValue: number;
  currentValue: number;
  deadline?: string;
  reward: UnlockReward;
  milestones?: UnlockMilestone[];
  recentActivity?: RecentActivity[];
  onContribute?: () => void;
  encouragement?: string;
}

export const RitualUnlockChallenge: React.FC<RitualUnlockChallengeProps> = ({
  title = 'Unlock Challenge',
  description,
  goalMetric,
  targetValue,
  currentValue,
  deadline,
  reward,
  milestones = [],
  recentActivity = [],
  onContribute,
  encouragement = 'We can do this!',
  className,
  ...props
}) => {
  const percentComplete = Math.min(100, Math.round((currentValue / targetValue) * 100));
  const remaining = Math.max(0, targetValue - currentValue);
  const isCompleted = currentValue >= targetValue;

  return (
    <Card className={cn('border-white/10 bg-white/5 p-5', className)} {...props}>
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs uppercase tracking-[0.18em] text-white/50">
            Unlock Challenge
          </div>
          {isCompleted && (
            <Badge variant="default" className="bg-green-500/20 text-green-400">
              ✅ Complete
            </Badge>
          )}
        </div>
        {deadline && !isCompleted && (
          <div className="text-xs text-white/60">⏰ {deadline}</div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="mt-1 text-sm text-white/70">{description}</p>}

      {/* Locked Reward */}
      <div className="my-4 rounded-lg border border-white/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-xs font-medium text-yellow-400">🔒 LOCKED REWARD</div>
          {reward.preview && (
            <div className="h-8 w-8 rounded border border-white/20 bg-white/10" />
          )}
        </div>
        <div className="font-semibold text-white">{reward.name}</div>
        <div className="mt-1 text-xs text-white/60">{reward.teaser}</div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm text-white/80">Campus Progress</div>
          <div className="text-sm font-bold text-white">
            {currentValue.toLocaleString()} / {targetValue.toLocaleString()} {goalMetric}
          </div>
        </div>
        <PercentBar value={percentComplete} />
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-white/60">{percentComplete}%</span>
          {!isCompleted && (
            <span className="font-medium text-[var(--ritual-urgent,#FF6B6B)]">
              Need {remaining.toLocaleString()} more!
            </span>
          )}
        </div>
      </div>

      {/* Milestones */}
      {milestones.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-xs font-medium text-white/60">Milestones</div>
          <div className="space-y-2">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex items-center gap-2 rounded border p-2 text-xs',
                  milestone.completed
                    ? 'border-green-500/40 bg-green-500/10 text-green-400'
                    : 'border-white/10 bg-white/5 text-white/60'
                )}
              >
                <div className="shrink-0">
                  {milestone.completed ? '✅' : `${milestone.threshold}`}
                </div>
                <div className="flex-1 truncate">
                  {milestone.completed ? milestone.message : milestone.unlock}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-xs font-medium text-white/60">Recent Activity</div>
          <div className="space-y-1">
            {recentActivity.slice(0, 3).map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-2 text-xs text-white/50"
              >
                <div className="h-6 w-6 rounded-full bg-white/10" />
                <div className="flex-1 truncate">
                  <span className="font-medium text-white/70">{activity.userName}</span>{' '}
                  {activity.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {!isCompleted && (
        <>
          <div className="mb-3 text-center text-sm font-medium text-white/80">
            {encouragement}
          </div>
          {onContribute && (
            <Button onClick={onContribute} className="w-full">
              Contribute Now
            </Button>
          )}
        </>
      )}

      {isCompleted && (
        <div className="rounded-lg border border-green-500/40 bg-green-500/10 p-3 text-center">
          <div className="mb-1 text-sm font-bold text-green-400">
            🎉 Goal Achieved!
          </div>
          <div className="text-xs text-white/70">{reward.description}</div>
        </div>
      )}
    </Card>
  );
};
