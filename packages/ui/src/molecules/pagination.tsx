// Bounded Context Owner: Design System Guild
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/atoms/button";

export interface PaginationProps extends ComponentPropsWithoutRef<"nav"> {
  readonly page: number;
  readonly pageCount: number;
  readonly onPageChange: (page: number) => void;
}

export const Pagination = ({ page, pageCount, onPageChange, className, ...props }: PaginationProps) => {
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(pageCount, page + 1));
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <nav aria-label="pagination" className={cn("flex items-center gap-2", className)} {...props}>
      <Button variant="outline" size="sm" onClick={prev} disabled={page <= 1} aria-label="Previous page">
        Prev
      </Button>
      <ul className="flex items-center gap-1">
        {pages.map((p) => (
          <li key={p}>
            <Button
              variant={p === page ? "secondary" : "outline"}
              size="sm"
              aria-current={p === page ? "page" : undefined}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Button>
          </li>
        ))}
      </ul>
      <Button variant="outline" size="sm" onClick={next} disabled={page >= pageCount} aria-label="Next page">
        Next
      </Button>
    </nav>
  );
};

