import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, CardHeader, CardTitle, Heading, Text } from "../index";

type LayoutVariant = "gridHybrid" | "focus" | "workbench" | "splitCanvas";

interface LayoutPreviewProps {
  readonly variant: LayoutVariant;
}

const NAV_SECTION = (
  <div className="flex h-full flex-col justify-between border-r border-border/40 bg-muted/20 p-4">
    <div className="space-y-6">
      <div>
        <Heading level="h2" className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Hive spaces
        </Heading>
        <Text variant="bodySm" className="text-muted-foreground/80">
          Campus operating hubs
        </Text>
      </div>
      <nav className="space-y-3">
        {["Product Guild", "Builder Collective", "Ritual Ops", "Friends of HiveLAB"].map((item) => (
          <Button key={item} variant="ghost" className="w-full justify-start gap-3 rounded-xl border border-transparent bg-transparent text-left text-sm hover:border-border/50 hover:bg-muted/40">
            <span className="size-2 rounded-full bg-emerald-400" />
            {item}
          </Button>
        ))}
      </nav>
    </div>
    <div className="space-y-2 rounded-xl border border-border/40 bg-card/60 p-3">
      <Heading level="h3" className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        Labs spotlight
      </Heading>
      <Text variant="bodySm" className="text-muted-foreground">
        Early access tooling, leader analytics, and rollout controls live here.
      </Text>
    </div>
  </div>
);

const TIMELINE = (
  <div className="space-y-4">
    {[
      { title: "Weekly build standup", meta: "Today · Ritual cadence", body: "Sync on prototype scope, unblock lab cohorts, ship new automation cards." },
      { title: "Future of nav workshop", meta: "Tomorrow · HiveLAB session", body: "Test Sidebar07 rail compression, explore focus mode toggles, gather motion feedback." },
      { title: "Pinned signal: Mentorship requests", meta: "Pinned · Signal board", body: "Pair new operators with experienced leads to accelerate launch readiness." }
    ].map((item) => (
      <Card key={item.title} className="border-border/40 bg-card/70">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-base font-semibold">
            {item.title}
            <Text variant="bodySm" className="text-muted-foreground">
              {item.meta}
            </Text>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Text variant="bodySm" className="text-muted-foreground">
            {item.body}
          </Text>
        </CardContent>
      </Card>
    ))}
  </div>
);

const CONTEXT_STACK = (
  <div className="space-y-4">
    <Card className="border-border/40 bg-card/70">
      <CardHeader>
        <CardTitle className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Members online
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm text-muted-foreground">
        <span>• Ava — Ritual lead</span>
        <span>• Jordan — Builder</span>
        <span>• Casey — Ops crew</span>
        <Button variant="outline" size="sm" className="justify-center">
          Invite collaborator
        </Button>
      </CardContent>
    </Card>
    <Card className="border-border/40 bg-card/70">
      <CardHeader>
        <CardTitle className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <Button variant="ghost" className="w-full justify-start">
          • Pilot runbook
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          • Ritual analytics dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          • HiveLAB experiment brief
        </Button>
      </CardContent>
    </Card>
    <Card className="border-border/40 bg-card/70">
      <CardHeader>
        <CardTitle className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Moderation queue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <Text variant="bodySm">0 flags · All clear</Text>
        <Button variant="outline" size="sm" className="w-full justify-center">
          Review history
        </Button>
      </CardContent>
    </Card>
  </div>
);

function LayoutPreview({ variant }: LayoutPreviewProps): JSX.Element {
  return (
    <div className="flex min-h-[720px] w-full flex-col gap-6 rounded-3xl border border-border/30 bg-background/80 p-6">
      <header className="flex items-center justify-between rounded-2xl border border-border/40 bg-card/70 px-6 py-4">
        <div>
          <Heading level="h2" className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Product Guild · Spaces
          </Heading>
          <Text variant="bodySm" className="text-muted-foreground">
            Layout exploration · Variant: {variant}
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Preview mobile
          </Button>
          <Button variant="brand" size="sm">
            New ritual
          </Button>
        </div>
      </header>

      <div className="grid h-full min-h-[600px] rounded-2xl border border-border/40 bg-card/60 backdrop-blur">
        <div className="hidden border-border/40 lg:block">{NAV_SECTION}</div>

        {variant === "gridHybrid" ? (
          <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-6 p-6">
            <div className="space-y-4">
              <Heading level="h3" className="text-lg font-semibold text-foreground">
                Activity timeline
              </Heading>
              {TIMELINE}
            </div>
            <div>{CONTEXT_STACK}</div>
          </div>
        ) : null}

        {variant === "focus" ? (
          <div className="relative p-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {["Overview", "Activity", "Rituals", "Tools", "Members"].map((tab) => (
                  <Button key={tab} variant={tab === "Activity" ? "brand" : "ghost"} size="sm" className="rounded-xl">
                    {tab}
                  </Button>
                ))}
                <Button variant="outline" size="sm" className="rounded-xl">
                  Focus mode
                </Button>
              </div>
              <div className="rounded-2xl border border-border/40 bg-background/70 p-6 shadow-[0_18px_46px_-24px_rgba(22,24,29,0.65)]">
                <Heading level="h3" className="text-lg font-semibold text-foreground">
                  Activity stream
                </Heading>
                <Text variant="bodySm" className="mt-2 text-muted-foreground">
                  Full-width canvas keeps attention on updates while side panels collapse into overlay drawers.
                </Text>
                <div className="mt-6">{TIMELINE}</div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-10 right-10 hidden max-w-xs rounded-2xl border border-border/40 bg-card/70/80 p-5 opacity-90 blur-sm lg:block">
              <Heading level="h4" className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                Overlay drawer preview
              </Heading>
              <Text variant="bodySm" className="mt-3 text-muted-foreground">
                Members, resources, and moderation controls slide in here without shrinking the feed.
              </Text>
            </div>
          </div>
        ) : null}

        {variant === "workbench" ? (
          <div className="grid grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] gap-6 p-6">
            <div className="space-y-4">
              <Heading level="h3" className="text-lg font-semibold text-foreground">
                Kanban · Ritual workbench
              </Heading>
              <div className="grid grid-cols-3 gap-3">
                {["Drafting", "Ready", "Live"].map((column) => (
                  <Card key={column} className="border-border/40 bg-card/70">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                        {column}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <span>• Standup ritual</span>
                      <span>• Mentorship sync</span>
                      <span>• Demo day prep</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Text variant="bodySm" className="text-muted-foreground">
                Drag-and-drop enabled when interacting inside the actual app shell.
              </Text>
            </div>
            <div className="space-y-4">
              <Heading level="h3" className="text-lg font-semibold text-foreground">
                Activity + insights
              </Heading>
              {TIMELINE}
            </div>
          </div>
        ) : null}

        {variant === "splitCanvas" ? (
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(260px,320px)] gap-6 p-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <Heading level="h3" className="text-lg font-semibold text-foreground">
                  Feed
                </Heading>
                <Button variant="ghost" size="sm">
                  Toggle resizer
                </Button>
              </div>
              <div className="space-y-3">
                {["New builder welcome", "Prototype feedback thread", "Lab recap"].map((title) => (
                  <Card key={title} className="border-border/40 bg-card/70">
                    <CardContent className="space-y-2 py-5">
                      <Heading level="h4" className="text-base font-semibold text-foreground">
                        {title}
                      </Heading>
                      <Text variant="bodySm" className="text-muted-foreground">
                        Dual-pane canvas keeps collaboration visible while tool shelf stays pinned.
                      </Text>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm">
                          React
                        </Button>
                        <Button variant="ghost" size="sm">
                          Comment
                        </Button>
                        <Button variant="ghost" size="sm">
                          Assign follow-up
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Heading level="h3" className="text-lg font-semibold text-foreground">
                Tool shelf
              </Heading>
              <Card className="border-border/40 bg-card/70">
                <CardContent className="space-y-3 py-5">
                  <Text variant="bodySm" className="text-muted-foreground">
                    Resizable region locks minimum width for quick launches without overwhelming the feed.
                  </Text>
                  <Button variant="outline" size="sm" className="w-full">
                    Launch ritual dashboard
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Open automation log
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage space tools
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-card/70">
                <CardContent className="space-y-2 py-4">
                  <Heading level="h4" className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Quick metrics
                  </Heading>
                  <Text variant="bodySm" className="text-muted-foreground">
                    Ritual completion · 87%
                  </Text>
                  <Text variant="bodySm" className="text-muted-foreground">
                    Members active · 142
                  </Text>
                  <Text variant="bodySm" className="text-muted-foreground">
                    Tools launched · 54
                  </Text>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const meta: Meta<LayoutPreviewProps> = {
  title: "Spaces/Layout Variants",
  component: LayoutPreview,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark"
    }
  }
};

export default meta;

type Story = StoryObj<LayoutPreviewProps>;

export const GridHybrid: Story = {
  args: { variant: "gridHybrid" }
};

export const FocusMode: Story = {
  args: { variant: "focus" }
};

export const Workbench: Story = {
  args: { variant: "workbench" }
};

export const SplitCanvas: Story = {
  args: { variant: "splitCanvas" }
};

