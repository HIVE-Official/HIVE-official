/**
 * Google Calendar OAuth Callback Handler
 * Handles the OAuth callback from Google and stores tokens
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CALENDAR_CLIENT_ID,
  process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/profile/integrations/calendar/google/callback`
);

/**
 * GET /api/profile/integrations/calendar/google/callback
 * Handle OAuth callback from Google
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle errors from Google
    if (error) {
      logger.error('Google OAuth error:', { error: String(error) });
      return NextResponse.redirect(
        new URL(`/profile?error=google_auth_failed&details=${error}`, request.url)
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/profile?error=invalid_callback', request.url)
      );
    }

    // Decode and verify state
    let stateData;
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    } catch (err) {
      logger.error('Invalid state parameter:', { error: String(err) });
      return NextResponse.redirect(
        new URL('/profile?error=invalid_state', request.url)
      );
    }

    const { userId, returnUrl } = stateData;

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    
    if (!tokens.access_token) {
      throw new Error('No access token received from Google');
    }

    // Get user info to store calendar details
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    // Store tokens in Firebase
    const integrationData = {
      calendar: {
        google: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token || null,
          expiresAt: tokens.expiry_date 
            ? new Date(tokens.expiry_date) 
            : new Date(Date.now() + 3600 * 1000),
          calendarId: userInfo.email,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture
        }
      },
      updatedAt: FieldValue.serverTimestamp()
    };

    // Check if document exists
    const integrationsDoc = await dbAdmin
      .collection('userIntegrations')
      .doc(userId)
      .get();

    if (integrationsDoc.exists) {
      // Update existing document
      await dbAdmin
        .collection('userIntegrations')
        .doc(userId)
        .update(integrationData);
    } else {
      // Create new document
      await dbAdmin
        .collection('userIntegrations')
        .doc(userId)
        .set({
          userId,
          ...integrationData,
          createdAt: FieldValue.serverTimestamp()
        });
    }

    // Trigger initial sync
    try {
      await syncInitialEvents(userId, oauth2Client);
    } catch (syncError) {
      logger.error('Initial sync failed:', { error: String(syncError) });
      // Don't fail the connection if sync fails
    }

    // Redirect back to profile with success
    return NextResponse.redirect(
      new URL(`${returnUrl || '/profile'}?success=google_calendar_connected`, request.url)
    );

  } catch (error) {
    logger.error('Error handling Google Calendar callback:', { error: String(error) });
    return NextResponse.redirect(
      new URL('/profile?error=google_calendar_connection_failed', request.url)
    );
  }
}

/**
 * Sync initial events after connection
 */
async function syncInitialEvents(userId: string, auth: any) {
  const calendar = google.calendar({ version: 'v3', auth });
  
  // Fetch events for the next 30 days
  const timeMin = new Date().toISOString();
  const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 50
  });

  const events = response.data.items || [];
  
  // Store events in Firebase
  const batch = dbAdmin.batch();
  const eventsCollection = dbAdmin.collection('calendarEvents');

  for (const event of events) {
    if (event.id) {
      const eventDoc = eventsCollection.doc(`${userId}_google_${event.id}`);
      batch.set(eventDoc, {
        userId,
        source: 'google',
        externalId: event.id,
        title: event.summary || 'Untitled Event',
        description: event.description || '',
        startDate: event.start?.dateTime || event.start?.date,
        endDate: event.end?.dateTime || event.end?.date,
        location: event.location || '',
        isAllDay: !event.start?.dateTime,
        isVirtual: event.location?.includes('meet.google.com') || 
                   event.conferenceData?.entryPoints?.length > 0,
        attendees: event.attendees?.map(a => ({
          email: a.email,
          displayName: a.displayName,
          responseStatus: a.responseStatus
        })) || [],
        status: event.status,
        htmlLink: event.htmlLink,
        type: categorizeEvent(event),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      }, { merge: true });
    }
  }

  await batch.commit();

  // Update last sync time
  await dbAdmin.collection('userIntegrations').doc(userId).update({
    'external.lastSync.google': FieldValue.serverTimestamp()
  });

  return events.length;
}

/**
 * Categorize event based on title and description
 */
function categorizeEvent(event: any): string {
  const title = (event.summary || '').toLowerCase();
  const description = (event.description || '').toLowerCase();
  const combined = `${title} ${description}`;

  if (combined.includes('class') || combined.includes('lecture') || 
      combined.includes('lab') || combined.includes('tutorial')) {
    return 'class';
  }
  if (combined.includes('study') || combined.includes('homework') || 
      combined.includes('assignment')) {
    return 'study';
  }
  if (combined.includes('meeting') || combined.includes('1:1') || 
      combined.includes('sync')) {
    return 'meeting';
  }
  if (combined.includes('party') || combined.includes('social') || 
      combined.includes('hangout')) {
    return 'social';
  }
  
  return 'personal';
}