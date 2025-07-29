import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiveButton, HiveCard, HiveBadge, HiveSpaceCard } from '../../components';
import { HiveLiquidRipple, HiveMagneticSnap, HiveMagneticTarget, HiveLiquidTransform } from '../../components/hive-magnetic-interactions';
import { spaceActivation, milestoneSequences, liquidFlow } from '../../motion/hive-liquid-metal';
import { Star, Zap, Plus, Target, Magnet, Waves } from 'lucide-react';
// Wrapper component for the motion system showcase
const LiquidMetalShowcase = () => null;
const meta = {
    title: '04-HIVE/Liquid Metal Motion System',
    component: LiquidMetalShowcase,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Comprehensive showcase of HIVE\'s Liquid Metal Motion System - Premium 60fps animations with magnetic interactions, orchestrated timing, and space activation sequences.',
            },
        },
    },
};
export default meta;
// Interactive Motion System Demo
export const MotionSystemOverview = {
    render: () => {
        const [activeDemo, setActiveDemo] = useState('magnetic');
        const [spaceActivated, setSpaceActivated] = useState(false);
        const [toolsCreated, setToolsCreated] = useState(0);
        return (_jsx("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs(motion.div, { className: "text-center mb-12", variants: liquidFlow, initial: "hidden", animate: "visible", children: [_jsx("h1", { className: "text-5xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Liquid Metal Motion System" }), _jsx("p", { className: "text-xl text-[var(--hive-text-secondary)] max-w-3xl mx-auto mb-8", children: "Premium 60fps animations with magnetic interactions, orchestrated timing, and physics-based space activation sequences." }), _jsx("div", { className: "flex justify-center gap-4 mb-8", children: [
                                    { id: 'magnetic', label: 'Magnetic Interactions', icon: Magnet },
                                    { id: 'orchestrated', label: 'Orchestrated Sequences', icon: Waves },
                                    { id: 'space', label: 'Space Activation', icon: Target },
                                    { id: 'tools', label: 'Tool Assembly', icon: Plus }
                                ].map(({ id, label, icon: Icon }) => (_jsxs(HiveButton, { variant: activeDemo === id ? 'premium' : 'outline', size: "sm", onClick: () => setActiveDemo(id), magneticHover: true, magneticIntensity: "medium", children: [_jsx(Icon, { className: "w-4 h-4 mr-2" }), label] }, id))) })] }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(HiveLiquidTransform, { transformKey: activeDemo, direction: "up", className: "space-y-8", children: [activeDemo === 'magnetic' && _jsx(MagneticInteractionsDemo, {}), activeDemo === 'orchestrated' && _jsx(OrchestratedSequenceDemo, {}), activeDemo === 'space' && _jsx(SpaceActivationDemo, {}), activeDemo === 'tools' && _jsx(ToolAssemblyDemo, {})] }, activeDemo) })] }) }));
    },
};
// Magnetic Interactions Demo
const MagneticInteractionsDemo = () => (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs(HiveCard, { variant: "gold-featured", size: "xl", animateEntrance: true, children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-6", children: "Magnetic Hover Effects" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(HiveButton, { variant: "premium", magneticIntensity: "subtle", children: "Subtle Magnetic" }), _jsx(HiveButton, { variant: "premium", magneticIntensity: "medium", children: "Medium Magnetic" }), _jsx(HiveButton, { variant: "premium", magneticIntensity: "strong", children: "Strong Magnetic" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(HiveCard, { variant: "gold-accent", interactive: true, magneticIntensity: "medium", className: "p-4 text-center", children: [_jsx(Star, { className: "w-8 h-8 text-[var(--hive-brand-secondary)] mx-auto mb-2" }), _jsx("p", { className: "text-[var(--hive-text-primary)]", children: "Interactive Card" })] }), _jsxs(HiveCard, { variant: "builder", interactive: true, magneticIntensity: "strong", className: "p-4 text-center", children: [_jsx(Zap, { className: "w-8 h-8 text-[var(--hive-brand-secondary)] mx-auto mb-2" }), _jsx("p", { className: "text-[var(--hive-text-primary)]", children: "Builder Card" })] })] })] })] }), _jsxs(HiveCard, { variant: "elevated", size: "xl", animateEntrance: true, cascadeIndex: 1, children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-6", children: "Ripple Effects" }), _jsxs("div", { className: "space-y-6", children: [_jsx(HiveLiquidRipple, { intensity: "medium", className: "p-8 border border-[var(--hive-brand-secondary)]/30 rounded-2xl", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-[var(--hive-text-secondary)] mb-4", children: "Click anywhere for ripple effect" }), _jsx("div", { className: "w-16 h-16 bg-[var(--hive-brand-secondary)]/20 rounded-full mx-auto flex items-center justify-center", children: _jsx(Waves, { className: "w-8 h-8 text-[var(--hive-brand-secondary)]" }) })] }) }), _jsx("div", { className: "grid grid-cols-3 gap-3", children: ['Subtle', 'Medium', 'Strong'].map((intensity, index) => (_jsx(HiveLiquidRipple, { intensity: intensity.toLowerCase(), className: "p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-xl text-center", children: _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm", children: intensity }) }, intensity))) })] })] })] }));
// Orchestrated Sequence Demo
const OrchestratedSequenceDemo = () => {
    const [triggerSequence, setTriggerSequence] = useState(null);
    const handleSequenceTrigger = (sequenceType) => {
        setTriggerSequence(sequenceType);
        setTimeout(() => setTriggerSequence(null), 2000);
    };
    return (_jsx("div", { className: "space-y-8", children: _jsxs(HiveCard, { variant: "gold-featured", size: "xl", children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-6", children: "Orchestrated Animation Sequences" }), _jsxs("div", { className: "flex gap-4 mb-8", children: [_jsx(HiveButton, { variant: "premium", onClick: () => handleSequenceTrigger('tool'), magneticHover: true, children: "Tool Creation" }), _jsx(HiveButton, { variant: "premium", onClick: () => handleSequenceTrigger('space'), magneticHover: true, children: "Space Activation" }), _jsx(HiveButton, { variant: "premium", onClick: () => handleSequenceTrigger('achievement'), magneticHover: true, children: "Achievement" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [0, 1, 2].map((index) => (_jsx(motion.div, { variants: triggerSequence ? milestoneSequences[triggerSequence] : {}, initial: "initial", animate: triggerSequence ? "animate" : "initial", children: _jsxs(HiveCard, { variant: "default", className: "p-6 text-center", animateEntrance: true, cascadeIndex: index, children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-brand-secondary)]/20 rounded-full mx-auto mb-4 flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-brand-secondary)] font-bold", children: index + 1 }) }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Sequence Element" })] }) }, index))) })] }) }));
};
// Space Activation Demo
const SpaceActivationDemo = () => {
    const [isActivated, setIsActivated] = useState(false);
    return (_jsx("div", { className: "space-y-8", children: _jsxs(HiveCard, { variant: "space", size: "xl", children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-6", children: "Space Activation System" }), _jsx("div", { className: "text-center mb-8", children: _jsx(motion.div, { variants: spaceActivation, animate: isActivated ? "activated" : "dormant", className: "inline-block", children: _jsxs(HiveButton, { variant: "premium", size: "lg", onClick: () => setIsActivated(!isActivated), magneticHover: true, magneticIntensity: "strong", children: [_jsx(Target, { className: "w-5 h-5 mr-2" }), isActivated ? 'Deactivate Space' : 'Activate Space'] }) }) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [0, 1, 2, 3].map((index) => (_jsx(motion.div, { variants: spaceActivation, animate: isActivated ? "awakening" : "dormant", transition: { delay: index * 0.1 }, children: _jsx(HiveSpaceCard, { title: `Space ${index + 1}`, memberCount: Math.floor(Math.random() * 200) + 50, isActive: isActivated, category: "Academic" }) }, index))) })] }) }));
};
// Tool Assembly Demo
const ToolAssemblyDemo = () => {
    const [assembledTools, setAssembledTools] = useState([]);
    const handleToolSnap = (targetId) => {
        if (!assembledTools.includes(targetId)) {
            setAssembledTools(prev => [...prev, targetId]);
        }
    };
    const handleToolRelease = (toolId) => {
        setAssembledTools(prev => prev.filter(id => id !== toolId));
    };
    return (_jsx("div", { className: "space-y-8", children: _jsxs(HiveCard, { variant: "tool", size: "xl", children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-6", children: "Magnetic Tool Assembly" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Drag Tools to Assembly Zone" }), _jsx("div", { className: "flex flex-wrap gap-4", children: ['timer', 'counter', 'poll', 'form'].map((tool) => (_jsx(HiveMagneticSnap, { snapId: tool, snapTarget: "assembly-zone", onSnap: handleToolSnap, onRelease: () => handleToolRelease(tool), className: "cursor-move", children: _jsxs(HiveCard, { variant: "minimal", size: "sm", className: "p-4 text-center min-w-[100px]", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-secondary)]/20 rounded-lg mx-auto mb-2 flex items-center justify-center", children: _jsx(Plus, { className: "w-4 h-4 text-[var(--hive-brand-secondary)]" }) }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm capitalize", children: tool })] }) }, tool))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Assembly Zone" }), _jsx(HiveMagneticTarget, { targetId: "assembly-zone", visualizeZone: true, className: "h-64 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-brand-secondary)]/20 rounded-full mx-auto mb-4 flex items-center justify-center", children: _jsx(Target, { className: "w-8 h-8 text-[var(--hive-brand-secondary)]" }) }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: assembledTools.length > 0
                                                    ? `${assembledTools.length} tools assembled`
                                                    : 'Drop tools here' }), assembledTools.length > 0 && (_jsx("div", { className: "mt-4 flex flex-wrap gap-2 justify-center", children: assembledTools.map((tool) => (_jsx(HiveBadge, { variant: "tool-builder", children: tool }, tool))) }))] }) })] })] })] }) }));
};
// Performance Showcase
export const MotionPerformance = {
    render: () => (_jsx("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs(motion.div, { variants: liquidFlow, initial: "hidden", animate: "visible", className: "text-center mb-12", children: [_jsx("h2", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Motion Performance Test" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-8", children: "60fps animations with GPU acceleration and reduced motion support" })] }), _jsx("div", { className: "grid grid-cols-4 md:grid-cols-8 gap-4", children: Array.from({ length: 32 }, (_, i) => (_jsx(HiveCard, { variant: i % 4 === 0 ? 'gold-accent' : 'default', interactive: true, magneticHover: true, magneticIntensity: "subtle", animateEntrance: true, cascadeIndex: i, className: "aspect-square flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-brand-secondary)] font-bold", children: i + 1 }) }, i))) }), _jsx("div", { className: "mt-12 text-center", children: _jsx("p", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "All animations respect prefers-reduced-motion settings and maintain 60fps performance" }) })] }) })),
};
//# sourceMappingURL=hive-liquid-metal-system.stories.js.map