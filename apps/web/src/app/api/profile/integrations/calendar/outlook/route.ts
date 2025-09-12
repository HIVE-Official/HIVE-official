/**
 * Outlook Calendar OAuth Integration
 * Handles authentication and token exchange for Microsoft Outlook/Office 365
 */

import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { withAuth } from '@/lib/api-auth-middleware';
import { FieldValue } from 'firebase-admin/firestore';
import { Client } from '@microsoft/microsoft-graph-client';
import { ConfidentialClientApplication } from '@azure/msal-node';

// Only initialize MSAL if credentials are available
let msalClient: ConfidentialClientApplication | null = null;

if (process.env.OUTLOOK_CALENDAR_CLIENT_ID && process.env.OUTLOOK_CALENDAR_CLIENT_SECRET) {
  const msalConfig = {
    auth: {
      clientId: process.env.OUTLOOK_CALENDAR_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CALENDAR_CLIENT_SECRET,
      authority: 'https://login.microsoftonline.com/common'
    }
  };
  msalClient = new ConfidentialClientApplication(msalConfig);
}

/**
 * GET /api/profile/integrations/calendar/outlook
 * Initiate Outlook Calendar OAuth flow
 */
export const GET = withAuth(async (request: NextRequest, { userId }) => {
  // Check if Outlook integration is configured
  if (!msalClient) {
    return NextResponse.json(
      { error: 'Outlook integration not configured' },
      { status: 503 }
    );
  }
  
  try {
    // Generate OAuth URL with state parameter for security
    const state = Buffer.from(JSON.stringify({
      userId,
      timestamp: Date.now(),
      returnUrl: request.nextUrl.searchParams.get('returnUrl') || '/profile'
    })).toString('base64');

    const authCodeUrlParameters = {
      scopes: [
        'calendars.read',
        'user.read',
        'offline_access'
      ],
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/profile/integrations/calendar/outlook/callback`,
      state
    };

    const authUrl = await msalClient.getAuthCodeUrl(authCodeUrlParameters);

    return NextResponse.json({
      success: true,
      authUrl
    });
  } catch (error) {
    console.error('Error generating Outlook auth URL:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Outlook Calendar authentication' },
      { status: 500 }
    );
  }
}, { allowDevelopmentBypass: false });

/**
 * POST /api/profile/integrations/calendar/outlook
 * Sync Outlook Calendar events
 */
export const POST = withAuth(async (request: NextRequest, { userId }) => {
  // Check if Outlook integration is configured
  if (!msalClient) {
    return NextResponse.json(
      { error: 'Outlook integration not configured' },
      { status: 503 }
    );
  }
  
  try {
    // Get user's Outlook Calendar integration
    const integrationsDoc = await dbAdmin
      .collection('userIntegrations')
      .doc(userId)
      .get();

    if (!integrationsDoc.exists) {
      return NextResponse.json(
        { error: 'Outlook Calendar not connected' },
        { status: 400 }
      );
    }

    const integrations = integrationsDoc.data();
    const outlookCalendar = integrations?.calendar?.outlook;

    if (!outlookCalendar?.accessToken) {
      return NextResponse.json(
        { error: 'Outlook Calendar not connected' },
        { status: 400 }
      );
    }

    let accessToken = outlookCalendar.accessToken;

    // Check if token needs refresh
    if (outlookCalendar.expiresAt && (outlookCalendar.expiresAt?.toDate ? outlookCalendar.expiresAt.toDate() : new Date(outlookCalendar.expiresAt)) < new Date()) {
      if (!outlookCalendar.refreshToken) {
        return NextResponse.json(
          { error: 'Outlook Calendar token expired. Please reconnect.' },
          { status: 401 }
        );
      }

      // Refresh token
      const tokenRequest = {
        refreshToken: outlookCalendar.refreshToken,
        scopes: ['calendars.read', 'user.read', 'offline_access']
      };

      const response = await msalClient.acquireTokenByRefreshToken(tokenRequest);
      accessToken = response.accessToken;

      // Update stored tokens
      await dbAdmin.collection('userIntegrations').doc(userId).update({
        'calendar.outlook.accessToken': response.accessToken,
        'calendar.outlook.expiresAt': new Date(response.expiresOn!),
        updatedAt: FieldValue.serverTimestamp()
      });
    }

    // Create Graph client
    const graphClient = Client.init({
      authProvider: (done: any) => {
        done(null, accessToken);
      }
    });

    // Fetch calendar events
    const body = await request.json();
    const startDateTime = body.startDate || new Date().toISOString();
    const endDateTime = body.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const events = await graphClient
      .api('/me/calendarview')
      .query({
        startDateTime,
        endDateTime,
        $orderby: 'start/dateTime',
        $top: 100
      })
      .get();

    // Store events in Firebase
    const batch = dbAdmin.batch();
    const eventsCollection = dbAdmin.collection('calendarEvents');

    for (const event of events.value || []) {
      const eventDoc = eventsCollection.doc(`${userId}_outlook_${event.id}`);
      batch.set(eventDoc, {
        userId,
        source: 'outlook',
        externalId: event.id,
        title: event.subject || 'Untitled Event',
        description: event.bodyPreview || '',
        startDate: event.start?.dateTime,
        endDate: event.end?.dateTime,
        location: event.location?.displayName || '',
        isAllDay: event.isAllDay || false,
        isVirtual: event.isOnlineMeeting || false,
        onlineMeetingUrl: event.onlineMeetingUrl || null,
        attendees: event.attendees?.map((a: any) => ({
          email: a.emailAddress?.address,
          displayName: a.emailAddress?.name,
          responseStatus: a.status?.response
        })) || [],
        status: event.isCancelled ? 'cancelled' : 'confirmed',
        importance: event.importance,
        categories: event.categories || [],
        type: categorizeOutlookEvent(event),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      }, { merge: true });
    }

    await batch.commit();

    // Update last sync time
    await dbAdmin.collection('userIntegrations').doc(userId).update({
      'external.lastSync.outlook': FieldValue.serverTimestamp()
    });

    return NextResponse.json({
      success: true,
      syncedEvents: events.value?.length || 0,
      message: `Synced ${events.value?.length || 0} events from Outlook Calendar`
    });

  } catch (error) {
    console.error('Error syncing Outlook Calendar:', error);
    return NextResponse.json(
      { error: 'Failed to sync Outlook Calendar' },
      { status: 500 }
    );
  }
}, { allowDevelopmentBypass: false });

/**
 * DELETE /api/profile/integrations/calendar/outlook
 * Disconnect Outlook Calendar
 */
export const DELETE = withAuth(async (request: NextRequest, { userId }) => {
  try {
    // Remove Outlook Calendar integration
    await dbAdmin.collection('userIntegrations').doc(userId).update({
      'calendar.outlook': FieldValue.delete(),
      'external.lastSync.outlook': FieldValue.delete(),
      updatedAt: FieldValue.serverTimestamp()
    });

    // Delete synced events
    const eventsSnapshot = await dbAdmin
      .collection('calendarEvents')
      .where('userId', '==', userId)
      .where('source', '==', 'outlook')
      .get();

    const batch = dbAdmin.batch();
    eventsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: 'Outlook Calendar disconnected successfully'
    });

  } catch (error) {
    console.error('Error disconnecting Outlook Calendar:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect Outlook Calendar' },
      { status: 500 }
    );
  }
}, { allowDevelopmentBypass: false });

/**
 * Categorize Outlook event based on properties
 */
function categorizeOutlookEvent(event: any): string {
  const subject = (event.subject || '').toLowerCase();
  const categories = event.categories || [];
  
  // Check categories first
  for (const category of categories) {
    const cat = category.toLowerCase();
    if (cat.includes('class') || cat.includes('lecture')) return 'class';
    if (cat.includes('study') || cat.includes('homework')) return 'study';
    if (cat.includes('meeting') || cat.includes('work')) return 'meeting';
    if (cat.includes('personal')) return 'personal';
  }
  
  // Check subject
  if (subject.includes('class') || subject.includes('lecture') || 
      subject.includes('lab') || subject.includes('tutorial')) {
    return 'class';
  }
  if (subject.includes('study') || subject.includes('homework') || 
      subject.includes('assignment') || subject.includes('exam')) {
    return 'study';
  }
  if (subject.includes('meeting') || subject.includes('1:1') || 
      subject.includes('sync') || subject.includes('standup')) {
    return 'meeting';
  }
  
  return 'personal';
}