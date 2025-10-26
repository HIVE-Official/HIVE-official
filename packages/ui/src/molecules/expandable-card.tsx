// Bounded Context Owner: Design System Guild
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../index";
import { cn } from "../utils/cn";

export interface ExpandableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  mediaUrl?: string;
  actions?: React.ReactNode;
  reveal?: React.ReactNode;
  compact?: boolean;
}

export const ExpandableCard = React.forwardRef<HTMLDivElement, ExpandableCardProps>(
  ({ className, title, description, mediaUrl, actions, reveal, compact = false, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        tabIndex={0}
        className={cn(
          "group relative overflow-hidden transition-[transform] duration-smooth ease-standard focus-visible:ring-2",
          className
        )}
        {...props}
      >
        {mediaUrl ? (
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img src={mediaUrl} alt="" className="h-full w-full object-cover" aria-hidden />
          </div>
        ) : null}

        {(title || description) && (
          <CardHeader className={cn(compact ? "p-4" : undefined)}>
            {title ? <CardTitle>{title}</CardTitle> : null}
            {description ? <CardDescription>{description}</CardDescription> : null}
          </CardHeader>
        )}

        <CardContent className={cn(compact ? "p-4 pt-0" : undefined)}>{children}</CardContent>

        {reveal ? (
          <div
            className={cn(
              "pointer-events-none max-h-0 overflow-hidden transition-[max-height] duration-300 ease-standard",
              "group-hover:max-h-40 group-focus-within:max-h-40"
            )}
            aria-hidden
          >
            <div className={cn("px-6 pt-3 pb-4", compact && "px-4 pt-2 pb-3", "text-body-sm font-body-sm text-muted-foreground")}>{reveal}</div>
          </div>
        ) : null}

        {actions ? (
          <div className={cn("px-6 pb-4", compact && "px-4 pb-3")}>{actions}</div>
        ) : null}

        {reveal ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-2.25rem)] h-8 bg-gradient-to-b from-transparent to-[hsl(var(--card))] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden />
        ) : null}
      </Card>
    );
  }
);

ExpandableCard.displayName = "ExpandableCard";

