"use client";

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Users, User, Zap, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  badge?: number;
  builderOnly?: boolean;
  disabled?: boolean;
}

export interface BottomTabsProps {
  currentPage: "feed" | "spaces" | "profile" | "hivelab" | "create";
  isBuilder?: boolean;
  onTabClick?: (tabId: string) => void;
  notificationCount?: number;
  className?: string;
}

const TAB_ITEMS: TabItem[] = [
  {
    id: "feed",
    label: "Feed",
    icon: Home,
  },
  {
    id: "spaces",
    label: "Spaces",
    icon: Users,
  },
  {
    id: "create",
    label: "Create",
    icon: Plus,
  },
  {
    id: "hivelab",
    label: "HiveLAB",
    icon: Zap,
    builderOnly: true,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
];

export const BottomTabs = React.forwardRef<HTMLDivElement, BottomTabsProps>(
  (
    {
      currentPage,
      isBuilder = false,
      onTabClick,
      notificationCount = 0,
      className,
    },
    ref
  ) => {
    const tabsToShow = TAB_ITEMS.filter(
      (tab) => !tab.builderOnly || (tab.builderOnly && isBuilder)
    );

    const handleTabClick = (tab: TabItem) => {
      if (tab.builderOnly && !isBuilder) return;
      if (tab.disabled) return;

      onTabClick?.(tab.id);
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "bg-surface-01/95 backdrop-blur-sm",
          "border-t border-border-line",
          "safe-area-pb", // Handles iPhone home indicator
          className
        )}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {tabsToShow.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentPage === tab.id;
            const isDisabled = tab.builderOnly && !isBuilder;
            const isCreateButton = tab.id === "create";

            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                disabled={isDisabled}
                className={cn(
                  "relative flex flex-col items-center justify-center",
                  "min-h-[60px] px-3 py-2 rounded-xl",
                  "transition-all duration-200",
                  isCreateButton
                    ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-elevation-2"
                    : isActive
                      ? "bg-surface-02 text-text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-02/50",
                  isDisabled && "opacity-50 cursor-not-allowed",
                  "touch-manipulation" // Optimizes for touch
                )}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                style={{
                  WebkitTapHighlightColor: "transparent", // Removes blue highlight on mobile
                }}
              >
                {/* Icon container with active indicator */}
                <div className="relative">
                  <Icon
                    className={cn("w-6 h-6 mb-1", isCreateButton && "w-5 h-5")}
                  />

                  {/* Builder indicator */}
                  {tab.builderOnly && isBuilder && !isCreateButton && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full" />
                  )}

                  {/* Notification badge */}
                  {tab.badge && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                      {tab.badge > 9 ? "9+" : tab.badge}
                    </div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-xs font-medium leading-none",
                    isCreateButton ? "text-black" : ""
                  )}
                >
                  {tab.label}
                </span>

                {/* Active indicator dot */}
                {isActive && !isCreateButton && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-1 w-1 h-1 bg-yellow-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Safe area padding for devices with home indicators */}
        <div className="h-safe-area-inset-bottom" />
      </motion.div>
    );
  }
);

BottomTabs.displayName = "BottomTabs";

// Hook for detecting mobile viewport
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// Utility function for sample usage
export const createSampleBottomTabsProps = (): BottomTabsProps => ({
  currentPage: "feed",
  isBuilder: true,
  notificationCount: 3,
  onTabClick: (tabId) => console.log("Tab clicked:", tabId),
});
