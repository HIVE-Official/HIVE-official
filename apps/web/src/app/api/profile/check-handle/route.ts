import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@hive/core'
import { dbAdmin } from '@/lib/firebase-admin'

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 20 // requests per minute
const RATE_WINDOW = 60 * 1000 // 1 minute in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return false
  }
  
  userLimit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: 'Too many requests. Please wait before checking another handle.' },
        { status: 429 }
      )
    }

    const { handle } = await request.json()

    // Validate handle format
    if (!handle || typeof handle !== 'string') {
      return NextResponse.json(
        { available: false, message: 'Handle is required' },
        { status: 400 }
      )
    }

    // Validate handle format
    const handleRegex = /^[a-z0-9_]{3,20}$/
    if (!handleRegex.test(handle)) {
      return NextResponse.json(
        { 
          available: false, 
          message: 'Handle must be 3-20 characters, lowercase letters, numbers, and underscores only' 
        },
        { status: 400 }
      )
    }

    // Development mode bypass
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      logger.info('🔥 Development mode: handle checking bypassed')
      
      // In dev mode, simulate some handles being taken for testing
      const takenHandles = ['admin', 'test', 'user', 'hive', 'demo']
      const available = !takenHandles.includes(handle.toLowerCase())
      
      return NextResponse.json({
        available,
        handle,
        message: available ? 'Handle is available' : 'Handle is already taken'
      })
    }

    // Production mode: Check Firestore
    try {
      const handleQuery = await dbAdmin.collection('users')
        .where('handle', '==', handle)
        .limit(1)
        .get()

      const available = handleQuery.empty

      logger.info('Handle availability check:', {
        handle,
        available,
        querySize: handleQuery.size
      })

      return NextResponse.json({
        available,
        handle,
        message: available ? 'Handle is available' : 'Handle is already taken'
      })

    } catch (firestoreError) {
      logger.error('Firestore handle check failed:', firestoreError)
      
      return NextResponse.json(
        { 
          available: false, 
          message: 'Unable to check handle availability. Please try again.' 
        },
        { status: 500 }
      )
    }

  } catch (error) {
    logger.error('Error checking handle availability:', error)
    
    return NextResponse.json(
      { 
        available: false, 
        message: 'Failed to check handle availability. Please try again.' 
      },
      { status: 500 }
    )
  }
} 