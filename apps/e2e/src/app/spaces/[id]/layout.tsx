"use client";

import type { PropsWithChildren } from "react";
import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SegmentedControl } from "@hive/ui";

export default function SpaceSectionLayout(
  { children, params }: PropsWithChildren<{ params: { id: string } }>
): JSX.Element {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const id = params.id;

  const active = useMemo<"home" | "calendar" | "members" | "about">(() => {
    if (pathname.endsWith(`/spaces/${id}`) || pathname.includes(`/spaces/${id}?`)) return "home";
    if (pathname.includes(`/spaces/${id}/calendar`)) return "calendar";
    if (pathname.includes(`/spaces/${id}/members`)) return "members";
    if (pathname.includes(`/spaces/${id}/about`)) return "about";
    return "home";
  }, [pathname, id]);

  return (
    <>
      <div className="px-page pt-3">
        <div className="container-page max-w-[var(--shell-max-w)] flex items-end justify-between gap-4">
          <div className="text-caption">
            <Link className="text-primary underline-offset-4 hover:underline" href="/spaces">Back to spaces</Link>
          </div>
          <SegmentedControl
            aria-label="Space section"
            value={active}
            onValueChange={(v) => {
              const next = v as typeof active;
              switch (next) {
                case "home":
                  router.push(`/spaces/${id}`);
                  break;
                case "calendar":
                  router.push(`/spaces/${id}/calendar`);
                  break;
                case "members":
                  router.push(`/spaces/${id}/members`);
                  break;
                case "about":
                  router.push(`/spaces/${id}/about`);
                  break;
              }
            }}
            items={[
              { value: "home", label: "Home" },
              { value: "calendar", label: "Calendar" },
              { value: "members", label: "Members" },
              { value: "about", label: "About" }
            ]}
            className="ml-auto"
            size="sm"
          />
        </div>
      </div>
      {children}
    </>
  );
}

