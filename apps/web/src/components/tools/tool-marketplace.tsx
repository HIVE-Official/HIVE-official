"use client";

import React, { useState, useEffect } from 'react';
import { Tool, ToolCategory } from '@hive/core/domain/tools';
import { Card, Button, Badge, Input, Tabs, TabsList, TabsTrigger, TabsContent } from '@hive/ui';
import { 
  Search, 
  Download, 
  Star, 
  Users, 
  TrendingUp, 
  Filter,
  Grid3x3,
  List,
  Plus,
  ExternalLink,
  Clock,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ToolMarketplaceProps {
  initialTools?: Tool[];
  userInstalledTools?: string[];
  onInstall?: (toolId: string) => Promise<void>;
  onUninstall?: (toolId: string) => Promise<void>;
  className?: string;
}

export function ToolMarketplace({
  initialTools = [],
  userInstalledTools = [],
  onInstall,
  onUninstall,
  className = ''
}: ToolMarketplaceProps) {
  const router = useRouter();
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [loading, setLoading] = useState(!initialTools.length);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'trending'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [installedTools, setInstalledTools] = useState<Set<string>>(new Set(userInstalledTools));
  const [installingTool, setInstallingTool] = useState<string | null>(null);
  
  // Fetch tools from API
  useEffect(() => {
    if (initialTools.length === 0) {
      fetchTools();
    }
  }, []);
  
  const fetchTools = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category: selectedCategory !== 'all' ? selectedCategory : '',
        sort: sortBy,
        search: searchQuery
      });
      
      const response = await fetch(`/api/tools/marketplace?${params}`);
      const data = await response.json();
      setTools(data.tools || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Filter tools
  const filteredTools = tools.filter(tool => {
    if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description?.toLowerCase().includes(query) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Sort tools
  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.metrics?.installs || 0) - (a.metrics?.installs || 0);
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'trending':
        return (b.metrics?.weeklyActive || 0) - (a.metrics?.weeklyActive || 0);
      default:
        return 0;
    }
  });
  
  // Handle tool installation
  const handleInstall = async (toolId: string) => {
    if (!onInstall) return;
    
    try {
      setInstallingTool(toolId);
      await onInstall(toolId);
      setInstalledTools(prev => new Set([...prev, toolId]));
    } catch (error) {
      console.error('Error installing tool:', error);
    } finally {
      setInstallingTool(null);
    }
  };
  
  // Handle tool uninstallation
  const handleUninstall = async (toolId: string) => {
    if (!onUninstall) return;
    
    try {
      setInstallingTool(toolId);
      await onUninstall(toolId);
      setInstalledTools(prev => {
        const newSet = new Set(prev);
        newSet.delete(toolId);
        return newSet;
      });
    } catch (error) {
      console.error('Error uninstalling tool:', error);
    } finally {
      setInstallingTool(null);
    }
  };
  
  // Render tool card
  const renderToolCard = (tool: Tool) => {
    const isInstalled = installedTools.has(tool.id);
    const isInstalling = installingTool === tool.id;
    
    return (
      <Card key={tool.id} className="hover:shadow-lg transition-shadow">
        <div className="p-4">
          {/* Tool Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {tool.description}
              </p>
            </div>
            {tool.icon && (
              <div className="ml-3 text-2xl">{tool.icon}</div>
            )}
          </div>
          
          {/* Tool Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {tool.metrics?.installs || 0}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {tool.metrics?.rating?.toFixed(1) || '0.0'}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {tool.metrics?.weeklyActive || 0}
            </div>
          </div>
          
          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tool.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Creator */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              by {tool.creator?.name || 'Unknown'}
            </span>
            <Badge variant={tool.visibility === 'public' ? 'default' : 'outline'}>
              {tool.visibility}
            </Badge>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            {isInstalled ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(`/tools/${tool.id}`)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUninstall(tool.id)}
                  disabled={isInstalling}
                >
                  Uninstall
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                className="w-full"
                onClick={() => handleInstall(tool.id)}
                disabled={isInstalling}
              >
                {isInstalling ? (
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 animate-spin" />
                    Installing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    Install
                  </div>
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };
  
  // Render tool list item
  const renderToolListItem = (tool: Tool) => {
    const isInstalled = installedTools.has(tool.id);
    const isInstalling = installingTool === tool.id;
    
    return (
      <Card key={tool.id} className="hover:shadow-md transition-shadow">
        <div className="p-4 flex items-center gap-4">
          {/* Tool Icon */}
          {tool.icon && (
            <div className="text-2xl">{tool.icon}</div>
          )}
          
          {/* Tool Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{tool.name}</h3>
              {isInstalled && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tool.description}
            </p>
          </div>
          
          {/* Tool Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {tool.metrics?.installs || 0}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {tool.metrics?.rating?.toFixed(1) || '0.0'}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            {isInstalled ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/tools/${tool.id}`)}
              >
                Open
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleInstall(tool.id)}
                disabled={isInstalling}
              >
                {isInstalling ? 'Installing...' : 'Install'}
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };
  
  return (
    <div className={`tool-marketplace ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Tool Marketplace</h2>
          <Link href="/tools/builder">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Tool
            </Button>
          </Link>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
              <option value="trending">Trending</option>
            </select>
            
            <div className="flex border rounded-lg dark:border-gray-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Tools</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="utility">Utility</TabsTrigger>
          <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedCategory}>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading tools...</p>
            </div>
          ) : sortedTools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No tools found</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedTools.map(renderToolCard)}
            </div>
          ) : (
            <div className="space-y-3">
              {sortedTools.map(renderToolListItem)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}