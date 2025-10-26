# Canvas Shell Serializer Contract

Source specs: `docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md` (§1 IA, §4 Left Rail, §5 Right Dock, §§7–9 actions) and `docs/design/hivelab/SCENARIOS_CANVAS_SHELL.md`.

Goal: freeze the payload we return from `/api/lab/spaces/:spaceId/canvas` (new endpoint) so Storybook and future UI work can rely on a stable contract. This payload is produced server-side once leader authentication and policy checks succeed.

## Top-level payload

```ts
type CanvasShellPayload = {
  space: CanvasSpaceSummary;
  systemTiles: readonly CanvasSystemTile[];
  tools: readonly CanvasToolListItem[];
  drafts: CanvasDraftSummary;
  activeTool?: CanvasToolHome; // optional when landing without selection
  overlays: CanvasOverlayFlags;
  permissions: CanvasLeaderPermissions;
  telemetry: CanvasTelemetryContext;
  generatedAt: string; // ISO timestamp (server clock)
};
```

### Structures and sources

```ts
type CanvasSpaceSummary = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  campusId: string;
  isDefault: boolean; // first leader space used for /lab redirect
  recentTools: readonly string[]; // tool ids sorted by updatedAt desc for picker
};
// Source: Space service (`apps/web/src/server/spaces/service.ts`) plus redirect logic noted in spec §1.

type CanvasSystemTile = {
  id: "events" | "chat" | "about";
  state: "live" | "idle";
  extendsLabel?: string; // e.g., "Extends: Robotics Expo"
};
// Source: space surface status service (TODO) + spec §4.

type CanvasToolListItem = {
  id: string;
  name: string;
  icon: string | null;
  status: "live" | "idle" | "limited_run";
  limitedRunDaysRemaining?: number; // leaders-only chip ⏳
  placements: {
    start: boolean;
    live: boolean;
    board: "off" | "on_input" | "recap_only";
    manage: true; // implied for all
  };
  lastEditedAt: string;
};
// Source: ToolSnapshot + new placement summarizer (see `serializeToolForCatalog`).

type CanvasDraftSummary = {
  count: number;
  href: string; // `/lab/${spaceId}?drafts=1`
};
// Source: tool dashboard drafts count.

type CanvasOverlayFlags = {
  libraryOpen: boolean;
  runTestOpen: boolean;
  publishOpen: boolean;
  lintDrawerOpen: boolean;
  replacePickerOpen: boolean;
};
// Source: request query parsing (`?library=1`) per spec open decisions; hydrate server-side for SSR.

type CanvasLeaderPermissions = {
  canSwitchSpaces: boolean;
  canPublish: boolean;
  countdownVisible: boolean;
  requiresApproval: boolean;
};
// Source: ToolPermissionsPort + Firestore rules gating (leaders-only per `firestore.rules:135`).

type CanvasTelemetryContext = {
  spaceId: string;
  leaderId: string;
  surface: "canvas_shell";
};
// Source: `getToolTelemetry()` context injection; ensures `tile_*`, `settings.change/*`, `future.*` events share IDs.
```

## Tool Home contract

`activeTool` combines Tool Home and Manage (spec §1 center column, §7 action dock, §8 Run Test summary).

```ts
type CanvasToolHome = {
  tool: CanvasToolHeader;
  health: CanvasToolHealth;
  summary: CanvasToolSummary;
  placements: CanvasPlacementSummary;
  countdown?: CanvasCountdown;
  deployments: CanvasDeploymentSummary;
  lints: CanvasLintSummary;
  actions: CanvasActionState;
  telemetry: CanvasToolTelemetry;
};
```

### Header and health

```ts
type CanvasToolHeader = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  versionLabel: string; // e.g., "v3" or "draft"
  lastSavedAt: string; // ISO timestamp
};
// Source: ToolSnapshot (`name`, `description`, `icon`, `version`, `updatedAt`).

type CanvasToolHealth = {
  lastRunAt?: string;
  freshness: "fresh" | "stale"; // stale if >10m per publish gate
  health: "looks_good" | "heads_up" | "fix_required";
  blockingIssues: number;
  runTestHref: string; // `/lab/${spaceId}/tools/${toolId}/test`
};
// Source: ToolSnapshot.lastTest + publish gate logic (`apps/web/src/server/tools/run-test.ts`).
```

### Summary cards

```ts
type CanvasToolSummary = {
  projectedCompletions?: number;
  completionRate?: number;
  expectedBoardPosts?: number;
  expectedLiveInteractions?: number;
  ghostRoster?: readonly RunTestGhostRosterOption[];
  fastForward?: readonly RunTestFastForwardSnapshot[];
  attachStatus?: {
    attachedEventId: string | null;
    required: boolean;
  };
};
// Source: latest Run Test report (`packages/core/src/hivelab/runtime.ts` outputs) persisted alongside ToolSnapshot (TODO: add storage).
```

### Placements & countdown

```ts
type CanvasPlacementSummary = {
  audience: "members" | "leaders" | "mixed";
  placements: {
    start: boolean;
    live: boolean;
    board: "off" | "on_input" | "recap_only";
    calendar: boolean;
    dock: boolean;
  };
  elements: readonly {
    id: string;
    name: string;
    fieldsUsed: number;
    attachedEventId: string | null;
    pii: boolean;
    extendsEvents: boolean;
  }[];
  fieldsUsed: number;
  hasPII: boolean;
};
// Source: ToolSnapshot.authoring + element catalog metadata (`packages/core/src/hivelab/catalog.ts`).

type CanvasCountdown = {
  endsAt: string;
  daysRemaining: number;
  status: "limited_run";
};
// Visible only when ToolStatus = limited_run and leader has countdown access per Firestore rules.
```

### Deployments, lints, actions

```ts
type CanvasDeploymentSummary = {
  total: number;
  items: readonly {
    spaceId: string;
    spaceName: string;
    pinnedVersion: number | null;
    lastDeployedAt?: string;
  }[];
};
// Source: ToolSnapshot.deployedTo + deploymentPins + Space service lookup.

type CanvasLintSummary = {
  blocks: readonly CanvasLintIssue[];
  warnings: readonly CanvasLintIssue[];
};

type CanvasLintIssue = {
  id: string;
  message: string;
  autofix?: {
    label: string;
    action: string;
  };
};
// Source: ToolSnapshot.authoringIssues (already grouped).

type CanvasActionState = {
  canRunTest: boolean;
  canPublish: boolean;
  publishDisabledReason?: "stale_test" | "blocking_lints";
  publishHref: string;
  runTestHref: string;
  viewAsStudentHref: string;
};
// Source: publish gate logic + Routes in `apps/web/src/app/api/lab/spaces/...`.

type CanvasToolTelemetry = {
  interactionSurface: "tool_home";
  runTestEvent: string; // e.g., `run_test_click`
  publishEvent: string; // e.g., `publish_attempt`
};
// Source: telemetry sink contract (`packages/core/src/application/tools/ports/tool-telemetry.port.ts`).
```

## Implementation notes

1. **Repository updates** — Persist latest Run Test report snapshot so Tool Home can render without calling `/test` on load (spec §8).  
2. **Serializer module** — Add `apps/web/src/server/tools/serialize-canvas.ts` to assemble the payload, reusing `serializeTool`, `serializeToolForCatalog`, and new Space lookups.  
3. **API route** — Introduce `/api/lab/spaces/:spaceId/canvas` returning `CanvasShellPayload`. Gate with leader permissions before computing payload.  
4. **Tests** — Add contract snapshot tests in `packages/core/src/application/tools/tool.application.service.test.ts` and integration tests under `apps/web/src/test/unit` for the new API.  
5. **Telemetry** — Populate `CanvasTelemetryContext` from `getToolTelemetry()` once per request to avoid duplicating logic client-side.

This contract unlocks front-end Storybook work (`TODO.md` HiveLab Canvas UI section) while honoring backend-first execution. Freeze the payload once the above dependencies land, then proceed with UI scaffolding.
