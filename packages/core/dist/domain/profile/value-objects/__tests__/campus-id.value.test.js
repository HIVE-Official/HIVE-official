"use strict";
/**
 * CampusId Value Object Tests
 * Tests for campus identifier validation (multi-tenant isolation)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const campus_id_value_1 = require("../campus-id.value");
(0, vitest_1.describe)('CampusId', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create valid CampusId for ub-buffalo', () => {
            const result = campus_id_value_1.CampusId.create('ub-buffalo');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const campusId = result.getValue();
            (0, vitest_1.expect)(campusId.value).toBe('ub-buffalo');
            (0, vitest_1.expect)(campusId.id).toBe('ub-buffalo');
        });
        (0, vitest_1.it)('should fail when campus id is not ub-buffalo (v1 restriction)', () => {
            const result = campus_id_value_1.CampusId.create('harvard');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('ub-buffalo');
        });
        (0, vitest_1.it)('should fail when campus id is empty', () => {
            const result = campus_id_value_1.CampusId.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail when campus id is whitespace only', () => {
            const result = campus_id_value_1.CampusId.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail for case variations of ub-buffalo', () => {
            const variations = ['UB-Buffalo', 'UB-BUFFALO', 'ub-Buffalo', 'Ub-buffalo'];
            variations.forEach(variation => {
                const result = campus_id_value_1.CampusId.create(variation);
                (0, vitest_1.expect)(result.isFailure).toBe(true);
            });
        });
        (0, vitest_1.it)('should not trim whitespace before validation', () => {
            const result = campus_id_value_1.CampusId.create('  ub-buffalo  ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when both are ub-buffalo', () => {
            const id1 = campus_id_value_1.CampusId.create('ub-buffalo').getValue();
            const id2 = campus_id_value_1.CampusId.create('ub-buffalo').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the campus id value as string', () => {
            const campusId = campus_id_value_1.CampusId.create('ub-buffalo').getValue();
            (0, vitest_1.expect)(campusId.toString()).toBe('ub-buffalo');
        });
    });
    (0, vitest_1.describe)('campus isolation', () => {
        (0, vitest_1.it)('should enforce single campus in v1', () => {
            // v1 only supports ub-buffalo for campus isolation
            const result = campus_id_value_1.CampusId.create('ub-buffalo');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should reject other universities', () => {
            const otherUniversities = [
                'mit',
                'stanford',
                'cornell',
                'suny-binghamton',
                'columbia'
            ];
            otherUniversities.forEach(uni => {
                const result = campus_id_value_1.CampusId.create(uni);
                (0, vitest_1.expect)(result.isFailure).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=campus-id.value.test.js.map