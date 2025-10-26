// Bounded Context Owner: HiveLab Guild
import { lookupElementDefinition } from "@core";
import { toolService } from "./service";
import { getSpaceCalendar } from "../spaces/service";

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_WINDOW_DAYS = 7;
const MAX_WINDOW_DAYS = 30;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export interface SearchAttachableEventsInput {
  readonly spaceId: string;
  readonly toolId: string;
  readonly elementId: string;
  readonly profileId: string;
  readonly query?: string | null;
  readonly cursor?: string | null;
  readonly windowDays?: number | null;
  readonly limit?: number | null;
}

export interface AttachableEvent {
  readonly id: string;
  readonly title: string;
  readonly startAt: string;
  readonly endAt: string;
  readonly location: string | null;
}

export interface SearchAttachableEventsResult {
  readonly events: readonly AttachableEvent[];
  readonly window: { readonly start: string; readonly end: string };
  readonly nextCursor: string | null;
}

export type SearchAttachableEventsResponse =
  | { ok: true; data: SearchAttachableEventsResult; toolVersion: number }
  | { ok: false; error: string; status: number };

export async function searchAttachableEvents(
  input: SearchAttachableEventsInput
): Promise<SearchAttachableEventsResponse> {
  const toolResult = await toolService.getTool(input.toolId);
  if (!toolResult.ok) {
    return { ok: false, error: "TOOL_NOT_FOUND", status: 404 };
  }

  const tool = toolResult.value;
  if (tool.spaceId && tool.spaceId !== input.spaceId) {
    return { ok: false, error: "TOOL_SPACE_MISMATCH", status: 400 };
  }

  const hasManageAccess =
    tool.createdBy === input.profileId || tool.permissions.canEdit.includes(input.profileId);
  if (!hasManageAccess) {
    return { ok: false, error: "FORBIDDEN", status: 403 };
  }

  const element = tool.authoring.elements.find((candidate) => candidate.id === input.elementId);
  if (!element) {
    return { ok: false, error: "ELEMENT_NOT_FOUND", status: 400 };
  }

  const elementDefinition = lookupElementDefinition(input.elementId);
  if (!elementDefinition || elementDefinition.extends !== "events") {
    return { ok: false, error: "ELEMENT_NOT_EVENT", status: 400 };
  }

  const windowDays = clamp(
    typeof input.windowDays === "number" ? Math.floor(input.windowDays) : DEFAULT_WINDOW_DAYS,
    1,
    MAX_WINDOW_DAYS
  );
  const limit = clamp(
    typeof input.limit === "number" ? Math.floor(input.limit) : DEFAULT_LIMIT,
    1,
    MAX_LIMIT
  );

  const now = new Date();
  const cursorDate = parseCursor(input.cursor, now);
  const windowEnd = new Date(now.getTime() + windowDays * DAY_MS);

  const calendar = await getSpaceCalendar(input.spaceId);

  const filtered = calendar.events
    .filter((event) => {
      const start = new Date(event.startAt);
      return start >= now && start <= windowEnd && start >= cursorDate;
    })
    .filter((event) => {
      if (!input.query) return true;
      const q = input.query.toLowerCase();
      return (
        event.title.toLowerCase().includes(q) ||
        (event.location ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  const page = filtered.slice(0, limit);
  const nextCursor = filtered.length > limit ? filtered[limit].startAt : null;

  return {
    ok: true,
    toolVersion: tool.version,
    data: {
      events: page.map((event) => ({
        id: event.id,
        title: event.title,
        startAt: event.startAt,
        endAt: event.endAt,
        location: event.location ?? null
      })),
      window: {
        start: now.toISOString(),
        end: windowEnd.toISOString()
      },
      nextCursor
    }
  };
}

function parseCursor(cursor: string | null | undefined, fallback: Date): Date {
  if (!cursor) return fallback;
  const parsed = new Date(cursor);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
