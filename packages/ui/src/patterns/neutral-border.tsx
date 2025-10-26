import * as React from "react";
import { cn } from "@/utils/cn";

export interface NeutralBorderBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "low" | "medium" | "high";
}

export function NeutralBorderBox({ intensity = "medium", className, children, ...rest }: NeutralBorderBoxProps) {
  const alpha = intensity === "low" ? 0.08 : intensity === "high" ? 0.18 : 0.12;
  return (
    <div className={cn("relative rounded-xl p-[1px]", className)} {...rest}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,${alpha}), rgba(255,255,255,0))`
        }}
      />
      <div className="relative rounded-[calc(theme(borderRadius.xl)-1px)] border border-border bg-card p-4">
        {children}
      </div>
    </div>
  );
}

