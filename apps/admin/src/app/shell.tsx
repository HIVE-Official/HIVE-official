"use client";

import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import type { AdminNavId } from "@hive/ui";
import { Separator } from "@hive/ui";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@hive/ui";
import { AppSidebarAdmin } from "@hive/ui";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@hive/ui";

function toActiveId(pathname: string): AdminNavId | undefined {
  if (pathname === "/" || pathname.startsWith("/overview")) return "overview";
  if (pathname.startsWith("/users")) return "users";
  if (pathname.startsWith("/spaces")) return "spaces";
  if (pathname.startsWith("/moderation")) return "moderation";
  if (pathname.startsWith("/analytics")) return "analytics";
  if (pathname.startsWith("/features")) return "features";
  if (pathname.startsWith("/system")) return "system";
  if (pathname.startsWith("/settings")) return "settings";
  return undefined;
}

export default function AdminShell({ children }: PropsWithChildren) {
  const pathname = usePathname() || "/";
  const activeId = toActiveId(pathname);

  const showChrome = useMemo(() => true, []);

  if (!showChrome) return <>{children}</>;

  return (
    <SidebarProvider>
      <AppSidebarAdmin activeId={activeId} />
      <SidebarInset>
        <header className="flex h-[var(--header-h,3.5rem)] shrink-0 items-center gap-2 bg-background border-b border-border">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {activeId ? activeId[0]?.toUpperCase() + activeId.slice(1) : "Overview"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-0 p-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
