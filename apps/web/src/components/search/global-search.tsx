'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, Loader2, User, Users, Calendar, FileText, Wrench } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { searchService, SearchResult, SearchOptions } from '@/lib/search/search-service';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_ICONS = {
  user: User,
  space: Users,
  event: Calendar,
  post: FileText,
  tool: Wrench,
};

const SEARCH_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'spaces', label: 'Spaces' },
  { value: 'people', label: 'People' },
  { value: 'events', label: 'Events' },
  { value: 'posts', label: 'Posts' },
  { value: 'tools', label: 'Tools' },
];

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const debouncedQuery = useDebounce(query, 300);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Perform search
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      try {
        const options: SearchOptions = {
          limit: 20,
          filters: category !== 'all' ? { types: [category as any] } : undefined,
        };
        
        const searchResults = await searchService.search(debouncedQuery, options);
        setResults(searchResults);
        setSelectedIndex(0);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, category]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  }, [isOpen, results, selectedIndex, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    onClose();
    setQuery('');
    setResults([]);
  };

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={i} className="font-semibold text-[var(--hive-brand-primary)]">{part}</span> : 
        part
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="max-w-2xl mx-auto mt-20 bg-[var(--hive-background-primary)] rounded-xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-white/60" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search spaces, people, events, posts, tools..."
                className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-lg"
              />
              {isLoading && <Loader2 className="h-5 w-5 animate-spin text-white/60" />}
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-white/60" />
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 mt-3">
              {SEARCH_CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-all",
                    category === cat.value
                      ? "bg-[var(--hive-brand-primary)] text-white"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length === 0 && query.length >= 2 && !isLoading && (
              <div className="p-8 text-center text-white/40">
                No results found for "{query}"
              </div>
            )}

            {results.map((result, index) => {
              const Icon = SEARCH_ICONS[result.type];
              const isSelected = index === selectedIndex;

              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "px-4 py-3 cursor-pointer transition-all border-l-2",
                    isSelected
                      ? "bg-white/10 border-[var(--hive-brand-primary)]"
                      : "hover:bg-white/5 border-transparent"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      isSelected ? "bg-[var(--hive-brand-primary)]/20" : "bg-white/10"
                    )}>
                      <Icon className="h-4 w-4 text-white/80" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white">
                        {highlightMatch(result.title, query)}
                      </div>
                      {result.subtitle && (
                        <div className="text-sm text-white/60 mt-0.5">
                          {result.subtitle}
                        </div>
                      )}
                      {result.description && (
                        <div className="text-sm text-white/40 mt-1 line-clamp-2">
                          {highlightMatch(result.description, query)}
                        </div>
                      )}
                      {result.metadata && (
                        <div className="flex gap-3 mt-2 text-xs text-white/40">
                          {result.metadata.memberCount && (
                            <span>{result.metadata.memberCount} members</span>
                          )}
                          {result.metadata.rating && (
                            <span>★ {result.metadata.rating}</span>
                          )}
                          {result.metadata.downloads && (
                            <span>{result.metadata.downloads} downloads</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Search Tips */}
          {query.length === 0 && (
            <div className="p-4 border-t border-white/10">
              <div className="text-xs text-white/40">
                <span className="font-medium">Quick tips:</span> Use arrow keys to navigate • 
                Press Enter to select • Press Escape to close
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Global search hook for keyboard shortcut
export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}