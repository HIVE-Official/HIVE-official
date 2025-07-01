"use client";

import Link from "next/link";
import { Button } from "@hive/ui";
import { ArrowRight } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Simple test to see if basic styling works */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          HIVE
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Welcome to HIVE - Your Campus OS
        </p>
        <div className="space-y-4">
          <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-2">Test Card</h2>
            <p className="text-muted-foreground">
              If you can see this content with proper styling, the issue is with the complex animations or inline styles.
            </p>
          </div>
          <Link href="/auth/school-select">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
