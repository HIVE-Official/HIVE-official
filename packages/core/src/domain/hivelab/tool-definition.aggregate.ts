// Bounded Context Owner: HiveLab Guild
// Authoring aggregate enforcing ToolDefinition policies prior to runtime/storage.
// Specs referenced:
// - docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md:279
// - docs/design/hivelab/LAB_SPACES_INTEGRATION_CONTRACT.md:12
// - docs/design/hivelab/ELEMENTS_V1_PRIMITIVES.md:1

import { err, ok, type Result } from "../../shared/result";
import {
  type ToolDefinition,
  toolDefinitionSchema,
  boardModeSchema
} from "../../hivelab/contracts";
import {
  MAX_TOOL_FIELDS,
  countFieldsUsed,
  type ElementCatalogLookup
} from "../../hivelab/authoring-utils";
import { lookupElementDefinition } from "../../hivelab/catalog";

export type AuthoringRole = "leader" | "staff" | "member";

export interface AuthoringActor {
  readonly profileId: string;
  readonly role: AuthoringRole;
}

interface ToolDefinitionState {
  readonly definition: ToolDefinition;
  readonly updatedAt: Date;
}

const DEFAULT_DEFINITION: ToolDefinition = {
  slug: "",
  version: "draft",
  title: "",
  emoji: undefined,
  audience: "members",
  placement: {
    start: false,
    live: true,
    board: "off",
    dock: false
  },
  time: undefined,
  elements: [],
  settings: {
    reminders: {},
    anonymous: false,
    quietReports: true,
    overflow: "attach_under_latest"
  }
};

const AUDIENCE_TRANSITIONS: Record<ToolDefinition["audience"], readonly ToolDefinition["audience"][]> = {
  members: ["mixed", "leaders"],
  mixed: ["members", "leaders"],
  leaders: ["mixed", "members"]
} as const;

export class ToolDefinitionAggregate {
  private state: ToolDefinitionState;
  private readonly lookup: ElementCatalogLookup;

  private constructor(
    state: ToolDefinitionState,
    lookup: ElementCatalogLookup
  ) {
    this.state = {
      definition: sanitizeDefinition(state.definition),
      updatedAt: new Date(state.updatedAt)
    };
    this.lookup = lookup;
  }

  static create(input: {
    readonly actor: AuthoringActor;
    readonly definition?: Partial<ToolDefinition>;
    readonly lookup?: ElementCatalogLookup;
    readonly clock?: () => Date;
  }): Result<ToolDefinitionAggregate> {
    if (input.actor.role !== "leader") {
      return err("FORBIDDEN");
    }

    const clock = input.clock ?? (() => new Date());
    const lookup = input.lookup ?? lookupElementDefinition;
    const merged = mergeDefinition(DEFAULT_DEFINITION, input.definition);
    const parse = toolDefinitionSchema.safeParse(merged);
    if (!parse.success) {
      return err(parse.error.message);
    }

    const aggregate = new ToolDefinitionAggregate(
      {
        definition: parse.data,
        updatedAt: clock()
      },
      lookup
    );

    const validation = aggregate.validateState(parse.data);
    if (!validation.ok) {
      return err(validation.error);
    }

    return ok(aggregate);
  }

  static rehydrate(input: {
    readonly definition: ToolDefinition;
    readonly updatedAt: Date;
    readonly lookup?: ElementCatalogLookup;
  }): Result<ToolDefinitionAggregate> {
    const lookup = input.lookup ?? lookupElementDefinition;
    const parse = toolDefinitionSchema.safeParse(input.definition);
    if (!parse.success) {
      return err(parse.error.message);
    }

    const aggregate = new ToolDefinitionAggregate(
      {
        definition: parse.data,
        updatedAt: input.updatedAt
      },
      lookup
    );

    const validation = aggregate.validateState(parse.data);
    if (!validation.ok) {
      return err(validation.error);
    }

    return ok(aggregate);
  }

  toDefinition(): ToolDefinition {
    return sanitizeDefinition(this.state.definition);
  }

  getUpdatedAt(): Date {
    return new Date(this.state.updatedAt);
  }

  setAudience(audience: ToolDefinition["audience"], actor: AuthoringActor): Result<void> {
    const roleCheck = this.ensureLeader(actor);
    if (!roleCheck.ok) {
      return roleCheck;
    }

    const current = this.state.definition.audience;
    if (audience === current) {
      return ok(undefined);
    }

    const allowed = AUDIENCE_TRANSITIONS[current] ?? [];
    if (!allowed.includes(audience)) {
      return err(`Cannot change audience from ${current} to ${audience}`);
    }

    return this.commit(
      {
        ...this.state.definition,
        audience
      },
      actor
    );
  }

  updatePlacement(
    placement: ToolDefinition["placement"],
    actor: AuthoringActor
  ): Result<void> {
    const roleCheck = this.ensureLeader(actor);
    if (!roleCheck.ok) {
      return roleCheck;
    }

    const parsed = boardModeSchema.safeParse(placement.board);
    if (!parsed.success) {
      return err(parsed.error.message);
    }

    return this.commit(
      {
        ...this.state.definition,
        placement: {
          start: placement.start,
          live: placement.live,
          board: parsed.data,
          dock: placement.dock
        }
      },
      actor
    );
  }

  setTime(time: ToolDefinition["time"], actor: AuthoringActor): Result<void> {
    const roleCheck = this.ensureLeader(actor);
    if (!roleCheck.ok) {
      return roleCheck;
    }

    return this.commit(
      {
        ...this.state.definition,
        time: time ? { finishBy: time.finishBy } : undefined
      },
      actor
    );
  }

  replaceElements(
    elements: ToolDefinition["elements"],
    actor: AuthoringActor
  ): Result<void> {
    const roleCheck = this.ensureLeader(actor);
    if (!roleCheck.ok) {
      return roleCheck;
    }

    if (elements.length === 0) {
      return err("Tools require at least one element");
    }

    return this.commit(
      {
        ...this.state.definition,
        elements: elements.map((element) => ({
          id: element.id,
          config: { ...element.config },
          attachedEventId: element.attachedEventId ?? null
        }))
      },
      actor
    );
  }

  updateSettings(settings: ToolDefinition["settings"], actor: AuthoringActor): Result<void> {
    const roleCheck = this.ensureLeader(actor);
    if (!roleCheck.ok) {
      return roleCheck;
    }

    return this.commit(
      {
        ...this.state.definition,
        settings: {
          reminders: { ...settings.reminders },
          anonymous: settings.anonymous,
          quietReports: settings.quietReports ?? true,
          overflow: settings.overflow
        }
      },
      actor
    );
  }

  setMetadata(
    metadata: Pick<ToolDefinition, "slug" | "title" | "emoji" | "version">,
    actor: AuthoringActor
  ): Result<void> {
    const roleCheck = this.ensureLeader(actor);
    if (!roleCheck.ok) {
      return roleCheck;
    }

    if (!metadata.slug.trim()) {
      return err("Slug is required");
    }
    if (!metadata.title.trim()) {
      return err("Title is required");
    }

    return this.commit(
      {
        ...this.state.definition,
        slug: metadata.slug.trim(),
        title: metadata.title.trim(),
        emoji: metadata.emoji,
        version: metadata.version ?? this.state.definition.version
      },
      actor
    );
  }

  private commit(next: ToolDefinition, _actor: AuthoringActor): Result<void> {
    const parse = toolDefinitionSchema.safeParse(next);
    if (!parse.success) {
      return err(parse.error.message);
    }

    const validation = this.validateState(parse.data);
    if (!validation.ok) {
      return err(validation.error);
    }

    this.state = {
      definition: sanitizeDefinition(parse.data),
      updatedAt: new Date()
    };

    return ok(undefined);
  }

  private ensureLeader(actor: AuthoringActor): Result<void> {
    if (actor.role !== "leader") {
      return err("FORBIDDEN");
    }
    return ok(undefined);
  }

  private validateState(definition: ToolDefinition): Result<void> {
    const catalogMatches = [];
    for (const element of definition.elements) {
      const match = this.lookup(element.id);
      if (!match) {
        return err(`Unknown element: ${element.id}`);
      }
      if (element.attachedEventId && match.extends !== "events") {
        return err(`Element ${element.id} does not support event attachments`);
      }
      catalogMatches.push(match);
    }

    const fieldsCount = countFieldsUsed(definition, this.lookup);
    if (fieldsCount > MAX_TOOL_FIELDS) {
      return err(`Tools support up to ${MAX_TOOL_FIELDS} fields`);
    }

    if (definition.elements.length === 0) {
      return err("Tools require at least one element");
    }

    if (definition.placement.start && definition.audience === "leaders") {
      return err("Start placement requires a member-facing audience");
    }

    if (definition.placement.dock && !definition.placement.live) {
      return err("Docking Live area requires live placement enabled");
    }

    const hasPII = catalogMatches.some((match) => match.pii === true);
    if (hasPII && definition.settings.anonymous === true) {
      return err("PII elements block anonymous responses");
    }

    const leaderOnly = catalogMatches.filter((match) => match.capabilities?.includes("leaders"));
    if (leaderOnly.length > 0 && definition.audience === "members") {
      const ids = leaderOnly.map((match) => match.id).join(", ");
      return err(`Leader-only elements require mixed or leaders audience: ${ids}`);
    }

    return ok(undefined);
  }
}

const sanitizeDefinition = (definition: ToolDefinition): ToolDefinition => ({
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
  elements: definition.elements.map((element) => ({
    id: element.id,
    config: { ...element.config },
    attachedEventId: element.attachedEventId ?? null
  })),
  settings: {
    reminders: { ...definition.settings.reminders },
    anonymous: definition.settings.anonymous,
    quietReports: definition.settings.quietReports ?? true,
    overflow: definition.settings.overflow
  }
});

const mergeDefinition = (
  base: ToolDefinition,
  override: Partial<ToolDefinition> | undefined
): ToolDefinition => {
  if (!override) {
    return sanitizeDefinition(base);
  }

  return sanitizeDefinition({
    ...base,
    ...override,
    placement: override.placement
      ? {
          start: override.placement.start ?? base.placement.start,
          live: override.placement.live ?? base.placement.live,
          board: override.placement.board ?? base.placement.board,
          dock: override.placement.dock ?? base.placement.dock
        }
      : base.placement,
    time: override.time ? { finishBy: override.time.finishBy } : base.time,
    elements: override.elements ?? base.elements,
    settings: override.settings
      ? {
          reminders: { ...base.settings.reminders, ...override.settings.reminders },
          anonymous: override.settings.anonymous ?? base.settings.anonymous,
          quietReports: override.settings.quietReports ?? base.settings.quietReports,
          overflow: override.settings.overflow ?? base.settings.overflow
        }
      : base.settings
  });
};
