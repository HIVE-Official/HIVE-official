"use client";

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home, Users, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { logger } from "@hive/core";

// Breadcrumb item interface
export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ElementType;
  isActive?: boolean;
  onClick?: () => void;
}

// Component Props
export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Show home icon for first item */
  showHomeIcon?: boolean;
  /** Custom separator icon */
  separator?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Maximum number of items to show before collapse */
  maxItems?: number;
}

/**
 * HIVE Breadcrumb Component
 *
 * A clean, accessible breadcrumb navigation that complements the main navbar:
 * - #A1A1AA text with #FFD700 active states
 * - Subtle hover effects with 200ms transitions
 * - Automatic truncation for long paths
 * - Full keyboard navigation support
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, showHomeIcon = true, maxItems = 4, className, separator }, ref) => {
    // Handle overflow by showing first item, ellipsis, and last few items
    const getDisplayItems = () => {
      if (items.length <= maxItems) return items;

      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 2));

      return [
        firstItem,
        { id: "ellipsis", label: "...", isActive: false },
        ...lastItems,
      ];
    };

    const displayItems = getDisplayItems();

    const defaultSeparator = (
      <ChevronRight className="w-4 h-4 text-text-secondary" />
    );

    return (
      <nav
        ref={ref}
        className={cn("flex items-center space-x-1 text-sm", className)}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-1">
          {displayItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === displayItems.length - 1;
            const isEllipsis = item.id === "ellipsis";

            return (
              <li key={item.id} className="flex items-center">
                {/* Breadcrumb Item */}
                <motion.div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-md transition-colors",
                    isLast || isEllipsis
                      ? "text-text-primary cursor-default"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-01 cursor-pointer"
                  )}
                  onClick={!isLast && !isEllipsis ? item.onClick : undefined}
                  whileHover={!isLast && !isEllipsis ? { scale: 1.02 } : {}}
                  whileTap={!isLast && !isEllipsis ? { scale: 0.98 } : {}}
                >
                  {/* Home icon for first item */}
                  {index === 0 && showHomeIcon && <Home className="w-4 h-4" />}

                  {/* Custom icon */}
                  {Icon && index !== 0 && <Icon className="w-4 h-4" />}

                  {/* Label */}
                  <span
                    className={cn(
                      "font-medium",
                      isLast && "font-semibold",
                      isEllipsis && "cursor-default select-none"
                    )}
                  >
                    {item.label}
                  </span>
                </motion.div>

                {/* Separator */}
                {!isLast && (
                  <div className="mx-2 flex items-center">
                    {separator || defaultSeparator}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

// Specialized breadcrumbs for common HIVE navigation patterns
export const SpaceBreadcrumb = ({
  spaceName,
  categoryName,
  onSpaceClick,
  onCategoryClick,
}: {
  spaceName: string;
  categoryName?: string;
  onSpaceClick?: () => void;
  onCategoryClick?: () => void;
}) => {
  const items: BreadcrumbItem[] = [
    {
      id: "spaces",
      label: "Spaces",
      onClick: onCategoryClick,
    },
  ];

  if (categoryName) {
    items.push({
      id: "category",
      label: categoryName,
      onClick: onCategoryClick,
    });
  }

  items.push({
    id: "space",
    label: spaceName,
    isActive: true,
    onClick: onSpaceClick,
  });

  return <Breadcrumb items={items} />;
};

export const ProfileBreadcrumb = ({
  userName,
  section,
  onProfileClick,
  onSectionClick,
}: {
  userName: string;
  section?: string;
  onProfileClick?: () => void;
  onSectionClick?: () => void;
}) => {
  const items: BreadcrumbItem[] = [
    {
      id: "profile",
      label: userName,
      onClick: onProfileClick,
    },
  ];

  if (section) {
    items.push({
      id: "section",
      label: section,
      isActive: true,
      onClick: onSectionClick,
    });
  }

  return <Breadcrumb items={items} />;
};

export const HiveLabBreadcrumb = ({
  toolName,
  section,
  onHiveLabClick,
  onToolClick,
}: {
  toolName?: string;
  section?: string;
  onHiveLabClick?: () => void;
  onToolClick?: () => void;
}) => {
  const items: BreadcrumbItem[] = [
    {
      id: "hivelab",
      label: "HiveLAB",
      onClick: onHiveLabClick,
    },
  ];

  if (toolName) {
    items.push({
      id: "tool",
      label: toolName,
      onClick: onToolClick,
    });
  }

  if (section) {
    items.push({
      id: "section",
      label: section,
      isActive: true,
    });
  }

  return <Breadcrumb items={items} />;
};

// Utility functions for sample data
export const createSampleBreadcrumbItems = (): BreadcrumbItem[] => {
  const defaultItems = [
    {
      label: "Feed",
      icon: <Home className="w-4 h-4" />,
      onClick: () => logger.debug("Navigate to Feed"),
    },
    {
      label: "Spaces",
      icon: <Users className="w-4 h-4" />,
      onClick: () => logger.debug("Navigate to Spaces"),
    },
    {
      label: "Academic",
      icon: <GraduationCap className="w-4 h-4" />,
      onClick: () => logger.debug("Navigate to Academic"),
    },
  ];

  return defaultItems;
};
