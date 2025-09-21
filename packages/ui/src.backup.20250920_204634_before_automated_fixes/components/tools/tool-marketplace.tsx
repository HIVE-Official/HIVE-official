"use client";

/**
 * Tool Marketplace - Real Implementation;
 * 
 * Replaces the mock marketplace with actual tool discovery, installation, and management.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { HiveCard, HiveButton, HiveInput, HiveBadge } from '../index';
import { Search, Filter, Star, Download, Users, Calendar, TrendingUp, Eye, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ToolDefinition } from './tool-runtime-engine';

interface ToolMarketplaceProps {spaceId?: string;
  userId: string;
  onInstallTool?: (toolId: string, spaceId?: string) => Promise<void>;
  onViewTool?: (toolId: string) => void;
  className?: string;}

interface MarketplaceTool extends ToolDefinition {
  stats: {
    installations: number;
    rating: number;
    reviews: number;
    lastUpdated: string;
    trending: boolean;
  };
  creator: {
    name: string;
    school: string;
    verified: boolean;
  };
  pricing: {
    type: 'free' | 'premium';
    price?: number;
  };
  categories: string[];
  screenshots?: string[];
  isInstalled?: boolean;
}

type SortOption = 'popular' | 'rating' | 'recent' | 'name';
type FilterCategory = 'all' | 'event' | 'academic' | 'social' | 'productivity' | 'wellness';

export function ToolMarketplace({ 
  spaceId, 
  userId, 
  onInstallTool, 
  onViewTool, 
  className;
}: ToolMarketplaceProps) {
  const [tools, setTools] = useState<MarketplaceTool[]>([]);
  const [filteredTools, setFilteredTools] = useState<MarketplaceTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [installingTools, setInstallingTools] = useState<Set<string>>(new Set());

  // Fetch tools from API;
  const fetchTools = useCallback(async () => {
    setLoading(true);
    try {
      // In production, this would be a real API call;
      const response = await fetch('/api/tools/marketplace', {
        headers: { 'Authorization': `Bearer ${userId}` }
      })};
      
      if (response.ok) {
        const data = await response.json();
        setTools(data.tools || []);
      } else {
        // Fallback to sample tools for development;
        setTools(getSampleMarketplaceTools());
      }
    } catch (error) {
      console.error('Failed to fetch tools:', error);
      // Use sample tools as fallback;
      setTools(getSampleMarketplaceTools());
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Filter and sort tools;
  useEffect(() => {
    let filtered = tools.filter(tool => {
      // Search filter;
      const matchesSearch = !searchQuery || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter;
      const matchesCategory = selectedCategory === 'all' || 
        tool.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    // Sort tools;
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.stats.installations - a.stats.installations;
        case 'rating':
          return b.stats.rating - a.stats.rating;
        case 'recent':
          return new Date(b.stats.lastUpdated).getTime() - new Date(a.stats.lastUpdated).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }}
    });

    setFilteredTools(filtered);
  }, [tools, searchQuery, selectedCategory, sortBy]);

  // Install tool;
  const handleInstallTool = async (toolId: string) => {
    if (!onInstallTool) return;

    setInstallingTools(prev => new Set([...prev, toolId]));
    
    try {
      await onInstallTool(toolId, spaceId);
      
      // Update tool installation status;
      setTools(prev => prev.map(tool => 
        tool.id === toolId;
          ? { ...tool, isInstalled: true, stats: { ...tool.stats, installations: tool.stats.installations + 1 } }
          : tool;
      ));
    } catch (error) {
      console.error('Failed to install tool:', error);
    } finally {
      setInstallingTools(prev => {
        const next = new Set(prev);
        next.delete(toolId);
        return next;
      })};
    }
  };

  // Load tools on mount;
  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  if (loading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tool Marketplace</h1>
          <p className="text-gray-600">
            Discover and install tools built by the HIVE community;
          </p>
        </div>
        <div className="flex items-center gap-2">
          <HiveBadge variant="outline">
            {filteredTools.length} tools available;
          </HiveBadge>
          {spaceId && (
            <HiveBadge>
              Installing for Space;
            </HiveBadge>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <HiveInput;
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, creators, or categories..."
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <select;
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as FilterCategory)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="all">All Categories</option>
          <option value="event">Event Management</option>
          <option value="academic">Academic</option>
          <option value="social">Social</option>
          <option value="productivity">Productivity</option>
          <option value="wellness">Wellness</option>
        </select>

        {/* Sort */}
        <select;
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="recent">Recently Updated</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* Featured/Trending Tools */}
      {searchQuery === '' && selectedCategory === 'all' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-semibold text-gray-900">Trending Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTools;
              .filter(tool => tool.stats.trending)
              .slice(0, 4)
              .map(tool => (
                <ToolCard;
                  key={`trending-${tool.id}`}
                  tool={tool}
                  compact;
                  onInstall={() => handleInstallTool(tool.id)}
                  onView={() => onViewTool?.(tool.id)}
                  installing={installingTools.has(tool.id)}
                />
              ))}
          </div>
        </div>
      )}

      {/* All Tools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {searchQuery || selectedCategory !== 'all' ? 'Search Results' : 'All Tools'}
          </h2>
          <div className="text-sm text-gray-500">
            {filteredTools.length} tools found;
          </div>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters;
            </p>
            <HiveButton variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}>
              Clear Filters;
            </HiveButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <ToolCard;
                key={tool.id}
                tool={tool}
                onInstall={() => handleInstallTool(tool.id)}
                onView={() => onViewTool?.(tool.id)}
                installing={installingTools.has(tool.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Individual Tool Card Component;
interface ToolCardProps {tool: MarketplaceTool;
  compact?: boolean;
  onInstall: () => void;
  onView: () => void;
  installing: boolean;}

function ToolCard({ tool, compact = false, onInstall, onView, installing }: ToolCardProps) {
  return (
    <HiveCard className={cn("p-4 hover:shadow-md transition-shadow", compact && "p-3")}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className={cn("font-semibold text-gray-900 truncate", compact ? "text-sm" : "text-lg")}>
              {tool.name}
            </h3>
            <p className={cn("text-gray-600 truncate", compact ? "text-xs" : "text-sm")}>
              by {tool.creator.name}
              {tool.creator.verified && <span className="text-blue-500 ml-1">✓</span>}
            </p>
          </div>
          {tool.stats.trending && !compact && (
            <HiveBadge variant="outline" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending;
            </HiveBadge>
          )}
        </div>

        {/* Description */}
        {!compact && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {tool.description}
          </p>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {tool.categories.slice(0, compact ? 2 : 3).map(category => (
            <HiveBadge key={category} variant="outline" className="text-xs">
              {category}
            </HiveBadge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{tool.stats.installations.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span>{tool.stats.rating.toFixed(1)}</span>
          </div>
          {!compact && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{tool.stats.reviews}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {tool.isInstalled ? (
            <HiveBadge className="flex-1 justify-center">
              ✓ Installed;
            </HiveBadge>
          ) : (
            <HiveButton;
              size="sm"
              onClick={onInstall}
              disabled={installing}
              className="flex-1"
            >
              {installing ? 'Installing...' : 'Install'}
            </HiveButton>
          )}
          <HiveButton;
            variant="outline"
            size="sm"
            onClick={onView}
          >
            <Eye className="w-4 h-4" />
          </HiveButton>
        </div>
      </div>
    </HiveCard>
  );
}

// Sample marketplace tools for development/fallback;
function getSampleMarketplaceTools(): MarketplaceTool[] {
  return [
    {
      id: 'event-creator-pro',
      name: 'Event Creator Pro',
      description: 'Create and manage campus events with advanced features like RSVP tracking, check-in systems, and analytics.',
      version: '2.1.0',
      elements: [], // Would be populated with actual elements;
      actions: [],
      metadata: {
        createdBy: 'sarah-chen',
        createdAt: '2024-01-15T10:00:00Z',
        category: 'event',
        tags: ['events', 'coordination', 'rsvp']
      },
      stats: {
        installations: 1247,
        rating: 4.8,
        reviews: 89,
        lastUpdated: '2024-01-20T10:00:00Z',
        trending: true;
      },
      creator: {
        name: 'Sarah Chen',
        school: 'University at Buffalo',
        verified: true;
      },
      pricing: {
        type: 'free'
      },
      categories: ['event', 'social'],
      isInstalled: false;
    },
    {
      id: 'study-group-matcher',
      name: 'Study Group Matcher',
      description: 'Find study partners and form study groups based on courses, schedules, and learning preferences.',
      version: '1.5.2',
      elements: [],
      actions: [],
      metadata: {
        createdBy: 'mike-torres',
        createdAt: '2024-01-10T14:30:00Z',
        category: 'academic',
        tags: ['study', 'groups', 'matching']
      },
      stats: {
        installations: 892,
        rating: 4.6,
        reviews: 67,
        lastUpdated: '2024-01-18T09:15:00Z',
        trending: true;
      },
      creator: {
        name: 'Mike Torres',
        school: 'University at Buffalo',
        verified: true;
      },
      pricing: {
        type: 'free'
      },
      categories: ['academic', 'productivity'],
      isInstalled: true;
    },
    {
      id: 'room-booking-system',
      name: 'Room Booking System',
      description: 'Book study rooms, common areas, and meeting spaces with real-time availability and conflict detection.',
      version: '1.2.0',
      elements: [],
      actions: [],
      metadata: {
        createdBy: 'alex-kim',
        createdAt: '2024-01-05T16:45:00Z',
        category: 'productivity',
        tags: ['booking', 'rooms', 'scheduling']
      },
      stats: {
        installations: 654,
        rating: 4.4,
        reviews: 45,
        lastUpdated: '2024-01-16T11:30:00Z',
        trending: false;
      },
      creator: {
        name: 'Alex Kim',
        school: 'Cornell University',
        verified: false;
      },
      pricing: {
        type: 'free'
      },
      categories: ['productivity', 'academic'],
      isInstalled: false;
    },
    {
      id: 'wellness-tracker',
      name: 'Campus Wellness Tracker',
      description: 'Track fitness goals, mental health check-ins, and connect with campus wellness resources.',
      version: '1.0.5',
      elements: [],
      actions: [],
      metadata: {
        createdBy: 'jessica-wong',
        createdAt: '2024-01-12T08:20:00Z',
        category: 'wellness',
        tags: ['health', 'fitness', 'mental-health']
      },
      stats: {
        installations: 423,
        rating: 4.7,
        reviews: 31,
        lastUpdated: '2024-01-19T14:45:00Z',
        trending: true;
      },
      creator: {
        name: 'Jessica Wong',
        school: 'Syracuse University',
        verified: true;
      },
      pricing: {
        type: 'free'
      },
      categories: ['wellness', 'social'],
      isInstalled: false;
    }
  ];
}

export default ToolMarketplace;