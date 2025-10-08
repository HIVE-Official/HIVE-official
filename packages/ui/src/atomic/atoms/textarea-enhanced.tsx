"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Textarea } from "./textarea";

export interface TextareaEnhancedProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
}

export const TextareaEnhanced = React.forwardRef<HTMLTextAreaElement, TextareaEnhancedProps>(
  ({ className, label, error, helperText, showCount, maxLength, value, ...props }, ref) => {
    const count = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-white">
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          className={cn(
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-sm text-gray-400">{helperText}</p>
            )}
          </div>
          {showCount && maxLength && (
            <p className="text-sm text-gray-500">
              {count}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextareaEnhanced.displayName = "TextareaEnhanced";
