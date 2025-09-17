import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/auth/providers/auth-server';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";
import { FieldValue } from 'firebase-admin/firestore';

// Status interface
interface UserStatus {
  emoji: string;
  text: string;
  availability: string;
  updatedAt: string;
  expiresAt?: string;
}

// GET - Fetch user's current status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const userDoc = await dbAdmin.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    
    const status: UserStatus = userData?.status || {
      emoji: '🎯',
      text: 'Focused',
      availability: 'Available 2hr',
      updatedAt: new Date().toISOString()
    };

    // Check if status has expired (24 hours)
    if (status.updatedAt) {
      const updatedTime = new Date(status.updatedAt).getTime();
      const now = new Date().getTime();
      const hoursPassed = (now - updatedTime) / (1000 * 60 * 60);
      
      if (hoursPassed > 24) {
        // Reset to default
        status.emoji = '🎯';
        status.text = 'Active';
        status.availability = 'Available';
      }
    }

    return NextResponse.json({ 
      success: true, 
      status 
    });

  } catch (error) {
    logger.error('Error fetching user status', { error });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch status", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// POST - Update user's status
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const body = await request.json();
    const { emoji, text, availability } = body;

    // Validate input
    if (!emoji || !text || !availability) {
      return NextResponse.json(
        ApiResponseHelper.error("Missing required fields", "VALIDATION_ERROR"), 
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Create status object
    const status: UserStatus = {
      emoji,
      text: text.substring(0, 50), // Limit text length
      availability,
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    // Update user document
    await dbAdmin.collection('users').doc(user.uid).update({
      status,
      'lastActiveAt': FieldValue.serverTimestamp()
    });

    // Also update in status history for analytics
    await dbAdmin.collection('statusHistory').add({
      userId: user.uid,
      ...status,
      timestamp: FieldValue.serverTimestamp()
    });

    // Broadcast to user's spaces (for real-time updates)
    const membershipsSnapshot = await dbAdmin
      .collection('members')
      .where('userId', '==', user.uid)
      .get();

    const updatePromises = membershipsSnapshot.docs.map(doc => 
      dbAdmin.collection('spaces').doc(doc.data().spaceId)
        .collection('memberStatuses')
        .doc(user.uid)
        .set({
          ...status,
          userId: user.uid,
          displayName: user.displayName || 'Anonymous',
          timestamp: FieldValue.serverTimestamp()
        }, { merge: true })
    );

    await Promise.all(updatePromises);

    logger.info('User status updated', { 
      userId: user.uid, 
      status 
    });

    return NextResponse.json({ 
      success: true, 
      status,
      message: 'Status updated successfully' 
    });

  } catch (error) {
    logger.error('Error updating user status', { error });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to update status", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// DELETE - Clear user's status
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Clear status from user document
    await dbAdmin.collection('users').doc(user.uid).update({
      status: FieldValue.delete(),
      'lastActiveAt': FieldValue.serverTimestamp()
    });

    // Clear from member statuses in spaces
    const membershipsSnapshot = await dbAdmin
      .collection('members')
      .where('userId', '==', user.uid)
      .get();

    const deletePromises = membershipsSnapshot.docs.map(doc => 
      dbAdmin.collection('spaces').doc(doc.data().spaceId)
        .collection('memberStatuses')
        .doc(user.uid)
        .delete()
    );

    await Promise.all(deletePromises);

    logger.info('User status cleared', { userId: user.uid });

    return NextResponse.json({ 
      success: true, 
      message: 'Status cleared successfully' 
    });

  } catch (error) {
    logger.error('Error clearing user status', { error });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to clear status", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}