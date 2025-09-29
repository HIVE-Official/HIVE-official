/**
 * UserType Value Object
 * Defines the different types of users in the system
 */
import { Result } from '../value-objects';
export declare enum UserTypeEnum {
    STUDENT = "student",
    FACULTY = "faculty",
    STAFF = "staff",
    ALUMNI = "alumni",
    ADMIN = "admin"
}
export interface UserTypeProps {
    type: UserTypeEnum;
    verified: boolean;
    verifiedAt?: Date;
    verifiedBy?: string;
}
export declare class UserType {
    private readonly props;
    private constructor();
    static createStudent(): UserType;
    static createFaculty(verified?: boolean): UserType;
    static createStaff(): UserType;
    static createAdmin(): UserType;
    static create(type: string, verified?: boolean): Result<UserType>;
    get type(): UserTypeEnum;
    get isStudent(): boolean;
    get isFaculty(): boolean;
    get isStaff(): boolean;
    get isAdmin(): boolean;
    get isVerified(): boolean;
    get verifiedAt(): Date | undefined;
    verify(verifiedBy: string): UserType;
    canModerateContent(): boolean;
    canCreateAcademicSpaces(): boolean;
    canAccessAnalytics(): boolean;
    equals(other: UserType): boolean;
    toJSON(): UserTypeProps;
}
//# sourceMappingURL=user-type.d.ts.map