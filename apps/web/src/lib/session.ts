/**
 * Secure Session Management with JWT
 * Prevents session forgery and ensures data integrity
 */

import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';
import type { NextRequest, NextResponse } from 'next/server';

// Session configuration
const rawSecret = process.env.SESSION_SECRET;
if (!rawSecret && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ SESSION_SECRET not configured - using fallback (not secure for production)');
  console.warn('Add SESSION_SECRET to Vercel: Settings → Environment Variables');
}
const SESSION_SECRET = rawSecret || 'hive-session-secret-2025-buffalo'; // Fallback for dev/build
const SESSION_COOKIE_NAME = 'hive_session';
const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds (PRD requirement)
const ADMIN_SESSION_MAX_AGE = 4 * 60 * 60; // 4 hours for admin sessions

// Convert secret to key
const secret = new TextEncoder().encode(SESSION_SECRET);

export interface SessionData {
  userId: string;
  email: string;
  campusId: string;
  isAdmin?: boolean;
  verifiedAt: string;
  sessionId: string;
  csrf?: string; // CSRF token for admin sessions
}

/**
 * Create a signed JWT session token
 */
export async function createSession(data: Omit<SessionData, 'sessionId' | 'verifiedAt'>): Promise<string> {
  const sessionData: SessionData = {
    ...data,
    sessionId: nanoid(),
    verifiedAt: new Date().toISOString(),
    csrf: data.isAdmin ? nanoid() : undefined, // Add CSRF token for admins
  };

  const token = await new SignJWT(sessionData as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(data.isAdmin ? ADMIN_SESSION_MAX_AGE + 's' : SESSION_MAX_AGE + 's')
    .sign(secret);

  return token;
}

/**
 * Verify and decode a JWT session token
 */
export async function verifySession(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionData;
  } catch (error) {
    console.error('[SESSION] Invalid session token:', error);
    return null;
  }
}

/**
 * Get session from request cookies
 */
export async function getSession(request: NextRequest): Promise<SessionData | null> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  if (!sessionCookie?.value) {
    return null;
  }

  return verifySession(sessionCookie.value);
}

/**
 * Set session cookie with secure options
 */
export function setSessionCookie(
  response: NextResponse,
  token: string,
  options?: { isAdmin?: boolean }
): NextResponse {
  const maxAge = options?.isAdmin ? ADMIN_SESSION_MAX_AGE : SESSION_MAX_AGE;

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax', // CSRF protection
    maxAge,
    path: '/',
  });

  return response;
}

/**
 * Clear session cookie
 */
export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}

/**
 * Validate CSRF token for admin requests
 */
export function validateCSRF(session: SessionData, csrfToken: string | null): boolean {
  if (!session.isAdmin) {
    return true; // Non-admin sessions don't need CSRF
  }

  if (!csrfToken || !session.csrf) {
    return false;
  }

  return session.csrf === csrfToken;
}

/**
 * Generate CSRF token meta tag for client
 */
export function generateCSRFMeta(session: SessionData): string | null {
  if (!session.isAdmin || !session.csrf) {
    return null;
  }

  return `<meta name="csrf-token" content="${session.csrf}" />`;
}
