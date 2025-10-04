import { ValueObject } from '../../shared/base/ValueObject.base';
import { Result } from '../../shared/base/Result';
export class PersonalInfo extends ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const { firstName, lastName, bio, major, graduationYear, dorm } = props;
        if (bio && bio.length > this.MAX_BIO_LENGTH) {
            return Result.fail(`Bio must be at most ${this.MAX_BIO_LENGTH} characters`);
        }
        if (graduationYear !== null) {
            if (graduationYear < this.MIN_GRAD_YEAR || graduationYear > this.MAX_GRAD_YEAR) {
                return Result.fail('Invalid graduation year');
            }
        }
        return Result.ok(new PersonalInfo({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            bio: bio.trim(),
            major: major.trim(),
            graduationYear,
            dorm: dorm.trim()
        }));
    }
    get firstName() {
        return this.props.firstName;
    }
    get lastName() {
        return this.props.lastName;
    }
    get fullName() {
        return `${this.props.firstName} ${this.props.lastName}`.trim();
    }
    get bio() {
        return this.props.bio;
    }
    get major() {
        return this.props.major;
    }
    get graduationYear() {
        return this.props.graduationYear;
    }
    get dorm() {
        return this.props.dorm;
    }
    isComplete() {
        return !!(this.props.firstName &&
            this.props.lastName &&
            this.props.major &&
            this.props.graduationYear);
    }
}
PersonalInfo.MAX_BIO_LENGTH = 500;
PersonalInfo.MIN_GRAD_YEAR = new Date().getFullYear();
PersonalInfo.MAX_GRAD_YEAR = new Date().getFullYear() + 6;
//# sourceMappingURL=personal-info.value.js.map