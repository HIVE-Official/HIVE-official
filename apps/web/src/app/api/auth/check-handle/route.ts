import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@hive/core/src/firebase-admin';

const checkHandleSchema = z.object({
  handle: z.string()
    .min(3, 'Handle must be at least 3 characters')
    .max(20, 'Handle must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Handle can only contain letters, numbers, and underscores'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { handle } = checkHandleSchema.parse(body);

    // Normalize handle to lowercase for consistency
    const normalizedHandle = handle.toLowerCase();

    // Check if handle exists in the handles collection
    const handleDoc = await dbAdmin.collection('handles').doc(normalizedHandle).get();
    
    return NextResponse.json({
      available: !handleDoc.exists,
      handle: normalizedHandle,
    });

  } catch (error) {
    console.error('Error checking handle:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid handle format', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to check handle availability' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get('handle');

  if (!handle) {
    return NextResponse.json(
      { error: 'Handle parameter is required' },
      { status: 400 }
    );
  }

  try {
    const { handle: validatedHandle } = checkHandleSchema.parse({ handle });
    
    // Normalize handle to lowercase for consistency
    const normalizedHandle = validatedHandle.toLowerCase();

    // Check if handle exists in the handles collection
    const handleDoc = await dbAdmin.collection('handles').doc(normalizedHandle).get();
    
    return NextResponse.json({
      available: !handleDoc.exists,
      handle: normalizedHandle,
    });

  } catch (error) {
    console.error('Error checking handle:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid handle format', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to check handle availability' },
      { status: 500 }
    );
  }
} 