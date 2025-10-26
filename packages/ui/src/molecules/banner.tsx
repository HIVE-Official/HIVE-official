// Bounded Context Owner: Design System Guild
import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type BannerVariant = "info" | "neutral" | "error" | "success" | "warning";

const tone: Record<BannerVariant, string> = {
  info: "border-primary/40 bg-primary/10 text-primary",
  neutral: "border-muted bg-muted/30 text-foreground",
  error: "border-destructive/40 bg-destructive/10 text-destructive",
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-yellow-500/40 bg-yellow-500/10 text-yellow-700"
};

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: BannerVariant;
  readonly title?: string;
  readonly description?: string;
}

export const Banner = ({ variant = "neutral", title, description, className, children, ...props }: BannerProps) => (
  <div className={cn("rounded-md border p-4 text-body-sm font-body-sm", tone[variant], className)} {...props}>
    {title ? <p className="text-body font-body">{title}</p> : null}
    {description ? <p className="mt-1 text-body-sm font-body-sm opacity-90">{description}</p> : null}
    {children}
  </div>
);
