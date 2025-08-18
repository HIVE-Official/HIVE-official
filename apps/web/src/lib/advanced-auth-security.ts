/**
 * Advanced Authentication Security Layer
 * Implements enterprise-grade security measures for HIVE
 */

import { createHash } from 'crypto';

interface SessionFingerprint {
  userAgent: string;
  screen: string;
  timezone: number;
  language: string;
  platform: string;
  cookieEnabled: boolean;
  doNotTrack: string | null;
  hash: string;
}

interface SecurityEvent {
  type: 'login' | 'logout' | 'session_violation' | 'suspicious_activity' | 'token_refresh';
  timestamp: string;
  fingerprint: string;
  metadata: Record<string, any>;
  riskScore: number;
}

export class AdvancedAuthSecurity {
  private static instance: AdvancedAuthSecurity;
  private securityEvents: SecurityEvent[] = [];
  private readonly MAX_EVENTS = 1000;

  static getInstance(): AdvancedAuthSecurity {
    if (!AdvancedAuthSecurity.instance) {
      AdvancedAuthSecurity.instance = new AdvancedAuthSecurity();
    }
    return AdvancedAuthSecurity.instance;
  }

  /**
   * Generate browser fingerprint for session validation
   */
  generateFingerprint(): SessionFingerprint {
    if (typeof window === 'undefined') {
      return {
        userAgent: 'server',
        screen: '0x0',
        timezone: 0,
        language: 'en',
        platform: 'server',
        cookieEnabled: false,
        doNotTrack: null,
        hash: 'server-side'
      };
    }

    const fingerprint: Omit<SessionFingerprint, 'hash'> = {
      userAgent: navigator.userAgent,
      screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
      timezone: new Date().getTimezoneOffset(),
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
    };

    const hash = createHash('sha256')
      .update(JSON.stringify(fingerprint))
      .digest('hex');

    return { ...fingerprint, hash };
  }

  /**
   * Validate session against browser fingerprint
   */
  validateSessionFingerprint(storedHash: string): boolean {
    const currentFingerprint = this.generateFingerprint();
    
    // Allow some variance for normal browser changes
    if (currentFingerprint.hash === storedHash) {
      return true;
    }

    // Log suspicious activity
    this.logSecurityEvent({
      type: 'session_violation',
      timestamp: new Date().toISOString(),
      fingerprint: currentFingerprint.hash,
      metadata: { 
        storedHash, 
        currentHash: currentFingerprint.hash,
        reason: 'fingerprint_mismatch'
      },
      riskScore: 8
    });

    return false;
  }

  /**
   * Calculate session risk score based on various factors
   */
  calculateRiskScore(metadata: {
    ipChanged?: boolean;
    locationChanged?: boolean;
    deviceChanged?: boolean;
    timeGap?: number;
    failedAttempts?: number;
  }): number {
    let score = 0;

    if (metadata.ipChanged) score += 3;
    if (metadata.locationChanged) score += 4;
    if (metadata.deviceChanged) score += 5;
    if (metadata.timeGap && metadata.timeGap > 24 * 60 * 60 * 1000) score += 2;
    if (metadata.failedAttempts && metadata.failedAttempts > 3) score += 6;

    return Math.min(score, 10);
  }

  /**
   * Log security events for monitoring
   */
  logSecurityEvent(event: SecurityEvent): void {
    this.securityEvents.push(event);
    
    // Keep only recent events
    if (this.securityEvents.length > this.MAX_EVENTS) {
      this.securityEvents = this.securityEvents.slice(-this.MAX_EVENTS);
    }

    // High-risk events should be reported immediately
    if (event.riskScore >= 8) {
      this.reportHighRiskEvent(event);
    }
  }

  /**
   * Report high-risk security events
   */
  private async reportHighRiskEvent(event: SecurityEvent): Promise<void> {
    try {
      await fetch('/api/security/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Failed to report security event:', error);
    }
  }

  /**
   * Enhanced session validation with multiple security checks
   */
  async validateEnhancedSession(sessionData: any): Promise<{
    isValid: boolean;
    riskScore: number;
    reason?: string;
  }> {
    if (!sessionData) {
      return { isValid: false, riskScore: 10, reason: 'no_session' };
    }

    // Check fingerprint
    if (sessionData.fingerprint && !this.validateSessionFingerprint(sessionData.fingerprint)) {
      return { isValid: false, riskScore: 9, reason: 'fingerprint_mismatch' };
    }

    // Check session age
    const sessionAge = Date.now() - new Date(sessionData.verifiedAt).getTime();
    const maxAge = sessionData.developmentMode ? 
      7 * 24 * 60 * 60 * 1000 : // 7 days for dev
      2 * 60 * 60 * 1000; // 2 hours for production

    if (sessionAge > maxAge) {
      return { isValid: false, riskScore: 5, reason: 'session_expired' };
    }

    // Additional security checks would go here
    // (IP validation, device checks, etc.)

    return { isValid: true, riskScore: 0 };
  }

  /**
   * Secure session creation with enhanced metadata
   */
  createSecureSession(userId: string, additionalData: any = {}): any {
    const fingerprint = this.generateFingerprint();
    
    const secureSession = {
      ...additionalData,
      userId,
      verifiedAt: new Date().toISOString(),
      fingerprint: fingerprint.hash,
      securityLevel: 'enhanced',
      createdBy: 'AdvancedAuthSecurity'
    };

    this.logSecurityEvent({
      type: 'login',
      timestamp: new Date().toISOString(),
      fingerprint: fingerprint.hash,
      metadata: { userId, enhanced: true },
      riskScore: 0
    });

    return secureSession;
  }

  /**
   * Get security analytics
   */
  getSecurityAnalytics(): {
    totalEvents: number;
    highRiskEvents: number;
    recentViolations: number;
    averageRiskScore: number;
  } {
    const highRiskEvents = this.securityEvents.filter(e => e.riskScore >= 7).length;
    const recentViolations = this.securityEvents.filter(
      e => e.type === 'session_violation' && 
      Date.now() - new Date(e.timestamp).getTime() < 24 * 60 * 60 * 1000
    ).length;
    
    const averageRiskScore = this.securityEvents.length > 0 ?
      this.securityEvents.reduce((sum, e) => sum + e.riskScore, 0) / this.securityEvents.length :
      0;

    return {
      totalEvents: this.securityEvents.length,
      highRiskEvents,
      recentViolations,
      averageRiskScore: Math.round(averageRiskScore * 100) / 100
    };
  }
}