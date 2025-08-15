import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper as _ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

/**
 * Simple test endpoint to verify Firebase connection without auth
 */
export async function GET() {
  try {
    logger.info('🔍 Testing Firebase connection...', { endpoint: '/api/spaces/test' });
    
    // Test basic Firebase query without auth
    const spacesSnapshot = await dbAdmin
      .collection('spaces')
      .doc('campus_living')
      .collection('spaces')
      .limit(5)
      .get();
    
    const spaces = spacesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({
      success: true,
      message: 'Firebase connection successful',
      structure: 'spaces/campus_living/spaces',
      spaceCount: spaces.length,
      spaces: spaces
    });
    
  } catch (error) {
    logger.error('❌ Test error', { error: error, endpoint: '/api/spaces/test' });
    
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      message: `${error}`,
      structure: 'spaces/campus_living/spaces'
    }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}