/**
 * ConnectionId Value Object
 * Represents a unique identifier for a connection between profiles
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class ConnectionId extends ValueObject {
    get value() {
        return this.props.value;
    }
    get id() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result.fail('ConnectionId cannot be empty');
        }
        return Result.ok(new ConnectionId({ value: id }));
    }
    static createFromProfiles(profileId1, profileId2) {
        // Sort profile IDs to ensure consistent connection ID regardless of order
        const sorted = [profileId1, profileId2].sort();
        const id = `connection_${sorted[0]}_${sorted[1]}`;
        return ConnectionId.create(id);
    }
    toString() {
        return this.props.value;
    }
}
//# sourceMappingURL=connection-id.value.js.map