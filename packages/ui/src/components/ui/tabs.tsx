"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/index";
import { useReducedMotion } from "@/motion/use-reduced-motion";
import "./tabs.css";

const Tabs = TabsPrimitive.Root;

const springTransition = { type: "spring", stiffness: 280, damping: 30 };

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref]
  );
  const reducedMotion = useReducedMotion();
  const [indicator, setIndicator] = React.useState<{ width: number; left: number } | null>(null);

  const updateIndicator = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>('[data-state="active"]');
    if (!active) {
      setIndicator(null);
      return;
    }
    const width = active.offsetWidth;
    const left = active.offsetLeft;
    setIndicator((prev) => {
      if (prev && prev.width === width && prev.left === left) return prev;
      return { width, left };
    });
  }, []);

  React.useEffect(() => {
    updateIndicator();
    const list = listRef.current;
    if (!list || typeof window === "undefined") return;
    const observer = new MutationObserver(() => updateIndicator());
    observer.observe(list, { subtree: true, attributes: true, attributeFilter: ["data-state"] });
    window.addEventListener("resize", updateIndicator);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <TabsPrimitive.List ref={mergedRef} className={cn("tabs-list", className)} {...props}>
      {children}
      {indicator ? (
        reducedMotion ? (
          <span
            aria-hidden="true"
            className="tabs-indicator"
            style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
          />
        ) : (
          <motion.span
            aria-hidden="true"
            className="tabs-indicator"
            animate={{ x: indicator.left, width: indicator.width }}
            transition={springTransition}
          />
        )
      ) : null}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn("tabs-trigger", className)} {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("tabs-content", className)} {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
