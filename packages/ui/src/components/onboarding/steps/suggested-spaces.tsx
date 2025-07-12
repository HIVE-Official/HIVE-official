"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MapPin,
  Tag,
  TrendingUp,
  Check,
  Plus,
} from "lucide-react";
import { Button } from "../../button";

interface SuggestedSpace {
  id: string;
  name: string;
  description: string;
  spaceType: string;
  memberCount: number;
  relevanceScore: number;
  tags?: string[];
  recentActivity?: string;
  isActive: boolean;
}

interface UserProfile {
  majors?: string[];
  graduationYear?: number;
}

interface SuggestedSpacesProps {
  onNext: (data: { joinedSpaces: string[] }) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export function SuggestedSpaces({
  onNext,
  onBack,
  isLoading = false,
}: SuggestedSpacesProps) {
  const [_suggestedSpaces, setSuggestedSpaces] = useState<SuggestedSpace[]>([]);
  const [groupedSpaces, setGroupedSpaces] = useState<
    Record<string, SuggestedSpace[]>
  >({});
  const [selectedSpaces, setSelectedSpaces] = useState<Set<string>>(new Set());
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Fetch suggested spaces
  useEffect(() => {
    const fetchSuggestedSpaces = async () => {
      try {
        const token = localStorage.getItem("hive-auth-token");
        if (!token) return;

        const response = await fetch("/api/spaces/suggested", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestedSpaces(data.suggestedSpaces || []);
          setGroupedSpaces(data.groupedSpaces || {});
          setUserProfile(data.userProfile);
        }
      } catch (error) {
        console.error("Failed to fetch suggested spaces:", error);
      } finally {
        setIsLoadingSpaces(false);
      }
    };

    fetchSuggestedSpaces();
  }, []);

  const toggleSpace = (spaceId: string) => {
    const newSelected = new Set(selectedSpaces);
    if (newSelected.has(spaceId)) {
      newSelected.delete(spaceId);
    } else {
      newSelected.add(spaceId);
    }
    setSelectedSpaces(newSelected);
  };

  const handleContinue = () => {
    onNext({ joinedSpaces: Array.from(selectedSpaces) });
  };

  const spaceTypeLabels = {
    academic: "Academic",
    social: "Social",
    professional: "Professional",
    sports: "Sports",
    cultural: "Cultural",
    service: "Service",
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 40) return "text-accent";
    if (score >= 25) return "text-foreground";
    return "text-muted";
  };

  const getRelevanceLabel = (score: number) => {
    if (score >= 40) return "Highly Relevant";
    if (score >= 25) return "Relevant";
    return "Suggested";
  };

  if (isLoadingSpaces) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted">Finding spaces for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
          Join Your Communities
        </h1>
        <p className="text-muted font-sans mb-4">
          We've found some spaces that match your interests and profile
        </p>

        {/* User Profile Summary */}
        {userProfile && (
          <div className="inline-flex items-center space-x-2 text-sm text-muted bg-muted/20 px-3 py-1 rounded-full">
            <MapPin className="w-3 h-3" />
            <span>{userProfile.majors?.join(", ") || "Your major"}</span>
            <span>•</span>
            <span>Class of {userProfile.graduationYear}</span>
          </div>
        )}
      </motion.div>

      {/* Selection Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">
              {selectedSpaces.size} spaces selected
            </h3>
            <p className="text-sm text-muted">
              Join at least 3 spaces to get started
            </p>
          </div>
          <div className="text-2xl font-display font-bold text-accent">
            {selectedSpaces.size}/3+
          </div>
        </div>
      </motion.div>

      {/* Suggested Spaces by Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6 mb-8"
      >
        {Object.entries(groupedSpaces).map(([spaceType, spaces]) => (
          <div key={spaceType}>
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center space-x-2">
              <span>
                {spaceTypeLabels[spaceType as keyof typeof spaceTypeLabels]}
              </span>
              <span className="text-sm text-muted font-normal">
                ({spaces.length} available)
              </span>
            </h3>

            <div className="grid gap-3">
              {spaces.map((space) => (
                <motion.button
                  key={space.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggleSpace(space.id)}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 text-left ${
                    selectedSpaces.has(space.id)
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          {space.name}
                        </h4>
                        <div
                          className={`flex items-center space-x-1 ${getRelevanceColor(
                            space.relevanceScore
                          )}`}
                        >
                          <TrendingUp className="w-3 h-3" />
                          <span className="text-xs font-medium">
                            {getRelevanceLabel(space.relevanceScore)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted mb-2">
                        {space.description}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-muted">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{space.memberCount} members</span>
                        </div>
                        {space.tags && (
                          <div className="flex items-center space-x-1">
                            <Tag className="w-3 h-3" />
                            <span>{space.tags.slice(0, 2).join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`p-2 rounded-full transition-colors ${
                        selectedSpaces.has(space.id)
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {selectedSpaces.has(space.id) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <Button
          onClick={handleContinue}
          disabled={selectedSpaces.size < 3 || isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading
            ? "Joining Spaces..."
            : `Continue with ${selectedSpaces.size} spaces`}
        </Button>

        {selectedSpaces.size < 3 && (
          <p className="text-sm text-muted text-center">
            Select at least 3 spaces to continue
          </p>
        )}

        {onBack && (
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            Back
          </Button>
        )}
      </motion.div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 p-4 bg-muted/20 rounded-lg"
      >
        <p className="text-sm text-muted text-center">
          Don't worry - you can always join more spaces or leave these ones
          later from your feed
        </p>
      </motion.div>
    </div>
  );
}
