import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// GET - Fetch specific personal event
export async function GET(request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { eventId } = params;
    const eventDoc = await getDoc(doc(db, 'personalEvents', eventId));

    if (!eventDoc.exists()) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const eventData = eventDoc.data();
    
    // Check if user owns this event
    if (eventData.userId !== user.uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const event = {
      id: eventDoc.id,
      ...eventData,
      type: 'personal' as const,
      canEdit: true
    };

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error fetching personal event:', error);
    return NextResponse.json({ error: 'Failed to fetch personal event' }, { status: 500 });
  }
}

// PUT - Update personal event
export async function PUT(request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { eventId } = params;
    const body = await request.json();
    const { title, description, startDate, endDate, location, isAllDay, reminderMinutes } = body;

    // Validate required fields
    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      return NextResponse.json({ error: 'End date must be after start date' }, { status: 400 });
    }

    const eventDoc = await getDoc(doc(db, 'personalEvents', eventId));
    if (!eventDoc.exists()) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const eventData = eventDoc.data();
    
    // Check if user owns this event
    if (eventData.userId !== user.uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updateData = {
      title,
      description: description || '',
      startDate,
      endDate,
      location: location || '',
      isAllDay: isAllDay || false,
      reminderMinutes: reminderMinutes || 0,
      updatedAt: new Date().toISOString()
    };

    await updateDoc(doc(db, 'personalEvents', eventId), updateData);

    const updatedEvent = {
      id: eventId,
      ...eventData,
      ...updateData,
      type: 'personal' as const,
      canEdit: true
    };

    return NextResponse.json({ event: updatedEvent });
  } catch (error) {
    console.error('Error updating personal event:', error);
    return NextResponse.json({ error: 'Failed to update personal event' }, { status: 500 });
  }
}

// DELETE - Delete personal event
export async function DELETE(request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { eventId } = params;
    const eventDoc = await getDoc(doc(db, 'personalEvents', eventId));

    if (!eventDoc.exists()) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const eventData = eventDoc.data();
    
    // Check if user owns this event
    if (eventData.userId !== user.uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await deleteDoc(doc(db, 'personalEvents', eventId));

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting personal event:', error);
    return NextResponse.json({ error: 'Failed to delete personal event' }, { status: 500 });
  }
}