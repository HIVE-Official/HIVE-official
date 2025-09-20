import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export const WaitlistForm = ({ onSubmit }) => {
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Fire and forget with proper error handling
        void onSubmit(email)
            .then(() => {
            setSuccess(true);
        });
    };
};
try { }
catch () { }
(error) => {
    console.error("Waitlist submission failed:", error);
    // Handle error appropriately - maybe show a toast or error state
};
try { }
finally { }
(() => {
    setLoading(false);
});
;
return (_jsx(HiveCard, { className: "w-100 overflow-hidden", variant: "elevated", size: "lg", children: _jsx(AnimatePresence, { children: success ? (_jsx(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "p-6", children: _jsxs(Stack, { config: { direction: 'vertical', alignment: 'center', spacing: 4, wrap: false }, children: [_jsx(CheckCircle, { className: "w-12 h-12 text-[var(--hive-status-success)]" }), _jsx(Heading, { level: 3, children: "You're on the list!" }), _jsxs(Text, { children: ["We'll notify you at ", email, " when HIVE is ready."] })] }) }, "success")) : (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "p-6 space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Heading, { level: 2, children: "Join the Waitlist" }), _jsx(Muted, { children: "Be the first to know when HIVE launches at your campus." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(HiveInput, { type: "email", placeholder: "Enter your .edu email address", value: email, onChange: (e) => setEmail(e.target.value), disabled: loading, variant: "secondary", size: "lg" }), _jsx(HiveButton, { className: "w-full", type: "submit", loading: loading, variant: "premium", size: "lg", children: "Get Early Access" })] })] }, "form")) }) }));
;
//# sourceMappingURL=waitlist-form.js.map