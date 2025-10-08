import { ValueObject } from '../../shared/base/ValueObject.base';
import { Result } from '../../shared/base/Result';
export class UBEmail extends ValueObject {
    constructor(props) {
        super(props);
    }
    static create(email) {
        if (!email) {
            return Result.fail('Email is required');
        }
        const trimmedEmail = email.trim().toLowerCase();
        if (!this.isValidEmail(trimmedEmail)) {
            return Result.fail('Invalid email format');
        }
        if (!this.isUBEmail(trimmedEmail)) {
            return Result.fail('Only @buffalo.edu emails are allowed');
        }
        return Result.ok(new UBEmail({ value: trimmedEmail }));
    }
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isUBEmail(email) {
        return email.endsWith('@buffalo.edu');
    }
    get value() {
        return this.props.value;
    }
    get email() {
        return this.props.value;
    }
    get username() {
        return this.props.value.split('@')[0];
    }
    toString() {
        return this.props.value;
    }
}
//# sourceMappingURL=ub-email.value.js.map