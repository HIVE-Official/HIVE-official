import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Loader2, X } from "lucide-react";

import { cn } from "@/utils/index";
import "./button.css";

const buttonVariants = cva(
  "button-base pressable inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Light neutral button (default)
        default:
          "border border-border bg-background text-foreground hover:bg-muted hover:text-foreground",
        // Gold CTA: primary action
        gold:
          "button-gold press-gold btn-anim-icons text-[hsl(var(--primary-foreground))]",
        // Brand alias → gold (kept for legacy callsites)
        brand:
          "button-gold text-[hsl(var(--primary-foreground))]",
        // Secondary neutral
        secondary:
          "bg-secondary text-secondary-foreground border border-border/60 hover:border-border",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-foreground bg-transparent text-foreground hover:bg-muted/40",
        ghost:
          "text-foreground hover:bg-muted/60 button-hover",
        link:
          "text-[hsl(var(--primary))] underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  status?: "idle" | "loading" | "success" | "error";
  statusText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      status,
      statusText,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const resolvedVariant = variant === "brand" ? "gold" : variant;
    const resolvedStatus: "idle" | "loading" | "success" | "error" =
      status ?? (isLoading ? "loading" : "idle");
    const isBusy = resolvedStatus === "loading";

    if (asChild) {
      return (
        <Comp
          className={cn(
            buttonVariants({ variant: resolvedVariant, size, className }),
            isBusy && "pointer-events-none opacity-80"
          )}
          ref={ref}
          disabled={disabled || isBusy}
          data-status={resolvedStatus}
          aria-busy={isBusy || undefined}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    const showSpinner = resolvedStatus === "loading";
    const showSuccess = resolvedStatus === "success";
    const showError = resolvedStatus === "error";

    const politeMessage =
      resolvedStatus === "loading"
        ? loadingText ?? "Loading..."
        : resolvedStatus === "success"
        ? statusText ?? "Action complete"
        : resolvedStatus === "error"
        ? statusText ?? "Action failed"
        : undefined;

    return (
      <Comp
        className={cn(buttonVariants({ variant: resolvedVariant, size, className }))}
        ref={ref}
        disabled={disabled || isBusy}
        data-status={resolvedStatus}
        aria-busy={isBusy || undefined}
        {...props}
      >
        <span className="button-status-layer">
          <span className="button-inner" data-hidden={resolvedStatus !== "idle"}>
            {children}
          </span>
          {politeMessage ? (
            <span className="sr-only" aria-live="polite">
              {politeMessage}
            </span>
          ) : null}
          {showSpinner ? (
            <span className="button-spinner" aria-hidden>
              <Loader2 className="h-4 w-4 animate-spin" />
            </span>
          ) : null}
          {showSuccess ? (
            <span className="button-status-icon button-status-success" aria-hidden>
              <Check className="h-4 w-4" />
            </span>
          ) : null}
          {showError ? (
            <span className="button-status-icon button-status-error" aria-hidden>
              <X className="h-4 w-4" />
            </span>
          ) : null}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
