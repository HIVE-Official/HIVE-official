"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/temp-stubs";

import { BookOpen, ArrowLeft } from "lucide-react";
import { ErrorBoundary } from "../../../../../components/error-boundary";
import { SpaceResourceManager } from "../../../../../components/spaces/space-resource-manager";
import { useRouter } from "next/navigation";

interface SpaceResourcesPageProps {
  params: Promise<{
    spaceId: string;
  }>;
}

export default function SpaceResourcesPage({ params }: SpaceResourcesPageProps) {
  const router = useRouter();
  const [spaceId, setSpaceId] = useState<string>('');
  const [spaceData, setSpaceData] = useState<{
    name: string;
    userRole: 'admin' | 'moderator' | 'member';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Resolve params Promise
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSpaceId(resolvedParams.spaceId);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!spaceId) return;
    const fetchSpaceData = async () => {
      try {
        // Simulate API call to get space info and user permissions
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setSpaceData({
          name: 'CS Study Group',
          userRole: 'admin' // In real implementation, this would come from the API
        });
      } catch (error) {
        console.error('Failed to load space resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaceData();
  }, [spaceId]);

  const handleCreateEvent = (resourceId: string) => {
    // Navigate to event creation with resource pre-selected
    router.push(`/spaces/${spaceId}/events?resource=${resourceId}`);
  };

  const handleBookResource = () => {
    // Handle resource booking logic
  };

  if (isLoading) {
    return (
      <PageContainer title="Loading..." maxWidth="7xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-white">Loading resources...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!spaceData) {
    return (
      <PageContainer title="Space Not Found" maxWidth="7xl">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-white mb-2">Space Not Found</h3>
          <p className="text-zinc-400 mb-6">The space you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.</p>
          <button
            onClick={() => router.push('/spaces')}
            className="text-hive-gold hover:text-hive-champagne"
          >
            ← Back to Spaces
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <ErrorBoundary>
      <PageContainer
        title="Resources"
        subtitle={`Manage shared resources and equipment for ${spaceData.name}`}
        breadcrumbs={[
          { 
            label: "Spaces", 
            href: "/spaces",
            icon: ArrowLeft
          },
          { 
            label: spaceData.name, 
            href: `/spaces/${spaceId}`
          },
          { 
            label: "Resources", 
            icon: BookOpen 
          }
        ]}
        maxWidth="7xl"
      >
        <SpaceResourceManager
          spaceId={spaceId}
          spaceName={spaceData.name}
          userRole={spaceData.userRole}
          onCreateEvent={handleCreateEvent}
          onBookResource={handleBookResource}
        />
      </PageContainer>
    </ErrorBoundary>
  );
}