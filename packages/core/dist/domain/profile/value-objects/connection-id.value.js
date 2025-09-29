"use strict";
/**
 * ConnectionId Value Object
 * Represents a unique identifier for a connection between profiles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionId = void 0;
const Result_1 = require("../../shared/base/Result");
const ValueObject_base_1 = require("../../shared/base/ValueObject.base");
class ConnectionId extends ValueObject_base_1.ValueObject {
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
            return Result_1.Result.fail('ConnectionId cannot be empty');
        }
        return Result_1.Result.ok(new ConnectionId({ value: id }));
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
exports.ConnectionId = ConnectionId;
//# sourceMappingURL=connection-id.value.js.map