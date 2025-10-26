// Bounded Context Owner: HiveLab Guild
import {
  ToolApplicationService,
  type ToolSnapshot,
  type ToolBlueprint,
  type ToolPermissionsPort
} from "@core";
import { seedToolSnapshots, toolBlueprints } from "./fixtures";
import { InMemoryToolRepository } from "./in-memory-tool.repository";
import { FirestoreToolRepository } from "./firestore-tool.repository";
import { getToolTelemetry } from "./telemetry";

const allowDevSeeds = process.env.ENABLE_DEV_SEEDS === "true";
const preferFirestore = process.env.USE_FIRESTORE_TOOLS !== "false";
const repository = (() => {
  if (preferFirestore) {
    try {
      return new FirestoreToolRepository();
    } catch (error) {
      if (!allowDevSeeds) {
        throw new Error(
          "Failed to initialize FirestoreToolRepository and ENABLE_DEV_SEEDS is not set. Configure Firebase credentials for tools."
        );
      }
      console.warn("Falling back to in-memory ToolRepository", error);
    }
  }

  if (!allowDevSeeds) {
    throw new Error(
      "In-memory tool repository requested but ENABLE_DEV_SEEDS is not set. Enable dev seeds or configure Firebase."
    );
  }

  return new InMemoryToolRepository(seedToolSnapshots);
})();

const isCampusLeader = async (campusId: string, profileId: string): Promise<boolean> => {
  const { spaceService } = await import("../spaces/service");
  const spaces = await spaceService.listByCampus(campusId);
  return spaces.some((space) =>
    space.members.some((member) => member.profileId === profileId && member.role === "leader")
  );
};

const toolPermissions: ToolPermissionsPort = {
  async canViewCampusCatalog({ campusId, profileId }) {
    return isCampusLeader(campusId, profileId);
  },
  async canCreateTool({ campusId, profileId }) {
    if (allowDevSeeds) {
      // Dev seeds enable rapid iteration without full campus role wiring.
      return true;
    }

    return isCampusLeader(campusId, profileId);
  },
  async canManageTool({ profileId, tool }) {
    if (profileId === "system") {
      return true;
    }
    if (tool.createdBy === profileId) return true;
    if (tool.permissions.canEdit.includes(profileId)) return true;
    return isCampusLeader(tool.campusId, profileId);
  }
};

export const toolService = new ToolApplicationService({
  repository,
  templateCatalog: toolBlueprints,
  permissions: toolPermissions,
  telemetry: getToolTelemetry()
  ,
  publishGates: { enforce: true, windowMinutes: 10 }
});

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const serializeTool = (
  tool: ToolSnapshot,
  options: { referenceDate?: Date; includeCountdown?: boolean } = {}
): Record<string, unknown> => ({
  id: tool.id,
  name: tool.name,
  description: tool.description,
  icon: tool.icon ?? null,
  createdBy: tool.createdBy,
  campusId: tool.campusId,
  spaceId: tool.spaceId ?? null,
  status: tool.status,
  limitedRunEndsAt: tool.limitedRunEndsAt ? tool.limitedRunEndsAt.toISOString() : null,
  limitedRunDaysRemaining: options.includeCountdown
    ? calculateLimitedRunCountdown(tool, options.referenceDate ?? new Date())
    : null,
  version: tool.version,
  lastTest: tool.lastTest
    ? {
        health: tool.lastTest.health,
        blockingIssueCount: tool.lastTest.blockingIssueCount,
        lastRunAt: tool.lastTest.lastRunAt ? tool.lastTest.lastRunAt.toISOString() : null
      }
    : null,
  visibility: tool.visibility,
  elements: tool.elements,
  authoring: tool.authoring,
  authoringIssues: tool.authoringIssues,
  permissions: tool.permissions,
  analytics: tool.analytics,
  deployedTo: tool.deployedTo,
  deploymentPins: tool.deploymentPins,
  createdAt: tool.createdAt.toISOString(),
  updatedAt: tool.updatedAt.toISOString(),
  publishedAt: tool.publishedAt ? tool.publishedAt.toISOString() : null
});

export const serializeBlueprint = (blueprint: ToolBlueprint) => ({
  ...blueprint
});

const derivePlacementSummary = (tool: ToolSnapshot) => ({
  start: tool.status !== "draft",
  live: tool.status !== "draft",
  board: tool.deployedTo.length > 0 ? "on_input" : "off",
  calendar: Boolean(tool.limitedRunEndsAt)
});

const calculateLimitedRunCountdown = (tool: ToolSnapshot, reference: Date) => {
  if (!tool.limitedRunEndsAt) return null;
  const diffMs = tool.limitedRunEndsAt.getTime() - reference.getTime();
  const remaining = Math.ceil(diffMs / MS_PER_DAY);
  return remaining > 0 ? remaining : 0;
};

export const serializeToolForCatalog = (
  tool: ToolSnapshot,
  options: { referenceDate?: Date } = {}
) => {
  const reference = options.referenceDate ?? new Date();
  return {
    id: tool.id,
    name: tool.name,
    description: tool.description,
    status: tool.status,
    visibility: tool.visibility,
    limitedRunEndsAt: tool.limitedRunEndsAt ? tool.limitedRunEndsAt.toISOString() : null,
    limitedRunDaysRemaining: calculateLimitedRunCountdown(tool, reference),
    placement: derivePlacementSummary(tool),
    lastTest: tool.lastTest
      ? {
          health: tool.lastTest.health,
          blockingIssueCount: tool.lastTest.blockingIssueCount,
          lastRunAt: tool.lastTest.lastRunAt ? tool.lastTest.lastRunAt.toISOString() : null
        }
      : null,
  deployments: {
    count: tool.deployedTo.length,
    spaceIds: [...tool.deployedTo],
    pins: tool.deployedTo.reduce<Record<string, number>>((acc, spaceId) => {
      const version = tool.deploymentPins[spaceId];
        if (typeof version === "number") {
          acc[spaceId] = version;
        }
        return acc;
      }, {})
    }
  };
};
