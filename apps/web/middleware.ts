/**
 * Next.js middleware for security headers, CORS, and request processing
 * This runs on all requests at the edge
 */

import { NextRequest, NextResponse } from 'next/server';
import { currentEnvironment } from './src/lib/env';

// CORS configuration
const CORS_CONFIG = {
  // Allowed origins based on environment
  origins: {
    development: [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001'
    ],
    staging: [
      'https://staging.hive.io',
      'https://preview.hive.io',
      'https://*.vercel.app'
    ],
    production: [
      'https://hive.io',
      'https://www.hive.io',
      'https://app.hive.io'
    ]
  },
  
  // Allowed methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  
  // Allowed headers
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'X-File-Name',
    'X-User-ID',
    'X-Request-ID'
  ],
  
  // Exposed headers
  exposedHeaders: [
    'X-Request-ID',
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset'
  ],
  
  // Credentials
  credentials: true,
  
  // Preflight cache time
  maxAge: 86400 // 24 hours
};

// Security headers configuration
const SECURITY_HEADERS = {
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com https://js.sentry-cdn.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https: http:",
    "media-src 'self' blob:",
    "object-src 'none'",
    "frame-src 'self' https://apis.google.com",
    "connect-src 'self' https://api.github.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firestore.googleapis.com https://*.sentry.io wss:",
    "worker-src 'self' blob:",
    "child-src 'self'",
    "form-action 'self'",
    "base-uri 'self'",
    "manifest-src 'self'"
  ].join('; '),
  
  // XSS Protection
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  
  // HSTS (HTTP Strict Transport Security)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()'
  ].join(', '),
  
  // Additional security headers
  'X-DNS-Prefetch-Control': 'off',
  'X-Download-Options': 'noopen',
  'X-Permitted-Cross-Domain-Policies': 'none'
};

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string | null, environment: string): boolean {
  if (!origin) return true; // Allow same-origin requests
  
  const allowedOrigins = CORS_CONFIG.origins[environment as keyof typeof CORS_CONFIG.origins] || [];
  
  return allowedOrigins.some(allowed => {
    if (allowed.includes('*')) {
      // Handle wildcard domains like *.vercel.app
      const pattern = allowed.replace(/\*/g, '.*');
      return new RegExp(`^${pattern}$`).test(origin);
    }
    return allowed === origin;
  });
}

/**
 * Handle CORS preflight requests
 */
function handlePreflight(request: NextRequest): NextResponse {
  const origin = request.headers.get('origin');
  const requestMethod = request.headers.get('access-control-request-method');
  const requestHeaders = request.headers.get('access-control-request-headers');

  // Check if origin is allowed
  if (!isOriginAllowed(origin, currentEnvironment)) {
    return new NextResponse(null, { status: 403 });
  }

  // Check if method is allowed
  if (requestMethod && !CORS_CONFIG.methods.includes(requestMethod)) {
    return new NextResponse(null, { status: 405 });
  }

  const response = new NextResponse(null, { status: 204 });

  // Set CORS headers
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', CORS_CONFIG.methods.join(', '));
  response.headers.set('Access-Control-Allow-Headers', CORS_CONFIG.allowedHeaders.join(', '));
  response.headers.set('Access-Control-Max-Age', CORS_CONFIG.maxAge.toString());

  return response;
}

/**
 * Add CORS headers to response
 */
function addCorsHeaders(response: NextResponse, request: NextRequest): void {
  const origin = request.headers.get('origin');

  if (origin && isOriginAllowed(origin, currentEnvironment)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Expose-Headers', CORS_CONFIG.exposedHeaders.join(', '));
  }
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): void {
  // Skip security headers for development to avoid CSP issues
  if (currentEnvironment === 'development') {
    // Only add essential headers in development
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN'); // Less strict for dev
    return;
  }

  // Add all security headers for staging/production
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

/**
 * Add request tracking headers
 */
function addTrackingHeaders(response: NextResponse, request: NextRequest): void {
  // Generate or extract request ID
  const requestId = request.headers.get('x-request-id') || 
                   `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  response.headers.set('X-Request-ID', requestId);
  
  // Add server timing header for performance monitoring
  const processingTime = Date.now() - parseInt(request.headers.get('x-middleware-start') || '0');
  response.headers.set('Server-Timing', `middleware;dur=${processingTime}`);
}

/**
 * Rate limiting check
 */
async function checkRateLimit(request: NextRequest): Promise<NextResponse | null> {
  // Skip rate limiting for non-API routes in development
  if (currentEnvironment === 'development' && !request.nextUrl.pathname.startsWith('/api/')) {
    return null;
  }

  try {
    // Dynamic import to avoid startup issues
    const { createRateLimit } = await import('./src/lib/rate-limit-redis');
    
    // Different rate limits for different routes
    let rateLimiter;
    const path = request.nextUrl.pathname;
    
    if (path.startsWith('/api/auth/')) {
      rateLimiter = createRateLimit('AUTH');
    } else if (path.startsWith('/api/')) {
      rateLimiter = createRateLimit('API');
    } else {
      // No rate limiting for static assets and pages
      return null;
    }

    // Get client identifier
    const clientId = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    request.headers.get('cf-connecting-ip') ||
                    request.ip ||
                    'unknown';

    const result = await rateLimiter.checkLimit(clientId);

    if (!result.success) {
      const response = NextResponse.json(
        {
          error: 'Rate limit exceeded',
          retryAfter: result.retryAfter
        },
        { status: 429 }
      );

      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', result.limit.toString());
      response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
      response.headers.set('X-RateLimit-Reset', result.resetTime.toString());
      
      if (result.retryAfter) {
        response.headers.set('Retry-After', result.retryAfter.toString());
      }

      return response;
    }

    // Add rate limit headers to successful requests
    request.headers.set('x-ratelimit-limit', result.limit.toString());
    request.headers.set('x-ratelimit-remaining', result.remaining.toString());
    request.headers.set('x-ratelimit-reset', result.resetTime.toString());

  } catch (error) {
    console.error('Rate limiting error:', error);
    // Continue without rate limiting on error (fail open)
  }

  return null;
}

/**
 * Main middleware function
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Add middleware start time for performance tracking
  request.headers.set('x-middleware-start', Date.now().toString());

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return handlePreflight(request);
  }

  // Check rate limits
  const rateLimitResponse = await checkRateLimit(request);
  if (rateLimitResponse) {
    addSecurityHeaders(rateLimitResponse);
    addCorsHeaders(rateLimitResponse, request);
    addTrackingHeaders(rateLimitResponse, request);
    return rateLimitResponse;
  }

  // Continue to the next middleware/route
  const response = NextResponse.next();

  // Add security headers
  addSecurityHeaders(response);

  // Add CORS headers
  addCorsHeaders(response, request);

  // Add tracking headers
  addTrackingHeaders(response, request);

  return response;
}

/**
 * Middleware configuration
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};