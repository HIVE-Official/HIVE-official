// Bounded Context Owner: Design System Guild
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface SegmentedItem {
  readonly value: string;
  readonly label: ReactNode;
  readonly disabled?: boolean;
}

export interface SegmentedControlProps extends Omit<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "onValueChange"> {
  readonly items: SegmentedItem[];
  readonly onValueChange?: (value: string) => void;
  readonly size?: "sm" | "md";
}

export const SegmentedControl = ({ items, className, size = "md", onValueChange, ...props }: SegmentedControlProps) => {
  const safeItems = Array.isArray(items) ? items : [];
  return (
    <RadioGroupPrimitive.Root
      className={cn("inline-flex items-center gap-1 rounded-md border border-input bg-card p-1", className)}
      onValueChange={onValueChange}
      {...props}
    >
      {safeItems.map((it) => (
        <RadioGroupPrimitive.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className={cn(
            "select-none rounded-[calc(var(--radius)-2px)] text-sm text-muted-foreground data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
            size === "sm" ? "px-2 py-1" : "px-3 py-1.5"
          )}
        >
          {it.label}
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
};
