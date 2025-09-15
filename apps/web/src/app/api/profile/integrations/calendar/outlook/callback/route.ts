/**
 * Outlook Calendar OAuth Callback Handler
 * Handles the OAuth callback from Microsoft and stores tokens
 */

import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { Client } from '@microsoft/microsoft-graph-client';

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
 * GET /api/profile/integrations/calendar/outlook/callback
 * Handle OAuth callback from Microsoft
 */
export async function GET(request: NextRequest) {
  // Check if Outlook integration is configured
  if (!msalClient) {
    console.warn('Outlook integration not configured - missing CLIENT_ID or CLIENT_SECRET');
    return NextResponse.redirect(
      new URL('/profile?error=outlook_not_configured', request.url)
    );
  }
  
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Handle errors from Microsoft
    if (error) {
      console.error('Outlook OAuth error:', error, errorDescription);
      return NextResponse.redirect(
        new URL(`/profile?error=outlook_auth_failed&details=${error}`, request.url)
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
      console.error('Invalid state parameter:', err);
      return NextResponse.redirect(
        new URL('/profile?error=invalid_state', request.url)
      );
    }

    const { userId, returnUrl } = stateData;

    // Exchange code for tokens
    const tokenRequest = {
      code,
      scopes: ['calendars.read', 'user.read', 'offline_access'],
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/profile/integrations/calendar/outlook/callback`
    };

    const response = await msalClient.acquireTokenByCode(tokenRequest);
    
    if (!response.accessToken) {
      throw new Error('No access token received from Microsoft');
    }

    // Get user info
    const graphClient = Client.init({
      authProvider: (done: any) => {
        done(null, response.accessToken);
      }
    });

    const userInfo = await graphClient.api('/me').get();

    // Store tokens in Firebase
    const integrationData = {
      calendar: {
        outlook: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken || null,
          expiresAt: response.expiresOn || new Date(Date.now() + 3600 * 1000),
          calendarId: userInfo.mail || userInfo.userPrincipalName,
          email: userInfo.mail || userInfo.userPrincipalName,
          name: userInfo.displayName,
          accountId: response.account?.homeAccountId
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
      await syncInitialEvents(userId, response.accessToken);
    } catch (syncError) {
      console.error('Initial sync failed:', syncError);
      // Don't fail the connection if sync fails
    }

    // Redirect back to profile with success
    return NextResponse.redirect(
      new URL(`${returnUrl || '/profile'}?success=outlook_calendar_connected`, request.url)
    );

  } catch (error) {
    console.error('Error handling Outlook Calendar callback:', error);
    return NextResponse.redirect(
      new URL('/profile?error=outlook_calendar_connection_failed', request.url)
    );
  }
}

/**
 * Sync initial events after connection
 */
async function syncInitialEvents(userId: string, accessToken: string) {
  const graphClient = Client.init({
    authProvider: (done: any) => {
      done(null, accessToken);
    }
  });

  // Fetch events for the next 30 days
  const startDateTime = new Date().toISOString();
  const endDateTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const events = await graphClient
    .api('/me/calendarview')
    .query({
      startDateTime,
      endDateTime,
      $orderby: 'start/dateTime',
      $top: 50
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
      type: categorizeEvent(event),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
  }

  await batch.commit();

  // Update last sync time
  await dbAdmin.collection('userIntegrations').doc(userId).update({
    'external.lastSync.outlook': FieldValue.serverTimestamp()
  });

  return events.value?.length || 0;
}

/**
 * Categorize event based on subject and categories
 */
function categorizeEvent(event: any): string {
  const subject = (event.subject || '').toLowerCase();
  const categories = event.categories || [];
  
  // Check categories first
  for (const category of categories) {
    const cat = category.toLowerCase();
    if (cat.includes('class') || cat.includes('lecture')) return 'class';
    if (cat.includes('study') || cat.includes('homework')) return 'study';
    if (cat.includes('meeting') || cat.includes('work')) return 'meeting';
  }
  
  // Check subject
  if (subject.includes('class') || subject.includes('lecture')) return 'class';
  if (subject.includes('study') || subject.includes('homework')) return 'study';
  if (subject.includes('meeting') || subject.includes('1:1')) return 'meeting';
  
  return 'personal';
}