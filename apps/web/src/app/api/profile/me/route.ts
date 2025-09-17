import { logger } from '@/lib/logger';

import { NextRequest, NextResponse } from 'next/server'
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin'
import { verifyAuthToken } from '@/lib/auth/auth'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuthToken(request)
    if (!user) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }


    // Production mode: Get from Firestore
    try {
      const userDoc = await dbAdmin.collection('users').doc(user.uid).get()
      
      if (!userDoc.exists) {
        return NextResponse.json(
          { message: 'User profile not found' },
          { status: 404 }
        )
      }

      const profile = userDoc.data()
      return NextResponse.json({ profile })

    } catch (firestoreError) {
      logger.error('Failed to retrieve user profile:', { error: String(firestoreError) })
      
      return NextResponse.json(
        { message: 'Failed to retrieve profile. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    logger.error('Error retrieving profile:', { error: String(error) })
    
    return NextResponse.json(
      { message: 'Failed to retrieve profile. Please try again.' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuthToken(request)
    if (!user) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const updates = await request.json()
    
    // Validate allowed fields for update
    const allowedFields = [
      'fullName',
      'handle',
      'bio',
      'major',
      'avatarUrl',
      'interests',
      'academicLevel',
      'majors',
      'graduationYear',
      'isStudentLeader'
    ]
    
    const updateData: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        updateData[key] = value
      }
    }
    
    // Add metadata
    updateData.updatedAt = new Date()
    updateData.lastActiveAt = new Date()

    // SECURITY FIX: Removed dangerous Firebase API key bypass
    // All profile updates must go through proper authentication

    // Production mode: Update Firestore
    try {
      await dbAdmin.collection('users').doc(user.uid).update(updateData);
      
      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully',
        updates: updateData
      })

    } catch (firestoreError) {
      logger.error('Failed to update user profile:', { error: String(firestoreError) })
      
      return NextResponse.json(
        { message: 'Failed to update profile. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    logger.error('Error updating profile:', { error: String(error) })
    
    return NextResponse.json(
      { message: 'Failed to update profile. Please try again.' },
      { status: 500 }
    )
  }
} 