'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Plus, 
  Settings, 
  BarChart3, 
  Play,
  Pause,
  Eye,
  EyeOff,
  Trash2,
  MoreHorizontal,
  Hash,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Activity,
  Zap,
  Filter
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Space } from '../../types';

export type ToolStatus = 'active' | 'paused' | 'configuring' | 'error';
export type ToolType = 'automation' | 'coordination' | 'analytics' | 'utility' | 'integration';

export interface SpaceTool {
  deploymentId: string;
  toolId: string;
  name: string;
  description: string;
  category: string;
  version: string;
  status: string;
  configuration: any;
  permissions: {
    canEdit: string[];
    canView: string[];
    isPublic: boolean;
  };
  isShared: boolean;
  deployer: {
    id: string;
    name: string;
    avatar: string | null;
  } | null;
  deployedAt: string;
  lastUsed: string | null;
  usageCount: number;
  originalTool: {
    averageRating: number;
    ratingCount: number;
    totalDeployments: number;
    isVerified: boolean;
    creatorId: string;
  };
}

export interface HiveToolsSurfaceProps {
  space: Space;
  tools?: SpaceTool[];
  maxTools?: number;
  canManageTools?: boolean;
  leaderMode?: 'configure' | 'moderate' | 'insights' | null;
  isBuilder?: boolean;
  viewMode?: 'grid' | 'list';
  
  // Event handlers
  onAddTool?: () => void;
  onConfigureTool?: (toolId: string) => void;
  onViewToolAnalytics?: (toolId: string) => void;
  onRunTool?: (toolId: string) => void;
  onPauseTool?: (toolId: string) => void;
  onRemoveTool?: (toolId: string) => void;
}

export const HiveToolsSurface: React.FC<HiveToolsSurfaceProps> = ({
  space,
  tools = [],
  maxTools,
  canManageTools = false,
  leaderMode,
  isBuilder = false,
  viewMode = 'grid',
  onAddTool,
  onConfigureTool,
  onViewToolAnalytics,
  onRunTool,
  onPauseTool,
  onRemoveTool
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTools = useMemo(() => {
    let filtered = tools.filter(tool => {
      const matchesType = filter === 'all' || tool.category === filter;
      const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;
      return matchesType && matchesStatus;
    });

    // Sort by deployment count
    filtered.sort((a, b) => b.originalTool.totalDeployments - a.originalTool.totalDeployments);

    if (maxTools) {
      filtered = filtered.slice(0, maxTools);
    }

    return filtered;
  }, [tools, filter, statusFilter, maxTools]);

  const getToolCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return '📚';
      case 'social': return '👥';
      case 'productivity': return '⚡';
      case 'coordination': return '🎯';
      case 'analytics': return '📊';
      case 'communication': return '💬';
      case 'resources': return '📁';
      case 'fun': return '🎮';
      default: return '🔧';
    }
  };

  const getToolCategoryColor = (category: string) => {
    switch (category) {
      case 'study': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'social': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'productivity': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'coordination': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'analytics': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
      case 'communication': return 'text-pink-400 bg-pink-400/10 border-pink-400/20';
      case 'resources': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'fun': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <div className="flex items-center gap-1 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs">Active</span>
          </div>
        );
      case 'paused':
        return (
          <div className="flex items-center gap-1 text-yellow-400">
            <Pause className="h-3 w-3" />
            <span className="text-xs">Paused</span>
          </div>
        );
      default:
        return null;
      case 'configuring':
        return (
          <div className="flex items-center gap-1 text-blue-400">
            <Clock className="h-3 w-3" />
            <span className="text-xs">Configuring</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-1 text-red-400">
            <AlertTriangle className="h-3 w-3" />
            <span className="text-xs">Error</span>
          </div>
        );
    }
  };

  const formatLastRun = (dateStr?: string | null) => {
    if (!dateStr) return 'Never';
    
    const date = new Date(dateStr);
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const toolStats = useMemo(() => {
    return {
      total: tools.length,
      active: tools.filter(t => t.status === 'active').length,
      totalUsage: tools.reduce((sum, tool) => sum + tool.usageCount, 0),
      avgRating: tools.length > 0 
        ? Math.round(tools.reduce((sum, tool) => sum + tool.originalTool.averageRating, 0) / tools.length * 10) / 10
        : 0
    };
  }, [tools]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            <h3 className="font-semibold text-[var(--hive-text-inverse)]">
              Tools
            </h3>
            <span className="text-sm text-neutral-400">({toolStats.active}/{toolStats.total})</span>
          </div>

          {leaderMode === 'insights' && (
            <div className="flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <TrendingUp className="h-3 w-3 text-purple-400" />
              <span className="text-xs text-purple-400">Analytics Active</span>
            </div>
          )}
        </div>

        {canManageTools && (
          <div className="flex items-center gap-2">
            <button
              onClick={onAddTool}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm">Add Tool</span>
            </button>
          </div>
        )}
      </div>

      {/* Stats (Insights Mode) */}
      {leaderMode === 'insights' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-purple-400">{toolStats.total}</div>
            <div className="text-xs text-neutral-400">Total Tools</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-green-400">{toolStats.active}</div>
            <div className="text-xs text-neutral-400">Active Tools</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-blue-400">{toolStats.totalUsage}</div>
            <div className="text-xs text-neutral-400">Total Usage</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-yellow-400">{toolStats.avgRating}/5</div>
            <div className="text-xs text-neutral-400">Avg Rating</div>
          </div>
        </div>
      )}

      {/* Filters */}
      {tools.length > 3 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-neutral-400 flex-shrink-0" />
          
          {/* Type Filter */}
          <select
            value={filter}
            onChange={(e: any) => setFilter(e.target.value as ToolType | 'all')}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
          >
            <option value="all">All Categories</option>
            <option value="study">Study</option>
            <option value="social">Social</option>
            <option value="productivity">Productivity</option>
            <option value="coordination">Coordination</option>
            <option value="analytics">Analytics</option>
            <option value="communication">Communication</option>
            <option value="resources">Resources</option>
            <option value="fun">Fun</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value as ToolStatus | 'all')}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      )}

      {/* Tools */}
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4" 
          : "space-y-3"
      )}>
        <AnimatePresence>
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.deploymentId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:bg-white/[0.05] transition-colors",
                leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5",
                tool.status === 'error' && "border-red-500/30 bg-red-500/5"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-lg">{getToolCategoryIcon(tool.category)}</div>
                    <h4 className="font-medium text-[var(--hive-text-inverse)] truncate">
                      {tool.name}
                    </h4>

                    {/* Category Badge */}
                    <span className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full border capitalize",
                      getToolCategoryColor(tool.category)
                    )}>
                      {tool.category}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-300 mb-3 line-clamp-2">
                    {tool.description}
                  </p>

                  {/* Tool Status */}
                  <div className="flex items-center justify-between mb-3">
                    {getStatusIndicator(tool.status)}
                    
                    {tool.originalTool.isVerified && (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    )}
                  </div>

                  {/* Tool Metrics */}
                  <div className="space-y-1 text-xs text-neutral-400">
                    <div className="flex items-center justify-between">
                      <span>Usage:</span>
                      <span className="text-[var(--hive-text-inverse)]">{tool.usageCount}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Last used:</span>
                      <span className="text-[var(--hive-text-inverse)]">{formatLastRun(tool.lastUsed)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Rating:</span>
                      <span className={cn(
                        "font-medium",
                        tool.originalTool.averageRating >= 4.5 ? "text-green-400" :
                        tool.originalTool.averageRating >= 3.5 ? "text-yellow-400" : "text-orange-400"
                      )}>
                        {tool.originalTool.averageRating}/5 ({tool.originalTool.ratingCount})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Deployments:</span>
                      <span className="text-[var(--hive-text-inverse)]">{tool.originalTool.totalDeployments}</span>
                    </div>
                  </div>

                  {/* Insights Mode Additional Metrics */}
                  {leaderMode === 'insights' && (
                    <div className="mt-3 pt-3 border-t border-purple-500/20 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Version:</span>
                        <span className="text-purple-400">{tool.version}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Deployed by:</span>
                        <span className="text-purple-400">{tool.deployer?.name || 'Unknown'}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  {/* Primary Actions */}
                  {tool.status === 'active' && canManageTools && (
                    <button
                      onClick={() => onRunTool?.(tool.deploymentId)}
                      className="p-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors"
                      title="Run tool"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}

                  {tool.status === 'active' && canManageTools && (
                    <button
                      onClick={() => onPauseTool?.(tool.deploymentId)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Pause tool"
                    >
                      <Pause className="h-4 w-4 text-neutral-400" />
                    </button>
                  )}

                  {/* Configuration */}
                  {canManageTools && (
                    <button
                      onClick={() => onConfigureTool?.(tool.deploymentId)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Configure tool"
                    >
                      <Settings className="h-4 w-4 text-neutral-400" />
                    </button>
                  )}

                  {/* Analytics */}
                  {(isBuilder || leaderMode === 'insights') && (
                    <button
                      onClick={() => onViewToolAnalytics?.(tool.deploymentId)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="View analytics"
                    >
                      <BarChart3 className="h-4 w-4 text-neutral-400" />
                    </button>
                  )}

                  {/* More Actions */}
                  {canManageTools && (
                    <div className="relative">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-neutral-400" />
                      </button>
                    </div>
                  )}

                  {/* Remove */}
                  {canManageTools && (
                    <button
                      onClick={() => onRemoveTool?.(tool.deploymentId)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Remove tool"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTools.length === 0 && (
          <div className="text-center py-8 col-span-full">
            <Hash className="h-12 w-12 mx-auto mb-3 text-neutral-400 opacity-50" />
            <p className="text-neutral-400">No tools found</p>
            <p className="text-sm text-neutral-500 mt-1">
              {canManageTools ? 'Add tools to enhance your space functionality' : 'Tools will appear here when added by leaders'}
            </p>
          </div>
        )}
      </div>

      {/* Show More Button */}
      {maxTools && tools.length > maxTools && (
        <div className="text-center pt-4">
          <button className="text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors text-sm font-medium">
            View all {tools.length} tools
          </button>
        </div>
      )}
    </div>
  );
};

export default HiveToolsSurface;