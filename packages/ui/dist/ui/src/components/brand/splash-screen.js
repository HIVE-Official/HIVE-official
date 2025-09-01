import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { HiveLogo } from '../HiveLogo.js';
import { cn } from '../../lib/utils.js';
const SplashScreen = ({ tagline = 'Finally, Your Campus.', className, }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.33, 0.65, 0, 1],
                when: 'beforeChildren',
                staggerChildren: 0.2,
            },
        },
    };
    const logoVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
            },
        },
    };
    const taglineVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.33, 0.65, 0, 1],
            },
        },
    };
    return (_jsxs(motion.div, { className: cn('flex h-screen w-screen flex-col items-center justify-center bg-[#0A0A0A] text-[var(--hive-text-inverse)]', className), variants: containerVariants, initial: "hidden", animate: "visible", "aria-label": "Loading Hive", role: "status", children: [_jsx(motion.div, { variants: logoVariants, className: "w-24 h-24", children: _jsx(HiveLogo, {}) }), _jsx(motion.p, { variants: taglineVariants, className: "mt-4 text-lg font-medium text-muted-foreground", children: tagline })] }));
};
export { SplashScreen };
//# sourceMappingURL=splash-screen.js.map