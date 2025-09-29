/**
 * ConnectionId Value Object
 * Represents a unique identifier for a connection between profiles
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

interface ConnectionIdProps {
  value: string;
}

export class ConnectionId extends ValueObject<ConnectionIdProps> {
  get value(): string {
    return this.props.value;
  }

  get id(): string {
    return this.props.value;
  }

  private constructor(props: ConnectionIdProps) {
    super(props);
  }

  public static create(id: string): Result<ConnectionId> {
    if (!id || id.trim().length === 0) {
      return Result.fail<ConnectionId>('ConnectionId cannot be empty');
    }

    return Result.ok<ConnectionId>(new ConnectionId({ value: id }));
  }

  public static createFromProfiles(profileId1: string, profileId2: string): Result<ConnectionId> {
    // Sort profile IDs to ensure consistent connection ID regardless of order
    const sorted = [profileId1, profileId2].sort();
    const id = `connection_${sorted[0]}_${sorted[1]}`;
    return ConnectionId.create(id);
  }

  public toString(): string {
    return this.props.value;
  }
}