/**
 * Creation Event Type Value Object
 * Domain value object for creation analytics event types
 */
export class CreationEventTypeValue {
    constructor(_value) {
        this._value = _value;
    }
    static create(value) {
        const validTypes = [
            'builder_session_start',
            'builder_session_end',
            'tool_created',
            'tool_updated',
            'tool_published',
            'element_added',
            'element_configured',
            'element_removed',
            'canvas_mode_changed',
            'device_mode_changed',
            'element_library_searched',
            'tool_instance_opened',
            'tool_instance_submitted',
        ];
        if (!validTypes.includes(value)) {
            throw new Error(`Invalid creation event type: ${value}`);
        }
        return new CreationEventTypeValue(value);
    }
    get value() {
        return this._value;
    }
    isBuilderEvent() {
        return this._value.includes('builder_') || this._value.includes('element_') || this._value.includes('canvas_');
    }
    isToolLifecycleEvent() {
        return this._value.includes('tool_');
    }
    equals(other) {
        return this._value === other._value;
    }
}
//# sourceMappingURL=creation-event-type.value.js.map