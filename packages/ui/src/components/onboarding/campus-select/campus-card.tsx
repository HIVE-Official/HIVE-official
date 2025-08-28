import React from 'react';
import { Badge } from '../../badge';
import { cn } from '../lib/utils';

export interface CampusCardProps {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'coming_soon';
  remainingSpots?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CampusCard = ({
  name,
  domain,
  status,
  remainingSpots,
  selected,
  onClick,
  className
}: CampusCardProps) => {
  const isActive = status === 'active';
  
  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={cn(
        'group relative w-full rounded-xl border p-4 transition-all',
        'hover:border-accent/50 hover:shadow-md',
        selected && 'border-accent bg-accent/5',
        !isActive && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-muted-foreground">{domain}</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {status === 'coming_soon' ? (
            <Badge variant="secondary" className="border-border text-muted-foreground">
              Coming Soon
            </Badge>
          ) : remainingSpots !== undefined ? (
            <Badge variant="secondary" className="border-accent/50 text-accent">
              {remainingSpots} spots left
            </Badge>
          ) : null}
        </div>
      </div>
    </button>
  );
}; 