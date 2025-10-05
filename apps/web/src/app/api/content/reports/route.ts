import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-server';
import { contentModerationService } from '@/lib/content-moderation-service';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { z } from 'zod';

/**
 * Content Reporting API
 * POST /api/content/reports - Submit a content report
 * GET /api/content/reports - Get user's submitted reports (optional)
 */

const ReportSchema = z.object({
  contentId: z.string().min(1, 'Content ID is required'),
  contentType: z.enum(['post', 'comment', 'message', 'tool', 'space', 'profile', 'event']),
  category: z.enum([
    'spam', 'harassment', 'hate_speech', 'inappropriate_content', 
    'misinformation', 'copyright', 'privacy_violation', 'violence', 
    'self_harm', 'impersonation', 'other'
  ]),
  subCategory: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description too long'),
  evidence: z.object({
    screenshots: z.array(z.string().url()).optional(),
    urls: z.array(z.string().url()).optional(),
    additionalContext: z.string().max(500).optional()
  }).optional(),
  spaceId: z.string().optional()
});

// POST - Submit content report
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Authentication required', 'UNAUTHORIZED'),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = ReportSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        ApiResponseHelper.error('Invalid request data', 'INVALID_INPUT', validation.error.errors),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const reportData = validation.data;

    // Get user agent for metadata
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Rate limiting - check if user has submitted too many reports recently
    const recentReportsCount = await checkRecentReports(user.id);
    if (recentReportsCount >= 10) { // Max 10 reports per hour
      return NextResponse.json(
        ApiResponseHelper.error('Rate limit exceeded. Please wait before submitting more reports.', 'RATE_LIMITED'),
        { status: HttpStatus.TOO_MANY_REQUESTS }
      );
    }

    // Submit report
    const reportId = await contentModerationService.submitReport({
      reporterId: user.id,
      contentId: reportData.contentId,
      contentType: reportData.contentType,
      category: reportData.category,
      subCategory: reportData.subCategory,
      description: reportData.description,
      evidence: reportData.evidence ? {
        screenshots: reportData.evidence.screenshots || [],
        urls: reportData.evidence.urls || [],
        additionalContext: reportData.evidence.additionalContext || ''
      } : undefined,
      spaceId: reportData.spaceId,
      userAgent
    });

    // Log successful report submission
    logger.info('Content report submitted successfully', {
      reportId,
      reporterId: user.id,
      postId: reportData.contentId,
      metadata: {
        contentType: reportData.contentType,
        category: reportData.category
      }
    });

    return NextResponse.json({
      success: true,
      reportId,
      message: 'Report submitted successfully. Our moderation team will review it shortly.',
      estimatedReviewTime: '2-24 hours'
    });

  } catch (error) {
    logger.error('Error submitting content report', { error: error instanceof Error ? error.message : String(error) });
    
    if (error instanceof Error && error.message.includes('Content not found')) {
      return NextResponse.json(
        ApiResponseHelper.error('Content not found', 'NOT_FOUND'),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    return NextResponse.json(
      ApiResponseHelper.error('Failed to submit report', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// GET - Get user's submitted reports (optional feature)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Authentication required', 'UNAUTHORIZED'),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const status = searchParams.get('status') || 'all';

    // Get user's reports (implement this method in the service if needed)
    const reports = await getUserReports(user.id, status, limit);

    return NextResponse.json({
      success: true,
      reports,
      pagination: {
        limit,
        count: reports.length
      }
    });

  } catch (error) {
    logger.error('Error getting user reports', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to get reports', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// Helper function to check recent reports for rate limiting
async function checkRecentReports(userId: string): Promise<number> {
  try {
    const { dbAdmin } = await import('@/lib/firebase-admin');
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const snapshot = await dbAdmin
      .collection('contentReports')
      .where('reporterId', '==', userId)
      .where('createdAt', '>=', oneHourAgo.toISOString())
      .get();
    
    return snapshot.size;
  } catch (error) {
    logger.error('Error checking recent reports', { error: error instanceof Error ? error.message : String(error) });
    return 0;
  }
}

// Helper function to get user's reports
async function getUserReports(userId: string, status: string, limit: number) {
  try {
    const { dbAdmin } = await import('@/lib/firebase-admin');
    let query = dbAdmin
      .collection('contentReports')
      .where('reporterId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    if (status !== 'all') {
      query = query.where('status', '==', status);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Remove sensitive data that shouldn't be exposed to the reporter
      aiAnalysis: undefined,
      moderationHistory: undefined,
      assignedModerator: undefined
    }));
  } catch (error) {
    logger.error('Error getting user reports', { error: error instanceof Error ? error.message : String(error), userId });
    return [];
  }
}