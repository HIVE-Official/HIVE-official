import { NextResponse } from 'next/server';

// Maintain backwards compatibility by redirecting to the new profile v2 endpoint
export function GET(request: Request, { params }: { params: { userId: string } }) {
  const userId = (params?.userId || '').toString();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Missing userId', code: 'INVALID_INPUT' }, { status: 400 });
  }

  const url = new URL(request.url);
  url.pathname = '/api/profile/v2';
  url.search = `id=${encodeURIComponent(userId)}`;

  return NextResponse.redirect(url, { status: 307 });
}
