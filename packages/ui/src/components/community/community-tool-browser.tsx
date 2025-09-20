"use client";

/**
 * HIVE Community Tool Browser
 * Interface for browsing and installing community-created tools
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Tool } from '@hive/core';
import { HiveCard } from '../hive-card';
import { Button } from '../../atomic/atoms/button';
import { Input } from '../../atomic/atoms/input-enhanced';
import { Label } from '../../atomic/atoms/label';
import { Badge } from '../../atomic/atoms/badge';
import { LiveToolRuntime } from '../live-tool-runtime';
import { 
  Search,
  Filter,
  Star,
  Download,
  Eye,
  Users,
  Clock,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Zap,
  User,
  Calendar,
  Heart,
  Share2,
  MoreHorizontal
} from 'lucide-react';

interface CommunityTool {
  id: string;
  tool: Tool;
  author: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    isVerified?: boolean
  };
  stats: {
    downloads: number;
    rating: number;
    ratingCount: number;
    installs: number;
    likes: number
  };
  metadata: {
    publishedAt: string;
    updatedAt: string;
    tags: string[];
    category: 'productivity' | 'collaboration' | 'communication' | 'organization' | 'engagement' | 'academic';
    compatibility: string[];
    featured: boolean;
    verified: boolean
  };
  preview?: {
    images: string[];
    videoUrl?: string;
    demoUrl?: string
  }
}

interface CommunityToolBrowserProps {
  communityTools: CommunityTool[];
  onInstall: (toolId: string) => Promise<void>;
  onPreview: (tool: Tool) => void;
  onLike: (toolId: string) => void;
  onShare: (toolId: string) => void;
  installedToolIds: string[];
  currentSpaceId?: string;
  isLoading?: boolean
}

export const CommunityToolBrowser: React.FC<CommunityToolBrowserProps> = ({
  communityTools,
  onInstall,
  onPreview,
  onLike,
  onShare,
  installedToolIds,
  currentSpaceId,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | CommunityTool['metadata']['category']>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'trending' | 'rating'>('popular');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [previewTool, setPreviewTool] = useState<Tool | null>(null);
  const [installingTool, setInstallingTool] = useState<string | null>(null);

  // Filter and sort tools
  const filteredAndSortedTools = useMemo(() => {
    let filtered = communityTools.filter(communityTool => {
      const matchesSearch = communityTool.tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           communityTool.tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           communityTool.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           communityTool.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || communityTool.metadata.category === categoryFilter;
      const matchesFeatured = !showFeaturedOnly || communityTool.metadata.featured;
      
      return matchesSearch && matchesCategory && matchesFeatured
    })};

    // Sort tools
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.stats.downloads - a.stats.downloads;
        case 'recent':
          return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
        case 'trending':
          return b.stats.installs - a.stats.installs; // Using installs as trending metric
        case 'rating':
          return b.stats.rating - a.stats.rating;
        default:
          return 0
      }
    });

    return filtered
  }, [communityTools, searchQuery, categoryFilter, sortBy, showFeaturedOnly]);

  // Handle tool installation
  const handleInstall = useCallback(async (toolId: string) => {
    setInstallingTool(toolId);
    try {
      await onInstall(toolId)
    } catch (error) {
      console.error('Installation failed:', error)
    } finally {
      setInstallingTool(null)
    }
  }, [onInstall]);

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`
  };

  // Get category color
  const getCategoryColor = (category: CommunityTool['metadata']['category']) => {
    switch (category) {
      case 'productivity': return 'bg-blue-500';
      case 'collaboration': return 'bg-green-500';
      case 'communication': return 'bg-orange-500';
      case 'organization': return 'bg-purple-500';
      case 'engagement': return 'bg-pink-500';
      case 'academic': return 'bg-indigo-500';
      default: return 'bg-gray-500'
    }
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />)
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-400" />)
    }
    
    return stars
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="w-8 h-8 bg-[var(--hive-primary)] rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-[var(--hive-text-secondary)]">Loading community tools...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
            Community Tools
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Discover and install tools created by the HIVE community
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {filteredAndSortedTools.length} tools available
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-tertiary)]" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, creators, or tags..."
              className="pl-10"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg px-3 py-2 text-[var(--hive-text-primary)] text-sm focus:border-[var(--hive-primary)] focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="productivity">Productivity</option>
            <option value="collaboration">Collaboration</option>
            <option value="communication">Communication</option>
            <option value="organization">Organization</option>
            <option value="engagement">Engagement</option>
            <option value="academic">Academic</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg px-3 py-2 text-[var(--hive-text-primary)] text-sm focus:border-[var(--hive-primary)] focus:outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="recent">Recently Added</option>
            <option value="trending">Trending</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              showFeaturedOnly
                ? 'bg-[var(--hive-primary)] text-white'
                : 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Featured Only
          </button>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedTools.map((communityTool) => {
          const isInstalled = installedToolIds.includes(communityTool.id);
          const isInstalling = installingTool === communityTool.id;
          
          return (
            <HiveCard key={communityTool.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-12 h-12 ${getCategoryColor(communityTool.metadata.category)} rounded-lg flex items-center justify-center text-2xl`}>
                    🛠️
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-[var(--hive-text-primary)] line-clamp-1">
                        {communityTool.tool.name}
                      </h3>
                      {communityTool.metadata.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {communityTool.metadata.featured && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm text-[var(--hive-text-secondary)] line-clamp-2 mb-2">
                      {communityTool.tool.description}
                    </p>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {communityTool.metadata.category}
                    </Badge>
                  </div>
                </div>
                
                <button className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-[var(--hive-primary)]/20 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-[var(--hive-primary)]" />
                </div>
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  by {communityTool.author.name}
                </span>
                {communityTool.author.isVerified && (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {renderStars(communityTool.stats.rating)}
                  </div>
                  <span className="text-[var(--hive-text-secondary)] ml-1">
                    ({communityTool.stats.ratingCount})
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-[var(--hive-text-secondary)]">
                  <Download className="w-3 h-3" />
                  <span>{communityTool.stats.downloads.toLocaleString()}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {communityTool.metadata.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 rounded bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)]"
                  >
                    #{tag}
                  </span>
                ))}
                {communityTool.metadata.tags.length > 3 && (
                  <span className="text-xs text-[var(--hive-text-tertiary)]">
                    +{communityTool.metadata.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--hive-border-default)]">
                <div className="flex items-center space-x-2">
                  {isInstalled ? (
                    <Button size="sm" disabled className="bg-green-500/20 text-green-500 border-green-500/30">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Installed
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => handleInstall(communityTool.id)}
                      disabled={isInstalling}
                      className="bg-[var(--hive-primary)] text-white"
                    >
                      {isInstalling ? (
                        <>
                          <div className="w-4 h-4 mr-1 animate-spin border-2 border-white/30 border-t-white rounded-full" />
                          Installing
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-1" />
                          Install
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setPreviewTool(communityTool.tool);
                      onPreview(communityTool.tool)
          }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onLike(communityTool.id)}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onShare(communityTool.id)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </HiveCard>
          )
          })}
      </div>

      {/* Empty State */}
      {filteredAndSortedTools.length === 0 && (
        <div className="text-center py-12">
          <Zap className="w-16 h-16 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
            No tools found
          </h3>
          <p className="text-[var(--hive-text-secondary)] mb-6">
            {searchQuery || categoryFilter !== 'all' || showFeaturedOnly
              ? 'Try adjusting your search or filters.'
              : 'The community tool library is growing. Check back soon!'}
          </p>
        </div>
      )}

      {/* Tool Preview Modal */}
      {previewTool && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--hive-background-primary)] rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="border-b border-[var(--hive-border-default)] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                  Preview: {previewTool.name}
                </h3>
                <Button variant="ghost" onClick={() => setPreviewTool(null)}>
                  ×
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <LiveToolRuntime
                tool={previewTool}
                readOnly={true}
                className="border border-[var(--hive-border-default)]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
};