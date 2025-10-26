"use client";
// Bounded Context Owner: Design System Guild
import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactNode,
  KeyboardEvent,
  KeyboardEventHandler
} from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { useOptionalFormField } from "./form-field";

export interface FieldTextProps extends Omit<ComponentPropsWithoutRef<"textarea">, "onSubmit" | "onChange"> {
  readonly multiline?: boolean;
  readonly minRows?: number;
  readonly maxRows?: number;
  readonly sendOnEnter?: boolean;
  readonly onSubmit?: (value: string) => void;
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
  readonly showCount?: boolean;
  readonly inputClassName?: string;
  /** Optional class for the leading slot wrapper (alignment only; no hard styles) */
  readonly leadingClassName?: string;
  /** Optional class for the trailing slot wrapper (alignment only; no hard styles) */
  readonly trailingClassName?: string;
  /** Size of the pill composer */
  readonly size?: "sm" | "md";
  readonly onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const FieldText = ({
  multiline = true,
  minRows = 1,
  maxRows = 6,
  sendOnEnter = false,
  onSubmit,
  leading,
  trailing,
  showCount,
  className,
  inputClassName,
  leadingClassName,
  trailingClassName,
  size = "md",
  value: controlledValue,
  defaultValue,
  onChange,
  id,
  ...rest
}: FieldTextProps) => {
  const ctx = useOptionalFormField();
  const derivedId = id ?? ctx?.controlId;
  const ariaDescribedBy = useMemo(() => {
    const ids = [rest["aria-describedby"], ctx?.descriptionId, ctx?.errorId].filter(Boolean);
    return ids.length ? ids.join(" ") : undefined;
  }, [rest, ctx]);
  const ariaInvalid = ((rest["aria-invalid"] as boolean | undefined) ?? (ctx?.hasError ?? undefined));

  const [uncontrolled, setUncontrolled] = useState<string>(() => (controlledValue == null ? (defaultValue as string) ?? "" : ""));
  const isControlled = controlledValue != null;
  const val = (isControlled ? (controlledValue as string) : uncontrolled) ?? "";

  const taRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!multiline || !taRef.current) return;
    const el = taRef.current;
    const resize = () => {
      el.style.height = "auto";
      const styles = window.getComputedStyle(el);
      const lh = parseFloat(styles.lineHeight || "20");
      const maxH = Math.max(0, (maxRows || 6) * lh);
      const newH = Math.min(maxH || el.scrollHeight, el.scrollHeight);
      el.style.height = `${newH}px`;
    };
    resize();
  }, [val, multiline, maxRows]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e);
    if (!isControlled) setUncontrolled(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!onSubmit) return;
    if (multiline) {
      if (sendOnEnter && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit(val);
      }
      if (!sendOnEnter && (e.key === "Enter" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        onSubmit(val);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(val);
    }
  };

  const handleTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    handleKeyDown(event);
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    handleKeyDown(event);
  };

  const countRight = trailing ? "right-12" : "right-2";

  return (
    <div
      className={cn(
        // Pill container, hairline border, subtle surface
        "group relative flex w-full items-center gap-2 rounded-full border border-input bg-card/70 shadow-sm focus-within:ring-1 focus-within:ring-ring",
        size === "sm" ? "min-h-9 px-2 py-1" : "min-h-11 px-3 py-1.5",
        className
      )}
    >
      {leading ? (
        <div className={cn("flex items-center text-muted-foreground", leadingClassName)}>
          {leading}
        </div>
      ) : null}

      {multiline ? (
        <textarea
          ref={taRef}
          id={derivedId}
          value={val}
          onChange={handleChange}
          onKeyDown={handleTextareaKeyDown}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          rows={minRows}
          className={cn(
            "min-h-[1lh] max-h-[60svh] w-full resize-none bg-transparent py-1 placeholder:text-muted-foreground",
            size === "sm" ? "text-sm" : "text-base md:text-sm",
            // Nuke any form styles from plugin/browser
            "appearance-none outline-none focus:outline-none border-none focus:border-transparent ring-0 focus:ring-0 shadow-none",
            inputClassName
          )}
          {...rest}
        />
      ) : (
        (() => {
          const { onKeyDown: _ignored, ...inputProps } = rest as ComponentPropsWithoutRef<"input">;
          return (
            <input
              id={derivedId}
              type="text"
              value={val}
              onChange={handleChange}
              onKeyDown={handleInputKeyDown}
              aria-describedby={ariaDescribedBy}
              aria-invalid={ariaInvalid}
              className={cn(
                "w-full bg-transparent py-1 placeholder:text-muted-foreground",
                size === "sm" ? "h-7 text-sm" : "h-9 text-base md:text-sm",
                // Nuke any form styles from plugin/browser
                "appearance-none outline-none focus:outline-none border-none focus:border-transparent ring-0 focus:ring-0 shadow-none",
                inputClassName
              )}
              {...inputProps}
            />
          );
        })()
      )}

      {trailing ? (
        <div className={cn("flex items-center gap-1", trailingClassName)}>{trailing}</div>
      ) : null}

      {showCount && (rest.maxLength ?? 0) > 0 ? (
        <div className={cn("pointer-events-none absolute bottom-1 text-caption font-caption text-muted-foreground", countRight)}>
          {val.length}/{rest.maxLength}
        </div>
      ) : null}
    </div>
  );
};
