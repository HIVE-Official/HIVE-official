// Bounded Context Owner: HiveLab Guild
// Canonical contracts for HiveLab Elements and authoring (backend-first).
// Source specs:
// - docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md:1
// - docs/design/hivelab/ELEMENTS_V1_PRIMITIVES.md:1

import { z } from "zod";

// Slots (where an element can render)
export const slotSchema = z.enum([
  "post",
  "event_before",
  "event_during",
  "event_after",
  "calendar_badge",
  "calendar_panel",
  "members_badge",
  "digest_line",
  "anchor_timetable",
  "profile_overlay"
]);
export type Slot = z.infer<typeof slotSchema>;

// Operators (universal switches)
export const operatorSchema = z.enum([
  "TTL",
  "GateByLabel",
  "VisibilityWindow",
  "DigestContribution",
  "ModerationMode",
  "LightMode"
]);
export type Operator = z.infer<typeof operatorSchema>;

// Canonical records (writes)
export const writeKindSchema = z.enum([
  "form_submission",
  "vote",
  "file_metadata",
  "acknowledge",
  "slot_claim",
  "checkin",
  "checkout",
  "counter_tick",
  "kudos",
  "task",
  "label",
  "member_label",
  "pairing",
  "checkout(equipment)",
  "checkin(equipment)",
  "invite_use",
  "cohost_request",
  "cohost_accept",
  "media_upload",
  "kb_article",
  "announcement",
  "service_request",
  "queue_join",
  "queue_serve",
  "case",
  "referral",
  "training_complete",
  "program_enroll",
  "program_step_complete",
  "risk_ack",
  "guest_invite",
  "guest_checkin",
  "ratio_snapshot",
  "capacity_event",
  "incident",
  "escalation",
  "pnm",
  "pnm_rating",
  "bid",
  "hearing",
  "sanction",
  "sub_space",
  "sub_space_membership",
  "pulse",
  "space_panel_config",
  "class_meeting",
  "class_membership",
  "busy_block",
  "fit_prefs",
  "soft_hold",
  "free_window"
]);
export type WriteKind = z.infer<typeof writeKindSchema>;

// Minimal tile metadata used by the Elements panel (matches IA spec §10)
export const elementTileSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  purpose: z.string().max(80),
  max_fields: z.number().int().positive(),
  placement: z.object({
    start: z.boolean(),
    live: z.boolean(),
    board: z.boolean(),
    calendar: z.boolean()
  }),
  audience_default: z.enum(["members", "leaders"]),
  pii: z.boolean(),
  extends: z.union([z.literal("events"), z.null()]).optional(),
  synonyms: z.array(z.string()).default([]),
  starter_combos: z.array(z.string()).default([]),
  horizons: z
    .object({
      preview: z.boolean(),
      requests: z.number().int().nonnegative(),
      supports: z.number().int().nonnegative(),
      campus_beta: z.boolean().optional()
    })
    .optional()
});
export type ElementTile = z.infer<typeof elementTileSchema>;

// Full primitive definition for backend authoring + lints (from Elements v1 doc)
export const elementDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  purpose: z.string(),
  slots: z.array(slotSchema),
  writes: z.array(writeKindSchema),
  // Optional descriptive fields for docs and lints
  config: z.record(z.string(), z.unknown()).optional(),
  outputs: z.array(z.string()).optional(),
  guardrails: z.array(z.string()).optional(),
  capabilities: z.array(z.string()).optional(),
  native: z.string().optional(),
  adaptation: z.string().optional(),
  pii: z.boolean().optional(),
  extends: z.union([z.literal("events"), z.null()]).optional(),
  maxFields: z.number().int().positive().optional(),
  synonyms: z.array(z.string()).optional()
});
export type ElementDefinition = z.infer<typeof elementDefinitionSchema>;

export const elementCatalogSchema = z.array(elementDefinitionSchema);
export type ElementCatalog = z.infer<typeof elementCatalogSchema>;

// Tool authoring definition (matches IA §10)
export const boardModeSchema = z.enum(["off", "on_input", "recap_only"]);
export type BoardMode = z.infer<typeof boardModeSchema>;

export const toolDefinitionSchema = z.object({
  slug: z.string(),
  version: z.string(),
  title: z.string(),
  emoji: z.string().optional(),
  audience: z.enum(["members", "leaders", "mixed"]),
  placement: z.object({
    start: z.boolean(),
    live: z.boolean(),
    board: boardModeSchema,
    dock: z.boolean()
  }),
  time: z.object({ finishBy: z.string().datetime().optional() }).optional(),
  elements: z.array(
    z.object({
      id: z.string(),
      config: z.record(z.string(), z.unknown()),
      attachedEventId: z.string().nullable().optional()
    })
  ),
  settings: z.object({
    reminders: z.object({
      h24: z.boolean().optional(),
      start: z.boolean().optional(),
      afterClose: z.boolean().optional(),
      m10: z.boolean().optional()
    }),
    anonymous: z.boolean().optional(),
    quietReports: z.boolean().optional(),
    overflow: z.enum(["state", "attach_under_latest"]) 
  })
});
export type ToolDefinition = z.infer<typeof toolDefinitionSchema>;

// Lint issues with optional auto-fix action
export const lintIssueSchema = z.object({
  id: z.string(),
  severity: z.enum(["block", "warn"]),
  message: z.string(),
  autofix: z
    .object({
      label: z.string(),
      action: z.string(),
      payload: z.unknown().optional()
    })
    .optional()
});
export type LintIssue = z.infer<typeof lintIssueSchema>;

// Runtime + publish contracts bridging Lab → Spaces
export const toolPublishStatusSchema = z.enum(["draft", "limited_run", "certified"]);
export type ToolPublishStatus = z.infer<typeof toolPublishStatusSchema>;

export const toolRuntimePlacementSchema = z.object({
  start: z.boolean(),
  live: z.boolean(),
  board: boardModeSchema,
  calendar: z.boolean()
});
export type ToolRuntimePlacement = z.infer<typeof toolRuntimePlacementSchema>;

export const toolRuntimeSnapshotSchema = z.object({
  toolId: z.string(),
  version: z.string(),
  status: toolPublishStatusSchema,
  limited_run_ends_at: z.string().datetime().optional(),
  placement: toolRuntimePlacementSchema,
  audience: z.enum(["members", "leaders", "mixed"]),
  dock: z.boolean(),
  fieldsCount: z.number().int().nonnegative(),
  hasPII: z.boolean(),
  attachedEventId: z.string().nullable().optional()
});
export type ToolRuntimeSnapshot = z.infer<typeof toolRuntimeSnapshotSchema>;
