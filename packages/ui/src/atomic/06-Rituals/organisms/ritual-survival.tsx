'use client';

import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { Badge } from '../../00-Global/atoms/badge';
import { cn } from '../../../lib/utils';

export interface SurvivalMatchup {
  id: string;
  competitor1: { id: string; name: string; votes: number };
  competitor2: { id: string; name: string; votes: number };
  status: 'upcoming' | 'active' | 'completed';
  eliminated?: string;
}

export interface RitualSurvivalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  roundName?: string;
  timeRemaining?: string;
  currentMatchups: SurvivalMatchup[];
  eliminatedCount?: number;
  survivorsCount?: number;
  onVote?: (matchupId: string, competitorId: string) => void;
  isLive?: boolean;
}

export const RitualSurvival: React.FC<RitualSurvivalProps> = ({
  title = 'Survival Mode',
  roundName = 'Round 1',
  timeRemaining,
  currentMatchups,
  eliminatedCount = 0,
  survivorsCount = 0,
  onVote,
  isLive = false,
  className,
  ...props
}) => {
  return (
    <Card className={cn('border-white/10 bg-white/5 p-5', className)} {...props}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {isLive && (
              <Badge variant="destructive" className="animate-pulse">
                ⚡ LIVE
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-white/60">{roundName}</p>
        </div>
        {timeRemaining && (
          <div className="text-right">
            <div className="text-2xl font-bold text-[var(--ritual-urgent,#FF6B6B)]">
              {timeRemaining}
            </div>
            <div className="text-xs text-white/50">remaining</div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center">
          <div className="text-2xl font-bold text-red-400">❌ {eliminatedCount}</div>
          <div className="text-xs text-white/60">Eliminated</div>
        </div>
        <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-center">
          <div className="text-2xl font-bold text-green-400">✅ {survivorsCount}</div>
          <div className="text-xs text-white/60">Advancing</div>
        </div>
      </div>

      {/* Live Matchups */}
      <div className="space-y-3">
        {currentMatchups.map((matchup) => (
          <div
            key={matchup.id}
            className={cn(
              'rounded-lg border p-3',
              matchup.status === 'active'
                ? 'border-yellow-500/40 bg-yellow-500/5'
                : 'border-white/10 bg-white/5'
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <Badge
                variant={matchup.status === 'active' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {matchup.status === 'active' ? '🔥 Active' : matchup.status}
              </Badge>
            </div>

            {/* Competitors */}
            <div className="grid grid-cols-2 gap-2">
              {/* Competitor 1 */}
              <div
                className={cn(
                  'rounded border p-2',
                  matchup.eliminated === matchup.competitor1.id
                    ? 'border-red-500/40 bg-red-500/10 opacity-50'
                    : 'border-white/20 bg-black/30'
                )}
              >
                <div className="mb-1 truncate text-sm font-medium text-white">
                  {matchup.competitor1.name}
                </div>
                <div className="mb-2 text-xl font-bold text-white/90">
                  {matchup.competitor1.votes} votes
                </div>
                {matchup.status === 'active' && onVote && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => onVote(matchup.id, matchup.competitor1.id)}
                    disabled={matchup.eliminated === matchup.competitor1.id}
                  >
                    Vote
                  </Button>
                )}
              </div>

              {/* VS Divider */}
              <div className="flex items-center justify-center">
                <div className="text-xs font-bold text-white/40">VS</div>
              </div>

              {/* Competitor 2 */}
              <div
                className={cn(
                  'rounded border p-2',
                  matchup.eliminated === matchup.competitor2.id
                    ? 'border-red-500/40 bg-red-500/10 opacity-50'
                    : 'border-white/20 bg-black/30'
                )}
              >
                <div className="mb-1 truncate text-sm font-medium text-white">
                  {matchup.competitor2.name}
                </div>
                <div className="mb-2 text-xl font-bold text-white/90">
                  {matchup.competitor2.votes} votes
                </div>
                {matchup.status === 'active' && onVote && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => onVote(matchup.id, matchup.competitor2.id)}
                    disabled={matchup.eliminated === matchup.competitor2.id}
                  >
                    Vote
                  </Button>
                )}
              </div>
            </div>

            {matchup.eliminated && (
              <div className="mt-2 text-center text-xs text-red-400">
                {matchup.competitor1.id === matchup.eliminated
                  ? matchup.competitor1.name
                  : matchup.competitor2.name}{' '}
                ELIMINATED
              </div>
            )}
          </div>
        ))}
      </div>

      {currentMatchups.length === 0 && (
        <div className="py-8 text-center text-sm text-white/50">
          No active matchups. Check back soon!
        </div>
      )}
    </Card>
  );
};
