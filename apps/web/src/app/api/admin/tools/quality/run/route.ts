import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';

export const POST = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const body = await request.json();
    const { toolId } = body as { toolId: string };
    if (!toolId) {
      return NextResponse.json({ success: false, error: 'toolId required' }, { status: 400 });
    }

    const now = new Date().toISOString();
    await dbAdmin.collection('analytics_events').add({
      eventType: 'quality_run_requested',
      toolId,
      userId: token?.uid || 'unknown',
      timestamp: now,
    });
    // Real check executor can subscribe to this event and populate results
    return NextResponse.json({ success: true, requestedAt: now });
  } catch (error) {
    logger.error('Admin tools quality run error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to request quality run' }, { status: 500 });
  }
}, { requireAdmin: true, allowedFields: ['toolId'] });
