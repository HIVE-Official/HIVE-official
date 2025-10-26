// Bounded Context Owner: Design System Guild
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  readonly icon?: ReactNode;
  readonly title: string;
  readonly description?: string;
  readonly action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action, className, ...props }: EmptyStateProps) => (
  <div
    className={cn(
      "flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-background/80 p-10 text-center",
      className
    )}
    {...props}
  >
    {icon ? <div className="text-muted-foreground">{icon}</div> : null}
    <h3 className="text-h4 font-h4 text-foreground">{title}</h3>
    {description ? <p className="max-w-sm text-body-sm font-body-sm text-muted-foreground">{description}</p> : null}
    {action ? <div className="mt-2">{action}</div> : null}
  </div>
);
