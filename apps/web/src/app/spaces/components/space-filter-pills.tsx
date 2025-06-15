'use client';

import { type SpaceType } from '@hive/core';
import { Button } from '@hive/ui';
import { cn } from '@/lib/utils';

const spaceFilters: { name: string; type: SpaceType | 'all' }[] = [
  { name: 'All', type: 'all' },
  { name: 'Major', type: 'major' },
  { name: 'Residential', type: 'residential' },
  { name: 'Interest', type: 'interest' },
  { name: 'Creative', type: 'creative' },
  { name: 'Organizations', type: 'organization' },
];

interface SpaceFilterPillsProps {
  activeFilter: SpaceType | 'all';
  onFilterChange: (filter: SpaceType | 'all') => void;
}

export function SpaceFilterPills({ activeFilter, onFilterChange }: SpaceFilterPillsProps) {
  const handleFilterClick = (filter: SpaceType | 'all') => {
    onFilterChange(filter);
  };

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      {spaceFilters.map((filter) => (
        <Button
          key={filter.type}
          variant="ghost"
          size="sm"
          onClick={() => handleFilterClick(filter.type)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 whitespace-nowrap',
            activeFilter === filter.type
              ? 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 border border-yellow-400/20'
              : 'text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent',
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
} 