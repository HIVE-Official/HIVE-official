// Bounded Context Owner: Design System Guild
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const headingVariants = cva("text-foreground", {
  variants: {
    level: {
      display: "text-display font-display",
      h1: "text-h1 font-h1",
      h2: "text-h2 font-h2",
      h3: "text-h3 font-h3",
      h4: "text-h4 font-h4"
    }
  },
  defaultVariants: { level: "h2" }
});

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4";
}

export const Heading = ({ as, className, level, ...props }: HeadingProps): JSX.Element => {
  type HeadingTag = "h1" | "h2" | "h3" | "h4";
  const allowed: readonly HeadingTag[] = ["h1", "h2", "h3", "h4"] as const;
  const defaultTag: HeadingTag = level === "display" ? "h1" : ((level as HeadingTag) ?? "h2");
  const tag: HeadingTag = allowed.includes(as as HeadingTag) ? (as as HeadingTag) : defaultTag;
  const cls = cn(headingVariants({ level }), className);
  switch (tag) {
    case "h1":
      return <h1 className={cls} {...props} />;
    case "h2":
      return <h2 className={cls} {...props} />;
    case "h3":
      return <h3 className={cls} {...props} />;
    case "h4":
    default:
      return <h4 className={cls} {...props} />;
  }
};

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      body: "text-body font-body",
      bodySm: "text-body-sm font-body-sm",
      caption: "text-caption font-caption",
      muted: "text-body-sm font-body-sm text-muted-foreground"
    }
  },
  defaultVariants: { variant: "body" }
});

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {}

export const Text = ({ className, variant, ...props }: TextProps) => (
  <p className={cn(textVariants({ variant }), className)} {...props} />
);

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {}
export const Eyebrow = ({ className, ...props }: EyebrowProps) => (
  <span className={cn("text-label font-label uppercase text-muted-foreground", className)} {...props} />
);
