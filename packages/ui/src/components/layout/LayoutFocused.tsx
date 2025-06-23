import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Home, Compass, User, Settings, Bot } from "lucide-react";

// Placeholder for a logo component
const PlaceholderLogo = () => (
  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-foreground/10 transition-transform duration-fast ease-standard hover:scale-105">
    <Bot className="h-6 w-6 text-foreground" />
  </div>
);

// Placeholder for a nav link component
const PlaceholderNavLink = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
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
      "relative flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/70 transition-all duration-fast ease-standard hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    )}
  >
    {active && (
      <motion.div
        layoutId="active-sidebar-indicator"
        className="absolute inset-0 z-0 rounded-lg bg-accent"
        initial={false}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
    )}
    <Icon className={cn("relative z-10 h-5 w-5", active && "text-accent-foreground")} />
    <span className={cn("relative z-10 font-sans font-medium", active && "text-accent-foreground")}>{label}</span>
  </a>
);

// Placeholder for user avatar
const PlaceholderAvatar = () => (
  <div className="h-10 w-10 rounded-full bg-accent" />
);

// The main layout component for Option A
export const LayoutFocused = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [active, setActive] = useState("Feed");
  const navItems = [
    { name: "Feed", icon: Home },
    { name: "Spaces", icon: Compass },
    { name: "Profile", icon: User },
  ];

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] bg-background font-sans text-foreground">
      {/* Sidebar */}
      <div className="flex flex-col border-r border-border bg-surface p-4">
        <div className="flex items-center gap-2 p-2">
          <PlaceholderLogo />
          <h1 className="font-display text-2xl font-bold">HIVE</h1>
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <PlaceholderNavLink
              key={item.name}
              icon={item.icon}
              label={item.name}
              active={active === item.name}
              onClick={() => setActive(item.name)}
            />
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <PlaceholderNavLink icon={Settings} label="Settings" active={active === "Settings"} onClick={() => setActive("Settings")} />
          <div className="mt-4 flex items-center gap-3 rounded-lg p-2 transition-colors duration-fast ease-standard hover:bg-foreground/5">
            <PlaceholderAvatar />
            <div className="flex flex-col">
              <span className="font-sans text-sm font-semibold">User Name</span>
              <span className="text-xs text-foreground/60">@username</span>
            </div>
          </div>
        </div>
      </div>
      {/* Content Area */}
      <div className="flex flex-col">
        <header className="flex h-16 items-center border-b border-border bg-surface/80 px-6 backdrop-blur-sm">
          <h2 className="font-display text-xl font-bold">{active}</h2>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}; 