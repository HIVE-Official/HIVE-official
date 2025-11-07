import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export const GET = withSecureAuth(async (request: NextRequest, { params }: { params: Promise<{ toolId: string }> }) => {
  try {
    const { toolId } = await params;
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (!toolDoc.exists || toolDoc.data()?.campusId !== CURRENT_CAMPUS_ID) {
      return NextResponse.json({ success: false, error: 'Tool not found' }, { status: 404 });
    }
    const tool = { id: toolDoc.id, ...toolDoc.data() } as any;

    // Deployments
    const deploymentsSnap = await dbAdmin
      .collection('deployedTools')
      .where('toolId', '==', toolId)
      .orderBy('deployedAt', 'desc')
      .limit(50)
      .get();
    const deployments = deploymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Reviews (pending/changes)
    const [pendingSnap, changesSnap] = await Promise.all([
      dbAdmin.collection('publishRequests').where('toolId', '==', toolId).where('status', '==', 'pending').get(),
      dbAdmin.collection('publishRequests').where('toolId', '==', toolId).where('status', '==', 'changes_requested').get(),
    ]);
    const reviews = [...pendingSnap.docs, ...changesSnap.docs].map(d => ({ id: d.id, ...d.data() }));

    // Quality + errors last 30d
    const sinceIso = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const eventsSnap = await dbAdmin
      .collection('analytics_events')
      .where('toolId', '==', toolId)
      .where('timestamp', '>=', sinceIso)
      .orderBy('timestamp', 'desc')
      .limit(200)
      .get();
    const events = eventsSnap.docs.map(d => d.data());

    return NextResponse.json({ success: true, tool, deployments, reviews, events });
  } catch (error) {
    logger.error('Admin tool detail error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to load tool detail' }, { status: 500 });
  }
}, { requireAdmin: true });

