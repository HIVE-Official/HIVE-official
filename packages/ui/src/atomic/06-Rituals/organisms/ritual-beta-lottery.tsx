'use client';

import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { Badge } from '../../00-Global/atoms/badge';
import { cn } from '@/lib/utils';

export interface LotteryFeature {
  id: string;
  name: string;
  description: string;
  teaser: {
    video?: string;
    images: string[];
    demo?: string;
  };
}

export interface RitualBetaLotteryProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  feature: LotteryFeature;
  slots: number;
  applicants: number;
  entryDeadline?: string;
  drawingDate?: string;
  hasEntered?: boolean;
  isWinner?: boolean;
  isDrawn?: boolean;
  onEnter?: () => void;
  onViewDemo?: () => void;
}

export const RitualBetaLottery: React.FC<RitualBetaLotteryProps> = ({
  title = 'Beta Lottery',
  description,
  feature,
  slots,
  applicants,
  entryDeadline,
  drawingDate,
  hasEntered = false,
  isWinner = false,
  isDrawn = false,
  onEnter,
  onViewDemo,
  className,
  ...props
}) => {
  const oddsPercent = applicants > 0 ? Math.round((slots / applicants) * 100) : 100;

  return (
    <Card className={cn('border-white/10 bg-white/5 p-5', className)} {...props}>
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.18em] text-white/50">Beta Lottery</div>
        {isDrawn && (
          <Badge variant={isWinner ? 'default' : 'secondary'}>
            {isWinner ? '🎉 Winner!' : 'Drawing Complete'}
          </Badge>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white">{title || feature.name}</h3>
      {description && <p className="mt-1 text-sm text-white/70">{description}</p>}

      {/* Feature Showcase */}
      <div className="my-4 rounded-lg border border-white/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-semibold text-white">{feature.name}</div>
          {feature.teaser.images.length > 0 && (
            <div className="flex gap-1">
              {feature.teaser.images.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
                  className="h-8 w-8 rounded border border-white/20 bg-white/10"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <p className="text-xs text-white/60">{feature.description}</p>
      </div>

      {/* Stats */}
      {!isDrawn && (
        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-xl font-bold text-yellow-400">{slots}</div>
            <div className="text-xs text-white/50">Winners</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-xl font-bold text-blue-400">{applicants}</div>
            <div className="text-xs text-white/50">Entered</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-xl font-bold text-green-400">{oddsPercent}%</div>
            <div className="text-xs text-white/50">Odds</div>
          </div>
        </div>
      )}

      {/* Timing */}
      {!isDrawn && (
        <div className="mb-4 space-y-2">
          {entryDeadline && (
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2 text-xs">
              <span className="text-white/60">Entry Deadline</span>
              <span className="font-medium text-white">⏰ {entryDeadline}</span>
            </div>
          )}
          {drawingDate && (
            <div className="flex items-center justify-between rounded border border-purple-500/20 bg-purple-500/10 p-2 text-xs">
              <span className="text-white/60">Drawing</span>
              <span className="font-medium text-purple-400">🎟️ {drawingDate}</span>
            </div>
          )}
        </div>
      )}

      {/* Winner Status */}
      {isDrawn && isWinner && (
        <div className="mb-4 rounded-lg border border-green-500/40 bg-green-500/10 p-4 text-center">
          <div className="mb-2 text-2xl">🎉</div>
          <div className="mb-1 font-bold text-green-400">Congratulations!</div>
          <div className="text-xs text-white/70">
            You won 24h beta access to {feature.name}
          </div>
        </div>
      )}

      {isDrawn && !isWinner && (
        <div className="mb-4 rounded-lg border border-white/20 bg-white/5 p-4 text-center">
          <div className="mb-1 text-sm text-white/60">Not selected this time</div>
          <div className="text-xs text-white/50">
            Check back for future opportunities
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {!isDrawn && !hasEntered && onEnter && (
          <Button onClick={onEnter} className="flex-1">
            🎟️ Enter Lottery
          </Button>
        )}
        {!isDrawn && hasEntered && (
          <div className="flex-1 rounded-lg border border-blue-500/40 bg-blue-500/10 py-2 text-center text-sm font-medium text-blue-400">
            ✅ Entered
          </div>
        )}
        {feature.teaser.demo && onViewDemo && (
          <Button onClick={onViewDemo} variant="outline" className="flex-1">
            Watch Demo
          </Button>
        )}
      </div>
    </Card>
  );
};
