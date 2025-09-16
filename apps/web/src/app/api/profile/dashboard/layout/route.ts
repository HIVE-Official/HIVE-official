/**
 * Dashboard Layout Management API
 * Handles customizable grid layouts for Profile PRD
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { COLLECTIONS, DashboardLayout, CardLayout } from '@/lib/firebase/collections/firebase-collections';
import { FieldValue } from 'firebase-admin/firestore';

// Default layout configurations
const DEFAULT_LAYOUTS = {
  mobile: [
    { id: 'avatar', type: 'avatar', position: { x: 0, y: 0 }, size: { width: 1, height: 1 }, visible: true, settings: {} },
    { id: 'calendar', type: 'calendar', position: { x: 0, y: 1 }, size: { width: 1, height: 2 }, visible: true, settings: {} },
    { id: 'spaces', type: 'spaces', position: { x: 0, y: 3 }, size: { width: 1, height: 1 }, visible: true, settings: {} },
    { id: 'tools', type: 'tools', position: { x: 0, y: 4 }, size: { width: 1, height: 2 }, visible: true, settings: {} },
    { id: 'activity', type: 'activity', position: { x: 0, y: 6 }, size: { width: 1, height: 1 }, visible: true, settings: {} },
  ] as CardLayout[],
  
  tablet: [
    { id: 'avatar', type: 'avatar', position: { x: 0, y: 0 }, size: { width: 1, height: 1 }, visible: true, settings: {} },
    { id: 'calendar', type: 'calendar', position: { x: 1, y: 0 }, size: { width: 1, height: 2 }, visible: true, settings: {} },
    { id: 'tools', type: 'tools', position: { x: 0, y: 1 }, size: { width: 1, height: 2 }, visible: true, settings: {} },
    { id: 'spaces', type: 'spaces', position: { x: 0, y: 3 }, size: { width: 2, height: 1 }, visible: true, settings: {} },
    { id: 'activity', type: 'activity', position: { x: 0, y: 4 }, size: { width: 2, height: 1 }, visible: true, settings: {} },
  ] as CardLayout[],
  
  desktop: [
    { id: 'avatar', type: 'avatar', position: { x: 0, y: 0 }, size: { width: 1, height: 1 }, visible: true, settings: {} },
    { id: 'calendar', type: 'calendar', position: { x: 1, y: 0 }, size: { width: 2, height: 2 }, visible: true, settings: {} },
    { id: 'tools', type: 'tools', position: { x: 3, y: 0 }, size: { width: 1, height: 2 }, visible: true, settings: {} },
    { id: 'spaces', type: 'spaces', position: { x: 0, y: 1 }, size: { width: 1, height: 1 }, visible: true, settings: {} },
    { id: 'social', type: 'social', position: { x: 0, y: 2 }, size: { width: 2, height: 1 }, visible: true, settings: {} },
    { id: 'activity', type: 'activity', position: { x: 2, y: 2 }, size: { width: 2, height: 1 }, visible: true, settings: {} },
    { id: 'analytics', type: 'analytics', position: { x: 0, y: 3 }, size: { width: 4, height: 1 }, visible: false, settings: {} },
  ] as CardLayout[]
};

/**
 * GET /api/profile/dashboard/layout
 * Get user's dashboard layout configuration
 */
export const GET = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const layoutDoc = await dbAdmin
      .collection(COLLECTIONS.DASHBOARD_LAYOUTS)
      .doc(userId)
      .get();

    if (!layoutDoc.exists) {
      // Create default layout for new users
      const defaultLayout: DashboardLayout = {
        userId,
        layouts: DEFAULT_LAYOUTS,
        cardVisibility: {
          avatar: true,
          calendar: true,
          tools: true,
          spaces: true,
          activity: true,
          social: true,
          analytics: false,
          privacy: false,
          discovery: false,
          'quick-actions': false
        },
        version: 1,
        quickActions: ['create-tool', 'join-space', 'study-session', 'social-event'],
        defaultView: 'desktop',
        lastModified: FieldValue.serverTimestamp() as any
      };

      await dbAdmin
        .collection(COLLECTIONS.DASHBOARD_LAYOUTS)
        .doc(userId)
        .set(defaultLayout);

      return NextResponse.json({
        success: true,
        layout: defaultLayout
      });
    }

    return NextResponse.json({
      success: true,
      layout: layoutDoc.data()
    });

  } catch (error) {
    logger.error('Error fetching dashboard layout:', { error: String(error) });
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard layout' },
      { status: 500 }
    );
  }
});

/**
 * PUT /api/profile/dashboard/layout
 * Update user's dashboard layout configuration
 */
export const PUT = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const updateData = await request.json();
    const { layouts, cardVisibility, quickActions, defaultView } = updateData;

    // Validate layout data
    if (layouts) {
      const devices = ['mobile', 'tablet', 'desktop'] as const;
      for (const device of devices) {
        if (layouts[device] && Array.isArray(layouts[device])) {
          // Validate each card in the layout
          for (const card of layouts[device]) {
            if (!card.id || !card.type || !card.position || !card.size) {
              return NextResponse.json(
                { success: false, error: `Invalid card configuration for ${device}` },
                { status: 400 }
              );
            }
          }
        }
      }
    }

    const updatePayload: Partial<DashboardLayout> = {
      lastModified: FieldValue.serverTimestamp() as any,
      version: FieldValue.increment(1) as any
    };

    if (layouts) updatePayload.layouts = layouts;
    if (cardVisibility) updatePayload.cardVisibility = cardVisibility;
    if (quickActions) updatePayload.quickActions = quickActions;
    if (defaultView) updatePayload.defaultView = defaultView;

    await dbAdmin
      .collection(COLLECTIONS.DASHBOARD_LAYOUTS)
      .doc(userId)
      .update(updatePayload);

    // Get updated layout
    const updatedDoc = await dbAdmin
      .collection(COLLECTIONS.DASHBOARD_LAYOUTS)
      .doc(userId)
      .get();

    return NextResponse.json({
      success: true,
      layout: updatedDoc.data(),
      message: 'Dashboard layout updated successfully'
    });

  } catch (error) {
    logger.error('Error updating dashboard layout:', { error: String(error) });
    return NextResponse.json(
      { success: false, error: 'Failed to update dashboard layout' },
      { status: 500 }
    );
  }
});

/**
 * POST /api/profile/dashboard/layout/reset
 * Reset dashboard layout to defaults
 */
export const POST = withAuth(async (request: NextRequest, { userId }) => {
  try {
    const { device } = await request.json();

    const resetLayout: DashboardLayout = {
      userId,
      layouts: device ? { 
        ...DEFAULT_LAYOUTS, 
        [device]: DEFAULT_LAYOUTS[device as keyof typeof DEFAULT_LAYOUTS] 
      } : DEFAULT_LAYOUTS,
      cardVisibility: {
        avatar: true,
        calendar: true,
        tools: true,
        spaces: true,
        activity: true,
        social: true,
        analytics: false,
        privacy: false,
        discovery: false,
        'quick-actions': false
      },
      version: 1,
      quickActions: ['create-tool', 'join-space', 'study-session', 'social-event'],
      defaultView: 'desktop',
      lastModified: FieldValue.serverTimestamp() as any
    };

    await dbAdmin
      .collection(COLLECTIONS.DASHBOARD_LAYOUTS)
      .doc(userId)
      .set(resetLayout);

    return NextResponse.json({
      success: true,
      layout: resetLayout,
      message: device ? `${device} layout reset to default` : 'All layouts reset to default'
    });

  } catch (error) {
    logger.error('Error resetting dashboard layout:', { error: String(error) });
    return NextResponse.json(
      { success: false, error: 'Failed to reset dashboard layout' },
      { status: 500 }
    );
  }
});