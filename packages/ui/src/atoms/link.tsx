// Bounded Context Owner: Design System Guild
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";
import "./link.css";

const linkStyles = cva(
  "inline-flex items-center gap-1 underline-offset-4 transition-colors duration-swift ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        inline: "text-foreground visited:text-foreground/80",
        subtle: "text-muted-foreground hover:text-foreground visited:text-foreground/70",
        muted: "text-muted-foreground visited:text-muted-foreground",
        external: "text-foreground visited:text-foreground/85",
        action: "text-foreground font-body visited:text-foreground",
        docs: "text-foreground visited:text-foreground/80"
      },
      underline: {
        hover: "hover:underline",
        always: "underline",
        none: "no-underline"
      }
    },
    defaultVariants: { variant: "inline", underline: "hover" }
  }
);

export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkStyles> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconHover?: "start" | "end" | "none";
  truncate?: boolean;
  newTabHint?: boolean;
  /** Show a default external icon when variant/href is external */
  showExternalIcon?: boolean;
  /** Animate underline with a subtle left→right bar instead of native underline */
  animatedUnderline?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    className,
    variant,
    underline,
    startIcon,
    endIcon,
    iconHover = "none",
    truncate,
    newTabHint,
    showExternalIcon = true,
    animatedUnderline = true,
    target,
    rel,
    href,
    children,
    ...rest
  } = props;
  // Treat absolute and protocol links as external by default
  const hrefVal = href ?? "";
  const isAbsolute = /^(https?:)?\/\//i.test(hrefVal);
  const isHashOrRelative = hrefVal.startsWith("#") || hrefVal.startsWith("/");
  const isExternal = variant === "external" || (hrefVal.length > 0 && isAbsolute && !isHashOrRelative);
  const computedRel = isExternal ? rel ?? "noopener noreferrer" : rel;
  const computedTarget = isExternal ? target ?? "_blank" : target;

  const hoverClass = "opacity-100";
  const hiddenOnHover = "opacity-0 transition-opacity duration-rapid ease-standard group-hover:opacity-100";
  const computedIconHover = isExternal && iconHover === "none" ? "end" : iconHover;

  return (
    <a
      ref={ref}
      className={cn(
        "group relative",
        linkStyles({ variant, underline }),
        animatedUnderline && underline !== "none" && "link-animated",
        truncate && "truncate",
        className
      )}
      target={computedTarget}
      rel={computedRel}
      href={href}
      {...rest}
    >
      {startIcon ? (
        <span aria-hidden className={cn(computedIconHover === "start" ? hiddenOnHover : hoverClass)}>
          {startIcon}
        </span>
      ) : null}
      <span>{children}</span>
      {isExternal && newTabHint ? (
        <span className="sr-only"> (opens in new tab)</span>
      ) : null}
      {(() => {
        const icon = endIcon ?? (isExternal && showExternalIcon ? "↗" : null);
        if (!icon) return null;
        return (
          <span aria-hidden className={cn(computedIconHover === "end" ? hiddenOnHover : hoverClass)}>
            {icon}
          </span>
        );
      })()}
    </a>
  );
});

Link.displayName = "Link";
