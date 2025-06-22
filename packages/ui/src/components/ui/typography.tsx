import { cn } from "../../lib/utils";
import * as React from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const sizeMap: Record<number, string> = {
  1: "text-[clamp(2rem,5vw,2.5rem)] leading-tight",
  2: "text-[clamp(1.75rem,4vw,2.125rem)] leading-tight",
  3: "text-[clamp(1.5rem,3vw,1.75rem)] leading-snug",
  4: "text-[clamp(1.25rem,2.5vw,1.5rem)] leading-snug",
  5: "text-[clamp(1.125rem,2vw,1.25rem)] leading-snug",
  6: "text-[clamp(1rem,1.75vw,1.125rem)] leading-snug",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, className, ...props }, ref) => {
    const Tag = `h${level}` as unknown as React.ElementType;
    return (
      <Tag
        ref={ref}
        className={cn("font-display font-semibold", sizeMap[level], className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg" | "xl";
}
const textSize: Record<NonNullable<TextProps["size"]>, string> = {
  sm: "text-sm leading-relaxed",
  md: "text-base leading-relaxed",
  lg: "text-lg leading-relaxed",
  xl: "text-xl leading-relaxed",
};
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = "md", className, ...props }, ref) => (
    <p ref={ref} className={cn(textSize[size], className)} {...props} />
  )
);
Text.displayName = "Text";

export const Eyebrow: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={cn(
      "uppercase tracking-widest text-xs text-text-muted font-medium",
      className
    )}
    {...props}
  />
);
