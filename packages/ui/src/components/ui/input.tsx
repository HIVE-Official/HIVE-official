import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  shake?: boolean; // Motion-based error feedback
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error = false,
      prefixIcon,
      suffixIcon,
      inputSize = "md",
      shake = false,
      ...props
    },
    ref
  ) => {
    // Shake animation class (motion-based error feedback)
    const shakeClass = shake
      ? "animate-[shakeMicro_90ms_cubic-bezier(0.4,0.0,0.2,1)]"
      : "";

    return (
      <div className={cn("relative flex items-center", shakeClass)}>
        {prefixIcon && (
          <span
            className={cn(
              "absolute inline-flex items-center pointer-events-none",
              "text-muted", // Brand color token
              inputSize === "sm" && "left-2",
              inputSize === "md" && "left-3",
              inputSize === "lg" && "left-4"
            )}
          >
            {prefixIcon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            // Base styles - FORCE WHITE TEXT
            "flex w-full rounded-lg font-sans", // Inter
            "bg-surface", // #111111 surface color
            "border border-[#2A2A2A]", // CORRECTED border color
            "!text-white", // FORCE white text with !important
            "placeholder:text-muted", // #6B7280 placeholder
            "transition-all duration-fast ease-hive-smooth", // HIVE motion tokens

            // Focus states - CORRECTED gold accent
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-[#FFD700]", // Gold focus ring
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "focus-visible:border-[#FFD700]", // Gold border on focus

            // Hover state - CORRECTED
            "hover:border-muted", // #6B7280 border on hover
            "hover:bg-[#181818]", // surface-02 on hover

            // Disabled state - CORRECTED
            "disabled:cursor-not-allowed",
            "disabled:opacity-50",
            "disabled:bg-[#0A0A0A]", // background color when disabled
            "disabled:border-disabled", // #3F3F46 border when disabled

            // Size variants
            inputSize === "sm" && "h-9 px-3 py-2 text-body-sm", // 14px text
            inputSize === "md" && "h-11 px-4 py-3 text-body", // 16px text
            inputSize === "lg" && "h-14 px-5 py-4 text-body", // 16px text, larger padding

            // Icon spacing
            prefixIcon && inputSize === "sm" && "pl-8",
            prefixIcon && inputSize === "md" && "pl-10",
            prefixIcon && inputSize === "lg" && "pl-12",
            suffixIcon && inputSize === "sm" && "pr-8",
            suffixIcon && inputSize === "md" && "pr-10",
            suffixIcon && inputSize === "lg" && "pr-12",

            // Error state - MOTION-BASED FEEDBACK (no red colors)
            error && [
              "border-muted", // Use muted border instead of red
              "focus-visible:ring-foreground", // White ring for error emphasis
              "focus-visible:border-foreground", // White border for error emphasis
              // Motion feedback is handled via shake prop
            ],
            className
          )}
          style={{
            color: '#FFFFFF !important',
            // Force white text as inline style fallback
          }}
          ref={ref}
          aria-invalid={error}
          {...props}
        />
        {suffixIcon && (
          <span
            className={cn(
              "absolute inline-flex items-center pointer-events-none",
              "text-muted", // Brand color token
              inputSize === "sm" && "right-2",
              inputSize === "md" && "right-3",
              inputSize === "lg" && "right-4"
            )}
          >
            {suffixIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ============================================================================
// SPECIALIZED INPUT COMPONENTS
// ============================================================================

// Search Input with proper styling
export const SearchInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(({ placeholder = "Search...", prefixIcon, ...props }, ref) => (
  <Input
    ref={ref}
    type="search"
    placeholder={placeholder}
    prefixIcon={
      prefixIcon || (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )
    }
    {...props}
  />
));

SearchInput.displayName = "SearchInput";

// Password Input with toggle visibility
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type" | "suffixIcon">
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Input
      ref={ref}
      type={showPassword ? "text" : "password"}
      suffixIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={cn(
            "text-muted hover:text-foreground transition-colors duration-fast"
          )}
          tabIndex={-1}
        >
          {showPassword ? (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";

// ============================================================================
// BRAND COMPLIANCE VALIDATION
// ============================================================================

export const INPUT_COMPLIANCE = {
  rules: [
    "Use 90ms timing for all interactions",
    "Use single easing curve: cubic-bezier(0.4,0.0,0.2,1)",
    "Border color: #2A2A2A (not other greys)",
    "Motion-based error feedback (shake), not red colors",
    "Gold focus ring: #FFD700",
    "Inter for input text",
  ],
  violations: [
    "Red/green/blue status colors",
    "Multiple easing curves",
    "150ms or other non-approved timings",
    "Wrong border colors (#374151, #262626, etc.)",
    "Wrong font family",
  ],
} as const;

export { Input };

// Brand compliance note: This input component enforces:
// - CORRECTED border color: #2A2A2A
// - Motion-based error feedback (shake) instead of red colors
// - 90ms timing with single easing curve
// - Gold focus states (#FFD700)
// - Proper brand color tokens throughout
