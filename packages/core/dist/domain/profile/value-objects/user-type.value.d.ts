/**
 * UserType Value Object
 * Represents the type of user in the system
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export declare enum UserTypeEnum {
    STUDENT = "student",
    ALUMNI = "alumni",
    FACULTY = "faculty",
    STAFF = "staff",
    PROSPECTIVE = "prospective"
}
interface UserTypeProps {
    value: UserTypeEnum;
}
export declare class UserType extends ValueObject<UserTypeProps> {
    static readonly STUDENT = UserTypeEnum.STUDENT;
    static readonly ALUMNI = UserTypeEnum.ALUMNI;
    static readonly FACULTY = UserTypeEnum.FACULTY;
    static readonly STAFF = UserTypeEnum.STAFF;
    static readonly PROSPECTIVE = UserTypeEnum.PROSPECTIVE;
    get value(): UserTypeEnum;
    private constructor();
    static create(type: string): Result<UserType>;
    static createStudent(): Result<UserType>;
    isStudent(): boolean;
    isAlumni(): boolean;
    toString(): string;
}
export {};
//# sourceMappingURL=user-type.value.d.ts.map