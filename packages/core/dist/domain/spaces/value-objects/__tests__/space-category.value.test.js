"use strict";
/**
 * SpaceCategory Value Object Tests
 * Tests for space category/type classification
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_category_value_1 = require("../space-category.value");
(0, vitest_1.describe)('SpaceCategory', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create valid category for general', () => {
            const result = space_category_value_1.SpaceCategory.create('general');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.GENERAL);
        });
        (0, vitest_1.it)('should create valid category for study-group', () => {
            const result = space_category_value_1.SpaceCategory.create('study-group');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.STUDY_GROUP);
        });
        (0, vitest_1.it)('should create valid category for social', () => {
            const result = space_category_value_1.SpaceCategory.create('social');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.SOCIAL);
        });
        (0, vitest_1.it)('should create valid category for event', () => {
            const result = space_category_value_1.SpaceCategory.create('event');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.EVENT);
        });
        (0, vitest_1.it)('should create valid category for resource', () => {
            const result = space_category_value_1.SpaceCategory.create('resource');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.RESOURCE);
        });
        (0, vitest_1.it)('should create valid category for dorm', () => {
            const result = space_category_value_1.SpaceCategory.create('dorm');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.DORM);
        });
        (0, vitest_1.it)('should create valid category for club', () => {
            const result = space_category_value_1.SpaceCategory.create('club');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.CLUB);
        });
        (0, vitest_1.it)('should create valid category for sports', () => {
            const result = space_category_value_1.SpaceCategory.create('sports');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.SPORTS);
        });
        (0, vitest_1.it)('should create valid category for academic', () => {
            const result = space_category_value_1.SpaceCategory.create('academic');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.ACADEMIC);
        });
        (0, vitest_1.it)('should fail for invalid category', () => {
            const result = space_category_value_1.SpaceCategory.create('invalid');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Invalid space category');
        });
        (0, vitest_1.it)('should fail for empty string', () => {
            const result = space_category_value_1.SpaceCategory.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail for uppercase category', () => {
            const result = space_category_value_1.SpaceCategory.create('GENERAL');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail for mixed case category', () => {
            const result = space_category_value_1.SpaceCategory.create('Study-Group');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('createGeneral()', () => {
        (0, vitest_1.it)('should create general category directly', () => {
            const result = space_category_value_1.SpaceCategory.createGeneral();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.GENERAL);
        });
    });
    (0, vitest_1.describe)('createStudyGroup()', () => {
        (0, vitest_1.it)('should create study-group category directly', () => {
            const result = space_category_value_1.SpaceCategory.createStudyGroup();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(space_category_value_1.SpaceCategoryEnum.STUDY_GROUP);
        });
    });
    (0, vitest_1.describe)('isAcademic()', () => {
        (0, vitest_1.it)('should return true for study-group', () => {
            const category = space_category_value_1.SpaceCategory.create('study-group').getValue();
            (0, vitest_1.expect)(category.isAcademic()).toBe(true);
        });
        (0, vitest_1.it)('should return true for academic', () => {
            const category = space_category_value_1.SpaceCategory.create('academic').getValue();
            (0, vitest_1.expect)(category.isAcademic()).toBe(true);
        });
        (0, vitest_1.it)('should return true for resource', () => {
            const category = space_category_value_1.SpaceCategory.create('resource').getValue();
            (0, vitest_1.expect)(category.isAcademic()).toBe(true);
        });
        (0, vitest_1.it)('should return false for social categories', () => {
            const categories = ['social', 'dorm', 'club', 'sports'];
            categories.forEach(cat => {
                const category = space_category_value_1.SpaceCategory.create(cat).getValue();
                (0, vitest_1.expect)(category.isAcademic()).toBe(false);
            });
        });
        (0, vitest_1.it)('should return false for general', () => {
            const category = space_category_value_1.SpaceCategory.create('general').getValue();
            (0, vitest_1.expect)(category.isAcademic()).toBe(false);
        });
        (0, vitest_1.it)('should return false for event', () => {
            const category = space_category_value_1.SpaceCategory.create('event').getValue();
            (0, vitest_1.expect)(category.isAcademic()).toBe(false);
        });
    });
    (0, vitest_1.describe)('isSocial()', () => {
        (0, vitest_1.it)('should return true for social', () => {
            const category = space_category_value_1.SpaceCategory.create('social').getValue();
            (0, vitest_1.expect)(category.isSocial()).toBe(true);
        });
        (0, vitest_1.it)('should return true for dorm', () => {
            const category = space_category_value_1.SpaceCategory.create('dorm').getValue();
            (0, vitest_1.expect)(category.isSocial()).toBe(true);
        });
        (0, vitest_1.it)('should return true for club', () => {
            const category = space_category_value_1.SpaceCategory.create('club').getValue();
            (0, vitest_1.expect)(category.isSocial()).toBe(true);
        });
        (0, vitest_1.it)('should return true for sports', () => {
            const category = space_category_value_1.SpaceCategory.create('sports').getValue();
            (0, vitest_1.expect)(category.isSocial()).toBe(true);
        });
        (0, vitest_1.it)('should return false for academic categories', () => {
            const categories = ['study-group', 'academic', 'resource'];
            categories.forEach(cat => {
                const category = space_category_value_1.SpaceCategory.create(cat).getValue();
                (0, vitest_1.expect)(category.isSocial()).toBe(false);
            });
        });
        (0, vitest_1.it)('should return false for general', () => {
            const category = space_category_value_1.SpaceCategory.create('general').getValue();
            (0, vitest_1.expect)(category.isSocial()).toBe(false);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when categories are the same', () => {
            const cat1 = space_category_value_1.SpaceCategory.create('study-group').getValue();
            const cat2 = space_category_value_1.SpaceCategory.create('study-group').getValue();
            (0, vitest_1.expect)(cat1.equals(cat2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when categories differ', () => {
            const cat1 = space_category_value_1.SpaceCategory.create('study-group').getValue();
            const cat2 = space_category_value_1.SpaceCategory.create('social').getValue();
            (0, vitest_1.expect)(cat1.equals(cat2)).toBe(false);
        });
        (0, vitest_1.it)('should be equal when created via different methods', () => {
            const cat1 = space_category_value_1.SpaceCategory.create('general').getValue();
            const cat2 = space_category_value_1.SpaceCategory.createGeneral().getValue();
            (0, vitest_1.expect)(cat1.equals(cat2)).toBe(true);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the category value as string', () => {
            const category = space_category_value_1.SpaceCategory.create('study-group').getValue();
            (0, vitest_1.expect)(category.toString()).toBe('study-group');
        });
        (0, vitest_1.it)('should return lowercase string for all categories', () => {
            const categories = Object.values(space_category_value_1.SpaceCategoryEnum);
            categories.forEach(cat => {
                const category = space_category_value_1.SpaceCategory.create(cat).getValue();
                (0, vitest_1.expect)(category.toString()).toBe(cat);
            });
        });
    });
    (0, vitest_1.describe)('real-world examples', () => {
        (0, vitest_1.it)('should categorize CSE 116 study group as academic', () => {
            const category = space_category_value_1.SpaceCategory.createStudyGroup().getValue();
            (0, vitest_1.expect)(category.isAcademic()).toBe(true);
            (0, vitest_1.expect)(category.isSocial()).toBe(false);
        });
        (0, vitest_1.it)('should categorize UB ACM as club (social)', () => {
            const category = space_category_value_1.SpaceCategory.create('club').getValue();
            (0, vitest_1.expect)(category.isSocial()).toBe(true);
            (0, vitest_1.expect)(category.isAcademic()).toBe(false);
        });
        (0, vitest_1.it)('should categorize Ellicott Complex as dorm (social)', () => {
            const category = space_category_value_1.SpaceCategory.create('dorm').getValue();
            (0, vitest_1.expect)(category.isSocial()).toBe(true);
        });
        (0, vitest_1.it)('should categorize basketball pickup as sports (social)', () => {
            const category = space_category_value_1.SpaceCategory.create('sports').getValue();
            (0, vitest_1.expect)(category.isSocial()).toBe(true);
        });
        (0, vitest_1.it)('should categorize textbook exchange as resource (academic)', () => {
            const category = space_category_value_1.SpaceCategory.create('resource').getValue();
            (0, vitest_1.expect)(category.isAcademic()).toBe(true);
        });
        (0, vitest_1.it)('should categorize career fair as event', () => {
            const category = space_category_value_1.SpaceCategory.create('event').getValue();
            (0, vitest_1.expect)(category.isAcademic()).toBe(false);
            (0, vitest_1.expect)(category.isSocial()).toBe(false);
        });
    });
    (0, vitest_1.describe)('all categories', () => {
        (0, vitest_1.it)('should accept all valid SpaceCategoryEnum values', () => {
            const categories = Object.values(space_category_value_1.SpaceCategoryEnum);
            categories.forEach(cat => {
                const result = space_category_value_1.SpaceCategory.create(cat);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
        (0, vitest_1.it)('should have 9 total categories', () => {
            const categories = Object.values(space_category_value_1.SpaceCategoryEnum);
            (0, vitest_1.expect)(categories.length).toBe(9);
        });
    });
});
//# sourceMappingURL=space-category.value.test.js.map