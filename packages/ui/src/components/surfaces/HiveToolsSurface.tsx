"use client";

import React, { useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { HiveCard, HiveCardHeader, HiveCardTitle, HiveCardContent } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { Avatar as HiveAvatar } from '../../atomic/atoms/avatar';
import { 
  Wrench,
  Plus,
  ExternalLink,
  Star,
  Users,
  TrendingUp,
  Settings,
  Share2,
  Heart,
  MessageCircle,
  MoreVertical,
  Zap,
  Calendar,
  FileText,
  BarChart,
  Globe,
  Lock,
  Unlock,
  Code,
  Palette,
  Database,
  Cloud
} from 'lucide-react';
import { useFirebaseRealtime, useOptimisticUpdates } from '../../hooks/use-live-updates';
import { formatDistanceToNow } from 'date-fns';

// Types
interface SpaceTool {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'collaboration' | 'analytics' | 'automation' | 'social' | 'custom';
  icon?: string;
  coverImage?: string;
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  stats: {
    users: number;
    rating: number;
    reviews: number;
  };
  status: 'active' | 'beta' | 'coming_soon' | 'deprecated';
  visibility: 'public' | 'space' | 'private';
  url?: string;
  integrations?: string[];
  features?: string[];
  lastUpdated: Date;
  price?: {
    type: 'free' | 'paid' | 'freemium';
    amount?: string;
  };
  isInstalled?: boolean;
  isFavorite?: boolean;
}

export interface HiveToolsSurfaceProps {
  spaceId: string;
  spaceName?: string;
  isLeader?: boolean;
  currentUserId?: string;
  className?: string;
  variant?: 'widget' | 'full' | 'compact';
  tools?: SpaceTool[];
  loading?: boolean;
  error?: Error | null;
  onCreateTool?: () => void;
  onInstallTool?: (toolId: string) => Promise<void>;
  onUninstallTool?: (toolId: string) => Promise<void>;
  onFavoriteTool?: (toolId: string) => Promise<void>;
  onConfigureTool?: (toolId: string) => void;
}

// Category configuration
const categoryConfig = {
  productivity: {
    label: 'Productivity',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-700'
  },
  collaboration: {
    label: 'Collaboration',
    icon: Users,
    color: 'bg-blue-100 text-blue-700'
  },
  analytics: {
    label: 'Analytics',
    icon: BarChart,
    color: 'bg-purple-100 text-purple-700'
  },
  automation: {
    label: 'Automation',
    icon: Settings,
    color: 'bg-green-100 text-green-700'
  },
  social: {
    label: 'Social',
    icon: Heart,
    color: 'bg-pink-100 text-pink-700'
  },
  custom: {
    label: 'Custom',
    icon: Code,
    color: 'bg-gray-100 text-gray-700'
  }
};

// Tool icons mapping
const toolIcons: Record<string, React.FC<{ className?: string }>> = {
  calendar: Calendar,
  document: FileText,
  analytics: BarChart,
  global: Globe,
  code: Code,
  design: Palette,
  database: Database,
  cloud: Cloud,
  settings: Settings
};

// Tool Card Component
const ToolCard: React.FC<{
  tool: SpaceTool;
  isLeader: boolean;
  variant?: 'widget' | 'full' | 'compact';
  onInstall?: () => void;
  onUninstall?: () => void;
  onFavorite?: () => void;
  onConfigure?: () => void;
  onView?: () => void;
}> = ({ 
  tool, 
  isLeader, 
  variant = 'widget',
  onInstall,
  onUninstall,
  onFavorite,
  onConfigure,
  onView
}) => {
  const [showActions, setShowActions] = useState(false);
  
  const categoryInfo = categoryConfig[tool.category];
  const CategoryIcon = categoryInfo.icon;
  const ToolIcon = tool.icon ? toolIcons[tool.icon] || Wrench : Wrench;

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700' },
    beta: { label: 'Beta', color: 'bg-yellow-100 text-yellow-700' },
    coming_soon: { label: 'Coming Soon', color: 'bg-blue-100 text-blue-700' },
    deprecated: { label: 'Deprecated', color: 'bg-red-100 text-red-700' }
  };

  const priceConfig = {
    free: { label: 'Free', color: 'text-green-600' },
    paid: { label: tool.price?.amount || 'Paid', color: 'text-gray-600' },
    freemium: { label: 'Freemium', color: 'text-blue-600' }
  };

  return (
    <HiveCard className={cn(
      "hover:shadow-md transition-all group",
      variant === 'compact' && "p-3",
      tool.status === 'deprecated' && "opacity-60"
    )}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {/* Tool Icon */}
            <div className={cn(
              "p-3 rounded-lg shrink-0",
              tool.isInstalled ? "bg-orange-50" : "bg-gray-50"
            )}>
              <ToolIcon className={cn(
                "h-6 w-6",
                tool.isInstalled ? "text-[var(--hive-gold-dark)]" : "text-gray-600"
              )} />
            </div>

            {/* Tool Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 truncate">
                  {tool.name}
                </h3>
                {tool.isInstalled && (
                  <HiveBadge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    Installed
                  </HiveBadge>
                )}
                {tool.status !== 'active' && (
                  <HiveBadge 
                    variant="secondary" 
                    className={cn("text-xs", statusConfig[tool.status].color)}
                  >
                    {statusConfig[tool.status].label}
                  </HiveBadge>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {tool.description}
              </p>

              {/* Category & Price */}
              <div className="flex items-center gap-3 mt-2">
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs",
                  categoryInfo.color
                )}>
                  <CategoryIcon className="h-3 w-3" />
                  {categoryInfo.label}
                </span>
                {tool.price && (
                  <span className={cn("text-xs font-medium", priceConfig[tool.price.type].color)}>
                    {priceConfig[tool.price.type].label}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-6 w-48 bg-[var(--hive-white)] rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View tool
                  </a>
                )}
                
                {!tool.isInstalled && tool.status === 'active' && (
                  <button
                    onClick={() => {
                      onInstall?.();
                      setShowActions(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Install tool
                  </button>
                )}
                
                {tool.isInstalled && (
                  <>
                    <button
                      onClick={() => {
                        onConfigure?.();
                        setShowActions(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Configure
                    </button>
                    
                    <button
                      onClick={() => {
                        onUninstall?.();
                        setShowActions(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <MoreVertical className="h-4 w-4" />
                      Uninstall
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => {
                    onFavorite?.();
                    setShowActions(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Star className={cn("h-4 w-4", tool.isFavorite && "fill-current text-[var(--hive-gold)]")} />
                  {tool.isFavorite ? 'Unfavorite' : 'Add to favorites'}
                </button>
                
                <button
                  onClick={() => setShowActions(false)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share tool
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features (Full variant only) */}
        {variant === 'full' && tool.features && tool.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tool.features.slice(0, 3).map((feature: any) => (
              <span key={feature} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {feature}
              </span>
            ))}
            {tool.features.length > 3 && (
              <span className="text-xs px-2 py-1 text-gray-500">
                +{tool.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {tool.stats.users} users
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-[var(--hive-gold)]" />
              {tool.stats.rating.toFixed(1)}
            </span>
            <span className="text-gray-500">
              ({tool.stats.reviews} reviews)
            </span>
          </div>

          {/* Visibility indicator */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {tool.visibility === 'private' ? (
              <>
                <Lock className="h-3 w-3" />
                Private
              </>
            ) : tool.visibility === 'space' ? (
              <>
                <Users className="h-3 w-3" />
                Space only
              </>
            ) : (
              <>
                <Unlock className="h-3 w-3" />
                Public
              </>
            )}
          </div>
        </div>

        {/* Creator & Last Updated */}
        {variant === 'full' && (
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <HiveAvatar
                src={tool.creator.avatar}
                alt={tool.creator.name}
                initials={tool.creator.name.slice(0, 2).toUpperCase()}
                size="xs"
              />
              <span>by {tool.creator.name}</span>
            </div>
            <span>Updated {formatDistanceToNow(tool.lastUpdated, { addSuffix: true })}</span>
          </div>
        )}
      </div>
    </HiveCard>
  );
};

// Main Surface Component
export const HiveToolsSurface: React.FC<HiveToolsSurfaceProps> = ({
  spaceId,
  spaceName,
  isLeader = false,
  currentUserId,
  className,
  variant = 'widget',
  tools: propTools,
  loading = false,
  error = null,
  onCreateTool,
  onInstallTool,
  onUninstallTool,
  onFavoriteTool,
  onConfigureTool,
}) => {
  const [filter, setFilter] = useState<'all' | 'installed' | 'available'>('all');
  const [categoryFilter, setCategoryFilter] = useState<SpaceTool['category'] | 'all'>('all');

  // No mock data - use real tools only
  const emptyTools: SpaceTool[] = [];
  
  /* Removed mock data
  const mockTools: SpaceTool[] = useMemo(() => [
    {
      id: '1',
      name: 'Task Manager Pro',
      description: 'Advanced task management with Kanban boards, Gantt charts, and team collaboration features.',
      category: 'productivity',
      icon: 'calendar',
      creator: {
        id: '1',
        name: 'Sarah Chen'
      },
      stats: {
        users: 234,
        rating: 4.8,
        reviews: 45
      },
      status: 'active',
      visibility: 'public',
      url: 'https://taskmanager.example.com',
      features: ['Kanban boards', 'Gantt charts', 'Time tracking', 'Team collaboration'],
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      price: { type: 'freemium' },
      isInstalled: true,
      isFavorite: true
    },
    {
      id: '2',
      name: 'Analytics Dashboard',
      description: 'Real-time analytics and insights for your space activities and member engagement.',
      category: 'analytics',
      icon: 'analytics',
      creator: {
        id: '2',
        name: 'Marcus Johnson'
      },
      stats: {
        users: 156,
        rating: 4.6,
        reviews: 28
      },
      status: 'active',
      visibility: 'space',
      features: ['Real-time data', 'Custom reports', 'Export to CSV', 'API access'],
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      price: { type: 'free' },
      isInstalled: true
    },
    {
      id: '3',
      name: 'Meeting Scheduler',
      description: 'Smart scheduling tool that finds the best time for everyone and integrates with calendars.',
      category: 'collaboration',
      icon: 'calendar',
      creator: {
        id: '3',
        name: 'Emily Rodriguez'
      },
      stats: {
        users: 89,
        rating: 4.3,
        reviews: 12
      },
      status: 'beta',
      visibility: 'public',
      url: 'https://scheduler.example.com',
      features: ['Calendar sync', 'Time zone support', 'Availability finder'],
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      price: { type: 'free' },
      isInstalled: false
    },
    {
      id: '4',
      name: 'Code Review Bot',
      description: 'Automated code review assistant that helps maintain code quality and standards.',
      category: 'automation',
      icon: 'code',
      creator: {
        id: '4',
        name: 'Alex Kim'
      },
      stats: {
        users: 67,
        rating: 4.5,
        reviews: 8
      },
      status: 'active',
      visibility: 'public',
      features: ['GitHub integration', 'Style checking', 'Security scanning'],
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
      price: { type: 'paid', amount: '$10/mo' },
      isInstalled: false
    },
    {
      id: '5',
      name: 'Social Feed Widget',
      description: 'Embed your space\'s social feed anywhere with customizable themes and filters.',
      category: 'social',
      icon: 'global',
      creator: {
        id: '1',
        name: 'Sarah Chen'
      },
      stats: {
        users: 45,
        rating: 4.2,
        reviews: 6
      },
      status: 'coming_soon',
      visibility: 'public',
      features: ['Embeddable widget', 'Custom themes', 'Content filtering'],
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      price: { type: 'free' },
      isInstalled: false
    }
  ], []);
  */

  // Real-time tools data
  const { data: realtimeTools, loading: realtimeLoading, error: realtimeError } = useFirebaseRealtime<SpaceTool>(
    'tools',
    [{ field: 'spaceId', operator: '==', value: spaceId }],
    'createdAt',
    20,
    [spaceId]
  );
  const { data: optimisticTools } = useOptimisticUpdates<SpaceTool>(propTools || realtimeTools || []);
  
  // Use optimistic tools for immediate UI updates
  const tools = optimisticTools || emptyTools;
  const isLoading = loading || realtimeLoading;
  const displayError = error || realtimeError;

  // Filter tools
  const filteredTools = useMemo(() => {
    let filtered = [...tools];

    // Filter by installation status
    if (filter === 'installed') {
      filtered = filtered.filter(t => t.isInstalled);
    } else if (filter === 'available') {
      filtered = filtered.filter(t => !t.isInstalled);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    // Sort by popularity (users) and rating
    filtered.sort((a, b) => {
      if (a.isInstalled !== b.isInstalled) {
        return a.isInstalled ? -1 : 1;
      }
      return (b.stats.users * b.stats.rating) - (a.stats.users * a.stats.rating);
    });

    return filtered;
  }, [tools, filter, categoryFilter]);

  // Stats
  const stats = useMemo(() => {
    const installed = tools.filter(t => t.isInstalled).length;
    const favorites = tools.filter(t => t.isFavorite).length;
    return { installed, favorites, total: tools.length };
  }, [tools]);

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-20 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i: any) => (
              <div key={i} className="bg-gray-100 rounded-lg h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (displayError) {
    return (
      <HiveCard className={cn("p-6", className)}>
        <div className="text-center space-y-2">
          <p className="text-gray-600">Unable to load tools</p>
          <p className="text-sm text-gray-500">{displayError.message}</p>
        </div>
      </HiveCard>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {variant === 'full' && spaceName ? `${spaceName} Tools` : 'Tools'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {stats.installed} installed • {stats.total - stats.installed} available
          </p>
        </div>

        <div className="flex items-center gap-2">
          {variant === 'full' && (
            <>
              <select
                value={filter}
                onChange={(e: any) => setFilter(e.target.value as any)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)]"
              >
                <option value="all">All Tools</option>
                <option value="installed">Installed</option>
                <option value="available">Available</option>
              </select>
              
              <select
                value={categoryFilter}
                onChange={(e: any) => setCategoryFilter(e.target.value as any)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)]"
              >
                <option value="all">All Categories</option>
                <option value="productivity">Productivity</option>
                <option value="collaboration">Collaboration</option>
                <option value="analytics">Analytics</option>
                <option value="automation">Automation</option>
                <option value="social">Social</option>
                <option value="custom">Custom</option>
              </select>
            </>
          )}

          {isLeader && (
            <HiveButton
              variant="primary"
              size="sm"
              onClick={onCreateTool}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {variant === 'widget' ? 'Add' : 'Create Tool'}
            </HiveButton>
          )}
        </div>
      </div>

      {/* Tools Grid */}
      <div className={cn(
        "grid gap-4",
        variant === 'full' ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
      )}>
        {filteredTools.length === 0 ? (
          <HiveCard className="col-span-full p-8">
            <div className="text-center space-y-2">
              <Wrench className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="text-gray-600">No tools found</p>
              <p className="text-sm text-gray-500">
                {filter === 'installed' 
                  ? "Install tools to enhance your space" 
                  : isLeader 
                    ? "Create or install tools for your community"
                    : "Check back later for new tools"}
              </p>
            </div>
          </HiveCard>
        ) : (
          filteredTools
            .slice(0, variant === 'widget' ? 4 : undefined)
            .map((tool: any) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isLeader={isLeader}
                variant={variant}
                onInstall={() => onInstallTool?.(tool.id)}
                onUninstall={() => onUninstallTool?.(tool.id)}
                onFavorite={() => onFavoriteTool?.(tool.id)}
                onConfigure={() => onConfigureTool?.(tool.id)}
                onView={() => console.log('View tool:', tool.id)}
              />
            ))
        )}
      </div>

      {/* View More for widget variant */}
      {variant === 'widget' && filteredTools.length > 4 && (
        <button className="w-full py-2 text-sm text-[var(--hive-gold-dark)] hover:text-orange-700 font-medium">
          Browse all {filteredTools.length} tools →
        </button>
      )}
    </div>
  );
};

// Export display name for debugging
HiveToolsSurface.displayName = 'HiveToolsSurface';