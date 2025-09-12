import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Free time slot interface
interface FreeTimeSlot {
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  type: 'morning' | 'afternoon' | 'evening';
  date: string;
}

// GET - Find free time slots
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || new Date().toISOString().split('T')[0];
    const endDate = searchParams.get('endDate') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const minDuration = parseInt(searchParams.get('minDuration') || '30'); // minimum 30 minutes
    const workingHoursOnly = searchParams.get('workingHoursOnly') === 'true';

    // Define working hours (9 AM - 6 PM)
    const workingStartHour = 9;
    const workingEndHour = 18;

    const freeTimeSlots: FreeTimeSlot[] = [];

    // Get current date range
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Iterate through each day
    for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Get all events for this day
      const dayEvents = await getEventsForDate(user.uid, dateStr);
      
      // Sort events by start time
      dayEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

      // Find free time slots for this day
      const dayFreeSlots = findFreeTimeSlotsForDay(
        dayEvents,
        dateStr,
        minDuration,
        workingHoursOnly,
        workingStartHour,
        workingEndHour
      );

      freeTimeSlots.push(...dayFreeSlots);
    }

    // Group by date and add suggestions
    const groupedSlots = groupSlotsByDate(freeTimeSlots);
    const suggestions = generateSuggestions(freeTimeSlots, minDuration);

    return NextResponse.json({
      freeTimeSlots: groupedSlots,
      suggestions,
      totalSlots: freeTimeSlots.length,
      parameters: {
        startDate,
        endDate,
        minDuration,
        workingHoursOnly
      }
    });
  } catch (error) {
    logger.error('Error finding free time', { error: error, endpoint: '/api/calendar/free-time' });
    return NextResponse.json(ApiResponseHelper.error("Failed to find free time", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to get events for a specific date
async function getEventsForDate(userId: string, dateStr: string): Promise<any[]> {
  const dayStart = `${dateStr}T00:00:00.000Z`;
  const dayEnd = `${dateStr}T23:59:59.999Z`;

  const events: any[] = [];

  // Get personal events
  const personalEventsSnapshot = await dbAdmin.collection('personalEvents')
    .where('userId', '==', userId)
    .where('startDate', '>=', dayStart)
    .where('startDate', '<=', dayEnd)
    .orderBy('startDate', 'asc')
    .get();
  personalEventsSnapshot.docs.forEach(doc => {
    events.push({
      id: doc.id,
      ...doc.data(),
      type: 'personal'
    });
  });

  // Get space events
  const membershipsSnapshot = await dbAdmin.collection('members')
    .where('userId', '==', userId)
    .where('status', '==', 'active')
    .get();
  const userSpaceIds = membershipsSnapshot.docs.map(doc => doc.data().spaceId);

  if (userSpaceIds.length > 0) {
    const spaceEventsSnapshot = await dbAdmin.collection('events')
      .where('spaceId', 'in', userSpaceIds)
      .where('state', '==', 'published')
      .where('startDate', '>=', dayStart)
      .where('startDate', '<=', dayEnd)
      .orderBy('startDate', 'asc')
      .get();
    spaceEventsSnapshot.docs.forEach(doc => {
      events.push({
        id: doc.id,
        ...doc.data(),
        type: 'space'
      });
    });
  }

  return events;
}

// Helper function to find free time slots for a single day
function findFreeTimeSlotsForDay(
  events: any[],
  dateStr: string,
  minDuration: number,
  workingHoursOnly: boolean,
  workingStartHour: number,
  workingEndHour: number
): FreeTimeSlot[] {
  const slots: FreeTimeSlot[] = [];
  
  // Define day boundaries
  const dayStart = workingHoursOnly ? 
    new Date(`${dateStr}T${workingStartHour.toString().padStart(2, '0')}:00:00.000Z`) :
    new Date(`${dateStr}T00:00:00.000Z`);
  
  const dayEnd = workingHoursOnly ? 
    new Date(`${dateStr}T${workingEndHour.toString().padStart(2, '0')}:00:00.000Z`) :
    new Date(`${dateStr}T23:59:59.999Z`);

  // If no events, the entire day is free
  if (events.length === 0) {
    const duration = (dayEnd.getTime() - dayStart.getTime()) / (1000 * 60);
    if (duration >= minDuration) {
      slots.push({
        startTime: dayStart.toISOString(),
        endTime: dayEnd.toISOString(),
        duration: Math.floor(duration),
        type: getTimeOfDay(dayStart),
        date: dateStr
      });
    }
    return slots;
  }

  // Check time before first event
  const firstEvent = events[0];
  const firstEventStart = new Date(firstEvent.startDate);
  if (dayStart < firstEventStart) {
    const duration = (firstEventStart.getTime() - dayStart.getTime()) / (1000 * 60);
    if (duration >= minDuration) {
      slots.push({
        startTime: dayStart.toISOString(),
        endTime: firstEventStart.toISOString(),
        duration: Math.floor(duration),
        type: getTimeOfDay(dayStart),
        date: dateStr
      });
    }
  }

  // Check gaps between events
  for (let i = 0; i < events.length - 1; i++) {
    const currentEventEnd = new Date(events[i].endDate);
    const nextEventStart = new Date(events[i + 1].startDate);
    
    if (currentEventEnd < nextEventStart) {
      const duration = (nextEventStart.getTime() - currentEventEnd.getTime()) / (1000 * 60);
      if (duration >= minDuration) {
        slots.push({
          startTime: currentEventEnd.toISOString(),
          endTime: nextEventStart.toISOString(),
          duration: Math.floor(duration),
          type: getTimeOfDay(currentEventEnd),
          date: dateStr
        });
      }
    }
  }

  // Check time after last event
  const lastEvent = events[events.length - 1];
  const lastEventEnd = new Date(lastEvent.endDate);
  if (lastEventEnd < dayEnd) {
    const duration = (dayEnd.getTime() - lastEventEnd.getTime()) / (1000 * 60);
    if (duration >= minDuration) {
      slots.push({
        startTime: lastEventEnd.toISOString(),
        endTime: dayEnd.toISOString(),
        duration: Math.floor(duration),
        type: getTimeOfDay(lastEventEnd),
        date: dateStr
      });
    }
  }

  return slots;
}

// Helper function to determine time of day
function getTimeOfDay(date: Date): 'morning' | 'afternoon' | 'evening' {
  const hour = date.getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

// Helper function to group slots by date
function groupSlotsByDate(slots: FreeTimeSlot[]): Record<string, FreeTimeSlot[]> {
  return slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, FreeTimeSlot[]>);
}

// Helper function to generate suggestions
function generateSuggestions(slots: FreeTimeSlot[], _minDuration: number): string[] {
  const suggestions: string[] = [];
  
  const totalFreeTime = slots.reduce((sum, slot) => sum + slot.duration, 0);
  const totalHours = Math.floor(totalFreeTime / 60);
  const totalMinutes = totalFreeTime % 60;
  
  suggestions.push(`You have ${totalHours}h ${totalMinutes}m of free time`);
  
  const longSlots = slots.filter(slot => slot.duration >= 60);
  if (longSlots.length > 0) {
    suggestions.push(`${longSlots.length} slot${longSlots.length > 1 ? 's' : ''} longer than 1 hour`);
  }
  
  const morningSlots = slots.filter(slot => slot.type === 'morning');
  const afternoonSlots = slots.filter(slot => slot.type === 'afternoon');
  const eveningSlots = slots.filter(slot => slot.type === 'evening');
  
  if (morningSlots.length > afternoonSlots.length && morningSlots.length > eveningSlots.length) {
    suggestions.push('Most free time is in the morning');
  } else if (afternoonSlots.length > eveningSlots.length) {
    suggestions.push('Most free time is in the afternoon');
  } else {
    suggestions.push('Most free time is in the evening');
  }
  
  return suggestions;
}