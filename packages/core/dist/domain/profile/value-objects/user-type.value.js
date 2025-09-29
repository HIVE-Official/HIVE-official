"use strict";
/**
 * UserType Value Object
 * Represents the type of user in the system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.UserTypeEnum = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["STUDENT"] = "student";
    UserTypeEnum["ALUMNI"] = "alumni";
    UserTypeEnum["FACULTY"] = "faculty";
    UserTypeEnum["STAFF"] = "staff";
    UserTypeEnum["PROSPECTIVE"] = "prospective";
})(UserTypeEnum || (exports.UserTypeEnum = UserTypeEnum = {}));
class UserType extends ValueObject_base_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(type) {
        if (!Object.values(UserTypeEnum).includes(type)) {
            return Result_1.Result.fail(`Invalid user type: ${type}`);
        }
        return Result_1.Result.ok(new UserType({ value: type }));
    }
    static createStudent() {
        return Result_1.Result.ok(new UserType({ value: UserTypeEnum.STUDENT }));
    }
    isStudent() {
        return this.props.value === UserTypeEnum.STUDENT;
    }
    isAlumni() {
        return this.props.value === UserTypeEnum.ALUMNI;
    }
    toString() {
        return this.props.value;
    }
}
exports.UserType = UserType;
UserType.STUDENT = UserTypeEnum.STUDENT;
UserType.ALUMNI = UserTypeEnum.ALUMNI;
UserType.FACULTY = UserTypeEnum.FACULTY;
UserType.STAFF = UserTypeEnum.STAFF;
UserType.PROSPECTIVE = UserTypeEnum.PROSPECTIVE;
//# sourceMappingURL=user-type.value.js.map