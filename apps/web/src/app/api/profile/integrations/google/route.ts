import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/providers/auth-server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';
import { FieldValue } from 'firebase-admin/firestore';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + '/api/profile/integrations/google/callback';

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events.readonly'
];

// GET /api/profile/integrations/google - Get integration status or initiate OAuth
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'connect') {
      // Generate OAuth URL for Google Calendar
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID || '');
      authUrl.searchParams.append('redirect_uri', GOOGLE_REDIRECT_URI);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('scope', GOOGLE_SCOPES.join(' '));
      authUrl.searchParams.append('access_type', 'offline');
      authUrl.searchParams.append('prompt', 'consent');
      authUrl.searchParams.append('state', user.uid); // Pass user ID in state

      return NextResponse.json({
        success: true,
        authUrl: authUrl.toString()
      });
    }

    // Get current integration status
    const integrationDoc = await dbAdmin
      .collection('userIntegrations')
      .doc(user.uid)
      .get();

    const integrationData = integrationDoc.data();
    const googleIntegration = integrationData?.calendar?.google;

    return NextResponse.json({
      success: true,
      integration: {
        connected: !!googleIntegration?.accessToken,
        email: googleIntegration?.email,
        lastSync: googleIntegration?.lastSync?.toDate?.() || null,
        syncEnabled: googleIntegration?.syncEnabled ?? false,
        calendars: googleIntegration?.calendars || []
      }
    });

  } catch (error) {
    logger.error('Error with Google integration', { error });
    return NextResponse.json(
      { error: 'Failed to process Google integration' },
      { status: 500 }
    );
  }
}

// POST /api/profile/integrations/google - Update integration settings
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { syncEnabled, calendarsToSync } = body;

    // Update integration settings
    await dbAdmin
      .collection('userIntegrations')
      .doc(user.uid)
      .set({
        calendar: {
          google: {
            syncEnabled: syncEnabled ?? true,
            calendarsToSync: calendarsToSync || [],
            updatedAt: FieldValue.serverTimestamp()
          }
        }
      }, { merge: true });

    // Trigger initial sync if enabled
    if (syncEnabled) {
      // Queue sync job (in production, this would be a background job)
      await queueCalendarSync(user.uid, 'google');
    }

    return NextResponse.json({
      success: true,
      message: 'Google Calendar settings updated'
    });

  } catch (error) {
    logger.error('Error updating Google integration', { error });
    return NextResponse.json(
      { error: 'Failed to update Google integration' },
      { status: 500 }
    );
  }
}

// DELETE /api/profile/integrations/google - Disconnect Google Calendar
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Remove Google integration data
    await dbAdmin
      .collection('userIntegrations')
      .doc(user.uid)
      .update({
        'calendar.google': FieldValue.delete()
      });

    // Delete synced events
    const eventsSnapshot = await dbAdmin
      .collection('calendarEvents')
      .where('userId', '==', user.uid)
      .where('source', '==', 'google')
      .get();

    const batch = dbAdmin.batch();
    eventsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    logger.info('Google Calendar disconnected', { userId: user.uid });

    return NextResponse.json({
      success: true,
      message: 'Google Calendar disconnected successfully'
    });

  } catch (error) {
    logger.error('Error disconnecting Google Calendar', { error });
    return NextResponse.json(
      { error: 'Failed to disconnect Google Calendar' },
      { status: 500 }
    );
  }
}

// Helper function to queue calendar sync
async function queueCalendarSync(userId: string, provider: 'google' | 'outlook') {
  try {
    await dbAdmin.collection('syncJobs').add({
      userId,
      provider,
      type: 'calendar_sync',
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      scheduledFor: FieldValue.serverTimestamp()
    });
  } catch (error) {
    logger.error('Error queuing calendar sync', { error, userId, provider });
  }
}