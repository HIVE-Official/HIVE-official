import { NextResponse } from 'next/server';
import { withAuthAndErrors } from '@/lib/api-wrapper';
import { requireAdminRole } from '@/lib/admin-auth';

export const GET = withAuthAndErrors(async (context) => {
  const { request, auth } = context;
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await requireAdminRole(auth.userId);

  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '7d';

  try {
    // Mock space analytics data
    const spaces = [
      {
        id: 'space-cs-hub',
        name: 'Computer Science Hub',
        type: 'academic',
        metrics: {
          members: 456,
          posts: 234,
          engagement: 892,
          growth: 23,
          health: 'healthy' as const
        },
        topContributors: [
          { id: 'user-1', name: 'Jacob Lee', posts: 45 },
          { id: 'user-2', name: 'Sarah Chen', posts: 38 },
          { id: 'user-3', name: 'Mike Johnson', posts: 29 }
        ],
        recentActivity: [
          { date: '2024-01-20', posts: 12, engagement: 89 },
          { date: '2024-01-21', posts: 15, engagement: 112 },
          { date: '2024-01-22', posts: 18, engagement: 134 },
          { date: '2024-01-23', posts: 22, engagement: 167 },
          { date: '2024-01-24', posts: 19, engagement: 145 },
          { date: '2024-01-25', posts: 24, engagement: 189 },
          { date: '2024-01-26', posts: 21, engagement: 156 }
        ]
      },
      {
        id: 'space-eng',
        name: 'UB Engineering',
        type: 'academic',
        metrics: {
          members: 389,
          posts: 189,
          engagement: 756,
          growth: 15,
          health: 'growing' as const
        },
        topContributors: [
          { id: 'user-4', name: 'Emily Wang', posts: 34 },
          { id: 'user-5', name: 'David Kim', posts: 28 },
          { id: 'user-6', name: 'Lisa Zhang', posts: 23 }
        ],
        recentActivity: [
          { date: '2024-01-20', posts: 10, engagement: 67 },
          { date: '2024-01-21', posts: 12, engagement: 89 },
          { date: '2024-01-22', posts: 14, engagement: 98 },
          { date: '2024-01-23', posts: 16, engagement: 112 },
          { date: '2024-01-24', posts: 15, engagement: 105 },
          { date: '2024-01-25', posts: 18, engagement: 134 },
          { date: '2024-01-26', posts: 17, engagement: 123 }
        ]
      },
      {
        id: 'space-events',
        name: 'Campus Events',
        type: 'social',
        metrics: {
          members: 678,
          posts: 145,
          engagement: 567,
          growth: 45,
          health: 'growing' as const
        },
        topContributors: [
          { id: 'user-7', name: 'Alex Martinez', posts: 28 },
          { id: 'user-8', name: 'Rachel Green', posts: 24 },
          { id: 'user-9', name: 'Tom Wilson', posts: 19 }
        ],
        recentActivity: [
          { date: '2024-01-20', posts: 8, engagement: 56 },
          { date: '2024-01-21', posts: 11, engagement: 78 },
          { date: '2024-01-22', posts: 13, engagement: 89 },
          { date: '2024-01-23', posts: 15, engagement: 98 },
          { date: '2024-01-24', posts: 14, engagement: 92 },
          { date: '2024-01-25', posts: 17, engagement: 112 },
          { date: '2024-01-26', posts: 16, engagement: 105 }
        ]
      },
      {
        id: 'space-study',
        name: 'Study Groups',
        type: 'academic',
        metrics: {
          members: 234,
          posts: 89,
          engagement: 345,
          growth: -5,
          health: 'stable' as const
        },
        topContributors: [
          { id: 'user-10', name: 'Nina Patel', posts: 18 },
          { id: 'user-11', name: 'James Liu', posts: 15 },
          { id: 'user-12', name: 'Maria Garcia', posts: 12 }
        ],
        recentActivity: [
          { date: '2024-01-20', posts: 6, engagement: 34 },
          { date: '2024-01-21', posts: 7, engagement: 45 },
          { date: '2024-01-22', posts: 8, engagement: 52 },
          { date: '2024-01-23', posts: 7, engagement: 48 },
          { date: '2024-01-24', posts: 9, engagement: 56 },
          { date: '2024-01-25', posts: 8, engagement: 51 },
          { date: '2024-01-26', posts: 7, engagement: 47 }
        ]
      },
      {
        id: 'space-dorm',
        name: 'Ellicott Complex',
        type: 'dorm',
        metrics: {
          members: 156,
          posts: 45,
          engagement: 189,
          growth: -12,
          health: 'declining' as const
        },
        topContributors: [
          { id: 'user-13', name: 'Chris Brown', posts: 8 },
          { id: 'user-14', name: 'Ashley Davis', posts: 7 },
          { id: 'user-15', name: 'Kevin Park', posts: 6 }
        ],
        recentActivity: [
          { date: '2024-01-20', posts: 4, engagement: 23 },
          { date: '2024-01-21', posts: 3, engagement: 19 },
          { date: '2024-01-22', posts: 5, engagement: 28 },
          { date: '2024-01-23', posts: 4, engagement: 25 },
          { date: '2024-01-24', posts: 3, engagement: 21 },
          { date: '2024-01-25', posts: 4, engagement: 24 },
          { date: '2024-01-26', posts: 2, engagement: 15 }
        ]
      }
    ];

    return NextResponse.json({
      success: true,
      spaces
    });
  } catch (error) {
    console.error('Error fetching space analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch space analytics' },
      { status: 500 }
    );
  }
});