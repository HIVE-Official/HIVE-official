'use client';

import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface RitualEmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const RitualEmptyState: React.FC<RitualEmptyStateProps> = ({
  icon = '🎭',
  title = 'No Rituals Yet',
  message = 'Check back soon for campus-wide events and competitions.',
  actionLabel,
  onAction,
  className,
  ...props
}) => {
  return (
    <Card
      className={cn('border-white/10 bg-white/5 p-12 text-center', className)}
      {...props}
    >
      <div className="mb-4 text-6xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-4 text-sm text-white/60">{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          <Sparkles className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};
