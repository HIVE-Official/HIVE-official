"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface Tool {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  users?: number;
  category?: string;
}

interface ToolsCardProps {
  tools: Tool[];
  className?: string;
}

export function ToolsCard({ 
  tools = [], 
  className 
}: ToolsCardProps) {
  // Generate some mock tools if none provided (for development)
  const mockTools: Tool[] = [
    { id: "1", name: "Study Timer", category: "Productivity", users: 1247, icon: "⏱️" },
    { id: "2", name: "Grade Calc", category: "Academic", users: 892, icon: "📊" },
    { id: "3", name: "Campus Map", category: "Navigation", users: 2156, icon: "🗺️" },
    { id: "4", name: "Food Tracker", category: "Wellness", users: 634, icon: "🍎" },
    { id: "5", name: "Library Spots", category: "Study", users: 1876, icon: "📚" }
  ];
  
  const displayTools = tools.length > 0 ? tools : mockTools.slice(0, 3);
  const hasTools = displayTools.length > 0;

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Enhanced Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground font-display">My Tools</h3>
          </div>
          <span className="text-sm text-[#FFD700] font-medium">{displayTools.length} active</span>
        </div>
        
        {/* Stats preview */}
        <div className="flex items-center gap-2 text-xs text-muted">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {hasTools ? "Tools performing well across campus" : "No tools created yet"}
        </div>
      </div>

      {hasTools ? (
        <>
          {/* Featured Tool Showcase */}
          <div className="flex-1 space-y-4">
            {/* Main featured tool */}
            <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A] hover:border-[#FFD700]/30 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] group cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{displayTools[0]?.icon || "🛠️"}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1 group-hover:text-[#FFD700] transition-colors">
                    {displayTools[0]?.name}
                  </h4>
                  <p className="text-xs text-muted mb-2">{displayTools[0]?.category}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-[#FFD700]">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {displayTools[0]?.users?.toLocaleString()} users
                    </div>
                    <span className="text-muted">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary tools */}
            {displayTools.slice(1, 3).map((tool, _index) => (
              <div key={tool.id} className="bg-[#2A2A2A]/40 rounded-lg p-3 border border-[#2A2A2A]/50 hover:border-[#FFD700]/20 hover:bg-[#2A2A2A]/60 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{tool.icon || "🛠️"}</span>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-foreground group-hover:text-[#FFD700] transition-colors truncate">
                      {tool.name}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span>{tool.category}</span>
                      <span>•</span>
                      <span>{tool.users?.toLocaleString()} users</span>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}

            {displayTools.length > 3 && (
              <div className="text-center pt-2">
                <button className="text-xs text-[#FFD700] hover:text-[#FFD700]/80 transition-colors">
                  View all {displayTools.length} tools →
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 bg-[#2A2A2A]/50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c0 .621-.504 1.125-1.125 1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h4 className="text-sm font-medium text-foreground mb-2">No tools yet</h4>
          <p className="text-xs text-muted mb-4 max-w-[200px]">Create your first tool to help fellow students</p>
          <button className="px-4 py-2 bg-[#FFD700] text-black rounded-lg font-medium text-xs hover:bg-[#FFD700]/90 transition-colors duration-[180ms]">
            Get Started
          </button>
        </div>
      )}

      {/* Enhanced footer */}
      <div className="mt-auto pt-4">
        <div className="p-3 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-muted" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-muted text-xs">Tool Analytics</span>
            </div>
            <span className="text-xs text-[#FFD700]">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}

