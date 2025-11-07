'use client';

import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';

export interface RitualRuleInversionProps extends React.HTMLAttributes<HTMLDivElement> {
  ruleDescription: string;
  notes?: string;
}

export const RitualRuleInversion: React.FC<RitualRuleInversionProps> = ({
  ruleDescription,
  notes,
  ...props
}) => {
  return (
    <Card className="border-amber-400/30 bg-amber-400/10 p-5" {...props}>
      <div className="text-xs uppercase tracking-widest text-amber-300">Rule Inversion</div>
      <h3 className="mt-1 text-lg font-semibold text-amber-100">{ruleDescription}</h3>
      {notes && <p className="mt-2 text-sm text-amber-200/80">{notes}</p>}
    </Card>
  );
};

