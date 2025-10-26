import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BrandCanvas, CanvasRail, RailLabel, RailSection, CanvasLayout } from "../organisms/hivelab";

const meta = {
  title: "Organisms/HiveLab/Canvas/CanvasRails",
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const SystemRow = ({ label, state }: { label: string; state: "Live" | "Idle" }) => (
  <div className="flex items-center justify-between rounded-xl border border-border/30 bg-muted/15 px-3 py-2 text-sm text-foreground">
    <span className="font-medium">{label}</span>
    <span className={state === "Live" ? "text-success" : "text-muted-foreground"}>{state}</span>
  </div>
);

const ToolRow = ({ name, status }: { name: string; status: string }) => (
  <div className="rounded-2xl border border-border/30 bg-card/70 px-3 py-3 text-sm shadow-subtle">
    <div className="flex items-center justify-between">
      <span className="font-semibold text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground">{status}</span>
    </div>
    <p className="mt-1 text-xs text-muted-foreground">Start • Live • Manage</p>
  </div>
);

export const LeftRailOnly: Story = {
  render: () => (
    <BrandCanvas>
      <CanvasRail side="left" title="System">
        <div className="mt-2 flex flex-col gap-2">
          <SystemRow label="Events" state="Live" />
          <SystemRow label="Join / Chat" state="Idle" />
          <SystemRow label="About" state="Idle" />
        </div>
        <RailSection className="mt-5">
          <RailLabel>Your tools</RailLabel>
          <div className="mt-2 flex flex-col gap-2">
            <ToolRow name="Event RSVP" status="⏳ 9d left" />
            <ToolRow name="Feedback Pulse" status="Idle" />
            <ToolRow name="Check‑In Pro" status="Live" />
          </div>
        </RailSection>
        <div className="mt-auto text-xs font-semibold text-muted-foreground">Drafts · 2 →</div>
      </CanvasRail>
    </BrandCanvas>
  )
};

export const BothRails: Story = {
  render: () => (
    <BrandCanvas>
      <CanvasRail side="left" title="System">
        <div className="mt-2 flex flex-col gap-2">
          <SystemRow label="Events" state="Live" />
          <SystemRow label="Join / Chat" state="Idle" />
          <SystemRow label="About" state="Idle" />
        </div>
        <RailSection className="mt-5">
          <RailLabel>Your tools</RailLabel>
          <div className="mt-2 flex flex-col gap-2">
            <ToolRow name="Event RSVP" status="⏳ 9d left" />
            <ToolRow name="Feedback Pulse" status="Idle" />
            <ToolRow name="Check‑In Pro" status="Live" />
          </div>
        </RailSection>
      </CanvasRail>

      <CanvasRail side="right" title="Elements">
        <div className="mt-2 grid gap-2">
          <div className="rounded-xl border border-border/30 bg-card/70 p-3 text-sm">
            <div className="font-semibold text-foreground">Quick Form</div>
            <div className="text-xs text-muted-foreground">Gather sign‑ups</div>
          </div>
          <div className="rounded-xl border border-border/30 bg-card/70 p-3 text-sm">
            <div className="font-semibold text-foreground">Poll / Rank</div>
            <div className="text-xs text-muted-foreground">Let members decide</div>
          </div>
        </div>
        <RailSection className="mt-5">
          <RailLabel>Settings</RailLabel>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Audience: Members</li>
            <li>Live tile: Pinned</li>
            <li>Finish by: 2 hours before</li>
          </ul>
        </RailSection>
      </CanvasRail>
    </BrandCanvas>
  )
};

export const WithContentNonOverlap: Story = {
  render: () => (
    <CanvasLayout
      showLeft
      showRight
      leftRail={{
        title: "System",
        children: (
          <div className="flex flex-col gap-3">
            <SystemRow label="Events" state="Live" />
            <SystemRow label="Join / Chat" state="Idle" />
            <SystemRow label="About" state="Idle" />
          </div>
        )
      }}
      rightRail={{
        title: "Elements",
        children: (
          <div className="grid gap-2">
            <div className="rounded-xl border border-border/30 bg-card/70 p-3 text-sm">
              <div className="font-semibold text-foreground">Quick Form</div>
              <div className="text-xs text-muted-foreground">Gather sign‑ups</div>
            </div>
            <div className="rounded-xl border border-border/30 bg-card/70 p-3 text-sm">
              <div className="font-semibold text-foreground">Poll / Rank</div>
              <div className="text-xs text-muted-foreground">Let members decide</div>
            </div>
          </div>
        )
      }}
    >
      <div className="rounded-2xl border border-border/35 bg-card/80 p-6 text-sm shadow-level1">
        <h2 className="text-lg font-semibold text-foreground">Canvas Content</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          This area respects safe insets determined by rails and adapts responsively. Resize the viewport to
          see the content padding adjust while rails maintain full-height presence.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border/30 bg-card/70 p-4 text-sm">
          <div className="font-medium text-foreground">Metrics A</div>
          <div className="text-muted-foreground">Placeholder metric</div>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/70 p-4 text-sm">
          <div className="font-medium text-foreground">Metrics B</div>
          <div className="text-muted-foreground">Placeholder metric</div>
        </div>
      </div>
    </CanvasLayout>
  )
};
