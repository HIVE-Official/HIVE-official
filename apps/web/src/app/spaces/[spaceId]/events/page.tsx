"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useAuth } from "@hive/auth-logic";

const EventsPanel = dynamic(() => import("@/components/spaces/panels/events-panel").then(m => m.EventsPanel), { ssr: false });

export default function SpaceEventsPage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { user } = useAuth();

  // Role resolution can be refined; default to guest
  const role: string = (user ? "member" : "guest") as any;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Events</h1>
      <EventsPanel spaceId={String(spaceId)} userRole={role} canCreateEvents={!!user} />
    </div>
  );
}

