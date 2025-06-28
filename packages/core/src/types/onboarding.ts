export type AcademicLevel = "undergraduate" | "masters" | "phd";

export interface OnboardingData {
  // Step 1: Display Name & Avatar
  fullName: string;
  handle: string;
  avatarUrl?: string;

  // Step 2: Leader Question
  isStudentLeader: boolean;
  isLeader?: boolean; // Alias for isStudentLeader for compatibility

  // Note: Space creation/claiming deferred to main platform

  // Step 4: Academic Card
  academicLevel: AcademicLevel;
  majors: string[];  // Allow multiple majors
  major?: string; // Single major compatibility
  graduationYear: number;

  // Step 5: Interests
  interests: string[];

  // Consent and Preferences
  builderOptIn?: boolean;  // Opt-in to builder features
  consentGiven: boolean;   // Privacy/terms consent

  // Note: Space discovery deferred to main platform

  // Completion Status
  onboardingCompleted: boolean;
} 