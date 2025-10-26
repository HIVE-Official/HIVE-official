"use client";
// Bounded Context Owner: Design System Guild
import { useToast, type ToasterToast } from "../hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "../molecules/toast";
import { cn } from "../utils/cn";
import { motionClass } from "../utils/motion";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }: ToasterToast) => {
        const variant = props.variant ?? "default";
        return (
          <Toast key={id} {...props}>
            <div className={cn("flex w-full items-start gap-3", motionClass("ambient"), "animate-in fade-in-0 slide-in-from-top-2")}>
              <span
                className={cn("mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full")}
                style={{ backgroundColor: iconBgColorValue[variant] ?? iconBgColorValue.default }}
              >
                <span
                  aria-hidden
                  className="h-[14px] w-[14px]"
                  style={{
                    backgroundColor: iconColorValue[variant] ?? iconColorValue.default,
                    mask: `url(${iconMask}) center / contain no-repeat`,
                    WebkitMask: `url(${iconMask}) center / contain no-repeat`,
                    display: "inline-block",
                  }}
                />
              </span>
              <div className="grid flex-1 gap-2 text-left">
                {title ? <ToastTitle>{title}</ToastTitle> : null}
                {description ? <ToastDescription>{description}</ToastDescription> : null}
                {action ? <div className="pt-1 text-sm">{action}</div> : null}
              </div>
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

const iconMask = "/assets/hive-logo-white.svg";

const iconColorValue: Record<string, string> = {
  default: "hsl(var(--primary) / 0.9)",
  info: "hsl(var(--ring) / 0.9)",
  success: "hsl(var(--success) / 0.9)",
  warning: "hsl(var(--warning) / 0.9)",
  destructive: "hsl(var(--destructive-foreground) / 0.92)",
};

const iconBgColorValue: Record<string, string> = {
  default: "hsl(var(--foreground) / 0.08)",
  info: "hsl(var(--ring) / 0.10)",
  success: "hsl(var(--success) / 0.10)",
  warning: "hsl(var(--warning) / 0.10)",
  destructive: "hsl(var(--destructive) / 0.16)",
};
