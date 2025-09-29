"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
/**
 * Base Entity class following DDD principles
 * Entities have identity that persists over time
 */
class Entity {
    constructor(props, id) {
        this._id = id;
        this.props = props;
    }
    get id() {
        return this._id;
    }
    equals(entity) {
        if (!entity) {
            return false;
        }
        if (!(entity instanceof Entity)) {
            return false;
        }
        return this._id === entity._id;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.base.js.map