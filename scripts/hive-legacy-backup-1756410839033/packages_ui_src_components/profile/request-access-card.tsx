"use client";

import React from "react";
import { cn } from "../lib/utils";

interface ExclusiveSpace {
  id: string;
  name: string;
  type: "honors" | "research" | "greek" | "leadership" | "special";
  requirements: string[];
  description: string;
  icon: string;
  applicationStatus?: "pending" | "approved" | "rejected" | null;
}

interface RequestAccessCardProps {
  exclusiveSpaces?: ExclusiveSpace[];
  className?: string;
}

export function RequestAccessCard({ 
  exclusiveSpaces = [], 
  className 
}: RequestAccessCardProps) {
  // Mock exclusive spaces for development
  const mockSpaces: ExclusiveSpace[] = [
    {
      id: "cs-honors",
      name: "CS Honors Society",
      type: "honors",
      requirements: ["3.7+ GPA", "CS Major", "Faculty Recommendation"],
      description: "Elite computer science students advancing the field",
      icon: "🏆",
      applicationStatus: null
    },
    {
      id: "ai-research",
      name: "AI Research Lab",
      type: "research", 
      requirements: ["Graduate Level", "Research Experience", "Professor Approval"],
      description: "Cutting-edge artificial intelligence research",
      icon: "🤖",
      applicationStatus: "pending"
    },
    {
      id: "student-gov",
      name: "Student Government",
      type: "leadership",
      requirements: ["Student Vote", "Leadership Experience", "Campus Involvement"],
      description: "Representing student voice in university decisions",
      icon: "🏛️",
      applicationStatus: null
    }
  ];

  const displaySpaces = exclusiveSpaces.length > 0 ? exclusiveSpaces : mockSpaces;
  const availableSpaces = displaySpaces.filter(space => space.applicationStatus !== "approved");

  const getStatusIcon = (status: ExclusiveSpace["applicationStatus"]) => {
    switch (status) {
      case "pending":
        return (
          <div className="w-5 h-5 bg-[#FFD700]/20 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case "approved":
        return (
          <div className="w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-[var(--hive-text-primary)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case "rejected":
        return (
          <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 bg-[#2A2A2A] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        );
    }
  };

  const getTypeColor = (type: ExclusiveSpace["type"]) => {
    switch (type) {
      case "honors": return "text-[#FFD700]";
      case "research": return "text-blue-400";
      case "greek": return "text-purple-400";
      case "leadership": return "text-green-400";
      default: return "text-muted";
    }
  };

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground font-display">Exclusive Access</h3>
        </div>
        
        <p className="text-muted text-sm">
          Apply to invitation-only spaces and programs
        </p>
      </div>

      {availableSpaces.length > 0 ? (
        <>
          {/* Spaces List */}
          <div className="flex-1 space-y-3 mb-4">
            {availableSpaces.slice(0, 3).map((space) => (
              <div 
                key={space.id}
                className="bg-[#2A2A2A]/40 rounded-lg p-3 border border-[#2A2A2A]/50 hover:border-[#FFD700]/30 hover:bg-[#2A2A2A]/60 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl mt-0.5">{space.icon}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground text-sm group-hover:text-[#FFD700] transition-colors truncate">
                        {space.name}
                      </h4>
                      <span className={cn("text-xs font-medium uppercase tracking-wide", getTypeColor(space.type))}>
                        {space.type}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted mb-2 line-clamp-2">
                      {space.description}
                    </p>
                    
                    {/* Requirements preview */}
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-xs text-muted">Requirements:</span>
                      <span className="text-xs text-foreground">
                        {space.requirements.slice(0, 2).join(", ")}
                        {space.requirements.length > 2 && "..."}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-1">
                    {getStatusIcon(space.applicationStatus)}
                    {space.applicationStatus === "pending" && (
                      <span className="text-xs text-[#FFD700]">Pending</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {availableSpaces.length > 3 && (
              <div className="text-center pt-2">
                <button className="text-xs text-[#FFD700] hover:text-[#FFD700]/80 transition-colors">
                  View all {availableSpaces.length} opportunities →
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <div className="w-12 h-12 bg-[#2A2A2A]/50 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h4 className="text-sm font-medium text-foreground mb-1">All Caught Up</h4>
          <p className="text-xs text-muted">No exclusive spaces available for application</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto">
        <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-muted text-xs">Need an invitation?</span>
            </div>
            <button className="text-xs text-[#FFD700] hover:text-[#FFD700]/80 transition-colors">
              Browse All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}