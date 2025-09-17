import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit,
  getDocs,
  DocumentData,
  QueryConstraint,
  or
} from 'firebase/firestore';
import { logger } from '@/lib/logger';

import { db } from './firebase';

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'space' | 'user' | 'post' | 'event' | 'tool';
  url: string;
  metadata?: Record<string, any>;
  relevanceScore: number;
  timestamp?: Date;
}

export interface SearchOptions {
  query: string;
  types?: Array<'space' | 'user' | 'post' | 'event' | 'tool'>;
  limit?: number;
  spaceId?: string; // For searching within a specific space
}

/**
 * Perform a search across Firebase collections
 * Note: This is a basic implementation. For production, use Algolia or Elasticsearch
 */
export async function performFirebaseSearch(options: SearchOptions): Promise<SearchResult[]> {
  const { query: searchQuery, types = ['space', 'post', 'user'], limit = 20, spaceId } = options;
  
  if (!searchQuery || searchQuery.trim().length < 2) {
    return [];
  }

  const searchTerm = searchQuery.toLowerCase().trim();
  const results: SearchResult[] = [];

  try {
    // Search Spaces
    if (types.includes('space')) {
      const spacesRef = collection(db, 'spaces');
      const constraints: QueryConstraint[] = [
        orderBy('name'),
        firestoreLimit(limit)
      ];
      
      // Firebase doesn't support full-text search natively
      // For a basic implementation, we'll fetch and filter client-side
      // In production, use a search service
      const spacesSnapshot = await getDocs(query(spacesRef, ...constraints));
      
      spacesSnapshot.forEach((doc: any) => {
        const data = doc.data();
        const name = (data.name || '').toLowerCase();
        const description = (data.description || '').toLowerCase();
        const tags = (data.tags || []).join(' ').toLowerCase();
        
        // Basic relevance scoring
        let score = 0;
        if (name.includes(searchTerm)) score += 10;
        if (description.includes(searchTerm)) score += 5;
        if (tags.includes(searchTerm)) score += 3;
        
        if (score > 0) {
          results.push({
            id: doc.id,
            title: data.name || 'Unnamed Space',
            description: data.description,
            type: 'space',
            url: `/spaces/${doc.id}`,
            metadata: {
              memberCount: data.memberCount || 0,
              status: data.status || 'active',
              category: data.category,
              isPrivate: data.isPrivate || false
            },
            relevanceScore: score,
            timestamp: data.createdAt?.toDate()
          });
        }
      });
    }

    // Search Posts within a space or globally
    if (types.includes('post')) {
      if (spaceId) {
        // Search posts within a specific space
        const postsRef = collection(db, 'spaces', spaceId, 'posts');
        const postsSnapshot = await getDocs(
          query(postsRef, orderBy('timestamp', 'desc'), firestoreLimit(limit))
        );
        
        postsSnapshot.forEach((doc: any) => {
          const data = doc.data();
          const content = (data.content || '').toLowerCase();
          const title = (data.title || '').toLowerCase();
          
          let score = 0;
          if (title.includes(searchTerm)) score += 10;
          if (content.includes(searchTerm)) score += 5;
          
          if (score > 0) {
            results.push({
              id: doc.id,
              title: data.title || 'Post',
              description: data.content?.substring(0, 150),
              type: 'post',
              url: `/spaces/${spaceId}/posts/${doc.id}`,
              metadata: {
                author: data.author,
                type: data.type,
                commentCount: data.commentCount || 0,
                reactions: data.reactions || []
              },
              relevanceScore: score,
              timestamp: data.timestamp?.toDate()
            });
          }
        });
      }
    }

    // Search Users
    if (types.includes('user')) {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(
        query(usersRef, firestoreLimit(limit))
      );
      
      usersSnapshot.forEach((doc: any) => {
        const data = doc.data();
        const displayName = (data.displayName || '').toLowerCase();
        const email = (data.email || '').toLowerCase();
        const bio = (data.bio || '').toLowerCase();
        
        let score = 0;
        if (displayName.includes(searchTerm)) score += 10;
        if (email.includes(searchTerm)) score += 5;
        if (bio.includes(searchTerm)) score += 3;
        
        if (score > 0) {
          results.push({
            id: doc.id,
            title: data.displayName || data.email || 'User',
            description: data.bio,
            type: 'user',
            url: `/profile/${doc.id}`,
            metadata: {
              avatar: data.photoURL,
              major: data.major,
              year: data.year,
              isOnline: data.isOnline
            },
            relevanceScore: score,
            timestamp: data.createdAt?.toDate()
          });
        }
      });
    }

    // Search Events
    if (types.includes('event') && spaceId) {
      const eventsRef = collection(db, 'spaces', spaceId, 'events');
      const eventsSnapshot = await getDocs(
        query(eventsRef, orderBy('startDateTime', 'desc'), firestoreLimit(limit))
      );
      
      eventsSnapshot.forEach((doc: any) => {
        const data = doc.data();
        const title = (data.title || '').toLowerCase();
        const description = (data.description || '').toLowerCase();
        const location = (data.location || '').toLowerCase();
        
        let score = 0;
        if (title.includes(searchTerm)) score += 10;
        if (description.includes(searchTerm)) score += 5;
        if (location.includes(searchTerm)) score += 3;
        
        if (score > 0) {
          results.push({
            id: doc.id,
            title: data.title || 'Event',
            description: data.description,
            type: 'event',
            url: `/spaces/${spaceId}/events/${doc.id}`,
            metadata: {
              startDateTime: data.startDateTime?.toDate(),
              endDateTime: data.endDateTime?.toDate(),
              location: data.location,
              attendeeCount: data.attendeeCount || 0,
              maxAttendees: data.maxAttendees
            },
            relevanceScore: score,
            timestamp: data.createdAt?.toDate()
          });
        }
      });
    }

    // Sort by relevance score
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    // Limit results
    return results.slice(0, limit);
    
  } catch (error) {
    logger.error('Search error:', { error: String(error) });
    return [];
  }
}

/**
 * Search for users by name or email
 */
export async function searchUsers(searchTerm: string, limit: number = 10): Promise<SearchResult[]> {
  return performFirebaseSearch({
    query: searchTerm,
    types: ['user'],
    limit
  });
}

/**
 * Search for spaces by name or description
 */
export async function searchSpaces(searchTerm: string, limit: number = 10): Promise<SearchResult[]> {
  return performFirebaseSearch({
    query: searchTerm,
    types: ['space'],
    limit
  });
}

/**
 * Search within a specific space
 */
export async function searchWithinSpace(
  spaceId: string, 
  searchTerm: string, 
  limit: number = 20
): Promise<SearchResult[]> {
  return performFirebaseSearch({
    query: searchTerm,
    types: ['post', 'event'],
    spaceId,
    limit
  });
}

/**
 * Global search across all content
 */
export async function globalSearch(searchTerm: string, limit: number = 30): Promise<SearchResult[]> {
  return performFirebaseSearch({
    query: searchTerm,
    types: ['space', 'user', 'post', 'event', 'tool'],
    limit
  });
}