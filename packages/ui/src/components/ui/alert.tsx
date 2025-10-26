import * as React from "react";
import { cn } from "@/utils/cn";
import "./alert.css";

export type AlertVariant = "gold" | "info" | "success" | "warning" | "destructive" | "muted" | "default";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, children, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      data-variant={variant === "default" ? "muted" : variant}
      className={cn("alert-root", className)}
      {...props}
    >
      {icon ? (
        <div className="alert-icon" aria-hidden="true">
          {icon}
        </div>
      ) : (
        <div className="alert-icon" data-default-icon aria-hidden="true" />
      )}
      <div className="alert-content">{children}</div>
    </div>
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("alert-title", className)} {...props} />
  )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("alert-description", className)} {...props} />
  )
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
