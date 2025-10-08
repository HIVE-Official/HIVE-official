/**
 * Search Hook
 * Provides search functionality with debouncing and caching
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { SearchResultItem, SearchType } from '@hive/core';
import { useAuth } from '@hive/auth-logic';
import { useToast } from './use-toast';

interface UseSearchOptions {
  type?: SearchType;
  limit?: number;
  debounceMs?: number;
  minSearchLength?: number;
  cacheResults?: boolean;
}

interface UseSearchReturn {
  results: SearchResultItem[];
  loading: boolean;
  error: any | null;
  search: (query: string) => Promise<void>;
  clearResults: () => void;
  suggestions: string[];
  recentSearches: string[];
  clearRecentSearches: () => void;
}

// Simple in-memory cache
const searchCache = new Map<string, { results: SearchResultItem[]; suggestions: string[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const {
    type = 'all',
    limit = 20,
    debounceMs = 300,
    minSearchLength = 2,
    cacheResults = true
  } = options;

  const { user } = useAuth();
  const { toast } = useToast();
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('hive_recent_searches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        // Ignore invalid JSON
      }
    }
  }, []);

  // Save recent search
  const saveRecentSearch = useCallback((query: string) => {
    setRecentSearches(prev => {
      const updated = [query, ...prev.filter(q => q !== query)].slice(0, 10);
      localStorage.setItem('hive_recent_searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('hive_recent_searches');
  }, []);

  // Perform search
  const performSearch = useCallback(async (query: string) => {
    if (!user) {
      setError(new Error('User not authenticated'));
      return;
    }

    // Check cache first
    if (cacheResults) {
      const cacheKey = `${type}_${query}_${limit}`;
      const cached = searchCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setResults(cached.results);
        setSuggestions(cached.suggestions);
        return;
      }
    }

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search/v2?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: abortControllerRef.current.signal
        }
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();

      if (data.success && data.data) {
        setResults(data.data.results);
        setSuggestions(data.data.suggestions);

        // Cache results
        if (cacheResults) {
          const cacheKey = `${type}_${query}_${limit}`;
          searchCache.set(cacheKey, {
            results: data.data.results,
            suggestions: data.data.suggestions,
            timestamp: Date.now()
          });
        }

        // Save to recent searches
        if (data.data.results.length > 0) {
          saveRecentSearch(query);
        }
      } else {
        setResults([]);
        setSuggestions([]);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Search error:', err);
        setError(err);
        toast({
          title: "Search failed",
          description: "Please try again",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  }, [user, type, limit, cacheResults, saveRecentSearch, toast]);

  // Debounced search
  const search = useCallback((query: string) => {
    // Clear timer if exists
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Clear results if query is too short
    if (query.length < minSearchLength) {
      setResults([]);
      setSuggestions([]);
      setError(null);
      return Promise.resolve();
    }

    // Set up debounced search
    return new Promise<void>((resolve) => {
      debounceTimerRef.current = setTimeout(async () => {
        await performSearch(query);
        resolve();
      }, debounceMs);
    });
  }, [performSearch, debounceMs, minSearchLength]);

  // Clear results
  const clearResults = useCallback(() => {
    setResults([]);
    setSuggestions([]);
    setError(null);

    // Cancel any pending search
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    results,
    loading,
    error,
    search,
    clearResults,
    suggestions,
    recentSearches,
    clearRecentSearches
  };
}