import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@hive/auth-logic'
import { updateProfile } from 'firebase/auth'
import { logger } from '@hive/core'

export async function POST(request: NextRequest) {
  try {
    const { fullName, major, handle, avatarUrl, builderOptIn, consentGiven } = await request.json()

    // Validate required fields
    if (!fullName || !major || !handle || consentGiven === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate handle format
    const handleRegex = /^[a-z0-9_]{3,20}$/
    if (!handleRegex.test(handle)) {
      return NextResponse.json(
        { message: 'Handle must be 3-20 characters, lowercase letters, numbers, and underscores only' },
        { status: 400 }
      )
    }

    if (!auth) {
      logger.error('Firebase auth not initialized')
      return NextResponse.json(
        { message: 'Authentication service unavailable' },
        { status: 500 }
      )
    }

    // Get the current user
    const currentUser = auth.currentUser
    if (!currentUser) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      )
    }

    // TODO: Check handle availability against database
    // For now, we'll assume it's available

    // Update user profile in Firebase Auth
    await updateProfile(currentUser, {
      displayName: fullName,
      photoURL: avatarUrl || null
    })

    // TODO: Store additional user data in Firestore
    // This would include: major, handle, builderOptIn, consentGiven, onboardingCompleted: true
    // For now, we'll just log the data

    logger.info('Onboarding completed for user:', {
      uid: currentUser.uid,
      email: currentUser.email,
      fullName,
      major,
      handle,
      builderOptIn,
      consentGiven
    })

    return NextResponse.json({
      ok: true,
      message: 'Onboarding completed successfully'
    })
  } catch (error) {
    logger.error('Error completing onboarding:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('auth/requires-recent-login')) {
        return NextResponse.json(
          { message: 'Please sign in again to complete onboarding' },
          { status: 401 }
        )
      }
    }
    
    return NextResponse.json(
      { message: 'Failed to complete onboarding. Please try again.' },
      { status: 500 }
    )
  }
} 