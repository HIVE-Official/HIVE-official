import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Command } from "lucide-react";

// Placeholder for user avatar
const PlaceholderAvatar = () => (
  <div className="h-9 w-9 rounded-full bg-accent" />
);

// Placeholder for the command menu trigger
const CommandMenuTrigger = () => (
    <motion.button
        className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground/60 shadow-sm transition-colors hover:bg-foreground/5"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <div className="relative">
            <motion.div
                className="absolute -inset-1 rounded-full bg-accent/50 opacity-0"
                animate={{
                    opacity: [0, 0.8, 0],
                    scale: [1, 1.4, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                }}
            />
            <Command className="relative h-4 w-4" />
        </div>
        <span>Command...</span>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-surface-02 px-1.5 font-mono text-[10px] font-medium text-foreground/80 opacity-100">
            <span className="text-xs">⌘</span>K
        </kbd>
    </motion.button>
)


// The main layout component for Option C
export const LayoutAdaptive = ({
  children,
  scrolled, // Simulate scroll state for Storybook
}: {
  children: React.ReactNode;
  scrolled?: boolean;
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
      {/* Minimal Top Bar */}
      <header
        className={cn(
          "sticky top-0 z-50 flex h-14 items-center justify-between px-4",
          "transition-all duration-fast ease-standard",
          scrolled && "border-b border-border bg-surface/80 backdrop-blur-sm"
        )}
      >
        <div>
           {/* Can be a breadcrumb or other contextual element */}
        </div>
        <div className="flex items-center gap-4">
            <CommandMenuTrigger/>
            <PlaceholderAvatar />
        </div>
      </header>
      {/* Full-bleed Content Area */}
      <main className="flex-1">{children}</main>
    </div>
  );
}; 