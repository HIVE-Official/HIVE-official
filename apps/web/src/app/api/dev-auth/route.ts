/**
 * DEVELOPMENT-ONLY Authentication Endpoint
 * Provides secure testing access while maintaining production security
 */

import { NextRequest } from 'next/server';
import { currentEnvironment } from '@/lib/env';
import { NextResponse } from 'next/server';

// Conditionally import dev-auth-helper only in development
let handleDevAuth: any = null;

if (process.env.NODE_ENV !== 'production') {
  const devAuthHelper = require('@/lib/dev-auth-helper');
  handleDevAuth = devAuthHelper.handleDevAuth;
}
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

/**
 * Development authentication endpoint
 * ONLY WORKS IN DEVELOPMENT - BLOCKED IN PRODUCTION
 */
export async function POST(request: NextRequest) {
  // SECURITY: Block completely in production
  if (currentEnvironment !== 'development') {
    return NextResponse.json(ApiResponseHelper.error("Development authentication not available in production", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
  }

  return handleDevAuth(request);
}

/**
 * Get development users list
 */
export async function GET() {
  // SECURITY: Block completely in production  
  if (currentEnvironment !== 'development') {
    return NextResponse.json(ApiResponseHelper.error("Development authentication not available in production", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
  }

  const { getDevUsers } = await import('@/lib/dev-auth-helper');
  
  return NextResponse.json({
    users: getDevUsers(),
    message: 'Development users available for testing'
  });
}