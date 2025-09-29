"use strict";
/**
 * Space Category Value Object
 * Extended categories based on SPEC.md requirements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceCategory = exports.SpaceCategoryEnum = void 0;
const value_objects_1 = require("../value-objects");
var SpaceCategoryEnum;
(function (SpaceCategoryEnum) {
    // Academic
    SpaceCategoryEnum["STUDY_GROUP"] = "study_group";
    SpaceCategoryEnum["ACADEMIC_DEPARTMENT"] = "academic_department";
    SpaceCategoryEnum["CLASS"] = "class";
    SpaceCategoryEnum["RESEARCH"] = "research";
    // Social
    SpaceCategoryEnum["DORM"] = "dorm";
    SpaceCategoryEnum["SOCIAL_CLUB"] = "social_club";
    SpaceCategoryEnum["INTEREST_GROUP"] = "interest_group";
    // Greek Life
    SpaceCategoryEnum["FRATERNITY"] = "fraternity";
    SpaceCategoryEnum["SORORITY"] = "sorority";
    SpaceCategoryEnum["GREEK_COUNCIL"] = "greek_council";
    // Athletics
    SpaceCategoryEnum["SPORTS_TEAM"] = "sports_team";
    SpaceCategoryEnum["INTRAMURAL"] = "intramural";
    SpaceCategoryEnum["FITNESS"] = "fitness";
    // Organizations
    SpaceCategoryEnum["STUDENT_GOV"] = "student_gov";
    SpaceCategoryEnum["STUDENT_ORG"] = "student_org";
    SpaceCategoryEnum["PROFESSIONAL"] = "professional";
    // Special
    SpaceCategoryEnum["EVENT"] = "event";
    SpaceCategoryEnum["CAMPAIGN"] = "campaign";
    SpaceCategoryEnum["GENERAL"] = "general";
})(SpaceCategoryEnum || (exports.SpaceCategoryEnum = SpaceCategoryEnum = {}));
class SpaceCategory {
    constructor(category, config) {
        this.category = category;
        this.config = config;
    }
    static create(category) {
        if (!Object.values(SpaceCategoryEnum).includes(category)) {
            return value_objects_1.Result.fail('Invalid space category');
        }
        const categoryEnum = category;
        const config = this.configs[categoryEnum];
        return value_objects_1.Result.ok(new SpaceCategory(categoryEnum, config));
    }
    static createStudyGroup() {
        return new SpaceCategory(SpaceCategoryEnum.STUDY_GROUP, this.configs[SpaceCategoryEnum.STUDY_GROUP]);
    }
    static createDorm() {
        return new SpaceCategory(SpaceCategoryEnum.DORM, this.configs[SpaceCategoryEnum.DORM]);
    }
    get value() {
        return this.category;
    }
    get defaultWidgets() {
        return [...this.config.defaultWidgets];
    }
    get requiresVerification() {
        return this.config.requiresVerification;
    }
    get autoPromoteThreshold() {
        return this.config.autoPromoteThreshold;
    }
    get maxMembers() {
        return this.config.maxMembers;
    }
    get allowsRSS() {
        return this.config.allowRSS;
    }
    isAcademic() {
        return [
            SpaceCategoryEnum.STUDY_GROUP,
            SpaceCategoryEnum.ACADEMIC_DEPARTMENT,
            SpaceCategoryEnum.CLASS,
            SpaceCategoryEnum.RESEARCH
        ].includes(this.category);
    }
    isSocial() {
        return [
            SpaceCategoryEnum.DORM,
            SpaceCategoryEnum.SOCIAL_CLUB,
            SpaceCategoryEnum.INTEREST_GROUP
        ].includes(this.category);
    }
    isGreek() {
        return [
            SpaceCategoryEnum.FRATERNITY,
            SpaceCategoryEnum.SORORITY,
            SpaceCategoryEnum.GREEK_COUNCIL
        ].includes(this.category);
    }
    canBePublicDuringRush() {
        return this.isGreek();
    }
    equals(other) {
        return this.category === other.category;
    }
}
exports.SpaceCategory = SpaceCategory;
SpaceCategory.configs = {
    [SpaceCategoryEnum.STUDY_GROUP]: {
        defaultWidgets: ['members', 'resources', 'events', 'tools'],
        requiresVerification: false,
        autoPromoteThreshold: 30,
        maxMembers: 50,
        allowRSS: false
    },
    [SpaceCategoryEnum.ACADEMIC_DEPARTMENT]: {
        defaultWidgets: ['members', 'resources', 'events', 'announcements'],
        requiresVerification: true, // Faculty must verify
        autoPromoteThreshold: 20,
        allowRSS: true
    },
    [SpaceCategoryEnum.CLASS]: {
        defaultWidgets: ['members', 'resources', 'deadlines', 'tools'],
        requiresVerification: true,
        autoPromoteThreshold: 15,
        allowRSS: false
    },
    [SpaceCategoryEnum.DORM]: {
        defaultWidgets: ['members', 'events', 'marketplace', 'tools'],
        requiresVerification: false,
        autoPromoteThreshold: 40,
        maxMembers: 500,
        allowRSS: false
    },
    [SpaceCategoryEnum.FRATERNITY]: {
        defaultWidgets: ['members', 'events', 'rush', 'tools'],
        requiresVerification: true,
        autoPromoteThreshold: 50,
        allowRSS: false
    },
    [SpaceCategoryEnum.SORORITY]: {
        defaultWidgets: ['members', 'events', 'rush', 'tools'],
        requiresVerification: true,
        autoPromoteThreshold: 50,
        allowRSS: false
    },
    [SpaceCategoryEnum.SPORTS_TEAM]: {
        defaultWidgets: ['roster', 'schedule', 'stats', 'tools'],
        requiresVerification: true,
        autoPromoteThreshold: 100,
        allowRSS: true
    },
    [SpaceCategoryEnum.STUDENT_GOV]: {
        defaultWidgets: ['members', 'meetings', 'proposals', 'tools'],
        requiresVerification: true,
        autoPromoteThreshold: 30,
        allowRSS: true
    },
    // ... other configs
    [SpaceCategoryEnum.GENERAL]: {
        defaultWidgets: ['members', 'events', 'resources', 'tools'],
        requiresVerification: false,
        autoPromoteThreshold: 50,
        allowRSS: false
    }
};
//# sourceMappingURL=space-category.js.map