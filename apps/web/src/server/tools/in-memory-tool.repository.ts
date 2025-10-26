// Bounded Context Owner: HiveLab Guild
import {
  ToolAggregate,
  type ToolRepository,
  type ToolSnapshot
} from "@core";

const cloneSnapshot = (snapshot: ToolSnapshot): ToolSnapshot => ({
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
    elements: snapshot.authoring.elements.map((element) => ({
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
  authoringIssues: (snapshot.authoringIssues ?? []).map((issue) => ({
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
  deployedTo: [...snapshot.deployedTo],
  deploymentPins: { ...(snapshot.deploymentPins ?? {}) }
});

export class InMemoryToolRepository implements ToolRepository {
  private readonly store = new Map<string, ToolSnapshot>();

  constructor(initialTools: readonly ToolSnapshot[] = []) {
    initialTools.forEach((tool) => {
      this.store.set(tool.id, cloneSnapshot(tool));
    });
  }

  findById(toolId: string): Promise<ToolAggregate | null> {
    const snapshot = this.store.get(toolId);
    if (!snapshot) {
      return Promise.resolve(null);
    }
    return Promise.resolve(ToolAggregate.rehydrate(cloneSnapshot(snapshot)));
  }

  listByCreator(profileId: string): Promise<ToolAggregate[]> {
    const out = Array.from(this.store.values())
      .filter((tool) => tool.createdBy === profileId)
      .map((snapshot) => ToolAggregate.rehydrate(cloneSnapshot(snapshot)));
    return Promise.resolve(out);
  }

  listByCampus(campusId: string): Promise<ToolAggregate[]> {
    const out = Array.from(this.store.values())
      .filter((tool) => tool.campusId === campusId)
      .map((snapshot) => ToolAggregate.rehydrate(cloneSnapshot(snapshot)));
    return Promise.resolve(out);
  }

  listBySpace(spaceId: string): Promise<ToolAggregate[]> {
    const out = Array.from(this.store.values())
      .filter((tool) => tool.spaceId === spaceId)
      .map((snapshot) => ToolAggregate.rehydrate(cloneSnapshot(snapshot)));
    return Promise.resolve(out);
  }

  listAll(): Promise<ToolAggregate[]> {
    const out = Array.from(this.store.values()).map((snapshot) =>
      ToolAggregate.rehydrate(cloneSnapshot(snapshot))
    );
    return Promise.resolve(out);
  }

  save(tool: ToolAggregate): Promise<void> {
    this.store.set(tool.getId(), cloneSnapshot(tool.toSnapshot()));
    return Promise.resolve();
  }

  listLimitedRunExpiring(reference: Date, limit = 100): Promise<ToolAggregate[]> {
    const matched = Array.from(this.store.values())
      .filter((snapshot) => snapshot.status === "limited_run" && snapshot.limitedRunEndsAt && snapshot.limitedRunEndsAt <= reference)
      .sort((a, b) => (a.limitedRunEndsAt?.getTime() ?? 0) - (b.limitedRunEndsAt?.getTime() ?? 0))
      .slice(0, limit);

    return Promise.resolve(matched.map((snapshot) => ToolAggregate.rehydrate(cloneSnapshot(snapshot))));
  }
}
