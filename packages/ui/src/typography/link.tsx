import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const linkVariants = cva(
  "[font-family:var(--hive-font-family-sans,'Geist Sans',system-ui,sans-serif)] inline-flex items-center gap-2 leading-snug transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-[var(--hive-background-primary)] underline-offset-[0.3em]",
  {
    variants: {
      tone: {
        brand: "text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/85",
        neutral: "text-[var(--hive-text-primary)] hover:text-[var(--hive-text-secondary)]",
        muted: "text-[var(--hive-text-muted)] hover:text-[var(--hive-text-secondary)]",
        inverse: "text-[var(--hive-text-inverse)] hover:text-[var(--hive-text-inverse)]/80",
        danger: "text-[var(--hive-status-error)] hover:text-[var(--hive-status-error)]/85",
      },
      size: {
        sm: "text-[var(--hive-font-size-body-sm)]",
        md: "text-[var(--hive-font-size-body-md)]",
        lg: "text-[var(--hive-font-size-body-lg)]",
      },
      weight: {
        regular: "font-[var(--hive-font-weight-normal,400)]",
        medium: "font-[var(--hive-font-weight-medium,500)]",
        semibold: "font-[var(--hive-font-weight-semibold,600)]",
      },
      underline: {
        hover: "hover:underline",
        always: "underline decoration-[color:currentColor] decoration-1",
        none: "no-underline",
      },
      subtle: {
        true: "opacity-80 hover:opacity-100",
      },
    },
    defaultVariants: {
      tone: "brand",
      size: "md",
      weight: "medium",
      underline: "hover",
    },
  }
);

type LinkVariantProps = VariantProps<typeof linkVariants>;

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    LinkVariantProps {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const iconSizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

const renderIcon = (
  icon: React.ReactNode,
  size: keyof typeof iconSizeMap,
  position: "leading" | "trailing"
) => {
  if (!icon) return null;

  const wrapper = "inline-flex items-center justify-center";
  const dimension = iconSizeMap[size];

  if (React.isValidElement(icon)) {
    return (
      <span aria-hidden className={wrapper}>
        {React.cloneElement(icon, {
          className: cn(dimension, icon.props.className),
          strokeWidth: icon.props.strokeWidth ?? 1.5,
        })}
      </span>
    );
  }

  return (
    <span aria-hidden className={cn(wrapper, dimension)}>
      {icon}
    </span>
  );
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      children,
      tone,
      size,
      weight,
      underline,
      subtle,
      leadingIcon,
      trailingIcon,
      ...props
    },
    ref
  ) => {
    const iconSize = size ?? "md";

    return (
      <a
        ref={ref}
        className={cn(
          linkVariants({
            tone,
            size,
            weight,
            underline,
            subtle,
          }),
          className
        )}
        {...props}
      >
        {renderIcon(leadingIcon, iconSize, "leading")}
        <span className="whitespace-pre-wrap">{children}</span>
        {renderIcon(trailingIcon, iconSize, "trailing")}
      </a>
    );
  }
);
Link.displayName = "Link";

export { linkVariants };
