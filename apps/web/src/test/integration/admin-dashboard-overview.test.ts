import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildAdminDashboardPayload } from "@/app/api/admin/dashboard/route";
import {
  adminMock,
  dbAdminMock,
  getCollection,
  resetCollections,
} from "../utils/inmemory-firestore";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/logger", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));
vi.mock("@/lib/structured-logger", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/lib/firebase-admin", () => ({
  dbAdmin: dbAdminMock,
}));

vi.mock("firebase-admin", () => adminMock);

describe("Admin dashboard overview", () => {
  beforeEach(() => {
    resetCollections();
  });

  it("returns campus-isolated metrics", async () => {
    const campusId = "ub-buffalo";
    const otherCampus = "test-campus";
    const now = Date.now();

    // Users
    await getCollection("users").doc("ub-active").set({
      campusId,
      major: "Computer Science",
      classYear: "2026",
      lastActiveAt: { toDate: () => new Date(now - 48 * 60 * 60 * 1000) },
    });
    await getCollection("users").doc("ub-inactive").set({
      campusId,
      major: "Biology",
      classYear: "2025",
      lastActiveAt: { toDate: () => new Date(now - 14 * 24 * 60 * 60 * 1000) },
    });
    await getCollection("users").doc("other-user").set({
      campusId: otherCampus,
      major: "Chemistry",
      classYear: "2024",
      lastActiveAt: { toDate: () => new Date(now - 24 * 60 * 60 * 1000) },
    });

    // Spaces (primary top-level collection)
    await getCollection("spaces").doc("space-1").set({
      campusId,
      type: "student_org",
      isActive: true,
      hasBuilders: true,
      memberCount: 50,
    });
    await getCollection("spaces").doc("space-2").set({
      campusId,
      type: "student_org",
      isActive: false,
      hasBuilders: false,
      memberCount: 20,
    });
    await getCollection("spaces").doc("space-other").set({
      campusId: otherCampus,
      type: "student_org",
      isActive: true,
      hasBuilders: true,
      memberCount: 200,
    });

    // Builder requests
    await getCollection("builderRequests").doc("req-pending").set({
      campusId,
      status: "pending",
      submittedAt: { toDate: () => new Date(now - 30 * 60 * 60 * 1000) }, // 30 hours ago (urgent)
    });
    await getCollection("builderRequests").doc("req-approved").set({
      campusId,
      status: "approved",
      submittedAt: { toDate: () => new Date(now - 12 * 60 * 60 * 1000) },
      reviewedAt: { toDate: () => new Date(now - 6 * 60 * 60 * 1000) },
    });
    await getCollection("builderRequests").doc("req-other").set({
      campusId: otherCampus,
      status: "rejected",
      submittedAt: { toDate: () => new Date(now - 6 * 60 * 60 * 1000) },
    });

    const payload = await buildAdminDashboardPayload(
      campusId,
      "admin@test.edu",
    );

    expect(payload.platform.campusId).toBe(campusId);
    expect(payload.statistics.users.total).toBe(2);
    expect(payload.statistics.users.active).toBe(1);
    expect(payload.statistics.users.inactive).toBe(1);
    expect(payload.statistics.spaces.total).toBe(2);
    expect(payload.statistics.spaces.active).toBe(1);
    expect(payload.statistics.spaces.dormant).toBe(1);
    expect(payload.statistics.spaces.totalMembers).toBe(70);
    expect(payload.statistics.spaces.activationRate).toBe(50);
    expect(payload.statistics.builderRequests.total).toBe(2);
    expect(payload.statistics.builderRequests.pending).toBe(1);
    expect(payload.statistics.builderRequests.approved).toBe(1);
    expect(payload.statistics.builderRequests.urgent).toBe(1);
    expect(payload.statistics.builderRequests.approvalRate).toBe(50);
    expect(payload.statistics.system.collections.users).toBe(2);
    expect(payload.statistics.system.collections.spaces).toBe(2);
    expect(payload.statistics.system.collections.builderRequests).toBe(2);
  });
});
