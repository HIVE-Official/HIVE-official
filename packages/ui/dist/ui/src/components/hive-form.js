"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';
import { AlertCircle, Check, Loader, Eye, EyeOff } from 'lucide-react';
const FormContext = createContext(null);
// Form field variants
const hiveFormFieldVariants = cva("relative w-full transition-all", {
    variants: {
        variant: {
            default: "",
            premium: "",
            minimal: "",
        },
        state: {
            default: "",
            error: "",
            success: "",
            validating: "",
        }
    },
    defaultVariants: {
        variant: "default",
        state: "default",
    },
});
const formInputVariants = cva("w-full px-4 py-3 bg-[var(--hive-background-primary)]/40 backdrop-blur-xl border rounded-xl transition-all focus:outline-none", {
    variants: {
        variant: {
            default: "border-white/20 focus:border-yellow-500/50 text-[var(--hive-text-primary)] placeholder-white/50",
            premium: "border-yellow-500/30 focus:border-yellow-500 text-[var(--hive-text-primary)] placeholder-white/50",
            minimal: "border-white/10 focus:border-white/30 text-[var(--hive-text-primary)] placeholder-white/50",
        },
        state: {
            default: "",
            error: "border-red-500/50 focus:border-red-500",
            success: "border-green-500/50 focus:border-green-500",
            validating: "border-blue-500/50 focus:border-blue-500",
        },
        size: {
            sm: "px-3 py-2 text-sm",
            default: "px-4 py-3",
            lg: "px-5 py-4 text-lg",
        }
    },
    defaultVariants: {
        variant: "default",
        state: "default",
        size: "default",
    },
});
// Error animation variants
const errorVariants = {
    hidden: {
        opacity: 0,
        height: 0,
        y: -10,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    visible: {
        opacity: 1,
        height: 'auto',
        y: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
        }
    }
};
// Form validation utilities
const validateField = async (value, rules) => {
    const errors = [];
    for (const rule of rules) {
        let isValid = true;
        switch (rule.type) {
            case 'required':
                isValid = value !== undefined && value !== null && value !== '';
                break;
            case 'min':
                isValid = typeof value === 'string' ? value.length >= rule.value : value >= rule.value;
                break;
            case 'max':
                isValid = typeof value === 'string' ? value.length <= rule.value : value <= rule.value;
                break;
            case 'pattern':
                isValid = rule.value instanceof RegExp ? rule.value.test(value) : true;
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                break;
            case 'custom':
                if (rule.validator) {
                    isValid = await rule.validator(value);
                }
                break;
        }
        if (!isValid) {
            errors.push({
                type: rule.type,
                message: rule.message,
            });
        }
    }
};
return errors;
;
export const HiveForm = ({ children, initialValues = {}, onSubmit, validationMode = 'onBlur', className, }) => {
    const [state, setState] = useState({
        values: initialValues,
        errors: {},
        touched: {},
        validating: {},
        valid: true,
        submitting: false,
    });
    const setValue = useCallback((name, value) => {
        setState(prev => ({
            ...prev,
            values: { ...prev.values, [name]: value },
        }));
    }, []);
    const setError = useCallback((name, error) => {
        setState(prev => ({
            ...prev,
            errors: {
                ...prev.errors,
                [name]: error ? [error] : [],
            },
        }));
    }, []);
    const setTouched = useCallback((name, touched) => {
        setState(prev => ({
            ...prev,
            touched: { ...prev.touched, [name]: touched },
        }));
    }, []);
    const setValidating = useCallback((name, validating) => {
        setState(prev => ({
            ...prev,
            validating: { ...prev.validating, [name]: validating },
        }));
    }, []);
    const validateFormField = useCallback(async (name, value, rules) => {
        setValidating(name, true);
        try {
            const errors = await validateField(value, rules);
            setState(prev => ({
                ...prev,
                errors: { ...prev.errors, [name]: errors },
                validating: { ...prev.validating, [name]: false },
            }));
        }
        finally { }
    });
};
try { }
catch (error) {
    setState(prev => ({
        ...prev,
        errors: {
            ...prev.errors,
            [name]: [{ type: 'validation', message: 'Validation error occurred' }]
        },
        validating: { ...prev.validating, [name]: false },
    }));
}
[];
;
const resetForm = useCallback(() => {
    setState({
        values: initialValues,
        errors: {},
        touched: {},
        validating: {},
        valid: true,
        submitting: false,
    });
}, [initialValues]);
const submitForm = useCallback(async () => {
    setState(prev => ({ ...prev, submitting: true }));
    try {
        if (onSubmit) {
            await onSubmit(state.values);
        }
    }
    catch (error) {
        console.error('Form submission error:', error);
    }
    finally {
        setState(prev => ({ ...prev, submitting: false }));
    }
}, [onSubmit, state.values]);
const getFieldState = useCallback((name) => {
    return {
        value: state.values[name],
        errors: state.errors[name] || [],
        touched: state.touched[name] || false,
        validating: state.validating[name] || false,
        valid: !state.errors[name] || state.errors[name].length === 0,
    };
}, [state]);
// Update form validity
useEffect(() => {
    const hasErrors = Object.values(state.errors).some(errors => errors.length > 0);
    const isValidating = Object.values(state.validating).some(Boolean);
    setState(prev => ({
        ...prev,
        valid: !hasErrors && !isValidating,
    }));
}, [state.errors, state.validating]);
const contextValue = {
    state,
    setValue,
    setError,
    setTouched,
    setValidating,
    validateField: validateFormField,
    resetForm,
    submitForm,
    getFieldState,
};
return (_jsx(FormContext.Provider, { value: contextValue, children: _jsx("form", { className: cn("space-y-6", className), onSubmit: (e) => {
            e.preventDefault();
            submitForm();
        }, children: children }) }));
;
// Form Field Hook
export function useFormField(name) {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormField must be used within a HiveForm');
    }
    return {
        ...context.getFieldState(name),
        setValue: (value) => context.setValue(name, value),
        setError: (error) => context.setError(name, error),
        setTouched: (touched) => context.setTouched(name, touched),
        validate: (rules) => context.validateField(name, context.getFieldState(name).value, rules),
    };
}
export const HiveFormInput = React.forwardRef(({ className, variant, size, name, label, description, rules = [], type = 'text', showPasswordToggle = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const field = useFormField(name);
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('HiveFormInput must be used within a HiveForm');
    }
    const fieldState = field.errors.length > 0 ? 'error' :
        field.validating ? 'validating' :
            field.touched && field.valid ? 'success' : 'default';
    const inputType = showPasswordToggle && type === 'password' ?
        (showPassword ? 'text' : 'password') : type;
    const handleChange = (e) => {
        const value = e.target.value;
        field.setValue(value);
        if (context.state.touched[name] && rules.length > 0) {
            field.validate(rules);
        }
    };
    const handleBlur = () => {
        field.setTouched(true);
        if (rules.length > 0) {
            field.validate(rules);
        }
    };
    return (_jsxs("div", { className: cn(hiveFormFieldVariants({ variant, state: fieldState })), children: [label && (_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: [label, rules.some(r => r.type === 'required') && (_jsx("span", { className: "text-red-400 ml-1", children: "*" }))] })), description && (_jsx("p", { className: "text-sm text-[var(--hive-text-primary)]/60 mb-3", children: description })), _jsxs("div", { className: "relative", children: [_jsx("input", { ref: ref, type: inputType, name: name, value: field.value || '', onChange: handleChange, onBlur: handleBlur, className: cn(formInputVariants({ variant, state: fieldState, size, className })), ...props }), _jsxs("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2", children: [field.validating && (_jsx(Loader, { size: 16, className: "text-blue-400 animate-spin" })), field.touched && field.valid && !field.validating && (_jsx(Check, { size: 16, className: "text-green-400" })), field.errors.length > 0 && !field.validating && (_jsx(AlertCircle, { size: 16, className: "text-red-400" })), showPasswordToggle && type === 'password' && (_jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 transition-colors", children: showPassword ? _jsx(EyeOff, { size: 16 }) : _jsx(Eye, { size: 16 }) }))] })] }), _jsx(AnimatePresence, { children: field.errors.length > 0 && (_jsx(motion.div, { variants: errorVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "mt-2", children: field.errors.map((error, index) => (_jsxs("div", { className: "flex items-center space-x-2 text-sm text-red-400", children: [_jsx(AlertCircle, { size: 14 }), _jsx("span", { children: error.message })] }, index))) })) }), _jsx(AnimatePresence, { children: field.touched && field.valid && !field.validating && field.errors.length === 0 && rules.length > 0 && (_jsx(motion.div, { variants: errorVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "mt-2", children: _jsxs("div", { className: "flex items-center space-x-2 text-sm text-green-400", children: [_jsx(Check, { size: 14 }), _jsx("span", { children: "Valid" })] }) })) })] }));
});
HiveFormInput.displayName = "HiveFormInput";
export const HiveFormTextarea = React.forwardRef(({ className, variant = 'default', name, label, description, rules = [], ...props }, ref) => {
    const field = useFormField(name);
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('HiveFormTextarea must be used within a HiveForm');
    }
    const fieldState = field.errors.length > 0 ? 'error' :
        field.validating ? 'validating' :
            field.touched && field.valid ? 'success' : 'default';
    const handleChange = (e) => {
        const value = e.target.value;
        field.setValue(value);
        if (context.state.touched[name] && rules.length > 0) {
            field.validate(rules);
        }
    };
    const handleBlur = () => {
        field.setTouched(true);
        if (rules.length > 0) {
            field.validate(rules);
        }
    };
    return (_jsxs("div", { className: cn(hiveFormFieldVariants({ variant, state: fieldState })), children: [label && (_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: [label, rules.some(r => r.type === 'required') && (_jsx("span", { className: "text-red-400 ml-1", children: "*" }))] })), description && (_jsx("p", { className: "text-sm text-[var(--hive-text-primary)]/60 mb-3", children: description })), _jsxs("div", { className: "relative", children: [_jsx("textarea", { ref: ref, name: name, value: field.value || '', onChange: handleChange, onBlur: handleBlur, className: cn("w-full px-4 py-3 bg-[var(--hive-background-primary)]/40 backdrop-blur-xl border rounded-xl transition-all focus:outline-none resize-none", variant === 'default' && "border-white/20 focus:border-yellow-500/50", variant === 'premium' && "border-yellow-500/30 focus:border-yellow-500", variant === 'minimal' && "border-white/10 focus:border-white/30", fieldState === 'error' && "border-red-500/50 focus:border-red-500", fieldState === 'success' && "border-green-500/50 focus:border-green-500", fieldState === 'validating' && "border-blue-500/50 focus:border-blue-500", "text-[var(--hive-text-primary)] placeholder-white/50", className), ...props }), _jsxs("div", { className: "absolute right-3 top-3", children: [field.validating && (_jsx(Loader, { size: 16, className: "text-blue-400 animate-spin" })), field.touched && field.valid && !field.validating && (_jsx(Check, { size: 16, className: "text-green-400" })), field.errors.length > 0 && !field.validating && (_jsx(AlertCircle, { size: 16, className: "text-red-400" }))] })] }), _jsx(AnimatePresence, { children: field.errors.length > 0 && (_jsx(motion.div, { variants: errorVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "mt-2", children: field.errors.map((error, index) => (_jsxs("div", { className: "flex items-center space-x-2 text-sm text-red-400", children: [_jsx(AlertCircle, { size: 14 }), _jsx("span", { children: error.message })] }, index))) })) })] }));
});
HiveFormTextarea.displayName = "HiveFormTextarea";
// Pre-built validation rules
export const validationRules = {
    required: (message = 'This field is required') => ({
        type: 'required',
        message,
    }),
    minLength: (length, message) => ({
        type: 'min',
        value: length,
        message: message || `Must be at least ${length} characters`,
    }),
    maxLength: (length, message) => ({
        type: 'max',
        value: length,
        message: message || `Must not exceed ${length} characters`,
    }),
    email: (message = 'Must be a valid email address') => ({
        type: 'email',
        message,
    }),
    pattern: (regex, message) => ({
        type: 'pattern',
        value: regex,
        message,
    }),
    custom: (validator, message) => ({
        type: 'custom',
        validator,
        message,
    }),
};
export { FormContext, hiveFormFieldVariants, formInputVariants };
//# sourceMappingURL=hive-form.js.map