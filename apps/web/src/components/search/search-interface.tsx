"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, Button, Input, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hive/ui';
import {
  Search,
  Loader2,
  Clock,
  Users,
  Code,
  Calendar,
  FileText,
  X,
  Tag,
  MessageCircle,
  Heart,
  CheckCircle,
  Sparkles,
  ArrowRight,
  History
} from 'lucide-react';
import { SearchEngine, SearchQuery, SearchResult, SearchItem } from '../../lib/search-engine';

interface SearchInterfaceProps {
  onResultSelect?: (_item: SearchItem) => void;
  onUserSelect?: (_userId: string) => void;
  onSpaceSelect?: (_spaceId: string) => void;
  onToolSelect?: (_toolId: string) => void;
  placeholder?: string;
  showFilters?: boolean;
  compactMode?: boolean;
  maxResults?: number;
}

export function SearchInterface({
  onResultSelect,
  onUserSelect,
  onSpaceSelect,
  onToolSelect,
  placeholder = "Search everything on HIVE...",
  showFilters = true,
  compactMode: _compactMode = false,
  maxResults = 50
}: SearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'posts' | 'users' | 'spaces' | 'tools' | 'events'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular' | 'trending'>('relevance');
  const [timeRange, setTimeRange] = useState<'all' | 'hour' | 'day' | 'week' | 'month' | 'year'>('all');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    tags: string[];
    authors: string[];
    spaces: string[];
  }>({
    tags: [],
    authors: [],
    spaces: []
  });
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchEngine = useRef(SearchEngine.getInstance());
  const searchTimeout = useRef<NodeJS.Timeout>();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hive_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load recent searches:', error);
      }
    }
  }, []);

  // Auto-suggest as user types
  useEffect(() => {
    if (query.length > 1) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      
      searchTimeout.current = setTimeout(() => {
        const queryResult = searchEngine.current.getSuggestions(query, 5);
        setSuggestions(queryResult.map(s => s.query));
      }, 300);
    } else {
      setSuggestions([]);
    }
    
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query]);

  const performSearch = useCallback(async (searchQuery: string = query) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    setIsSearching(true);
    setShowSuggestions(false);

    try {
      const searchParams: SearchQuery = {
        query: searchQuery,
        filters: {
          timeRange: timeRange === 'all' ? undefined : timeRange,
          tags: selectedFilters.tags.length > 0 ? selectedFilters.tags : undefined,
          authors: selectedFilters.authors.length > 0 ? selectedFilters.authors : undefined,
          spaces: selectedFilters.spaces.length > 0 ? selectedFilters.spaces : undefined
        },
        pagination: {
          page: 1,
          limit: maxResults
        },
        sortBy,
        searchType
      };

      const searchResults = searchEngine.current.search(searchParams);
      setResults(searchResults);

      // Save to recent searches
      const updatedRecent = [searchQuery, ...recentSearches.filter(r => r !== searchQuery)].slice(0, 10);
      setRecentSearches(updatedRecent);
      localStorage.setItem('hive_recent_searches', JSON.stringify(updatedRecent));

    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  }, [query, searchType, sortBy, timeRange, selectedFilters, maxResults, recentSearches]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion);
  };

  const handleRecentSearchClick = (recentQuery: string) => {
    setQuery(recentQuery);
    performSearch(recentQuery);
  };

  const clearSearch = () => {
    setQuery('');
    setResults(null);
    setSuggestions([]);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const removeFilter = (type: 'tags' | 'authors' | 'spaces', value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const getResultIcon = (item: SearchItem) => {
    switch (item.type) {
      case 'post': return <FileText className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      case 'space': return <Users className="h-4 w-4" />;
      case 'tool': return <Code className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getResultTypeColor = (type: string) => {
    const colors = {
      post: 'text-blue-400',
      user: 'text-green-400',
      space: 'text-purple-400',
      tool: 'text-orange-400',
      event: 'text-pink-400'
    };
    return colors[type as keyof typeof colors] || 'text-gray-400';
  };

  const handleResultClick = (item: SearchItem) => {
    if (onResultSelect) {
      onResultSelect(item);
    }

    // Type-specific handlers
    switch (item.type) {
      case 'user':
        if (onUserSelect) onUserSelect(item.id);
        break;
      case 'space':
        if (onSpaceSelect) onSpaceSelect(item.id);
        break;
      case 'tool':
        if (onToolSelect) onToolSelect(item.id);
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-hive-text-mutedLight" />
          <Input
            ref={searchInputRef}
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className="pl-12 pr-12 py-3 text-lg"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {isSearching && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
            </div>
          )}
        </form>

        {/* Suggestions Dropdown */}
        {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
          <Card className="absolute top-full left-0 right-0 mt-2 p-2 bg-hive-background-overlay border-hive-border-default z-50 max-h-96 overflow-y-auto">
            {suggestions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-hive-text-mutedLight mb-2 px-2">
                  <Sparkles className="h-4 w-4 inline mr-1" />
                  Suggestions
                </h4>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 hover:bg-hive-background-tertiary rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-hive-text-mutedLight" />
                      <span className="text-white">{suggestion}</span>
                      <ArrowRight className="h-3 w-3 text-hive-text-mutedLight ml-auto" />
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {recentSearches.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-hive-text-mutedLight mb-2 px-2">
                  <History className="h-4 w-4 inline mr-1" />
                  Recent Searches
                </h4>
                {recentSearches.slice(0, 5).map((recentQuery, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(recentQuery)}
                    className="w-full text-left px-3 py-2 hover:bg-hive-background-tertiary rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-hive-text-mutedLight" />
                      <span className="text-white">{recentQuery}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Search Controls */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Type */}
          <Select value={searchType} onValueChange={(value: any) => setSearchType(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="posts">Posts</SelectItem>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="spaces">Spaces</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
              <SelectItem value="events">Events</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>

          {/* Time Range */}
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="hour">Last Hour</SelectItem>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          {/* Active Filters */}
          {(selectedFilters.tags.length > 0 || selectedFilters.authors.length > 0 || selectedFilters.spaces.length > 0) && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-hive-text-mutedLight">Filters:</span>
              {selectedFilters.tags.map(tag => (
                <Badge key={tag} variant="sophomore" className="flex items-center space-x-1">
                  <Tag className="h-3 w-3" />
                  <span>{tag}</span>
                  <button onClick={() => removeFilter('tags', tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedFilters.authors.map(author => (
                <Badge key={author} variant="sophomore" className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{author}</span>
                  <button onClick={() => removeFilter('authors', author)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedFilters.spaces.map(space => (
                <Badge key={space} variant="sophomore" className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{space}</span>
                  <button onClick={() => removeFilter('spaces', space)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search Results */}
      {results && (
        <div className="space-y-4">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                {results.total.toLocaleString()} results
              </h3>
              <p className="text-sm text-hive-text-mutedLight">
                Found in {results.searchTime}ms
              </p>
            </div>
            
            {results.suggestions.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-hive-text-mutedLight">Try:</span>
                {results.suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Results List */}
          <div className="space-y-3">
            {results.items.map((item) => (
              <Card
                key={item.id}
                className="p-4 bg-hive-background-overlay border-hive-border-default hover:border-hive-border-hover cursor-pointer transition-colors"
                onClick={() => handleResultClick(item)}
              >
                <div className="space-y-2">
                  {/* Result Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={getResultTypeColor(item.type)}>
                        {getResultIcon(item)}
                      </div>
                      <Badge variant="freshman" className="text-xs">
                        {item.type}
                      </Badge>
                      {item.metadata.isVerified && (
                        <CheckCircle className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-hive-text-mutedLight">
                      <span>Score: {(item.score * 100).toFixed(0)}%</span>
                      {item.metadata.engagement && (
                        <span>• {item.metadata.engagement} interactions</span>
                      )}
                    </div>
                  </div>

                  {/* Result Title */}
                  <h4 className="font-medium text-white hover:text-[var(--hive-brand-primary)] transition-colors">
                    {item.title}
                  </h4>

                  {/* Result Snippet */}
                  <p className="text-sm text-hive-text-mutedLight line-clamp-2">
                    {item.snippet}
                  </p>

                  {/* Result Metadata */}
                  <div className="flex items-center justify-between text-xs text-hive-text-mutedLight">
                    <div className="flex items-center space-x-4">
                      {item.metadata.authorName && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{item.metadata.authorName}</span>
                        </div>
                      )}
                      
                      {item.metadata.spaceName && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>in {item.metadata.spaceName}</span>
                        </div>
                      )}
                      
                      {item.metadata.tags && item.metadata.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Tag className="h-3 w-3" />
                          <span>{item.metadata.tags.slice(0, 2).join(', ')}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {item.type === 'post' && item.metadata.engagement && (
                        <>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{item.metadata.likes || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{item.metadata.comments || 0}</span>
                          </div>
                        </>
                      )}
                      
                      <time>{new Date(item.createdAt).toLocaleDateString()}</time>
                    </div>
                  </div>

                  {/* Highlights */}
                  {item.highlights.length > 0 && (
                    <div className="mt-2 p-2 bg-hive-background-tertiary rounded text-xs">
                      <span className="text-hive-text-mutedLight">Match: </span>
                      <span className="text-white">...{item.highlights[0].text}...</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          {results.hasMore && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => performSearch()}
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Loading...
                  </>
                ) : (
                  'Load More Results'
                )}
              </Button>
            </div>
          )}

          {/* No Results */}
          {results.items.length === 0 && (
            <Card className="p-8 bg-hive-background-overlay border-hive-border-default text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-hive-text-mutedLight opacity-50" />
              <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
              <p className="text-hive-text-mutedLight mb-4">
                Try adjusting your search terms or filters
              </p>
              {results.suggestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-hive-text-mutedLight">Try these suggestions:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {results.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}