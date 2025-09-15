import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";

// Batch activity tracking endpoint
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json() as { events: unknown[] };
    const { events } = body;

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json(ApiResponseHelper.error("Invalid events array", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Validate events and add timestamps
    const validEvents = events.map((event: any): ActivityEvent => {
      if (!event.type || !['space_visit', 'tool_interaction', 'content_creation', 'social_interaction', 'session_start', 'session_end'].includes(event.type)) {
        throw new Error(`Invalid activity type: ${event.type}`);
      }

      const now = new Date();
      return {
        type: event.type as string,
        spaceId: event.spaceId as string | undefined,
        toolId: event.toolId as string | undefined,
        contentId: event.contentId as string | undefined,
        duration: event.duration as number | undefined,
        metadata: (event.metadata as Record<string, unknown>) || {},
        timestamp: now.toISOString(),
        date: now.toISOString().split('T')[0]
      };
    });

    // Use batch write for better performance
    const batch = dbAdmin.batch();
    const eventIds: string[] = [];

    validEvents.forEach(event => {
      const docRef = dbAdmin.collection('activityEvents').doc();
      batch.set(docRef, event);
      eventIds.push(docRef.id);
    });

    await batch.commit();

    // Update daily summaries asynchronously (fire and forget)
    validEvents.forEach(event => {
      updateDailySummary(user.uid, event).catch(error => {
        logger.error('Error updating daily summary', { error, endpoint: '/api/activity/batch' });
      });
    });

    return NextResponse.json({ 
      success: true, 
      eventIds,
      count: validEvents.length
    });
  } catch (error) {
    logger.error('Error logging batch activities', { error: error, endpoint: '/api/activity/batch' });
    return NextResponse.json(ApiResponseHelper.error("Failed to log batch activities", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

interface ActivityEvent {
  type: string;
  spaceId?: string;
  toolId?: string;
  contentId?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  timestamp: string;
  date: string;
}

// Helper function to update daily summary (copied from main route)
async function updateDailySummary(userId: string, event: ActivityEvent) {
  try {
    const summaryId = `${userId}_${event.date}`;
    const summaryRef = dbAdmin.collection('activitySummaries').doc(summaryId);
    
    // Get existing summary or create new one
    const summaryDoc = await summaryRef.get();
    
    if (summaryDoc.exists) {
      const existingData = summaryDoc.data();
      
      if (!existingData) return;
      
      // Update existing summary
      const updatedData = {
        totalTimeSpent: (existingData.totalTimeSpent as number) + (event.duration ? Math.round(event.duration / 60) : 0),
        spacesVisited: event.spaceId && !(existingData.spacesVisited as string[]).includes(event.spaceId) 
          ? [...(existingData.spacesVisited as string[]), event.spaceId]
          : (existingData.spacesVisited as string[]),
        toolsUsed: event.toolId && !(existingData.toolsUsed as string[]).includes(event.toolId)
          ? [...(existingData.toolsUsed as string[]), event.toolId]
          : (existingData.toolsUsed as string[]),
        contentCreated: event.type === 'content_creation' 
          ? (existingData.contentCreated as number) + 1 
          : (existingData.contentCreated as number),
        socialInteractions: event.type === 'social_interaction'
          ? (existingData.socialInteractions as number) + 1
          : (existingData.socialInteractions as number),
        sessionCount: event.type === 'session_start'
          ? (existingData.sessionCount as number) + 1
          : (existingData.sessionCount as number),
        updatedAt: new Date().toISOString()
      };

      await summaryRef.update(updatedData);
    } else {
      // Create new summary
      const newSummary = {
        userId,
        date: event.date,
        totalTimeSpent: event.duration ? Math.round(event.duration / 60) : 0,
        spacesVisited: event.spaceId ? [event.spaceId] : [],
        toolsUsed: event.toolId ? [event.toolId] : [],
        contentCreated: event.type === 'content_creation' ? 1 : 0,
        socialInteractions: event.type === 'social_interaction' ? 1 : 0,
        peakActivityHour: new Date(event.timestamp).getHours(),
        sessionCount: event.type === 'session_start' ? 1 : 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await summaryRef.set(newSummary);
    }
  } catch (error) {
    logger.error('Error updating daily summary', { error: error, endpoint: '/api/activity/batch' });
  }
}