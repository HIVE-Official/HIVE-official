/**
 * UserType Value Object
 * Represents the type of user in the system
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["STUDENT"] = "student";
    UserTypeEnum["ALUMNI"] = "alumni";
    UserTypeEnum["FACULTY"] = "faculty";
    UserTypeEnum["STAFF"] = "staff";
    UserTypeEnum["PROSPECTIVE"] = "prospective";
})(UserTypeEnum || (UserTypeEnum = {}));
export class UserType extends ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(type) {
        if (!Object.values(UserTypeEnum).includes(type)) {
            return Result.fail(`Invalid user type: ${type}`);
        }
        return Result.ok(new UserType({ value: type }));
    }
    static createStudent() {
        return Result.ok(new UserType({ value: UserTypeEnum.STUDENT }));
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
UserType.STUDENT = UserTypeEnum.STUDENT;
UserType.ALUMNI = UserTypeEnum.ALUMNI;
UserType.FACULTY = UserTypeEnum.FACULTY;
UserType.STAFF = UserTypeEnum.STAFF;
UserType.PROSPECTIVE = UserTypeEnum.PROSPECTIVE;
//# sourceMappingURL=user-type.value.js.map