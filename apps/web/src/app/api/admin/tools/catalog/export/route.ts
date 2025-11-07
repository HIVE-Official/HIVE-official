import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

/**
 * CSV export for tool catalog
 * GET /api/admin/tools/catalog/export?status=&ownerId=&q=&limit=
 */
export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const ownerId = searchParams.get('ownerId') || undefined;
    const q = (searchParams.get('q') || '').toLowerCase();
    const limit = Math.min(parseInt(searchParams.get('limit') || '2000'), 5000);

    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = dbAdmin
      .collection('tools')
      .where('campusId', '==', CURRENT_CAMPUS_ID);
    if (status !== 'all') query = query.where('status', '==', status);
    if (ownerId) query = query.where('ownerId', '==', ownerId);

    const snap = await query.orderBy('updatedAt', 'desc').limit(limit).get();
    let rows = snap.docs.map(doc => {
      const t = doc.data() as any;
      return {
        id: doc.id,
        name: t.name,
        status: t.status,
        currentVersion: t.currentVersion,
        ownerId: t.ownerId,
        installCount: t.installCount || 0,
        updatedAt: t.updatedAt?.toDate?.()?.toISOString?.() || (typeof t.updatedAt === 'string' ? t.updatedAt : null),
      };
    });
    if (q) {
      rows = rows.filter(r => (r.name || '').toLowerCase().includes(q) || (r.id || '').toLowerCase().includes(q));
    }

    const header = ['id','name','status','currentVersion','ownerId','installCount','updatedAt'];
    const csv = [
      header.join(','),
      ...rows.map(r => header.map(h => sanitizeCsv(String((r as any)[h] ?? ''))).join(','))
    ].join('\n');

    const filenameParts = [
      'catalog',
      status ? `status-${status}` : null,
      ownerId ? `owner-${ownerId}` : null,
      q ? `q-${q}` : null,
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
    logger.error('Admin tools catalog export error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to export catalog' }, { status: 500 });
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

