// Bounded Context Owner: Design System Guild
import { BarChart3, Boxes, ShieldCheck, Users, Flag, ServerCog } from "lucide-react";

export type AdminNavId =
  | "overview"
  | "users"
  | "spaces"
  | "moderation"
  | "analytics"
  | "features"
  | "system"
  | "settings"; // kept for backward-compat; not shown in nav

export type AdminNavItem = {
  id: AdminNavId;
  label: string;
  href: string;
  icon: any; // lucide icon
  requiresAdmin?: boolean; // for future gating
};

export const adminNavItems: readonly AdminNavItem[] = [
  { id: "overview", label: "Overview", href: "/", icon: BarChart3 },
  { id: "users", label: "Users", href: "/users", icon: Users },
  { id: "spaces", label: "Spaces", href: "/spaces", icon: Boxes },
  { id: "moderation", label: "Moderation", href: "/moderation", icon: ShieldCheck },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: BarChart3 },
  { id: "features", label: "Features", href: "/features", icon: Flag },
  { id: "system", label: "System", href: "/system", icon: ServerCog }
];

export function getAdminNav() {
  return adminNavItems;
}

export function toAdminBlockNavMain(activeId: AdminNavId | undefined) {
  return getAdminNav().map((it) => ({
    title: it.label,
    url: it.href,
    icon: it.icon,
    isActive: it.id === activeId
  }));
}
