import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logger } from './lib/logger';

/**
 * Production-Ready Middleware
 * Implements security headers, CORS, and request validation
 */

// Security headers for all responses
const securityHeaders = {
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Force HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  
  // XSS Protection (legacy browsers)
  'X-XSS-Protection': '1; mode=block',
  
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${process.env.CSP_SCRIPT_DOMAINS || 'https://apis.google.com https://www.gstatic.com'}`,
    `style-src 'self' 'unsafe-inline' ${process.env.CSP_STYLE_DOMAINS || 'https://fonts.googleapis.com'}`,
    `font-src 'self' ${process.env.CSP_FONT_DOMAINS || 'https://fonts.gstatic.com'}`,
    `img-src 'self' data: ${process.env.CSP_IMG_DOMAINS || 'https: blob:'}`,
    `connect-src 'self' ${process.env.CSP_CONNECT_DOMAINS || 'https://*.googleapis.com https://*.firebase.com https://*.firebaseio.com wss://*.firebaseio.com'}`,
    `frame-src 'self' ${process.env.CSP_FRAME_DOMAINS || 'https://*.firebase.com'}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ')
};

// CORS configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'https://hive.college',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

// Rate limiting configuration (simplified - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  return `${ip}:${request.nextUrl.pathname}`;
}

function checkRateLimit(request: NextRequest): boolean {
  const key = getRateLimitKey(request);
  const now = Date.now();
  const limit = 100; // requests per minute
  const window = 60000; // 1 minute
  
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + window });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60000); // Clean every minute

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }
  
  // Log security-relevant requests (but not in production to avoid noise)
  if (process.env.NODE_ENV !== 'production') {
    logger.info('Middleware', {
      path: pathname,
      method: request.method,
      ip: request.headers.get('x-forwarded-for') || (request.headers?.['x-forwarded-for'] || request.headers?.['x-real-ip'] || 'unknown'),
    });
  }
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 200,
      headers: corsHeaders
    });
  }
  
  // Rate limiting for API routes
  if (pathname.startsWith('/api')) {
    if (!checkRateLimit(request)) {
      const clientIp = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       'unknown';
      logger.warn('Rate limit exceeded', undefined, clientIp, {
        path: pathname,
        method: request.method,
      });
      
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            ...securityHeaders
          }
        }
      );
    }
  }
  
  // Authentication check for protected routes
  const protectedPaths = [
    '/dashboard',
    '/profile',
    '/spaces/create',
    '/tools/builder',
    '/admin'
  ];
  
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  if (isProtectedPath) {
    const token = request.cookies.get('next-auth.session-token') || 
                  request.cookies.get('__Secure-next-auth.session-token');
    
    if (!token) {
      // Redirect to login for protected pages
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }
  
  // Block suspicious requests
  const suspiciousPatterns = [
    /\.\./g,  // Path traversal
    /<script/gi,  // XSS attempts
    /SELECT.*FROM/gi,  // SQL injection
    /UNION.*SELECT/gi,  // SQL injection
    /javascript:/gi,  // XSS attempts
    /on\w+=/gi,  // Event handlers
  ];
  
  const url = request.url;
  const body = request.body;
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url) || (body && pattern.test(body.toString()))) {
      const clientIp = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       'unknown';
      logger.warn('Suspicious request blocked', undefined, clientIp, {
        path: pathname,
        pattern: pattern.toString(),
      });
      
      return NextResponse.json(
        { error: 'Invalid request' },
        { 
          status: 400,
          headers: securityHeaders
        }
      );
    }
  }
  
  // Add security headers to all responses
  const response = NextResponse.next();
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Add CORS headers for API routes
  if (pathname.startsWith('/api')) {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};