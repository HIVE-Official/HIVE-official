import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { withAuthAndErrors } from '@/lib/api-wrapper';
import { requireAdminRole } from '@/lib/admin-auth';
import { getPendingReports, moderateContent } from '@/lib/admin-moderation-actions';

export const GET = withAuthAndErrors(async (context) => {
  const { request, auth } = context;
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await requireAdminRole(auth.userId);

  try {
    // Try to get real reports first
    const reports = await getPendingReports(50);

    // If no real reports, use mock data for testing
    const mockReports = reports.length === 0 ? [
      {
        id: 'report-1',
        type: 'post',
        contentId: 'post-123',
        contentPreview: 'This post contains potentially offensive language that violates community guidelines...',
        reportedBy: {
          id: 'user-456',
          name: 'Sarah Chen',
          handle: 'sarahc',
          avatarUrl: null
        },
        reportedUser: {
          id: 'user-789',
          name: 'Anonymous User',
          handle: 'anon123',
          avatarUrl: null,
          previousViolations: 2
        },
        reason: 'harassment',
        description: 'User is using aggressive language towards other members',
        status: 'pending',
        priority: 'high',
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: 'report-2',
        type: 'comment',
        contentId: 'comment-456',
        contentPreview: 'Check out this totally legit website for free stuff...',
        reportedBy: {
          id: 'user-101',
          name: 'Mike Johnson',
          handle: 'mikej',
          avatarUrl: null
        },
        reportedUser: {
          id: 'user-202',
          name: 'Spam Bot',
          handle: 'definitely_not_spam',
          avatarUrl: null,
          previousViolations: 0
        },
        reason: 'spam',
        description: 'Obvious spam with suspicious links',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: 'report-3',
        type: 'profile',
        contentId: 'profile-303',
        contentPreview: 'Inappropriate profile content',
        reportedBy: {
          id: 'user-404',
          name: 'Campus Safety',
          handle: 'safety_team',
          avatarUrl: null
        },
        reportedUser: {
          id: 'user-505',
          name: 'Problem User',
          handle: 'troublemaker',
          avatarUrl: null,
          previousViolations: 5
        },
        reason: 'inappropriate',
        description: 'Profile contains inappropriate images',
        status: 'escalated',
        priority: 'critical',
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      }
    ] : [];

    return NextResponse.json({
      success: true,
      reports: reports.length > 0 ? reports : mockReports,
      mock: reports.length === 0
    });
  } catch (error) {
    console.error('Error fetching moderation reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
});

// Handle moderation actions
export const POST = withAuthAndErrors(async (context) => {
  const { request, auth } = context;
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await requireAdminRole(auth.userId);

  try {
    const { reportId, action, notes } = await request.json();

    if (!reportId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Skip actual moderation for mock reports
    if (reportId.startsWith('report-')) {
      return NextResponse.json({
        success: true,
        mock: true,
        message: 'Mock report action completed'
      });
    }

    // Perform real moderation action
    const result = await moderateContent(
      auth.userId,
      reportId,
      action as any,
      notes
    );

    return NextResponse.json({
      ...result,
      success: true
    });
  } catch (error) {
    console.error('Moderation action failed:', error);
    return NextResponse.json(
      { error: 'Failed to perform moderation action' },
      { status: 500 }
    );
  }
});