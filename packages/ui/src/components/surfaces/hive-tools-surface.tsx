"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';
import { type Space } from '@hive/core';
import { 
  Wrench,
  Plus,
  Settings,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Play,
  Pause,
  ArrowUp,
  ArrowDown,
  Crown,
  Sparkles,
  Zap,
  Star,
  Clock,
  Users,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  Download,
  Share2,
  Copy,
  Info,
  HelpCircle,
  MessageSquare,
  Calendar,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Calculator,
  Map,
  Camera,
  Mic,
  Gamepad2,
  Bookmark,
  Link as LinkIcon,
  Database,
  Code,
  Palette,
  Globe
} from 'lucide-react';

// HIVE Tools Surface - Interactive Tool Management
// Dynamic tool ecosystem with placement, configuration, and analytics

const hiveToolsSurfaceVariants = cva(
  "relative w-full",
  {
    variants: {
      mode: {
        view: "",
        edit: "ring-2 ring-purple-500/30 ring-offset-2 ring-offset-black/20",
        builder: "ring-2 ring-purple-500/30 ring-offset-2 ring-offset-black/20",
      }
    },
    defaultVariants: {
      mode: "view",
    },
  }
);

// Tool categories with HIVE design patterns
const toolCategories = {
  communication: {
    icon: MessageSquare,
    label: 'Communication',
    color: 'text-blue-400',
    description: 'Posts, discussions, announcements'
  },
  productivity: {
    icon: CheckCircle,
    label: 'Productivity',
    color: 'text-green-400',
    description: 'To-do lists, planners, trackers'
  },
  multimedia: {
    icon: ImageIcon,
    label: 'Multimedia',
    color: 'text-purple-400',
    description: 'Images, videos, galleries'
  },
  collaboration: {
    icon: Users,
    label: 'Collaboration',
    color: 'text-orange-400',
    description: 'Shared docs, whiteboards, polls'
  },
  entertainment: {
    icon: Gamepad2,
    label: 'Entertainment',
    color: 'text-pink-400',
    description: 'Games, quizzes, music'
  },
  utilities: {
    icon: Calculator,
    label: 'Utilities',
    color: 'text-gray-400',
    description: 'Calculators, converters, tools'
  },
} as const;

// Tool status indicators
const toolStatuses = {
  active: {
    label: 'Active',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    icon: CheckCircle,
    description: 'Tool is running normally'
  },
  paused: {
    label: 'Paused',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    icon: Pause,
    description: 'Tool is temporarily disabled'
  },
  error: {
    label: 'Error',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    icon: XCircle,
    description: 'Tool has encountered an issue'
  },
  loading: {
    label: 'Loading',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    icon: RefreshCw,
    description: 'Tool is initializing'
  },
} as const;

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: keyof typeof toolCategories;
  status: keyof typeof toolStatuses;
  icon: string;
  version: string;
  addedAt: Date;
  addedBy: string;
  lastUsed?: Date;
  usageCount: number;
  isVisible: boolean;
  isPinned: boolean;
  configuration: Record<string, any>;
  permissions: {
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canConfigure: boolean;
  };
  analytics?: {
    views: number;
    interactions: number;
    activeUsers: number;
    lastActivity: Date;
  };
}

export interface HiveToolsSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveToolsSurfaceVariants> {
  space: Space;
  tools?: Tool[];
  isBuilder?: boolean;
  canManageTools?: boolean;
  onAddTool?: () => void;
  onConfigureTool?: (toolId: string) => void;
  onRemoveTool?: (toolId: string) => void;
  onToggleToolStatus?: (toolId: string) => void;
  onReorderTools?: (toolIds: string[]) => void;
  onViewToolAnalytics?: (toolId: string) => void;
  showAnalytics?: boolean;
  compact?: boolean;
  maxTools?: number;
}

export const HiveToolsSurface = React.forwardRef<HTMLDivElement, HiveToolsSurfaceProps>(
  ({ 
    className,
    mode,
    space,
    tools = [],
    isBuilder = false,
    canManageTools = false,
    onAddTool,
    onConfigureTool,
    onRemoveTool,
    onToggleToolStatus,
    onReorderTools,
    onViewToolAnalytics,
    showAnalytics = true,
    compact = false,
    maxTools = 12,
    ...props 
  }, ref) => {
    
    const [hoveredTool, setHoveredTool] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof toolCategories | 'all'>('all');
    const [showToolMenu, setShowToolMenu] = useState(false);
    
    // Filter and sort tools
    const filteredTools = tools
      .filter(tool => {
        if (!tool.isVisible && !canManageTools) return false;
        if (selectedCategory === 'all') return true;
        return tool.category === selectedCategory;
      })
      .sort((a, b) => {
        // Pinned tools first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        // Then by usage count
        if (a.usageCount !== b.usageCount) return b.usageCount - a.usageCount;
        // Finally by added date
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      })
      .slice(0, maxTools);
    
    // Tool category counts
    const categoryCounts = tools.reduce((acc, tool) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Get tool icon component
    const getToolIcon = (iconName: string) => {
      const iconMap: Record<string, any> = {
        MessageSquare, Calendar, FileText, ImageIcon, Video, Music,
        Calculator, Map, Camera, Mic, Gamepad2, Bookmark, LinkIcon,
        Database, Code, Palette, Globe, CheckCircle, Users, Activity
      };
      return iconMap[iconName] || Wrench;
    };
    
    // Empty state
    if (tools.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(hiveToolsSurfaceVariants({ mode, className }))}
          {...props}
        >
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-purple-500/20 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: motionDurations.quick }}
            >
              <Wrench className="w-8 h-8 text-purple-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">No Tools Yet</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Tools bring functionality to your Space. Add interactive elements like polls, calendars, and collaborative features.
            </p>
            
            {canManageTools && (
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-all duration-200 font-medium"
                onClick={onAddTool}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                Add First Tool
              </motion.button>
            )}
          </motion.div>
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(hiveToolsSurfaceVariants({ mode, className }))}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Tools</h3>
            <span className="text-sm text-gray-400">{filteredTools.length} active</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Add Tool Button */}
            {canManageTools && (
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-all duration-200 font-medium"
                onClick={onAddTool}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Tool</span>
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All Tools', icon: Star, color: 'text-[var(--hive-text-primary)]', count: tools.length },
            ...Object.entries(toolCategories).map(([key, config]) => ({
              key,
              label: config.label,
              icon: config.icon,
              color: config.color,
              count: categoryCounts[key] || 0
            }))
          ].map((filter) => {
            const Icon = filter.icon;
            const isActive = selectedCategory === filter.key;
            
            return (
              <motion.button
                key={filter.key}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                    : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20 hover:text-[var(--hive-text-primary)]"
                )}
                onClick={() => setSelectedCategory(filter.key as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-purple-400" : filter.color)} />
                <span>{filter.label}</span>
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-xs",
                  isActive 
                    ? "bg-purple-500/30 text-purple-300"
                    : "bg-[var(--hive-text-primary)]/10 text-gray-500"
                )}>
                  {filter.count}
                </span>
              </motion.button>
            );
          })}
        </div>
        
        {/* Tools Grid */}
        <div className={cn(
          compact 
            ? "space-y-3"
            : "grid grid-cols-1 sm:grid-cols-2 gap-4"
        )}>
          {filteredTools.map((tool, index) => {
            const categoryConfig = toolCategories[tool.category];
            const statusConfig = toolStatuses[tool.status];
            const ToolIcon = getToolIcon(tool.icon);
            const StatusIcon = statusConfig.icon;
            const isHovered = hoveredTool === tool.id;
            
            return (
              <motion.article
                key={tool.id}
                className={cn(
                  "relative group bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-200",
                  isHovered && "border-white/10",
                  tool.isPinned && "ring-1 ring-purple-500/30 bg-purple-500/5",
                  !tool.isVisible && "opacity-50",
                  mode === 'edit' && "hover:ring-2 hover:ring-purple-500/30"
                )}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: tool.isVisible ? 1 : 0.5, y: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                {/* Pinned Indicator */}
                {tool.isPinned && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-purple-500/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  />
                )}
                
                <div className={cn("p-4", compact && "p-3")}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={cn(
                        "flex-shrink-0 rounded-lg flex items-center justify-center",
                        compact ? "w-8 h-8" : "w-10 h-10",
                        tool.isPinned ? "bg-purple-500/20" : "bg-[var(--hive-text-primary)]/5"
                      )}>
                        <ToolIcon className={cn(
                          compact ? "w-4 h-4" : "w-5 h-5",
                          categoryConfig.color
                        )} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={cn(
                          "font-medium text-[var(--hive-text-primary)] truncate",
                          compact ? "text-sm" : "text-sm"
                        )}>
                          {tool.name}
                        </h4>
                        <div className={cn(
                          "flex items-center gap-2 text-gray-400 mt-1",
                          compact ? "text-xs" : "text-xs"
                        )}>
                          <span>{categoryConfig.label}</span>
                          <span>•</span>
                          <span>v{tool.version}</span>
                          {tool.isPinned && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1 text-purple-400">
                                <Star className="w-3 h-3" />
                                <span>Pinned</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Status & Actions */}
                    <div className="flex items-center gap-2">
                      {/* Status Indicator */}
                      <motion.div
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded-full text-xs border",
                          statusConfig.bg,
                          statusConfig.color,
                          "border-current/30"
                        )}
                        whileHover={{ scale: 1.05 }}
                      >
                        <StatusIcon className={cn(
                          "w-3 h-3",
                          tool.status === 'loading' && "animate-spin"
                        )} />
                        <span className="hidden sm:inline">{statusConfig.label}</span>
                      </motion.div>
                      
                      {/* Tool Actions */}
                      {canManageTools && (
                        <AnimatePresence>
                          {(isHovered || mode === 'edit') && (
                            <motion.div
                              className="flex items-center gap-1"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                            >
                              <motion.button
                                className="p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                                onClick={() => onConfigureTool?.(tool.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Settings className="w-3.5 h-3.5" />
                              </motion.button>
                              <motion.button
                                className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                                onClick={() => onRemoveTool?.(tool.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  {!compact && (
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                      {tool.description}
                    </p>
                  )}
                  
                  {/* Analytics & Usage */}
                  {showAnalytics && tool.analytics && (
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{tool.analytics.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          <span>{tool.analytics.interactions}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{tool.analytics.activeUsers}</span>
                        </div>
                      </div>
                      
                      {tool.lastUsed && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(tool.lastUsed).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      className={cn(
                        "flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-all duration-200",
                        tool.status === 'active'
                          ? "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30"
                          : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20 hover:text-[var(--hive-text-primary)]"
                      )}
                      onClick={() => onToggleToolStatus?.(tool.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tool.status === 'active' ? (
                        <>
                          <Pause className="w-4 h-4 inline mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 inline mr-2" />
                          Activate
                        </>
                      )}
                    </motion.button>
                    
                    {showAnalytics && (
                      <motion.button
                        className="p-2 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                        onClick={() => onViewToolAnalytics?.(tool.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <TrendingUp className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
        
        {/* Builder Hint */}
        {isBuilder && mode === 'edit' && (
          <motion.div
            className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-purple-400 mb-1">Builder Mode Active</h4>
                <p className="text-xs text-purple-300/80">
                  Tools power your Space's functionality. Add interactive elements that engage your community and enhance collaboration.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

HiveToolsSurface.displayName = "HiveToolsSurface";

export { hiveToolsSurfaceVariants, toolCategories, toolStatuses };