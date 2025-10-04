import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
const FormField = React.forwardRef(({ children, className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn("space-y-2", className), ...props, children: children }));
});
FormField.displayName = "FormField";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => (_jsx("label", { ref: ref, className: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[var(--hive-text-primary)]", className), ...props })));
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => (_jsx("div", { ref: ref, ...props })));
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: cn("text-sm text-[var(--hive-text-secondary)]", className), ...props })));
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
    if (!children) {
        return null;
    }
    return (_jsx("p", { ref: ref, className: cn("text-sm font-medium text-[var(--hive-status-error)]", className), ...props, children: children }));
});
FormMessage.displayName = "FormMessage";
export { FormField, FormLabel, FormControl, FormDescription, FormMessage, };
//# sourceMappingURL=form-field.js.map