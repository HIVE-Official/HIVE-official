import { NextRequest, NextResponse } from 'next/server';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { dbAdmin } from '@/lib/firebase-admin';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Helper function to detect feedback type
function detectFeedbackType(feedback: string): string {
  const lowerFeedback = feedback.toLowerCase();
  
  if (lowerFeedback.includes('bug') || lowerFeedback.includes('broken') || lowerFeedback.includes('error') || lowerFeedback.includes('crash')) {
    return 'bug';
  }
  if (lowerFeedback.includes('feature') || lowerFeedback.includes('add') || lowerFeedback.includes('would be nice') || lowerFeedback.includes('suggestion')) {
    return 'feature';
  }
  if (lowerFeedback.includes('hate') || lowerFeedback.includes('terrible') || lowerFeedback.includes('awful') || lowerFeedback.includes('sucks')) {
    return 'complaint';
  }
  if (lowerFeedback.includes('love') || lowerFeedback.includes('great') || lowerFeedback.includes('awesome') || lowerFeedback.includes('thanks')) {
    return 'praise';
  }
  
  return 'other';
}

// Helper function to detect platform from user agent
function detectPlatform(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'mobile';
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }
  
  return 'desktop';
}

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
    
    // Get user info from session and headers
    const session = await getServerSession(authOptions);
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const realUserAgent = request.headers.get('user-agent') || userAgent || 'unknown';
    
    // Prepare feedback data for Firebase
    const feedbackData = {
      content: feedback.trim(),
      userId: session?.user?.id || null,
      userEmail: session?.user?.email || null,
      userName: session?.user?.name || null,
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      ip: ip,
      userAgent: realUserAgent,
      status: 'new', // new, reviewed, resolved, archived
      type: detectFeedbackType(feedback), // bug, feature, complaint, praise, other
      priority: 'normal', // low, normal, high, urgent
      metadata: {
        url: request.headers.get('referer') || null,
        platform: detectPlatform(realUserAgent),
        authenticated: !!session
      }
    };
    
    // Save to Firebase
    try {
      const feedbackRef = await dbAdmin.collection('feedback').add(feedbackData);
      const feedbackId = feedbackRef.id;
      
      // Update with ID
      await feedbackRef.update({ id: feedbackId });
      
      logger.info('📝 Feedback saved to Firebase', { 
        feedbackId,
        userId: feedbackData.userId,
        type: feedbackData.type,
        endpoint: '/api/feedback' 
      });
      
      // If high priority feedback, create an alert
      if (feedbackData.type === 'bug' || feedback.toLowerCase().includes('urgent') || feedback.toLowerCase().includes('broken')) {
        await dbAdmin.collection('alerts').add({
          type: 'feedback',
          priority: 'high',
          feedbackId,
          content: feedback.substring(0, 100),
          createdAt: new Date().toISOString(),
          resolved: false
        });
      }
      
      return NextResponse.json({
        success: true,
        message: 'Thank you for your feedback! We\'ll review it shortly.',
        id: feedbackId
      });
      
    } catch (dbError) {
      logger.error('Failed to save feedback to Firebase', { error: dbError });
      
      // Still return success to user but log the error
      return NextResponse.json({
        success: true,
        message: 'Feedback received',
        id: `feedback_${Date.now()}`
      });
    }
    
  } catch (error) {
    logger.error('Feedback submission error', { error: error, endpoint: '/api/feedback' });
    
    return NextResponse.json(ApiResponseHelper.error("Failed to submit feedback", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}