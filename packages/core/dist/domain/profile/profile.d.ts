/**
 * Profile Aggregate - Student Identity Domain
 * Based on SPEC.md onboarding flow and profile requirements
 */
import { UBEmail, Handle, ProfileId, PhotoUrl, Result } from './value-objects';
export type HiveProfile = Profile;
export interface ProfileCreationProps {
    email: string;
    firstName: string;
    lastName: string;
    handle: string;
}
export interface PersonalInfo {
    firstName: string;
    lastName: string;
    bio?: string;
    major?: string;
    graduationYear?: number;
    dorm?: string;
}
export interface ProfileData {
    id: ProfileId;
    email: UBEmail;
    handle: Handle;
    personalInfo: PersonalInfo;
    photos: PhotoUrl[];
    interests: string[];
    connections: ProfileId[];
    isOnboarded: boolean;
    isVerified?: boolean;
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Profile Aggregate Root
 * Represents a student's identity and campus presence
 */
export declare class Profile {
    private data;
    protected constructor(data: ProfileData);
    get id(): ProfileId;
    get email(): UBEmail;
    get handle(): Handle;
    get fullName(): string;
    get firstName(): string;
    get lastName(): string;
    get bio(): string;
    get major(): string;
    get graduationYear(): number | undefined;
    get isVerified(): boolean;
    get isActive(): boolean;
    set isActive(active: boolean);
    get photos(): PhotoUrl[];
    get interests(): string[];
    get connections(): ProfileId[];
    get isOnboarded(): boolean;
    get createdAt(): Date;
    static create(props: ProfileCreationProps): Result<Profile>;
    updatePersonalInfo(info: Partial<PersonalInfo>): Result<void>;
    addPhoto(photoUrl: string): Result<void>;
    removePhoto(photoUrl: string): Result<void>;
    updateInterests(interests: string[]): Result<void>;
    addConnection(profileId: ProfileId): Result<void>;
    removeConnection(profileId: ProfileId): Result<void>;
    completeOnboarding(): Result<void>;
    canJoinSpaces(): boolean;
    canCreatePosts(): boolean;
    toData(): ProfileData;
    static fromData(data: ProfileData): Profile;
}
//# sourceMappingURL=profile.d.ts.map