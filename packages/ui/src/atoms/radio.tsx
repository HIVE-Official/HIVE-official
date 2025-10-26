// Bounded Context Owner: Design System Guild
import * as React from "react";
import { cn } from "../utils/cn";
export { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, ...props }, ref) => (
    <label className="inline-flex items-start gap-3 text-sm text-foreground">
      <input
        ref={ref}
        type="radio"
        className={cn(
          "mt-1 h-4 w-4 shrink-0 rounded-full border border-border accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      />
      {(label || description) && (
        <span className="flex flex-col leading-tight">
          {label ? <span className="font-medium">{label}</span> : null}
          {description ? (
            <span className="text-xs text-muted-foreground">{description}</span>
          ) : null}
        </span>
      )}
    </label>
  )
);

Radio.displayName = "Radio";
