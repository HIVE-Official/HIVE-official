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
    connections: string[];
    spaces: string[];
    achievements: string[];
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
export declare class Profile extends AggregateRoot<ProfileProps> {
    get profileId(): ProfileId;
    get email(): UBEmail;
    get handle(): ProfileHandle;
    get userType(): UserType;
    get campusId(): CampusId;
    get isOnboarded(): boolean;
    get isVerified(): boolean;
    get displayName(): string;
    get connections(): string[];
    get activityScore(): number;
    get followerCount(): number;
    get followingCount(): number;
    get connectionCount(): number;
    get spaces(): string[];
    get personalInfo(): PersonalInfo;
    get interests(): string[];
    get academicInfo(): AcademicInfo | undefined;
    get socialInfo(): SocialInfo;
    get privacy(): ProfilePrivacy;
    get isActive(): boolean;
    get lastActive(): Date | undefined;
    get createdAt(): Date;
    get updatedAt(): Date;
    get bio(): string | undefined;
    get major(): string | undefined;
    get graduationYear(): number | undefined;
    get firstName(): string;
    get lastName(): string;
    get username(): string;
    get photos(): string[];
    get badges(): string[];
    get achievements(): string[];
    get blockedUsers(): string[];
    get lastSeen(): Date | undefined;
    get onboardingCompleted(): boolean;
    setIsVerified(isVerified: boolean): void;
    setActivityScore(score: number): void;
    setInterests(interests: string[]): void;
    setPrivacy(privacy: ProfilePrivacy): void;
    private constructor();
    static create(props: {
        profileId: ProfileId;
        email: UBEmail;
        handle: ProfileHandle;
        userType?: UserType;
        campusId?: CampusId;
        personalInfo: PersonalInfo;
        academicInfo?: AcademicInfo;
        socialInfo?: Partial<SocialInfo>;
        privacy?: ProfilePrivacy;
    }, id?: string): Result<Profile>;
    updatePersonalInfo(info: Partial<PersonalInfo>): Result<void>;
    updateAcademicInfo(info: AcademicInfo): Result<void>;
    updateSocialInfo(info: Partial<SocialInfo>): Result<void>;
    updatePrivacy(privacy: ProfilePrivacy): Result<void>;
    addInterest(interest: string): Result<void>;
    removeInterest(interest: string): void;
    addConnection(connectionId: string): void;
    removeConnection(connectionId: string): void;
    joinSpace(spaceId: string): void;
    leaveSpace(spaceId: string): void;
    addAchievement(achievementId: string): void;
    addPhoto(photoUrl: string): Promise<Result<void>>;
    completeOnboarding(academicInfo: AcademicInfo | undefined, interests: string[], selectedSpaces: string[]): Result<void>;
    verify(): void;
    deactivate(): void;
    reactivate(): void;
    updateLastActive(): void;
    isProfileComplete(): boolean;
    getCompletionPercentage(): number;
    /**
     * Onboarding Business Logic (Moved from ProfileOnboardingService)
     */
    getOnboardingNextSteps(suggestedSpaces: Array<{
        id: string;
        name: string;
    }>): Array<{
        title: string;
        description: string;
        completed: boolean;
    }>;
    getOnboardingWarnings(): string[];
    getOnboardingStatus(): {
        isComplete: boolean;
        completedSteps: string[];
        remainingSteps: string[];
        completionPercentage: number;
        nextSteps: Array<{
            title: string;
            description: string;
            completed: boolean;
        }>;
        warnings: string[];
    };
    toData(): any;
    toDTO(): any;
}
//# sourceMappingURL=profile.aggregate.d.ts.map