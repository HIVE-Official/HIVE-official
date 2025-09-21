'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  Settings, 
  Play, 
  Pause, 
  MoreHorizontal, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Users, 
  Activity, 
  Trash2, 
  Edit3,
  BarChart3,
  Calendar,
  MessageSquare,
  Hash,
  Zap,
  Info
} from 'lucide-react';

export interface PlantedTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'productivity' | 'social' | 'academic' | 'coordination';
  version: string;
  
  // Status and health
  status: 'active' | 'configured' | 'needs_setup' | 'error' | 'disabled';
  lastUsed?: string;
  usageCount?: number;
  errorMessage?: string;
  
  // Output and engagement
  outputs?: number; // Number of items posted to board
  interactions?: number; // Total interactions with tool outputs
  
  // Configuration
  isConfigured: boolean;
  hasRequiredSettings?: boolean;
  configurationUrl?: string;
  
  // Permissions
  canConfigure?: boolean;
  canRemove?: boolean;
  canView?: boolean;
}

export interface PlantedToolWidgetProps {
  tool: PlantedTool;
  variant?: 'default' | 'compact' | 'detailed';
  
  // Interaction handlers
  onConfigure?: (toolId: string) => void;
  onRemove?: (toolId: string) => void;
  onToggleStatus?: (toolId: string, active: boolean) => void;
  onViewDetails?: (toolId: string) => void;
  onViewOutputs?: (toolId: string) => void;
  
  // Display options
  showStats?: boolean;
  showActions?: boolean;
  className?: string;
}

const CATEGORY_CONFIG = {
  productivity: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    icon: <Zap className="w-4 h-4" />,
  },
  social: {
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    icon: <Users className="w-4 h-4" />,
  },
  academic: {
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    icon: <BarChart3 className="w-4 h-4" />,
  },
  coordination: {
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    icon: <Calendar className="w-4 h-4" />,
  },
};

const STATUS_CONFIG = {
  active: {
    color: 'text-[var(--hive-status-success)]',
    bgColor: 'bg-[var(--hive-status-success)]/10',
    borderColor: 'border-[var(--hive-status-success)]/20',
    icon: <CheckCircle className="w-4 h-4" />,
    label: 'Active',
  },
  configured: {
    color: 'text-[var(--hive-status-info)]',
    bgColor: 'bg-[var(--hive-status-info)]/10',
    borderColor: 'border-[var(--hive-status-info)]/20',
    icon: <Settings className="w-4 h-4" />,
    label: 'Configured',
  },
  needs_setup: {
    color: 'text-[var(--hive-status-warning)]',
    bgColor: 'bg-[var(--hive-status-warning)]/10',
    borderColor: 'border-[var(--hive-status-warning)]/20',
    icon: <AlertCircle className="w-4 h-4" />,
    label: 'Needs Setup',
  },
  error: {
    color: 'text-[var(--hive-status-error)]',
    bgColor: 'bg-[var(--hive-status-error)]/10',
    borderColor: 'border-[var(--hive-status-error)]/20',
    icon: <AlertCircle className="w-4 h-4" />,
    label: 'Error',
  },
  disabled: {
    color: 'text-[var(--hive-text-muted)]',
    bgColor: 'bg-[var(--hive-background-tertiary)]/20',
    borderColor: 'border-[var(--hive-border-primary)]/10',
    icon: <Pause className="w-4 h-4" />,
    label: 'Disabled',
  },
};

export const PlantedToolWidget: React.FC<PlantedToolWidgetProps> = ({
  tool,
  variant = 'default',
  onConfigure,
  onRemove,
  onToggleStatus,
  onViewDetails,
  onViewOutputs,
  showStats = true,
  showActions = true,
  className
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const categoryConfig = CATEGORY_CONFIG[tool.category];
  const statusConfig = STATUS_CONFIG[tool.status];

  const formatTimeAgo = (timestamp?: string): string => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  const handleToggleStatus = async () => {
    if (!onToggleStatus) return;
    
    setIsToggling(true);
    try {
      await onToggleStatus(tool.id, tool.status !== 'active');
    } finally {
      setIsToggling(false);
    }
  };

  const getPrimaryAction = () => {
    switch (tool.status) {
      case 'needs_setup':
        return {
          label: 'Setup Required',
          action: () => onConfigure?.(tool.id),
          variant: 'warning' as const,
          icon: <Settings className="w-4 h-4" />,
        };
      case 'error':
        return {
          label: 'Fix Error',
          action: () => onConfigure?.(tool.id),
          variant: 'error' as const,
          icon: <AlertCircle className="w-4 h-4" />,
        };
      case 'configured':
        return {
          label: 'Activate',
          action: handleToggleStatus,
          variant: 'success' as const,
          icon: <Play className="w-4 h-4" />,
        };
      case 'active':
        return {
          label: 'Configure',
          action: () => onConfigure?.(tool.id),
          variant: 'default' as const,
          icon: <Settings className="w-4 h-4" />,
        };
      default:
        return null;
    }
  };

  const primaryAction = getPrimaryAction();

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className={cn(
          'relative group cursor-pointer overflow-hidden',
          'bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl',
          'border border-[var(--hive-border-primary)]/20 rounded-xl p-3',
          'hover:border-[var(--hive-brand-primary)]/30 transition-all duration-300',
          tool.status === 'error' && 'border-[var(--hive-status-error)]/30',
          tool.status === 'needs_setup' && 'border-[var(--hive-status-warning)]/30',
          className
        )}
        onClick={() => onViewDetails?.(tool.id)}
      >
        <div className="flex items-center gap-3">
          {/* Tool Icon */}
          <div className="w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-lg">
            {tool.icon}
          </div>
          
          {/* Tool Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-[var(--hive-text-primary)] truncate text-sm">
              {tool.name}
            </h4>
            <div className="flex items-center gap-2">
              <div className={cn(
                'flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border',
                statusConfig.bgColor,
                statusConfig.borderColor,
                statusConfig.color
              )}>
                {statusConfig.icon}
                <span>{statusConfig.label}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={cn(
        'relative group cursor-pointer overflow-hidden',
        'bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl',
        'border border-[var(--hive-border-primary)]/20 rounded-2xl p-5',
        'hover:border-[var(--hive-brand-primary)]/30 hover:shadow-lg',
        'transition-all duration-300',
        tool.status === 'error' && 'border-[var(--hive-status-error)]/30',
        tool.status === 'needs_setup' && 'border-[var(--hive-status-warning)]/30',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Tool Icon */}
          <div className="w-12 h-12 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-2xl">
            {tool.icon}
          </div>
          
          {/* Tool Info */}
          <div>
            <h3 className="font-semibold text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)] transition-colors duration-300">
              {tool.name}
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)] line-clamp-1">
              {tool.description}
            </p>
            
            {/* Category & Version */}
            <div className="flex items-center gap-2 mt-1">
              <div className={cn(
                'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border',
                categoryConfig.bgColor,
                categoryConfig.borderColor,
                categoryConfig.color
              )}>
                {categoryConfig.icon}
                <span className="capitalize">{tool.category}</span>
              </div>
              <span className="text-xs text-[var(--hive-text-muted)]">v{tool.version}</span>
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        {showActions && (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-10 w-48 bg-[var(--hive-background-secondary)]/95 backdrop-blur-xl border border-[var(--hive-border-primary)]/30 rounded-xl shadow-lg z-50 py-2"
                >
                  {tool.canConfigure && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onConfigure?.(tool.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Configure Tool
                    </button>
                  )}
                  
                  {tool.outputs && tool.outputs > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewOutputs?.(tool.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      View Posts ({tool.outputs})
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStatus();
                      setShowMenu(false);
                    }}
                    disabled={isToggling}
                    className="w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                  >
                    {tool.status === 'active' ? (
                      <>
                        <Pause className="w-4 h-4" />
                        {isToggling ? 'Disabling...' : 'Disable Tool'}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        {isToggling ? 'Activating...' : 'Activate Tool'}
                      </>
                    )}
                  </button>

                  {tool.canRemove && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove?.(tool.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-[var(--hive-status-error)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Tool
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-xl border',
          statusConfig.bgColor,
          statusConfig.borderColor
        )}>
          {statusConfig.icon}
          <span className={cn('text-sm font-medium', statusConfig.color)}>
            {statusConfig.label}
          </span>
        </div>

        {tool.lastUsed && (
          <span className="text-xs text-[var(--hive-text-muted)]">
            Last used {formatTimeAgo(tool.lastUsed)}
          </span>
        )}
      </div>

      {/* Error Message */}
      {tool.status === 'error' && tool.errorMessage && (
        <div className="mb-4 p-3 bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/20 rounded-xl">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[var(--hive-status-error)] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[var(--hive-status-error)]">Tool Error</p>
              <p className="text-xs text-[var(--hive-text-secondary)] mt-1">{tool.errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {tool.outputs !== undefined && (
            <div className="text-center">
              <div className="text-lg font-bold text-[var(--hive-text-primary)]">
                {tool.outputs}
              </div>
              <div className="text-xs text-[var(--hive-text-muted)]">Posts</div>
            </div>
          )}
          
          {tool.usageCount !== undefined && (
            <div className="text-center">
              <div className="text-lg font-bold text-[var(--hive-text-primary)]">
                {tool.usageCount}
              </div>
              <div className="text-xs text-[var(--hive-text-muted)]">Uses</div>
            </div>
          )}
          
          {tool.interactions !== undefined && (
            <div className="text-center">
              <div className="text-lg font-bold text-[var(--hive-text-primary)]">
                {tool.interactions}
              </div>
              <div className="text-xs text-[var(--hive-text-muted)]">Interactions</div>
            </div>
          )}
        </div>
      )}

      {/* Primary Action */}
      {primaryAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            primaryAction.action();
          }}
          disabled={isToggling}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 disabled:opacity-50',
            primaryAction.variant === 'warning' && 'bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border border-[var(--hive-status-warning)]/40 hover:bg-[var(--hive-status-warning)]/30',
            primaryAction.variant === 'error' && 'bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)] border border-[var(--hive-status-error)]/40 hover:bg-[var(--hive-status-error)]/30',
            primaryAction.variant === 'success' && 'bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/40 hover:bg-[var(--hive-status-success)]/30',
            primaryAction.variant === 'default' && 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30'
          )}
        >
          {primaryAction.icon}
          <span>{isToggling ? 'Loading...' : primaryAction.label}</span>
        </motion.button>
      )}

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[var(--hive-brand-primary)]/2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  );
};

export default PlantedToolWidget;