// Bounded Context Owner: HiveLab Guild
import {
  ToolAggregate,
  type ToolDefinition,
  type LintIssue,
  type ToolRepository,
  type ToolSnapshot,
  type ToolVisibility,
  type ToolStatus
} from "@core";
import { lintToolDefinition } from "@core/hivelab/lint";
import { lookupElementDefinition } from "@core/hivelab/catalog";
import { firebaseFirestore } from "@hive/firebase";

const toolsCollection = () => firebaseFirestore().collection("tools");

const toDate = (value: unknown): Date => {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  const maybeTs = value as { toDate?: () => Date };
  if (maybeTs?.toDate) return maybeTs.toDate();
  return new Date(value as string);
};

const snapshotFromDoc = (data: Record<string, unknown>, id: string): ToolSnapshot => {
  const elements = (Array.isArray(data.elements) ? data.elements : []).map((el: Record<string, unknown>) => ({
    id: typeof el.id === "string" ? el.id : "",
    name: typeof el.name === "string" ? el.name : (typeof el.id === "string" ? el.id : ""),
    type: typeof el.type === "string" ? el.type : "element",
    config: { ...((el.config as Record<string, unknown> | undefined) ?? {}) }
  }));

  const authoringDefinition = deserializeAuthoringDefinition(data.authoring, {
    id,
    name: typeof data.name === "string" ? data.name : id,
    icon: (data.icon as string | undefined) ?? undefined,
    version: Number((data.version as number | string | undefined) ?? 0),
    elements
  });

  const authoringIssues = Array.isArray(data.authoringIssues)
    ? deserializeAuthoringIssues(data.authoringIssues as Array<unknown>)
    : lintToolDefinition(authoringDefinition, lookupElementDefinition);

  const snapshot: ToolSnapshot = {
    id,
    name: typeof data.name === "string" ? data.name : id,
    description: typeof data.description === "string" ? data.description : "",
    icon: (data.icon as string | undefined) ?? undefined,
    createdBy: typeof data.createdBy === "string" ? data.createdBy : "unknown",
    campusId: typeof data.campusId === "string" ? data.campusId : "",
    spaceId: (data.spaceId as string | undefined) ?? undefined,
    status: (typeof data.status === "string" ? data.status : "draft") as ToolStatus,
    limitedRunEndsAt: data.limitedRunEndsAt ? toDate(data.limitedRunEndsAt) : undefined,
    visibility: (typeof data.visibility === "string" ? data.visibility : "private") as ToolVisibility,
    elements,
    authoring: authoringDefinition,
    authoringIssues,
    permissions: {
      canFork: Boolean((data.permissions as Record<string, unknown> | undefined)?.canFork ?? true),
      canEdit: Array.isArray((data.permissions as Record<string, unknown> | undefined)?.canEdit)
        ? [
            ...(((data.permissions as Record<string, unknown>).canEdit as Array<unknown>) ?? []).map((x) => String(x))
          ]
        : [],
      requiresApproval: Boolean((data.permissions as Record<string, unknown> | undefined)?.requiresApproval ?? false)
    },
    analytics: {
      uses: Number((data.analytics as Record<string, unknown> | undefined)?.uses ?? 0),
      forks: Number((data.analytics as Record<string, unknown> | undefined)?.forks ?? 0),
      rating: Number((data.analytics as Record<string, unknown> | undefined)?.rating ?? 0)
    },
    deployedTo: Array.isArray(data.deployedTo) ? [...(data.deployedTo as Array<string>)] : [],
    deploymentPins: typeof data.deploymentPins === "object" && data.deploymentPins
      ? Object.entries(data.deploymentPins as Record<string, unknown>).reduce<Record<string, number>>(
          (acc, [spaceId, version]) => {
            const parsed = Number(version);
            if (Number.isFinite(parsed)) {
              acc[spaceId] = parsed;
            }
            return acc;
          },
          {}
        )
      : {},
    createdAt: toDate(data.createdAt ?? Date.now()),
    updatedAt: toDate(data.updatedAt ?? Date.now()),
    publishedAt: data.publishedAt ? toDate(data.publishedAt) : undefined,
    version: Number((data.version as number | string | undefined) ?? 0),
    lastTest: data.lastTest
      ? {
          health: ((): "looks_good" | "heads_up" | "fix_required" => {
            const h = (data.lastTest as Record<string, unknown>).health as string | undefined;
            return h === "looks_good" || h === "heads_up" || h === "fix_required" ? h : "heads_up";
          })(),
          blockingIssueCount: Number((data.lastTest as Record<string, unknown>).blockingIssueCount ?? 0),
          lastRunAt: (data.lastTest as Record<string, unknown>).lastRunAt ? toDate((data.lastTest as Record<string, unknown>).lastRunAt) : undefined
        }
      : undefined
  };
  return snapshot;
};

export class FirestoreToolRepository implements ToolRepository {
  async findById(toolId: string) {
    const doc = await toolsCollection().doc(toolId).get();
    if (!doc.exists) return null;
    return ToolAggregate.rehydrate(snapshotFromDoc(doc.data() as Record<string, unknown>, doc.id));
  }

  async listByCreator(profileId: string) {
    const query = await toolsCollection().where("createdBy", "==", profileId).get();
    return query.docs.map((doc) => ToolAggregate.rehydrate(snapshotFromDoc(doc.data() as Record<string, unknown>, doc.id)));
  }

  async listByCampus(campusId: string) {
    const query = await toolsCollection().where("campusId", "==", campusId).get();
    return query.docs.map((doc) => ToolAggregate.rehydrate(snapshotFromDoc(doc.data() as Record<string, unknown>, doc.id)));
  }

  async listBySpace(spaceId: string) {
    const query = await toolsCollection().where("spaceId", "==", spaceId).get();
    return query.docs.map((doc) => ToolAggregate.rehydrate(snapshotFromDoc(doc.data() as Record<string, unknown>, doc.id)));
  }

  async listAll() {
    const query = await toolsCollection().get();
    return query.docs.map((doc) => ToolAggregate.rehydrate(snapshotFromDoc(doc.data() as Record<string, unknown>, doc.id)));
  }

  async save(tool: ToolAggregate) {
    const s = tool.toSnapshot();
    await toolsCollection().doc(s.id).set(
      {
        id: s.id,
        name: s.name,
        description: s.description,
        icon: s.icon ?? null,
        createdBy: s.createdBy,
        campusId: s.campusId,
        spaceId: s.spaceId ?? null,
        status: s.status,
        limitedRunEndsAt: s.limitedRunEndsAt ?? null,
        visibility: s.visibility,
        elements: s.elements.map((element) => ({
          id: element.id,
          name: element.name,
          type: element.type,
          config: element.config
        })),
        authoring: serializeAuthoringDefinition(s.authoring),
        authoringIssues: s.authoringIssues.map((issue) => ({
          id: issue.id,
          severity: issue.severity,
          message: issue.message,
          autofix: issue.autofix
            ? {
                label: issue.autofix.label,
                action: issue.autofix.action,
                payload: issue.autofix.payload ?? null
              }
            : null
        })),
        permissions: {
          canFork: s.permissions.canFork,
          canEdit: [...s.permissions.canEdit],
          requiresApproval: s.permissions.requiresApproval
        },
        analytics: { ...s.analytics },
        deployedTo: [...s.deployedTo],
        deploymentPins: { ...s.deploymentPins },
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        publishedAt: s.publishedAt ?? null,
        version: s.version,
        lastTest: s.lastTest
          ? {
              health: s.lastTest.health,
              blockingIssueCount: s.lastTest.blockingIssueCount,
              lastRunAt: s.lastTest.lastRunAt ?? null
            }
          : null
      },
      { merge: true }
    );
  }

  async listLimitedRunExpiring(reference: Date, limit = 100): Promise<ToolAggregate[]> {
    const query = await toolsCollection()
      .where("status", "==", "limited_run")
      .where("limitedRunEndsAt", "<=", reference)
      .orderBy("limitedRunEndsAt", "asc")
      .limit(limit)
      .get();

    return query.docs.map((doc) => ToolAggregate.rehydrate(snapshotFromDoc(doc.data(), doc.id)));
  }
}

interface AuthoringMeta {
  id: string;
  name: string;
  icon?: string;
  version: number;
  elements: ToolSnapshot["elements"];
}

const deserializeAuthoringDefinition = (
  value: unknown,
  meta: AuthoringMeta
): ToolDefinition => {
  if (value && typeof value === "object") {
    const data = value as Record<string, unknown>;
    const placement = data.placement as Record<string, unknown> | undefined;
    const time = data.time as Record<string, unknown> | undefined;
    const settings = data.settings as Record<string, unknown> | undefined;
    const elements = Array.isArray(data.elements)
      ? data.elements.map((element: Record<string, unknown>) => ({
          id: typeof element?.id === "string" ? element.id : "",
          config: { ...((element?.config as Record<string, unknown> | undefined) ?? {}) },
          attachedEventId: (element?.attachedEventId as string | null | undefined) ?? null
        }))
      : meta.elements.map((element) => ({
          id: element.id,
          config: { ...element.config },
          attachedEventId: null
        }));

    return {
      slug: typeof data.slug === "string" ? data.slug : meta.id,
      version: typeof data.version === "string" ? data.version : (meta.version > 0 ? `v${meta.version}` : "draft"),
      title: typeof data.title === "string" ? data.title : meta.name,
      emoji: (data.emoji ?? meta.icon) as string | undefined,
      audience: (data.audience as ToolDefinition["audience"]) ?? "members",
      placement: {
        start: Boolean(placement?.start ?? false),
        live: Boolean(placement?.live ?? true),
        board: (placement?.board as ToolDefinition["placement"]["board"]) ?? "off",
        dock: Boolean(placement?.dock ?? false)
      },
      time: time?.finishBy
        ? {
            finishBy:
              typeof time.finishBy === "string"
                ? time.finishBy
                : time.finishBy instanceof Date
                  ? time.finishBy.toISOString()
                  : new Date().toISOString()
          }
        : undefined,
      elements,
      settings: {
        reminders: {
          ...(settings?.reminders as Record<string, boolean | undefined> | undefined)
        },
        anonymous: settings?.anonymous === undefined ? false : Boolean(settings.anonymous),
        quietReports: settings?.quietReports === undefined ? true : Boolean(settings.quietReports),
        overflow: (settings?.overflow as ToolDefinition["settings"]["overflow"]) ?? "attach_under_latest"
      }
    };
  }

  return {
    slug: meta.id,
    version: meta.version > 0 ? `v${meta.version}` : "draft",
    title: meta.name,
    emoji: meta.icon,
    audience: "members",
    placement: {
      start: false,
      live: true,
      board: "off",
      dock: false
    },
    time: undefined,
    elements: meta.elements.map((element) => ({
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
  };
};

const serializeAuthoringDefinition = (definition: ToolDefinition) => ({
  slug: definition.slug,
  version: definition.version,
  title: definition.title,
  emoji: definition.emoji ?? null,
  audience: definition.audience,
  placement: {
    start: definition.placement.start,
    live: definition.placement.live,
    board: definition.placement.board,
    dock: definition.placement.dock
  },
  time: definition.time?.finishBy ? { finishBy: definition.time.finishBy } : null,
  elements: definition.elements.map((element) => ({
    id: element.id,
    config: element.config,
    attachedEventId: element.attachedEventId ?? null
  })),
  settings: {
    reminders: { ...(definition.settings.reminders ?? {}) },
    anonymous: definition.settings.anonymous ?? false,
    quietReports: definition.settings.quietReports ?? true,
    overflow: definition.settings.overflow
  }
});

const deserializeAuthoringIssues = (value: readonly unknown[]): LintIssue[] =>
  value.map((candidate) => {
    const record = candidate as Record<string, unknown>;
    const autofix = record.autofix as Record<string, unknown> | undefined;
    return {
      id: typeof record.id === "string" ? record.id : "",
      severity: record.severity === "block" ? "block" : "warn",
      message: typeof record.message === "string" ? record.message : "",
      autofix: autofix
        ? {
            label: typeof autofix.label === "string" ? autofix.label : "",
            action: typeof autofix.action === "string" ? autofix.action : "",
            payload: autofix.payload
          }
        : undefined
    } satisfies LintIssue;
  });
