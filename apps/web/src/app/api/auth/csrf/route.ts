/**
 * CSRF Token Endpoint
 * Returns the CSRF token for the current session
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  const session = await getSession(request);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Return CSRF token in header for admin sessions
  const response = NextResponse.json({ success: true });

  if (session.isAdmin && session.csrf) {
    response.headers.set('X-CSRF-Token', session.csrf);
  }

  return response;
}