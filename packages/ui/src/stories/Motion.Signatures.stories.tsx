// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";
import { Button, Card } from "../index";

const meta: Meta = {
  title: "Foundation/Motion Signatures",
  parameters: {
    layout: "centered"
  }
};

export default meta;
type Story = StoryObj;

const RitualCard = (): JSX.Element => (
  <Card className="motion-ritual relative max-w-md overflow-hidden rounded-2xl border bg-card p-6 text-left">
    <div className="motion-ritual-media mb-6 rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">Ritual · Midnight Coffee Jump</p>
      <p>Doors open in 2h — reserve your slot now.</p>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">Hosted by Campus Engineers</span>
      <span className="status-pulse rounded-full bg-muted px-3 py-1 text-xs text-foreground">Coming soon</span>
    </div>
  </Card>
);

const DockPanel = (): JSX.Element => (
  <div className="dock-keyline enter-dock-panel w-full max-w-sm rounded-xl border bg-card/95 p-4 shadow-level2 backdrop-blur">
    <p className="text-xs uppercase tracking-wide text-muted-foreground">Dock · RSVP autopilot</p>
    <p className="mt-1 font-medium text-foreground">Design Jam check-in opens in 30m</p>
    <p className="text-sm text-muted-foreground">We’ll ping you when the QR activates.</p>
  </div>
);

const CtaRipple = (): JSX.Element => (
  <Button variant="gold" className="press-gold">
    Join Ritual
  </Button>
);

const StatusChip = (): JSX.Element => (
  <span className="status-pulse inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground">
    <span className="h-1.5 w-1.5 rounded-full bg-foreground" /> 3 seats left
  </span>
);

const SkeletonShimmer = (): JSX.Element => (
  <div className="space-y-2 rounded-2xl border border-border bg-card p-6">
    {[0, 1, 2, 3].map((row) => (
      <div key={`skeleton-row-${row}`} className="space-y-2">
        <div className="skeleton-bar h-3 w-full" />
        <div className="skeleton-bar h-3 w-3/4" />
      </div>
    ))}
    <p className="text-xs text-muted-foreground">Grow: 0.2 s · Sweep: 2 s</p>
  </div>
);

const GradientBorderCard = (): JSX.Element => (
  <div className="animate-gradient-x rounded-2xl border border-transparent bg-[length:400%_100%] p-[1px]">
    <div className="animate-float rounded-[1.2rem] bg-card p-6">
      <p className="text-sm text-muted-foreground">Gradient drift 12 s • Border run 3 s</p>
      <div className="mt-4 rounded-xl bg-muted/40 p-4 animate-shine">
        <p className="text-foreground font-medium">Shine sweep 1.25 s</p>
      </div>
    </div>
  </div>
);

const MarqueeDemo = (): JSX.Element => (
  <div className="marquee rounded-2xl border border-border bg-card p-4" style={{ "--marquee-duration": "12000ms" } as CSSProperties}>
    <div className="marquee-track gap-8 text-sm text-muted-foreground">
      {["Studio Night", "Hackathon", "HiveLab Drop", "Midnight Coffee Ritual", "Open Mic"].map((item) => (
        <span key={item} className="text-foreground font-medium">
          {item}
        </span>
      ))}
      {["Studio Night", "Hackathon", "HiveLab Drop", "Midnight Coffee Ritual", "Open Mic"].map((item) => (
        <span key={`${item}-clone`} className="text-foreground font-medium">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const MeteorDemo = (): JSX.Element => {
  const meteorStyle = (delay: number): CSSProperties => ({
    "--meteor-delay": `${delay}s`
  }) as CSSProperties;
  return (
    <div className="meteor-field relative h-40 overflow-hidden rounded-2xl border border-border bg-card">
      {[0, 0.4, 0.8, 1.2].map((delay, idx) => (
        <div key={`meteor-${idx}`} className="meteor" style={meteorStyle(delay)} />
      ))}
      <p className="absolute bottom-3 left-4 text-xs text-muted-foreground">Delay 0.2–1.2 s • Duration 2–10 s</p>
    </div>
  );
};

const TextStaggerSpec = (): JSX.Element => (
  <div className="rounded-2xl border border-border bg-card p-6">
    <p className="text-sm text-muted-foreground">Text stagger presets</p>
    <ul className="mt-3 space-y-1 text-xs text-foreground">
      <li>Item duration: 0.3 s</li>
      <li>Stagger: 0.05 s</li>
      <li>Spring SM: stiffness 340 / damping 28 / mass 0.9</li>
      <li>Spring MD: stiffness 280 / damping 30 / mass 1.0</li>
      <li>Spring LG: stiffness 220 / damping 28 / mass 1.2</li>
    </ul>
  </div>
);

export const Gallery: Story = {
  render: () => (
    <div className="grid gap-10">
      <section className="space-y-3">
        <header>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Hero / Ritual card hover</p>
          <p className="text-base text-foreground">motion-ritual · parallax lift + gold keyline</p>
        </header>
        <RitualCard />
      </section>
      <section className="space-y-3">
        <header>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Dock panel choreography</p>
          <p className="text-base text-foreground">enter-dock-panel · dock-keyline</p>
        </header>
        <DockPanel />
      </section>
      <section className="space-y-3">
        <header>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">CTA press ripple</p>
          <p className="text-base text-foreground">press-gold · gold-press animation</p>
        </header>
        <CtaRipple />
      </section>
      <section className="space-y-3">
        <header>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Status pulse</p>
          <p className="text-base text-foreground">status-pulse · anticipatory chip</p>
        </header>
        <StatusChip />
      </section>
      <section className="space-y-3">
        <header>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Skeleton shimmer</p>
          <p className="text-base text-foreground">hive-skeleton-grow + hive-skeleton-sweep</p>
        </header>
        <SkeletonShimmer />
      </section>
      <section className="space-y-3">
        <header>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Gradient / border / shine</p>
          <p className="text-base text-foreground">gradient 12 s • border run 3 s • shine 1.25 s</p>
        </header>
        <GradientBorderCard />
      </section>
      <section className="space-y-3">
        <header>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Marquee drift</p>
          <p className="text-base text-foreground">hive-marquee-x with custom duration</p>
        </header>
        <MarqueeDemo />
      </section>
      <section className="space-y-3">
        <header>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Meteor streaks</p>
          <p className="text-base text-foreground">hive-meteor · 215° trajectory</p>
        </header>
        <MeteorDemo />
      </section>
      <section className="space-y-3">
        <header>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Text stagger spec</p>
          <p className="text-base text-foreground">Magic UI spring presets</p>
        </header>
        <TextStaggerSpec />
      </section>
    </div>
  )
};
