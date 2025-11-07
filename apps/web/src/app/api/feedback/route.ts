import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

export async function POST(request: NextRequest) {
  try {
    const { feedback, userAgent, timestamp } = await request.json();
    
    // Basic validation
    if (!feedback || typeof feedback !== 'string' || feedback.trim().length === 0) {
      return NextResponse.json(ApiResponseHelper.error("Feedback content is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }
    
    if (feedback.length > 500) {
      return NextResponse.json(ApiResponseHelper.error("Feedback too long (max 500 characters)", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }
    
    // Get user info from headers
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const realUserAgent = request.headers.get('user-agent') || 'unknown';
    
    // Log feedback (in production, this would go to a proper logging service)
    const feedbackData = {
      feedback: feedback.trim(),
      timestamp: new Date().toISOString(),
      ip: ip,
      userAgent: realUserAgent,
      campusId: CURRENT_CAMPUS_ID,
      submitted: timestamp || new Date().toISOString()
    };

    // For now, just log to console. In production, save to database or send to service
    logger.info('📝 HIVE Feedback Received at /api/feedback');
    
    // TODO: In production, integrate with:
    // - Database storage
    // - Email notification service
    // - Slack/Discord webhook
    // - Analytics service
    
    return NextResponse.json({
      success: true,
      message: 'Feedback received successfully',
      id: `feedback_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
    });
    
  } catch (error) {
    logger.error(
      `Feedback submission error at /api/feedback`,
      error instanceof Error ? error : new Error(String(error))
    );
    
    return NextResponse.json(ApiResponseHelper.error("Failed to submit feedback", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
