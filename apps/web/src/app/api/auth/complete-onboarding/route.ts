import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@hive/auth-logic'
import { updateProfile } from 'firebase/auth'
import { logger } from '@hive/core'
import { dbAdmin, authAdmin } from '@/lib/firebase-admin'
import type { OnboardingData } from '@hive/core'

export async function POST(request: NextRequest) {
  try {
    const onboardingData = await request.json() as Partial<OnboardingData>
    const { 
      fullName, 
      major, 
      majors = [], 
      handle, 
      avatarUrl, 
      builderOptIn, 
      consentGiven,
      academicLevel,
      graduationYear,
      interests = [],
      isStudentLeader = false,
      spaceId,
      spaceName,
      spaceDescription,
      verificationEmails = []
    } = onboardingData

    // Validate required fields
    if (!fullName || (!major && majors.length === 0) || !handle || consentGiven === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields: fullName, major/majors, handle, and consentGiven are required' },
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

    // Development mode bypass
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      logger.info('🔥 Development mode: bypassing Firestore operations')

      // Update Firebase Auth profile even in dev mode
    await updateProfile(currentUser, {
      displayName: fullName,
      photoURL: avatarUrl || null
    })

      logger.info('Development mode onboarding completed for user:', {
        uid: currentUser.uid,
        email: currentUser.email,
        fullName,
        handle,
        major: major || majors[0],
        builderOptIn,
        consentGiven
      })

      return NextResponse.json({
        ok: true,
        message: 'Onboarding completed successfully',
        userId: currentUser.uid
      })
    }

    // Production mode: Full Firestore implementation
    try {
      // Check handle availability
      const handleQuery = await dbAdmin.collection('users')
        .where('handle', '==', handle)
        .limit(1)
        .get()

      if (!handleQuery.empty) {
        return NextResponse.json(
          { message: 'Handle is already taken. Please choose a different one.' },
          { status: 409 }
        )
      }

      // Prepare user document data
      const now = new Date()
      const finalMajors = majors.length > 0 ? majors : [major!]
      
      const userData = {
        // Identity
        uid: currentUser.uid,
        email: currentUser.email,
        fullName,
        handle,
        avatarUrl: avatarUrl || null,
        
        // Status
        emailVerified: currentUser.emailVerified,
        onboardingCompleted: true,
        role: 'verified' as const,
        
        // Academic Info
        academicLevel: academicLevel || 'undergraduate',
        majors: finalMajors,
        major: finalMajors[0], // Compatibility field
        graduationYear: graduationYear || new Date().getFullYear() + 4,
        interests,
        
        // Leadership
        isStudentLeader,
        spaceId: spaceId || null,
        
        // Metadata
        builderOptIn: builderOptIn || false,
        consentGiven,
        createdAt: now,
        updatedAt: now,
        lastActiveAt: now
      }

      // Use Firestore transaction for data consistency
      await dbAdmin.runTransaction(async (transaction) => {
        const userRef = dbAdmin.collection('users').doc(currentUser.uid)
        
        // Double-check handle availability within transaction
        const handleCheckRef = dbAdmin.collection('users')
        const handleSnapshot = await transaction.get(
          handleCheckRef.where('handle', '==', handle).limit(1)
        )
        
        if (!handleSnapshot.empty) {
          throw new Error('Handle was taken during processing')
        }

        // Create or update user document
        transaction.set(userRef, userData, { merge: true })

        // If student leader and space creation is requested
        if (isStudentLeader && spaceName && spaceDescription) {
          // Note: Space creation will be handled by the verification system
          // For now, we just log the intent
          logger.info('Student leader space creation requested:', {
            userId: currentUser.uid,
            spaceName,
            spaceDescription,
            verificationEmails
          })
        }
      })

      // Update Firebase Auth profile
      await updateProfile(currentUser, {
        displayName: fullName,
        photoURL: avatarUrl || null
      })

      // Update Firebase Auth custom claims
      try {
        await authAdmin.setCustomUserClaims(currentUser.uid, {
          onboardingCompleted: true,
          role: 'verified',
          isBuilder: builderOptIn || false,
          emailVerified: currentUser.emailVerified
        })
      } catch (claimsError) {
        logger.warn('Failed to update custom claims, but user data was saved:', claimsError)
        // Don't fail the request if claims update fails
      }

      logger.info('Onboarding completed successfully for user:', {
      uid: currentUser.uid,
      email: currentUser.email,
      fullName,
      handle,
        majors: finalMajors,
        isStudentLeader,
      builderOptIn,
      consentGiven
    })

    return NextResponse.json({
      ok: true,
        message: 'Onboarding completed successfully',
        userId: currentUser.uid
    })

    } catch (firestoreError) {
      logger.error('Firestore operation failed:', firestoreError)
      
      if (firestoreError instanceof Error && firestoreError.message.includes('Handle was taken')) {
        return NextResponse.json(
          { message: 'Handle was taken while processing. Please try a different one.' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { message: 'Failed to save profile data. Please try again.' },
        { status: 500 }
      )
    }

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