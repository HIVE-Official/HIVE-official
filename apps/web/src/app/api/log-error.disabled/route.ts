import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const errorData = await request.json();
    
    // Log to server console (visible in Vercel logs)
    console.error('Client Error Report:', {
      timestamp: errorData.timestamp,
      url: errorData.url,
      error: {
        name: errorData.name,
        message: errorData.message,
        stack: errorData.stack?.slice(0, 1000), // Truncate stack trace
        digest: errorData.digest
      },
      userAgent: errorData.userAgent?.slice(0, 200) // Truncate user agent
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging endpoint failed:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}