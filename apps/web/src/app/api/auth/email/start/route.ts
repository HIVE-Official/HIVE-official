import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/firebase'
import { logger, validateEmailDomain } from "@hive/core"
import { db } from '../../../../../lib/firebase-admin'
import { sendSignInLinkToEmail } from 'firebase/auth'

// Check if we're in build time
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build'

export async function POST(request: NextRequest) {
  // During build time, return a mock response
  if (isBuildTime) {
    return NextResponse.json({ 
      success: true,
      message: 'Build-time mock response',
      email: 'build@example.edu'
    })
  }

  try {
    const body = await request.json()
    const { email, schoolId } = body
    
    // Enhanced logging for debugging
    logger.info(`📧 Email validation request: email="${email}", schoolId="${schoolId}"`)
    logger.info(`📋 Request body:`, JSON.stringify(body, null, 2))

    // Validate required parameters
    if (!email || !schoolId) {
      logger.warn(`❌ Missing required parameters: email="${email}" (${typeof email}), schoolId="${schoolId}" (${typeof schoolId})`)
      return NextResponse.json(
        { 
          message: 'Email and school selection are required',
          debug: { email: !!email, schoolId: !!schoolId }
        },
        { status: 400 }
      )
    }

    // Validate email format (.edu requirement)
    const eduRegex = /^[^@]+@[^@]+\.edu$/i
    const trimmedEmail = email.trim().toLowerCase()
    
    if (!eduRegex.test(trimmedEmail)) {
      logger.warn(`❌ Invalid .edu email format: "${email}" (trimmed: "${trimmedEmail}")`)
      return NextResponse.json(
        { 
          message: 'Please provide a valid .edu email address',
          debug: { 
            originalEmail: email,
            trimmedEmail: trimmedEmail,
            regexTest: eduRegex.test(trimmedEmail)
          }
        },
        { status: 400 }
      )
    }

    // Get school domain from Firestore
    logger.info(`🏫 Looking up school: "${schoolId}"`)
    const schoolDoc = await db.collection('schools').doc(schoolId).get()
    if (!schoolDoc.exists) {
      logger.warn(`❌ School not found in database: "${schoolId}"`)
      return NextResponse.json(
        { 
          message: 'Invalid school selected',
          debug: { schoolId: schoolId, exists: false }
        },
        { status: 400 }
      )
    }

    const schoolData = schoolDoc.data()
    logger.info(`🏫 School data:`, { name: schoolData?.name, domain: schoolData?.domain })
    
    if (!schoolData?.domain) {
      logger.error(`❌ School ${schoolId} has no domain configured:`, schoolData)
      return NextResponse.json(
        { 
          message: 'School configuration error',
          debug: { schoolId, schoolData: schoolData }
        },
        { status: 500 }
      )
    }

    // Validate email domain matches school domain
    const emailDomain = trimmedEmail.split('@')[1]?.toLowerCase()
    const schoolDomain = schoolData.domain.toLowerCase()
    
    if (!validateEmailDomain(trimmedEmail, schoolData.domain)) {
      logger.warn(`❌ Email domain mismatch: "${trimmedEmail}" (domain: "${emailDomain}") for school "${schoolId}" (expected: "${schoolDomain}")`)
      return NextResponse.json(
        { 
          message: `Please use your ${schoolData.domain} email address`,
          debug: {
            email: trimmedEmail,
            emailDomain: emailDomain,
            expectedDomain: schoolDomain,
            schoolId: schoolId
          }
        },
        { status: 400 }
      )
    }

    // In development mode, always use the fallback to avoid authentication setup issues
    if (process.env.NODE_ENV === 'development') {
      logger.info('🔥 Development mode: Using authentication bypass')
      logger.info(`📧 Would send magic link to: ${trimmedEmail}`)
      
      // Store email for development verification
      return NextResponse.json({
        success: true,
        message: 'Magic link sent! Check your email.',
        email: trimmedEmail,
        dev_mode: true
      })
    }

    // Check if Firebase is properly configured for production use
    // We need both client config (public vars) and admin config (private vars)
    const hasClientConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                           process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-api-key';
    const hasAdminConfig = process.env.FIREBASE_PRIVATE_KEY && 
                          process.env.FIREBASE_PRIVATE_KEY.trim() !== '' &&
                          !process.env.FIREBASE_PRIVATE_KEY.includes('YOUR_PRIVATE_KEY_HERE') &&
                          process.env.FIREBASE_CLIENT_EMAIL &&
                          process.env.FIREBASE_CLIENT_EMAIL.trim() !== '';
    
    const isFirebaseConfigured = hasClientConfig && hasAdminConfig;
    
    logger.info(`🔍 Firebase config check: client=${hasClientConfig}, admin=${hasAdminConfig}, complete=${isFirebaseConfigured}`)

    if (!isFirebaseConfigured) {
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

    // Firebase is configured - send actual magic link
    try {
      const actionCodeSettings = {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'}/auth/verify?email=${encodeURIComponent(trimmedEmail)}`,
        handleCodeInApp: true,
        // Remove Dynamic Links requirement for now
        // dynamicLinkDomain: process.env.NEXT_PUBLIC_FIREBASE_DYNAMIC_LINKS_DOMAIN
      }

      logger.info(`📧 Attempting to send magic link with action URL: ${actionCodeSettings.url}`)
      await sendSignInLinkToEmail(auth, trimmedEmail, actionCodeSettings)

      // Store verification request in Firestore
      await db.collection('email_verifications').add({
        email: trimmedEmail,
        schoolId: schoolId,
        status: 'pending',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        type: 'magic_link'
      })

      logger.info(`📧 Magic link sent successfully to: ${trimmedEmail}`)
      
      return NextResponse.json({ 
        success: true,
        message: 'Sign-in link sent! Check your email.',
        email: trimmedEmail
      })
    } catch (error: unknown) {
      logger.error('Failed to send magic link:', error)
      
      // Handle specific Firebase Auth errors
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string }
        
        switch (firebaseError.code) {
          case 'auth/invalid-email':
            return NextResponse.json(
              { message: 'Invalid email address' },
              { status: 400 }
            )
          case 'auth/email-already-in-use':
            return NextResponse.json(
              { message: 'An account with this email already exists' },
              { status: 400 }
            )
          case 'auth/configuration-not-found':
            logger.error('🚨 Firebase Email Link authentication not properly configured. Please check Firebase Console settings.')
            if (process.env.NODE_ENV === 'development') {
              // In development, fall back to mock success
              logger.info('💡 Development fallback: Simulating successful email send')
              return NextResponse.json({
                success: true,
                message: 'Magic link sent! (Development mode - check console)',
                email: trimmedEmail,
                dev_note: 'Email link auth not configured - using development fallback'
              })
            }
            return NextResponse.json(
              { message: 'Email service configuration error. Please contact support.' },
              { status: 503 }
            )
          default:
            logger.error(`🚨 Unhandled Firebase error code: ${firebaseError.code}`)
        }
      }

      return NextResponse.json(
        { message: 'Failed to send sign-in link' },
        { status: 500 }
      )
    }
  } catch (error) {
    logger.error('Error in email/start:', error)
    return NextResponse.json(
      { message: 'Failed to send sign-in link' },
      { status: 500 }
    )
  }
} 