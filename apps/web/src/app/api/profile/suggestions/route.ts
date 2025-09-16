import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/auth/providers/auth-server';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";

interface ProfileSuggestion {
  uid: string;
  name: string;
  displayName: string;
  handle: string;
  year: string;
  major: string;
  status: string;
  mutualSpaces: number;
  availability: string;
  avatarUrl?: string;
  bio?: string;
}

// GET /api/profile/suggestions - Get profile suggestions for discovery
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get user's spaces for mutual space calculation
    const userSpacesSnapshot = await dbAdmin
      .collection('members')
      .where('userId', '==', user.uid)
      .get();
    
    const userSpaceIds = new Set(userSpacesSnapshot.docs.map(doc => doc.data().spaceId));

    // Get user's existing connections to exclude
    const connectionsSnapshot = await dbAdmin
      .collection('connections')
      .where('users', 'array-contains', user.uid)
      .get();
    
    const connectedUserIds = new Set<string>();
    connectionsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      data.users.forEach((uid: string) => {
        if (uid !== user.uid) connectedUserIds.add(uid);
      });
    });

    // Get random verified users (excluding current user and connections)
    const usersSnapshot = await dbAdmin
      .collection('users')
      .where('isVerified', '==', true)
      .limit(limit * 3) // Get extra to filter
      .get();

    const suggestions: ProfileSuggestion[] = [];

    for (const doc of usersSnapshot.docs) {
      // Skip current user and already connected users
      if (doc.id === user.uid || connectedUserIds.has(doc.id)) continue;
      
      const userData = doc.data();
      
      // Skip if profile is private/ghost mode
      if (userData.privacy?.ghostMode || userData.privacy?.profileVisibility === 'private') {
        continue;
      }

      // Calculate mutual spaces
      const targetUserSpacesSnapshot = await dbAdmin
        .collection('members')
        .where('userId', '==', doc.id)
        .get();
      
      const targetSpaceIds = targetUserSpacesSnapshot.docs.map(d => d.data().spaceId);
      const mutualSpaces = targetSpaceIds.filter(id => userSpaceIds.has(id)).length;

      // Build suggestion object
      const suggestion: ProfileSuggestion = {
        uid: doc.id,
        name: userData.fullName || userData.displayName || 'Anonymous',
        displayName: userData.displayName || userData.fullName || 'Anonymous',
        handle: userData.handle || doc.id,
        year: userData.year || 'Unknown',
        major: userData.major || 'Undeclared',
        status: userData.status?.text || 'Active',
        mutualSpaces,
        availability: userData.status?.availability || 'Unknown',
        avatarUrl: userData.avatarUrl,
        bio: userData.bio
      };

      suggestions.push(suggestion);
      
      if (suggestions.length >= limit) break;
    }

    // Sort by mutual spaces (descending)
    suggestions.sort((a, b) => b.mutualSpaces - a.mutualSpaces);

    logger.info('Profile suggestions fetched', { 
      userId: user.uid, 
      count: suggestions.length 
    });

    return NextResponse.json({ 
      success: true, 
      profiles: suggestions,
      count: suggestions.length
    });

  } catch (error) {
    logger.error('Error fetching profile suggestions', { error });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch suggestions", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}