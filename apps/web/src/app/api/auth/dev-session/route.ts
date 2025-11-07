/**
 * Development Session API Route
 * Creates a test session for local development without Firebase
 */

import { NextRequest, NextResponse } from 'next/server';
import { currentEnvironment } from '@/lib/env';

// Conditionally import dev-auth-helper only in development
let createDevSession: ((email: string, request: NextRequest) => Promise<{ success: boolean; user?: unknown; tokens?: { accessToken: string }; error?: string }>) | null = null;

if (process.env.NODE_ENV !== 'production') {
  const devAuthHelper = require('@/lib/dev-auth-helper');
  createDevSession = devAuthHelper.createDevSession;
}

export async function POST(request: NextRequest) {
  // Only allow in development
  if (currentEnvironment !== 'development') {
    return NextResponse.json(
      { error: 'Development authentication not available' },
      { status: 403 }
    );
  }

  try {
    // Use a default test user for quick testing
    const email = 'student@test.edu';
    if (!createDevSession) {
      return NextResponse.json(
        { error: 'Development session helper unavailable' },
        { status: 503 }
      );
    }
    const result = await createDevSession(email, request);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Create response with session
    const response = NextResponse.json({
      success: true,
      user: result.user,
      message: 'Development session created',
      redirectUrl: '/onboarding'
    });

    // Set session cookie
    if (result.tokens) {
      response.cookies.set('session-token', result.tokens.accessToken, {
        httpOnly: true,
        secure: false, // Allow in development
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      response.cookies.set('dev-mode', 'true', {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      });
    }

    return response;
  } catch (error) {
    console.error('Dev session error:', error);
    return NextResponse.json(
      { error: 'Failed to create development session' },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (currentEnvironment !== 'development') {
    return NextResponse.json(
      { error: 'Development authentication not available' },
      { status: 403 }
    );
  }

  // Return available test users
  return NextResponse.json({
    message: 'Development session endpoint',
    testUsers: [
      'student@test.edu',
      'faculty@test.edu',
      'admin@test.edu',
      'jacob@test.edu'
    ],
    usage: 'POST to this endpoint to create a test session'
  });
}
