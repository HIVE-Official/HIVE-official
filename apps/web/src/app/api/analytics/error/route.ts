import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { _logger } from '@hive/core';
import { ErrorMetadataSchema } from '@hive/analytics';
import { rateLimit } from '@/lib/rate-limit';
import { RateLimiter } from "limiter";

// Define error metadata schema directly here
const ErrorMetadataSchema = z.object({
  type: z.enum([
    'react_error_boundary',
    'api_error',
    'network_error',
    'validation_error',
    'auth_error',
    'firebase_error',
    'unknown'
  ]),
  componentStack: z.string().optional(),
  location: z.string().optional(),
  timestamp: z.string().datetime(),
  userId: z.string().optional(),
  sessionId: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  extra: z.record(z.unknown()).optional()
});

// Extended error payload schema
const ErrorPayloadSchema = z.object({
  name: z.string(),
  message: z.string(),
  stack: z.string().optional(),
  metadata: ErrorMetadataSchema
});

// Rate limiter for error reporting
const _errorRateLimit = rateLimit({
  uniqueTokenPerInterval: 500, // Max unique errors per interval
  interval: 60 * 1000, // 1 minute
});

// Simple rate limiting using Map
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // 100 requests per minute

function _checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = ip;
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false;
  }

  current.count++;
  return true;
}

// Common React error patterns during screenshot generation
const SCREENSHOT_IGNORABLE_ERRORS = [
  {
    type: 'network',
    pattern: /failed to fetch/i,
    description: 'Network fetch failure during screenshot'
  },
  {
    type: 'react',
    pattern: /React\.Children\.only/i,
    description: 'React children validation during screenshot'
  },
  {
    type: 'react',
    pattern: /Cannot read properties of null/i,
    description: 'Null property access during screenshot'
  },
  {
    type: 'hydration',
    pattern: /hydration/i,
    description: 'Hydration mismatch during screenshot'
  }
];

function categorizeError(_error: unknown): { type: string; description: string } | null {
  const errorMessage = _error?.message || _error?.toString() || '';
  
  for (const pattern of SCREENSHOT_IGNORABLE_ERRORS) {
    if (pattern.pattern.test(errorMessage)) {
      return pattern;
    }
  }
  
  return null;
}

function _shouldIgnoreError(_error: unknown, userAgent: string | null): boolean {
  // Only apply special handling for Vercel screenshot bot
  if (userAgent?.toLowerCase().includes('vercel-screenshot')) {
    const errorCategory = categorizeError(_error);
    
    // If it's a known screenshot-related error, ignore it
    if (errorCategory) {
      return true;
    }
    
    // For screenshot bot, we might want to be more lenient with other errors
    // but still log them for monitoring
    return false;
  }
  
  // For regular users, don't ignore any errors
  return false;
}

// Rate limit: 100 error reports per 15 minutes per IP
const errorReportLimiter = new Map<string, RateLimiter>();

function getIPAddress(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // Fallback to connection remote address (won't work in Vercel)
  return "unknown";
}

function getRateLimiter(ip: string): RateLimiter {
  if (!errorReportLimiter.has(ip)) {
    // 100 tokens, refill 1 every 9 seconds (100 per 15 minutes)
    errorReportLimiter.set(ip, new RateLimiter({ tokensPerInterval: 100, interval: 15 * 60 * 1000 }));
  }
  return errorReportLimiter.get(ip)!;
}

const __errorRateLimit = 100; // Keep for future use

// Clean up old rate limiters every hour
setInterval(() => {
  errorReportLimiter.clear();
}, 60 * 60 * 1000);

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const ip = getIPAddress(request);
    const limiter = getRateLimiter(ip);
    
    // Check rate limit
    const allowed = await limiter.tryRemoveTokens(1);
    if (!allowed) {
      return NextResponse.json(
        { 
          error: "Rate limit exceeded",
          retryAfter: 900 // 15 minutes
        },
        { status: 429 }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json() as unknown;
    
    let validatedError;
    try {
      validatedError = ErrorPayloadSchema.parse(body);
    } catch (validationError) {
      console.warn('Invalid error payload:', validationError);
      return NextResponse.json(
        { error: 'Invalid error payload' },
        { status: 400 }
      );
    }

    // 3. Extract metadata safely
    const metadata = validatedError.metadata;
    const userId = metadata.userId;
    const sessionId = metadata.sessionId;

    // 4. Skip errors from bots/crawlers
    const userAgent = request.headers.get('user-agent') || '';
    if (userAgent.includes('bot') || 
        userAgent.includes('crawler') || 
        userAgent.includes('spider')) {
      return NextResponse.json({ status: 'ignored' });
    }

    // 5. Log structured error data
    const errorData = {
      timestamp: new Date().toISOString(),
      name: validatedError.name,
      message: validatedError.message,
      stack: validatedError.stack,
      metadata: {
        type: metadata.type,
        location: metadata.location,
        userId,
        sessionId,
        userAgent,
        ip: ip !== 'unknown' ? ip : undefined,
      },
    };

    // 6. Send to logging service (console for now, could be replaced with external service)
    console.error('Client Error:', JSON.stringify(errorData, null, 2));

    // 7. Return success response
    return NextResponse.json({ 
      status: 'logged',
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

  } catch (error) {
    // Handle any errors in the error handler itself
    console.error('Error in error handler:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'UnknownError',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper functions
function _isKnownBotError(_error: z.infer<typeof ErrorPayloadSchema>, _headers: Headers): boolean {
  const userAgent = _headers.get('user-agent') || '';
  
  // Ignore Vercel bot errors
  if (userAgent.includes('Vercel') && _error.message.includes('Screenshot')) {
    return true;
  }

  // Add more bot detection logic as needed
  return false;
}

function _isCriticalError(_error: z.infer<typeof ErrorPayloadSchema>): boolean {
  // Define what constitutes a critical error
  const criticalPatterns = [
    'FATAL',
    'CRITICAL',
    'SECURITY',
    'AUTHENTICATION_FAILED',
    'DATABASE_CONNECTION_ERROR'
  ];

  return criticalPatterns.some(pattern => 
    _error.message.includes(pattern) || _error.name.includes(pattern)
  );
}

async function _storeError(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Implement error storage logic (e.g., Firebase, PostgreSQL)
  // This is where you'd store the error for later analysis
}

async function _notifyErrorService(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Implement notification logic for critical errors
  // This could be sending to Slack, email, or other monitoring services
}

async function _handleReactError(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Specific handling for React errors
  // e.g., tracking component error patterns
}

async function _handleApiError(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Specific handling for API errors
  // e.g., tracking API endpoint error patterns
}

async function _handleValidationError(_error: z.infer<typeof ErrorPayloadSchema>) {
  // Specific handling for validation errors
  // e.g., tracking validation pattern failures
} 