import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiveButton, HiveCard, HiveMotionWrapper } from '../../components';

const meta: Meta = {
  title: '01-Foundation/Motion System',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**HIVE's Liquid Metal Motion System**

The signature motion language that gives HIVE its premium campus infrastructure feel. Based on liquid metal physics with magnetic interactions and orchestrated timing.

## Motion Philosophy
- **Liquid Metal Physics**: Smooth, fluid motion that feels substantial and premium
- **Magnetic Interactions**: Elements attract, snap, and flow with physical realism
- **Orchestrated Timing**: Coordinated animations that feel like a unified system
- **Campus Infrastructure Feel**: Motion reinforces HIVE's positioning as serious academic platform

## Core Motion Tokens
- **Duration Scale**: 6 levels from instant (100ms) to deliberate (1000ms+)
- **Easing Signature**: \`cubic-bezier(0.23, 1, 0.32, 1)\` - liquid metal curve
- **Spring Physics**: Mass 0.8, stiffness 400, damping 25
- **Cascade Timing**: 50ms stagger for orchestrated reveals

## Motion Categories
1. **Micro-interactions**: Button hovers, focus states, small feedback
2. **Component Transitions**: Modal opens, dropdown reveals, state changes
3. **Page Transitions**: Route changes, surface switching, layout shifts
4. **Magnetic Assembly**: Element snapping, tool composition, drag interactions
5. **Ripple Effects**: Touch feedback, expansion animations, cascade reveals

## Performance
- **GPU Acceleration**: Transform and opacity only for 60fps performance
- **Reduced Motion**: Respects user preferences with fallback to snappy transitions
- **Memory Efficient**: Cleanup and optimization for complex animation sequences

## Accessibility
- WCAG 2.1 AA compliant with reduced motion support
- Clear visual feedback for interactive states
- Meaningful motion that enhances rather than distracts
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// HIVE Motion Tokens
const motionTokens = {
  duration: {
    instant: 100,
    quick: 200,
    smooth: 300,
    flowing: 500,
    graceful: 700,
    deliberate: 1000
  },
  easing: {
    liquidMetal: 'cubic-bezier(0.23, 1, 0.32, 1)',
    magneticSnap: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    gentleEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    sharpEase: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
  },
  spring: {
    gentle: { type: 'spring', mass: 0.8, stiffness: 300, damping: 25 },
    snappy: { type: 'spring', mass: 0.6, stiffness: 400, damping: 20 },
    bouncy: { type: 'spring', mass: 1.2, stiffness: 500, damping: 15 }
  }
};

export const DurationScale: Story = {
  render: () => {
    const [activeDemo, setActiveDemo] = useState(null);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(motionTokens.duration).map(([name, duration]) => (
            <div key={name} className="space-y-2">
              <h4 className="text-sm font-semibold capitalize">{name}</h4>
              <p className="text-xs text-muted-foreground">{duration}ms</p>
              <motion.div
                className="w-full h-12 bg-hive-accent rounded-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: duration / 1000, ease: motionTokens.easing.liquidMetal }}
                onClick={() => setActiveDemo(name)}
              />
            </div>
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground">
          Click any box to see the {activeDemo || 'instant'} duration in action
        </div>
      </div>
    );
  }
};

export const EasingCurves: Story = {
  render: () => {
    const [activeEasing, setActiveEasing] = useState('liquidMetal');

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {Object.keys(motionTokens.easing).map((easing) => (
            <HiveButton
              key={easing}
              size="sm"
              variant={activeEasing === easing ? 'default' : 'outline'}
              onClick={() => setActiveEasing(easing)}
            >
              {easing}
            </HiveButton>
          ))}
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`${activeEasing}-${i}`}
              className="h-20 bg-hive-accent rounded-lg"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: motionTokens.easing[activeEasing],
                delay: i * 0.1
              }}
            />
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground">
          Current easing: <code>{motionTokens.easing[activeEasing]}</code>
        </div>
      </div>
    );
  }
};

export const SpringPhysics: Story = {
  render: () => {
    const [activeSpring, setActiveSpring] = useState('gentle');
    const [trigger, setTrigger] = useState(0);

    return (
      <div className="space-y-6">
        <div className="flex gap-2">
          {Object.keys(motionTokens.spring).map((spring) => (
            <HiveButton
              key={spring}
              size="sm"
              variant={activeSpring === spring ? 'default' : 'outline'}
              onClick={() => setActiveSpring(spring)}
            >
              {spring}
            </HiveButton>
          ))}
        </div>
        
        <motion.div
          className="w-24 h-24 bg-hive-accent rounded-xl mx-auto cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ x: trigger * 200 }}
          transition={motionTokens.spring[activeSpring]}
          onClick={() => setTrigger(trigger === 0 ? 1 : 0)}
        />
        
        <div className="text-center text-sm text-muted-foreground">
          Click the box to see {activeSpring} spring physics • Current: {JSON.stringify(motionTokens.spring[activeSpring])}
        </div>
      </div>
    );
  }
};

export const MagneticInteractions: Story = {
  render: () => {
    const [draggedElement, setDraggedElement] = useState(null);
    const [droppedElements, setDroppedElements] = useState([]);

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">Magnetic Tool Assembly</h3>
          <p className="text-sm text-muted-foreground">Drag elements to the canvas to see magnetic snapping</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Element Library</h4>
            <div className="grid grid-cols-2 gap-3">
              {['Timer', 'Chart', 'Form', 'Media'].map((element, i) => (
                <motion.div
                  key={element}
                  className="p-4 bg-hive-background-card border border-hive-border rounded-lg cursor-grab active:cursor-grabbing text-center"
                  drag
                  dragSnapToOrigin
                  whileDrag={{ 
                    scale: 1.1, 
                    rotate: 5,
                    zIndex: 10,
                    boxShadow: '0 6 50px -3 rgba(255, 215, 0, 0.25)'
                  }}
                  dragTransition={{ 
                    bounceStiffness: 600, 
                    bounceDamping: 20 
                  }}
                  onDragStart={() => setDraggedElement(element)}
                  onDragEnd={() => setDraggedElement(null)}
                >
                  <div className="text-2xl mb-2">
                    {['⏰', '📊', '📋', '🎬'][i]}
                  </div>
                  <div className="text-sm font-medium">{element}</div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tool Canvas</h4>
            <motion.div
              className="h-64 border-2 border-dashed border-hive-border rounded-lg bg-hive-background-muted/30 flex items-center justify-center"
              animate={{
                borderColor: draggedElement ? 'var(--hive-brand-secondary)' : 'var(--hive-border)',
                backgroundColor: draggedElement ? 'color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)' : 'rgba(var(--hive-background-muted), 0.3)'
              }}
              transition={{ duration: 0.2, ease: motionTokens.easing.liquidMetal }}
            >
              {droppedElements.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-sm">Drop elements here</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 p-4">
                  {droppedElements.map((element, i) => (
                    <motion.div
                      key={i}
                      className="p-3 bg-hive-background-card rounded-lg text-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={motionTokens.spring.snappy}
                    >
                      {element}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
};

export const RippleEffects: Story = {
  render: () => {
    const [ripples, setRipples] = useState([]);

    const createRipple = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      const newRipple = { x, y, size, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Button Ripple</h4>
            <motion.button
              className="relative w-full h-20 bg-hive-accent text-[var(--hive-text-primary)] rounded-lg overflow-hidden font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createRipple}
            >
              Click for Ripple Effect
              {ripples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  className="absolute bg-[var(--hive-text-primary)] rounded-full opacity-30"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, opacity: [0.3, 0] }}
                  transition={{ duration: 0.6, ease: motionTokens.easing.liquidMetal }}
                />
              ))}
            </motion.button>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Card Cascade</h4>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="p-4 bg-hive-background-card border border-hive-border rounded-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: motionTokens.easing.liquidMetal
                  }}
                  whileHover={{
                    x: 10,
                    transition: { duration: 0.2, ease: motionTokens.easing.magneticSnap }
                  }}
                >
                  Card {i} with cascade animation
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const ComponentTransitions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentView, setCurrentView] = useState('list');

    return (
      <div className="space-y-8">
        <div>
          <h4 className="font-semibold mb-4">Modal Transition</h4>
          <HiveButton onClick={() => setIsOpen(true)}>
            Open Modal
          </HiveButton>
          
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-[var(--hive-background-primary)]/50 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: motionTokens.easing.liquidMetal }}
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  className="fixed inset-0 flex items-center justify-center z-50 p-4"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={motionTokens.spring.gentle}
                >
                  <HiveCard className="p-6 max-w-md w-full">
                    <h3 className="text-lg font-semibold mb-4">Liquid Metal Modal</h3>
                    <p className="text-muted-foreground mb-6">
                      This modal uses HIVE's signature liquid metal motion for premium feel.
                    </p>
                    <div className="flex gap-3">
                      <HiveButton variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                      </HiveButton>
                      <HiveButton onClick={() => setIsOpen(false)}>
                        Confirm
                      </HiveButton>
                    </div>
                  </HiveCard>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">View Transitions</h4>
          <div className="flex gap-2 mb-4">
            {['list', 'grid', 'timeline'].map((view) => (
              <HiveButton
                key={view}
                size="sm"
                variant={currentView === view ? 'default' : 'outline'}
                onClick={() => setCurrentView(view)}
              >
                {view}
              </HiveButton>
            ))}
          </div>
          
          <motion.div
            className="h-32 bg-hive-background-card border border-hive-border rounded-lg flex items-center justify-center"
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: motionTokens.easing.liquidMetal }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">
                {currentView === 'list' && '📝'}
                {currentView === 'grid' && '⚏'}
                {currentView === 'timeline' && '📅'}
              </div>
              <div className="font-semibold capitalize">{currentView} View</div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
};

export const PerformanceOptimized: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    const [enableComplexAnimation, setEnableComplexAnimation] = useState(false);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <HiveButton onClick={() => setCount(count + 1)}>
            Add Element ({count})
          </HiveButton>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={enableComplexAnimation}
              onChange={(e) => setEnableComplexAnimation(e.target.checked)}
            />
            <span className="text-sm">Complex animations</span>
          </label>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {[...Array(count)].map((_, i) => (
            <motion.div
              key={i}
              className="aspect-square bg-hive-accent rounded-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: enableComplexAnimation ? 1 : 0.3,
                delay: enableComplexAnimation ? i * 0.05 : 0,
                ease: motionTokens.easing.liquidMetal
              }}
              whileHover={{
                scale: enableComplexAnimation ? 1.2 : 1.05,
                transition: { duration: 0.2 }
              }}
            />
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground">
          Performance tip: Complex animations are optimized for transform and opacity only.
          Try adding many elements to test 60fps performance.
        </div>
      </div>
    );
  }
};