import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export const POST = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const body = await request.json();
    const { deploymentId, action } = body as { deploymentId: string; action: 'pause'|'resume'|'disable'|'enable' };
    if (!deploymentId || !action) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }

    const docRef = dbAdmin.collection('deployedTools').doc(deploymentId);
    const doc = await docRef.get();
    if (!doc.exists || doc.data()?.campusId !== CURRENT_CAMPUS_ID) {
      return NextResponse.json({ success: false, error: 'Deployment not found' }, { status: 404 });
    }
    const now = new Date().toISOString();
    const updatedBy = token?.uid || 'unknown';
    let status: 'active'|'paused'|'disabled' = 'active';
    switch (action) {
      case 'pause': status = 'paused'; break;
      case 'resume': status = 'active'; break;
      case 'disable': status = 'disabled'; break;
      case 'enable': status = 'active'; break;
    }

    await docRef.update({ status, updatedAt: now, updatedBy });

    await dbAdmin.collection('analytics_events').add({
      eventType: 'deployment_state_change',
      deploymentId,
      status,
      userId: updatedBy,
      timestamp: now,
    });

    return NextResponse.json({ success: true, status });
  } catch (error) {
    logger.error('Admin deployments action error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to update deployment' }, { status: 500 });
  }
}, { requireAdmin: true, allowedFields: ['deploymentId','action'] });
