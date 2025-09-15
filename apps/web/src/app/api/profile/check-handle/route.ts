import { NextRequest, NextResponse } from 'next/server'
import { logger, generateHandleVariants, generateBaseHandle } from '@hive/core'
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin'
import { authRateLimiter, RATE_LIMITS } from '@/lib/auth/middleware/auth-rate-limiter'

async function generateSuggestions(baseHandle: string): Promise<string[]> {
  const variants = generateHandleVariants(baseHandle).slice(1, 6); // Get up to 5 suggestions
  const suggestions: string[] = [];
  
  for (const variant of variants) {
    try {
      // Check if this variant is available
      const variantQuery = await dbAdmin.collection('users')
        .where('handle', '==', variant)
        .limit(1)
        .get();
      
      if (variantQuery.empty) {
        suggestions.push(variant);
        if (suggestions.length >= 3) break; // Limit to 3 suggestions
      }
    } catch (error) {
      logger.error('Error checking variant availability:', error);
    }
  }
  
  return suggestions;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - prevent handle checking abuse
    const clientKey = authRateLimiter.getClientKey(request);
    const rateLimit = authRateLimiter.checkLimit(
      `check-handle:${clientKey}`,
      RATE_LIMITS.HANDLE_CHECK.maxRequests,
      RATE_LIMITS.HANDLE_CHECK.windowMs
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          available: false,
          message: 'Too many handle checks. Please wait before trying again.',
          retryAfter: rateLimit.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter?.toString() || '60',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime?.toString() || ''
          }
        }
      );
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

    // SECURITY FIX: Removed Firebase API key bypass - handle checking must always validate against real data
    // Use proper authentication middleware instead
    
    // Always check against real Firestore data
    try {
      const querySnapshot = await dbAdmin.collection('users')
        .where('handle', '==', handle.toLowerCase())
        .limit(1)
        .get()
      
      const available = querySnapshot.empty
      let suggestions: string[] = [];
      
      if (!available) {
        // Generate simple suggestions in dev mode
        const baseHandle = generateBaseHandle(handle);
        suggestions = [`${baseHandle}1`, `${baseHandle}2`, `${baseHandle}_new`].slice(0, 3);
      }
      
      return NextResponse.json({
        available,
        handle,
        message: available ? 'Handle is available' : 'Handle is already taken',
        suggestions
      });
    } catch (error) {
      console.error('Error checking handle availability:', error);
      return NextResponse.json(
        { error: 'Failed to check handle availability' },
        { status: 500 }
      );
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