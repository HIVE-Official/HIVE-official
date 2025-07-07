"use client";

import { AppLayout } from "@/components/layout/AppLayout";

export function SpacesClient() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Spaces Coming Soon!
            </h2>
            
            <p className="text-lg text-muted font-sans mb-8 max-w-2xl mx-auto">
              This is where you&apos;ll discover and join campus communities.
            </p>

            <div className="bg-surface-01 border border-border rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                🏗️ Under Development
              </h3>
              
              <p className="text-muted font-sans">
                Spaces functionality is being built. Check back soon!
              </p>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}