"use client";

// import { useAuth } from "@hive/hooks";
// import { NotFound } from "@hive/ui";
import Link from "next/link";
import { Button } from "@hive/ui";
// import { useRouter } from "next/navigation"; // Unused import removed
import * as React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-display font-display font-semibold text-accent mb-6">404</h1>
        <h2 className="text-h2 font-display font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-body font-sans text-muted mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might
          have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="space-y-4">
          <Link href="/">
            <Button variant="primary-white" size="lg" className="w-full">
              Go Home
            </Button>
          </Link>
          <div className="text-caption font-sans text-muted">
            <Link 
              href="/campus" 
              className="hover:text-foreground transition-colors duration-fast ease-smooth underline-offset-4 hover:underline"
            >
              Or explore your campus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
