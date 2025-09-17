// Authentication and Permissions Types
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