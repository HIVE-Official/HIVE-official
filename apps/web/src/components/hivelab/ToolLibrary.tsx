'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  Grid,
  List,
  Star,
  Clock,
  Users,
  Download,
  Upload,
  Trash2,
  Edit2,
  Copy,
  Share2,
  ChevronRight,
  FolderOpen,
  FileCode,
  Zap,
  TrendingUp,
  Calendar,
  Tag,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  elements: any[];
  connections: any[];
  createdAt: Date;
  updatedAt: Date;
  author: string;
  downloads: number;
  rating: number;
  tags: string[];
  isPublic: boolean;
  isFavorite: boolean;
  version: string;
}

interface ToolLibraryProps {
  userId: string;
  onLoadTool: (tool: Tool) => void;
  onDeleteTool: (toolId: string) => void;
  onDuplicateTool: (toolId: string) => void;
  className?: string;
}

const TOOL_CATEGORIES = [
  { id: 'all', name: 'All Tools', icon: Grid, count: 0 },
  { id: 'my-tools', name: 'My Tools', icon: FolderOpen, count: 0 },
  { id: 'favorites', name: 'Favorites', icon: Star, count: 0 },
  { id: 'recent', name: 'Recent', icon: Clock, count: 0 },
  { id: 'popular', name: 'Popular', icon: TrendingUp, count: 0 },
  { id: 'shared', name: 'Shared', icon: Users, count: 0 }
];

const SAMPLE_TOOLS: Tool[] = [
  {
    id: '1',
    name: 'Study Group Matcher',
    description: 'Find and match with study partners based on courses and availability',
    category: 'academic',
    elements: [],
    connections: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    author: 'current-user',
    downloads: 234,
    rating: 4.8,
    tags: ['study', 'matching', 'academic'],
    isPublic: true,
    isFavorite: true,
    version: '1.2.0'
  },
  {
    id: '2',
    name: 'Event RSVP System',
    description: 'Manage event registrations and track attendance',
    category: 'events',
    elements: [],
    connections: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    author: 'current-user',
    downloads: 156,
    rating: 4.6,
    tags: ['events', 'rsvp', 'tracking'],
    isPublic: false,
    isFavorite: false,
    version: '1.0.0'
  },
  {
    id: '3',
    name: 'Food Order Coordinator',
    description: 'Coordinate group food orders and split payments',
    category: 'social',
    elements: [],
    connections: [],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    author: 'current-user',
    downloads: 412,
    rating: 4.9,
    tags: ['food', 'coordination', 'payments'],
    isPublic: true,
    isFavorite: true,
    version: '2.1.0'
  }
];

export function ToolLibrary({ 
  userId, 
  onLoadTool, 
  onDeleteTool, 
  onDuplicateTool,
  className 
}: ToolLibraryProps) {
  const [tools, setTools] = useState<Tool[]>(SAMPLE_TOOLS);
  const [filteredTools, setFilteredTools] = useState<Tool[]>(SAMPLE_TOOLS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'downloads' | 'rating'>('date');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter and sort tools
  useEffect(() => {
    let filtered = [...tools];

    // Category filter
    switch (selectedCategory) {
      case 'my-tools':
        filtered = filtered.filter(t => t.author === userId);
        break;
      case 'favorites':
        filtered = filtered.filter(t => t.isFavorite);
        break;
      case 'recent':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(t => t.updatedAt > weekAgo);
        break;
      case 'popular':
        filtered = filtered.filter(t => t.downloads > 200);
        break;
      case 'shared':
        filtered = filtered.filter(t => t.isPublic);
        break;
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(t =>
        selectedTags.every(tag => t.tags.includes(tag))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case 'downloads':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredTools(filtered);
  }, [tools, selectedCategory, searchQuery, sortBy, selectedTags, userId]);

  // Update category counts
  useEffect(() => {
    TOOL_CATEGORIES[0].count = tools.length;
    TOOL_CATEGORIES[1].count = tools.filter(t => t.author === userId).length;
    TOOL_CATEGORIES[2].count = tools.filter(t => t.isFavorite).length;
    TOOL_CATEGORIES[3].count = tools.filter(t => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return t.updatedAt > weekAgo;
    }).length;
    TOOL_CATEGORIES[4].count = tools.filter(t => t.downloads > 200).length;
    TOOL_CATEGORIES[5].count = tools.filter(t => t.isPublic).length;
  }, [tools, userId]);

  const handleToggleFavorite = (toolId: string) => {
    setTools(prev => prev.map(t =>
      t.id === toolId ? { ...t, isFavorite: !t.isFavorite } : t
    ));
  };

  const handleDeleteTool = (toolId: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      setTools(prev => prev.filter(t => t.id !== toolId));
      onDeleteTool(toolId);
    }
  };

  const renderToolCard = (tool: Tool) => (
    <motion.div
      key={tool.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "group relative rounded-lg border bg-gray-900 hover:border-gray-700 transition-all cursor-pointer",
        viewMode === 'grid' 
          ? "border-gray-800 p-4" 
          : "border-gray-800 p-3 flex items-center gap-4"
      )}
      onClick={() => onLoadTool(tool)}
    >
      {viewMode === 'grid' ? (
        <>
          {/* Grid View */}
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center">
                  <FileCode className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">{tool.name}</h4>
                  <p className="text-xs text-gray-500">v{tool.version}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(tool.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Star className={cn(
                  "h-4 w-4",
                  tool.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-500"
                )} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-400 line-clamp-2">{tool.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {tool.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {tool.downloads}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {tool.rating}
                </span>
              </div>
              <span>{tool.isPublic ? 'Public' : 'Private'}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLoadTool(tool);
                }}
                className="flex-1 px-2 py-1 bg-gray-800 text-xs text-gray-400 rounded hover:bg-gray-700 hover:text-white transition-colors"
              >
                Open
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicateTool(tool.id);
                }}
                className="p-1 bg-gray-800 text-gray-400 rounded hover:bg-gray-700 hover:text-white transition-colors"
              >
                <Copy className="h-3 w-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTool(tool.id);
                }}
                className="p-1 bg-gray-800 text-gray-400 rounded hover:bg-red-900 hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* List View */}
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center flex-shrink-0">
            <FileCode className="h-4 w-4 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-white truncate">{tool.name}</h4>
              <span className="text-xs text-gray-500">v{tool.version}</span>
              {tool.isFavorite && <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />}
            </div>
            <p className="text-xs text-gray-400 truncate">{tool.description}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {tool.downloads}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {tool.rating}
            </span>
            <span>{tool.isPublic ? 'Public' : 'Private'}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicateTool(tool.id);
              }}
              className="p-1 text-gray-500 hover:text-white transition-colors"
            >
              <Copy className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTool(tool.id);
              }}
              className="p-1 text-gray-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );

  return (
    <div className={cn("bg-gray-950 flex flex-col h-full", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-400">Tool Library</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-2 transition-colors",
                showFilters ? "text-white bg-gray-800" : "text-gray-400 hover:text-white"
              )}
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
          />
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 space-y-2 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-xs text-white focus:outline-none focus:border-gray-700"
                >
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                  <option value="downloads">Downloads</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-800 space-y-1">
        {TOOL_CATEGORIES.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "w-full flex items-center justify-between p-2 rounded-lg transition-colors",
                selectedCategory === category.id
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900/50 text-gray-400"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                <span className="text-sm">{category.name}</span>
              </div>
              <span className="text-xs text-gray-500">{category.count}</span>
            </button>
          );
        })}
      </div>

      {/* Tools Grid/List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredTools.length > 0 ? (
          <div className={cn(
            viewMode === 'grid' 
              ? "grid grid-cols-1 gap-3"
              : "space-y-2"
          )}>
            <AnimatePresence mode="popLayout">
              {filteredTools.map(tool => renderToolCard(tool))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-400 mb-2">No Tools Found</h3>
              <p className="text-sm text-gray-500">
                {searchQuery ? 'Try adjusting your search' : 'Create your first tool to get started'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-3 border-t border-gray-800 bg-gray-900/50 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <span>{filteredTools.length} tools</span>
          <button className="flex items-center gap-1 hover:text-gray-400">
            <Upload className="h-3 w-3" />
            Import Tool
          </button>
        </div>
      </div>
    </div>
  );
}