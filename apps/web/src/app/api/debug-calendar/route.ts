import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Test specific import instead of entire module to avoid framer-motion issues
    const { CalendarCard } = await import('@hive/ui/src/components/profile/calendar-card');
    
    return NextResponse.json({
      success: true,
      hasCalendarCard: CalendarCard !== undefined,
      calendarCardType: typeof CalendarCard,
      calendarCardName: CalendarCard?.name || 'CalendarCard'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}