import { z } from 'zod';

// Define all possible auth error codes
export const AuthErrorCode = {
  // Authentication Errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EXPIRED_SESSION: 'EXPIRED_SESSION',
  INVALID_TOKEN: 'INVALID_TOKEN',
  EXPIRED_LINK: 'EXPIRED_LINK',
  
  // Network/Server Errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  
  // Validation Errors
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_SCHOOL: 'INVALID_SCHOOL',
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  
  // Session Errors
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  INVALID_SESSION: 'INVALID_SESSION',
  CONCURRENT_SESSION: 'CONCURRENT_SESSION',
  
  // Access Errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  REQUIRES_VERIFICATION: 'REQUIRES_VERIFICATION',
  
  // Generic
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const;

export type AuthErrorCodeType = typeof AuthErrorCode[keyof typeof AuthErrorCode];

// Zod schema for validating error responses
export const AuthErrorSchema = z.object({
  code: z.enum([...Object.values(AuthErrorCode)] as [string, ...string[]]),
  message: z.string(),
  retry: z.boolean().optional(),
  nextAction: z.object({
    type: z.enum(['REDIRECT', 'RETRY', 'WAIT', 'CONTACT_SUPPORT']),
    path: z.string().optional(),
    waitMs: z.number().optional(),
  }).optional(),
  details: z.record(z.unknown()).optional(),
});

export type AuthError = z.infer<typeof AuthErrorSchema>;

// Error messages for each error code
export const getErrorMessage = (code: AuthErrorCodeType): string => {
  switch (code) {
    case AuthErrorCode.INVALID_CREDENTIALS:
      return 'Invalid email or password.';
    case AuthErrorCode.EXPIRED_SESSION:
      return 'Your session has expired. Please sign in again.';
    case AuthErrorCode.INVALID_TOKEN:
      return 'This authentication token is invalid or has expired.';
    case AuthErrorCode.EXPIRED_LINK:
      return 'This magic link has expired. Please request a new one.';
    case AuthErrorCode.NETWORK_ERROR:
      return 'Unable to connect. Please check your internet connection.';
    case AuthErrorCode.SERVER_ERROR:
      return 'Server error. Please try again later.';
    case AuthErrorCode.RATE_LIMITED:
      return 'Too many attempts. Please wait before trying again.';
    case AuthErrorCode.INVALID_EMAIL:
      return 'Please use a valid .edu email address.';
    case AuthErrorCode.INVALID_SCHOOL:
      return 'This school is not yet supported on HIVE.';
    case AuthErrorCode.EMAIL_IN_USE:
      return 'This email is already registered.';
    case AuthErrorCode.SESSION_EXPIRED:
      return 'Your session has expired. Please sign in again.';
    case AuthErrorCode.INVALID_SESSION:
      return 'Your session is invalid. Please sign in again.';
    case AuthErrorCode.CONCURRENT_SESSION:
      return 'You\'ve been signed out due to a login from another device.';
    case AuthErrorCode.UNAUTHORIZED:
      return 'You don\'t have permission to access this resource.';
    case AuthErrorCode.ACCOUNT_LOCKED:
      return 'Your account has been locked. Please contact support.';
    case AuthErrorCode.REQUIRES_VERIFICATION:
      return 'Please verify your email address to continue.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

// Get recovery action for each error
export const getErrorRecoveryAction = (code: AuthErrorCodeType): { 
  type: 'REDIRECT' | 'RETRY' | 'WAIT' | 'CONTACT_SUPPORT';
  path?: string;
  waitMs?: number;
} => {
  switch (code) {
    case AuthErrorCode.EXPIRED_LINK:
    case AuthErrorCode.INVALID_TOKEN:
      return { type: 'REDIRECT', path: '/auth/email' };
    
    case AuthErrorCode.NETWORK_ERROR:
    case AuthErrorCode.SERVER_ERROR:
      return { type: 'RETRY' };
    
    case AuthErrorCode.RATE_LIMITED:
      return { type: 'WAIT', waitMs: 30000 }; // 30 seconds
    
    case AuthErrorCode.ACCOUNT_LOCKED:
      return { type: 'CONTACT_SUPPORT' };
    
    case AuthErrorCode.SESSION_EXPIRED:
    case AuthErrorCode.INVALID_SESSION:
    case AuthErrorCode.CONCURRENT_SESSION:
      return { type: 'REDIRECT', path: '/auth/choose' };
    
    case AuthErrorCode.REQUIRES_VERIFICATION:
      return { type: 'REDIRECT', path: '/auth/verify' };
    
    default:
      return { type: 'REDIRECT', path: '/auth/choose' };
  }
};

// Create an auth error instance
export const createAuthError = (
  code: AuthErrorCodeType,
  details?: Record<string, unknown>
): AuthError => {
  const recovery = getErrorRecoveryAction(code);
  
  return {
    code,
    message: getErrorMessage(code),
    retry: recovery.type === 'RETRY',
    nextAction: recovery,
    details
  };
}; 