export interface HiveOnboardingData {
  fullName: string;
  userType?: 'student' | 'alumni' | 'faculty';
  firstName?: string;
  lastName?: string;
  facultyEmail?: string;
  majors: string[]; // Changed from major: string to majors: string[]
  academicLevel?: string;
  graduationYear: number;
  handle: string;
  profilePhoto?: string;
  builderRequestSpaces?: string[];
  hasConsented: boolean;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  interests?: string[]; // Added interests array
}

export interface OnboardingStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}