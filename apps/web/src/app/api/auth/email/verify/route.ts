import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@hive/auth-logic'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { logger } from '@hive/core'

export async function POST(request: NextRequest) {
  try {
    const { email, url } = await request.json()

    if (!email || !url) {
      return NextResponse.json(
        { message: 'Email and verification URL are required' },
        { status: 400 }
      )
    }

    // Development mode bypass
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      logger.info('🔥 Development mode: bypassing magic link verification')
      return NextResponse.json({
        ok: true,
        user: {
          uid: 'dev-user-uid',
          email: email,
          isNewUser: true,
          emailVerified: true
        },
        idToken: 'dev-token'
      })
    }

    if (!auth) {
      logger.error('Firebase auth not initialized')
      return NextResponse.json(
        { message: 'Authentication service unavailable' },
        { status: 500 }
      )
    }

    // Check if the URL is a valid sign-in link
    if (!isSignInWithEmailLink(auth, url)) {
      return NextResponse.json(
        { message: 'Invalid or expired verification link' },
        { status: 400 }
      )
    }

    // Sign in with the email link
    const userCredential = await signInWithEmailLink(auth, email, url)
    const user = userCredential.user

    // Get the user's ID token
    const idToken = await user.getIdToken()

    // Check if this is a new user by checking if the user was just created
    // We'll determine this by checking if the user has any profile data
    const isNewUser = !user.displayName && !user.photoURL

    logger.info(`User ${email} ${isNewUser ? 'created' : 'signed in'} successfully`)

    return NextResponse.json({
      ok: true,
      user: {
        uid: user.uid,
        email: user.email,
        isNewUser,
        emailVerified: user.emailVerified
      },
      idToken
    })
  } catch (error) {
    logger.error('Error in magic link verification:', error)
    
    // Handle specific Firebase errors
    if (error instanceof Error) {
      if (error.message.includes('auth/invalid-action-code')) {
        return NextResponse.json(
          { message: 'Invalid or expired verification link' },
          { status: 400 }
        )
      }
      if (error.message.includes('auth/user-disabled')) {
        return NextResponse.json(
          { message: 'This account has been disabled' },
          { status: 403 }
        )
      }
      if (error.message.includes('auth/too-many-requests')) {
        return NextResponse.json(
          { message: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      }
    }
    
    return NextResponse.json(
      { message: 'Verification failed. Please try again.' },
      { status: 500 }
    )
  }
} 