import { useState, useEffect } from 'react';
import { authenticatedFetch } from '@/lib/auth-utils';
import { logger } from '@/lib/structured-logger';

export interface PinnedItem {
  id: string;
  title: string;
  description?: string;
  type: 'document' | 'link' | 'announcement' | 'event' | 'resource' | 'post';
  url?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  postId?: string;
  
  // Metadata
  pinnedBy: {
    id: string;
    fullName?: string;
    name?: string;
    handle?: string;
    role?: string;
    photoURL?: string;
  };
  pinnedAt: Date;
  expiresAt?: Date;
  
  // Analytics
  viewCount?: number;
  downloadCount?: number;
  clickCount?: number;
  lastAccessed?: Date;
  
  // Additional fields
  priority?: number;
  category?: string;
  icon?: string;
  color?: string;
  post?: any; // Post data if type is 'post'
}

interface UseSpacePinnedResult {
  items: PinnedItem[];
  loading: boolean;
  error: Error | null;
  pinItem: (item: Omit<PinnedItem, 'id' | 'pinnedBy' | 'pinnedAt'>) => Promise<void>;
  unpinItem: (itemId: string) => Promise<void>;
  trackAction: (itemId: string, action: 'view' | 'download') => Promise<void>;
  refresh: () => void;
}

export function useSpacePinned(spaceId: string | undefined): UseSpacePinnedResult {
  const [items, setItems] = useState<PinnedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPinnedItems = async () => {
    if (!spaceId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/pinned`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch pinned items: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform the API response to match our interface
      const transformedItems: PinnedItem[] = (data.items || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type || 'resource',
        url: item.url,
        fileUrl: item.fileUrl,
        fileName: item.fileName,
        fileSize: item.fileSize,
        postId: item.postId,
        
        // Transform pinnedBy to ensure consistent structure
        pinnedBy: {
          id: item.pinnedBy?.id || item.pinnedBy || 'unknown',
          fullName: item.pinnedBy?.fullName,
          name: item.pinnedBy?.fullName || item.pinnedBy?.handle || 'Unknown User',
          handle: item.pinnedBy?.handle,
          role: item.pinnedBy?.role || 'member',
          photoURL: item.pinnedBy?.photoURL
        },
        
        pinnedAt: item.pinnedAt ? new Date(item.pinnedAt) : new Date(),
        expiresAt: item.expiresAt ? new Date(item.expiresAt) : undefined,
        
        viewCount: item.viewCount || 0,
        downloadCount: item.downloadCount || 0,
        clickCount: item.clickCount || 0,
        lastAccessed: item.lastAccessed ? new Date(item.lastAccessed) : undefined,
        
        priority: item.priority,
        category: item.category,
        icon: item.icon,
        color: item.color,
        post: item.post
      }));

      setItems(transformedItems);

      logger.info('Fetched pinned items', { 
        spaceId, 
        count: transformedItems.length 
      });
    } catch (err) {
      logger.error('Error fetching pinned items', { 
        error: err, 
        spaceId 
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const pinItem = async (item: Omit<PinnedItem, 'id' | 'pinnedBy' | 'pinnedAt'>) => {
    if (!spaceId) return;

    try {
      const response = await authenticatedFetch(`/api/spaces/${spaceId}/pinned`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`Failed to pin item: ${response.statusText}`);
      }

      // Refresh the list
      await fetchPinnedItems();

      logger.info('Successfully pinned item', { 
        spaceId, 
        type: item.type,
        title: item.title 
      });
    } catch (err) {
      logger.error('Error pinning item', { 
        error: err, 
        spaceId 
      });
      throw err;
    }
  };

  const unpinItem = async (itemId: string) => {
    if (!spaceId) return;

    try {
      const response = await authenticatedFetch(`/api/spaces/${spaceId}/pinned?itemId=${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to unpin item: ${response.statusText}`);
      }

      // Remove from local state immediately for optimistic update
      setItems(prev => prev.filter(item => item.id !== itemId));

      // Refresh the list to ensure consistency
      await fetchPinnedItems();

      logger.info('Successfully unpinned item', { 
        spaceId, 
        itemId 
      });
    } catch (err) {
      logger.error('Error unpinning item', { 
        error: err, 
        spaceId,
        itemId 
      });
      // Refresh to restore correct state on error
      await fetchPinnedItems();
      throw err;
    }
  };

  const trackAction = async (itemId: string, action: 'view' | 'download') => {
    if (!spaceId) return;

    try {
      const response = await authenticatedFetch(`/api/spaces/${spaceId}/pinned`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, action }),
      });

      if (!response.ok) {
        logger.warn('Failed to track pinned item action', { 
          spaceId, 
          itemId, 
          action 
        });
      }

      // Update local state to reflect the action
      setItems(prev => prev.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            viewCount: action === 'view' ? (item.viewCount || 0) + 1 : item.viewCount,
            downloadCount: action === 'download' ? (item.downloadCount || 0) + 1 : item.downloadCount,
            lastAccessed: new Date()
          };
        }
        return item;
      }));
    } catch (err) {
      logger.error('Error tracking pinned item action', { 
        error: err, 
        spaceId,
        itemId,
        action 
      });
      // Don't throw - tracking is not critical
    }
  };

  useEffect(() => {
    fetchPinnedItems();
  }, [spaceId]);

  return {
    items,
    loading,
    error,
    pinItem,
    unpinItem,
    trackAction,
    refresh: fetchPinnedItems
  };
}