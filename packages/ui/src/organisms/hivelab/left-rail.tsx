// Bounded Context Owner: HiveLab Guild
// Left Rail — System + Your tools (spec §4)
import React, { useMemo } from "react";
import type { HiveLabCanvasShellPayload } from "./types";
import { RailLabel, RailSection, CanvasRail } from "./canvas-rail";
import { cn } from "@/utils/cn";

const LIVE_WINDOW_MS = 48 * 60 * 60 * 1000; // 48 hours for "Recently used"

function statusChip(tool: HiveLabCanvasShellPayload["tools"][number]) {
  if (tool.status === "limited_run" && tool.limitedRunDaysRemaining) {
    return { label: `⏳ ${tool.limitedRunDaysRemaining}d left`, tone: "warning" as const };
  }
  if (tool.status === "live") return { label: "Live", tone: "success" as const };
  return { label: "Idle", tone: "muted" as const };
}

function formatTimeAgo(iso: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  if (diff < 60 * 60 * 1000) return `${Math.max(1, Math.round(diff / (60 * 1000)))}m ago`;
  if (diff < 24 * 60 * 60 * 1000) return `${Math.round(diff / (60 * 60 * 1000))}h ago`;
  return `${Math.round(diff / (24 * 60 * 60 * 1000))}d ago`;
}

function sortTools(tools: HiveLabCanvasShellPayload["tools"]) {
  const now = Date.now();
  const live = tools.filter((t) => t.status === "live");
  const recent = tools
    .filter((t) => t.status !== "live")
    .filter((t) => now - new Date(t.lastEditedAt).getTime() <= LIVE_WINDOW_MS)
    .sort((a, b) => new Date(b.lastEditedAt).getTime() - new Date(a.lastEditedAt).getTime());
  const rest = tools
    .filter((t) => !(t.status === "live") && !(now - new Date(t.lastEditedAt).getTime() <= LIVE_WINDOW_MS))
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...live, ...recent, ...rest];
}

export function LabLeftRail({ payload, activeToolId }: { payload: HiveLabCanvasShellPayload; activeToolId?: string }) {
  const tools = useMemo(() => sortTools(payload.tools), [payload.tools]);
  return (
    <CanvasRail side="left" title={payload.space.name}>
      <RailSection>
        <RailLabel>System</RailLabel>
        <div className="mt-2 flex flex-col gap-2">
          {payload.systemTiles.map((tile) => (
            <div
              key={tile.id}
              className="flex items-center justify-between rounded-xl border border-border/30 bg-muted/15 px-3 py-2 text-sm"
            >
              <span className="font-medium text-foreground">{tile.id === "chat" ? "Join / Chat" : capitalize(tile.id)}</span>
              <span className={cn("text-xs", tile.state === "live" ? "text-success" : "text-muted-foreground")}>{tile.state === "live" ? "Live" : "Idle"}</span>
            </div>
          ))}
        </div>
      </RailSection>

      <RailSection className="mt-4">
        <RailLabel>Your tools</RailLabel>
        <div className="mt-2 flex flex-col gap-2">
          {tools.map((tool) => {
            const chip = statusChip(tool);
            const placements: string[] = [];
            if (tool.placements.start) placements.push("Start");
            if (tool.placements.live) placements.push("Live");
            if (tool.placements.board !== "off") placements.push("Board");
            placements.push("Manage");

            return (
              <div
                key={tool.id}
                className={cn(
                  "rounded-2xl border px-3 py-3 text-sm shadow-subtle transition",
                  tool.id === activeToolId ? "border-primary/50 bg-primary/10" : "border-border/30 bg-card/70"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <span>{tool.icon ?? "🛠️"}</span>
                    <span className="truncate">{tool.name}</span>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]",
                      chip.tone === "success" && "border-success/40 bg-success/15 text-success",
                      chip.tone === "warning" && "border-warning/40 bg-warning/15 text-warning",
                      chip.tone === "muted" && "border-muted/40 bg-muted/20 text-muted-foreground"
                    )}
                  >
                    {chip.label}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{placements.join(" • ")}</span>
                  <span>{formatTimeAgo(tool.lastEditedAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </RailSection>

      <div className="mt-auto flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <a href="#" className="hover:text-foreground">Library</a>
        <a href="#" className="hover:text-foreground">Drafts · {payload.drafts.count} →</a>
      </div>
    </CanvasRail>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

