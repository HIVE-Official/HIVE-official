import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@hive/auth-logic';

interface Space {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  isPublic: boolean;
  createdAt: Date;
}

interface UseSpacesReturn {
  spaces: Space[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSpaces(): UseSpacesReturn {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const fetchSpaces = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setSpaces([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, return mock data
      const mockSpaces: Space[] = [
        {
          id: '1',
          name: 'General Discussion',
          description: 'A place for general conversations',
          memberCount: 150,
          isPublic: true,
          createdAt: new Date('2024-01-01'),
        },
        {
          id: '2',
          name: 'Study Group',
          description: 'Collaborative learning space',
          memberCount: 45,
          isPublic: false,
          createdAt: new Date('2024-01-15'),
        },
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSpaces(mockSpaces);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch spaces');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    void fetchSpaces();
  }, [fetchSpaces]);

  const refetch = () => {
    void fetchSpaces();
  };

  return {
    spaces,
    isLoading,
    error,
    refetch,
  };
} 