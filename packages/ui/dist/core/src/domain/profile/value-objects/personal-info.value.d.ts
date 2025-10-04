import { ValueObject } from '../../shared/base/ValueObject.base';
import { Result } from '../../shared/base/Result';
interface PersonalInfoProps {
    firstName: string;
    lastName: string;
    bio: string;
    major: string;
    graduationYear: number | null;
    dorm: string;
}
export declare class PersonalInfo extends ValueObject<PersonalInfoProps> {
    private static readonly MAX_BIO_LENGTH;
    private static readonly MIN_GRAD_YEAR;
    private static readonly MAX_GRAD_YEAR;
    private constructor();
    static create(props: {
        firstName: string;
        lastName: string;
        bio: string;
        major: string;
        graduationYear: number | null;
        dorm: string;
    }): Result<PersonalInfo>;
    get firstName(): string;
    get lastName(): string;
    get fullName(): string;
    get bio(): string;
    get major(): string;
    get graduationYear(): number | null;
    get dorm(): string;
    isComplete(): boolean;
}
export {};
//# sourceMappingURL=personal-info.value.d.ts.map