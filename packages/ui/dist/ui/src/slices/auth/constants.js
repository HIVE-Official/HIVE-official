/**
 * Auth Constants & Configuration
 *
 * Constants, configuration, and reference data for
 * authentication flows and session management in HIVE.
 */
// Authentication routes and endpoints
export const AUTH_ROUTES = {
    LOGIN: '/auth/login',
    VERIFY: '/auth/verify',
    LOGOUT: '/auth/logout',
    EXPIRED: '/auth/expired',
    // API endpoints
    API: {
        SEND_MAGIC_LINK: '/api/auth/send-magic-link',
        VERIFY_MAGIC_LINK: '/api/auth/verify-magic-link',
        SESSION: '/api/auth/session',
        LOGOUT: '/api/auth/logout',
        REFRESH: '/api/auth/refresh',
        DEV_LOGIN: '/api/dev-auth'
    }
};
// Magic link configuration
export const MAGIC_LINK_CONFIG = {
    // Expiry times (in minutes)
    LINK_EXPIRY: 15,
    TOKEN_EXPIRY: 60 * 24, // 24 hours
    // Rate limiting
    MAX_REQUESTS_PER_HOUR: 5,
    RESEND_COOLDOWN: 60, // seconds
    // Security
    TOKEN_LENGTH: 32,
    OTP_LENGTH: 6,
    MAX_VERIFICATION_ATTEMPTS: 3,
    // Email settings
    FROM_NAME: 'HIVE',
    FROM_EMAIL: 'auth@hive.college',
    SUBJECT: 'Sign in to HIVE',
    // Redirect handling
    DEFAULT_REDIRECT: '/dashboard',
    ONBOARDING_REDIRECT: '/onboarding',
    MAX_REDIRECT_LENGTH: 200
};
// Session configuration
export const SESSION_CONFIG = {
    // Session duration
    DEFAULT_DURATION: 60 * 24 * 7, // 7 days in minutes
    EXTENDED_DURATION: 60 * 24 * 30, // 30 days in minutes (remember me)
    // Security timeouts
    INACTIVITY_TIMEOUT: 60 * 4, // 4 hours in minutes
    WARNING_THRESHOLD: 10, // minutes before expiry to show warning
    // Refresh settings
    REFRESH_THRESHOLD: 60 * 24, // 24 hours before expiry
    AUTO_REFRESH_INTERVAL: 60 * 10, // 10 minutes
    // Storage keys
    STORAGE_KEY: 'hive-auth-session',
    REFRESH_KEY: 'hive-refresh-token',
    // Cookie settings
    COOKIE_NAME: 'session-token',
    COOKIE_OPTIONS: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days in seconds
    }
};
// User roles and permissions
export const USER_ROLES = {
    STUDENT: 'student',
    FACULTY: 'faculty',
    STAFF: 'staff',
    ALUMNI: 'alumni',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    BUILDER: 'builder'
};
export const PERMISSIONS = {
    // Basic permissions
    READ_PROFILE: 'read:profile',
    WRITE_PROFILE: 'write:profile',
    READ_SPACES: 'read:spaces',
    WRITE_SPACES: 'write:spaces',
    // Tool permissions
    CREATE_TOOLS: 'create:tools',
    PUBLISH_TOOLS: 'publish:tools',
    MODERATE_TOOLS: 'moderate:tools',
    // Admin permissions
    ADMIN_USERS: 'admin:users',
    ADMIN_SPACES: 'admin:spaces',
    ADMIN_CONTENT: 'admin:content',
    ADMIN_ANALYTICS: 'admin:analytics',
    // Moderation permissions
    MODERATE_CONTENT: 'moderate:content',
    MODERATE_USERS: 'moderate:users',
    MODERATE_SPACES: 'moderate:spaces'
};
// Role-permission mappings
export const ROLE_PERMISSIONS = {
    [USER_ROLES.STUDENT]: [
        PERMISSIONS.READ_PROFILE,
        PERMISSIONS.WRITE_PROFILE,
        PERMISSIONS.READ_SPACES,
        PERMISSIONS.WRITE_SPACES
    ],
    [USER_ROLES.FACULTY]: [
        PERMISSIONS.READ_PROFILE,
        PERMISSIONS.WRITE_PROFILE,
        PERMISSIONS.READ_SPACES,
        PERMISSIONS.WRITE_SPACES,
        PERMISSIONS.CREATE_TOOLS,
        PERMISSIONS.MODERATE_CONTENT
    ],
    [USER_ROLES.STAFF]: [
        PERMISSIONS.READ_PROFILE,
        PERMISSIONS.WRITE_PROFILE,
        PERMISSIONS.READ_SPACES,
        PERMISSIONS.WRITE_SPACES,
        PERMISSIONS.MODERATE_CONTENT
    ],
    [USER_ROLES.ALUMNI]: [
        PERMISSIONS.READ_PROFILE,
        PERMISSIONS.WRITE_PROFILE,
        PERMISSIONS.READ_SPACES
    ],
    [USER_ROLES.BUILDER]: [
        PERMISSIONS.CREATE_TOOLS,
        PERMISSIONS.PUBLISH_TOOLS
    ],
    [USER_ROLES.MODERATOR]: [
        PERMISSIONS.MODERATE_CONTENT,
        PERMISSIONS.MODERATE_USERS,
        PERMISSIONS.MODERATE_SPACES
    ],
    [USER_ROLES.ADMIN]: [
        ...Object.values(PERMISSIONS)
    ]
};
// Authentication error codes
export const AUTH_ERROR_CODES = {
    // Network errors
    NETWORK_ERROR: 'network-error',
    TIMEOUT: 'timeout',
    // Auth errors
    INVALID_EMAIL: 'invalid-email',
    USER_NOT_FOUND: 'user-not-found',
    WRONG_PASSWORD: 'wrong-password',
    TOO_MANY_REQUESTS: 'too-many-requests',
    // Magic link errors
    INVALID_MAGIC_LINK: 'invalid-magic-link',
    EXPIRED_MAGIC_LINK: 'expired-magic-link',
    MAGIC_LINK_USED: 'magic-link-already-used',
    // Session errors
    SESSION_EXPIRED: 'session-expired',
    INVALID_SESSION: 'invalid-session',
    SESSION_CONFLICT: 'session-conflict',
    // Permission errors
    INSUFFICIENT_PERMISSIONS: 'insufficient-permissions',
    ACCOUNT_DISABLED: 'account-disabled',
    EMAIL_NOT_VERIFIED: 'email-not-verified',
    // Server errors
    INTERNAL_ERROR: 'internal-error',
    SERVICE_UNAVAILABLE: 'service-unavailable'
};
// Error messages
export const AUTH_ERROR_MESSAGES = {
    [AUTH_ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection.',
    [AUTH_ERROR_CODES.TIMEOUT]: 'Request timed out. Please try again.',
    [AUTH_ERROR_CODES.INVALID_EMAIL]: 'Please enter a valid email address.',
    [AUTH_ERROR_CODES.USER_NOT_FOUND]: 'No account found with this email address.',
    [AUTH_ERROR_CODES.WRONG_PASSWORD]: 'Incorrect password.',
    [AUTH_ERROR_CODES.TOO_MANY_REQUESTS]: 'Too many attempts. Please try again later.',
    [AUTH_ERROR_CODES.INVALID_MAGIC_LINK]: 'Invalid or expired sign-in link.',
    [AUTH_ERROR_CODES.EXPIRED_MAGIC_LINK]: 'This sign-in link has expired. Please request a new one.',
    [AUTH_ERROR_CODES.MAGIC_LINK_USED]: 'This sign-in link has already been used.',
    [AUTH_ERROR_CODES.SESSION_EXPIRED]: 'Your session has expired. Please sign in again.',
    [AUTH_ERROR_CODES.INVALID_SESSION]: 'Invalid session. Please sign in again.',
    [AUTH_ERROR_CODES.SESSION_CONFLICT]: 'Session conflict detected. Please sign in again.',
    [AUTH_ERROR_CODES.INSUFFICIENT_PERMISSIONS]: 'You do not have permission to access this resource.',
    [AUTH_ERROR_CODES.ACCOUNT_DISABLED]: 'Your account has been disabled. Please contact support.',
    [AUTH_ERROR_CODES.EMAIL_NOT_VERIFIED]: 'Please verify your email address before continuing.',
    [AUTH_ERROR_CODES.INTERNAL_ERROR]: 'An unexpected error occurred. Please try again.',
    [AUTH_ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable. Please try again later.'
};
// Development mode configuration
export const DEV_CONFIG = {
    ENABLED: process.env.NODE_ENV === 'development',
    DEFAULT_USERS: [
        {
            email: 'student@buffalo.edu',
            uid: 'dev-student-1',
            handle: 'dev_student',
            schoolId: 'ub',
            userType: 'student',
            isOnboarded: true
        },
        {
            email: 'faculty@buffalo.edu',
            uid: 'dev-faculty-1',
            handle: 'dev_faculty',
            schoolId: 'ub',
            userType: 'faculty',
            isOnboarded: true
        },
        {
            email: 'admin@hive.college',
            uid: 'dev-admin-1',
            handle: 'dev_admin',
            schoolId: 'ub',
            userType: 'staff',
            isOnboarded: true,
            roles: ['admin']
        }
    ]
};
// Validation patterns
export const AUTH_VALIDATION = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    SCHOOL_EMAIL: /^[^\s@]+@[\w-]+\.edu$/,
    HANDLE: /^[a-zA-Z0-9_-]{3,30}$/,
    PASSWORD_MIN_LENGTH: 8,
    TOKEN_FORMAT: /^[a-zA-Z0-9]{32}$/,
    OTP_FORMAT: /^\d{6}$/
};
//# sourceMappingURL=constants.js.map