"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Users,
  GraduationCap,
  Home,
  Building,
  Crown,
  Lock,
  CheckCircle,
} from "lucide-react";

interface SpaceCategory {
  id:
    | "student_orgs"
    | "greek_life"
    | "university_orgs"
    | "academics"
    | "residential";
  name: string;
  description: string;
  joinType: "open" | "invite_only" | "faculty_controlled" | "auto_join";
  requiresBuilder: boolean;
  builderApproved: boolean;
  memberCount: number;
  isAutoJoined?: boolean;
  autoJoinInfo?: string;
}

interface CategoryGridProps {
  categories: SpaceCategory[];
  onCategoryClick?: (categoryId: string) => void;
  className?: string;
}

const categoryIcons = {
  student_orgs: Users,
  greek_life: Crown,
  university_orgs: Building,
  academics: GraduationCap,
  residential: Home,
};

const joinTypeLabels = {
  open: "Open to All",
  invite_only: "Invite Only",
  faculty_controlled: "Faculty Controlled",
  auto_join: "Auto-Joined",
};

const joinTypeColors = {
  open: "bg-green-500",
  invite_only: "bg-blue-500",
  faculty_controlled: "bg-purple-500",
  auto_join: "bg-yellow-500",
};

export const CategoryGrid = React.forwardRef<HTMLDivElement, CategoryGridProps>(
  ({ categories, onCategoryClick, className, ...props }, ref) => {
    const handleCategoryClick = (categoryId: string) => {
      onCategoryClick?.(categoryId);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          className
        )}
        {...props}
      >
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.id];
          const isLocked =
            category.requiresBuilder && !category.builderApproved;

          return (
            <Card
              key={category.id}
              className={cn(
                "cursor-pointer transition-all duration-200",
                "hover:shadow-lg hover:scale-105",
                isLocked && "opacity-75",
                category.isAutoJoined &&
                  "ring-2 ring-yellow-500 ring-opacity-30"
              )}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-3 rounded-lg",
                        category.isAutoJoined
                          ? "bg-yellow-500 text-black"
                          : "bg-surface-02 text-text-primary"
                      )}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary font-display">
                        {category.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {category.memberCount} members
                      </p>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="flex flex-col gap-1">
                    {isLocked && (
                      <Lock className="h-4 w-4 text-text-secondary" />
                    )}
                    {category.isAutoJoined && (
                      <CheckCircle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Join Type Badge */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs text-white",
                      joinTypeColors[category.joinType]
                    )}
                  >
                    {joinTypeLabels[category.joinType]}
                  </Badge>

                  {/* Auto-Join Info */}
                  {category.isAutoJoined && category.autoJoinInfo && (
                    <span className="text-xs text-yellow-600 font-medium">
                      {category.autoJoinInfo}
                    </span>
                  )}

                  {/* Builder Required */}
                  {isLocked && (
                    <Badge variant="outline" className="text-xs">
                      Builder Required
                    </Badge>
                  )}
                </div>

                {/* Preview Mode Indicator */}
                {isLocked && (
                  <div className="mt-3 p-2 bg-surface-02 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-xs text-text-secondary">
                      <Lock className="h-3 w-3 inline mr-1" />
                      Preview Only - Seeking Builder to unlock
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }
);

CategoryGrid.displayName = "CategoryGrid";

export type { SpaceCategory, CategoryGridProps };
