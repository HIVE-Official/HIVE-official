// Bounded Context Owner: HiveLab Guild
import { describe, expect, it } from "vitest";
import {
  ToolApplicationService,
  type ToolBlueprint
} from "./tool.application.service";
import {
  ToolAggregate,
  type ToolSnapshot
} from "../../domain/tools/aggregates/tool.aggregate";
import type { ToolRepository } from "../../domain/tools/tool.repository";
import type { ToolPermissionsPort } from "./ports/tool-permissions.port";
import { assertErr, assertOk } from "../../shared/testing/assertions";
import type { ToolDefinition } from "../../hivelab/contracts";

class StubToolRepository implements ToolRepository {
  private snapshots = new Map<string, ToolSnapshot>();

  constructor(initialSnapshots: readonly ToolSnapshot[] = []) {
    initialSnapshots.forEach((snapshot) => {
      this.snapshots.set(snapshot.id, this.clone(snapshot));
    });
  }

  async findById(toolId: string) {
    const snapshot = this.snapshots.get(toolId);
    return snapshot ? ToolAggregate.rehydrate(this.clone(snapshot)) : null;
  }

  async listByCreator(profileId: string) {
    return Array.from(this.snapshots.values())
      .filter((snapshot) => snapshot.createdBy === profileId)
      .map((snapshot) => ToolAggregate.rehydrate(this.clone(snapshot)));
  }

  async listByCampus(campusId: string) {
    return Array.from(this.snapshots.values())
      .filter((snapshot) => snapshot.campusId === campusId)
      .map((snapshot) => ToolAggregate.rehydrate(this.clone(snapshot)));
  }

  async listBySpace(spaceId: string) {
    return Array.from(this.snapshots.values())
      .filter((snapshot) => snapshot.spaceId === spaceId)
      .map((snapshot) => ToolAggregate.rehydrate(this.clone(snapshot)));
  }

  async listAll() {
    return Array.from(this.snapshots.values()).map((snapshot) =>
      ToolAggregate.rehydrate(this.clone(snapshot))
    );
  }

  async save(tool: ToolAggregate) {
    this.snapshots.set(tool.getId(), this.clone(tool.toSnapshot()));
  }

  async listLimitedRunExpiring() {
    return [];
  }

  private clone(snapshot: ToolSnapshot): ToolSnapshot {
    return {
      ...snapshot,
      limitedRunEndsAt: snapshot.limitedRunEndsAt ? new Date(snapshot.limitedRunEndsAt) : undefined,
      lastTest: snapshot.lastTest
        ? {
            health: snapshot.lastTest.health,
            blockingIssueCount: snapshot.lastTest.blockingIssueCount,
            lastRunAt: snapshot.lastTest.lastRunAt ? new Date(snapshot.lastTest.lastRunAt) : undefined
          }
        : undefined,
      elements: snapshot.elements.map((element) => ({
        ...element,
        config: { ...element.config }
      })),
      authoring: {
        slug: snapshot.authoring.slug,
        version: snapshot.authoring.version,
        title: snapshot.authoring.title,
        emoji: snapshot.authoring.emoji,
        audience: snapshot.authoring.audience,
        placement: {
          start: snapshot.authoring.placement.start,
          live: snapshot.authoring.placement.live,
          board: snapshot.authoring.placement.board,
          dock: snapshot.authoring.placement.dock
        },
        time: snapshot.authoring.time ? { finishBy: snapshot.authoring.time.finishBy } : undefined,
        elements: snapshot.authoring.elements.map((element): ToolDefinition["elements"][number] => ({
          id: element.id,
          config: { ...element.config },
          attachedEventId: element.attachedEventId ?? null
        })),
        settings: {
          reminders: { ...(snapshot.authoring.settings.reminders ?? {}) },
          anonymous: snapshot.authoring.settings.anonymous ?? false,
          quietReports: snapshot.authoring.settings.quietReports ?? true,
          overflow: snapshot.authoring.settings.overflow
        }
      },
      authoringIssues: snapshot.authoringIssues.map((issue) => ({
        id: issue.id,
        severity: issue.severity,
        message: issue.message,
        autofix: issue.autofix
          ? {
              label: issue.autofix.label,
              action: issue.autofix.action,
              payload: issue.autofix.payload
            }
          : undefined
      })),
      permissions: {
        ...snapshot.permissions,
        canEdit: [...snapshot.permissions.canEdit]
      },
      analytics: { ...snapshot.analytics },
      deployedTo: [...snapshot.deployedTo],
      deploymentPins: { ...snapshot.deploymentPins },
      createdAt: new Date(snapshot.createdAt),
      updatedAt: new Date(snapshot.updatedAt),
      publishedAt: snapshot.publishedAt ? new Date(snapshot.publishedAt) : undefined
    };
  }
}

const templateCatalog: readonly ToolBlueprint[] = [];
const allowAllPermissions: ToolPermissionsPort = {
  canViewCampusCatalog: async () => true,
  canCreateTool: async () => true,
  canManageTool: async () => true
};

const createTool = (input: {
  id: string;
  campusId: string;
  name: string;
  createdBy?: string;
  status?: "draft" | "limited_run" | "certified" | "archived";
  visibility?: "private" | "space" | "campus" | "public";
  updatedAt?: Date;
}): ToolSnapshot => {
  const creation = ToolAggregate.create({
    id: input.id,
    campusId: input.campusId,
    name: input.name,
    description: `${input.name} description`,
    createdBy: input.createdBy ?? "leader-robotics",
    // Use a valid catalog element id to satisfy authoring validation
    elements: [
      {
        id: "quick_form",
        name: "Quick Form",
        type: "collector",
        config: { fieldLimit: 1 }
      }
    ],
    createdAt: input.updatedAt
  });

  if (!creation.ok) {
    throw new Error(`Failed to create test tool ${input.id}: ${creation.error}`);
  }

  const aggregate = creation.value;
  const now = input.updatedAt ?? new Date("2025-01-01T12:00:00Z");

  if (input.status === "limited_run" || input.status === "certified") {
    const published = aggregate.publishWithStage("limited_run", now);
    if (!published.ok) {
      throw new Error(`Failed to publish test tool ${input.id}: ${published.error}`);
    }
    if (input.status === "certified") {
      const certified = aggregate.publishWithStage("certified", now);
      if (!certified.ok) {
        throw new Error(`Failed to certify test tool ${input.id}: ${certified.error}`);
      }
    }
  } else if (input.status === "archived") {
    aggregate.archive();
  }

  if (input.visibility) {
    const visibilityResult = aggregate.updateVisibility(input.visibility);
    if (!visibilityResult.ok) {
      throw new Error(`Failed to set visibility for test tool ${input.id}: ${visibilityResult.error}`);
    }
  }

  const snapshot = aggregate.toSnapshot();
  aggregate.pullDomainEvents();
  return {
    ...snapshot,
    deploymentPins: { ...snapshot.deploymentPins }
  };
};

describe("Scenario: UB robotics leader browses the campus HiveLab library", () => {
  it("returns only certified tools that are visible to their campus by default", async () => {
    const campusId = "ub-buffalo";
    const repository = new StubToolRepository([
      createTool({
        id: "tool-certified-campus",
        name: "Campus RSVP",
        campusId,
        status: "certified",
        visibility: "campus",
        updatedAt: new Date("2025-01-02T10:00:00Z")
      }),
      createTool({
        id: "tool-certified-public",
        name: "Public Feedback",
        campusId,
        status: "certified",
        visibility: "public",
        updatedAt: new Date("2025-01-03T10:00:00Z")
      }),
      createTool({
        id: "tool-limited",
        name: "Limited Trial",
        campusId,
        status: "limited_run",
        visibility: "campus",
        updatedAt: new Date("2025-01-04T10:00:00Z")
      }),
      createTool({
        id: "tool-draft",
        name: "Draft Only",
        campusId,
        status: "draft",
        visibility: "private",
        updatedAt: new Date("2025-01-05T10:00:00Z")
      }),
      createTool({
        id: "tool-other-campus",
        name: "Other Campus Tool",
        campusId: "rit-rochester",
        status: "certified",
        visibility: "campus",
        updatedAt: new Date("2025-01-06T10:00:00Z")
      })
    ]);

    const service = new ToolApplicationService({
      repository,
      templateCatalog,
      permissions: allowAllPermissions
    });

    const result = await service.listCampusCatalog({ campusId, profileId: "leader-robotics" });
    assertOk(result);
    const catalog = result.value;

    const ids = catalog.map((tool) => tool.id);
    expect(ids).toContain("tool-certified-public");
    expect(ids).toContain("tool-certified-campus");
    expect(ids).toHaveLength(2);
    expect(catalog.every((tool) => tool.status === "certified")).toBe(true);
    expect(catalog.every((tool) => ["campus", "public"].includes(tool.visibility))).toBe(true);
  });

  it("lets leaders focus on tools marked public when they filter explicitly", async () => {
    const campusId = "ub-buffalo";
    const repository = new StubToolRepository([
      createTool({
        id: "tool-certified-campus",
        name: "Campus RSVP",
        campusId,
        status: "certified",
        visibility: "campus",
        updatedAt: new Date("2025-01-02T10:00:00Z")
      }),
      createTool({
        id: "tool-certified-public",
        name: "Public Feedback",
        campusId,
        status: "certified",
        visibility: "public",
        updatedAt: new Date("2025-01-03T10:00:00Z")
      })
    ]);

    const service = new ToolApplicationService({
      repository,
      templateCatalog,
      permissions: allowAllPermissions
    });
    const result = await service.listCampusCatalog({ campusId, profileId: "leader-robotics", visibility: "public" });
    assertOk(result);
    const catalog = result.value;

    expect(catalog).toHaveLength(1);
    expect(catalog[0].id).toBe("tool-certified-public");
    expect(catalog[0].visibility).toBe("public");
  });

  it("returns an empty list when the leader queries a different campus", async () => {
    const repository = new StubToolRepository([
      createTool({
        id: "tool-certified-campus",
        name: "Campus RSVP",
        campusId: "ub-buffalo",
        status: "certified",
        visibility: "campus",
        updatedAt: new Date("2025-01-02T10:00:00Z")
      })
    ]);

    const service = new ToolApplicationService({
      repository,
      templateCatalog,
      permissions: allowAllPermissions
    });
    const result = await service.listCampusCatalog({ campusId: "rit-rochester", profileId: "leader-robotics" });
    assertOk(result);
    expect(result.value).toHaveLength(0);
  });

  it("denies access when the caller lacks leadership permissions", async () => {
    const campusId = "ub-buffalo";
    const repository = new StubToolRepository([
      createTool({
        id: "tool-certified-campus",
        name: "Campus RSVP",
        campusId,
        status: "certified",
        visibility: "campus",
        updatedAt: new Date("2025-01-02T10:00:00Z")
      })
    ]);

    const permissions: ToolPermissionsPort = {
      canViewCampusCatalog: async () => false,
      canCreateTool: async () => true,
      canManageTool: async () => true
    };

    const service = new ToolApplicationService({ repository, templateCatalog, permissions });
    const result = await service.listCampusCatalog({ campusId, profileId: "student-nonleader" });

    assertErr(result);
    expect(result.error).toMatch(/forbidden/i);
  });

  it("blocks draft creation when the builder is not authorized for the campus", async () => {
    const repository = new StubToolRepository();
    const permissions: ToolPermissionsPort = {
      canViewCampusCatalog: async () => true,
      canCreateTool: async () => false,
      canManageTool: async () => true
    };

    const service = new ToolApplicationService({ repository, templateCatalog, permissions });
    const creation = await service.createDraft({
      id: "tool-not-allowed",
      campusId: "ub-buffalo",
      name: "Unauthorized Tool",
      description: "Students should not see this creation.",
      createdBy: "profile-student",
      elements: [
        {
          id: "el-1",
          name: "Form",
          type: "collector",
          config: {}
        }
      ]
    });

    assertErr(creation);
    expect(creation.error).toMatch(/forbidden/i);
  });

  it("blocks publish attempts from profiles without manage access", async () => {
    const repository = new StubToolRepository([
      createTool({
        id: "tool-authz-test",
        campusId: "ub-buffalo",
        name: "Authz Test Tool",
        status: "certified",
        visibility: "campus"
      })
    ]);

    const permissions: ToolPermissionsPort = {
      canViewCampusCatalog: async () => true,
      canCreateTool: async () => true,
      canManageTool: async ({ profileId }) => profileId === "profile-leader"
    };

    const service = new ToolApplicationService({ repository, templateCatalog, permissions });
    const publish = await service.publishTool({
      toolId: "tool-authz-test",
      profileId: "profile-member",
      stage: "limited_run"
    });

    assertErr(publish);
    expect(publish.error).toMatch(/forbidden/i);
  });
});

describe("Publish gates enforcement (fresh test, no blocking lints)", () => {
  it("blocks publish when no recent Run Test is present and allows after a fresh test", async () => {
    const campusId = "ub-buffalo";
    const repository = new StubToolRepository([
      createTool({ id: "tool-gated", name: "Gated", campusId, status: "draft" })
    ]);

    const service = new ToolApplicationService({
      repository,
      templateCatalog,
      permissions: allowAllPermissions,
      publishGates: { enforce: true, windowMinutes: 10 },
      clock: () => new Date("2025-01-01T12:00:00Z")
    });

    const publish1 = await service.publishTool({ toolId: "tool-gated", profileId: "leader-robotics", stage: "limited_run" });
    assertErr(publish1);
    expect(String(publish1.error)).toMatch(/PUBLISH_GATES/i);

    const test = await service.recordTestResult({ toolId: "tool-gated", runAt: new Date("2025-01-01T12:01:00Z"), blockingIssueCount: 0, health: "looks_good" });
    assertOk(test);

    const publish2 = await service.publishTool({ toolId: "tool-gated", profileId: "leader-robotics", stage: "limited_run" });
    assertOk(publish2);
  });
});
