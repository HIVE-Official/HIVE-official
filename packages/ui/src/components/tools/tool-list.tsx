/**
 * ToolList - Simple, purpose-built tool browsing
 * 
 * Replaces the AI "CompleteHIVEToolsSystem" with focused components.
 * Students just want to find, install, and use tools - that's it.
 */

'use client';

import React, { useState } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ToolCard, ToolCardCompact, ToolCardSkeleton, Tool } from './tool-card';

export interface ToolListProps {
  tools: Tool[];
  loading?: boolean;
  currentUserId?: string;
  onInstallTool?: (toolId: string) => void;
  onRunTool?: (toolId: string) => void;
  onShareTool?: (toolId: string) => void;
  onFavoriteTool?: (toolId: string) => void;
  onViewTool?: (toolId: string) => void;
  showSearch?: boolean;
  showViewToggle?: boolean;
  className?: string;
}

export function ToolList({
  tools,
  loading = false,
  currentUserId,
  onInstallTool,
  onRunTool,
  onShareTool,
  onFavoriteTool,
  onViewTool,
  showSearch = true,
  showViewToggle = true,
  className
}: ToolListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filter tools based on search and category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = !searchQuery || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Tools' },
    { value: 'academic', label: 'Academic' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'social', label: 'Social' },
    { value: 'utility', label: 'Utility' }
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
            <ToolCardSkeleton key={i} />
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
              <Input
                type="text"
                placeholder="Search tools, creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {showViewToggle && (
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none border-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none border-0 border-l border-gray-700"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.value}
                variant={categoryFilter === category.value ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter(category.value)}
                className="text-xs"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-gray-400">
        {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {/* Tools list */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 space-y-2">
            <p className="text-lg font-medium">No tools found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
              {filteredTools.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  currentUserId={currentUserId}
                  onInstall={onInstallTool}
                  onRun={onRunTool}
                  onShare={onShareTool}
                  onFavorite={onFavoriteTool}
                  onView={onViewTool}
                />
              ))}
            </div>
          ) : (
            <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
              {filteredTools.map((tool, index) => (
                <ToolCardCompact
                  key={tool.id}
                  tool={tool}
                  currentUserId={currentUserId}
                  onInstall={onInstallTool}
                  onRun={onRunTool}
                  className={index === filteredTools.length - 1 ? 'border-b-0' : ''}
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
export function ToolQuickList({ 
  title, 
  tools, 
  onViewAll,
  ...props 
}: ToolListProps & { title: string; onViewAll?: () => void }) {
  const displayTools = tools.slice(0, 3); // Show only first 3

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {onViewAll && tools.length > 3 && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All ({tools.length})
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        {displayTools.map(tool => (
          <ToolCardCompact
            key={tool.id}
            tool={tool}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}