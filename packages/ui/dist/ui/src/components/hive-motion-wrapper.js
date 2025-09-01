import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { motion, AnimatePresence } from './framer-motion-proxy.js';
export const HiveMotionWrapper = ({ children, animate = true, initial = { opacity: 0 }, exit = { opacity: 0 }, transition = { duration: 0.3 }, }) => {
    if (!animate) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsx(AnimatePresence, { children: _jsx(motion.div, { initial: initial, animate: { opacity: 1 }, exit: exit, transition: transition, children: children }) }));
};
// Magnetic hover effect component
export const HiveMagneticHover = ({ children }) => {
    return (_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: children }));
};
// Cascade animation component
export const HiveCascade = ({ children, delay = 0 }) => {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.5 }, children: children }));
};
//# sourceMappingURL=hive-motion-wrapper.js.map