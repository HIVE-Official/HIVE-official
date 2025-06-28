import { NextRequest, NextResponse } from 'next/server'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { auth } from '@hive/auth-logic'
import { logger } from '@hive/core'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email format (.edu requirement)
    const eduRegex = /^[^@]+@[^@]+\\.edu$/i
    if (!email || !eduRegex.test(email)) {
      logger.warn(`Invalid email attempted: ${email}`)
      return NextResponse.json(
        { message: 'Please provide a valid .edu email address' },
        { status: 400 }
      )
    }

    // Check if Firebase is properly configured
    const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                                 process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-api-key'

    if (!isFirebaseConfigured) {
      // Development/demo mode - comprehensive logging
      logger.info('🔥 Development mode: Firebase not configured')
      logger.info(`📧 Would send magic link to: ${email}`)
      
      if (process.env.NODE_ENV === 'development') {
        // Store email for development verification - but don't tell the user it's dev mode
        return NextResponse.json({
          success: true,
          message: 'Magic link sent! Check your email.',
          email, // Return email so client can store it
        })
      } else {
        // Production without Firebase config - this is an error
        logger.error('🚨 PRODUCTION ERROR: Firebase not configured but running in production')
        return NextResponse.json(
          { 
            message: 'Email service temporarily unavailable. Please try again later.',
            error: 'FIREBASE_CONFIG_MISSING'
          },
          { status: 503 }
        )
      }
    }

    // Firebase is configured - send real magic link
    if (!auth) {
      logger.error('🚨 Firebase auth not initialized')
      return NextResponse.json(
        { message: 'Authentication service unavailable' },
        { status: 503 }
      )
    }

    const actionCodeSettings = {
      // Production URL - change this to your actual domain
      url: process.env.NODE_ENV === 'production' 
        ? `https://your-domain.com/auth/verify` 
        : `http://localhost:3000/auth/verify`,
      handleCodeInApp: true,
    }

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      
      // Store email in user's browser for verification
      logger.info(`📧 Magic link sent successfully to: ${email}`)
      
      return NextResponse.json({
        success: true,
        message: 'Magic link sent! Check your email.',
        email, // Return email so client can store it
      })
      
    } catch (error: unknown) {
      logger.error('🚨 Firebase magic link error:', error)
      
      // Handle specific Firebase errors
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string }
        
        if (firebaseError.code === 'auth/invalid-email') {
          return NextResponse.json(
            { message: 'Invalid email address format' },
            { status: 400 }
          )
        } else if (firebaseError.code === 'auth/quota-exceeded') {
          return NextResponse.json(
            { message: 'Too many requests. Please try again later.' },
            { status: 429 }
          )
        } else if (firebaseError.code === 'auth/unauthorized-domain') {
          logger.error('🚨 CONFIGURATION ERROR: Domain not authorized in Firebase console')
          return NextResponse.json(
            { message: 'Email service configuration error. Please contact support.' },
            { status: 503 }
          )
        }
      }
      
      return NextResponse.json(
        { message: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    logger.error('🚨 Magic link API error:', error)
    return NextResponse.json(
      { message: 'Server error occurred. Please try again.' },
      { status: 500 }
    )
  }
} 