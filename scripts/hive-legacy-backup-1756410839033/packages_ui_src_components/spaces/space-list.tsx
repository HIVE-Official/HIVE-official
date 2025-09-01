/**
 * SpaceList - Simple, purpose-built space browsing
 * 
 * Replaces the AI "CompleteHIVESpacesSystem" with focused components.
 * Students just want to find and join spaces - that's it.
 */

'use client';

import React, { useState } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SpaceCard, SpaceCardCompact, SpaceCardSkeleton, Space } from './simple-space-card';

export interface SpaceListProps {
  spaces: Space[];
  loading?: boolean;
  onJoinSpace?: (spaceId: string) => void;
  onViewSpace?: (spaceId: string) => void;
  userSpaceIds?: string[];     // Spaces the user has already joined
  showSearch?: boolean;
  showViewToggle?: boolean;
  className?: string;
}

export function SpaceList({
  spaces,
  loading = false,
  onJoinSpace,
  onViewSpace,
  userSpaceIds = [],
  showSearch = true,
  showViewToggle = true,
  className
}: SpaceListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filter spaces based on search and category
  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = !searchQuery || 
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || space.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Spaces' },
    { value: 'academic', label: 'Academic' },
    { value: 'residential', label: 'Residential' },
    { value: 'social', label: 'Social' },
    { value: 'professional', label: 'Professional' }
  ];

  if (loading) {
    return (
      <div className={cn("space-y-6", className)}>
        {showSearch && (
          <div className="space-y-4">
            <div className="h-10 bg-gray-800 rounded animate-pulse" />
            <div className="flex gap-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-8 bg-gray-800 rounded animate-pulse w-20" />
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {[1,2,3,4,5,6].map(i => (
            <SpaceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search and filters */}
      {showSearch && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <InputEnhanced
                type="text"
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {showViewToggle && (
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <ButtonEnhanced
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none border-0"
                >
                  <Grid className="h-4 w-4" />
                </ButtonEnhanced>
                <ButtonEnhanced
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none border-0 border-l border-gray-700"
                >
                  <List className="h-4 w-4" />
                </ButtonEnhanced>
              </div>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <ButtonEnhanced
                key={category.value}
                variant={categoryFilter === category.value ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter(category.value)}
                className="text-xs"
              >
                {category.label}
              </ButtonEnhanced>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-gray-400">
        {filteredSpaces.length} {filteredSpaces.length === 1 ? 'space' : 'spaces'}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {/* Spaces list */}
      {filteredSpaces.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 space-y-2">
            <p className="text-lg font-medium">No spaces found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
              {filteredSpaces.map(space => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  isJoined={userSpaceIds.includes(space.id)}
                  onJoin={onJoinSpace}
                  onView={onViewSpace}
                />
              ))}
            </div>
          ) : (
            <div className="border border-gray-700 rounded-lg overflow-hidden bg-[var(--hive-background-primary)]">
              {filteredSpaces.map((space, index) => (
                <SpaceCardCompact
                  key={space.id}
                  space={space}
                  isJoined={userSpaceIds.includes(space.id)}
                  onJoin={onJoinSpace}
                  className={index === filteredSpaces.length - 1 ? 'border-b-0' : ''}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Quick access component for homepage/dashboard
export function SpaceQuickList({ 
  title, 
  spaces, 
  onViewAll,
  ...props 
}: SpaceListProps & { title: string; onViewAll?: () => void }) {
  const displaySpaces = spaces.slice(0, 3); // Show only first 3

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">{title}</h3>
        {onViewAll && spaces.length > 3 && (
          <ButtonEnhanced variant="ghost" size="sm" onClick={onViewAll}>
            View All ({spaces.length})
          </ButtonEnhanced>
        )}
      </div>
      
      <div className="space-y-3">
        {displaySpaces.map(space => (
          <SpaceCardCompact
            key={space.id}
            space={space}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}