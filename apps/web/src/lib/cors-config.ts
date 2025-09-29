/**
 * CORS Configuration for Admin Subdomain
 * Handles cross-origin requests between hive.college and admin.hive.college
 */

import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://hive.college',
  'https://www.hive.college',
  'https://admin.hive.college',
  'http://localhost:3000', // Development
  'http://localhost:3001', // Admin development
];

export function corsHeaders(origin: string | null) {
  // Check if origin is allowed
  const isAllowed = origin && ALLOWED_ORIGINS.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://hive.college',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}

export function handleCors(request: NextRequest): NextResponse | null {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin');
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders(origin),
    });
  }

  return null;
}

/**
 * Add CORS headers to response
 */
export function addCorsHeaders(response: NextResponse, request: NextRequest): NextResponse {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * Check if request is from admin subdomain
 */
export function isAdminSubdomain(request: NextRequest): boolean {
  const host = request.headers.get('host') || '';
  return host.startsWith('admin.');
}

/**
 * Check if request is cross-origin from admin
 */
export function isAdminCrossOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  if (!origin || !host) return false;

  // Check if origin is admin subdomain but host is main domain
  return origin.includes('admin.hive.college') && !host.startsWith('admin.');
}