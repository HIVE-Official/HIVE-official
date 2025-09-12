"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/page-container";

import { Handshake, ArrowLeft } from "lucide-react";
import { ErrorBoundary } from "../../../../../components/error-boundary";
import { CrossSpaceCollaboration } from "../../../../../components/spaces/cross-space-collaboration";
import { useRouter } from "next/navigation";

interface SpaceCollaborationPageProps {
  params: Promise<{
    spaceId: string;
  }>;
}

export default function SpaceCollaborationPage({ params }: SpaceCollaborationPageProps) {
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
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setSpaceData({
          name: 'CS Study Group',
          userRole: 'admin'
        });
      } catch (error) {
        console.error('Failed to load collaboration data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaceData();
  }, [spaceId]);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-[var(--hive-text-inverse)]">Loading collaboration...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!spaceData) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Space Not Found</h3>
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
        title="Collaboration"
        subtitle={`Cross-space partnerships for ${spaceData.name}`}
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
            label: "Collaboration", 
            icon: Handshake 
          }
        ]}
       
      >
        <CrossSpaceCollaboration
          currentSpaceId={spaceId}
          currentSpaceName={spaceData.name}
          userRole={spaceData.userRole}
        />
      </PageContainer>
    </ErrorBoundary>
  );
}