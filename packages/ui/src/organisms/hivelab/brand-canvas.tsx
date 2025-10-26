// Bounded Context Owner: HiveLab Guild
// Brand-only Canvas surface (no rails). Used for Storybook baseline.
import { brand } from "@/brand/classnames";
import { cn } from "@/utils/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

const backgroundClass =
  "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(circle_at_85%_10%,hsl(var(--accent)/0.12),transparent_55%),linear-gradient(160deg,hsl(var(--background)/0.96),hsl(var(--background)/0.9))] text-foreground";

const canvasClass = cn(
  brand.surface.bento({ accent: "slate", preview: true }),
  "relative w-full max-w-[1280px] min-h-[720px] rounded-[28px] border border-border/35 bg-[hsl(var(--card)/0.88)] p-10 shadow-level2 overflow-hidden"
);

export interface BrandCanvasProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

export function BrandCanvas({ children, className, ...props }: BrandCanvasProps) {
  return (
    <div className={backgroundClass}>
      <div className={cn(canvasClass, className)} {...props}>
        {children ?? null}
      </div>
    </div>
  );
}
