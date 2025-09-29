/**
 * Base Entity class following DDD principles
 * Entities have identity that persists over time
 */
export class Entity {
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
//# sourceMappingURL=Entity.base.js.map