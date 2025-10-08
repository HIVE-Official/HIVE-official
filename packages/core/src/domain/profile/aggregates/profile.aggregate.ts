/**
 * Profile Aggregate
 * Represents a campus profile with full features
 */

import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { ProfileId } from '../value-objects/profile-id.value';
import { CampusId } from '../value-objects/campus-id.value';
import { ProfileHandle } from '../value-objects/profile-handle.value';
import { UserType } from '../value-objects/user-type.value';
import { ProfilePrivacy } from '../value-objects/profile-privacy.value';
import { UBEmail } from '../value-objects/ub-email.value';
import { ProfileCreatedEvent } from '../events/profile-created.event';
import { ProfileOnboardedEvent } from '../events/profile-onboarded.event';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  dorm?: string;
  phoneNumber?: string;
  profilePhoto?: string;
  coverPhoto?: string;
}

export interface AcademicInfo {
  major: string;
  minor?: string;
  graduationYear: number;
  gpa?: number;
  courses: string[];
  academicStanding: 'good' | 'probation' | 'warning';
}

export interface SocialInfo {
  interests: string[];
  clubs: string[];
  sports: string[];
  greek?: string;
  instagram?: string;
  snapchat?: string;
  twitter?: string;
  linkedin?: string;
}

export interface ProfileProps {
  profileId: ProfileId;
  email: UBEmail;
  handle: ProfileHandle;
  userType: UserType;
  campusId: CampusId;
  personalInfo: PersonalInfo;
  academicInfo?: AcademicInfo;
  socialInfo: SocialInfo;
  privacy: ProfilePrivacy;
  connections: string[]; // Connection IDs
  spaces: string[]; // Space IDs
  achievements: string[]; // Achievement IDs
  isOnboarded: boolean;
  isVerified: boolean;
  isActive: boolean;
  lastActive?: Date;
  createdAt: Date;
  updatedAt: Date;
  activityScore: number;
  followerCount: number;
  followingCount: number;
  connectionCount: number;
}

export class Profile extends AggregateRoot<ProfileProps> {
  get profileId(): ProfileId {
    return this.props.profileId;
  }

  get email(): UBEmail {
    return this.props.email;
  }

  get handle(): ProfileHandle {
    return this.props.handle;
  }

  get userType(): UserType {
    return this.props.userType;
  }

  get campusId(): CampusId {
    return this.props.campusId;
  }

  get isOnboarded(): boolean {
    return this.props.isOnboarded;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get displayName(): string {
    const { firstName, lastName } = this.props.personalInfo;
    return `${firstName} ${lastName}`.trim() || this.props.handle.value;
  }

  get connections(): string[] {
    return this.props.connections;
  }

  get activityScore(): number {
    return this.props.activityScore;
  }

  get followerCount(): number {
    return this.props.followerCount;
  }

  get followingCount(): number {
    return this.props.followingCount;
  }

  get connectionCount(): number {
    return this.props.connectionCount;
  }

  get spaces(): string[] {
    return this.props.spaces;
  }

  get personalInfo(): PersonalInfo {
    return this.props.personalInfo;
  }

  get interests(): string[] {
    return this.props.socialInfo.interests;
  }

  get academicInfo(): AcademicInfo | undefined {
    return this.props.academicInfo;
  }

  get socialInfo(): SocialInfo {
    return this.props.socialInfo;
  }

  get privacy(): ProfilePrivacy {
    return this.props.privacy;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get lastActive(): Date | undefined {
    return this.props.lastActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Individual property accessors for repository layer compatibility
  get bio(): string | undefined {
    return this.props.personalInfo.bio;
  }

  get major(): string | undefined {
    return this.props.academicInfo?.major || this.props.personalInfo.major;
  }

  get graduationYear(): number | undefined {
    return this.props.academicInfo?.graduationYear || this.props.personalInfo.graduationYear;
  }

  get firstName(): string {
    return this.props.personalInfo.firstName;
  }

  get lastName(): string {
    return this.props.personalInfo.lastName;
  }

  get username(): string {
    return this.props.handle.value;
  }

  get photos(): string[] {
    const photos = [];
    if (this.props.personalInfo.profilePhoto) {
      photos.push(this.props.personalInfo.profilePhoto);
    }
    if (this.props.personalInfo.coverPhoto) {
      photos.push(this.props.personalInfo.coverPhoto);
    }
    return photos;
  }

  get badges(): string[] {
    return this.props.achievements;
  }

  get achievements(): string[] {
    return this.props.achievements;
  }

  get blockedUsers(): string[] {
    // Implement blocked users logic - for now return empty array
    return [];
  }

  get lastSeen(): Date | undefined {
    return this.props.lastActive;
  }

  get onboardingCompleted(): boolean {
    return this.props.isOnboarded;
  }

  // Temporary setters for repository layer - should be removed once proper construction is implemented
  public setIsVerified(isVerified: boolean): void {
    (this.props as any).isVerified = isVerified;
  }

  public setActivityScore(score: number): void {
    (this.props as any).activityScore = score;
  }

  public setInterests(interests: string[]): void {
    (this.props as any).socialInfo = { ...this.props.socialInfo, interests };
  }

  public setPrivacy(privacy: ProfilePrivacy): void {
    (this.props as any).privacy = privacy;
  }

  private constructor(props: ProfileProps, id?: string) {
    super(props, id || `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  public static create(
    props: {
      profileId: ProfileId;
      email: UBEmail;
      handle: ProfileHandle;
      userType?: UserType;
      campusId?: CampusId;
      personalInfo: PersonalInfo;
      academicInfo?: AcademicInfo;
      socialInfo?: Partial<SocialInfo>;
      privacy?: ProfilePrivacy;
    },
    id?: string
  ): Result<Profile> {
    const defaultUserType = UserType.createStudent().getValue();
    const defaultCampusId = CampusId.createUBBuffalo().getValue();
    const defaultPrivacy = ProfilePrivacy.createDefault().getValue();

    const defaultSocialInfo: SocialInfo = {
      interests: [],
      clubs: [],
      sports: [],
      ...props.socialInfo
    };

    const profileProps: ProfileProps = {
      profileId: props.profileId,
      email: props.email,
      handle: props.handle,
      userType: props.userType || defaultUserType,
      campusId: props.campusId || defaultCampusId,
      personalInfo: props.personalInfo,
      academicInfo: props.academicInfo,
      socialInfo: defaultSocialInfo,
      privacy: props.privacy || defaultPrivacy,
      connections: [],
      spaces: [],
      achievements: [],
      isOnboarded: false,
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      activityScore: 0,
      followerCount: 0,
      followingCount: 0,
      connectionCount: 0
    };

    const profile = new Profile(profileProps, id);

    // Fire domain event
    profile.addDomainEvent(
      new ProfileCreatedEvent(
        profile.id,
        props.handle.value,
        props.email.value,
        profileProps.campusId.value
      )
    );

    return Result.ok<Profile>(profile);
  }

  public updatePersonalInfo(info: Partial<PersonalInfo>): Result<void> {
    this.props.personalInfo = { ...this.props.personalInfo, ...info };
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  public updateAcademicInfo(info: AcademicInfo): Result<void> {
    this.props.academicInfo = info;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  public updateSocialInfo(info: Partial<SocialInfo>): Result<void> {
    this.props.socialInfo = { ...this.props.socialInfo, ...info };
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  public updatePrivacy(privacy: ProfilePrivacy): Result<void> {
    this.props.privacy = privacy;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  public addInterest(interest: string): Result<void> {
    if (this.props.socialInfo.interests.includes(interest)) {
      return Result.fail<void>('Interest already exists');
    }

    if (this.props.socialInfo.interests.length >= 10) {
      return Result.fail<void>('maximum of 10 interests allowed');
    }

    this.props.socialInfo.interests.push(interest);
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  public removeInterest(interest: string): void {
    this.props.socialInfo.interests = this.props.socialInfo.interests.filter(
      i => i !== interest
    );
    this.props.updatedAt = new Date();
  }

  public addConnection(connectionId: string): void {
    if (!this.props.connections.includes(connectionId)) {
      this.props.connections.push(connectionId);
      this.props.connectionCount = this.props.connections.length;
      this.props.updatedAt = new Date();
    }
  }

  public removeConnection(connectionId: string): void {
    this.props.connections = this.props.connections.filter(id => id !== connectionId);
    this.props.connectionCount = this.props.connections.length;
    this.props.updatedAt = new Date();
  }

  public joinSpace(spaceId: string): void {
    if (!this.props.spaces.includes(spaceId)) {
      this.props.spaces.push(spaceId);
      this.props.updatedAt = new Date();
    }
  }

  public leaveSpace(spaceId: string): void {
    this.props.spaces = this.props.spaces.filter(id => id !== spaceId);
    this.props.updatedAt = new Date();
  }

  public addAchievement(achievementId: string): void {
    if (!this.props.achievements.includes(achievementId)) {
      this.props.achievements.push(achievementId);
      this.props.updatedAt = new Date();
    }
  }

  public async addPhoto(photoUrl: string): Promise<Result<void>> {
    if (!photoUrl || photoUrl.trim().length === 0) {
      return Result.fail<void>('Photo URL cannot be empty');
    }
    this.props.personalInfo.profilePhoto = photoUrl;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  public completeOnboarding(
    academicInfo: AcademicInfo | undefined,
    interests: string[],
    selectedSpaces: string[]
  ): Result<void> {
    // Check if already onboarded FIRST (for proper error messaging)
    if (this.props.isOnboarded) {
      return Result.fail<void>('Profile is already onboarded');
    }

    if (!interests || interests.length === 0) {
      return Result.fail<void>('At least one interest must be selected during onboarding');
    }

    if (!selectedSpaces || selectedSpaces.length === 0) {
      return Result.fail<void>('At least one space must be joined during onboarding');
    }

    // Validate required fields for students
    if (this.props.userType.isStudent() && !academicInfo) {
      return Result.fail<void>('Academic information is required for students');
    }

    // Update academic info
    if (academicInfo) {
      this.props.academicInfo = academicInfo;
    }

    // Update interests if provided and non-empty
    this.props.socialInfo.interests = interests;

    // Add spaces if provided and non-empty
    this.props.spaces = [];
    selectedSpaces.forEach(spaceId => this.joinSpace(spaceId));

    this.props.isOnboarded = true;
    this.props.updatedAt = new Date();

    // Fire domain event
    this.addDomainEvent(
      new ProfileOnboardedEvent(
        this.id,
        this.props.campusId.value,
        this.props.socialInfo.interests
      )
    );

    return Result.ok<void>();
  }

  public verify(): void {
    this.props.isVerified = true;
    this.props.updatedAt = new Date();
  }

  public deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  public reactivate(): void {
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }

  public updateLastActive(): void {
    this.props.lastActive = new Date();
  }

  public isProfileComplete(): boolean {
    const { personalInfo, academicInfo, socialInfo } = this.props;

    // Basic info required
    if (!personalInfo.firstName || !personalInfo.lastName) return false;
    if (!personalInfo.bio) return false;

    // Students need academic info
    if (this.props.userType.isStudent() && !academicInfo) return false;

    // Social info minimum
    if (socialInfo.interests.length === 0) return false;

    // Must be in at least one space
    if (this.props.spaces.length === 0) return false;

    return true;
  }

  public getCompletionPercentage(): number {
    let completed = 0;
    let total = 0;

    // Personal Info (40%)
    total += 4;
    if (this.props.personalInfo.firstName) completed++;
    if (this.props.personalInfo.lastName) completed++;
    if (this.props.personalInfo.bio) completed++;
    if (this.props.personalInfo.profilePhoto) completed++;

    // Academic Info (30%) - only for students
    if (this.props.userType.isStudent()) {
      total += 3;
      if (this.props.academicInfo?.major) completed++;
      if (this.props.academicInfo?.graduationYear) completed++;
      if (this.props.academicInfo?.courses.length) completed++;
    }

    // Social Info (30%) - Granular calculation with progressive scoring
    total += 3;

    // Interests: 0 = 0, 1 = 0.33, 2 = 0.66, 3+ = 1.0
    const interestCount = this.props.socialInfo.interests.length;
    if (interestCount >= 3) {
      completed++;
    } else {
      completed += interestCount / 3;
    }

    if (this.props.socialInfo.clubs.length > 0) completed++;
    if (this.props.socialInfo.instagram || this.props.socialInfo.snapchat) completed++;

    return Math.round((completed / total) * 100);
  }

  /**
   * Onboarding Business Logic (Moved from ProfileOnboardingService)
   */

  public getOnboardingNextSteps(suggestedSpaces: Array<{ id: string; name: string }>): Array<{
    title: string;
    description: string;
    completed: boolean;
  }> {
    const steps: Array<{ title: string; description: string; completed: boolean }> = [];

    // Complete onboarding step
    steps.push({
      title: 'Complete onboarding',
      description: 'Finish setting up your profile with academic info, interests, and join spaces',
      completed: this.props.isOnboarded
    });

    // Profile photo step
    steps.push({
      title: 'Add profile photo',
      description: 'Add a profile photo to help others recognize you',
      completed: !!this.props.personalInfo.profilePhoto
    });

    // Interests step
    steps.push({
      title: 'Add interests',
      description: 'Add interests to get better space recommendations',
      completed: this.props.socialInfo.interests.length >= 3
    });

    // Join spaces step
    if (suggestedSpaces.length > 0) {
      steps.push({
        title: 'Join spaces',
        description: `Join spaces like "${suggestedSpaces[0].name}" to connect with others`,
        completed: this.props.spaces.length > 0
      });
    }

    // Explore feed step
    steps.push({
      title: 'Explore feed',
      description: 'Check out your personalized feed to see what\'s happening on campus',
      completed: false // Always show as incomplete for exploration
    });

    // Connect with others step
    steps.push({
      title: 'Connect with others',
      description: 'Find and connect with classmates in your major',
      completed: this.props.connections.length > 0
    });

    return steps;
  }

  public getOnboardingWarnings(): string[] {
    const warnings: string[] = [];

    if (!this.props.personalInfo.bio) {
      warnings.push('Adding a bio helps others learn more about you');
    }

    if (!this.props.academicInfo) {
      warnings.push('Adding academic information helps you find relevant study groups');
    }

    if (this.props.socialInfo.interests.length === 0) {
      warnings.push('Adding interests improves your feed and space recommendations');
    }

    if (this.props.spaces.length === 0) {
      warnings.push('Joining at least one space helps you connect with others');
    }

    if (!this.props.personalInfo.profilePhoto) {
      warnings.push('Adding a profile photo helps others recognize you');
    }

    return warnings;
  }

  public getOnboardingStatus(): {
    isComplete: boolean;
    completedSteps: string[];
    remainingSteps: string[];
    completionPercentage: number;
    nextSteps: Array<{ title: string; description: string; completed: boolean }>;
    warnings: string[];
  } {
    const requiredSteps = [
      'email_verified',
      'handle_set',
      'basic_info',
      'interests_selected',
      'profile_photo',
      'first_space_joined'
    ];

    const completedSteps: string[] = [];

    if (this.props.email) completedSteps.push('email_verified');
    if (this.props.handle) completedSteps.push('handle_set');
    if (this.props.personalInfo.firstName && this.props.personalInfo.lastName) {
      completedSteps.push('basic_info');
    }
    if (this.props.socialInfo.interests.length > 0) completedSteps.push('interests_selected');
    if (this.props.personalInfo.profilePhoto) completedSteps.push('profile_photo');
    if (this.props.spaces.length > 0) completedSteps.push('first_space_joined');

    const remainingSteps = requiredSteps.filter(step => !completedSteps.includes(step));

    return {
      isComplete: this.props.isOnboarded,
      completedSteps,
      remainingSteps,
      completionPercentage: this.getCompletionPercentage(),
      nextSteps: this.getOnboardingNextSteps([]),
      warnings: this.getOnboardingWarnings()
    };
  }

  public toData(): any {
    return this.toDTO();
  }

  public toDTO(): any {
    return {
      id: this.props.profileId.value,
      email: this.props.email.value,
      handle: this.props.handle.value,
      personalInfo: this.props.personalInfo,
      academicInfo: this.props.academicInfo,
      socialInfo: this.props.socialInfo,
      interests: this.props.socialInfo.interests,
      connections: this.props.connections,
      spaces: this.props.spaces,
      achievements: this.props.achievements,
      isOnboarded: this.props.isOnboarded,
      isVerified: this.props.isVerified,
      isActive: this.props.isActive,
      lastActive: this.props.lastActive,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      displayName: this.displayName,
      completionPercentage: this.getCompletionPercentage()
    };
  }
}
