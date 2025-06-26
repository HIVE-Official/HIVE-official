"use client";

// import { useAuth } from "@hive/hooks";
// import { NotFound } from "@hive/ui";
import Link from "next/link";
import { Button } from "@hive/ui";
// import { useRouter } from "next/navigation"; // Unused import removed
import * as React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4 font-display">
          Page Not Found
        </h2>
        <p className="text-muted mb-8 max-w-md mx-auto font-sans">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might
          have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-accent hover:bg-accent-600 text-background">
              Go Home
            </Button>
          </Link>
          <div className="text-sm text-muted font-sans">
            <Link href="/campus" className="hover:text-foreground transition-colors duration-fast ease-hive-smooth">
              Or explore your campus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
