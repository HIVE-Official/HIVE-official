// Bounded Context Owner: Design System Guild
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Folder,
  Clock,
  User,
  FlaskConical,
  Settings as SettingsIcon,
} from "lucide-react";

export type HiveNavId =
  | "feed"
  | "spaces"
  | "recents"
  | "profile"
  | "hivelab"
  | "settings";

export type HiveNavItem = {
  id: HiveNavId;
  label: string;
  href: string;
  icon: LucideIcon; // lucide icon component
  requiresLeader?: boolean;
};

export const hiveNavItems: readonly HiveNavItem[] = [
  { id: "feed", label: "Home", href: "/", icon: Home },
  { id: "spaces", label: "Spaces", href: "/spaces", icon: Folder },
  { id: "recents", label: "Recents", href: "/recents", icon: Clock },
  { id: "profile", label: "Profile", href: "/profile", icon: User },
  {
    id: "hivelab",
    label: "HiveLab",
    href: "/hivelab",
    icon: FlaskConical,
    requiresLeader: true,
  },
  { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
];

export function getHiveNav(isLeader: boolean) {
  return hiveNavItems.filter((it) => !it.requiresLeader || isLeader);
}

export function toBlockNavMain(
  activeId: HiveNavId | undefined,
  isLeader: boolean
) {
  return getHiveNav(isLeader).map((it) => ({
    title: it.label,
    url: it.href,
    icon: it.icon,
    isActive: it.id === activeId,
  }));
}
