// Bounded Context Owner: Design System Guild
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import "./inline-notice.css";

export type InlineNoticeVariant = "neutral" | "info" | "success" | "warning" | "destructive";

export interface InlineNoticeProps extends ComponentPropsWithoutRef<"div"> {
  readonly variant?: InlineNoticeVariant;
  readonly heading?: ReactNode;
  readonly children?: ReactNode;
  readonly action?: ReactNode;
}

const ICONS: Record<InlineNoticeVariant, ReactNode> = {
  neutral: <Info />, 
  info: <Info />, 
  success: <CheckCircle2 />, 
  warning: <AlertTriangle />, 
  destructive: <AlertCircle />,
};

export const InlineNotice = ({ variant = "neutral", heading, children, action, className, ...props }: InlineNoticeProps) => {
  const ariaRole = variant === "warning" || variant === "destructive" ? "alert" : "status";
  return (
    <div
      role={ariaRole}
      data-variant={variant}
      className={cn("inline-notice", className)}
      {...props}
    >
      <div className="inline-notice-icon" aria-hidden>
        {ICONS[variant]}
      </div>
      <div className="inline-notice-content">
        {heading ? <div className="inline-notice-heading">{heading}</div> : null}
        {children ? <div className={cn(heading && "mt-1", "inline-notice-body")}>{children}</div> : null}
      </div>
      {action ? <div className="inline-notice-action">{action}</div> : null}
    </div>
  );
};
