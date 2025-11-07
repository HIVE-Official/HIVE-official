export type AcademicLevel = "undergraduate" | "graduate" | "doctoral";

export type LivingSituation =
  | "on-campus"
  | "off-campus"
  | "commuter"
  | "not-sure";

export interface HiveOnboardingData {
  fullName: string;
  userType?: "student" | "alumni" | "faculty";
  firstName?: string;
  lastName?: string;
  facultyEmail?: string;
  major: string;
  academicLevel?: AcademicLevel;
  graduationYear: number;
  handle: string;
  profilePhoto?: string;
  interests?: string[];
  builderRequestSpaces?: string[];
  bio?: string;
  livingSituation?: LivingSituation;
  hasConsented: boolean;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}
