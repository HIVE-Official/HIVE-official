import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

/**
 * CSV export for tool deployments
 * GET /api/admin/tools/deployments/export?status=&deployedTo=&toolId=&limit=
 */
export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const deployedTo = searchParams.get('deployedTo') || undefined; // profile|space
    const toolIdFilter = searchParams.get('toolId') || undefined;
    const limit = Math.min(parseInt(searchParams.get('limit') || '2000'), 5000);

    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = dbAdmin
      .collection('deployedTools')
      .where('campusId', '==', CURRENT_CAMPUS_ID);
    if (status) query = query.where('status', '==', status);
    if (deployedTo) query = query.where('deployedTo', '==', deployedTo);
    if (toolIdFilter) query = query.where('toolId', '==', toolIdFilter);
    const snap = await query.orderBy('deployedAt', 'desc').limit(limit).get();

    type Row = {
      id: string;
      toolId?: string;
      toolName?: string;
      status?: string;
      deployedTo?: string;
      targetId?: string;
      surface?: string;
      deployedAt?: string | null;
    };

    const rows: Row[] = [];
    for (const doc of snap.docs) {
      const d = doc.data() as any;
      const tId = d.toolId as string | undefined;
      let toolName: string | undefined = undefined;
      try {
        if (tId) {
          const toolDoc = await dbAdmin.collection('tools').doc(tId).get();
          if (toolDoc.exists) {
            const t = toolDoc.data() as any;
            toolName = t?.name;
          }
        }
      } catch {}

      rows.push({
        id: doc.id,
        toolId: tId,
        toolName,
        status: d.status,
        deployedTo: d.deployedTo,
        targetId: d.targetId,
        surface: d.surface,
        deployedAt: d.deployedAt?.toDate?.()?.toISOString?.() || (typeof d.deployedAt === 'string' ? d.deployedAt : null),
      });
    }

    const header = ['id','toolId','toolName','status','deployedTo','targetId','surface','deployedAt'];
    const csv = [
      header.join(','),
      ...rows.map(r => header.map(h => sanitizeCsv(String((r as any)[h] ?? ''))).join(','))
    ].join('\n');

    const filenameParts = [
      'deployments',
      status ? `status-${status}` : null,
      deployedTo ? `to-${deployedTo}` : null,
      toolIdFilter ? `tool-${toolIdFilter}` : null,
      `rows-${rows.length}`
    ].filter(Boolean).join('_');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="hivelab_${filenameParts}.csv"`,
        ...securityHeaders()
      },
    });
  } catch (error) {
    logger.error('Admin tools deployments export error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to export deployments' }, { status: 500 });
  }
}, { requireAdmin: true });

function sanitizeCsv(value: string): string {
  // Escape quotes and wrap in quotes if contains comma or newline
  const needsWrap = /[",\n]/.test(value);
  const safe = value.replace(/"/g, '""');
  return needsWrap ? `"${safe}"` : safe;
}

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  } as Record<string, string>;
}

