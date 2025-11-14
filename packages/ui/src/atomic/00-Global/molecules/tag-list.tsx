"use client";

import { Badge } from "../atoms/badge";
import { cn } from "../../../lib/utils";

export interface TagListProps {
  tags: string[];
  max?: number;
  className?: string;
}

/**
 * Compact tag list that collapses overflow into a "+N" badge.
 */
export function TagList({ tags, max = 6, className }: TagListProps) {
  const display = tags.slice(0, max);
  const extra = tags.length - display.length;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {display.map((tag) => (
        <Badge key={tag} variant="secondary" className="capitalize">
          {tag}
        </Badge>
      ))}

      {extra > 0 ? (
        <Badge variant="secondary">+{extra}</Badge>
      ) : null}
    </div>
  );
}

