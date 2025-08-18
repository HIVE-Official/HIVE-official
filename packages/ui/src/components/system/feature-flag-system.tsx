/**
 * HIVE Feature Flag System
 * Centralized feature management for easy activation/deactivation
 */

import React, { useState, useCallback, createContext, useContext, useEffect } from 'react';
import { Button } from '../../ui/button';
import { HiveBadge as Badge } from '../index';
import { 
  Settings, 
  Eye, 
  EyeOff,
  Users,
  MessageSquare,
  Bell,
  Star,
  Zap,
  Code,
  Heart,
  Share,
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Layers,
  Database,
  Shield,
  Activity,
  TrendingUp,
  BarChart3,
  Compass,
  Palette,
  Smartphone,
  Monitor,
  Globe,
  Lock,
  Key,
  Calendar,
  Mail,
  Phone,
  Video,
  Mic,
  Camera,
  MapPin,
  Navigation,
  Bookmark,
  Archive,
  Download,
  Upload,
  Link,
  ExternalLink,
  Copy,
  Scissors,
  Edit3,
  Trash2,
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  Info,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  category: 'social' | 'tools' | 'communication' | 'ui' | 'system' | 'analytics' | 'experimental';
  status: 'enabled' | 'disabled' | 'beta' | 'deprecated';
  isEnabled: boolean;
  dependencies?: string[];
  rolloutPercentage?: number;
  userGroups?: string[];
  environment?: ('development' | 'staging' | 'production')[];
  createdAt: string;
  lastModified: string;
  modifiedBy: string;
  version: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  metrics?: {
    usageCount: number;
    errorRate: number;
    performanceImpact: number;
    userSatisfaction: number;
  };
  metadata?: Record<string, any>;
}

export interface FeatureFlagGroup {
  id: string;
  name: string;
  description: string;
  flags: string[];
  isCollapsed?: boolean;
}

interface FeatureFlagSystemProps {
  flags: FeatureFlag[];
  groups?: FeatureFlagGroup[];
  currentUserId: string;
  userRole: 'admin' | 'developer' | 'user';
  environment: 'development' | 'staging' | 'production';
  onToggleFlag?: (flagId: string, enabled: boolean) => Promise<void>;
  onUpdateFlag?: (flagId: string, updates: Partial<FeatureFlag>) => Promise<void>;
  onBulkToggle?: (flagIds: string[], enabled: boolean) => Promise<void>;
  onExportFlags?: (format: 'json' | 'csv') => Promise<void>;
  onImportFlags?: (data: any) => Promise<void>;
  enableFeatureFlag?: boolean;
}

interface FeatureFlagContextType {
  flags: Record<string, boolean>;
  isEnabled: (flagId: string) => boolean;
  toggleFlag: (flagId: string) => void;
  refreshFlags: () => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | null>(null);

export const useFeatureFlag = (flagId: string): boolean => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    console.warn(`Feature flag context not found. Defaulting ${flagId} to false.`);
    return false;
  }
  return context.isEnabled(flagId);
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    console.warn('Feature flag context not found. Returning default values.');
    return {
      flags: {},
      isEnabled: () => false,
      toggleFlag: () => {},
      refreshFlags: () => {}
    };
  }
  return context;
};

// Default feature flags for HIVE platform
export const DEFAULT_FEATURE_FLAGS: FeatureFlag[] = [
  // Social Features
  {
    id: 'comments-system',
    name: 'Comments System',
    description: 'Threaded comments with real-time updates and social interactions',
    category: 'social',
    status: 'enabled',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '1.0.0',
    impact: 'high',
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.1,
      userSatisfaction: 0
    }
  },
  {
    id: 'direct-messaging',
    name: 'Direct Messaging',
    description: 'Real-time chat and messaging system with file sharing',
    category: 'communication',
    status: 'enabled',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '1.0.0',
    impact: 'high',
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.2,
      userSatisfaction: 0
    }
  },
  {
    id: 'follow-system',
    name: 'Follow System',
    description: 'Follow/unfollow users and spaces with notifications',
    category: 'social',
    status: 'enabled',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '1.0.0',
    impact: 'medium',
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.05,
      userSatisfaction: 0
    }
  },
  {
    id: 'notifications-center',
    name: 'Notifications Center',
    description: 'Real-time notification system with categorization',
    category: 'communication',
    status: 'enabled',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '1.0.0',
    impact: 'high',
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.1,
      userSatisfaction: 0
    }
  },
  // Tool Features
  {
    id: 'tool-reviews',
    name: 'Tool Reviews & Ratings',
    description: 'Complete review system for tools with ratings and feedback',
    category: 'tools',
    status: 'enabled',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '1.0.0',
    impact: 'medium',
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.05,
      userSatisfaction: 0
    }
  },
  {
    id: 'live-tool-execution',
    name: 'Live Tool Execution',
    description: 'Real-time tool execution with collaborative features',
    category: 'tools',
    status: 'beta',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '1.0.0',
    impact: 'critical',
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.3,
      userSatisfaction: 0
    }
  },
  {
    id: 'space-creation',
    name: 'Space Creation Flow',
    description: 'Complete space creation with advanced configuration',
    category: 'social',
    status: 'enabled',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '1.0.0',
    impact: 'high',
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.1,
      userSatisfaction: 0
    }
  },
  // System Features
  {
    id: 'integration-connections',
    name: 'Third-party Integrations',
    description: 'Connect external services and manage permissions',
    category: 'system',
    status: 'enabled',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '1.0.0',
    impact: 'medium',
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.1,
      userSatisfaction: 0
    }
  },
  // Analytics Features
  {
    id: 'advanced-analytics',
    name: 'Advanced Analytics',
    description: 'Detailed usage analytics and insights dashboard',
    category: 'analytics',
    status: 'beta',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '1.0.0',
    impact: 'low',
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.05,
      userSatisfaction: 0
    }
  },
  // Experimental Features
  {
    id: 'ai-assistance',
    name: 'AI-Powered Assistance',
    description: 'AI-driven suggestions and automated workflows',
    category: 'experimental',
    status: 'beta',
    isEnabled: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastModified: '2024-01-01T00:00:00Z',
    modifiedBy: 'system',
    version: '0.1.0',
    impact: 'medium',
    rolloutPercentage: 10,
    userGroups: ['beta-testers'],
    environment: ['development', 'staging'],
    metrics: {
      usageCount: 0,
      errorRate: 0,
      performanceImpact: 0.2,
      userSatisfaction: 0
    }
  }
];

const FeatureFlagCard: React.FC<{
  flag: FeatureFlag;
  canEdit: boolean;
  onToggle: (flagId: string, enabled: boolean) => Promise<void>;
  onUpdate?: (flagId: string, updates: Partial<FeatureFlag>) => Promise<void>;
}> = ({ flag, canEdit, onToggle, onUpdate }) => {
  const [isToggling, setIsToggling] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = useCallback(async () => {
    if (!canEdit || isToggling) return;
    
    setIsToggling(true);
    try {
      await onToggle(flag.id, !flag.isEnabled);
    } finally {
      setIsToggling(false);
    }
  }, [flag.id, flag.isEnabled, onToggle, canEdit, isToggling]);

  const getCategoryIcon = (category: FeatureFlag['category']) => {
    switch (category) {
      case 'social': return Users;
      case 'tools': return Zap;
      case 'communication': return MessageSquare;
      case 'ui': return Palette;
      case 'system': return Settings;
      case 'analytics': return BarChart3;
      case 'experimental': return Activity;
      default: return Settings;
    }
  };

  const getCategoryColor = (category: FeatureFlag['category']) => {
    switch (category) {
      case 'social': return 'text-blue-400';
      case 'tools': return 'text-yellow-400';
      case 'communication': return 'text-green-400';
      case 'ui': return 'text-purple-400';
      case 'system': return 'text-gray-400';
      case 'analytics': return 'text-orange-400';
      case 'experimental': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: FeatureFlag['status']) => {
    switch (status) {
      case 'enabled': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'disabled': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'beta': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'deprecated': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getImpactColor = (impact: FeatureFlag['impact']) => {
    switch (impact) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const CategoryIcon = getCategoryIcon(flag.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl hover:bg-[var(--hive-background-secondary)]/50 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`w-8 h-8 rounded-lg bg-[var(--hive-background-secondary)] flex items-center justify-center ${getCategoryColor(flag.category)}`}>
            <CategoryIcon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-[var(--hive-text-primary)] truncate">{flag.name}</h3>
              <Badge size="sm" className={getStatusColor(flag.status)}>
                {flag.status}
              </Badge>
              {flag.rolloutPercentage && flag.rolloutPercentage < 100 && (
                <Badge size="sm" variant="outline">
                  {flag.rolloutPercentage}%
                </Badge>
              )}
            </div>
            <p className="text-sm text-[var(--hive-text-secondary)] leading-relaxed mb-2">
              {flag.description}
            </p>
            <div className="flex items-center space-x-3 text-xs text-[var(--hive-text-muted)]">
              <span className="capitalize">{flag.category}</span>
              <span>v{flag.version}</span>
              <span className={`capitalize ${getImpactColor(flag.impact)}`}>
                {flag.impact} impact
              </span>
              {flag.metrics && (
                <span>{flag.metrics.usageCount} uses</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </Button>
          
          {canEdit && (
            <Button
              variant="ghost"
              size="xs"
              onClick={handleToggle}
              disabled={isToggling}
              className={`${flag.isEnabled ? 'text-green-400' : 'text-gray-400'}`}
            >
              {isToggling ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : flag.isEnabled ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <Circle className="w-3 h-3" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`text-sm font-medium ${flag.isEnabled ? 'text-green-400' : 'text-gray-400'}`}>
            {flag.isEnabled ? 'Enabled' : 'Disabled'}
          </div>
          {flag.dependencies && flag.dependencies.length > 0 && (
            <Badge size="xs" variant="outline" className="flex items-center space-x-1">
              <Link className="w-2 h-2" />
              <span>{flag.dependencies.length}</span>
            </Badge>
          )}
        </div>

        {canEdit && (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={flag.isEnabled}
              onChange={() => handleToggle()}
              disabled={isToggling}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        )}
      </div>

      {/* Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-3 border-t border-[var(--hive-border-subtle)] space-y-3"
          >
            {/* Dependencies */}
            {flag.dependencies && flag.dependencies.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-[var(--hive-text-primary)] mb-1">Dependencies</h4>
                <div className="flex flex-wrap gap-1">
                  {flag.dependencies.map((dep) => (
                    <Badge key={dep} size="xs" variant="outline">
                      {dep}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Environment */}
            {flag.environment && (
              <div>
                <h4 className="text-xs font-medium text-[var(--hive-text-primary)] mb-1">Environment</h4>
                <div className="flex flex-wrap gap-1">
                  {flag.environment.map((env) => (
                    <Badge key={env} size="xs" variant="secondary">
                      {env}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* User Groups */}
            {flag.userGroups && flag.userGroups.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-[var(--hive-text-primary)] mb-1">User Groups</h4>
                <div className="flex flex-wrap gap-1">
                  {flag.userGroups.map((group) => (
                    <Badge key={group} size="xs" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Metrics */}
            {flag.metrics && (
              <div>
                <h4 className="text-xs font-medium text-[var(--hive-text-primary)] mb-2">Performance</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--hive-text-muted)]">Usage:</span>
                    <span className="text-[var(--hive-text-secondary)]">{flag.metrics.usageCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hive-text-muted)]">Error Rate:</span>
                    <span className={`${flag.metrics.errorRate > 5 ? 'text-red-400' : 'text-green-400'}`}>
                      {(flag.metrics.errorRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hive-text-muted)]">Performance:</span>
                    <span className={`${flag.metrics.performanceImpact > 0.2 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {(flag.metrics.performanceImpact * 100).toFixed(0)}ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hive-text-muted)]">Satisfaction:</span>
                    <span className="text-[var(--hive-text-secondary)]">
                      {flag.metrics.userSatisfaction > 0 ? `${(flag.metrics.userSatisfaction * 100).toFixed(0)}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="pt-2 border-t border-[var(--hive-border-subtle)] text-xs text-[var(--hive-text-muted)]">
              <div className="flex justify-between">
                <span>Created: {new Date(flag.createdAt).toLocaleDateString()}</span>
                <span>Modified: {new Date(flag.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="mt-1">
                Modified by: {flag.modifiedBy}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Circle: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
  </svg>
);

export const FeatureFlagProvider: React.FC<{
  children: React.ReactNode;
  initialFlags?: Record<string, boolean>;
}> = ({ children, initialFlags = {} }) => {
  const [flags, setFlags] = useState<Record<string, boolean>>(initialFlags);

  const isEnabled = useCallback((flagId: string): boolean => {
    return flags[flagId] ?? false;
  }, [flags]);

  const toggleFlag = useCallback((flagId: string) => {
    setFlags(prev => ({
      ...prev,
      [flagId]: !prev[flagId]
    }));
  }, []);

  const refreshFlags = useCallback(() => {
    // This would typically fetch from an API
    console.log('Refreshing feature flags...');
  }, []);

  const value: FeatureFlagContextType = {
    flags,
    isEnabled,
    toggleFlag,
    refreshFlags
  };

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const FeatureFlagSystem: React.FC<FeatureFlagSystemProps> = ({
  flags,
  groups = [],
  currentUserId,
  userRole,
  environment,
  onToggleFlag,
  onUpdateFlag,
  onBulkToggle,
  onExportFlags,
  onImportFlags,
  enableFeatureFlag = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // Feature flag check
  if (!enableFeatureFlag) return null;

  const canEdit = userRole === 'admin' || userRole === 'developer';

  const filteredFlags = React.useMemo(() => {
    return flags.filter(flag => {
      // Search filter
      if (searchQuery && !flag.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !flag.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filterCategory !== 'all' && flag.category !== filterCategory) {
        return false;
      }

      // Status filter
      if (filterStatus !== 'all' && flag.status !== filterStatus) {
        return false;
      }

      // Environment filter
      if (flag.environment && !flag.environment.includes(environment)) {
        return false;
      }

      return true;
    });
  }, [flags, searchQuery, filterCategory, filterStatus, environment]);

  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(flags.map(f => f.category)));
    return cats.sort();
  }, [flags]);

  const statuses = React.useMemo(() => {
    const stats = Array.from(new Set(flags.map(f => f.status)));
    return stats.sort();
  }, [flags]);

  const handleBulkToggle = useCallback(async (enabled: boolean) => {
    if (selectedFlags.length === 0) return;
    await onBulkToggle?.(selectedFlags, enabled);
    setSelectedFlags([]);
    setShowBulkActions(false);
  }, [selectedFlags, onBulkToggle]);

  const handleSelectAll = useCallback(() => {
    if (selectedFlags.length === filteredFlags.length) {
      setSelectedFlags([]);
    } else {
      setSelectedFlags(filteredFlags.map(f => f.id));
    }
  }, [selectedFlags, filteredFlags]);

  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  }, []);

  const getFlagStats = () => {
    const enabled = flags.filter(f => f.isEnabled).length;
    const total = flags.length;
    const beta = flags.filter(f => f.status === 'beta').length;
    const experimental = flags.filter(f => f.category === 'experimental').length;
    
    return { enabled, total, beta, experimental };
  };

  const stats = getFlagStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">Feature Flags</h2>
          <p className="text-[var(--hive-text-secondary)] mt-1">
            Manage and monitor feature rollouts across {environment}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {canEdit && (
            <>
              <Button
                variant="outline"
                onClick={() => onExportFlags?.('json')}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('import-input')?.click()}
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </Button>
              <input
                id="import-input"
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  // Handle file import
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const data = JSON.parse(event.target?.result as string);
                        onImportFlags?.(data);
                      } catch (error) {
                        console.error('Failed to parse import file:', error);
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
              />
            </>
          )}
          <Button
            onClick={() => window.location.reload()}
            className="bg-[var(--hive-primary)] text-white flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-lg font-semibold text-[var(--hive-text-primary)]">{stats.enabled}</div>
              <div className="text-sm text-[var(--hive-text-muted)]">Enabled</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-[var(--hive-text-muted)]" />
            <div>
              <div className="text-lg font-semibold text-[var(--hive-text-primary)]">{stats.total}</div>
              <div className="text-sm text-[var(--hive-text-muted)]">Total Flags</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-lg font-semibold text-[var(--hive-text-primary)]">{stats.beta}</div>
              <div className="text-sm text-[var(--hive-text-muted)]">Beta Features</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-pink-400" />
            <div>
              <div className="text-lg font-semibold text-[var(--hive-text-primary)]">{stats.experimental}</div>
              <div className="text-sm text-[var(--hive-text-muted)]">Experimental</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" />
          <input
            type="text"
            placeholder="Search feature flags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-primary)]"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category} className="capitalize">
              {category}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-primary)]"
        >
          <option value="all">All Statuses</option>
          {statuses.map(status => (
            <option key={status} value={status} className="capitalize">
              {status}
            </option>
          ))}
        </select>

        {canEdit && (
          <Button
            variant="outline"
            onClick={() => setShowBulkActions(!showBulkActions)}
            className="flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Bulk Actions</span>
          </Button>
        )}
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {showBulkActions && canEdit && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSelectAll}
                >
                  {selectedFlags.length === filteredFlags.length ? 'Deselect All' : 'Select All'}
                </Button>
                <span className="text-sm text-[var(--hive-text-muted)]">
                  {selectedFlags.length} selected
                </span>
              </div>
              
              {selectedFlags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleBulkToggle(true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Enable Selected
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleBulkToggle(false)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Disable Selected
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Flags List */}
      <div className="space-y-4">
        {filteredFlags.length === 0 ? (
          <div className="text-center py-12">
            <Settings className="w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
              No feature flags found
            </h3>
            <p className="text-[var(--hive-text-muted)]">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFlags.map((flag) => (
              <div key={flag.id} className="relative">
                {showBulkActions && canEdit && (
                  <input
                    type="checkbox"
                    checked={selectedFlags.includes(flag.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFlags(prev => [...prev, flag.id]);
                      } else {
                        setSelectedFlags(prev => prev.filter(id => id !== flag.id));
                      }
                    }}
                    className="absolute top-2 left-2 z-10"
                  />
                )}
                <FeatureFlagCard
                  flag={flag}
                  canEdit={canEdit}
                  onToggle={onToggleFlag || (() => Promise.resolve())}
                  onUpdate={onUpdateFlag}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};