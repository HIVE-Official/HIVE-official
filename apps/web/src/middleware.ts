import { NextRequest, NextResponse } from 'next/server'
import { isDevelopment } from '@hive/core'

// 🔒 LOCKDOWN MODE - TEASING PHASE ONLY
// Only landing page accessible, everything else blocked

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 🔒 SECURITY: Environment detection
  const isDevelopment = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development'
  const isPreview = process.env.VERCEL_ENV === 'preview'
  const isProduction = process.env.NODE_ENV === 'production' && !isPreview
  
  // 🚨 LOCKDOWN: Allow ONLY these paths in production
  const allowedPaths = [
    '/',                    // Landing page
    '/_next/',              // Next.js assets
    '/favicon.ico',         // Favicon
    '/api/health',          // Health check only
  ]
  
  // Development mode - allow everything with security headers
  if (isDevelopment) {
    const response = addSecurityHeaders(NextResponse.next())
    response.headers.set('X-Environment', 'development')
    return response
  }
  
  // Additional paths allowed in development and preview environments only
  const devAllowedPaths = [
    '/auth',
    '/auth/school-select', 
    '/auth/check-email',
    '/auth/verify',
    '/auth/error',
    '/auth/expired',
    '/onboarding',
    '/api/auth/email/start',
    '/api/auth/email/verify',
    '/api/auth/email/status',
    '/api/auth/generate-handle',
    '/api/auth/complete-onboarding',
    '/api/onboarding',
    '/api/profile',
    '/api/schools',
    '/api/spaces',
    '/profile',
    '/spaces'
  ]
  
  // 🔒 SECURITY: Only allow additional paths in non-production environments
  if (isPreview) {
    const isDevPathAllowed = devAllowedPaths.some(path => 
      pathname === path || pathname.startsWith(path)
    )
    
    if (isDevPathAllowed) {
      // Add extra security headers for preview paths
      const response = addSecurityHeaders(NextResponse.next())
      response.headers.set('X-Environment', 'preview')
      response.headers.set('X-Debug-Mode', 'true')
      return response
    }
  }
  
  // 🚨 PRODUCTION LOCKDOWN MODE
  // Block everything except allowed paths
  const isAllowed = allowedPaths.some(path => 
    pathname === path || pathname.startsWith(path)
  )
  
  if (!isAllowed) {
    // 🔒 SECURITY: Log blocked access attempts with request details
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    console.warn(`🚫 BLOCKED ACCESS: ${pathname}`, {
      ip: ip.slice(0, 8) + '***', // Partially mask IP for privacy
      userAgent: userAgent.slice(0, 50), // Truncate user agent
      timestamp: new Date().toISOString(),
      method: request.method,
      environment: isProduction ? 'production' : 'unknown'
    })
    
    // 🔒 SECURITY: Rate limit blocking attempts per IP
    const blockedAttempts = request.headers.get('x-blocked-attempts') || '0'
    const attempts = parseInt(blockedAttempts) + 1
    
    const headers = getSecurityHeaders()
    headers['X-Blocked-Attempts'] = attempts.toString()
    
    // For API routes, return 404
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Not found' }, 
        { status: 404, headers }
      )
    }
    
    // For page routes, redirect to landing
    const response = NextResponse.redirect(new URL('/', request.url))
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    return response
  }
  
  return addSecurityHeaders(NextResponse.next())
}

function getSecurityHeaders(): Record<string, string> {
  return {
    // Prevent XSS attacks
    'X-XSS-Protection': '1; mode=block',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // Force HTTPS in production
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions policy - block everything
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), midi=()',
    
    // CSP with Firebase Auth support
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-analytics.com https://apis.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://*.googleusercontent.com",
      "connect-src 'self' https://*.vercel-analytics.com https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://identitytoolkit.googleapis.com",
      "frame-src 'self' https://*.firebaseapp.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),
    
    // Block robots and crawlers
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
  }
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  const headers = getSecurityHeaders()
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}