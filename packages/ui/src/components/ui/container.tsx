import * as React from "react";
import { cn } from "../../lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asChild = false, size = "full", ...props }, ref) => {
    const Comp = asChild ? "div" : "div"; // Using div as Slot is not necessary here

    const sizeClasses = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      full: "w-full",
    };

    return (
      <Comp
        className={cn(
          "w-full px-4 md:px-6 lg:px-8",
          size !== "full" && "mx-auto",
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container }; 