/**
 * Space Query Optimizer
 * Eliminates inefficient nested collection searches
 */

import { dbAdmin } from '../firebase/admin/firebase-admin';
import { logger } from '../logger';
import type { DocumentSnapshot, DocumentReference } from 'firebase-admin/firestore';

export interface SpaceQueryResult {
  spaceDoc: DocumentSnapshot | null;
  spaceDocRef: DocumentReference | null;
  spaceType: string | null;
}

/**
 * Space types ordered by query frequency for optimization
 */
const SPACE_TYPES = [
  'student_organizations', // Most common
  'campus_living',
  'university_organizations', 
  'greek_life',
  'hive_exclusive',
  'cohort'
] as const;

/**
 * Cache for space type mapping to avoid repeated queries
 * In production, this should be Redis or similar
 */
const spaceTypeCache = new Map<string, string>();

/**
 * Optimized space lookup using parallel queries instead of sequential
 */
export async function findSpaceOptimized(spaceId: string): Promise<SpaceQueryResult> {
  try {
    // Check cache first
    const cachedType = spaceTypeCache.get(spaceId);
    if (cachedType) {
      const spaceRef = dbAdmin.collection("spaces").doc(cachedType).collection("spaces").doc(spaceId);
      const spaceDoc = await spaceRef.get();
      
      if (spaceDoc.exists) {
        return {
          spaceDoc,
          spaceDocRef: spaceRef,
          spaceType: cachedType
        };
      } else {
        // Cache miss, remove stale entry
        spaceTypeCache.delete(spaceId);
      }
    }

    // Parallel query approach - much faster than sequential
    const spaceQueries = SPACE_TYPES.map(async (type) => {
      const spaceRef = dbAdmin.collection("spaces").doc(type).collection("spaces").doc(spaceId);
      const spaceDoc = await spaceRef.get();
      
      return {
        type,
        spaceRef,
        spaceDoc,
        exists: spaceDoc.exists
      };
    });

    // Execute all queries in parallel
    const results = await Promise.all(spaceQueries);
    
    // Find the first existing space
    const existingSpace = results.find(result => result.exists);
    
    if (existingSpace) {
      // Cache the result for future queries
      spaceTypeCache.set(spaceId, existingSpace.type);
      
      return {
        spaceDoc: existingSpace.spaceDoc,
        spaceDocRef: existingSpace.spaceRef,
        spaceType: existingSpace.type
      };
    }

    return {
      spaceDoc: null,
      spaceDocRef: null,
      spaceType: null
    };

  } catch (error) {
    logger.error('Space query optimization failed', {
      spaceId,
      error: error instanceof Error ? error.message : String(error),
      action: 'space_query_failed'
    });
    
    // Fallback to sequential query in case of error
    return await findSpaceSequential(spaceId);
  }
}

/**
 * Fallback sequential method for error cases
 */
async function findSpaceSequential(spaceId: string): Promise<SpaceQueryResult> {
  for (const type of SPACE_TYPES) {
    const potentialSpaceRef = dbAdmin.collection("spaces").doc(type).collection("spaces").doc(spaceId);
    const potentialSpaceDoc = await potentialSpaceRef.get();
    
    if (potentialSpaceDoc.exists) {
      return {
        spaceDoc: potentialSpaceDoc,
        spaceDocRef: potentialSpaceRef,
        spaceType: type
      };
    }
  }

  return {
    spaceDoc: null,
    spaceDocRef: null,
    spaceType: null
  };
}

/**
 * Clear cache entry when space is deleted or moved
 */
export function invalidateSpaceCache(spaceId: string): void {
  spaceTypeCache.delete(spaceId);
}

/**
 * Get cache statistics for monitoring
 */
export function getSpaceCacheStats() {
  return {
    size: spaceTypeCache.size,
    entries: Array.from(spaceTypeCache.keys())
  };
}