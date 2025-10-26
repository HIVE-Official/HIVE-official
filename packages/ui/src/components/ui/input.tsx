import * as React from "react";

import { cn } from "@/utils/index";
import "./input.css";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", "aria-invalid": ariaInvalid, ...props }, ref) => {
    return (
      <input
        type={type}
        data-invalid={ariaInvalid}
        className={cn("input-base", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
