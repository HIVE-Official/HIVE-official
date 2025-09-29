/**
 * Creation Event Type Value Object
 * Domain value object for creation analytics event types
 */
import { CreationEventType } from '../types';
export declare class CreationEventTypeValue {
    private readonly _value;
    private constructor();
    static create(value: string): CreationEventTypeValue;
    get value(): CreationEventType;
    isBuilderEvent(): boolean;
    isToolLifecycleEvent(): boolean;
    equals(other: CreationEventTypeValue): boolean;
}
//# sourceMappingURL=creation-event-type.value.d.ts.map