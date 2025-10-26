// Bounded Context Owner: HiveLab Guild
// Floating Canvas rail primitive (left/right). Brand-aligned, minimal.
import { cn } from "@/utils/cn";
import { brand } from "@/brand/classnames";
import type { HTMLAttributes, PropsWithChildren } from "react";

export type CanvasRailSide = "left" | "right";

export interface CanvasRailProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  readonly side: CanvasRailSide;
  readonly title?: string;
  readonly widthClassName?: string; // override width, default w-[256px]
}

const baseRailClass = cn(
  brand.surface.glass(),
  // Full-height, clipped to canvas, with internal scroll when content grows
  "pointer-events-auto flex h-full max-h-full flex-col gap-4 overflow-y-auto rounded-[28px] border border-[hsl(var(--border)/0.45)] p-5 shadow-level2"
);

export function CanvasRail({ side, title, className, widthClassName, children, ...props }: CanvasRailProps) {
  // Shift across the canvas inner padding (p-10) so rails flush to canvas edge
  const anchorClass = side === "left" ? "-left-10" : "-right-10";
  return (
    <div
      className={cn(
        "absolute inset-y-0",
        anchorClass,
        baseRailClass,
        // Responsive default widths: tighten mid, expand wide
        widthClassName ?? "w-[232px] md:w-[248px] lg:w-[272px] xl:w-[304px]",
        className
      )}
      {...props}
    >
      {title ? <RailLabel>{title}</RailLabel> : null}
      {children}
    </div>
  );
}

export function RailLabel({ children }: PropsWithChildren) {
  return (
    <strong className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">{children}</strong>
  );
}

export function RailSection({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn("flex flex-col gap-3", className)}>{children}</section>;
}
