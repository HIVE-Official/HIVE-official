import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";

/**
 * Admin Session API
 * GET /api/admin/session - Get current admin session
 */

// Admin user IDs from Firebase (should be stored in Firestore 'admins' collection)
const ADMIN_EMAILS = [
  'admin@hive.com',
  'admin@buffalo.edu',
  // Add real admin emails here
];

/**
 * Check if user is an admin by email or ID
 */
async function isAdminUser(userId: string, email: string | undefined): Promise<boolean> {
  try {
    // Check if email is in admin list
    if (email && ADMIN_EMAILS.includes(email)) {
      return true;
    }
    
    // Check Firestore admins collection
    const adminDoc = await dbAdmin.collection('admins').doc(userId).get();
    if (adminDoc.exists) {
      const adminData = adminDoc.data();
      return adminData?.active === true;
    }
    
    // Check if user has admin custom claim
    const auth = getAuth();
    const userRecord = await auth.getUser(userId);
    return userRecord.customClaims?.admin === true || userRecord.customClaims?.role === 'admin';
  } catch (error) {
    logger.error('Error checking admin status:', { error: String(error) });
    return false;
  }
}

/**
 * Get admin role and permissions
 */
async function getAdminRole(userId: string): Promise<{ role: string; permissions: string[] }> {
  try {
    // Check Firestore for admin role
    const adminDoc = await dbAdmin.collection('admins').doc(userId).get();
    if (adminDoc.exists) {
      const data = adminDoc.data();
      return {
        role: data?.role || 'moderator',
        permissions: data?.permissions || ['read'],
      };
    }
    
    // Default admin role
    return {
      role: 'admin',
      permissions: ['read', 'write', 'delete'],
    };
  } catch (error) {
    logger.error('Error getting admin role:', { error: String(error) });
    return {
      role: 'viewer',
      permissions: ['read'],
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get auth token from header or cookie
    const authHeader = request.headers.get('Authorization');
    const sessionCookie = request.cookies.get('session')?.value;
    
    if (!authHeader && !sessionCookie) {
      return NextResponse.json(
        ApiResponseHelper.error("No authentication token provided", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }
    
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7)
      : sessionCookie;
    
    if (!token) {
      return NextResponse.json(
        ApiResponseHelper.error("Invalid authentication format", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }
    
    // Handle test token in development
    if (process.env.NODE_ENV === 'development' && token === 'test-token') {
      return NextResponse.json(
        ApiResponseHelper.success({
          admin: {
            id: 'test-admin',
            email: 'admin@hive.com',
            role: 'admin',
            permissions: ['read', 'write', 'delete'],
            lastLogin: new Date().toISOString(),
          }
        })
      );
    }
    
    // Verify Firebase token
    try {
      const auth = getAuth();
      const decodedToken = await auth.verifyIdToken(token);
      const userId = decodedToken.uid;
      const email = decodedToken.email;
      
      // Check if user is an admin
      if (!(await isAdminUser(userId, email))) {
        return NextResponse.json(
          ApiResponseHelper.error("User is not an admin", "FORBIDDEN"),
          { status: HttpStatus.FORBIDDEN }
        );
      }
      
      // Get admin role and permissions
      const { role, permissions } = await getAdminRole(userId);
      
      // Update last login
      await dbAdmin.collection('admins').doc(userId).set({
        lastLogin: new Date().toISOString(),
        email,
      }, { merge: true });
      
      logger.info('👨‍💼 Admin session verified', { 
        userId,
        email,
        role,
        endpoint: '/api/admin/session' 
      });
      
      return NextResponse.json(
        ApiResponseHelper.success({
          admin: {
            id: userId,
            email: email || 'Unknown',
            role,
            permissions,
            lastLogin: new Date().toISOString(),
          }
        })
      );
    } catch (authError) {
      logger.error('Token verification failed:', { error: String(authError) });
      return NextResponse.json(
        ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }
  } catch (error) {
    logger.error('Admin session error:', { error: String(error) });
    return NextResponse.json(
      ApiResponseHelper.error("Internal server error", "SERVER_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}