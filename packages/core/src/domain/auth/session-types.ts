import { z } from "zod";

// Core Session Types
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

export type NotificationType =
  | "new-post"
  | "comment"
  | "mention"
  | "follow"
  | "space-invite"
  | "event-reminder"
  | "system-update"
  | "security-alert";

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
export type AuthProvider =
  | "email"
  | "google"
  | "microsoft"
  | "apple"
  | "github";

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

export type PermissionScope =
  | "read:profile"
  | "write:profile"
  | "read:feed"
  | "write:posts"
  | "read:spaces"
  | "write:spaces"
  | "moderate:content"
  | "admin:users"
  | "admin:system";

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
  type:
    | "unusual-location"
    | "new-device"
    | "suspicious-activity"
    | "rate-limit-exceeded";
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

// Zod Validation Schemas
export const userSchoolSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  domain: z.string().includes(".edu"),
  verified: z.boolean(),
  type: z.enum(["university", "college", "community-college", "trade-school"]),
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),
});

export const userProfileSchema = z.object({
  bio: z.string().max(500).optional(),
  major: z.string().max(100).optional(),
  graduationYear: z.number().min(2020).max(2040).optional(),
  interests: z.array(z.string()).max(20),
  visibility: z.enum(["public", "campus-only", "private"]),
  onboardingCompleted: z.boolean(),
  profilePicture: z.string().url().optional(),
  coverPhoto: z.string().url().optional(),
});

export const notificationPreferencesSchema = z.object({
  email: z.object({
    enabled: z.boolean(),
    frequency: z.enum(["instant", "daily", "weekly", "never"]),
    types: z.array(
      z.enum([
        "new-post",
        "comment",
        "mention",
        "follow",
        "space-invite",
        "event-reminder",
        "system-update",
        "security-alert",
      ])
    ),
  }),
  push: z.object({
    enabled: z.boolean(),
    types: z.array(
      z.enum([
        "new-post",
        "comment",
        "mention",
        "follow",
        "space-invite",
        "event-reminder",
        "system-update",
        "security-alert",
      ])
    ),
  }),
  inApp: z.object({
    enabled: z.boolean(),
    types: z.array(
      z.enum([
        "new-post",
        "comment",
        "mention",
        "follow",
        "space-invite",
        "event-reminder",
        "system-update",
        "security-alert",
      ])
    ),
  }),
});

export const userPreferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.string().length(2),
  timezone: z.string(),
  notifications: notificationPreferencesSchema,
  privacy: z.object({
    profileVisibility: z.enum(["public", "campus-only", "private"]),
    showEmail: z.boolean(),
    showSchool: z.boolean(),
    allowDirectMessages: z.boolean(),
    allowSpaceInvites: z.boolean(),
    dataCollection: z.boolean(),
    analytics: z.boolean(),
  }),
  accessibility: z.object({
    reducedMotion: z.boolean(),
    highContrast: z.boolean(),
    fontSize: z.enum(["small", "medium", "large", "extra-large"]),
    screenReader: z.boolean(),
    keyboardNavigation: z.boolean(),
  }),
});

export const sessionUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  handle: z.string().min(3).max(20).optional(),
  fullName: z.string().max(100).optional(),
  avatar: z.string().url().optional(),
  school: userSchoolSchema.optional(),
  profile: userProfileSchema,
  preferences: userPreferencesSchema,
});

export const authenticationStateSchema = z.object({
  isAuthenticated: z.boolean(),
  method: z.enum(["magic-link", "oauth", "password", "sso"]),
  provider: z.enum(["email", "google", "microsoft", "apple", "github"]),
  tokenType: z.enum(["access", "refresh", "id"]),
  expiresAt: z.date(),
  lastLoginAt: z.date(),
  loginCount: z.number().min(0),
  mfaEnabled: z.boolean(),
  mfaVerified: z.boolean(),
});

export const userPermissionsSchema = z.object({
  roles: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      type: z.enum(["system", "campus", "space", "custom"]),
      level: z.number().min(0).max(100),
      inherits: z.array(z.string()).optional(),
    })
  ),
  scopes: z.array(
    z.enum([
      "read:profile",
      "write:profile",
      "read:feed",
      "write:posts",
      "read:spaces",
      "write:spaces",
      "moderate:content",
      "admin:users",
      "admin:system",
    ])
  ),
  restrictions: z.array(
    z.object({
      type: z.enum([
        "rate-limit",
        "content-filter",
        "feature-gate",
        "time-based",
      ]),
      scope: z.enum([
        "read:profile",
        "write:profile",
        "read:feed",
        "write:posts",
        "read:spaces",
        "write:spaces",
        "moderate:content",
        "admin:users",
        "admin:system",
      ]),
      limit: z.number().min(0),
      period: z.string(),
      reason: z.string(),
    })
  ),
  campus: z.object({
    canCreateSpaces: z.boolean(),
    canModerateContent: z.boolean(),
    canInviteUsers: z.boolean(),
    canAccessAnalytics: z.boolean(),
    canManageEvents: z.boolean(),
    maxSpacesOwned: z.number().min(0),
    maxPostsPerDay: z.number().min(0),
  }),
});

export const sessionContextSchema = z.object({
  device: z.object({
    type: z.enum(["desktop", "mobile", "tablet"]),
    os: z.string(),
    browser: z.string(),
    version: z.string(),
    userAgent: z.string(),
    screenResolution: z.object({
      width: z.number().min(0),
      height: z.number().min(0),
    }),
    timezone: z.string(),
    language: z.string(),
  }),
  location: z.object({
    country: z.string().optional(),
    region: z.string().optional(),
    city: z.string().optional(),
    timezone: z.string(),
    campus: z
      .object({
        id: z.string().uuid(),
        name: z.string(),
        onCampus: z.boolean(),
      })
      .optional(),
  }),
  network: z.object({
    ip: z.string().ip(),
    isp: z.string().optional(),
    type: z.enum(["wifi", "cellular", "ethernet", "unknown"]),
    vpn: z.boolean(),
  }),
  activity: z.object({
    lastActive: z.date(),
    currentPage: z.string(),
    sessionDuration: z.number().min(0),
    pageViews: z.number().min(0),
    interactions: z.number().min(0),
    idleTime: z.number().min(0),
  }),
  security: z.object({
    riskScore: z.number().min(0).max(100),
    flags: z.array(
      z.object({
        type: z.enum([
          "unusual-location",
          "new-device",
          "suspicious-activity",
          "rate-limit-exceeded",
        ]),
        severity: z.enum(["low", "medium", "high", "critical"]),
        timestamp: z.date(),
        description: z.string(),
      })
    ),
    lastSecurityCheck: z.date(),
    trustedDevice: z.boolean(),
    suspiciousActivity: z.boolean(),
  }),
});

export const sessionMetadataSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  expiresAt: z.date(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  source: z.enum(["web", "mobile", "api", "admin"]),
  fingerprint: z.string(),
  tags: z.array(z.string()),
});

export const userSessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  user: sessionUserSchema,
  authentication: authenticationStateSchema,
  permissions: userPermissionsSchema,
  context: sessionContextSchema,
  metadata: sessionMetadataSchema,
});

// Validation Functions
export function validateUserSession(session: unknown): UserSession {
  return userSessionSchema.parse(session);
}

export function isValidUserSession(session: unknown): session is UserSession {
  return userSessionSchema.safeParse(session).success;
}

// Session Factory Functions
export function createGuestSession(): Partial<UserSession> {
  return {
    id: crypto.randomUUID(),
    authentication: {
      isAuthenticated: false,
      method: "magic-link",
      provider: "email",
      tokenType: "access",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      lastLoginAt: new Date(),
      loginCount: 0,
      mfaEnabled: false,
      mfaVerified: false,
    },
    permissions: {
      roles: [],
      scopes: [],
      restrictions: [],
      campus: {
        canCreateSpaces: false,
        canModerateContent: false,
        canInviteUsers: false,
        canAccessAnalytics: false,
        canManageEvents: false,
        maxSpacesOwned: 0,
        maxPostsPerDay: 0,
      },
    },
  };
}

export function createDefaultUserPreferences(): UserPreferences {
  return {
    theme: "dark",
    language: "en",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    notifications: {
      email: {
        enabled: true,
        frequency: "daily",
        types: ["new-post", "comment", "mention", "follow"],
      },
      push: {
        enabled: true,
        types: ["mention", "follow", "space-invite"],
      },
      inApp: {
        enabled: true,
        types: ["new-post", "comment", "mention", "follow", "space-invite"],
      },
    },
    privacy: {
      profileVisibility: "campus-only",
      showEmail: false,
      showSchool: true,
      allowDirectMessages: true,
      allowSpaceInvites: true,
      dataCollection: true,
      analytics: true,
    },
    accessibility: {
      reducedMotion: false,
      highContrast: false,
      fontSize: "medium",
      screenReader: false,
      keyboardNavigation: false,
    },
  };
}

// Session Management Types
export interface SessionManager {
  createSession(
    userId: string,
    context: Partial<SessionContext>
  ): Promise<UserSession>;
  getSession(sessionId: string): Promise<UserSession | null>;
  updateSession(
    sessionId: string,
    updates: Partial<UserSession>
  ): Promise<UserSession>;
  refreshSession(sessionId: string): Promise<UserSession>;
  destroySession(sessionId: string): Promise<void>;
  validateSession(sessionId: string): Promise<boolean>;
  extendSession(sessionId: string, duration: number): Promise<UserSession>;
  getActiveSessions(userId: string): Promise<UserSession[]>;
  revokeAllSessions(userId: string): Promise<void>;
}

// SessionManager interface is already exported above
