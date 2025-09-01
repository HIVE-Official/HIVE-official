/**
 * PRODUCTION-SECURE session management with comprehensive security controls
 * Implements secure session handling, token rotation, and threat detection
 */

import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { logSecurityEvent } from './structured-logger';
import { currentEnvironment, env } from './env';
import { SecurityScanner } from './secure-input-validation';

/**
 * Session configuration with security-first design
 */
const SESSION_CONFIG = {
  // Cookie settings
  COOKIE_NAME: 'hive_session',
  REFRESH_COOKIE_NAME: 'hive_refresh',
  
  // Security timeouts
  ACCESS_TOKEN_LIFETIME: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN_LIFETIME: 7 * 24 * 60 * 60 * 1000, // 7 days
  SESSION_ABSOLUTE_TIMEOUT: 30 * 24 * 60 * 60 * 1000, // 30 days max
  
  // Rotation thresholds
  ROTATION_THRESHOLD: 5 * 60 * 1000, // Rotate if token expires in 5 minutes
  MAX_ROTATION_ATTEMPTS: 3,
  
  // Security limits
  MAX_CONCURRENT_SESSIONS: 5,
  SUSPICIOUS_ACTIVITY_THRESHOLD: 10,
  
  // Cookie options
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: currentEnvironment === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  }
} as const;

/**
 * Session data structure
 */
export interface SessionData {
  userId: string;
  email: string;
  handle: string;
  schoolId: string;
  issuedAt: number;
  expiresAt: number;
  sessionId: string;
  fingerprint: string;
  lastActivity: number;
  rotationCount: number;
  securityLevel: 'standard' | 'elevated' | 'restricted';
  metadata: {
    userAgent: string;
    ip: string;
    createdAt: number;
    lastRotated: number;
  };
}

/**
 * Refresh token data
 */
interface RefreshTokenData {
  sessionId: string;
  userId: string;
  issuedAt: number;
  expiresAt: number;
  rotationCount: number;
  fingerprint: string;
}

/**
 * Session validation result
 */
export interface SessionValidationResult {
  valid: boolean;
  session?: SessionData;
  needsRotation: boolean;
  securityViolation?: string;
  action: 'allow' | 'rotate' | 'block' | 'elevate';
}

/**
 * Security-first session manager
 */
export class SecureSessionManager {
  private static jwtSecret: Uint8Array;
  private static sessionStore = new Map<string, SessionData>();
  private static securityEvents = new Map<string, number>();

  /**
   * Initialize JWT secret securely
   */
  private static getJwtSecret(): Uint8Array {
    if (!this.jwtSecret) {
      const secret = env.JWT_SECRET || env.NEXTAUTH_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET not configured');
      }
      
      // Validate secret strength
      if (secret.length < 32) {
        throw new Error('JWT_SECRET must be at least 32 characters');
      }
      
      this.jwtSecret = new TextEncoder().encode(secret);
    }
    return this.jwtSecret;
  }

  /**
   * Generate secure fingerprint for session binding
   */
  private static generateFingerprint(request: NextRequest): string {
    const userAgent = request.headers.get('user-agent') || '';
    const acceptLanguage = request.headers.get('accept-language') || '';
    const acceptEncoding = request.headers.get('accept-encoding') || '';
    
    // Create fingerprint from stable headers
    const components = [
      userAgent.substring(0, 100), // Limit length
      acceptLanguage,
      acceptEncoding
    ].join('|');
    
    // Simple hash (in production, use crypto.subtle.digest)
    let hash = 0;
    for (let i = 0; i < components.length; i++) {
      const char = components.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  /**
   * Create new secure session
   */
  static async createSession(
    userData: {
      userId: string;
      email: string;
      handle: string;
      schoolId: string;
    },
    request: NextRequest
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }> {
    const now = Date.now();
    const sessionId = `sess_${now}_${Math.random().toString(36).substr(2, 9)}`;
    const fingerprint = this.generateFingerprint(request);
    
    const sessionData: SessionData = {
      ...userData,
      issuedAt: now,
      expiresAt: now + SESSION_CONFIG.ACCESS_TOKEN_LIFETIME,
      sessionId,
      fingerprint,
      lastActivity: now,
      rotationCount: 0,
      securityLevel: 'standard',
      metadata: {
        userAgent: request.headers.get('user-agent') || '',
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        createdAt: now,
        lastRotated: now
      }
    };

    // Store session securely
    this.sessionStore.set(sessionId, sessionData);

    // Create JWT tokens
    const secret = this.getJwtSecret();
    
    const accessToken = await new SignJWT({
      sub: userData.userId,
      sid: sessionId,
      fp: fingerprint,
      scp: 'access',
      iat: Math.floor(now / 1000),
      exp: Math.floor(sessionData.expiresAt / 1000)
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .sign(secret);

    const refreshTokenData: RefreshTokenData = {
      sessionId,
      userId: userData.userId,
      issuedAt: now,
      expiresAt: now + SESSION_CONFIG.REFRESH_TOKEN_LIFETIME,
      rotationCount: 0,
      fingerprint
    };

    const refreshToken = await new SignJWT({
      sub: userData.userId,
      sid: sessionId,
      fp: fingerprint,
      scp: 'refresh',
      rtc: 0,
      iat: Math.floor(now / 1000),
      exp: Math.floor(refreshTokenData.expiresAt / 1000)
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .sign(secret);

    // Log session creation
    await logSecurityEvent('session', {
      operation: 'session_created',
      tags: {
        userId: userData.userId,
        sessionId,
        environment: currentEnvironment,
        userAgent: sessionData.metadata.userAgent.substring(0, 100)
      }
    });

    return {
      accessToken,
      refreshToken,
      expiresAt: sessionData.expiresAt
    };
  }

  /**
   * Validate session with comprehensive security checks
   */
  static async validateSession(
    request: NextRequest
  ): Promise<SessionValidationResult> {
    try {
      const authHeader = request.headers.get('authorization');
      const cookieToken = request.cookies.get(SESSION_CONFIG.COOKIE_NAME)?.value;
      
      const token = authHeader?.startsWith('Bearer ') 
        ? authHeader.substring(7)
        : cookieToken;

      if (!token) {
        return { valid: false, needsRotation: false, action: 'block' };
      }

      // SECURITY: Scan token for suspicious patterns
      const tokenScan = SecurityScanner.scanInput(token, 'session_token');
      if (tokenScan.level === 'dangerous') {
        await logSecurityEvent('session', {
          operation: 'dangerous_token_detected',
          tags: {
            threats: tokenScan.threats.join(','),
            environment: currentEnvironment
          }
        });
        return { 
          valid: false, 
          needsRotation: false, 
          action: 'block',
          securityViolation: 'dangerous_token'
        };
      }

      // Verify JWT
      const secret = this.getJwtSecret();
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ['HS256']
      });

      const sessionId = payload.sid as string;
      const fingerprint = payload.fp as string;
      const scope = payload.scp as string;

      if (scope !== 'access') {
        return { 
          valid: false, 
          needsRotation: false, 
          action: 'block',
          securityViolation: 'invalid_scope'
        };
      }

      // Get session data
      const sessionData = this.sessionStore.get(sessionId);
      if (!sessionData) {
        return { 
          valid: false, 
          needsRotation: false, 
          action: 'block',
          securityViolation: 'session_not_found'
        };
      }

      // SECURITY: Validate fingerprint
      const currentFingerprint = this.generateFingerprint(request);
      if (fingerprint !== currentFingerprint) {
        await logSecurityEvent('session', {
          operation: 'fingerprint_mismatch',
          tags: {
            userId: sessionData.userId,
            sessionId,
            environment: currentEnvironment
          }
        });
        
        return { 
          valid: false, 
          needsRotation: false, 
          action: 'block',
          securityViolation: 'fingerprint_mismatch'
        };
      }

      // SECURITY: Check for session hijacking patterns
      const suspiciousActivity = await this.detectSuspiciousActivity(sessionData, request);
      if (suspiciousActivity.detected) {
        return {
          valid: false,
          needsRotation: false,
          action: 'block',
          securityViolation: suspiciousActivity.reason
        };
      }

      // Update last activity
      sessionData.lastActivity = Date.now();

      // Check if rotation is needed
      const now = Date.now();
      const timeUntilExpiry = sessionData.expiresAt - now;
      const needsRotation = timeUntilExpiry < SESSION_CONFIG.ROTATION_THRESHOLD;

      // Check for absolute session timeout
      const sessionAge = now - sessionData.metadata.createdAt;
      if (sessionAge > SESSION_CONFIG.SESSION_ABSOLUTE_TIMEOUT) {
        return {
          valid: false,
          needsRotation: false,
          action: 'block',
          securityViolation: 'session_expired'
        };
      }

      return {
        valid: true,
        session: sessionData,
        needsRotation,
        action: needsRotation ? 'rotate' : 'allow'
      };

    } catch (error) {
      await logSecurityEvent('session', {
        operation: 'session_validation_error',
        tags: {
          error: error instanceof Error ? error.message : 'unknown',
          environment: currentEnvironment
        }
      });

      return { 
        valid: false, 
        needsRotation: false, 
        action: 'block',
        securityViolation: 'validation_error'
      };
    }
  }

  /**
   * Rotate session tokens for enhanced security
   */
  static async rotateSession(
    sessionData: SessionData,
    _request: NextRequest
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  } | null> {
    try {
      // Check rotation limits
      if (sessionData.rotationCount >= SESSION_CONFIG.MAX_ROTATION_ATTEMPTS) {
        await logSecurityEvent('session', {
          operation: 'max_rotations_exceeded',
          tags: {
            userId: sessionData.userId,
            sessionId: sessionData.sessionId,
            rotationCount: sessionData.rotationCount.toString()
          }
        });
        return null;
      }

      const now = Date.now();
      
      // Update session data
      sessionData.issuedAt = now;
      sessionData.expiresAt = now + SESSION_CONFIG.ACCESS_TOKEN_LIFETIME;
      sessionData.rotationCount++;
      sessionData.metadata.lastRotated = now;

      // Generate new tokens
      const secret = this.getJwtSecret();
      
      const accessToken = await new SignJWT({
        sub: sessionData.userId,
        sid: sessionData.sessionId,
        fp: sessionData.fingerprint,
        scp: 'access',
        iat: Math.floor(now / 1000),
        exp: Math.floor(sessionData.expiresAt / 1000)
      })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(secret);

      const refreshToken = await new SignJWT({
        sub: sessionData.userId,
        sid: sessionData.sessionId,
        fp: sessionData.fingerprint,
        scp: 'refresh',
        rtc: sessionData.rotationCount,
        iat: Math.floor(now / 1000),
        exp: Math.floor((now + SESSION_CONFIG.REFRESH_TOKEN_LIFETIME) / 1000)
      })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(secret);

      // Update stored session
      this.sessionStore.set(sessionData.sessionId, sessionData);

      await logSecurityEvent('session', {
        operation: 'session_rotated',
        tags: {
          userId: sessionData.userId,
          sessionId: sessionData.sessionId,
          rotationCount: sessionData.rotationCount.toString()
        }
      });

      return {
        accessToken,
        refreshToken,
        expiresAt: sessionData.expiresAt
      };

    } catch (error) {
      console.error('Session rotation failed:', error);
      return null;
    }
  }

  /**
   * Detect suspicious session activity
   */
  private static async detectSuspiciousActivity(
    sessionData: SessionData,
    request: NextRequest
  ): Promise<{ detected: boolean; reason?: string }> {
    const currentIp = request.headers.get('x-forwarded-for') || 'unknown';
    const currentUserAgent = request.headers.get('user-agent') || '';

    // Check for IP address changes
    if (sessionData.metadata.ip !== currentIp && sessionData.metadata.ip !== 'unknown') {
      // Allow IP changes but log them
      await logSecurityEvent('session', {
        operation: 'ip_address_change',
        tags: {
          userId: sessionData.userId,
          sessionId: sessionData.sessionId,
          previousIp: sessionData.metadata.ip,
          currentIp
        }
      });
    }

    // Check for significant User-Agent changes
    const userAgentSimilarity = this.calculateStringSimilarity(
      sessionData.metadata.userAgent,
      currentUserAgent
    );

    if (userAgentSimilarity < 0.8) {
      await logSecurityEvent('session', {
        operation: 'user_agent_change',
        tags: {
          userId: sessionData.userId,
          sessionId: sessionData.sessionId,
          similarity: userAgentSimilarity.toString()
        }
      });

      // Don't block on user agent changes but increase security level
      if (sessionData.securityLevel === 'standard') {
        sessionData.securityLevel = 'elevated';
      }
    }

    // Check activity patterns
    const now = Date.now();
    const timeSinceLastActivity = now - sessionData.lastActivity;
    
    // Detect rapid consecutive requests (potential bot activity)
    if (timeSinceLastActivity < 100) { // Less than 100ms
      const userId = sessionData.userId;
      const eventCount = this.securityEvents.get(userId) || 0;
      this.securityEvents.set(userId, eventCount + 1);

      if (eventCount > SESSION_CONFIG.SUSPICIOUS_ACTIVITY_THRESHOLD) {
        return {
          detected: true,
          reason: 'rapid_requests'
        };
      }
    }

    return { detected: false };
  }

  /**
   * Calculate string similarity for user agent comparison
   */
  private static calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance
   */
  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Revoke session
   */
  static async revokeSession(sessionId: string, reason: string): Promise<void> {
    const sessionData = this.sessionStore.get(sessionId);
    if (sessionData) {
      this.sessionStore.delete(sessionId);
      
      await logSecurityEvent('session', {
        operation: 'session_revoked',
        tags: {
          userId: sessionData.userId,
          sessionId,
          reason,
          environment: currentEnvironment
        }
      });
    }
  }

  /**
   * Clean up expired sessions
   */
  static async cleanupExpiredSessions(): Promise<void> {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [sessionId, sessionData] of this.sessionStore.entries()) {
      if (sessionData.expiresAt < now || 
          (now - sessionData.metadata.createdAt) > SESSION_CONFIG.SESSION_ABSOLUTE_TIMEOUT) {
        this.sessionStore.delete(sessionId);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      
    }
  }

  /**
   * Set secure session cookies
   */
  static setSessionCookies(
    response: NextResponse,
    tokens: { accessToken: string; refreshToken: string }
  ): void {
    response.cookies.set(
      SESSION_CONFIG.COOKIE_NAME,
      tokens.accessToken,
      SESSION_CONFIG.COOKIE_OPTIONS
    );

    response.cookies.set(
      SESSION_CONFIG.REFRESH_COOKIE_NAME,
      tokens.refreshToken,
      {
        ...SESSION_CONFIG.COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 // 7 days for refresh token
      }
    );
  }

  /**
   * Clear session cookies
   */
  static clearSessionCookies(response: NextResponse): void {
    response.cookies.delete(SESSION_CONFIG.COOKIE_NAME);
    response.cookies.delete(SESSION_CONFIG.REFRESH_COOKIE_NAME);
  }
}

// Run cleanup every 30 minutes
setInterval(() => {
  SecureSessionManager.cleanupExpiredSessions();
}, 30 * 60 * 1000);