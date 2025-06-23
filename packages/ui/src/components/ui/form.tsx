import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import { Label } from "./label";

// Form Context for managing form state
type FormFieldContextValue = {
  name: string;
  id: string;
  error?: string;
  required?: boolean;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

const useFormField = () => {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormField must be used within a FormField");
  }
  return context;
};

// FormField - Root container for a form field
export interface FormFieldProps {
  children: React.ReactNode;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, name, error, required = false, className }, ref) => {
    const id = React.useId();
    
    return (
      <FormFieldContext.Provider value={{ name, id, error, required }}>
        <div ref={ref} className={cn("space-y-2", className)}>
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  }
);
FormField.displayName = "FormField";

// FormItem - Container for form field content
const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  )
);
FormItem.displayName = "FormItem";

// FormLabel - Enhanced label with HIVE styling
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const { required, error, id } = useFormField();
    const Comp = asChild ? Slot : "label";

    return (
      <Comp
        ref={ref}
        className={cn(
          // HIVE label styling
          "text-sm font-medium font-sans", // Inter font
          "text-foreground", // White text
          "transition-colors duration-fast ease-hive-smooth",
          // Error state
          error && "text-error",
          className
        )}
        htmlFor={id}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-accent font-normal" aria-label="required">
            *
          </span>
        )}
      </Comp>
    );
  }
);
FormLabel.displayName = "FormLabel";

// FormControl - Wrapper for form inputs - FIXED
export interface FormControlProps {
  children: React.ReactElement;
}

const FormControl = React.forwardRef<HTMLElement, FormControlProps>(
  ({ children }, ref) => {
    const { error, id, name } = useFormField();

    return React.cloneElement(children, {
      ref,
      id,
      name,
      'aria-describedby': error ? `${id}-error` : `${id}-description`,
      'aria-invalid': !!error,
      ...children.props,
    });
  }
);
FormControl.displayName = "FormControl";

// FormDescription - Helper text for form fields
const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { id } = useFormField();

    return (
      <p
        ref={ref}
        id={`${id}-description`}
        className={cn(
          "text-xs font-sans", // Inter font
          "text-muted", // Muted text color
          "leading-relaxed",
          className
        )}
        {...props}
      />
    );
  }
);
FormDescription.displayName = "FormDescription";

// FormMessage - Error/success messages
export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: "error" | "success" | "warning";
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, type = "error", children, ...props }, ref) => {
    const { error, id } = useFormField();
    const body = error || children;

    if (!body) return null;

    return (
      <p
        ref={ref}
        id={`${id}-message`}
        className={cn(
          "text-xs font-sans font-medium", // Inter font
          "flex items-center gap-1",
          "transition-colors duration-fast ease-hive-smooth",
          // Type-based styling
          {
            "text-error": type === "error",
            "text-green-400": type === "success", 
            "text-yellow-400": type === "warning",
          },
          className
        )}
        {...props}
      >
        {/* Icon based on type */}
        {type === "error" && (
          <svg className="h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        {type === "success" && (
          <svg className="h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
        {type === "warning" && (
          <svg className="h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        {body}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

// Form Group - For grouping related form fields
export interface FormGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  children: React.ReactNode;
}

const FormGroup = React.forwardRef<HTMLFieldSetElement, FormGroupProps>(
  ({ className, legend, children, ...props }, ref) => (
    <fieldset
      ref={ref}
      className={cn(
        "border border-border rounded-xl p-4",
        "bg-surface/50", // Subtle background
        className
      )}
      {...props}
    >
      {legend && (
        <legend className="px-2 text-sm font-medium text-foreground font-sans">
          {legend}
        </legend>
      )}
      <div className="space-y-4 mt-2">
        {children}
      </div>
    </fieldset>
  )
);
FormGroup.displayName = "FormGroup";

export {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormGroup,
  useFormField,
}; 