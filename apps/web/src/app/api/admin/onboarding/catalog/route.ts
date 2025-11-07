import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { getCatalog, setCatalog } from '@/server/onboarding-catalog-store';
import { updateCatalogInFirestore } from '@/server/onboarding-catalog-firestore';
import { getSession, validateCSRF } from '@/lib/session';

const CatalogSchema = z.object({
  majors: z.array(z.string()).min(1).max(500).optional(),
  yearRange: z
    .object({ startYear: z.number().int().min(2000), endYear: z.number().int().max(2100) })
    .refine((r) => r.endYear >= r.startYear, 'endYear must be >= startYear')
    .optional(),
  interests: z
    .array(z.object({ id: z.string().min(1), title: z.string().min(1), items: z.array(z.string()).max(200) }))
    .max(50)
    .optional(),
  graduatePrograms: z.array(z.string()).min(1).max(1000).optional(),
});

export const GET = withSecureAuth(async (request: NextRequest) => {
  const campusId = request.nextUrl.searchParams.get('campusId');
  return NextResponse.json({ success: true, data: getCatalog(campusId || undefined) });
}, { requireAdmin: true });

export const PUT = withSecureAuth(async (request: NextRequest) => {
  const campusId = (request.nextUrl.searchParams.get('campusId') || 'default').toLowerCase();
  const csrf = request.headers.get('x-csrf-token');
  const session = await getSession(request);
  if (!session || !session.isAdmin) {
    return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
  }
  if (!validateCSRF(session, csrf)) {
    return NextResponse.json({ success: false, error: 'Invalid CSRF token' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = CatalogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
  }

  // Try Firestore first; fallback to in-memory in dev/testing
  const savedToFs = await updateCatalogInFirestore(campusId, parsed.data);
  const updated = savedToFs ? { ...parsed.data } : setCatalog(campusId || undefined, parsed.data);
  return NextResponse.json({ success: true, data: updated, message: savedToFs ? 'Catalog updated (Firestore)' : 'Catalog updated (in-memory)' });
}, { requireAdmin: true });
