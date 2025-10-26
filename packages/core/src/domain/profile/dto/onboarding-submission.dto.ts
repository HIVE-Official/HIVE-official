// Bounded Context Owner: Identity & Access Management Guild
import type { AcademicInfo } from "../value-objects/academic-info.value";
import type { AffiliationInfo } from "../value-objects/affiliation-info.value";
import type { PersonalInfo } from "../value-objects/personal-info.value";
import type { SocialInfo } from "../value-objects/social-info.value";
import type {
  PersonalInterest,
  ResidentialSelection,
  LeadershipInfo
} from "../profile.types";

export interface OnboardingSubmissionDto {
  readonly personalInfo: PersonalInfo;
  readonly academicInfo?: AcademicInfo;
  readonly socialInfo?: SocialInfo;
  readonly affiliation?: AffiliationInfo;
  readonly interests: readonly PersonalInterest[];
  readonly clubs?: readonly string[];
  readonly residentialSelection?: ResidentialSelection;
  readonly handle: string;
  readonly consentGiven: boolean;
  readonly leadership?: LeadershipInfo;
}
