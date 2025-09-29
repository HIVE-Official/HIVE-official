/**
 * Creation Event Type Value Object
 * Domain value object for creation analytics event types
 */

import { CreationEventType } from '../types';

export class CreationEventTypeValue {
  private constructor(private readonly _value: CreationEventType) {}

  public static create(value: string): CreationEventTypeValue {
    const validTypes: CreationEventType[] = [
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

    if (!validTypes.includes(value as CreationEventType)) {
      throw new Error(`Invalid creation event type: ${value}`);
    }

    return new CreationEventTypeValue(value as CreationEventType);
  }

  public get value(): CreationEventType {
    return this._value;
  }

  public isBuilderEvent(): boolean {
    return this._value.includes('builder_') || this._value.includes('element_') || this._value.includes('canvas_');
  }

  public isToolLifecycleEvent(): boolean {
    return this._value.includes('tool_');
  }

  public equals(other: CreationEventTypeValue): boolean {
    return this._value === other._value;
  }
}