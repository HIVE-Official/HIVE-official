"use client";

import { useState } from "react";
import { HiveCard } from "../hive-card";
import { Users, TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

// SVG Pattern Components
const NetworkPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <circle cx="8" cy="8" r="1.5" className="fill-white/60 group-hover:fill-[var(--hive-brand-secondary)] transition-colors duration-300" />
    <circle cx="24" cy="10" r="1.5" className="fill-white/80 group-hover:fill-[var(--hive-brand-secondary)] transition-colors duration-300 delay-75" />
    <circle cx="16" cy="20" r="1.5" className="fill-white/60 group-hover:fill-[var(--hive-brand-secondary)] transition-colors duration-300 delay-150" />
    <circle cx="20" cy="6" r="1" className="fill-white/40 group-hover:fill-[var(--hive-brand-secondary)]/80 transition-colors duration-300 delay-100" />
    <line x1="8" y1="8" x2="20" y2="6" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/60 transition-all duration-300" />
    <line x1="20" y1="6" x2="24" y2="10" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/60 transition-all duration-300 delay-75" />
    <line x1="24" y1="10" x2="16" y2="20" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/60 transition-all duration-300 delay-150" />
    <line x1="8" y1="8" x2="16" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/40 transition-all duration-300 delay-100" />
  </svg>
);

const HierarchyPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <rect x="14" y="4" width="4" height="3" rx="1" className="fill-white/80 group-hover:fill-[var(--hive-brand-secondary)] transition-colors duration-300" />
    <rect x="8" y="12" width="4" height="3" rx="1" className="fill-white/60 group-hover:fill-[var(--hive-brand-secondary)] transition-colors duration-300 delay-75" />
    <rect x="20" y="12" width="4" height="3" rx="1" className="fill-white/60 group-hover:fill-[var(--hive-brand-secondary)] transition-colors duration-300 delay-75" />
    <rect x="4" y="20" width="4" height="3" rx="1" className="fill-white/40 group-hover:fill-[var(--hive-brand-secondary)]/80 transition-colors duration-300 delay-150" />
    <rect x="12" y="20" width="4" height="3" rx="1" className="fill-white/40 group-hover:fill-[var(--hive-brand-secondary)]/80 transition-colors duration-300 delay-150" />
    <rect x="24" y="20" width="4" height="3" rx="1" className="fill-white/40 group-hover:fill-[var(--hive-brand-secondary)]/80 transition-colors duration-300 delay-150" />
    <line x1="16" y1="7" x2="10" y2="12" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/60 transition-all duration-300" />
    <line x1="16" y1="7" x2="22" y2="12" className="stroke-white/20 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/60 transition-all duration-300" />
    <line x1="10" y1="15" x2="6" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/40 transition-all duration-300 delay-75" />
    <line x1="10" y1="15" x2="14" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/40 transition-all duration-300 delay-75" />
    <line x1="22" y1="15" x2="26" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/40 transition-all duration-300 delay-75" />
  </svg>
);

const ClusterPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="2" className="fill-white/80 group-hover:fill-[var(--hive-brand-secondary)] transition-colors duration-300" />
    <circle cx="16" cy="8" r="1.5" className="fill-white/60 group-hover:fill-[var(--hive-brand-secondary)]/80 transition-colors duration-300 delay-75" />
    <circle cx="24" cy="16" r="1.5" className="fill-white/60 group-hover:fill-[var(--hive-brand-secondary)]/80 transition-colors duration-300 delay-75" />
    <circle cx="16" cy="24" r="1.5" className="fill-white/60 group-hover:fill-[var(--hive-brand-secondary)]/80 transition-colors duration-300 delay-75" />
    <circle cx="8" cy="16" r="1.5" className="fill-white/60 group-hover:fill-[var(--hive-brand-secondary)]/80 transition-colors duration-300 delay-75" />
    <circle cx="22" cy="10" r="1" className="fill-white/40 group-hover:fill-[var(--hive-brand-secondary)]/60 transition-colors duration-300 delay-150" />
    <circle cx="10" cy="10" r="1" className="fill-white/40 group-hover:fill-[var(--hive-brand-secondary)]/60 transition-colors duration-300 delay-150" />
    <circle cx="22" cy="22" r="1" className="fill-white/40 group-hover:fill-[var(--hive-brand-secondary)]/60 transition-colors duration-300 delay-150" />
    <circle cx="10" cy="22" r="1" className="fill-white/40 group-hover:fill-[var(--hive-brand-secondary)]/60 transition-colors duration-300 delay-150" />
    <circle cx="16" cy="16" r="8" className="stroke-white/10 stroke-[0.5] fill-none group-hover:stroke-[var(--hive-brand-secondary)]/30 transition-all duration-300" />
  </svg>
);

const GridPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <rect x="6" y="6" width="6" height="6" rx="1" className="fill-white/20 stroke-white/30 stroke-[0.5] group-hover:fill-[var(--hive-brand-secondary)]/20 group-hover:stroke-[var(--hive-brand-secondary)]/60 transition-all duration-300" />
    <rect x="20" y="6" width="6" height="6" rx="1" className="fill-white/20 stroke-white/30 stroke-[0.5] group-hover:fill-[var(--hive-brand-secondary)]/20 group-hover:stroke-[var(--hive-brand-secondary)]/60 transition-all duration-300 delay-75" />
    <rect x="6" y="20" width="6" height="6" rx="1" className="fill-white/20 stroke-white/30 stroke-[0.5] group-hover:fill-[var(--hive-brand-secondary)]/20 group-hover:stroke-[var(--hive-brand-secondary)]/60 transition-all duration-300 delay-75" />
    <rect x="20" y="20" width="6" height="6" rx="1" className="fill-white/20 stroke-white/30 stroke-[0.5] group-hover:fill-[var(--hive-brand-secondary)]/20 group-hover:stroke-[var(--hive-brand-secondary)]/60 transition-all duration-300 delay-150" />
    <line x1="12" y1="9" x2="20" y2="9" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/40 transition-all duration-300" />
    <line x1="9" y1="12" x2="9" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/40 transition-all duration-300 delay-50" />
    <line x1="23" y1="12" x2="23" y2="20" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/40 transition-all duration-300 delay-100" />
    <line x1="12" y1="23" x2="20" y2="23" className="stroke-white/15 stroke-[0.5] group-hover:stroke-[var(--hive-brand-secondary)]/40 transition-all duration-300 delay-150" />
    <circle cx="16" cy="16" r="1" className="fill-white/40 group-hover:fill-[var(--hive-brand-secondary)] transition-colors duration-300 delay-200" />
  </svg>
);

// Space category definitions with Firebase mapping
export const SPACE_CATEGORIES = {
  student: {
    id: 'student_organizations',
    title: 'Student Spaces',
    subtitle: 'Student-led communities & clubs',
    icon: NetworkPattern,
    defaultCount: 120
  },
  university: {
    id: 'university_organizations',
    title: 'University Spaces',
    subtitle: 'Academic programs & official groups',
    icon: HierarchyPattern,
    defaultCount: 180
  },
  greek: {
    id: 'greek_life',
    title: 'Greek Life',
    subtitle: 'Fraternities & sororities',
    icon: ClusterPattern,
    defaultCount: 23
  },
  residential: {
    id: 'campus_living',
    title: 'Residential Life', 
    subtitle: 'Dorms & living communities',
    icon: GridPattern,
    defaultCount: 37
  }
} as const;

export interface CategoryGridOrganismProps {
  /** Category breakdown data from API */
  categoryBreakdown?: Record<string, number>;
  /** Total spaces count for header */
  totalSpaces?: number;
  /** Custom title override */
  title?: string;
  /** Custom subtitle override */
  subtitle?: string;
  /** Show statistics in header */
  showStats?: boolean;
  /** Grid layout variant */
  variant?: "default" | "compact" | "featured";
  /** Click handler for category selection */
  onCategoryClick?: (categoryId: string) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Custom className */
  className?: string;
}

export function CategoryGridOrganism({
  categoryBreakdown,
  totalSpaces,
  title = "Campus Ecosystem",
  subtitle = "Discover communities across student organizations, academic programs, Greek life, and residential communities.",
  showStats = true,
  variant = "default",
  onCategoryClick,
  isLoading = false,
  className
}: CategoryGridOrganismProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    onCategoryClick?.(categoryId);
  };

  const getGridCols = () => {
    switch (variant) {
      case "compact":
        return "grid-cols-2 md:grid-cols-4";
      case "featured":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };

  const getCardPadding = () => {
    switch (variant) {
      case "compact":
        return "p-4";
      case "featured":
        return "p-8";
      default:
        return "p-6";
    }
  };

  if (isLoading) {
    return (
      <div className={cn("max-w-7xl mx-auto px-6", className)}>
        {showStats && (
          <div className="text-center mb-8">
            <div className="h-8 bg-[var(--hive-text-primary)]/5 rounded-lg w-64 mx-auto mb-3 animate-pulse" />
            <div className="h-4 bg-[var(--hive-text-primary)]/5 rounded w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-[var(--hive-text-primary)]/5 rounded w-32 mx-auto animate-pulse" />
          </div>
        )}
        
        <div className={cn("grid gap-6", getGridCols())}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-[var(--hive-text-primary)]/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("max-w-7xl mx-auto px-6", className)}>
      {showStats && (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-3">{title}</h2>
          <p className="text-[var(--hive-text-tertiary)] max-w-2xl mx-auto mb-4">{subtitle}</p>
          {totalSpaces && (
            <div className="mt-4">
              <span className="text-3xl font-bold text-[var(--hive-brand-secondary)]">{totalSpaces}</span>
              <span className="text-[var(--hive-text-tertiary)] ml-2">active communities</span>
            </div>
          )}
        </div>
      )}

      <div className={cn("grid gap-6", getGridCols())}>
        {Object.values(SPACE_CATEGORIES).map((category) => {
          const IconComponent = category.icon;
          const categoryCount = categoryBreakdown?.[category.id] ?? category.defaultCount;
          const isHovered = hoveredCategory === category.id;
          
          return (
            <HiveCard 
              key={category.id}
              className={cn(
                getCardPadding(),
                "bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)] hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] transition-all cursor-pointer group relative overflow-hidden",
                isHovered && "ring-2 ring-[var(--hive-brand-secondary)]/30"
              )}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Liquid Fill Animation */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-xl flex items-center justify-center group-hover:bg-[var(--hive-brand-secondary)]/20 group-hover:border-[var(--hive-brand-secondary)]/30 transition-all">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-[var(--hive-text-tertiary)] group-hover:translate-x-1 group-hover:text-[var(--hive-brand-secondary)] transition-all" />
                </div>
                
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2 group-hover:text-[var(--hive-brand-secondary)] transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-[var(--hive-text-tertiary)] mb-4 group-hover:text-[var(--hive-text-primary)]/80 transition-colors">
                  {category.subtitle}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-text-primary)]/90 transition-colors">
                    <Users className="h-4 w-4 mr-2" />
                    {categoryCount} spaces
                  </div>
                  <TrendingUp className="h-4 w-4 text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-brand-secondary)] transition-colors" />
                </div>
              </div>
            </HiveCard>
          );
        })}
      </div>
    </div>
  );
}