"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
/**
 * Base Value Object class following DDD principles
 * Value Objects are immutable and defined by their properties
 */
class ValueObject {
    constructor(props) {
        this.props = Object.freeze(props);
    }
    equals(vo) {
        if (!vo || !(vo instanceof ValueObject)) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }
    getValue() {
        return this.props;
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=ValueObject.base.js.map