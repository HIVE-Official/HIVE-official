"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type TableAlign = "left" | "center" | "right";

export interface SimpleTableColumn<Row extends Record<string, unknown>> {
  key: keyof Row & (string | number | symbol);
  header: React.ReactNode;
  align?: TableAlign;
  render?: (row: Row) => React.ReactNode;
}

export interface SimpleTableProps<Row extends Record<string, unknown>>
  extends React.HTMLAttributes<HTMLDivElement> {
  columns: Array<SimpleTableColumn<Row>>;
  rows: Row[];
  caption?: React.ReactNode;
  stickyHeader?: boolean;
  dense?: boolean;
}

export const SimpleTable = React.forwardRef(function SimpleTable<
  Row extends Record<string, unknown>
>(
  {
    columns,
    rows,
    caption,
    stickyHeader = true,
    dense = false,
    className,
    ...props
  }: SimpleTableProps<Row>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-x-auto rounded-xl border",
        className
      )}
      {...props}
    >
      <table className="min-w-full border-collapse bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_20%,transparent)] text-sm">
        {caption ? (
          <caption className="px-4 py-3 text-left text-[var(--hive-text-secondary)]">
            {caption}
          </caption>
        ) : null}
        <thead
          className={cn(
            "bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_35%,transparent)] text-[var(--hive-text-secondary)]",
            stickyHeader && "sticky top-0 z-10"
          )}
        >
          <tr>
            {columns.map((column, index) => (
              <th
                key={`${String(column.key)}-${index}`}
                scope="col"
                className={cn(
                  "border-b border-[color-mix(in_srgb,var(--hive-border-default,#373945)_65%,transparent)] px-4 py-3 text-left font-semibold",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right"
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="even:bg-white/0 odd:bg-white/0 transition-colors hover:bg-white/[0.02] motion-reduce:transition-none"
            >
              {columns.map((column, colIndex) => {
                const cell = column.render
                  ? column.render(row)
                  : (row[column.key] as React.ReactNode);

                return (
                  <td
                    key={`${String(column.key)}-${colIndex}`}
                    className={cn(
                      "border-b border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_50%,transparent)] px-4",
                      dense ? "py-2" : "py-3",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right"
                    )}
                    data-label={
                      typeof column.header === "string"
                        ? column.header
                        : undefined
                    }
                  >
                    {cell ?? ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
