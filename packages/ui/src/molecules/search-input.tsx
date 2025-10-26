"use client";
// Bounded Context Owner: Design System Guild
import type { ChangeEvent, ComponentPropsWithoutRef } from "react";
import { forwardRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Input } from "@/atoms/input";
import { X, Search as SearchIcon } from "lucide-react";

export interface SearchInputProps extends ComponentPropsWithoutRef<typeof Input> {
  readonly onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value: controlled, defaultValue, onChange, onClear, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = useState<string>(() => (controlled == null ? (defaultValue as string) ?? "" : ""));
    const isControlled = controlled != null;
    const v = (isControlled ? (controlled as string) : uncontrolled) ?? "";

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (!isControlled) setUncontrolled(e.target.value);
    };

    const clear = () => {
      if (!isControlled) setUncontrolled("");
      onClear?.();
    };

    return (
      <div className={cn("relative", className)}>
        <SearchIcon className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          role="searchbox"
          value={v}
          onChange={handleChange}
          className="pl-8 pr-8"
          {...props}
        />
        {v ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted/50"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
