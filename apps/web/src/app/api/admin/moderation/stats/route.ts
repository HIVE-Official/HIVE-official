import { NextResponse } from 'next/server';
import { withAuthAndErrors } from '@/lib/api-wrapper';
import { requireAdminRole } from '@/lib/admin-auth';

export const GET = withAuthAndErrors(async (context) => {
  const { request, auth } = context;
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await requireAdminRole(auth.userId);

  try {
    // Mock moderation statistics
    const stats = {
      pending: 12,
      reviewing: 3,
      resolvedToday: 28,
      avgResponseTime: 15, // minutes
      falsePositiveRate: 8, // percentage
      topReportReasons: [
        { reason: 'spam', count: 45 },
        { reason: 'harassment', count: 23 },
        { reason: 'inappropriate', count: 18 },
        { reason: 'misinformation', count: 12 },
        { reason: 'other', count: 8 }
      ],
      recentTrends: [
        { hour: '12pm', reports: 5 },
        { hour: '1pm', reports: 8 },
        { hour: '2pm', reports: 12 },
        { hour: '3pm', reports: 7 },
        { hour: '4pm', reports: 3 }
      ]
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching moderation stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moderation stats' },
      { status: 500 }
    );
  }
});