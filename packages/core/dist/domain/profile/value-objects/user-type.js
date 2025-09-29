"use strict";
/**
 * UserType Value Object
 * Defines the different types of users in the system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.UserTypeEnum = void 0;
const value_objects_1 = require("../value-objects");
const feature_flags_1 = require("../../../infrastructure/feature-flags");
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["STUDENT"] = "student";
    UserTypeEnum["FACULTY"] = "faculty";
    UserTypeEnum["STAFF"] = "staff";
    UserTypeEnum["ALUMNI"] = "alumni";
    UserTypeEnum["ADMIN"] = "admin";
})(UserTypeEnum || (exports.UserTypeEnum = UserTypeEnum = {}));
class UserType {
    constructor(props) {
        this.props = props;
    }
    static createStudent() {
        return new UserType({
            type: UserTypeEnum.STUDENT,
            verified: false
        });
    }
    static createFaculty(verified = false) {
        if (!(0, feature_flags_1.isFeatureEnabled)('FACULTY_VERIFICATION')) {
            // If feature is disabled, create unverified faculty
            return new UserType({
                type: UserTypeEnum.FACULTY,
                verified: false
            });
        }
        return new UserType({
            type: UserTypeEnum.FACULTY,
            verified,
            verifiedAt: verified ? new Date() : undefined
        });
    }
    static createStaff() {
        return new UserType({
            type: UserTypeEnum.STAFF,
            verified: false
        });
    }
    static createAdmin() {
        return new UserType({
            type: UserTypeEnum.ADMIN,
            verified: true,
            verifiedAt: new Date()
        });
    }
    static create(type, verified = false) {
        if (!Object.values(UserTypeEnum).includes(type)) {
            return value_objects_1.Result.fail('Invalid user type');
        }
        return value_objects_1.Result.ok(new UserType({
            type: type,
            verified
        }));
    }
    get type() {
        return this.props.type;
    }
    get isStudent() {
        return this.props.type === UserTypeEnum.STUDENT;
    }
    get isFaculty() {
        return this.props.type === UserTypeEnum.FACULTY;
    }
    get isStaff() {
        return this.props.type === UserTypeEnum.STAFF;
    }
    get isAdmin() {
        return this.props.type === UserTypeEnum.ADMIN;
    }
    get isVerified() {
        return this.props.verified;
    }
    get verifiedAt() {
        return this.props.verifiedAt;
    }
    verify(verifiedBy) {
        if (!(0, feature_flags_1.isFeatureEnabled)('FACULTY_VERIFICATION') && this.isFaculty) {
            return this; // No-op if feature is disabled
        }
        return new UserType({
            ...this.props,
            verified: true,
            verifiedAt: new Date(),
            verifiedBy
        });
    }
    canModerateContent() {
        return this.isAdmin || (this.isFaculty && this.isVerified);
    }
    canCreateAcademicSpaces() {
        return this.isFaculty && this.isVerified;
    }
    canAccessAnalytics() {
        return this.isAdmin || (this.isFaculty && this.isVerified);
    }
    equals(other) {
        return this.props.type === other.props.type &&
            this.props.verified === other.props.verified;
    }
    toJSON() {
        return { ...this.props };
    }
}
exports.UserType = UserType;
//# sourceMappingURL=user-type.js.map