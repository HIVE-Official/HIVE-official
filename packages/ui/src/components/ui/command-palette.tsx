"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Users,
  MessageCircle,
  Plus,
  Settings,
  User,
  Clock,
  Hash,
  ArrowRight,
  Command,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { logger } from "@hive/core";

// HIVE Brand Compliant Motion Timing
const HIVE_MOTION = {
  // 90ms for micro-interactions (brand standard)
  micro: {
    duration: 0.09,
    ease: [0.22, 0.61, 0.36, 1],
  },
  // 220ms for content transitions (brand standard)
  content: {
    duration: 0.22,
    ease: [0.22, 0.61, 0.36, 1],
  },
} as const;

// Command Categories (Campus OS Structure)
export type CommandCategory =
  | "navigation"
  | "actions"
  | "people"
  | "spaces"
  | "events"
  | "recent"
  | "search";

export interface Command {
  id: string;
  title: string;
  subtitle?: string;
  category: CommandCategory;
  icon?: React.ReactNode;
  shortcut?: string[];
  keywords?: string[];
  action: () => void;
  disabled?: boolean;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands?: Command[];
  placeholder?: string;
  emptyState?: React.ReactNode;
  className?: string;
}

// Default HIVE Campus Commands
const defaultCommands: Command[] = [
  // Navigation
  {
    id: "nav-dashboard",
    title: "Dashboard",
    subtitle: "Your personal HIVE overview",
    category: "navigation",
    icon: <User className="w-4 h-4" />,
    shortcut: ["⌘", "D"],
    keywords: ["home", "overview", "dashboard"],
    action: () => logger.debug("Navigate to dashboard"),
  },
  {
    id: "nav-explore",
    title: "Explore Spaces",
    subtitle: "Discover communities and interests",
    category: "navigation",
    icon: <Hash className="w-4 h-4" />,
    shortcut: ["⌘", "E"],
    keywords: ["spaces", "explore", "discover", "communities"],
    action: () => logger.debug("Navigate to explore"),
  },
  {
    id: "nav-events",
    title: "Campus Events",
    subtitle: "What's happening around campus",
    category: "navigation",
    icon: <Calendar className="w-4 h-4" />,
    shortcut: ["⌘", "C"],
    keywords: ["events", "calendar", "happenings"],
    action: () => logger.debug("Navigate to events"),
  },

  // Quick Actions
  {
    id: "action-create-event",
    title: "Create Event",
    subtitle: "Plan something amazing",
    category: "actions",
    icon: <Plus className="w-4 h-4" />,
    shortcut: ["⌘", "N", "E"],
    keywords: ["create", "new", "event", "plan"],
    action: () => logger.debug("Create event"),
  },
  {
    id: "action-create-space",
    title: "Create Space",
    subtitle: "Start a new community",
    category: "actions",
    icon: <Plus className="w-4 h-4" />,
    shortcut: ["⌘", "N", "S"],
    keywords: ["create", "new", "space", "community"],
    action: () => logger.debug("Create space"),
  },
  {
    id: "action-message",
    title: "Send Message",
    subtitle: "Connect with someone",
    category: "actions",
    icon: <MessageCircle className="w-4 h-4" />,
    shortcut: ["⌘", "M"],
    keywords: ["message", "chat", "dm", "connect"],
    action: () => logger.debug("Send message"),
  },

  // Settings
  {
    id: "settings-profile",
    title: "Profile Settings",
    subtitle: "Manage your HIVE identity",
    category: "navigation",
    icon: <Settings className="w-4 h-4" />,
    shortcut: ["⌘", ","],
    keywords: ["settings", "profile", "preferences"],
    action: () => logger.debug("Open settings"),
  },
];

const categoryLabels: Record<CommandCategory, string> = {
  recent: "Recent",
  navigation: "Navigate",
  actions: "Quick Actions",
  people: "People",
  spaces: "Spaces",
  events: "Events",
  search: "Search Results",
};

const categoryIcons: Record<CommandCategory, React.ReactNode> = {
  recent: <Clock className="w-3 h-3" />,
  navigation: <ArrowRight className="w-3 h-3" />,
  actions: <Plus className="w-3 h-3" />,
  people: <Users className="w-3 h-3" />,
  spaces: <Hash className="w-3 h-3" />,
  events: <Calendar className="w-3 h-3" />,
  search: <Search className="w-3 h-3" />,
};

export const CommandPalette = React.forwardRef<
  HTMLDivElement,
  CommandPaletteProps
>(
  (
    {
      open,
      onOpenChange,
      commands = defaultCommands,
      placeholder = "Type a command or search...",
      emptyState,
      className,
    },
    ref
  ) => {
    const [query, setQuery] = React.useState("");
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // Filter and group commands
    const filteredCommands = React.useMemo(() => {
      if (!query) return commands;

      return commands.filter((command) => {
        const searchTerms = [
          command.title,
          command.subtitle,
          ...(command.keywords || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchTerms.includes(query.toLowerCase());
      });
    }, [commands, query]);

    const groupedCommands = React.useMemo(() => {
      const groups: Record<CommandCategory, Command[]> = {
        recent: [],
        navigation: [],
        actions: [],
        people: [],
        spaces: [],
        events: [],
        search: [],
      };

      filteredCommands.forEach((command) => {
        groups[command.category].push(command);
      });

      // Remove empty categories
      return Object.entries(groups).filter(
        ([, commands]) => commands.length > 0
      );
    }, [filteredCommands]);

    const allCommands = React.useMemo(() => {
      return groupedCommands.flatMap(([, commands]) => commands);
    }, [groupedCommands]);

    // Keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!open) return;

        switch (e.key) {
          case "Escape": {
            onOpenChange(false);
            break;
          }
          case "ArrowDown": {
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev < allCommands.length - 1 ? prev + 1 : 0
            );
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev > 0 ? prev - 1 : allCommands.length - 1
            );
            break;
          }
          case "Enter": {
            e.preventDefault();
            const selectedCommand = allCommands[selectedIndex];
            if (selectedCommand && !selectedCommand.disabled) {
              selectedCommand.action();
              onOpenChange(false);
            }
            break;
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onOpenChange, allCommands, selectedIndex]);

    // Reset state when opened
    React.useEffect(() => {
      if (open) {
        setQuery("");
        setSelectedIndex(0);
      }
    }, [open]);

    if (!open) return null;

    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-start justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={HIVE_MOTION.content}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* Command Palette */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={HIVE_MOTION.content}
            className={cn(
              // HIVE Brand: Dark surface with proper border
              "relative mt-24 w-full max-w-2xl bg-surface border border-border rounded-xl shadow-2xl",
              "max-h-[80vh] overflow-hidden",
              className
            )}
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Command className="w-4 h-4 text-muted shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  // HIVE Brand: Geist Sans font, no background, proper focus
                  "flex-1 bg-transparent text-foreground placeholder:text-muted",
                  "font-sans text-base outline-none",
                  "transition-colors duration-[90ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                )}
                autoFocus
              />
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-xs text-muted">
                esc
              </kbd>
            </div>

            {/* Commands List */}
            <div className="max-h-[60vh] overflow-auto py-2">
              {groupedCommands.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  {emptyState || (
                    <>
                      <Search className="w-8 h-8 text-muted mb-3" />
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        No commands found
                      </h3>
                      <p className="text-sm text-muted">
                        Try a different search term or{" "}
                        <button
                          onClick={() => setQuery("")}
                          className="text-accent hover:text-accent-600 transition-colors duration-[90ms]"
                        >
                          clear search
                        </button>
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  {groupedCommands.map(([category, categoryCommands]) => (
                    <div key={category}>
                      {/* Category Header */}
                      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted">
                        {categoryIcons[category as CommandCategory]}
                        {categoryLabels[category as CommandCategory]}
                      </div>

                      {/* Commands in Category */}
                      {categoryCommands.map((command, _commandIndex) => {
                        const globalIndex = allCommands.indexOf(command);
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <motion.button
                            key={command.id}
                            onClick={() => {
                              if (!command.disabled) {
                                command.action();
                                onOpenChange(false);
                              }
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            disabled={command.disabled}
                            whileHover={
                              !command.disabled ? { x: 2 } : undefined
                            }
                            transition={HIVE_MOTION.micro}
                            className={cn(
                              // HIVE Brand: Proper spacing, font, and colors
                              "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg mx-2",
                              "transition-all duration-[90ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",

                              // Selection state with HIVE gold accent
                              isSelected &&
                                !command.disabled && [
                                  "bg-accent/10 text-foreground",
                                  "border border-accent/20",
                                ],

                              // Hover state
                              !isSelected &&
                                !command.disabled && [
                                  "hover:bg-muted/5 text-foreground/80 hover:text-foreground",
                                ],

                              // Disabled state
                              command.disabled &&
                                "opacity-50 cursor-not-allowed"
                            )}
                          >
                            {/* Icon */}
                            {command.icon && (
                              <div
                                className={cn(
                                  "flex items-center justify-center w-8 h-8 rounded-md bg-background border border-border shrink-0",
                                  isSelected && "border-accent/30 bg-accent/5"
                                )}
                              >
                                <div
                                  className={cn(
                                    "text-muted transition-colors duration-[90ms]",
                                    isSelected && "text-accent"
                                  )}
                                >
                                  {command.icon}
                                </div>
                              </div>
                            )}

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-sans font-medium text-sm text-foreground truncate">
                                  {command.title}
                                </span>
                                {command.shortcut && (
                                  <div className="flex items-center gap-0.5">
                                    {command.shortcut.map((key, index) => (
                                      <kbd
                                        key={index}
                                        className="inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-xs text-muted"
                                      >
                                        {key}
                                      </kbd>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {command.subtitle && (
                                <p className="text-xs text-muted truncate mt-0.5">
                                  {command.subtitle}
                                </p>
                              )}
                            </div>

                            {/* Arrow indicator for selected */}
                            {isSelected && !command.disabled && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={HIVE_MOTION.micro}
                              >
                                <ArrowRight className="w-3 h-3 text-accent" />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-background/50">
              <div className="flex items-center gap-4 text-xs text-muted">
                <div className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 select-none items-center rounded border border-border bg-background px-1 font-mono text-xs">
                    ↑↓
                  </kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 select-none items-center rounded border border-border bg-background px-1 font-mono text-xs">
                    ↵
                  </kbd>
                  <span>select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 select-none items-center rounded border border-border bg-background px-1 font-mono text-xs">
                    esc
                  </kbd>
                  <span>close</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted">
                <span className="font-display font-semibold text-accent">
                  HIVE
                </span>
                <span>Command Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }
);

CommandPalette.displayName = "CommandPalette";

// Hook for managing command palette state
export const useCommandPalette = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    open,
    setOpen,
    toggle: () => setOpen((prev) => !prev),
  };
};
