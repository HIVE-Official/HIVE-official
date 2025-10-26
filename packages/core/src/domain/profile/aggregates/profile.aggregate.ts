// Bounded Context Owner: Identity & Access Management Guild
import { CampusEmailFactory, type CampusEmail } from "../value-objects/campus-email.value";
import { AcademicInfoFactory, type AcademicInfo } from "../value-objects/academic-info.value";
import { AffiliationInfoFactory, type AffiliationInfo } from "../value-objects/affiliation-info.value";
import { PersonalInfoFactory, type PersonalInfo } from "../value-objects/personal-info.value";
import { SocialInfoFactory, type SocialInfo } from "../value-objects/social-info.value";
import { type ProfileHandle, ProfileHandleFactory } from "../value-objects/profile-handle.value";
import type {
  ProfileDomainEvent,
  ProfileOnboardedEvent
} from "../events/profile-onboarded.event";
import type { OnboardingSubmissionDto } from "../dto/onboarding-submission.dto";
import type {
  PersonalInterest,
  ProfileId,
  ResidentialSelection,
  UserType,
  LeadershipInfo
} from "../profile.types";
import { LeadershipInfoFactory } from "../value-objects/leadership-info.value";
import { err, ok, type Result } from "../../../shared/result";
import { resolveAutoJoinAssignments } from "../onboarding/auto-join.helper";

export interface ProfileProps {
  readonly profileId: ProfileId;
  readonly email: CampusEmail;
  readonly userType: UserType;
  readonly campusId: string;
  readonly handle?: ProfileHandle;
  readonly personalInfo?: PersonalInfo;
  readonly academicInfo?: AcademicInfo;
  readonly socialInfo?: SocialInfo;
  readonly affiliation?: AffiliationInfo;
  readonly interests: readonly PersonalInterest[];
  readonly clubs: readonly string[];
  readonly residentialSelection?: ResidentialSelection;
  readonly leadership?: LeadershipInfo;
  readonly isOnboarded: boolean;
  readonly isVerified: boolean;
  readonly isActive: boolean;
  readonly onboardingCompletedAt?: Date;
  readonly consentGrantedAt?: Date;
}

export interface ProfileCreationInput {
  readonly profileId: ProfileId;
  readonly email: string;
  readonly userType: UserType;
  readonly handle?: string;
}

export class ProfileAggregate {
  private props: ProfileProps;
  private readonly domainEvents: ProfileDomainEvent[] = [];

  private constructor(props: ProfileProps) {
    this.props = props;
  }

  static create(input: ProfileCreationInput): Result<ProfileAggregate> {
    const emailResult = CampusEmailFactory.create(input.email);
    if (!emailResult.ok) {
      return err(emailResult.error);
    }

    const campus = emailResult.value.campus;
    const handleResult = input.handle
      ? ProfileHandleFactory.create(input.handle)
      : undefined;

    if (handleResult && !handleResult.ok) {
      return err(handleResult.error);
    }

    const profile = new ProfileAggregate({
      profileId: input.profileId,
      email: emailResult.value,
      userType: input.userType,
      campusId: campus.campusId,
      handle: handleResult?.value,
      personalInfo: undefined,
      academicInfo: undefined,
      socialInfo: undefined,
      affiliation: undefined,
      interests: [],
      clubs: [],
      residentialSelection: undefined,
      leadership: undefined,
      isOnboarded: false,
      isVerified: false,
      isActive: true,
      consentGrantedAt: undefined
    });

    return ok(profile);
  }

  assignHandle(rawHandle: string): Result<void> {
    const result = ProfileHandleFactory.create(rawHandle);
    if (!result.ok) {
      return err(result.error);
    }

    this.props = {
      ...this.props,
      handle: result.value
    };

    return ok(undefined);
  }

  verifyAccount(): void {
    this.props = {
      ...this.props,
      isVerified: true
    };
  }

  completeOnboarding(submission: OnboardingSubmissionDto): Result<void> {
    if (!submission.consentGiven) {
      return err("Consent must be given");
    }

    const handleResult = ProfileHandleFactory.create(submission.handle);
    if (!handleResult.ok) {
      return err(handleResult.error);
    }

    const personalInfoResult = PersonalInfoFactory.create(submission.personalInfo);
    if (!personalInfoResult.ok) {
      return err(personalInfoResult.error);
    }

    const interests = Array.from(submission.interests ?? []);
    if (interests.length === 0) {
      return err("At least one interest is required");
    }

    let academicInfo: AcademicInfo | undefined;
    if (this.props.userType === "student") {
      if (!submission.academicInfo) {
        return err("Academic info is required for students");
      }
      const academicResult = AcademicInfoFactory.create(submission.academicInfo);
      if (!academicResult.ok) {
        return err(academicResult.error);
      }
      academicInfo = academicResult.value;
    } else if (submission.academicInfo) {
      const academicResult = AcademicInfoFactory.create(submission.academicInfo);
      if (!academicResult.ok) {
        return err(academicResult.error);
      }
      academicInfo = academicResult.value;
    }

    let affiliation: AffiliationInfo | undefined;
    if (this.props.userType !== "student" && submission.affiliation) {
      const affiliationResult = AffiliationInfoFactory.create(submission.affiliation);
      if (!affiliationResult.ok) {
        return err(affiliationResult.error);
      }
      affiliation = affiliationResult.value;
    }

    const socialInfoResult = submission.socialInfo
      ? SocialInfoFactory.create(submission.socialInfo)
      : ok<SocialInfo | undefined>(undefined);

    if (!socialInfoResult.ok) {
      return err(socialInfoResult.error);
    }

    const clubs = Array.from(submission.clubs ?? []).map((club) => club.trim());

    let leadership: LeadershipInfo | undefined;
    if (submission.leadership) {
      const leadershipResult = LeadershipInfoFactory.create(submission.leadership);
      if (!leadershipResult.ok) {
        return err(leadershipResult.error);
      }
      leadership = leadershipResult.value;
    }

    if (this.props.userType !== "student") {
      if (!leadership || (leadership.spaces.length === 0 && leadership.classCodes.length === 0)) {
        return err("Leaders must provide a space or class code");
      }
      leadership = {
        ...leadership,
        isLeader: true
      };
    } else if (leadership?.isLeader && leadership.spaces.length === 0) {
      return err("Student leaders must select at least one space");
    }

    const consentGrantedAt = this.props.consentGrantedAt ?? new Date();

    const updatedProps: ProfileProps = {
      ...this.props,
      personalInfo: personalInfoResult.value,
      academicInfo,
      socialInfo: socialInfoResult.value,
      affiliation,
      interests,
      clubs,
      residentialSelection: submission.residentialSelection,
      leadership,
      isOnboarded: true,
      onboardingCompletedAt: new Date(),
      handle: handleResult.value,
      consentGrantedAt
    };

    const completionValidation = this.validateCompletion(updatedProps);
    if (!completionValidation.ok) {
      return err(completionValidation.error);
    }

    this.props = updatedProps;
    this.domainEvents.push(this.buildProfileOnboardedEvent());
    return ok(undefined);
  }

  private validateCompletion(props: ProfileProps): Result<void> {
    if (!props.personalInfo) {
      return err("Personal info is required");
    }

    if (this.props.userType === "student") {
      if (!props.academicInfo) {
        return err("Academic info is required for students");
      }
    }

    if (!props.handle) {
      return err("Handle is required to complete onboarding");
    }

    if (props.interests.length === 0) {
      return err("At least one interest is required");
    }

    if (this.props.userType !== "student") {
      const leadership = props.leadership;
      if (!leadership || (leadership.spaces.length === 0 && leadership.classCodes.length === 0)) {
        return err("Leader affiliation is required");
      }
    }

    return ok(undefined);
  }

  getCompletionPercentage(): number {
    let score = 0;

    if (this.hasPersonalBasics()) {
      score += 40;
    }

    if (this.hasAcademicOrAffiliation()) {
      score += 30;
    }

    if (this.props.interests.length > 0) {
      score += 30;
    }

    return Math.min(score, 100);
  }

  isProfileComplete(): boolean {
    return this.getCompletionPercentage() === 100;
  }

  isOnboarded(): boolean {
    return this.props.isOnboarded;
  }

  getProps(): ProfileProps {
    return {
      ...this.props,
      personalInfo: this.props.personalInfo
        ? { ...this.props.personalInfo }
        : undefined,
      academicInfo: this.props.academicInfo
        ? { ...this.props.academicInfo }
        : undefined,
      socialInfo: this.props.socialInfo
        ? { ...this.props.socialInfo }
        : undefined,
      affiliation: this.props.affiliation
        ? { ...this.props.affiliation }
        : undefined,
      interests: [...this.props.interests],
      clubs: [...this.props.clubs],
      residentialSelection: this.props.residentialSelection
        ? { ...this.props.residentialSelection }
        : undefined,
      leadership: this.props.leadership
        ? {
            isLeader: this.props.leadership.isLeader,
            spaces: this.props.leadership.spaces.map((space) => ({ ...space })),
            classCodes: [...this.props.leadership.classCodes]
          }
        : undefined,
      consentGrantedAt: this.props.consentGrantedAt
        ? new Date(this.props.consentGrantedAt.getTime())
        : undefined
    };
  }

  pullDomainEvents(): ProfileDomainEvent[] {
    return this.domainEvents.splice(0, this.domainEvents.length);
  }

  private buildProfileOnboardedEvent(): ProfileOnboardedEvent {
    const assignments = resolveAutoJoinAssignments(this.props);

    return {
      type: "profile.onboarded",
      profileId: this.props.profileId.value,
      occurredAt: this.props.onboardingCompletedAt ?? new Date(),
      interests: this.props.interests.map((interest) => interest.id),
      majors: this.props.academicInfo?.majors ?? [],
      residentialSpaceId: this.props.residentialSelection?.spaceId,
      handle: this.props.handle?.value ?? "",
      defaultSpaces: assignments.defaultSpaces,
      cohortSpaces: assignments.cohortSpaces,
      leaderSpaceIds: this.props.leadership?.spaces.map((space) => space.id) ?? [],
      classCodes: this.props.leadership?.classCodes ?? [],
      isLeader: this.props.leadership?.isLeader ?? false
    };
  }

  static fromPersistence(props: ProfileProps): ProfileAggregate {
    return new ProfileAggregate(props);
  }

  private hasPersonalBasics(): boolean {
    const personal = this.props.personalInfo;
    if (!personal) {
      return false;
    }

    return (
      Boolean(personal.firstName?.trim()) && Boolean(personal.lastName?.trim())
    );
  }

  private hasAcademicOrAffiliation(): boolean {
    if (this.props.userType === "student") {
      return Boolean(this.props.academicInfo);
    }

    return Boolean(this.props.affiliation);
  }
}
