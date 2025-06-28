import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@hive/auth-logic'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { logger } from '@hive/core'

export async function POST(request: NextRequest) {
  try {
    const { email, url, dev } = await request.json()

    if (!email || !url) {
      return NextResponse.json(
        { message: 'Email and verification URL are required' },
        { status: 400 }
      )
    }

    // Check if Firebase is properly configured
    const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                                 process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-api-key'

    // Development mode bypass - safe and limited
    if (dev === 'true' && process.env.NODE_ENV === 'development' && !isFirebaseConfigured) {
      logger.info('🔥 Development mode: bypassing email verification')
      logger.info(`📧 Dev verification for: ${email}`)
      
      // In development, simulate successful verification - but don't tell user it's dev mode
      return NextResponse.json({
        success: true,
        user: {
          uid: `dev-user-${Date.now()}`,
          email,
          emailVerified: true
        },
        message: 'Authentication successful'
      })
    }

    // Production mode - requires proper Firebase
    if (!isFirebaseConfigured) {
      logger.error('🚨 PRODUCTION ERROR: Verification attempted without Firebase config')
      return NextResponse.json(
        { 
          message: 'Authentication service unavailable. Please try again later.',
          error: 'FIREBASE_CONFIG_MISSING'
        },
        { status: 503 }
      )
    }

    if (!auth) {
      logger.error('🚨 Firebase auth not initialized')
      return NextResponse.json(
        { message: 'Authentication service unavailable' },
        { status: 503 }
      )
    }

    try {
      // Verify that this is a valid sign-in link
      if (!isSignInWithEmailLink(auth, url)) {
        logger.warn(`Invalid magic link attempted: ${url}`)
        return NextResponse.json(
          { message: 'Invalid or expired magic link' },
          { status: 400 }
        )
      }

      // Sign in with the email link
      const userCredential = await signInWithEmailLink(auth, email, url)
      const user = userCredential.user

      logger.info(`✅ Successful magic link verification for: ${email}`)

      return NextResponse.json({
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          isNewUser: userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime
        },
        message: 'Authentication successful'
      })

    } catch (error: unknown) {
      logger.error('🚨 Firebase verification error:', error)
      
      // Handle specific Firebase errors
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string }
        
        if (firebaseError.code === 'auth/invalid-action-code') {
          return NextResponse.json(
            { message: 'Magic link has expired or already been used' },
            { status: 400 }
          )
        } else if (firebaseError.code === 'auth/invalid-email') {
          return NextResponse.json(
            { message: 'Invalid email address' },
            { status: 400 }
          )
        } else if (firebaseError.code === 'auth/operation-not-allowed') {
          return NextResponse.json(
            { message: 'Email link sign-in is not enabled' },
            { status: 403 }
          )
        } else if (firebaseError.code === 'auth/weak-password') {
          return NextResponse.json(
            { message: 'Password is too weak' },
            { status: 400 }
          )
        }
      }
      
      return NextResponse.json(
        { message: 'Authentication failed. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    logger.error('🚨 Verification API error:', error)
    return NextResponse.json(
      { message: 'Server error occurred. Please try again.' },
      { status: 500 }
    )
  }
} 