/**
 * Profile Data Transfer Object
 * Used for communication between application and infrastructure layers
 */
export interface ProfileDTO {
  id: string;
  email: string;
  handle: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    bio: string;
    major: string;
    graduationYear: number | null;
    dorm: string;
  };
  interests: string[];
  connections: string[];
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProfileDTO {
  email: string;
  handle: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  dorm?: string;
  interests?: string[];
}

export interface UpdateProfileDTO {
  firstName?: string;
  lastName?: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  dorm?: string;
  interests?: string[];
}