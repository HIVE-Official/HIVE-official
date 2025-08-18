/**
 * Security service for handling development bypasses and production security
 * Centralizes all security-related logic to prevent bypass vulnerabilities
 */

import { NextRequest } from 'next/server';
import { currentEnvironment, isDevelopment } from './env';
import { captureError, LogLevel } from './error-monitoring';
import { logSecurityEvent } from './structured-logger';

/**
 * Security configuration for different environments
 */
const SECURITY_CONFIG = {
  development: {
    allowTestTokens: true,
    allowDevMagicLinks: true,
    allowSchoolBypass: true,
    strictValidation: false,
    logSensitiveData: true
  },
  staging: {
    allowTestTokens: false,
    allowDevMagicLinks: false,
    allowSchoolBypass: false,
    strictValidation: true,
    logSensitiveData: false
  },
  production: {
    allowTestTokens: false,
    allowDevMagicLinks: false,
    allowSchoolBypass: false,
    strictValidation: true,
    logSensitiveData: false
  }
} as const;

/**
 * Development bypass tokens that should never work in production
 */
const DEV_BYPASS_TOKENS = [
  'test-token',
  'DEV_MODE',
  'dev-token',
  'development-token',
  'bypass-token'
] as const;

/**
 * Test user IDs that should only work in development
 */
const DEV_TEST_USERS = [
  'test-user',
  'dev-user',
  'admin-test',
  'test-admin'
] as const;

/**
 * Check if a token is a development bypass token
 */
export function isDevBypassToken(token: string): boolean {
  // Check hardcoded dev tokens
  if (DEV_BYPASS_TOKENS.includes(token as any)) {
    return true;
  }
  
  // Check debug session tokens (dev_session_userId_timestamp_random)
  if (token.startsWith('dev_session_')) {
    return true;
  }
  
  return false;
}

/**
 * Check if a user ID is a test user
 */
export function isTestUserId(userId: string): boolean {
  return DEV_TEST_USERS.includes(userId as any);
}

/**
 * Extract user ID from debug session token
 * Debug tokens format: dev_session_userId_timestamp_random
 */
function extractUserIdFromDebugToken(token: string): string | null {
  if (!token.startsWith('dev_session_')) {
    return null;
  }

  try {
    // Parse token: dev_session_userId_timestamp_random
    const parts = token.split('_');
    if (parts.length < 3) {
      return 'debug-user'; // Fallback
    }

    // Extract userId (everything between dev_session_ and the last two parts)
    let userId: string;
    if (parts.length >= 4) {
      userId = parts.slice(2, -2).join('_');
      // If userId is empty after slicing, use all parts after dev_session_
      if (!userId) {
        userId = parts.slice(2).join('_');
      }
    } else {
      // For shorter tokens, take everything after dev_session_
      userId = parts.slice(2).join('_');
    }
    
    return userId || 'debug-user';
  } catch (error) {
    console.error('Failed to extract user ID from debug token:', error);
    return 'debug-user';
  }
}

/**
 * Get security configuration for current environment
 */
export function getSecurityConfig() {
  return SECURITY_CONFIG[currentEnvironment as keyof typeof SECURITY_CONFIG];
}

/**
 * Validate development bypass attempt
 * Returns true if bypass is allowed, false if it should be blocked
 */
export async function validateDevBypass(
  token: string,
  request: NextRequest,
  context?: {
    userId?: string;
    operation?: string;
    path?: string;
  }
): Promise<{
  allowed: boolean;
  reason?: string;
  securityAlert?: boolean;
}> {
  const config = getSecurityConfig();
  const isDevToken = isDevBypassToken(token);

  // If not a dev token, no bypass attempt
  if (!isDevToken) {
    return { allowed: true };
  }

  // In development, allow dev tokens
  if (config.allowTestTokens && isDevelopment) {
    // Development bypass token validated
    return { allowed: true, reason: 'Development environment' };
  }

  // In staging/production, dev tokens are a security violation
  if (!config.allowTestTokens) {
    // Log security incident
    const securityContext = {
      token: isDevToken ? '[DEV_TOKEN_BLOCKED]' : token,
      environment: currentEnvironment,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          request.headers.get('cf-connecting-ip'),
      path: context?.path || new URL(request.url).pathname,
      operation: context?.operation,
      timestamp: new Date().toISOString()
    };

    console.error('🚨 SECURITY ALERT: Development bypass attempt in production', securityContext);

    // Structured security logging
    await logSecurityEvent('bypass_attempt', {
      requestId: securityContext.token, // Using token as identifier
      ip: securityContext.ip,
      userAgent: securityContext.userAgent,
      operation: context?.operation,
      tags: {
        bypassType: 'dev_token',
        environment: currentEnvironment,
        alertLevel: 'critical'
      },
      extra: securityContext
    });

    // Capture as security incident
    try {
      await captureError(new Error('Development bypass token used in production'), {
        level: LogLevel.ERROR,
        tags: {
          security_incident: 'true',
          bypass_attempt: 'true',
          environment: currentEnvironment,
          token_type: 'dev_bypass'
        },
        extra: securityContext
      });
    } catch (error) {
      console.error('Failed to log security incident:', error);
    }

    return {
      allowed: false,
      reason: 'Development bypasses are disabled in production',
      securityAlert: true
    };
  }

  return { allowed: false, reason: 'Invalid configuration state' };
}

/**
 * Validate magic link bypass for development
 */
export async function validateMagicLinkBypass(
  token: string,
  email: string,
  request: NextRequest
): Promise<{
  allowed: boolean;
  reason?: string;
  securityAlert?: boolean;
}> {
  const config = getSecurityConfig();

  // Check if this is a dev magic link
  if (token === 'DEV_MODE') {
    if (config.allowDevMagicLinks && isDevelopment) {
      
      return { allowed: true, reason: 'Development environment' };
    }

    if (!config.allowDevMagicLinks) {
      console.error('🚨 SECURITY ALERT: DEV_MODE magic link attempted in production');
      
      // Structured security logging
      await logSecurityEvent('bypass_attempt', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        operation: 'magic_link_verify',
        tags: {
          bypassType: 'dev_magic_link',
          environment: currentEnvironment,
          alertLevel: 'critical'
        },
        extra: {
          email: email.replace(/(.{3}).*@/, '$1***@'),
          timestamp: new Date().toISOString()
        }
      });
      
      try {
        await captureError(new Error('DEV_MODE magic link used in production'), {
          level: LogLevel.ERROR,
          tags: {
            security_incident: 'true',
            magic_link_bypass: 'true',
            environment: currentEnvironment
          },
          extra: {
            email: email.replace(/(.{3}).*@/, '$1***@'), // Masked email
            ip: request.headers.get('x-forwarded-for'),
            userAgent: request.headers.get('user-agent'),
            timestamp: new Date().toISOString()
          }
        });
      } catch (error) {
        console.error('Failed to log magic link security incident:', error);
      }

      return {
        allowed: false,
        reason: 'Development magic links are disabled in production',
        securityAlert: true
      };
    }
  }

  return { allowed: true };
}

/**
 * Validate school domain bypass for development
 */
export function validateSchoolBypass(email: string, requiredDomain?: string): {
  allowed: boolean;
  reason?: string;
} {
  const config = getSecurityConfig();

  // If no required domain or school bypass is allowed, permit any email
  if (!requiredDomain || config.allowSchoolBypass) {
    return { allowed: true };
  }

  // Check if email matches required domain
  const emailDomain = email.split('@')[1]?.toLowerCase();
  const normalizedDomain = requiredDomain.toLowerCase();

  if (emailDomain === normalizedDomain) {
    return { allowed: true };
  }

  return {
    allowed: false,
    reason: `Email must be from ${requiredDomain} domain`
  };
}

/**
 * Secure token validation - ensures dev tokens don't work in production
 */
export async function validateAuthToken(
  token: string,
  request: NextRequest,
  context?: {
    operation?: string;
    requireRealAuth?: boolean;
  }
): Promise<{
  valid: boolean;
  userId?: string;
  reason?: string;
  securityAlert?: boolean;
}> {
  // First check for dev bypass attempts
  const bypassValidation = await validateDevBypass(token, request, {
    operation: context?.operation,
    path: new URL(request.url).pathname
  });

  if (!bypassValidation.allowed) {
    return {
      valid: false,
      reason: bypassValidation.reason,
      securityAlert: bypassValidation.securityAlert
    };
  }

  // If it's a dev token and bypass is allowed, extract user ID
  if (isDevBypassToken(token) && bypassValidation.allowed) {
    // Handle debug session tokens
    if (token.startsWith('dev_session_')) {
      const userId = extractUserIdFromDebugToken(token);
      return {
        valid: true,
        userId: userId || 'debug-user',
        reason: 'Debug session token'
      };
    }
    
    // Handle legacy dev tokens
    return {
      valid: true,
      userId: 'test-user',
      reason: 'Development bypass token'
    };
  }

  // For real Firebase tokens, validate with production auth service
  try {
    const { validateProductionToken } = await import('./production-auth');
    const result = await validateProductionToken(token, request, {
      operation: context?.operation
    });
    
    return {
      valid: true,
      userId: result.uid,
      reason: 'Valid Firebase token'
    };
    
  } catch (error: any) {
    // Production auth service throws errors for invalid tokens
    return {
      valid: false,
      reason: error.message || 'Token validation failed',
      securityAlert: error.httpStatus === 403
    };
  }
}

/**
 * Environment-aware logging that respects security settings
 */
export function secureLog(level: 'info' | 'warn' | 'error', message: string, data?: any): void {
  const config = getSecurityConfig();

  if (level === 'error') {
    console.error(message, config.logSensitiveData ? data : '[REDACTED]');
  } else if (level === 'warn') {
    console.warn(message, config.logSensitiveData ? data : '[REDACTED]');
  } else {
    
  }
}

/**
 * Check if current request is from a development environment
 * Used for additional security checks
 */
export function isRequestFromDevelopment(request: NextRequest): boolean {
  const host = request.headers.get('host');
  const origin = request.headers.get('origin');
  
  const devIndicators = [
    'localhost',
    '127.0.0.1',
    '.local',
    ':3000',
    ':3001'
  ];

  return devIndicators.some(indicator => 
    host?.includes(indicator) || origin?.includes(indicator)
  );
}

/**
 * Production security middleware - blocks known dev patterns
 */
export async function blockDevPatternsInProduction(
  request: NextRequest
): Promise<{ blocked: boolean; reason?: string }> {
  if (isDevelopment) {
    return { blocked: false };
  }

  const authHeader = request.headers.get('authorization');
  
  // Check for dev tokens in headers
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    if (isDevBypassToken(token)) {
      // Log the security incident
      await logSecurityEvent('production_dev_token_blocked', {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        path: new URL(request.url).pathname,
        tags: {
          tokenType: token.startsWith('dev_session_') ? 'debug_session' : 'dev_bypass',
          environment: currentEnvironment,
          alertLevel: 'critical'
        }
      });
      
      return {
        blocked: true,
        reason: 'Development token detected in production environment'
      };
    }
  }

  // For POST requests, we'll check the body separately in each route
  // to avoid consuming the request stream here
  return { blocked: false };
}

/**
 * Check request body for development patterns (call this after parsing JSON)
 */
export function checkBodyForDevPatterns(body: any): { blocked: boolean; reason?: string } {
  if (isDevelopment) {
    return { blocked: false };
  }

  const devPatterns = ['DEV_MODE', 'test-token', 'dev-user', 'bypass'];
  const bodyString = JSON.stringify(body).toLowerCase();
  
  for (const pattern of devPatterns) {
    if (bodyString.includes(pattern.toLowerCase())) {
      return {
        blocked: true,
        reason: `Development pattern '${pattern}' detected in production`
      };
    }
  }

  return { blocked: false };
}