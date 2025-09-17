import { logger  } from '@/types/core';

// 🔒 SECURITY MONITORING AND ALERTING

interface SecurityEvent {
  type: 'rate_limit' | 'auth_failure' | 'invalid_input' | 'suspicious_activity' | 'admin_access'
  severity: 'low' | 'medium' | 'high' | 'critical'
  userId?: string
  ip?: string
  userAgent?: string
  endpoint?: string
  data?: Record<string, any>
  timestamp: Date
}

interface SecurityMetrics {
  rateLimitViolations: number
  authFailures: number
  invalidInputAttempts: number
  suspiciousActivities: number
  lastReset: Date
}

class SecurityMonitor {
  private metrics: SecurityMetrics = {
    rateLimitViolations: 0,
    authFailures: 0,
    invalidInputAttempts: 0,
    suspiciousActivities: 0,
    lastReset: new Date()
  }

  private suspiciousIPs = new Set<string>()
  private blockedIPs = new Set<string>()

  // Log security events
  logSecurityEvent(event: SecurityEvent) {
    const logData = {
      ...event,
      environment: process.env.NODE_ENV,
      service: 'hive-web'
    }

    // Log based on severity
    switch (event.severity) {
      case 'critical':
        logger.error(`🚨 CRITICAL SECURITY EVENT: ${event.type}`, { error: String(logData) })
        void this.sendAlert(event)
        break
      case 'high':
        logger.error(`🔴 HIGH SECURITY EVENT: ${event.type}`, { error: String(logData) })
        void this.sendAlert(event)
        break
      case 'medium':
        logger.warn(`🟡 MEDIUM SECURITY EVENT: ${event.type}`, logData)
        break
      case 'low':
        logger.info(`🟢 LOW SECURITY EVENT: ${event.type}`, logData)
        break
    }

    // Update metrics
    this.updateMetrics(event)
  }

  // Update security metrics
  private updateMetrics(event: SecurityEvent) {
    switch (event.type) {
      case 'rate_limit':
        this.metrics.rateLimitViolations++
        break
      case 'auth_failure':
        this.metrics.authFailures++
        break
      case 'invalid_input':
        this.metrics.invalidInputAttempts++
        break
      case 'suspicious_activity':
        this.metrics.suspiciousActivities++
        if (event.ip) {
          this.markSuspiciousIP(event.ip)
        }
        break
    }
  }

  // Mark IP as suspicious
  private markSuspiciousIP(ip: string) {
    this.suspiciousIPs.add(ip)
    
    // Auto-block after threshold
    if (this.getSuspiciousActivityCount(ip) > 10) {
      this.blockIP(ip)
    }
  }

  // Block IP address
  private blockIP(ip: string) {
    this.blockedIPs.add(ip)
    this.logSecurityEvent({
      type: 'suspicious_activity',
      severity: 'high',
      ip,
      data: { action: 'ip_blocked', reason: 'excessive_violations' },
      timestamp: new Date()
    })
  }

  // Check if IP is blocked
  isBlocked(ip: string): boolean {
    return this.blockedIPs.has(ip)
  }

  // Get suspicious activity count for IP
  private getSuspiciousActivityCount(ip: string): number {
    // In production, this would query a database
    // For now, we'll use a simple counter
    return this.suspiciousIPs.has(ip) ? 5 : 0
  }

  // Send security alerts (implement based on your alerting system)
  private async sendAlert(event: SecurityEvent) {
    // In production, integrate with:
    // - Slack/Discord webhooks
    // - Email alerts
    // - PagerDuty
    // - Security incident management systems
    
    if (event.severity === 'critical') {
      logger.error('🚨 CRITICAL SECURITY ALERT - IMMEDIATE ATTENTION REQUIRED', {
        event,
        instructions: 'Check logs immediately and take action if needed'
      })
      
      // 🔒 SECURITY: In production, you would implement actual alerting here
      // Example: await this.sendSlackAlert(event)
      // Example: await this.sendEmailAlert(event)
    }
    
    // Auto-escalate if we see multiple high-severity events
    if (event.severity === 'high') {
      this.checkForSecurityIncident()
    }
  }
  
  // Check if multiple security events indicate an incident
  private checkForSecurityIncident() {
    const recentHighSeverity = this.metrics.authFailures + this.metrics.suspiciousActivities
    
    if (recentHighSeverity > 20) {
      this.logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'critical',
        data: { 
          incident_type: 'potential_attack',
          auth_failures: this.metrics.authFailures,
          suspicious_activities: this.metrics.suspiciousActivities,
          recommendation: 'Consider enabling additional security measures'
        },
        timestamp: new Date()
      })
    }
  }

  // Get current metrics
  getMetrics(): SecurityMetrics & { suspiciousIPs: number; blockedIPs: number } {
    return {
      ...this.metrics,
      suspiciousIPs: this.suspiciousIPs.size,
      blockedIPs: this.blockedIPs.size
    }
  }

  // Reset metrics (daily reset)
  resetMetrics() {
    this.metrics = {
      rateLimitViolations: 0,
      authFailures: 0,
      invalidInputAttempts: 0,
      suspiciousActivities: 0,
      lastReset: new Date()
    }
  }
}

// Global security monitor instance
export const securityMonitor = new SecurityMonitor()

// Helper functions for common security events
export const securityEvents = {
  rateLimitExceeded: (ip: string, endpoint: string, userId?: string) => {
    securityMonitor.logSecurityEvent({
      type: 'rate_limit',
      severity: 'medium',
      ip,
      userId,
      endpoint,
      timestamp: new Date()
    })
  },

  authFailure: (ip: string, email?: string, reason?: string) => {
    securityMonitor.logSecurityEvent({
      type: 'auth_failure',
      severity: 'high',
      ip,
      data: { email: email?.substring(0, 3) + '***', reason },
      timestamp: new Date()
    })
  },

  invalidInput: (ip: string, endpoint: string, userId?: string, inputType?: string) => {
    securityMonitor.logSecurityEvent({
      type: 'invalid_input',
      severity: 'medium',
      ip,
      userId,
      endpoint,
      data: { inputType },
      timestamp: new Date()
    })
  },

  suspiciousActivity: (ip: string, activity: string, userId?: string, data?: any) => {
    securityMonitor.logSecurityEvent({
      type: 'suspicious_activity',
      severity: 'high',
      ip,
      userId,
      data: { activity, ...data },
      timestamp: new Date()
    })
  },

  adminAccess: (userId: string, ip: string, action: string, resource?: string) => {
    securityMonitor.logSecurityEvent({
      type: 'admin_access',
      severity: 'medium',
      userId,
      ip,
      data: { action, resource },
      timestamp: new Date()
    })
  }
}

// Middleware helper to extract request info
export function extractRequestInfo(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  return { ip, userAgent }
}

// Check for suspicious patterns in requests
export function detectSuspiciousActivity(request: Request, body?: any): string[] {
  const suspicious: string[] = []
  const { userAgent } = extractRequestInfo(request)
  
  // Check for bot user agents
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python/i, /perl/i
  ]
  
  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    suspicious.push('bot_user_agent')
  }
  
  // Check for rapid-fire requests (this would be implemented with proper tracking)
  // For now, we'll just check user agent
  if (userAgent === 'unknown' || userAgent.length < 10) {
    suspicious.push('suspicious_user_agent')
  }
  
  // Check request body for suspicious patterns
  if (body) {
    const bodyStr = JSON.stringify(body)
    
    // SQL injection patterns
    if (/['";\\]|union|select|drop|delete|insert|update/i.test(bodyStr)) {
      suspicious.push('sql_injection_attempt')
    }
    
    // XSS patterns
    if (/<script|javascript:|on\w+=/i.test(bodyStr)) {
      suspicious.push('xss_attempt')
    }
    
    // Path traversal
    if (/\.\./g.test(bodyStr)) {
      suspicious.push('path_traversal_attempt')
    }
  }
  
  return suspicious
}

// Security headers for responses
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }
}