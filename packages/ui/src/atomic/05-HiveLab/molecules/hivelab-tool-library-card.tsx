import * as React from 'react';
import { Card, CardContent, Button, Badge } from '../atoms';

export interface HiveLabToolLibraryCardProps {
  name: string;
  description: string;
  category?: string;
  installs?: number;
  rating?: number;
  onUse?: () => void;
}

export function HiveLabToolLibraryCard({ name, description, category, installs, rating, onUse }: HiveLabToolLibraryCardProps) {
  return (
    <Card className="bg-hive-background-tertiary border-hive-border-default h-full flex flex-col">
      <CardContent className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-white truncate" title={name}>{name}</div>
          {category && <Badge tone="muted" variant="pill">{category}</Badge>}
        </div>
        <div className="text-sm text-hive-text-tertiary line-clamp-2">{description}</div>
        <div className="mt-auto flex items-center justify-between text-xs text-hive-text-tertiary">
          <span>{typeof installs === 'number' ? `${installs} installs` : ''}</span>
          <span>{typeof rating === 'number' ? `★ ${rating.toFixed(1)}` : ''}</span>
        </div>
        <Button size="sm" className="mt-2" onClick={onUse}>Use template</Button>
      </CardContent>
    </Card>
  );
}

HiveLabToolLibraryCard.displayName = 'HiveLabToolLibraryCard';

