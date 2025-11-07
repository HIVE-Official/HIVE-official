/**
 * Search API v2 - Future implementation placeholder
 */

import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const campusId = (new URL(request.url).searchParams.get('campusId') || CURRENT_CAMPUS_ID).toLowerCase();
  return NextResponse.json(
    { error: 'Search API v2 is not yet implemented', campusId },
    { status: 501 }
  );
}
