// Bounded Context Owner: HiveLab Guild
// Brand-aligned Canvas shell preview driven by the serializer contract.
import { brand } from "@/brand/classnames";
import { Badge } from "@/atoms/badge";
import { Button } from "@/atoms/button";
import { cn } from "@/utils/cn";
import type {
  HiveLabCanvasShellPayload,
  HiveLabCanvasSystemTile,
  HiveLabCanvasToolHome,
  HiveLabCanvasToolListItem,
  HiveLabCanvasLintIssue
} from "./types";

const canvasBackground =
  "relative flex min-h-screen w-full items-stretch justify-center overflow-hidden bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.15),transparent_55%),radial-gradient(circle_at_85%_10%,hsl(var(--accent)/0.12),transparent_55%),linear-gradient(160deg,hsl(var(--background)/0.92),hsl(var(--background)/0.88))] text-foreground";
const canvasSurface = cn(
  brand.surface.bento({ accent: "slate", preview: true }),
  "relative w-full max-w-[1280px] flex-1 rounded-[28px] border border-border/35 bg-[hsl(var(--card)/0.85)] p-10 shadow-level2"
);
const railBase =
  "pointer-events-auto flex h-[calc(100%-96px)] w-[248px] flex-col gap-6 rounded-3xl border border-border/35 bg-[hsl(var(--background)/0.78)] px-6 py-6 shadow-[0_24px_60px_rgba(10,20,40,0.38)] backdrop-blur-xl";
const contentCard = cn(brand.surface.bento({ accent: "slate" }), "border border-border/35 p-6 shadow-level1");

export interface HiveLabShellProps {
  readonly payload: HiveLabCanvasShellPayload;
}

export const HiveLabShell = ({ payload }: HiveLabShellProps) => {
  const activeTool = payload.activeTool;

  return (
    <div className={canvasBackground}>
      <div className={canvasSurface}>
        <main className="flex h-full flex-col gap-6 overflow-y-auto pr-4">
          {activeTool ? (
            <>
              <header className="flex items-center justify-between gap-6 rounded-3xl border border-border/30 bg-[hsl(var(--background)/0.75)] px-6 py-5 shadow-subtle backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{activeTool.tool.icon ?? "🛠️"}</span>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-semibold leading-tight text-foreground">
                      {activeTool.tool.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">{activeTool.tool.description}</p>
                    <p className="flex gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                      <span>Version {activeTool.tool.versionLabel}</span>
                      <span>Saved · {formatTimestamp(activeTool.tool.lastSavedAt)}</span>
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full border-primary/45 bg-primary/10 px-4 py-1 text-xs font-semibold text-primary"
                >
                  Tool Home
                </Badge>
              </header>

              <section className={contentCard}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-foreground">Run Test snapshot</h2>
                  <FreshnessBadge health={activeTool.health} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Last run {formatTimestamp(activeTool.health.lastRunAt)} • Health{" "}
                  <strong className="text-foreground">{mapHealthLabel(activeTool.health.health)}</strong>
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Metric label="Projected completions" value={activeTool.summary.projectedCompletions ?? "—"} />
                  <Metric
                    label="Completion rate"
                    value={
                      typeof activeTool.summary.completionRate === "number"
                        ? `${Math.round(activeTool.summary.completionRate * 100)}%`
                        : "—"
                    }
                  />
                  <Metric label="Expected board posts" value={activeTool.summary.expectedBoardPosts ?? "—"} />
                  <Metric label="Live interactions" value={activeTool.summary.expectedLiveInteractions ?? "—"} />
                </div>
              </section>

              {activeTool.summary.ghostRoster ? (
                <section className={contentCard}>
                  <h2 className="text-lg font-semibold text-foreground">Ghost roster preview</h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {activeTool.summary.ghostRoster.map((option) => (
                      <div
                        key={option.size}
                        className="flex min-w-[200px] flex-col gap-1 rounded-2xl border border-border/30 bg-muted/10 p-4 text-sm text-muted-foreground"
                      >
                        <span className="text-sm font-semibold text-foreground">{option.size} members</span>
                        <span>
                          {option.projectedCompletions} responses • {Math.round(option.projectedCompletionRate * 100)}%
                        </span>
                        <span className="text-xs text-muted-foreground/80">{option.note}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className={contentCard}>
                <h2 className="text-lg font-semibold text-foreground">Deployments</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Live in {activeTool.deployments.total} Spaces
                </p>
                <table className="mt-4 w-full table-fixed border-collapse text-sm">
                  <thead className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                    <tr>
                      <th className="pb-2 text-left">Space</th>
                      <th className="pb-2 text-left">Pinned version</th>
                      <th className="pb-2 text-left">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {activeTool.deployments.items.map((item) => (
                      <tr key={item.spaceId} className="border-t border-border/20">
                        <td className="py-2 text-foreground">{item.spaceName}</td>
                        <td className="py-2">{item.pinnedVersion ? `v${item.pinnedVersion}` : "—"}</td>
                        <td className="py-2">{formatTimestamp(item.lastDeployedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </>
          ) : (
            <EmptyState />
          )}
        </main>
      </div>

      <aside className={cn(railBase, "absolute left-12 top-12 hidden lg:flex")}>
        <section>
          <SectionLabel>System</SectionLabel>
          <div className="mt-3 flex flex-col gap-2">
            {payload.systemTiles.map((tile) => (
              <SystemRow key={tile.id} tile={tile} />
            ))}
          </div>
        </section>

        <section>
          <SectionLabel>Your tools</SectionLabel>
          <div className="mt-3 flex flex-col gap-2">
            {payload.tools.map((tool) => (
              <ToolRow key={tool.id} tool={tool} activeId={activeTool?.tool.id} />
            ))}
          </div>
        </section>

        <footer className="mt-auto text-xs font-semibold text-muted-foreground">
          Drafts · {payload.drafts.count} →
        </footer>
      </aside>

      <aside className={cn(railBase, "absolute right-12 top-12 hidden lg:flex")}>
        {activeTool ? (
          <>
            <section>
              <SectionLabel>Placements</SectionLabel>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <Badge variant="outline" className="border-border/40 bg-muted/20 text-foreground">
                  Audience · {activeTool.placements.audience.toUpperCase()}
                </Badge>
                {renderPlacementBadge("Start", activeTool.placements.placements.start)}
                {renderPlacementBadge("Live", activeTool.placements.placements.live)}
                {renderPlacementBadge(
                  "Board",
                  activeTool.placements.placements.board !== "off",
                  activeTool.placements.placements.board === "recap_only" ? "Recap only" : "On input"
                )}
                {renderPlacementBadge("Calendar", activeTool.placements.placements.calendar)}
                {renderPlacementBadge("Dock", activeTool.placements.placements.dock)}
              </div>
              <div className="mt-5">
                <strong className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                  Elements ({activeTool.placements.fieldsUsed}/8 fields)
                </strong>
                <ul className="mt-3 space-y-2 pl-5 text-sm text-muted-foreground list-disc">
                  {activeTool.placements.elements.map((element) => (
                    <li key={element.id}>
                      <span className="font-medium text-foreground">{element.name}</span>
                      <span className="text-muted-foreground/80">
                        {" "}
                        · {element.fieldsUsed} field{element.fieldsUsed !== 1 ? "s" : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {activeTool.countdown && payload.permissions.countdownVisible ? (
              <section>
                <SectionLabel>Limited run</SectionLabel>
                <div
                  className={cn(
                    brand.surface.bento({ accent: "gold" }),
                    "mt-3 border border-border/30 px-4 py-4 text-sm text-foreground shadow-level1"
                  )}
                >
                  ⏳ {activeTool.countdown.daysRemaining} days left • Ends{" "}
                  {formatTimestamp(activeTool.countdown.endsAt)}
                </div>
              </section>
            ) : null}

            <section>
              <SectionLabel>Lints</SectionLabel>
              <div className="mt-3 flex flex-col gap-3">
                {activeTool.lints.blocks.map((issue) => (
                  <LintCard key={issue.id} issue={issue} tone="block" />
                ))}
                {activeTool.lints.warnings.map((issue) => (
                  <LintCard key={issue.id} issue={issue} tone="warn" />
                ))}
              </div>
            </section>

            <section>
              <SectionLabel>Actions</SectionLabel>
              <div className="mt-3 flex flex-col gap-2">
                <ActionButton label="Run Test" disabled={!activeTool.actions.canRunTest} />
                <ActionButton
                  label="Publish"
                  disabled={!activeTool.actions.canPublish}
                  hint={
                    activeTool.actions.publishDisabledReason === "stale_test"
                      ? "Run Test within the last 10 minutes."
                      : activeTool.actions.publishDisabledReason === "blocking_lints"
                      ? "Resolve blocking lints first."
                      : undefined
                  }
                />
                <ActionButton label="View as student" variant="ghost" />
              </div>
            </section>
          </>
        ) : (
          <section className="text-sm text-muted-foreground">
            Select a tool to view placements, lints, and actions.
          </section>
        )}
      </aside>
    </div>
  );
};

const SectionLabel = ({ children }: { children: string }) => (
  <strong className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">{children}</strong>
);

const SystemRow = ({ tile }: { tile: HiveLabCanvasSystemTile }) => (
  <div className="flex items-center justify-between rounded-xl border border-border/30 bg-muted/15 px-3 py-2 text-sm text-foreground">
    <span className="font-semibold">
      {tile.id === "chat" ? "Join / Chat" : capitalize(tile.id)}
    </span>
    <Badge
      variant="outline"
      className={cn(
        "border-border/20 px-2 py-0.5 text-[11px]",
        tile.state === "live" ? "bg-success/10 text-success" : "text-muted-foreground"
      )}
    >
      {tile.state === "live" ? "Live" : "Idle"}
    </Badge>
  </div>
);

const ToolRow = ({
  tool,
  activeId
}: {
  tool: HiveLabCanvasToolListItem;
  activeId?: string;
}) => {
  const placements: string[] = [];
  if (tool.placements.start) placements.push("Start");
  if (tool.placements.live) placements.push("Live");
  if (tool.placements.board !== "off") placements.push("Board");
  placements.push("Manage");

  const isActive = tool.id === activeId;
  const statusBadge =
    tool.status === "limited_run" && tool.limitedRunDaysRemaining
      ? {
          label: `⏳ ${tool.limitedRunDaysRemaining}d left`,
          className: "border-warning/40 bg-warning/15 text-warning"
        }
      : tool.status === "live"
      ? { label: "Live", className: "border-success/40 bg-success/15 text-success" }
      : { label: "Idle", className: "border-muted/40 bg-muted/20 text-muted-foreground" };

  return (
    <div
      className={cn(
        "rounded-2xl border px-3 py-3 shadow-subtle transition",
        isActive ? "border-primary/50 bg-primary/10" : "border-border/30 bg-card/70"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <span>{tool.icon ?? "🛠️"}</span>
          <span>{tool.name}</span>
        </div>
        <Badge variant="outline" className={statusBadge.className}>
          {statusBadge.label}
        </Badge>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{placements.join(" • ")}</p>
    </div>
  );
};

const Metric = ({ label, value }: { label: string; value: number | string }) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-border/30 bg-card/80 p-4 text-sm text-muted-foreground">
    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">{label}</span>
    <span className="text-xl font-semibold text-foreground">{value}</span>
  </div>
);

const FreshnessBadge = ({ health }: { health: HiveLabCanvasToolHome["health"] }) => {
  const stale = health.freshness === "stale";
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        stale ? "border-destructive/50 bg-destructive/10 text-destructive" : "border-success/50 bg-success/15 text-success"
      )}
    >
      {stale ? "Run test to refresh" : "Fresh"}
    </Badge>
  );
};

const renderPlacementBadge = (label: string, active: boolean, suffix?: string) => (
  <Badge
    key={label}
    variant="outline"
    className={cn(
      "border-border/40 bg-muted/15 text-foreground",
      active && "border-primary/40 bg-primary/10 text-primary"
    )}
  >
    {label}
    {suffix ? ` · ${suffix}` : ""}
  </Badge>
);

const LintCard = ({
  issue,
  tone
}: {
  issue: HiveLabCanvasLintIssue;
  tone: "block" | "warn";
}) => {
  const accent = tone === "block" ? "crimson" : "slate";
  const heading = tone === "block" ? "Blocking" : "Heads-up";
  return (
    <div
      className={cn(
        brand.surface.bento({ accent }),
        "border border-border/35 p-4 text-sm text-muted-foreground shadow-level1"
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
        {heading}
      </span>
      <p className="mt-2 text-sm text-foreground/90">{issue.message}</p>
      {issue.autofix ? (
        <p className="mt-2 text-xs font-medium text-primary">
          Autofix: {issue.autofix.label}
        </p>
      ) : null}
    </div>
  );
};

const ActionButton = ({
  label,
  disabled,
  hint,
  variant = "secondary"
}: {
  label: string;
  disabled?: boolean;
  hint?: string;
  variant?: "secondary" | "ghost";
}) => (
  <div className="flex flex-col gap-1">
    <Button variant={variant} size="lg" disabled={disabled}>
      {label}
    </Button>
    {hint ? <span className="text-xs text-warning">{hint}</span> : null}
  </div>
);

const EmptyState = () => (
  <div
    className={cn(
      brand.surface.bento({ accent: "slate" }),
      "flex flex-col items-center gap-3 border border-border/40 p-6 text-center text-muted-foreground shadow-level1"
    )}
  >
    <h2 className="text-lg font-semibold text-foreground">Select a tool</h2>
    <p className="max-w-sm text-sm">
      Choose a tool from the left rail to review Run Test results, placements, and publishing gates.
    </p>
  </div>
);

const formatTimestamp = (isoString?: string) => {
  if (!isoString) return "Never";
  return new Date(isoString).toLocaleString();
};

const mapHealthLabel = (health: HiveLabCanvasToolHome["health"]["health"]) => {
  if (health === "looks_good") return "Looks good";
  if (health === "heads_up") return "Heads-up";
  return "Fix required";
};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
