import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';

/**
 * Simple test endpoint to verify Firebase connection without auth
 */
export async function GET() {
  try {
    console.log('🔍 Testing Firebase connection...');
    
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
    console.error('❌ Test error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      message: `${error}`,
      structure: 'spaces/campus_living/spaces'
    }, { status: 500 });
  }
}