/**
 * Profile UI Types
 * Simplified interfaces for UI components that adapt from ProfileSystem
 */

import type { ProfileSystem } from '@hive/core';

/**
 * Simplified profile for UI components
 * Adapts the complex ProfileSystem to simpler UI needs
 */
export interface UIProfile {
  identity: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
  };
  academic: {
    campusId: 'ub-buffalo';
    major?: string;
    academicYear?: string;
    graduationYear?: number;
    housing?: string;
    pronouns?: string;
  };
  personal?: {
    bio?: string;
    interests?: string[];
    currentVibe?: string;
    lookingFor?: string[];
  };
  social?: {
    connections?: {
      connectionIds: string[];
      friendIds: string[];
      strength?: Record<string, number>;
    };
    mutualSpaces?: string[];
  };
  privacy?: {
    level: string;
    widgets?: Record<string, { level: string }>;
  };
  verification?: {
    facultyVerified?: boolean;
    emailVerified?: boolean;
    profileVerified?: boolean;
    accountStatus?: string;
    userType?: string;
    onboardingCompleted?: boolean;
  };
  metadata?: {
    completionPercentage?: number;
    createdAt?: Date;
    updatedAt?: Date;
    lastActiveAt?: Date;
  };
  widgets?: Record<string, { level: string }>;
}

/**
 * Convert ProfileSystem to UIProfile
 */
export function specProfileToUIProfile(profile: ProfileSystem): UIProfile {
  // Extract first photo URL from carousel if available
  const avatarUrl = profile.identity.photoCarousel?.photos?.[0]?.url;

  // Combine major arrays into single string
  const majorString = profile.identity.academic.majors?.join(', ') || '';

  return {
    identity: {
      id: profile.userId,
      fullName: profile.identity.academic.name,
      email: `${profile.handle}@buffalo.edu`, // Construct email from handle
      avatarUrl: avatarUrl,
      bio: profile.presence.vibe !== '😮‍💨 Surviving' ? profile.presence.vibe : undefined
    },
    academic: {
      campusId: 'ub-buffalo',
      major: majorString,
      academicYear: profile.identity.academic.year,
      graduationYear: profile.identity.academic.graduationYear,
      housing: undefined, // Not available in ProfileSystem
      pronouns: profile.identity.academic.pronouns
    },
    personal: {
      bio: profile.presence.vibe !== '😮‍💨 Surviving' ? profile.presence.vibe : undefined,
      interests: [], // Not directly available in ProfileSystem
      currentVibe: profile.presence.vibe,
      lookingFor: []
    },
    social: {
      connections: {
        connectionIds: profile.connections.connections?.map(c => c.userId) || [],
        friendIds: profile.connections.friends?.map(f => f.userId) || [],
        strength: {}
      },
      mutualSpaces: [] // Would need to be calculated
    },
    privacy: {
      level: profile.privacy.visibilityLevel,
      widgets: {
        myActivity: { level: profile.privacy.availabilityBroadcast.campus ? 'public' : 'private' },
        mySpaces: { level: profile.privacy.discoveryParticipation ? 'public' : 'private' },
        myConnections: { level: profile.privacy.visibilityLevel }
      }
    },
    verification: {
      facultyVerified: false, // Not available in ProfileSystem
      emailVerified: true, // Assumed true for ProfileSystem
      profileVerified: profile.isSetupComplete,
      accountStatus: profile.isSetupComplete ? 'active' : 'incomplete',
      userType: 'student', // Default for ProfileSystem
      onboardingCompleted: profile.isSetupComplete
    },
    metadata: {
      completionPercentage: profile.completeness,
      createdAt: profile.createdAt instanceof Date ? profile.createdAt : profile.createdAt.toDate(),
      updatedAt: profile.updatedAt instanceof Date ? profile.updatedAt : profile.updatedAt.toDate(),
      lastActiveAt: profile.presence.lastActive
    },
    widgets: {
      myActivity: { level: profile.privacy.availabilityBroadcast.campus ? 'public' : 'private' },
      mySpaces: { level: profile.privacy.discoveryParticipation ? 'public' : 'private' },
      myConnections: { level: profile.privacy.visibilityLevel }
    }
  };
}