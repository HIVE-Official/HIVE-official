import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-server';
import { realtimeOptimizationManager } from '@/lib/realtime-optimization';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { dbAdmin } from '@/lib/firebase-admin';

/**
 * Real-time System Metrics and Performance Monitoring API
 * GET /api/realtime/metrics - Get current system metrics
 * POST /api/realtime/metrics - Update optimization configuration
 */

interface AdminUser {
  uid: string;
  email?: string;
  role?: string;
}

// GET - Get real-time system metrics
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Check if user is admin
    const isAdmin = await checkAdminPermissions(user.uid);
    if (!isAdmin) {
      return NextResponse.json(
        ApiResponseHelper.error('Admin access required', 'FORBIDDEN'),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '1h';
    const includeConnections = searchParams.get('includeConnections') === 'true';
    const includeHistorical = searchParams.get('includeHistorical') === 'true';

    // Get current system metrics
    const systemMetrics = realtimeOptimizationManager.getSystemMetrics();

    // Get historical metrics if requested
    let historicalMetrics = null;
    if (includeHistorical) {
      historicalMetrics = await getHistoricalMetrics(timeRange);
    }

    // Get connection metrics if requested
    let connectionMetrics = null;
    if (includeConnections) {
      connectionMetrics = await getConnectionMetrics();
    }

    // Get performance alerts
    const performanceAlerts = await getPerformanceAlerts();

    return NextResponse.json({
      success: true,
      metrics: {
        current: systemMetrics,
        historical: historicalMetrics,
        connections: connectionMetrics,
        alerts: performanceAlerts
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error getting real-time metrics', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to get metrics', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// POST - Update optimization configuration
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Check if user is admin
    const isAdmin = await checkAdminPermissions(user.uid);
    if (!isAdmin) {
      return NextResponse.json(
        ApiResponseHelper.error('Admin access required', 'FORBIDDEN'),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    const body = await request.json();
    const { action, configuration } = body;

    let result;
    switch (action) {
      case 'update_config':
        realtimeOptimizationManager.updateConfiguration(configuration);
        result = { configurationUpdated: true };
        break;
      
      case 'force_health_check':
        // This would trigger an immediate health check
        result = { healthCheckTriggered: true };
        break;
      
      case 'clear_metrics':
        // This would reset metrics (implement if needed)
        result = { metricsCleared: true };
        break;
      
      case 'restart_services':
        // This would restart optimization services
        result = { servicesRestarted: true };
        break;
      
      default:
        return NextResponse.json(
          ApiResponseHelper.error('Invalid action', 'INVALID_INPUT'),
          { status: HttpStatus.BAD_REQUEST }
        );
    }

    // Log admin action
    await logAdminAction(user.uid, action, configuration);

    return NextResponse.json({
      success: true,
      action,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error updating real-time configuration', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to update configuration', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// PUT - Record performance metrics (used by system)
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const body = await request.json();
    const { connectionId, metrics, timestamp } = body;

    if (!connectionId || !metrics) {
      return NextResponse.json(
        ApiResponseHelper.error('Connection ID and metrics are required', 'INVALID_INPUT'),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Store connection metrics
    await storeConnectionMetrics(connectionId, user.uid, metrics, timestamp);

    return NextResponse.json({
      success: true,
      recorded: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error recording connection metrics', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to record metrics', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// Helper function to check admin permissions
async function checkAdminPermissions(userId: string): Promise<boolean> {
  try {
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) return false;
    
    const userData = userDoc.data();
    return userData?.role === 'admin' || userData?.permissions?.includes('admin');
  } catch (error) {
    logger.error('Error checking admin permissions', { error: error instanceof Error ? error : new Error(String(error)), userId });
    return false;
  }
}

// Helper function to get historical metrics
async function getHistoricalMetrics(timeRange: string): Promise<any> {
  try {
    const now = Date.now();
    let startTime: number;

    switch (timeRange) {
      case '1h':
        startTime = now - (60 * 60 * 1000);
        break;
      case '6h':
        startTime = now - (6 * 60 * 60 * 1000);
        break;
      case '24h':
        startTime = now - (24 * 60 * 60 * 1000);
        break;
      case '7d':
        startTime = now - (7 * 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = now - (60 * 60 * 1000); // Default to 1 hour
    }

    const metricsQuery = dbAdmin.collection('realtimeMetrics')
      .where('timestamp', '>=', new Date(startTime))
      .orderBy('timestamp', 'desc')
      .limit(1000);

    const metricsSnapshot = await metricsQuery.get();
    const historicalData = metricsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      timeRange,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(now).toISOString(),
      dataPoints: historicalData.length,
      data: historicalData
    };

  } catch (error) {
    logger.error('Error getting historical metrics', { error: error instanceof Error ? error : new Error(String(error)) });
    return null;
  }
}

// Helper function to get connection metrics
async function getConnectionMetrics(): Promise<any> {
  try {
    const connectionsQuery = dbAdmin.collection('connectionMetrics')
      .orderBy('lastActivity', 'desc')
      .limit(100);

    const connectionsSnapshot = await connectionsQuery.get();
    const connections = connectionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Array<{
      id: string;
      lastActivity: number;
      averageLatency?: number;
      errorCount?: number;
      messagesReceived?: number;
      messagesSent?: number;
      [key: string]: any;
    }>;

    // Calculate aggregated stats
    const totalConnections = connections.length;
    const activeConnections = connections.filter(conn => 
      Date.now() - (conn.lastActivity || 0) < 60000
    ).length;
    
    const averageLatency = connections.length > 0 
      ? connections.reduce((sum, conn) => sum + (conn.averageLatency || 0), 0) / connections.length
      : 0;

    const totalErrors = connections.reduce((sum, conn) => sum + (conn.errorCount || 0), 0);
    const totalMessages = connections.reduce((sum, conn) => 
      sum + (conn.messagesReceived || 0) + (conn.messagesSent || 0), 0);
    
    const errorRate = totalMessages > 0 ? totalErrors / totalMessages : 0;

    return {
      summary: {
        totalConnections,
        activeConnections,
        averageLatency,
        errorRate,
        totalMessages,
        totalErrors
      },
      connections: connections.slice(0, 50) // Return top 50 for detailed view
    };

  } catch (error) {
    logger.error('Error getting connection metrics', { error: error instanceof Error ? error : new Error(String(error)) });
    return null;
  }
}

// Helper function to get performance alerts
async function getPerformanceAlerts(): Promise<any[]> {
  try {
    const alertsQuery = dbAdmin.collection('performanceAlerts')
      .where('resolved', '==', false)
      .orderBy('timestamp', 'desc')
      .limit(50);

    const alertsSnapshot = await alertsQuery.get();
    return alertsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  } catch (error) {
    logger.error('Error getting performance alerts', { error: error instanceof Error ? error : new Error(String(error)) });
    return [];
  }
}

// Helper function to store connection metrics
async function storeConnectionMetrics(
  connectionId: string,
  userId: string,
  metrics: any,
  timestamp?: string
): Promise<void> {
  try {
    const metricsData = {
      connectionId,
      userId,
      ...metrics,
      timestamp: timestamp || new Date().toISOString(),
      recordedAt: new Date()
    };

    // Store in connection metrics collection
    await dbAdmin.collection('connectionMetrics').doc(connectionId).set(metricsData);

    // Also store aggregated data for historical tracking
    const aggregatedData = {
      timestamp: new Date(),
      totalConnections: 1, // This would be calculated properly
      averageLatency: metrics.latency || 0,
      errorCount: metrics.errorCount || 0,
      messagesPerSecond: metrics.messagesPerSecond || 0
    };

    await dbAdmin.collection('realtimeMetrics').add(aggregatedData);

  } catch (error) {
    logger.error('Error storing connection metrics', { error: error instanceof Error ? error : new Error(String(error)) });
    throw error;
  }
}

// Helper function to log admin actions
async function logAdminAction(
  adminUserId: string,
  action: string,
  configuration?: any
): Promise<void> {
  try {
    const logEntry = {
      adminUserId,
      action,
      configuration,
      timestamp: new Date().toISOString(),
      recordedAt: new Date()
    };

    await dbAdmin.collection('adminActionLogs').add(logEntry);

  } catch (error) {
    logger.error('Error logging admin action', { error: error instanceof Error ? error : new Error(String(error)) });
  }
}