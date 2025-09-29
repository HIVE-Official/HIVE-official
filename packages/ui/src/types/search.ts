/**
 * Search-related types for command palette and search functionality
 */

export interface SearchableItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  category: string;
  type: 'space' | 'tool' | 'person' | 'event' | 'post' | 'command';
  keywords?: string[];
  action?: () => void;
  metadata?: Record<string, unknown>;
}

export interface SearchResult<T = SearchableItem> {
  items: T[];
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
}

export interface SearchFilters {
  categories?: string[];
  types?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
}