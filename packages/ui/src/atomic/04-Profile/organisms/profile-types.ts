/**
 * Profile UI Types
 * Type definitions for profile components
 */

import type { PresenceStatus } from "../../02-Feed/atoms/presence-indicator";

export interface UIProfile {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  major?: string | null;
  gradYear?: number | null;
  campusId: string;
  presence?: {
    status?: PresenceStatus;
    lastSeen?: Date | null;
  };
  verification?: {
    email?: string;
    isVerified: boolean;
  };
  stats?: {
    spacesCount?: number;
    connectionsCount?: number;
    postsCount?: number;
  };
  privacy?: {
    visibilityLevel?: string;
  };
  widgets?: Record<string, { level?: string }>;

  // Additional fields for profile-identity-widget
  identity?: {
    id?: string;
    fullName?: string;
    avatarUrl?: string | null;
    campusBadge?: boolean;
  };
  academic?: {
    campusId?: string;
    major?: string | null;
    gradYear?: number | null;
    academicYear?: number | string | null;
    graduationYear?: number | null;
    pronouns?: string | null;
    housing?: string | null;
  };
  personal?: {
    bio?: string | null;
    currentVibe?: string | null;
  };
  social?: {
    spacesCount?: number;
    connectionsCount?: number;
    connections?: {
      connectionIds?: string[];
      friendIds?: string[];
    };
    mutualSpaces?: string[];
  };
  metadata?: {
    completionPercentage?: number;
  };
}
