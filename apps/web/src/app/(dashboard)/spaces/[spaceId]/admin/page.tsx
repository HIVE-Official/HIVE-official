"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/temp-stubs";

import { Settings, ArrowLeft } from "lucide-react";
import { ErrorBoundary } from "../../../../../components/error-boundary";
import { SpaceAdminDashboard } from "../../../../../components/spaces/space-admin-dashboard";
import { useRouter } from "next/navigation";

interface SpaceAdminPageProps {
  params: Promise<{
    spaceId: string;
  }>;
}

export default function SpaceAdminPage({ params }: SpaceAdminPageProps) {
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
    
    // Mock space data fetch
    const fetchSpaceData = async () => {
      try {
        // In a real implementation, this would fetch from the API
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        
        setSpaceData({
          name: 'CS Study Group',
          userRole: 'admin' // This would come from the actual user's role in the space
        });
      } catch (error) {
        console.error('Failed to load space data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaceData();
  }, [spaceId]);

  if (isLoading) {
    return (
      <PageContainer title="Loading..." maxWidth="7xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-white">Loading space administration...</p>
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
        title="Space Administration"
        subtitle={`Manage ${spaceData.name}`}
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
            label: "Administration", 
            icon: Settings 
          }
        ]}
        maxWidth="7xl"
      >
        <SpaceAdminDashboard
          spaceId={spaceId}
          spaceName={spaceData.name}
          userRole={spaceData.userRole}
        />
      </PageContainer>
    </ErrorBoundary>
  );
}