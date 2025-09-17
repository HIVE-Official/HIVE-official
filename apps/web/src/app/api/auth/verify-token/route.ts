import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin/firebase-admin";
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      return NextResponse.json(
        { error: "ID token is required" },
        { status: 400 }
      );
    }
    
    // Verify the ID token with Firebase Admin
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Token is valid
    return NextResponse.json({
      valid: true,
      uid: decodedToken.uid,
      email: decodedToken.email
    });
    
  } catch (error) {
    logger.error("Token verification failed", { error });
    
    return NextResponse.json(
      { error: "Invalid token", valid: false },
      { status: 401 }
    );
  }
}