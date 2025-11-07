import { NextRequest } from 'next/server';
import { withErrors, respond } from '@/lib/middleware';
import { getCatalog } from '@/server/onboarding-catalog-store';
import { fetchCatalogFromFirestore } from '@/server/onboarding-catalog-firestore';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export const GET = withErrors(async (request: NextRequest, _ctx, respondFmt) => {
  // Default to current campus when not specified
  const campusId = (request.nextUrl.searchParams.get('campusId') || CURRENT_CAMPUS_ID).toLowerCase();
  const fs = await fetchCatalogFromFirestore(campusId);
  if (fs) return respondFmt.success(fs);
  // Fallback to in-memory defaults if Firestore not configured or no doc
  const fallback = getCatalog(campusId || undefined);
  return respondFmt.success(fallback);
});
