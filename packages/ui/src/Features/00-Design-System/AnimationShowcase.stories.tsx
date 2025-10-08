/**
 * HIVE 2025 Animation Showcase
 *
 * Demonstrates all modern animation patterns:
 * - Spring physics
 * - Gesture interactions
 * - Scroll-linked animations
 * - Layout animations
 * - Micro-interactions
 * - Shared element transitions
 */

import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import {
  springs,
  fade,
  scale,
  stagger,
  micro,
  celebration,
  useScrollReveal,
  useParallax,
  useSwipeToDismiss,
  dragToReorderProps,
  gesturePresets,
  layoutProps,
  listItemProps,
  tabUnderlineProps,
  createSharedElement,
} from '../../lib/animations';
import { Card, CardHeader, CardTitle, CardContent } from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Badge } from '../../atomic/atoms/badge';

const meta: Meta = {
  title: '00-Design-System/Animation Showcase',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 1. SPRING PHYSICS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const SpringPhysics: Story = {
  render: () => {
    const [show, setShow] = useState(true);

    return (
      <div className="min-h-screen bg-black p-8 space-y-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Spring Physics</h1>
            <p className="text-zinc-400">
              Natural, physics-based animations that feel alive
            </p>
          </div>

          <Button onClick={() => setShow(!show)} className="mb-4">
            Toggle Animations
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Snappy */}
            <AnimatePresence mode="wait">
              {show && (
                <motion.div
                  key="snappy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={springs.snappy}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Snappy Spring</CardTitle>
                      <Badge variant="secondary">Fast & Responsive</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-400">
                        Perfect for buttons and toggles
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smooth */}
            <AnimatePresence mode="wait">
              {show && (
                <motion.div
                  key="smooth"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={springs.smooth}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Smooth Spring</CardTitle>
                      <Badge variant="secondary">Balanced</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-400">
                        Best for cards and modals
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bouncy */}
            <AnimatePresence mode="wait">
              {show && (
                <motion.div
                  key="bouncy"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={springs.bouncy}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Bouncy Spring</CardTitle>
                      <Badge variant="default">Playful</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-400">
                        For celebrations and success states
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gentle */}
            <AnimatePresence mode="wait">
              {show && (
                <motion.div
                  key="gentle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={springs.gentle}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Gentle Spring</CardTitle>
                      <Badge variant="outline">Subtle</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-400">
                        For tooltips and subtle elements
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 2. STAGGER ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const StaggerAnimations: Story = {
  render: () => {
    const items = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      title: `Item ${i + 1}`,
    }));

    return (
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Stagger Animations
            </h1>
            <p className="text-zinc-400">
              Orchestrated entrance with perfect timing
            </p>
          </div>

          <motion.div
            variants={stagger.default.container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {items.map((item) => (
              <motion.div key={item.id} variants={stagger.default.item}>
                <Card className="cursor-pointer" {...gesturePresets.cardHover}>
                  <CardHeader>
                    <CardTitle className="text-center">{item.title}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  },
};

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 3. MICRO-INTERACTIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const MicroInteractions: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Micro-Interactions
            </h1>
            <p className="text-zinc-400">Buttery-smooth tactile feedback</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Button Press */}
            <Card>
              <CardHeader>
                <CardTitle>Button Press</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div {...gesturePresets.buttonPress}>
                  <Button className="w-full">Press Me</Button>
                </motion.div>
                <motion.div {...gesturePresets.elasticButton}>
                  <Button variant="outline" className="w-full">
                    Elastic Press
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            {/* Card Hover */}
            <Card>
              <CardHeader>
                <CardTitle>Card Hover</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div {...gesturePresets.cardHover}>
                  <Card className="border-primary/50">
                    <CardHeader>
                      <CardTitle className="text-sm">Hover Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-zinc-400">
                        Subtle lift on hover
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CardContent>
            </Card>

            {/* Checkbox */}
            <Card>
              <CardHeader>
                <CardTitle>Checkbox Animation</CardTitle>
              </CardHeader>
              <CardContent>
                <button
                  onClick={() => setChecked(!checked)}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 border-2 border-zinc-600 rounded flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {checked && (
                        <motion.div
                          key="check"
                          variants={micro.check}
                          initial="initial"
                          animate="animate"
                          exit="initial"
                          className="text-primary text-lg"
                        >
                          ✓
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <span className="text-white">Animated Checkbox</span>
                </button>
              </CardContent>
            </Card>

            {/* Pulse Loading */}
            <Card>
              <CardHeader>
                <CardTitle>Loading Pulse</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-20">
                <motion.div
                  variants={micro.pulse}
                  animate="animate"
                  className="w-16 h-16 rounded-full bg-primary"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 4. SCROLL REVEAL
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const ScrollRevealCard = ({ index }: { index: number }) => {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        ...springs.smooth,
        delay: index * 0.1,
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Card {index + 1}</CardTitle>
          <Badge variant={isInView ? 'default' : 'secondary'}>
            {isInView ? 'Visible' : 'Hidden'}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-400">
            Reveals when scrolled into view
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ScrollReveal: Story = {
  render: () => {
    const items = Array.from({ length: 12 }, (_, i) => i);

    return (
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="sticky top-0 bg-black pb-4 z-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Scroll Reveal
            </h1>
            <p className="text-zinc-400">
              Elements animate as they enter the viewport
            </p>
          </div>

          <div className="space-y-4">
            {items.map((i) => (
              <ScrollRevealCard key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 5. PARALLAX DEPTH
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const ParallaxDepth: Story = {
  render: () => {
    const ref = useRef(null);
    const y1 = useParallax(ref, { speed: 0.5 });
    const y2 = useParallax(ref, { speed: 0.3 });
    const y3 = useParallax(ref, { speed: 0.1 });

    return (
      <div className="bg-black">
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Scroll down to see parallax
          </h1>
        </div>

        <div ref={ref} className="relative h-[200vh] overflow-hidden">
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-64 h-64 rounded-full bg-blue-500/30 blur-2xl" />
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-32 h-32 rounded-full bg-purple-500/40 blur-xl" />
          </motion.div>

          <div className="relative z-10 flex items-center justify-center h-full">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle className="text-3xl">Parallax Depth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">
                  Multiple layers moving at different speeds create depth and
                  immersion
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="h-screen flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Keep scrolling...</h2>
        </div>
      </div>
    );
  },
};

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 6. CELEBRATION ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const CelebrationAnimations: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Celebration Animations
            </h1>
            <p className="text-zinc-400">
              Reward users with delightful success states
            </p>
          </div>

          <Button onClick={() => setShow(!show)} size="lg">
            Trigger Celebrations
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Checkmark */}
            <Card>
              <CardHeader>
                <CardTitle>Success Checkmark</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-40">
                <AnimatePresence mode="wait">
                  {show && (
                    <motion.div
                      key="check"
                      variants={celebration.checkmark}
                      initial="initial"
                      animate="animate"
                      className="text-6xl text-green-500"
                    >
                      ✓
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Badge Earned */}
            <Card>
              <CardHeader>
                <CardTitle>Badge Earned</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-40">
                <AnimatePresence mode="wait">
                  {show && (
                    <motion.div
                      key="badge"
                      variants={celebration.badge}
                      initial="initial"
                      animate="animate"
                      className="text-6xl"
                    >
                      🏆
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Streak Fire */}
            <Card>
              <CardHeader>
                <CardTitle>Streak Milestone</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-40">
                <AnimatePresence mode="wait">
                  {show && (
                    <motion.div
                      key="streak"
                      variants={celebration.streak}
                      animate="animate"
                      className="text-6xl"
                    >
                      🔥
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 7. LAYOUT ANIMATIONS (Drag & Drop)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export const LayoutAnimations: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, title: 'Drag me!' },
      { id: 2, title: 'Reorder by dragging' },
      { id: 3, title: 'Layout animates automatically' },
      { id: 4, title: 'Smooth transitions' },
    ]);

    return (
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Layout Animations
            </h1>
            <p className="text-zinc-400">
              Automatic animations when layout changes
            </p>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div key={item.id} {...listItemProps}>
                  <Card className="cursor-move">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white">{item.title}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setItems(items.filter((i) => i.id !== item.id))
                          }
                        >
                          ✕
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            <Button
              onClick={() =>
                setItems([
                  ...items,
                  { id: Date.now(), title: `New item ${items.length + 1}` },
                ])
              }
              variant="outline"
              className="w-full"
            >
              Add Item
            </Button>
          </div>
        </div>
      </div>
    );
  },
};
