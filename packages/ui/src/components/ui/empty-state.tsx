import React from "react";
import { cn } from "../../lib/utils";
import { Button, type ButtonProps } from "./button";
import { Heading, Text } from "./typography";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon to display above the title */
  icon?: LucideIcon;
  /** Main title text */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional action button props */
  action?: ButtonProps & { children: React.ReactNode };
  /** Size variant */
  size?: "md" | "lg";
}

function EmptyState({
  className,
  icon: Icon,
  title,
  description,
  action,
  size = "md",
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-6 rounded-xl border-2 border-dashed border-white/12 bg-white/2 text-center transition-colors",
        size === "md" && "p-8",
        size === "lg" && "p-12",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/6">
          <Icon className="h-8 w-8 text-white/60" />
        </div>
      )}
      <div className="space-y-2 max-w-sm">
        <Heading level={size === "lg" ? 2 : 3} className="text-white">
          {title}
        </Heading>
        {description && <Text className="text-white/60">{description}</Text>}
      </div>
      {action && (
        <Button variant="secondary" size="md" {...action}>
          {action.children}
        </Button>
      )}
    </div>
  );
}

export { EmptyState };
