import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logAdminActivity, AdminUser } from './admin-auth';

/**
 * Middleware to protect admin routes
 */
export async function withAdminAuth(
  _request: NextRequest,
  handler: (_request: NextRequest, _admin: AdminUser) => Promise<NextResponse>
) {
  const authResult = await requireAdmin(_request);
  
  if (!authResult.success) {
    return NextResponse.json(
      { error: authResult.error || 'Unauthorized' },
      { status: authResult.status || 401 }
    );
  }

  // Log admin activity
  const clientIP = (_request as any).ip || _request.headers.get('x-forwarded-for') || 'unknown';
  await logAdminActivity(
    authResult.admin!.id,
    `${_request.method} ${_request.nextUrl.pathname}`,
    {
      userAgent: _request.headers.get('user-agent'),
      url: _request.url,
    },
    clientIP as string
  );

  return handler(_request, authResult.admin!);
}

/**
 * Rate limiting for admin endpoints
 */
const adminRateLimits = new Map<string, { count: number; resetTime: number }>();

export function checkAdminRateLimit(adminId: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const userLimit = adminRateLimits.get(adminId);

  if (!userLimit || now > userLimit.resetTime) {
    adminRateLimits.set(adminId, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count++;
  return true;
}

/**
 * Admin API response wrapper
 */
export function adminResponse(data: unknown, status: number = 200) {
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    data,
  }, { status });
}

/**
 * Admin API error response wrapper
 */
export function adminErrorResponse(error: string, status: number = 500, details?: unknown) {
  console.error(`Admin API Error: ${error}`, details);
  return NextResponse.json({
    success: false,
    error,
    timestamp: new Date().toISOString(),
    details: process.env.NODE_ENV === 'development' ? details : undefined,
  }, { status });
}