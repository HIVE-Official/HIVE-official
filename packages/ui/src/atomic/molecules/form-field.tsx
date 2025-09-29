import * as React from "react"
import { cn } from "../../lib/utils"

export interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormField.displayName = "FormField"

export type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[var(--hive-text-primary)]",
        className
      )}
      {...props}
    />
  )
)
FormLabel.displayName = "FormLabel"

export type FormControlProps = React.HTMLAttributes<HTMLDivElement>

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ ...props }, ref) => (
    <div ref={ref} {...props} />
  )
)
FormControl.displayName = "FormControl"

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--hive-text-secondary)]", className)}
      {...props}
    />
  )
)
FormDescription.displayName = "FormDescription"

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) {
      return null
    }

    return (
      <p
        ref={ref}
        className={cn("text-sm font-medium text-[var(--hive-status-error)]", className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"

export {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}