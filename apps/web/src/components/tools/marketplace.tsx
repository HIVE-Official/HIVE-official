'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Download,
  Eye,
  Code,
  Zap,
  Users,
  Shield,
  TrendingUp,
  Calendar,
  Tag,
  ChevronRight,
  Package,
  GitBranch,
  Clock,
  CheckCircle,
  AlertCircle,
  Heart,
  Share2,
  ExternalLink,
  BarChart3,
  X
} from 'lucide-react';
import { Button, Badge } from '@hive/ui';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: 'productivity' | 'social' | 'academic' | 'coordination' | 'analytics' | 'utility' | 'fun';
  author: {
    id: string;
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  stats: {
    downloads: number;
    activeUsers: number;
    rating: number;
    reviews: number;
    deployments: number;
  };
  version: {
    current: string;
    lastUpdated: string;
    changelog?: string;
  };
  compatibility: {
    minVersion: string;
    platforms: string[];
    dependencies: string[];
  };
  pricing: {
    type: 'free' | 'paid' | 'freemium';
    price?: number;
    currency?: string;
  };
  tags: string[];
  featured: boolean;
  verified: boolean;
  trending: boolean;
  elements?: Array<{
    type: string;
    count: number;
  }>;
  screenshots?: string[];
  spaceDeployments?: Array<{
    spaceId: string;
    spaceName: string;
    deployedAt: string;
  }>;
}

interface MarketplaceProps {
  onSelectTool?: (tool: Tool) => void;
  onDeployTool?: (tool: Tool) => void;
  spaceId?: string;
  className?: string;
}

const CATEGORIES = [
  { value: 'all', label: 'All Tools', icon: Package, color: 'text-neutral-400' },
  { value: 'productivity', label: 'Productivity', icon: Zap, color: 'text-yellow-400' },
  { value: 'social', label: 'Social', icon: Users, color: 'text-blue-400' },
  { value: 'academic', label: 'Academic', icon: Code, color: 'text-green-400' },
  { value: 'coordination', label: 'Coordination', icon: Calendar, color: 'text-purple-400' },
  { value: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-cyan-400' },
  { value: 'utility', label: 'Utility', icon: Shield, color: 'text-orange-400' },
  { value: 'fun', label: 'Fun & Games', icon: Heart, color: 'text-pink-400' }
];

const SORT_OPTIONS = [
  { value: 'trending', label: 'Trending' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'updated', label: 'Recently Updated' }
];

export function ToolsMarketplace({
  onSelectTool,
  onDeployTool,
  spaceId,
  className = ''
}: MarketplaceProps) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    fetchTools();
  }, [selectedCategory, sortBy, priceFilter, verifiedOnly]);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category: selectedCategory !== 'all' ? selectedCategory : '',
        sort: sortBy,
        price: priceFilter !== 'all' ? priceFilter : '',
        verified: verifiedOnly.toString()
      });

      const response = await authenticatedFetch(`/api/tools/marketplace?${params}`);
      const data = await response.json();
      
      setTools(data.tools || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
      // Set mock data for demo
      setTools(getMockTools());
    } finally {
      setLoading(false);
    }
  };

  const getMockTools = (): Tool[] => [
    {
      id: '1',
      name: 'Study Group Finder',
      description: 'Connect with classmates for collaborative study sessions. Match by course, schedule, and learning style.',
      category: 'academic',
      author: {
        id: 'user1',
        name: 'Alex Chen',
        verified: true
      },
      stats: {
        downloads: 2341,
        activeUsers: 567,
        rating: 4.8,
        reviews: 89,
        deployments: 45
      },
      version: {
        current: '2.1.0',
        lastUpdated: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      compatibility: {
        minVersion: '1.0.0',
        platforms: ['web', 'mobile'],
        dependencies: []
      },
      pricing: { type: 'free' },
      tags: ['study', 'collaboration', 'scheduling'],
      featured: true,
      verified: true,
      trending: true,
      elements: [
        { type: 'input', count: 3 },
        { type: 'filter', count: 2 },
        { type: 'display', count: 4 }
      ]
    },
    {
      id: '2',
      name: 'Campus Event Aggregator',
      description: 'Discover and track all campus events in one place. Never miss what matters to you.',
      category: 'social',
      author: {
        id: 'user2',
        name: 'Maria Garcia',
        verified: false
      },
      stats: {
        downloads: 1892,
        activeUsers: 423,
        rating: 4.6,
        reviews: 67,
        deployments: 32
      },
      version: {
        current: '1.5.2',
        lastUpdated: new Date(Date.now() - 86400000 * 7).toISOString()
      },
      compatibility: {
        minVersion: '1.0.0',
        platforms: ['web'],
        dependencies: ['calendar-api']
      },
      pricing: { type: 'free' },
      tags: ['events', 'calendar', 'social'],
      featured: false,
      verified: false,
      trending: true,
      elements: [
        { type: 'display', count: 5 },
        { type: 'filter', count: 3 }
      ]
    },
    {
      id: '3',
      name: 'Grade Tracker Pro',
      description: 'Advanced GPA calculation and grade prediction with course planning insights.',
      category: 'academic',
      author: {
        id: 'user3',
        name: 'James Wilson',
        verified: true
      },
      stats: {
        downloads: 3456,
        activeUsers: 892,
        rating: 4.9,
        reviews: 156,
        deployments: 78
      },
      version: {
        current: '3.0.1',
        lastUpdated: new Date(Date.now() - 86400000).toISOString()
      },
      compatibility: {
        minVersion: '1.2.0',
        platforms: ['web', 'mobile'],
        dependencies: []
      },
      pricing: {
        type: 'freemium',
        price: 4.99,
        currency: 'USD'
      },
      tags: ['grades', 'gpa', 'analytics', 'planning'],
      featured: true,
      verified: true,
      trending: false,
      elements: [
        { type: 'input', count: 4 },
        { type: 'display', count: 6 },
        { type: 'analytics', count: 3 }
      ]
    }
  ];

  const filteredTools = tools.filter(tool => {
    if (searchQuery && !tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tool.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleInstallTool = async (tool: Tool) => {
    try {
      const response = await authenticatedFetch(`/api/tools/${tool.id}/install`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId })
      });

      if (!response.ok) {
        throw new Error('Failed to install tool');
      }

      onDeployTool?.(tool);
    } catch (error) {
      console.error('Error installing tool:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = CATEGORIES.find(c => c.value === category);
    return cat ? cat.icon : Package;
  };

  const getCategoryColor = (category: string) => {
    const cat = CATEGORIES.find(c => c.value === category);
    return cat ? cat.color : 'text-neutral-400';
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)]">
            Tool Marketplace
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Discover and deploy community-built tools to enhance your spaces
          </p>
        </div>

        <Button
          variant="primary"
          className="bg-[var(--hive-brand-secondary)] text-black"
          onClick={() => window.location.href = '/hivelab'}
        >
          <Zap className="h-4 w-4 mr-2" />
          Build Your Own
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[var(--hive-text-inverse)] placeholder:text-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e: any) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="border-white/20"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e: any) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 bg-white/10 border border-white/20 rounded"
                  />
                  <span className="text-sm text-[var(--hive-text-inverse)]">
                    Verified tools only
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-400">Price:</span>
                  <div className="flex gap-2">
                    {['all', 'free', 'paid'].map((option: any) => (
                      <button
                        key={option}
                        onClick={() => setPriceFilter(option as any)}
                        className={cn(
                          'px-3 py-1 text-xs rounded-lg border transition-colors',
                          priceFilter === option
                            ? 'bg-[var(--hive-brand-secondary)]/20 border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]'
                            : 'bg-white/5 border-white/10 text-neutral-400 hover:text-[var(--hive-text-inverse)]'
                        )}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border whitespace-nowrap transition-all',
                selectedCategory === category.value
                  ? 'bg-white/10 border-white/20 text-[var(--hive-text-inverse)]'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-[var(--hive-text-inverse)]'
              )}
            >
              <Icon className={cn('h-4 w-4', category.color)} />
              <span className="text-sm">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Section */}
      {filteredTools.some(t => t.featured) && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            Featured Tools
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.filter(t => t.featured).map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelect={() => setSelectedTool(tool)}
                onInstall={() => handleInstallTool(tool)}
                featured
              />
            ))}
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">
          {selectedCategory === 'all' ? 'All Tools' : `${CATEGORIES.find(c => c.value === selectedCategory)?.label}`}
        </h3>
        
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i: any) => (
              <div key={i} className="h-64 bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-400">No tools found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.filter(t => !t.featured).map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelect={() => setSelectedTool(tool)}
                onInstall={() => handleInstallTool(tool)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Tool Detail Modal */}
      <AnimatePresence>
        {selectedTool && (
          <ToolDetailModal
            tool={selectedTool}
            onClose={() => setSelectedTool(null)}
            onInstall={() => handleInstallTool(selectedTool)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Tool Card Component
function ToolCard({
  tool,
  onSelect,
  onInstall,
  featured = false
}: {
  tool: Tool;
  onSelect: () => void;
  onInstall: () => void;
  featured?: boolean;
}) {
  const CategoryIcon = CATEGORIES.find(c => c.value === tool.category)?.icon || Package;
  const categoryColor = CATEGORIES.find(c => c.value === tool.category)?.color || 'text-neutral-400';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'p-4 bg-white/[0.02] border rounded-lg cursor-pointer transition-all',
        featured
          ? 'border-[var(--hive-brand-secondary)]/30 bg-gradient-to-br from-[var(--hive-brand-secondary)]/10 to-transparent'
          : 'border-white/10 hover:border-white/20'
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg bg-white/10', categoryColor)}>
            <CategoryIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-[var(--hive-text-inverse)]">
                {tool.name}
              </h4>
              {tool.verified && (
                <CheckCircle className="h-4 w-4 text-blue-400" />
              )}
              {tool.trending && (
                <TrendingUp className="h-4 w-4 text-green-400" />
              )}
            </div>
            <p className="text-xs text-neutral-400">
              by {tool.author.name}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-300 mb-3 line-clamp-2">
        {tool.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
        <div className="flex items-center gap-1">
          <Download className="h-3 w-3" />
          <span>{tool.stats.downloads.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-400" />
          <span>{tool.stats.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{tool.stats.activeUsers}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {tool.tags.slice(0, 3).map((tag: any) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-white/10 text-xs text-neutral-300 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400">
          v{tool.version.current}
        </span>
        <Button
          size="sm"
          variant="primary"
          onClick={(e: any) => {
            e.stopPropagation();
            onInstall();
          }}
          className="bg-[var(--hive-brand-secondary)] text-black"
        >
          Install
        </Button>
      </div>
    </motion.div>
  );
}

// Tool Detail Modal
function ToolDetailModal({
  tool,
  onClose,
  onInstall
}: {
  tool: Tool;
  onClose: () => void;
  onInstall: () => void;
}) {
  const CategoryIcon = CATEGORIES.find(c => c.value === tool.category)?.icon || Package;
  const categoryColor = CATEGORIES.find(c => c.value === tool.category)?.color || 'text-neutral-400';

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[var(--hive-background-primary)] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e: any) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className={cn('p-3 rounded-lg bg-white/10', categoryColor)}>
              <CategoryIcon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)]">
                  {tool.name}
                </h2>
                {tool.verified && (
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                )}
                {tool.trending && (
                  <Badge className="bg-green-500/20 text-green-400">
                    Trending
                  </Badge>
                )}
              </div>
              <p className="text-sm text-neutral-400">
                by {tool.author.name} • v{tool.version.current}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-neutral-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
                  About
                </h3>
                <p className="text-neutral-300">
                  {tool.description}
                </p>
              </div>

              {/* Elements */}
              {tool.elements && tool.elements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
                    Elements Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.elements.map((element, i) => (
                      <div
                        key={i}
                        className="px-3 py-1 bg-white/10 rounded-lg text-sm text-neutral-300"
                      >
                        {element.count} {element.type} elements
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag: any) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 text-sm text-neutral-300 rounded-lg flex items-center gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Version Info */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
                  Version History
                </h3>
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--hive-text-inverse)]">
                      v{tool.version.current}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {formatDistanceToNow(new Date(tool.version.lastUpdated))} ago
                    </span>
                  </div>
                  {tool.version.changelog && (
                    <p className="text-sm text-neutral-300">
                      {tool.version.changelog}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-3">
                <h4 className="text-sm font-medium text-[var(--hive-text-inverse)]">
                  Statistics
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Downloads</span>
                    <span className="text-sm text-[var(--hive-text-inverse)]">
                      {tool.stats.downloads.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Active Users</span>
                    <span className="text-sm text-[var(--hive-text-inverse)]">
                      {tool.stats.activeUsers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span className="text-sm text-[var(--hive-text-inverse)]">
                        {tool.stats.rating} ({tool.stats.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Deployments</span>
                    <span className="text-sm text-[var(--hive-text-inverse)]">
                      {tool.stats.deployments}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compatibility */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-3">
                <h4 className="text-sm font-medium text-[var(--hive-text-inverse)]">
                  Compatibility
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-neutral-400">Platforms</span>
                    <div className="flex gap-2 mt-1">
                      {tool.compatibility.platforms.map((platform: any) => (
                        <span
                          key={platform}
                          className="px-2 py-0.5 bg-white/10 text-xs text-neutral-300 rounded"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400">Min Version</span>
                    <p className="text-sm text-[var(--hive-text-inverse)]">
                      HIVE v{tool.compatibility.minVersion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="text-sm font-medium text-[var(--hive-text-inverse)] mb-3">
                  Developer
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-neutral-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[var(--hive-text-inverse)]">
                        {tool.author.name}
                      </span>
                      {tool.author.verified && (
                        <CheckCircle className="h-3 w-3 text-blue-400" />
                      )}
                    </div>
                    <button className="text-xs text-[var(--hive-brand-secondary)] hover:underline">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Heart className="h-5 w-5 text-neutral-400" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Share2 className="h-5 w-5 text-neutral-400" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ExternalLink className="h-5 w-5 text-neutral-400" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {tool.pricing.type === 'paid' && (
              <span className="text-lg font-semibold text-[var(--hive-text-inverse)]">
                ${tool.pricing.price}
              </span>
            )}
            <Button
              variant="primary"
              onClick={onInstall}
              className="bg-[var(--hive-brand-secondary)] text-black"
            >
              <Download className="h-4 w-4 mr-2" />
              Install Tool
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}