"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';
import {
  Search,
  X,
  Filter,
  Calendar,
  Users,
  Hash,
  MapPin,
  Clock,
  TrendingUp,
  Star,
  FileText,
  MessageSquare,
  Zap,
  ChevronDown,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Dialog, DialogContent, Button, Input, Badge, Checkbox, RadioGroup, RadioGroupItem, Label } from '@hive/ui';
import { cn } from '@hive/ui';
import { authenticatedFetch } from '@/lib/auth-utils';
import { useDebounce } from '@hive/hooks';
import { formatDistanceToNow } from 'date-fns';

interface SearchResult {
  id: string;
  type: 'space' | 'post' | 'event' | 'user' | 'tool';
  title: string;
  description?: string;
  url: string;
  metadata?: any;
  timestamp?: string;
  highlights?: string[];
}

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onResultClick?: (result: SearchResult) => void;
}

const typeConfig = {
  space: { icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-400/10', label: 'Space' },
  post: { icon: MessageSquare, color: 'text-green-400', bgColor: 'bg-green-400/10', label: 'Post' },
  event: { icon: Calendar, color: 'text-orange-400', bgColor: 'bg-orange-400/10', label: 'Event' },
  user: { icon: Users, color: 'text-purple-400', bgColor: 'bg-purple-400/10', label: 'User' },
  tool: { icon: Zap, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10', label: 'Tool' }
};

export function AdvancedSearchModal({ isOpen, onClose, initialQuery = '', onResultClick }: AdvancedSearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState(['study group', 'events today', 'CS courses', 'hackathon']);
  
  // Filters
  const [filters, setFilters] = useState({
    types: [] as string[],
    dateRange: 'all',
    sortBy: 'relevance',
    spaces: [] as string[],
    tags: [] as string[]
  });

  const debouncedQuery = useDebounce(query, 300);

  // Search function
  const performSearch = async (searchQuery: string, searchFilters = filters) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        ...searchFilters.types.length > 0 && { types: searchFilters.types.join(',') },
        dateRange: searchFilters.dateRange,
        sortBy: searchFilters.sortBy,
        ...searchFilters.spaces.length > 0 && { spaces: searchFilters.spaces.join(',') },
        ...searchFilters.tags.length > 0 && { tags: searchFilters.tags.join(',') }
      });

      const response = await authenticatedFetch(`/api/search?${params}`);
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setResults(data.results || []);
      
      // Save to recent searches
      if (!recentSearches.includes(searchQuery)) {
        const updated = [searchQuery, ...recentSearches.slice(0, 4)];
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Perform search on query change
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, filters]);

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result);
    } else {
      window.location.href = result.url;
    }
    onClose();
  };

  const handleFilterToggle = (type: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].includes(value)
        ? (prev[type as keyof typeof prev] as string[]).filter(v => v !== value)
        : [...(prev[type as keyof typeof prev] as string[]), value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      dateRange: 'all',
      sortBy: 'relevance',
      spaces: [],
      tags: []
    });
  };

  const hasActiveFilters = filters.types.length > 0 || 
    filters.dateRange !== 'all' || 
    filters.sortBy !== 'relevance' ||
    filters.spaces.length > 0 ||
    filters.tags.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]">
        {/* Search Header */}
        <div className="p-4 border-b border-[var(--hive-border-default)]">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
                placeholder="Search everything..."
                className="pl-10 pr-10 text-lg bg-[var(--hive-white)]/[0.03] border-[var(--hive-white)]/[0.08]"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--hive-white)]/[0.05] rounded"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "border-[var(--hive-white)]/20",
                hasActiveFilters && "border-[var(--hive-gold)] text-[var(--hive-gold)]"
              )}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filters.types.length + filters.spaces.length + filters.tags.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-4">
                  {/* Type Filters */}
                  <div>
                    <Label className="text-sm font-medium text-gray-400 mb-2">Search in</Label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(typeConfig).map(([key, config]) => (
                        <Badge
                          key={key}
                          variant={filters.types.includes(key) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleFilterToggle('types', key)}
                        >
                          <config.icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center gap-4">
                    <Label className="text-sm font-medium text-gray-400">Date</Label>
                    <RadioGroup
                      value={filters.dateRange}
                      onValueChange={(value: any) => setFilters(prev => ({ ...prev, dateRange: value }))}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all" className="text-sm cursor-pointer">All time</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="today" id="today" />
                        <Label htmlFor="today" className="text-sm cursor-pointer">Today</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="week" id="week" />
                        <Label htmlFor="week" className="text-sm cursor-pointer">This week</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="month" id="month" />
                        <Label htmlFor="month" className="text-sm cursor-pointer">This month</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Sort By */}
                  <div className="flex items-center gap-4">
                    <Label className="text-sm font-medium text-gray-400">Sort by</Label>
                    <select
                      value={filters.sortBy}
                      onChange={(e: any) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      className="px-3 py-1 text-sm bg-[var(--hive-white)]/[0.03] border border-[var(--hive-white)]/[0.08] rounded-lg text-[var(--hive-text-primary)]"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>

                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {!query && !isSearching && (
            <div className="p-6 space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search: any) => (
                      <Badge
                        key={search}
                        variant="outline"
                        className="cursor-pointer hover:bg-[var(--hive-white)]/[0.05]"
                        onClick={() => setQuery(search)}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search: any) => (
                    <Badge
                      key={search}
                      variant="outline"
                      className="cursor-pointer hover:bg-[var(--hive-white)]/[0.05]"
                      onClick={() => setQuery(search)}
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isSearching && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          )}

          {!isSearching && query && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-gray-500 mb-3" />
              <p className="text-lg font-medium text-[var(--hive-text-primary)]">No results found</p>
              <p className="text-sm text-gray-400 mt-1">Try different keywords or adjust your filters</p>
            </div>
          )}

          {!isSearching && results.length > 0 && (
            <div className="divide-y divide-[var(--hive-border-default)]">
              {results.map((result) => {
                const config = typeConfig[result.type];
                const Icon = config.icon;
                
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => handleResultClick(result)}
                    className="p-4 hover:bg-[var(--hive-white)]/[0.02] cursor-pointer transition-all"
                  >
                    <div className="flex gap-3">
                      <div className={cn("p-2 rounded-lg shrink-0", config.bgColor)}>
                        <Icon className={cn("h-4 w-4", config.color)} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-[var(--hive-text-primary)] mb-1">
                              {result.title}
                            </h4>
                            {result.description && (
                              <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                                {result.description}
                              </p>
                            )}
                            {result.highlights && result.highlights.length > 0 && (
                              <div className="text-sm text-gray-500 mb-2">
                                {result.highlights.map((highlight, i) => (
                                  <span 
                                    key={i} 
                                    dangerouslySetInnerHTML={{ 
                                      __html: DOMPurify.sanitize(highlight, {
                                        ALLOWED_TAGS: ['mark', 'strong', 'em'],
                                        ALLOWED_ATTR: ['class']
                                      })
                                    }} 
                                  />
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <Badge variant="outline" className="text-xs">
                                {config.label}
                              </Badge>
                              {result.timestamp && (
                                <span>
                                  {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--hive-border-default)] flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {results.length > 0 && `${results.length} results found`}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <kbd className="px-1.5 py-0.5 bg-[var(--hive-white)]/[0.05] rounded">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}