/**
 * Google Calendar OAuth Integration
 * Handles authentication and token exchange for Google Calendar
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@hive/core/utils/logger';

import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { FieldValue } from 'firebase-admin/firestore';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CALENDAR_CLIENT_ID,
  process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/profile/integrations/calendar/google/callback`
);

/**
 * GET /api/profile/integrations/calendar/google
 * Initiate Google Calendar OAuth flow
 */
export const GET = withAuth(async (request: NextRequest, { userId }) => {
  try {
    // Generate OAuth URL with state parameter for security
    const state = Buffer.from(JSON.stringify({
      userId,
      timestamp: Date.now(),
      returnUrl: request.nextUrl.searchParams.get('returnUrl') || '/profile'
    })).toString('base64');

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar.events.readonly'
      ],
      prompt: 'consent',
      state
    });

    return NextResponse.json({
      success: true,
      authUrl
    });
  } catch (error) {
    logger.error('Error generating Google auth URL:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Google Calendar authentication' },
      { status: 500 }
    );
  }
}, { allowDevelopmentBypass: false });

/**
 * POST /api/profile/integrations/calendar/google
 * Sync Google Calendar events
 */
export const POST = withAuth(async (request: NextRequest, { userId }) => {
  try {
    // Get user's Google Calendar integration
    const integrationsDoc = await dbAdmin
      .collection('userIntegrations')
      .doc(userId)
      .get();

    if (!integrationsDoc.exists) {
      return NextResponse.json(
        { error: 'Google Calendar not connected' },
        { status: 400 }
      );
    }

    const integrations = integrationsDoc.data();
    const googleCalendar = integrations?.calendar?.google;

    if (!googleCalendar?.accessToken) {
      return NextResponse.json(
        { error: 'Google Calendar not connected' },
        { status: 400 }
      );
    }

    // Check if token needs refresh
    if (googleCalendar.expiresAt && (googleCalendar.expiresAt?.toDate ? googleCalendar.expiresAt.toDate() : new Date(googleCalendar.expiresAt)) < new Date()) {
      if (!googleCalendar.refreshToken) {
        return NextResponse.json(
          { error: 'Google Calendar token expired. Please reconnect.' },
          { status: 401 }
        );
      }

      // Refresh token
      oauth2Client.setCredentials({
        refresh_token: googleCalendar.refreshToken
      });

      const { credentials } = await oauth2Client.refreshAccessToken();
      
      // Update stored tokens
      await dbAdmin.collection('userIntegrations').doc(userId).update({
        'calendar.google.accessToken': credentials.access_token,
        'calendar.google.expiresAt': FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });

      oauth2Client.setCredentials(credentials);
    } else {
      oauth2Client.setCredentials({
        access_token: googleCalendar.accessToken,
        refresh_token: googleCalendar.refreshToken
      });
    }

    // Fetch calendar events
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    const body = await request.json();
    const timeMin = body.startDate || new Date().toISOString();
    const timeMax = body.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 100
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
          attendees: event.attendees?.map(a => ({
            email: a.email,
            displayName: a.displayName,
            responseStatus: a.responseStatus
          })) || [],
          status: event.status,
          htmlLink: event.htmlLink,
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

    return NextResponse.json({
      success: true,
      syncedEvents: events.length,
      message: `Synced ${events.length} events from Google Calendar`
    });

  } catch (error) {
    logger.error('Error syncing Google Calendar:', error);
    return NextResponse.json(
      { error: 'Failed to sync Google Calendar' },
      { status: 500 }
    );
  }
}, { allowDevelopmentBypass: false });

/**
 * DELETE /api/profile/integrations/calendar/google
 * Disconnect Google Calendar
 */
export const DELETE = withAuth(async (request: NextRequest, { userId }) => {
  try {
    // Remove Google Calendar integration
    await dbAdmin.collection('userIntegrations').doc(userId).update({
      'calendar.google': FieldValue.delete(),
      'external.lastSync.google': FieldValue.delete(),
      updatedAt: FieldValue.serverTimestamp()
    });

    // Delete synced events
    const eventsSnapshot = await dbAdmin
      .collection('calendarEvents')
      .where('userId', '==', userId)
      .where('source', '==', 'google')
      .get();

    const batch = dbAdmin.batch();
    eventsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: 'Google Calendar disconnected successfully'
    });

  } catch (error) {
    logger.error('Error disconnecting Google Calendar:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect Google Calendar' },
      { status: 500 }
    );
  }
}, { allowDevelopmentBypass: false });