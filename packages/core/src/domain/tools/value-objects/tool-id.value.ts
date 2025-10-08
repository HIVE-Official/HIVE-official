/**
 * ToolId Value Object
 * Unique identifier for tools
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface ToolIdProps {
  value: string;
}

export class ToolId extends ValueObject<ToolIdProps> {
  get value(): string {
    return this.props.value;
  }

  get id(): string {
    return this.props.value;
  }

  private constructor(props: ToolIdProps) {
    super(props);
  }

  public static create(id?: string): Result<ToolId> {
    // If id is explicitly provided, validate it
    if (id !== undefined) {
      const trimmed = id.trim();
      if (trimmed.length === 0) {
        return Result.fail<ToolId>('ToolId cannot be empty');
      }
      return Result.ok<ToolId>(new ToolId({ value: trimmed }));
    }

    // Auto-generate if not provided
    const toolId = `tool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return Result.ok<ToolId>(new ToolId({ value: toolId }));
  }

  public toString(): string {
    return this.props.value;
  }
}
