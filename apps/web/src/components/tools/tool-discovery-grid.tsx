"use client";

import { useState, useMemo } from 'react';
import { logger } from '@/lib/logger';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Star, 
  Download, 
  TrendingUp,
  Clock,
  Users,
  Search,
  Filter,
  Grid,
  List,
  Code,
  Palette,
  Database,
  BarChart3,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  Shield,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Check,
  Plus
} from 'lucide-react';
import { Button, Badge, Input, Card } from '@hive/ui';
import { cn } from '@hive/ui';
import toast from '@/hooks/use-toast-notifications';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';
import { LoadingSkeleton, GridSkeleton } from '../ui/loading-skeleton';
import { CustomEmpty } from '../ui/empty-state';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: 'productivity' | 'analytics' | 'communication' | 'automation' | 'design' | 'data' | 'security' | 'other';
  author: {
    id: string;
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  stats: {
    installs: number;
    rating: number;
    reviews: number;
  };
  version: string;
  updatedAt: string;
  tags: string[];
  isPremium?: boolean;
  isInstalled?: boolean;
  isFeatured?: boolean;
  screenshots?: string[];
}

interface ToolDiscoveryGridProps {
  spaceId?: string;
  onInstall?: (tool: Tool) => void;
  className?: string;
}

const categoryConfig = {
  productivity: { icon: Zap, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10', label: 'Productivity' },
  analytics: { icon: BarChart3, color: 'text-blue-400', bgColor: 'bg-blue-400/10', label: 'Analytics' },
  communication: { icon: MessageSquare, color: 'text-green-400', bgColor: 'bg-green-400/10', label: 'Communication' },
  automation: { icon: Settings, color: 'text-purple-400', bgColor: 'bg-purple-400/10', label: 'Automation' },
  design: { icon: Palette, color: 'text-pink-400', bgColor: 'bg-pink-400/10', label: 'Design' },
  data: { icon: Database, color: 'text-indigo-400', bgColor: 'bg-indigo-400/10', label: 'Data' },
  security: { icon: Shield, color: 'text-red-400', bgColor: 'bg-red-400/10', label: 'Security' },
  other: { icon: Code, color: 'text-gray-400', bgColor: 'bg-gray-400/10', label: 'Other' }
};

export function ToolDiscoveryGrid({ spaceId, onInstall, className }: ToolDiscoveryGridProps) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [installingTools, setInstallingTools] = useState<Set<string>>(new Set());

  // Fetch tools
  useState(() => {
    const fetchTools = async () => {
      try {
        const response = await authenticatedFetch('/api/tools/marketplace');
        if (!response.ok) throw new Error('Failed to fetch tools');
        
        const data = await response.json();
        setTools(data.tools || []);
      } catch (error) {
        logger.error('Failed to fetch tools:', { error: String(error) });
        toast.error('Failed to load tools marketplace');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  });

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Sorting
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.stats.installs - a.stats.installs);
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.stats.rating - a.stats.rating);
        break;
    }

    return filtered;
  }, [tools, searchTerm, selectedCategory, sortBy]);

  const handleInstall = async (tool: Tool) => {
    if (!spaceId) {
      toast.error('Select a space first', 'Please select a space to install this tool');
      return;
    }

    setInstallingTools(prev => new Set(prev).add(tool.id));

    try {
      const response = await authenticatedFetch(`/api/spaces/${spaceId}/tools/install`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: tool.id })
      });

      if (!response.ok) throw new Error('Failed to install tool');

      toast.toolInstalled(tool.name);
      
      // Update tool state
      setTools(prev => prev.map(t => 
        t.id === tool.id ? { ...t, isInstalled: true } : t
      ));

      if (onInstall) onInstall(tool);
    } catch (error) {
      logger.error('Failed to install tool:', { error: String(error) });
      toast.error('Failed to install tool', 'Please try again');
    } finally {
      setInstallingTools(prev => {
        const updated = new Set(prev);
        updated.delete(tool.id);
        return updated;
      });
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header & Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              placeholder="Search tools..."
              className="pl-10 bg-[var(--hive-white)]/[0.03] border-[var(--hive-white)]/[0.08]"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-[var(--hive-white)]/[0.03] border border-[var(--hive-white)]/[0.08] rounded-lg text-[var(--hive-text-primary)]"
          >
            <option value="popular">Most Popular</option>
            <option value="recent">Recently Updated</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* View Mode */}
          <div className="flex gap-1 bg-[var(--hive-white)]/[0.03] border border-[var(--hive-white)]/[0.08] rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="px-2"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="px-2"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Badge>
          {Object.entries(categoryConfig).map(([key, config]) => (
            <Badge
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(key)}
            >
              <config.icon className="h-3 w-3 mr-1" />
              {config.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tools Grid/List */}
      {isLoading ? (
        <GridSkeleton columns={viewMode === 'grid' ? 3 : 1} count={6} />
      ) : filteredTools.length === 0 ? (
        <CustomEmpty
          icon={Zap}
          title="No tools found"
          description={searchTerm ? `No tools match "${searchTerm}"` : "No tools available in this category"}
          action={searchTerm ? {
            label: "Clear Search",
            onClick: () => setSearchTerm('')
          } : undefined}
        />
      ) : (
        <AnimatePresence mode="popLayout">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onInstall={handleInstall}
                  isInstalling={installingTools.has(tool.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTools.map((tool) => (
                <ToolListItem
                  key={tool.id}
                  tool={tool}
                  onInstall={handleInstall}
                  isInstalling={installingTools.has(tool.id)}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// Tool Card Component
function ToolCard({ 
  tool, 
  onInstall, 
  isInstalling 
}: { 
  tool: Tool; 
  onInstall: (tool: Tool) => void;
  isInstalling: boolean;
}) {
  const config = categoryConfig[tool.category];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-[var(--hive-white)]/[0.02] border border-[var(--hive-white)]/[0.08] rounded-xl p-4 hover:border-[var(--hive-white)]/[0.12] transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-lg", config.bgColor)}>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>
        
        {tool.isFeatured && (
          <Badge variant="outline" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">
        {tool.name}
      </h3>
      
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
        {tool.description}
      </p>

      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
        <div className="flex items-center gap-1">
          <Download className="h-3 w-3" />
          <span>{tool.stats.installs.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-400" />
          <span>{tool.stats.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          <span>{tool.stats.reviews}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">by</span>
          <span className="text-xs font-medium text-[var(--hive-text-primary)]">
            {tool.author.name}
          </span>
          {tool.author.verified && (
            <Check className="h-3 w-3 text-blue-400" />
          )}
        </div>
        <span className="text-xs text-gray-500">v{tool.version}</span>
      </div>

      {tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tool.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <Button
        className={cn(
          "w-full",
          tool.isInstalled 
            ? "bg-green-500/20 text-green-400 border border-green-500/30" 
            : "bg-[var(--hive-gold)] text-[var(--hive-black)]"
        )}
        onClick={() => onInstall(tool)}
        disabled={tool.isInstalled || isInstalling}
      >
        {isInstalling ? 'Installing...' : tool.isInstalled ? 'Installed' : 'Install'}
      </Button>
    </motion.div>
  );
}

// Tool List Item Component
function ToolListItem({ 
  tool, 
  onInstall, 
  isInstalling 
}: { 
  tool: Tool; 
  onInstall: (tool: Tool) => void;
  isInstalling: boolean;
}) {
  const config = categoryConfig[tool.category];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 p-4 bg-[var(--hive-white)]/[0.02] border border-[var(--hive-white)]/[0.08] rounded-xl hover:bg-[var(--hive-white)]/[0.05] transition-all"
    >
      <div className={cn("p-3 rounded-lg shrink-0", config.bgColor)}>
        <Icon className={cn("h-6 w-6", config.color)} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-[var(--hive-text-primary)]">
            {tool.name}
          </h3>
          {tool.isFeatured && (
            <Badge variant="outline" className="text-xs">
              Featured
            </Badge>
          )}
          {tool.isPremium && (
            <Badge variant="outline" className="text-xs text-[var(--hive-gold)]">
              Premium
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-400 mb-2 line-clamp-1">
          {tool.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>by {tool.author.name}</span>
          <span>{tool.stats.installs.toLocaleString()} installs</span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400" />
            {tool.stats.rating.toFixed(1)}
          </span>
          <span>v{tool.version}</span>
        </div>
      </div>

      <Button
        variant={tool.isInstalled ? "outline" : "primary"}
        onClick={() => onInstall(tool)}
        disabled={tool.isInstalled || isInstalling}
        className={tool.isInstalled ? "border-green-500 text-green-400" : ""}
      >
        {isInstalling ? 'Installing...' : tool.isInstalled ? 'Installed' : 'Install'}
      </Button>
    </motion.div>
  );
}