import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@hive/core'
import { dbAdmin } from '@/lib/firebase-admin'
import { verifyAuthToken } from '@/lib/auth'

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

    // Development mode bypass
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      logger.info('🔥 Development mode: returning mock profile')
      
      const mockProfile = {
        uid: user.uid,
        email: user.email,
        fullName: 'Dev User',
        handle: 'dev_user',
        avatarUrl: null,
        onboardingCompleted: true,
        role: 'verified',
        academicLevel: 'undergraduate',
        majors: ['Computer Science'],
        graduationYear: new Date().getFullYear() + 2,
        interests: ['Technology', 'Programming'],
        isStudentLeader: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      return NextResponse.json({ profile: mockProfile })
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
      
      logger.info('Profile retrieved for user:', user.uid)
      
      return NextResponse.json({ profile })

    } catch (firestoreError) {
      logger.error('Failed to retrieve user profile:', firestoreError)
      
      return NextResponse.json(
        { message: 'Failed to retrieve profile. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    logger.error('Error retrieving profile:', error)
    
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

    // Development mode bypass
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      logger.info('🔥 Development mode: profile update bypassed', updateData)
      
      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully',
        updates: updateData
      })
    }

    // Production mode: Update Firestore
    try {
      await dbAdmin.collection('users').doc(user.uid).update(updateData)
      
      logger.info('Profile updated for user:', {
        uid: user.uid,
        fields: Object.keys(updateData)
      })
      
      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully',
        updates: updateData
      })

    } catch (firestoreError) {
      logger.error('Failed to update user profile:', firestoreError)
      
      return NextResponse.json(
        { message: 'Failed to update profile. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    logger.error('Error updating profile:', error)
    
    return NextResponse.json(
      { message: 'Failed to update profile. Please try again.' },
      { status: 500 }
    )
  }
} 