import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

type Mode = "feed" | "chat" | "events" | "members" | "about";

const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

const Box = ({ className }: { className?: string }) => (
  <div className={cn("rounded-lg border border-[hsl(var(--border)/0.65)] bg-[hsl(var(--card)/0.5)]", className)} />
);

type IdeationFrameProps = {
  mode: Mode;
  rail: boolean;
  density: "compact" | "comfortable";
};

const IdeationFrame: React.FC<IdeationFrameProps> = ({ mode, rail, density }) => {
  return (
    <div data-density={density} className="min-h-[80vh] bg-background text-foreground">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b border-[hsl(var(--border)/0.65)] bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-[var(--shell-max-w)] px-[var(--shell-gutter)] py-3">
          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
            {/* Avatar + Name */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[hsl(var(--secondary)/0.5)] border border-[hsl(var(--border)/0.65)]" />
              <div>
                <div className="text-h5 font-h5">Space Name</div>
                <div className="text-caption text-muted-foreground">Student Org • Public • 342 members</div>
              </div>
            </div>
            <div />
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border btn-prominent">Join</button>
              <button className="px-3 py-1.5 rounded-lg border border-[hsl(var(--border)/0.65)]">{rail ? "Hide Dock" : "Show Dock"}</button>
            </div>
          </div>
        </div>
        {/* Tabs (feed-scoped) */}
        <div className="border-t border-[hsl(var(--border)/0.65)]">
          <div className="mx-auto max-w-[var(--shell-max-w)] px-[var(--shell-gutter)]">
            <div className="flex gap-6 py-2 text-muted-foreground">
              <span className="pb-1 border-b-2 border-[hsl(var(--foreground))] text-foreground">All</span>
              <span>Events</span>
              <span>Tools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className={cn("mx-auto max-w-[var(--shell-max-w)] px-[var(--shell-gutter)]", "grid gap-[var(--section-gap)]", rail ? "grid-cols-1 md:grid-cols-[minmax(0,1fr)_var(--dock-w)]" : "grid-cols-1")}> 
        {/* Feed/Body */}
        <div className="min-w-0 py-3">
          {mode === "feed" && (
            <div className="space-y-3">
              <div className="text-caption text-primary font-semibold">📌 PINNED</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Box className="h-28" />
                <Box className="h-28" />
              </div>
              <div className="h-4" />
              <Box className="h-28" />
              <Box className="h-40" />
              <Box className="h-28" />
            </div>
          )}
          {mode === "chat" && (
            <div className="space-y-1.5">
              <div className="text-center my-2"><span className="inline-block text-caption text-muted-foreground px-2 py-0.5 rounded-full border">Today</span></div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg px-2 py-1.5 hover:bg-[hsl(var(--muted)/0.3)]">
                  <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary)/0.5)] border" />
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="text-body font-medium">@member{i+1}</div>
                    <div className="text-body-sm text-foreground/90">Message line goes here with a couple of words to show wrapping.</div>
                  </div>
                </div>
              ))}
              <div className="sticky bottom-3 flex justify-end">
                <button className="px-3 py-1.5 rounded-lg border border-[hsl(var(--border)/0.65)] bg-background/90 backdrop-blur shadow">Jump to present</button>
              </div>
            </div>
          )}
          {mode === "events" && (
            <div className="space-y-3">
              <Box className="h-24" />
              <Box className="h-24" />
              <Box className="h-24" />
            </div>
          )}
          {mode === "members" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Box key={i} className="h-28" />
              ))}
            </div>
          )}
          {mode === "about" && (
            <div className="space-y-3">
              <Box className="h-20" />
              <Box className="h-32" />
            </div>
          )}
        </div>

        {/* Dock */}
        {rail && (
          <aside className="hidden md:block py-3 border-l border-[hsl(var(--border)/0.65)]">
            <div className="space-y-3 pl-4">
              <Box className="h-32" />
              <Box className="h-24" />
              <Box className="h-24" />
              <Box className="h-24" />
            </div>
          </aside>
        )}
      </div>

      {/* Composer (feed/chat) */}
      {(mode === "feed" || mode === "chat") && (
        <div className="sticky bottom-0 border-t border-[hsl(var(--border)/0.65)] bg-background/90 backdrop-blur">
          <div className="mx-auto max-w-[var(--shell-max-w)] px-[var(--shell-gutter)] py-3">
            <div className="flex items-end gap-3">
              <button className="h-10 w-10 rounded-lg border">+</button>
              <div className="flex-1 h-10 rounded-xl border bg-[hsl(var(--muted)/0.5)]" />
              <button className="h-10 w-10 rounded-lg border">➤</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof IdeationFrame> = {
  title: "Spaces/Ideation/Frame",
  component: IdeationFrame,
  parameters: { layout: "fullscreen" },
  argTypes: {
    mode: { control: { type: "radio" }, options: ["feed", "chat", "events", "members", "about"] },
    rail: { control: "boolean" },
    density: { control: { type: "radio" }, options: ["compact", "comfortable"] },
  },
  args: { mode: "feed", rail: true, density: "compact" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const FeedDefault: Story = { args: { mode: "feed", rail: true } };
export const ChatFocus: Story = { args: { mode: "chat", rail: false } };
export const ChatWithRail: Story = { args: { mode: "chat", rail: true } };
export const EventsList: Story = { args: { mode: "events", rail: true } };
export const MembersGrid: Story = { args: { mode: "members", rail: true } };
export const AboutAndResources: Story = { args: { mode: "about", rail: true } };
