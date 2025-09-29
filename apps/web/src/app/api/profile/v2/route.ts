/**
 * Profile API v2 - Future implementation placeholder
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Profile API v2 is not yet implemented' },
    { status: 501 }
  );
}

export async function POST(_request: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Profile API v2 is not yet implemented' },
    { status: 501 }
  );
}