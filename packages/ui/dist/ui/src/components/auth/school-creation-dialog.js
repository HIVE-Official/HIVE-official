"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog } from '../dialog.js';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { motion } from 'framer-motion';
export const SchoolCreationDialog = ({ isOpen, onClose, onSubmit, }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit({
            name: formData.get('name'),
            domain: formData.get('domain'),
        });
    };
    return (_jsx(Dialog, { isOpen: isOpen, onClose: onClose, title: "Add Your School", description: "Help us expand HIVE to your school by providing some basic information.", size: "md", children: _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { htmlFor: "name", className: "text-sm font-medium", children: "School Name" }), _jsx(motion.div, { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, delay: 0.1 }, children: _jsx("input", { id: "name", name: "name", type: "text", required: true, className: "w-full rounded-md border border-border bg-surface-02 px-3 py-2 text-foreground placeholder:text-muted focus:border-[var(--hive-brand-secondary)] focus:outline-none focus:ring-1 focus:ring-gold", placeholder: "e.g. University of Buffalo", autoComplete: "organization" }) })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { htmlFor: "domain", className: "text-sm font-medium", children: "School Email Domain" }), _jsx(motion.div, { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, delay: 0.2 }, children: _jsx("input", { id: "domain", name: "domain", type: "text", required: true, className: "w-full rounded-md border border-border bg-surface-02 px-3 py-2 text-foreground placeholder:text-muted focus:border-[var(--hive-brand-secondary)] focus:outline-none focus:ring-1 focus:ring-gold", placeholder: "e.g. buffalo.edu", pattern: "^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\\\.[a-zA-Z]{2,}$", title: "Please enter a valid domain (e.g. buffalo.edu)" }) }), _jsx("p", { className: "text-xs text-muted", children: "This should be the domain students use for their school email (e.g. buffalo.edu)" })] }), _jsxs(motion.div, { className: "flex justify-end gap-3 pt-2", initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, delay: 0.3 }, children: [_jsx(Button, { type: "button", variant: "secondary", onClick: onClose, className: "border-[var(--hive-brand-secondary)]/50 hover:border-[var(--hive-brand-secondary)]", children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit Request" })] })] }) }));
};
//# sourceMappingURL=school-creation-dialog.js.map