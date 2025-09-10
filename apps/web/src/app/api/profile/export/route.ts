import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-server';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';

// GET /api/profile/export - Export user profile data
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json'; // json or pdf

    // Fetch all user data
    const [
      userDoc,
      connectionsSnapshot,
      spacesSnapshot,
      postsSnapshot,
      eventsSnapshot,
      achievementsDoc
    ] = await Promise.all([
      dbAdmin.collection('users').doc(user.uid).get(),
      dbAdmin.collection('connections')
        .where('users', 'array-contains', user.uid)
        .where('status', '==', 'connected')
        .get(),
      dbAdmin.collection('spaceMembers')
        .where('userId', '==', user.uid)
        .get(),
      dbAdmin.collectionGroup('posts')
        .where('authorId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .limit(100)
        .get(),
      dbAdmin.collection('userCalendarEvents')
        .where('userId', '==', user.uid)
        .orderBy('startDate', 'desc')
        .limit(50)
        .get(),
      dbAdmin.collection('achievements')
        .doc(user.uid)
        .get()
    ]);

    const userData = userDoc.data() || {};
    
    // Compile export data
    const exportData = {
      profile: {
        uid: user.uid,
        email: userData.email,
        fullName: userData.fullName,
        displayName: userData.displayName,
        handle: userData.handle,
        bio: userData.bio,
        major: userData.major,
        year: userData.year,
        graduationYear: userData.graduationYear,
        campus: userData.campus,
        dormBuilding: userData.dormBuilding,
        pronouns: userData.pronouns,
        avatarUrl: userData.avatarUrl,
        photos: userData.photos || [],
        createdAt: userData.createdAt?.toDate?.() || null,
        lastActive: userData.lastActive?.toDate?.() || null
      },
      stats: {
        connections: connectionsSnapshot.size,
        spaces: spacesSnapshot.size,
        posts: postsSnapshot.size,
        events: eventsSnapshot.size,
        profileViews: userData.profileViews || 0,
        achievementPoints: userData.achievementPoints || 0
      },
      connections: connectionsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          connectedAt: data.connectedAt?.toDate?.() || null,
          type: data.type || 'connection'
        };
      }),
      spaces: spacesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          spaceId: data.spaceId,
          spaceName: data.spaceName,
          role: data.role,
          joinedAt: data.joinedAt?.toDate?.() || null
        };
      }),
      posts: postsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          content: data.content,
          type: data.type,
          createdAt: data.createdAt?.toDate?.() || null,
          likes: data.engagement?.likes || 0,
          comments: data.engagement?.comments || 0
        };
      }),
      events: eventsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          startDate: data.startDate,
          endDate: data.endDate,
          type: data.type,
          location: data.location
        };
      }),
      achievements: achievementsDoc.exists ? achievementsDoc.data() : {},
      exportMetadata: {
        exportedAt: new Date().toISOString(),
        format,
        version: '1.0.0'
      }
    };

    if (format === 'pdf') {
      // For PDF export, we would generate a PDF here
      // For now, return JSON with a note about PDF being in development
      return NextResponse.json({
        success: false,
        message: 'PDF export is coming soon. Please use JSON format for now.',
        data: exportData
      });
    }

    // Return JSON data with appropriate headers for download
    const jsonString = JSON.stringify(exportData, null, 2);
    const fileName = `hive-profile-${userData.handle || user.uid}-${new Date().toISOString().split('T')[0]}.json`;

    return new NextResponse(jsonString, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    logger.error('Error exporting profile', { error });
    return NextResponse.json(
      { error: 'Failed to export profile' },
      { status: 500 }
    );
  }
}