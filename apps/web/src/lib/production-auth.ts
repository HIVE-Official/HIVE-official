import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, verifyIdToken } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';
import { HttpStatus } from '@/lib/utils/http-status';
import { headers } from 'next/headers';

export interface AuthContext {
  userId: string;
  email?: string;
  emailVerified: boolean;
  claims?: Record<string, any>;
  token: string;
}

/**
 * Production authentication middleware for API routes
 */
export async function withProductionAuth(
  handler: (req: NextRequest, context: AuthContext) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Extract token from Authorization header
      const authHeader = req.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Missing or invalid authorization header' },
          { status: HttpStatus.UNAUTHORIZED }
        );
      }

      const token = authHeader.substring(7);
      
      // Verify the token
      const decodedToken = await verifyIdToken(token);
      if (!decodedToken) {
        return NextResponse.json(
          { error: 'Invalid authentication token' },
          { status: HttpStatus.UNAUTHORIZED }
        );
      }

      // Check if email is verified in production
      if (process.env.NODE_ENV === 'production' && !decodedToken.email_verified) {
        return NextResponse.json(
          { error: 'Email verification required' },
          { status: HttpStatus.FORBIDDEN }
        );
      }

      // Build auth context
      const authContext: AuthContext = {
        userId: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified || false,
        claims: decodedToken,
        token
      };

      // Log authenticated request
      logger.info('Authenticated API request', {
        userId: authContext.userId,
        path: req.url,
        method: req.method
      });

      // Call the handler with auth context
      return await handler(req, authContext);
    } catch (error) {
      logger.error('Authentication error', { error, url: req.url });
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
    }
  };
}

/**
 * Verify session cookie for SSR pages
 */
export async function verifySessionCookie(cookieValue: string): Promise<AuthContext | null> {
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(cookieValue, true);
    
    return {
      userId: decodedClaims.uid,
      email: decodedClaims.email,
      emailVerified: decodedClaims.email_verified || false,
      claims: decodedClaims,
      token: cookieValue
    };
  } catch (error) {
    logger.error('Session cookie verification failed', { error });
    return null;
  }
}

/**
 * Create session cookie from ID token
 */
export async function createSessionCookie(idToken: string, expiresIn?: number): Promise<string | null> {
  try {
    // Session cookie expires in 5 days by default
    const expirationTime = expiresIn || 60 * 60 * 24 * 5 * 1000;
    
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: expirationTime });
    return sessionCookie;
  } catch (error) {
    logger.error('Failed to create session cookie', { error });
    return null;
  }
}

/**
 * Revoke refresh tokens for a user
 */
export async function revokeUserTokens(userId: string): Promise<boolean> {
  try {
    await adminAuth.revokeRefreshTokens(userId);
    logger.info('User tokens revoked', { userId });
    return true;
  } catch (error) {
    logger.error('Failed to revoke user tokens', { error, userId });
    return false;
  }
}

/**
 * Rate limiting configuration
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute

/**
 * Simple rate limiting middleware
 */
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  maxRequests: number = RATE_LIMIT_MAX_REQUESTS
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Get client identifier (IP or user ID)
    const clientId = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    
    const now = Date.now();
    const clientData = rateLimitMap.get(clientId);
    
    if (!clientData || now > clientData.resetTime) {
      // New window
      rateLimitMap.set(clientId, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW
      });
    } else if (clientData.count >= maxRequests) {
      // Rate limit exceeded
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: HttpStatus.TOO_MANY_REQUESTS,
          headers: {
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(clientData.resetTime).toISOString()
          }
        }
      );
    } else {
      // Increment count
      clientData.count++;
    }
    
    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance
      const cutoff = now - RATE_LIMIT_WINDOW * 2;
      for (const [key, value] of rateLimitMap.entries()) {
        if (value.resetTime < cutoff) {
          rateLimitMap.delete(key);
        }
      }
    }
    
    return handler(req);
  };
}

/**
 * CORS configuration for production
 */
export function withCORS(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        }
      });
    }
    
    const response = await handler(req);
    
    // Add CORS headers to response
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  };
}

/**
 * Combine multiple middleware functions
 */
export function composeMiddleware(
  ...middlewares: Array<(handler: (req: NextRequest) => Promise<NextResponse>) => (req: NextRequest) => Promise<NextResponse>>
) {
  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}

/**
 * Production-ready API handler with all middleware
 */
export function withProductionAPI(
  handler: (req: NextRequest, context: AuthContext) => Promise<NextResponse>,
  options?: {
    requireAuth?: boolean;
    rateLimit?: number;
    cors?: boolean;
  }
) {
  const { requireAuth = true, rateLimit = RATE_LIMIT_MAX_REQUESTS, cors = true } = options || {};
  
  let finalHandler = handler as any;
  
  if (requireAuth) {
    finalHandler = withProductionAuth(finalHandler);
  }
  
  if (cors) {
    finalHandler = withCORS(finalHandler);
  }
  
  if (rateLimit > 0) {
    finalHandler = withRateLimit(finalHandler, rateLimit);
  }
  
  return finalHandler;
}

/**
 * Check if running in production environment
 */
export function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === 'production';
}