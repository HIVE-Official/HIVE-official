/**
 * DEVELOPMENT-ONLY Authentication Endpoint
 * Provides secure testing access while maintaining production security
 */

import { NextRequest } from 'next/server';
import { handleDevAuth } from '@/lib/dev-auth-helper';
import { currentEnvironment } from '@/lib/env';
import { NextResponse } from 'next/server';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

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