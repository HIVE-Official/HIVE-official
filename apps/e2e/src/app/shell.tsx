"use client";

import type { PropsWithChildren } from "react";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import type { HiveNavId } from "@hive/ui";
import { getHiveNav } from "@hive/ui";
import { Separator, Button, Avatar, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, AppHeader, AppDock, MobileTabBar } from "@hive/ui";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@hive/ui";
import { AppSidebarCompact } from "@hive/ui";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@hive/ui";
import { Bell, Settings } from "lucide-react";
import { useAuth } from "@auth";
import { useProfile } from "@profile";
import { useLeaderPosture } from "@web/app/useLeaderPosture";

function toActiveId(pathname: string): HiveNavId | undefined {
  if (pathname.startsWith("/feed")) return "feed";
  if (pathname.startsWith("/spaces")) return "spaces";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/hivelab") || pathname.startsWith("/lab")) return "hivelab";
  if (pathname.startsWith("/settings")) return "settings";
  return undefined;
}

// Hide chrome on the public landing ("/") and utility/demo routes.
// We want a product‑UI‑free landing page per spec.
const HIDE_CHROME_PREFIXES = ["/", "/login", "/onboarding", "/ui", "/sidebar", "/start"] as const;

export default function AppShell({ children }: PropsWithChildren): JSX.Element {
  const pathname = usePathname() || "/";
  const activeId = toActiveId(pathname);

  const { state: authState, actions: authActions } = useAuth();
  const { profile } = useProfile();
  const isLeader = useLeaderPosture();

  const showChrome = useMemo(() => {
    return !HIDE_CHROME_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
  }, [pathname]);

  if (!showChrome) {
    return <>{children}</>;
  }

  const displayName = profile?.identity?.personalInfo
    ? `${profile.identity.personalInfo.firstName} ${profile.identity.personalInfo.lastName}`.trim()
    : undefined;
  const avatarUrl = profile?.identity?.personalInfo?.photoUrl;

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebarCompact
        isLeader={isLeader}
        activeId={activeId}
        variant="floating"
      />
      {/* Skip link for keyboard users */}
      <a href="#content" className="sr-only focus:not-sr-only focus-ring absolute left-2 top-2 z-50 rounded bg-background px-3 py-1 text-foreground">Skip to content</a>
      <SidebarInset id="content">
        <AppHeader>
          <div className="flex h-[var(--header-h,3.5rem)] items-center justify-between px-4">
          <div className="flex items-center gap-2 min-w-0">
            <SidebarTrigger className="-ml-1" aria-label="Toggle navigation" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {(() => {
                  const segments = pathname.split("/").filter(Boolean);
                  if (segments.length === 0) {
                    return (
                      <BreadcrumbItem>
                        <BreadcrumbPage>Home</BreadcrumbPage>
                      </BreadcrumbItem>
                    );
                  }

                  const labelFor = (seg: string) => {
                    const map: Record<string, string> = {
                      feed: "Feed",
                      spaces: "Spaces",
                      profile: "Profile",
                      hivelab: "HiveLab",
                      lab: "HiveLab",
                      settings: "Settings",
                      onboarding: "Onboarding",
                      schools: "Schools",
                      rituals: "Rituals",
                      create: "Create",
                      about: "About",
                      calendar: "Calendar",
                      members: "Members"
                    };
                    if (map[seg]) return map[seg];
                    if (/^space-|^profile-|^tool-|^[a-z0-9-]{12,}$/iu.test(seg)) return "Detail";
                    return seg.charAt(0).toUpperCase() + seg.slice(1);
                  };

                  const acc: React.ReactNode[] = [];
                  let built = "";
                  segments.forEach((seg, idx) => {
                    built += `/${seg}`;
                    const isLast = idx === segments.length - 1;
                    if (idx > 0) {
                      acc.push(<BreadcrumbSeparator key={`sep-${idx}`} className="hidden md:block" />);
                    }
                    if (isLast) {
                      acc.push(
                        <BreadcrumbItem key={`crumb-${idx}`}>
                          <BreadcrumbPage>{labelFor(seg)}</BreadcrumbPage>
                        </BreadcrumbItem>
                      );
                    } else {
                      acc.push(
                        <BreadcrumbItem key={`crumb-${idx}`} className="hidden md:block">
                          <BreadcrumbLink href={built}>{labelFor(seg)}</BreadcrumbLink>
                        </BreadcrumbItem>
                      );
                    }
                  });
                  return acc;
                })()}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button asChild variant="ghost" size="icon" className="h-11 w-11" aria-label="Notifications">
              <a href="/feed" title="Notifications">
                <Bell className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex h-11 w-11" aria-label="Settings">
              <a href="/settings" title="Settings">
                <Settings className="h-4 w-4" />
              </a>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button aria-label="Account" className="inline-flex items-center justify-center h-11 w-11">
                  <Avatar src={avatarUrl} alt={displayName} fallback={(displayName ?? "").split(" ").map((s) => s[0]).join("") || "U"} className="h-11 w-11" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href="/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="sm:hidden">
                  <a href="/settings">Settings</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => authActions.signOut()}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          </div>
        </AppHeader>
        <div className="flex flex-1 flex-col gap-0 p-0 md:pb-0 pb-[calc(env(safe-area-inset-bottom)+56px)]">{children}</div>
      </SidebarInset>
      <AppDock pathname={pathname} defaultOpen={false} />
      {/* Mobile bottom navigation: follows hive nav items; hidden on md+ */}
      <MobileTabBar
        activeId={activeId}
        items={getHiveNav(isLeader).map((it) => ({ id: it.id, label: it.label, href: it.href, icon: it.icon }))}
      />
    </SidebarProvider>
  );
}
