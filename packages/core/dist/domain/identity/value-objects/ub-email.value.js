"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UBEmail = void 0;
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
const Result_1 = require("../../shared/base/Result");
class UBEmail extends ValueObject_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(email) {
        if (!email) {
            return Result_1.Result.fail('Email is required');
        }
        const trimmedEmail = email.trim().toLowerCase();
        if (!this.isValidEmail(trimmedEmail)) {
            return Result_1.Result.fail('Invalid email format');
        }
        if (!this.isUBEmail(trimmedEmail)) {
            return Result_1.Result.fail('Only @buffalo.edu emails are allowed');
        }
        return Result_1.Result.ok(new UBEmail({ value: trimmedEmail }));
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
    toString() {
        return this.props.value;
    }
}
exports.UBEmail = UBEmail;
//# sourceMappingURL=ub-email.value.js.map