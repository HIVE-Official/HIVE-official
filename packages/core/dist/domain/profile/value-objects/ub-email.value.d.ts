import { ValueObject } from '../../shared/base/ValueObject.base';
import { Result } from '../../shared/base/Result';
interface UBEmailProps {
    value: string;
}
export declare class UBEmail extends ValueObject<UBEmailProps> {
    private constructor();
    static create(email: string): Result<UBEmail>;
    private static isValidEmail;
    private static isUBEmail;
    get value(): string;
    toString(): string;
}
export {};
//# sourceMappingURL=ub-email.value.d.ts.map