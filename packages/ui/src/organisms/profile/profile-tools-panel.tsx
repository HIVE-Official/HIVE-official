"use client";
// Bounded Context Owner: Identity & Access Management Guild
import { useEffect, useState, type HTMLAttributes } from "react";
import { Sparkles } from "lucide-react";
import { brand } from "@/brand/classnames";
import { cn } from "@/utils/cn";
import { motionClass } from "@/utils/motion";

const TOOL_MESSAGES = [
  {
    title: "Workflow Automations",
    description: "Turn recurring campus rituals into programmable flows."
  },
  {
    title: "Signal Composer",
    description: "Draft, schedule, and syndicate multi-space updates in one sweep."
  },
  {
    title: "Shared Playbooks",
    description: "Drop-in templates for launches, recruiting, and community ops."
  },
  {
    title: "Insights Studio",
    description: "Blend engagement and membership signals into campus-ready dashboards."
  }
] as const;

export interface ProfileToolsPanelProps extends HTMLAttributes<HTMLDivElement> {
  readonly cycleIntervalMs?: number;
}

export function ProfileToolsPanel({ cycleIntervalMs = 5000, className, ...props }: ProfileToolsPanelProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion =
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % TOOL_MESSAGES.length);
    }, cycleIntervalMs);
    return () => clearInterval(id);
  }, [cycleIntervalMs, prefersReducedMotion]);

  const active = TOOL_MESSAGES[index];

  return (
    <section
      className={cn(
        brand.surface.bento({ accent: "gold" }),
        motionClass("ambient"),
        "relative overflow-hidden p-6 sm:p-7 text-foreground",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),rgba(0,0,0,0))] blur-2xl opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(0,0,0,0))]" />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.18)] text-[hsl(var(--primary)/0.9)] backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-label font-label uppercase tracking-[0.28em] text-muted-foreground/70">Hive Lab</p>
            <h2 className="text-h4 font-h4 text-foreground">My Tools</h2>
          </div>
        </div>

        <div className="space-y-2">
          <div
            key={active.title}
            className={cn(
              "rounded-3xl border border-[hsl(var(--border)/0.25)] bg-[hsl(var(--background)/0.65)] p-5 backdrop-blur-lg transition",
              prefersReducedMotion ? "" : "animate-in fade-in-0"
            )}
          >
            <p className="text-h5 font-h5 text-[hsl(var(--primary)/0.95)]">{active.title}</p>
            <p className="mt-2 text-body-sm font-body-sm text-muted-foreground/85">{active.description}</p>
          </div>
          <p className="text-caption font-caption uppercase tracking-[0.3em] text-muted-foreground/60">
            Coming soon • cycle through sneak peeks
          </p>
        </div>
      </div>
    </section>
  );
}
