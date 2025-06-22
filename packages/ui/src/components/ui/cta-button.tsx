import { forwardRef } from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "../../lib/utils";

export const CtaButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "text-white border-2 border-accent-gold/70 rounded-lg hover:bg-white/10 hover:shadow-lg transition-transform duration-100 scale-[1.03] active:scale-100",
          className
        )}
        {...props}
      />
    );
  }
);
CtaButton.displayName = "CtaButton";
