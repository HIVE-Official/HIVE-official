export type AcademicLevel =
  | "undergraduate"
  | "graduate"
  | "phd"
  | "faculty"
  | "alumni";

export type VerificationLevel = "verified" | "verified+" | "faculty" | "alumni";

export type SpaceType =
  | "academic"
  | "social"
  | "professional"
  | "sports"
  | "cultural"
  | "service";

export interface SpaceClaim {
  spaceId: string;
  spaceName: string;
  spaceType: SpaceType;
  claimReason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface OnboardingState {
  // Basic Info
  uid?: string;
  email: string;
  schoolId: string;

  // Step 1: Welcome/Display Name
  displayName: string;
  avatarUrl?: string;

  // Auto-generated unique handle
  handle: string; // Auto-generated from displayName

  // Step 2: Academic Card
  academicLevel: AcademicLevel;
  majors: string[]; // Allow multiple majors
  major?: string; // Single major compatibility
  graduationYear: number;

  // Step 3: Role & Verification
  isStudentLeader: boolean;
  verificationLevel: VerificationLevel; // Default 'verified', upgraded to 'verified+' after manual review
  spaceClaims?: SpaceClaim[]; // Spaces claimed by student leaders
  spaceType?: SpaceType; // Temporary field for onboarding flow
  spaceId?: string; // Temporary field for onboarding flow
  verificationEmails?: string[]; // Emails confirming leadership role
  // Legacy/temporary fields used by web onboarding
  isLeader?: boolean;
  spaceName?: string;
  spaceDescription?: string;
  onboardingCompleted?: boolean;

  // Step 4: Interests
  interests: string[];

  // Step 5: Suggested Spaces (for all users)
  suggestedSpaces?: string[]; // Space IDs they can pre-join
  joinedSpaces?: string[]; // Spaces they chose to join during onboarding
  selectedSpaces?: string[]; // Spaces selected during onboarding

  // Consent and Preferences
  builderOptIn?: boolean; // Student leaders are automatically builders
  consentGiven: boolean; // Privacy/terms consent

  // Completion
  isComplete: boolean;
  completedAt?: Date;
}
