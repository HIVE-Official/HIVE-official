"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../atoms/card";
import { Badge } from "../atoms/badge";

export interface NotificationCardProps
  extends Omit<React.ComponentProps<typeof Card>, "title"> {
  title: React.ReactNode;
  message?: React.ReactNode;
  timestamp?: React.ReactNode;
  type?: string;
  read?: boolean;
}

export function NotificationCard({
  title,
  message,
  timestamp,
  type = "system",
  read = false,
  className,
  ...props
}: NotificationCardProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base text-hive-text-primary">
            {title}
          </CardTitle>
          {message ? (
            <CardDescription className="text-hive-text-secondary">
              {message}
            </CardDescription>
          ) : null}
          {timestamp ? (
            <div className="mt-1 text-xs text-hive-text-tertiary">
              {timestamp}
            </div>
          ) : null}
        </div>
        <Badge variant={read ? "secondary" : "default"} className="capitalize">
          {type}
        </Badge>
      </CardHeader>
    </Card>
  );
}
