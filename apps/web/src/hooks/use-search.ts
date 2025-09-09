"use client";

import { useState, useCallback, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  QueryConstraint,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useDebounce } from './use-debounce';

export interface SearchResult {
  id: string;
  type: 'space' | 'post' | 'user' | 'event';
  title: string;
  description?: string;
  image?: string;
  url: string;
  metadata?: Record<string, any>;
  score: number;
}

interface UseSearchOptions {
  types?: ('space' | 'post' | 'user' | 'event')[];
  limit?: number;
  debounceMs?: number;
}

export function useSearch(options: UseSearchOptions = {}) {
  const { 
    types = ['space', 'post', 'user', 'event'],
    limit: resultLimit = 20,
    debounceMs = 300
  } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedQuery = useDebounce(query, debounceMs);

  // Search function
  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const allResults: SearchResult[] = [];
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(Boolean);

      // Search spaces
      if (types.includes('space')) {
        const spacesQuery = query(
          collection(db, 'spaces'),
          orderBy('name'),
          limit(resultLimit)
        );

        const spacesSnapshot = await getDocs(spacesQuery);
        
        spacesSnapshot.forEach((doc) => {
          const data = doc.data();
          const name = data.name?.toLowerCase() || '';
          const description = data.description?.toLowerCase() || '';
          
          // Calculate relevance score
          let score = 0;
          searchTerms.forEach(term => {
            if (name.includes(term)) score += 10;
            if (description.includes(term)) score += 5;
            if (data.tags?.some((tag: string) => tag.toLowerCase().includes(term))) score += 3;
          });

          if (score > 0) {
            allResults.push({
              id: doc.id,
              type: 'space',
              title: data.name,
              description: data.description,
              image: data.avatar || data.banner,
              url: `/spaces/${doc.id}`,
              metadata: {
                memberCount: data.memberCount,
                category: data.category
              },
              score
            });
          }
        });
      }

      // Search posts
      if (types.includes('post')) {
        // Note: Full-text search would require Algolia or ElasticSearch
        // For now, we'll do basic filtering
        const postsQuery = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(resultLimit * 2) // Get more to filter
        );

        const postsSnapshot = await getDocs(postsQuery);
        
        postsSnapshot.forEach((doc) => {
          const data = doc.data();
          const content = data.content?.toLowerCase() || '';
          
          let score = 0;
          searchTerms.forEach(term => {
            if (content.includes(term)) score += 5;
            if (data.tags?.some((tag: string) => tag.toLowerCase().includes(term))) score += 3;
          });

          if (score > 0) {
            allResults.push({
              id: doc.id,
              type: 'post',
              title: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
              description: `By ${data.authorName} in ${data.spaceName || 'Unknown'}`,
              image: data.images?.[0],
              url: `/posts/${doc.id}`,
              metadata: {
                authorId: data.authorId,
                spaceId: data.spaceId,
                createdAt: data.createdAt
              },
              score
            });
          }
        });
      }

      // Search users
      if (types.includes('user')) {
        const usersQuery = query(
          collection(db, 'users'),
          orderBy('displayName'),
          limit(resultLimit)
        );

        const usersSnapshot = await getDocs(usersQuery);
        
        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          const name = data.displayName?.toLowerCase() || '';
          const email = data.email?.toLowerCase() || '';
          const bio = data.bio?.toLowerCase() || '';
          
          let score = 0;
          searchTerms.forEach(term => {
            if (name.includes(term)) score += 10;
            if (email.includes(term)) score += 7;
            if (bio.includes(term)) score += 3;
          });

          if (score > 0) {
            allResults.push({
              id: doc.id,
              type: 'user',
              title: data.displayName || 'Unknown User',
              description: data.bio,
              image: data.photoURL,
              url: `/profile/${doc.id}`,
              metadata: {
                email: data.email,
                role: data.role
              },
              score
            });
          }
        });
      }

      // Search events
      if (types.includes('event')) {
        const eventsQuery = query(
          collection(db, 'events'),
          orderBy('startDate', 'desc'),
          limit(resultLimit)
        );

        const eventsSnapshot = await getDocs(eventsQuery);
        
        eventsSnapshot.forEach((doc) => {
          const data = doc.data();
          const title = data.title?.toLowerCase() || '';
          const description = data.description?.toLowerCase() || '';
          
          let score = 0;
          searchTerms.forEach(term => {
            if (title.includes(term)) score += 10;
            if (description.includes(term)) score += 5;
            if (data.location?.toLowerCase().includes(term)) score += 3;
          });

          if (score > 0) {
            allResults.push({
              id: doc.id,
              type: 'event',
              title: data.title,
              description: data.description,
              image: data.coverImage,
              url: `/events/${doc.id}`,
              metadata: {
                startDate: data.startDate,
                location: data.location,
                spaceId: data.spaceId
              },
              score
            });
          }
        });
      }

      // Sort by score and limit results
      allResults.sort((a, b) => b.score - a.score);
      setResults(allResults.slice(0, resultLimit));
    } catch (err) {
      console.error('Search error:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [types, resultLimit]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      search(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, search]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    search: () => search(query)
  };
}

// Hook for instant search suggestions
export function useSearchSuggestions(query: string, limit = 5) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    // In production, this would come from a dedicated suggestions index
    const fetchSuggestions = async () => {
      try {
        // Get popular search terms from spaces and tags
        const spacesQuery = query(
          collection(db, 'spaces'),
          orderBy('memberCount', 'desc'),
          limit(10)
        );
        
        const snapshot = await getDocs(spacesQuery);
        const terms = new Set<string>();
        
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.name?.toLowerCase().includes(query.toLowerCase())) {
            terms.add(data.name);
          }
          data.tags?.forEach((tag: string) => {
            if (tag.toLowerCase().includes(query.toLowerCase())) {
              terms.add(tag);
            }
          });
        });
        
        setSuggestions(Array.from(terms).slice(0, limit));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [query, limit]);

  return suggestions;
}

// Hook for recent searches
export function useRecentSearches(userId: string, limit = 5) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load from localStorage (in production, could sync with Firebase)
    const key = `recent_searches_${userId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setRecentSearches(JSON.parse(stored).slice(0, limit));
    }
  }, [userId, limit]);

  const addRecentSearch = useCallback((term: string) => {
    const key = `recent_searches_${userId}`;
    const stored = localStorage.getItem(key);
    const searches = stored ? JSON.parse(stored) : [];
    
    // Remove if exists and add to front
    const filtered = searches.filter((s: string) => s !== term);
    const updated = [term, ...filtered].slice(0, 10);
    
    localStorage.setItem(key, JSON.stringify(updated));
    setRecentSearches(updated.slice(0, limit));
  }, [userId, limit]);

  const clearRecentSearches = useCallback(() => {
    const key = `recent_searches_${userId}`;
    localStorage.removeItem(key);
    setRecentSearches([]);
  }, [userId]);

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  };
}