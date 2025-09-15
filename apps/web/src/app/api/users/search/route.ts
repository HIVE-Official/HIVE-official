import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getAuthTokenFromRequest } from '@/lib/auth/auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import * as admin from 'firebase-admin';

// Helper function to safely convert Firestore timestamp to Date
function toDateSafe(timestamp: any): Date | null {
  if (!timestamp) return null;
  if (typeof timestamp === 'string') return new Date(timestamp);
  if (timestamp && typeof timestamp.toDate === 'function') return (timestamp?.toDate ? timestamp.toDate() : new Date(timestamp));
  if (timestamp instanceof Date) return timestamp;
  return null;
}

const SearchUsersSchema = z.object({
  query: z.string().min(1).max(100),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  userType: z.enum(['student', 'faculty', 'admin']).optional(),
  major: z.string().optional(),
  graduationYear: z.coerce.number().optional(),
  spaceId: z.string().optional(), // Filter to users in a specific space
  sortBy: z.enum(['relevance', 'recent', 'alphabetical']).default('relevance'),
  includePrivateProfiles: z.coerce.boolean().default(false) });

const db = dbAdmin;

export async function POST(request: NextRequest) {
  try {
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const body = await request.json();
    const searchParams = SearchUsersSchema.parse(body);
    const { query, limit, offset, userType, major, graduationYear, spaceId, sortBy, includePrivateProfiles } = searchParams;

    let usersToSearch: Array<{ id: string; privacy?: any; fullName?: string; handle?: string; bio?: string; academic?: any; isVerified?: boolean; lastLoginAt?: string; [key: string]: any }> = [];

    // If searching within a specific space, get space members first
    if (spaceId) {
      try {
        const membersSnapshot = await db
          .collection('spaces')
          .doc(spaceId)
          .collection('members')
          .get();
        
        const memberIds = membersSnapshot.docs.map(doc => doc.data().userId);
        
        // Get user documents for these members
        if (memberIds.length > 0) {
          // Firestore 'in' queries are limited to 10 items, so batch them
          const batches = [];
          for (let i = 0; i < memberIds.length; i += 10) {
            const batch = memberIds.slice(i, i + 10);
            const batchQuery = dbAdmin.collection('users').where('__name__', 'in', batch.map(id => dbAdmin.collection('users').doc(id)));
            batches.push(batchQuery.get());
          }
          
          const batchResults = await Promise.all(batches);
          for (const snapshot of batchResults) {
            for (const doc of snapshot.docs) {
              usersToSearch.push({ id: doc.id, ...doc.data() } as { id: string; privacy?: any; fullName?: string; handle?: string; bio?: string; academic?: any; isVerified?: boolean; lastLoginAt?: string; [key: string]: any });
            }
          }
        }
      } catch (error) {
        logger.warn('Failed to fetch space members', { data: error, endpoint: '/api/users/search' });
      }
    } else {
      // Search all users with basic filters
      let usersQuery: admin.firestore.Query<admin.firestore.DocumentData> = dbAdmin.collection('users');
      
      if (userType) {
        usersQuery = usersQuery.where('userType', '==', userType);
      }
      
      if (major) {
        usersQuery = usersQuery.where('academic.major', '==', major);
      }
      
      if (graduationYear) {
        usersQuery = usersQuery.where('academic.graduationYear', '==', graduationYear);
      }

      const usersSnapshot = await usersQuery.get();
      usersToSearch = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as { id: string; privacy?: any; fullName?: string; handle?: string; bio?: string; academic?: any; isVerified?: boolean; lastLoginAt?: string; [key: string]: any }));
    }

    const users = [];
    const queryLower = query.toLowerCase();

    // Process each user and apply text search + privacy filters
    for (const userData of usersToSearch) {
      // Skip private profiles unless explicitly requested or it's the current user
      if (!includePrivateProfiles && userData.privacy?.profileVisibility === 'private' && userData.id !== decodedToken.uid) {
        continue;
      }

      // Text matching
      const fullName = (userData.fullName || '').toLowerCase();
      const handle = (userData.handle || '').toLowerCase();
      const bio = (userData.bio || '').toLowerCase();
      const major = (userData.academic?.major || '').toLowerCase();
      
      const nameMatch = fullName.includes(queryLower);
      const handleMatch = handle.includes(queryLower);
      const bioMatch = bio.includes(queryLower);
      const majorMatch = major.includes(queryLower);
      
      if (!nameMatch && !handleMatch && !bioMatch && !majorMatch) {
        continue;
      }

      // Calculate relevance score
      let relevanceScore = 0;
      if (handleMatch) relevanceScore += handle === queryLower ? 100 : 90;
      if (nameMatch) relevanceScore += fullName === queryLower ? 95 : 80;
      if (bioMatch) relevanceScore += 50;
      if (majorMatch) relevanceScore += 40;
      
      // Boost verified users
      if (userData.isVerified) relevanceScore += 20;
      
      // Boost active users (approximated by recent login)
      const lastLoginDate = toDateSafe(userData.lastLoginAt);
      const daysSinceLogin = lastLoginDate 
        ? (Date.now() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
        : 999;
      if (daysSinceLogin < 7) relevanceScore += 15;
      else if (daysSinceLogin < 30) relevanceScore += 5;

      // Check if there's an existing connection
      let connectionStatus = 'none';
      try {
        // Check if they're connected (simplified - would need proper connection/follow system)
        const connectionDoc = await db
          .collection('users')
          .doc(decodedToken.uid)
          .collection('connections')
          .doc(userData.id)
          .get();
        
        if (connectionDoc.exists) {
          connectionStatus = connectionDoc.data()?.status || 'connected';
        }
      } catch (error) {
        logger.warn('Failed to check connection status', { data: error, endpoint: '/api/users/search' });
      }

      // Get mutual spaces count
      let mutualSpacesCount = 0;
      try {
        if (spaceId) {
          mutualSpacesCount = 1; // They're in the same space we're searching
        } else {
          // Get user's spaces
          const currentUserSpacesSnapshot = await db
            .collectionGroup('members')
            .where('userId', '==', decodedToken.uid)
            .get();
          
          const currentUserSpaceIds = currentUserSpacesSnapshot.docs
            .map(doc => doc.ref.parent.parent?.id)
            .filter(Boolean);

          const otherUserSpacesSnapshot = await db
            .collectionGroup('members')
            .where('userId', '==', userData.id)
            .get();
          
          const otherUserSpaceIds = otherUserSpacesSnapshot.docs
            .map(doc => doc.ref.parent.parent?.id)
            .filter(Boolean);

          mutualSpacesCount = currentUserSpaceIds.filter(id => otherUserSpaceIds.includes(id)).length;
        }
      } catch (error) {
        logger.warn('Failed to calculate mutual spaces', { data: error, endpoint: '/api/users/search' });
      }

      users.push({
        id: userData.id,
        fullName: userData.fullName,
        handle: userData.handle,
        photoURL: userData.photoURL || null,
        bio: userData.bio,
        userType: userData.userType,
        academic: {
          major: userData.academic?.major || null,
          graduationYear: userData.academic?.graduationYear || null,
          school: userData.academic?.school || null,
        },
        isVerified: userData.isVerified || false,
        connectionStatus,
        mutualSpacesCount,
        createdAt: toDateSafe(userData.createdAt)?.toISOString() || new Date().toISOString(),
        lastActive: toDateSafe(userData.lastLoginAt)?.toISOString() || null,
        relevanceScore,
        // Add highlights for matched text (respect privacy)
        highlights: {
          fullName: nameMatch ? [fullName] : [],
          handle: handleMatch ? [handle] : [],
          bio: bioMatch && userData.privacy?.bioVisibility !== 'private' ? [bio.substring(
            Math.max(0, bio.indexOf(queryLower) - 30),
            Math.min(bio.length, bio.indexOf(queryLower) + queryLower.length + 30)
          )] : [],
          major: majorMatch && userData.privacy?.academicVisibility !== 'private' ? [major] : []
        }
      });
    }

    // Sort results
    users.sort((a, b) => {
      switch (sortBy) {
        case 'recent': {
          const aTime = a.lastActive ? new Date(a.lastActive).getTime() : 0;
          const bTime = b.lastActive ? new Date(b.lastActive).getTime() : 0;
          return bTime - aTime;
        }
        case 'alphabetical':
          return (a.fullName || '').localeCompare(b.fullName || '');
        case 'relevance':
        default:
          // Secondary sort by mutual spaces, then relevance
          if (b.mutualSpacesCount !== a.mutualSpacesCount) {
            return b.mutualSpacesCount - a.mutualSpacesCount;
          }
          return b.relevanceScore - a.relevanceScore;
      }
    });

    // Apply pagination
    const paginatedUsers = users.slice(offset, offset + limit);

    return NextResponse.json({
      users: paginatedUsers,
      total: users.length,
      hasMore: users.length > offset + limit,
      pagination: {
        limit,
        offset,
        nextOffset: users.length > offset + limit ? offset + limit : null,
      },
      query: {
        ...searchParams,
        executedAt: new Date().toISOString(),
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid search parameters',
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error searching users', { error: error, endpoint: '/api/users/search' });
    return NextResponse.json(ApiResponseHelper.error("Failed to search users", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}