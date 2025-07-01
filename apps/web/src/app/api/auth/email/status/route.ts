import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { message: 'Email parameter is required' },
        { status: 400 }
      )
    }

    // TODO: Implement actual verification status checking
    // For now, simulate the process (always return false for demo)
    console.warn(`Checking verification status for: ${email}`)

    // Simulate some users being verified (for testing purposes)
    // In a real implementation, this would check the database
    const isVerified = false // Change to true to test the flow

    return NextResponse.json({
      verified: isVerified,
      email
    })
  } catch (error) {
    console.error('Error checking verification status:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 