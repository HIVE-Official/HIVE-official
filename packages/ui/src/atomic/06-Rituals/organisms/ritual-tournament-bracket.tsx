'use client';

import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { cn } from '@/lib/utils';

export interface TournamentMatchup {
  id: string;
  round: number;
  a: string;
  b: string;
  votesA?: number;
  votesB?: number;
}

export interface RitualTournamentBracketProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  matchups: TournamentMatchup[];
  currentRound?: number;
  onVote?: (matchupId: string, choice: 'a' | 'b') => void;
}

export const RitualTournamentBracket: React.FC<RitualTournamentBracketProps> = ({
  title = 'Tournament',
  matchups,
  currentRound,
  onVote,
  className,
  ...props
}) => {
  const rounds = React.useMemo(() => {
    const grouped: Record<number, TournamentMatchup[]> = {};
    for (const m of matchups) {
      grouped[m.round] = grouped[m.round] ? [...grouped[m.round], m] : [m];
    }
    return Object.entries(grouped)
      .map(([r, ms]) => ({ round: Number(r), matchups: ms }))
      .sort((a, b) => a.round - b.round);
  }, [matchups]);

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rounds.map(({ round, matchups }) => (
          <Card key={round} className={cn('border-white/10 bg-white/5 p-4', currentRound === round && 'ring-1 ring-[var(--hive-brand-primary)]/40')}>
            <div className="mb-2 text-sm text-white/70">Round {round}</div>
            <div className="space-y-3">
              {matchups.map((m) => (
                <div key={m.id} className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/30 p-3">
                  <div className="flex-1 text-white/90">{m.a}</div>
                  <span className="px-2 text-xs text-white/50">vs</span>
                  <div className="flex-1 text-right text-white/90">{m.b}</div>
                  {onVote && (
                    <div className="ml-3 flex gap-1">
                      <Button size="sm" variant="secondary" onClick={() => onVote(m.id, 'a')}>Vote A</Button>
                      <Button size="sm" variant="secondary" onClick={() => onVote(m.id, 'b')}>Vote B</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

