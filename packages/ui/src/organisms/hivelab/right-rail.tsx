"use client";
// Bounded Context Owner: HiveLab Guild
// Right Dock (legacy file name: right-rail) — Elements | Settings scaffolds (accurate structure; data from core catalog when available)
import React, { useMemo, useState } from "react";
import { elementCatalog } from "@core/hivelab/catalog";
import type { ElementDefinition } from "@core/hivelab/contracts";
import { CanvasRail, RailLabel, RailSection } from "./canvas-rail";
import type { HiveLabCanvasShellPayload } from "./types";

type Tab = "elements" | "settings";

const CORE_CATEGORIES_ORDER = [
  "Gather & RSVP",
  "Finish-By & Remind",
  "Decide",
  "Collect",
  "Match & Team",
  "Track & Progress",
  "Media & Files",
  "Place & Logistics",
  "Invite & Share",
  "Care & Safety"
];

const deriveLivesIn = (el: ElementDefinition) => {
  const hasLive = el.slots.includes("event_during");
  const hasBoard = el.slots.includes("post");
  const hasCalendar = el.slots.includes("event_before") || el.slots.includes("event_after") || el.slots.includes("calendar_badge") || el.slots.includes("calendar_panel");
  const startHeuristic = hasBoard || hasLive; // safe heuristic: start when you can open input or live
  return { start: startHeuristic, live: hasLive, board: hasBoard, calendar: hasCalendar };
};

const audienceDefault = (el: ElementDefinition) => (el.capabilities?.includes("leaders") ? "Leaders" : "Members");

function groupByCategory(list: readonly ElementDefinition[]) {
  const map = new Map<string, ElementDefinition[]>();
  list.forEach((el) => {
    const arr = map.get(el.category) ?? [];
    arr.push(el);
    map.set(el.category, arr);
  });
  return map;
}

export function LabRightRail({ payload }: { payload: HiveLabCanvasShellPayload }) {
  const [tab, setTab] = useState<Tab>("elements");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return elementCatalog;
    return elementCatalog.filter((el) => {
      if (el.name.toLowerCase().includes(q)) return true;
      if (el.purpose?.toLowerCase().includes(q)) return true;
      if (el.synonyms?.some((s) => s.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [query]);

  const byCategory = useMemo(() => groupByCategory(filtered), [filtered]);

  return (
    <CanvasRail side="right">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-xl border border-border/35 bg-card/80 p-1 text-xs">
          <button
            type="button"
            aria-pressed={tab === "elements"}
            className={
              tab === "elements"
                ? "rounded-lg bg-primary/10 px-3 py-1 font-semibold text-primary"
                : "rounded-lg px-3 py-1 text-muted-foreground hover:text-foreground"
            }
            onClick={() => setTab("elements")}
          >
            Elements
          </button>
          <button
            type="button"
            aria-pressed={tab === "settings"}
            className={
              tab === "settings"
                ? "rounded-lg bg-primary/10 px-3 py-1 font-semibold text-primary"
                : "rounded-lg px-3 py-1 text-muted-foreground hover:text-foreground"
            }
            onClick={() => setTab("settings")}
          >
            Settings
          </button>
        </div>
      </div>

      {tab === "elements" ? (
        <>
          <RailSection className="mt-3">
            <input
              placeholder="Search elements…"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              className="w-full rounded-xl border border-border/35 bg-card/80 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </RailSection>

          <div className="mt-2 flex flex-col gap-3">
            {(CORE_CATEGORIES_ORDER.filter((c) => byCategory.has(c)).length
              ? CORE_CATEGORIES_ORDER.filter((c) => byCategory.has(c))
              : Array.from(byCategory.keys())
            ).map((category) => (
              <div key={category}>
                <RailLabel>{category}</RailLabel>
                <div className="mt-2 grid gap-2">
                  {(byCategory.get(category) ?? []).slice(0, 8).map((el) => {
                    const lives = deriveLivesIn(el);
                    const audience = audienceDefault(el);
                    return (
                      <div key={el.id} className="rounded-xl border border-border/30 bg-card/70 p-3 text-sm">
                        <div className="font-semibold text-foreground">{el.name}</div>
                        <div className="text-xs text-muted-foreground">{el.purpose}</div>
                        <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                          <span>Adds up to {el.maxFields ?? 1} fields</span>
                          <span>• Lives in:</span>
                          <span className={lives.start ? "text-primary" : "text-muted-foreground/70"}>Start</span>
                          <span className={lives.live ? "text-primary" : "text-muted-foreground/70"}>Live</span>
                          <span className={lives.board ? "text-primary" : "text-muted-foreground/70"}>Board</span>
                          <span className={lives.calendar ? "text-primary" : "text-muted-foreground/70"}>Calendar</span>
                          <span>• Audience: {audience}</span>
                          {el.pii ? <span className="text-warning">PII</span> : null}
                          {el.extends === "events" ? <span className="text-muted-foreground">Extends: Events</span> : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <RailSection className="mt-3">
            <RailLabel>Tool settings</RailLabel>
            {payload.activeTool ? (
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Audience: {payload.activeTool.placements.audience}</li>
                <li>
                  Placements: {payload.activeTool.placements.placements.start ? "Start " : ""}
                  {payload.activeTool.placements.placements.live ? "• Live " : ""}
                  {payload.activeTool.placements.placements.board !== "off" ? "• Board " : ""}
                  {payload.activeTool.placements.placements.calendar ? "• Calendar" : ""}
                </li>
                <li>Dock: {payload.activeTool.placements.placements.dock ? "Pinned" : "Off"}</li>
                {payload.activeTool.countdown ? (
                  <li>Limited run: ⏳ {payload.activeTool.countdown.daysRemaining} days left</li>
                ) : null}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">Select a tool to edit settings.</div>
            )}
          </RailSection>
        </>
      )}
    </CanvasRail>
  );
}
