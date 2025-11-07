"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboardResponseSchema = exports.AdminDashboardStatisticsSchema = exports.AdminSystemStatisticsSchema = exports.AdminBuilderRequestsStatisticsSchema = exports.AdminSpacesStatisticsSchema = exports.AdminSpacesByTypeSchema = exports.AdminUsersStatisticsSchema = void 0;
const zod_1 = require("zod");
const numericalRecordSchema = zod_1.z.record(zod_1.z.number().nonnegative());
exports.AdminUsersStatisticsSchema = zod_1.z.object({
    total: zod_1.z.number().nonnegative(),
    active: zod_1.z.number().nonnegative(),
    inactive: zod_1.z.number().nonnegative(),
    byMajor: numericalRecordSchema,
    byYear: numericalRecordSchema,
    growth: zod_1.z.object({
        lastWeek: zod_1.z.number(),
        lastMonth: zod_1.z.number(),
    }),
});
exports.AdminSpacesByTypeSchema = zod_1.z.record(zod_1.z.object({
    total: zod_1.z.number().nonnegative(),
    active: zod_1.z.number().nonnegative(),
    dormant: zod_1.z.number().nonnegative(),
    members: zod_1.z.number().nonnegative(),
}));
exports.AdminSpacesStatisticsSchema = zod_1.z.object({
    total: zod_1.z.number().nonnegative(),
    active: zod_1.z.number().nonnegative(),
    dormant: zod_1.z.number().nonnegative(),
    byType: exports.AdminSpacesByTypeSchema,
    hasBuilders: zod_1.z.number().nonnegative(),
    totalMembers: zod_1.z.number().nonnegative(),
    averageMembers: zod_1.z.number().nonnegative(),
    activationRate: zod_1.z.number().min(0).max(100),
});
exports.AdminBuilderRequestsStatisticsSchema = zod_1.z.object({
    total: zod_1.z.number().nonnegative(),
    pending: zod_1.z.number().nonnegative(),
    approved: zod_1.z.number().nonnegative(),
    rejected: zod_1.z.number().nonnegative(),
    urgent: zod_1.z.number().nonnegative(),
    approvalRate: zod_1.z.number().min(0).max(100),
    averageResponseTime: zod_1.z.number().nonnegative(),
});
exports.AdminSystemStatisticsSchema = zod_1.z.object({
    status: zod_1.z.string(),
    uptime: zod_1.z.number().nonnegative(),
    memory: zod_1.z
        .object({
        heapUsed: zod_1.z.number().nonnegative(),
        heapTotal: zod_1.z.number().nonnegative(),
    })
        .nullable(),
    collections: zod_1.z.object({
        users: zod_1.z.number().nonnegative(),
        spaces: zod_1.z.number().nonnegative(),
        builderRequests: zod_1.z.number().nonnegative(),
    }),
    lastUpdated: zod_1.z.string(),
});
exports.AdminDashboardStatisticsSchema = zod_1.z.object({
    users: exports.AdminUsersStatisticsSchema,
    spaces: exports.AdminSpacesStatisticsSchema,
    builderRequests: exports.AdminBuilderRequestsStatisticsSchema,
    system: exports.AdminSystemStatisticsSchema,
});
exports.AdminDashboardResponseSchema = zod_1.z.object({
    success: zod_1.z.literal(true),
    timestamp: zod_1.z.string(),
    adminUser: zod_1.z.string(),
    platform: zod_1.z.object({
        name: zod_1.z.string(),
        version: zod_1.z.string(),
        environment: zod_1.z.string(),
        university: zod_1.z.string(),
        campusId: zod_1.z.string(),
    }),
    statistics: exports.AdminDashboardStatisticsSchema,
});
//# sourceMappingURL=dashboard.js.map