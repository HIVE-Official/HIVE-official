"use client"

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/index";

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "onChange" | "children"
  > {
  label?: string;
  description?: string;
  onChange?: (checked: boolean) => void;
  helperText?: string;
}

const handleChangeProxy = (
  checked: CheckedState,
  onChange?: (checked: boolean) => void
) => {
  if (!onChange) return;
  onChange(checked === true);
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, helperText, onCheckedChange, onChange, disabled, ...props }, ref) => (
  <label className={cn("flex items-start gap-3 text-sm", disabled && "opacity-60")} data-disabled={disabled || undefined}>
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn("checkbox-base", className)}
      disabled={disabled}
      onCheckedChange={(state) => {
        onCheckedChange?.(state);
        handleChangeProxy(state, onChange);
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="checkbox-indicator">
        <CheckIcon className="checkbox-check" aria-hidden="true" />
        <MinusIcon className="checkbox-minus" aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {(label || description || helperText) && (
      <span className="checkbox-label">
        {label ? <span className="font-medium">{label}</span> : null}
        {description ? <span className="checkbox-description">{description}</span> : null}
        {helperText ? <span className="checkbox-description">{helperText}</span> : null}
      </span>
    )}
  </label>
));

Checkbox.displayName = "Checkbox";

export { Checkbox };
