"use client";

import Link from "next/link";
import { trackCtaClick } from "../../lib/telemetry";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@hive/ui";

export function EarlyAccessRibbon({ className }: { className?: string }): JSX.Element | null {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const v = localStorage.getItem("hive.ribbon.dismissed");
      if (v === "1") setVisible(false);
    } catch { /* ignore localStorage access */ }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      className={cn(
        "w-full bg-[color-mix(in_srgb,theme(colors.primary.DEFAULT)_18%,transparent)] border-b border-gold-role/30 text-foreground/90",
        "backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_srgb,theme(colors.primary.DEFAULT)_12%,transparent)]",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-2 text-sm flex items-center justify-center gap-3">
        <span className="font-medium">Early Access — rolling out.</span>
        <Link href="/schools" className="underline-offset-4 hover:underline" onClick={() => trackCtaClick({ id: "ribbon_request_campus", href: "/schools", surface: "global", pos: "ribbon" })}>
          Request your campus →
        </Link>
        <button
          type="button"
          aria-label="Dismiss notice"
          onClick={() => {
            setVisible(false);
            try { localStorage.setItem("hive.ribbon.dismissed", "1"); } catch { /* ignore localStorage access */ }
          }}
          className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded border border-gold-role/40/40 text-foreground/70 hover:text-foreground/90 hover:bg-gold-role/10"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default EarlyAccessRibbon;
