import * as React from "react";

import { cn } from "@/utils/index";
import "./textarea.css";

type TextareaProps = React.ComponentProps<"textarea"> & {
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  size?: "sm" | "md" | "lg";
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      autoResize = true,
      minRows = 3,
      maxRows,
      onChange,
      size = "md",
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

    const setRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [ref]
    );

    const recomputeHeight = React.useCallback(
      (node?: HTMLTextAreaElement | null) => {
        const element = node ?? internalRef.current;
        if (!element) return;
        if (!autoResize) return;

        const computed = window.getComputedStyle(element);
        const lineHeight = parseFloat(computed.lineHeight || "20") || 20;
        const minHeight = Math.max(minRows, 1) * lineHeight;
        element.style.setProperty("--textarea-min-height", `${minHeight}px`);

        element.style.height = "auto";
        let nextHeight = element.scrollHeight;
        if (maxRows && maxRows > 0) {
          const maxHeight = maxRows * lineHeight;
          nextHeight = Math.min(maxHeight, nextHeight);
          element.style.overflowY = element.scrollHeight > maxHeight ? "auto" : "hidden";
        } else {
          element.style.overflowY = "hidden";
        }
        element.style.height = `${Math.max(nextHeight, minHeight)}px`;
      },
      [autoResize, maxRows, minRows]
    );

    React.useLayoutEffect(() => {
      if (!autoResize) return;
      recomputeHeight();
    }, [autoResize, recomputeHeight, props.value]);

    React.useEffect(() => {
      if (!autoResize) return;
      recomputeHeight();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.defaultValue]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        recomputeHeight(event.currentTarget);
      }
      onChange?.(event);
    };

    return (
      <textarea
        ref={setRef}
        data-auto-resize={autoResize ? "true" : undefined}
        data-invalid={ariaInvalid}
        onChange={handleChange}
        aria-invalid={ariaInvalid}
        className={cn("textarea-base", size !== "md" && `size-${size}`, className)}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
