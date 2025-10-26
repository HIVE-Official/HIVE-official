// Bounded Context Owner: Design System Guild
import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const selectStyles = cva(
  "focus-gold w-full rounded-card bg-transparent text-foreground ring-offset-background disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        framed: "border border-border bg-secondary/60",
        underline: "rounded-none border-0 border-b border-border",
        ghost: "border-transparent",
        compact: "text-body-sm font-body-sm py-1"
      },
      size: { sm: "h-9 px-3", md: "h-10 px-3", lg: "h-12 px-4" }
    },
    defaultVariants: { variant: "framed", size: "md" }
  }
);

export interface SelectNativeProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectStyles> {}

export const SelectNative = forwardRef<HTMLSelectElement, SelectNativeProps>((props, ref) => {
  const { className, variant, size, children, ...rest } = props;
  return (
    <select ref={ref} className={cn(selectStyles({ variant, size }), className)} {...rest}>
      {children}
    </select>
  );
});

SelectNative.displayName = "SelectNative";
