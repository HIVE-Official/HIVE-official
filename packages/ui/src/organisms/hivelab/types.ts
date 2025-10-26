// Bounded Context Owner: HiveLab Guild
import type {
  RunTestFastForwardSnapshot,
  RunTestGhostRosterOption,
  RunTestReport
} from "@core";
export type HiveLabToolCategory = "automation" | "analytics" | "engagement" | "content" | "operations";

export const HIVELAB_CATEGORIES: readonly {
  readonly id: HiveLabToolCategory;
  readonly label: string;
  readonly description: string;
}[] = [
  { id: "automation", label: "Automation", description: "Schedulers, reminders, and digest generators" },
  { id: "analytics", label: "Analytics", description: "Dashboards and reporting surfaces" },
  { id: "engagement", label: "Engagement", description: "Polls, spotlights, and community rituals" },
  { id: "content", label: "Content", description: "Forms, libraries, and resource curation" },
  { id: "operations", label: "Operations", description: "Permissions, workflows, approvals" }
];

export type HiveLabToolStatus = "draft" | "live" | "paused" | "archived" | "needs-review";

export type HiveLabToolVisibility = "draft" | "campus" | "community" | "private";

export interface HiveLabToolMetrics {
  readonly runRate?: number;
  readonly completionRate?: number;
  readonly satisfaction?: number;
  readonly responders?: number;
}

export interface HiveLabToolSummary {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: HiveLabToolCategory;
  readonly status: HiveLabToolStatus;
  readonly visibility: HiveLabToolVisibility;
  readonly owner?: string;
  readonly updatedAt?: Date | string;
  readonly installs?: number;
  readonly activeDeploys?: number;
  readonly tags?: readonly string[];
  readonly metrics?: HiveLabToolMetrics;
  readonly sparkline?: readonly number[];
  readonly previewImage?: string;
}

export interface HiveLabTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: HiveLabToolCategory;
  readonly installCount: number;
  readonly rating: number;
  readonly updatedAt?: Date | string;
  readonly authorName: string;
  readonly authorAvatar?: string;
  readonly tags?: readonly string[];
  readonly complexity?: "starter" | "intermediate" | "advanced";
}

// Canvas shell payload contracts (aligned with docs/design/hivelab/CANVAS_SHELL_SERIALIZER_CONTRACT.md)
export interface HiveLabCanvasSpaceSummary {
  readonly id: string;
  readonly name: string;
  readonly avatarUrl?: string | null;
  readonly campusId: string;
  readonly isDefault: boolean;
  readonly recentTools: readonly string[];
}

export type HiveLabSystemTileId = "events" | "chat" | "about";

export interface HiveLabCanvasSystemTile {
  readonly id: HiveLabSystemTileId;
  readonly state: "live" | "idle";
  readonly extendsLabel?: string;
}

export interface HiveLabCanvasToolListItem {
  readonly id: string;
  readonly name: string;
  readonly icon: string | null;
  readonly status: "live" | "idle" | "limited_run";
  readonly limitedRunDaysRemaining?: number;
  readonly placements: {
    readonly start: boolean;
    readonly live: boolean;
    readonly board: "off" | "on_input" | "recap_only";
    readonly manage: true;
  };
  readonly lastEditedAt: string;
}

export interface HiveLabCanvasDraftSummary {
  readonly count: number;
  readonly href: string;
}

export interface HiveLabCanvasOverlayFlags {
  readonly libraryOpen: boolean;
  readonly runTestOpen: boolean;
  readonly publishOpen: boolean;
  readonly lintDrawerOpen: boolean;
  readonly replacePickerOpen: boolean;
}

export interface HiveLabCanvasLeaderPermissions {
  readonly canSwitchSpaces: boolean;
  readonly canPublish: boolean;
  readonly countdownVisible: boolean;
  readonly requiresApproval: boolean;
}

export interface HiveLabCanvasTelemetryContext {
  readonly spaceId: string;
  readonly leaderId: string;
  readonly surface: "canvas_shell";
}

export interface HiveLabCanvasPlacementSummary {
  readonly audience: "members" | "leaders" | "mixed";
  readonly placements: {
    readonly start: boolean;
    readonly live: boolean;
    readonly board: "off" | "on_input" | "recap_only";
    readonly calendar: boolean;
    readonly dock: boolean;
  };
  readonly elements: readonly {
    readonly id: string;
    readonly name: string;
    readonly fieldsUsed: number;
    readonly attachedEventId: string | null;
    readonly pii: boolean;
    readonly extendsEvents: boolean;
  }[];
  readonly fieldsUsed: number;
  readonly hasPII: boolean;
}

export interface HiveLabCanvasCountdown {
  readonly endsAt: string;
  readonly daysRemaining: number;
  readonly status: "limited_run";
}

export interface HiveLabCanvasDeploymentItem {
  readonly spaceId: string;
  readonly spaceName: string;
  readonly pinnedVersion: number | null;
  readonly lastDeployedAt?: string;
}

export interface HiveLabCanvasDeploymentSummary {
  readonly total: number;
  readonly items: readonly HiveLabCanvasDeploymentItem[];
}

export interface HiveLabCanvasLintSummary {
  readonly blocks: readonly HiveLabCanvasLintIssue[];
  readonly warnings: readonly HiveLabCanvasLintIssue[];
}

export interface HiveLabCanvasLintIssue {
  readonly id: string;
  readonly message: string;
  readonly autofix?: {
    readonly label: string;
    readonly action: string;
  };
}

export interface HiveLabCanvasActionState {
  readonly canRunTest: boolean;
  readonly canPublish: boolean;
  readonly publishDisabledReason?: "stale_test" | "blocking_lints";
  readonly publishHref: string;
  readonly runTestHref: string;
  readonly viewAsStudentHref: string;
}

export interface HiveLabCanvasToolTelemetry {
  readonly interactionSurface: "tool_home";
  readonly runTestEvent: string;
  readonly publishEvent: string;
}

export interface HiveLabCanvasToolSummary {
  readonly projectedCompletions?: number;
  readonly completionRate?: number;
  readonly expectedBoardPosts?: number;
  readonly expectedLiveInteractions?: number;
  readonly ghostRoster?: readonly RunTestGhostRosterOption[];
  readonly fastForward?: readonly RunTestFastForwardSnapshot[];
  readonly attachStatus?: NonNullable<RunTestReport["attachStatus"]>;
}

export interface HiveLabCanvasToolHealth {
  readonly lastRunAt?: string;
  readonly freshness: "fresh" | "stale";
  readonly health: "looks_good" | "heads_up" | "fix_required";
  readonly blockingIssues: number;
  readonly runTestHref: string;
}

export interface HiveLabCanvasToolHeader {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string | null;
  readonly versionLabel: string;
  readonly lastSavedAt: string;
}

export interface HiveLabCanvasToolHome {
  readonly tool: HiveLabCanvasToolHeader;
  readonly health: HiveLabCanvasToolHealth;
  readonly summary: HiveLabCanvasToolSummary;
  readonly placements: HiveLabCanvasPlacementSummary;
  readonly countdown?: HiveLabCanvasCountdown;
  readonly deployments: HiveLabCanvasDeploymentSummary;
  readonly lints: HiveLabCanvasLintSummary;
  readonly actions: HiveLabCanvasActionState;
  readonly telemetry: HiveLabCanvasToolTelemetry;
}

export interface HiveLabCanvasShellPayload {
  readonly space: HiveLabCanvasSpaceSummary;
  readonly systemTiles: readonly HiveLabCanvasSystemTile[];
  readonly tools: readonly HiveLabCanvasToolListItem[];
  readonly drafts: HiveLabCanvasDraftSummary;
  readonly activeTool?: HiveLabCanvasToolHome;
  readonly overlays: HiveLabCanvasOverlayFlags;
  readonly permissions: HiveLabCanvasLeaderPermissions;
  readonly telemetry: HiveLabCanvasTelemetryContext;
  readonly generatedAt: string;
}
