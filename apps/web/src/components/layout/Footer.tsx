"use client";

import Link from "next/link";
import { trackCtaClick } from "../../lib/telemetry";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-foreground/80">
          <span className="font-semibold">HIVE</span>
          <span aria-hidden>•</span>
          <span>Campus OS — run by students</span>
          <span aria-hidden>•</span>
          <span>Early Access</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/privacy" className="hover:underline" onClick={() => trackCtaClick({ id: "footer_privacy", href: "/privacy", surface: "global", pos: "footer" })}>Privacy</Link>
          <Link href="/terms" className="hover:underline" onClick={() => trackCtaClick({ id: "footer_terms", href: "/terms", surface: "global", pos: "footer" })}>Terms</Link>
          <Link href="/schools" className="hover:underline" onClick={() => trackCtaClick({ id: "footer_request_campus", href: "/schools", surface: "global", pos: "footer" })}>Request your campus</Link>
        </nav>
      </div>
    </footer>
  );
}
