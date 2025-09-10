/**
 * Calendar Integration API
 * Handles Google Calendar, Outlook, and other calendar integrations
 */

import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { withAuth } from '@/lib/api-auth-middleware';
import { COLLECTIONS, UserIntegrations } from '@/lib/firebase-collections';
import { FieldValue } from 'firebase-admin/firestore';
import { logger } from '@hive/core';

// OAuth configuration
const OAUTH_CONFIGS = {
  google: {
    clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_APP_URL + '/api/profile/integrations/calendar/callback/google',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token'
  },
  outlook: {
    clientId: process.env.OUTLOOK_CALENDAR_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CALENDAR_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_APP_URL + '/api/profile/integrations/calendar/callback/outlook',
    scope: 'https://graph.microsoft.com/calendars.read',
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
  }
};

/**
 * GET /api/profile/integrations/calendar
 * Get user's calendar integration status
 */
export const GET = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const integrationsDoc = await dbAdmin
      .collection(COLLECTIONS.USER_INTEGRATIONS)
      .doc(userId)
      .get();

    if (!integrationsDoc.exists) {
      return NextResponse.json({
        success: true,
        integrations: {
          google: { connected: false },
          outlook: { connected: false },
          apple: { connected: false }
        },
        lastSync: {}
      });
    }

    const data = integrationsDoc.data()!;
    const calendar = data.calendar || {};

    // Check if tokens are still valid
    const now = new Date();
    const integrationStatus = {
      google: {
        connected: !!(calendar.google?.accessToken),
        expired: calendar.google?.expiresAt && calendar.google.expiresAt.toDate() < now,
        lastSync: data.external?.lastSync?.google?.toDate() || null
      },
      outlook: {
        connected: !!(calendar.outlook?.accessToken),
        expired: calendar.outlook?.expiresAt && calendar.outlook.expiresAt.toDate() < now,
        lastSync: data.external?.lastSync?.outlook?.toDate() || null
      },
      apple: {
        connected: !!(calendar.apple?.syncToken),
        lastSync: data.external?.lastSync?.apple?.toDate() || null
      }
    };

    return NextResponse.json({
      success: true,
      integrations: integrationStatus,
      preferences: data.external?.preferences || {}
    });

  } catch (error) {
    logger.error('Error fetching calendar integrations', { error, userId });
    return NextResponse.json(
      { success: false, error: 'Failed to fetch calendar integrations' },
      { status: 500 }
    );
  }
});

/**
 * POST /api/profile/integrations/calendar
 * Start OAuth flow for calendar integration
 */
export const POST = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { provider } = await request.json();

    if (!provider || !['google', 'outlook'].includes(provider)) {
      return NextResponse.json(
        { success: false, error: 'Invalid provider' },
        { status: 400 }
      );
    }

    const config = OAUTH_CONFIGS[provider as keyof typeof OAUTH_CONFIGS];
    if (!config.clientId) {
      return NextResponse.json(
        { success: false, error: `${provider} integration not configured` },
        { status: 503 }
      );
    }

    // Generate state parameter for security
    const state = Buffer.from(JSON.stringify({ userId, provider })).toString('base64url');

    // Build OAuth URL
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: config.scope,
      access_type: 'offline', // For Google refresh tokens
      prompt: 'consent', // Force consent to get refresh token
      state
    });

    const authUrl = `${config.authUrl}?${(await params).toString()}`;

    return NextResponse.json({
      success: true,
      authUrl,
      provider,
      message: `Redirecting to ${provider} for authorization`
    });

  } catch (error) {
    logger.error('Error starting calendar OAuth', { error, userId });
    return NextResponse.json(
      { success: false, error: 'Failed to start calendar integration' },
      { status: 500 }
    );
  }
});

/**
 * DELETE /api/profile/integrations/calendar
 * Remove calendar integration
 */
export const DELETE = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { provider } = await request.json();

    if (!provider || !['google', 'outlook', 'apple'].includes(provider)) {
      return NextResponse.json(
        { success: false, error: 'Invalid provider' },
        { status: 400 }
      );
    }

    // Remove the integration
    await dbAdmin
      .collection(COLLECTIONS.USER_INTEGRATIONS)
      .doc(userId)
      .update({
        [`calendar.${provider}`]: FieldValue.delete(),
        [`external.lastSync.${provider}`]: FieldValue.delete(),
        [`external.syncErrors.${provider}`]: FieldValue.delete(),
        updatedAt: FieldValue.serverTimestamp()
      });

    // Log activity
    await dbAdmin
      .collection(COLLECTIONS.ACTIVITY_RECORDS)
      .add({
        userId,
        type: 'profile',
        action: 'calendar_integration_removed',
        metadata: { provider },
        isPrivate: true,
        visibleTo: [],
        timestamp: FieldValue.serverTimestamp()
      });

    return NextResponse.json({
      success: true,
      message: `${provider} calendar integration removed successfully`
    });

  } catch (error) {
    logger.error('Error removing calendar integration', { error, userId });
    return NextResponse.json(
      { success: false, error: 'Failed to remove calendar integration' },
      { status: 500 }
    );
  }
});

/**
 * POST /api/profile/integrations/calendar/sync
 * Force sync calendar data
 */
export const PUT = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { provider } = await request.json();

    if (!provider) {
      return NextResponse.json(
        { success: false, error: 'Provider is required' },
        { status: 400 }
      );
    }

    const integrationsDoc = await dbAdmin
      .collection(COLLECTIONS.USER_INTEGRATIONS)
      .doc(userId)
      .get();

    if (!integrationsDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'No integrations found' },
        { status: 404 }
      );
    }

    const data = integrationsDoc.data()!;
    const providerConfig = data.calendar?.[provider];

    if (!providerConfig) {
      return NextResponse.json(
        { success: false, error: `${provider} not connected` },
        { status: 404 }
      );
    }

    // Check if token is expired and refresh if needed
    if (providerConfig.expiresAt && providerConfig.expiresAt.toDate() < new Date()) {
      const refreshResult = await refreshAccessToken(provider, providerConfig.refreshToken);
      
      if (!refreshResult.success) {
        return NextResponse.json(
          { success: false, error: 'Token expired and refresh failed' },
          { status: 401 }
        );
      }

      // Update tokens in database
      await dbAdmin
        .collection(COLLECTIONS.USER_INTEGRATIONS)
        .doc(userId)
        .update({
          [`calendar.${provider}.accessToken`]: refreshResult.accessToken,
          [`calendar.${provider}.expiresAt`]: new Date(Date.now() + refreshResult.expiresIn * 1000),
          updatedAt: FieldValue.serverTimestamp()
        });

      providerConfig.accessToken = refreshResult.accessToken;
    }

    // Sync calendar events
    const syncResult = await syncCalendarEvents(provider, providerConfig, userId);

    // Update sync status
    await dbAdmin
      .collection(COLLECTIONS.USER_INTEGRATIONS)
      .doc(userId)
      .update({
        [`external.lastSync.${provider}`]: FieldValue.serverTimestamp(),
        [`external.syncErrors.${provider}`]: syncResult.error || FieldValue.delete(),
        updatedAt: FieldValue.serverTimestamp()
      });

    return NextResponse.json({
      success: syncResult.success,
      eventsSync: syncResult.eventsCount || 0,
      message: syncResult.success 
        ? `${provider} calendar synced successfully`
        : `Sync failed: ${syncResult.error}`,
      error: syncResult.error
    });

  } catch (error) {
    logger.error('Error syncing calendar', { error, userId });
    return NextResponse.json(
      { success: false, error: 'Failed to sync calendar' },
      { status: 500 }
    );
  }
});

// Helper functions
async function refreshAccessToken(provider: string, refreshToken: string) {
  try {
    const config = OAUTH_CONFIGS[provider as keyof typeof OAUTH_CONFIGS];
    
    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.clientId!,
        client_secret: config.clientSecret!
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      accessToken: data.access_token,
      expiresIn: data.expires_in
    };

  } catch (error) {
    logger.error('Error refreshing access token', { error, provider });
    return { success: false, error: error.message };
  }
}

async function syncCalendarEvents(provider: string, config: any, userId: string) {
  try {
    if (provider === 'google') {
      return await syncGoogleCalendar(config, userId);
    } else if (provider === 'outlook') {
      return await syncOutlookCalendar(config, userId);
    }
    
    return { success: false, error: 'Unsupported provider' };
    
  } catch (error) {
    logger.error('Error syncing calendar events', { error, provider, userId });
    return { success: false, error: error.message };
  }
}

async function syncGoogleCalendar(config: any, userId: string) {
  try {
    // Get events from Google Calendar API
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${new Date().toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime`,
      {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Google Calendar API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Store events in user's calendar data (simplified for demo)
    // In production, you'd have a dedicated calendar events collection
    
    return {
      success: true,
      eventsCount: data.items?.length || 0
    };

  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function syncOutlookCalendar(config: any, userId: string) {
  try {
    // Get events from Microsoft Graph API
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/me/calendar/events?$top=50&$orderby=start/dateTime`,
      {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Outlook Calendar API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      eventsCount: data.value?.length || 0
    };

  } catch (error) {
    return { success: false, error: error.message };
  }
}