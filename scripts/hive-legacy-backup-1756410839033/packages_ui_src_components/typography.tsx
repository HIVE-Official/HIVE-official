import * as React from "react";
import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("font-display font-semibold tracking-tight", {
  variants: {
    level: {
      1: "text-h1",
      2: "text-h2",
      3: "text-lg font-medium",
      4: "text-base font-medium",
    },
  },
  defaultVariants: {
    level: 2,
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, ...props }, ref) => {
    const Component =
      level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4";

    if (Component === "h1") {
      return (
        <h1
          ref={ref}
          className={cn(headingVariants({ level }), className)}
          {...props}
        />
      );
    }
    if (Component === "h2") {
      return (
        <h2
          ref={ref}
          className={cn(headingVariants({ level }), className)}
          {...props}
        />
      );
    }
    if (Component === "h3") {
      return (
        <h3
          ref={ref}
          className={cn(headingVariants({ level }), className)}
          {...props}
        />
      );
    }
    return (
      <h4
        ref={ref}
        className={cn(headingVariants({ level }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

const Text = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-body", className)} {...props} />;
});
Text.displayName = "Text";

const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-text-muted", className)}
      {...props}
    />
  );
});
Muted.displayName = "Muted";

export { Heading, Text, Muted };

export const Typography = {
  Heading,
  Text,
  Muted
};
