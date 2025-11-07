import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  AdminDashboardResponseSchema,
  type AdminBuilderRequestsStatistics,
  type AdminDashboardResponse,
  type AdminSpacesStatistics,
  type AdminSystemStatistics,
  type AdminUsersStatistics,
} from "@hive/core";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { withAdminCampusIsolation } from "@/lib/middleware";

const PLATFORM_NAME = "HIVE";
const PLATFORM_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0";
const PLATFORM_UNIVERSITY = "University at Buffalo";
const ACTIVE_USER_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const LEGACY_SPACE_TYPES = [
  "campus_living",
  "fraternity_and_sorority",
  "hive_exclusive",
  "student_organizations",
  "university_organizations",
];

type UnknownRecord = Record<string, unknown>;
type RawSpaceDocument = UnknownRecord & { id: string };

export const GET = withAdminCampusIsolation(
  async (request: NextRequest, token) => {
    const campusId = CURRENT_CAMPUS_ID;
    const adminIdentifier =
      token.email || token.uid || request.headers.get("x-admin-id") || "admin";

    try {
      const payload = await buildAdminDashboardPayload(
        campusId,
        adminIdentifier,
      );

      return NextResponse.json(payload);
    } catch (error) {
      logger.error("Admin dashboard overview failed", {
        campusId,
        error: error instanceof Error ? error.message : String(error),
      });

      return NextResponse.json(
        ApiResponseHelper.error(
          "Failed to load admin dashboard",
          "INTERNAL_ERROR",
        ),
        { status: HttpStatus.INTERNAL_SERVER_ERROR },
      );
    }
  },
);

export async function buildAdminDashboardPayload(
  campusId: string,
  adminIdentifier: string,
): Promise<AdminDashboardResponse> {
  const [usersStats, builderRequestsStats, spacesDataset] = await Promise.all([
    getUsersStatistics(campusId),
    getBuilderRequestsStatistics(campusId),
    fetchSpacesForCampus(campusId),
  ]);

  const spacesStats = summarizeSpaces(spacesDataset);
  const systemStats = await getSystemHealth(campusId, {
    users: usersStats.total,
    spaces: spacesStats.total,
    builderRequests: builderRequestsStats.total,
  });

  const payload = {
    success: true as const,
    timestamp: new Date().toISOString(),
    adminUser: adminIdentifier,
    platform: {
      name: PLATFORM_NAME,
      version: PLATFORM_VERSION,
      environment: process.env.NODE_ENV || "development",
      university: PLATFORM_UNIVERSITY,
      campusId,
    },
    statistics: {
      users: usersStats,
      spaces: spacesStats,
      builderRequests: builderRequestsStats,
      system: systemStats,
    },
  };

  return AdminDashboardResponseSchema.parse(payload);
}

async function getUsersStatistics(campusId: string): Promise<AdminUsersStatistics> {
  try {
    const snapshot = await dbAdmin
      .collection("users")
      .where("campusId", "==", campusId)
      .get();

    const documents = snapshot.docs.map((doc) => doc.data() as UnknownRecord);

    let active = 0;
    const byMajor: Record<string, number> = {};
    const byYear: Record<string, number> = {};

    for (const user of documents) {
      const major = String(
        user.major || user.department || user.primaryMajor || "Unknown",
      ).trim();
      byMajor[major] = (byMajor[major] || 0) + 1;

      const year = String(
        user.classYear || user.graduationYear || user.year || "Unknown",
      ).trim();
      byYear[year] = (byYear[year] || 0) + 1;

      const lastActiveAt = getDateFromUnknown(
        user.lastActiveAt ?? user.lastActive ?? user.updatedAt,
      );
      if (
        lastActiveAt &&
        Date.now() - lastActiveAt.getTime() <= ACTIVE_USER_WINDOW_MS
      ) {
        active += 1;
      }
    }

    const total = documents.length;
    const inactive = Math.max(total - active, 0);

    return {
      total,
      active,
      inactive,
      byMajor: limitRecord(byMajor, 10),
      byYear: limitRecord(byYear, 10),
      growth: {
        lastWeek: 0,
        lastMonth: 0,
      },
    };
  } catch (error) {
    logger.error("Error getting campus-scoped user statistics", {
      campusId,
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      total: 0,
      active: 0,
      inactive: 0,
      byMajor: {},
      byYear: {},
      growth: {
        lastWeek: 0,
        lastMonth: 0,
      },
    };
  }
}

async function getBuilderRequestsStatistics(
  campusId: string,
): Promise<AdminBuilderRequestsStatistics> {
  try {
    let snapshot = await dbAdmin
      .collection("builderRequests")
      .where("campusId", "==", campusId)
      .get();

    if (snapshot.empty) {
      // For legacy data, fall back to collection-wide fetch and filter locally.
      snapshot = await dbAdmin.collection("builderRequests").get();
    }

    const requests = snapshot.docs
      .map((doc) => doc.data() as UnknownRecord)
      .filter((request) => request != null)
      .filter((request) => {
        const requestCampus = (request.campusId as string | undefined)?.toLowerCase();
        return requestCampus === campusId.toLowerCase();
      });

    const totals = {
      total: requests.length,
      pending: filterByStatus(requests, "pending").length,
      approved: filterByStatus(requests, "approved").length,
      rejected: filterByStatus(requests, "rejected").length,
    };

    const urgent = requests.filter((request) => {
      if (getString(request.status) !== "pending") return false;
      const submittedAt = getDateFromUnknown(request.submittedAt);
      if (!submittedAt) return false;
      const hoursAwaiting =
        (Date.now() - submittedAt.getTime()) / (1000 * 60 * 60);
      return hoursAwaiting >= 24;
    }).length;

    const approvalRate =
      totals.total > 0 ? Math.round((totals.approved / totals.total) * 100) : 0;

    return {
      ...totals,
      urgent,
      approvalRate,
      averageResponseTime: calculateAverageResponseTime(requests),
    };
  } catch (error) {
    logger.error("Error getting builder request statistics", {
      campusId,
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      urgent: 0,
      approvalRate: 0,
      averageResponseTime: 0,
    };
  }
}

async function fetchSpacesForCampus(
  campusId: string,
): Promise<RawSpaceDocument[]> {
  const spaces: RawSpaceDocument[] = [];

  try {
    const snapshot = await dbAdmin
      .collection("spaces")
      .where("campusId", "==", campusId)
      .get();

    if (!snapshot.empty) {
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!data) return;
        spaces.push({ id: doc.id, ...data });
      });

      return spaces;
    }
  } catch (error) {
    logger.warn("Primary spaces query failed; falling back to legacy paths", {
      campusId,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  for (const spaceType of LEGACY_SPACE_TYPES) {
    try {
      const collectionRef = dbAdmin
        .collection("spaces")
        .doc(spaceType)
        .collection("spaces");
      const snapshot = await collectionRef.get();

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!data) return;
        const docCampus = (data.campusId as string | undefined)?.toLowerCase();
        if (docCampus && docCampus !== campusId.toLowerCase()) return;

        spaces.push({ id: doc.id, type: spaceType, ...data });
      });
    } catch (error) {
      logger.error("Legacy space fetch failed", {
        campusId,
        spaceType,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return spaces;
}

function summarizeSpaces(spaces: RawSpaceDocument[]): AdminSpacesStatistics {
  if (spaces.length === 0) {
    return {
      total: 0,
      active: 0,
      dormant: 0,
      byType: {},
      hasBuilders: 0,
      totalMembers: 0,
      averageMembers: 0,
      activationRate: 0,
    };
  }

  const byType: Record<
    string,
    { total: number; active: number; dormant: number; members: number }
  > = {};

  let total = 0;
  let active = 0;
  let withBuilders = 0;
  let totalMembers = 0;

  for (const space of spaces) {
    total += 1;

    const type = getString(
      space.type ?? space.category ?? space.kind ?? "unknown",
    );
    const isActive = isSpaceActive(space);

    if (isActive) active += 1;
    if (space.hasBuilders === true) withBuilders += 1;

    const members = toNumber(space.memberCount);
    totalMembers += members;

    const entry = byType[type] || {
      total: 0,
      active: 0,
      dormant: 0,
      members: 0,
    };

    entry.total += 1;
    entry.members += members;
    if (isActive) entry.active += 1;

    byType[type] = entry;
  }

  Object.values(byType).forEach((entry) => {
    entry.dormant = Math.max(entry.total - entry.active, 0);
  });

  const dormant = Math.max(total - active, 0);
  const averageMembers = total > 0 ? Math.round(totalMembers / total) : 0;
  const activationRate =
    total > 0 ? Math.round((active / total) * 100) : 0;

  return {
    total,
    active,
    dormant,
    byType,
    hasBuilders: withBuilders,
    totalMembers,
    averageMembers,
    activationRate,
  };
}

async function getSystemHealth(
  campusId: string,
  counts: { users: number; spaces: number; builderRequests: number },
): Promise<AdminSystemStatistics> {
  try {
    const memoryUsage =
      typeof process?.memoryUsage === "function" ? process.memoryUsage() : null;

    return {
      status: "healthy",
      uptime: typeof process?.uptime === "function" ? process.uptime() : 0,
      memory: memoryUsage
        ? {
            heapUsed: memoryUsage.heapUsed,
            heapTotal: memoryUsage.heapTotal,
          }
        : null,
      collections: {
        users: counts.users,
        spaces: counts.spaces,
        builderRequests: counts.builderRequests,
      },
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    logger.error("Error computing system health", {
      campusId,
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      status: "error",
      uptime: 0,
      memory: null,
      collections: {
        users: counts.users,
        spaces: counts.spaces,
        builderRequests: counts.builderRequests,
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}

function calculateAverageResponseTime(
  requests: UnknownRecord[],
): number {
  const durations = requests
    .map((request) => {
      const submittedAt = getDateFromUnknown(request.submittedAt);
      const reviewedAt = getDateFromUnknown(
        request.reviewedAt ?? request.resolvedAt,
      );

      if (!submittedAt || !reviewedAt) return null;
      const diff = reviewedAt.getTime() - submittedAt.getTime();
      return diff >= 0 ? diff : null;
    })
    .filter((value): value is number => value != null);

  if (durations.length === 0) return 0;

  const averageMs =
    durations.reduce((sum, duration) => sum + duration, 0) / durations.length;

  return Math.max(Math.round(averageMs / (1000 * 60 * 60)), 0);
}

function filterByStatus(
  requests: UnknownRecord[],
  status: string,
): UnknownRecord[] {
  const target = status.toLowerCase();
  return requests.filter(
    (request) => getString(request.status).toLowerCase() === target,
  );
}

function getString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return "";
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function isSpaceActive(space: UnknownRecord): boolean {
  if (typeof space.isActive === "boolean") return space.isActive;
  if (typeof space.status === "string") {
    const status = space.status.toLowerCase();
    if (["active", "live", "published"].includes(status)) return true;
  }
  if (typeof space.hasBuilders === "boolean") return space.hasBuilders;
  return false;
}

function getDateFromUnknown(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof (value as { toDate?: () => unknown }).toDate === "function") {
    try {
      const coerced = (value as { toDate: () => unknown }).toDate();
      if (coerced instanceof Date) return coerced;
      if (typeof coerced === "string" || typeof coerced === "number") {
        const date = new Date(coerced);
        return Number.isNaN(date.getTime()) ? null : date;
      }
    } catch {
      return null;
    }
  }
  return null;
}

function limitRecord(
  record: Record<string, number>,
  limit: number,
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(record)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit),
  );
}
