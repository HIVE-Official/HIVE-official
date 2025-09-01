import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { motion } from '../framer-motion-proxy.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '../../atomic/ui/card.js';
import { cn } from '../../lib/utils.js';
import { SchoolSearchInput } from './school-search-input.js';
// A placeholder for the HIVE logomark.
// The final implementation will use an <Image> component with the actual asset.
const HiveLogoPlaceholder = () => (_jsx("div", { className: "bg-accent-gold w-8 h-8 md:w-10 md:h-10", "aria-label": "HIVE logomark", role: "img" }));
const WelcomeCard = React.forwardRef(({ className, onSchoolSelect, ...props }, ref) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0
        },
    };
    const logoVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0
        },
    };
    const handleSchoolSelect = (schoolId) => {
        onSchoolSelect?.(schoolId);
    };
    return (_jsx(motion.div, { ref: ref, className: cn('w-full max-w-md mx-auto', className), initial: "hidden", animate: "visible", variants: cardVariants, ...props, children: _jsxs(Card, { className: "border-white/10 bg-[var(--hive-text-primary)]/5 backdrop-blur-sm", children: [_jsxs(CardHeader, { className: "text-center space-y-4", children: [_jsx(motion.div, { variants: logoVariants, className: "mb-4", children: _jsx("div", { className: "flex justify-center", children: _jsx(HiveLogoPlaceholder, {}) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(CardTitle, { className: "text-2xl font-bold text-text-primary", children: "Welcome to HIVE" }), _jsx(CardDescription, { className: "text-text-muted", children: "Join your school community and start building together." })] })] }), _jsx(CardContent, { children: _jsx(SchoolSearchInput, { onSchoolSelect: handleSchoolSelect }) })] }) }));
});
WelcomeCard.displayName = 'WelcomeCard';
export { WelcomeCard };
//# sourceMappingURL=welcome-card.js.map