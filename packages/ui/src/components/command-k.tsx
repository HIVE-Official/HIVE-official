"use client";

import * as React from "react";
import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
} from "@/molecules/command";
import { getHiveNav, type HiveNavItem } from "@/organisms/nav-config";

export type CommandKProps = {
  /** Provide nav items (defaults to leader=true for showcase) */
  navItems?: readonly HiveNavItem[];
  /** Open state controlled externally (optional) */
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
};

/**
 * CommandK — minimal command palette wrapper for shell demos.
 * - Opens on Cmd/Ctrl+K.
 * - Provides a Navigate group derived from nav-config.
 * - Kept framework-agnostic (uses anchors).
 */
export function CommandK({ navItems, open: openProp, onOpenChange }: CommandKProps): JSX.Element {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = openProp ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const items = navItems ?? getHiveNav(true);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const onSelectHref = (href: string) => {
    try {
      // In Storybook, navigating hash is safer
      if (href.startsWith("/")) {
        window.location.hash = `#nav:${href}`;
      } else {
        window.location.href = href;
      }
    } catch {
      // noop
    }
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Search or jump…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {items.map((it) => (
              <CommandItem key={it.id} value={it.label} onSelect={() => onSelectHref(it.href)}>
                <it.icon className="mr-2 h-4 w-4" />
                <span>{it.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => setOpen(false)}>Create…</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Open Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

export default CommandK;

