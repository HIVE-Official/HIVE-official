import { useEffect, useState, useCallback } from 'react';
import { collection, onSnapshot, query, where, orderBy, limit, QueryConstraint } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Space } from '@hive/core';

interface UseRealtimeSpacesOptions {
  filterType?: string;
  searchQuery?: string;
  limitCount?: number;
}

export function useRealtimeSpaces(options: UseRealtimeSpacesOptions = {}) {
  const { filterType = 'all', searchQuery = '', limitCount = 50 } = options;
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      // Build query constraints
      const constraints: QueryConstraint[] = [];

      // Add type filter
      if (filterType && filterType !== 'all') {
        constraints.push(where('type', '==', filterType));
      }

      // Add search filter (requires composite index)
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        constraints.push(
          where('name_lowercase', '>=', searchLower),
          where('name_lowercase', '<=', searchLower + '\uf8ff')
        );
        constraints.push(orderBy('name_lowercase'));
      } else {
        // Default ordering by creation date
        constraints.push(orderBy('createdAt', 'desc'));
      }

      // Add limit
      constraints.push(limit(limitCount));

      // Create the query
      const spacesQuery = query(
        collection(db, 'spaces'),
        ...constraints
      );

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        spacesQuery,
        (snapshot) => {
          const updatedSpaces = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as Space[];

          setSpaces(updatedSpaces);
          setLoading(false);

          // Log real-time updates
          if (!snapshot.metadata.hasPendingWrites) {
            const changes = snapshot.docChanges();
            changes.forEach(change => {
              if (change.type === 'added') {
                console.log('🆕 New space:', change.doc.data().name);
              } else if (change.type === 'modified') {
                console.log('📝 Space updated:', change.doc.data().name);
              } else if (change.type === 'removed') {
                console.log('🗑️ Space removed:', change.doc.data().name);
              }
            });
          }
        },
        (err) => {
          console.error('Real-time spaces error:', err);
          setError(err as Error);
          setLoading(false);
        }
      );

      // Cleanup function
      return () => {
        console.log('🔌 Unsubscribing from real-time spaces');
        unsubscribe();
      };
    } catch (err) {
      console.error('Failed to set up real-time listener:', err);
      setError(err as Error);
      setLoading(false);
    }
  }, [filterType, searchQuery, limitCount]);

  const refetch = useCallback(() => {
    // Trigger a re-render by changing a dependency
    setLoading(true);
  }, []);

  return {
    spaces,
    loading,
    error,
    refetch,
    totalCount: spaces.length
  };
}