/**
 * Spec-Compliant Profile Type
 * Represents the standardized profile structure for HIVE
 */

export interface SpecCompliantProfile {
  // Core Identity
  id: string;
  handle: string;
  displayName: string;
  email: string;

  // Profile Information
  bio?: string;
  photoURL?: string;
  coverPhotoURL?: string;

  // Academic Information
  school: string;
  major?: string;
  year?: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate' | 'Alumni';
  graduationYear?: number;

  // Social Connections
  connections?: {
    count: number;
    recentIds?: string[];
  };

  // Activity & Engagement
  stats?: {
    postsCount: number;
    spacesJoined: number;
    toolsCreated: number;
    eventsAttended: number;
  };

  // Interests & Tags
  interests?: string[];
  skills?: string[];
  lookingFor?: string[];

  // Campus Information
  campusId: string;
  dorm?: string;
  organizations?: string[];

  // Metadata
  createdAt: Date | any;
  updatedAt?: Date | any;
  lastActive?: Date | any;
  isVerified?: boolean;
  isActive?: boolean;

  // Privacy Settings
  privacy?: {
    profileVisibility: 'public' | 'campus' | 'connections' | 'private';
    showEmail: boolean;
    showSchedule: boolean;
    allowMessages: 'everyone' | 'connections' | 'nobody';
  };

  // Feature Flags
  features?: {
    betaAccess?: boolean;
    toolBuilder?: boolean;
    spaceCreator?: boolean;
  };
}

// Helper functions for profile compliance
export function isProfileComplete(profile: Partial<SpecCompliantProfile>): boolean {
  return !!(
    profile.handle &&
    profile.displayName &&
    profile.email &&
    profile.school &&
    profile.campusId
  );
}

export function getProfileCompletionPercentage(profile: Partial<SpecCompliantProfile>): number {
  const requiredFields = ['handle', 'displayName', 'email', 'school', 'campusId'];
  const optionalFields = ['bio', 'photoURL', 'major', 'year', 'interests', 'skills'];

  let completed = 0;
  const totalFields = requiredFields.length + optionalFields.length;

  requiredFields.forEach(field => {
    if (profile[field as keyof SpecCompliantProfile]) completed++;
  });

  optionalFields.forEach(field => {
    if (profile[field as keyof SpecCompliantProfile]) completed++;
  });

  return Math.round((completed / totalFields) * 100);
}

export function createDefaultProfile(email: string, campusId: string): SpecCompliantProfile {
  return {
    id: '',
    handle: email.split('@')[0],
    displayName: '',
    email,
    school: 'University at Buffalo',
    campusId,
    stats: {
      postsCount: 0,
      spacesJoined: 0,
      toolsCreated: 0,
      eventsAttended: 0
    },
    privacy: {
      profileVisibility: 'campus',
      showEmail: false,
      showSchedule: true,
      allowMessages: 'connections'
    },
    features: {
      betaAccess: true,
      toolBuilder: false,
      spaceCreator: false
    },
    createdAt: new Date(),
    isActive: true,
    isVerified: false
  };
}