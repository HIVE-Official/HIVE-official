import { ValueObject } from '../../shared/base/ValueObject.base';
import { Result } from '../../shared/base/Result';
interface HandleProps {
    value: string;
}
export declare class Handle extends ValueObject<HandleProps> {
    private static readonly MIN_LENGTH;
    private static readonly MAX_LENGTH;
    private static readonly VALID_PATTERN;
    private constructor();
    static create(handle: string): Result<Handle>;
    get value(): string;
    toString(): string;
}
export {};
//# sourceMappingURL=handle.value.d.ts.map