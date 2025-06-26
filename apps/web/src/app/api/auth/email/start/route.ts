import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email format (.edu requirement)
    const eduRegex = /^[^@]+@[^@]+\.edu$/i
    if (!email || !eduRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid .edu email address' },
        { status: 400 }
      )
    }

    // TODO: Implement actual magic link sending logic
    // For now, simulate the process
    console.log(`Sending magic link to: ${email}`)

    // Simulate timeout (60 seconds)
    const timeoutMs = 60 * 1000

    return NextResponse.json({
      ok: true,
      timeoutMs,
      message: 'Magic link sent successfully'
    })
  } catch (error) {
    console.error('Error in magic link start:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 