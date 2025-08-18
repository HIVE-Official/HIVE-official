/**
 * Auth Constants & Configuration
 *
 * Constants, configuration, and reference data for
 * authentication flows and session management in HIVE.
 */
export declare const AUTH_ROUTES: {
    readonly LOGIN: "/auth/login";
    readonly VERIFY: "/auth/verify";
    readonly LOGOUT: "/auth/logout";
    readonly EXPIRED: "/auth/expired";
    readonly API: {
        readonly SEND_MAGIC_LINK: "/api/auth/send-magic-link";
        readonly VERIFY_MAGIC_LINK: "/api/auth/verify-magic-link";
        readonly SESSION: "/api/auth/session";
        readonly LOGOUT: "/api/auth/logout";
        readonly REFRESH: "/api/auth/refresh";
        readonly DEV_LOGIN: "/api/dev-auth";
    };
};
export declare const MAGIC_LINK_CONFIG: {
    readonly LINK_EXPIRY: 15;
    readonly TOKEN_EXPIRY: number;
    readonly MAX_REQUESTS_PER_HOUR: 5;
    readonly RESEND_COOLDOWN: 60;
    readonly TOKEN_LENGTH: 32;
    readonly OTP_LENGTH: 6;
    readonly MAX_VERIFICATION_ATTEMPTS: 3;
    readonly FROM_NAME: "HIVE";
    readonly FROM_EMAIL: "auth@hive.college";
    readonly SUBJECT: "Sign in to HIVE";
    readonly DEFAULT_REDIRECT: "/dashboard";
    readonly ONBOARDING_REDIRECT: "/onboarding";
    readonly MAX_REDIRECT_LENGTH: 200;
};
export declare const SESSION_CONFIG: {
    readonly DEFAULT_DURATION: number;
    readonly EXTENDED_DURATION: number;
    readonly INACTIVITY_TIMEOUT: number;
    readonly WARNING_THRESHOLD: 10;
    readonly REFRESH_THRESHOLD: number;
    readonly AUTO_REFRESH_INTERVAL: number;
    readonly STORAGE_KEY: "hive-auth-session";
    readonly REFRESH_KEY: "hive-refresh-token";
    readonly COOKIE_NAME: "session-token";
    readonly COOKIE_OPTIONS: {
        readonly httpOnly: true;
        readonly secure: true;
        readonly sameSite: "lax";
        readonly path: "/";
        readonly maxAge: number;
    };
};
export declare const USER_ROLES: {
    readonly STUDENT: "student";
    readonly FACULTY: "faculty";
    readonly STAFF: "staff";
    readonly ALUMNI: "alumni";
    readonly ADMIN: "admin";
    readonly MODERATOR: "moderator";
    readonly BUILDER: "builder";
};
export declare const PERMISSIONS: {
    readonly READ_PROFILE: "read:profile";
    readonly WRITE_PROFILE: "write:profile";
    readonly READ_SPACES: "read:spaces";
    readonly WRITE_SPACES: "write:spaces";
    readonly CREATE_TOOLS: "create:tools";
    readonly PUBLISH_TOOLS: "publish:tools";
    readonly MODERATE_TOOLS: "moderate:tools";
    readonly ADMIN_USERS: "admin:users";
    readonly ADMIN_SPACES: "admin:spaces";
    readonly ADMIN_CONTENT: "admin:content";
    readonly ADMIN_ANALYTICS: "admin:analytics";
    readonly MODERATE_CONTENT: "moderate:content";
    readonly MODERATE_USERS: "moderate:users";
    readonly MODERATE_SPACES: "moderate:spaces";
};
export declare const ROLE_PERMISSIONS: {
    readonly student: readonly ["read:profile", "write:profile", "read:spaces", "write:spaces"];
    readonly faculty: readonly ["read:profile", "write:profile", "read:spaces", "write:spaces", "create:tools", "moderate:content"];
    readonly staff: readonly ["read:profile", "write:profile", "read:spaces", "write:spaces", "moderate:content"];
    readonly alumni: readonly ["read:profile", "write:profile", "read:spaces"];
    readonly builder: readonly ["create:tools", "publish:tools"];
    readonly moderator: readonly ["moderate:content", "moderate:users", "moderate:spaces"];
    readonly admin: readonly ("read:profile" | "write:profile" | "read:spaces" | "write:spaces" | "create:tools" | "publish:tools" | "moderate:tools" | "admin:users" | "admin:spaces" | "admin:content" | "admin:analytics" | "moderate:content" | "moderate:users" | "moderate:spaces")[];
};
export declare const AUTH_ERROR_CODES: {
    readonly NETWORK_ERROR: "network-error";
    readonly TIMEOUT: "timeout";
    readonly INVALID_EMAIL: "invalid-email";
    readonly USER_NOT_FOUND: "user-not-found";
    readonly WRONG_PASSWORD: "wrong-password";
    readonly TOO_MANY_REQUESTS: "too-many-requests";
    readonly INVALID_MAGIC_LINK: "invalid-magic-link";
    readonly EXPIRED_MAGIC_LINK: "expired-magic-link";
    readonly MAGIC_LINK_USED: "magic-link-already-used";
    readonly SESSION_EXPIRED: "session-expired";
    readonly INVALID_SESSION: "invalid-session";
    readonly SESSION_CONFLICT: "session-conflict";
    readonly INSUFFICIENT_PERMISSIONS: "insufficient-permissions";
    readonly ACCOUNT_DISABLED: "account-disabled";
    readonly EMAIL_NOT_VERIFIED: "email-not-verified";
    readonly INTERNAL_ERROR: "internal-error";
    readonly SERVICE_UNAVAILABLE: "service-unavailable";
};
export declare const AUTH_ERROR_MESSAGES: {
    readonly "network-error": "Network error. Please check your connection.";
    readonly timeout: "Request timed out. Please try again.";
    readonly "invalid-email": "Please enter a valid email address.";
    readonly "user-not-found": "No account found with this email address.";
    readonly "wrong-password": "Incorrect password.";
    readonly "too-many-requests": "Too many attempts. Please try again later.";
    readonly "invalid-magic-link": "Invalid or expired sign-in link.";
    readonly "expired-magic-link": "This sign-in link has expired. Please request a new one.";
    readonly "magic-link-already-used": "This sign-in link has already been used.";
    readonly "session-expired": "Your session has expired. Please sign in again.";
    readonly "invalid-session": "Invalid session. Please sign in again.";
    readonly "session-conflict": "Session conflict detected. Please sign in again.";
    readonly "insufficient-permissions": "You do not have permission to access this resource.";
    readonly "account-disabled": "Your account has been disabled. Please contact support.";
    readonly "email-not-verified": "Please verify your email address before continuing.";
    readonly "internal-error": "An unexpected error occurred. Please try again.";
    readonly "service-unavailable": "Service temporarily unavailable. Please try again later.";
};
export declare const DEV_CONFIG: {
    readonly ENABLED: boolean;
    readonly DEFAULT_USERS: readonly [{
        readonly email: "student@buffalo.edu";
        readonly uid: "dev-student-1";
        readonly handle: "dev_student";
        readonly schoolId: "ub";
        readonly userType: "student";
        readonly isOnboarded: true;
    }, {
        readonly email: "faculty@buffalo.edu";
        readonly uid: "dev-faculty-1";
        readonly handle: "dev_faculty";
        readonly schoolId: "ub";
        readonly userType: "faculty";
        readonly isOnboarded: true;
    }, {
        readonly email: "admin@hive.college";
        readonly uid: "dev-admin-1";
        readonly handle: "dev_admin";
        readonly schoolId: "ub";
        readonly userType: "staff";
        readonly isOnboarded: true;
        readonly roles: readonly ["admin"];
    }];
};
export declare const AUTH_VALIDATION: {
    readonly EMAIL: RegExp;
    readonly SCHOOL_EMAIL: RegExp;
    readonly HANDLE: RegExp;
    readonly PASSWORD_MIN_LENGTH: 8;
    readonly TOKEN_FORMAT: RegExp;
    readonly OTP_FORMAT: RegExp;
};
//# sourceMappingURL=constants.d.ts.map