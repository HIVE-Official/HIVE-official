"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { SpaceActivationRequestForm } from "@hive/ui/components/spaces/space-activation-request-form";

// Mock space data - this would come from your API
const MOCK_SPACE_DATA = {
  "cs-majors": {
    id: "cs-majors",
    name: "CS Majors",
    category: "academic",
    description: "Connect with fellow Computer Science students, share resources, and build together",
    potentialMembers: 1247,
    rssEvents: [
      { title: "CS Department Info Session", date: "2025-01-15", source: "CS Department" },
      { title: "Tech Career Fair", date: "2025-01-20", source: "Career Services" },
      { title: "Algorithm Study Group", date: "2025-01-18", source: "CS Department" },
    ],
  },
  "ellicott-complex": {
    id: "ellicott-complex",
    name: "Ellicott Complex",
    category: "residential",
    description: "For students living in Ellicott Complex - events, study groups, and community building",
    potentialMembers: 892,
    rssEvents: [
      { title: "Ellicott Hall Meeting", date: "2025-01-16", source: "Residential Life" },
      { title: "Floor Social Event", date: "2025-01-22", source: "Residential Life" },
    ],
  },
  "debate-club": {
    id: "debate-club",
    name: "Debate Club",
    category: "social",
    description: "Competitive debate, public speaking, and intellectual discourse",
    potentialMembers: 156,
    rssEvents: [
      { title: "Weekly Debate Practice", date: "2025-01-17", source: "Student Activities" },
      { title: "Inter-University Debate", date: "2025-01-25", source: "Student Activities" },
    ],
  },
};

export default function SpaceActivationRequestPage() {
  const params = useParams();
  const router = useRouter();
  const spaceId = params.spaceId as string;
  
  const [space, setSpace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch space data
    const fetchSpace = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        const spaceData = MOCK_SPACE_DATA[spaceId as keyof typeof MOCK_SPACE_DATA];
        
        if (!spaceData) {
          throw new Error("Space not found");
        }
        
        setSpace(spaceData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpace();
  }, [spaceId]);

  const handleSubmitActivationRequest = async (requestData: {
    connection: string;
    connectionDetails?: string;
    reason: string;
    firstTool: string;
  }) => {
    try {
      // In a real app, this would be an API call
      const response = await fetch(`/api/spaces/${spaceId}/request-activation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit activation request');
      }

      const result = await response.json();
      console.log('Activation request submitted:', result);
      
      // Success is handled by the form component
    } catch (error) {
      console.error('Error submitting activation request:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    router.push('/spaces');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading space details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            Space Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The space you're looking for doesn't exist or isn't available for activation.
          </p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90 transition-colors"
          >
            Back to Spaces
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <SpaceActivationRequestForm
            space={space}
            onSubmit={handleSubmitActivationRequest}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}