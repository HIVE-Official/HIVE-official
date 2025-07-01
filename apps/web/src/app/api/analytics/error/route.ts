import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@hive/core';

// Schema for error reporting - made more flexible to handle various error formats
const errorEventSchema = z.object({
  // Make sessionId optional and allow any string (we'll generate UUID if missing)
  sessionId: z.string().optional(),
  userId: z.string().optional(),
  // Allow string messages directly or error object
  error: z.union([
    z.string(),
    z.object({
      message: z.string(),
      stack: z.string().optional(),
      type: z.string().optional(),
      code: z.string().optional(),
    })
  ]).optional(),
  // Make the context structure more flexible
  context: z.object({
    url: z.string().optional(),
    userAgent: z.string().optional(),
    timestamp: z.number().optional(),
    component: z.string().optional(),
    additionalData: z.record(z.unknown()).optional(),
  }).optional(),
  // Allow raw error data to be passed
  message: z.string().optional(),
  stack: z.string().optional(),
  type: z.string().optional(),
}).refine(data => {
  // Ensure we have at least some error information
  return !!(data.error || (data.message));
}, {
  message: "Either 'error' object or 'message' must be provided"
});

// Rate limiting to prevent abuse
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // 10 error reports per minute per client

  const current = rateLimitStore.get(identifier);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate the error report format
    const validatedData = errorEventSchema.parse(data);
    
    // Use IP address for rate limiting if no sessionId
    const identifier = validatedData.sessionId || 
      request.headers.get('x-forwarded-for') || 
      'unknown';
    
    // Check rate limit
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Normalize the error data
    const normalizedError = {
      message: validatedData.error 
        ? (typeof validatedData.error === 'string' 
            ? validatedData.error 
            : validatedData.error.message)
        : validatedData.message,
      stack: validatedData.error && typeof validatedData.error === 'object' 
        ? validatedData.error.stack 
        : validatedData.stack,
      type: validatedData.error && typeof validatedData.error === 'object'
        ? validatedData.error.type
        : validatedData.type,
    };

    // Log the error
    logger.error('Client Error:', {
      ...validatedData,
      error: normalizedError,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
    });

    // In production, you might want to store these in a database
    // or send them to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Store in Firestore or send to error tracking service
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error processing error report:', error);
    return NextResponse.json(
      { error: 'Failed to process error report' },
      { status: 500 }
    );
  }
} 