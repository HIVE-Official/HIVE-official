"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useAuth } from "@hive/auth-logic";

const ResourcesPanel = dynamic(() => import("@/components/spaces/panels/resources-panel").then(m => m.ResourcesPanel), { ssr: false });

export default function SpaceResourcesPage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Resources</h1>
      <ResourcesPanel spaceId={String(spaceId)} userRole={user ? "member" : "guest"} canUpload={!!user} isLeader={false} />
    </div>
  );
}

