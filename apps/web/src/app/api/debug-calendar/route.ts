import { NextRequest, NextResponse } from 'next/server';
import { ApiResponseHelper as _ApiResponseHelper, HttpStatus as _HttpStatus, ErrorCodes } from "@/lib/api-response-types";

export async function GET(request: NextRequest) {
  try {
    // Simple debug endpoint for calendar functionality
    return NextResponse.json({
      success: true,
      message: 'Calendar debug endpoint operational',
      timestamp: new Date().toISOString(),
      status: 'healthy'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}