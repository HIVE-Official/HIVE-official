"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, indeterminate, ...props }, ref) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => checkboxRef.current!);
    
    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    return (
      <div className="inline-flex items-start">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            ref={checkboxRef}
            className={cn(
              "h-4 w-4 rounded border-gray-300",
              "text-blue-600 focus:ring-2 focus:ring-blue-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500",
              className
            )}
            {...props}
          />
          {label && (
            <span className={cn(
              "ml-2 text-sm",
              props.disabled && "text-gray-500",
              error && "text-red-600"
            )}>
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;