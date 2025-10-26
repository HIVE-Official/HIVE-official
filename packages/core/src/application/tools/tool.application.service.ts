// Bounded Context Owner: HiveLab Guild
import { err, ok, type Result } from "../../shared/result";
import {
  ToolAggregate,
  type ToolElement,
  type ToolSnapshot
} from "../../domain/tools/aggregates/tool.aggregate";
import type { ToolRepository } from "../../domain/tools/tool.repository";
import type { ToolVisibility, ToolTestHealth } from "../../domain/tools/tool.types";
import type { ToolPermissionsPort } from "./ports/tool-permissions.port";
import type { ToolTelemetryPort } from "./ports/tool-telemetry.port";
import { lintToolDefinition } from "../../hivelab/lint";
import { lookupElementDefinition } from "../../hivelab/catalog";

export interface ToolBlueprint {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category?: string;
}

export interface ToolApplicationServiceDependencies {
  readonly repository: ToolRepository;
  readonly templateCatalog?: readonly ToolBlueprint[];
  readonly clock?: () => Date;
  readonly permissions?: ToolPermissionsPort;
  readonly telemetry?: ToolTelemetryPort;
  readonly publishGates?: { enforce: boolean; windowMinutes?: number };
}

export interface ToolDashboard {
  readonly owned: readonly ToolSnapshot[];
  readonly drafts: readonly ToolSnapshot[];
  readonly published: readonly ToolSnapshot[];
  readonly shared: readonly ToolSnapshot[];
  readonly templates: readonly ToolBlueprint[];
}

export type CampusCatalogVisibilityFilter = "campus" | "public" | "all";

export class ToolApplicationService {
  private readonly repository: ToolRepository;
  private readonly templateCatalog: readonly ToolBlueprint[];
  private readonly clock: () => Date;
  private readonly permissions: ToolPermissionsPort;
  private readonly telemetry: ToolTelemetryPort;
  private readonly publishGates: { enforce: boolean; windowMinutes: number };

  constructor(dependencies: ToolApplicationServiceDependencies) {
    this.repository = dependencies.repository;
    this.templateCatalog = dependencies.templateCatalog ?? [];
    this.clock = dependencies.clock ?? (() => new Date());
    this.permissions = dependencies.permissions ?? {
      canViewCampusCatalog: async () => true,
      canCreateTool: async () => true,
      canManageTool: async () => true
    };
    this.telemetry = dependencies.telemetry ?? {
      async recordPublish() {},
      async recordDeploy() {},
      async recordUsage() {},
      async recordDeploymentReconciled() {},
      async recordInteraction() {}
    };
    this.publishGates = {
      enforce: dependencies.publishGates?.enforce === true,
      windowMinutes: typeof dependencies.publishGates?.windowMinutes === "number" && dependencies.publishGates?.windowMinutes > 0
        ? dependencies.publishGates.windowMinutes!
        : 10
    };
  }

  async getDashboard(input: { profileId: string; campusId: string }): Promise<ToolDashboard> {
    const tools = await this.repository.listByCreator(input.profileId);
    const ownedSnapshots = tools.map((tool) => tool.toSnapshot());

    return {
      owned: ownedSnapshots,
      drafts: ownedSnapshots.filter((tool) => tool.status === "draft"),
      published: ownedSnapshots.filter((tool) => tool.status === "limited_run" || tool.status === "certified"),
      shared: [],
      templates: this.templateCatalog
    };
  }

  async listCampusCatalog(input: {
    campusId: string;
    profileId: string;
    visibility?: CampusCatalogVisibilityFilter;
  }): Promise<Result<readonly ToolSnapshot[]>> {
    const hasAccess = await this.permissions.canViewCampusCatalog({
      campusId: input.campusId,
      profileId: input.profileId
    });

    if (!hasAccess) {
      return err("FORBIDDEN");
    }

    const campusTools = await this.repository.listByCampus(input.campusId);
    const allowedVisibilities = this.resolveCampusVisibilities(input.visibility);

    const catalog = campusTools
      .map((tool) => tool.toSnapshot())
      .filter((tool) => {
        const visibilityMatches = allowedVisibilities.includes(tool.visibility);
        const statusEligible = tool.status === "certified";
        return visibilityMatches && statusEligible;
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return ok(catalog);
  }

  async listTemplates(): Promise<readonly ToolBlueprint[]> {
    return this.templateCatalog;
  }

  async listForSpace(spaceId: string): Promise<readonly ToolSnapshot[]> {
    const tools = await this.repository.listBySpace(spaceId);
    return tools.map((tool) => tool.toSnapshot());
  }

  async createDraft(input: {
    readonly id: string;
    readonly campusId: string;
    readonly name: string;
    readonly description: string;
    readonly createdBy: string;
    readonly spaceId?: string;
    readonly templateId?: string;
    readonly elements?: readonly ToolElement[];
  }): Promise<Result<ToolSnapshot>> {
    const canCreate = await this.permissions.canCreateTool({
      profileId: input.createdBy,
      campusId: input.campusId
    });

    if (!canCreate) {
      return err("FORBIDDEN");
    }

    const elements = this.resolveElements(input);
    if (!elements.ok) {
      return elements;
    }

    const creationResult = ToolAggregate.create({
      id: input.id,
      campusId: input.campusId,
      name: input.name,
      description: input.description,
      createdBy: input.createdBy,
      elements: elements.value,
      spaceId: input.spaceId,
      createdAt: this.clock()
    });

    if (!creationResult.ok) {
      return creationResult;
    }

    const aggregate = creationResult.value;
    await this.repository.save(aggregate);
    return ok(aggregate.toSnapshot());
  }

  async publishTool(input: {
    toolId: string;
    profileId: string;
    stage: "limited_run" | "certified";
  }): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(input.toolId);
    if (!tool) {
      await this.telemetry.recordPublish({
        toolId: input.toolId,
        performedBy: input.profileId,
        stage: input.stage,
        outcome: "failure",
        error: "not_found"
      });
      return err("Tool not found");
    }

    const canManage = await this.permissions.canManageTool({
      profileId: input.profileId,
      tool: tool.toSnapshot()
    });
    if (!canManage) {
      await this.telemetry.recordPublish({
        toolId: input.toolId,
        performedBy: input.profileId,
        stage: input.stage,
        outcome: "failure",
        error: "forbidden"
      });
      return err("FORBIDDEN");
    }

    // Optional publish gates (fresh Run Test + no blocking lints)
    if (this.publishGates.enforce) {
      const snapshot = tool.toSnapshot();
      const now = this.clock();
      const last = snapshot.lastTest?.lastRunAt ? new Date(snapshot.lastTest.lastRunAt) : null;
      const windowMs = this.publishGates.windowMinutes * 60 * 1000;
      const fresh = Boolean(last) && now.getTime() - (last?.getTime() ?? 0) <= windowMs;
      const lints = lintToolDefinition(snapshot.authoring, lookupElementDefinition);
      const hasBlockingLint = lints.some((i) => i.severity === "block");
      const testOk = (snapshot.lastTest?.blockingIssueCount ?? 0) === 0 && snapshot.lastTest?.health !== "fix_required";

      if (!fresh || hasBlockingLint || !testOk) {
        await this.telemetry.recordPublish({
          toolId: input.toolId,
          performedBy: input.profileId,
          stage: input.stage,
          outcome: "failure",
          error: "publish_gates"
        });
        return err("PUBLISH_GATES");
      }
    }

    const result = tool.publishWithStage(input.stage, this.clock());
    if (!result.ok) {
      await this.telemetry.recordPublish({
        toolId: input.toolId,
        performedBy: input.profileId,
        stage: input.stage,
        outcome: "failure",
        error: result.error
      });
      return result;
    }

    await this.repository.save(tool);
    await this.telemetry.recordPublish({
      toolId: input.toolId,
      performedBy: input.profileId,
      stage: input.stage,
      outcome: "success"
    });
    return ok(tool.toSnapshot());
  }

  async recordTestResult(input: {
    toolId: string;
    runAt: Date;
    blockingIssueCount: number;
    health: ToolTestHealth;
  }): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(input.toolId);
    if (!tool) {
      return err("Tool not found");
    }

    tool.recordTestResult({
      runAt: input.runAt,
      blockingIssueCount: input.blockingIssueCount,
      health: input.health
    });

    await this.repository.save(tool);
    return ok(tool.toSnapshot());
  }

  async listLimitedRunExpiring(reference: Date, limit = 100): Promise<readonly ToolSnapshot[]> {
    const tools = await this.repository.listLimitedRunExpiring(reference, limit);
    return tools.map((tool) => tool.toSnapshot());
  }

  async getTool(toolId: string): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(toolId);
    if (!tool) {
      return err("Tool not found");
    }
    return ok(tool.toSnapshot());
  }

  async updateVisibility(input: {
    toolId: string;
    profileId: string;
    visibility: ToolVisibility;
  }): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(input.toolId);
    if (!tool) {
      return err("Tool not found");
    }

    const canManage = await this.permissions.canManageTool({
      profileId: input.profileId,
      tool: tool.toSnapshot()
    });
    if (!canManage) {
      return err("FORBIDDEN");
    }

    const result = tool.updateVisibility(input.visibility);
    if (!result.ok) {
      return result;
    }

    await this.repository.save(tool);
    return ok(tool.toSnapshot());
  }

  async deployTool(input: {
    toolId: string;
    profileId: string;
    spaceIds: readonly string[];
  }): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(input.toolId);
    if (!tool) {
      await this.telemetry.recordDeploy({
        toolId: input.toolId,
        performedBy: input.profileId,
        spaceIds: input.spaceIds,
        outcome: "failure",
        error: "not_found"
      });
      return err("Tool not found");
    }

    const canManage = await this.permissions.canManageTool({
      profileId: input.profileId,
      tool: tool.toSnapshot()
    });
    if (!canManage) {
      await this.telemetry.recordDeploy({
        toolId: input.toolId,
        performedBy: input.profileId,
        spaceIds: input.spaceIds,
        outcome: "failure",
        error: "forbidden"
      });
      return err("FORBIDDEN");
    }

    const result = tool.deployToSpaces(input.spaceIds);
    if (!result.ok) {
      await this.telemetry.recordDeploy({
        toolId: input.toolId,
        performedBy: input.profileId,
        spaceIds: input.spaceIds,
        outcome: "failure",
        error: result.error
      });
      return result;
    }

    await this.repository.save(tool);
    await this.telemetry.recordDeploy({
      toolId: input.toolId,
      performedBy: input.profileId,
      spaceIds: input.spaceIds,
      outcome: "success"
    });
    return ok(tool.toSnapshot());
  }

  async updateElements(input: {
    toolId: string;
    profileId: string;
    elements: readonly ToolElement[];
  }): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(input.toolId);
    if (!tool) {
      return err("Tool not found");
    }

    const canManage = await this.permissions.canManageTool({
      profileId: input.profileId,
      tool: tool.toSnapshot()
    });
    if (!canManage) {
      return err("FORBIDDEN");
    }

    const result = tool.updateElements(input.elements);
    if (!result.ok) {
      return result;
    }

    await this.repository.save(tool);
    return ok(tool.toSnapshot());
  }

  async updateElementAttachment(input: {
    toolId: string;
    profileId: string;
    elementId: string;
    eventId: string | null;
  }): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(input.toolId);
    if (!tool) {
      return err("Tool not found");
    }

    const canManage = await this.permissions.canManageTool({
      profileId: input.profileId,
      tool: tool.toSnapshot()
    });
    if (!canManage) {
      return err("FORBIDDEN");
    }

    const result = tool.attachEventToElement(input.elementId, input.eventId);
    if (!result.ok) {
      return result;
    }

    await this.repository.save(tool);
    return ok(tool.toSnapshot());
  }

  async archiveTool(input: {
    toolId: string;
    profileId: string;
  }): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(input.toolId);
    if (!tool) {
      return err("Tool not found");
    }

    const canManage = await this.permissions.canManageTool({
      profileId: input.profileId,
      tool: tool.toSnapshot()
    });
    if (!canManage) {
      return err("FORBIDDEN");
    }

    const result = tool.archive();
    if (!result.ok) {
      return result;
    }

    await this.repository.save(tool);
    return ok(tool.toSnapshot());
  }

  async recordUse(toolId: string, profileId: string): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(toolId);
    if (!tool) {
      return err("Tool not found");
    }

    const result = tool.recordUse(profileId);
    if (!result.ok) {
      return result;
    }

    await this.repository.save(tool);
    await this.telemetry.recordUsage({
      toolId,
      performedBy: profileId
    });
    return ok(tool.toSnapshot());
  }

  async reconcileDeployments(input: {
    toolId: string;
    profileId: string;
    spaceIds: readonly string[];
  }): Promise<Result<ToolSnapshot>> {
    const tool = await this.repository.findById(input.toolId);
    if (!tool) {
      return err("Tool not found");
    }

    const snapshot = tool.toSnapshot();
    const canManage = await this.permissions.canManageTool({
      profileId: input.profileId,
      tool: snapshot
    });
    if (!canManage) {
      return err("FORBIDDEN");
    }

    const trimmed = Array.from(new Set(input.spaceIds));
    const result = tool.synchronizeDeployments(trimmed);
    if (!result.ok) {
      return result;
    }

    await this.repository.save(tool);
    const removed = snapshot.deployedTo.filter((spaceId) => !trimmed.includes(spaceId));
    await this.telemetry.recordDeploymentReconciled({
      toolId: input.toolId,
      removedSpaceIds: removed,
      remainingSpaceIds: trimmed
    });
    return ok(tool.toSnapshot());
  }

  async listAllTools(): Promise<readonly ToolSnapshot[]> {
    const tools = await this.repository.listAll();
    return tools.map((tool) => tool.toSnapshot());
  }

  private resolveElements(input: {
    readonly templateId?: string;
    readonly elements?: readonly ToolElement[];
  }): Result<readonly ToolElement[]> {
    if (input.templateId) {
      const template = this.templateCatalog.find((candidate) => candidate.id === input.templateId);
      if (!template) {
        return err("Template not found");
      }

      const element: ToolElement = {
        id: `${template.id}-element`,
        name: template.name,
        type: "template",
        config: {
          templateId: template.id,
          description: template.description,
          category: template.category
        }
      };

      return ok([element]);
    }

    if (!input.elements || input.elements.length === 0) {
      return err("Tools require at least one element");
    }

    return ok(input.elements);
  }

  private resolveCampusVisibilities(visibility: CampusCatalogVisibilityFilter | undefined): ToolVisibility[] {
    const normalized = visibility ?? "all";
    if (normalized === "campus") {
      return ["campus"];
    }
    if (normalized === "public") {
      return ["public"];
    }
    return ["campus", "public"];
  }
}
