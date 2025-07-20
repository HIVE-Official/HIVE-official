import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { feedback, userAgent, timestamp } = await request.json();
    
    // Basic validation
    if (!feedback || typeof feedback !== 'string' || feedback.trim().length === 0) {
      return NextResponse.json(
        { error: 'Feedback content is required' },
        { status: 400 }
      );
    }
    
    if (feedback.length > 500) {
      return NextResponse.json(
        { error: 'Feedback too long (max 500 characters)' },
        { status: 400 }
      );
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
      submitted: timestamp || new Date().toISOString()
    };
    
    // For now, just log to console. In production, save to database or send to service
    console.log('📝 HIVE Feedback Received:', JSON.stringify(feedbackData, null, 2));
    
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
    console.error('Feedback submission error:', error);
    
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}