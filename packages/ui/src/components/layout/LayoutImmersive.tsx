import React, { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Compass, User, Settings, Bot, Search, Bell } from "lucide-react";
import { HiveLogo } from "../brand/Logo";

interface LayoutImmersiveProps {
  children: ReactNode;
  className?: string;
}

// Placeholder for a logo component
const PlaceholderLogo = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black transition-transform duration-fast ease-standard hover:scale-105">
    <img src="/assets/whitelogo.svg" alt="HIVE Logo" className="h-5 w-5" />
  </div>
);

// Placeholder for a nav link component
const PlaceholderNavLink = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={cn(
      "relative rounded-lg px-3 py-2 font-sans font-medium text-foreground/70 transition-all duration-fast ease-standard hover:text-foreground",
      active && "text-foreground"
    )}
  >
    {label}
    {active && (
      <motion.div
        layoutId="active-header-underline"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
        initial={false}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
    )}
  </a>
);

// Placeholder for user avatar
const PlaceholderAvatar = () => (
  <div className="h-9 w-9 rounded-full bg-accent" />
);

// The main layout component for Option B
export function LayoutImmersive({ children, className }: LayoutImmersiveProps) {
  const [active, setActive] = useState("Feed");
  const navItems = ["Feed", "Spaces", "Profile"];

  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col bg-background font-sans text-foreground",
        className
      )}
    >
      {/* Top Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border bg-surface/80 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <PlaceholderLogo />
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <PlaceholderNavLink
              key={item}
              label={item}
              active={active === item}
              onClick={() => setActive(item)}
            />
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-fast ease-standard hover:bg-foreground/5">
            <Search className="h-5 w-5 text-foreground/80" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-fast ease-standard hover:bg-foreground/5">
            <Bell className="h-5 w-5 text-foreground/80" />
          </button>
          <PlaceholderAvatar />
        </div>
      </header>
      {/* Content Area */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
