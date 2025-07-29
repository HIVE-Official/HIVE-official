import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Box } from '../../components/Box';
import { motion, AnimatePresence } from 'framer-motion';
import { गति } from '../../lib/motion-utils';
import { Stack } from '../../components/Stack';
import { Button } from '../../components/ui/button';
const meta = {
    title: '02-Layout/Box',
    component: Box,
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {
        children: 'This is a Box component.',
        className: 'p-4 bg-bg-card rounded-lg',
    },
};
const AnimatedBox = () => {
    const [animation, setAnimation] = React.useState('fadeIn');
    const [isVisible, setIsVisible] = React.useState(true);
    const handleAnimation = (anim) => {
        setIsVisible(false);
        setTimeout(() => {
            setAnimation(anim);
            setIsVisible(true);
        }, 300);
    };
    return (_jsxs(Stack, { children: [_jsxs(Stack, { direction: "row", gap: 4, className: 'mb-4', children: [_jsx(Button, { onClick: () => handleAnimation('fadeIn'), children: "Fade In" }), _jsx(Button, { onClick: () => handleAnimation('slideIn'), children: "Slide In" }), _jsx(Button, { onClick: () => handleAnimation('scaleIn'), children: "Scale In" })] }), _jsx(AnimatePresence, { children: isVisible && (_jsx(motion.div, { variants: गति[animation], initial: "initial", animate: "animate", exit: "exit", transition: { duration: 0.3 }, children: _jsx(Box, { className: "p-4 bg-bg-card rounded-lg w-48 text-center", children: "An animated box" }) })) })] }));
};
export const Animated = {
    render: () => _jsx(AnimatedBox, {}),
};
//# sourceMappingURL=box.stories.js.map