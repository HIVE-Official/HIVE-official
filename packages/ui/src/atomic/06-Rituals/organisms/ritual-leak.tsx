'use client';

import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';

export interface LeakSubmission {
  id: string;
  hint: string;
  revealed?: boolean;
}

export interface RitualLeakProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  clues: LeakSubmission[];
  onReveal?: (id: string) => void;
}

export const RitualLeak: React.FC<RitualLeakProps> = ({
  title = 'Mystery Leak',
  clues,
  onReveal,
  ...props
}) => {
  return (
    <Card className="border-white/10 bg-white/5 p-5" {...props}>
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
      <div className="space-y-3">
        {clues.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-sm text-white/80">{c.hint}</div>
            <Button size="sm" variant="secondary" onClick={() => onReveal?.(c.id)} disabled={c.revealed}>
              {c.revealed ? 'Revealed' : 'Reveal'}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

