/**
 * EnhancedProfile Aggregate
 * Represents an enhanced profile with full campus features
 */

import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { ProfileId } from '../value-objects/profile-id.value';
import { CampusId } from '../value-objects/campus-id.value';
import { ProfileHandle } from '../value-objects/profile-handle.value';
import { UserType } from '../value-objects/user-type.value';
import { ProfilePrivacy } from '../value-objects/profile-privacy.value';
import { UBEmail } from '../../identity/value-objects/ub-email.value';

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

interface EnhancedProfileProps {
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

export class EnhancedProfile extends AggregateRoot<EnhancedProfileProps> {
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
    const photos: string[] = [];
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

  private constructor(props: EnhancedProfileProps, id?: string) {
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
  ): Result<EnhancedProfile> {
    const defaultUserType = UserType.createStudent().getValue();
    const defaultCampusId = CampusId.createUBBuffalo().getValue();
    const defaultPrivacy = ProfilePrivacy.createDefault().getValue();

    const defaultSocialInfo: SocialInfo = {
      interests: [],
      clubs: [],
      sports: [],
      ...props.socialInfo
    };

    const profileProps: EnhancedProfileProps = {
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

    const profile = new EnhancedProfile(profileProps, id);

    return Result.ok<EnhancedProfile>(profile);
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
      return Result.fail<void>('Maximum of 10 interests allowed');
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
      this.props.updatedAt = new Date();
    }
  }

  public removeConnection(connectionId: string): void {
    this.props.connections = this.props.connections.filter(id => id !== connectionId);
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
    personalInfo?: PersonalInfo,
    interests?: string[]
  ): Result<void> {
    if (this.props.isOnboarded) {
      return Result.fail<void>('Profile is already onboarded');
    }

    // Update personal info if provided
    if (personalInfo) {
      this.props.personalInfo = { ...this.props.personalInfo, ...personalInfo };
    }

    // Update interests if provided
    if (interests) {
      this.props.socialInfo.interests = interests;
    }

    // Validate required fields
    if (!this.props.personalInfo.firstName || !this.props.personalInfo.lastName) {
      return Result.fail<void>('First and last name are required for onboarding');
    }

    if (this.props.userType.isStudent() && !this.props.academicInfo) {
      return Result.fail<void>('Academic information is required for students');
    }

    this.props.isOnboarded = true;
    this.props.updatedAt = new Date();

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

    // Social Info (30%)
    total += 3;
    if (this.props.socialInfo.interests.length > 0) completed++;
    if (this.props.socialInfo.clubs.length > 0) completed++;
    if (this.props.socialInfo.instagram || this.props.socialInfo.snapchat) completed++;

    return Math.round((completed / total) * 100);
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
