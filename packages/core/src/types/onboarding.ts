export type AcademicLevel = "undergraduate" | "masters" | "phd";

export interface OnboardingData {
  // Step 1: Display Name & Avatar
  fullName: string;
  handle: string;
  avatarUrl?: string;

  // Step 2: Leader Question
  isStudentLeader: boolean;
  spaceId?: string;
  spaceType?: string;

  // Step 3: Space Verification (if leader)
  verificationEmails?: string[];  // Max 4 emails to verify leadership

  // Step 4: Academic Card
  academicLevel: AcademicLevel;
  majors: string[];  // Allow multiple majors
  graduationYear: number;

  // Step 5: Interests
  interests: string[];

  // Completion Status
  onboardingCompleted: boolean;
} 