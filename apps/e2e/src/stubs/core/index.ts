export type UserType = "student" | "alumni" | "faculty";
export type SignUpMode = "default" | "welcomeBack" | "resume";

export interface InterestOption {
  id: string;
  label: string;
  category?: string;
}

export interface MajorOption {
  id: string;
  name: string;
  college?: string;
}

export interface ResidentialSpaceOption {
  id: string;
  name: string;
  campusId: string;
  spaceId: string;
  cta?: string;
}

export const interestOptions: InterestOption[] = [
  { id: "build-products", label: "Building products", category: "Build" },
  { id: "community", label: "Community projects", category: "Community" },
  { id: "hackathons", label: "Hackathons", category: "Tech" }
];

export const majorOptions: MajorOption[] = [
  { id: "cs", name: "Computer Science" },
  { id: "design", name: "Design" }
];

export const residentialSpaceOptions: ResidentialSpaceOption[] = [
  { id: "north-campus", name: "North Campus", campusId: "ub-buffalo", spaceId: "north-campus" },
  { id: "south-campus", name: "South Campus", campusId: "ub-buffalo", spaceId: "south-campus" }
];

export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  pronouns?: string;
  bio?: string;
  photoUrl?: string;
}

export type PersonalInterest = InterestOption;

export interface AcademicInfo {
  majors?: string[];
  graduationYear?: number;
  courses?: string[];
}

export interface AffiliationInfo {
  department?: string;
}

export interface SocialInfo {
  instagram?: string;
  linkedin?: string;
  website?: string;
}

export interface ResidentialSelection {
  spaceId?: string;
  name?: string;
}

interface LeadershipSubmission {
  isLeader?: boolean;
  spaces?: { id: string; name: string }[];
  classCodes?: string[];
}

export interface OnboardingSubmissionDto {
  personalInfo?: PersonalInfo;
  academicInfo?: AcademicInfo;
  affiliation?: AffiliationInfo;
  socialInfo?: SocialInfo;
  interests?: PersonalInterest[];
  clubs?: string[];
  residentialSelection?: ResidentialSelection | null;
  consentGiven?: boolean;
  leadership?: LeadershipSubmission;
  handle?: string;
}

export interface OnboardingProgressSnapshot {
  profileId: string;
  partialSubmission: OnboardingSubmissionDto;
  stepsCompleted: string[];
  lastUpdated: string;
}

export type SpaceType = "club" | "course" | "cohort" | "community";

export const FeedApplicationService: any = {};
export const RitualApplicationService: any = {};
export const InMemoryRitualRepository: any = {};

export const CampusEmailFactory = {
  create(email: string) {
    if (!email) {
      return { ok: false as const };
    }
    return { ok: true as const, value: { value: email, domain: email.split("@")[1] ?? "" } };
  }
};

export type ProfileProps = any;

export const ProfileAggregate = {
  fromPersistence(_props: ProfileProps) {
    return {
      getCompletionPercentage: () => 100
    };
  }
};

export const ProfileHandleFactory = {
  create(handle: string) {
    if (!handle) {
      return { ok: false as const };
    }
    return { ok: true as const, value: { value: handle } };
  }
};
