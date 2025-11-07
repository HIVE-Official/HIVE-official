import { z } from "zod";

const numericalRecordSchema = z.record(z.number().nonnegative());

export const AdminUsersStatisticsSchema = z.object({
  total: z.number().nonnegative(),
  active: z.number().nonnegative(),
  inactive: z.number().nonnegative(),
  byMajor: numericalRecordSchema,
  byYear: numericalRecordSchema,
  growth: z.object({
    lastWeek: z.number(),
    lastMonth: z.number(),
  }),
});

export const AdminSpacesByTypeSchema = z.record(
  z.object({
    total: z.number().nonnegative(),
    active: z.number().nonnegative(),
    dormant: z.number().nonnegative(),
    members: z.number().nonnegative(),
  })
);

export const AdminSpacesStatisticsSchema = z.object({
  total: z.number().nonnegative(),
  active: z.number().nonnegative(),
  dormant: z.number().nonnegative(),
  byType: AdminSpacesByTypeSchema,
  hasBuilders: z.number().nonnegative(),
  totalMembers: z.number().nonnegative(),
  averageMembers: z.number().nonnegative(),
  activationRate: z.number().min(0).max(100),
});

export const AdminBuilderRequestsStatisticsSchema = z.object({
  total: z.number().nonnegative(),
  pending: z.number().nonnegative(),
  approved: z.number().nonnegative(),
  rejected: z.number().nonnegative(),
  urgent: z.number().nonnegative(),
  approvalRate: z.number().min(0).max(100),
  averageResponseTime: z.number().nonnegative(),
});

export const AdminSystemStatisticsSchema = z.object({
  status: z.string(),
  uptime: z.number().nonnegative(),
  memory: z
    .object({
      heapUsed: z.number().nonnegative(),
      heapTotal: z.number().nonnegative(),
    })
    .nullable(),
  collections: z.object({
    users: z.number().nonnegative(),
    spaces: z.number().nonnegative(),
    builderRequests: z.number().nonnegative(),
  }),
  lastUpdated: z.string(),
});

export const AdminDashboardStatisticsSchema = z.object({
  users: AdminUsersStatisticsSchema,
  spaces: AdminSpacesStatisticsSchema,
  builderRequests: AdminBuilderRequestsStatisticsSchema,
  system: AdminSystemStatisticsSchema,
});

export const AdminDashboardResponseSchema = z.object({
  success: z.literal(true),
  timestamp: z.string(),
  adminUser: z.string(),
  platform: z.object({
    name: z.string(),
    version: z.string(),
    environment: z.string(),
    university: z.string(),
    campusId: z.string(),
  }),
  statistics: AdminDashboardStatisticsSchema,
});

export type AdminDashboardResponse = z.infer<typeof AdminDashboardResponseSchema>;
export type AdminDashboardStatistics = z.infer<typeof AdminDashboardStatisticsSchema>;
export type AdminUsersStatistics = z.infer<typeof AdminUsersStatisticsSchema>;
export type AdminSpacesStatistics = z.infer<typeof AdminSpacesStatisticsSchema>;
export type AdminBuilderRequestsStatistics = z.infer<typeof AdminBuilderRequestsStatisticsSchema>;
export type AdminSystemStatistics = z.infer<typeof AdminSystemStatisticsSchema>;
