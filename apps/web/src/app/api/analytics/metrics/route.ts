import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getAuthTokenFromRequest } from '@/lib/auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Validation schema for metrics
const MetricSchema = z.object({
  id: z.string(),
  timestamp: z.coerce.date(),
  type: z.string(),
  value: z.number(),
  unit: z.string(),
  labels: z.record(z.string()),
  userId: z.string().optional(),
  spaceId: z.string().optional(),
  endpoint: z.string().optional(),
  component: z.string().optional() });

const MetricsBatchSchema = z.object({
  metrics: z.array(MetricSchema) });

const db = dbAdmin;

// POST /api/analytics/metrics - Store performance metrics
export async function POST(request: NextRequest) {
  try {
    // Get auth token (optional for metrics)
    const token = getAuthTokenFromRequest(request);
    let userId: string | null = null;
    
    if (token) {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (error) {
        // Continue without user ID if token is invalid
        logger.warn('Invalid token in metrics request', { data: error, endpoint: '/api/analytics/metrics' });
      }
    }

    const body = await request.json();
    const { metrics } = MetricsBatchSchema.parse(body);

    // Filter and process metrics
    const processedMetrics = metrics.map(metric => ({
      ...metric,
      userId: metric.userId || userId, // Use authenticated user ID if not provided
      timestamp: new Date(metric.timestamp),
      receivedAt: new Date(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: getClientIp(request),
    }));

    // Store metrics in batches
    const batch = dbAdmin.batch();
    const metricsRef = dbAdmin.collection('analytics_metrics');

    for (const metric of processedMetrics) {
      const docRef = metricsRef.doc();
      batch.set(docRef, metric);
    }

    await batch.commit();

    // Aggregate metrics for real-time dashboards
    await aggregateMetrics(processedMetrics);

    return NextResponse.json({
      success: true,
      processed: processedMetrics.length,
      timestamp: new Date().toISOString() });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid metrics data',
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error storing metrics', { error: error, endpoint: '/api/analytics/metrics' });
    return NextResponse.json(ApiResponseHelper.error("Failed to store metrics", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET /api/analytics/metrics - Retrieve metrics with filters
export async function GET(request: NextRequest) {
  try {
    // Require authentication for reading metrics
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const userId = searchParams.get('userId');
    const spaceId = searchParams.get('spaceId');
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');
    const limit = parseInt(searchParams.get('limit') || '100');
    const aggregate = searchParams.get('aggregate') === 'true';

    // Build query
    let query = dbAdmin.collection('analytics_metrics').orderBy('timestamp', 'desc');

    // Apply filters
    if (type) {
      query = query.where('type', '==', type);
    }

    if (userId) {
      // Users can only access their own metrics unless they're admin
      if (userId !== decodedToken.uid && !isAdmin(decodedToken)) {
        return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
      }
      query = query.where('userId', '==', userId);
    } else if (!isAdmin(decodedToken)) {
      // Non-admin users can only see their own metrics
      query = query.where('userId', '==', decodedToken.uid);
    }

    if (spaceId) {
      query = query.where('spaceId', '==', spaceId);
    }

    if (startTime) {
      query = query.where('timestamp', '>=', new Date(startTime));
    }

    if (endTime) {
      query = query.where('timestamp', '<=', new Date(endTime));
    }

    query = query.limit(limit);

    const snapshot = await query.get();
    const metrics = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.()?.toISOString(),
      receivedAt: doc.data().receivedAt?.toDate?.()?.toISOString(),
    }));

    const response: any = { metrics };

    // Add aggregation if requested
    if (aggregate) {
      response.aggregation = aggregateMetricsData(metrics);
    }

    return NextResponse.json(response);

  } catch (error) {
    logger.error('Error retrieving metrics', { error: error, endpoint: '/api/analytics/metrics' });
    return NextResponse.json(ApiResponseHelper.error("Failed to retrieve metrics", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to get client IP
function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const xRealIp = request.headers.get('x-real-ip');
  
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  
  if (xRealIp) {
    return xRealIp;
  }
  
  return 'unknown';
}

// Helper function to check if user is admin
function isAdmin(decodedToken: any): boolean {
  return decodedToken.customClaims?.role === 'admin' || decodedToken.customClaims?.admin === true;
}

// Helper function to aggregate metrics for real-time dashboards
async function aggregateMetrics(metrics: any[]): Promise<void> {
  try {
    const aggregatesRef = dbAdmin.collection('analytics_aggregates');
    const now = new Date();
    const hourlyKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}`;
    const dailyKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const aggregations: Record<string, any> = {};

    for (const metric of metrics) {
      const baseKey = `${metric.type}`;
      
      // Hourly aggregation
      const hourlyAggKey = `${baseKey}_${hourlyKey}`;
      if (!aggregations[hourlyAggKey]) {
        aggregations[hourlyAggKey] = {
          type: metric.type,
          period: 'hourly',
          key: hourlyKey,
          count: 0,
          sum: 0,
          min: Infinity,
          max: -Infinity,
          timestamp: now,
        };
      }
      
      const hourlyAgg = aggregations[hourlyAggKey];
      hourlyAgg.count++;
      hourlyAgg.sum += metric.value;
      hourlyAgg.min = Math.min(hourlyAgg.min, metric.value);
      hourlyAgg.max = Math.max(hourlyAgg.max, metric.value);

      // Daily aggregation
      const dailyAggKey = `${baseKey}_${dailyKey}`;
      if (!aggregations[dailyAggKey]) {
        aggregations[dailyAggKey] = {
          type: metric.type,
          period: 'daily',
          key: dailyKey,
          count: 0,
          sum: 0,
          min: Infinity,
          max: -Infinity,
          timestamp: now,
        };
      }
      
      const dailyAgg = aggregations[dailyAggKey];
      dailyAgg.count++;
      dailyAgg.sum += metric.value;
      dailyAgg.min = Math.min(dailyAgg.min, metric.value);
      dailyAgg.max = Math.max(dailyAgg.max, metric.value);
    }

    // Store aggregations
    const batch = dbAdmin.batch();
    
    for (const [key, agg] of Object.entries(aggregations)) {
      agg.average = agg.sum / agg.count;
      
      const docRef = aggregatesRef.doc(key);
      batch.set(docRef, agg, { merge: true });
    }

    await batch.commit();

  } catch (error) {
    logger.error('Error aggregating metrics', { error: error, endpoint: '/api/analytics/metrics' });
  }
}

// Helper function to aggregate metrics data for response
function aggregateMetricsData(metrics: any[]): Record<string, any> {
  const aggregation: Record<string, any> = {};

  for (const metric of metrics) {
    if (!aggregation[metric.type]) {
      aggregation[metric.type] = {
        count: 0,
        sum: 0,
        min: Infinity,
        max: -Infinity,
        values: [],
      };
    }

    const agg = aggregation[metric.type];
    agg.count++;
    agg.sum += metric.value;
    agg.min = Math.min(agg.min, metric.value);
    agg.max = Math.max(agg.max, metric.value);
    agg.values.push({
      value: metric.value,
      timestamp: metric.timestamp,
      labels: metric.labels });
  }

  // Calculate averages and percentiles
  for (const type in aggregation) {
    const agg = aggregation[type];
    agg.average = agg.sum / agg.count;
    
    // Sort values for percentile calculation
    const sortedValues = agg.values.map((v: any) => v.value).sort((a: number, b: number) => a - b);
    agg.p50 = percentile(sortedValues, 0.5);
    agg.p95 = percentile(sortedValues, 0.95);
    agg.p99 = percentile(sortedValues, 0.99);
    
    // Keep only recent values to reduce response size
    agg.values = agg.values.slice(-100);
  }

  return aggregation;
}

// Helper function to calculate percentile
function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  
  const index = Math.ceil(values.length * p) - 1;
  return values[Math.max(0, Math.min(index, values.length - 1))];
}