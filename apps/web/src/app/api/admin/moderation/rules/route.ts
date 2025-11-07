import { NextResponse } from 'next/server';
import { withAdminCampusIsolation } from '@/lib/middleware/withAdminCampusIsolation';

export const GET = withAdminCampusIsolation(async (request) => {

  try {
    // Mock auto-moderation rules
    const rules = [
      {
        id: 'rule-1',
        name: 'Spam Detection',
        enabled: true,
        type: 'ml_based',
        severity: 'high',
        actions: ['auto_remove', 'notify_moderator'],
        matchCount: 234,
        falsePositives: 12
      },
      {
        id: 'rule-2',
        name: 'Profanity Filter',
        enabled: true,
        type: 'keyword',
        severity: 'medium',
        actions: ['flag_for_review'],
        matchCount: 89,
        falsePositives: 3
      },
      {
        id: 'rule-3',
        name: 'Link Spam Prevention',
        enabled: true,
        type: 'pattern',
        severity: 'medium',
        actions: ['require_approval'],
        matchCount: 156,
        falsePositives: 8
      },
      {
        id: 'rule-4',
        name: 'Harassment Detection',
        enabled: true,
        type: 'ml_based',
        severity: 'high',
        actions: ['immediate_suspension', 'escalate_to_admin'],
        matchCount: 45,
        falsePositives: 2
      },
      {
        id: 'rule-5',
        name: 'New User Restrictions',
        enabled: false,
        type: 'behavior',
        severity: 'low',
        actions: ['rate_limit', 'require_email_verification'],
        matchCount: 0,
        falsePositives: 0
      }
    ];

    return NextResponse.json({
      success: true,
      rules
    });
  } catch (error) {
    console.error('Error fetching moderation rules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moderation rules' },
      { status: 500 }
    );
  }
});
