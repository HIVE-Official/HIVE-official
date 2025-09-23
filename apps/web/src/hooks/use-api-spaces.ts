import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api-client';
import type { Space } from '@hive/core';

interface UseApiSpacesOptions {
  filterType?: string;
  searchQuery?: string;
  limitCount?: number;
}

export function useApiSpaces(options: UseApiSpacesOptions = {}) {
  const { filterType = 'all', searchQuery = '', limitCount = 50 } = options;
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSpaces = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('limit', limitCount.toString());

      if (filterType && filterType !== 'all') {
        params.append('type', filterType);
      }

      if (searchQuery) {
        params.append('q', searchQuery);
      }

      const response = await api.spaces.list(params);
      const data = await response.json();

      if (data.success) {
        setSpaces(data.data.spaces || []);
      } else {
        console.error('Spaces API error:', data);
        setError(new Error(data.error || 'Failed to fetch spaces'));
        setSpaces([]);
      }
    } catch (err) {
      console.error('Failed to fetch spaces:', err);
      setError(err as Error);
      setSpaces([]);
    } finally {
      setLoading(false);
    }
  }, [filterType, searchQuery, limitCount]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const refetch = useCallback(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  return {
    spaces,
    loading,
    error,
    refetch,
    totalCount: spaces.length
  };
}