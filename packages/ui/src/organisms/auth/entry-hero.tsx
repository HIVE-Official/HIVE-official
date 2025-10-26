// Entry Hero — Campus Pulse (movement without slogans)
"use client";
import * as React from "react";
import { Button } from "@/atoms/button";
import { cn } from "@/utils/cn";

export interface EntryHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  onGetStarted?: () => void;
  onWhatIsHive?: () => void;
}

export function EntryHero({
  title = "Your campus. In one place.",
  subtitle = "One-tap sign-in. No passwords.",
  onGetStarted,
  onWhatIsHive,
  className,
  ...rest
}: EntryHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-card/60 p-10 text-center md:p-14",
        "surface-glass",
        className
      )}
      {...rest}
    >
      {/* Background: Campus Pulse */}
      <CampusPulseBackground />

      <div className="relative z-10 mx-auto max-w-2xl">
        <h1 className="text-display font-display tracking-tight heading-underline-gold">{title}</h1>
        <p className="mt-2 text-lead font-body text-muted-foreground">{subtitle}</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button className="btn-prominent focus-ring btn-anim-icons" onClick={onGetStarted}>
            <span className="icon-leading icon-motion-pop">★</span>
            Get started
            <span className="icon-trailing icon-motion-pop">→</span>
          </Button>
          <Button variant="outline" onClick={onWhatIsHive}>What is HIVE?</Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 opacity-80">
          <span className="text-caption font-caption text-muted-foreground">Used by students at</span>
          <span className="text-body font-body">UB</span>
          {/* Add more campus crests/logos as needed */}
        </div>
      </div>
    </section>
  );
}

function CampusPulseBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Spotlight/gradient wash (Magic UI-inspired; tokenized) */}
      <div className="absolute -inset-16 rounded-[48px] bg-[radial-gradient(60%_50%_at_50%_30%,rgba(255,255,255,0.08),transparent_70%)]" />
      {/* Low-opacity drifting dots (CPU-light) */}
      <div className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_30%,#000,transparent_80%)]">
        <div className="absolute left-1/4 top-1/3 size-2 rounded-full bg-foreground/10 anim-fade-in" />
        <div className="absolute left-1/2 top-1/4 size-1.5 rounded-full bg-foreground/10 anim-scale-in" />
        <div className="absolute left-2/3 top-2/3 size-1.5 rounded-full bg-foreground/10 anim-fade-in" />
        <div className="absolute left-1/3 top-2/3 size-1.5 rounded-full bg-foreground/10 anim-scale-in" />
      </div>
    </div>
  );
}
