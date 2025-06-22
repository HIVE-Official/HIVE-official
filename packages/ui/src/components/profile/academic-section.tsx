"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Edit, ExternalLink, GraduationCap } from "lucide-react";

interface AcademicInfo {
  major: string;
  graduationYear: number;
  classStanding: "freshman" | "sophomore" | "junior" | "senior" | "graduate";
  academicInterests: string[];
  autoJoinedSpaces: {
    id: string;
    name: string;
    memberCount: number;
  }[];
}

interface AcademicSectionProps {
  academicInfo: AcademicInfo;
  isOwner?: boolean;
  onEdit?: () => void;
  onSpaceClick?: (spaceId: string) => void;
  className?: string;
}

const classStandingLabels = {
  freshman: "Freshman",
  sophomore: "Sophomore",
  junior: "Junior",
  senior: "Senior",
  graduate: "Graduate Student",
};

export const AcademicSection = React.forwardRef<
  HTMLDivElement,
  AcademicSectionProps
>(
  (
    {
      academicInfo,
      isOwner = false,
      onEdit,
      onSpaceClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-yellow-500" />
            Academic Profile
          </CardTitle>
          {isOwner && (
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Major and Class Standing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-1">
                Major
              </h4>
              <p className="text-text-primary font-medium">
                {academicInfo.major}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-1">
                Class Standing
              </h4>
              <p className="text-text-primary font-medium">
                {classStandingLabels[academicInfo.classStanding]}
              </p>
            </div>
          </div>

          {/* Graduation Year */}
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-1">
              Graduation
            </h4>
            <p className="text-text-primary font-medium">
              Class of {academicInfo.graduationYear}
            </p>
          </div>

          {/* Academic Interests */}
          {academicInfo.academicInterests.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-2">
                Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {academicInfo.academicInterests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Auto-Joined Academic Spaces */}
          {academicInfo.autoJoinedSpaces.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-2">
                Academic Spaces
                <Badge variant="outline" className="ml-2 text-xs">
                  Auto-Joined
                </Badge>
              </h4>
              <div className="space-y-2">
                {academicInfo.autoJoinedSpaces.map((space) => (
                  <div
                    key={space.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg",
                      "bg-surface-02 border border-border-line",
                      "hover:bg-surface-02-hover transition-colors cursor-pointer"
                    )}
                    onClick={() => onSpaceClick?.(space.id)}
                  >
                    <div>
                      <p className="font-medium text-text-primary">
                        {space.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {space.memberCount} members
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-text-secondary" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

AcademicSection.displayName = "AcademicSection";

export type { AcademicInfo, AcademicSectionProps };
