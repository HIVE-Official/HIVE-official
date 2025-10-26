"use client";
// Bounded Context Owner: HiveLab Guild
// Minimal Tool Editor surface to complete the HiveLab section UI.

import { useMemo, useState } from "react";
import { ToolEditor } from "@hive/ui";
import AttachEventSheet from "../AttachEventSheet";
import type { ToolHeaderProps, EditorRailProps, PropertiesPanelProps } from "@hive/ui";
import { ELEMENTS } from "@hive/ui";

interface Props {
  params: { spaceId: string; toolId: string };
}

export default function LabToolEditPage({ params }: Props): JSX.Element {
  const { spaceId, toolId } = params;
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(true);
  const [attachOpen, setAttachOpen] = useState(false);

  const headerProps: ToolHeaderProps = useMemo(
    () => ({
      breadcrumbs: [
        { label: "Lab", href: `/lab/${spaceId}` },
        { label: "Tools", href: `/lab/${spaceId}` },
      ],
      name: toolId.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
      description: "Build with elements, publish to Limited run, then certify.",
      status: "draft",
      visibility: "draft",
      dirty,
      saving,
      lastEdited: { by: "You", at: new Date() },
      stats: [
        { label: "Fields", value: "0/8" },
        { label: "Complexity", value: "Light" },
        { label: "Placement", value: "Start • Live" },
      ],
      onBack: () => window.history.back(),
      onPreview: () => alert("Preview not yet wired — UI-only demo"),
      onSave: async () => {
        setSaving(true);
        await new Promise((r) => setTimeout(r, 600));
        setSaving(false);
        setDirty(false);
      },
      onPublish: async () => {
        setSaving(true);
        try {
          // Gate publish: require fresh test (≤ 10 min) and no blocking lints
          const pre = await fetch(`/api/tools/${toolId}`);
          if (!pre.ok) throw new Error("fetch tool failed");
          const preJsonUnknown: unknown = await pre.json();
          const t = (preJsonUnknown as { data?: { lastTest?: { lastRunAt?: string | null; blockingIssueCount?: number; health?: string } } }).data;
          const lastRunAt = t?.lastTest?.lastRunAt ? new Date(t.lastTest.lastRunAt) : null;
          const fresh = lastRunAt ? Date.now() - lastRunAt.getTime() <= 10 * 60 * 1000 : false;
          const noBlocks = (t?.lastTest?.blockingIssueCount ?? 0) === 0 && t?.lastTest?.health !== "fix_required";
          if (!fresh || !noBlocks) {
            alert("Publish requires a fresh Run Test (≤10 min) and no blocking lints. Use Run Test below, then publish.");
            setSaving(false);
            return;
          }

          const res = await fetch(`/api/tools/${toolId}/publish`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stage: "limited_run" })
          });
          if (!res.ok) throw new Error("publish failed");
          // Redirect back to shell showing the Publish modal and tool context
          window.location.assign(`/lab/${spaceId}?publish=1&toolId=${encodeURIComponent(toolId)}`);
        } catch {
          alert("Publish failed. Check your permissions.");
        } finally {
          setSaving(false);
        }
      },
      variant: "condensed",
    }),
    [spaceId, toolId, dirty, saving]
  );

  const railProps: EditorRailProps = useMemo(() => ({
    defaultTab: "elements",
    elementDefinitions: ELEMENTS,
    recommendedElementIds: ["input.form", "output.post"],
    onAddElement: () => setDirty(true),
    propertiesPanelProps: {
      title: "Tool Settings",
      subtitle: "Audience, placements, and timing",
      sections: [
        {
          id: "audience",
          title: "Audience",
          items: [
            {
              id: "audience-members",
              label: "Members",
              value: "Default (leaders can still manage)",
              tags: ["Reversible"],
              status: "default",
              actionLabel: "Switch to Leaders only",
              onAction: () => alert("Switch audience — UI-only demo"),
            },
          ],
        },
        {
          id: "placements",
          title: "Placements",
          items: [
            { id: "start", label: "Start", value: "Composer shortcut", status: "default" },
            { id: "live", label: "Live area", value: "Visible while running", status: "default" },
            { id: "board", label: "Board", value: "On input (one thread)", status: "info" },
            { id: "calendar", label: "Calendar", value: "Finish by available", status: "default" },
          ],
        },
        {
          id: "time",
          title: "Time",
          items: [
            {
              id: "finish-by",
              label: "Finish by",
              value: "None",
              actionLabel: "Set date",
              onAction: () => alert("Set Finish by — UI-only demo"),
            },
            {
              id: "reminders",
              label: "Reminders",
              value: "24h before • At start • After close",
              status: "default",
            },
          ],
        },
      ],
      footer: (
        <div>
          Keep it simple: ≤ 8 fields. Anonymous turns off when PII elements are present.
        </div>
      ),
    } satisfies PropertiesPanelProps,
  }), []);

  return (
    <div className="container mx-auto max-w-[1200px] px-4 py-8">
      <ToolEditor
        headerProps={headerProps}
        layout="condensed"
        presentation="split"
        railProps={railProps}
        canvas={{
          emptyState: (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
              <p className="text-sm">Drag elements here to start building your tool.</p>
              <p className="text-xs">Keep it simple: ≤ 8 fields • Lives in Start/Live/Board/Calendar</p>
            </div>
          ),
          statusBar: (
            <div className="flex w-full items-center justify-between gap-3 text-muted-foreground">
              <span className="text-sm">Limited run is the first publish step (14 days). Run Test must be fresh and clean.</span>
               <button
                 className="rounded border border-border/40 px-3 py-1 text-xs hover:border-primary/40"
                 onClick={() => {
                   void (async () => {
                     setSaving(true);
                     try {
                       await fetch(`/api/tools/${toolId}/test`, {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({ health: "looks_good", blockingIssueCount: 0 })
                       });
                       window.location.assign(`/lab/${spaceId}?test=1`);
                     } catch {
                       alert("Run Test failed. Check lints in the editor.");
                     } finally {
                       setSaving(false);
                     }
                   })();
                 }}
               >
                 Run Test
               </button>
               <button
                 className="rounded border border-border/40 px-3 py-1 text-xs hover:border-primary/40"
                 onClick={() => setAttachOpen(true)}
               >
                 Attach to Event
               </button>
            </div>
          ),
        }}
        onAddBlock={() => setDirty(true)}
      />
      <AttachEventSheet open={attachOpen} onOpenChange={setAttachOpen} spaceId={spaceId} toolId={toolId} />
    </div>
  );
}
