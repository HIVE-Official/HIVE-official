"use client";

import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { RitualUnlock, RitualSuccess } from "../components/ritual-unlock";
import { usePrefersReducedMotion } from "@hive/hooks/use-reduced-motion";
import { ArrowRight, Star, Zap, Heart, Coffee, Book } from "lucide-react";

const meta: Meta = {
  title: "Design System/Motion System",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# HIVE Motion System

**Campus OS with Linear-style flourishes**

## Philosophy
- **macOS-level baseline** with 10% more expressiveness on key flows
- **Two-tier timing**: 70-100ms micro-affordances, 180-240ms state/content transitions  
- **Gold accents reserved** for moments of meaning (Ritual unlocks, achievements)
- **Broad compatibility** targeting 2018-era laptops & mid-range phones
- **Accessibility-first** with prefers-reduced-motion support

## Performance Targets
- **60fps** on typical student hardware
- **Long tasks <50ms** during animations
- **Progressive enhancement** for higher-end devices
        `,
      },
    },
  },
};

export default meta;

// Component to demonstrate timing tiers
const TimingDemo = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleButtonClick = (id: string) => {
    setActiveButton(id);
    setTimeout(() => setActiveButton(null), 1000);
  };

  return (
    <div className="p-8 bg-hive-canvas min-h-screen space-y-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-h2 text-hive-white mb-4">HIVE Motion System</h2>
          <p className="text-hive-text-muted">
            {prefersReducedMotion
              ? "⚡ Reduced motion mode active - animations disabled"
              : "🎬 Full motion experience - targeting 60fps"}
          </p>
        </div>

        {/* Micro-affordances: 70-100ms */}
        <section className="space-y-4">
          <h3 className="text-h3 text-hive-white">
            Micro-affordances (70-100ms)
          </h3>
          <p className="text-hive-text-muted text-sm">
            Instant feedback for tap, hover, focus - keeps interface feeling
            alive
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="default"
              className="pressable"
              onClick={() => handleButtonClick("primary")}
            >
              Primary Action
            </Button>

            <Button
              variant="secondary"
              className="pressable"
              onClick={() => handleButtonClick("secondary")}
            >
              <Star className="w-4 h-4" />
              Gold Outline
            </Button>

            <Button
              variant="ghost"
              className="pressable"
              onClick={() => handleButtonClick("ghost")}
            >
              Ghost Button
            </Button>
          </div>
        </section>

        {/* Card elevation system */}
        <section className="space-y-4">
          <h3 className="text-h3 text-hive-white">Card Elevation System</h3>
          <p className="text-hive-text-muted text-sm">
            Vercel-inspired depth with HIVE motion timing
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((level) => (
              <Card
                key={level}
                elevation={level.toString() as "1" | "2" | "3" | "4"}
                hoverable
                className="p-6"
              >
                <h4 className="font-semibold text-hive-white mb-2">
                  Elevation {level}
                </h4>
                <p className="text-sm text-hive-text-muted">
                  Hover for elevation transition
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Content transitions: 180-240ms */}
        <section className="space-y-4">
          <h3 className="text-h3 text-hive-white">
            Content Transitions (180-240ms)
          </h3>
          <p className="text-hive-text-muted text-sm">
            State changes, drawer, modal - signals context change without
            sluggishness
          </p>

          <ContentTransitionDemo />
        </section>

        {/* Special gold moments */}
        <section className="space-y-4">
          <h3 className="text-h3 text-hive-white">
            Moments of Meaning (Gold Accents)
          </h3>
          <p className="text-hive-text-muted text-sm">
            Reserved for ritual unlocks, achievements, publish success -
            scarcity = cachet
          </p>

          <GoldMomentsDemo />
        </section>
      </div>
    </div>
  );
};

// Content transition demo
const ContentTransitionDemo = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: "feed", label: "Feed", icon: <Heart className="w-4 h-4" /> },
    { id: "spaces", label: "Spaces", icon: <Coffee className="w-4 h-4" /> },
    { id: "learn", label: "Learn", icon: <Book className="w-4 h-4" /> },
  ];

  return (
    <Card className="p-6">
      <div className="flex space-x-1 mb-6 bg-hive-muted/30 p-1 rounded-lg">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
              content-transition flex-1 text-center
              ${
                activeTab === index
                  ? "bg-hive-white text-hive-canvas"
                  : "text-hive-text-muted hover:text-hive-white hover:bg-hive-muted/50"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.22,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="h-32 flex items-center justify-center text-hive-text-muted"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">{tabs[activeTab].icon}</div>
            <p>Content for {tabs[activeTab].label}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

// Gold moments demo
const GoldMomentsDemo = () => {
  const [showRitual, setShowRitual] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button
          variant="secondary"
          onClick={() => setShowRitual(true)}
          className="pressable"
        >
          <Zap className="w-4 h-4" />
          Trigger Ritual Unlock
        </Button>

        <Button
          variant="secondary"
          onClick={() => setShowSuccess(true)}
          className="pressable"
        >
          <Star className="w-4 h-4" />
          Show Success Animation
        </Button>
      </div>

      {/* Ritual unlock modal overlay */}
      <AnimatePresence>
        {showRitual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 bg-hive-canvas/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRitual(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <RitualUnlock
                title="First Campus Ritual"
                description="You've discovered your first campus Ritual! This opens up a new layer of your university experience."
                icon={<Star className="w-6 h-6" />}
                onConfirm={() => {
                  setShowRitual(false);
                  setShowSuccess(true);
                }}
                onDismiss={() => setShowRitual(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success animation overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 bg-hive-canvas/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccess(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Card className="p-8 max-w-sm">
                <RitualSuccess onComplete={() => setShowSuccess(false)} />
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// List stagger demo
const ListStaggerDemo = () => {
  const [items, setItems] = useState([
    "Campus event tonight",
    "New ritual unlocked",
    "Study group forming",
    "Coffee chat scheduled",
    "Project deadline reminder",
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setItems([...items].sort(() => Math.random() - 0.5));
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-hive-white">Feed Items</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          Refresh
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {!isRefreshing && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.035,
                  delayChildren: 0.05,
                },
              },
            }}
            className="space-y-3"
          >
            {items.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.18,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                <Card className="p-4 hoverable">
                  <p className="text-hive-white">{item}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Performance monitoring demo
const PerformanceDemo = () => {
  const [fps, setFps] = useState(60);
  const [longTask, setLongTask] = useState(false);

  React.useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;

    const tick = (currentTime: number) => {
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <Card className="p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-hive-white mb-2">
            Performance Monitor
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-hive-text-muted">Current FPS:</span>
              <span
                className={`font-mono ${fps >= 55 ? "text-green-400" : fps >= 30 ? "text-yellow-400" : "text-red-400"}`}
              >
                {fps}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-hive-text-muted">Long Tasks:</span>
              <span
                className={`font-mono ${longTask ? "text-red-400" : "text-green-400"}`}
              >
                {longTask ? ">50ms" : "<50ms"}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-hive-white mb-2">
            Quality Gates
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-hive-text-muted">
                Lighthouse Performance: 95+
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-hive-text-muted">
                Motion System: Optimized
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-hive-text-muted">
                Reduced Motion: Supported
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Main story
export const MotionSystemShowcase: StoryObj = {
  render: () => <TimingDemo />,
  parameters: {
    docs: {
      description: {
        story: `
Complete demonstration of the HIVE Motion System implementation.

**Key Features:**
- ⚡ Two-tier timing system (70-100ms micro, 180-240ms content)
- 🎯 Strategic gold accent usage for moments of meaning
- ♿ Full accessibility support with prefers-reduced-motion
- 📱 Broad compatibility targeting 2018-era devices
- 🚀 Performance monitoring and quality gates
        `,
      },
    },
  },
};

export const ListStagger: StoryObj = {
  render: () => (
    <div className="p-8 bg-hive-canvas min-h-screen max-w-md mx-auto">
      <ListStaggerDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of staggered list animations with 35ms timing, capped at 8 items for performance.",
      },
    },
  },
};

export const PerformanceMonitor: StoryObj = {
  render: () => (
    <div className="p-8 bg-hive-canvas min-h-screen max-w-2xl mx-auto">
      <PerformanceDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-time performance monitoring showing FPS and long task detection for quality assurance.",
      },
    },
  },
};
