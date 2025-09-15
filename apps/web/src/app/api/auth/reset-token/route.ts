import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";

/**
 * Development-only endpoint to reset magic link tokens for testing
 * WARNING: This should NEVER be exposed in production
 */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    // Get the token document
    const tokenDoc = await dbAdmin.collection('magicLinks').doc(token).get();
    
    if (!tokenDoc.exists) {
      return NextResponse.json(
        { error: "Token not found" },
        { status: 404 }
      );
    }

    // Reset the token
    await tokenDoc.ref.update({
      used: false,
      usedAt: null
    });

    const tokenData = tokenDoc.data();
    
    console.log('🔄 Token reset for testing:', {
      token: token.substring(0, 8) + '...',
      email: tokenData?.email
    });

    return NextResponse.json({
      success: true,
      message: "Token reset successfully",
      email: tokenData?.email
    });
  } catch (error) {
    console.error('Error resetting token:', error);
    return NextResponse.json(
      { error: "Failed to reset token" },
      { status: 500 }
    );
  }
}