/**
 * Next.js middleware for security headers, CORS, and request processing
 * This runs on all requests at the edge
 */

import { NextRequest, NextResponse } from 'next/server';

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
      'https://hive.college',
      'https://www.hive.college',
      'https://app.hive.college',
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
 * Get current environment based on hostname
 */
function getCurrentEnvironment(hostname: string): string {
  // Production domains
  if (hostname.includes('hive.college') || hostname.includes('hive.io')) {
    return 'production';
  }
  // Vercel preview URLs
  if (hostname.includes('vercel.app')) {
    return 'staging';
  }
  // Local development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return 'development';
  }
  return 'production'; // Default to production for safety
}

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
  const _requestHeaders = request.headers.get('access-control-request-headers');
  const hostname = request.headers.get('host') || request.nextUrl.hostname;
  const environment = getCurrentEnvironment(hostname);

  // Check if origin is allowed
  if (!isOriginAllowed(origin, environment)) {
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
  const hostname = request.headers.get('host') || request.nextUrl.hostname;
  const environment = getCurrentEnvironment(hostname);

  if (origin && isOriginAllowed(origin, environment)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Expose-Headers', CORS_CONFIG.exposedHeaders.join(', '));
  }
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse, request: NextRequest): void {
  const hostname = request.headers.get('host') || request.nextUrl.hostname;
  const environment = getCurrentEnvironment(hostname);

  // Skip security headers for development to avoid CSP issues
  if (environment === 'development') {
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
 * Rate limiting check (disabled for Edge Runtime compatibility)
 */
async function checkRateLimit(request: NextRequest): Promise<NextResponse | null> {
  // Skip rate limiting to avoid Edge Runtime issues with Redis
  // Rate limiting is handled at the API route level instead
  return null;
}

/**
 * Main middleware function
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Add middleware start time for performance tracking
  request.headers.set('x-middleware-start', Date.now().toString());

  const { pathname } = request.nextUrl;

  // Allow static files, Next.js internals to pass through
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/__nextjs') ||
    pathname.includes('hot-update') ||
    pathname.includes('.') && !pathname.includes('/api/')
  ) {
    const response = NextResponse.next();
    addSecurityHeaders(response, request);
    return response;
  }

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return handlePreflight(request);
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/landing', '/auth/login', '/auth/verify', '/auth/expired', '/onboarding', '/schools', '/waitlist'];

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    const response = NextResponse.next();
    addSecurityHeaders(response, request);
    addCorsHeaders(response, request);
    addTrackingHeaders(response, request);
    return response;
  }

  // For API routes
  if (pathname.startsWith('/api/')) {
    // Skip health check and public endpoints
    if (pathname === '/api/health' || pathname.startsWith('/api/auth/')) {
      const response = NextResponse.next();
      addSecurityHeaders(response, request);
      addCorsHeaders(response, request);
      addTrackingHeaders(response, request);
      return response;
    }
  }

  // Check rate limits
  const rateLimitResponse = await checkRateLimit(request);
  if (rateLimitResponse) {
    addSecurityHeaders(rateLimitResponse, request);
    addCorsHeaders(rateLimitResponse, request);
    addTrackingHeaders(rateLimitResponse, request);
    return rateLimitResponse;
  }

  // Continue to the next middleware/route
  const response = NextResponse.next();

  // Add security headers
  addSecurityHeaders(response, request);

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