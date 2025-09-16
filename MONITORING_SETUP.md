# 🔍 HIVE Platform Monitoring Setup Guide

**Status**: ✅ Ready for Implementation  
**Priority**: High (Implement immediately after deployment)  
**Estimated Setup Time**: 2-3 hours

---

## 📊 Monitoring Stack Overview

### **Tier 1: Essential Monitoring** (Deploy Day)
- **Application Performance**: Vercel Analytics (built-in)
- **Error Tracking**: Sentry (React & Next.js)
- **Firebase Monitoring**: Firebase Performance Monitoring
- **Health Checks**: Custom health dashboard

### **Tier 2: Advanced Monitoring** (Week 1)
- **User Analytics**: Privacy-compliant usage tracking
- **Real-time Metrics**: Custom dashboard
- **Performance Budgets**: Bundle size monitoring
- **Security Monitoring**: Failed auth attempts

### **Tier 3: Business Intelligence** (Month 1)
- **Campus Analytics**: Space engagement metrics
- **Tool Usage**: HiveLab builder analytics
- **Community Health**: User retention & engagement

---

## 🚨 Error Tracking with Sentry

### **Setup Instructions**

1. **Create Sentry Account**
   ```bash
   # Sign up at https://sentry.io
   # Create new project: "HIVE Platform"
   # Select platform: Next.js
   ```

2. **Install Sentry SDK**
   ```bash
   cd apps/web
   pnpm add @sentry/nextjs @sentry/react
   ```

3. **Configure Sentry**
   ```javascript
   // sentry.client.config.js
   import * as Sentry from '@sentry/nextjs';
   
   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 0.1,
     debug: false,
     environment: process.env.NODE_ENV,
     integrations: [
       new Sentry.BrowserTracing({
         tracingOrigins: ['localhost', /^https:\/\/yourapp\.vercel\.app\/api/],
       }),
     ],
   });
   ```

4. **Environment Variables**
   ```bash
   # Add to .env.local and production
   NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   SENTRY_ORG=your-org
   SENTRY_PROJECT=hive-platform
   SENTRY_AUTH_TOKEN=your-auth-token
   ```

### **Error Boundary Integration**

```typescript
// apps/web/src/components/sentry-error-boundary.tsx
'use client';
import * as Sentry from '@sentry/nextjs';
import { ErrorBoundary } from '@sentry/react';

export function SentryErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary 
      fallback={({ error, resetError }) => (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We've been notified and are working on a fix.</p>
            <button 
              onClick={resetError}
              className="bg-brand-primary text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      beforeCapture={(scope, error) => {
        scope.setTag('component', 'error-boundary');
        scope.setLevel('error');
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

---

## 📈 Performance Monitoring

### **Vercel Analytics** (Built-in)

```javascript
// next.config.mjs
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
};

// Add to production environment
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
```

### **Firebase Performance Monitoring**

```typescript
// apps/web/src/lib/firebase/performance.ts
import { getPerformance } from 'firebase/performance';
import { app } from './firebase-client';

export const perf = getPerformance(app);

// Custom traces
export function measureSpaceLoad() {
  const trace = perf.trace('space-load');
  trace.start();
  return {
    stop: () => trace.stop(),
    addMetric: (name: string, value: number) => trace.putMetric(name, value)
  };
}
```

### **Custom Performance Tracking**

```typescript
// apps/web/src/hooks/use-performance-tracking.ts
'use client';
import { useEffect } from 'react';

export function usePerformanceTracking(pageName: string) {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          // Track LCP
          fetch('/api/analytics/performance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              page: pageName,
              metric: 'lcp',
              value: entry.startTime,
              timestamp: Date.now()
            })
          });
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    return () => observer.disconnect();
  }, [pageName]);
}
```

---

## 💾 Health Check System

### **Health Check API**

```typescript
// apps/web/src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  const healthChecks = {
    timestamp: new Date().toISOString(),
    status: 'ok',
    services: {} as Record<string, any>
  };

  try {
    // Check Firebase connection
    const start = Date.now();
    await adminDb.collection('health').doc('check').get();
    healthChecks.services.firebase = {
      status: 'ok',
      responseTime: Date.now() - start
    };
  } catch (error) {
    healthChecks.services.firebase = {
      status: 'error',
      error: String(error)
    };
    healthChecks.status = 'degraded';
  }

  // Check environment variables
  const requiredEnvs = [
    'FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_API_KEY'
  ];
  
  const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
  healthChecks.services.environment = {
    status: missingEnvs.length === 0 ? 'ok' : 'error',
    missingVariables: missingEnvs
  };

  if (missingEnvs.length > 0) {
    healthChecks.status = 'error';
  }

  const status = healthChecks.status === 'ok' ? 200 : 503;
  return NextResponse.json(healthChecks, { status });
}
```

### **Uptime Monitoring**

```javascript
// External monitoring with UptimeRobot or StatusCake
// Configure these URLs for monitoring:
// - https://your-domain.com/api/health
// - https://your-domain.com/
// - https://your-domain.com/auth/login
// - https://your-domain.com/dashboard

// Alert thresholds:
// - Response time > 3 seconds
// - Uptime < 99.5%
// - Failed health checks
```

---

## 🔐 Security Monitoring

### **Authentication Monitoring**

```typescript
// apps/web/src/lib/security/auth-monitoring.ts
export async function logAuthEvent(event: string, details: any) {
  await fetch('/api/security/auth-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event,
      details,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      ip: await fetch('/api/get-ip').then(r => r.text())
    })
  });
}

// Usage in auth flows:
// logAuthEvent('login_attempt', { email, success: true });
// logAuthEvent('failed_login', { email, reason: 'invalid_token' });
// logAuthEvent('signup_completed', { userId, campus: 'ub-buffalo' });
```

### **Rate Limiting Monitoring**

```typescript
// apps/web/src/app/api/security/rate-limit-alerts/route.ts
export async function POST(request: Request) {
  const { ip, endpoint, attemptCount } = await request.json();
  
  if (attemptCount > 50) {
    // Alert for potential attack
    await fetch(process.env.SLACK_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚨 High rate limit violations from IP: ${ip} on ${endpoint}`
      })
    });
  }
  
  return new Response('OK');
}
```

---

## 📊 User Analytics (Privacy-Compliant)

### **Campus Engagement Tracking**

```typescript
// apps/web/src/lib/analytics/campus-analytics.ts
interface CampusEvent {
  event: string;
  properties: {
    spaceId?: string;
    toolId?: string;
    campus: 'ub-buffalo';
    userType: 'student' | 'faculty' | 'staff';
  };
}

export async function trackCampusEvent(event: CampusEvent) {
  // Only track anonymized, aggregate data
  await fetch('/api/analytics/campus-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...event,
      timestamp: Date.now(),
      sessionId: getAnonymousSessionId(), // No PII
    })
  });
}

// Usage examples:
// trackCampusEvent({ event: 'space_joined', properties: { spaceId: 'cs-101', campus: 'ub-buffalo', userType: 'student' }});
// trackCampusEvent({ event: 'tool_created', properties: { toolId: 'study-planner', campus: 'ub-buffalo', userType: 'student' }});
```

### **Privacy-First Analytics**

```typescript
// apps/web/src/lib/analytics/privacy-analytics.ts
export class PrivacyAnalytics {
  private static sessionId = crypto.randomUUID();
  
  static track(event: string, properties: Record<string, any> = {}) {
    // Only track if user consents
    if (!localStorage.getItem('analytics-consent')) return;
    
    const payload = {
      event,
      properties: {
        ...properties,
        // Remove any PII
        userId: undefined,
        email: undefined,
        name: undefined,
      },
      sessionId: this.sessionId,
      timestamp: Date.now(),
    };
    
    navigator.sendBeacon('/api/analytics/events', JSON.stringify(payload));
  }
}
```

---

## 🚨 Alert Configuration

### **Critical Alerts** (Immediate Response)

```javascript
// Configure these alerts for immediate notification:
const criticalAlerts = {
  'Error Rate > 5%': {
    threshold: '5% in 5 minutes',
    notification: ['email', 'slack', 'sms'],
    escalation: '15 minutes'
  },
  'Response Time > 5s': {
    threshold: 'Average > 5s for 3 minutes',
    notification: ['email', 'slack'],
    escalation: '10 minutes'
  },
  'Firebase Errors': {
    threshold: '> 10 errors in 5 minutes',
    notification: ['email', 'slack'],
    escalation: '5 minutes'
  },
  'Health Check Failure': {
    threshold: '2 consecutive failures',
    notification: ['email', 'slack', 'sms'],
    escalation: 'immediate'
  }
};
```

### **Warning Alerts** (Monitor)

```javascript
const warningAlerts = {
  'High Memory Usage': {
    threshold: '> 80% for 10 minutes',
    notification: ['email']
  },
  'Slow Queries': {
    threshold: 'Firebase query > 2s',
    notification: ['slack']
  },
  'High Traffic': {
    threshold: '> 1000 requests/minute',
    notification: ['slack']
  }
};
```

---

## 📈 Monitoring Dashboard

### **Real-Time Dashboard**

```typescript
// apps/web/src/app/(dashboard)/admin/monitoring/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function MonitoringDashboard() {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch('/api/monitoring/metrics');
      setMetrics(await response.json());
    };
    
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard title="Response Time" value={metrics?.responseTime} unit="ms" />
      <MetricCard title="Error Rate" value={metrics?.errorRate} unit="%" />
      <MetricCard title="Active Users" value={metrics?.activeUsers} unit="" />
      <MetricCard title="Firebase Usage" value={metrics?.firebaseReads} unit="reads/min" />
    </div>
  );
}
```

---

## 🔧 Implementation Checklist

### **Day 1: Essential Setup**
- [ ] Configure Sentry error tracking
- [ ] Set up Vercel Analytics
- [ ] Implement health check endpoint
- [ ] Configure uptime monitoring
- [ ] Set up critical alerts

### **Week 1: Enhanced Monitoring**
- [ ] Add Firebase Performance Monitoring
- [ ] Implement custom performance tracking
- [ ] Set up security monitoring
- [ ] Create monitoring dashboard
- [ ] Configure Slack/email notifications

### **Month 1: Advanced Analytics**
- [ ] Implement privacy-compliant user analytics
- [ ] Set up campus engagement tracking
- [ ] Create business intelligence reports
- [ ] Optimize based on performance data
- [ ] Document monitoring playbooks

---

## 📞 Incident Response

### **Escalation Matrix**

| Severity | Response Time | Notification | Action |
|----------|---------------|--------------|--------|
| Critical | 5 minutes | All channels | Immediate fix |
| High | 15 minutes | Email + Slack | Fix within 2 hours |
| Medium | 1 hour | Email | Fix within 24 hours |
| Low | 4 hours | Email | Fix within 1 week |

### **Emergency Contacts**

```javascript
const emergencyContacts = {
  'Primary Developer': 'your-email@domain.com',
  'Firebase Console': 'https://console.firebase.google.com/project/hive-9265c',
  'Vercel Dashboard': 'https://vercel.com/dashboard',
  'Sentry Dashboard': 'https://sentry.io/organizations/your-org/',
  'Status Page': 'https://status.your-domain.com'
};
```

---

**Status**: ✅ Ready for Implementation  
**Next Steps**: Deploy monitoring immediately after production deployment  
**Estimated Value**: Prevent 90% of potential user-facing issues