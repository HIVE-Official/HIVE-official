"use strict";
/**
 * CampusId Value Object
 * Enforces campus isolation at the domain level
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampusId = void 0;
const value_objects_1 = require("../value-objects");
const feature_flags_1 = require("../../../infrastructure/feature-flags");
class CampusId {
    constructor(value) {
        this.value = value;
    }
    static create(campusId) {
        if (!(0, feature_flags_1.isFeatureEnabled)('PROFILE_CAMPUS_ISOLATION')) {
            // Fallback to hardcoded value if feature is disabled
            return value_objects_1.Result.ok(new CampusId('ub-buffalo'));
        }
        if (!campusId || campusId.trim().length === 0) {
            return value_objects_1.Result.fail('Campus ID cannot be empty');
        }
        // Validate campus ID format (lowercase, hyphenated)
        const campusRegex = /^[a-z]+(-[a-z]+)*$/;
        if (!campusRegex.test(campusId)) {
            return value_objects_1.Result.fail('Invalid campus ID format');
        }
        // List of valid campuses (would come from configuration)
        const validCampuses = [
            'ub-buffalo',
            'suny-albany',
            'suny-binghamton',
            'suny-stonybrook'
        ];
        if (!validCampuses.includes(campusId)) {
            return value_objects_1.Result.fail('Campus not supported');
        }
        return value_objects_1.Result.ok(new CampusId(campusId));
    }
    static createUB() {
        // Helper for UB-specific creation
        return new CampusId('ub-buffalo');
    }
    get id() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    isUB() {
        return this.value === 'ub-buffalo';
    }
    toString() {
        return this.value;
    }
}
exports.CampusId = CampusId;
//# sourceMappingURL=campus-id.js.map