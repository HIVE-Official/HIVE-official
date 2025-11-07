import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

/**
 * CSV export for publish/review requests
 * GET /api/admin/tools/reviews/export?status=&category=&toolId=&limit=
 */
export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const category = searchParams.get('category') || undefined;
    const toolIdFilter = searchParams.get('toolId') || undefined;
    const limit = Math.min(parseInt(searchParams.get('limit') || '2000'), 5000);

    let query = dbAdmin.collection('publishRequests').where('campusId', '==', CURRENT_CAMPUS_ID).where('status', '==', status).orderBy('requestedAt', 'desc');
    if (toolIdFilter) query = (query as any).where('toolId', '==', toolIdFilter);
    const snap = await (query as any).limit(limit).get();

    type Row = {
      id: string;
      status?: string;
      category?: string;
      publishType?: string;
      toolId?: string;
      toolName?: string;
      requesterId?: string;
      requesterEmail?: string;
      requestedAt?: string | null;
    };

    const rows: Row[] = [];
    for (const doc of snap.docs) {
      const data = doc.data() as any;
      if (category && data.category !== category) continue;
      const tId = data.toolId as string | undefined;
      const requestedBy = data.requestedBy as string | undefined;
      let toolName: string | undefined = undefined;
      let requesterEmail: string | undefined = undefined;
      try {
        if (tId) {
          const toolDoc = await dbAdmin.collection('tools').doc(tId).get();
          if (toolDoc.exists) toolName = (toolDoc.data() as any)?.name;
        }
      } catch {}
      try {
        if (requestedBy) {
          const userDoc = await dbAdmin.collection('users').doc(requestedBy).get();
          if (userDoc.exists) requesterEmail = (userDoc.data() as any)?.email;
        }
      } catch {}

      rows.push({
        id: doc.id,
        status: data.status,
        category: data.category,
        publishType: data.publishType,
        toolId: tId,
        toolName,
        requesterId: requestedBy,
        requesterEmail,
        requestedAt: data.requestedAt?.toDate?.()?.toISOString?.() || (typeof data.requestedAt === 'string' ? data.requestedAt : null),
      });
    }

    const header = ['id','status','category','publishType','toolId','toolName','requesterId','requesterEmail','requestedAt'];
    const csv = [
      header.join(','),
      ...rows.map(r => header.map(h => sanitizeCsv(String((r as any)[h] ?? ''))).join(','))
    ].join('\n');

    const filenameParts = [
      'reviews',
      status ? `status-${status}` : null,
      category ? `cat-${category}` : null,
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
    logger.error('Admin tools reviews export error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to export reviews' }, { status: 500 });
  }
}, { requireAdmin: true });

function sanitizeCsv(value: string): string {
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

