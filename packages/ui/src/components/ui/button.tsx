import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// BUTTON VARIANTS - HIVE Brand System v1.0 (CORRECTED)
// ============================================================================

const buttonVariants = cva(
  // Base styles - CORRECTED to match brand system
  [
    "hive-button-base",
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "whitespace-nowrap",
    "rounded-lg",
    "font-medium",
    "font-sans", // Geist Sans Variable
    "transition-all",
    "duration-[90ms]", // CORRECTED: 90ms for micro-interactions
    "ease-[cubic-bezier(0.22,0.61,0.36,1)]", // CORRECTED: single brand easing
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[#FFD700]", // Gold focus ring
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[#0A0A0A]", // Background color
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg]:size-4",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Primary: CORRECTED - NO GOLD FILL, surface bg + gold text/border
        default: [
          "bg-[#111111]", // surface
          "text-[#FFD700]", // gold text
          "border",
          "border-[#FFD700]", // gold border
          "hover:text-[#EAC200]", // gold-600 hover (CORRECTED)
          "hover:border-[#EAC200]", // gold-600 border hover
          "hover:scale-[1.02]", // 2% scale increase
          "active:text-[#C4A500]", // gold-700 active (CORRECTED)
          "active:border-[#C4A500]", // gold-700 border active
          "active:scale-[0.98]", // Press feedback
        ],

        // Ghost: Minimal styling
        ghost: [
          "text-[#FFFFFF]", // foreground
          "bg-transparent",
          "border",
          "border-[#2A2A2A]", // CORRECTED border color
          "hover:bg-[#111111]", // surface hover
          "hover:border-[#6B7280]", // muted border hover
          "active:bg-[#181818]", // surface-02 active
        ],

        // Outline: Border-focused
        outline: [
          "border",
          "border-[#2A2A2A]", // CORRECTED border color
          "text-[#FFFFFF]", // foreground
          "bg-transparent",
          "hover:bg-[#111111]", // surface hover
          "hover:border-[#6B7280]", // muted border hover
          "active:bg-[#181818]", // surface-02 active
        ],

        // Link: Text-only
        link: [
          "text-[#FFD700]", // gold text
          "underline-offset-4",
          "hover:underline",
          "hover:text-[#EAC200]", // gold-600 hover (CORRECTED)
          "active:text-[#C4A500]", // gold-700 active (CORRECTED)
          "bg-transparent",
          "border-0",
        ],

        // Ritual Badge: ONLY ALLOWED GOLD FILL
        "ritual-badge": [
          "bg-[#FFD700]", // ONLY place for gold fill
          "text-[#0A0A0A]", // background color text
          "border-0",
          "rounded-full", // Pill shape for ritual badges
          "hover:bg-[#EAC200]", // gold-600 hover
          "active:bg-[#C4A500]", // gold-700 active
          "px-3", // Tighter padding for badges
          "py-1",
          "text-xs", // Smaller text for badges
          "font-semibold", // Bold for emphasis
        ],

        // Destructive: Uses motion feedback, not red colors
        destructive: [
          "bg-[#111111]", // surface
          "text-[#FFFFFF]", // foreground
          "border",
          "border-[#6B7280]", // muted border
          "hover:bg-[#181818]", // surface-02 hover
          "hover:border-[#FFFFFF]", // white border for emphasis
          "active:bg-[#1F1F1F]", // surface-03 active
          // Motion feedback will be handled via animations
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-lg",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ============================================================================
// BUTTON INTERFACE
// ============================================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as child component (e.g., Link)
   */
  asChild?: boolean;

  /**
   * Loading state with spinner
   */
  loading?: boolean;

  /**
   * Icon to display on the left
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right
   */
  rightIcon?: React.ReactNode;

  /**
   * Make button full width
   */
  fullWidth?: boolean;

  /**
   * Add shake animation for error feedback (motion-based)
   */
  shake?: boolean;
}

// ============================================================================
// LOADING SPINNER COMPONENT - CORRECTED COLORS
// ============================================================================

const LoadingSpinner = ({ variant }: { variant?: string }) => {
  // Spinner color based on variant
  const spinnerColor = variant === "ritual-badge" ? "#0A0A0A" : "#FFD700";

  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ color: spinnerColor }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// ============================================================================
// BUTTON COMPONENT - CORRECTED
// ============================================================================

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      shake = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Disable button when loading
    const isDisabled = disabled || loading;

    // Shake animation class (motion-based error feedback)
    const shakeClass = shake
      ? "animate-[shake_90ms_cubic-bezier(0.22,0.61,0.36,1)]"
      : "";

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          shakeClass,
          className
        )}
        {...props}
      >
        {/* Left icon or loading spinner */}
        {loading ? (
          <LoadingSpinner variant={variant} />
        ) : leftIcon ? (
          <span className="flex items-center justify-center">{leftIcon}</span>
        ) : null}

        {/* Button content */}
        {children}

        {/* Right icon (not shown when loading) */}
        {!loading && rightIcon && (
          <span className="flex items-center justify-center">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

// ============================================================================
// SPECIALIZED BUTTON COMPONENTS
// ============================================================================

// Ritual Badge Button - for special moments only
export const RitualBadge = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>(({ children, ...props }, ref) => (
  <Button ref={ref} variant="ritual-badge" size="sm" {...props}>
    {children}
  </Button>
));

RitualBadge.displayName = "RitualBadge";

// Primary CTA Button - follows brand no-gold-fill rule
export const CTAButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>(({ children, ...props }, ref) => (
  <Button ref={ref} variant="default" size="lg" {...props}>
    {children}
  </Button>
));

CTAButton.displayName = "CTAButton";

// ============================================================================
// BRAND COMPLIANCE VALIDATION
// ============================================================================

export const BUTTON_COMPLIANCE = {
  rules: [
    "NO gold fills except ritual badges",
    "Use 90ms timing for all interactions",
    "Use single easing curve: cubic-bezier(0.22, 0.61, 0.36, 1)",
    "Gold text/borders only: #FFD700, hover #EAC200, active #C4A500",
    "Motion-based error feedback (shake), not color changes",
    "Geist Sans Variable for button text",
  ],
  violations: [
    "Gold background on primary buttons",
    "Multiple easing curves",
    "150ms or other non-approved timings",
    "Red/green/blue status colors",
    "Wrong font family",
  ],
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export { Button, buttonVariants };
export type { ButtonProps };

// Brand compliance note: This button component enforces:
// - NO gold fills except ritual badges
// - Corrected timing: 90ms micro-interactions
// - Single easing: cubic-bezier(0.22, 0.61, 0.36, 1)
// - Corrected colors: #EAC200 hover, #C4A500 active
// - Motion-based feedback instead of color changes
