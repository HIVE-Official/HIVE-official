// Bounded Context Owner: Design System Guild
import * as React from "react";
import { cn } from "../utils/cn";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  readonly label: string;
  readonly href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  readonly items: readonly Crumb[];
  readonly separatorClassName?: string;
  /**
   * When provided and items exceed this count, items collapse to:
   * first, ellipsis, last (and possibly one middle item if maxVisible>3).
   */
  readonly maxVisible?: number;
}

export const Breadcrumb = ({ items, className, separatorClassName, maxVisible, ...props }: BreadcrumbProps) => {
  const renderItems = React.useMemo(() => {
    if (!maxVisible || items.length <= maxVisible || maxVisible < 3) return items;
    const first = items[0];
    const last = items[items.length - 1];
    if (maxVisible === 3) {
      return [first, { label: "…" }, last] as readonly Crumb[];
    }
    // maxVisible >= 4 → include middle item
    const midIndex = Math.floor(items.length / 2);
    const middle = items[midIndex];
    return [first, { label: "…" }, middle, last] as readonly Crumb[];
  }, [items, maxVisible]);

  return (
    <nav aria-label="Breadcrumb" className={cn("text-body-sm font-body-sm text-muted-foreground", className)} {...props}>
      <ol className="flex items-center gap-2 overflow-hidden">
        {renderItems.map((item, index) => {
          const isLast = index === renderItems.length - 1;
          const isEllipsis = item.label === "…" && !item.href;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2 min-w-0">
              {item.href && !isLast ? (
                <a href={item.href} className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background truncate">
                  {item.label}
                </a>
              ) : (
                <span className={cn("text-foreground truncate", isLast && "font-body")} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && !isEllipsis ? (
                <ChevronRight className={cn("h-4 w-4 flex-shrink-0", separatorClassName)} aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
