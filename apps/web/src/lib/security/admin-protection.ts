import { NextRequest, NextResponse } from 'next/server'
import { authAdmin } from '@/lib/firebase/admin/firebase-admin'
import { adminApiRateLimit } from '@/lib/api/middleware/rate-limit'
import { securityEvents, extractRequestInfo, detectSuspiciousActivity } from './monitoring'
import { logger  } from '@/types/core';

// 🔒 ADMIN ROUTE PROTECTION MIDDLEWARE

interface AdminUser {
  uid: string
  email: string
  role: 'admin' | 'moderator'
  permissions: string[]
}

export async function withAdminProtection<T>(
  request: NextRequest,
  handler: (request: NextRequest, admin: AdminUser) => Promise<NextResponse<T>>,
  options: {
    requiredPermission?: string
    allowModerator?: boolean
  } = {}
): Promise<NextResponse> {
  try {
    const { ip, userAgent } = extractRequestInfo(request)
    
    // 🔒 SECURITY: Block in production
    if (process.env.NODE_ENV === 'production') {
      logger.warn('🚫 Admin route accessed in production', { ip, userAgent })
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      )
    }
    
    // 🔒 SECURITY: Rate limiting for admin endpoints
    const rateLimitResult = await adminApiRateLimit.limit(ip)
    if (!rateLimitResult.success) {
      securityEvents.rateLimitExceeded(ip, request.url)
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }
    
    // 🔒 SECURITY: Check for suspicious activity
    const body = request.method !== 'GET' ? await request.json() : null
    const suspiciousPatterns = detectSuspiciousActivity(request, body)
    
    if (suspiciousPatterns.length > 0) {
      securityEvents.suspiciousActivity(
        ip,
        'admin_endpoint_suspicious_activity',
        undefined,
        { patterns: suspiciousPatterns, endpoint: request.url }
      )
      
      return NextResponse.json(
        { error: 'Suspicious activity detected' },
        { status: 403 }
      )
    }
    
    // 🔒 SECURITY: Authentication check
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      securityEvents.authFailure(ip, undefined, 'missing_auth_header')
      return NextResponse.json(
        { error: 'Unauthorized - Missing authentication' },
        { status: 401 }
      )
    }
    
    const token = authHeader.substring(7)
    
    try {
      // Verify Firebase token
      const decodedToken = await authAdmin.verifyIdToken(token)
      
      if (!decodedToken.uid || !decodedToken.email) {
        securityEvents.authFailure(ip, undefined, 'invalid_token_claims')
        return NextResponse.json(
          { error: 'Unauthorized - Invalid token' },
          { status: 401 }
        )
      }
      
      // Get user from database to check role
      const userDoc = await authAdmin.getUser(decodedToken.uid)
      
      if (!userDoc) {
        securityEvents.authFailure(ip, decodedToken.email, 'user_not_found')
        return NextResponse.json(
          { error: 'Unauthorized - User not found' },
          { status: 401 }
        )
      }
      
      // Check if user is admin or moderator
      const customClaims = userDoc.customClaims || {}
      const role = customClaims.role as string
      
      if (!role || !['admin', 'moderator'].includes(role)) {
        securityEvents.authFailure(ip, decodedToken.email, 'insufficient_permissions')
        return NextResponse.json(
          { error: 'Forbidden - Insufficient permissions' },
          { status: 403 }
        )
      }
      
      // Check moderator access if only admin allowed
      if (!options.allowModerator && role !== 'admin') {
        securityEvents.authFailure(ip, decodedToken.email, 'admin_only_endpoint')
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        )
      }
      
      // Check specific permission if required
      if (options.requiredPermission) {
        const permissions = customClaims.permissions as string[] || []
        if (!permissions.includes(options.requiredPermission)) {
          securityEvents.authFailure(ip, decodedToken.email, 'missing_permission')
          return NextResponse.json(
            { error: `Forbidden - Missing permission: ${options.requiredPermission}` },
            { status: 403 }
          )
        }
      }
      
      // Log admin access
      securityEvents.adminAccess(
        decodedToken.uid,
        ip,
        request.method,
        request.url
      )
      
      const adminUser: AdminUser = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: role as 'admin' | 'moderator',
        permissions: customClaims.permissions as string[] || []
      }
      
      // Call the protected handler
      return await handler(request, adminUser)
      
    } catch (authError) {
      logger.error('Admin authentication error:', { error: String(authError) })
      securityEvents.authFailure(ip, undefined, 'token_verification_failed')
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }
    
  } catch (error) {
    logger.error('Admin protection middleware error:', { error: String(error) })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 🔒 ADMIN PERMISSION CONSTANTS
export const ADMIN_PERMISSIONS = {
  // User management
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  DELETE_USERS: 'delete_users',
  
  // Space management
  MANAGE_SPACES: 'manage_spaces',
  CREATE_SPACES: 'create_spaces',
  DELETE_SPACES: 'delete_spaces',
  
  // Content moderation
  MODERATE_CONTENT: 'moderate_content',
  DELETE_CONTENT: 'delete_content',
  BAN_USERS: 'ban_users',
  
  // System administration
  SYSTEM_SETTINGS: 'system_settings',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SCHOOLS: 'manage_schools',
  
  // Security
  VIEW_LOGS: 'view_logs',
  SECURITY_ADMIN: 'security_admin',
} as const

// Helper function to check if user has permission
export function hasPermission(
  adminUser: AdminUser,
  permission: string
): boolean {
  return adminUser.role === 'admin' || adminUser.permissions.includes(permission)
}

// Decorator for admin routes
export function adminRoute<T>(
  handler: (request: NextRequest, admin: AdminUser) => Promise<NextResponse<T>>,
  options?: {
    requiredPermission?: string
    allowModerator?: boolean
  }
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    return withAdminProtection(request, handler, options)
  }
}