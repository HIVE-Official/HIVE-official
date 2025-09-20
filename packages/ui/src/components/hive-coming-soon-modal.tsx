"use client";

import React, { useState } from 'react';
import { Calendar, Users, Zap, Lightbulb, Target, ArrowRight, Clock } from "lucide-react";
import { HiveModal } from './hive-modal';
import { cn } from '../lib/utils';

interface Feature {
  id: string;
  title: string;
  description: string;
  category: "Platform" | "HiveLAB" | "Spaces" | "Rituals";
  timeline: "July 2025" | "August 2025" | "Fall 2025" | "Winter 2025";
  icon: React.ReactNode;
  status: "coming" | "in-development" | "design"
}

const upcomingFeatures: Feature[] = [
  {
    id: "profile-command",
    title: "Profile Command Center",
    description: "Personal dashboard with bento grid layout, calendar integration, and your personal Tools collection. Your private campus headquarters.",
    category: "Platform",
    timeline: "July 2025",
    icon: <Target className="w-5 h-5" />,
    status: "coming"
  },
  {
    id: "space-activation",
    title: "Space Activation System",
    description: "Transform preview Spaces into thriving communities. Builders earn activation rights through HiveLAB Tool creation.",
    category: "Spaces",
    timeline: "July 2025",
    icon: <Users className="w-5 h-5" />,
    status: "coming"
  },
  {
    id: "element-drops",
    title: "Weekly Element Drops",
    description: "New building blocks released every week, expanding what you can create with Tools. From timers to polls to custom forms.",
    category: "HiveLAB",
    timeline: "August 2025",
    icon: <Zap className="w-5 h-5" />,
    status: "in-development"
  },
  {
    id: "tool-stacks",
    title: "Tool Stacks in Spaces",
    description: "Plant your Tools in Spaces to serve communities. Share GPA calculators, event planners, and study group builders.",
    category: "HiveLAB",
    timeline: "August 2025",
    icon: <Lightbulb className="w-5 h-5" />,
    status: "design"
  },
  {
    id: "first-light",
    title: "First Light Ritual",
    description: "Platform-wide collective experience where all students participate in activating their campus for the first time.",
    category: "Rituals",
    timeline: "Fall 2025",
    icon: <Calendar className="w-5 h-5" />,
    status: "design"
  },
  {
    id: "360-spaces",
    title: "360+ Pre-Seeded Spaces",
    description: "Every aspect of campus life gets a digital home. Your dorm, major, clubs, Greek life - all ready from day one.",
    category: "Spaces",
    timeline: "Fall 2025",
    icon: <Users className="w-5 h-5" />,
    status: "in-development"
  }
];

const categoryColors = {
  "Platform": "255, 191, 0", // var(--hive-brand-secondary)
  "HiveLAB": "0, 212, 255",  // var(--hive-status-info)
  "Spaces": "0, 255, 159",   // var(--hive-status-success)
  "Rituals": "255, 107, 157" // var(--hive-brand-secondary)
};

export interface HiveComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWaitlistClick?: () => void
}

const HiveComingSoonModal = React.forwardRef<HTMLDivElement, HiveComingSoonModalProps>(
  ({ isOpen, onClose, onWaitlistClick }, ref) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredFeatures = selectedCategory 
      ? upcomingFeatures.filter(feature => feature.category === selectedCategory)
      : upcomingFeatures;

    const categories = Array.from(new Set(upcomingFeatures.map(f => f.category)));

    return (
      <HiveModal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        variant="secondary"
        className="max-h-[90vh] overflow-hidden"
      >
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-medium uppercase tracking-wider text-yellow-500">
                Coming in vBETA
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[var(--hive-text-primary)] mb-4">
              What's Coming
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              HIVE launches as programmable campus infrastructure where students build Tools, 
              activate Spaces, and participate in collective Rituals that shape campus life.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all text-sm",
                !selectedCategory 
                  ? 'bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)] border border-yellow-500/30' 
                  : 'bg-[var(--hive-text-primary)]/5 text-gray-400 hover:text-[var(--hive-text-primary)] border border-white/10'
              )}
            >
              All Features
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all text-sm border",
                  selectedCategory === category 
                    ? 'bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]' 
                    : 'bg-[var(--hive-text-primary)]/5 text-gray-400 hover:text-[var(--hive-text-primary)] border-white/10'
                )}
                style={{ 
                  borderColor: selectedCategory === category 
                    ? `color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)` 
                    : undefined
          }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Features Grid - Scrollable */}
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[var(--hive-text-primary)]/5 p-5 rounded-xl border hover:border-opacity-60 transition-all group cursor-pointer"
                  style={{ 
                    borderColor: `color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)`,
          }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ 
                        backgroundColor: `color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)`,
                        color: `var(--hive-brand-secondary)`
          }}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ 
                          backgroundColor: `color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)`,
                          color: `var(--hive-brand-secondary)`
          }}
                      >
                        {feature.category}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-[var(--hive-text-primary)]">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed mb-3 text-gray-400">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-500">
                      {feature.timeline}
                    </span>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      feature.status === 'coming' && 'bg-green-400',
                      feature.status === 'in-development' && 'bg-yellow-400',
                      feature.status === 'design' && 'bg-blue-400'
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center pt-4 border-t border-white/10">
            <div className="bg-[var(--hive-text-primary)]/5 p-6 rounded-xl border border-yellow-500/30">
              <h2 className="text-2xl font-bold mb-3 text-[var(--hive-text-primary)]">
                Ready to Build Your Campus?
              </h2>
              <p className="text-gray-400 mb-6">
                Join the waitlist to be first in line when HIVE vBETA launches at your university.
              </p>
              <button 
                className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 px-6 py-3 rounded-xl flex items-center gap-2 mx-auto transition-all hover:scale-105"
                onClick={() => {
                  onWaitlistClick?.();
                  onClose()
          }}
              >
                Find Your University
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </HiveModal>
    )
  }
);

HiveComingSoonModal.displayName = "HiveComingSoonModal";

export { HiveComingSoonModal };