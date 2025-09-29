/**
 * Search Modal Component
 * Universal search interface using CQRS pattern
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@hive/ui';
import { Input, Button, Badge, Card } from '@hive/ui';
import {
  Search,
  X,
  Users,
  Hash,
  FileText,
  TrendingUp,
  Clock,
  Loader2
} from 'lucide-react';
import { useSearch } from '@/hooks/use-search';
import { useAuth } from '@hive/auth-logic';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'profiles' | 'spaces' | 'posts'>('all');

  const {
    results,
    loading,
    error,
    search,
    clearResults,
    suggestions,
    recentSearches,
    clearRecentSearches
  } = useSearch({
    type: selectedType,
    limit: 10,
    debounceMs: 300,
    minSearchLength: 2,
    cacheResults: true
  });

  // Handle search input
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length >= 2) {
      search(query.trim());
    } else {
      clearResults();
    }
  }, [search, clearResults]);

  // Handle result click
  const handleResultClick = useCallback((result: any) => {
    // Navigate to the result
    router.push(result.url);
    onClose();

    // Clear search
    setSearchQuery('');
    clearResults();
  }, [router, onClose, clearResults]);

  // Handle recent search click
  const handleRecentSearchClick = useCallback((query: string) => {
    setSearchQuery(query);
    search(query);
  }, [search]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchQuery(suggestion);
    search(suggestion);
  }, [search]);

  // Clear search on modal close
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      clearResults();
      setSelectedType('all');
    }
  }, [isOpen, clearResults]);

  // Focus on input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }

      // Open search with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Would need to trigger open from parent
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'profile':
        return <Users className="h-4 w-4" />;
      case 'space':
        return <Hash className="h-4 w-4" />;
      case 'post':
        return <FileText className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="sr-only">Search HIVE</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-hive-text-secondary" />
          <Input
            id="search-input"
            type="text"
            placeholder="Search for people, spaces, or posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-10 py-3 text-lg"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                clearResults();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-5 w-5 text-hive-text-secondary hover:text-hive-text-primary" />
            </button>
          )}
        </div>

        {/* Search Type Filter */}
        <div className="flex gap-2 mt-4">
          <Button
            variant={selectedType === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedType('all')}
          >
            All
          </Button>
          <Button
            variant={selectedType === 'profiles' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedType('profiles')}
          >
            <Users className="h-3 w-3 mr-1" />
            People
          </Button>
          <Button
            variant={selectedType === 'spaces' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedType('spaces')}
          >
            <Hash className="h-3 w-3 mr-1" />
            Spaces
          </Button>
          <Button
            variant={selectedType === 'posts' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedType('posts')}
          >
            <FileText className="h-3 w-3 mr-1" />
            Posts
          </Button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-2">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-hive-text-secondary" />
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-400">Failed to search. Please try again.</p>
            </div>
          )}

          {!loading && !error && results.length === 0 && searchQuery.length >= 2 && (
            <div className="text-center py-8">
              <p className="text-hive-text-secondary">No results found for "{searchQuery}"</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((result) => (
                <Card
                  key={result.id}
                  className="p-3 hover:bg-hive-surface-elevated cursor-pointer transition-colors"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-hive-surface-elevated rounded-full flex items-center justify-center flex-shrink-0">
                      {result.imageUrl ? (
                        <img
                          src={result.imageUrl}
                          alt={result.title}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getIconForType(result.type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-hive-text-primary truncate">
                          {result.title}
                        </h4>
                        {result.metadata?.isVerified && (
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-hive-text-secondary truncate">
                        {result.subtitle}
                      </p>
                      {result.description && (
                        <p className="text-xs text-hive-text-secondary mt-1 line-clamp-2">
                          {result.description}
                        </p>
                      )}
                      {result.metadata?.memberCount !== undefined && (
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-hive-text-secondary">
                            {result.metadata.memberCount} members
                          </span>
                          {result.metadata.category && (
                            <Badge className="text-xs">
                              {result.metadata.category}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && searchQuery && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-hive-text-secondary mb-2">
                Suggestions
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!searchQuery && recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-hive-text-secondary">
                  Recent Searches
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-xs"
                >
                  Clear
                </Button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((recent) => (
                  <Button
                    key={recent}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRecentSearchClick(recent)}
                    className="w-full justify-start text-left"
                  >
                    <Clock className="h-3 w-3 mr-2" />
                    {recent}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Keyboard Shortcut Hint */}
        <div className="mt-4 pt-4 border-t border-hive-border">
          <p className="text-xs text-hive-text-secondary text-center">
            Press <kbd className="px-2 py-1 bg-hive-surface-elevated rounded text-xs">ESC</kbd> to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}