import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Polish/Layout Shift Patterns",
};
export default meta;

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-foreground/10 ${className}`} aria-hidden />
}

export const NoShiftPatterns: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-h4 font-h4 mb-2">Reserve space (image with aspect-ratio)</h4>
        <div className="aspect-[16/9] overflow-hidden rounded-md border border-border">
          <Skeleton className="h-full w-full" />
        </div>
        <p className="mt-2 text-caption text-muted-foreground">Use CSS aspect-ratio or fixed height to prevent reflow.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-h4 font-h4 mb-2">Skeleton mirrors final layout</h4>
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <p className="mt-2 text-caption text-muted-foreground">Do not change spacing/line counts when content loads.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-h4 font-h4 mb-2">Transform/opacity animations only</h4>
        <div className="flex flex-wrap gap-3">
          <div className="enter-fade rounded-md border border-border bg-background px-3 py-2">opacity</div>
          <div className="enter-slide-up rounded-md border border-border bg-background px-3 py-2">transform</div>
        </div>
        <p className="mt-2 text-caption text-muted-foreground">Avoid animating top/left/width/height.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-h4 font-h4 mb-2">Sticky headers & action bars</h4>
        <div className="h-40 overflow-auto rounded-md border border-border">
          <div className="sticky top-0 z-10 border-b border-border bg-background/80 p-2 backdrop-blur">Sticky header</div>
          <div className="space-y-2 p-2">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className="h-6 rounded bg-foreground/10"/>
            ))}
          </div>
        </div>
        <p className="mt-2 text-caption text-muted-foreground">Use sticky affordances to reduce jump on scroll.</p>
      </div>
    </div>
  ),
};

