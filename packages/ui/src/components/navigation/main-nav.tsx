"use client";

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  User,
  Zap,
  Search,
  Bell,
  Menu,
  X,
  Settings,
  LogOut,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HiveLogo } from "../brand/hive-logo";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  isBuilder: boolean;
  builderLevel?: "novice" | "intermediate" | "expert";
  campus: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  isActive?: boolean;
  badge?: number;
  builderOnly?: boolean;
  disabled?: boolean;
}

export interface MainNavProps {
  currentPage: "feed" | "spaces" | "profile" | "hivelab" | "search";
  user: User;
  onNavigate?: (page: string) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  notificationCount?: number;
  className?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "feed",
    label: "Feed",
    href: "/feed",
    icon: Home,
  },
  {
    id: "spaces",
    label: "Spaces",
    href: "/spaces",
    icon: Users,
  },
  {
    id: "hivelab",
    label: "HiveLAB",
    href: "/hivelab",
    icon: Zap,
    builderOnly: true,
  },
  {
    id: "search",
    label: "Search",
    href: "/search",
    icon: Search,
  },
];

export const MainNav = React.forwardRef<HTMLElement, MainNavProps>(
  (
    {
      currentPage,
      user,
      onNavigate,
      onProfileClick,
      onSettingsClick,
      onLogoutClick,
      notificationCount = 0,
      className,
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);

    const getBuilderBadgeColor = (level?: string) => {
      switch (level) {
        case "expert":
          return "bg-yellow-500";
        case "intermediate":
          return "bg-yellow-500/80";
        case "novice":
          return "bg-yellow-500/60";
        default:
          return "bg-yellow-500";
      }
    };

    const handleNavClick = (item: NavItem) => {
      if (item.builderOnly && !user.isBuilder) return;
      if (item.disabled) return;

      onNavigate?.(item.id);
      setIsMobileMenuOpen(false);
    };

    const navItemsToShow = NAV_ITEMS.filter(
      (item) => !item.builderOnly || (item.builderOnly && user.isBuilder)
    );

    return (
      <motion.nav
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full",
          "bg-bg-root/95 backdrop-blur-sm",
          "border-b border-border-line",
          className
        )}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-8">
              <motion.div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onNavigate?.("feed")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiveLogo size="md" variant="white" />
                <span className="text-xl font-bold text-text-primary tracking-wide font-display">
                  HIVE
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItemsToShow.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  const isDisabled = item.builderOnly && !user.isBuilder;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      disabled={isDisabled}
                      className={cn(
                        "relative flex items-center gap-2 px-4 py-2 rounded-lg",
                        "text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-surface-02 text-text-primary"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-01",
                        isDisabled && "opacity-50 cursor-not-allowed"
                      )}
                      whileHover={!isDisabled ? { scale: 1.02 } : {}}
                      whileTap={!isDisabled ? { scale: 0.98 } : {}}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}

                      {/* Builder-only indicator */}
                      {item.builderOnly && user.isBuilder && (
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            getBuilderBadgeColor(user.builderLevel)
                          )}
                        />
                      )}

                      {/* Badge for notifications */}
                      {item.badge && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                          {item.badge}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <motion.button
                className="relative p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface-01"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </div>
                )}
              </motion.button>

              {/* Profile Menu */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg transition-colors",
                    "hover:bg-surface-01",
                    showProfileMenu && "bg-surface-02"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-03 flex items-center justify-center text-text-secondary">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Avatar>

                    {/* Builder status indicator */}
                    {user.isBuilder && (
                      <div
                        className={cn(
                          "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-bg-root",
                          "flex items-center justify-center",
                          getBuilderBadgeColor(user.builderLevel)
                        )}
                      >
                        <Crown className="w-2 h-2 text-black" />
                      </div>
                    )}
                  </div>

                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-text-primary">
                      {user.name}
                    </p>
                    <p className="text-xs text-text-secondary">{user.handle}</p>
                  </div>
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-surface-01 border border-border-line rounded-lg shadow-elevation-3 py-2"
                    >
                      {/* Profile Header */}
                      <div className="px-4 py-3 border-b border-border-line">
                        <p className="font-semibold text-text-primary font-display">
                          {user.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {user.handle}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {user.campus}
                        </p>
                        {user.isBuilder && (
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                "bg-yellow-500 text-black"
                              )}
                            >
                              Builder{" "}
                              {user.builderLevel && `• ${user.builderLevel}`}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={() => {
                            onProfileClick?.();
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-02 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          View Profile
                        </button>

                        <button
                          onClick={() => {
                            onSettingsClick?.();
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-02 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>

                        <div className="border-t border-border-line my-1" />

                        <button
                          onClick={() => {
                            onLogoutClick?.();
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-surface-02 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface-01"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border-line bg-surface-01"
            >
              <div className="px-4 py-4 space-y-2">
                {navItemsToShow.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  const isDisabled = item.builderOnly && !user.isBuilder;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      disabled={isDisabled}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left",
                        "text-sm font-medium transition-colors",
                        isActive
                          ? "bg-surface-02 text-text-primary"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-02",
                        isDisabled && "opacity-50 cursor-not-allowed"
                      )}
                      whileHover={!isDisabled ? { x: 4 } : {}}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}

                      {item.builderOnly && user.isBuilder && (
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full ml-auto",
                            getBuilderBadgeColor(user.builderLevel)
                          )}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    );
  }
);

MainNav.displayName = "MainNav";

// Utility function for sample data
export const createSampleUser = (): User => ({
  id: "user-1",
  name: "Sarah Chen",
  handle: "@sarah_cs",
  avatar: undefined,
  isBuilder: true,
  builderLevel: "intermediate",
  campus: "University at Buffalo",
});
