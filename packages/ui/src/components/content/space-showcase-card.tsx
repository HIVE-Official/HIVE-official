"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Star,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AdaptiveCard,
  CardHeader,
  CardContent,
  CardFooter,
  CardMedia,
  adaptiveCardVariants,
} from "./adaptive-card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "./badge-system";
import { Button } from "../ui/button";

export interface SpaceShowcaseData {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  memberCount: number;
  weeklyGrowth?: number;
  category: string;
  isVerified?: boolean;
  isJoined?: boolean;
  recentMembers: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  upcomingEvents?: number;
  location?: string;
  tags: string[];
}

export interface SpaceShowcaseCardProps {
  space: SpaceShowcaseData;
  variant?: "compact" | "detailed" | "featured";
  onJoin?: (spaceId: string) => void;
  onView?: (spaceId: string) => void;
  className?: string;
}

// A simple component to group avatars
const AvatarGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex -space-x-3 overflow-hidden">{children}</div>
);

const SpaceShowcaseCard = React.forwardRef<
  HTMLDivElement,
  SpaceShowcaseCardProps
>(({ space, onJoin, onView, className }, ref) => {
  const {
    id,
    name,
    description,
    coverImage,
    memberCount,
    category,
    isVerified,
    isJoined,
    recentMembers,
  } = space;

  const handleInteract = () => onView?.(id);
  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoin?.(id);
  };

  return (
    <AdaptiveCard
      ref={ref}
      variant="glass"
      interactive="hover"
      onInteract={handleInteract}
      className={cn("w-full max-w-sm", className)}
    >
      {coverImage && (
        <CardMedia className="-m-6 mb-4 aspect-video">
          <img
            src={coverImage}
            alt={`${name} cover`}
            className="h-full w-full object-cover"
          />
        </CardMedia>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          {isVerified && <Badge variant="verified" size="sm" showIcon />}
        </div>
        <p className="text-sm text-white/60">{category}</p>
      </CardHeader>
      <CardContent>
        <p className="mb-4 line-clamp-2 text-sm text-white/80">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <AvatarGroup>
            {recentMembers.map((member, index) => (
              <Avatar key={member.id} className={cn(index > 0 && "-ml-3")}>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <div className="text-right">
            <p className="font-semibold text-white">{memberCount}</p>
            <p className="text-xs text-white/60">Members</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={isJoined ? "secondary" : "primary"}
          size="sm"
          className="w-full"
          onClick={handleJoinClick}
        >
          {isJoined ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Joined
            </>
          ) : (
            "Join Space"
          )}
        </Button>
      </CardFooter>
    </AdaptiveCard>
  );
});
SpaceShowcaseCard.displayName = "SpaceShowcaseCard";

export { SpaceShowcaseCard }; 