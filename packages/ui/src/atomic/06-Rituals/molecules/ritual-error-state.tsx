'use client';

import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface RitualErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const RitualErrorState: React.FC<RitualErrorStateProps> = ({
  title = 'Failed to Load Ritual',
  message = 'Something went wrong while loading this ritual. Please try again.',
  onRetry,
  className,
  ...props
}) => {
  return (
    <Card
      className={cn(
        'border-red-500/20 bg-red-500/5 p-8 text-center',
        className
      )}
      {...props}
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
        <AlertCircle className="h-8 w-8 text-red-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-4 text-sm text-white/60">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </Card>
  );
};
