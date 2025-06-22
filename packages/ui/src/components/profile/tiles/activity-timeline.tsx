"use client";

import * as React from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { MessageCircle, UserPlus, MoreHorizontal, Clock } from "lucide-react";
import type { TileProps } from "../grid/types";

interface ActivityItem {
  id: string;
  type: "post" | "join";
  content: string;
  timestamp: Date;
  spaceName?: string;
  likes?: number;
}

export const ActivityTimeline: React.FC<TileProps> = ({
  isEditing = false,
}) => {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "post",
      content:
        "Just finished my first robotics project! The servo motor integration was trickier than expected...",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      spaceName: "Robotics Club",
      likes: 12,
    },
    {
      id: "2",
      type: "join",
      content: "",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      spaceName: "CS260 Study Group",
    },
    {
      id: "3",
      type: "post",
      content:
        "Anyone else struggling with the algorithm analysis homework? Would love to form a study group!",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      spaceName: "CS Major",
      likes: 8,
    },
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card className="flex flex-col h-full" hoverable={!isEditing}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#FFD700]" />
            <span className="text-sm font-medium text-muted-foreground">
              Recent Activity
            </span>
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        {/* Timeline */}
        <div className="flex-1 space-y-3 overflow-hidden">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                {activity.type === "post" ? (
                  <MessageCircle className="h-4 w-4 text-[#FFD700]" />
                ) : (
                  <UserPlus className="h-4 w-4 text-green-400" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs">
                    {activity.spaceName}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>

                {activity.type === "post" ? (
                  <div>
                    <p className="text-sm text-foreground line-clamp-2 mb-2">
                      {activity.content}
                    </p>
                    {activity.likes && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          ❤️ {activity.likes}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Joined {activity.spaceName}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground hover:text-foreground"
            disabled={isEditing}
          >
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
