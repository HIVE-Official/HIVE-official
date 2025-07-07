"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

interface Space {
  id: string;
  name: string;
  description: string;
  spaceType: string;
  memberCount: number;
  isActive: boolean;
  tags?: string[];
  lastActivity?: string;
}

interface SpaceClaimingProps {
  onNext: (data: { spaceClaims?: Record<string, unknown>[] }) => void;
  onBack?: () => void;
  isLoading?: boolean;
  _schoolId: string;
}

export function SpaceClaiming({
  onNext,
  onBack,
  isLoading = false,
  _schoolId,
}: SpaceClaimingProps) {
  const [availableSpaces, setAvailableSpaces] = useState<
    Record<string, Space[]>
  >({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [claimReason, setClaimReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch available spaces
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const token = localStorage.getItem("hive-auth-token");
        if (!token) return;

        const response = await fetch("/api/spaces/available", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAvailableSpaces(data.availableSpaces || {});
        }
      } catch (error) {
        console.error("Failed to fetch available spaces:", error);
      }
    };

    fetchSpaces();
  }, []);

  // Filter spaces based on search term
  const filteredSpaces = Object.entries(availableSpaces).reduce(
    (acc, [spaceType, spaces]) => {
      const filtered = spaces.filter(
        (space) =>
          space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          space.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      if (filtered.length > 0) {
        acc[spaceType] = filtered;
      }
      return acc;
    },
    {} as Record<string, Space[]>
  );

  const handleClaimSpace = async () => {
    if (!selectedSpace || !claimReason.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const token = localStorage.getItem("hive-auth-token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch("/api/verification/submit-claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          spaceId: selectedSpace.id,
          spaceName: selectedSpace.name,
          spaceType: selectedSpace.spaceType,
          claimReason: claimReason.trim(),
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onNext({
            spaceClaims: [
              {
                spaceId: selectedSpace.id,
                spaceName: selectedSpace.name,
                spaceType: selectedSpace.spaceType,
                claimReason: claimReason.trim(),
                status: "pending",
                submittedAt: new Date(),
              },
            ],
          });
        }, 2000);
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Failed to submit claim");
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Space claim error:", error);
      setErrorMessage("Network error occurred");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onNext({ spaceClaims: [] });
  };

  const spaceTypeLabels = {
    academic: "Academic",
    social: "Social",
    professional: "Professional",
    sports: "Sports",
    cultural: "Cultural",
    service: "Service",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
          Claim Your Organization's Space
        </h1>
        <p className="text-muted font-sans">
          Find and claim your club or organization's space on HIVE
        </p>
      </motion.div>

      {!selectedSpace ? (
        <>
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <Input
                placeholder="Search for your organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Available Spaces */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 mb-8"
          >
            {Object.entries(filteredSpaces).map(([spaceType, spaces]) => (
              <div key={spaceType}>
                <h3 className="font-display font-semibold text-foreground mb-3">
                  {spaceTypeLabels[spaceType as keyof typeof spaceTypeLabels]}{" "}
                  Organizations
                </h3>
                <div className="grid gap-3">
                  {spaces.map((space) => (
                    <motion.button
                      key={space.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedSpace(space)}
                      className="p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">
                            {space.name}
                          </h4>
                          <p className="text-sm text-muted mb-2">
                            {space.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{space.memberCount} members</span>
                            </div>
                            {space.lastActivity && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>Active {space.lastActivity}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Skip Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center space-y-4"
          >
            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              Skip for now - I'll claim my space later
            </Button>

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
        </>
      ) : (
        /* Claim Form */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Selected Space */}
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display font-semibold text-foreground">
                {selectedSpace.name}
              </h3>
              <Button
                onClick={() => setSelectedSpace(null)}
                variant="outline"
                size="sm"
                disabled={isSubmitting}
              >
                Change
              </Button>
            </div>
            <p className="text-sm text-muted mb-2">
              {selectedSpace.description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>
                  {
                    spaceTypeLabels[
                      selectedSpace.spaceType as keyof typeof spaceTypeLabels
                    ]
                  }
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{selectedSpace.memberCount} members</span>
              </div>
            </div>
          </div>

          {/* Claim Reason */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Why are you claiming this space?{" "}
              <span className="text-accent">*</span>
            </label>
            <Textarea
              placeholder="Please explain your role in this organization and why you should be granted access to manage this space..."
              value={claimReason}
              onChange={(e) => setClaimReason(e.target.value)}
              rows={4}
              disabled={isSubmitting}
              className="resize-none"
            />
            <p className="text-xs text-muted mt-1">
              This will be reviewed by the HIVE team for verification
            </p>
          </div>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-accent/10 border border-accent/20 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <div>
                    <h4 className="font-medium text-accent">
                      Claim Submitted!
                    </h4>
                    <p className="text-sm text-muted">
                      Your claim has been submitted for review. You'll be
                      notified once approved.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-surface-02 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-muted" />
                  <div>
                    <h4 className="font-medium text-foreground">Claim Failed</h4>
                    <p className="text-sm text-muted">{errorMessage}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleClaimSpace}
              disabled={
                !claimReason.trim() ||
                isSubmitting ||
                submitStatus === "success"
              }
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Submitting Claim..." : "Submit Claim for Review"}
            </Button>

            <Button
              onClick={() => setSelectedSpace(null)}
              variant="outline"
              className="w-full"
              disabled={isSubmitting || submitStatus === "success"}
            >
              Choose Different Space
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
