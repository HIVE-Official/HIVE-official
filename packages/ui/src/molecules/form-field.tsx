"use client";
// Bounded Context Owner: Design System Guild
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cloneElement, createContext, isValidElement, useContext, useId } from "react";
import { cn } from "../utils/cn";
import "./form-field.css";

interface FormFieldContextValue {
  readonly controlId?: string;
  readonly descriptionId?: string;
  readonly errorId?: string;
  readonly hasError: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export const useFormField = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormField must be used within a FormField");
  }
  return context;
};

export const useOptionalFormField = () => useContext(FormFieldContext);

export interface FormFieldProps {
  readonly label?: ReactNode;
  readonly labelFor?: string;
  readonly description?: ReactNode;
  readonly error?: ReactNode;
  readonly required?: boolean;
  readonly inline?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
  readonly labelWidth?: string | number;
}

export const FormField = ({
  label,
  labelFor,
  description,
  error,
  required,
  inline = false,
  children,
  className,
  labelWidth
}: FormFieldProps) => {
  const autoId = useId();
  const controlId = labelFor ?? `field-${autoId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;

  return (
    <FormFieldContext.Provider value={{ controlId, descriptionId, errorId, hasError: Boolean(error) }}>
      <div className={cn("form-field", inline && "inline", className)}>
        {(label || description) && (
          <div
            className="form-field-label-block"
            style={inline && labelWidth ? { minWidth: labelWidth } : undefined}
          >
            {label ? (
              <label htmlFor={controlId} className="form-field-label">
                <span>{label}</span>
                {required ? <span className="required" aria-hidden="true">*</span> : null}
              </label>
            ) : null}
            {description ? (
              <p id={descriptionId} className="form-field-description">
                {description}
              </p>
            ) : null}
          </div>
        )}

        <div className={cn("form-field-control-block", inline && "inline-control")}> 
          {children}
          {error ? (
            <p id={errorId} className="form-field-error">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </FormFieldContext.Provider>
  );
};

export interface FormFieldControlProps {
  readonly children: ReactElement;
}

export const FormFieldControl = ({ children }: FormFieldControlProps) => {
  const ctx = useFormField();
  if (!isValidElement(children)) return children as unknown as ReactElement;

  const childProps = children.props as Record<string, unknown>;

  const describedBy = [ctx.descriptionId, ctx.errorId, childProps["aria-describedby"]]
    .filter(Boolean)
    .join(" ") || undefined;

  const nextProps: Record<string, unknown> = {
    id: childProps.id ?? ctx.controlId,
    "aria-describedby": describedBy,
    "aria-invalid": ctx.hasError || undefined
  };

  return cloneElement(children, nextProps);
};

export interface FormFieldHintProps extends ComponentPropsWithoutRef<"p"> {
  readonly type?: "description" | "error";
}

export const FormFieldHint = ({ type = "description", className, ...props }: FormFieldHintProps) => {
  const { descriptionId, errorId } = useFormField();
  const id = type === "error" ? errorId : descriptionId;

  if (!id) {
    return null;
  }

  return (
    <p
      id={id}
      className={cn(
        type === "error" ? "form-field-error" : "form-field-description",
        className
      )}
      {...props}
    />
  );
};
