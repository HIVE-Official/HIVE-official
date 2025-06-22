"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Calendar,
  Search,
  Bell,
  User,
  Settings,
  Plus,
  Zap,
} from "lucide-react";
import { Button } from "../ui/button";
import { HiveLogo } from "../brand/hive-logo";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ElementType;
  isActive?: boolean;
  badge?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: "feed", label: "Feed", href: "/feed", icon: Home },
  { id: "spaces", label: "Spaces", href: "/spaces", icon: Users },
  { id: "events", label: "Events", href: "/events", icon: Calendar },
  { id: "lab", label: "HiveLAB", href: "/lab", icon: Zap },
];

export const DEFAULT_ACTION_ITEMS: NavItem[] = [
  { id: "search", label: "Search", icon: Search },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export interface NavbarProps {
  navItems?: NavItem[];
  actionItems?: NavItem[];
  activeRoute?: string;
  logoHref?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  className?: string;
  variant?: "default" | "minimal" | "transparent";
  showMobileMenu?: boolean;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (props, ref) => {
    return (
      <motion.nav
        ref={ref}
        className="sticky top-0 z-50 w-full bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/6"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.a
                href="/"
                className="group flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiveLogo size="md" variant="white" />
                <span className="text-xl font-bold text-white tracking-wide font-display">
                  HIVE
                </span>
              </motion.a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="cta" size="sm" className="h-9 px-4 font-medium">
                <Plus className="h-4 w-4 mr-1.5" />
                Create
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
    );
  }
);

Navbar.displayName = "Navbar";
