'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonEnhanced as Button } from '../../atomic/atoms/button-enhanced.js';
import { InputEnhanced as Input } from '../../atomic/atoms/input-enhanced.js';
import { Label } from '../label.js';
import { cn } from '../../lib/utils.js';
import { LoadingSpinner } from '../loading-spinner.js';
import { hiveVariants } from '../../lib/motion.js';
import { useAdaptiveMotion } from '../../lib/adaptive-motion.js';
const emailFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
});
export const EmailForm = ({ onSubmit, isLoading = false, apiError = null, className, }) => {
    const { register, handleSubmit, formState: { errors, isValid }, } = useForm({
        resolver: zodResolver(emailFormSchema),
        mode: 'onChange',
    });
    const { variants: _variants } = useAdaptiveMotion('academic');
    return (_jsxs(motion.form, { onSubmit: handleSubmit(onSubmit), className: cn('grid gap-4', className), variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsxs(motion.div, { className: "grid gap-2", variants: hiveVariants.item, children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { ...register('email'), id: "email", placeholder: "name@example.com", type: "email", variant: "secondary", autoCapitalize: "none", autoComplete: "email", autoCorrect: "off", disabled: isLoading, "aria-invalid": !!errors.email }), _jsx(AnimatePresence, { children: errors.email && (_jsx(motion.p, { className: "text-sm text-muted", variants: hiveVariants.slideDown, initial: "hidden", animate: "visible", exit: "hidden", children: errors.email.message })) })] }), _jsx(motion.div, { variants: hiveVariants.item, children: _jsxs(Button, { type: "submit", disabled: !isValid || isLoading, variant: "primary", className: "w-full", children: [isLoading && _jsx(LoadingSpinner, { size: "sm", className: "mr-2" }), "Continue"] }) }), _jsx(AnimatePresence, { children: apiError && (_jsx(motion.p, { className: "text-sm text-center text-muted", variants: hiveVariants.slideDown, initial: "hidden", animate: "visible", exit: "hidden", children: apiError })) })] }));
};
//# sourceMappingURL=email-form.js.map