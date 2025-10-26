// Bounded Context Owner: HiveLab Guild
import { err, ok, type Result } from "../../../shared/result";
import {
  ToolDefinitionAggregate,
  type AuthoringActor
} from "../../hivelab/tool-definition.aggregate";
import type { ToolDefinition, LintIssue } from "../../../hivelab/contracts";
import { lintToolDefinition } from "../../../hivelab/lint";
import { lookupElementDefinition } from "../../../hivelab/catalog";
import type { ToolStatus, ToolVisibility, ToolTestStatus, ToolTestHealth } from "../tool.types";
import type { ToolDomainEvent } from "../events/tool.events";

export interface ToolElement {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly config: Record<string, unknown>;
}

const formatAuthoringVersion = (version: number): string => {
  if (version <= 0) {
    return "draft";
  }
  return `v${version}`;
};

const cloneDefinition = (definition: ToolDefinition): ToolDefinition => ({
  slug: definition.slug,
  version: definition.version,
  title: definition.title,
  emoji: definition.emoji,
  audience: definition.audience,
  placement: {
    start: definition.placement.start,
    live: definition.placement.live,
    board: definition.placement.board,
    dock: definition.placement.dock
  },
  time: definition.time ? { finishBy: definition.time.finishBy } : undefined,
  elements: definition.elements.map((element: ToolDefinition["elements"][number]) => ({
    id: element.id,
    config: { ...(element.config as Record<string, unknown>) },
    attachedEventId: element.attachedEventId ?? null
  })),
  settings: {
    reminders: { ...(definition.settings.reminders ?? {}) },
    anonymous: definition.settings.anonymous ?? false,
    quietReports: definition.settings.quietReports ?? true,
    overflow: definition.settings.overflow
  }
});

const cloneLintIssues = (issues: readonly LintIssue[]): LintIssue[] =>
  issues.map((issue) => ({
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
  }));

const buildDefaultDefinition = (input: ToolCreationInput): ToolDefinition => ({
  slug: input.id,
  version: formatAuthoringVersion(0),
  title: input.name.trim(),
  emoji: input.icon,
  audience: "members",
  placement: {
    start: false,
    live: true,
    board: "off",
    dock: false
  },
  time: undefined,
  elements: input.elements.map((element) => ({
    id: element.id,
    config: { ...element.config },
    attachedEventId: null
  })),
  settings: {
    reminders: {},
    anonymous: false,
    quietReports: true,
    overflow: "attach_under_latest"
  }
});

const computeAuthoringIssues = (definition: ToolDefinition): LintIssue[] =>
  lintToolDefinition(definition, lookupElementDefinition);

const buildLegacyDefinition = (
  snapshot: Omit<ToolSnapshot, "authoring"> & { authoring?: ToolDefinition }
): ToolDefinition => {
  if (snapshot.authoring) {
    return cloneDefinition(snapshot.authoring);
  }

  return {
    slug: snapshot.id,
    version: formatAuthoringVersion(snapshot.version ?? 0),
    title: snapshot.name,
    emoji: snapshot.icon,
    audience: "members",
    placement: {
      start: false,
      live: true,
      board: "off",
      dock: false
    },
    time: undefined,
    elements: snapshot.elements.map(
      (element): ToolDefinition["elements"][number] => ({
        id: element.id,
        config: { ...element.config },
        attachedEventId: null
      })
    ),
    settings: {
      reminders: {},
      anonymous: false,
      quietReports: true,
      overflow: "attach_under_latest"
    }
  };
};

const mergeDefinitionMetadata = (
  definition: ToolDefinition,
  input: ToolCreationInput
): ToolDefinition => {
  const merged = cloneDefinition(definition);
  merged.slug = input.id;
  merged.title = input.name.trim();
  merged.emoji = input.icon ?? merged.emoji;
  merged.version = merged.version ?? formatAuthoringVersion(0);
  return merged;
};

const elementsAlignWithDefinition = (
  elements: readonly ToolElement[],
  definitionElements: ToolDefinition["elements"]
): boolean => {
  if (elements.length !== definitionElements.length) {
    return false;
  }

  const definitionIds = new Set(
    definitionElements.map((element: ToolDefinition["elements"][number]) => element.id)
  );
  if (definitionIds.size !== definitionElements.length) {
    return false;
  }

  return elements.every((element) => definitionIds.has(element.id));
};

const mapToolElementsToDefinitionElements = (
  elements: readonly ToolElement[],
  existingDefinition: ToolDefinition
): ToolDefinition["elements"] => {
  const existingById = new Map(
    existingDefinition.elements.map((element) => [element.id, element] as const)
  );

  return elements.map((element): ToolDefinition["elements"][number] => {
    const previous = existingById.get(element.id);
    return {
      id: element.id,
      config: { ...element.config },
      attachedEventId: previous?.attachedEventId ?? null
    };
  });
};

export interface ToolPermissions {
  readonly canFork: boolean;
  readonly canEdit: readonly string[];
  readonly requiresApproval: boolean;
}

export interface ToolAnalytics {
  readonly uses: number;
  readonly forks: number;
  readonly rating: number;
}

export interface ToolSnapshot {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon?: string;
  readonly createdBy: string;
  readonly campusId: string;
  readonly spaceId?: string;
  readonly status: ToolStatus;
  readonly limitedRunEndsAt?: Date;
  readonly visibility: ToolVisibility;
  readonly version: number;
  readonly lastTest?: ToolTestStatus;
  readonly elements: readonly ToolElement[];
  readonly authoring: ToolDefinition;
  readonly authoringIssues: readonly LintIssue[];
  readonly permissions: ToolPermissions;
  readonly analytics: ToolAnalytics;
  readonly deployedTo: readonly string[];
  readonly deploymentPins: Readonly<Record<string, number>>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly publishedAt?: Date;
}

export interface ToolCreationInput {
  readonly id: string;
  readonly campusId: string;
  readonly name: string;
  readonly description: string;
  readonly createdBy: string;
  readonly elements: readonly ToolElement[];
  readonly authoring?: ToolDefinition;
  readonly icon?: string;
  readonly spaceId?: string;
  readonly permissions?: Partial<ToolPermissions>;
  readonly createdAt?: Date;
}

export class ToolAggregate {
  private props: ToolSnapshot;
  private readonly domainEvents: ToolDomainEvent[] = [];

  private constructor(snapshot: ToolSnapshot) {
    this.props = {
      ...snapshot,
      version: snapshot.version ?? 0,
      limitedRunEndsAt: snapshot.limitedRunEndsAt ? new Date(snapshot.limitedRunEndsAt) : undefined,
      lastTest: snapshot.lastTest
        ? {
            health: snapshot.lastTest.health,
            blockingIssueCount: snapshot.lastTest.blockingIssueCount,
            lastRunAt: snapshot.lastTest.lastRunAt ? new Date(snapshot.lastTest.lastRunAt) : undefined
          }
        : undefined,
      elements: snapshot.elements.map((element) => ({ ...element, config: { ...element.config } })),
      authoring: cloneDefinition(snapshot.authoring),
      authoringIssues: cloneLintIssues(snapshot.authoringIssues),
      permissions: {
        ...snapshot.permissions,
        canEdit: [...snapshot.permissions.canEdit]
      },
      deployedTo: [...snapshot.deployedTo],
      deploymentPins: { ...(snapshot.deploymentPins ?? {}) }
    };
  }

  static create(input: ToolCreationInput): Result<ToolAggregate> {
    if (!input.name.trim()) {
      return err("Tool name is required");
    }

    if (input.elements.length === 0) {
      return err("Tools must contain at least one element before saving");
    }

    const authorActor: AuthoringActor = {
      profileId: input.createdBy,
      role: "leader"
    };

    const baseDefinition = mergeDefinitionMetadata(
      input.authoring ? cloneDefinition(input.authoring) : buildDefaultDefinition(input),
      input
    );

    const definitionResult = ToolDefinitionAggregate.create({
      actor: authorActor,
      definition: baseDefinition
    });

    if (!definitionResult.ok) {
      return err(definitionResult.error);
    }

    const authoringDefinition = definitionResult.value.toDefinition();
    const authoringIssues = computeAuthoringIssues(authoringDefinition);

    if (!elementsAlignWithDefinition(input.elements, authoringDefinition.elements)) {
      return err("Authoring definition elements do not match provided tool elements");
    }

    const createdAt = input.createdAt ?? new Date();
    const aggregate = new ToolAggregate({
      id: input.id,
      campusId: input.campusId,
      name: input.name.trim(),
      description: input.description.trim(),
      icon: input.icon,
      createdBy: input.createdBy,
      spaceId: input.spaceId,
      status: "draft",
      limitedRunEndsAt: undefined,
      visibility: "private",
      version: 0,
      lastTest: undefined,
      elements: input.elements.map((element) => ({
        id: element.id,
        name: element.name,
        type: element.type,
        config: { ...element.config }
      })),
      authoring: authoringDefinition,
      authoringIssues,
      permissions: {
        canFork: input.permissions?.canFork ?? true,
        canEdit: input.permissions?.canEdit ? [...input.permissions.canEdit] : [input.createdBy],
        requiresApproval: input.permissions?.requiresApproval ?? false
      },
      analytics: {
        uses: 0,
        forks: 0,
        rating: 0
      },
      deployedTo: [],
      deploymentPins: {},
      createdAt,
      updatedAt: createdAt,
      publishedAt: undefined
    });

    aggregate.domainEvents.push({
      type: "ToolCreated",
      payload: {
        toolId: aggregate.props.id,
        createdBy: aggregate.props.createdBy
      }
    });

    return ok(aggregate);
  }

  static rehydrate(
    snapshot: ToolSnapshot & { authoring?: ToolDefinition; authoringIssues?: readonly LintIssue[] }
  ): ToolAggregate {
    const definition = snapshot.authoring
      ? cloneDefinition(snapshot.authoring)
      : buildLegacyDefinition(snapshot);

    const issues = snapshot.authoringIssues
      ? cloneLintIssues(snapshot.authoringIssues)
      : computeAuthoringIssues(definition);

    const ensured: ToolSnapshot = {
      ...snapshot,
      authoring: definition,
      authoringIssues: issues
    };

    return new ToolAggregate(ensured);
  }

  toSnapshot(): ToolSnapshot {
    return {
      ...this.props,
      limitedRunEndsAt: this.props.limitedRunEndsAt ? new Date(this.props.limitedRunEndsAt) : undefined,
      lastTest: this.props.lastTest
        ? {
            health: this.props.lastTest.health,
            blockingIssueCount: this.props.lastTest.blockingIssueCount,
            lastRunAt: this.props.lastTest.lastRunAt ? new Date(this.props.lastTest.lastRunAt) : undefined
          }
        : undefined,
      elements: this.props.elements.map((element) => ({
        ...element,
        config: { ...element.config }
      })),
      authoring: cloneDefinition(this.props.authoring),
      authoringIssues: cloneLintIssues(this.props.authoringIssues),
      permissions: {
        ...this.props.permissions,
        canEdit: [...this.props.permissions.canEdit]
      },
      deployedTo: [...this.props.deployedTo],
      deploymentPins: { ...this.props.deploymentPins }
    };
  }

  pullDomainEvents(): ToolDomainEvent[] {
    return this.domainEvents.splice(0, this.domainEvents.length);
  }

  getId(): string {
    return this.props.id;
  }

  getCreatorId(): string {
    return this.props.createdBy;
  }

  getStatus(): ToolStatus {
    return this.props.status;
  }

  getVisibility(): ToolVisibility {
    return this.props.visibility;
  }

  updateElements(elements: readonly ToolElement[]): Result<void> {
    if (this.props.status !== "draft") {
      return err("Cannot modify elements once the tool is published");
    }

    if (elements.length === 0) {
      return err("Tools must contain at least one element");
    }

    const authoringAggregateResult = ToolDefinitionAggregate.rehydrate({
      definition: this.props.authoring,
      updatedAt: this.props.updatedAt
    });

    if (!authoringAggregateResult.ok) {
      return err(authoringAggregateResult.error);
    }

    const authoringAggregate = authoringAggregateResult.value;
    const actor: AuthoringActor = { profileId: this.props.createdBy, role: "leader" };
    const replaceResult = authoringAggregate.replaceElements(
      mapToolElementsToDefinitionElements(elements, this.props.authoring),
      actor
    );

    if (!replaceResult.ok) {
      return err(replaceResult.error);
    }

    const nextDefinition = authoringAggregate.toDefinition();
    const nextIssues = computeAuthoringIssues(nextDefinition);

    if (!elementsAlignWithDefinition(elements, nextDefinition.elements)) {
      return err("Authoring definition elements do not match provided tool elements");
    }

    this.props = {
      ...this.props,
      elements: elements.map((element) => ({
        id: element.id,
        name: element.name,
        type: element.type,
        config: { ...element.config }
      })),
      authoring: cloneDefinition(nextDefinition),
      authoringIssues: nextIssues,
      updatedAt: new Date()
    };

    return ok(undefined);
  }

  attachEventToElement(elementId: string, eventId: string | null): Result<void> {
    if (this.props.status !== "draft") {
      return err("Cannot modify elements once the tool is published");
    }

    const authoringAggregateResult = ToolDefinitionAggregate.rehydrate({
      definition: this.props.authoring,
      updatedAt: this.props.updatedAt
    });
    if (!authoringAggregateResult.ok) {
      return err(authoringAggregateResult.error);
    }

    const authoringAggregate = authoringAggregateResult.value;
    const actor: AuthoringActor = { profileId: this.props.createdBy, role: "leader" };

    const updatedElements = this.props.authoring.elements.map((el) =>
      el.id === elementId ? { ...el, attachedEventId: eventId ?? null } : { ...el }
    );

    const replaceResult = authoringAggregate.replaceElements(updatedElements, actor);
    if (!replaceResult.ok) {
      return err(replaceResult.error);
    }

    const nextDefinition = authoringAggregate.toDefinition();
    const nextIssues = computeAuthoringIssues(nextDefinition);

    this.props = {
      ...this.props,
      authoring: cloneDefinition(nextDefinition),
      authoringIssues: nextIssues,
      updatedAt: new Date()
    };

    return ok(undefined);
  }

  publish(): Result<void> {
    return err("Use publishWithStage");
  }

  publishWithStage(stage: "limited_run" | "certified", now: Date): Result<void> {
    if (this.props.elements.length === 0) {
      return err("Tools must contain at least one element before publishing");
    }

    if (stage === "limited_run") {
      if (this.props.status !== "draft" && this.props.status !== "limited_run") {
        return err("Limited run only supports draft tools");
      }

      const limitedRunEndsAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      const publishedAt = this.props.publishedAt ?? now;
      const nextVersion = this.props.status === "draft" ? this.props.version + 1 : this.props.version;

      this.props = {
        ...this.props,
        status: "limited_run",
        limitedRunEndsAt,
        publishedAt,
        version: nextVersion,
        updatedAt: now,
        authoring: {
          ...this.props.authoring,
          version: formatAuthoringVersion(nextVersion)
        }
      };

      this.domainEvents.push({
        type: "ToolPublished",
        payload: {
          toolId: this.props.id,
          stage,
          publishedAt,
          limitedRunEndsAt,
          version: nextVersion
        }
      });

      return ok(undefined);
    }

    if (stage === "certified") {
      if (this.props.status !== "limited_run") {
        return err("Only limited run tools can be certified");
      }

      const publishedAt = this.props.publishedAt ?? now;
      this.props = {
        ...this.props,
        status: "certified",
        limitedRunEndsAt: undefined,
        publishedAt,
        updatedAt: now,
        authoring: {
          ...this.props.authoring,
          version: formatAuthoringVersion(this.props.version)
        }
      };

      this.domainEvents.push({
        type: "ToolPublished",
        payload: {
          toolId: this.props.id,
          stage,
          publishedAt,
          limitedRunEndsAt: undefined,
          version: this.props.version
        }
      });

      return ok(undefined);
    }

    return err("Unsupported publish stage");
  }

  recordTestResult(meta: { runAt: Date; blockingIssueCount: number; health: ToolTestHealth }): void {
    this.props = {
      ...this.props,
      lastTest: {
        lastRunAt: meta.runAt,
        blockingIssueCount: meta.blockingIssueCount,
        health: meta.health
      },
      updatedAt: new Date()
    };
  }

  archive(): Result<void> {
    if (this.props.status === "archived") {
      return ok(undefined);
    }

    this.props = {
      ...this.props,
      status: "archived",
      updatedAt: new Date()
    };

    return ok(undefined);
  }

  updateVisibility(visibility: ToolVisibility): Result<void> {
    if (this.props.status !== "limited_run" && this.props.status !== "certified" && (visibility === "campus" || visibility === "public")) {
      return err("Draft tools cannot be made campus or public visible before publishing");
    }

    this.props = {
      ...this.props,
      visibility,
      updatedAt: new Date()
    };

    this.domainEvents.push({
      type: "ToolVisibilityUpdated",
      payload: {
        toolId: this.props.id,
        visibility
      }
    });

    return ok(undefined);
  }

  deployToSpaces(spaceIds: readonly string[]): Result<void> {
    if (this.props.status !== "limited_run" && this.props.status !== "certified") {
      return err("Only published tools can be deployed");
    }

    const uniqueIds = Array.from(new Set([...this.props.deployedTo, ...spaceIds]));
    const pins = { ...this.props.deploymentPins };
    for (const spaceId of spaceIds) {
      if (!pins[spaceId]) {
        pins[spaceId] = this.props.version;
      }
    }
    this.props = {
      ...this.props,
      deployedTo: uniqueIds,
      deploymentPins: pins,
      updatedAt: new Date()
    };

    this.domainEvents.push({
      type: "ToolDeployed",
      payload: {
        toolId: this.props.id,
        spaceIds: uniqueIds
      }
    });

    return ok(undefined);
  }

  synchronizeDeployments(spaceIds: readonly string[]): Result<void> {
    if (this.props.status !== "limited_run" && this.props.status !== "certified") {
      return err("Only published tools can be reconciled");
    }

    const uniqueIds = Array.from(new Set(spaceIds));
    const pins = uniqueIds.reduce<Record<string, number>>((acc, spaceId) => {
      const existing = this.props.deploymentPins[spaceId];
      if (existing) {
        acc[spaceId] = existing;
      } else {
        acc[spaceId] = this.props.version;
      }
      return acc;
    }, {});
    this.props = {
      ...this.props,
      deployedTo: uniqueIds,
      deploymentPins: pins,
      updatedAt: new Date()
    };

    this.domainEvents.push({
      type: "ToolDeployed",
      payload: {
        toolId: this.props.id,
        spaceIds: uniqueIds
      }
    });

    return ok(undefined);
  }

  recordUse(profileId: string): Result<void> {
    this.props = {
      ...this.props,
      analytics: {
        ...this.props.analytics,
        uses: this.props.analytics.uses + 1
      },
      updatedAt: new Date()
    };

    this.domainEvents.push({
      type: "ToolUsageRecorded",
      payload: {
        toolId: this.props.id,
        profileId
      }
    });

    return ok(undefined);
  }
}
