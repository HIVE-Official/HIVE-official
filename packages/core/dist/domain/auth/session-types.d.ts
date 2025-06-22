import { z } from "zod";
export interface UserSession {
    id: string;
    userId: string;
    user: SessionUser;
    authentication: AuthenticationState;
    permissions: UserPermissions;
    context: SessionContext;
    metadata: SessionMetadata;
}
export interface SessionUser {
    id: string;
    email: string;
    emailVerified: boolean;
    handle?: string;
    fullName?: string;
    avatar?: string;
    school?: UserSchool;
    profile: UserProfile;
    preferences: UserPreferences;
}
export interface UserSchool {
    id: string;
    name: string;
    domain: string;
    verified: boolean;
    type: "university" | "college" | "community-college" | "trade-school";
    location: {
        city: string;
        state: string;
        country: string;
    };
}
export interface UserProfile {
    bio?: string;
    major?: string;
    graduationYear?: number;
    interests: string[];
    visibility: "public" | "campus-only" | "private";
    onboardingCompleted: boolean;
    profilePicture?: string;
    coverPhoto?: string;
}
export interface UserPreferences {
    theme: "light" | "dark" | "system";
    language: string;
    timezone: string;
    notifications: NotificationPreferences;
    privacy: PrivacyPreferences;
    accessibility: AccessibilityPreferences;
}
export interface NotificationPreferences {
    email: {
        enabled: boolean;
        frequency: "instant" | "daily" | "weekly" | "never";
        types: NotificationType[];
    };
    push: {
        enabled: boolean;
        types: NotificationType[];
    };
    inApp: {
        enabled: boolean;
        types: NotificationType[];
    };
}
export type NotificationType = "new-post" | "comment" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert";
export interface PrivacyPreferences {
    profileVisibility: "public" | "campus-only" | "private";
    showEmail: boolean;
    showSchool: boolean;
    allowDirectMessages: boolean;
    allowSpaceInvites: boolean;
    dataCollection: boolean;
    analytics: boolean;
}
export interface AccessibilityPreferences {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: "small" | "medium" | "large" | "extra-large";
    screenReader: boolean;
    keyboardNavigation: boolean;
}
export interface AuthenticationState {
    isAuthenticated: boolean;
    method: AuthMethod;
    provider: AuthProvider;
    tokenType: "access" | "refresh" | "id";
    expiresAt: Date;
    lastLoginAt: Date;
    loginCount: number;
    mfaEnabled: boolean;
    mfaVerified: boolean;
}
export type AuthMethod = "magic-link" | "oauth" | "password" | "sso";
export type AuthProvider = "email" | "google" | "microsoft" | "apple" | "github";
export interface UserPermissions {
    roles: UserRole[];
    scopes: PermissionScope[];
    restrictions: PermissionRestriction[];
    campus: CampusPermissions;
}
export interface UserRole {
    id: string;
    name: string;
    type: "system" | "campus" | "space" | "custom";
    level: number;
    inherits?: string[];
}
export type PermissionScope = "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
export interface PermissionRestriction {
    type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
    scope: PermissionScope;
    limit: number;
    period: string;
    reason: string;
}
export interface CampusPermissions {
    canCreateSpaces: boolean;
    canModerateContent: boolean;
    canInviteUsers: boolean;
    canAccessAnalytics: boolean;
    canManageEvents: boolean;
    maxSpacesOwned: number;
    maxPostsPerDay: number;
}
export interface SessionContext {
    device: DeviceInfo;
    location: LocationInfo;
    network: NetworkInfo;
    activity: ActivityInfo;
    security: SecurityInfo;
}
export interface DeviceInfo {
    type: "desktop" | "mobile" | "tablet";
    os: string;
    browser: string;
    version: string;
    userAgent: string;
    screenResolution: {
        width: number;
        height: number;
    };
    timezone: string;
    language: string;
}
export interface LocationInfo {
    country?: string;
    region?: string;
    city?: string;
    timezone: string;
    campus?: {
        id: string;
        name: string;
        onCampus: boolean;
    };
}
export interface NetworkInfo {
    ip: string;
    isp?: string;
    type: "wifi" | "cellular" | "ethernet" | "unknown";
    vpn: boolean;
}
export interface ActivityInfo {
    lastActive: Date;
    currentPage: string;
    sessionDuration: number;
    pageViews: number;
    interactions: number;
    idleTime: number;
}
export interface SecurityInfo {
    riskScore: number;
    flags: SecurityFlag[];
    lastSecurityCheck: Date;
    trustedDevice: boolean;
    suspiciousActivity: boolean;
}
export interface SecurityFlag {
    type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
    severity: "low" | "medium" | "high" | "critical";
    timestamp: Date;
    description: string;
}
export interface SessionMetadata {
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    version: string;
    source: "web" | "mobile" | "api" | "admin";
    fingerprint: string;
    tags: string[];
}
export declare const userSchoolSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    domain: z.ZodString;
    verified: z.ZodBoolean;
    type: z.ZodEnum<["university", "college", "community-college", "trade-school"]>;
    location: z.ZodObject<{
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        city: string;
        state: string;
        country: string;
    }, {
        city: string;
        state: string;
        country: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "university" | "college" | "community-college" | "trade-school";
    id: string;
    name: string;
    location: {
        city: string;
        state: string;
        country: string;
    };
    verified: boolean;
    domain: string;
}, {
    type: "university" | "college" | "community-college" | "trade-school";
    id: string;
    name: string;
    location: {
        city: string;
        state: string;
        country: string;
    };
    verified: boolean;
    domain: string;
}>;
export declare const userProfileSchema: z.ZodObject<{
    bio: z.ZodOptional<z.ZodString>;
    major: z.ZodOptional<z.ZodString>;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    interests: z.ZodArray<z.ZodString, "many">;
    visibility: z.ZodEnum<["public", "campus-only", "private"]>;
    onboardingCompleted: z.ZodBoolean;
    profilePicture: z.ZodOptional<z.ZodString>;
    coverPhoto: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    onboardingCompleted: boolean;
    visibility: "public" | "campus-only" | "private";
    interests: string[];
    major?: string | undefined;
    graduationYear?: number | undefined;
    bio?: string | undefined;
    profilePicture?: string | undefined;
    coverPhoto?: string | undefined;
}, {
    onboardingCompleted: boolean;
    visibility: "public" | "campus-only" | "private";
    interests: string[];
    major?: string | undefined;
    graduationYear?: number | undefined;
    bio?: string | undefined;
    profilePicture?: string | undefined;
    coverPhoto?: string | undefined;
}>;
export declare const notificationPreferencesSchema: z.ZodObject<{
    email: z.ZodObject<{
        enabled: z.ZodBoolean;
        frequency: z.ZodEnum<["instant", "daily", "weekly", "never"]>;
        types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        frequency: "never" | "instant" | "daily" | "weekly";
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    }, {
        enabled: boolean;
        frequency: "never" | "instant" | "daily" | "weekly";
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    }>;
    push: z.ZodObject<{
        enabled: z.ZodBoolean;
        types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    }, {
        enabled: boolean;
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    }>;
    inApp: z.ZodObject<{
        enabled: z.ZodBoolean;
        types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    }, {
        enabled: boolean;
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    }>;
}, "strip", z.ZodTypeAny, {
    push: {
        enabled: boolean;
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    };
    email: {
        enabled: boolean;
        frequency: "never" | "instant" | "daily" | "weekly";
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    };
    inApp: {
        enabled: boolean;
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    };
}, {
    push: {
        enabled: boolean;
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    };
    email: {
        enabled: boolean;
        frequency: "never" | "instant" | "daily" | "weekly";
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    };
    inApp: {
        enabled: boolean;
        types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
    };
}>;
export declare const userPreferencesSchema: z.ZodObject<{
    theme: z.ZodEnum<["light", "dark", "system"]>;
    language: z.ZodString;
    timezone: z.ZodString;
    notifications: z.ZodObject<{
        email: z.ZodObject<{
            enabled: z.ZodBoolean;
            frequency: z.ZodEnum<["instant", "daily", "weekly", "never"]>;
            types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            frequency: "never" | "instant" | "daily" | "weekly";
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        }, {
            enabled: boolean;
            frequency: "never" | "instant" | "daily" | "weekly";
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        }>;
        push: z.ZodObject<{
            enabled: z.ZodBoolean;
            types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        }, {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        }>;
        inApp: z.ZodObject<{
            enabled: z.ZodBoolean;
            types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        }, {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        }>;
    }, "strip", z.ZodTypeAny, {
        push: {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
        email: {
            enabled: boolean;
            frequency: "never" | "instant" | "daily" | "weekly";
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
        inApp: {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
    }, {
        push: {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
        email: {
            enabled: boolean;
            frequency: "never" | "instant" | "daily" | "weekly";
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
        inApp: {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
    }>;
    privacy: z.ZodObject<{
        profileVisibility: z.ZodEnum<["public", "campus-only", "private"]>;
        showEmail: z.ZodBoolean;
        showSchool: z.ZodBoolean;
        allowDirectMessages: z.ZodBoolean;
        allowSpaceInvites: z.ZodBoolean;
        dataCollection: z.ZodBoolean;
        analytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        analytics: boolean;
        profileVisibility: "public" | "campus-only" | "private";
        showEmail: boolean;
        showSchool: boolean;
        allowDirectMessages: boolean;
        allowSpaceInvites: boolean;
        dataCollection: boolean;
    }, {
        analytics: boolean;
        profileVisibility: "public" | "campus-only" | "private";
        showEmail: boolean;
        showSchool: boolean;
        allowDirectMessages: boolean;
        allowSpaceInvites: boolean;
        dataCollection: boolean;
    }>;
    accessibility: z.ZodObject<{
        reducedMotion: z.ZodBoolean;
        highContrast: z.ZodBoolean;
        fontSize: z.ZodEnum<["small", "medium", "large", "extra-large"]>;
        screenReader: z.ZodBoolean;
        keyboardNavigation: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        fontSize: "small" | "medium" | "large" | "extra-large";
        reducedMotion: boolean;
        highContrast: boolean;
        screenReader: boolean;
        keyboardNavigation: boolean;
    }, {
        fontSize: "small" | "medium" | "large" | "extra-large";
        reducedMotion: boolean;
        highContrast: boolean;
        screenReader: boolean;
        keyboardNavigation: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    language: string;
    theme: "light" | "dark" | "system";
    privacy: {
        analytics: boolean;
        profileVisibility: "public" | "campus-only" | "private";
        showEmail: boolean;
        showSchool: boolean;
        allowDirectMessages: boolean;
        allowSpaceInvites: boolean;
        dataCollection: boolean;
    };
    timezone: string;
    notifications: {
        push: {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
        email: {
            enabled: boolean;
            frequency: "never" | "instant" | "daily" | "weekly";
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
        inApp: {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
    };
    accessibility: {
        fontSize: "small" | "medium" | "large" | "extra-large";
        reducedMotion: boolean;
        highContrast: boolean;
        screenReader: boolean;
        keyboardNavigation: boolean;
    };
}, {
    language: string;
    theme: "light" | "dark" | "system";
    privacy: {
        analytics: boolean;
        profileVisibility: "public" | "campus-only" | "private";
        showEmail: boolean;
        showSchool: boolean;
        allowDirectMessages: boolean;
        allowSpaceInvites: boolean;
        dataCollection: boolean;
    };
    timezone: string;
    notifications: {
        push: {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
        email: {
            enabled: boolean;
            frequency: "never" | "instant" | "daily" | "weekly";
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
        inApp: {
            enabled: boolean;
            types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
        };
    };
    accessibility: {
        fontSize: "small" | "medium" | "large" | "extra-large";
        reducedMotion: boolean;
        highContrast: boolean;
        screenReader: boolean;
        keyboardNavigation: boolean;
    };
}>;
export declare const sessionUserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodBoolean;
    handle: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    school: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        domain: z.ZodString;
        verified: z.ZodBoolean;
        type: z.ZodEnum<["university", "college", "community-college", "trade-school"]>;
        location: z.ZodObject<{
            city: z.ZodString;
            state: z.ZodString;
            country: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            city: string;
            state: string;
            country: string;
        }, {
            city: string;
            state: string;
            country: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "university" | "college" | "community-college" | "trade-school";
        id: string;
        name: string;
        location: {
            city: string;
            state: string;
            country: string;
        };
        verified: boolean;
        domain: string;
    }, {
        type: "university" | "college" | "community-college" | "trade-school";
        id: string;
        name: string;
        location: {
            city: string;
            state: string;
            country: string;
        };
        verified: boolean;
        domain: string;
    }>>;
    profile: z.ZodObject<{
        bio: z.ZodOptional<z.ZodString>;
        major: z.ZodOptional<z.ZodString>;
        graduationYear: z.ZodOptional<z.ZodNumber>;
        interests: z.ZodArray<z.ZodString, "many">;
        visibility: z.ZodEnum<["public", "campus-only", "private"]>;
        onboardingCompleted: z.ZodBoolean;
        profilePicture: z.ZodOptional<z.ZodString>;
        coverPhoto: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        onboardingCompleted: boolean;
        visibility: "public" | "campus-only" | "private";
        interests: string[];
        major?: string | undefined;
        graduationYear?: number | undefined;
        bio?: string | undefined;
        profilePicture?: string | undefined;
        coverPhoto?: string | undefined;
    }, {
        onboardingCompleted: boolean;
        visibility: "public" | "campus-only" | "private";
        interests: string[];
        major?: string | undefined;
        graduationYear?: number | undefined;
        bio?: string | undefined;
        profilePicture?: string | undefined;
        coverPhoto?: string | undefined;
    }>;
    preferences: z.ZodObject<{
        theme: z.ZodEnum<["light", "dark", "system"]>;
        language: z.ZodString;
        timezone: z.ZodString;
        notifications: z.ZodObject<{
            email: z.ZodObject<{
                enabled: z.ZodBoolean;
                frequency: z.ZodEnum<["instant", "daily", "weekly", "never"]>;
                types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                frequency: "never" | "instant" | "daily" | "weekly";
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            }, {
                enabled: boolean;
                frequency: "never" | "instant" | "daily" | "weekly";
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            }>;
            push: z.ZodObject<{
                enabled: z.ZodBoolean;
                types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            }, {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            }>;
            inApp: z.ZodObject<{
                enabled: z.ZodBoolean;
                types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            }, {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            }>;
        }, "strip", z.ZodTypeAny, {
            push: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            email: {
                enabled: boolean;
                frequency: "never" | "instant" | "daily" | "weekly";
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            inApp: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
        }, {
            push: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            email: {
                enabled: boolean;
                frequency: "never" | "instant" | "daily" | "weekly";
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            inApp: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
        }>;
        privacy: z.ZodObject<{
            profileVisibility: z.ZodEnum<["public", "campus-only", "private"]>;
            showEmail: z.ZodBoolean;
            showSchool: z.ZodBoolean;
            allowDirectMessages: z.ZodBoolean;
            allowSpaceInvites: z.ZodBoolean;
            dataCollection: z.ZodBoolean;
            analytics: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            analytics: boolean;
            profileVisibility: "public" | "campus-only" | "private";
            showEmail: boolean;
            showSchool: boolean;
            allowDirectMessages: boolean;
            allowSpaceInvites: boolean;
            dataCollection: boolean;
        }, {
            analytics: boolean;
            profileVisibility: "public" | "campus-only" | "private";
            showEmail: boolean;
            showSchool: boolean;
            allowDirectMessages: boolean;
            allowSpaceInvites: boolean;
            dataCollection: boolean;
        }>;
        accessibility: z.ZodObject<{
            reducedMotion: z.ZodBoolean;
            highContrast: z.ZodBoolean;
            fontSize: z.ZodEnum<["small", "medium", "large", "extra-large"]>;
            screenReader: z.ZodBoolean;
            keyboardNavigation: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            fontSize: "small" | "medium" | "large" | "extra-large";
            reducedMotion: boolean;
            highContrast: boolean;
            screenReader: boolean;
            keyboardNavigation: boolean;
        }, {
            fontSize: "small" | "medium" | "large" | "extra-large";
            reducedMotion: boolean;
            highContrast: boolean;
            screenReader: boolean;
            keyboardNavigation: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        language: string;
        theme: "light" | "dark" | "system";
        privacy: {
            analytics: boolean;
            profileVisibility: "public" | "campus-only" | "private";
            showEmail: boolean;
            showSchool: boolean;
            allowDirectMessages: boolean;
            allowSpaceInvites: boolean;
            dataCollection: boolean;
        };
        timezone: string;
        notifications: {
            push: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            email: {
                enabled: boolean;
                frequency: "never" | "instant" | "daily" | "weekly";
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            inApp: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
        };
        accessibility: {
            fontSize: "small" | "medium" | "large" | "extra-large";
            reducedMotion: boolean;
            highContrast: boolean;
            screenReader: boolean;
            keyboardNavigation: boolean;
        };
    }, {
        language: string;
        theme: "light" | "dark" | "system";
        privacy: {
            analytics: boolean;
            profileVisibility: "public" | "campus-only" | "private";
            showEmail: boolean;
            showSchool: boolean;
            allowDirectMessages: boolean;
            allowSpaceInvites: boolean;
            dataCollection: boolean;
        };
        timezone: string;
        notifications: {
            push: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            email: {
                enabled: boolean;
                frequency: "never" | "instant" | "daily" | "weekly";
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            inApp: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
        };
        accessibility: {
            fontSize: "small" | "medium" | "large" | "extra-large";
            reducedMotion: boolean;
            highContrast: boolean;
            screenReader: boolean;
            keyboardNavigation: boolean;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    profile: {
        onboardingCompleted: boolean;
        visibility: "public" | "campus-only" | "private";
        interests: string[];
        major?: string | undefined;
        graduationYear?: number | undefined;
        bio?: string | undefined;
        profilePicture?: string | undefined;
        coverPhoto?: string | undefined;
    };
    emailVerified: boolean;
    preferences: {
        language: string;
        theme: "light" | "dark" | "system";
        privacy: {
            analytics: boolean;
            profileVisibility: "public" | "campus-only" | "private";
            showEmail: boolean;
            showSchool: boolean;
            allowDirectMessages: boolean;
            allowSpaceInvites: boolean;
            dataCollection: boolean;
        };
        timezone: string;
        notifications: {
            push: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            email: {
                enabled: boolean;
                frequency: "never" | "instant" | "daily" | "weekly";
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            inApp: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
        };
        accessibility: {
            fontSize: "small" | "medium" | "large" | "extra-large";
            reducedMotion: boolean;
            highContrast: boolean;
            screenReader: boolean;
            keyboardNavigation: boolean;
        };
    };
    handle?: string | undefined;
    fullName?: string | undefined;
    avatar?: string | undefined;
    school?: {
        type: "university" | "college" | "community-college" | "trade-school";
        id: string;
        name: string;
        location: {
            city: string;
            state: string;
            country: string;
        };
        verified: boolean;
        domain: string;
    } | undefined;
}, {
    id: string;
    email: string;
    profile: {
        onboardingCompleted: boolean;
        visibility: "public" | "campus-only" | "private";
        interests: string[];
        major?: string | undefined;
        graduationYear?: number | undefined;
        bio?: string | undefined;
        profilePicture?: string | undefined;
        coverPhoto?: string | undefined;
    };
    emailVerified: boolean;
    preferences: {
        language: string;
        theme: "light" | "dark" | "system";
        privacy: {
            analytics: boolean;
            profileVisibility: "public" | "campus-only" | "private";
            showEmail: boolean;
            showSchool: boolean;
            allowDirectMessages: boolean;
            allowSpaceInvites: boolean;
            dataCollection: boolean;
        };
        timezone: string;
        notifications: {
            push: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            email: {
                enabled: boolean;
                frequency: "never" | "instant" | "daily" | "weekly";
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
            inApp: {
                enabled: boolean;
                types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
            };
        };
        accessibility: {
            fontSize: "small" | "medium" | "large" | "extra-large";
            reducedMotion: boolean;
            highContrast: boolean;
            screenReader: boolean;
            keyboardNavigation: boolean;
        };
    };
    handle?: string | undefined;
    fullName?: string | undefined;
    avatar?: string | undefined;
    school?: {
        type: "university" | "college" | "community-college" | "trade-school";
        id: string;
        name: string;
        location: {
            city: string;
            state: string;
            country: string;
        };
        verified: boolean;
        domain: string;
    } | undefined;
}>;
export declare const authenticationStateSchema: z.ZodObject<{
    isAuthenticated: z.ZodBoolean;
    method: z.ZodEnum<["magic-link", "oauth", "password", "sso"]>;
    provider: z.ZodEnum<["email", "google", "microsoft", "apple", "github"]>;
    tokenType: z.ZodEnum<["access", "refresh", "id"]>;
    expiresAt: z.ZodDate;
    lastLoginAt: z.ZodDate;
    loginCount: z.ZodNumber;
    mfaEnabled: z.ZodBoolean;
    mfaVerified: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    expiresAt: Date;
    isAuthenticated: boolean;
    method: "password" | "magic-link" | "oauth" | "sso";
    provider: "email" | "google" | "microsoft" | "apple" | "github";
    tokenType: "id" | "access" | "refresh";
    lastLoginAt: Date;
    loginCount: number;
    mfaEnabled: boolean;
    mfaVerified: boolean;
}, {
    expiresAt: Date;
    isAuthenticated: boolean;
    method: "password" | "magic-link" | "oauth" | "sso";
    provider: "email" | "google" | "microsoft" | "apple" | "github";
    tokenType: "id" | "access" | "refresh";
    lastLoginAt: Date;
    loginCount: number;
    mfaEnabled: boolean;
    mfaVerified: boolean;
}>;
export declare const userPermissionsSchema: z.ZodObject<{
    roles: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["system", "campus", "space", "custom"]>;
        level: z.ZodNumber;
        inherits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "custom" | "system" | "campus" | "space";
        id: string;
        name: string;
        level: number;
        inherits?: string[] | undefined;
    }, {
        type: "custom" | "system" | "campus" | "space";
        id: string;
        name: string;
        level: number;
        inherits?: string[] | undefined;
    }>, "many">;
    scopes: z.ZodArray<z.ZodEnum<["read:profile", "write:profile", "read:feed", "write:posts", "read:spaces", "write:spaces", "moderate:content", "admin:users", "admin:system"]>, "many">;
    restrictions: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["rate-limit", "content-filter", "feature-gate", "time-based"]>;
        scope: z.ZodEnum<["read:profile", "write:profile", "read:feed", "write:posts", "read:spaces", "write:spaces", "moderate:content", "admin:users", "admin:system"]>;
        limit: z.ZodNumber;
        period: z.ZodString;
        reason: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
        limit: number;
        reason: string;
        scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
        period: string;
    }, {
        type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
        limit: number;
        reason: string;
        scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
        period: string;
    }>, "many">;
    campus: z.ZodObject<{
        canCreateSpaces: z.ZodBoolean;
        canModerateContent: z.ZodBoolean;
        canInviteUsers: z.ZodBoolean;
        canAccessAnalytics: z.ZodBoolean;
        canManageEvents: z.ZodBoolean;
        maxSpacesOwned: z.ZodNumber;
        maxPostsPerDay: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        canCreateSpaces: boolean;
        canModerateContent: boolean;
        canInviteUsers: boolean;
        canAccessAnalytics: boolean;
        canManageEvents: boolean;
        maxSpacesOwned: number;
        maxPostsPerDay: number;
    }, {
        canCreateSpaces: boolean;
        canModerateContent: boolean;
        canInviteUsers: boolean;
        canAccessAnalytics: boolean;
        canManageEvents: boolean;
        maxSpacesOwned: number;
        maxPostsPerDay: number;
    }>;
}, "strip", z.ZodTypeAny, {
    campus: {
        canCreateSpaces: boolean;
        canModerateContent: boolean;
        canInviteUsers: boolean;
        canAccessAnalytics: boolean;
        canManageEvents: boolean;
        maxSpacesOwned: number;
        maxPostsPerDay: number;
    };
    roles: {
        type: "custom" | "system" | "campus" | "space";
        id: string;
        name: string;
        level: number;
        inherits?: string[] | undefined;
    }[];
    scopes: ("read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system")[];
    restrictions: {
        type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
        limit: number;
        reason: string;
        scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
        period: string;
    }[];
}, {
    campus: {
        canCreateSpaces: boolean;
        canModerateContent: boolean;
        canInviteUsers: boolean;
        canAccessAnalytics: boolean;
        canManageEvents: boolean;
        maxSpacesOwned: number;
        maxPostsPerDay: number;
    };
    roles: {
        type: "custom" | "system" | "campus" | "space";
        id: string;
        name: string;
        level: number;
        inherits?: string[] | undefined;
    }[];
    scopes: ("read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system")[];
    restrictions: {
        type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
        limit: number;
        reason: string;
        scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
        period: string;
    }[];
}>;
export declare const sessionContextSchema: z.ZodObject<{
    device: z.ZodObject<{
        type: z.ZodEnum<["desktop", "mobile", "tablet"]>;
        os: z.ZodString;
        browser: z.ZodString;
        version: z.ZodString;
        userAgent: z.ZodString;
        screenResolution: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>;
        timezone: z.ZodString;
        language: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "desktop" | "tablet" | "mobile";
        version: string;
        language: string;
        userAgent: string;
        os: string;
        browser: string;
        timezone: string;
        screenResolution: {
            width: number;
            height: number;
        };
    }, {
        type: "desktop" | "tablet" | "mobile";
        version: string;
        language: string;
        userAgent: string;
        os: string;
        browser: string;
        timezone: string;
        screenResolution: {
            width: number;
            height: number;
        };
    }>;
    location: z.ZodObject<{
        country: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        timezone: z.ZodString;
        campus: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            onCampus: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            onCampus: boolean;
        }, {
            id: string;
            name: string;
            onCampus: boolean;
        }>>;
    }, "strip", z.ZodTypeAny, {
        timezone: string;
        campus?: {
            id: string;
            name: string;
            onCampus: boolean;
        } | undefined;
        region?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
    }, {
        timezone: string;
        campus?: {
            id: string;
            name: string;
            onCampus: boolean;
        } | undefined;
        region?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
    }>;
    network: z.ZodObject<{
        ip: z.ZodString;
        isp: z.ZodOptional<z.ZodString>;
        type: z.ZodEnum<["wifi", "cellular", "ethernet", "unknown"]>;
        vpn: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        type: "unknown" | "wifi" | "cellular" | "ethernet";
        ip: string;
        vpn: boolean;
        isp?: string | undefined;
    }, {
        type: "unknown" | "wifi" | "cellular" | "ethernet";
        ip: string;
        vpn: boolean;
        isp?: string | undefined;
    }>;
    activity: z.ZodObject<{
        lastActive: z.ZodDate;
        currentPage: z.ZodString;
        sessionDuration: z.ZodNumber;
        pageViews: z.ZodNumber;
        interactions: z.ZodNumber;
        idleTime: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sessionDuration: number;
        lastActive: Date;
        currentPage: string;
        pageViews: number;
        interactions: number;
        idleTime: number;
    }, {
        sessionDuration: number;
        lastActive: Date;
        currentPage: string;
        pageViews: number;
        interactions: number;
        idleTime: number;
    }>;
    security: z.ZodObject<{
        riskScore: z.ZodNumber;
        flags: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["unusual-location", "new-device", "suspicious-activity", "rate-limit-exceeded"]>;
            severity: z.ZodEnum<["low", "medium", "high", "critical"]>;
            timestamp: z.ZodDate;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
            description: string;
            timestamp: Date;
            severity: "medium" | "low" | "high" | "critical";
        }, {
            type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
            description: string;
            timestamp: Date;
            severity: "medium" | "low" | "high" | "critical";
        }>, "many">;
        lastSecurityCheck: z.ZodDate;
        trustedDevice: z.ZodBoolean;
        suspiciousActivity: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        riskScore: number;
        flags: {
            type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
            description: string;
            timestamp: Date;
            severity: "medium" | "low" | "high" | "critical";
        }[];
        lastSecurityCheck: Date;
        trustedDevice: boolean;
        suspiciousActivity: boolean;
    }, {
        riskScore: number;
        flags: {
            type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
            description: string;
            timestamp: Date;
            severity: "medium" | "low" | "high" | "critical";
        }[];
        lastSecurityCheck: Date;
        trustedDevice: boolean;
        suspiciousActivity: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    location: {
        timezone: string;
        campus?: {
            id: string;
            name: string;
            onCampus: boolean;
        } | undefined;
        region?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
    };
    device: {
        type: "desktop" | "tablet" | "mobile";
        version: string;
        language: string;
        userAgent: string;
        os: string;
        browser: string;
        timezone: string;
        screenResolution: {
            width: number;
            height: number;
        };
    };
    activity: {
        sessionDuration: number;
        lastActive: Date;
        currentPage: string;
        pageViews: number;
        interactions: number;
        idleTime: number;
    };
    network: {
        type: "unknown" | "wifi" | "cellular" | "ethernet";
        ip: string;
        vpn: boolean;
        isp?: string | undefined;
    };
    security: {
        riskScore: number;
        flags: {
            type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
            description: string;
            timestamp: Date;
            severity: "medium" | "low" | "high" | "critical";
        }[];
        lastSecurityCheck: Date;
        trustedDevice: boolean;
        suspiciousActivity: boolean;
    };
}, {
    location: {
        timezone: string;
        campus?: {
            id: string;
            name: string;
            onCampus: boolean;
        } | undefined;
        region?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
    };
    device: {
        type: "desktop" | "tablet" | "mobile";
        version: string;
        language: string;
        userAgent: string;
        os: string;
        browser: string;
        timezone: string;
        screenResolution: {
            width: number;
            height: number;
        };
    };
    activity: {
        sessionDuration: number;
        lastActive: Date;
        currentPage: string;
        pageViews: number;
        interactions: number;
        idleTime: number;
    };
    network: {
        type: "unknown" | "wifi" | "cellular" | "ethernet";
        ip: string;
        vpn: boolean;
        isp?: string | undefined;
    };
    security: {
        riskScore: number;
        flags: {
            type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
            description: string;
            timestamp: Date;
            severity: "medium" | "low" | "high" | "critical";
        }[];
        lastSecurityCheck: Date;
        trustedDevice: boolean;
        suspiciousActivity: boolean;
    };
}>;
export declare const sessionMetadataSchema: z.ZodObject<{
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    expiresAt: z.ZodDate;
    version: z.ZodString;
    source: z.ZodEnum<["web", "mobile", "api", "admin"]>;
    fingerprint: z.ZodString;
    tags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    tags: string[];
    version: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    source: "mobile" | "admin" | "api" | "web";
    fingerprint: string;
}, {
    tags: string[];
    version: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    source: "mobile" | "admin" | "api" | "web";
    fingerprint: string;
}>;
export declare const userSessionSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        emailVerified: z.ZodBoolean;
        handle: z.ZodOptional<z.ZodString>;
        fullName: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
        school: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            domain: z.ZodString;
            verified: z.ZodBoolean;
            type: z.ZodEnum<["university", "college", "community-college", "trade-school"]>;
            location: z.ZodObject<{
                city: z.ZodString;
                state: z.ZodString;
                country: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                city: string;
                state: string;
                country: string;
            }, {
                city: string;
                state: string;
                country: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "university" | "college" | "community-college" | "trade-school";
            id: string;
            name: string;
            location: {
                city: string;
                state: string;
                country: string;
            };
            verified: boolean;
            domain: string;
        }, {
            type: "university" | "college" | "community-college" | "trade-school";
            id: string;
            name: string;
            location: {
                city: string;
                state: string;
                country: string;
            };
            verified: boolean;
            domain: string;
        }>>;
        profile: z.ZodObject<{
            bio: z.ZodOptional<z.ZodString>;
            major: z.ZodOptional<z.ZodString>;
            graduationYear: z.ZodOptional<z.ZodNumber>;
            interests: z.ZodArray<z.ZodString, "many">;
            visibility: z.ZodEnum<["public", "campus-only", "private"]>;
            onboardingCompleted: z.ZodBoolean;
            profilePicture: z.ZodOptional<z.ZodString>;
            coverPhoto: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            onboardingCompleted: boolean;
            visibility: "public" | "campus-only" | "private";
            interests: string[];
            major?: string | undefined;
            graduationYear?: number | undefined;
            bio?: string | undefined;
            profilePicture?: string | undefined;
            coverPhoto?: string | undefined;
        }, {
            onboardingCompleted: boolean;
            visibility: "public" | "campus-only" | "private";
            interests: string[];
            major?: string | undefined;
            graduationYear?: number | undefined;
            bio?: string | undefined;
            profilePicture?: string | undefined;
            coverPhoto?: string | undefined;
        }>;
        preferences: z.ZodObject<{
            theme: z.ZodEnum<["light", "dark", "system"]>;
            language: z.ZodString;
            timezone: z.ZodString;
            notifications: z.ZodObject<{
                email: z.ZodObject<{
                    enabled: z.ZodBoolean;
                    frequency: z.ZodEnum<["instant", "daily", "weekly", "never"]>;
                    types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                }, {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                }>;
                push: z.ZodObject<{
                    enabled: z.ZodBoolean;
                    types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                }, {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                }>;
                inApp: z.ZodObject<{
                    enabled: z.ZodBoolean;
                    types: z.ZodArray<z.ZodEnum<["new-post", "comment", "mention", "follow", "space-invite", "event-reminder", "system-update", "security-alert"]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                }, {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                }>;
            }, "strip", z.ZodTypeAny, {
                push: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                email: {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                inApp: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
            }, {
                push: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                email: {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                inApp: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
            }>;
            privacy: z.ZodObject<{
                profileVisibility: z.ZodEnum<["public", "campus-only", "private"]>;
                showEmail: z.ZodBoolean;
                showSchool: z.ZodBoolean;
                allowDirectMessages: z.ZodBoolean;
                allowSpaceInvites: z.ZodBoolean;
                dataCollection: z.ZodBoolean;
                analytics: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                analytics: boolean;
                profileVisibility: "public" | "campus-only" | "private";
                showEmail: boolean;
                showSchool: boolean;
                allowDirectMessages: boolean;
                allowSpaceInvites: boolean;
                dataCollection: boolean;
            }, {
                analytics: boolean;
                profileVisibility: "public" | "campus-only" | "private";
                showEmail: boolean;
                showSchool: boolean;
                allowDirectMessages: boolean;
                allowSpaceInvites: boolean;
                dataCollection: boolean;
            }>;
            accessibility: z.ZodObject<{
                reducedMotion: z.ZodBoolean;
                highContrast: z.ZodBoolean;
                fontSize: z.ZodEnum<["small", "medium", "large", "extra-large"]>;
                screenReader: z.ZodBoolean;
                keyboardNavigation: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                fontSize: "small" | "medium" | "large" | "extra-large";
                reducedMotion: boolean;
                highContrast: boolean;
                screenReader: boolean;
                keyboardNavigation: boolean;
            }, {
                fontSize: "small" | "medium" | "large" | "extra-large";
                reducedMotion: boolean;
                highContrast: boolean;
                screenReader: boolean;
                keyboardNavigation: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            language: string;
            theme: "light" | "dark" | "system";
            privacy: {
                analytics: boolean;
                profileVisibility: "public" | "campus-only" | "private";
                showEmail: boolean;
                showSchool: boolean;
                allowDirectMessages: boolean;
                allowSpaceInvites: boolean;
                dataCollection: boolean;
            };
            timezone: string;
            notifications: {
                push: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                email: {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                inApp: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
            };
            accessibility: {
                fontSize: "small" | "medium" | "large" | "extra-large";
                reducedMotion: boolean;
                highContrast: boolean;
                screenReader: boolean;
                keyboardNavigation: boolean;
            };
        }, {
            language: string;
            theme: "light" | "dark" | "system";
            privacy: {
                analytics: boolean;
                profileVisibility: "public" | "campus-only" | "private";
                showEmail: boolean;
                showSchool: boolean;
                allowDirectMessages: boolean;
                allowSpaceInvites: boolean;
                dataCollection: boolean;
            };
            timezone: string;
            notifications: {
                push: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                email: {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                inApp: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
            };
            accessibility: {
                fontSize: "small" | "medium" | "large" | "extra-large";
                reducedMotion: boolean;
                highContrast: boolean;
                screenReader: boolean;
                keyboardNavigation: boolean;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        profile: {
            onboardingCompleted: boolean;
            visibility: "public" | "campus-only" | "private";
            interests: string[];
            major?: string | undefined;
            graduationYear?: number | undefined;
            bio?: string | undefined;
            profilePicture?: string | undefined;
            coverPhoto?: string | undefined;
        };
        emailVerified: boolean;
        preferences: {
            language: string;
            theme: "light" | "dark" | "system";
            privacy: {
                analytics: boolean;
                profileVisibility: "public" | "campus-only" | "private";
                showEmail: boolean;
                showSchool: boolean;
                allowDirectMessages: boolean;
                allowSpaceInvites: boolean;
                dataCollection: boolean;
            };
            timezone: string;
            notifications: {
                push: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                email: {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                inApp: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
            };
            accessibility: {
                fontSize: "small" | "medium" | "large" | "extra-large";
                reducedMotion: boolean;
                highContrast: boolean;
                screenReader: boolean;
                keyboardNavigation: boolean;
            };
        };
        handle?: string | undefined;
        fullName?: string | undefined;
        avatar?: string | undefined;
        school?: {
            type: "university" | "college" | "community-college" | "trade-school";
            id: string;
            name: string;
            location: {
                city: string;
                state: string;
                country: string;
            };
            verified: boolean;
            domain: string;
        } | undefined;
    }, {
        id: string;
        email: string;
        profile: {
            onboardingCompleted: boolean;
            visibility: "public" | "campus-only" | "private";
            interests: string[];
            major?: string | undefined;
            graduationYear?: number | undefined;
            bio?: string | undefined;
            profilePicture?: string | undefined;
            coverPhoto?: string | undefined;
        };
        emailVerified: boolean;
        preferences: {
            language: string;
            theme: "light" | "dark" | "system";
            privacy: {
                analytics: boolean;
                profileVisibility: "public" | "campus-only" | "private";
                showEmail: boolean;
                showSchool: boolean;
                allowDirectMessages: boolean;
                allowSpaceInvites: boolean;
                dataCollection: boolean;
            };
            timezone: string;
            notifications: {
                push: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                email: {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                inApp: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
            };
            accessibility: {
                fontSize: "small" | "medium" | "large" | "extra-large";
                reducedMotion: boolean;
                highContrast: boolean;
                screenReader: boolean;
                keyboardNavigation: boolean;
            };
        };
        handle?: string | undefined;
        fullName?: string | undefined;
        avatar?: string | undefined;
        school?: {
            type: "university" | "college" | "community-college" | "trade-school";
            id: string;
            name: string;
            location: {
                city: string;
                state: string;
                country: string;
            };
            verified: boolean;
            domain: string;
        } | undefined;
    }>;
    authentication: z.ZodObject<{
        isAuthenticated: z.ZodBoolean;
        method: z.ZodEnum<["magic-link", "oauth", "password", "sso"]>;
        provider: z.ZodEnum<["email", "google", "microsoft", "apple", "github"]>;
        tokenType: z.ZodEnum<["access", "refresh", "id"]>;
        expiresAt: z.ZodDate;
        lastLoginAt: z.ZodDate;
        loginCount: z.ZodNumber;
        mfaEnabled: z.ZodBoolean;
        mfaVerified: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        expiresAt: Date;
        isAuthenticated: boolean;
        method: "password" | "magic-link" | "oauth" | "sso";
        provider: "email" | "google" | "microsoft" | "apple" | "github";
        tokenType: "id" | "access" | "refresh";
        lastLoginAt: Date;
        loginCount: number;
        mfaEnabled: boolean;
        mfaVerified: boolean;
    }, {
        expiresAt: Date;
        isAuthenticated: boolean;
        method: "password" | "magic-link" | "oauth" | "sso";
        provider: "email" | "google" | "microsoft" | "apple" | "github";
        tokenType: "id" | "access" | "refresh";
        lastLoginAt: Date;
        loginCount: number;
        mfaEnabled: boolean;
        mfaVerified: boolean;
    }>;
    permissions: z.ZodObject<{
        roles: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            type: z.ZodEnum<["system", "campus", "space", "custom"]>;
            level: z.ZodNumber;
            inherits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            type: "custom" | "system" | "campus" | "space";
            id: string;
            name: string;
            level: number;
            inherits?: string[] | undefined;
        }, {
            type: "custom" | "system" | "campus" | "space";
            id: string;
            name: string;
            level: number;
            inherits?: string[] | undefined;
        }>, "many">;
        scopes: z.ZodArray<z.ZodEnum<["read:profile", "write:profile", "read:feed", "write:posts", "read:spaces", "write:spaces", "moderate:content", "admin:users", "admin:system"]>, "many">;
        restrictions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["rate-limit", "content-filter", "feature-gate", "time-based"]>;
            scope: z.ZodEnum<["read:profile", "write:profile", "read:feed", "write:posts", "read:spaces", "write:spaces", "moderate:content", "admin:users", "admin:system"]>;
            limit: z.ZodNumber;
            period: z.ZodString;
            reason: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
            limit: number;
            reason: string;
            scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
            period: string;
        }, {
            type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
            limit: number;
            reason: string;
            scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
            period: string;
        }>, "many">;
        campus: z.ZodObject<{
            canCreateSpaces: z.ZodBoolean;
            canModerateContent: z.ZodBoolean;
            canInviteUsers: z.ZodBoolean;
            canAccessAnalytics: z.ZodBoolean;
            canManageEvents: z.ZodBoolean;
            maxSpacesOwned: z.ZodNumber;
            maxPostsPerDay: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            canCreateSpaces: boolean;
            canModerateContent: boolean;
            canInviteUsers: boolean;
            canAccessAnalytics: boolean;
            canManageEvents: boolean;
            maxSpacesOwned: number;
            maxPostsPerDay: number;
        }, {
            canCreateSpaces: boolean;
            canModerateContent: boolean;
            canInviteUsers: boolean;
            canAccessAnalytics: boolean;
            canManageEvents: boolean;
            maxSpacesOwned: number;
            maxPostsPerDay: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        campus: {
            canCreateSpaces: boolean;
            canModerateContent: boolean;
            canInviteUsers: boolean;
            canAccessAnalytics: boolean;
            canManageEvents: boolean;
            maxSpacesOwned: number;
            maxPostsPerDay: number;
        };
        roles: {
            type: "custom" | "system" | "campus" | "space";
            id: string;
            name: string;
            level: number;
            inherits?: string[] | undefined;
        }[];
        scopes: ("read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system")[];
        restrictions: {
            type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
            limit: number;
            reason: string;
            scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
            period: string;
        }[];
    }, {
        campus: {
            canCreateSpaces: boolean;
            canModerateContent: boolean;
            canInviteUsers: boolean;
            canAccessAnalytics: boolean;
            canManageEvents: boolean;
            maxSpacesOwned: number;
            maxPostsPerDay: number;
        };
        roles: {
            type: "custom" | "system" | "campus" | "space";
            id: string;
            name: string;
            level: number;
            inherits?: string[] | undefined;
        }[];
        scopes: ("read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system")[];
        restrictions: {
            type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
            limit: number;
            reason: string;
            scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
            period: string;
        }[];
    }>;
    context: z.ZodObject<{
        device: z.ZodObject<{
            type: z.ZodEnum<["desktop", "mobile", "tablet"]>;
            os: z.ZodString;
            browser: z.ZodString;
            version: z.ZodString;
            userAgent: z.ZodString;
            screenResolution: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            timezone: z.ZodString;
            language: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "desktop" | "tablet" | "mobile";
            version: string;
            language: string;
            userAgent: string;
            os: string;
            browser: string;
            timezone: string;
            screenResolution: {
                width: number;
                height: number;
            };
        }, {
            type: "desktop" | "tablet" | "mobile";
            version: string;
            language: string;
            userAgent: string;
            os: string;
            browser: string;
            timezone: string;
            screenResolution: {
                width: number;
                height: number;
            };
        }>;
        location: z.ZodObject<{
            country: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            timezone: z.ZodString;
            campus: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                onCampus: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: string;
                onCampus: boolean;
            }, {
                id: string;
                name: string;
                onCampus: boolean;
            }>>;
        }, "strip", z.ZodTypeAny, {
            timezone: string;
            campus?: {
                id: string;
                name: string;
                onCampus: boolean;
            } | undefined;
            region?: string | undefined;
            city?: string | undefined;
            country?: string | undefined;
        }, {
            timezone: string;
            campus?: {
                id: string;
                name: string;
                onCampus: boolean;
            } | undefined;
            region?: string | undefined;
            city?: string | undefined;
            country?: string | undefined;
        }>;
        network: z.ZodObject<{
            ip: z.ZodString;
            isp: z.ZodOptional<z.ZodString>;
            type: z.ZodEnum<["wifi", "cellular", "ethernet", "unknown"]>;
            vpn: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            ip: string;
            vpn: boolean;
            isp?: string | undefined;
        }, {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            ip: string;
            vpn: boolean;
            isp?: string | undefined;
        }>;
        activity: z.ZodObject<{
            lastActive: z.ZodDate;
            currentPage: z.ZodString;
            sessionDuration: z.ZodNumber;
            pageViews: z.ZodNumber;
            interactions: z.ZodNumber;
            idleTime: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            sessionDuration: number;
            lastActive: Date;
            currentPage: string;
            pageViews: number;
            interactions: number;
            idleTime: number;
        }, {
            sessionDuration: number;
            lastActive: Date;
            currentPage: string;
            pageViews: number;
            interactions: number;
            idleTime: number;
        }>;
        security: z.ZodObject<{
            riskScore: z.ZodNumber;
            flags: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["unusual-location", "new-device", "suspicious-activity", "rate-limit-exceeded"]>;
                severity: z.ZodEnum<["low", "medium", "high", "critical"]>;
                timestamp: z.ZodDate;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
                description: string;
                timestamp: Date;
                severity: "medium" | "low" | "high" | "critical";
            }, {
                type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
                description: string;
                timestamp: Date;
                severity: "medium" | "low" | "high" | "critical";
            }>, "many">;
            lastSecurityCheck: z.ZodDate;
            trustedDevice: z.ZodBoolean;
            suspiciousActivity: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            riskScore: number;
            flags: {
                type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
                description: string;
                timestamp: Date;
                severity: "medium" | "low" | "high" | "critical";
            }[];
            lastSecurityCheck: Date;
            trustedDevice: boolean;
            suspiciousActivity: boolean;
        }, {
            riskScore: number;
            flags: {
                type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
                description: string;
                timestamp: Date;
                severity: "medium" | "low" | "high" | "critical";
            }[];
            lastSecurityCheck: Date;
            trustedDevice: boolean;
            suspiciousActivity: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        location: {
            timezone: string;
            campus?: {
                id: string;
                name: string;
                onCampus: boolean;
            } | undefined;
            region?: string | undefined;
            city?: string | undefined;
            country?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            version: string;
            language: string;
            userAgent: string;
            os: string;
            browser: string;
            timezone: string;
            screenResolution: {
                width: number;
                height: number;
            };
        };
        activity: {
            sessionDuration: number;
            lastActive: Date;
            currentPage: string;
            pageViews: number;
            interactions: number;
            idleTime: number;
        };
        network: {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            ip: string;
            vpn: boolean;
            isp?: string | undefined;
        };
        security: {
            riskScore: number;
            flags: {
                type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
                description: string;
                timestamp: Date;
                severity: "medium" | "low" | "high" | "critical";
            }[];
            lastSecurityCheck: Date;
            trustedDevice: boolean;
            suspiciousActivity: boolean;
        };
    }, {
        location: {
            timezone: string;
            campus?: {
                id: string;
                name: string;
                onCampus: boolean;
            } | undefined;
            region?: string | undefined;
            city?: string | undefined;
            country?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            version: string;
            language: string;
            userAgent: string;
            os: string;
            browser: string;
            timezone: string;
            screenResolution: {
                width: number;
                height: number;
            };
        };
        activity: {
            sessionDuration: number;
            lastActive: Date;
            currentPage: string;
            pageViews: number;
            interactions: number;
            idleTime: number;
        };
        network: {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            ip: string;
            vpn: boolean;
            isp?: string | undefined;
        };
        security: {
            riskScore: number;
            flags: {
                type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
                description: string;
                timestamp: Date;
                severity: "medium" | "low" | "high" | "critical";
            }[];
            lastSecurityCheck: Date;
            trustedDevice: boolean;
            suspiciousActivity: boolean;
        };
    }>;
    metadata: z.ZodObject<{
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        expiresAt: z.ZodDate;
        version: z.ZodString;
        source: z.ZodEnum<["web", "mobile", "api", "admin"]>;
        fingerprint: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        tags: string[];
        version: string;
        createdAt: Date;
        updatedAt: Date;
        expiresAt: Date;
        source: "mobile" | "admin" | "api" | "web";
        fingerprint: string;
    }, {
        tags: string[];
        version: string;
        createdAt: Date;
        updatedAt: Date;
        expiresAt: Date;
        source: "mobile" | "admin" | "api" | "web";
        fingerprint: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    metadata: {
        tags: string[];
        version: string;
        createdAt: Date;
        updatedAt: Date;
        expiresAt: Date;
        source: "mobile" | "admin" | "api" | "web";
        fingerprint: string;
    };
    user: {
        id: string;
        email: string;
        profile: {
            onboardingCompleted: boolean;
            visibility: "public" | "campus-only" | "private";
            interests: string[];
            major?: string | undefined;
            graduationYear?: number | undefined;
            bio?: string | undefined;
            profilePicture?: string | undefined;
            coverPhoto?: string | undefined;
        };
        emailVerified: boolean;
        preferences: {
            language: string;
            theme: "light" | "dark" | "system";
            privacy: {
                analytics: boolean;
                profileVisibility: "public" | "campus-only" | "private";
                showEmail: boolean;
                showSchool: boolean;
                allowDirectMessages: boolean;
                allowSpaceInvites: boolean;
                dataCollection: boolean;
            };
            timezone: string;
            notifications: {
                push: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                email: {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                inApp: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
            };
            accessibility: {
                fontSize: "small" | "medium" | "large" | "extra-large";
                reducedMotion: boolean;
                highContrast: boolean;
                screenReader: boolean;
                keyboardNavigation: boolean;
            };
        };
        handle?: string | undefined;
        fullName?: string | undefined;
        avatar?: string | undefined;
        school?: {
            type: "university" | "college" | "community-college" | "trade-school";
            id: string;
            name: string;
            location: {
                city: string;
                state: string;
                country: string;
            };
            verified: boolean;
            domain: string;
        } | undefined;
    };
    context: {
        location: {
            timezone: string;
            campus?: {
                id: string;
                name: string;
                onCampus: boolean;
            } | undefined;
            region?: string | undefined;
            city?: string | undefined;
            country?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            version: string;
            language: string;
            userAgent: string;
            os: string;
            browser: string;
            timezone: string;
            screenResolution: {
                width: number;
                height: number;
            };
        };
        activity: {
            sessionDuration: number;
            lastActive: Date;
            currentPage: string;
            pageViews: number;
            interactions: number;
            idleTime: number;
        };
        network: {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            ip: string;
            vpn: boolean;
            isp?: string | undefined;
        };
        security: {
            riskScore: number;
            flags: {
                type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
                description: string;
                timestamp: Date;
                severity: "medium" | "low" | "high" | "critical";
            }[];
            lastSecurityCheck: Date;
            trustedDevice: boolean;
            suspiciousActivity: boolean;
        };
    };
    authentication: {
        expiresAt: Date;
        isAuthenticated: boolean;
        method: "password" | "magic-link" | "oauth" | "sso";
        provider: "email" | "google" | "microsoft" | "apple" | "github";
        tokenType: "id" | "access" | "refresh";
        lastLoginAt: Date;
        loginCount: number;
        mfaEnabled: boolean;
        mfaVerified: boolean;
    };
    permissions: {
        campus: {
            canCreateSpaces: boolean;
            canModerateContent: boolean;
            canInviteUsers: boolean;
            canAccessAnalytics: boolean;
            canManageEvents: boolean;
            maxSpacesOwned: number;
            maxPostsPerDay: number;
        };
        roles: {
            type: "custom" | "system" | "campus" | "space";
            id: string;
            name: string;
            level: number;
            inherits?: string[] | undefined;
        }[];
        scopes: ("read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system")[];
        restrictions: {
            type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
            limit: number;
            reason: string;
            scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
            period: string;
        }[];
    };
}, {
    id: string;
    userId: string;
    metadata: {
        tags: string[];
        version: string;
        createdAt: Date;
        updatedAt: Date;
        expiresAt: Date;
        source: "mobile" | "admin" | "api" | "web";
        fingerprint: string;
    };
    user: {
        id: string;
        email: string;
        profile: {
            onboardingCompleted: boolean;
            visibility: "public" | "campus-only" | "private";
            interests: string[];
            major?: string | undefined;
            graduationYear?: number | undefined;
            bio?: string | undefined;
            profilePicture?: string | undefined;
            coverPhoto?: string | undefined;
        };
        emailVerified: boolean;
        preferences: {
            language: string;
            theme: "light" | "dark" | "system";
            privacy: {
                analytics: boolean;
                profileVisibility: "public" | "campus-only" | "private";
                showEmail: boolean;
                showSchool: boolean;
                allowDirectMessages: boolean;
                allowSpaceInvites: boolean;
                dataCollection: boolean;
            };
            timezone: string;
            notifications: {
                push: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                email: {
                    enabled: boolean;
                    frequency: "never" | "instant" | "daily" | "weekly";
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
                inApp: {
                    enabled: boolean;
                    types: ("comment" | "new-post" | "mention" | "follow" | "space-invite" | "event-reminder" | "system-update" | "security-alert")[];
                };
            };
            accessibility: {
                fontSize: "small" | "medium" | "large" | "extra-large";
                reducedMotion: boolean;
                highContrast: boolean;
                screenReader: boolean;
                keyboardNavigation: boolean;
            };
        };
        handle?: string | undefined;
        fullName?: string | undefined;
        avatar?: string | undefined;
        school?: {
            type: "university" | "college" | "community-college" | "trade-school";
            id: string;
            name: string;
            location: {
                city: string;
                state: string;
                country: string;
            };
            verified: boolean;
            domain: string;
        } | undefined;
    };
    context: {
        location: {
            timezone: string;
            campus?: {
                id: string;
                name: string;
                onCampus: boolean;
            } | undefined;
            region?: string | undefined;
            city?: string | undefined;
            country?: string | undefined;
        };
        device: {
            type: "desktop" | "tablet" | "mobile";
            version: string;
            language: string;
            userAgent: string;
            os: string;
            browser: string;
            timezone: string;
            screenResolution: {
                width: number;
                height: number;
            };
        };
        activity: {
            sessionDuration: number;
            lastActive: Date;
            currentPage: string;
            pageViews: number;
            interactions: number;
            idleTime: number;
        };
        network: {
            type: "unknown" | "wifi" | "cellular" | "ethernet";
            ip: string;
            vpn: boolean;
            isp?: string | undefined;
        };
        security: {
            riskScore: number;
            flags: {
                type: "unusual-location" | "new-device" | "suspicious-activity" | "rate-limit-exceeded";
                description: string;
                timestamp: Date;
                severity: "medium" | "low" | "high" | "critical";
            }[];
            lastSecurityCheck: Date;
            trustedDevice: boolean;
            suspiciousActivity: boolean;
        };
    };
    authentication: {
        expiresAt: Date;
        isAuthenticated: boolean;
        method: "password" | "magic-link" | "oauth" | "sso";
        provider: "email" | "google" | "microsoft" | "apple" | "github";
        tokenType: "id" | "access" | "refresh";
        lastLoginAt: Date;
        loginCount: number;
        mfaEnabled: boolean;
        mfaVerified: boolean;
    };
    permissions: {
        campus: {
            canCreateSpaces: boolean;
            canModerateContent: boolean;
            canInviteUsers: boolean;
            canAccessAnalytics: boolean;
            canManageEvents: boolean;
            maxSpacesOwned: number;
            maxPostsPerDay: number;
        };
        roles: {
            type: "custom" | "system" | "campus" | "space";
            id: string;
            name: string;
            level: number;
            inherits?: string[] | undefined;
        }[];
        scopes: ("read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system")[];
        restrictions: {
            type: "rate-limit" | "content-filter" | "feature-gate" | "time-based";
            limit: number;
            reason: string;
            scope: "read:profile" | "write:profile" | "read:feed" | "write:posts" | "read:spaces" | "write:spaces" | "moderate:content" | "admin:users" | "admin:system";
            period: string;
        }[];
    };
}>;
export declare function validateUserSession(session: unknown): UserSession;
export declare function isValidUserSession(session: unknown): session is UserSession;
export declare function createGuestSession(): Partial<UserSession>;
export declare function createDefaultUserPreferences(): UserPreferences;
export interface SessionManager {
    createSession(userId: string, context: Partial<SessionContext>): Promise<UserSession>;
    getSession(sessionId: string): Promise<UserSession | null>;
    updateSession(sessionId: string, updates: Partial<UserSession>): Promise<UserSession>;
    refreshSession(sessionId: string): Promise<UserSession>;
    destroySession(sessionId: string): Promise<void>;
    validateSession(sessionId: string): Promise<boolean>;
    extendSession(sessionId: string, duration: number): Promise<UserSession>;
    getActiveSessions(userId: string): Promise<UserSession[]>;
    revokeAllSessions(userId: string): Promise<void>;
}
//# sourceMappingURL=session-types.d.ts.map