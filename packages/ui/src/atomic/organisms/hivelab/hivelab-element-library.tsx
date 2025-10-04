/**
 * HiveLab Element Library Panel
 *
 * Floating panel containing all available elements organized by category.
 * Users can search, filter, and drag elements onto the canvas.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/atomic/atoms/input';
import { Badge } from '@/atomic/atoms/badge';
import { Button } from '@/atomic/atoms/button';
import { FloatingPanel } from '@/atomic/molecules/panels/floating-panel';
import { ElementLibraryItem } from '@/atomic/molecules/panels/element-library-item';
import type { ElementDefinition, ElementCategory } from '@/types/hivelab.types';
import { Search, Star, Grid3x3, List } from 'lucide-react';

export interface HiveLabElementLibraryProps {
  /** Available element definitions */
  elements: ElementDefinition[];
  /** Element selection handler (for dragging to canvas) */
  onElementSelect?: (element: ElementDefinition) => void;
  /** Toggle favorite handler */
  onToggleFavorite?: (elementId: string) => void;
  /** Search query */
  searchQuery?: string;
  /** Search handler */
  onSearchChange?: (query: string) => void;
  /** Show favorites only */
  showFavoritesOnly?: boolean;
  /** Panel position */
  position?: 'left' | 'right';
  /** Panel width */
  width?: number;
  /** Is panel collapsed? */
  isCollapsed?: boolean;
  /** Collapse handler */
  onToggleCollapse?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * Category definitions matching ElementCategory type
 */
const categories: Array<{
  id: ElementCategory | 'all';
  name: string;
  icon: string;
  color: string;
  description: string;
}> = [
  {
    id: 'all',
    name: 'All Elements',
    icon: '🎨',
    color: 'text-white',
    description: 'Show everything',
  },
  {
    id: 'trigger',
    name: 'Triggers',
    icon: '⚡',
    color: 'text-red-500',
    description: 'Start your flow',
  },
  {
    id: 'collector',
    name: 'Collectors',
    icon: '📝',
    color: 'text-blue-500',
    description: 'Get user input',
  },
  {
    id: 'transformer',
    name: 'Transformers',
    icon: '🔄',
    color: 'text-purple-500',
    description: 'Process data',
  },
  {
    id: 'router',
    name: 'Routers',
    icon: '🔀',
    color: 'text-orange-500',
    description: 'Control flow',
  },
  {
    id: 'storage',
    name: 'Storage',
    icon: '💾',
    color: 'text-green-500',
    description: 'Save data',
  },
  {
    id: 'display',
    name: 'Display',
    icon: '👁️',
    color: 'text-cyan-500',
    description: 'Show results',
  },
  {
    id: 'action',
    name: 'Actions',
    icon: '🚀',
    color: 'text-pink-500',
    description: 'Do things',
  },
  {
    id: 'connector',
    name: 'Connectors',
    icon: '🔌',
    color: 'text-yellow-500',
    description: 'Link systems',
  },
];

export function HiveLabElementLibrary({
  elements,
  onElementSelect,
  onToggleFavorite,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  showFavoritesOnly = false,
  position = 'left',
  width = 280,
  isCollapsed = false,
  onToggleCollapse,
  onClose,
  className,
}: HiveLabElementLibraryProps) {
  // Local state for search and category
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [localShowFavorites, setLocalShowFavorites] = useState(showFavoritesOnly);

  // Use external search if provided, otherwise internal
  const searchQuery = externalSearchQuery ?? internalSearchQuery;
  const setSearchQuery = externalOnSearchChange ?? setInternalSearchQuery;

  // Filter elements
  const filteredElements = useMemo(() => {
    let filtered = elements;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.category.toLowerCase().includes(query)
      );
    }

    // Favorites filter
    if (localShowFavorites) {
      filtered = filtered.filter((e) => e.isNew);
    }

    return filtered;
  }, [elements, selectedCategory, searchQuery, localShowFavorites]);

  // Group by category for "all" view
  const groupedElements = useMemo(() => {
    const grouped: Record<ElementCategory, ElementDefinition[]> = {
      trigger: [],
      collector: [],
      transformer: [],
      router: [],
      storage: [],
      display: [],
      action: [],
      connector: [],
    };

    filteredElements.forEach((element) => {
      grouped[element.category].push(element);
    });

    return grouped;
  }, [filteredElements]);

  return (
    <FloatingPanel
      title="Element Library"
      icon={<Grid3x3 className="h-4 w-4" />}
      position={position}
      width={width}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
      onClose={onClose}
      className={className}
    >
      {/* Header Actions */}
      <div className="px-3 py-2 border-b space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
          <Input
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-7 w-7 p-0"
              title="List view"
            >
              <List className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-7 w-7 p-0"
              title="Grid view"
            >
              <Grid3x3 className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={localShowFavorites ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLocalShowFavorites(!localShowFavorites)}
              className="h-7 gap-1 px-2"
              title="Show new elements only"
            >
              <Star className={cn('h-3.5 w-3.5', localShowFavorites && 'fill-current')} />
              <span className="text-xs">New</span>
            </Button>

            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
              {filteredElements.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-3 py-2 border-b overflow-x-auto">
        <div className="flex gap-1.5 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'px-2.5 py-1.5 rounded-md text-xs font-medium transition-all shrink-0',
                'hover:bg-white/10',
                selectedCategory === category.id
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-white/10 text-white/70'
              )}
              title={category.description}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-3">
        {selectedCategory === 'all' ? (
          // Grouped view
          <div className="space-y-4">
            {categories.slice(1).map((category) => {
              const categoryElements = groupedElements[category.id as ElementCategory];
              if (!categoryElements || categoryElements.length === 0) return null;

              return (
                <div key={category.id} className="space-y-2">
                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn('text-sm font-semibold', category.color)}>
                      {category.icon} {category.name}
                    </span>
                    <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                      {categoryElements.length}
                    </Badge>
                  </div>

                  {/* Elements */}
                  <div
                    className={cn(
                      viewMode === 'grid'
                        ? 'grid grid-cols-2 gap-2'
                        : 'space-y-1'
                    )}
                  >
                    {categoryElements.map((element) => (
                      <ElementLibraryItem
                        key={element.id}
                        element={{
                          id: element.id,
                          name: element.name,
                          icon: element.icon,
                          category: element.category,
                          description: element.description,
                          inputs: element.defaultInputs.map((input, i) => ({
                            ...input,
                            id: `${element.id}-in-${i}`,
                          })),
                          outputs: element.defaultOutputs.map((output, i) => ({
                            ...output,
                            id: `${element.id}-out-${i}`,
                          })),
                          isNew: element.isNew,
                          complexity: element.complexity,
                        }}
                        onSelect={onElementSelect ? () => onElementSelect(element) : undefined}
                        onToggleFavorite={onToggleFavorite}
                        compact={viewMode === 'grid'}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Flat list for specific category
          <div
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-2 gap-2'
                : 'space-y-1'
            )}
          >
            {filteredElements.map((element) => (
              <ElementLibraryItem
                key={element.id}
                element={{
                  id: element.id,
                  name: element.name,
                  icon: element.icon,
                  category: element.category,
                  description: element.description,
                  inputs: element.defaultInputs.map((input, i) => ({
                    ...input,
                    id: `${element.id}-in-${i}`,
                  })),
                  outputs: element.defaultOutputs.map((output, i) => ({
                    ...output,
                    id: `${element.id}-out-${i}`,
                  })),
                  isNew: element.isNew,
                  complexity: element.complexity,
                }}
                onSelect={onElementSelect ? () => onElementSelect(element) : undefined}
                onToggleFavorite={onToggleFavorite}
                compact={viewMode === 'grid'}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredElements.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm font-medium mb-1">No elements found</p>
            <p className="text-xs text-white/70">
              Try a different search or category
            </p>
          </div>
        )}
      </div>

      {/* Footer Hint */}
      <div className="px-3 py-2 border-t bg-white/5">
        <p className="text-[10px] text-white/70 text-center">
          💡 Drag elements to the canvas to build your tool
        </p>
      </div>
    </FloatingPanel>
  );
}

HiveLabElementLibrary.displayName = 'HiveLabElementLibrary';
