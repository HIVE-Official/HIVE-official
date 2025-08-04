"use client";

import React, { useState, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { PlantNewToolButton } from '../library/plant-new-tool-button';
import { 
  Settings, 
  Play, 
  MoreVertical, 
  Users, 
  Calendar, 
  BarChart3, 
  Clock,
  Zap,
  Grid,
  List,
  Filter
} from 'lucide-react';
import { cn } from '../../lib/utils';
// import { SpaceDefinition } from './space-system-core';

interface ToolInstallation {
  id: string;
  elementId: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  author: string;
  isActive: boolean;
  isPinned: boolean;
  usageCount: number;
  lastUsed: Date;
  configuration: Record<string, any>;
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canShare: boolean;
  };
}

interface SpaceToolGridWithLibraryProps {
  space: any; // SpaceDefinition;
  tools?: ToolInstallation[];
  onToolLaunch?: (toolId: string) => void;
  onToolInstall?: (elementId: string, configuration?: any) => Promise<void>;
  onToolConfigure?: (toolId: string) => void;
  onToolRemove?: (toolId: string) => void;
  variant?: 'grid' | 'list';
  showPlantButton?: boolean;
  className?: string;
}

const ToolCard = ({ 
  tool, 
  onLaunch, 
  onConfigure, 
  onRemove,
  variant = 'grid' 
}: {
  tool: ToolInstallation;
  onLaunch?: (toolId: string) => void;
  onConfigure?: (toolId: string) => void;
  onRemove?: (toolId: string) => void;
  variant?: 'grid' | 'list';
}) => {
  const [showActions, setShowActions] = useState(false);
  const IconComponent = tool.icon;

  if (variant === 'list') {
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{tool.name}</h3>
              <div className="flex items-center gap-1">
                {tool.isPinned && (
                  <HiveBadge className="bg-amber-100 text-amber-800 border-amber-200">
                    Pinned
                  </HiveBadge>
                )}
                {!tool.isActive && (
                  <HiveBadge variant="outline">
                    Disabled
                  </HiveBadge>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 truncate">{tool.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
              <span>{tool.usageCount} uses</span>
              <span>Last used {tool.lastUsed.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <HiveButton
            size="sm"
            variant="outline"
            onClick={() => onConfigure?.(tool.id)}
            disabled={!tool.permissions.canEdit}
          >
            <Settings className="w-3 h-3 mr-1" />
            Configure
          </HiveButton>
          <HiveButton
            size="sm"
            onClick={() => onLaunch?.(tool.id)}
            disabled={!tool.isActive}
          >
            <Play className="w-3 h-3 mr-1" />
            Launch
          </HiveButton>
        </div>
      </div>
    );
  }

  return (
    <HiveCard className="p-4 hover:shadow-lg transition-all group">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex items-center gap-1">
            {tool.isPinned && (
              <HiveBadge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                📌
              </HiveBadge>
            )}
            {!tool.isActive && (
              <HiveBadge variant="outline" className="text-xs">
                Disabled
              </HiveBadge>
            )}
            <div className="relative">
              <HiveButton
                size="sm"
                variant="ghost"
                onClick={() => setShowActions(!showActions)}
              >
                <MoreVertical className="w-4 h-4" />
              </HiveButton>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {tool.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{tool.usageCount} uses</span>
            <span>{tool.category}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <HiveButton 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => onConfigure?.(tool.id)}
            disabled={!tool.permissions.canEdit}
          >
            <Settings className="w-3 h-3 mr-1" />
            Configure
          </HiveButton>
          <HiveButton 
            size="sm" 
            className="flex-1"
            onClick={() => onLaunch?.(tool.id)}
            disabled={!tool.isActive}
          >
            <Play className="w-3 h-3 mr-1" />
            Launch
          </HiveButton>
        </div>
      </div>
    </HiveCard>
  );
};

export function SpaceToolGridWithLibrary({
  space,
  tools = [],
  onToolLaunch,
  onToolInstall,
  onToolConfigure,
  onToolRemove,
  variant = 'grid',
  showPlantButton = true,
  className
}: SpaceToolGridWithLibraryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(variant);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showInactive, setShowInactive] = useState(false);

  // Mock tools for demonstration
  const mockTools: ToolInstallation[] = [
    {
      id: 'tool_1',
      elementId: 'poll-creator',
      name: 'Quick Poll',
      description: 'Create instant polls for group decisions',
      icon: BarChart3,
      category: 'Social',
      author: 'HIVE Team',
      isActive: true,
      isPinned: true,
      usageCount: 23,
      lastUsed: new Date('2024-01-15'),
      configuration: {},
      permissions: {
        canEdit: true,
        canDelete: true,
        canShare: true
      }
    },
    {
      id: 'tool_2',
      elementId: 'attendance-tracker',
      name: 'Attendance Tracker',
      description: 'Track meeting attendance with check-in codes',
      icon: Users,
      category: 'Organization',
      author: 'OrganizeU',
      isActive: true,
      isPinned: false,
      usageCount: 8,
      lastUsed: new Date('2024-01-12'),
      configuration: {},
      permissions: {
        canEdit: true,
        canDelete: false,
        canShare: true
      }
    },
    {
      id: 'tool_3',
      elementId: 'study-timer',
      name: 'Focus Timer',
      description: 'Pomodoro timer for study sessions',
      icon: Clock,
      category: 'Productivity',
      author: 'StudyHive',
      isActive: false,
      isPinned: false,
      usageCount: 45,
      lastUsed: new Date('2024-01-10'),
      configuration: {},
      permissions: {
        canEdit: true,
        canDelete: true,
        canShare: true
      }
    }
  ];

  const displayTools = tools.length > 0 ? tools : mockTools;

  const filteredTools = displayTools.filter(tool => {
    if (categoryFilter !== 'all' && tool.category !== categoryFilter) {
      return false;
    }
    if (!showInactive && !tool.isActive) {
      return false;
    }
    return true;
  });

  const categories = [...new Set(displayTools.map(tool => tool.category))];

  const handleToolInstall = useCallback(async (elementId: string, configuration?: any) => {
    try {
      await onToolInstall?.(elementId, configuration);
      // Tool will be added to the grid after successful installation
    } catch (error) {
      console.error('Failed to install tool:', error);
      throw error; // Re-throw to keep modal open
    }
  }, [onToolInstall]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Tools</h3>
          <p className="text-sm text-gray-600">
            {filteredTools.length} active tool{filteredTools.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <HiveButton
              size="sm"
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </HiveButton>
            <HiveButton
              size="sm"
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </HiveButton>
          </div>

          {/* Plant New Tool Button */}
          {showPlantButton && (
            <PlantNewToolButton
              space={space}
              onToolInstall={handleToolInstall}
              variant="default"
            />
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="rounded border-gray-300 focus:ring-amber-500"
          />
          Show inactive tools
        </label>
      </div>

      {/* Tools Grid/List */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {displayTools.length === 0 ? 'No Tools Yet' : 'No Tools Match Filters'}
          </h3>
          <p className="text-gray-600 mb-6">
            {displayTools.length === 0 
              ? 'Add your first tool to get started with enhanced functionality'
              : 'Try adjusting your filters or add new tools'
            }
          </p>
          
          {showPlantButton && (
            <PlantNewToolButton
              space={space}
              onToolInstall={handleToolInstall}
              variant="default"
            />
          )}
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  variant="grid"
                  onLaunch={onToolLaunch}
                  onConfigure={onToolConfigure}
                  onRemove={onToolRemove}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  variant="list"
                  onLaunch={onToolLaunch}
                  onConfigure={onToolConfigure}
                  onRemove={onToolRemove}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Footer Stats */}
      {filteredTools.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {filteredTools.length} of {displayTools.length} tools
          {categoryFilter !== 'all' && ` in ${categoryFilter}`}
        </div>
      )}
    </div>
  );
}

export default SpaceToolGridWithLibrary;