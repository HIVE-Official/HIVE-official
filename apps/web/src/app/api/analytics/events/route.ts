import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()
    const headersList = await headers()
    
    // Validate the event has required fields
    if (!event.type || !event.timestamp || !event.sessionId) {
      return NextResponse.json(
        { error: 'Invalid event format' },
        { status: 400 }
      )
    }

    // Add server-side metadata
    const enrichedEvent = {
      ...event,
      serverTimestamp: Date.now(),
      ip: headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown'
    }

    // In development, just log
    if (process.env.NODE_ENV === 'development') {
      console.warn('📊 Analytics Event Received:', enrichedEvent)
      return NextResponse.json({ success: true })
    }

    // TODO: In production, store in Firestore
    // const db = getFirestore()
    // await db.collection('analytics_events').add(enrichedEvent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to process event' },
      { status: 500 }
    )
  }
} 