import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { UBEmail } from '../value-objects/ub-email.value';
import { Handle } from '../value-objects/handle.value';
import { PersonalInfo } from '../value-objects/personal-info.value';
import { ProfileId } from '../../../application/shared/temporary-types';
export interface ProfileProps {
    email: UBEmail;
    handle: Handle;
    personalInfo: PersonalInfo;
    interests: string[];
    connections: string[];
    isOnboarded: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Profile extends AggregateRoot<ProfileProps> {
    private constructor();
    static create(props: {
        id: ProfileId;
        email: UBEmail;
        handle: Handle;
        personalInfo: {
            firstName: string;
            lastName: string;
            bio?: string;
            major?: string;
            graduationYear?: number;
            dorm?: string;
        };
    }): Result<Profile>;
    updatePersonalInfo(personalInfo: PersonalInfo): Result<void>;
    completeOnboarding(personalInfo: PersonalInfo, interests: string[]): Result<void>;
    addConnection(connectionId: string): Result<void>;
    removeConnection(connectionId: string): Result<void>;
    updateInterests(interests: string[]): Result<void>;
    addInterest(interest: string): Result<void>;
    addPhoto(photoUrl: string): Promise<Result<void>>;
    get email(): UBEmail;
    get handle(): Handle;
    get personalInfo(): PersonalInfo;
    get interests(): string[];
    get connections(): string[];
    get isOnboarded(): boolean;
    toData(): {
        id: string;
        email: string;
        handle: string;
        personalInfo: {
            firstName: string;
            lastName: string;
            bio: string;
            major: string;
            graduationYear: number | null;
            dorm: string;
        };
        interests: string[];
        connections: string[];
        photos: never[];
        isOnboarded: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    get createdAt(): Date;
    get updatedAt(): Date;
}
//# sourceMappingURL=profile.aggregate.d.ts.map