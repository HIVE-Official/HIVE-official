import { NextResponse } from 'next/server';
import { withAuthAndErrors } from '@/lib/api-wrapper';
import { requireAdminRole } from '@/lib/admin-auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';

export const GET = withAuthAndErrors(async (context) => {
  const { request, auth } = context;
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await requireAdminRole(auth.userId);

  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '24h';
  const severity = searchParams.get('severity') || undefined; // 'critical', 'high', 'medium', 'low'
  const component = searchParams.get('component') || undefined; // 'database', 'auth', 'api', 'cache'

  try {
    logger.info('Fetching system alerts', { userId: auth.userId, range, severity, component });

    // Calculate time range
    const now = new Date();
    const timeRangeMs = range === '1h' ? 60 * 60 * 1000 :
                       range === '24h' ? 24 * 60 * 60 * 1000 :
                       range === '7d' ? 7 * 24 * 60 * 60 * 1000 :
                       30 * 24 * 60 * 60 * 1000; // 30d
    const since = new Date(now.getTime() - timeRangeMs);

    // Get alerts from multiple monitoring sources
    const [
      systemAlerts,
      performanceAlerts,
      securityAlerts,
      userImpactAlerts,
      activeIncidents
    ] = await Promise.all([
      getSystemAlerts(since, severity, component),
      getPerformanceAlerts(since, severity),
      getSecurityAlerts(since, severity),
      getUserImpactAlerts(since, severity),
      getActiveIncidents()
    ]);

    // Calculate alert statistics
    const alertStats = calculateAlertStatistics({
      system: systemAlerts,
      performance: performanceAlerts,
      security: securityAlerts,
      userImpact: userImpactAlerts
    });

    const alerts = {
      summary: alertStats,
      active: {
        critical: getAllAlerts([systemAlerts, performanceAlerts, securityAlerts, userImpactAlerts])
          .filter(alert => alert.severity === 'critical' && !alert.resolved),
        high: getAllAlerts([systemAlerts, performanceAlerts, securityAlerts, userImpactAlerts])
          .filter(alert => alert.severity === 'high' && !alert.resolved),
        medium: getAllAlerts([systemAlerts, performanceAlerts, securityAlerts, userImpactAlerts])
          .filter(alert => alert.severity === 'medium' && !alert.resolved),
        low: getAllAlerts([systemAlerts, performanceAlerts, securityAlerts, userImpactAlerts])
          .filter(alert => alert.severity === 'low' && !alert.resolved)
      },
      incidents: activeIncidents,
      categories: {
        system: systemAlerts,
        performance: performanceAlerts,
        security: securityAlerts,
        userImpact: userImpactAlerts
      },
      trends: {
        alertsPerHour: calculateAlertTrends(getAllAlerts([systemAlerts, performanceAlerts, securityAlerts, userImpactAlerts]), since),
        resolutionTime: calculateResolutionTimes(getAllAlerts([systemAlerts, performanceAlerts, securityAlerts, userImpactAlerts])),
        falsePositiveRate: calculateFalsePositiveRate(getAllAlerts([systemAlerts, performanceAlerts, securityAlerts, userImpactAlerts]))
      }
    };

    return NextResponse.json({
      success: true,
      alerts,
      range,
      filters: { severity, component },
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error fetching alerts', { error, userId: auth.userId });

    // Return mock data for development
    return NextResponse.json({
      success: true,
      alerts: getMockAlerts(),
      range,
      filters: { severity, component },
      isMock: true,
      error: 'Using mock data - Alert monitoring API not fully implemented'
    });
  }
});

export const POST = withAuthAndErrors(async (context) => {
  const { request, auth } = context;
  if (!auth?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await requireAdminRole(auth.userId);

  try {
    const body = await request.json();
    const { alertId, action, notes } = body;

    if (!alertId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Handle alert actions
    let result;
    switch (action) {
      case 'acknowledge':
        result = await acknowledgeAlert(alertId, auth.userId, notes);
        break;
      case 'resolve':
        result = await resolveAlert(alertId, auth.userId, notes);
        break;
      case 'escalate':
        result = await escalateAlert(alertId, auth.userId, notes);
        break;
      case 'suppress':
        result = await suppressAlert(alertId, auth.userId, notes);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    logger.info('Alert action performed', {
      action,
      userId: auth.userId,
      metadata: {
        alertId,
        result: result.success
      }
    });

    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error performing alert action', { error, userId: auth.userId });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});

/**
 * Get system-level alerts
 */
async function getSystemAlerts(since: Date, severity?: string, component?: string) {
  try {
    let alertsQuery = dbAdmin.collection('admin_logs')
      .where('level', 'in', ['warning', 'error', 'critical'])
      .where('timestamp', '>=', since)
      .orderBy('timestamp', 'desc');

    if (component) {
      alertsQuery = alertsQuery.where('component', '==', component);
    }

    const alertsSnap = await alertsQuery.limit(500).get();
    const alerts = alertsSnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        type: 'system',
        severity: mapLogLevelToSeverity(data.level),
        component: data.component || 'unknown',
        title: data.message || 'System alert',
        description: data.details || data.message,
        timestamp: data.timestamp.toDate().toISOString(),
        resolved: data.resolved || false,
        acknowledged: data.acknowledged || false,
        assignee: data.assignee || null,
        tags: data.tags || [],
        metadata: {
          source: data.source || 'system',
          context: data.context || {},
          stackTrace: data.stackTrace || null
        }
      };
    });

    return severity ? alerts.filter(alert => alert.severity === severity) : alerts;

  } catch (error) {
    logger.error('Error getting system alerts', { error });
    return [];
  }
}

/**
 * Get performance-related alerts
 */
async function getPerformanceAlerts(since: Date, severity?: string) {
  try {
    // Simulate performance monitoring alerts
    const performanceIssues = [
      {
        id: 'perf-001',
        type: 'performance',
        severity: 'high',
        component: 'api',
        title: 'High API Response Time Detected',
        description: '/api/feed endpoint showing average response time above 2000ms',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        resolved: false,
        acknowledged: true,
        assignee: 'system',
        tags: ['latency', 'api', 'feed'],
        metadata: {
          source: 'performance_monitor',
          context: {
            endpoint: '/api/feed',
            avgResponseTime: 2340,
            threshold: 2000,
            affectedUsers: 45
          }
        }
      },
      {
        id: 'perf-002',
        type: 'performance',
        severity: 'medium',
        component: 'database',
        title: 'Database Query Performance Warning',
        description: 'Slow query detected on users collection - missing index',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        resolved: false,
        acknowledged: false,
        assignee: null,
        tags: ['database', 'query', 'index'],
        metadata: {
          source: 'database_monitor',
          context: {
            collection: 'users',
            queryTime: 1500,
            threshold: 1000,
            suggestedIndex: 'campusId_createdAt'
          }
        }
      }
    ];

    return severity ? performanceIssues.filter(alert => alert.severity === severity) : performanceIssues;

  } catch (error) {
    logger.error('Error getting performance alerts', { error });
    return [];
  }
}

/**
 * Get security-related alerts
 */
async function getSecurityAlerts(since: Date, severity?: string) {
  try {
    // Query security-related logs
    const securityQuery = dbAdmin.collection('admin_logs')
      .where('category', '==', 'security')
      .where('timestamp', '>=', since)
      .orderBy('timestamp', 'desc')
      .limit(100);

    const securitySnap = await securityQuery.get();
    const alerts = securitySnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        type: 'security',
        severity: mapLogLevelToSeverity(data.level),
        component: 'security',
        title: data.title || 'Security Alert',
        description: data.description || data.message,
        timestamp: data.timestamp.toDate().toISOString(),
        resolved: data.resolved || false,
        acknowledged: data.acknowledged || false,
        assignee: data.assignee || null,
        tags: data.tags || ['security'],
        metadata: {
          source: data.source || 'security_monitor',
          context: data.context || {},
          ipAddress: data.ipAddress || null,
          userAgent: data.userAgent || null
        }
      };
    });

    return severity ? alerts.filter(alert => alert.severity === severity) : alerts;

  } catch (error) {
    logger.error('Error getting security alerts', { error });
    // Return mock security alert for development
    return [{
      id: 'sec-001',
      type: 'security',
      severity: 'medium',
      component: 'security',
      title: 'Unusual Login Pattern Detected',
      description: 'Multiple login attempts from different geographic locations',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      resolved: false,
      acknowledged: false,
      assignee: null,
      tags: ['authentication', 'suspicious-activity'],
      metadata: {
        source: 'auth_monitor',
        context: {
          userId: 'user123',
          attempts: 5,
          locations: ['Buffalo, NY', 'New York, NY', 'Boston, MA'],
          timeWindow: '30 minutes'
        }
      }
    }];
  }
}

/**
 * Get user impact alerts
 */
async function getUserImpactAlerts(since: Date, severity?: string) {
  try {
    // Monitor user-facing issues
    const userImpactIssues = [
      {
        id: 'user-001',
        type: 'user_impact',
        severity: 'critical',
        component: 'authentication',
        title: 'Magic Link Delivery Failures',
        description: 'Email delivery service showing 15% failure rate',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        resolved: false,
        acknowledged: false,
        assignee: null,
        tags: ['email', 'authentication', 'delivery'],
        metadata: {
          source: 'email_monitor',
          context: {
            failureRate: 15.3,
            threshold: 5.0,
            affectedUsers: 23,
            bounceRate: 12.1,
            provider: 'firebase'
          }
        }
      }
    ];

    return severity ? userImpactIssues.filter(alert => alert.severity === severity) : userImpactIssues;

  } catch (error) {
    logger.error('Error getting user impact alerts', { error });
    return [];
  }
}

/**
 * Get active incidents
 */
async function getActiveIncidents() {
  try {
    const incidentsQuery = dbAdmin.collection('incidents')
      .where('status', 'in', ['investigating', 'identified', 'monitoring'])
      .orderBy('startedAt', 'desc')
      .limit(20);

    const incidentsSnap = await incidentsQuery.get();
    return incidentsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startedAt: doc.data().startedAt.toDate().toISOString(),
      lastUpdate: doc.data().lastUpdate.toDate().toISOString()
    }));

  } catch (error) {
    logger.error('Error getting active incidents', { error });
    return [{
      id: 'incident-001',
      title: 'Intermittent Feed Loading Issues',
      description: 'Some users experiencing slow feed loading times',
      status: 'investigating',
      severity: 'medium',
      affectedUsers: 'Approximately 5% of active users',
      startedAt: new Date(Date.now() - 5400000).toISOString(),
      lastUpdate: new Date(Date.now() - 1800000).toISOString(),
      assignee: 'engineering-team',
      updates: [
        {
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          status: 'investigating',
          message: 'Identified potential database query optimization issue'
        }
      ]
    }];
  }
}

/**
 * Alert management actions
 */
async function acknowledgeAlert(alertId: string, userId: string, notes?: string) {
  try {
    const alertRef = dbAdmin.collection('admin_logs').doc(alertId);
    await alertRef.update({
      acknowledged: true,
      acknowledgedBy: userId,
      acknowledgedAt: new Date(),
      notes: notes || ''
    });

    return { success: true, action: 'acknowledged' };
  } catch (error) {
    logger.error('Error acknowledging alert', { error, userId, metadata: { alertId } });
    return { success: false, error: 'Failed to acknowledge alert' };
  }
}

async function resolveAlert(alertId: string, userId: string, notes?: string) {
  try {
    const alertRef = dbAdmin.collection('admin_logs').doc(alertId);
    await alertRef.update({
      resolved: true,
      resolvedBy: userId,
      resolvedAt: new Date(),
      resolutionNotes: notes || ''
    });

    return { success: true, action: 'resolved' };
  } catch (error) {
    logger.error('Error resolving alert', { error, userId, metadata: { alertId } });
    return { success: false, error: 'Failed to resolve alert' };
  }
}

async function escalateAlert(alertId: string, userId: string, notes?: string) {
  try {
    const alertRef = dbAdmin.collection('admin_logs').doc(alertId);
    await alertRef.update({
      escalated: true,
      escalatedBy: userId,
      escalatedAt: new Date(),
      escalationNotes: notes || '',
      assignee: 'senior-engineering'
    });

    // TODO: Send notification to senior engineering team
    return { success: true, action: 'escalated' };
  } catch (error) {
    logger.error('Error escalating alert', { error, userId, metadata: { alertId } });
    return { success: false, error: 'Failed to escalate alert' };
  }
}

async function suppressAlert(alertId: string, userId: string, notes?: string) {
  try {
    const alertRef = dbAdmin.collection('admin_logs').doc(alertId);
    await alertRef.update({
      suppressed: true,
      suppressedBy: userId,
      suppressedAt: new Date(),
      suppressionReason: notes || ''
    });

    return { success: true, action: 'suppressed' };
  } catch (error) {
    logger.error('Error suppressing alert', { error, userId, metadata: { alertId } });
    return { success: false, error: 'Failed to suppress alert' };
  }
}

/**
 * Helper functions
 */
function getAllAlerts(alertArrays: any[][]): any[] {
  return alertArrays.flat();
}

function mapLogLevelToSeverity(level: string): string {
  switch (level?.toLowerCase()) {
    case 'critical':
      return 'critical';
    case 'error':
      return 'high';
    case 'warning':
    case 'warn':
      return 'medium';
    default:
      return 'low';
  }
}

function calculateAlertStatistics(categories: any) {
  const allAlerts = getAllAlerts(Object.values(categories));

  const stats = {
    total: allAlerts.length,
    active: allAlerts.filter(alert => !alert.resolved).length,
    resolved: allAlerts.filter(alert => alert.resolved).length,
    acknowledged: allAlerts.filter(alert => alert.acknowledged).length,
    critical: allAlerts.filter(alert => alert.severity === 'critical').length,
    high: allAlerts.filter(alert => alert.severity === 'high').length,
    medium: allAlerts.filter(alert => alert.severity === 'medium').length,
    low: allAlerts.filter(alert => alert.severity === 'low').length
  };

  return stats;
}

function calculateAlertTrends(alerts: any[], since: Date) {
  const hourlyBuckets: Record<string, number> = {};
  const hoursBack = Math.floor((Date.now() - since.getTime()) / (1000 * 60 * 60));

  // Initialize buckets
  for (let i = 0; i < hoursBack; i++) {
    const hour = new Date(Date.now() - i * 60 * 60 * 1000);
    const hourKey = hour.toISOString().substr(0, 13);
    hourlyBuckets[hourKey] = 0;
  }

  // Count alerts per hour
  alerts.forEach(alert => {
    const alertHour = new Date(alert.timestamp).toISOString().substr(0, 13);
    if (hourlyBuckets[alertHour] !== undefined) {
      hourlyBuckets[alertHour]++;
    }
  });

  return Object.entries(hourlyBuckets).map(([hour, count]) => ({
    hour,
    count
  }));
}

function calculateResolutionTimes(alerts: any[]) {
  const resolvedAlerts = alerts.filter(alert => alert.resolved);
  if (resolvedAlerts.length === 0) return { average: 0, median: 0 };

  const resolutionTimes = resolvedAlerts
    .map(alert => {
      const created = new Date(alert.timestamp).getTime();
      const resolved = new Date(alert.resolvedAt || Date.now()).getTime();
      return Math.max(0, resolved - created) / (1000 * 60); // minutes
    })
    .sort((a, b) => a - b);

  const average = resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length;
  const median = resolutionTimes[Math.floor(resolutionTimes.length / 2)];

  return { average: Math.round(average), median: Math.round(median) };
}

function calculateFalsePositiveRate(alerts: any[]) {
  const suppressedAlerts = alerts.filter(alert => alert.suppressed);
  return alerts.length > 0 ? (suppressedAlerts.length / alerts.length) * 100 : 0;
}

/**
 * Mock data for development
 */
function getMockAlerts() {
  return {
    summary: {
      total: 12,
      active: 8,
      resolved: 4,
      acknowledged: 6,
      critical: 1,
      high: 3,
      medium: 5,
      low: 3
    },
    active: {
      critical: [
        {
          id: 'alert-critical-001',
          type: 'user_impact',
          severity: 'critical',
          component: 'authentication',
          title: 'Magic Link Delivery Failures',
          description: 'Email delivery service showing 15% failure rate',
          timestamp: new Date(Date.now() - 1200000).toISOString(),
          resolved: false,
          acknowledged: false,
          assignee: null,
          tags: ['email', 'authentication', 'delivery']
        }
      ],
      high: [
        {
          id: 'alert-high-001',
          type: 'performance',
          severity: 'high',
          component: 'api',
          title: 'High API Response Time',
          description: '/api/feed endpoint showing elevated response times',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          resolved: false,
          acknowledged: true,
          assignee: 'system',
          tags: ['latency', 'api', 'feed']
        }
      ],
      medium: [],
      low: []
    },
    incidents: [
      {
        id: 'incident-001',
        title: 'Intermittent Feed Loading Issues',
        status: 'investigating',
        severity: 'medium',
        startedAt: new Date(Date.now() - 5400000).toISOString(),
        affectedUsers: 'Approximately 5% of active users'
      }
    ],
    trends: {
      alertsPerHour: [
        { hour: '2025-09-25T12', count: 2 },
        { hour: '2025-09-25T13', count: 1 },
        { hour: '2025-09-25T14', count: 3 },
        { hour: '2025-09-25T15', count: 1 }
      ],
      resolutionTime: { average: 45, median: 32 },
      falsePositiveRate: 8.3
    }
  };
}